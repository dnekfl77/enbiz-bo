$.namespace("franchiseeInstallmentGrid.eventhandler");
franchiseeInstallmentGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.onSearch(0); // 가맹점 리스트 조회
        if(req.argInsertUpdate == "I") { // 입력
            this.installmentRowInsert(1);
        } else if(req.argInsertUpdate == "U") { // 수정
            this.installmentRowInsert(reqMonth.length); // 무이자 할부 안내 상세 갯수만큼 행 추가
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

    // 금액별 할부개월 Row 추가 (rowCount : 추가하는 행의 갯수)
    installmentRowInsert : function(rowCount) {
        var self = this;
        var lastRowIdx = 1;
        if($("tr[trRow=installmentRow]").length != 0 ){
            lastRowIdx = Number($("tr[trRow=installmentRow]").last().attr("id").split("_")[1]) + 1; // 마지막 행의 idx + 1
        }

        // 할부개월 Row 추가
        for(idx=lastRowIdx; idx<rowCount+lastRowIdx; idx++) {
            // 금액별 할부개월 가장 아래쪽에 행 추가
            $("#sysModRow").before(`
                    <tr id="installmentRow_${idx}" trRow="installmentRow">
                        <td>
                            <input type="text" class="input w100" id="tgtAmt_${idx}" name="tgtAmt">
                        </td>
                        <td colspan="2">
                            <div class="input-group" id="monthRow_${idx}"></div>
                        </td>
                    </tr>
            `);

            // 할부개월의 각 행에 할부 개월 수(checkBox) 셋팅
            for(i=2; i<13; i++) {
                $("#monthRow_" + idx).append(`
                        <label for="${idx}_${i}">
                            <input class="checkbox-inline" type="checkbox" name="month_${idx}" value="${i}" id="month_${idx}_${i}">
                                <span>${i}</span>
                            </input>
                        </label>
                `);
            }

            // + 버튼
            $("#monthRow_" + idx).append(`
                <a class="icon-data-plus" id="btn_plus_${idx}" name="btn_plus"></a>
            `);

            // - 버튼
            if(idx != 1){
                $("#monthRow_" + idx).append(`
                    <a class="icon-data-minus" id="btn_minus_${idx}" name="btn_minus" onClick="franchiseeInstallmentGrid.eventhandler.installmentRowRemove(${idx});"></a>
                `);
            }

            $("#installmentRow").attr("rowspan", Number($("#installmentRow").attr("rowspan")) + 1 );

            // + 버튼 이벤트
            $("#btn_plus_" + idx).click(function() {
                 // 대기인 경우만 수정가능
                 if(req.state == "1" || req.argInsertUpdate == "I") {
                     franchiseeInstallmentGrid.eventhandler.installmentRowInsert(1);
                 }
            });
        }
    },

    // 금액별 할부개월 행 삭제
    installmentRowRemove : function(rowIdx) {
        // 대기인 경우만 수정가능
        if(req.state == "1" || req.argInsertUpdate == "I") {
            $("#installmentRow").attr("rowspan", Number($("#installmentRow").attr("rowspan")) - 1 );
            $("#installmentRow_" + rowIdx).remove();
        }
    },

    // 수정 시 값 셋팅
    valueSetting : function(){
        $("#acqrCd").val(req.acqrCd);
        $("#nintInstGdNoText").text(req.nintInstGdNo);
        $("#nintInstGdNo").val(req.nintInstGdNo);
        $("#nintInstNm").val(req.nintInstNm);
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

        if(reqMonth.length != 0){
            this.monthValueSetting(); // 금액액별 할부개월 값 셋팅
       }
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

    monthValueSetting : function(){
        for(i=0; i<reqMonth.length; i++){
            var idx = i+1;
            $("#tgtAmt_" + idx ).val(reqMonth[i].tgtAmt);
            var val = reqMonth[i].nintMonth.split(",");
            var chkbox = $("input[name=month_" + idx + "]");
            for(j=0;j<val.length;j++) {
                $("input:checkbox[name=month_" + idx + "]:input[value="+ val[j] +"]").attr("checked",true);
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
            $("#nintInstNm").attr("disabled",true);
            $("#aplyStartHour").attr("disabled",true);
            $("#aplyStartMinute").attr("disabled",true);
            $("input[name=tgtAmt]").attr("disabled",true);
            $("input[type=checkbox]").attr("disabled",true);
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
                        franchiseeInstallmentGrid.eventhandler.mersValueSetting(); // 가맹점 값 셋팅
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
                    nintInstGdNo : $("#nintInstGdNo").val()
                }
                common.Ajax.sendRequestSync(
                    "POST"
                    , _baseUrl + "payment/NoInterestInstallmentGuideMgmt.deleteNoInterestInstallmentGuide.do"
                    , param
                    , function ( data ) {
                          if(data.succeeded){// 오류 수정 <- if(JSON.parse(data).succeeded){
                              // 중복 메시지 alert(JSON.parse(data).message);
                              opener.interestFreeInstallmentInfoGrid.eventhandler.onSearch(0);
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
            nintInstGdNo : $("#nintInstGdNo").val()
        }
        common.Ajax.sendRequestSync(
             "POST"
             ,_baseUrl + "payment/NoInterestInstallmentGuideMgmt.getAcqrCheck.do"
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

    // 금액별 할부개월 데이터 확인
    installmentCheck : function () {
        var rowCnt = Number($("#installmentRow").attr("rowspan")) - 1;
        var tgtAmtList = [];
        var monthList = Array();

        // 할부개월이 1개 이상 존재해야함
        if( rowCnt <= 0) {
            alert(msg.installmentCheck1);
            return false;
        }

        for(var i=1; i<=rowCnt; i++) {
            var tgtAmtVal = $("#tgtAmt_" + i).val();

            // 할부개월 빈 값 확인
            if( tgtAmtVal == null || tgtAmtVal == '') {
                alert("기준금액은 " + msg.necessaryCheckMessage);
                $("#tgtAmt_" + i).focus();
                return false;
            }

            // 빈값이 아닌 경우 1만원 이상
            if( tgtAmtVal < 10000) {
                alert(msg.installmentCheck2);
                return false;
            }

            // 기준금액 중복확인
            for(var j=0; j<tgtAmtList.length; j++){
                if(tgtAmtList[j] == tgtAmtVal) {
                    alert(msg.installmentCheck4);
                    return false;
                }
            }
            tgtAmtList.push(tgtAmtVal);


            // 할부개월수 체크 여부 확인
            if($("input[name=month_" + i + "]:checked").length == 0) {
                alert("할부개월수는 " + msg.necessaryCheckMessage);
                $("input[name=month_" + i + "][0]").focus();
                return false;
            }

            // 할부개월 하위 개월 체크여부 확인 (ex. 4,5 -> 2,3,4,5)
            var result = Array();
            var cnt = 0;
            var chkbox = $("input[name=month_" + i + "]");
            for(var j=0;j<chkbox.length;j++) {
                if(chkbox[j].checked == true) {
                    result[cnt] = chkbox[j].value;
                    cnt++;
                }
            }
            var maxMonth = result[result.length - 1];
            for(var j=2; j<=maxMonth; j++) {
               if($("#month_" + i + "_" + j).is(":checked") == false) {
                   alert("기준금액(" + tgtAmtVal + ")의 최대 할부개월수는 " + maxMonth + "개월입니다. \n" + msg.installmentCheck3);
                   return false;
               }
            }

            monthList[i-1] = result.join("-");
        }

        $("#monthList").val(monthList);
        return true;
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

        // 금액별 할부개월 데이터 확인
        if( !this.installmentCheck() ) { return; }

        // 저장확인문구
        if( !confirm(msg.save)) { return; }

       $("#franchiseeInstallmentForm").find(':disabled').prop('disabled',false);
        common.Ajax.sendRequestSync(
            "POST"
            , _baseUrl + "payment/NoInterestInstallmentGuideMgmt.saveNoInterestInstallmentGuide.do"
            , $("#franchiseeInstallmentForm").serializeObject()
            , function (data) {
                  if(data.succeeded){ // 오류 수정 <- if(JSON.parse(data).succeeded){
                      // 중복 메시지 alert(JSON.parse(data).message);
                      opener.interestFreeInstallmentInfoGrid.eventhandler.onSearch(0);
                      window.close();
                  } else {
                      console.log("무이자 할부 안내 저장 오류");
                  }
              }
        );
    }
};