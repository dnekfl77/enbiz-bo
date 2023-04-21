$.namespace("jobContactDetailInfoPopup.eventhandler");

const jobCnctDetailMsg = x2coMessage.getMessage( {
    _cancelMessage : "adminCommon.alert.cancel"
    , _ansContEmptyMessage : "common.alert.job.cnct.detail.ansCont.empty"
    , _saveConfirmMessage : "common.alert.job.cnct.detail.ans.save.confirm"
});

jobContactDetailInfoPopup.eventhandler = {
    // 초기화
    init : function () {
		//받은문의함을 통해 들어왔으며, 아직 발신자가 답변을 확인하지 않은 상태일 경우에만 답변 발송이 가능하다. 
		if (_jobCnctTypeCd == "01" && _ansInfo.dsmnAnsConfYn == "N") {
            this.ableToAnswer();
		}
        else { 
            this.unableToAnswer();
        }

        this.valueSetting();
        this.bindButtonEvent();
    },
    valueSetting : function(){
        $("#ansCont").text(_ansInfo.ansCont);
    },
	//답변 발송이 가능한 상태로 세팅
    ableToAnswer : function(){
        $("#ansCont").removeAttr("readonly");
        $('#btn_popup_save').show();
        $('#btn_popup_cancel').show();
        $('#btn_popup_close').hide();
    },
	//답변 발송이 불가능한 상태로 세팅
    unableToAnswer : function(){
        $("#ansCont").attr("readonly", true);
        $('#btn_popup_save').hide();
        $('#btn_popup_cancel').hide();
        $('#btn_popup_close').show();
    },
    bindButtonEvent : function(){
        var self = this;

        // 내용 byte 수 제한
        $('#ansCont').on("keyup change", function () {
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        // 취소 버튼
        $('#btn_popup_cancel').click(function() {
            if(confirm(jobCnctDetailMsg._cancelMessage) == true) {
				opener.jobCnctRecvGrid.eventhandler.onSearch(0);
				opener.jobCnctSendGrid.eventhandler.onSearch(0);
                window.close();
            } else {
               return;
            }
        });
        // 닫기 버튼
        $('#btn_popup_close').click(function() {
			opener.jobCnctRecvGrid.eventhandler.onSearch(0);
			opener.jobCnctSendGrid.eventhandler.onSearch(0);
            window.close();
        });

        // 저장 버튼
        $('#btn_popup_save').click(function() {
            self.onSave();
        });

    },

    // 필수 입력 값 체크
    valCheck : function(){
        if($('#ansCont').val() == null || $('#ansCont').val() == '') { // 상담구분
            alert(jobCnctDetailMsg._ansContEmptyMessage);
            $('#ansCont').focus();
            return false;
        }

        return true;
    },

    // 저장
    onSave : function() {

        if( this.valCheck() ) { // 빈값 확인
            if(confirm(jobCnctDetailMsg._saveConfirmMessage)) {
                common.Ajax.sendJSONRequest(
                    "POST"
                    ,_baseUrl + "popup/JobContact.saveJobContactAnswer.do"
                    ,$("#jobContactAnsForm").serialize()
                    ,function(obj) {
                         if (obj.succeeded) {
                            opener.jobCnctRecvGrid.eventhandler.onSearch(0);
                            opener.jobCnctSendGrid.eventhandler.onSearch(0);
                            window.close();
                         } else {
                            //alert(msg.dataCheck);
                         }
                    }
                    , null , null, true
                );
            } else {
                return;
            }
        } else {
           return;
        }
    }
};