$.namespace("pgByPaymentGrid.eventhandler");
pgByPaymentGrid.eventhandler = {
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
    },

    bindButtonEvent : function(){
        var self = this;

        $("#btn_pgByPayment_grid_add").click(function() {
            self.onAdd();
        });

        $("#btn_pgByPayment_grid_reset").click(function() {
            self.onReset();
        });

        $("#btn_pgByPayment_grid_save").click(function() {
            self.onSave();
        });
    },

    gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },
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

    onAdd : function(){
        this.grid.commit();
        var defaultValues = { pgGbCd : $("#pgGbCd").val(), linkYn : "Y" };
        this.defaultHandler.onAdd(this.grid, defaultValues);
    },

    onReset : function(){
        this.defaultHandler.onCancel(this.grid);
    },
    
    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();
        var param = "pgGbCd=" + $("#pgGbCd").val();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc, null, isOpenToast);
    },

    onSave : function() {
        this.grid.commit();

        var result = false;
        var payWayCdCheck = true;
        var payWayCdOverLap = true;
        var dataResource = this.grid.getDataSource();
        var dataList = [];

        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                result = true;
            }
            if(this.grid.getValue(i , "payWayCd") == undefined) {
                payWayCdCheck = false;
                break;
            } else {
                for(var j=0; j<dataList.length; j++){
                    if(dataList[j] == this.grid.getValue(i , "payWayCd")) {
                        payWayCdOverLap = false;
                        break;
                    }
                }
                dataList.push(this.grid.getValue(i , "payWayCd"));
            }
        }

        if(!result){
            alert(msg.gridNoSelected);
            return;
        }

        if(!payWayCdCheck){
            alert(msg.payWayCdCheck);
            return;
        }

        if(!payWayCdOverLap){
            alert(msg.payWayCdOverLap);
            return;
        }

        this.controller.doSave(this, this.grid.localId);
    }
};