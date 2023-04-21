$.namespace("stDeptCdListGrid.eventhandler");
stDeptCdListGrid.eventhandler = {

	// 초기화
	init : function () {
		this.gridSetting();
		this.bindButtonEvent();
	}

	, setting : function (deptCd, tId) {
		this.deptCd = deptCd;
		this.tId = tId;
		this.gridLoading(0);
	}

	, gridLoading : function(pageNo){
		this.grid.cancel();
		var that = this;
		var extraQueryString = '&deptCd=' + this.deptCd;
		var pageNo = 0;
		var pageFunc = function (pageNo) { return that.gridLoading(pageNo); };

		this.controller.doQuery(that, extraQueryString, pageNo, pageFunc);
	}
	, gridSetting : function () {
        //그리드 셀 체크시 색상 변경 기능 추가
		this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
			grid.setCurrent({ itemIndex: itemIndex });
		};
		this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
			if (item.checked) return 'rg-trcol_active';
		});
		this.grid.setEditOptions({ commitLevel : 'error' });
    }
	, bindButtonEvent : function(){
		var that = this;

		// 행추가 버튼 클릭
		$('#btnAdd').click(function(){
			that.onAdd();
		});

		// 행삭제 버튼 클릭
		$('#btnRemove').click(function(){
			that.grid.cancel();
			that.onDelete();
		});

		// 변경취소  버튼 클릭
		$('#btnReset').click(function(){
			that.onReset();
		});

		// 저장 버튼 클릭
		$('#btnSave').click(function(){
			that.onSave();
		});
	}

	// 행추가
	, onAdd : function () {
		var self = this;
		var grid = self.grid;
		grid.commit();
		var defaultValues = { useYn : "Y", uprDeptCd : $("#uprDeptCd").val() };
		self.defaultHandler.onAdd(grid, defaultValues);
	}

	//행삭제
	, onDelete : function() {
		var self = this;
		var grid = self.grid;
		grid.commit();
		var result = false;

		var checkedItems = this.grid.getCheckedItems();
		if (checkedItems.length == 0) {
			alert(alertMsg.noCheckedRowErrMsg);
			return;
		}

		self.defaultHandler.onDelete(grid);
	}

	//변경취소
	, onReset : function() {
		alert(alertMsg.gridInit);
		var self = this;
		var grid = self.grid;

		self.defaultHandler.onCancel(grid);
	}
	, popupDisplayCategoryCallback : function(e) {
		var self = standardDisplayCategoryConnectGrid.eventhandler;
		self.grid.commit();

		var resultData = JSON.parse(e.data);

		var chlContents = resultData; // 중복을 제거한 값
		var dataResource = grid.getDataSource();
		var gridCount = dataResource.getRowCount();

		// 수정인 경우만 체크
		for(var j = 0; j<resultData.length; j++) {
			chlContents[j].dispCtgNm= chlContents[j].lrgCtgNm + ' > ' + chlContents[j].midCtgNm + ' > ' + chlContents[j].smlCtgNm//대카>중카>소카
			chlContents[j].useYn= "Y";//사용여부
			chlContents[j].repCtgYn= "N";//대표카테고리
			chlContents[j].deptCd = self.deptCd;//전시카테고리번호

			for(var i = 0; i<gridCount; i++){
				if(chlContents[j].dispCtgNo == self.grid.getValue(i , "dispCtgNo") ) { //추가된 템플릿과 원래 그리드에 있던 템플릿 비교
					chlContents.splice(j,1); // 중복 요소 삭제
				}
			}
		}
		self.grid.getDataSource().addRows(chlContents);
	}

	//저장
	, onSave : function(){
		var grid = this.grid;
		grid.commit();
		this.controller.doSave(this, grid.localId);
	}

	//그리드 이벤트
	, gridEvent : {
		afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
			openToast(data.message);
			if(data.succeeded){
				stDeptCdListTree.eventHandler.treeLoading(false,eventHandler.tId);
			}
		}
		,onValidateColumn : function ( grid, column, inserting, value, itemIndex, dataRow ) {
			var error = {};
			var rowData = grid.getDataSource().getJsonRow(dataRow);
			if ( column.fieldName === "deptNm" ) {
				if ( value === undefined || value === '' ) {
					error.level = "error";
					error.message = stDeptCdCol.deptNm + alertMsg.saveRequiredMsg;
					return error;
				}
			} else if ( column.fieldName === "sortSeq" ) {
				if ( value === undefined || value === '' ) {
					error.level = "error";
					error.message = stDeptCdCol.sortSeq + alertMsg.saveRequiredMsg;
					return error;
				}
			} else if ( column.fieldName === "jobGrpCd" ) {
				// 1depth인 경우에는 업무그룹 입력 필수
				if ( rowData.uprDeptCd === '10000' && (value === undefined || value === '')) {
					error.level = "error";
					error.message = stDeptCdCol.jobGrpCd + alertMsg.saveRequiredMsg;
					return error;
				}
			}
		}
		, onCellEdited : function (grid, itemIndex, dataRow, field) {
			/*
			grid.commit();
			var fieldName = grid.getDataSource().getOrgFieldName(field);
			var editValue = grid.getValue(dataRow , "repCtgYn");//변경값

			//대표 카테고리 Y로 변경시 다른Row는 N으로 변경
			if("repCtgYn"==fieldName && "Y"==editValue){
				var rowCount = grid.getItemCount(); // 원래 그리드에 있던 행의 수
				//전체 대료카테고리 N으로 변경
				for(var i = 0; i<rowCount; i++){
					grid.setValue(i , "repCtgYn", "N");
				}

				//변경 Row "Y" 로 변경
				grid.setValue(dataRow , "repCtgYn", "Y");
			}
			*/
		}
	}
}