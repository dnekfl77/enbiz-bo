$.namespace("sysNtcGrid.eventhandler")

sysNtcGrid.eventhandler = {
    init: function () {
        this.calendarInit();
    },

    calendarInit: function () {
        var initStrAndEndDtm = recentlyCalenderData(7);
        $('#strDtm').val(initStrAndEndDtm[0]);
        $('#endDtm').val(initStrAndEndDtm[1]);
    },

    bindButtonEvent: function () {
        const _self = this;

        $('#btn_init').click(function () {
            $('#sysNtcSearchForm')[0].reset();
            _self.calendarInit();
            $('#sysRegId').val('');
        });

        $('#btn_search').click(function () {
            _self.onSearch(0);
        });

        $("#sysNtcSearchForm").keypress(function (e) {
            if (e.which == 13) {
                $('#btn_search').click();
                window.event.returnValue = false;
            }
        });

        // 달력 보기
        $("#showCalender").on("click", _self.showCalendar);

        // 등록 버튼 이벤트
        $("#btn_grid_reg").on("click", function () {
            const popupWindowFeatures = "width=800px, height=880px, menubar=no, locationbar=no" +
                ", resizable=yes, scrollbars=yes, status=no, navigation=no"
            window.open("/system/systemNoticeMgmt.systemNoticeSaveView.do", "sysNtcReg", popupWindowFeatures);
        });


        $('#btn_reg_user_pop').on('click', function(){
            sysNtcGrid.eventhandler.sysRegUsrPop();
        });

        $('#btn_reset_user_pop').on('click',function(){
            $('#sysRegNm').val('');
            $('#sysRegId').val('');
        })

    },
    onSearch: function (pageIdx) {
        $("form input:disabled, select:disabled").removeAttr("disabled");

        var self = this;
        var grid = self.grid;

        if(!self.validator()) {
            return false;
        }
        grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;

        var pagingFunc = function (pageIdx) {
            return self.onSearch(pageIdx);
        };

        self.controller.doQuery(self, "", pageIdx, pagingFunc);

        $("#strDtm").attr("disabled", true);
        $("#endDtm").attr("disabled", true);
        $("#sysRegId").attr("disabled", true);

    },
    showCalendar: function () {
        var date1 = $('#strDtm').val();
        var date2 = $('#endDtm').val();

        showCalendar({
            format: "yyyy-MM-dd",
            yyyymmdd1: date1,
            yyyymmdd2: date2,
            type: "A",
            max_term: 30,
            fn: function (pin) {
                $("#strDtm").val(pin.yyyymmdd1);
                $("#endDtm").val(pin.yyyymmdd2);

            }
        });
    },
    gridEvent: {
        onCellClicked(grid, clickData) {
            var strColumnKey = clickData.column;
            var bbcNo = grid.getValue(clickData.itemIndex, "bbcNo");

            if (strColumnKey == "title" && clickData.cellType == "data") {
                var pin = {bbcNo: bbcNo, callback_fn: "this.popupNotiMsgCallback", scrId: ''};
                var POP_DATA = {
                    url: '/system/systemNoticeMgmt.systemNoticeSaveView.do'
                    , winName: 'sysNtcReg'
                    , title: ''
                    , _title: ''
                    , left: 20
                    , top: 20
                    , width: 800
                    , height: 880
                    , scrollbars: false
                    , autoresize: false
                }
                popCommon(pin, POP_DATA, this.popupNotiMsgCallback);
            }
        }
    },

    sysRegUsrPop : function (response) {
        const argSelectType = "1";
        const argWorkStatCd = "01";
        const argUseYn = "Y";

        const pin = {
            argSelectType: argSelectType
            , argWorkStatCd: argWorkStatCd
            , argUseYn: argUseYn
        };
        var POP_DATA = {
            url: '/popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자조회'
            , _title: '사용자조회'
            , left: 20
            , top: 20
            , width: 800
            , height: 700
            , scrollbars: false
            , autoresize: false
        }
        popCommon(pin, POP_DATA, popupUserListCallback);

        function popupUserListCallback (e) {
            if (e.data != null && e.data != '') {
                var resultData = JSON.parse(e.data);
                if (resultData.length = 1) {
                    var setRegUserData = resultData[0];
                    $("#sysRegId").val(setRegUserData.userId);
                    $("#sysRegNm").val(setRegUserData.userNm);
                }
            }
        }
    },
    validator: function () {
        // 제목 길이 체크
        if ($('#title').val().length > 100) {
            alert(msg._msgTitleLimitLength);
            return false;
        }
        return true;
    }
}