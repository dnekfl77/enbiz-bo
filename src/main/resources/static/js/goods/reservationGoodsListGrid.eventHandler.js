var reservationGoodsListMsg = x2coMessage.getMessage( {
    canNotChangesaleStatCdMssg   : 'reservationGoodsMgmt.alert.msg.canNotChangesaleStatCdMssg',
    noSaleMethCdForSearchMsg      : 'reservationGoodsMgmt.alert.msg.noSaleMethCdForSearchMsg',
});

$.namespace("reservationGoodsListGrid.eventhandler");
reservationGoodsListGrid.eventhandler = {
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
    gridSetting : function() {
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({itemIndex: itemIndex});
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) return 'rg-trcol_active';
        });

        this.grid.setEditOptions({ editable : false });
    },
    bindButtonEvent : function(){

        var self = this;

        // 초기화
        $('#btn_init').click(function() {
            $('#reservationGoodsListForm')[0].reset();
            $('#reservationGoodsListForm').find('input[type=hidden]').val('');
            self.calendarSetting();
        });

        // 조회
        $('#btn_list').click(function() {

            if ($('#saleMethCd').val().isEmpty()) {
                alert(reservationGoodsListMsg.noSaleMethCdForSearchMsg);
                return;
            }

            self.onSearch(0, true);
        });

        // 담당 MD 조회
        $('#btn-regist-md').click(function(){
            self.callMdPopup();
        });

        // 담당 MD 초기화
        $('#btn-reset-md').click(function(){
            $('#userNm').val('');
            $('#userId').val('');
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

        // 브랜드 조회
        $('#btn-regist-brand').click(function(){
            self.callBrandPopup();
        });

        // 브랜드 초기화
        $('#btn-reset-brand').click(function(){
            $('#brandNm').val('');
            $('#brandNo').val('');
        });

        com.x2commerce.common.Util.setupEnterSearch('reservationGoodsListForm','btn_list');

        // 달력
        $('#_sch_date_st-button').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#startDate').val(),
                yyyymmdd2:$('#endDate').val(),
                max_term:365,
                fn:function(pin) {
                    $('#startDate').val(pin.yyyymmdd1);
                    $('#endDate').val(pin.yyyymmdd2);
                }
            });
        });

        // 예약상품 일괄등록/해제
        $('#btn-rsv-change').click(function(){
            self.callReservationGoodsModifyPopup();
        });

        //예약상품 이력조회
        $('#btn-rsv-search').click(function() {
            self.callReservationGoodsHistoryPopup();
        });
    },
    onSearch : function(pageIdx, isOpenToast){
        var self = this;
        pageIdx = !pageIdx ? 0 : pageIdx;
        self.grid.cancel();

        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};

        var extraQueryString;
        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        extraQueryString = 'startDate=' + startDate + '&endDate=' + endDate;

        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc, null, isOpenToast);
    },
    callReservationGoodsModifyPopup : function () {

        var self = this;
        var grid = self.grid;
        var provider = grid.getDataSource();
        var goodsNoList = [], saleMethCd;

        // 선택된 행이 없는 경우
        let checkedRows = grid.getCheckedRows();
        if ( !checkedRows.length ) {
            alert(_msg.noSelectedRowMsg);
            return;
        }

        for( let i = 0; i < checkedRows.length; i++) {
            let rowData = provider.getJsonRow(checkedRows[i]);
            if (rowData.saleStatCd === '40') {
                alert(reservationGoodsListMsg.canNotChangesaleStatCdMssg);
                return;
            }
            goodsNoList.push(rowData.goodsNo);
            saleMethCd = rowData.saleMethCd;
        }

        var pin = {
            goodsNoList : goodsNoList,
            saleMethCd : saleMethCd
        };

        var POP_DATA = {
            url: _baseUrl + 'goods/ReservationGoodsMgmt.reservationGoodsModifyView.do'
            , winName: 'reservationGoodsModifyView'
            , title: '예약상품 일괄등록/해제 팝업'
            , _title: '예약상품 일괄등록/해제 팝업'
            , left: 20
            , top: 20
            , width: 800
            , height: saleMethCd === '20' ? 290 : 365
            , scrollbars: true
            , autoresize: true
        };
        popCommon(pin, POP_DATA, function (e) {
            if(e.data === 'succeeded'){
                self.onSearch(0, true);
            }
        });
    },
    callReservationGoodsHistoryPopup : function () {

        var self = this;
        var dataRow = self.grid.getCurrent().dataRow;
        if( dataRow === -1 ) {
            alert(_msg.noSelectedRowMsg);
            return;
        }
        var goodsNo = self.grid.getValue(dataRow, "goodsNo");
        popCommon({ goodsNo : goodsNo }, {
            url: _baseUrl + 'goods/ReservationGoodsMgmt.reservationGoodsHistoryView.do'
            , winName: 'reservationSaleGoodsChange'
            , title: '예약상품이력조회'
            , _title: '예약상품이력조회'
            , left: 20
            , top: 20
            , width: 1150
            , height: 610
            , scrollbars: false
            , autoresize: false
        });
    },
    gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            if( clickedCell.cellType === 'header' ) return;
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if(clickedCell.column === 'goodsNo' || clickedCell.column === 'goodsNm') {
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
    callBrandPopup : function(){
        var popupBrandListCallback = function(e) {
            var brandList = JSON.parse(e.data);
            $('#brandNo').val(brandList[0].brandNo);
            $('#brandNm').val(brandList[0].brandNm);
        };
        var pin = {
            argSelectType: '1'
        };
        var POP_DATA = {
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
        popCommon(pin, POP_DATA, popupBrandListCallback);
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
