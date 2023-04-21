$.namespace("partGrid.eventhandler");
partGrid.eventhandler = {
	// 초기화
	init : function () {
		this.gridLoading();
		this.bindButtonEvent();
	}

	, gridLoading : function(){
		var self = this;
	}

	, bindButtonEvent : function(){
		var self = this;

		//기획전 추가
		$("#btnPartGridAdd").click(function() {
			self.onAdd();
		});

		//행삭제
		$("#btnPartGridRemove").click(function() {
			self.grid.cancel();
			self.onDelete();
		});

		//저장
		$("#btnPartGridSave").click(function() {
			self.onSave();
		});
	}

	, onSearch : function(pageIdx){
		var self = this;
		this.grid.cancel();
		var oGrpGrid = grpGrid.eventhandler.grid;//그룹 그리드

		this.controller.doQuery(this);
	}

	, onAdd : function() {
		var self = this;
		var grid = self.grid;
		grid.commit();

		var oGrpGrid = grpGrid.eventhandler.grid;//그룹 그리드

		//그룹 그리드 편집중..
		var editRows = oGrpGrid.getDataSource().getAllStateRows();//그리드 상태값(등록: created, 수정:updated, 삭제:deleted, 추가/삭제:createAndDeleted)
		if(editRows.created.length+editRows.updated.length+editRows.deleted.length+editRows.createAndDeleted.length>0){
			alert(_msg.gridEditing);
			return;
		}

		let pin = {
			argSelectType : 'N'
			, argDispStat:'10,20,30'
		};

		var POP_DATA = {
			url: _baseUrl + 'display/displayExhibitionGroupMgmt.marketDisplayListPopup.do'
			, winName: 'mkdpListPopup'
			, title: '기획전 조회 팝업'
			, _title: '기획전 조회 팝업'
			, left: 20
			, top: 20
			, width: 1000
			, height: 700
			, scrollbars: false
			, autoresize: false
		};
		popCommon(pin, POP_DATA, this.popupMkdpListCallback);
	}

	, onDelete : function() {
		this.grid.commit();

		//푸터 메뉴 그룹 편집중..
		var oGrpGrid = grpGrid.eventhandler.grid;//그룹 그리드
		var editRows = oGrpGrid.getDataSource().getAllStateRows();//그리드 상태값(등록: created, 수정:updated, 삭제:deleted, 추가/삭제:createAndDeleted)
		if(editRows.created.length+editRows.updated.length+editRows.deleted.length+editRows.createAndDeleted.length>0){
			alert(_msg.gridEditing);
			return;
		}

		//선택된 Rwo가 없습니다.
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
			alert(_msg.noSelectedRowMsg);
			return ;
		}

		var dataRows = this.grid.getCheckedRows();
		dataProvider.setRowStates(dataRows, "deleted", true);
	}

	, onReset : function() {
		alert(_msg.gridInit);
		var self = this;
		var grid = self.grid;

		//푸터 메뉴 그룹 편집중..
		var oGrpGrid = grpGrid.eventhandler.grid;//그룹 그리드
		var editRows = oGrpGrid.getDataSource().getAllStateRows();//그리드 상태값(등록: created, 수정:updated, 삭제:deleted, 추가/삭제:createAndDeleted)
		if(editRows.created.length+editRows.updated.length+editRows.deleted.length+editRows.createAndDeleted.length>0){
			alert(_msg.gridEditing);
			return;
		}

		self.defaultHandler.onCancel(grid);
	}

	, onSave : function() {
		var grid = this.grid;
		grid.commit();

		//푸터 메뉴 그룹 편집중..
		var oGrpGrid = grpGrid.eventhandler.grid;//그룹 그리드
		var editRows = oGrpGrid.getDataSource().getAllStateRows();//그리드 상태값(등록: created, 수정:updated, 삭제:deleted, 추가/삭제:createAndDeleted)
		if(editRows.created.length+editRows.updated.length+editRows.deleted.length+editRows.createAndDeleted.length>0){
			alert(_msg.gridEditing);
			return;
		}

		//필수 항목 체크
		var log = grid.validateCells(null,false);
		if(log != null) {
			alert(log[0].message);
			grid.cancel();
			return;
		}
		var result = false;

		//선택된 Row가 없습니다.
		var result = false;
		var dataResource = grid.getDataSource();
		var gridCount = dataResource.getRowCount();
		for(var i = 0; i<gridCount; i++){
			if(grid.isCheckedItem(i)){
				result = true;
				break;
			}
		}
		if(!result){
			alert(_msg.gridNoSelected);
			return ;
		}

		//siteNo Setting
		for (var i = 0; i < grid.getItemCount(); i++) {
			grid.setValue(i, "siteNo", $("#siteNo").val());
		}

		this.controller.doSave(this, grid.localId);
	}

	, gridEvent : {
		// 삭제 완료후 콜백함수
		afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
			alert(data.message);
			if(data.succeeded){
				eventHandler.onSearch(0);
		   }
		}

		//무결성 체크
		, onValidateColumn : function(grid, column, inserting, value) {
			var error = {};
			//전시순서
			if(column.fieldName === 'dispSeq'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = col.dispSeq + _msg.requiredCheckMessage;
				}
			}

			return error;
		}
	}

	, popupMkdpListCallback : function(e) {
		var oGrpGrid = grpGrid.eventhandler.grid;//그룹 그리드
		var self = partGrid.eventhandler;
		self.grid.commit();
		var resultData = JSON.parse(e.data);
		var chlContents = resultData; // 중복을 제거한 값
		var dataResource = grid.getDataSource();
		var gridCount = dataResource.getRowCount();

		var cnt=0;
		// 수정인 경우만 체크
		for(var i = 0; i<gridCount; i++){
			for(var j = 0; j<resultData.length; j++) {
				if(resultData[j].shopCtgNo == self.grid.getValue(i , "shopCtgNo") ) { // 추가된 템플릿과 원래 그리드에 있던 템플릿 비교
					cnt++;
					chlContents.splice(j,1); // 중복 요소 삭제
				}
			}
		}

		if(cnt>0){
			alert(_msg.dupExhibition);//이미 연결된 기획전은 제외처리됩니다.
		}

		for(var j = 0; j<resultData.length; j++) {
			var row = resultData[j];
			row.dispGrpNo="01";//전시그룹유형코드(01:대표기획전, 02:랭킹존대상)
			row.dispGrpNo=$("#dispGrpNo").val();//전시그룹번호
			row.useYn= "Y";//사용여부
			row.dispSeq= "";//노출순서

			console.log("addRow:::", row);

			self.defaultHandler.onAdd(self.grid, row);
		}
	}
};