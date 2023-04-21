$.namespace("deliRegnZipGrid.eventhandler");
deliRegnZipGrid.eventhandler = {
        bindButtonEvent : function() {
            var self = this;

            $('#btn_search').click(function() {
                self.onSearch(0, true);
            });

            $('#btn_init').click(function() {
                $('#dlvRgnGridForm')[0].reset();
            });

            $('#btn_save').click(function() {
                self.onSave();
            });
            $('#btn_delete').click(function() {
                self.onDelete();
            });
            $("#btn_cancel").click(function() {
                self.onReset();
             });
        },
        gridEvent : {
            afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
                alert(data.message);

                if(data.succeeded){
                    eventHandler.onSearch(0, false);
                    postNoGrid.eventhandler.onSearch(0, false);
               }
            }
        },
		onSearch : function(pageIdx, isOpenToast){
			var self = this;
			self.grid.cancel();
			pageIdx = !pageIdx ? 0 : pageIdx;
			var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
			self.controller.doQuery(self, "", pageIdx, pagingFunc, null, isOpenToast);

		},
		onSave : function() {
            var grid = this.grid;
            grid.commit();
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
                alert(_messageNotCheckedData);
                return ;
            }
            this.controller.doSave(this, grid.localId);
        },
        onDelete : function() {
            this.grid.commit();
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
                alert(_noRowsMessage);
                return ;
            }

            var dataRows = this.grid.getCheckedRows();
            dataProvider.setRowStates(dataRows, "deleted", true);

            this.controller.doSave(this, this.grid.localId);
        },
        onReset : function() {
            var self = this;
            var grid = self.grid;

            self.defaultHandler.onCancel(grid);
        },
		postNoAddCallback : function(data,pin){
//		    console.log(data, pin);
		    var self = this;
		    var regnAddGrid = self.grid;
		    var pin = "";
		    pin = {deliRegnGbCd : data.deliRegnGbCd, zipNo: data.zipNo, baseAddr:data.baseAddr, useYn : "Y"};
		    self.defaultHandler.onAdd(regnAddGrid, pin);
		}
}