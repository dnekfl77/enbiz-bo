$.namespace("connectTabImgGrid.eventhandler");
connectTabImgGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
        this.onSearch(0);
    },

    gridLoading : function(){
        var self = this;
        this.grid.setEditOptions({ editable: false }) // 그리드 수정불가

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        // HTML 전시설명 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column ==='contDesc'){
                    self.onAdd("U", currentData.dispCtgNo, currentData.conrNo, currentData.conrTgtNo, currentData.conrTgtCd, currentData.conrContNo);
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        // 그리드 이미지 배너 추가 버튼
        $("#btn_imgGrid_add").click(function() {

            var dispCtgNo = dispDetail.dispCtgNo;
            var conrNo = connerReq.conrNo;
            var conrTgtNo = $('.tabs-area > ul > li.active > input[name=conrTgtNo]').val();
            var conrTgtCd = $('.tabs-area > ul > li.active > input[name=conrTgtCd]').val();
            self.onAdd("I", dispCtgNo, conrNo, conrTgtNo, conrTgtCd);
        });

        // 그리드 행삭제 버튼
        $("#btn_imgGrid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        // 그리드 저장 버튼
        $("#btn_imgGrid_save").click(function() {
            self.onSave();
        });
    },

    gridEvent : {
        // 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        }
    },

    onSearch : function(pageNo){
        var that = this;
        this.grid.cancel();

        var dispCtgNo = dispDetail.dispCtgNo;
        var conrNo = connerReq.conrNo;
        var conrTgtNo = $('.tabs-area > ul > li.active > input[name=conrTgtNo]').val();
        var conrTgtCd = $('.tabs-area > ul > li.active > input[name=conrTgtCd]').val();

        var param = '&dispCtgNo=' + dispCtgNo + '&conrNo=' + conrNo + '&conrTgtNoSelect=' + conrTgtNo + '&conrTgtCdSelect=' + conrTgtCd;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc);
    },

    onAdd : function(state, dispCtgNo, conrNo, conrTgtNo, conrTgtCd, conrContNo) {
        var self = this;
        var pin = { argInsertUpdate : state, dispCtgNo : dispCtgNo, conrNo : conrNo, conrTgtNo : conrTgtNo, conrTgtCd : conrTgtCd, conrContNo : conrContNo };
        if(state == "I"){
            var POP_DATA = {
                url:  _baseUrl + 'display/displayConnectMgmt.connectImgPopup.do'
                , winName: 'connectImgInsert'
                , title: '이미지 배너 전시 등록'
                , _title: '이미지 배너 전시 등록'
                , left: 20
                , top: 20
                , width: 750
                , height: 440
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){
            var POP_DATA = {
                url:  _baseUrl + 'display/displayConnectMgmt.connectImgPopup.do'
                , winName: 'connectImgPopup'
                , title: '이미지 배너 전시 수정'
                , _title: '이미지 배너 전시 수정'
                , left: 20
                , top: 20
                , width: 750
                , height: 440
                , scrollbars: false
                , autoresize: false
            };
        }
        popCommon(pin, POP_DATA, this.connectHtmlPopupCallback.bind(this));
    },

    connectHtmlPopupCallback : function(e){
        this.onSearch(0);
    },

    onDelete : function() {
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.removeRowValidMessage);
            return;
        }
        this.defaultHandler.onDelete(this.grid);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();

        var result = false;
        var dataResource = this.grid.getDataSource();

        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }

        if(!result){
            alert(msg.gridNoSelected);
            return ;
        }

        this.controller.doSave(this, grid.localId);
    }
};