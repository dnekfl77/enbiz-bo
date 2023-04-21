$.namespace("connectSetGrid.eventhandler");
connectSetGrid.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
        this.onSearch(0, dispDetail.dispCtgNo, connerReq.conrNo);
    },

    bindButtonEvent : function(){
        var self = this;

        // 저장
        $("#btn_connectSetGrid_save").click(function() {
            self.onSave();
        });
    },

    gridEvent : {
        // 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0, dispDetail.dispCtgNo, connerReq.conrNo);
           }
        },

        // 선택된 행이 바뀌는 경우
        onCurrentRowChanged : function(grid, oldRow, newRow) {
        	grid.commit();
        	var dispCtgNo = dispDetail.dispCtgNo;
        	var conrNo = connerReq.conrNo;
        	var conrTgtNo = grid.getValue(grid.getCurrent().itemIndex, "conrTgtNo");
            var param = { dispCtgNo : dispCtgNo, conrNo : conrNo, conrTgtNo : conrTgtNo, setYn : connerReq.setUseYn };
            common.Ajax.sendRequestSync(
                 "POST"
                 , _baseUrl + "display/displayConnectMgmt.getConrTgtCdList.do"
                 , param
                 , function(obj) {
                      if (obj.data != null) {
                         displayConnectPopupTotal.eventhandler.tabSetting(obj.data);
                      }
                 }
            );
        }
    },

    onSearch : function(pageNo, dispCtgNo, conrNo){
        var that = this;
        this.grid.cancel();

        var param = '&dispCtgNo=' + dispCtgNo + '&conrNo=' + conrNo;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();

        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            var dispSeq = this.grid.getValue(i , "dispSeq");
            if (dispSeq !== null && dispSeq !== '') {
                if(dispSeq == "0") {
                    alert(msg.checkDispSeq);
                    return;
                }
            }
            this.grid.setValue(i , "dispCtgNo", dispDetail.dispCtgNo);
            dataProvider.setRowStates(i, "updated", true);
        }

        this.controller.doSave(this, grid.localId);
    }

};