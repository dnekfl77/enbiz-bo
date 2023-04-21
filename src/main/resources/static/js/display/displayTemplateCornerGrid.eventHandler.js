$.namespace("displayTemplateCornerGrid.eventhandler");
displayTemplateCornerGrid.eventhandler = {
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

        // 코너명 클릭 시 해당 코너상세 팝업이 뜸
        this.grid.onCellClicked = function(grid,clickData){
            var currentData = self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.cellType != "header") {
                if(clickData.column === 'conrNm'){
                    var pin = { conrNo : currentData.conrNo, reSearchPage : "displayTemplateMgmt_corner" };
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
                    popCommon(pin, POP_DATA, null);
                }
            }
        }

        this.grid.editOptions.commitLevel = "error";
        this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
            var error = {};
			var data = grid.getValues(dataRow);
            var rowState = grid.getDataSource().getRowState(grid.getCurrent().dataRow);
            if (column.fieldName === "dispStrDtm") {
                if (value === undefined || value === null || value === '') {
                    error.level = "error";
                    error.message = msg.dispStrDtm + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'dispEndDtm'){
                if (value === undefined || value === null || value === '') {
                    error.level = "error";
                    error.message = msg.dispEndDtm + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'dispSeq'){
                if (value === undefined || value === null || value === '') {
                    error.level = "error";
                    error.message = msg.dispSeq + msg.necessaryCheckMessage;
                }
            } else { // 값 확인
                var today = new Date(); // 현재날짜
                today = today.getFullYear() + "" + addzero(today.getMonth() + 1) + "" + addzero(today.getDate()) + "000000";

                if(data.dispSeq == "0") {
                    error.level = "error";
                    error.message = msg.checkDispSeqMsg;
                } else {
                    var startDate = (data.dispStrDtm).replace( /(\s*)/g, '').replace(/-/g, '').replace(/:/g, ''); // 공백, -, : 제거;
                    var endDate = (data.dispEndDtm).replace( /(\s*)/g, '').replace(/-/g, '').replace(/:/g, ''); // 공백, -, : 제거;
                    if(today > startDate){
                        error.level = "error";
                        error.message = msg.checkDispDate1Msg;
                    }else if(startDate > endDate){
                        error.level = "error";
                        error.message = msg.checkDispDate2Msg;
                    }
                }
            }
            return error;
        }
    },

    bindButtonEvent : function(){
        var self = this;

        // 행추가
        $("#btn_grid_conr_add").click(function() {
            self.onCornerAdd();
        });

        // 행삭제
        $("#btn_grid_conr_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        // 변경취소
        $("#btn_grid_conr_reset").click(function() {
            self.onReset();
        });

        // 저장
        $("#btn_grid_conr_save").click(function() {
            self.onSave();
        });
    },

    onCornerAdd : function() {
        var POP_DATA = {
            url: _baseUrl + 'display/displayTemplateMgmt.displayTemplateMgmtCornerPopup.do'
            , winName: 'displayCornerListPopup'
            , title: '코너 조회 팝업'
            , _title: '코너 조회 팝업'
            , left: 20
            , top: 20
            , width: 790
            , height: 605
            , scrollbars: false
            , autoresize: false
        };
        popCommon(null, POP_DATA, this.cornerAddCallback.bind(this) );
    },

    cornerAddCallback : function(e){
        this.grid.commit();
        var resultData = JSON.parse(e.data);
        var conrList = resultData; // 중복을 제거한 값
        var rowCount = this.grid.getItemCount(); // 원래 그리드에 있던 행의 수

        // 수정인 경우만 체크
        for(var i = 0; i<rowCount; i++){
            for(var j = 0; j<resultData.length; j++) {
                if(resultData[j].chlNo == this.grid.getValue(i , "conrNo") ) { // 추가된 코너와 원래 그리드에 있던 코너 비교
                    conrList.splice(j,1); // 중복 요소 삭제
                }
            }
        }

        // 전시 순서 Max 값 구하기
        var maxDispSeq = 0;
        var thisDispSeq = 0;
        var rowCount = this.grid.getDataSource().getRowCount();
        for(var row = 0; row < rowCount ; row ++){
            thisDispSeq = this.grid.getDataSource().getValue(row, "dispSeq");
            if (maxDispSeq < thisDispSeq && thisDispSeq != 99999) { // 99999는 디폴트값
                maxDispSeq = thisDispSeq;
            }
        }
        if(maxDispSeq != 99999) { // 최대값 : 99999
            maxDispSeq = Number(maxDispSeq) + 1;
        }

        var today = new Date(); // 현재날짜
        today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate()) + " 00:00:00";

        for(var i=0; i<conrList.length; i++) {
            conrList[i].tmplNo = $("#CornerGrid_tmplNo").val();
            conrList[i].dispStrDtm = today;
            conrList[i].dispYn = "Y";
            conrList[i].dispSeq = Number(maxDispSeq) + i;
        }

        this.grid.getDataSource().addRows(conrList);
    },

    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
        var param = 'tmplNo=' + $("#CornerGrid_tmplNo").val();
        this.controller.doQuery(this,param,pageIdx, pagingFunc, null, isOpenToast);
    },

    onDelete : function() {
        var result = true;
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }

        // 코너 삭제시 전시코너정보에 코너가 없는 경우 삭제 가능
        for(var i=0; i<checkedItems.length; i++) {
            var conrNo = this.grid.getValue(checkedItems[i], "conrNo");
            var param = '&conrNo=' + conrNo;
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "display/displayTemplateMgmt.checkPrDispConrInfo.do"
                 ,param
                 ,function(obj) {
                      if (!obj.succeeded) {
                         alert("코너 번호(" + conrNo + ") : " + msg.checkPrDispConrInfoMsg);
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

	onReset : function() {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        this.grid.commit(true);
        var dataResource = this.grid.getDataSource();
        var gridCount = dataResource.getRowCount();
        for(var i = 0; i<this.grid.getItemCount(); i++){
            if(dataResource.getRowState(i) == "created" || dataResource.getRowState(i) == "updated") {
                this.grid.checkRow(i);
            }
        }

        var result = false;
        var rowState = dataResource.getAllStateRows();
        var rowList = rowState.created.concat(rowState.updated);
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
            alert(msg.gridNoSelected);
            return;
        }

        this.controller.doSave(this, this.grid.localId);
    },

    gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0, false);
           }
        }
    }
};