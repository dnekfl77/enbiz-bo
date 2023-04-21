$.namespace("footerMenuListGrid.eventhandler");
footerMenuListGrid.eventhandler = {
	// 초기화
	init : function () {
		this.gridLoading();
		this.bindButtonEvent();
	},

	gridLoading : function(){
        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        });
	},

	bindButtonEvent : function(){
		var self = this;
		//행추가
		$("#btn_menuGrid_insert").click(function() {
			self.onAdd();
		});

		//행삭제
		$("#btn_menuGrid_delete").click(function() {
			self.grid.cancel();
			self.onDelete();
		});

		//변경취소
		$("#btn_menuGrid_reset").click(function() {
			self.onReset();
		});

		//저장
		$("#btn_menuGrid_save").click(function() {
			self.onSave();
		});
	},

	editingGroupGrid : function() {
	    var result = true;
		var oGrpGrid = footerGroupListGrid.eventhandler.grid;//그룹 그리드

		//푸터 메뉴 그룹 편집중..
		var editRows = oGrpGrid.getDataSource().getAllStateRows();//그리드 상태값(등록: created, 수정:updated, 삭제:deleted, 추가/삭제:createAndDeleted)
		if(editRows.created.length+editRows.updated.length+editRows.deleted.length+editRows.createAndDeleted.length>0){
			alert(msg.editorSaveCheckMsg);
			result = false;
		}

		return result;
	},

	onSearch : function(pageIdx, isOpenToast){
		this.grid.cancel();
        this.controller.doQuery(this);
	},

	onAdd : function() {
		this.grid.commit();
		if(!this.editingGroupGrid()) { return; }

		var oGrpGrid = footerGroupListGrid.eventhandler.grid; //그룹 그리드
        var rowIdx = oGrpGrid.getCurrent().dataRow;

		var uprFotrNo = oGrpGrid.getValue(rowIdx, "fortNo");
		var sysGbCd = oGrpGrid.getValue(rowIdx, "sysGbCd");
		var fotrContGbCd = oGrpGrid.getValue(rowIdx, "fotrContGbCd");
		var defaultValues = { siteNo: $("#siteNo").val(), uprFotrNo: uprFotrNo, sysGbCd: sysGbCd, fotrContGbCd: fotrContGbCd, useYn: "Y" };
		this.defaultHandler.onAdd(this.grid, defaultValues);
	},

	onDelete : function() {
		this.grid.commit();
		if(!this.editingGroupGrid()) { return; }
		var checkedItems = this.grid.getCheckedItems();
		if (checkedItems.length == 0) {
			alert(msg.gridNoSelected);
			return;
		}
		this.defaultHandler.onDelete(this.grid);
	},

	onReset : function() {
		alert(msg.gridInit);
		if(!this.editingGroupGrid()) { return; }
		this.defaultHandler.onCancel(this.grid);
	},

	onSave : function() {
		this.grid.commit();
		if(!this.editingGroupGrid()) { return; }

		//필수 항목 체크
		var log = this.grid.validateCells(null,false);
		if(log != null) {
			alert(log[0].message);
			this.grid.cancel();
			return;
		}

		var result = false;
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
	},

	gridEvent : {
		// 저장 완료후 콜백함수
		afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
			openToast(data.message);
			if(data.succeeded){
				eventHandler.onSearch(0,false);
		   }
		}

		//무결성 체크
		, onValidateColumn : function(grid, column, inserting, value, itemIndex, dataRow) {
        	grid.editOptions.commitLevel = "error";
			var error = {};
			//메뉴명
			if (column.fieldName === "menuNm") {
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.menuNm + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'linkUrl'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.linkUrl + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'movFrmeCd'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.movFrmeCd + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'dispSeq'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.dispSeq + msg.requiredCheckMessage;
				}
			}

			return error;
		}
	}
};