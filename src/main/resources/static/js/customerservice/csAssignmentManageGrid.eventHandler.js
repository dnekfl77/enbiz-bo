
$.namespace("csAssignmentManageGrid.eventhandler");
csAssignmentManageGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.getAutoDivDtlNo(obCode);
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){
        var self = this;

        $('#autoDivGbCd').change(function(){
            self.getAutoDivDtlNo($(this).val());
        })

        $('#btn-regist-user').click(function() {
            self.callUserPopup();
        });

        $('#btn-reset-user').click(function(){
            $('#userNm').val('');
            $('#userId').val('');
        })

        // 초기화
        $('#btn_init').click(function() {
            $('#csAssignmentManageForm')[0].reset();
            $('#userId').val('');
            self.calendarInit();
            $('#autoDivDtlNo option').not("[value='']").remove();
            self.getAutoDivDtlNo(obCode);
        });

        // 조회
        $('#btn_search').click(function() {
            self.onSearch(true);
        });

        //달력
        $('#_sch_date_st-button').click(function() {
            var initDate = new Date();
            var hours = initDate.getHours() < 10 ? '0'+initDate.getHours():initDate.getHours();
            var minute = initDate.getMinutes() < 10 ? '0'+initDate.getMinutes():initDate.getMinutes();
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd HH:mm',
                yyyymmdd1:$('#startDate').val(),
                yyyymmdd2:$('#endDate').val(),
                hour1:hours,
                hour2:'23',
                min1:minute,
                min2:'59',
                fn:function(pin) {
                    $('#startDate').val(pin.yyyymmdd1 + " " + pin.hour1 + ":" + pin.min1);
                    $('#endDate').val(pin.yyyymmdd2 + " " + pin.hour2 + ":" + pin.min2);
                }
            });
        });

        //자동배분설정
        $('#btn_grid_autoDistribute').click(function(){
            self.callAutoDistributePopup();
        })
        //OB상담일괄등록
        $('#btn_grid_obBussiness').click(function(){
            self.callObBussinessPopup();
        })


    },
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(3);
        $('#startDate').val(initFromAndToCalDate[0] + " 18:00");
        $('#endDate').val(initFromAndToCalDate[1] + " 18:00");
    },
    //업무유형 상세 테이터 (자동배분상세 데이터 조회)
    getAutoDivDtlNo : function(autoDivGbCd){
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "customerservice/csAllocationMgmt.getAutoDivideDetailNo.do",
            'autoDivGbCd=' + autoDivGbCd,
            function ( list ) {
                $('#autoDivDtlNo option').not("[value='']").remove();
                list.forEach(function(data){
                    $('#autoDivDtlNo').append($("<option value='"+data.autoDivDtlNo+"'>"+data.autoDivDtlNm+"</option>"));
                })
            });

    },
    gridLoading : function(){

        var layout = [
            {
                name: "autoDivGroup",
                direction: "horizontal",
                items: [
                    {column:"autoDivGbNm", footerUserSpans:[{rowspan:1, colspan:2}]},
                    "autoDivDtlNm",
                ],
                header: {
                    text: "업무유형",
                    styleName: "multi-line-css"
                }
            },
            {
                name: "sameDayNumGroup",
                direction: "horizontal",
                items: [
                    "numOfPeopleHandling",
                    "numOfAllotableCases"
                ],
                header: {
                    text: "당일할당현황",
                    styleName: "multi-line-css"
                }
            },
            {
                name: "numGroup",
                direction: "horizontal",
                items: [
                    "numOfAssignments",
                    "numOfUnassignments"
                ],
                header: {
                    text: "할당현황",
                    styleName: "multi-line-css"
                }
            },
            {
                name: "stateGroup",
                direction: "horizontal",
                items: [
                    "receipt",
                    "inProgress",
                    "complete",
                    "already"
                ],
                header: {
                    text: "처리현황",
                    styleName: "multi-line-css"
                }
            }
        ]
        this.grid.header.height = 60;
        this.grid.footer.height = 40;
        this.grid.setFooters({visible:true});
        this.grid.setColumnLayout(layout);
        this.grid.columnByName("autoDivGbNm").footer.text = "전체";
    },
    callUserPopup : function(){
        var pin = {
            argSelectType: '1'
            , argWorkStatCd: '01'
            , argUseYn: 'Y'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자 조회'
            , _title: '사용자 조회'
            , left: 20
            , top: 20
            , width: 900
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupUserListCallback);
    },
    callAutoDistributePopup : function(){
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'customerservice/csAllocationMgmt.autoDistributionSettingPopup.do'
            , winName: 'autoDistributionSettingPop'
            , title: '자동배분설정팝업'
            , _title: '자동배분설정팝업'
            , left: 20
            , top: 20
            , width: 1000
            , height: 800
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA,function(e){});
    },
    callObBussinessPopup : function(){
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'customerservice/csAllocationMgmt.obBusinessSaveView.do'
            , winName: 'obBusinessRegistPop'
            , title: 'OB업무등록'
            , _title: 'OB업무등록'
            , left: 20
            , top: 20
            , width: 1000
            , height: 800
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA,function(e){});
    },
    onSearch : function(isOpenToast){
        this.grid.cancel();
        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        var extraQueryString;
        extraQueryString = 'startDate=' + startDate + '&endDate=' + endDate;
        this.controller.doQuery(this,extraQueryString,null,null,false,isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
        onCurrentRowChanged : function(grid, oldRow, newRow) {
            grid.commit();
            var subAutoDivGbCd = grid.getValue(grid.getCurrent().itemIndex, "autoDivGbCd");
            var subAutoDivDtlNo = grid.getValue(grid.getCurrent().itemIndex, "autoDivDtlNo");
            var data = {};
            data.autoDivGbCd  = subAutoDivGbCd;
            data.autoDivDtlNo = subAutoDivDtlNo;
            csAssignmentManageDetailGrid.eventhandler.onSearch(data);
        },
        onCellClicked : function (grid, clickData) {
            var cellType = clickData.cellType;
            if(cellType === 'header'
                || cellType === 'head'
            ){
                return;
            }
            csAssignmentManageDetailGrid.eventhandler.grid.commit();
            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            csAssignmentManageDetailGrid.eventhandler.onSearch(currentData);
        },
    },
    popupUserListCallback : function(e){
        var userData = JSON.parse(e.data);
        $('#userId').val(userData[0].userId);
        $('#userNm').val(userData[0].userNm);
    },
};
