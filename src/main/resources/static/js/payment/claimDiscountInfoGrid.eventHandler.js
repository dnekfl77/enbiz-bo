$.namespace("claimDiscountInfoGrid.eventhandler");
claimDiscountInfoGrid.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.gridLoading();
        this.bindButtonEvent();
    },

    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },

    gridLoading : function(){
        var self = this;
        this.grid.addLookupSource(mersCodes);

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        };
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        // 일련번호 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column==='clmDcGdNo'){
                    self.updatePopup("U",currentData.clmDcGdNo);
                }
                if(clickData.column==='acqrCd'){
                    self.updatePopup("U",currentData.clmDcGdNo);
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
				max_term:0,
				fn:function(pin) {
					$('#startDate').val(pin.yyyymmdd1);
					$('#endDate').val(pin.yyyymmdd2);
				}
			});
		});

        $('#btn_list').click(function() {
            self.onSearch(0, true);
        });

        $('#btn_init').click(function() {
            $('#claimDiscountInfoGridForm')[0].reset();
            self.calendarInit();
        });

        $("#claimDiscountInfoGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
         });

        $("#btn_grid_insert").click(function() {
            self.updatePopup("I",null);
        });
    },

    gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        }
    },

    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();

        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        var param = 'startDate=' + startDate + '&endDate=' + endDate;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc, null, isOpenToast);
    },

    updatePopup : function(state, clmDcGdNo){
        var self = this;
        if(state == "I"){
            var pin = { argInsertUpdate : state };
            var POP_DATA = {
                url: _baseUrl + "payment/ClaimDiscountGuideMgmt.claimDiscountGuideSaveView.do"
                , winName: 'claimDiscountInfoInsert'
                , title: '청구할인 안내 등록'
                , _title: '청구할인 안내 등록'
                , left: 20
                , top: 40
                , width: 780
                , height: 540
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){
            var pin = { argInsertUpdate : state, clmDcGdNo : clmDcGdNo };
            var POP_DATA = {
                url: _baseUrl + "payment/ClaimDiscountGuideMgmt.claimDiscountGuideSaveView.do"
                , winName: 'claimDiscountInfoUpdate'
                , title: '청구할인 안내 수정'
                , _title: '청구할인 안내 수정'
                , left: 20
                , top: 40
                , width: 780
                , height: 540
                , scrollbars: false
                , autoresize: false
            };
        }
        popCommon(pin, POP_DATA, null);
    }
};