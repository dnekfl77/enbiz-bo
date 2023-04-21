$.namespace("counselingTemplatePopup.eventhandler");
counselingTemplatePopup.eventhandler = {
    // 초기화
    init : function () {
        if(req.argInsertUpdate == "U") { // 수정
            this.valueSetting();
        }
        this.bindButtonEvent();
    },

    // 값 셋팅
    valueSetting : function(){
        $("#cnslGbCd").val(req.cnslGbCd);
        $("#cnslTypCd").val(req.cnslTypCd);
        $("#tmplNm").val(req.tmplNm);
        $("#tmplCont").text(req.tmplCont);
        $('#tmplCont_byte').text(byteCheck($("#tmplCont").text()));
    },

    bindButtonEvent : function(){
        var self = this;

        // 내용 byte 수 제한
        $('#tmplCont').on("keyup change", function () {
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        // 취소 버튼
        $('#btn_popup_cancel').click(function() {
            if(confirm(msg.cancelMessage) == true) {
                window.close();
            } else {
               return;
            }
        });

        // 저장 버튼
        $('#btn_popup_save').click(function() {
            self.onSave();
        });

    },

    // 필수 입력 값 체크
    valCheck : function(){

        if($('#cnslGbCd').val() == null || $('#cnslGbCd').val() == '') { // 상담구분
            alert("상담구분은 " + msg.necessaryCheckMessage);
            $('#cnslGbCd').focus();
            return false;
        } else if($('#cnslTypCd').val() == null || $('#cnslTypCd').val() == '') { // 상담 유형
            alert("상담 유형은 " + msg.necessaryCheckMessage);
            $('#cnslTypCd').focus();
            return false;
        } else if($('#tmplNm').val() == null || $('#tmplNm').val() == '') { // 템플릿 명
             alert("템플릿명은 " + msg.necessaryCheckMessage);
             $('#tmplNm').focus();
             return false;
        } else if($('#tmplCont').val() == null || $('#tmplCont').val() == '') { // 내용
             alert("내용은 " + msg.necessaryCheckMessage);
             $('#tmplCont').focus();
             return false;
        }

        return true;
    },

    // 저장
    onSave : function() {

        if( this.valCheck() ) { // 빈값 확인
            if(confirm(msg.save)) {
                common.Ajax.sendRequest(
                    "POST"
                    ,_baseUrl + "customerservice/counselingTemplateMgmt.saveCounselingTemplateInfo.do"
                    ,$("#counselingTemplateForm").serialize()
                    ,function(obj) {
                         if (obj.succeeded) {
                            if(req.typeCode == "common") { // 공통 탭에서 팝업을 호출한 경우
                                opener.counselingTemplateCommonGrid.eventhandler.onSearch(0);
                            } else { // 개인 탭에서 팝업을 호출한 경우
                                opener.counselingTemplateGrid.eventhandler.onSearch(0);
                            }
                            window.close();
                         } else { // 상담 구분, 유형, 템플릿명이 같은 경우
                            alert(msg.dataCheck);
                         }
                    }
                );
            } else {
                return;
            }
        } else {
           return;
        }
    }
};