$.namespace("postNoGrid.eventhandler");
postNoGrid.eventhandler = {
		bindButtonEvent : function() {
			var self = this;
			
	     	$('#btn_grid_inner_search').click(function() {
	     	    if( !$('#deliRegnGbNm option:selected').val() || $('#deliRegnGbNm option:selected').val() == ""){
                    alert(_noSearchWord);
                    return;
	     	    }
	     		self.onSearch(0, true);
		    });

		    $('#searchWord').keypress(function (e){
               if (e.which == 13){
                   $('#btn_grid_inner_search').click();
                   window.event.returnValue=false;
               }
            });

		    $('#btn_add').click(function() {
                var grid = self.grid;
                var checkedItems = grid.getCheckedRows()
                var checkedItemsCnt = checkedItems.length;
                var data = "";
                var pin = "";

                if ( checkedItemsCnt == 0 && !grid.getSelectedRows()) {
                    alert(_noRowsMessage);
                    return;
                }

                for (var index =0; index < checkedItemsCnt;  index++ ) {
                    var zipNo = grid.getValue(checkedItems[index], "zipNo");
                    var baseAddr = grid.getValue(checkedItems[index], "baseAddr");
                    var deliRegnGbCd = $('#deliRegnGbCd option:selected').val();

                    data = {
                        deliRegnGbCd : deliRegnGbCd,
                        zipNo : zipNo,
                        baseAddr : baseAddr
                    };
                    pin = {
                        target_row : _targetRow,
                        target_column : _targetColumn
                    };
                    deliRegnZipGrid.eventhandler.postNoAddCallback(data, pin);
                }
            });
		},
		gridEvent : {
		},
		onSearch : function(pageIdx, isOpenToast) {	
			this.grid.cancel(); 
	        pageIdx = !pageIdx ? 0 : pageIdx;
	        var self = this;
	        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
	
	        this.controller.doQuery(this, "", pageIdx, pagingFunc, null, isOpenToast);
		}
}