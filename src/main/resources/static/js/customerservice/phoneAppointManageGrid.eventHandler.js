var alertMessage = x2coMessage.getMessage( {
    tempRegist  : "phoneAppointmentMgmt.message.tempRegist",
    responseProc : "phoneAppointmentMgmt.message.responseProc",
    preTreatment : "phoneAppointmentMgmt.message.preTreatment",
    save : "adminCommon.message.saved.successfully",
    preTreatmentNot : "phoneAppointmentMgmt.message.preTreatmentNot"
});

$.namespace("phoneAppointManageGrid.eventhandler");
phoneAppointManageGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){
        var self = this;


        $("#phoneAppointManageGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
        });

        // 초기화
        $('#btn_init').click(function() {
            $('#phoneAppointManageGridForm')[0].reset();
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
            });
        });


    },
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(30);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    gridLoading : function(){

        grid.setCheckBar({
            exclusive: true,
            showAll: false
        })
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
        },
        onCellClicked : function (grid, clickData) {
            var cellType = clickData.cellType;
            if(cellType === 'header'
                || cellType === 'head'
            ){
                return;
            }
        },
    }


};
