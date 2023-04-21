$.namespace("pgGrid.eventhandler");
pgGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
        this.onSearch(0);
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
    },

    bindButtonEvent : function(){
        var self = this;

        $("#btn_pg_grid_save").click(function() {
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
        },
        // 선택된 행이 바뀌는 경우
        onCurrentRowChanged : function(grid, oldRow, newRow) {
           grid.commit();
            $("#pgGbCd").val(grid.getValue(grid.getCurrent().itemIndex, "cd"));
            pgByPaymentGrid.eventhandler.onSearch(0);
        }
    },
    
    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, null, pageNo, pageFunc, null, isOpenToast);
    },

    onSave : function() {
        this.grid.commit();

        var result = false;
        var useYnCnt = false;
        var dataResource = this.grid.getDataSource();

        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                result = true;
            }
            if(this.grid.getValue(i , "useYn") == "Y") {
                useYnCnt = true;
            }
        }

        if(!result){
            alert(msg.gridNoSelected);
            return;
        }

        if(!useYnCnt){
            alert(msg.useYnCheck);
            return;
        }

        this.controller.doSave(this, this.grid.localId);
    }
};