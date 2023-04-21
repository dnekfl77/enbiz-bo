$.namespace("promotionGrid.eventhandler");
promotionGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){

        var self = this;

        //상세화면
        this.grid.onCellDblClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.column==='promoNo'|| clickData.column==='promoNm'){
                self.callPromotionRegistPopup(currentData.promoNo);
            }
        }
        // 초기화
        $('#btn_init').click(function() {
            $('#promotionGridForm')[0].reset();
            $('#userId').val('');
            self.calendarInit();
        });

        // 조회 registerBtn
        $('#btn_list').click(function() {
            self.onSearch(0,true);
        });

        // 등록자 팝업 버튼
        $('#btn-regist-user').click(function() {
            self.callUserPopup();
        });

        // 등록 버튼
        $('#btn-promotion-regist').click(function(){
            self.callPromotionRegistPopup();
        })

        $('#btn-reset-user').click(function(){
            $('#userId').val('');
            $('#userNm').val('');
        })

        $("#promotionGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
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
            });
        });


    },
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(30);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    gridLoading : function(){
        // 그리드 셀 수정 불가 설정
        grid.setEditOptions({ editable: false })

        //그리드 셀 체크시 색상 변경 기능 설정
        grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        })
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
    callPromotionRegistPopup : function(promoNo){
        var pin = {
            promoNo:promoNo
        };
        var POP_DATA = {
            url: (typeof promoNo === "undefined") ? _baseUrl + 'marketing/promotionMgmt.promotionRegistView.do'
                : _baseUrl + "marketing/promotionMgmt.promotionModifyView.do"
            , winName: 'couponManagement'
            , title: '프로모션 등록/상세'
            , _title: '프로모션 등록/상세'
            , left: 20
            , top: 20
            , width: 960
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA,this.popupPromotionRegistCallback);
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());

        var extraQueryString;
        extraQueryString = 'startDate=' + startDate + '&endDate=' + endDate;

        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc,false,isOpenToast);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
    },
    popupUserListCallback : function(e){
        var userData = JSON.parse(e.data);
        $('#userId').val(userData[0].userId);
        $('#userNm').val(userData[0].userNm);
    },
    popupPromotionRegistCallback : function(e){
        if(e.data === 'succeeded'){
            promotionGrid.eventhandler.onSearch(0);
        }
    }
};
