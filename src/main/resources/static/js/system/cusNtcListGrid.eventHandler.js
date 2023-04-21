$.namespace("cusNtcListGrid.eventhandler");
cusNtcListGrid.eventhandler = {
    init : function () {
        this.calenderSetting();
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
        this.grid.setEditOptions({ editable : false });
    }
    ,calenderSetting : function () {
        var fromAndToCalDate = recentlyCalenderData(30);
        $('#bbStrStartDtm').val(fromAndToCalDate[0]);
        $('#bbStrEndDtm').val(fromAndToCalDate[1]);
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_calender').on('click', function () {
            that.callCalender();
        });

        $('#btn_call_user_popup').on( 'click', function () {
            that.callUserPopup();
        });

        $('#btn_reset_user_popup').on( 'click', function () {
            $('#ntcRegId, #ntcRegNm').val('');
        });

        $('#btn_reset').on('click', function () {
            that.reset();
        });

        $('#btn_search').on('click', function () {
            that.onSearch(0,true);
        });

        $('#btn_call_cus_ntc_regist_popup').on('click', function () {
            that.callCusNtcInfoPopup('');
        });

        com.x2commerce.common.Util.setupEnterSearch('cusNtcMgmtForm','btn_search');

    }
    ,reset : function () {
        $('#cusNtcMgmtForm')[0].reset();
        this.calenderSetting();
    }
    ,onSearch : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.onSearch( pageNo ); };

        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, false ,isOpenToast );
    }
    ,callCalender : function () {
        showCalendar({
            type : 'A',
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#bbStrStartDtm').val(),
            yyyymmdd2 : $('#bbStrEndDtm').val(),
            fn:function(pin) {
                $('#bbStrStartDtm').val(pin.yyyymmdd1);
                $('#bbStrEndDtm').val(pin.yyyymmdd2);
            }
        });
    }
    ,callUserPopup : function () {
        var pin = {
            argSelectType: '1'      // 결과값 갯수
            , argWorkStatCd: '01'   // 재직중
            , argUseYn: 'Y'         // 사용
        };

        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자조회'
            , _title: '사용자조회'
            , left: 20
            , top: 20
            , width: 810
            , height: 700
            , scrollbars: false
            , autoresize: false
        };

        popCommon(pin, POP_DATA, function (e) {
            var returnValue = JSON.parse(e.data);
            $('#ntcRegId').val(returnValue[0].userId);
            $('#ntcRegNm').val(returnValue[0].userNm);
        });
    }
    ,callCusNtcInfoPopup : function ( ntcNo ) {

        var pin = { ntcNo: ntcNo };
        var POP_DATA = {
            url: _baseUrl + 'system/customerNoticeMgmt.customerNoticeSaveView.do'
            , winName: 'callCusNtcInfoPopup'
            , title: '고객공지사항등록/수정팝업'
            , _title: '고객공지사항등록/수정팝업'
            , left: 20
            , top: 20
            , width: 900
            , height: 700
            , scrollbars: false
            , autoresize: false
        };

        popCommon(pin, POP_DATA,function(e){});
    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            if ( clickedCell.cellType !== 'data') return;
            if ( clickedCell.column === 'ntcNo' || clickedCell.column === 'ntcTitleNm' ) {
                var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
                cusNtcListGrid.eventhandler.callCusNtcInfoPopup(rowData.ntcNo);
            }
        }
    }
}