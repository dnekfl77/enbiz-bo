$.namespace("bwGrid.eventhandler");
bwGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.bindButtonEvent();
    }
    , gridSetting : function () {
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({itemIndex: itemIndex});
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) return 'rg-trcol_active';
        });
        this.grid.setEditOptions({commitLevel: 'error'});
    }
    ,bindButtonEvent : function(){
        var self = this;

        $('#btn_search').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_init').click(function() {
            $('#bwGridForm')[0].reset();
        });

        $('#btn_grid_add').click(function() {
            self.onAdd();
        });

        $('#btn_grid_remove').click(function() {
            self.grid.cancel();
            self.onDelete();
        });

        $("#btn_grid_reset").click(function() {
            self.onReset();
        });

        $('#btn_grid_save').click(function() {
            self.onSave();
        });

        $("#bwGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_search').click();
                window.event.returnValue=false;
            }
         });

    }
	,gridEvent : {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            openToast(data.message);
            if(data.succeeded){
                eventHandler.onSearch(0,false);
           }
        }
        ,onEditRowChanged: function (grid, itemIndex, dataRow, field, oldValue, newValue) {
            var rowCnt = grid.getItemCount();
            var editRowIndex = itemIndex;

            var rowData = "";
            for (var rowIndex = 0; rowIndex < rowCnt; rowIndex++) {
                if (rowIndex == editRowIndex) continue;

                rowData = grid.getValue(rowIndex, "bwNm");
                if ( newValue === rowData ) {
                    alert(alertMsg.dupMessage);
                    grid.cancel();
                    break;
                }
            }
        }
    }
	,onAdd : function() {
        var self = this;
        var grid = self.grid;
        grid.commit(true);

        var defaultValues = { useYn : "Y" };
        self.defaultHandler.onAdd(grid, defaultValues);
    }
	,onDelete : function() {
        var self = this;
        var grid = self.grid;

        var checkedItems = grid.getCheckedItems();
        if (!checkedItems.length) {
            alert(alertMsg.rowCheckMsg);
            return;
        }

        self.defaultHandler.onDelete(grid);
    }
    ,onReset : function() {
        var grid = this.grid;
        this.defaultHandler.onCancel(grid);
    }
    ,onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};

        this.controller.doQuery(this, "", pageIdx, pagingFunc, false , isOpenToast);
    }
	,onSave : function() {
        var grid = this.grid;
        this.controller.doSave(this, grid.localId);
    }
};