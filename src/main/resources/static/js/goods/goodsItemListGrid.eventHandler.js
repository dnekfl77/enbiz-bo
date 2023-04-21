var goodsItemListGridMsg = x2coMessage.getMessage({
    noStockQtyMsg : 'goodsItemMgmt.alert.msg.noStockQtyMsg',
    noChangeValueMsg : 'goodsItemMgmt.alert.msg.noChangeValueMsg'
});

$.namespace("goodsItemListGrid.eventhandler");
goodsItemListGrid.eventhandler = {
    init : function () {
        this.calendarSetting();
        this.gridSetting();
        this.bindButtonEvent();
    },
    calendarSetting : function(){
        var initFromAndToCalDate = recentlyCalenderData(30);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    gridSetting : function(){
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.setEditOptions({ commitLevel : 'error' });

        this.grid.addLookupSource({ id:"saleStatLookupSource", levels:2, keys: [['10','10'],['10','30'],['10','40']
                ,['20','10'],['20','20'],['20','30'],['20','40']
                ,['30','10'],['30','20'],['30','30'],['30','40']
                ,['40','40']]
            , values: ['판매중','일시중단','판매종료'
                ,'판매중','품절','일시중단','판매종료'
                ,'판매중','품절','일시중단','판매종료'
                ,'판매종료']});
    },
    bindButtonEvent : function(){

        var self = this;

        //====================== Search Part =======================//

        $('#_sch_date_st-button').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#startDate').val(),
                yyyymmdd2:$('#endDate').val(),
                fn:function(pin) {
                    $('#startDate').val(pin.yyyymmdd1);
                    $('#endDate').val(pin.yyyymmdd2);
                }
            });
        });

        $('.only-no').on("property change keyup paste input",function(){
            $(this).val($(this).val().replace(/[^0-9]/g,""));
        });

        $('#btn-stkqty').on('change', function(){
            if( this.checked ) {
                $('#stkQty').removeClass('disabled').prop('disabled',false);
            }else{
                $('#stkQty').addClass('disabled').prop('disabled',true);
                $('#stkQty').val('');
            }
        });

        $('#searchType').on('change', function () {
            $('#searchData').val('');
        });

        // 초기화
        $('#btn_init').click( function () {
            $('#goodsItemListGridForm')[0].reset();
            self.calendarSetting();
            $('#goodsItemListGridForm').find('input[type=hidden]').val('');
        });

        // 조회
        $('#btn_list').click(function() {
            self.onSearch(0,true);
        });

        com.x2commerce.common.Util.setupEnterSearch('goodsItemListGridForm','btn_list');

        // 담당 MD 조회
        $('#btn-regist-md').click(function(){
            self.callMdPopup();
        });

        // 담당 MD 초기화
        $('#btn-reset-md').click(function(){
            $('#userNm').val('');
            $('#userId').val('');
        });

        // 표준분류 조회
        $('#btn-regist-std-goods').click(function(){
            self.callStdGoodsPopup();
        });

        // 표준분류 초기화
        $('#btn-reset-std-goods').click(function(){
            $('#stdCtgNm').val('');
            $('#stdCtgNo').val('');
        });

        // 협력사 조회
        $('#btn-regist-entr').click(function(){
            self.callEntrPopup();
        });

        // 협력사 초기화
        $('#btn-reset-entr').click(function(){
            $('#entrNm').val('');
            $('#entrNo').val('');
        });

        //====================== Grid Part =======================//

        // 일괄변경
        $('#btn-itemList-change').click(function(){
            self.grid.commit();

            let checkedRows = self.grid.getCheckedRows();
            if ( !checkedRows.length ) {
                alert(_msg.noSelectedRowMsg);
                return;
            }

            let selectedUrl = '';
            let height = '';
            let changeValue = $('#change-value').val();

            if (changeValue.isEmpty()) {
                alert(goodsItemListGridMsg.noChangeValueMsg);
                return;
            }

            if(changeValue === 'saleStatCd'){
                selectedUrl = 'goods/GoodsItemMgmt.goodsItemSaleStateModifyView.do';
                height = 230;
            }else if(changeValue === 'stkQty'){
                selectedUrl = 'goods/GoodsItemMgmt.goodsItemStockQuantityModifyView.do';
                height = 230;
            }else if(changeValue === 'soutCausCd'){
                selectedUrl = 'goods/GoodsItemMgmt.goodsItemSoldOutNotificationYnModifyView.do';
                height = 290;
            }

            const popupGoodsItemCallBack = function(e) {
                let data = JSON.parse(e.data);
                let grid = goodsItemListGrid.eventhandler.grid;

                if(data.type === 'soutCausCd'){
                    // 단품품절알림 일괄변경
                    checkedRows.forEach(function (i) {
                        grid.setValue(i, "soutNotiYn", data.useYn);
                        if(data.useYn === 'Y') {
                            grid.setValue(i,'soutNotiStdQty',data.qty);
                        }
                    });

                }else if(data.type === 'stkQty'){
                    // 재고수량 일괄변경
                    checkedRows.forEach(function (i) {
                        if( grid.getValue(i,"stkMgrYn") === 'Y' ) {
                            grid.setValue(i, "stkQty", data.qty);
                        }
                    });

                }else if(data.type === 'saleStatCd'){
                    // 단품판매상태 일괄변경
                    checkedRows.forEach(function (i) {
                        if(grid.getValue(i,"hiddenItmSaleStatCd") === '40'){
                            return true;
                        }else if(grid.getValue(i,"hiddenItmSaleStatCd") === '10' && data.option === '20' ){
                            return true;
                        }
                        grid.setValue(i,"itmSaleStatCd",data.option);
                    });
                }
            };

            let pin = {};
            let POP_DATA = {
                url: _baseUrl + selectedUrl
                , winName: 'goodsItemPopup'
                , title: '단품 관리 팝업'
                , _title: '단품 관리 팝업'
                , left: 20
                , top: 20
                , width: 460
                , height: height
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, popupGoodsItemCallBack);
        });

        // 변경취소
        $('#btn-itemList-cancel').click(function() {
            self.defaultHandler.onCancel(self.grid);
        });

        // 저장
        $('#btn-itemList-save').click(function(){
            self.onSave();
        });
    },
    onSearch : function( pageIdx, isOpenToast ){

        var self = this;
        pageIdx = !pageIdx ? 0 : pageIdx;
        self.grid.cancel();

        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx,false);};

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());

        var extraQueryString = 'startDate=' + startDate + '&endDate=' + endDate;

        // 재고수량
        if( $('#btn-stkqty').is(":checked") ){
            if(typeof $('#stkQty').val() === "undefined" || $('#stkQty').val() < 0 ||  $('#stkQty').val().trim() === ''){
                alert(goodsItemListGridMsg.noStockQtyMsg);
                return;
            }
            extraQueryString+='&stockCheck=Y';
        }

        // 품절 알림
        if( $('#btn-soutNotiStdQty').is(":checked") ){
            extraQueryString+='&soutNotiStdQtyCheck=Y';
        }

        // 검색조건
        var searchType = $('#searchType').val();
        var searchData = $('#searchData').val().trim();
        if( searchType === 'goodsNo' ){
            extraQueryString+='&goodsNm='+'&goodsNo='+searchData;
        }else{
            extraQueryString+='&goodsNo='+'&goodsNm='+searchData;
        }
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,null,isOpenToast);
    },
    onSave : function() {
        var self = this;
        var grid = this.grid;
        grid.commit(true);
        self.controller.doSave(self, grid.localId);
    },
    gridEvent : {
        onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
            var error = {};
            var rowData = grid.getDataSource().getJsonRow(dataRow);
            if ( column.fieldName === "stkQty" ) {
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = '재고수량' + _msg.requiredCheckMessage;
                    return error;
                }
            } else if ( column.fieldName === "dispSeq" ) {
                if ( value === undefined || value === '' ) {
                    error.level = "error";
                    error.message = '전시순서' + _msg.requiredCheckMessage;
                    return error;
                }
            } else if ( column.fieldName === "soutNotiStdQty" ) {
                if ( rowData.soutNotiYn === 'Y' && ( value === undefined || value === '')) {
                    error.level = "error";
                    error.message = '품절알림기준수량' + _msg.requiredCheckMessage;
                    return error;
                }
            }
        },
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            if(data.succeeded){
                openToast(data.message);
                eventHandler.onSearch(0, false);
            }else{
                alert(data.message);
            }
        },
        onCellDblClicked : function ( grid, clickedCell ) {
            if( clickedCell.cellType === 'header' ) return;
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if(clickedCell.column === 'goodsNo' || clickedCell.column === 'goodsNm' ) {
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
    },
    callMdPopup : function(){
        var popupMdListCallback = function(e) {
            var mdList = JSON.parse(e.data);
            $('#userId').val(mdList[0].userId);
            $('#userNm').val(mdList[0].userNm);
        }

        var pin = {
            argSelectType: '1'
            , argWorkStatCd: '01'
            , argUseYn: 'Y'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
            , winName: 'mdListPopup'
            , title: 'MD 조회 팝업'
            , _title: 'MD 조회 팝업'
            , left: 20
            , top: 20
            , width: 690
            , height: 600
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, popupMdListCallback);
    },
    callStdGoodsPopup : function(){
        var popupPrStdCtgListCallback = function(e) {
            var stdGoods = JSON.parse(e.data);
            $('#stdCtgNm').val(stdGoods.stdCtgNm);
            $('#stdCtgNo').val(stdGoods.stdCtgNo);
        }

        var pin = {};
        var POP_DATA = {
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
        popCommon(pin, POP_DATA, popupPrStdCtgListCallback);
    },
    callEntrPopup : function(){

        var popupEtEntrListCallback = function(e) {
            var entrList = JSON.parse(e.data);
            $('#entrNo').val(entrList[0].entrNo);
            $('#entrNm').val(entrList[0].entrNm);
        }

        var pin = {
            argSelectType: '1'
            , argEntrGbCd: ''
            , argTrdStatCd: ''
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
            , winName: 'etEntrListPopup'
            , title: '협력사조회'
            , _title: '협력사조회'
            , left: 20
            , top: 20
            , width: 741
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, popupEtEntrListCallback);
    }
};
