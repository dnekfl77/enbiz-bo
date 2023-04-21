$.namespace("recvGrpGrid.eventhandler");

recvGrpGrid.eventhandler = {
	init : function() {
		this.bindButtonEvent();
		this.gridSetting();
	}
    , bindButtonEvent : function(){
        var self = this;

        $('#btn_search').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_init').click(function() {
            $('#recvGrpGridForm')[0].reset();
        });

        $('#btn_grid_grp_add').click(function() {
            self.onAdd();
        });

        $('#btn_grid_grp_remove').click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        $("#btn_grid_grp_reset").click(function() {
            self.onReset();
        });

        $('#btn_grid_grp_save').click(function() {
            self.onSave();
        });

        $("#recvGrpGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_search').click();
                window.event.returnValue=false;
            }
         });

    }
    , gridSetting : function () {
        this.grid.onItemChecked = function ( grid, itemIndex, checked ) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function ( grid, item, fixed ) {
            if (item.checked) return 'rg-trcol_active';
        });
    }
	,gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0);
           }
        },
        onCurrentRowChanged : function(grid, oldRow, newRow) {
        	grid.commit();
         	var recvGrpNo = grid.getValue(grid.getCurrent().itemIndex, "recvGrpNo");
         	recvmnGrid.eventhandler.recvGrpNo = recvGrpNo;
         	recvmnGrid.eventhandler.onSearch(0);
        },
        onEditCommit : function (grid, index, oldValue, newValue) {
            // console.log(newValue);
            if(index.column == "recvGrpNo"){
                if(!isAlphanumeric(newValue)) {
                    if(oldValue===undefined) {
                        recvGrpGrid.eventhandler.grid.setValue(index.dataRow, "recvGrpNo", "");
                    }else{
                        recvGrpGrid.eventhandler.grid.setValue(index.dataRow, "recvGrpNo", oldValue);
                    }
                    grid.commit();
                    return true;
                }
            }
        }
    }
    ,onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        this.controller.doQuery(this, "", pageIdx, pagingFunc, false, isOpenToast);
    }
	,onAdd : function() {
        var self = this;
        var grid = self.grid;
        grid.commit();
        var defaultValues = { pblYn : "N", useYn : "Y" };
        self.defaultHandler.onAdd(grid, defaultValues);
    }
	,onDelete : function() {
        var self = this;
        var grid = self.grid;
        var checkedItems = grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(recvGrpValidMsg._rowChkMsg);
            return;
        }
        self.defaultHandler.onDelete(grid);
    }
    ,onReset : function() {
        var self = this;
        var grid = self.grid;
        self.defaultHandler.onCancel(grid);
    }
	,onSave : function() {
        var grid = this.grid;
        var dataResource = grid.getDataSource();
        var gridCount = dataResource.getRowCount();

        for(i = 0; i < gridCount; i++) {
            var recvGrpNm = grid.getValue(i, "recvGrpNm");
            for(var j = 0; j<gridCount; j++){
                var recvGrpNm2 = grid.getValue(j, "recvGrpNm");
                if(i===j){
                    continue;
                }
                if(recvGrpNm === recvGrpNm2){
                    alert('['+recvGrpNm+'] ' + recvGrpValidMsg._recvGrpNmDuplicateMsg);
                    return;
                }
            }
        }

        this.controller.doSave(this, grid.localId);
    }
};