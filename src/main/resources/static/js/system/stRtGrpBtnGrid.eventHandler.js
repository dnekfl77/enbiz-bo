$.namespace("stRtGrpBtnGrid.eventhandler");
stRtGrpBtnGrid.eventhandler = {

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
		var rtTgtSeq = "";
		var grid = self.grid;

		$('#btn_grid_btn_use_yn_all').click(function() {
		    grid.commit();
			for (var i = 0; i < grid.getItemCount(); i++) {
				if(grid.getValue(i, "useYn")!="Y"){
                    grid.setValue(i, "useYn", "Y");
                    grid.checkItem(i, true);
            	}
			}
		});

		$("#btn_grid_btn_reset").click(function() {
            self.onReset();
        });
		

		$('#btn_grid_btn_save').click(function() {
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
				eventHandler.onSearch();
			}
		}
	},

	onReset : function() {
	    alert(msg.initGridMessage);
        this.defaultHandler.onCancel(this.grid);
    },

	onSearch: function() {
		this.grid.cancel();
		$('#stRtGrpBtnGrid_rtGrpNo').val(this.rtGrpNo);
		$('#stRtGrpBtnGrid_sysGbCd').val(this.sysGbCd);
		$('#stRtGrpBtnGrid_rtTgtSeq').val(this.rtTgtSeq);

		if(this.rtGrpNo && this.sysGbCd && this.rtTgtSeq){
			this.controller.doQuery(this);
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