$.namespace("mallInsert.eventhandler");
mallInsert.eventhandler = {

    init : function () {
        this.loading();
        this.bindButtonEvent();
    },

    loading : function(){
        $('input:radio[name=dispYn]:input[value=Y]').attr("checked",true); // 전시여부
        $('input:radio[name=useYn]:input[value=Y]').attr("checked",true); // 사용여부
        $("#shopTypCd").val( req.shopTypCd );
        $("#shopTypCd").attr("disabled",true);

        // 출력유형에 따른 행 숨김
        $("#prtTypCd_tmpl").css("display", "none");
        $("#prtTypCd_category").css("display", "none");
        $("#prtTypCd_url").css("display", "none");
    },

    bindButtonEvent : function(){
        var self = this;

        // 전시 템플릿 공통팝업 호출
        $('#btn_tmplPopup_call').click(function() {
            self.templatePopupCall();
        });

        // 전시템플릿 지우기
        $('#btn_tmplPopup_reset').click(function() {
            $('#tmplFilePath').val('');
            $('#tmplNo').val('');
        });

        // 전시 카테고리 TREE 공통팝업 호출
        $('#btn_dispPopup_call').click(function() {
            self.displayCategoryTreeCall();
        });

        // 매장번호 지우기
        $('#btn_dispPopup_reset').click(function() {
            $('#linkDispNm').val('');
            $('#linkDispNo').val('');
        });

        // 취소 버튼
        $('#btn_popup_cancel').click(function() {
            if(confirm(msg.cancelMessage)) {
                window.close();
            } else {
               return;
            }
        });

        // 저장 버튼
        $('#btn_popup_save').click(function() {
            self.onSave();
        });

        // 템플릿유형에 따른 UI 변경
        $("#prtTypCd").change(function() {
            self.rowSetting();
        });

    },

    templatePopupCall : function() {
        var pin = {
            argSelectType: '1',
            argTmplTypCd : ''
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/templateMgmtPopup.templateListPopup.do'
            , winName: 'templatePopup'
            , title: '템플릿 조회'
            , _title: '템플릿 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function(e){
            var resultData = JSON.parse(e.data);
            $('#tmplFilePath').val(resultData[0].tmplFilePath);
            $('#tmplNo').val(resultData[0].tmplNo);
        });
    },

    displayCategoryTreeCall : function() {
        var pin = { siteNo : $("#siteNo").val() };
        var POP_DATA = {
              url: _baseUrl + 'popup/displayCategoryMgmtPopup.displayCategoryTreeListPopup.do'
            , winName: 'displayCategoryTreePopup'
            , title: '전시 카테고리 Tree 조회'
            , _title: '전시 카테고리 Tree 조회'
            , left: 20
            , top: 20
            , width: 300
            , height: 400
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function(e) {
            var resultData = JSON.parse(e.data);
            $('#linkDispNm').val(resultData[0].dispCtgNm);
            $('#linkDispNo').val(resultData[0].dispCtgNo);
        });
    },

    rowSetting : function() {
        var val = $("#prtTypCd").val();
        if(val == "" || val == "04") { // 빈값 or 연결없음
            $("#prtTypCd_tmpl").css("display", "none");
            $("#prtTypCd_category").css("display", "none");
            $("#prtTypCd_url").css("display", "none");
        } else if(val == "01") { //  템플릿 지정
            $("#prtTypCd_tmpl").css("display", "");
            $("#prtTypCd_category").css("display", "none");
            $("#prtTypCd_url").css("display", "none");
        } else if(val == "02") { // URL 이동
            $("#prtTypCd_tmpl").css("display", "none");
            $("#prtTypCd_category").css("display", "none");
            $("#prtTypCd_url").css("display", "");
        } else if(val == "03") { // 매장이동
            $("#prtTypCd_tmpl").css("display", "none");
            $("#prtTypCd_category").css("display", "");
            $("#prtTypCd_url").css("display", "none");
        }

    },

    valCheck : function() {
        if($('#dpmlNm').val() == null || $('#dpmlNm').val() == '') { // 전시몰 명
            alert(msg.mallNm + msg.necessaryCheckMessage);
            $('#mallNm').focus();
            return false;
        } else if($('#dispSeq').val() == null || $('#dispSeq').val() == '') { // 전시순서
            alert(msg.dispSeq + msg.necessaryCheckMessage);
            $('#dispSeq').focus();
            return false;
        } else if($('#hdrTypCd').val() == null || $('#hdrTypCd').val() == '') { // 해더유형
             alert(msg.hdrTypCd + msg.necessaryCheckMessage);
             $('#hdrTypCd').focus();
             return false;
        } else if($('#prtTypCd').val() == null || $('#prtTypCd').val() == '') { // 출력유형
              alert(msg.prtTypCd + msg.necessaryCheckMessage);
              $('#prtTypCd').focus();
              return false;
        }

        if( $('#prtTypCd').val() == "01") { // 템플릿 지정
            if($('#tmplFilePath').val() == null || $('#tmplFilePath').val() == '') { // 전시 템플릿
                alert(msg.displayTemplate + msg.necessaryCheckMessage);
                $('#tmplFilePath').focus();
                return false;
            }
        } else if( $('#prtTypCd').val() == "02") { // URL 이동
            if($('#movFrmeCd').val() == null || $('#movFrmeCd').val() == '') { // 이동방법
                alert(msg.movFrmeCd + msg.necessaryCheckMessage);
                $('#movFrmeCd').focus();
                return false;
            } else if($('#linkUrlAddr').val() == null || $('#linkUrlAddr').val() == '') { // 연결URL
                alert(msg.linkUrlAddr + msg.necessaryCheckMessage);
                $('#linkUrlAddr').focus();
                return false;
            }
        } else if( $('#prtTypCd').val() == "03") { // 매장이동
            if($('#linkDispNm').val() == null || $('#linkDispNm').val() == '') { // 매장번호
                alert(msg.linkDispNo + msg.necessaryCheckMessage);
                $('#linkDispNm').focus();
                return false;
            }
        }
        return true;
    },

    onSave : function() {
        if(!this.valCheck()) return; // 값 체크

        common.Ajax.sendRequest(
              "POST"
            , _baseUrl + "display/displayCategoryMgmt.saveDisplayCategoryMgmtMallInfo.do"
            , fn_disabledSerialize("mallForm")
            , function(obj) {
                 if (obj.succeeded) {
                    opener.categoryTree.eventhandler.init();
                    window.close();
                 }
            }
        );
    }

};