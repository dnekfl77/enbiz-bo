$.namespace("tmplGrid.eventhandler");
tmplGrid.eventhandler = {
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    },
    argCheck : function(){
      if (_gridType != '1' && _gridType != 'N') {
        alert(_msg.invalidAccessMsg);
        window.close();
      }
    },
    gridLoading : function(){
        grid.setEditOptions({ editable: false }) // 그리드 수정불가
		grid.onItemChecked = function(grid, itemIndex, checked) {
          grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
          if (item.checked) {
            return 'rg-trcol_active'
          }
        })
    },
    bindButtonEvent : function(){
        var self = this;

        $('#btn_popup_list').click(function() {
            self.onSearch(0,true);
        });

        $('#btn_popup_init').click(function() {
            $('#tmplGridForm')[0].reset();
        });

        $("#tmplGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_popup_list').click();
                window.event.returnValue=false;
            }
         });

        $("#btn_popup_apply").click(function() {
			self.onApply();
        });

        $("#btn_popup_close").click(function() {
            window.close();
        });
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
        onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            tmplGrid.eventhandler.returnData( clickData.dataRow );
        }
    },
    // 적용
    onApply : function () {

        if ( _gridType === '1' ) {
            var rowIndex = this.grid.getCurrent().dataRow;
            if ( rowIndex === -1 ) {
                alert(_msg.noSelectedDataMsg);
                return;
            }
            this.returnData( rowIndex );

        } else {
            var rowIndexList = this.grid.getCheckedRows();
            if ( !rowIndexList.length ) {
                alert(_msg.noSelectedDataMsg);
                return;
            }
            this.returnData(rowIndexList);
        }
	},
    returnData : function ( data ) {

        var grid = this.grid;
        var provider = grid.getDataSource();

        var returnData = [];
        var putReturnData = function ( dataRow ) {
            var row = provider.getJsonRow( dataRow );
            returnData.push(row);
        }

        if ( $.isArray(data) ) {
            data.forEach(i => putReturnData(i));
        } else {
            putReturnData(data);
        }

        window.postMessage(JSON.stringify(returnData), _baseUrl);
        window.close();
    },
    onSearch : function(pageIdx,isOpenToast){
        this.grid.cancel(); 
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        this.controller.doQuery(this,"",pageIdx, pagingFunc,false,isOpenToast);
    }
};