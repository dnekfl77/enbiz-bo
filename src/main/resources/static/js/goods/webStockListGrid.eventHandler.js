var webStockListMsg = x2coMessage.getMessage({
    noTargetStkQtyMsg : 'webStockMgmt.alert.msg.noTargetStkQtyMsg'
    , noSelectedGoodsForUpdateMsg : 'webStockMgmt.alert.msg.noSelectedGoodsForUpdateMsg'
    , noStkQtyMsg : 'webStockMgmt.alert.msg.noStkQtyMsg'
});

$.namespace("webStockListGrid.eventhandler");
webStockListGrid.eventhandler = {
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

        // 팝업 호출
        $('#btn_call_entr_popup ,#btn_call_stdCtg_popup ,#btn_call_brand_popup ,#btn_call_md_popup').on( 'click', function () {
            that.callPopup($(this).attr('data-index'));
        });

        // 팝업 초기화
        $('#btn_reset_entr_popup ,#btn_reset_stdCtg_popup ,#btn_reset_brand_popup ,#btn_reset_md_popup').on( 'click', function () {
            $(this).siblings('input').val('');
        });

        $('#btn_reset').on( 'click', function () { that.onReset(); });                               // 초기화
        $('#btn_search').on( 'click', function () { that.onSearch(0, true); });    // 조회
        $('#btn_update').on( 'click', function () { that.onUpdate(); });                             // 일괄변경
        $('#btn_cancel').on( 'click', function () { that.onCancel(); });                             // 변경취소
        $('#btn_save').on( 'click', function () { that.onSave(); });                                 // 저장

        com.x2commerce.common.Util.setupEnterSearch('webStockListForm','btn_search');

        $('.only-no').on('propertychange change keyup paste input',function(){
            let thisVal = $(this).val();
            let reg = /[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            if(reg.test(thisVal)){
                $(this).val(thisVal.replace(reg,""));
            }
        });

    }
    ,onReset : function () {
        $('#webStockListForm')[0].reset();
        $('#webStockListForm').children().find('input[type=hidden]').val('');
    }
    ,onSearch : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        this.setGoodsNoList();
        this.setStkQtyRange();

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.onSearch(pageNo, false); };

        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );

    }
    ,setGoodsNoList : function () {
        var goodsNo = $('#goodsNo').val().trim();
        var goodsNoList = ( goodsNo === '' ) ? '' : goodsNo.replace(/\n*$/g, '').split('\n');
        $('#goodsNoList').val(goodsNoList);
    }
    ,setStkQtyRange : function () {
        var stkQtyRange = $('#stkQtyRange').val();
        $('#minStkQty').val(stkQtyRange.split('/')[0]);
        $('#maxStkQty').val(stkQtyRange.split('/')[1]);
    }
    ,onUpdate : function () {

        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        var value = $('#targetStkQty').val().trim();
        if( !value ) {
            alert(webStockListMsg.noTargetStkQtyMsg);
            return;
        }

        var checkedItems = grid.getCheckedRows();
        if ( !checkedItems.length ) {
            alert(webStockListMsg.noSelectedGoodsForUpdateMsg);
            return;
        }

        if ( !confirm("선택된 단품의 재고수량을 " + value + '으로 일괄 변경하시겠습니까?') ) return;
        checkedItems.forEach( function ( rowNum ) {
            provider.setValue( rowNum, 'stkQty', value );
        });

    }
    ,onCancel : function () {
        var grid = this.grid;
        this.defaultHandler.onCancel( grid );
    }
    ,onSave : function () {
        var grid = this.grid;
        var provider = grid.getDataSource();
        grid.commit(true);

        // var rowState = provider.getAllStateRows();
        // var itemIndexList = grid.getItemsOfRows(rowState.updated);
        // var errList = grid.validateCells( itemIndexList, false);
        // if ( errList ) {
        //     alert( errList[0].message );
        //     return;
        // }

        this.controller.doSave(this, grid.localId);
    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            if (clickedCell.cellType === 'header') return;
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if( clickedCell.column === 'goodsNo' || clickedCell.column === 'goodsNm' ) {

                var pin = { type: 'R', goodsNo: rowData.goodsNo };
                var POP_DATA = {
                    url: _baseUrl + 'goods/GoodsCommon.goodsView.do'
                    , winName: 'goodsDetailPopup'
                    , title: '상품상세팝업'
                    , _title: '상품상세팝업'
                    , left: 20
                    , top: 20
                    , width: 1500
                    , height: 700
                    , scrollbars: false
                    , autoresize: false
                };
                popCommon(pin, POP_DATA,function(e){});
            }
        }
        ,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            if ( column.fieldName === "stkQty" ) {
                if ( value === undefined ) {
                    error.level = "error";
                    error.message = webStockListMsg.noStkQtyMsg;
                    return error;
                }
            }
        }
        ,afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            if ( data.succeeded ){
                openToast(data.message);
                eventHandler.onSearch(0, false);
                $('#targetStkQty').val('');
            } else {
                alert( data.message );
            }
        }
    }
    ,callPopup : function ( index ) {

        var pin, POP_DATA, callBackFnc;

        switch ( index ) {
            case '1':
                pin = { argSelectType   : '1'};
                POP_DATA = {
                    url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
                    , winName: 'etEntrListPopup'
                    , title: '협력사조회팝업'
                    , _title: '협력사조회팝업'
                    , left: 20
                    , top: 20
                    , width: 1000
                    , height: 700
                    , scrollbars: false
                    , autoresize: false
                };
                callBackFnc = function ( e ) {
                    var returnValue = JSON.parse(e.data);
                    $('#entrNo').val(returnValue[0].entrNo);
                    $('#entrNm').val(returnValue[0].entrNm);
                }
                break;
            case '2':
                pin = {};
                POP_DATA = {
                    url: _baseUrl + 'popup/standardCategory.prStdCtgListPopup.do'
                    , winName: 'prStdCtgListPopup'
                    , title: '상품표준분류팝업'
                    , _title: '상품표준분류팝업'
                    , left: 20
                    , top: 20
                    , width: 400
                    , height: 500
                    , scrollbars: false
                    , autoresize: false
                };
                callBackFnc = function ( e ) {
                    var returnValue = JSON.parse(e.data);
                    $('#stdCtgHierarchy').val(returnValue.hierarchyText);
                    $('#stdCtgNo').val(returnValue.stdCtgNo);
                }
                break;
            case '3':
                pin = { argSelectType: '1'};
                POP_DATA = {
                    url: _baseUrl + 'popup/brandMgmt.brandListPopup.do'
                    , winName: 'brandListPopup'
                    , title: '브랜드조회팝업'
                    , _title: '브랜드조회팝업'
                    , left: 20
                    , top: 20
                    , width: 790
                    , height: 590
                    , scrollbars: false
                    , autoresize: false
                };
                callBackFnc = function(e){
                    var returnValue = JSON.parse(e.data);
                    $('#brandNm').val(returnValue[0].brandNm);
                    $('#brandNo').val(returnValue[0].brandNo);
                }
                break;
            case '4':
                pin = {
                    argSelectType: '1'
                    , argWorkStatCd: '01'
                    , argUseYn: 'Y'
                };
                POP_DATA = {
                    url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
                    , winName: 'mdListPopup'
                    , title: 'MD조회팝업'
                    , _title: 'MD조회팝업'
                    , left: 20
                    , top: 20
                    , width: 690
                    , height: 600
                    , scrollbars: false
                    , autoresize: false
                };
                callBackFnc = function(e) {
                    var returnValue = JSON.parse(e.data);
                    $('#mdId').val(returnValue[0].userId);
                }
                break;
        }
        popCommon(pin, POP_DATA, callBackFnc);
    }
}