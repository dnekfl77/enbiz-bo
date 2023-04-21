$.namespace("controlGrid.eventhandler");
controlGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;

        // 그리드 셀 수정 불가 설정
        grid.setEditOptions({ editable: false });

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
                if(clickData.column==='payMeanCtrlNo'){
                    self.updatePopup("U",currentData.payMeanCtrlNo);
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        $('#ctrlGbCd').change(function() {
            self.onCtrlTgtNo($('#ctrlGbCd').val());
        });

        $('#btn_list').click(function() {
            self.onSearch(0);
        });

        $('#btn_init').click(function() {
            $('#ctrlTgtNo option').not("[value='']").remove();
            $('#controlGridForm')[0].reset();
        });

        $("#controlGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
         });

        $("#btn_grid_insert").click(function() {
            self.updatePopup("I",null);
        });
    },

    onCtrlTgtNo : function(ctrlGbCd){
        $('#ctrlTgtNo option').not("[value='']").remove();
        if(ctrlGbCd == "10") { // PG사별
            if(pgList != null){
                for(const item of pgList){
                    $("#ctrlTgtNo").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                }
            }
        } else if(ctrlGbCd == "20") { // 결제수단별
            if(payWayList != null){
                for(const item of payWayList){
                    if(item.ref1Val == "Y") { // 주결제수단 여부가 Y인 것만
                        $("#ctrlTgtNo").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                    }
                }
            }
        }
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

    updatePopup : function(state, payMeanCtrlNo){
        var self = this;
        if(state == "I"){
            var pin = { argInsertUpdate : state };
            var POP_DATA = {
                //url: _baseUrl + "payment/methodsOfPaymentManagement.getMethodsOfPaymentControlUpdate.do"
                url: _baseUrl + "payment/paymentMeanControlMgmt.paymentMeanControlSaveView.do"
                , winName: 'methodsOfPaymentControlInsert'
                , title: '결제수단 제어 등록'
                , _title: '결제수단 제어 등록'
                , left: 20
                , top: 40
                , width: 990
                , height: 800
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){
            var pin = { argInsertUpdate : state, payMeanCtrlNo : payMeanCtrlNo };
            var POP_DATA = {
                //url: _baseUrl + "payment/methodsOfPaymentManagement.getMethodsOfPaymentControlUpdate.do"
                url: _baseUrl + "payment/paymentMeanControlMgmt.paymentMeanControlSaveView.do"
                , winName: 'methodsOfPaymentControlUpdate'
                , title: '결제수단 제어 수정'
                , _title: '결제수단 제어 수정'
                , left: 20
                , top: 40
                , width: 990
                , height: 800
                , scrollbars: false
                , autoresize: false
            };
        }
        popCommon(pin, POP_DATA, null);
    },
    
    onSearch : function(pageNo){
        var that = this;
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, null, pageNo, pageFunc, null, true);
    }
};