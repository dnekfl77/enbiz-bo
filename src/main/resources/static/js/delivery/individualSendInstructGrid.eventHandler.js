$.namespace("individualSendInstructGrid.eventhandler");
individualSendInstructGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },

    // 달력초기화
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(3);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },

    gridLoading : function(){
        var self = this;

        this.grid.setEditOptions({ editable: false }) // 그리드 수정불가

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active';
          }
        });
    },

    bindButtonEvent : function(){
        var self = this;

		//달력버튼
     	$('#calendarButton').click(function() {
			showCalendar({
				type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd1:$('#startDate').val(),
				yyyymmdd2:$('#endDate').val(),
				max_term:31,
				fn:function(pin) {
					$('#startDate').val(pin.yyyymmdd1);
					$('#endDate').val(pin.yyyymmdd2);
				}
			});
		});

        // 조회 버튼
        $('#btn_list').click(function() {
            self.onSearch(0, true);
        });

        // 초기회 버튼
        $('#btn_init').click(function() {
            $('#individualSendInstructGridForm')[0].reset();
            self.calendarInit();
        });

        // 엔터키 입력시
        $("#individualSendInstructGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
         });

        // 발송지시 버튼
        $('#btn_grid_sendInstruct').click(function() {
            self.onSendInstruct();
        });
    },

    gridEvent : {
        // 삭제 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
    },
    
    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        var param = '&startDate=' + startDate + '&endDate=' + endDate;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo, false); };
        this.controller.doQuery(this, param, pageNo, pageFunc, null ,isOpenToast);
    },

    onSendInstruct: function() {
        var self = this;
        var result = true;

        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.messageNotCheckedData);
            return;
        }

        if (!confirm(msg.sendInstructSave)) {
            return;
        }

        for(var i=0; i<checkedItems.length; i++) {
            var ordNo = grid.getValue(checkedItems[i], "ordNo").split("-");
            var param = {
                ordNo           : ordNo[0] + ordNo[1], // 주문번호
                ordSeq          : grid.getValue(checkedItems[i], "ordSeq"), // 주문순번
                dlvpSeq         : grid.getValue(checkedItems[i], "dlvpSeq"), // 배송지순번
                deliUnitNo      : grid.getValue(checkedItems[i], "deliUnitNo"), // 배송단위번호
                siteNo          : grid.getValue(checkedItems[i], "siteNo"), // 사이트번호
                ordDtlGbCd      : grid.getValue(checkedItems[i], "ordDtlGbCd"), // 배송구분코드
                deliProcTypCd   : grid.getValue(checkedItems[i], "deliProcTypCd"), // 배송처리유형코드
                deliWayCd       : grid.getValue(checkedItems[i], "deliWayCd"), // 배송수단코드
                deliPolcNo      : grid.getValue(checkedItems[i], "deliPolcNo"), // 배송비정책번호
                dlexChrgSubCd   : grid.getValue(checkedItems[i], "dlexChrgSubCd"), // 배송비부담주체코드
                mbrNo           : grid.getValue(checkedItems[i], "mbrNo"), // 회원번호
                ordManNm        : grid.getValue(checkedItems[i], "ordManNm"), // 주문자명
                entrNo          : grid.getValue(checkedItems[i], "entrNo"), // 협력사 번호
            }
            common.Ajax.sendRequestSync(
                 "POST"
                 , _baseUrl + "delivery/individualSendInstruct.sendInstruct.do"
                 , param
                 , function(obj) {
                      if (obj.succeeded) {
                         alert(msg.saveSuccess);
                         self.onSearch(0, false);
                      } else {
                         console.log("발송지시 오류");
                      }
                 }
            );
        }
    }
};