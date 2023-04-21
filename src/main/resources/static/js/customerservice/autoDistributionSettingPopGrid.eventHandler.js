$.namespace("autoDistributionSettingPopGrid.eventhandler");
autoDistributionSettingPopGrid.eventhandler = {

    alertMessage : x2coMessage.getMessage( {
        autoDivGbCd :  "csAllocationMgmt.autoDtSettingPop.msg.autoDivGbCd",
        dayclQuotQty :  "csAllocationMgmt.autoDtSettingPop.msg.dayclMaxQuotQty",
        stop :  "csAllocationMgmt.autoDtSettingPop.msg.stop",
        progress :  "csAllocationMgmt.autoDtSettingPop.msg.progress",
        dulicate :  "csAllocationMgmt.autoDtSettingPop.msg.dulicate"
    }),

    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;
        this.grid.addLookupSource(autoDivDtlCodes);
        this.grid.editOptions.commitLevel = "error";
        this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
            var error = {};
            if (column.fieldName === "autoDivGbCd") {
                if (value === undefined || value === null || value.trim() === '') {
                    error.level = "error";
                    error.message = self.alertMessage.autoDivGbCd;
                }
            } else if(column.fieldName === 'dayclQuotQty') {
                if (value === undefined || value === null || isNaN(value)) {
                    error.level = "error";
                    error.message = self.alertMessage.dayclQuotQty
                }
            }
            return error;
        }
    },

    bindButtonEvent : function(){
        var self = this;

        //행삭제
        $('#btn_grid_delete').click(function(){
            self.onDelete();
        })

        //변경취소
        $('#btn_grid_cancel').click(function(){
            self.onReset();
        })

        //할당중지
        $('#btn_grid_stop').click(function(){
            if(confirm(self.alertMessage.stop)) {
                self.changeManagerAutoDivPsb('N');
            }
        })

        //할당진행
        $('#btn_grid_progress').click(function(){
            if(confirm(self.alertMessage.progress)) {
                self.changeManagerAutoDivPsb('Y');
            }
        })

        //저장
        $('#btn_grid_save').click(function(){
            self.onSave();
        })

        $('#btn_popup_close').click(function(){
            window.close();
        })

    },
    onSearch : function(pageIdx){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        var extraQueryString = 'deptCd='+this.deptCd;
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc);
    }
    // 행추가
    ,onAdd : function (aempId,aempNm) {
        var grid = this.grid;
        grid.commit(); // 편집중인 행 편집 완료 처리

        var defaultValues = {
            aempId : aempId,
            aempNm : aempNm,
            autoDivGbCd : null,
            autoDivDtlNo : null,
            autoDivPsbYn : 'Y'
        };

        this.defaultHandler.onAdd(grid, defaultValues);
    },
    onSave : function() {
        var self = this;
        var grid = this.grid;
        grid.commit();

        var dataResource = grid.getDataSource();
        // var rowState = dataResource.getAllStateRows();
        // var rowList = rowState.created.concat(rowState.updated);
        // var indexList = grid.getItemsOfRows(rowList);
        // var errorData = grid.validateCells(indexList,false);
        // if(errorData != null) {
        //     alert(errorData[0].message);
        //     return;
        // }

        var checkedRows = grid.getCheckedRows();
        var checkedDataSourceRows = grid.getItemsOfRows(checkedRows);

        //////////test
        var gridCount = grid.getItemCount();


        var createDulicate = false;
        checkedDataSourceRows.forEach(function(row){
            var s_dataRow= self.grid.getDataRow(row);
            if(dataResource.getRowState(s_dataRow) === "created"){
                var s_aempId = dataResource.getValue(s_dataRow,'aempId');
                var s_autoDivGbCd = dataResource.getValue(s_dataRow,'autoDivGbCd');
                var s_autoDivDtlNo = dataResource.getValue(s_dataRow,'autoDivDtlNo');


                for(var i=0;i<gridCount;i++){
                    var _itemIndex = self.grid.getItemIndex(i);
                    var dataRow= self.grid.getDataRow(_itemIndex);
                    if(s_dataRow === dataRow){
                        continue;
                    }
                    var aempId = dataResource.getValue(dataRow,'aempId');
                    var autoDivGbCd = dataResource.getValue(dataRow,'autoDivGbCd');
                    var autoDivDtlNo = dataResource.getValue(dataRow,'autoDivDtlNo');

                    if(s_aempId === aempId && s_autoDivGbCd === autoDivGbCd && ( s_autoDivDtlNo === autoDivDtlNo || s_autoDivDtlNo === 'null' || autoDivDtlNo === 'null' )){
                        createDulicate = true;
                    }
                }

            }
        })

        // var createDulicate = false;
        // checkedDataSourceRows.forEach(function(row){
        //     var s_dataRow= self.grid.getDataRow(row);
        //     if(dataResource.getRowState(s_dataRow) === "created"){
        //         var s_aempId = dataResource.getValue(s_dataRow,'aempId');
        //         var s_autoDivGbCd = dataResource.getValue(s_dataRow,'autoDivGbCd');
        //         var s_autoDivDtlNo = dataResource.getValue(s_dataRow,'autoDivDtlNo');
        //
        //         checkedDataSourceRows.forEach(function(row){
        //             var dataRow= self.grid.getDataRow(row);
        //             if(s_dataRow === dataRow){
        //                 return;
        //             }
        //             var aempId = dataResource.getValue(dataRow,'aempId');
        //             var autoDivGbCd = dataResource.getValue(dataRow,'autoDivGbCd');
        //             var autoDivDtlNo = dataResource.getValue(dataRow,'autoDivDtlNo');
        //
        //             if(s_aempId === aempId && s_autoDivGbCd === autoDivGbCd && ( s_autoDivDtlNo === autoDivDtlNo || s_autoDivDtlNo === 'null' )){
        //                 createDulicate = true;
        //             }
        //         })
        //     }
        // })

        if(createDulicate){
            alert(self.alertMessage.dulicate);
            return;
        }

///
        var dulicateData = false;
        checkedDataSourceRows.forEach(function(row){
            var dataRow= grid.getDataRow(row);
            if(dataResource.getRowState(dataRow) === "created"){
               var result = self.checkValidateManager(dataResource,dataRow,'c');
               if(result){
                   dulicateData = true;
               }
            }
        })

        if(dulicateData){
            alert(self.alertMessage.dulicate);
            return;
        }

        this.controller.doSave(this, grid.localId);
    },
    onReset : function() {
        this.defaultHandler.onCancel(this.grid);
    },
    onDelete : function() {
        var grid = this.grid;
        grid.commit();
        if (this.grid.getCheckedItems().length === 0) {
            alert(_msg.noSelectedDataMsg);
            return;
        }
        this.defaultHandler.onDelete(grid);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                listTree.treeLoading();
            }
        },
        onEditCommit : function(grid, index, oldValue, newValue) {
            if (index.fieldName === "autoDivGbCd") {
                if (oldValue !== newValue) {
                    grid.setValue(index.itemIndex, "autoDivDtlNo", "null");
                }
            }
        }
    },
    checkValidateManager : function(dataResource,dataRow,state){

        var autoDivNo = dataResource.getValue(dataRow,'autoDivNo');
        var aempId = dataResource.getValue(dataRow,'aempId');
        var autoDivGbCd = dataResource.getValue(dataRow,'autoDivGbCd');
        var autoDivDtlNo = dataResource.getValue(dataRow,'autoDivDtlNo');

        var parameter = {};
        parameter.autoDivNo = autoDivNo;
        parameter.aempId = aempId;
        parameter.autoDivGbCd = autoDivGbCd;
        parameter.autoDivDtlNo = autoDivDtlNo;
        parameter.deptCd = autoDistributionSettingPopGrid.eventhandler.deptCd;
        parameter.state = state;

        var returnValue = false;

        common.Ajax.sendRequestSync(
            "get"
            ,_baseUrl + "customerservice/csAllocationMgmt.checkValidateManager.do"
            ,parameter
            ,function(result) {
                returnValue = result;
            }
        );

        return returnValue;
    },
    changeManagerAutoDivPsb : function(state){
        var self = this;
        var dataResource = this.grid.getDataSource();
        var checkedRows = this.grid.getCheckedRows();
        var checkedDataSourceRows = this.grid.getItemsOfRows(checkedRows);

        if(checkedRows.length < 1){
            alert(_msg.noSelectedDataMsg);
            return;
        }

        var autoDivNoList = [];

        checkedDataSourceRows.forEach(function(row){
            var dataRow= self.grid.getDataRow(row);
            if(dataResource.getRowState(dataRow) === "updated"){
                var autoDivNo = dataResource.getValue(dataRow,'autoDivNo');
                autoDivNoList.push(autoDivNo);
            }
        })

        var param = {};
        param.autoDivNoList = autoDivNoList;
        param.state = state;

        if(autoDivNoList.length > 0){
            common.Ajax.sendJSONRequest(
                "post"
                ,_baseUrl + "customerservice/csAllocationMgmt.changeAutoDivideAllocationPossibleYn.do"
                ,param
                ,function(result) {
                    if(result.succeeded){
                        listTree.treeLoading();
                    }
                }
                ,null
                ,null
                ,true
            );
        }
    }
};