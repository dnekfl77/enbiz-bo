var revEvltItemCateListMsg = x2coMessage.getMessage({
    noSortSeqMsg : 'reviewEvaluationItemMgmt.mappingTab.alert.msg.noSortSeqMsg'
    ,noSelectedEvltItemMsg : 'reviewEvaluationItemMgmt.mappingTab.alert.msg.noSelectedEvltItemMsg'
    ,canNotAddEvltItemMsg : 'reviewEvaluationItemMgmt.mappingTab.alert.msg.canNotAddEvltItemMsg'
    ,maxEvltItemCntMsg : 'reviewEvaluationItemMgmt.mappingTab.alert.msg.maxEvltItemCntMsg'
    ,duplicatedSortSegMsg : 'reviewEvaluationItemMgmt.mappingTab.alert.msg.duplicatedSortSegMsg'
});

$.namespace('reviewEvaluationItemCategoryListGrid.eventhandler');
reviewEvaluationItemCategoryListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.treeSetting();
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
    ,treeSetting : function () {
        var that = this;
        var setting = {
            view : {
                dblClickExpand : false
            },
            data: {
                key : {
                    name : "stdCtgNm"
                },
                simpleData: {
                    enable: true,
                    idKey: "stdCtgNo",
                    pIdKey: "uprStdCtgNo"
                }
            },
            callback: {
                onClick : function (event, treeId, treeNode) {
                    var depth = treeNode.level + 1;
                    var stdCtgNo = treeNode.stdCtgNo;

                    that.stdCtgNo = ( depth === 2 || depth === 3 ) ? stdCtgNo : '';
                    that.getStdCtgEvltItemList(0, true);
                }
            }
        };

        that.zTreeObj = $.fn.zTree.init($("#stdCtgTree"), setting, _stdCtgList);
        var treeNodes = that.zTreeObj.getNodes();
        that.expandFirstNodes( treeNodes );
    }
    ,expandFirstNodes : function ( treeNodes ) {
        var that = this;
        treeNodes.forEach( function ( node ) {
            if( node.isFirstNode ){
                that.zTreeObj.expandNode( node );
                if( node.isParent ){
                    that.expandFirstNodes( node.children );
                }
            }
        });
    }
    ,getStdCtgEvltItemList : function ( pageNo , isOpenToast ) {
        var that = this;
        var extraQueryString = 'stdCtgNo=' + that.stdCtgNo;
        that.grid.cancel();

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.getStdCtgEvltItemList( pageNo , false ); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_first_grid_add').on( 'click', function () {
            that.add();
        });

        $('#btn_first_grid_delete').on( 'click', function () {
            that.delete()
        });

        $('#btn_first_grid_cancel').on( 'click', function () {
            that.cancel();
        });

        $('#btn_first_grid_save').on( 'click', function () {
            that.save();
        });

    }
    ,add : function () {

        var that = this;
        var provider = this.grid.getDataSource();

        if ( !that.stdCtgNo ) { // 2,3 depth 표준분류카테고리가 아닌 경우
            alert(revEvltItemCateListMsg.canNotAddEvltItemMsg);
            return;
        }

        var evltItemNoList =  provider.getFieldValues( 'evltItemNo', 0, -1 );
        var pin = { evltItemNoList : evltItemNoList };
        var POP_DATA = {
            url: _baseUrl + 'goods/ReviewEvaluationItemMgmt.reviewEvaluationItemListPopup.do'
            , winName: 'revEvltItemListPopup'
            , title: '평가항목조회팝업'
            , _title: '평가항목조회팝업'
            , left: 20
            , top: 20
            , width: 520
            , height: 600
            , scrollbars: false
            , autoresize: false
        };
        popCommon( pin, POP_DATA, function ( e ) {
            var resultData  = JSON.parse(e.data);
            var grid = that.grid;
            grid.commit(true);

            resultData.forEach( function ( data ) {
                that.defaultHandler.onAdd( grid, {
                    evltItemNo : data.evltItemNo
                    , evltItemNm : data.evltItemNm
                    , sortSeq : undefined
                    , sysModId : undefined
                    , sysModDtm : undefined
                    , stdCtgNo : that.stdCtgNo
                });
            });
        });

    }
    ,delete : function () {
        var grid = this.grid;
        var checkedRows = grid.getCheckedRows();
        if ( !checkedRows.length ) {
            alert(revEvltItemCateListMsg.noSelectedEvltItemMsg);
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

        // 최대 저장 개수 제한 : 3개
        var rowState = provider.getAllStateRows();
        var rowCount = provider.getRowCount();

        if ( rowCount - rowState.deleted.length > 3 ) {
            alert(revEvltItemCateListMsg.maxEvltItemCntMsg);
            return false;
        }
        this.controller.doSave(this, grid.localId);

    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if( clickedCell.cellType === 'data' && clickedCell.column === 'evltItemNm') {
                var pin = { evltItemNo : rowData.evltItemNo };
                var POP_DATA = {
                    url: _baseUrl + 'goods/ReviewEvaluationItemMgmt.reviewEvaluationItemDetailView.do'
                    , winName: 'reviewEvaluationItemDetailView'
                    , title: '평가항목상세'
                    , _title: '평가항목상세'
                    , left: 20
                    , top: 20
                    , width: 484
                    , height: 390
                    , scrollbars: false
                    , autoresize: false
                };
                popCommon(pin, POP_DATA,function(e){});
            }
        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === "sortSeq" ) {
                if ( value === undefined ) {
                    error.level = "error";
                    error.message = revEvltItemCateListMsg.noSortSeqMsg;
                    return error;
                }
            }
        }
        ,afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.getStdCtgEvltItemList(0,false);
            }
        }
        ,onEditRowChanged: function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            var rowCnt = grid.getItemCount();
            var editRowIndex = itemIndex;
            if ( newValue === undefined || newValue === '' ) return;

            var rowData = "";
            for (var rowIndex = 0; rowIndex < rowCnt; rowIndex++) {
                if (rowIndex == editRowIndex) continue;

                rowData = grid.getValue(rowIndex, "sortSeq");
                if ( newValue === rowData ) {
                    alert(revEvltItemCateListMsg.duplicatedSortSegMsg);
                    grid.cancel();
                    break;
                }
            }
        }
    }
}