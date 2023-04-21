$.namespace("jobCnctSendGrid.eventhandler")

jobCnctSendGrid.eventhandler = {
    init: function () {
        this.calendarInit();
		this.onSearch(0);
    },

    calendarInit: function () {
        var initStrAndEndDtm = recentlyCalenderData(0);
        $('#sendSearchStartDtm').val(initStrAndEndDtm[0]);
        $('#sendSearchEndDtm').val(initStrAndEndDtm[1]);
    },

    bindButtonEvent: function () {
        const _self = this;

        $('#send_btn_init').click(function () {
            $('#jobCnctSendForm')[0].reset();
            _self.calendarInit();
            $('#sendSearchUserId').val('');
            $('#sendSearchUserNm').val('');
        });

        $('#send_btn_search').click(function () {
            _self.onSearch(0);
        });

        $("#jobCnctSendForm").keypress(function (e) {
            if (e.which == 13) {
                $('#btn_search').click();
                window.event.returnValue = false;
            }
        });

        // 달력 보기
        $("#sendShowCalender").on("click", _self.showCalendar);
		//발신자 검색
        $('#send_btn_open_user_pop').on('click', function(){
            jobCnctSendGrid.eventhandler.sysRegUsrPop();
        });
		//발신자 초기화
        $('#send_btn_reset_user_pop').on('click',function(){
            $('#sendSearchUserId').val('');
            $('#sendSearchUserNm').val('');
        })

    },
    onSearch: function (pageIdx) {
        $("#sendSearchStartDtm").attr("disabled", false);
        $("#sendSearchEndDtm").attr("disabled", false);
        $("#sendSearchUserId").attr("disabled", false);
        $("#sendSearchUserNm").attr("disabled", false);

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
        $("#sendSearchStartDtm").attr("disabled", true);
        $("#sendSearchEndDtm").attr("disabled", true);
		$("#sendSearchUserId").attr("disabled", true);
        $("#sendSearchUserNm").attr("disabled", true);	
	},
    showCalendar: function () {
	console.log("send showCalendar");
        var date1 = $('#sendSearchStartDtm').val();
        var date2 = $('#sendSearchEndDtm').val();

        showCalendar({
            format: "yyyy-MM-dd",
            yyyymmdd1: date1,
            yyyymmdd2: date2,
            type: "A",
            max_term: 360,
            fn: function (pin) {
                $("#sendSearchStartDtm").val(pin.yyyymmdd1);
                $("#sendSearchEndDtm").val(pin.yyyymmdd2);

            }
        });
    },
    gridEvent: {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
			$("#sendListCnt").text("("+data.payloads.length+")");
			grid.groupBy(["title"], false);				//행그룹핑([fieldNames], sorting)
			grid.setRowGroup({
				mergeMode:true
				, expandedAdornments: 'none'		//Group정보 표시위치(footer, header, both, summary, none)
				, mergeExpanderVisibility: 'none'	//확장정보 포함 여부(default, none)
			});
        },		
        onCellDblClicked(grid, clickData) {
            var strColumnKey = clickData.column;
            var jobCnctNo = grid.getValue(clickData.itemIndex, "jobCnctNo");
            var recvmnId = grid.getValue(clickData.itemIndex, "recvmnId");
			//title 은 행병합이 이루어지는 컬럼이므로 클릭 불가능하도록 처리함.
            if (strColumnKey != "title" && clickData.cellType == "data") {
                var pin = {
					jobCnctTypeCd:"02"
					, jobCnctNo: jobCnctNo
					, recvmnId: recvmnId
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
                    $("#sendSearchUserId").val(searchUserData.userId);
                    $("#sendSearchUserNm").val(searchUserData.userNm);
                }
            }
        }
    },
    validator: function () {
		//기간 체크
		if ($('#sendSearchStartDtm').val().trim() == "" || $('#sendSearchEndDtm').val().trim() == "") {
            alert(jobCnctSendValidMsg._dtmEmpty);
			return false;
		}
			
        // 제목 길이 체크
        if ($('#sendTitle').val().length > 100) {
            alert(jobCnctSendValidMsg._titleLimitLength);
            return false;
        }
        return true;
    }
}