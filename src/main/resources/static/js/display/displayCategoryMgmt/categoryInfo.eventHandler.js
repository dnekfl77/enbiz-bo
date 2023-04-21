$.namespace("categoryInfo.eventhandler");
categoryInfo.eventhandler = {
    // 초기화
    init : function () {
        this.rowSetting();
        this.bindButtonEvent();
    },

    bindButtonEvent : function() {
        var self = this;

        // 전시 템플릿 공통팝업 호출
        $('#btn_category_tmplPopup_call').click(function() {
            displayCategoryTotal.eventhandler.templatePopupCall();
        });

        // 전시템플릿 지우기
        $('#btn_category_tmplPopup_reset').click(function() {
            $('#categoryInfo_tmplFilePath').val('');
            $('#categoryInfo_tmplNo').val('');
        });

        // 전시 카테고리 TREE 공통팝업 호출
        $('#btn_categoryInfo_dispTreePopup_call').click(function() {
            displayCategoryTotal.eventhandler.displayCategoryTreeCall();
        });

        // 매장번호 지우기
        $('#btn_categoryInfo_dispTreePopup_reset').click(function() {
            $('#categoryInfo_linkDispNm').val('');
            $('#categoryInfo_linkDispNo').val('');
        });

        // 저장 버튼
        $('#btn_categoryInfo_save').click(function() {
            self.onSave();
        });

        // 템플릿유형에 따른 UI 변경
        $("#categoryInfo_prtTypCd").change(function() {
            self.rowSetting();
        });

		//달력버튼
     	$('#calendarButton1').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#categoryInfo_startDate').val(),
				max_term:0,
				fn:function(pin) {
					$('#categoryInfo_startDate').val(pin.yyyymmdd);
				}
			});
		});

		//달력버튼
     	$('#calendarButton2').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#categoryInfo_endDate').val(),
				max_term:0,
				fn:function(pin) {
					$('#categoryInfo_endDate').val(pin.yyyymmdd);
				}
			});
		});

    },

    categoryDetail : function(no){
        var self = this;
        var param = { dispCtgNo : no };
        common.Ajax.sendRequest(
            "POST"
            ,_baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtCategoryDetail.do"
            ,param
            ,function(obj) {
                 if (obj.succeeded == true) {
                    self.valSetting(obj.data);
                 }
            }
        );
    },

    valSetting : function(info) {
        if(info != undefined) {
            $("#categoryInfo_leafYn").val(info.leafYn);
            $("#categoryInfo_siteNo").val(info.siteNo);
            $("#categoryInfo_siteNm").text(info.siteNm);
            $("#categoryInfo_shopTypCd").val(info.shopTypCd);
            $("#categoryInfo_shopName").text(info.shopTypName);
            $("#categoryInfo_dispCtgNo").val(info.dispCtgNo);
            $("#categoryInfo_categoryNo").text(info.dispCtgNo);
            $("#categoryInfo_categoryNm").val(info.dispCtgNm);
            $("#categoryInfo_dispSeq").val(info.dispSeq);
            $('#categoryInfoForm input[name=dispYn]').attr("checked",false);
            $('#categoryInfoForm input[name=useYn]').attr("checked",false);
            $('#categoryInfoForm input[name=dispYn]:input[value='+ info.dispYn +']').attr("checked",true);
            $('#categoryInfoForm input[name=useYn]:input[value='+ info.useYn +']').attr("checked",true);

    	    var dispStrDt = info.dispStrDt.substring(0,4) + "-" + info.dispStrDt.substring(4,6) + "-" + info.dispStrDt.substring(6,8);
            $("#categoryInfo_startDate").val(dispStrDt);
    	    var dispEndDt = info.dispEndDt.substring(0,4) + "-" + info.dispEndDt.substring(4,6) + "-" + info.dispEndDt.substring(6,8);
            $("#categoryInfo_endDate").val(dispEndDt);

            $("#categoryInfo_prtTypCd").val(info.prtTypCd);
            this.rowSetting();

            $("#categoryInfo_movFrmeCd").val(info.movFrmeCd);
            $("#categoryInfo_linkUrlAddr").val(info.linkUrlAddr);
            $("#categoryInfo_linkDispNo").val(info.linkDispNo);
            $("#categoryInfo_linkDispNm").val(info.dispCtgNm);
            $("#categoryInfo_tmplNo").val(info.tmplNo);
            $("#categoryInfo_tmplFilePath").val(info.tmplFilePath);
            $("#categoryInfo_sysModId").text(info.sysModId);
            $("#categoryInfo_sysModDtm").text(info.sysModDtm);
        }
    },

    rowSetting : function() {
        var val = $("#categoryInfo_prtTypCd").val();
        if(val == "" || val == "04") { // 빈값 or 연결없음
            $("#categoryInfo_prtTypCd_tmpl").css("display", "none");
            $("#categoryInfo_prtTypCd_category").css("display", "none");
            $("#categoryInfo_prtTypCd_url").css("display", "none");
        } else if(val == "01") { //  템플릿 지정
            $("#categoryInfo_prtTypCd_tmpl").css("display", "");
            $("#categoryInfo_prtTypCd_category").css("display", "none");
            $("#categoryInfo_prtTypCd_url").css("display", "none");
        } else if(val == "02") { // URL 이동
            $("#categoryInfo_prtTypCd_tmpl").css("display", "none");
            $("#categoryInfo_prtTypCd_category").css("display", "none");
            $("#categoryInfo_prtTypCd_url").css("display", "");
        } else if(val == "03") { // 매장이동
            $("#categoryInfo_prtTypCd_tmpl").css("display", "none");
            $("#categoryInfo_prtTypCd_category").css("display", "");
            $("#categoryInfo_prtTypCd_url").css("display", "none");
        }

    },

    valCheck : function() {
        if($('#categoryInfo_categoryNm').val() == null || $('#categoryInfo_categoryNm').val() == '') {
            alert(msg.categoryNm + msg.necessaryCheckMessage);
            $('#categoryInfo_categoryNm').focus();
            return false;
        } else if($('#categoryInfo_dispSeq').val() == null || $('#categoryInfo_dispSeq').val() == '') {
             alert(msg.dispSeq + msg.necessaryCheckMessage);
             $('#categoryInfo_dispSeq').focus();
             return false;
        } else if($("#categoryInfoForm input[name=dispYn]:checked").length == 0) { // 전시 여부
             alert(msg.dispYn + msg.necessaryCheckMessage);
             $("#categoryInfoForm input[name=dispYn][0]").focus();
             return false;
        } else if($("#categoryInfoForm input[name=useYn]:checked").length == 0) { // 사용 여부
             alert(msg.useYn + msg.necessaryCheckMessage);
             $("#categoryInfoForm input[name=useYn][0]").focus();
             return false;
        } else if($('#categoryInfo_startDate').val() == null || $('#categoryInfo_startDate').val() == '') { // 전시시작일자
             alert(msg.dispStrDt + msg.necessaryCheckMessage);
             $("#categoryInfo_startDate").focus();
             return false;
        } else if($('#categoryInfo_endDate').val() == null || $('#categoryInfo_endDate').val() == '') { // 전시종료일자
             alert(msg.dispEndDt + msg.necessaryCheckMessage);
             $("#categoryInfo_endDate").focus();
             return false;
        } else if($('#categoryInfo_prtTypCd').val() == null || $('#categoryInfo_prtTypCd').val() == '') {
             alert(msg.prtTypCd + msg.necessaryCheckMessage);
             $('#categoryInfo_prtTypCd').focus();
             return false;
        }

        if( $('#categoryInfo_prtTypCd').val() == "01") { // 템플릿 지정
            if($('#categoryInfo_tmplFilePath').val() == null || $('#categoryInfo_tmplFilePath').val() == '') { // 전시 템플릿
                alert(msg.displayTemplate + msg.necessaryCheckMessage);
                $('#categoryInfo_tmplFilePath').focus();
                return false;
            }
        } else if( $('#categoryInfo_prtTypCd').val() == "02") { // URL 이동
            if($('#categoryInfo_movFrmeCd').val() == null || $('#categoryInfo_movFrmeCd').val() == '') { // 이동방법
                alert(msg.movFrmeCd + msg.necessaryCheckMessage);
                $('#categoryInfo_movFrmeCd').focus();
                return false;
            } else if($('#categoryInfo_linkUrlAddr').val() == null || $('#categoryInfo_linkUrlAddr').val() == '') { // 연결URL
                alert(msg.linkUrlAddr + msg.necessaryCheckMessage);
                $('#categoryInfo_linkUrlAddr').focus();
                return false;
            }
        } else if( $('#categoryInfo_prtTypCd').val() == "03") { // 매장이동
            if($('#categoryInfo_linkDispNm').val() == null || $('#categoryInfo_linkDispNm').val() == '') { // 매장번호
                alert(msg.linkDispNo + msg.necessaryCheckMessage);
                $('#categoryInfo_linkDispNm').focus();
                return false;
            }
        }

        // 값 범위 체크
        if(!($('#categoryInfo_dispSeq').val() >= 1 && $('#categoryInfo_dispSeq').val() < 1000)) { // 팝업 사이즈 넓이 (1~999 사이의 수)
            alert(msg.numberRange1CheckMessage);
            $('#categoryInfo_dispSeq').focus();
            return false;
        }

        return true;
    },

    onSave : function() {
        if(!this.valCheck()) return; // 값 체크

         // form 전체 disabled 풀어주기
         $("form[name=categoryInfoForm] input:disabled, select:disabled, radio:disabled").removeAttr("disabled");

        var dispStrDt = $("#categoryInfo_startDate").val().split("-");
        dispStrDt = dispStrDt[0] + dispStrDt[1] + dispStrDt[2];
        var dispEndDt = $("#categoryInfo_endDate").val().split("-");
        dispEndDt = dispEndDt[0] + dispEndDt[1] + dispEndDt[2];

        var param = $("#categoryInfoForm").serialize();
        param += "&dispStrDt=" + dispStrDt + "&dispEndDt=" + dispEndDt;

        common.Ajax.sendRequest(
              "POST"
            , _baseUrl + "display/displayCategoryMgmt.saveDisplayCategoryMgmtCategoryDetail.do"
            , param
            , function(obj) {
                 if (obj.succeeded) {
                    openToast(msg.successfully);
                    categoryTree.eventhandler.init();
                 }
            }
        );

    }
};