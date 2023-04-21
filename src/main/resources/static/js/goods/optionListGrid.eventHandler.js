var optionListMsg = x2coMessage.getMessage( {
    maxOptnCountMsg   : 'optionMgmt.optionListGrid.alert.msg.maxOptnCountMsg'
});

$.namespace("optionListGrid.eventhandler");
optionListGrid.eventhandler = {
    init: function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    ,gridSetting: function() {
        var _self = this;

        _self.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        _self.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        _self.grid.setEditOptions({ commitLevel : 'error' });
    }
    ,bindButtonEvent: function () {
        var _self = this;

        $('#btn_optn_add').on('click', function() {
            _self.onAdd(_self);
        });

        $('#btn_optn_cancel').on('click', function() {
            _self.onReset(_self);
        });

        $('#btn_optn_save').on('click', function() {
            _self.onSave(_self);
        });
    }
    ,onAdd : function(that) {
        that.grid.commit(true);

        if ( that.grid.getDataSource().getRowCount() == 20 ){
            alert(optionListMsg.maxOptnCountMsg);
            return;
        }

        var defaultValues = { optnCatNo : that.optnCatNo, useYn : "Y" };
        that.defaultHandler.onAdd(that.grid, defaultValues);
    }
    ,onReset : function(that) {
        that.defaultHandler.onCancel(that.grid);
    }
    ,onSave : function(that) {
        that.grid.commit(true);
        that.controller.doSave(that, that.grid.localId);
    }
    ,clearGrid: function(that) {
        that.grid.getDataSource().clearRows();
    }
    ,onToggleBindEvent: function(that, onAndOff) {
        $("[id^='btn_optn_']").each(function(){
            var checker = $._data($('#'+this.id)[0], 'events');

            if (checker === undefined && onAndOff === 'on') {
                $(this).removeClass('disabled');

                if (this.id === 'btn_optn_add') {
                    $(this).on('click', function() {
                        that.onAdd(that);
                    });
                }
                if (this.id === 'btn_optn_cancel') {
                    $(this).on('click', function() {
                        that.onReset(that);
                    });
                }
                if (this.id === 'btn_optn_save') {
                    $(this).on('click', function() {
                        that.onSave(that);
                    });
                }
            }
            if (onAndOff === 'off') {
                $(this).off().addClass("disabled");
            }
        });
    }
    ,onSearch : function(that, optnCatNo, pageIdx){
        that.grid.cancel();
        that.clearGrid(that);

        that.optnCatNo = optnCatNo;

        pageIdx = !pageIdx ? 0 : pageIdx;
        var pagingFunc = function(pageIdx){return that.onSearch(that, optnCatNo, pageIdx);};
        var extraQueryString = "optnCatNo=" + optnCatNo;

        that.controller.doQuery(that, extraQueryString, pageIdx, pagingFunc, null, false);
    }
    ,gridEvent : {
        onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === "optnNm" ) {
                if ( value === undefined || value === null || value === '' ) {
                    error.level = "error";
                    error.message = '옵션명' + _msg.requiredCheckMessage;
                    return error;
                }
            } else if ( column.fieldName === 'sortSeq') {
                if ( value === undefined || value === null || value === '' ) {
                    error.level = "error";
                    error.message = '정렬순서' + _msg.requiredCheckMessage;
                    return error;
                }
            }
        }
        ,afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            if(data.succeeded){
                openToast(data.message);

                var parentHandler = optionCategoryListGrid.eventhandler;
                var parentIndex = parentHandler.grid.getCurrent().itemIndex;
                eventHandler.onSearch(eventHandler, parentHandler.grid.getValue(parentIndex, 'optnCatNo'));
           }else{
                alert(data.message);
            }
        }
    }
}