$.namespace("deliveryGrid.eventhandler");
deliveryGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },

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

        // 데이터 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column === 'sndWaitCausSms'){  // 지연안내 컬럼
                    if(currentData.sndWaitCausCd == "20") { // 지연인 경우만 이벤트 발생
                        self.onSms();
                    }
                } else if(clickData.column === 'deliNo'){  // 배송번호
                    self.onDeliveryDetail(currentData.deliNo);
                }
            }
        }
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

        // 협력사 조회 공통팝업 호출
        $('#btn_entrPopup_call').click(function() {
             self.callEntrPopup();
        });

        // 협력사 지우기
        $('#btn_entrPopup_reset').click(function() {
            $('#entrNo').val('');
            $('#entrNm').val('');
        });

        $('#btn_list').click(function() {
            self.onSearch(0, true);
        });

        $('#btn_init').click(function() {
            $('#btn_entrPopup_reset').click();
            $('#deliveryGridForm')[0].reset();
            self.calendarInit();
        });

        $("#deliveryGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
         });

        $('#btn_grid_excel').click(function() {
            self.onExcelExport();
        });
    },

    onSms : function() {
        if (confirm(msg.sndWaitCausSmsMessage) != true) {
            return;
        } else {
            alert("문자메시지 발송 로직");
        }
    },

    callEntrPopup : function() {
        var pin = { argSelectType: '1', argEntrGbCd: '', argTrdStatCd: '' };
        var POP_DATA = {
            url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
            , winName: 'etEntrListPopup'
            , title: '협력사조회'
            , _title: '협력사조회'
            , left: 10
            , top: 10
            , width: 741
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function (e) {
            var returnValue = JSON.parse(e.data);
            $('#entrNo').val(returnValue[0].entrNo);
            $('#entrNm').val(returnValue[0].entrNm);
        });
    },

    gridEvent : {
        // 삭제 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);

            if(data.succeeded){
                eventHandler.onSearch(0, false);
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
        if($('#entrNo').val() == null) { $('#entrNo').val('') }
        var param = '&startDate=' + startDate + '&endDate=' + endDate;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo, false); };
        this.controller.doQuery(this, param, pageNo, pageFunc, null, isOpenToast);
    },

    onExcelExport: function() {
        var self = this;
        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        if($('#entrNo').val() == null) { $('#entrNo').val('') }

        var excelHeader = self.defaultHandler.onExcelHeader(this.grid); // 그리드 해더 추출

        var param = 'startDate=' + startDate + '&endDate=' + endDate;
        param += "&" + $("#deliveryGridForm").serialize() + "&excelHeader=" + encodeURIComponent(JSON.stringify(excelHeader));

        window.location.href = _baseUrl + "delivery/deliveryList.getDeliveryExcelDownload.do?" + param;
    },

    onDeliveryDetail : function(deliNo) {
        var self = this;
        var pin = { deliNo : deliNo };
        var POP_DATA = {
            url: _baseUrl + "delivery/deliveryList.deliveryDetailPopup.do"
            , winName: 'deliveryDetailPopup'
            , title: '배송상세내역'
            , _title: '배송상세내역'
            , left: 20
            , top: 40
            , width: 990
            , height: 750
            , scrollbars: true
            , autoresize: true
        };
        popCommon(pin, POP_DATA, null);
    }
};