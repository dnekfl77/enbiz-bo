$.namespace("gcGrid.eventhandler");
gcGrid.eventhandler = {
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
        this.grid.setEditOptions({commitLevel: 'error'});
    }

    ,bindButtonEvent : function(){

        var self = this;
		
        $('#btn_search').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_init').click(function() {
            $('#gcGridForm')[0].reset();
        });

        $('#btn_grid_add').click(function() {
            self.onAdd();
        });

        $('#btn_grid_save').click(function() {
            self.onSave();
        });

        $('#btn_grid_reset').click(function(){
            self.onReset();
        })

        $("#gcGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_search').click();
                e.stopPropagation();
            }
        });
    }, 
    
    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0,false);
           }
        },
        onCurrentRowChanged : function(grid, oldRow, newRow) {
         	var grpCd = grid.getValue(grid.getCurrent().itemIndex, "grpCd");
         	grpCd = (!grpCd)? '' : grpCd;

            var rowStat = '';
         	if ( newRow !== -1 ) rowStat = grid.getDataSource().getRowState(newRow);
         	if ( rowStat === 'created' ) grpCd = '';

            detailGrid.eventhandler.getStStdCdList( grpCd );
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

            if ( fieldName === 'grpCd' && rowStat === 'created' ) {
                fn_chk_dp( fieldName, message._duplicateGrpCdMessage );
            } else if ( fieldName === 'grpCdNm' ) {
                fn_chk_dp( fieldName, message._duplicateGrpCdNmMessage );
            }
        },
        onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {

            var provider = grid.getDataSource();
            var rowStat = provider.getRowState(dataRow);
            var error = {};

            if ( column.fieldName === 'grpCd' && rowStat === 'created') {
                if ( value === undefined || value.trim() === '' ) {
                    error.level = 'error';
                    error.message = message._gcIdMessage;
                    return error;
                }

                if ( !isAlphanumeric(value) ) {
                    error.level = 'error';
                    error.message = message._invalidGrpCdMessage;
                    return error;
                }

            } else if ( column.fieldName === 'grpCdNm' ) {
                if ( value === undefined || value.trim() === '' ) {
                    error.level = 'error';
                    error.message = message._gcNmMessage;
                    return error;
                }
            }
        }
    },
    onAdd : function() {
        var self = this;
        var grid = self.grid;
        grid.commit(true);

        var defaultValues = { useYn : "Y" };
        self.defaultHandler.onAdd(grid, defaultValues);
    },
    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel(); 
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        this.controller.doQuery(this,"",pageIdx, pagingFunc, false, isOpenToast);
    },
    onSave : function() {
        var grid = this.grid;
        this.controller.doSave(this, grid.localId);
    },
    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    }
};