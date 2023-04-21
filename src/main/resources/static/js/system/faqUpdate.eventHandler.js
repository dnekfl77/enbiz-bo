var col = x2coMessage.getMessage({
    title    	      : 'faqMgmt.label.title', //제목
    categoryLag       : 'faqMgmt.label.categoryLag',//FAQ 대분류
    categoryMid       : 'faqMgmt.label.categoryMid',//FAQ 중분류
    contPc            : 'faqMgmt.label.contPc',//내용(PC)
    contMo            : 'faqMgmt.label.contMo',//내용(MO)
    sortSeq           : 'faqMgmt.label.sortSeq'//정렬순서
});

var alertMsg = x2coMessage.getMessage({
    errorMsg   	      : 'adminCommon.process.error'//처리도중 오류가 발생했습니다.
});

$.namespace("faqUpdate.eventhandler");
faqUpdate.eventhandler = {

    init : function () {
        this.editerInit();
        this.valueInit();
        if(req.argInsertUpdate == "U") { // 수정
            this.valueSetting();
        }
        this.bindButtonEvent();
    },

    // 에디터 셋팅
    editerInit : function() {
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditorsPc,
			elPlaceHolder: "pcNtcCont",
			sSkinURI: "/static/js/libs/smartEditor/SmartEditor2Skin.html",
			fCreator: "createSEditor2"
      	});

		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditorsMo,
			elPlaceHolder: "moNtcCont",
			sSkinURI: "/static/js/libs/smartEditor/SmartEditor2Skin.html",
			fCreator: "createSEditor2"
      	});
    },

    // 라디오 셋팅
    valueInit : function(){
        $('input:radio[name=bbYn]').first().attr("checked",true);
        $('input:radio[name=uprFixYn]').first().attr("checked",true);
    },

    // 수정시 데이터 셋팅
    valueSetting : function(){
        $("#faqNo").val(req.faqNo);
        $("#title").val(req.title);
        $("#faqLgrpCd").val(req.faqLgrpCd);
        this.onFaqMgrpCd(req.faqLgrpCd); // 대분류에 따른 중분류 셋팅
        $("#faqMgrpCd").val(req.faqMgrpCd);
        $("#sortSeq").val(req.sortSeq);
        $('input:radio[name=bbYn]:input[value='+ req.bbYn +']').attr("checked",true);
        $('input:radio[name=uprFixYn]:input[value='+ req.uprFixYn +']').attr("checked",true);
        $("#pcNtcCont").val(req.pcNtcCont);
        $("#moNtcCont").val(req.moNtcCont);
    },

    bindButtonEvent : function(){
        var self = this;

        $('#faqLgrpCd').change(function() {
            self.onFaqMgrpCd($('#faqLgrpCd').val());
        });

        // 취소 버튼
        $('#btn_popup_close').click(function() {
            self.onCancel();
        });

        // 저장 버튼
        $('#btn_popup_apply').click(function() {
            self.onSave();
        });
    },

    onFaqMgrpCd : function(faqLgrpCd){
        $('#faqMgrpCd option').not("[value='']").remove();
        codeList.forEach(function(data){
            if(data.ref1Val == faqLgrpCd) {
                $("#faqMgrpCd").append($("<option value='"+data.cd+"'>"+data.cdNm+"</option>"));
            }
        })
    },

    onCancel : function() {
        if(confirm(msg.cancelMessage) == true) {
            window.close();
        } else {
           return;
        }
    },

    // 빈값 확인
    valCheck : function(){
        oEditorsPc.getById["pcNtcCont"].exec("UPDATE_CONTENTS_FIELD", []);
        var editorPcVal = $("#pcNtcCont").val();
        oEditorsMo.getById["moNtcCont"].exec("UPDATE_CONTENTS_FIELD", []);
        var editorMoVal = $("#moNtcCont").val();

        if($('#title').val() == null || $('#title').val() == '') { // 제목
            alert(col.title + msg.necessaryCheckMessage);
            $('#title').focus();
            return false;
        } else if($('#faqLgrpCd').val() == null || $('#faqLgrpCd').val() == '') { // FAQ 대분류
             alert(col.categoryLag + msg.necessaryCheckMessage);
             $('#faqLgrpCd').focus();
             return false;
        } else if($('#faqMgrpCd').val() == null || $('#faqMgrpCd').val() == '') { // FAQ 중분류
             alert(col.categoryMid + msg.necessaryCheckMessage);
             $('#faqMgrpCd').focus();
             return false;
        } else if($('#sortSeq').val() == null || $('#sortSeq').val() == '') { // 정렬순서
             alert(col.sortSeq + msg.necessaryCheckMessage);
             $('#sortSeq').focus();
             return false;
        } else if( (editorMoVal == "" && editorPcVal == "" ) || (editorPcVal == null && editorMoVal == null ) || (editorPcVal == '&nbsp;' && editorMoVal == '&nbsp;') || ( editorPcVal == '<p>&nbsp;</p>' && editorMoVal == '<p>&nbsp;</p>' ) )  { // 팝업 내용
              alert(msg.contNecessaryCheckMessage);
              oEditorsPc.getById["pcNtcCont"].exec("FOCUS"); //포커싱
              return false;
        }
        return true;
    },

    onSave : function() {
        if( !this.valCheck() ) { // 빈값확인
            return;
        }

        // 중복확인
        var param = {
            faqLgrpCd : $("#faqLgrpCd").val(),
            faqMgrpCd : $("#faqMgrpCd").val(),
            faqNo : req.argInsertUpdate == "U" ? req.faqNo : null
        }
        common.Ajax.sendRequest(
            "POST"
            ,_baseUrl + "system/faqMgmt.faqOverLapCheck.do"
            ,param
            ,function(obj) {
                 if (!obj.succeeded) {
                    alert(msg.overLapCheckMessage);
                    return false;
                 } else {
                    if( confirm(msg.save) ) { // 저장확인문구
                        // 에디터의 내용을 textarea에 적용
                        oEditorsPc.getById["pcNtcCont"].exec("UPDATE_CONTENTS_FIELD", []);
                        oEditorsMo.getById["moNtcCont"].exec("UPDATE_CONTENTS_FIELD", []);

                        // form 전체 disabled 풀어주기
                        $("form input:disabled").removeAttr("disabled");

                        common.Ajax.sendRequest(
                            "POST"
                            ,_baseUrl + "system/faqMgmt.saveFaq.do"
                            ,$("#faqForm").serializeArray()
                            ,function(obj) {
                                 if (obj.succeeded) {
                                    window.postMessage(null,_baseUrl);
                                    window.close();
                                 } else {
                                    console.log(alertMsg.errorMsg);
                                 }
                            }, false
                        );
                    }
                 }
            }
        );
    }

};