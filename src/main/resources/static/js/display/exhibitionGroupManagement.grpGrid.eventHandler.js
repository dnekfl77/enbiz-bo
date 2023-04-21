$.namespace("grpGrid.eventhandler");
grpGrid.eventhandler = {
	// 초기화
	init : function () {
		this.calendarInit();
		this.gridLoading();
		this.bindButtonEvent();
	}

	, calendarInit : function(){
		var initFromAndToCalDate = recentlyCalenderData(7);
		$('#startDate').val(initFromAndToCalDate[0]);
		$('#endDate').val(initFromAndToCalDate[1]);
	}

	, gridLoading : function(){
		var self = this;
		self.grid.setEditOptions({ editable: true }) // 그리드 수정가능
		self.onSearch(0);
	}

	, bindButtonEvent : function(){
		var self = this;
		//초기화
		$('#btnInit').click(function() {
			$('#searchForm')[0].reset();
		});

		//조회
		$('#btnSearch').click(function() {
			self.onSearch(0);
		});

		//행추가
		$("#btnGrpGridAdd").click(function() {
			self.onAdd();
		});

		//행삭제
		$("#btnGrpGridRemove").click(function() {
			self.grid.cancel();
			self.onDelete();
		});

		//변경취소
		$("#btnGrpGridCancel").click(function() {
			self.onReset();
		});

		//저장
		$("#btnGrpGridSave").click(function() {
			self.onSave();
		});

		//달력버튼
     	$('#calendarButton').click(function() {
			showCalendar({
				type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd1:$('#startDate').val(),
				yyyymmdd2:$('#endDate').val(),
				max_term:0,
				fn:function(pin) {
					$('#startDate').val(pin.yyyymmdd1);
					$('#endDate').val(pin.yyyymmdd2);
				}
			});
		});

		//달력 날짜 변경
		$('#calendar-term').change(function(){
			$('#calendar-term option:selected').each(function(){
				var fromAndToCalDate = recentlyCalenderData($(this).val());
				$('#startDate').val(fromAndToCalDate[0]);
				$('#endDate').val(fromAndToCalDate[1]);
			})
		});
	}

	, onSearch : function(pageIdx){
		var self = this;
		this.grid.cancel();
		this.controller.doQuery(this);
	}

	, onAdd : function() {
		var self = this;
		var grid = self.grid;
		grid.commit();
		var defaultValues = { siteNo: $("#srchSiteNo").val(), useYn : "Y" };

		self.defaultHandler.onAdd(grid, defaultValues);
	}

	, onDelete : function() {
		 var self = this;
		 var grid = self.grid;
		grid.commit();
		var result = true;

		var checkedItems = this.grid.getCheckedItems();
		if (checkedItems.length == 0) {
			alert(_msg.noSelectedRowMsg);
			return;
		}

        // 카테고리 삭제 시 하위 카테고리가 없는 경우 삭제 가능
        for(var i=0; i<checkedItems.length; i++) {
            var dispGrpTypCd = grid.getValue(checkedItems[i], "dispGrpTypCd");//전시그룹유형코드(DP011)
            var dispGrpNo = grid.getValue(checkedItems[i], "dispGrpNo");//전시그룹번호
			var dispShopGbCd = '02'//전시매장구분코드(DP012)(02:기획전)

            var param = '&dispGrpTypCd=' + dispGrpTypCd;
            param += '&dispGrpNo=' + dispGrpNo;
            param += '&dispShopGbCd=' + dispShopGbCd;
            common.Ajax.sendRequestSync(
                 "POST"
                 , _baseUrl + "display/displayExhibitionGroupMgmt.getPrDispGrpMappInfoList.do"
                 , param
                 , function(obj) {
                      if (obj.totalCount != 0) {
                         alert( grpCol.dispGrpNo+ "(" + dispGrpNo + ") : " + _msg.checkSubDispMapp);//그룹 번호(xxx) : 하위 기획전 목록이 없는 경우만 삭제가능합니다.
                         result = false;
                      }
                 }
            );

            if(!result) {
               return false;
            }
        }

		self.defaultHandler.onDelete(grid);
	}

	, onReset : function() {
		alert(_msg.gridInit);
		var self = this;
		var grid = self.grid;
		partGrid.eventhandler.grid.commit();

		self.defaultHandler.onCancel(grid);
	}

	, onSave : function() {
		var grid = this.grid;
		grid.commit();

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

		this.controller.doSave(this, grid.localId);
	}

	//이벤트 핸들러
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
        	grid.editOptions.commitLevel = "error";
			var error = {};
			//그룹명
			if (column.fieldName === "dispGrpNm") {
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = grpCol.dispGrpNm + _msg.requiredCheckMessage;
				}
			}
			//전시순서
			else if(column.fieldName === 'dispSeq'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = grpCol.dispSeq + _msg.requiredCheckMessage;
				}
			}
			//적용시작일자
			else if(column.fieldName === 'aplyStrDtm'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = grpCol.aplyStrDtm + _msg.requiredCheckMessage;
				}
			}
			//적용종료일자
			else if(column.fieldName === 'aplyEndDtm'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = grpCol.aplyEndDtm + _msg.requiredCheckMessage;
				}
			}

			return error;
		}

		//Row 선택
		, onCurrentRowChanged : function (grid, oldRow, newRow) {
			$("#dispGrpNo").val(grid.getValue(newRow, "dispGrpNo"));//그룹번호

			//기획전 목록 갱신
			partGrid.eventhandler.grid.getDataSource().clearRows();//하위 그리드 초기화
			partGrid.eventhandler.grid.commit();
			partGrid.eventhandler.onSearch(0);//하위 그리드 리로딩
		}
	}
};