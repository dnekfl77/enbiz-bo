$.namespace("claimDiscountMersGrid.eventhandler");
claimDiscountMersGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.onSearch(0); // 가맹점 리스트 조회
        if(req.argInsertUpdate == "U") { // 수정
            this.valueSetting();
            this.disableSetting(); // 수정가능여부 설정
        }
        this.bindButtonEvent();
    },

    calendarInit : function(){
        initFromAndToCalDate = recentlyCalenderData(0);
        $('#aplyStartDate').val(initFromAndToCalDate[0]);
        $('#aplyEndDate').val(initFromAndToCalDate[1]);
        $('#aplyEndHour').val('23');
        $('#aplyEndMinute').val('59');
    },

    // 수정 시 값 셋팅
    valueSetting : function(){
        $("#acqrCd").val(req.acqrCd);
        $("#clmDcGdNoText").text(req.clmDcGdNo);
        $("#clmDcGdNo").val(req.clmDcGdNo);
        $("#sysModId").text(req.sysModId);
        $("#sysModDtm").text(req.sysModDtm);

        var aplyStrDate = req.aplyStrDtm.split(" ");
        $("#aplyStartDate").val(aplyStrDate[0]);
        var aplyStrDate_time = aplyStrDate[1].split(":");
        $("#aplyStartHour").val(aplyStrDate_time[0]);
        $("#aplyStartMinute").val(aplyStrDate_time[1]);

        var aplyEndDate = req.aplyEndDtm.split(" ");
        $("#aplyEndDate").val(aplyEndDate[0]);
        var aplyEndDate_time = aplyEndDate[1].split(":");
        $("#aplyEndHour").val(aplyEndDate_time[0]);
        $("#aplyEndMinute").val(aplyEndDate_time[1]);

        $("#payStdAmt").val(req.payStdAmt);
        $("#fixamtFxrtGbCd").val(req.fixamtFxrtGbCd);
        $("#dcRateAmt").val(req.dcRateAmt);
        $("#maxDcAmt").val(req.maxDcAmt);
    },

    mersValueSetting : function(){
        var list = reqMers.mersList;
        for(var i = 0; i<this.grid.getItemCount(); i++){ // 그리드 행
            for(var j = 0; j<list.split(",").length; j++){ // 가맹점 리스트
                if(this.grid.getValue(i , "mersNo") == list.split(",")[j]) {
                    this.grid.checkRow(i);
                    break;
                }
            }
        }
    },

    disableSetting : function(){
        // 1 : 대기 : 모두 수정가능
        // 2 : 진행 : 종료일자만 수정가능
        // 3 : 종료 : 모두 수정불가
        if(req.state == "2") {
            this.grid.setCheckableExpression("1 <> 1"); // 그리드 체크바 수정불가
            $("#acqrCd").attr("disabled",true);
            $("#aplyStartHour").attr("disabled",true);
            $("#aplyStartMinute").attr("disabled",true);
            $("#payStdAmt").attr("disabled",true);
            $("#fixamtFxrtGbCd").attr("disabled",true);
            $("#dcRateAmt").attr("disabled",true);
            $("#maxDcAmt").attr("disabled",true);
        } else if(req.state == "3") {
            this.grid.setCheckableExpression("1 <> 1"); // 그리드 체크바 수정불가
            $("input, select").attr("disabled",true);
        }
    },

    gridLoading : function(){
        var self = this;

        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable: false });

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        };
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });
    },

    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            if (data.payloads.length == 0) { //검색 결과 없을 경우
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            } else {
                if(req.argInsertUpdate == "U") { // 수정인 경우
                    if(reqMers.length != 0){
                        claimDiscountMersGrid.eventhandler.mersValueSetting(); // 가맹점 값 셋팅
                    }
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

		// 적용시작일시 달력버튼 : 대기인 경우만 수정가능
        if(req.state == "1" || req.argInsertUpdate == "I") {
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
        }

		// 작용종료일시 달력버튼 : 대기, 진행인 경우만 수정가능
		if(req.state == "1" || req.state == "2" || req.argInsertUpdate == "I" ) {
            $('#calendarButton2').click(function() {
                showCalendar({
                    type:'C', // C:해당 날짜 1개 선택
                    format:'yyyy-MM-dd',
                    yyyymmdd:$('#aplyEndDate').val(),
                    fn:function(pin) {
                        $('#aplyEndDate').val(pin.yyyymmdd);
                    }
                });
            });
		}

        // 취소 버튼
        $("#btn_popup_cancel").click(function() {
            if(confirm(msg.cancel)) {
                window.close();
            } else {
               return false;
            }
        });

        // 삭제 버튼
        $("#btn_popup_delete").click(function() {
            self.onDelete();
        });

        // 저장 버튼
        $("#btn_popup_save").click(function() {
            self.onSave();
        });
    },

    onSearch : function(pageNo){
        var that = this;
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, null, pageNo, pageFunc);
    },

    onDelete : function(){
        if(req.state == "1") {
            if( confirm(msg.deleteMessage)) {
                var param = {
                    clmDcGdNo : $("#clmDcGdNo").val()
                }
                common.Ajax.sendRequestSync(
                    "POST"
                    , _baseUrl + "payment/ClaimDiscountGuideMgmt.deleteClaimDiscountGuide.do"
                    , param
                    , function ( data ) {
                          if(data.succeeded){ // 오류 수정 <- if(JSON.parse(data).succeeded){
                              // 메시지 중복 alert(JSON.parse(data).message);
                              opener.claimDiscountInfoGrid.eventhandler.onSearch(0);
                              window.close();
                          }
                      }
                );
            } else {
                return false;
            }
        } else {
            alert(msg.deleteState);
        }
    },

    // 필수 입력 확인
    valCheck : function(){
        if($('#acqrCd').val() == null || $('#acqrCd').val() == '') {
            alert("매입사는 " + msg.necessaryCheckMessage);
            $('#acqrCd').focus();
            return false;
        } else if($('#aplyStartDate').val() == null || $('#aplyStartDate').val() == '') {
            alert("적용시작일시는 " + msg.necessaryCheckMessage);
            $('#aplyStartDate').focus();
            return false;
        } else if($('#aplyEndDate').val() == null || $('#aplyEndDate').val() == '') {
            alert("적용종료일시는 " + msg.necessaryCheckMessage);
            $('#aplyEndDate').focus();
            return false;
        } else if($('#payStdAmt').val() == null || $('#payStdAmt').val() == '') {
            alert("결제기준금액은 " + msg.necessaryCheckMessage);
            $('#payStdAmt').focus();
            return false;
        } else if($('#fixamtFxrtGbCd').val() == null || $('#fixamtFxrtGbCd').val() == '') {
            alert("청구할인금액/율의 구분은 " + msg.necessaryCheckMessage);
            $('#fixamtFxrtGbCd').focus();
            return false;
        } else if($('#dcRateAmt').val() == null || $('#dcRateAmt').val() == '') {
            alert("청구할인금액/율은 " + msg.necessaryCheckMessage);
            $('#dcRateAmt').focus();
            return false;
        } else if($('#maxDcAmt').val() == null || $('#maxDcAmt').val() == '') {
            alert("최대할인금액은 " + msg.necessaryCheckMessage);
            $('#maxDcAmt').focus();
            return false;
        }

        return true;
    },

    // 적용기간 확인
    aplyDateCheck : function(){
        var startLastDate = new Date(); // 선택 불가능한 마지막 날짜
	    startLastDate = new Date(startLastDate.setDate(startLastDate.getDate()-1));
        startLastDate = startLastDate.getFullYear() + "" + addzero(startLastDate.getMonth() + 1) + "" + addzero(startLastDate.getDate());

        var startDate = $("#aplyStartDate").val().replace(/-/g, '');
        var endDate = $("#aplyEndDate").val().replace(/-/g, '');

        // 입력 또는 대기인 경우 현재보다 이전날짜는 선택 불가
        if(req.argInsertUpdate == "I" || req.state == "1") {
            if (startLastDate >= startDate) {
                alert(msg.dataCheck1);
                return false;
            }
        }

        if (endDate < startDate) {
            alert(msg.dataCheck3);
            return false;
        } else if (endDate == startDate) {  // 날짜가 같은 경우 시간 비교
            if( $("#aplyEndHour").val() < $("#aplyStartHour").val() ) {
                alert(msg.dataCheck3);
                return false;
            } else if( $("#aplyEndHour").val() == $("#aplyStartHour").val() ) { // 시간이 같은 경우 분 비교
                if( $("#aplyEndMinute").val() <= $("#aplyStartMinute").val() ) {
                    alert(msg.dataCheck3);
                    return false;
                }
           }
        }

        return true;
    },

    acqrFormat : function(){
        var aplyStrDtm = $("#aplyStartDate").val() + " " + $("#aplyStartHour").val() + ":" + $("#aplyStartMinute").val() + ":00";
        $("#aplyStrDtm").val(aplyStrDtm);
        var aplyEndDtm = $("#aplyEndDate").val() + " " + $("#aplyEndHour").val() + ":" + $("#aplyEndMinute").val() + ":59";
        $("#aplyEndDtm").val(aplyEndDtm);
    },

    // 적용기간 내 매입사 중복 여부 확인
    acqrCheck : function () {
        // 수정인 경우에 날짜, 매입사 변경이 모두 없으면 체크 제외
        if(req.argInsertUpdate == "U") {
            if(req.acqrCd == $("#acqrCd").val()){
                var start = $("#aplyStartDate").val() + " " + $("#aplyStartHour").val() + ":" + $("#aplyStartMinute").val();
                var end = $("#aplyEndDate").val() + " " + $("#aplyEndHour").val() + ":" + $("#aplyEndMinute").val();
                if(req.aplyStrDtm == start && req.aplyEndDtm == end){
                    this.acqrFormat();
                    return true;
                }
            }
        }

        this.acqrFormat();
        var result = true;
        var param = {
            startDate : $("#aplyStrDtm").val(),
            endDate : $("#aplyEndDtm").val(),
            acqrCd : $("#acqrCd").val(),
            clmDcGdNo : $("#clmDcGdNo").val()
        }
        common.Ajax.sendRequestSync(
             "POST"
             ,_baseUrl + "payment/ClaimDiscountGuideMgmt.getClaimDiscountAcqrCheck.do"
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
            alert(msg.acqrCheck);
            return false;
        }
    },

    // 가맹점 한개 이상 선택 여부 확인
    mersCheck : function () {
        var dataResource = this.grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        var mersList = [];

        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                mersList.push(this.grid.getValue(i,"mersNo"));
            }
        }

        if(mersList.length == 0 ){
            alert(msg.mersCheck);
            return false;
        } else {
            $("#mersList").val(mersList);
            return true;
        }
    },

    // 저장
    onSave : function() {

        if(req.argInsertUpdate == "U") {
            if(req.state == "3") { // 종료
                alert(msg.doneSave);
                return false;
            }
        }

        // 필수 입력 확인
        if( !this.valCheck() ) { return; }

        // 적용기간 확인
        if( !this.aplyDateCheck() ) { return; }

        // 적용기간 내 매입사 중복여부 확인
        if( !this.acqrCheck() ) { return; }

        // 가맹점 한개 이상 선택 여부 확인
        if( !this.mersCheck() ) { return; }

        // 저장확인문구
        if( !confirm(msg.save)) { return; }

       $("#claimDiscountMersGridForm").find(':disabled').prop('disabled',false);
        common.Ajax.sendRequestSync(
            "POST"
            , _baseUrl + "payment/ClaimDiscountGuideMgmt.saveClaimDiscountGuide.do"
            , $("#claimDiscountMersGridForm").serializeObject()
            , function (data) {
                  if(data.succeeded){ // 오류 수정 <- if(JSON.parse(data).succeeded){
                      // 메시지 중복 alert(JSON.parse(data).message);
                      opener.claimDiscountInfoGrid.eventhandler.onSearch(0);
                      window.close();
                  } else {
                      console.log("무이자 할부 안내 저장 오류");
                  }
              }
        );
    }
};