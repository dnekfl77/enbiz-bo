$.namespace("mkdpGoodsGrid.eventhandler");
mkdpGoodsGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;

        // this.grid.setEditOptions({ editable: false }) // 그리드 수정불가

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
            if (column.fieldName === "divobjNm") {
                if (value === null || value === '' || value === undefined) {
                    error.level = "error";
                    error.message = "구분자명은 " + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'dispSeq'){
                if (value === null || value === '' || value === undefined) {
                    error.level = "error";
                    error.message = "전시순서는 " + msg.necessaryCheckMessage;
                }
            }  else if(column.fieldName === 'tmplNo'){
                if (value === null || value === '' || value === undefined) {
                    error.level = "error";
                    error.message = "상품 전시 템플릿은 " + msg.necessaryCheckMessage;
                }
            }
            return error;
        };

        this.grid.onValidateRow = function(grid, itemIndex, dataRow, inserting, values) {
            var error = {};
            var rowState = grid.getDataSource().getRowState(dataRow);
            if (rowState !== "deleted" && rowState !== "createAndDeleted" ) {
                if (values.dispSeq !== null && values.dispSeq !== '') {
                    if(values.dispSeq == "0") {
                        error.level = "error";
                        error.message = msg.checkDispSeq;
                    }
                }
                return error;
            }
        };
    },

    bindButtonEvent : function(){
        var self = this;

         if(req.dispStat != "30") {

            // 그리드 상품 추가 버튼
            $("#btn_mkdpGoodsGrid_insert").click(function() {
                self.onAdd();
            });

            // 그리드 행삭제 버튼
            $("#btn_mkdpGoodsGrid_remove").click(function() {
                self.grid.cancel();
                self.onDelete();
            });

            // 그리드 변경 취소 버튼
            $("#btn_mkdpGoodsGrid_reset").click(function() {
                self.onReset();
            });

            // 그리드 저장 버튼
            $("#btn_mkdpGoodsGrid_save").click(function() {
                self.onSave();
            });

         } else {
             self.grid.setEditOptions({ editable: false }) // 그리드 수정불가
         }

    },

    gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0, $("#mkdpGoodsGrid_divobjNo").val());
           }
        },
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            $('#mkdpGoodsGrid_totalCount').html(grid.getDataSource().getRowCount());
            $('#goodsTotalCount').text(grid.getDataSource().getRowCount());

            var param = {
                mkdpNo : req.mkdpNo
                , divobjNo : $("#mkdpGoodsGrid_divobjNo").val()
            }
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "display/marketingDisplayMgmt.getSoldOutCount.do"
                 ,param
                 ,function(obj) {
                      if (obj.data !== undefined) {
                         $('#goodsSoldOutCount').text(obj.data);
                      }
                 }
            );
        }

    },

    onSearch : function(pageNo, divobjNo){
        var that = this;
        this.grid.cancel();

        $("#mkdpGoodsGrid_divobjNo").val(divobjNo);
        $("#mkdpNo").attr('disabled',false);
        var param = 'divobjNo=' + divobjNo;

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc);
    },

    onAdd : function() {
        var pin = {
            argSelectType : 'N',
            argSaleState : '10,20,30',
            argGoodsType : '10'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/goodsMgmtPopup.goodsListPopup.do'
            , winName: 'goodsListPopup'
            , title: '상품 조회'
            , _title: '상품 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.goodsPopupCallback.bind(this));
    },

    goodsPopupCallback : function(e){
        this.grid.commit();
        var resultData = JSON.parse(e.data);
        var contents = resultData; // 중복을 제거한 값
        var rowCount = this.grid.getItemCount(); // 원래 그리드에 있던 행의 수

        // 수정인 경우만 체크
        for(var i = 0; i<rowCount; i++){
            for(var j = 0; j<resultData.length; j++) {
                if(resultData[j].goodsNo == this.grid.getValue(i , "goodsNo") ) { // 추가된 상품과 원래 그리드에 있던 상품 비교
                    contents.splice(j,1); // 중복 요소 삭제
                }
            }
        }

        var dataList = [];
        for(var i=0; i<contents.length; i++) {
            var param = {
                goodsNo : contents[i].goodsNo
            }
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtGoodsDetail.do"
                 ,param
                 ,function(obj) {
                      if (obj.data !== undefined) {
                         dataList.push(obj.data);
                      }
                 }
            );
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
            if (maxDispSeq < thisDispSeq && thisDispSeq != 99999) { // 99999는 디폴트값
                maxDispSeq = thisDispSeq;
            }
        }
        if(maxDispSeq != 99999) { // 최대값 : 999
            maxDispSeq = Number(maxDispSeq) + 1;
        }

        for(var i=0; i<dataList.length; i++) {
            dataList[i].mkdpNo = req.mkdpNo;
            dataList[i].divobjNo = $("#mkdpGoodsGrid_divobjNo").val();
            dataList[i].goodsNo = dataList[i].goodsNo;
            dataList[i].goodsNm = dataList[i].goodsNm;
            dataList[i].saleStatCd = dataList[i].saleStatCd;
            dataList[i].entrNm = dataList[i].entrNm;
            dataList[i].norPrc = dataList[i].norPrc;
            dataList[i].salePrc = dataList[i].salePrc;
            dataList[i].sysReqDtm = dataList[i].sysReqDtm;
            dataList[i].dispSeq = Number(maxDispSeq) + i;
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
        var self = this;
        var grid = self.grid;

        self.defaultHandler.onCancel(grid);
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