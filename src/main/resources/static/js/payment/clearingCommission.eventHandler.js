$.namespace("clearingCommission.eventhandler");
clearingCommission.eventhandler = {

    init : function () {
        this.calendarInit();
        if(req.argInsertUpdate == "I") { // 입력
            this.insertSetting();
        } else if(req.argInsertUpdate == "U") { // 수정
            this.valueSetting();
            this.layoutSetting();
            this.disabledSetting();
        }
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

		// 적용시작일시 달력버튼
        $('#calendarButton1').click(function() {
            showCalendar({
                type:'C', // C:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd:$('#aplyStartDate').val(),
                fn:function(pin) {
                    $('#aplyStartDate').val(pin.yyyymmdd);
                }
            });
        });

        // 결제수단명 설정 및 테이블 설정
        $('#cmsnTgtLgrpCd').change(function() {
            self.onCmsnTgtLgrpCdChange($('#cmsnTgtLgrpCd').val());
            self.layoutSetting();
        });

        // 수수료 설정
        $('input[name=cmsnGbCd]').change(function() {
            if($('input[name=cmsnGbCd]:checked').val() == "10") {
                $('#cmsnAmt').val(null);
                $('#cmsnAmt_CmsnGbCd').text("%");
            }
            if($('input[name=cmsnGbCd]:checked').val() == "20") {
                $('#cmsnRateBase').val(null);
                $('#cmsnAmt_CmsnGbCd').text("원");
            }
        });

        // 수수료유형 변경에 따른 테이블 설정
        $('input:radio[name=cmsnTypCd]').change(function() {
            self.layoutSetting();
        });

        // 취소 버튼
        $("#btn_popup_cancel").click(function() {
            if(confirm(msg.cancel)) {
                window.close();
            } else {
               return false;
            }
        });

        // 저장 버튼
        $("#btn_popup_save").click(function() {
            self.onSave();
        });
    },

    calendarInit : function(){
        initFromAndToCalDate = recentlyCalenderData(0);
        $('#aplyStartDate').val(initFromAndToCalDate[0]);
        if(req.argInsertUpdate == "I") { // 입력
            $('#aplyEndDate').text("2999-12-31");
        }
    },

    insertSetting : function(){
        $('input[name=cmsnGbCd]').last().attr("checked",true);
        $('#cmsnAmt_CmsnGbCd').text("원");
        $("#row1_content1_label").css("display","");
        $("#row1_content1").css("display","");
        $("#row1_content2_label").css("display","");
        $("#row1_content2").css("display","");
        $("#row1_content3_label").css("display","none");
        $("#row1_content3").css("display","none");

        $("#row2_content1").css("display","none");
        $("#row2_content2").css("display","none");
        $("tr[name=row2_content2_month]").css("display","none");
    },

    onCmsnTgtLgrpCdChange : function(cmsnTgtLgrpCd){
        $('#cmsnTgtSgrpCd option').not("[value='']").remove();
        if(cmsnTgtLgrpCd == "11") { // 신용카드
            if(code28List != null){
                for(const item of code28List){ // 매입사코드
                    $("#cmsnTgtSgrpCd").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                }
            }
        } else if(cmsnTgtLgrpCd == "21" || cmsnTgtLgrpCd == "22") { // 실시간계좌이체, 가상계좌
            if(code26List != null){
                for(const item of code26List){ // 은행코드
                    $("#cmsnTgtSgrpCd").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                }
            }
        }
    },

    layoutSetting : function(){
        if($('#cmsnTgtLgrpCd').val() == "11"){ // 결제수단유형 : 신용카드(11)
            if($('input[name=cmsnTypCd]:checked').val() == "20") { // 수수료 유형 : 무이자(20) // 가맹점 O, 할부월 O
                $("#row1_content1_label").css("display","none");
                $("#row1_content1").css("display","none");
                $("#row1_content2_label").css("display","none");
                $("#row1_content2").css("display","none");
                $("#row1_content3_label").css("display","");
                $("#row1_content3").css("display","");

                $("#row2_content1").css("display","none");
                $("#row2_content2").css("display","");
                $("tr[name=row2_content2_month]").css("display","");
            } else { // 가맹점 O, 할부월 X
                $("#row1_content1_label").css("display","none");
                $("#row1_content1").css("display","none");
                $("#row1_content2_label").css("display","none");
                $("#row1_content2").css("display","none");
                $("#row1_content3_label").css("display","");
                $("#row1_content3").css("display","");

                $("#row2_content1").css("display","");
                $("#row2_content2").css("display","none");
                $("tr[name=row2_content2_month]").css("display","none");
            }
        } else { // 가맹점 X, 할부월 X
            $("#row1_content1_label").css("display","");
            $("#row1_content1").css("display","");
            $("#row1_content2_label").css("display","");
            $("#row1_content2").css("display","");
            $("#row1_content3_label").css("display","none");
            $("#row1_content3").css("display","none");

            $("#row2_content1").css("display","none");
            $("#row2_content2").css("display","none");
            $("tr[name=row2_content2_month]").css("display","none");
        }
    },

    // 수정 불가 설정
    disabledSetting : function() {
        if($("#aplyEndDate").text() != "2999-12-31") { // 종료일자가 2999년이 아니면 수정불가
            $("input, select").attr("disabled",true);
        }

        // PK 수정불가 설정
        $("#pgGbCd").attr("disabled",true);
        $("#cmsnTgtLgrpCd").attr("disabled",true);
        $("#cmsnTgtSgrpCd").attr("disabled",true);
        $("#cmsnTgtSgrpCd").attr("disabled",true);
        $("input[name=cmsnTypCd]").attr("disabled",true);
        $("#aplyStartDate").attr("disabled",true);
    },

    // 수정 시 값 셋팅
    valueSetting : function(){
        // 결제수단 유형 선택
        $("#pgGbCd").val(req.pgGbCd);
        $("#cmsnTgtLgrpCd").val(req.cmsnTgtLgrpCd);
        this.onCmsnTgtLgrpCdChange(req.cmsnTgtLgrpCd);
        $("#cmsnTgtSgrpCd").val(req.cmsnTgtSgrpCd);

        // 수수료 정보
        // 공통
        $("#aplyStartDate").val(req.aplyStrDtm.split(" ")[0]);
        $("#aplyEndDate").text(req.aplyEndDtm.split(" ")[0]);
        $('input[name=vatInclYn]:input[value='+ req.vatInclYn +']').attr("checked",true);
        $('input[name=adjGbCd]:input[value='+ req.adjGbCd +']').attr("checked",true);
        $("#rmkCont").val(req.rmkCont);

        if($("#cmsnTgtLgrpCd").val() != "11") { // 신용카드가 아닌 경우
            $('input[name=cmsnGbCd]:input[value='+ req.cmsnGbCd +']').attr("checked",true);
            if(req.cmsnGbCd == "10") { // 율
                $("#cmsn").val(req.cmsnRate);
                $('#cmsnAmt_CmsnGbCd').text("%");
            } else if(req.cmsnGbCd == "20") { // 금액
                $("#cmsn").val(req.cmsnAmt);
                $('#cmsnAmt_CmsnGbCd').text("원");
            }
        } else { // 신용카드인 경우
            $('input[name=cmsnTypCd]:input[value='+ req.cmsnTypCd +']').attr("checked",true);

            // 가맹점 값 셋팅
            if(req.cmsnTypCd == "20") { // 무이자
                if(mersList.length != 0){
                    for(i=0; i<mersList.length; i++){
                        var chkbox = $("input:checkbox[name=mersList2]");
                        for(j=0; j<chkbox.length; j++) {
                            $("input:checkbox[name=mersList2]:input[value="+ mersList[i].mersNo +"]").attr("checked",true);
                        }
                    }
                }
            } else {
                if(mersList.length != 0){
                    for(i=0; i<mersList.length; i++){
                        var chkbox = $("input:checkbox[name=mersList1]");
                        for(j=0; j<chkbox.length; j++) {
                            $("input:checkbox[name=mersList1]:input[value="+ mersList[i].mersNo +"]").attr("checked",true);
                        }
                    }
                }
            }

            // 수수료 유형 : 무이자(20) -> 할부월 셋팅
            if(req.cmsnTypCd == "20") {
                if(monthList.length != 0){
                    for(i=0; i<monthList.length; i++){
                        $("#month"+ monthList[i].instMonCnt).val(monthList[i].cmsnRate);
                    }
                }
            } else {
                $("#cmsnRate").val(req.cmsnRate);
            }
        }
    },

    // 필수 입력 확인
    valCheck : function(){
        if($('#pgGbCd').val() == null || $('#pgGbCd').val() == '') {
             alert("PG사는 " + msg.necessaryCheckMessage);
             $('#pgGbCd').focus();
             return false;
        } else if($('#cmsnTgtLgrpCd').val() == null || $('#cmsnTgtLgrpCd').val() == '') {
             alert("결제수단유형은 " + msg.necessaryCheckMessage);
             $('#cmsnTgtLgrpCd').focus();
             return false;
        } else if($('#cmsnTgtSgrpCd').val() == null || $('#cmsnTgtSgrpCd').val() == '') {
             alert("결제수단명은 " + msg.necessaryCheckMessage);
             $('#cmsnTgtSgrpCd').focus();
             return false;
        }

        if($('#cmsnTgtLgrpCd').val() == "11"){ // 결제수단유형 : 신용카드(11)
            if($('input[name=cmsnTypCd]:checked').val() == null || $('input[name=cmsnTypCd]:checked').val() == '') {
                 alert("수수료 유형은 " + msg.necessaryCheckMessage);
                 $('input[name=cmsnTypCd]').first().focus();
                 return false;
            }

            if($('input[name=cmsnTypCd]:checked').val() == "20") { // 수수료 유형 : 무이자(20) // 할부월 O
                if($("input[name=mersList2]:checked").length == 0) { // 가맹점 선택
                    alert(msg.mersCheck);
                    $("input[name=mersList2][0]").focus();
                    return false;
                }

                var monthCnt = false;
                for(i=2; i<13; i++){
                    if($("#month"+ i).val() != null && $("#month"+ i).val() != '') {
                        monthCnt = true;
                        break;
                    }
                }
                if(!monthCnt) {
                    alert(msg.monthCheck);
                    return false;
                }
            } else { // 할부월 X
                if($("input[name=mersList1]:checked").length == 0) { // 가맹점 선택
                    alert(msg.mersCheck);
                    $("input[name=mersList1][0]").focus();
                    return false;
                }

                if($('#cmsnRate').val() == null || $('#cmsnRate').val() == '') {
                    alert("수수료율은 " + msg.necessaryCheckMessage)
                    $('#cmsnRate').focus();
                    return false;
                }
            }
        } else { // 가맹점 X, 할부월 X
             if($('input[name=cmsnGbCd]:checked').val() == null || $('input[name=cmsnGbCd]:checked').val() == '') {
                  alert("수수료 구분은 " + msg.necessaryCheckMessage);
                  $('input[name=cmsnGbCd]').first().focus();
                  return false;
             }

             if($('#cmsn').val() == null || $('#cmsn').val() == '') {
                  alert("수수료는 " + msg.necessaryCheckMessage)
                  $('#cmsn').focus();
                  return false;
             } else {
                if($('input[name=cmsnGbCd]:checked').val() == "10" ) $('#cmsnRateBase').val($('#cmsn').val());
                if($('input[name=cmsnGbCd]:checked').val() == "20" ) $('#cmsnAmt').val($('#cmsn').val());
             }
        }

        if($('#aplyStartDate').val() == null || $('#aplyStartDate').val() == '') {
             alert("적용시작일자는 " + msg.necessaryCheckMessage);
             $('#aplyStartDate').focus();
             return false;
        } else if($('input[name=vatInclYn]:checked').val() == null || $('input[name=vatInclYn]:checked').val() == '') {
             alert("VAT 포함여부는 " + msg.necessaryCheckMessage);
             $('input[name=vatInclYn]').first().focus();
             return false;
        } else if($('input[name=adjGbCd]:checked').val() == null || $('input[name=adjGbCd]:checked').val() == '') {
             alert("정산구분은 " + msg.necessaryCheckMessage);
             $('input[name=adjGbCd]').first().focus();
             return false;
        }

        return true;
    },

    aplyDateFormat : function(){
        var aplyStrDtm = $("#aplyStartDate").val() + " 00:00:00";
        $("#aplyStrDtm").val(aplyStrDtm);
        var aplyEndDtm = $("#aplyEndDate").val() + " 23:59:59";
        $("#aplyEndDtm").val(aplyEndDtm);
    },

    // 적용기간 내 중복여부 확인
    aplyDateCheck : function () {
        this.aplyDateFormat();
        var result = true;
        var cmsnGbCd = $('input[name=cmsnGbCd]:checked').val();
        var cmsnTypCd = $('input[name=cmsnTypCd]:checked').val();
        if($("#cmsnTgtLgrpCd").val() != "11") { // 결제수단유형 : 신용카드(11)
            cmsnTypCd = "0";
        }

        var param = {
              argInsertUpdate : req.argInsertUpdate
            , pgGbCd : $("#pgGbCd").val()
            , cmsnTgtLgrpCd : $("#cmsnTgtLgrpCd").val()
            , cmsnTgtSgrpCd : $("#cmsnTgtSgrpCd").val()
            , cmsnTypCd : cmsnTypCd
            , aplyStrDtm : $("#aplyStrDtm").val()
            , aplyEndDtm : $("#aplyEndDtm").val()
        }

        common.Ajax.sendRequestSync(
             "POST"
             ,_baseUrl + "payment/PaymentCommissionMgmt.getApplyDateCheck.do"
             ,param
             ,function(obj) {
                  if (!obj.succeeded) {
                     result = false;
                  }
             }
        );

        if(result){
            return true;
        } else {
            alert(msg.aplyDateCheck);
            return false;
        }
            return true;
    },

    // 달별 수수료율
    monthListSetting : function () {
        var monthList = [];
        for(var i=2; i<13; i++) {
            if($("#month" + i).val() != null && $("#month" + i).val() != '' && $("#month" + i).val() != '0') {
                monthList.push(i + "-" + $("#month" + i).val());
            }
        }
        $("#monthList").val(monthList);
    },

    saveValueSetting : function(){
        if($('#cmsnTgtLgrpCd').val() == "11"){ // 결제수단유형 : 신용카드(11)
            if($('input[name=cmsnTypCd]:checked').val() == "20") { // 수수료 유형 : 무이자(20) // 가맹점 O, 할부월 O
                $('#cmsnRate').val(0);
                $('input[name=cmsnGbCd]').val("0");
                $('input[name=mersList1]').val("");
            } else { // 가맹점 O, 할부월 X
                $("input[name=month]").val(null);
                $('input[name=cmsnGbCd]').val("0");
                $('input[name=mersList2]').val("");
            }
        } else { // 가맹점 X, 할부월 X
            $('input:radio[name=cmsnTypCd]').val("0");
            $('input[name=mersList1]').val("");
            $('input[name=mersList2]').val("");
            $('#cmsnRate').val(0);
            $("input[name=month]").val(null);
        }

        if(req.aplyEndDtm != null) {
            $("#aplyEndDtm").val(req.aplyEndDtm);
        } else {
            $("#aplyEndDtm").val("2999-12-31 23:59:59");
        }
    },

    // 저장
    onSave : function() {

        if(req.argInsertUpdate == "U") {
            if($("#aplyEndDate").text() != "2999-12-31") { // 종료일자가 2999년만 수정가능
                alert(msg.doneSave);
                return false;
            }
        }

        // 필수 입력 확인
        if( !this.valCheck() ) { return; }

        // 적용기간 내 중복여부 확인
        if( !this.aplyDateCheck() ) { return; }

        // 달별 수수료율 값 셋팅
        if($('#cmsnTgtLgrpCd').val() == "11" && $('input[name=cmsnTypCd]:checked').val() == "20"){ // 결제수단유형 : 신용카드(11) // 수수료 유형 : 무이자(20)
            this.monthListSetting();
        }

        // 저장확인문구
        if( !confirm(msg.save)) { return; }

        this.saveValueSetting();

       $("#clearingCommissionForm").find(':disabled').prop('disabled',false);
        common.Ajax.sendRequestSync(
            "POST"
            , _baseUrl + "payment/PaymentCommissionMgmt.savePaymentCommission.do"
            , $("#clearingCommissionForm").serializeObject()
            , function (data) {
                  if(data.succeeded){ // 오류 수정 <- if(JSON.parse(data).succeeded){ 
                      // 중복메시지 <- alert(JSON.parse(data).message);
                      opener.clearingCommissionGrid.eventhandler.onSearch(0);
                      window.close();
                  } else {
                      console.log("결제수수료관리 저장 오류");
                  }
              }
        );
    }
};