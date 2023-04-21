$.namespace("connectConnerGrid.eventhandler");
connectConnerGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
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

        // 코너번호 또는 코너명 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column ==='conrNo' || clickData.column ==='conrNm'){
                    self.connectPopup(currentData.dispCtgNo, currentData.conrNo, currentData.siteNo);
                }
            }
        }

    },

    onSearch : function(pageNo, dispCtgNo, isOpenToast){
        var that = this;
        this.grid.cancel();

        var param = '&dispCtgNo=' + dispCtgNo;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo, dispCtgNo, false); };
        this.controller.doQuery(this, param, pageNo, pageFunc, null, isOpenToast);
    },

    connectPopup : function(dispCtgNo, conrNo, siteNo){
        var self = this;
        var pin = { dispCtgNo : dispCtgNo, conrNo : conrNo, siteNo : siteNo };
        var POP_DATA = {
            url: _baseUrl + 'display/displayConnectMgmt.displayConnectMgmtSaveView.do'
            , winName: 'displayConnectPopup'
            , title: '전시 연결 관리 팝업'
            , _title: '전시 연결 관리 팝업'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: true
            , autoresize: true
        };
        popCommon(pin, POP_DATA, null);
    }

};