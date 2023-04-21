$.namespace("mkdpDivGrid.eventhandler");
mkdpDivGrid.eventhandler = {
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

            // 그리드 행추가 버튼
            $("#btn_mkdpDivGrid_add").click(function() {
                self.onAdd();
            });

            // 그리드 행삭제 버튼
            $("#btn_mkdpDivGrid_remove").click(function() {
                self.grid.cancel();
                self.onDelete();
            });

            // 그리드 변경 취소 버튼
            $("#btn_mkdpDivGrid_reset").click(function() {
                self.onReset();
            });

            // 그리드 저장 버튼
            $("#btn_mkdpDivGrid_save").click(function() {
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
                eventHandler.onSearch(0);
           }
        },
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            $('#mkdpDivGrid_totalCount').html(grid.getDataSource().getRowCount());
            grid.resetSize();
        },
        // 선택된 행이 바뀌는 경우
        onCurrentRowChanged : function(grid, oldRow, newRow) {
           grid.commit();
           var divobjNo = grid.getValue(grid.getCurrent().itemIndex, "divobjNo");
            mkdpGoodsGrid.eventhandler.onSearch(0, divobjNo);
        }

    },

    onSearch : function(pageNo){
        var that = this;
        this.grid.cancel();

        $("#mkdpNo").attr('disabled',false);

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, null, pageNo, pageFunc);
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
            if (maxDispSeq < thisDispSeq && thisDispSeq != 99999) { // 99999는 디폴트값
                maxDispSeq = thisDispSeq;
            }
        }
        if(maxDispSeq != 99999) { // 최대값 : 999
            maxDispSeq = Number(maxDispSeq) + 1;
        }

		var defaultValues = {
		    mkdpNo : req.mkdpNo
		    , dispSeq : Number(maxDispSeq)
		    , dispYn : "Y"
		    , tmplNo : ""
		};

		self.defaultHandler.onAdd(grid, defaultValues);
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