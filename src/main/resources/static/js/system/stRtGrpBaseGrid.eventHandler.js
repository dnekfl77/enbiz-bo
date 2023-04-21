$.namespace("stRtGrpMenuGrid.eventhandler");
stRtGrpBaseGrid.eventhandler = {

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
            if (column.fieldName === "sysGbCd") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "시스템 구분은 " + msg.necessaryCheckMessage;
                }
            } else if (column.fieldName === "rtGrpNm") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "권한명칭은 " + msg.necessaryCheckMessage;
                }
            } else if (column.fieldName === "aplyStrDt") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "적용시작일자는 " + msg.necessaryCheckMessage;
                }
            } else if (column.fieldName === "aplyEndDt") {
                if (value === undefined || value === '') {
                    error.level = "error";
                    error.message = "적용종료일자는 " + msg.necessaryCheckMessage;
                }
            }
            return error;
        }
    },

	bindButtonEvent: function() {
		var self = this;

		$('#btn_search').click(function() {
			self.onSearch(true);
		});

		$('#btn_init').click(function() {
			$('#stRtGrpBaseGridForm')[0].reset();
		});

		$('#btn_grid_add').click(function() {
			self.onAdd();
		});

		$("#btn_grid_reset").click(function() {
			self.onReset();
		});

		$('#btn_grid_save').click(function() {
			self.onSave();
		});

		$("#stRtGrpBaseGridForm").keypress(function(e) {
			if (e.which == 13) {
				$('#btn_search').click();
				window.event.returnValue = false;
			}
		});
	},

	gridEvent: {
		afterSaveSuccess: function(eventHandler, mainGridName, gridNames, data) {
			openToast(data.message);
			if (data.succeeded) {
				eventHandler.onSearch();
			}
		},
		onCurrentRowChanged: function(grid, oldRow, newRow) {
			var itemIndex = grid.getCurrent().dataRow;
			var rowState = itemIndex > -1 ? grid.getDataSource().getRowState(itemIndex) : "";
			if(rowState === "created"){
				return;
			}
			grid.commit();
			var rtGrpNo = grid.getValue(grid.getCurrent().itemIndex, "rtGrpNo");
			var sysGbCd = grid.getValue(grid.getCurrent().itemIndex, "sysGbCd");
			stRtGrpMenuGrid.eventhandler.rtGrpNo = rtGrpNo;
			stRtGrpMenuGrid.eventhandler.sysGbCd = sysGbCd;

			stRtGrpMenuGrid.eventhandler.onSearch(0);
		}
	},

	onAdd: function() {
		var self = this;
		var grid = self.grid;

		grid.commit();
		var defaultValues = { useYn: "Y" };
		self.defaultHandler.onAdd(grid, defaultValues);
	},

	onReset : function() {
	    alert(msg.initGridMessage);
        this.defaultHandler.onCancel(this.grid);
	},

	onSearch: function(isOpenToast) {
		this.grid.cancel();
		this.controller.doQuery(this,null,null,null,false,isOpenToast);
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
				break;
			}
		}
		var checkedItems = grid.getCheckedItems();
		for(var item in checkedItems){
			var aplyStrDt = new Date(grid.getValue(item,"aplyStrDt"));
			var aplyEndDt = new Date(grid.getValue(item,"aplyEndDt"));

			if(aplyStrDt > aplyEndDt){
				alert(msg.aplyStrEndDtCheck);
				grid.setCurrent({itemIndex: item});
				return;
			}
		}

		if (!result) {
			alert(msg.messageNotCheckedData);
			return;
		}
		this.controller.doSave(this, grid.localId);
	},
};