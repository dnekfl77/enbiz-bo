$.namespace("subCategoryGrid.eventhandler");
subCategoryGrid.eventhandler = {

    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    valSetting : function (data) {
        $("#subCategoryGrid_uprDispCtgNo").val(data.dispCtgNo);
        $("#subCategoryGrid_siteNo").val(data.siteNo);
        $("#subCategoryGrid_dpmlNo").val(data.dpmlNo);
        $("#subCategoryGrid_shopTypCd").val(data.shopTypCd);

        // 상위 카테고리 번호들 셋팅
        $("#subCategoryGrid_lrgCtgNo").val(data.lrgCtgNo);
        $("#subCategoryGrid_midCtgNo").val(data.midCtgNo);
        $("#subCategoryGrid_smlCtgNo").val(data.smlCtgNo);
        $("#subCategoryGrid_thnCtgNo").val(data.thnCtgNo);

        if(data.level >= 2) {  // 사이트 마다 유동적으로 관리
            $("#subCategoryGrid_leafYn").val("Y");
        } else {
            $("#subCategoryGrid_leafYn").val("N");
        }
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

        this.grid.editOptions.commitLevel = "error";
        this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
            var error = {};
			var data = grid.getValues(dataRow);
		    var rowState = grid.getDataSource().getAllStateRows();
            if (column.fieldName === "dispCtgNm") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = msg.categoryNm + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'dispSeq'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = msg.dispSeq + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'dispStrDt'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = msg.dispStrDt + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'dispEndDt'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = msg.dispEndDt + msg.necessaryCheckMessage;
                }
            } else { // 데이터 값 범위 확인
                var today = new Date(); // 현재날짜
                 today = today.getFullYear() + "" + addzero(today.getMonth() + 1) + "" + addzero(today.getDate());
                 if((data.dispStrDt !== null && data.dispStrDt !== '') && (data.dispEndDt !== null && data.dispEndDt !== '')) {
                     var startDate = (data.dispStrDt).replace( /(\s*)/g, '').replace(/-/g, '').replace(/:/g, ''); // 공백, -, : 제거;
                     var endDate = (data.dispEndDt).replace( /(\s*)/g, '').replace(/-/g, '').replace(/:/g, ''); // 공백, -, : 제거;
                     if(rowState.created.includes(dataRow) && today > startDate) {
                         error.level = "error";
                         error.message = msg.dispStrDtMsg;
                     }
                     if(startDate > endDate){
                         error.level = "error";
                         error.message = msg.dispEndDtMsg;
                     }
                 }
            }
            return error;
        }
    },

    bindButtonEvent : function(){
        var self = this;

        $("#btn_subCategoryGrid_add").click(function() {
            self.onAdd();
        });

        $("#btn_subCategoryGrid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        $("#btn_subCategoryGrid_save").click(function() {
            self.onSave();
        });
    },

    gridEvent : {
        // 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            if(data.succeeded){
                openToast(msg.successfully);
                categoryTree.eventhandler.init();
           }
        }
    },

    onSearch : function(pageNo, seq, isOpenToast){
        this.grid.cancel();

        $("#subCategoryGrid_uprDispCtgNo").val(seq);
        var param = 'dispCtgNo=' + seq;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return this.onSearch(pageNo, seq, false); };
        this.controller.doQuery(this, param, pageNo, pageFunc, null, isOpenToast);
    },

    onAdd : function() {
        var self = this;
        var grid = self.grid;

        grid.commit();

        // 전시 순서 Max 값 구하기
        var maxDispSeq = 0;
        var thisDispSeq = 0;
        var rowCount = grid.getDataSource().getRowCount();
        for(var row = 0; row < rowCount ; row ++){
            thisDispSeq = grid.getDataSource().getValue(row, "dispSeq");
            if (maxDispSeq < thisDispSeq && thisDispSeq != 999) { // 999는 디폴트값
                maxDispSeq = thisDispSeq;
            }
        }
        if(maxDispSeq != 999) { // 최대값 : 999
            maxDispSeq = Number(maxDispSeq) + 1;
        }

        var today = new Date(); // 현재날짜
        today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());

        var defaultValues = { dispSeq : maxDispSeq, useYn : "Y", dispYn : "Y", dispStrDt : today , dispEndDt : "2999-12-31" };

        self.defaultHandler.onAdd(grid, defaultValues);
    },

    onDelete : function() {
        var self = this;
        var grid = self.grid;
        var result = true;

        var checkedItems = grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }

        // 카테고리 삭제 시 하위 카테고리가 없는 경우 삭제 가능
        for(var i=0; i<checkedItems.length; i++) {
            var dispCtgNo = grid.getValue(checkedItems[i], "dispCtgNo");
            var param = '&dispCtgNo=' + dispCtgNo;
            common.Ajax.sendRequestSync(
                 "GET"
                 ,_baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtSubCategoryList.do"
                 ,param
                 ,function(obj) {
                      if (obj.totalCount != 0) {
                         alert("전시 카테고리 번호 (" + dispCtgNo + ") : " + msg.checkSubCategory);
                         result = false;
                      }
                 }
            );

            if(!result) {
               return false;
            }
        }

        if(result) {
            this.defaultHandler.onDelete(grid);
        }
    },

    onSave : function() {
        this.grid.commit();
        var dataResource = this.grid.getDataSource();
        var rowState = dataResource.getAllStateRows();
        var rowList = rowState.created.concat(rowState.updated);
        var indexList = this.grid.getItemsOfRows(rowList);
        var log = this.grid.validateCells(indexList,false);
        if(log != null) {
            alert(log[0].message);
            return;
        }

        var result = false;
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

        this.controller.doSave(this, this.grid.localId, null, "subCategoryGridForm");
    }

};