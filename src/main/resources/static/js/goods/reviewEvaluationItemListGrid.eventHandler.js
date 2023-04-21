var revEvltItemListMsg = x2coMessage.getMessage({
    duplicatedEvltItmNmMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.duplicatedEvltItmNmMsg'
    , noEvliItmNmMsg : 'reviewEvaluationItemMgmt.itemMgmtTab.alert.msg.noEvliItmNmMsg'
});

$.namespace('reviewEvaluationItemListGrid.eventhandler');
reviewEvaluationItemListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.calenderSetting();
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
    ,calenderSetting : function () {
        var fromAndToCalDate = recentlyCalenderData(30);
        $('#regStartDtm').val(fromAndToCalDate[0]);
        $('#regEndDtm').val(fromAndToCalDate[1]);
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_calender').on('click', function () {
            that.callCalender();
        });

        $('#btn_reset').off('click').on( 'click', function () {
            that.reset();
        });

        $('#btn_search').off('click').on( 'click', function () {
            that.search(0, true);
        });

        $('#btn_second_grid_add').off('click').on( 'click', function () {
            that.add();
        });

        $('#btn_second_grid_cancel').off('click').on( 'click', function () {
            that.cancel();
        });

        $('#btn_second_grid_save').off('click').on( 'click', function () {
            that.save();
        });

        $('#btn_mappingStdCtgList_layerPop_close').click(function () {
            $('.layer-popup .box .btn-close').click();
        });

        com.x2commerce.common.Util.setupEnterSearch("reviewEvaluationItemListForm", "btn_search");

    }
    ,callCalender : function () {
        showCalendar({
            type : 'A',
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#regStartDtm').val(),
            yyyymmdd2 : $('#regEndDtm').val(),
            fn:function(pin) {
                $('#regStartDtm').val(pin.yyyymmdd1);
                $('#regEndDtm').val(pin.yyyymmdd2);
            }
        });
    }
    ,reset : function () {
        $('#reviewEvaluationItemListForm')[0].reset();
        this.calenderSetting();
    }
    ,search : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.search(pageNo, false); };

        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
    ,add : function () {
        var grid = this.grid;
        grid.commit(true);

        this.defaultHandler.onAdd( grid, {
                evltItemNo : ''
                , evltItemNm : ''
                , stdCtgMapCnt : 0
                , useYn : 'Y'
                , sysModId : undefined
                , sysModDtm : undefined
        });
    }
    ,cancel : function () {
        var grid = this.grid;
        this.defaultHandler.onCancel( grid );
    }
    ,save : function () {
        var grid = this.grid;
        this.controller.doSave(this, grid.localId);
    }
    ,gridEvent : {
        onCurrentRowChanged(grid, oldRow, newRow) {
            reviewEvaluationValueListGrid.eventhandler.getEvltValueList(( newRow == -1 )? '' : grid.getDataSource().getJsonRow(newRow).evltItemNo); // 평가값 목록 조회
        }
        ,onCellDblClicked : function ( grid, clickedCell ) {
            // 매핑표준분류 레이어 팝업 호출
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if ( clickedCell.cellType === 'data'  && clickedCell.column === 'stdCtgMapCnt') {

                if ( rowData.stdCtgMapCnt === 0 ) return;
                $('#layerPop-mappingStdCtgList').find('tbody').empty();

                common.Ajax.sendRequest(
                    "get",
                    _baseUrl + "goods/ReviewEvaluationItemMgmt.getMappedCategoryListToEvaluationItem.do",
                    'evltItemNo=' + rowData.evltItemNo,
                    function ( data ) {
                        data.forEach( function (stdCtg, index) {
                            $('#layerPop-mappingStdCtgList').find('tbody').append(
                                $('<tr/>').append(
                                    $('<td/>').addClass('center').text(index+1),
                                    $('<td/>').text(stdCtg.stdCtgHierarchy)
                                )
                            )
                        });
                        layerPopOpen('layerPop-mappingStdCtgList');
                    }
                )
            }
        }
        ,onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {

            // 평가항목명 중복 여부 확인
            var rowCnt = grid.getItemCount();
            var editRowIndex = itemIndex;
            var fieldName = grid.getDataSource().getOrgFieldName(field);
            if ( newValue === undefined || newValue === '' ) return;
            if ( fieldName !== 'evltItemNm' ) return;

            var rowData = '';
            for (var rowIndex = 0; rowIndex < rowCnt; rowIndex++) {
                if (rowIndex == editRowIndex) continue;

                rowData = grid.getValue(rowIndex, 'evltItemNm');
                if ( newValue === rowData ) {
                    alert(revEvltItemListMsg.duplicatedEvltItmNmMsg);
                    grid.cancel();
                    break;
                }
            }

        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === "evltItemNm" ) {
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = revEvltItemListMsg.noEvliItmNmMsg;
                    return error;
                }
            }
        }
        ,afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            if( data.succeeded ){
                openToast(data.message);
                eventHandler.search(0,false);
            }else{
                alert(data.message);
            }
        }
    }
}