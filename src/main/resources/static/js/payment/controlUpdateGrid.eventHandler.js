$.namespace("controlUpdateGrid.eventhandler");
controlUpdateGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit(); // 달력 셋팅

        if( req.argInsertUpdate == "I") { // 입력
            this.valueInit();
            this.gridLoading();
        }
        if(req.argInsertUpdate == "U") { // 수정
            this.valueSetting();
            this.gridLoading();
            this.onSearch(0); // 제어목록 조회
        }
        this.bindButtonEvent();
    },

    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(0);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
        $('#endHour').val('23');
        $('#endMinute').val('59');

        initFromAndToCalDate = recentlyCalenderData(0);
        $('#dispStartDate').val(initFromAndToCalDate[0]);
        $('#dispEndDate').val(initFromAndToCalDate[1]);
        $('#dispEndHour').val('23');
        $('#dispEndMinute').val('59');
    },

    // 초기화면 값 셋팅
    valueInit : function(){
        $('input:radio[name=useYn]').first().attr("checked",true); // 사용여부
        $('input:radio[name=dispYn]').first().attr("checked",true); // 전시여부
    },

    // 수정 시 값 셋팅
    valueSetting : function(){
        $("#payMeanCtrlNo").val(req.payMeanCtrlNo);
        $("#dvcGbCd").val(req.dvcGbCd);
        $('input:radio[name=useYn]:input[value='+ req.useYn +']').attr("checked",true);
        $("#ctrlGbCd").val(req.ctrlGbCd);
        $("#sysModId").text(req.sysModId);
        $("#sysModDtm").text(req.sysModDtm);
        $('input:radio[name=dispYn]:input[value='+ req.dispYn +']').attr("checked",true);
        $("#title").val(req.title);
        $("#cont").val(req.cont);

        var strDate = req.useLmtStrDtm.split(" ");
        $("#startDate").val(strDate[0]);
        var strDate_time = strDate[1].split(":");
        $("#startHour").val(strDate_time[0]);
        $("#startMinute").val(strDate_time[1]);

        var endDate = req.useLmtEndDtm.split(" ");
        $("#endDate").val(endDate[0]);
        var endDate_time = endDate[1].split(":");
        $("#endHour").val(endDate_time[0]);
        $("#endMinute").val(endDate_time[1]);

        var dispStrDate = req.dispStrDtm.split(" ");
        $("#dispStartDate").val(dispStrDate[0]);
        var dispStrDate_time = dispStrDate[1].split(":");
        $("#dispStartHour").val(dispStrDate_time[0]);
        $("#dispStartMinute").val(dispStrDate_time[1]);

        var dispEndDate = req.dispEndDtm.split(" ");
        $("#dispEndDate").val(dispEndDate[0]);
        var dispEndDate_time = dispEndDate[1].split(":");
        $("#dispEndHour").val(dispEndDate_time[0]);
        $("#dispEndMinute").val(dispEndDate_time[1]);
    },

    gridLoading : function(){
        this.grid.addLookupSource(ctrlTgtNoCodes);
        this.grid.addLookupSource(ctrlTgtDtlNoCodes);
        var layout = [
            {
                name: "ctrlTgtNoGroup",
                direction: "horizontal",
                hideChildHeaders: true,
                items: [
                    "ctrlGbCd",
                    "ctrlTgtNo",
                    "ctrlTgtDtlNo"
                ],
                header: {
                    text: col.ctrlTgtNo + " *"
                }
            }
        ]
        this.grid.header.height = 30;
        this.grid.setColumnLayout(layout);

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
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        },

        onEditCommit : function(grid, index, oldValue, newValue) {
            if (index.fieldName === "ctrlGbCd") {
                if (oldValue !== newValue) {
                    grid.setValue(index.itemIndex, "ctrlTgtNo", '');
                }
            }
            if (index.fieldName === "ctrlTgtNo") {
                if (oldValue !== newValue) {
                    grid.setValue(index.itemIndex, "ctrlTgtDtlNo", '');
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

		// 사용제한시작일시 달력버튼
     	$('#calendarButton1').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#startDate').val(),
				fn:function(pin) {
					$('#startDate').val(pin.yyyymmdd);
				}
			});
		});

		// 사용제한종료일시 달력버튼
     	$('#calendarButton2').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#endDate').val(),
				fn:function(pin) {
					$('#endDate').val(pin.yyyymmdd);
				}
			});
		});

		// 전시기간 시작 달력버튼
     	$('#calendarButton3').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#dispStartDate').val(),
				fn:function(pin) {
					$('#dispStartDate').val(pin.yyyymmdd);
				}
			});
		});

		// 전시기간 종료 달력버튼
     	$('#calendarButton4').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#dispEndDate').val(),
				fn:function(pin) {
					$('#dispEndDate').val(pin.yyyymmdd);
				}
			});
		});

        // 행추가 버튼
        $("#btn_grid_add").click(function() {
            self.onAdd();
        });

        // 행삭제 버튼
        $("#btn_grid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        // 닫기 버튼
        $("#btn_popup_cancel").click(function() {
            if(confirm(msg.cancelMessage) == true) {
                window.close();
            } else {
               return;
            }
        });

        // 저장 버튼
        $("#btn_popup_save").click(function() {
            self.onSave();
        });

    },

    onAdd : function () {
          this.grid.commit();
          var defaultValues = { ctrlGbCd : '', ctrlTgtNo : '', ctrlTgtDtlNo : '' };
          this.defaultHandler.onAdd(grid, defaultValues);
    },

    onDelete : function() {
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }
        this.defaultHandler.onDelete(this.grid);
    },
    
    onSearch : function(pageNo){
        var that = this;
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, null, pageNo, pageFunc);
    },

    // 필수 입력 값 체크
    valCheck : function(){
        if($('#startDate').val() == null || $('#startDate').val() == '') { // 사용제한시작일시
            alert("사용제한시작일시는 " + msg.necessaryCheckMessage);
            $('#startDate').focus();
            return false;
        } else if($('#endDate').val() == null || $('#endDate').val() == '') { // 사용제한종료일시
            alert("사용제한종료일시는 " + msg.necessaryCheckMessage);
            $('#endDate').focus();
            return false;
        } else if($('#dvcGbCd').val() == null || $('#dvcGbCd').val() == '') { // 디바이스
             alert("디바이스는 " + msg.necessaryCheckMessage);
             $('#dvcGbCd').focus();
             return false;
        } else if($('#dispStartDate').val() == null || $('#dispStartDate').val() == '') { // 전시기간 시작일자
             alert("전시기간 시작일자는 " + msg.necessaryCheckMessage);
             $('#dispStartDate').focus();
             return false;
        } else if($('#dispEndDate').val() == null || $('#dispEndDate').val() == '') { // 전시기간 종료일자
             alert("전시기간 종료일자는 " + msg.necessaryCheckMessage);
             $('#dispEndDate').focus();
             return false;
        } else if($('#title').val() == null || $('#title').val() == '') { // 제목
             alert("제목은 " + msg.necessaryCheckMessage);
             $('#title').focus();
             return false;
        } else if($('#cont').val() == null || $('#cont').val() == '') { // 내용
             alert("내용은 " + msg.necessaryCheckMessage);
             $('#cont').focus();
             return false;
        }

        return true;
    },

    gridCheck : function() {
        this.grid.commit(true);
        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        var dataList = [];

        if(gridCount == 0) {
            alert(msg.gridCountCheck);
            return false;
        } else {
            for(var i=0; i<gridCount; i++){
                var ctrlGbCd = grid.getValue(i,"ctrlGbCd");
                var ctrlTgtNo = grid.getValue(i,"ctrlTgtNo");
                var ctrlTgtDtlNo = grid.getValue(i,"ctrlTgtDtlNo");
                var ctrlData = ctrlGbCd + "_" + ctrlTgtNo + "_" + ctrlTgtDtlNo;

                // 빈값확인
                if(ctrlGbCd === undefined || ctrlGbCd === null || ctrlGbCd === ''){
                    alert("결제수단의 첫번째 컬럼은 " + msg.necessaryCheckMessage);
                    return false;
                } else if(ctrlTgtNo === undefined || ctrlTgtNo === null || ctrlTgtNo === ''){
                    alert("결제수단의 두번째 컬럼은 " + msg.necessaryCheckMessage);
                    return false;
                } else if(ctrlTgtDtlNo === undefined || ctrlTgtDtlNo === null || ctrlTgtDtlNo === ''){
                    if(ctrlGbCd == "20") { // 결제수단별인 경우
                        alert("결제수단의 세번째 컬럼은 " + msg.necessaryCheckMessage);
                        return false;
                    }
                }

                // 결제수단 중복 데이터 확인
                for(var j=0; j<dataList.length; j++){
                    if(dataList[j] == ctrlData) {
                        payWayCdOverLap = false;
                        alert(msg.payWayCdOverLap);
                        return false;
                    }
                }
                dataList.push(ctrlData);
            }
        }

        return true;
    },

    formatDate : function () {
        var useLmtStrDtm = $("#startDate").val() + " " + $("#startHour").val() + ":" + $("#startMinute").val() + ":00";
        $("#useLmtStrDtm").val(useLmtStrDtm);
        var useLmtEndDtm = $("#endDate").val() + " " + $("#endHour").val() + ":" + $("#endMinute").val() + ":59";
        $("#useLmtEndDtm").val(useLmtEndDtm);

        var dispStrDtm = $("#dispStartDate").val() + " " + $("#dispStartHour").val() + ":" + $("#dispStartMinute").val() + ":00";
        $("#dispStrDtm").val(dispStrDtm);
        var dispEndDtm = $("#dispEndDate").val() + " " + $("#dispEndHour").val() + ":" + $("#dispEndMinute").val() + ":59";
        $("#dispEndDtm").val(dispEndDtm);
    },

    // 저장
    onSave : function() {
        if( !this.valCheck() ) { // 폼 빈값 확인
            return;
        }

        if( !this.gridCheck() ) { // 그리드 빈값 및 중복확인
            return;
        }

        if( !confirm(msg.save)) { // 저장확인 문구
            return;
        }

        this.formatDate(); // 날짜 셋팅

        var sendData = {};
        sendData.formPayload = {
            opPayMeanCtrlInfo : $("#controlGridForm").serializeObject(),
            opPayMeanCtrlDtlInfo : this.controller.extractGridPayloads(this.grid)
        };

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "payment/paymentMeanControlMgmt.savePaymentMeanControlDetail.do"
            , JSON.stringify(sendData)
            , function ( data ) {
                  if(data.succeeded){
                      opener.controlGrid.eventhandler.onSearch(0);
                      window.close();
                  }
              }
            , true
            ,"application/json;charset=UTF-8"
        );
    }
};