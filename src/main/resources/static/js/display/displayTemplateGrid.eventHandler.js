$.namespace("displayTemplateGrid.eventhandler");
displayTemplateGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridImgButtonRenderer();
        this.gridLoading();
        this.bindButtonEvent();
    },

    // 전시 코너 등록 컬럼 버튼 셋팅
    gridImgButtonRenderer : function(){
        this.grid.registerCustomRenderer("renderer_imgBtn", {
            initContent : function (parent) {
                var span = document.createElement("span");
                span.className = "custom_render_span"
                parent.appendChild(this._button1 = document.createElement("span"));
            },
            canClick : function() {
                return true;
            },
            render : function(grid, model, width, height, info) {
                this._button1.className = "custom_search_displayCorner";
            },
            click : function(event) {
                if (event.target === this._button1) {
                    var pin = { reSearchPage : "displayTemplateMgmt" };
                    var POP_DATA = {
                        url: _baseUrl + 'display/displayCornerMgmt.displayCornerMgmtSaveView.do'
                        , winName: 'displayCornerInsert'
                        , title: '전시 코너 등록'
                        , _title: '전시 코너 등록'
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
        });
    },

    gridLoading : function(){
        var self = this;

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active';
            }
        });

        this.grid.editOptions.commitLevel = "error";
        this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
            var error = {};
            if (column.fieldName === "tmplNm") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = msg.tmplNm + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'tmplTypCd'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = msg.tmplTypCd + msg.necessaryCheckMessage;
                }
            } else if(column.fieldName === 'tmplFilePath'){
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = msg.tmplFilePath + msg.necessaryCheckMessage;
                }
            }
            return error;
        }
    },

    bindButtonEvent : function(){
        var self = this;

        // 조회 버튼
        $('#btn_search').click(function() {
            self.onSearch(0, true);
        });

        // 초기화 버튼
        $('#btn_init').click(function() {
            $('#displayTemplateGridForm')[0].reset();
        });

        // 행추가
        $("#btn_grid_add").click(function() {
            self.onAdd();
        });

        // 행삭제
        $("#btn_grid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        // 변경취소
        $("#btn_grid_reset").click(function() {
            self.onReset();
        });

        // 저장
        $("#btn_grid_save").click(function() {
            self.onSave();
        });
    },

    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
        this.controller.doQuery(this,null,pageIdx, pagingFunc, null, isOpenToast);
    },

    onAdd : function() {
        this.grid.commit();
        var defaultValues = { useYn : "Y" };
        this.defaultHandler.onAdd(this.grid, defaultValues);
    },

    onDelete : function() {
        var result = true;
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }

        // 템플릿코너매핑정보에 해당 템플릿과 연결된 코너 데이터 여부 확인
        for(var i=0; i<checkedItems.length; i++) {
            var tmplNo = this.grid.getValue(checkedItems[i], "tmplNo");
            var param = '&tmplNo=' + tmplNo;
            common.Ajax.sendRequestSync(
                 "POST"
                 ,_baseUrl + "display/displayTemplateMgmt.checkPrTmplConrMappInfo.do"
                 ,param
                 ,function(obj) {
                      if (!obj.succeeded) {
                         alert("템플릿 번호(" + tmplNo + ") : " + msg.checkPrTmplConrMappInfoMsg);
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
        var rowState = dataResource.getAllStateRows();
        var rowList = rowState.created.concat(rowState.updated);
        var indexList = this.grid.getItemsOfRows(rowList);
        var log = this.grid.validateCells(indexList,false); // null 전체
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
            return ;
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
        },
        // 선택된 행이 바뀌는 경우
        onCurrentRowChanged : function(grid, oldRow, newRow) {
        	grid.commit();
        	var tmplNo = grid.getValue(grid.getCurrent().itemIndex, "tmplNo");
        	if(tmplNo != null && tmplNo != '') {
                $("#CornerGrid_tmplNo").val(tmplNo);
                displayTemplateCornerGrid.eventhandler.onSearch(0, false);
        	}
        }
    }
};