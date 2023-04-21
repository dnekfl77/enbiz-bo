$.namespace("franchiseeGrid.eventhandler");
franchiseeGrid.eventhandler = {
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
                if(clickData.column==='mersNo'){
                    self.updatePopup("U",currentData.mersNo);
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_list').click(function() {
            self.onSearch(0, true);
        });

        $('#btn_init').click(function() {
            $('#franchiseeGridForm')[0].reset();
        });

        $("#franchiseeGridForm").keypress(function (e){
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

    updatePopup : function(state, mersNo){
        var self = this;
        if(state == "I"){
            var pin = { argInsertUpdate : state };
            var POP_DATA = {
                url: _baseUrl + "payment/FranchiseeMgmt.franchiseeSaveView.do"
                , winName: 'franchiseeInsert'
                , title: '가맹점 등록'
                , _title: '가맹점 등록'
                , left: 20
                , top: 40
                , width: 700
                , height: 380
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){
            var pin = { argInsertUpdate : state, mersNo : mersNo };
            var POP_DATA = {
                url: _baseUrl + "payment/FranchiseeMgmt.franchiseeSaveView.do"
                , winName: 'franchiseeUpdate'
                , title: '가맹점 수정'
                , _title: '가맹점 수정'
                , left: 20
                , top: 40
                , width: 700
                , height: 380
                , scrollbars: false
                , autoresize: false
            };
        }
        popCommon(pin, POP_DATA, null);
    },
    
    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, null, pageNo, pageFunc, null, isOpenToast);
    }

};