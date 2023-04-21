$.namespace("siteListGrid.eventhandler");
siteListGrid.eventhandler = {

    init : function(){
        this.gridLoading();
        this.bindButtonEvent();
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

		//무결성 체크
        this.grid.editOptions.commitLevel = "error";
		this.grid.onValidateColumn = function(grid, column, inserting, value, itemIndex, dataRow) {
			var error = {};
			var data = grid.getValues(dataRow);
		    var rowState = grid.getDataSource().getAllStateRows();
			if (column.fieldName === "siteNm") {
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.siteNm + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'siteDom'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.siteDom + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'trdStrtDt'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.trdStrtDt + msg.requiredCheckMessage;
				}
			} else if(column.fieldName === 'trdEndDt'){
				if (value === undefined || value === null || value === '') {
					error.level = "error";
					error.message = msg.trdEndDt + msg.requiredCheckMessage;
				}
			} else { // 데이터 값 범위 확인
			    var today = new Date(); // 현재날짜
                today = today.getFullYear() + "" + addzero(today.getMonth() + 1) + "" + addzero(today.getDate());
                if((data.trdStrtDt !== null && data.trdStrtDt !== '') && (data.trdEndDt !== null && data.trdEndDt !== '')) {
                    var startDate = (data.trdStrtDt).replace( /(\s*)/g, '').replace(/-/g, '').replace(/:/g, ''); // 공백, -, : 제거;
                    var endDate = (data.trdEndDt).replace( /(\s*)/g, '').replace(/-/g, '').replace(/:/g, ''); // 공백, -, : 제거;
                    if(rowState.created.includes(dataRow) && today > startDate) {
                        error.level = "error";
                        error.message = msg.trdStrtDtMsgCheckMessage;
                    }
                    if(startDate > endDate){
                        error.level = "error";
                        error.message = msg.trdEndDtMsgCheckMessage;
                    }
                }
			}
			return error;
		}
    },

	bindButtonEvent : function(){
		var self = this;

		$('#btn_search').click(function() {
			self.onSearch(0, true);
		});

		$('#btn_init').click(function() {
			$('#siteListGridForm')[0].reset();
		});

		//행추가
		$("#btn_grid_insert").click(function() {
			self.onAdd();
		});

		//변경취소
		$("#btn_grid_reset").click(function() {
			self.onReset();
		});

		//저장
		$("#btn_grid_save").click(function() {
			self.onSave();
		});
	},

	onAdd : function() {
		var self = this;
		var grid = self.grid;
		grid.commit();

		var today = new Date(); // 현재날짜
		today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());
		var defaultValues = { trdStrtDt : today , trdEndDt : "2999-12-31" };

		self.defaultHandler.onAdd(grid, defaultValues);
	},

	onReset : function() {
        alert(msg.gridInit);
		this.defaultHandler.onCancel(this.grid);
	},

	onSearch : function(pageIdx, isOpenToast){
		this.grid.cancel();
		pageIdx = !pageIdx ? 0 : pageIdx;
		var self = this;
		var pagingFunc = function(pageIdx){return this.onSearch(pageIdx, false);};
		this.controller.doQuery(this,"",pageIdx, pagingFunc, null, isOpenToast);
	},

	onSave : function() {
		var grid = this.grid;
        grid.commit(true);

        // 데이터 확인
        var dataResource = grid.getDataSource();
        var rowState = dataResource.getAllStateRows();
        var rowList = rowState.created.concat(rowState.updated);
        var indexList = grid.getItemsOfRows(rowList);
        var log = grid.validateCells(indexList,false);
        if(log != null) {
            alert(log[0].message);
            return;
        }

		//체크 Row 확인
		var result = false;
		var gridCount = dataResource.getRowCount();
		for(var i = 0; i<gridCount; i++){
			if(grid.isCheckedItem(i)){
				result = true;
				break;
			}
		}
		if(!result){
			alert(msg.messageNotCheckedData);
			return ;
		}

		//그리드 내용 저장
		this.controller.doSave(this, grid.localId);
	},

	gridEvent : {
		//저장 후처리
		afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
			openToast(data.message);
			if(data.succeeded){
				eventHandler.onSearch(0, false);
			}
		}
	}
};