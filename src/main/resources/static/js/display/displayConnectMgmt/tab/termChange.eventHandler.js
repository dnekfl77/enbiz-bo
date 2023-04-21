$.namespace("termChange.eventhandler");
termChange.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.bindButtonEvent();
    },

    // 켈린더 날짜 기본 셋팅
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(0);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[0]);
        $('#endHour').val('23');
        $('#endMinute').val('59');
    },

    bindButtonEvent : function(){
        var self = this;

        // 전시시작일시 달력 이벤트
        $("#calendarButton1").click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#startDate').val(),
				max_term:0,
				fn:function(pin) {
					$('#startDate').val(pin.yyyymmdd);
				}
			});
        });

        // 전시종료일시 달력 이벤트
        $("#calendarButton2").click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#endDate').val(),
				max_term:0,
				fn:function(pin) {
					$('#endDate').val(pin.yyyymmdd);
				}
			});
        });

        // 적용버튼
        $("#btn_popup_apply").click(function() {
            if(self.checkDateVal()) {
                var startDate = $("#startDate").val() + " " + $("#startHour").val() + ":" + $("#startMinute").val() + ":00";
                var endDate = $("#endDate").val() + " " + $("#endHour").val() + ":" + $("#endMinute").val() + ":59";
                var returnData = { dispStrDtm : startDate, dispEndDtm : endDate };
                window.postMessage(JSON.stringify(returnData));
                window.close();
            }
        });

        // 취소버튼
        $("#btn_popup_cancle").click(function() {
            window.close();
        });
    },

    checkDateVal : function(){
        var today = new Date(); // 현재날짜
        today = today.getFullYear() + "" + addzero(today.getMonth() + 1) + "" + addzero(today.getDate());

        var startDate = $("#startDate").val().replace(/-/g, '');
        var endDate = $("#endDate").val().replace(/-/g, '');

        if (today <= startDate) {
            if(endDate < startDate) {
                alert(msg.dataCheck3);
                return false;
            } else {
                if (endDate < startDate) {
                    alert(msg.dataCheck3);
                    return false;
                } else if (endDate == startDate) {  // 날짜가 같은 경우 시간 비교
                    if( $("#endHour").val() < $("#startHour").val() ) {
                        alert(msg.dataCheck3);
                        return false;
                    } else if( $("#endHour").val() == $("#startHour").val() ) { // 시간이 같은 경우 분 비교
                        if( $("#endMinute").val() <= $("#startMinute").val() ) {
                            alert(msg.dataCheck3);
                            return false;
                        }
                   }
                }
            }
        } else {
            alert(msg.dataCheck1);
            return false;
        }
        return true;
    }
};