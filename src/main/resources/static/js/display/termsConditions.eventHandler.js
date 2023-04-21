$.namespace("termsConditions.settings");
termsConditions.settings = {

    init : function(){
        this.calendarInit();
        this.bindButtonEvent();
        if(ccCmAgmtPolcInfo != null) { // 수정
            this.valueSetting();
        } else {
            this.editerInit();
        }
    },

    editerInit : function(){
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditors,
            elPlaceHolder: "wrdCont",
			sSkinURI: _baseUrl + "static/js/libs/smartEditor/SmartEditor2Skin.html",
			fCreator: "createSEditor2"
        });
    },

    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(0);
        $('#aplyStrDt').val(initFromAndToCalDate[0]);
        $('#aplyEndDt').val(initFromAndToCalDate[1]);
    },

    editerDisabled : function() {
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: "wrdCont",
			sSkinURI: _baseUrl + "static/js/libs/smartEditor/SmartEditor2Skin.html",
			fCreator: "createSEditor2",
			fOnAppLoad : function(){
                // 적용시작일자, 적용종료일자가 지난경우 수정불가
                if(ccCmAgmtPolcInfo.aplyStrYn == 'Y') {
                    var editor = oEditors.getById["wrdCont"];
                    editor.exec("DISABLE_WYSIWYG");
                    editor.exec("DISABLE_ALL_UI");
                }
            }
      	});
    },

    valueSetting : function(){
        this.editerDisabled();
        $("#cmAgmtPolcGbCd").val(ccCmAgmtPolcInfo.cmAgmtPolcGbCd).prop("selected", true);
        this.onAgmtPolcCd($('#cmAgmtPolcGbCd').val());
        $("#agmtPolcCd").val(ccCmAgmtPolcInfo.agmtPolcCd).prop("selected", true);

        $("#aplyStrDt").val(ccCmAgmtPolcInfo.aplyStrDt);
        $("#aplyEndDt").val(ccCmAgmtPolcInfo.aplyEndDt);
        $("#title").val(ccCmAgmtPolcInfo.title);
        $("#siteNo").val(ccCmAgmtPolcInfo.siteNo);
        $("#wrdCont").val(ccCmAgmtPolcInfo.wrdCont);

        // 적용시작일자, 적용종료일자가 지난경우 수정불가
        if(ccCmAgmtPolcInfo.aplyStrYn == 'Y') {
            $('#calendarButton1').off('click');
            if(ccCmAgmtPolcInfo.aplyEndYn == 'Y') {
                $('#calendarButton2').off('click');
                $("#btn_popup_save").css("display","none");
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

		// 적용시작일자 달력버튼
     	$('#calendarButton1').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#aplyStrDt').val(),
				fn:function(pin) {
					$('#aplyStrDt').val(pin.yyyymmdd);
				}
			});
		});

		// 적용시작일자 달력버튼
     	$('#calendarButton2').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#aplyEndDt').val(),
				fn:function(pin) {
					$('#aplyEndDt').val(pin.yyyymmdd);
				}
			});
		});

        // 닫기버튼
        $("#btn_popup_cancel").click(function() {
            window.close();
        });

        //저장버튼
        $('#btn_popup_save').click(function(){
            self.onSave();
        });

        // 약관정책코드 옵션셋팅
        $('#cmAgmtPolcGbCd').change(function(){
            self.onAgmtPolcCd($('#cmAgmtPolcGbCd').val());
        });
    },

    // 약관정책코드 옵션셋팅
    onAgmtPolcCd : function(cmAgmtPolcGbCd){
        $('#agmtPolcCd option').not("[value='']").remove();
        if(codeList_CH005 != null){
            for(const item of codeList_CH005){
                if(cmAgmtPolcGbCd != "") { // 전체가 아닌경우
                    if(item.ref1Val == cmAgmtPolcGbCd) { // 약관정책구분에 따른 약관정책코드 셋팅
                        $("#agmtPolcCd").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                    }
                } else { // 전체인경우
                    $("#agmtPolcCd").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                }
            }
        }
    },

    // 날짜 체크
    checkDate : function(){
        var startLastDate = new Date(); // 선택 불가능한 마지막 날짜
	    startLastDate = new Date(startLastDate.setDate(startLastDate.getDate()-1));
        startLastDate = startLastDate.getFullYear() + "" + addzero(startLastDate.getMonth() + 1) + "" + addzero(startLastDate.getDate());

        var startDate = $("#aplyStrDt").val().replace(/-/g, '');
        var endDate = $("#aplyEndDt").val().replace(/-/g, '');

        // 입력인 경우 현재보다 이전날짜는 선택 불가
        if(ccCmAgmtPolcInfo == null) {
            if (startLastDate >= startDate) {
                alert(msg.dataCheck1Msg);
                return false;
            }
        }

        // 적용시작일자가 적용종료일자보다 큰 경우
        if (endDate < startDate) {
            alert(msg.dataCheck3Msg);
            return false;
        }

        return true;
    },

    // 값 체크
    valCheck : function(){
        oEditors.getById["wrdCont"].exec("UPDATE_CONTENTS_FIELD", []);
        var editorVal = $("#wrdCont").val();

        // 데이터 필수입력 항목 빈값 확인
        if($('#cmAgmtPolcGbCd').val() == null || $('#cmAgmtPolcGbCd').val() == '') {
            alert(col.cmAgmtPolcGbCd + msg.necessaryCheckMessage);
            $('#cmAgmtPolcGbCd').focus();
            return false;
        } else if($('#agmtPolcCd').val() == null || $('#agmtPolcCd').val() == '') {
             alert(col.agmtPolcCd + msg.necessaryCheckMessage);
             $('#agmtPolcCd').focus();
             return false;
        } else if($('#aplyStrDt').val() == null || $('#aplyStrDt').val() == '') {
             alert(col.aplyStrDt + msg.necessaryCheckMessage);
             $('#aplyStrDt').focus();
             return false;
        } else if($('#aplyEndDt').val() == null || $('#aplyEndDt').val() == '') {
             alert(col.aplyEndDt + msg.necessaryCheckMessage);
             $('#aplyEndDt').focus();
             return false;
        } else if($('#title').val() == null || $('#title').val() == '') {
             alert(col.title + msg.necessaryCheckMessage);
             $('#title').focus();
             return false;
        } else if($('#siteNo').val() == null || $('#siteNo').val() == '') {
             alert(col.siteNo + msg.necessaryCheckMessage);
             $('#siteNo').focus();
             return false;
        }  else if( editorVal == ""  || editorVal == null || editorVal == '&nbsp;' || editorVal == '<p>&nbsp;</p>')  {
            alert(col.wrdCont + msg.necessaryCheckMessage);
            oEditors.getById["wrdCont"].exec("FOCUS");
            return false;
        }

        // 데이터 사이즈 확인
        if($('#title').val().length > 200) {
             alert("200" + msg.dataSizeCheck);
             $('#title').focus();
             return false;
        }

        return true;
    },

    // 저장
    onSave : function(){

        if (!this.checkDate()) { return false; } // 날짜 체크
        if (!this.valCheck()) { return false; } // 값 체크

        oEditors.getById["wrdCont"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터의 내용을 textarea에 적용

        if (!confirm(msg.saveQuestionMsg)) {
            return false;
        }

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "display/termsConditionsMgmt.saveTermsConditionsMgmt.do"
            , fn_disabledSerialize("termsConditionsForm")
            , function(obj) {
                if (obj.succeeded == true) {
                    opener.termsConditionsListGrid.eventhandler.onSearch(0,false);
                    window.close();
                }
            }
        );
    }
};