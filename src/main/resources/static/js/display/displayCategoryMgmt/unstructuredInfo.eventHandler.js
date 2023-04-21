$.namespace("unstructuredInfo.eventhandler");
unstructuredInfo.eventhandler = {

    init : function () {
        this.bindButtonEvent();
    },

    bindButtonEvent : function() {
        var self = this;

        // 템플릿유형에 따른 UI 변경
        $("#unstructuredInfo_prtTypCd").change(function() {
            self.rowSetting();
        });

        // 전시 템플릿 공통팝업 호출
        $('#btn_unstructured_tmplPopup_call').click(function() {
            displayCategoryTotal.eventhandler.templatePopupCall();
        });

        // 전시템플릿 지우기
        $('#btn_unstructured_tmplPopup_reset').click(function() {
            $('#unstructuredInfo_tmplFilePath').val('');
            $('#unstructuredInfo_tmplNo').val('');
        });

        // 전시 카테고리 TREE 공통팝업 호출
        $('#btn_unstructured_dispTreePopup_call').click(function() {
            displayCategoryTotal.eventhandler.displayCategoryTreeCall();
        });

        // 매장번호 지우기
        $('#btn_unstructured_dispTreePopup_reset').click(function() {
            $('#unstructuredInfo_linkDispNm').val('');
            $('#unstructuredInfo_linkDispNo').val('');
        });


        // 저장 버튼
        $('#btn_unstructuredInfo_save').click(function() {
            if(self.valCheck()){ // 값 체크
                self.onSave();
            }
        });
    },

    mallDetail : function(data){
        var self = this;
        var param = { dispCtgNo : data.dispCtgNo };
        common.Ajax.sendRequest(
            "POST"
            ,_baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtCategoryDetail.do"
            ,param
            ,function(obj) {
                 if (obj.succeeded) {
                    self.valSetting(obj.data);
                 }
            }
        );
    },

    valSetting : function(info) {
        if(info != undefined) {
            $("#unstructuredInfo_siteNo").val(info.siteNo);
            $("#unstructuredInfo_leafYn").val(info.leafYn);
            $("#unstructuredInfo_shopTypCd").val(info.shopTypCd);
            $("#unstructuredInfo_shopName").text(info.shopTypName);
            $("#unstructuredInfo_siteNm").text(info.siteNm);
            $("#unstructuredInfo_dispCtgNo").val(info.dispCtgNo);
            $("#unstructuredInfo_unstructuredNo").text(info.dispCtgNo);

            this.layoutLoading( info.leafYn );
            $("#unstructuredInfo_dispCtgNm_span").css("display", "none");
            $("#unstructuredInfo_dispCtgNm").val(info.dispCtgNm);
            $('#unstructuredInfoForm input:radio[name=useYn]').attr("checked",false);
            $('#unstructuredInfoForm input:radio[name=useYn]:input[value='+ info.useYn +']').attr("checked",true);
            $("#unstructuredInfo_shopDescCont").val(info.shopDescCont);
            $("#unstructuredInfo_sysModId").text(info.sysModId);
            $("#unstructuredInfo_sysModDtm").text(info.sysModDtm);

            if( info.leafYn == "Y" ) { // 최하위 노드인 경우
                $("#unstructuredInfo_prtTypCd").val(info.prtTypCd);
                this.rowSetting();
                $("#unstructuredInfo_movFrmeCd").val(info.movFrmeCd);
                $("#unstructuredInfo_linkUrlAddr").val(info.linkUrlAddr);
                $("#unstructuredInfo_linkDispNo").val(info.linkDispNo);
                $("#unstructuredInfo_linkDispNm").val(info.dispCtgNm);
                $("#unstructuredInfo_tmplNo").val(info.tmplNo);
                $("#unstructuredInfo_tmplFilePath").val(info.tmplFilePath);
            }
        }
    },

    layoutLoading : function(leaf) {
        // 비장형 매장명
        $("#dispCtgNm_td").css("display", "none");
        $("#dispCtgNm_td_necessary").css("display", "");
        $("#unstructuredInfo_dispCtgNm").css("display", "");
        $("#unstructuredInfo_dpmlNm").css("display", "none");
        $("#unstructuredInfo_sysModRow").css("display", "");

        // 출력유형에 따른 행 추가
        $("#unstructuredInfo_prtTypCd_tmpl").css("display", "none");
        $("#unstructuredInfo_prtTypCd_category").css("display", "none");
        $("#unstructuredInfo_prtTypCd_url").css("display", "none");

        if( leaf == "N" ) {
            $("#unstructuredInfo_leafRow").css("display", "none");
        } else { // 최하위 노드인 경우
            $("#unstructuredInfo_leafRow").css("display", "");
        }
    },

    rowSetting : function() {
        var val = $("#unstructuredInfo_prtTypCd").val();
        if(val == "" || val == "04") { // 빈값 or 연결없음
            $("#unstructuredInfo_prtTypCd_tmpl").css("display", "none");
            $("#unstructuredInfo_prtTypCd_category").css("display", "none");
            $("#unstructuredInfo_prtTypCd_url").css("display", "none");
        } else if(val == "01") { //  템플릿 지정
            $("#unstructuredInfo_prtTypCd_tmpl").css("display", "");
            $("#unstructuredInfo_prtTypCd_category").css("display", "none");
            $("#unstructuredInfo_prtTypCd_url").css("display", "none");
        } else if(val == "02") { // URL 이동
            $("#unstructuredInfo_prtTypCd_tmpl").css("display", "none");
            $("#unstructuredInfo_prtTypCd_category").css("display", "none");
            $("#unstructuredInfo_prtTypCd_url").css("display", "");
        } else if(val == "03") { // 매장이동
            $("#unstructuredInfo_prtTypCd_tmpl").css("display", "none");
            $("#unstructuredInfo_prtTypCd_category").css("display", "");
            $("#unstructuredInfo_prtTypCd_url").css("display", "none");
        }

    },

    valCheck : function() {
        if($('#unstructuredInfo_dispCtgNm').val() == null || $('#unstructuredInfo_dispCtgNm').val() == '') {
            alert(msg.unstructuredInfoCategoryNm + msg.necessaryCheckMessage);
            $('#unstructuredInfo_dispCtgNm').focus();
            return false;
        } else if($("#unstructuredInfoForm input[name=useYn]:checked").length == 0) { // 사용 여부
             alert(msg.useYn + msg.necessaryCheckMessage);
             $("#unstructuredInfoForm input[name=useYn][0]").focus();
             return false;
        }

        if( $('#unstructuredInfo_leafYn').val() == "Y" ) { // 최하위 노드인 경우만 확인
            if($('#unstructuredInfo_prtTypCd').val() == null || $('#unstructuredInfo_prtTypCd').val() == '') {
                 alert(msg.prtTypCd + msg.necessaryCheckMessage);
                 $('#unstructuredInfo_prtTypCd').focus();
                 return false;
            }

            if( $('#unstructuredInfo_prtTypCd').val() == "01") { // 템플릿 지정
                if($('#unstructuredInfo_tmplFilePath').val() == null || $('#unstructuredInfo_tmplFilePath').val() == '') { // 전시 템플릿
                    alert(msg.displayTemplate + msg.necessaryCheckMessage);
                    $('#unstructuredInfo_tmplFilePath').focus();
                    return false;
                }
            } else if( $('#unstructuredInfo_prtTypCd').val() == "02") { // URL 이동
                if($('#unstructuredInfo_movFrmeCd').val() == null || $('#unstructuredInfo_movFrmeCd').val() == '') { // 이동방법
                    alert(msg.movFrmeCd + msg.necessaryCheckMessage);
                    $('#unstructuredInfo_movFrmeCd').focus();
                    return false;
                } else if($('#unstructuredInfo_linkUrlAddr').val() == null || $('#unstructuredInfo_linkUrlAddr').val() == '') { // 연결URL
                    alert(msg.linkUrlAddr + msg.necessaryCheckMessage);
                    $('#unstructuredInfo_linkUrlAddr').focus();
                    return false;
                }
            } else if( $('#unstructuredInfo_prtTypCd').val() == "03") { // 매장이동
                if($('#unstructuredInfo_linkDispNm').val() == null || $('#unstructuredInfo_linkDispNm').val() == '') { // 매장번호
                    alert(msg.linkDispNo + msg.necessaryCheckMessage);
                    $('#unstructuredInfo_linkDispNm').focus();
                    return false;
                }
            }
        }

        return true;
    },

    onSave : function() {
        common.Ajax.sendRequest(
              "POST"
            , _baseUrl + "display/displayCategoryMgmt.saveDisplayCategoryMgmtCategoryDetail.do"
            , fn_disabledSerialize("unstructuredInfoForm")
            , function(obj) {
                 if (obj.succeeded) {
                    openToast(msg.successfully);
                    categoryTree.eventhandler.init();
                 }
            }
        );

    }
};