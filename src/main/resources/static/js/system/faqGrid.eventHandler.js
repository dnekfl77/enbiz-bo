$.namespace("faqGrid.eventhandler");
faqGrid.eventhandler = {
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
        })

        // 팝업명 클릭 시 수정 팝업창 호출
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column==='title'){
                    self.updatePopup("U",currentData.faqNo);
                }
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        $('#faqLgrpCd').change(function() {
            self.onFaqMgrpCd($('#faqLgrpCd').val());
        });

        $('#btn_list').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_init').click(function() {
            $('#faqGridForm')[0].reset();
            self.calendarInit();
        });

        $("#faqGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
         });

        $("#btn_grid_insert").click(function() {
            self.updatePopup("I",0);
        });

        $("#btn_grid_reset").click(function() {
            self.onReset();
        });

        $("#btn_grid_save").click(function() {
            self.onSave();
        });
    },

    gridEvent : {
        // 삭제 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
    },

    onFaqMgrpCd : function(faqLgrpCd){
        $('#faqMgrpCd option').not("[value='']").remove();
        codeList.forEach(function(data){
            if(data.ref1Val == faqLgrpCd) {
                $("#faqMgrpCd").append($("<option value='"+data.cd+"'>"+data.cdNm+"</option>"));
            }
        })
    },

    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, null, pageNo, pageFunc, false, isOpenToast);
    },

	onReset : function() {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        this.grid.commit();

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
            return;
        }

        this.controller.doSave(this, this.grid.localId);
    },

    updatePopup : function(state, faqNo){
        var self = this;
        if(state == "I"){
            var pin = { argInsertUpdate : state };
            var POP_DATA = {
                url: _baseUrl + "system/faqMgmt.saveFaqView.do"
                , winName: 'faqInsert'
                , title: x2coMessage.getMessage("faqMgmt.insertTitle")
                , _title: x2coMessage.getMessage("faqMgmt.insertTitle")
                , left: 20
                , top: 40
                , width: 790
                , height: 700
                , scrollbars: true
                , autoresize: true
            };
        } else if (state == "U"){
            var pin = { argInsertUpdate : state, faqNo : faqNo };
            var POP_DATA = {
                url: _baseUrl + "system/faqMgmt.saveFaqView.do"
                , winName: 'faqUpdate'
                , title: x2coMessage.getMessage("faqMgmt.updateTitle")
                , _title: x2coMessage.getMessage("faqMgmt.updateTitle")
                , left: 20
                , top: 40
                , width: 790
                , height: 700
                , scrollbars: false
                , autoresize: false
            };
        }
        popCommon(pin, POP_DATA, function(e) {
			faqGrid.eventhandler.onSearch(0);
		});
    }
};