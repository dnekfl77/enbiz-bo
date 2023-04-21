$.namespace("detailGrid.eventhandler");
detailGrid.eventhandler = {

    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }

    , gridSetting : function () {

        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({itemIndex: itemIndex});
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.setEditOptions({ commitLevel: 'error' });
    }

    , bindButtonEvent : function(){
        var self = this;
		
        $('#btn_dtl_grid_add').click(function() {
            self.onAdd();
        });

        $('#btn_dtl_grid_reset').click(function(){
            self.onReset();
        });

        $('#btn_dtl_grid_save').click(function() {
            self.onSave();
        });
    },

    getStStdCdList : function ( grpCd ) {
        var grid = this.grid;
        var provider = grid.getDataSource();
        this.grpCd = grpCd;

        if ( grpCd.isEmpty() ) {
            provider.clearRows();
            grid.localSavePoint = provider.savePoint(true);
        } else {
            this.onSearch();
        }
    },

    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },
        onRowCountChanged : function (provider, count) {
            $('#detailGrid-totalcount').text(count);
        },
        onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            var provider = grid.getDataSource();
            var fieldName = provider.getOrgFieldName(field);

            var rowStat = provider.getRowState(dataRow);
            var rowCnt = grid.getItemCount();
            var fn_chk_dp = function ( fieldName, msg ) {
                var rowData = "";
                for (var i = 0; i < rowCnt; i++) {
                    if (i == itemIndex) continue;
                    rowData = grid.getValue(i, fieldName);
                    if (newValue === rowData) {
                        alert(msg);
                        grid.cancel();
                        return;
                    }
                }
            }

            if ( fieldName === 'cd' && rowStat === 'created' ) {
                fn_chk_dp( fieldName, message._duplicateCdMessage );
            } else if ( fieldName === 'cdNm' ) {
                fn_chk_dp( fieldName, message._duplicateCdNmMessage );
            } else if ( fieldName === 'sortSeq' ) {
                fn_chk_dp( fieldName, message._duplicateSortSeqMessage );
            }
        },
        onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var provider = grid.getDataSource();
            var rowStat = provider.getRowState(dataRow);
            var error = {};

            if (column.fieldName === 'grpCd') {
                if (value === undefined || value.trim() === '') {
                    error.level = 'error';
                    error.message = message._grpCdUnSelectedMessage;
                    return error;
                }
            } else if (column.fieldName === 'cd' && rowStat === 'created' ) {
                if (value === undefined || value.trim() === '') {
                    error.level = 'error';
                    error.message = message._cdMessage;
                    return error;
                }

                // 코드 입력 제한 : 영문, 숫자
                if (!isAlphanumeric(value)) {
                    error.level = 'error';
                    error.message = message._invalidCdMessage;
                    return error;
                }

            } else if (column.fieldName === 'cdNm') {
                if (value === undefined || value.trim() === '') {
                    error.level = 'error';
                    error.message = message._cdNmMessage;
                    return error;
                }

            } else if (column.fieldName === 'sortSeq') {
                if ( value === undefined ) {
                    error.level = 'error';
                    error.message = message._sortSeqMessage;
                    return error;
                }
            }
        }
    },

    onAdd : function() {
        var self = this;
        var grid = self.grid;
        
        if ( self.grpCd.isEmpty() ){
        	alert(message._grpCdUnSelectedMessage);
        	return;
        }
       
        grid.commit(true);
        self.defaultHandler.onAdd(grid, { useYn : "Y" , grpCd : self.grpCd });
    },

    onSearch : function( pageIdx ){
        var self = this;
        var extraQueryString = 'grpCd=' + this.grpCd;
        self.grid.cancel();

        pageIdx = !pageIdx ? 0 : pageIdx;
        var pagingFunc = function( pageIdx ){ return self.onSearch(pageIdx); };
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc);
    },

    onSave : function() {

        var self = this;
        var grid = self.grid;

        if ( self.grpCd.isEmpty() ){
            alert(message._grpCdUnSelectedMessage);
            return;
        }

        this.controller.doSave(this, grid.localId);
    },
    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    }
};
