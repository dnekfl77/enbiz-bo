$.namespace("displayCornerGrid.eventhandler");
displayCornerGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        // 전시코너명 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column==='conrNm'){
                    self.updatePopup("U",currentData.conrNo,"displayCornerMgmt");
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        // 전시 담당자 > 사용자 공통팝업 호출
       $('#btn_aempPopup_call').click(function() {
            var pin = { argSelectType: "1", argWorkStatCd: "01", argUseYn: "Y" };
            var POP_DATA = {
                url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
                , winName: 'mdListPopup'
                , title: 'MD 조회 팝업'
                , _title: 'MD 조회 팝업'
                , left: 20
                , top: 20
                , width: 690
                , height: 600
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, self.popupMdListCallback);
       });

       // 전시담당자 지우기
       $('#btn_aempPopup_reset').click(function() {
           $('#aempId').val('');
           $('#aempNm').val('');
       });

       $('#btn_init').click(function() {
           $('#displayCornerGridForm')[0].reset();
           $('#btn_aempPopup_reset').click();
       });

       $('#btn_search').click(function() {
           self.onSearch(0, true);
       });

       $("#btn_grid_insert").click(function() {
           self.updatePopup("I",0,"displayCornerMgmt");
       });

       $("#btn_grid_remove").click(function() {
           self.grid.cancel();
           self.onDelete();
       });

       $("#btn_grid_save").click(function() {
           self.onSave();
       });
    },

    popupMdListCallback : function(e) {
        var data = JSON.parse(e.data);
        $('#aempNm').val(data[0].userNm);
        $('#aempId').val(data[0].userId);
    },

    gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0, false);
           }
        }
    },

    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        var conrNm = ( $('#displayCornerSearchType').val() === '01') ? $('#displayCornerSearchWord').val() : '';
        var conrNo = ( $('#displayCornerSearchType').val() === '02') ? $('#displayCornerSearchWord').val() : '';
        var tmplNm = ( $('#templateSearchType').val() === '01') ? $('#templateSearchWord').val() : '';
        var tmplNo = ( $('#templateSearchType').val() === '02') ? $('#templateSearchWord').val() : '';
        var param = '&conrNo=' + conrNo + '&conrNm=' + conrNm + '&tmplNo=' + tmplNo + '&tmplNm=' + tmplNm;

        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
        this.controller.doQuery(this,param,pageIdx, pagingFunc, null, isOpenToast);
    },

    onDelete : function() {
        var result = true;
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }

        // 템플릿코너매핑정보에 해당 코너와 연결된 템플릿 데이터 여부 확인
        for(var i=0; i<checkedItems.length; i++) {
            var conrNo = this.grid.getValue(checkedItems[i], "conrNo");
            var param = '&conrNo=' + conrNo;
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "display/displayCornerMgmt.checkPrTmplConrMappInfo.do"
                 ,param
                 ,function(obj) {
                      if (!obj.succeeded) {
                         alert("코너 번호(" + conrNo + ") : " + msg.checkPrTmplConrMappInfo);
                         result = false;
                      }
                 }
            );
            if(!result) {
               return false;
            }
        }

        if(result) {
            this.defaultHandler.onDelete(this.grid);
        }
    },

    onSave : function() {
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
            alert(msg.saveRowCheck);
            return ;
        }
        this.controller.doSave(this, this.grid.localId);
    },

    updatePopup : function(state, conrNo, reSearchPage){
        var self = this;
        if(state == "I"){
            var pin = { reSearchPage : reSearchPage };
            var POP_DATA = {
                url: _baseUrl + 'display/displayCornerMgmt.displayCornerMgmtSaveView.do'
                , winName: 'displayCornerInsert'
                , title: '전시 코너 등록'
                , _title: '전시 코너 등록'
                , left: 20
                , top: 20
                , width: 920
                , height: 727
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){
            var pin = { conrNo : conrNo, reSearchPage : reSearchPage };
            var POP_DATA = {
                url: _baseUrl + 'display/displayCornerMgmt.displayCornerMgmtSaveView.do'
                , winName: 'displayCornerUpdate'
                , title: '전시 코너 수정'
                , _title: '전시 코너 수정'
                , left: 20
                , top: 20
                , width: 920
                , height: 727
                , scrollbars: true
                , autoresize: true
            };
        }
        popCommon(pin, POP_DATA, null);
    }
};