$.namespace("subMenuListGrid.eventhandler");
subMenuListGrid.eventhandler = {

    init : function(){
        this.gridLoading();
        this.bindButtonEvent();
    },

    getRowCount : function(){
        var dataResource = this.grid.getDataSource();
        return dataResource.getRowCount();
    },

    gridLoading : function(){
        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        };

        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        this.grid.editOptions.commitLevel = "error";
        this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
            var error = {};
            if (column.fieldName === "rtTgtNm") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "메뉴명은 " + msg.necessaryCheckMessage;
                }
            } else if (column.fieldName === "sysGbCd") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "메뉴유형은 " + msg.necessaryCheckMessage;
                }
            } else if (column.fieldName === "sortSeq") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "정렬순서는 " + msg.necessaryCheckMessage;
                } else if(value == 0) {
                    error.level = "error";
                    error.message = msg.sortSeqCheck;
                }
            }
            return error;
        }
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_grid_add').click(function() {
            self.onAdd();
        });

        $('#btn_grid_remove').click(function() {
            self.onDelete();
        });

        $("#btn_grid_reset").click(function() {
            self.onReset();
        });

        $('#btn_grid_save').click(function() {
            self.onSave();
        });
    },

    onSearch : function(pageIdx){
        let self = this;
        self.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        self.controller.doQuery(this,null,pageIdx, pagingFunc);
    },

    gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                menuListGrid.eventhandler.treeLoading();
                if($('#rtTgtSeq').val() != '' && $('#rtTgtSeq').val() != undefined){
                    eventHandler.onSearch(0);
                }
            }
        }
    },

    onAdd : function() {
        this.grid.commit();
        var uprRtTgtSeq = $('#rtTgtSeq').val() == '' ? $('#sysGbCdOpt option:selected').data('uprval') : $('#rtTgtSeq').val();
        var defaultValues = {
              sysGbCd : $('#sysGbCdOpt').val()
            , rtTgtTypCd : "40"
            , uprRtTgtSeq : uprRtTgtSeq
            , useYn : "Y"
            , sortSeq: 1
        };

        this.defaultHandler.onAdd(this.grid, defaultValues);
    },

    onDelete : function() {
        this.grid.cancel();
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.rowCheckMsg);
            return;
        }
        this.defaultHandler.onDelete(this.grid);
    },

    onReset : function() {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        //최하위여부 체크
        if($("input[name=leafMenuYn]:checked").val() == 'Y' && ($.trim($('#rtTgtSeq').val()) != '' && $('#rtTgtSeq').val() != undefined)){
            alert(msg.messaageChkLeafYnSub);
            return;
        }

        if($('#rtTgtSeq').val() === ''){
            alert(msg.messaageUprRtTgtSeqCheck);
            return;
        }

        var grid = this.grid;
        this.grid.commit(true);
        var result = false;
        var dataResource = this.grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        var rowState = dataResource.getAllStateRows();
        var rowList = rowState.created.concat(rowState.updated);
        var deleteRowList = rowState.deleted;
        var indexList = this.grid.getItemsOfRows(rowList);
        var log = this.grid.validateCells(indexList,false);
        if(log != null) {
            alert(log[0].message);
            return;
        }

        for(var i = 0; i<gridCount; i++){
            if(this.grid.isCheckedItem(i)){
                result = true;
                break;
            }
        }

        if(!result){
            alert(msg.messageNotCheckedData);
            return ;
        }

        // 메뉴 삭제 시 하위 메뉴가 없는 경우 & 권한이 없는 경우 삭제 가능
        for(var i=0; i<deleteRowList.length; i++) {
            var rtTgtSeq = grid.getValue(deleteRowList[i], "rtTgtSeq");
            var param = '&rtTgtSeq=' + rtTgtSeq;
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "system/menuMgmt.getRtTargetSequenceCheck.do"
                 ,param
                 ,function(obj) {
                      if (!obj.succeeded) { // 오류
                         alert("매뉴명 (" + grid.getValue(deleteRowList[i], "rtTgtNm") + ") : " + msg.rtTgtSeqCheck);
                         result = false;
                      } else {
                         result = true;
                      }
                 }
            );

            if(!result) {
               return false;
            }
        }

        if(result) {
            this.controller.doSave(this, this.grid.localId);
        }
    }

};