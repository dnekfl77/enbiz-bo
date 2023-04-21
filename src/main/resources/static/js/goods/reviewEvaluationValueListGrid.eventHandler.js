var revEvltValueListGridMsg = x2coMessage.getMessage({
    noEvliItmNoMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.noEvliItmNoMsg'
    ,noSelectedItmValueMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.noSelectedItmValueMsg'
    ,maxEvltValCntMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.maxEvltValCntMsg'
    ,noEvltValMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.noEvltValMsg'
    ,duplicatedEvltValMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.duplicatedEvltValMsg'
    ,noSortSeqMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.noSortSeqMsg'
    ,duplicatedSortSeqMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.duplicatedSortSeqMsg'
});

$.namespace('reviewEvaluationValueListGrid.eventhandler');
reviewEvaluationValueListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    ,gridSetting : function () {
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.setEditOptions({ commitLevel : 'error' });
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_third_grid_add').off('click').on( 'click', function () {
            that.add();
        });

        $('#btn_third_grid_delete').off('click').on( 'click', function () {
            that.delete();
        });

        $('#btn_third_grid_cancel').off('click').on( 'click', function () {
            that.cancel();
        });

        $('#btn_third_grid_save').off('click').on( 'click', function () {
            that.save();
        });
    }
    ,getEvltValueList : function ( evltItemNo ) {
        if ( evltItemNo === '' ) {
            this.resetGrid();
            return;
        }
        this.evltItemNo = evltItemNo;
        this.search();
    }
    ,resetGrid : function () {
        var grid = this.grid;
        var provider = grid.getDataSource();
        provider.clearRows();
        grid.localSavePoint = provider.savePoint(true);
        this.evltItemNo = '';
    }
    ,search : function ( pageNo ) {
        var that = this;
        var extraQueryString = 'evltItemNo=' + that.evltItemNo;

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.search(pageNo); };

        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, false );
    }
    ,add : function () {
        var that = this;
        var grid = that.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        // 새로 추가된 평가항목 평가값 추가 불가
        if ( !this.evltItemNo ) {
            alert(revEvltValueListGridMsg.noEvliItmNoMsg);
            return;
        }

        var rowState = provider.getAllStateRows();
        var rowCount = provider.getRowCount();

        // 개수 제한 = 최대 3개
        if ( rowCount - rowState.deleted.length >= 3 ) {
            alert(revEvltValueListGridMsg.maxEvltValCntMsg);
            return;
        }

        this.defaultHandler.onAdd( grid, {
            evltValNo : undefined
            , evltVal : undefined
            , sortSeq : 1
            , sysModId : undefined
            , sysModDtm : undefined
            , evltItemNo : that.evltItemNo
        });

    }
    ,delete : function () {
        var grid = this.grid;
        grid.commit(true);
        var checkedRows = grid.getCheckedRows();
        if ( !checkedRows.length ) {
            alert(revEvltValueListGridMsg.noSelectedItmValueMsg);
            return;
        }
        this.defaultHandler.onDelete( grid );
    }
    ,cancel : function () {
        var grid = this.grid;
        this.defaultHandler.onCancel( grid );
    }
    ,save : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        var rowState = provider.getAllStateRows();
        var rowCount = provider.getRowCount();

        // 개수 제한 = 최대 3개
        if ( rowCount - rowState.deleted.length > 3 ) {
            alert(revEvltValueListGridMsg.maxEvltValCntMsg);
            return;
        }

        this.controller.doSave(this, grid.localId);
    }
    ,gridEvent : {
        onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            // 평가값 중복 여부 확인
            var rowCnt = grid.getItemCount();
            var rowData = '';
            var editRowIndex = itemIndex;
            var fieldName = grid.getDataSource().getOrgFieldName(field);
            if ( newValue === undefined || newValue === '' ) return;

            if ( fieldName === 'evltVal' ) {
                for (var rowIndex = 0; rowIndex < rowCnt; rowIndex++) {
                    if (rowIndex == editRowIndex) continue;

                    rowData = grid.getValue(rowIndex, "evltVal");
                    if ( newValue === rowData ) {
                        alert(revEvltValueListGridMsg.duplicatedEvltValMsg);
                        grid.cancel();
                        break;
                    }
                }
            } else if (fieldName === 'sortSeq' ) {
                for (var rowIndex = 0; rowIndex < rowCnt; rowIndex++) {
                    if (rowIndex == editRowIndex) continue;

                    rowData = grid.getValue(rowIndex, "sortSeq");
                    if ( newValue === rowData ) {
                        alert(revEvltValueListGridMsg.duplicatedSortSeqMsg);
                        grid.cancel();
                        break;
                    }
                }
            }
        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === "evltVal" ) {
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = revEvltValueListGridMsg.noEvltValMsg;
                    return error;
                }
            } else if ( column.fieldName === "sortSeq"){
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = revEvltValueListGridMsg.noSortSeqMsg;
                    return error;
                }
            }
        }
        ,afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.search();
            }
        }
    }
}