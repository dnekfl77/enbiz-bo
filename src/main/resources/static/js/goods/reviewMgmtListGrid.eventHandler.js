var reviewMgmtMsg = x2coMessage.getMessage({
    noSelectedReviewMsg : 'reviewMgmt.alert.msg.noSelectedReviewMsg'
});

$.namespace('reviewMgmtListGrid.eventhandler');
reviewMgmtListGrid.eventhandler = {
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

        this.grid.editOptions.editable = false;

        // 전시상태가 '전시불가'인 경우 체크박스 비활성화
        this.grid.setCheckableExpression("values['revDispStatCd'] <> '30'", true);
    }
    ,calenderSetting : function () {
        var fromAndToCalDate = recentlyCalenderData(7);
        $('#revWrtStartDtm').val(fromAndToCalDate[0]);
        $('#revWrtEndDtm').val(fromAndToCalDate[1]);
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_calender').on('click', function () {
            that.callCalender();
        });

        $('#btn_call_mbr_popup').on('click', function () {
            that.callMbrPopup();
        });

        $('#btn_reset_mbr_popup').on('click', function () {
            $('#loginId, #mbrNm').val('');
        });

        $('#btn_reset').on('click', function () {
            that.onReset();
        });

        $('#btn_search').on('click', function () {
            that.onSearch(0,true);
        });

        // 전시처리
        $('#btn_display').on('click', function () {
            that.changeRevDisplayYn('20');
        });

        // 전시안함처리
        $('#btn_hide').on('click', function () {
            that.changeRevDisplayYn('10');
        });

    }
    ,callCalender : function () {
        showCalendar({
            type : 'A',
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#revWrtStartDtm').val(),
            yyyymmdd2 : $('#revWrtEndDtm').val(),
            fn:function(pin) {
                $('#revWrtStartDtm').val(pin.yyyymmdd1);
                $('#revWrtEndDtm').val(pin.yyyymmdd2);
            }
        });
    }
    ,callMbrPopup : function () {
        var pin = { argSelectType: '1', argMbrStatCd: '' };
        var POP_DATA = {
            url: _baseUrl + 'popup/memberSearch.memberSearchPopup.do'
            , winName: 'mbrListPopup'
            , title: '회원 조회 팝업'
            , _title: '회원 조회 팝업'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function(e) {
            var returnValue = JSON.parse(e.data);
            $('#loginId').val(returnValue[0].loginId);
            $('#mbrNm').val(returnValue[0].mbrNm);
        });
    }
    ,onReset : function () {
        $('#reviewMgmtForm')[0].reset();
        this.calenderSetting();
    }
    ,onSearch : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.onSearch(pageNo, false); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
    ,changeRevDisplayYn : function ( revDispStatCd ) {

        var that = this;
        var grid = this.grid;
        var provider = grid.getDataSource();

        var checkedItems = grid.getCheckedRows();
        if ( !checkedItems.length ) {
            alert(reviewMgmtMsg.noSelectedReviewMsg);
            return;
        }

        var revNoList = [], revDispStatCdList = [];
        checkedItems.forEach( function ( item ) {
            var data = provider.getJsonRow( item );
            revNoList.push(data.revNo);
            revDispStatCdList.push(data.revDispStatCd);
        });

        if ( revDispStatCdList.includes(revDispStatCd) ){
            alert('선택된 리뷰 중 전시상태가 이미 [' + _revDispStatCdList[revDispStatCd] + '] 상태인 리뷰가 있습니다.\n다시 선택해주세요.');
            return;
        }

        if ( revDispStatCdList.includes('30') ) return; // 전시불가 선택 방지
        if ( !confirm("선택된 리뷰의 전시상태를 [" + _revDispStatCdList[revDispStatCd] + '] 상태로 변경하시겠습니까?') ) return;

        var param = {};
        param.revNoList = revNoList;
        param.revDispStatCd = revDispStatCd;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/ReviewMgmt.modifyMultipleReviewsDisplayState.do"
            , param
            , function ( data ) {
                if( data.succeeded ){
                    that.onSearch(0,false);
                }
            }, null, null, true
        );
    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            if( clickedCell.cellType === 'header' ) return;
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if ( clickedCell.column === 'goodsNo' || clickedCell.column === 'goodsNm' ) {
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

            } else if ( clickedCell.column === 'revNo' || clickedCell.column === 'revCont' ) {

                var pin = { revNo: rowData.revNo };
                var POP_DATA = {
                    url: _baseUrl + 'goods/ReviewMgmt.reviewDetailView.do'
                    , winName: 'reviewDetailPopup'
                    , title: '리뷰상세팝업'
                    , _title: '리뷰상세팝업'
                    , left: 0
                    , top: 0
                    , width: 1500
                    , height: 1300
                    , scrollbars: false
                    , autoresize: false
                };
                popCommon(pin, POP_DATA,function(e){});
            }
        }
    }
}