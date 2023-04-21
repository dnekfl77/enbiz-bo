$.namespace("displayGoodsGrid.eventhandler");
displayGoodsGrid.eventhandler = {

    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    },

    valSetting : function (data) {
        $("#displayGoodsGrid_dispCtgNo").val(data.dispCtgNo);
    },

    gridLoading : function(){
        var self = this;

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
            var rowState = grid.getDataSource().getRowState(grid.getCurrent().dataRow);
            if (rowState !== "deleted" && rowState !== "createAndDeleted" ) {
                if(column.fieldName === 'dispSeq'){
                    if (value === undefined || value === '') {
                        error.level = "error";
                        error.message = msg.dispSeq + msg.necessaryCheckMessage;
                    }
                }
                return error;
            }
        }
    },

    bindButtonEvent : function(){
        var self = this;

        // 전시상품 일괄등록
        $("#btn_displayGoodsGrid_addList").click(function() {
            self.onAddList();
        });

        // 상품추가
        $("#btn_displayGoodsGrid_add").click(function() {
            self.onAdd();
        });

        // 행삭제
        $("#btn_displayGoodsGrid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        // 저장
        $("#btn_displayGoodsGrid_save").click(function() {
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
        var that = this;
        this.grid.cancel();

        $("#displayGoodsGrid_dispCtgNo").val(seq);
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo, seq, false); };
        this.controller.doQuery(this, null, pageNo, pageFunc, null, isOpenToast);
    },

    onAddList : function() {
        var self = this;
        var pin = { dispCtgNo : $("#displayGoodsGrid_dispCtgNo").val() };
        var POP_DATA = {
              url: _baseUrl + "display/displayCategoryMgmt.displayCategoryMgmtGoodsInsertPopupSaveView.do"
            , winName: 'goodsInsertListPopup'
            , title: '전시상품 일괄등록'
            , _title: '전시상품 일괄등록'
            , left: 20
            , top: 50
            , width: 1000
            , height: 660
            , scrollbars: false
            , autoresize: false
        }
        popCommon(pin, POP_DATA, function() {
            self.onSearch(0, $("#displayGoodsGrid_dispCtgNo").val(), false);
        });
    },

    onAdd : function() {
        var pin = {
            argSelectType: 'N',
            argSaleState: '',
            argGoodsType: ''
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
            var goodsNo = contents[i].goodsNo;
            var dispCtgNo = $("#displayGoodsGrid_dispCtgNo").val();
            var param = {
                dispCtgNo : dispCtgNo
                , goodsNo : goodsNo
            }
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtGoodsDetail.do"
                 ,param
                 ,function(obj) {
                      if (obj.data != null) {
                         dataList.push(obj.data);
                      }
                 }
            );
        }

        if ( dataList[0] == null) {
            alert(msg.goodDetailMsg)
            return;
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

        for(var i=0; i<dataList.length; i++) {
            dataList[i].dispCtgNo = $("#displayGoodsGrid_dispCtgNo").val();
            dataList[i].dispSeq = Number(maxDispSeq) + i;
            dataList[i].dispYn = "Y";
        }

        this.grid.getDataSource().addRows(dataList);
    },

    onDelete : function() {
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }
        this.defaultHandler.onDelete(this.grid);
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

        for(var i = 0; i<this.grid.getItemCount(); i++){
            if(this.grid.getDataSource().getRowState(i) == "created") {
                this.grid.checkRow(i);
            }
        }

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
            return ;
        }

        this.controller.doSave(this, this.grid.localId);
    }

};