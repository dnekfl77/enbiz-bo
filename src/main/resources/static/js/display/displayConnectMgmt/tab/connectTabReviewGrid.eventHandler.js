$.namespace("connectTabReviewGrid.eventhandler");
connectTabReviewGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
        this.onSearch(0);
    },

    gridLoading : function(){
        var self = this;
        this.grid.setHeader({ showTooltip: false }); // 해더영역 툴팁 해제

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        });

        this.grid.onValidateColumn = function(grid, column, inserting, value) {
            var error = {};

            //if(grid.getCurrent().dataRow > 0) {
                //var rowState = grid.getDataSource().getRowState(grid.getCurrent().dataRow);
                //if (rowState !== "deleted" && rowState !== "createAndDeleted" ) {
                    if (column.fieldName === "dispStrDtm") {
                        if (value === null || value === '') {
                            error.level = "error";
                            error.message = "전시 시작일시는 " + msg.necessaryCheckMessage;
                        }
                    } else if(column.fieldName === 'dispEndDtm'){
                        if (value === null || value === '') {
                            error.level = "error";
                            error.message = "전시종료일시는 " + msg.necessaryCheckMessage;
                        }
                    } else if(column.fieldName === 'dispSeq'){
                        if (value === null || value === '') {
                            error.level = "error";
                            error.message = "전시순서는 " + msg.necessaryCheckMessage;
                        }
                    }
                    return error;
                //}
            //}
        }

        this.grid.onValidateRow = function(grid, itemIndex, dataRow, inserting, values) {
            var error = {};
            var rowState = grid.getDataSource().getRowState(dataRow);
            if (rowState !== "deleted" && rowState !== "createAndDeleted" ) {
                var today = new Date(); // 현재날짜
                today = today.getFullYear() + "" + addzero(today.getMonth() + 1) + "" + addzero(today.getDate()) + "000000";

                if (values.dispSeq !== null && values.dispSeq !== '') {
                    if(values.dispSeq == "0") {
                        error.level = "error";
                        error.message = msg.checkDispSeq;
                    }
                } else if((values.dispStrDtm !== null && values.dispStrDtm !== '')
                   && (values.dispEndDtm !== null && values.dispEndDtm !== '')) {

                    var startDate = (values.dispStrDtm).replace( /(\s*)/g, '').replace(/-/g, '').replace(/:/g, ''); // 공백, -, : 제거;
                    var endDate = (values.dispEndDtm).replace( /(\s*)/g, '').replace(/-/g, '').replace(/:/g, ''); // 공백, -, : 제거;

                    if(today > startDate){
                        error.level = "error";
                        error.message = "전시시작일시는 오늘이후로 입력가능합니다.";
                    }else if(startDate > endDate){
                        error.level = "error";
                        error.message = "전시종료일시는 전시시작일시보다 커야합니다.";
                    }
                }
                return error;
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        // 그리드 상품리뷰 추가 버튼
        $("#btn_reviewGrid_add").click(function() {
            self.onAdd();
        });

        // 그리드 행삭제 버튼
        $("#btn_reviewGrid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        // 그리드 변경 취소 버튼
        $("#btn_reviewGrid_reset").click(function() {
            self.onReset();
        });

        // 그리드 저장 버튼
        $("#btn_reviewGrid_save").click(function() {
            self.onSave();
        });

        // 그리드 전시기간 일괄변경 버튼
        $("#btn_reviewGrid_updateDispDateList").click(function() {
            self.onTermChange();
        });
    },

    onTermChange : function(){
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'display/displayConnectMgmt.displayConnectTermChangePopup.do'
            , winName: 'displayConnectTermChange'
            , title: '전시기간 일괄변경'
            , _title: '전시기간 일괄변경'
            , left: 50
            , top: 50
            , width: 500
            , height: 430
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.termChangeCallback.bind(this));
    },

    termChangeCallback : function(e){
        var resultData = JSON.parse(e.data);
        this.grid.commit();
        var rowCount = this.grid.getItemCount(); // 그리드에 있던 행의 수

        // 수정인 경우만 체크
        for(var i = 0; i<rowCount; i++){
            this.grid.setValue(i , "dispStrDtm", resultData.dispStrDtm);
            this.grid.setValue(i , "dispEndDtm", resultData.dispEndDtm);
        }
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

    onAdd : function() {
        var POP_DATA = {
            url: _baseUrl + 'display/displayConnectMgmt.displayGoodsReviewListPopup.do'
            , winName: 'displayGoodsReviewListPopup'
            , title: '전시대상 상품리뷰 조회 팝업'
            , _title: '전시대상 상품리뷰 조회 팝업'
            , left: 20
            , top: 20
            , width: 790
            , height: 605
            , scrollbars: false
            , autoresize: false
        };
        popCommon('', POP_DATA, this.reviewPopupCallback.bind(this));
    },

    reviewPopupCallback : function(e){
        this.grid.commit();
        var resultData = JSON.parse(e.data);
        var dataList = resultData; // 중복을 제거한 값
        var rowCount = this.grid.getItemCount(); // 원래 그리드에 있던 행의 수

        // 수정인 경우만 체크
        for(var i = 0; i<rowCount; i++){
            for(var j = 0; j<resultData.length; j++) {
                if(resultData[j].revNo == this.grid.getValue(i , "conrContNo") ) { // 추가된 상품리뷰와 원래 그리드에 있던 상품 비교
                    dataList.splice(j,1); // 중복 요소 삭제
                }
            }
        }

        // 상품추가 팝업 후 리턴 값 셋팅
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

        console.log("dataList : " + dataList);
        for(var i=0; i<dataList.length; i++) {
            dataList[i].dispCtgNo = dispDetail.dispCtgNo;
            dataList[i].conrNo = connerReq.conrNo;
            dataList[i].conrTgtNo = $('.tabs-area > ul > .active > input[name=conrTgtNo]').val();
            dataList[i].conrTgtCd = $('.tabs-area > ul > .active > input[name=conrTgtCd]').val();
            dataList[i].conrContNo = dataList[i].revNo;
            dataList[i].dispSeq = Number(maxDispSeq) + i;
            dataList[i].dispYn = "Y";

            var today = new Date(); // 현재날짜
            today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate()) + " 00:00:00";
            var lastDate = new Date(); // 현재날짜
            lastDate = new Date(lastDate.setDate(lastDate.getDate()+30));
            lastDate = lastDate.getFullYear() + "-" + addzero(lastDate.getMonth() + 1) + "-" + addzero(lastDate.getDate()) + " 23:59:59";
            dataList[i].dispStrDtm = today;
            dataList[i].dispEndDtm = lastDate;
        }

        this.grid.getDataSource().addRows(dataList);
    },

    onDelete : function() {
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.removeRowValidMessage);
            return;
        }
        this.defaultHandler.onDelete(this.grid);
    },

	onReset : function() {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    },

    onSave : function() {
        var grid = this.grid;
        grid.commit();

        var log = grid.validateCells(null,false);
        if(log != null) {
            alert(log[0].message);
            grid.cancel();
            return;
        }

        var result = false;
        var dataResource = this.grid.getDataSource();

        for(var i = 0; i<this.grid.getItemCount(); i++){
            if(this.grid.getDataSource().getRowState(i) == "created" || this.grid.getDataSource().getRowState(i) == "updated") {
                this.grid.checkRow(i);
            }
        }

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