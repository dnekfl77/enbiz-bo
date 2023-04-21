$.namespace("termsConditionsListGrid.eventhandler");
termsConditionsListGrid.eventhandler = {

    init : function(){
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;

        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable: false })

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        });

        // 약관제목 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column==='title'){
                    self.updatePopup("U",currentData.cmAgmtSeq);
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_search').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_init').click(function() {
            $('#termsConditionsListGridForm')[0].reset();
        });

        $('#btn_grid_add').click(function() {
            self.updatePopup("I",0);
        });

        // 약관정책코드 옵션셋팅
        $('#cmAgmtPolcGbCd').change(function(){
            self.onAgmtPolcCd($('#cmAgmtPolcGbCd').val());
        });
    },

    // 약관정책코드 옵션셋팅
    onAgmtPolcCd : function(cmAgmtPolcGbCd){
        $('#agmtPolcCd option').not("[value='']").remove();
        if(codeList_CH005 != null){
            for(const item of codeList_CH005){
                if(cmAgmtPolcGbCd != "") { // 전체가 아닌경우
                    if(item.ref1Val == cmAgmtPolcGbCd) { // 약관정책구분에 따른 약관정책코드 셋팅
                        $("#agmtPolcCd").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                    }
                } else { // 전체인경우
                    $("#agmtPolcCd").append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                }
            }
        }
    },

    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
        this.controller.doQuery(this,"",pageIdx, pagingFunc, null, isOpenToast);
    },

    updatePopup : function(state, cmAgmtSeq){
        var self = this;
        if(state == "I"){
            var pin = null;
            var POP_DATA = {
                url: _baseUrl + 'display/termsConditionsMgmt.termsConditionsMgmtSaveView.do'
                , winName: 'termsConditionsMgmtPopupInsert'
                , title: '약관&이용안내 팝업 등록'
                , _title: '약관&이용안내 팝업 등록'
                , left: 20
                , top: 20
                , width: 1000
                , height: 520
                , scrollbars: false
                , autoresize: false
            };
        } else if (state == "U"){
            var pin = { cmAgmtSeq : cmAgmtSeq };
            var POP_DATA = {
                url: _baseUrl + 'display/termsConditionsMgmt.termsConditionsMgmtSaveView.do'
                , winName: 'termsConditionsMgmtPopupUpdate'
                , title: '약관&이용안내 팝업 수정'
                , _title: '약관&이용안내 팝업 수정'
                , left: 20
                , top: 20
                , width: 1000
                , height: 520
                , scrollbars: false
                , autoresize: false
            };
        }
        popCommon(pin, POP_DATA, null);
    }
};