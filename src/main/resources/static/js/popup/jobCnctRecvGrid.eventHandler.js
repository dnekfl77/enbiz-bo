$.namespace("jobCnctRecvGrid.eventhandler")

jobCnctRecvGrid.eventhandler = {
    init: function () {
        this.calendarInit();
		this.onSearch(0);
    },

    calendarInit: function () {
        var initStrAndEndDtm = recentlyCalenderData(0);
        $('#recvSearchStartDtm').val(initStrAndEndDtm[0]);
        $('#recvSearchEndDtm').val(initStrAndEndDtm[1]);
    },

    bindButtonEvent: function () {
        const _self = this;

        $('#recv_btn_init').click(function () {
            $('#jobCnctRecvForm')[0].reset();
            _self.calendarInit();
            $('#recvSearchUserId').val('');
            $('#recvSearchUserNm').val('');
        });

        $('#recv_btn_search').click(function () {
            _self.onSearch(0);
        });

        $("#jobCnctRecvForm").keypress(function (e) {
            if (e.which == 13) {
                $('#btn_search').click();
                window.event.returnValue = false;
            }
        });

        // 달력 보기
        $("#recvShowCalender").on("click", _self.showCalendar);
		//발신자 검색
        $('#recv_btn_open_user_pop').on('click', function(){
            jobCnctRecvGrid.eventhandler.sysRegUsrPop();
        });
		//발신자 초기화
        $('#recv_btn_reset_user_pop').on('click',function(){
            $('#recvSearchUserId').val('');
            $('#recvSearchUserNm').val('');
        })

    },
    onSearch: function (pageIdx) {
        $("#recvSearchStartDtm").attr("disabled", false);
        $("#recvSearchEndDtm").attr("disabled", false);
        $("#recvSearchUserId").attr("disabled", false);
        $("#recvSearchUserNm").attr("disabled", false);

        var self = this;
        var grid = self.grid;

        if(!self.validator()) {
			self.setDisabled();
            return false;
        }

        grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;

        var pagingFunc = function (pageIdx) {
            return self.onSearch(pageIdx);
        };

		this.controller.doQuery(this, '', pageIdx, pagingFunc);
		self.setDisabled();
		grid.resetSize();
    },
	//검색을 위해 disable 을 false 했던 설정들을 초기화
    setDisabled: function () {
        $("#recvSearchStartDtm").attr("disabled", true);
        $("#recvSearchEndDtm").attr("disabled", true);
        $("#recvSearchUserId").attr("disabled", true);
        $("#recvSearchUserNm").attr("disabled", true);
	},
    showCalendar: function () {
        var date1 = $('#recvSearchStartDtm').val();
        var date2 = $('#recvSearchEndDtm').val();

        showCalendar({
            format: "yyyy-MM-dd",
            yyyymmdd1: date1,
            yyyymmdd2: date2,
            type: "A",
            max_term: 30,
            fn: function (pin) {
                $("#recvSearchStartDtm").val(pin.yyyymmdd1);
                $("#recvSearchEndDtm").val(pin.yyyymmdd2);

            }
        });
    },
    gridEvent: {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
			$("#recvListCnt").text("("+data.payloads.length+")");
        },	
        onCellDblClicked(grid, clickData) {
            var strColumnKey = clickData.column;
            var jobCnctNo = grid.getValue(clickData.itemIndex, "jobCnctNo");
            if (clickData.cellType == "data") {
                var pin = {
					jobCnctTypeCd:"01"
					, jobCnctNo: jobCnctNo
					, callback_fn: "this.popupMsgCallback"
				};
                var POP_DATA = {
                    url: '/popup/JobContact.jobContactDetailInfoPopup.do'
                    , winName: 'jobContactDetailInfoPopup'
                    , title: ''
                    , _title: ''
                    , left: 20
                    , top: 20
                    , width: 1000
                    , height: 500
                    , scrollbars: false
                    , autoresize: false
                }
                popCommon(pin, POP_DATA, this.popupMsgCallback);
            }
        },
        popupMsgCallback : function(e) {
            console.log("callback :: ", e.data);
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
                    var searchUserData = resultData[0];
                    $("#recvSearchUserId").val(searchUserData.userId);
                    $("#recvSearchUserNm").val(searchUserData.userNm);
                }
            }
        }
    },
    validator: function () {
		//기간 체크
		if ($('#recvSearchStartDtm').val().trim() == "" || $('#recvSearchEndDtm').val().trim() == "") {
            alert(jobCnctRecvValidMsg._dtmEmpty);
			return false;
		}
        // 제목 길이 체크
        if ($('#recvTitle').val().length > 100) {
            alert(jobCnctRecvValidMsg._titleLimitLength);
            return false;
        }

        return true;
    }
}