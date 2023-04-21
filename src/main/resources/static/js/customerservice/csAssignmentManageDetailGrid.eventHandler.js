$.namespace("csAssignmentManageDetailGrid.eventhandler");
csAssignmentManageDetailGrid.eventhandler = {

    alertMessage : x2coMessage.getMessage( {
        stop             :  "csAllocationMgmt.csAssignment.msg.stop",
        progress         :  "csAllocationMgmt.csAssignment.msg.progress",
        tryRetrieve      :  "csAllocationMgmt.csAssignment.msg.tryRetrieve",
        retrievePossible :  "csAllocationMgmt.csAssignment.msg.retrievePossible",
        noRetrieve       :  "csAllocationMgmt.csAssignment.msg.noRetrieve"
    }),

    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){
        var self = this;

        //할당중지
        $('#btn_grid_stop').click(function(){
            if(confirm(self.alertMessage.stop)) {
                self.changeManagerAutoDivPsb('N');
            }
        })

        //할당진행
        $('#btn_grid_progress').click(function(){
            if(confirm(self.alertMessage.progress)) {
                self.changeManagerAutoDivPsb('Y');
            }
        })

        //수동할당
        $('#btn_grid_manualAssign').click(function(){
            alert('한섬 협의후 개발');
        })

        //할당회수
        $('#btn_grid_numOfAllocations').click(function(){
            if(confirm(self.alertMessage.tryRetrieve)) {
                self.retrieveAllcations();
            }
        })

    },
    gridLoading : function(){

        var layout = [
            {
                name: "aempGroup",
                direction: "horizontal",
                items: [
                    "aempNm",
                    "state",
                ],
                header: {
                    text: "담당자",
                    styleName: "multi-line-css"
                }
            },
            {
                name: "numGroup",
                direction: "horizontal",
                items: [
                    "numOfAssignments",
                    "numOfUnassignments"
                ],
                header: {
                    text: "할당현황",
                    styleName: "multi-line-css"
                }
            },
            {
                name: "stateGroup",
                direction: "horizontal",
                items: [
                    "receipt",
                    "inProgress",
                    "complete",
                    "already"
                ],
                header: {
                    text: "처리현황",
                    styleName: "multi-line-css"
                }
            }
        ]
        this.grid.header.height = 60;
        this.grid.setColumnLayout(layout);
    },
    onSearch : function(currentData){
        this.grid.cancel();
        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        var extraQueryString;
        extraQueryString = 'startDate=' + startDate
                         + '&endDate=' + endDate
                         + '&subAutoDivGbCd=' + currentData.autoDivGbCd
                         + '&subAutoDivDtlNo=' + currentData.autoDivDtlNo;
        this.controller.doQuery(this,extraQueryString);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
    },
    changeManagerAutoDivPsb : function(state){
        var self = this;
        var dataResource = this.grid.getDataSource();
        var checkedRows = this.grid.getCheckedRows();
        var checkedDataSourceRows = this.grid.getItemsOfRows(checkedRows);

        if(checkedRows.length < 1){
            alert(_msg.noSelectedDataMsg);
            return;
        }

        var autoDivNoList = [];

        checkedDataSourceRows.forEach(function(row){
            var dataRow= self.grid.getDataRow(row);
            var autoDivNo = dataResource.getValue(dataRow,'autoDivNo');
            autoDivNoList.push(autoDivNo);
        })

        var param = {};
        param.autoDivNoList = autoDivNoList;
        param.state = state;

        if(autoDivNoList.length > 0){
            common.Ajax.sendJSONRequest(
                "post"
                ,_baseUrl + "customerservice/csAllocationMgmt.changeAutoDivideAllocationPossibleYn.do"
                ,param
                ,function(result) {
                    if(result.succeeded){
                        csAssignmentManageGrid.eventhandler.onSearch();
                    }
                }
                ,null
                ,null
                ,true
            );
        }
    },
    retrieveAllcations : function(){

        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var self = this;
        var dataResource = this.grid.getDataSource();
        var checkedRows = this.grid.getCheckedRows();
        var checkedDataSourceRows = this.grid.getItemsOfRows(checkedRows);

        if(checkedRows.length < 1){
            alert(_msg.noSelectedDataMsg);
            return;
        }

        var autoDivNoList = [];

        var stateCheck = false;
        var receiptCheck = false;

        checkedDataSourceRows.forEach(function(row){
            var dataRow= self.grid.getDataRow(row);
            var state = dataResource.getValue(dataRow,'state');
            var autoDivNo = dataResource.getValue(dataRow,'autoDivNo');
            var aempId = dataResource.getValue(dataRow,'aempId');
            var receipt = dataResource.getValue(dataRow,'receipt');
            var autoDivGbCd = dataResource.getValue(dataRow,'autoDivGbCd');
            var autoDivDtlNo = dataResource.getValue(dataRow,'autoDivDtlNo');

            if(state !== '할당중지'){
                stateCheck = true;
               return;
            }

            if(receipt < 1){
                receiptCheck = true;
                return;
            }

            autoDivNoList.push({
                autoDivNo     : autoDivNo,
                aempId        : aempId,
                startDate     : startDate,
                endDate       : endDate,
                autoDivGbCd   : autoDivGbCd,
                autoDivDtlNo  : autoDivDtlNo,
            })
        })

        if(stateCheck){
            alert(self.alertMessage.retrievePossible);
            return;
        }

        if(receiptCheck){
            alert(self.alertMessage.noRetrieve);
            return;
        }


        var paramList = {};
        paramList.paramList = JSON.stringify(autoDivNoList);


        if(autoDivNoList.length > 0){
            common.Ajax.sendJSONRequest(
                "post"
                ,_baseUrl + "customerservice/csAllocationMgmt.retrieveAllocations.do"
                ,paramList
                ,function(result) {
                    if(result.succeeded){
                        alert('할당회수 완료되었습니다');
                        csAssignmentManageGrid.eventhandler.onSearch();
                    }
                }
                ,null
                ,null
                ,true
            );
        }

    }
};
