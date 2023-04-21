$.namespace("mallInfo.eventhandler");
mallInfo.eventhandler = {

    init : function() {
        this.bindButtonEvent();
    },

    bindButtonEvent : function() {
        var self = this;

        // 전시 템플릿 공통팝업 호출
        $('#btn_mallInfo_tmplPopup_call').click(function() {
            displayCategoryTotal.eventhandler.templatePopupCall();
        });

        // 전시템플릿 지우기
        $('#btn_mallInfo_tmplPopup_reset').click(function() {
            $('#mallInfo_tmplFilePath').val('');
            $('#mallInfo_tmplNo').val('');
        });

        // 전시 카테고리 TREE 공통팝업 호출
        $('#btn_mallInfo_dispTreePopup_call').click(function() {
            displayCategoryTotal.eventhandler.displayCategoryTreeCall();
        });

        // 매장번호 지우기
        $('#btn_mallInfo_dispTreePopup_reset').click(function() {
            $('#mallInfo_linkDispNm').val('');
            $('#mallInfo_linkDispNo').val('');
        });

        // 저장 버튼
        $('#btn_mallInfo_save').click(function() {
            self.onSave();
        });

        // 템플릿유형에 따른 UI 변경
        $("#mallInfo_prtTypCd").change(function() {
            self.rowSetting();
        });
    },

    mallDetail : function (dispCtgNo) {
        var self = this;
        var param = { dispCtgNo : dispCtgNo };
        common.Ajax.sendRequest(
              "POST"
            , _baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtMallDetail.do"
            , param
            , function(obj) {
                 if (obj.succeeded) {
                    self.valSetting(obj.data);
                 }
            }
        );
    },

    valSetting : function(info) {
        if(info != undefined) {
            $("#mallInfo_dispCtgNo").val(info.dispCtgNo);
            $("#mallInfo_siteNo").val(info.siteNo);
            $("#mallInfo_siteNm").text(info.siteNm);
            $("#mallInfo_shopTypCd").text(info.shopTypCd);
            $("#mallInfo_dpmlNo").val(info.dpmlNo);
            $("#mallInfo_dpmlNo_span").text(info.dpmlNo);
            $("#mallInfo_dispCtgNm").val(info.dispCtgNm);
            $("#mallInfo_dispSeq").val(info.dispSeq);
            $("#mallInfoForm input[name=dispYn]").attr("checked",false);
            $("#mallInfoForm input[name=useYn]").attr("checked",false);
            $("#mallInfoForm input[name=dispYn]:input[value="+ info.dispYn +"]").attr("checked",true);
            $("#mallInfoForm input[name=useYn]:input[value="+ info.useYn +"]").attr("checked",true);
            $("#mallInfo_hdrTypCd").val(info.hdrTypCd);
            $("#mallInfo_prtTypCd").val(info.prtTypCd);

            this.rowSetting();
            $("#mallInfo_movFrmeCd").val(info.movFrmeCd);
            $("#mallInfo_linkUrlAddr").val(info.linkUrlAddr);
            $("#mallInfo_linkDispNo").val(info.linkDispNo);
            $("#mallInfo_linkDispNm").val(info.linkDispNm);
            $("#mallInfo_tmplNo").val(info.tmplNo);
            $("#mallInfo_tmplFilePath").val(info.tmplFilePath);
            $("#mallInfo_sysModId").text(info.sysModId);
            $("#mallInfo_sysModDtm").text(info.sysModDtm);
        }
    },

    rowSetting : function() {
        var val = $("#mallInfo_prtTypCd").val();
        if(val == "" || val == "04") { // 빈값 or 연결없음
            $("#mallInfo_prtTypCd_tmpl").css("display", "none");
            $("#mallInfo_prtTypCd_category").css("display", "none");
            $("#mallInfo_prtTypCd_url").css("display", "none");
        } else if(val == "01") { //  템플릿 지정
            $("#mallInfo_prtTypCd_tmpl").css("display", "");
            $("#mallInfo_prtTypCd_category").css("display", "none");
            $("#mallInfo_prtTypCd_url").css("display", "none");
        } else if(val == "02") { // URL 이동
            $("#mallInfo_prtTypCd_tmpl").css("display", "none");
            $("#mallInfo_prtTypCd_category").css("display", "none");
            $("#mallInfo_prtTypCd_url").css("display", "");
        } else if(val == "03") { // 매장이동
            $("#mallInfo_prtTypCd_tmpl").css("display", "none");
            $("#mallInfo_prtTypCd_category").css("display", "");
            $("#mallInfo_prtTypCd_url").css("display", "none");
        }
    },

    valCheck : function() {
        if($('#mallInfo_dispCtgNm').val() == null || $('#mallInfo_dispCtgNm').val() == '') { // 전시몰 명
            alert(msg.categoryNm + msg.necessaryCheckMessage);
            $('#mallInfo_dispCtgNm').focus();
            return false;
        } else if($('#mallInfo_dispSeq').val() == null || $('#mallInfo_dispSeq').val() == '') { // 전시순서
             alert(msg.dispSeq + msg.necessaryCheckMessage);
             $('#mallInfo_dispSeq').focus();
             return false;
        } else if($("#mallInfoForm input[name=dispYn]:checked").length == 0) { // 전시 여부
             alert(msg.dispYn + msg.necessaryCheckMessage);
             $("#mallInfoForm input[name=dispYn][0]").focus();
             return false;
        } else if($("#mallInfoForm input[name=useYn]:checked").length == 0) { // 사용 여부
             alert(msg.useYn + msg.necessaryCheckMessage);
             $("#mallInfoForm input[name=useYn][0]").focus();
             return false;
        } else if($('#mallInfo_prtTypCd').val() == null || $('#mallInfo_prtTypCd').val() == '') {
             alert(msg.prtTypCd + msg.necessaryCheckMessage);
             $('#mallInfo_prtTypCd').focus();
             return false;
        }

        if( $('#mallInfo_prtTypCd').val() == "01") { // 템플릿 지정
            if($('#mallInfo_tmplFilePath').val() == null || $('#mallInfo_tmplFilePath').val() == '') { // 전시 템플릿
                alert(msg.displayTemplate + msg.necessaryCheckMessage);
                $('#mallInfo_tmplFilePath').focus();
                return false;
            }
        } else if( $('#mallInfo_prtTypCd').val() == "02") { // URL 이동
            if($('#mallInfo_movFrmeCd').val() == null || $('#mallInfo_movFrmeCd').val() == '') { // 이동방법
                alert(msg.movFrmeCd + msg.necessaryCheckMessage);
                $('#mallInfo_movFrmeCd').focus();
                return false;
            } else if($('#mallInfo_linkUrlAddr').val() == null || $('#mallInfo_linkUrlAddr').val() == '') { // 연결URL
                alert(msg.linkUrlAddr + msg.necessaryCheckMessage);
                $('#mallInfo_linkUrlAddr').focus();
                return false;
            }
        } else if( $('#mallInfo_prtTypCd').val() == "03") { // 매장이동
            if($('#mallInfo_linkDispNm').val() == null || $('#mallInfo_linkDispNm').val() == '') { // 매장번호
                alert(msg.linkDispNo + msg.necessaryCheckMessage);
                $('#mallInfo_linkDispNm').focus();
                return false;
            }
        }

        // 값 범위 체크
        if(!($('#mallInfo_dispSeq').val() >= 1 && $('#mallInfo_dispSeq').val() < 1000)) { // 전시순서
            alert(msg.numberRange1CheckMessage);
            $('#mallInfo_dispSeq').focus();
            return false;
        }

        return true;
    },

    onSave : function() {
        if(!this.valCheck()) return; // 값 체크

        common.Ajax.sendRequest(
              "POST"
            , _baseUrl + "display/displayCategoryMgmt.saveDisplayCategoryMgmtMallDetail.do"
            , fn_disabledSerialize("mallInfoForm")
            , function(obj) {
                 if (obj.succeeded) {
                    openToast(msg.successfully);
                    categoryTree.eventhandler.init();
                 }
            }
        );
    }
};