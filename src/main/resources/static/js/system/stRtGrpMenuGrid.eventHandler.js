$.namespace("stRtGrpMenuGrid.eventhandler");
stRtGrpMenuGrid.eventhandler = {

	btnSearch : true,
	search : false,

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
    },

	bindButtonEvent: function() {
		var self = this;
		var rtGrpNo = "";
		var sysGbCd = "";
		

		$('#btn_grid_use_yn_all').click(function() {
		    self.grid.commit();
			for (var i = 0; i < self.grid.getItemCount(); i++) {
				if(self.grid.getValue(i, "useYn")!="Y"){
                    self.grid.setValue(i, "useYn", "Y");
                    self.grid.checkItem(i, true);
				}
			}
		});

		$("#btn_grid_menu_reset").click(function() {
            self.onReset();
        });
		

		$('#btn_grid_menu_save').click(function() {
			self.onSave();
		});


		$("#stRtGrpMenuGridForm").keypress(function(e) {
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
				eventHandler.onSearch(0);
			}
		},

        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },

		onCurrentRowChanged: function(grid, oldRow, newRow) {
		    if(stRtGrpMenuGrid.eventhandler.btnSearch) {
                grid.commit();
                var rtGrpNo = stRtGrpMenuGrid.eventhandler.rtGrpNo;
                var sysGbCd = grid.getValue(grid.getCurrent().itemIndex, "sysGbCd");
                var rtTgtSeq = grid.getValue(grid.getCurrent().itemIndex, "rtTgtSeq");

                stRtGrpBtnGrid.eventhandler.rtGrpNo = rtGrpNo;
                stRtGrpBtnGrid.eventhandler.sysGbCd = sysGbCd;
                stRtGrpBtnGrid.eventhandler.rtTgtSeq = rtTgtSeq;

                stRtGrpBtnGrid.eventhandler.onSearch();
		    }
		},

		onCellClicked : function (grid, clickData) {
		    grid.commit();
		    if(clickData.fieldName == "useYn"){
                var useYn = grid.getValue(clickData.dataRow,clickData.fieldName);
                if(useYn == "Y"){ //상위 부분들 체크
                    var hierarchy = grid.getValue(clickData.dataRow,"hierarchy").split(".");
                    for(var i=0;i<grid.getItemCount();i++){
                        stRtGrpMenuGrid.eventhandler.btnSearch = false;
                        if(hierarchy.indexOf(grid.getValue(i,"rtTgtSeq")) > 0){//선택된 hierarchy에 rtTgtSeq가 들어있으면 사용여부 Y 만들어주기
                            if(grid.getValue(i,"useYn") != useYn){
                                grid.setValue(i,"useYn",useYn);
                                grid.checkItem(i, true);
                            }
                        }
                        if(i == grid.getItemCount()-1) {
                            stRtGrpMenuGrid.eventhandler.btnSearch = true;
                        }
                    }
                }else{ //하위 부분들 체크
                    var rtTgtSeq = grid.getValue(clickData.dataRow,"rtTgtSeq");
                    for(var i=0;i<grid.getItemCount();i++){//hierarchy에 선택된 rtTgtSeq 있으면 사용여부 N 만들어주기
                        stRtGrpMenuGrid.eventhandler.btnSearch = false;
                        if(grid.getValue(i,"hierarchy").split(".").indexOf(rtTgtSeq) > 0){
                            if(grid.getValue(i,"useYn") != useYn){
                                grid.setValue(i,"useYn",useYn);
                                grid.checkItem(i, true);
                            }
                        }
                        if(i == grid.getItemCount()-1) {
                            stRtGrpMenuGrid.eventhandler.btnSearch = true;
                        }
                    }
                }
		    }
        },
	},

	onReset : function() {
	    alert(msg.initGridMessage);
        this.defaultHandler.onCancel(this.grid);
    },

	onSearch: function(pageIdx) {
		this.grid.cancel();
		pageIdx = !pageIdx ? 0 : pageIdx;
		var self = this;
		var pagingFunc = function(pageIdx) { return self.onSearch(pageIdx); };

		$('#stRtGrpMenuGrid_rtGrpNo').val(this.rtGrpNo);
		$('#stRtGrpMenuGrid_sysGbCd').val(this.sysGbCd);

		if(this.rtGrpNo && this.sysGbCd){
			this.controller.doQuery(this, "", pageIdx, pagingFunc);
		}else{
			let grid = this.grid;
			let provider = grid.getDataSource();
			provider.clearRows();
			grid.localSavePoint = provider.savePoint(true);
		}
	},

	onSave: function() {
		var grid = this.grid;
		grid.commit();
		var result = false;

		var dataResource = grid.getDataSource();
		var gridCount = dataResource.getRowCount();
		for (var i = 0; i < gridCount; i++) {
			if (grid.isCheckedItem(i)) {
				grid.setValue(i, "rtGrpNo", this.rtGrpNo);
				result = true;
			}
		}

		var checkedItems = grid.getCheckedItems();
		for(var item in checkedItems){
		    if(grid.getValue(item,"useYn") === undefined || grid.getValue(item,"useYn") === null)
			    grid.setValue(item,"useYn", "N");
		}

		if (!result) {
			alert(msg.messageNotCheckedData);
			return;
		}

		this.controller.doSave(this, grid.localId);
	},
};