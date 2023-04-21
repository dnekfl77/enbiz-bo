$.namespace("favoritesGrid.eventhandler");
favoritesGrid.eventhandler = {

    init : function(){
        this.gridLoading();
        this.bindButtonEvent();
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
            if (column.fieldName === "sortSeq") {
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

	bindButtonEvent : function() {
		var self = this;

		$('#btn_list').click(function() {
        	self.onSearch(0,true);
        });

        $('#btn_init').click(function() {
        	$('#favoritesGridForm')[0].reset();
        });

		$("#favoritesGridForm").keypress(function(e) {
			if (e.which == 13) {
				$('#btn_search').click();
				window.event.returnValue = false;
			}
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

        com.x2commerce.common.Util.setupEnterSearch('favoritesGridForm','btn_list');

	},

	gridEvent: {
		afterSaveSuccess: function(eventHandler, mainGridName, gridNames, data) {
			openToast(data.message);
			if (data.succeeded) {
			    var url = _baseUrl + 'fvtMenu.do';
                common.Ajax.sendRequestSync("GET", url, '', function(data) {
                    try {
                        top.$("#fvtMenu").replaceWith(data);
                        top.$('.tabs-area').children('.tabs').children('li:last').click();
                        com.x2commerce.common.menuUtil.iframeActionOfTop(); //iframe 제어
                    } catch (e) {
                        console.log(e);
                    }
                }, true, false);
				eventHandler.onSearch(0,false);
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

	onSearch: function(pageIdx, isOpenToast) {
		this.grid.cancel();
		pageIdx = !pageIdx ? 0 : pageIdx;
		var self = this;
		var pagingFunc = function(pageIdx) { return self.onSearch(pageIdx); };
		this.controller.doQuery(this, null, pageIdx, pagingFunc, false, isOpenToast);
	},

	 onDelete : function() {
         this.grid.cancel();
         var checkedItems = this.grid.getCheckedItems();
         var createdOk = true;
         if (checkedItems.length == 0) {
             alert(msg.deleteRowCheck);
             return;
         }
         this.defaultHandler.onDelete(this.grid);
     },

	onReset : function() {
        alert(msg.gridInit);
        this.defaultHandler.onCancel(this.grid);
    },

	onSave: function() {
		var grid = this.grid;
		grid.commit();
		var result = false;

		var dataResource = grid.getDataSource();
		var gridCount = dataResource.getRowCount();
		for (var i = 0; i < gridCount; i++) {
			if (grid.isCheckedItem(i)) {
				result = true;
			}
		}
		if (!result) {
			alert(msg.noneSelected);
			return;
		}

        // 입력, 수정시 빈값 확인
        var rowState = dataResource.getAllStateRows();
        var rowInsert = rowState.created;
        var rowList = rowState.created.concat(rowState.updated);
        var indexList = this.grid.getItemsOfRows(rowList);
        var log = this.grid.validateCells(indexList,false); // null 전체
        if(log != null) {
            alert(log[0].message);
            return;
        }

		this.controller.doSave(this, grid.localId);
	}
};