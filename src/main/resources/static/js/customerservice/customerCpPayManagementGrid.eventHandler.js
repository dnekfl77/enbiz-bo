$.namespace("customerCpPayManagementGrid.eventhandler");
customerCpPayManagementGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){

        var self = this;

        // 보상유형
        $('#btn-regist-cpnsTyp').click(function(){
            self.callRewardTypeListPopup();
        })

        // 보상유형 초기화
        $('#btn-reset-cpnsTyp').click(function(){
            $('#cpnsTypNm').val('');
            $('#cpnsTypNo').val('');
        })

        //회원정보
        $('#btn-regist-mbr').click(function(){
            self.callMbrPopup();
        })

        //회원정보 초기화
        $('#btn-reset-mbr').click(function(){
            $('#mbrNm').val('');
            $('#mbrNo').val('');
        })

        // 처리자 조회
        $('#btn-regist-user').click(function() {
            self.callUserPopup();
        });

        // 처리자 초기화
        $('#btn-reset-user').click(function(){
            $('#userId').val('');
            $('#userNm').val('');
        })

        // 초기화
        $('#btn_init').click(function() {
            $('#customerCpPayManagementForm')[0].reset();
            $('#cpnsTypNo').val('');
            $('#mbrNo').val('');
            $('#userId').val('');
            self.calendarInit();
        });

        // 조회
        $('#btn_list').click(function() {
            self.onSearch(0,true);
        });

        //달력
        $('#_sch_date_st-button').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#startDate').val(),
                yyyymmdd2:$('#endDate').val(),
                //max_term:30,
                fn:function(pin) {
                    $('#startDate').val(pin.yyyymmdd1);
                    $('#endDate').val(pin.yyyymmdd2);
                }
            })
        })

    },
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    gridLoading : function(){

    },
    callMbrPopup : function(){
        var pin = {
            argSelectType: '1',
            argMbrStatCd: ''
        };
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
        popCommon(pin, POP_DATA, this.popupMbrListCallback);
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
    callRewardTypeListPopup : function(){
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'customerservice/rewardTypeMgmt.rewardTypeListPopup.do'
            , winName: 'popupCsCpnsTypCdListPopup'
            , title: '보상유형조회 팝업'
            , _title: '보상유형조회 팝업'
            , left: 20
            , top: 20
            , width: 520
            , height: 600
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupCsCpnsTypCdListCallback);
    },
    callCustomerCompensPopup : function(custCpnsAplyNo){
        var pin = {
            custCpnsAplyNo : custCpnsAplyNo
        };

        var POP_DATA = {
            url:  _baseUrl + 'customerservice/customerCompensMgmt.customerCompensDetailSaveView.do'
            , winName: 'customerCompensRegist'
            , title: '고객보상상세'
            , _title: '고객보상상세'
            , left: 20
            , top: 50
            , width: 780
            , height: 600
            , scrollbars: true
            , autoresize: true
        }
        popCommon(pin, POP_DATA)
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());

        var extraQueryString;
        extraQueryString = 'startDate=' + startDate + '&endDate='
            + endDate + "&mbrNm=" + $('#mbrNm').val();
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
        onCellDblClicked : function (grid, clickData) {
            var cellType = clickData.cellType;
            if(cellType === 'header'
                || cellType === 'head'
            ){
                return;
            }

            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);

            if(clickData.column ==='custCpnsAplyNo'){
                customerCpPayManagementGrid.eventhandler.callCustomerCompensPopup(currentData.custCpnsAplyNo);
            }
        },
    },
    popupUserListCallback : function(e){
        var userData = JSON.parse(e.data);
        $('#userId').val(userData[0].userId);
        $('#userNm').val(userData[0].userNm);
    },
    popupCsCpnsTypCdListCallback : function(e){
        var csCpnsTypeData = JSON.parse(e.data);
        $('#cpnsTypNo').val(csCpnsTypeData[0].cpnsTypNo);
        $('#cpnsTypNm').val(csCpnsTypeData[0].cpnsTypSmlNm);
    },
    popupMbrListCallback : function(e){
        var mbrData = JSON.parse(e.data);
        $('#loginId').val(mbrData[0].loginId);
        $('#mbrNm').val(mbrData[0].mbrNm);
    }
};
