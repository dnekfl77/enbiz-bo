$.namespace("autoDistributionUserGrid.eventhandler");
autoDistributionUserGrid.eventhandler = {
    init : function () {
    },
    onSearch : function(pageIdx){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        var extraQueryString = 'deptCd='+ autoDistributionUserGrid.eventhandler.deptCd;
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc);
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
        onCellDblClicked : function (grid, clickData) {
            if(autoDistributionUserGrid.eventhandler.jobGrpCd !== _jobGrpCd){
                alert('고객센터 소속이 아닌 상담사는 등록이 불가능합니다!');
                return;
            }
            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            autoDistributionSettingPopGrid.eventhandler.onAdd(currentData.userId,currentData.userNm);
        }
    }
};