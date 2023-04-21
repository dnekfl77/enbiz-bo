$.namespace("endDateChange.eventhandler");
endDateChange.eventhandler = {
    // 초기화
    init : function () {
        this.valueSetting();
        this.calendarInit();
        this.bindButtonEvent();
    },

    valueSetting : function(){
        $('input:radio[name=type]:input[value=1]').attr("checked",true);
        $("#content1").css("display", "");
        $("#content2").css("display", "none");
    },

    // 켈린더 날짜 기본 셋팅
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(0);
        $('#endDate').val(initFromAndToCalDate[0]);
        $('#endHour').val('23');
        $('#endMinute').val('59');
    },

    bindButtonEvent : function(){
        var self = this;

        // 템플릿유형에 따른 UI 변경
        $("input:radio[name=type]").change(function() {
            self.rowSetting();
        });

        // 전시종료일시 달력 이벤트
        $("#calendarButton1").click(function() {
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
            self.onApply();
        });

        // 취소버튼
        $("#btn_popup_cancel").click(function() {
            window.close();
        });
    },

    rowSetting : function(){
        var val = $("input:radio[name=type]:checked").val();
        if(val == "1") {
            $("#content1").css("display", "");
            $("#content2").css("display", "none");
        } else {
            $("#content1").css("display", "none");
            $("#content2").css("display", "");
        }
    },

    onApply : function(){
        if($("input:radio[name=type]:checked").val() == "1"){
            var today = new Date(); // 현재날짜
            today = today.getFullYear() + "" + addzero(today.getMonth() + 1) + "" + addzero(today.getDate());
            var endDate = $("#endDate").val().replace(/-/g, '');

            if (today > endDate) {
                alert(msg.dataCheck2);
                return false;
            } else {
                var endDate = $("#endDate").val() + " " + $("#endHour").val() + ":" + $("#endMinute").val() + ":59";
            }

        } else {
            if($("#dateCount").val() == '' || $("#dateCount").val() == null){
                alert(msg.dateCountCheck1);
                return false;
            } else {
                if($("#dateCount").val() <= 0) {
                    alert(msg.dateCountCheck2);
                } else {
                    var fromDate = new Date();
                    var returnDate = new Date(fromDate.setDate( fromDate.getDate() + Number($("#dateCount").val()) ));
                    returnDate = calendarFormatting(returnDate);
                    var endDate = returnDate + " 23:59:59";
                }
            }
        }

        var returnData = { endDate : endDate };
        window.postMessage(JSON.stringify(returnData));
        window.close();
    }
};