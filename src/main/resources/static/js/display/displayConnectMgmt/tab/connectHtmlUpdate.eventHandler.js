$.namespace("connectHtmlUpdate.eventhandler");
connectHtmlUpdate.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.valSetting();
        this.bindButtonEvent();
    },

    // 켈린더 날짜 기본 셋팅
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(0);

        var today = new Date(); // 현재날짜
        today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());
        var lastDate = new Date(); // 현재날짜
	    lastDate = new Date(lastDate.setDate(lastDate.getDate()+30)); // 한달뒤
        lastDate = lastDate.getFullYear() + "-" + addzero(lastDate.getMonth() + 1) + "-" + addzero(lastDate.getDate());

        $('#startDate').val(today);
        $('#endDate').val(lastDate);
        $('#endHour').val('23');
        $('#endMinute').val('59');
    },

    valSetting : function(){
        if(req.argInsertUpdate == "U") { // 수정
            $("#conrContNo").val(req.conrContNo);
            $("#contDesc").val(req.contDesc);
            $("#dispSeq").val(req.dispSeq);
            $('input:radio[name=dispYn]:input[value=' + req.dispYn + ']').attr("checked",true); // 전시여부
            $("#htmlFileCont").text(req.htmlFileCont);

            var strDate = req.dispStrDtm.split(" ");
            $("#startDate").val(strDate[0]);
            var strDate_time = strDate[1].split(":");
            $("#startHour").val(strDate_time[0]);
            $("#startMinute").val(strDate_time[1]);

            var endDate = req.dispEndDtm.split(" ");
            $("#endDate").val(endDate[0]);
            var endDate_time = endDate[1].split(":");
            $("#endHour").val(endDate_time[0]);
            $("#endMinute").val(endDate_time[1]);
        } else { // 입력
            $('input:radio[name=dispYn]').first().attr("checked",true); // 전시여부
        }
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

        // 저장 버튼
        $("#btn_popup_save").click(function() {
            self.onSave();
        });

        // 취소버튼
        $("#btn_popup_cancel").click(function() {
            self.onCancel();
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
    },

    valCheck : function() {
        if($('#contDesc').val() == null || $('#contDesc').val() == '') { // HTML 전시설명
            alert("HTML 전시설명은 " + msg.necessaryCheckMessage);
            $('#contDesc').focus();
            return false;
        } else if($('#dispSeq').val() == null || $('#dispSeq').val() == '') { // 전시순서
             alert("전시순서는 " + msg.necessaryCheckMessage);
             $('#dispSeq').focus();
             return false;
        } else if($('#htmlFileCont').val() == null || $('#htmlFileCont').val() == '') { // HTML 전시내용
              alert("HTML 전시내용은 " + msg.necessaryCheckMessage);
              $('#htmlFileCont').focus();
              return false;
        }
        return true;
    },

    onSave : function() {

        if(this.checkDateVal() && this.valCheck() ) { // 날짜 확인, 빈값 확인
            if(confirm(msg.save)) {
                var startDate = $("#startDate").val() + " " + $("#startHour").val() + ":" + $("#startMinute").val() + ":00";
                var endDate = $("#endDate").val() + " " + $("#endHour").val() + ":" + $("#endMinute").val() + ":59";
                $("#dispStrDtm").val(startDate);
                $("#dispEndDtm").val(endDate);

                // form 전체 disabled 풀어주기
                $("form input:disabled, select:disabled, radio:disabled").removeAttr("disabled");

                common.Ajax.sendRequest(
                    "POST"
                    ,_baseUrl + "/display/displayConnectMgmt.saveConnectPopup.do"
                    ,$("#htmlForm").serialize()
                    ,function(obj) {
                         if (obj.succeeded) {
                            opener.connectTabHtmlGrid.eventhandler.onSearch(0);
                            window.close();
                         } else {
                            console.log("HTML 전시 등록/수정 저장 오류");
                         }
                    }
                );
            } else {
                return;
            }
        } else {
           return;
        }

    },

    onCancel : function() {
        if(confirm(msg.cancelMessage)) {
            window.close();
        } else {
           return;
        }
    }

};