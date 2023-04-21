$.namespace("menuGrid.eventhandler");
menuGrid.eventhandler = {

    // 초기화
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

        $('#btn_popup_apply').click(function(){
			self.onApply(self.grid, self.grid.getCheckedRows());
        });

        $("#btn_popup_close").click(function() {
            window.close();
        });
    },
    gridLoading : function(){
        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable: false })
        //그리드 데이터 세팅
        this.controller.callbackForCommonSuccess(this.grid, _menuList);

        //그리드 셀 체크시 색상 변경 기능 설정
        this.grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        })
    },
    argCheck : function(){
        if (_sysGbCd != '11'){
            alert(_msg.invalidAccessMsg);
            window.close();
        }
    },
    gridEvent : {
		onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            menuGrid.eventhandler.onApply(grid, [clickData.dataRow]);
        }
    }
	,onApply : function (objGrid, targetRows) {
        if (targetRows.length === 0) {
            alert(_msg.noSelectedDataMsg);
            return;
        }
		else {
	        var returnData = [];
	        targetRows.forEach(function(item){
	            returnData.push(grid.getDataSource().getJsonRow(item));
	        })
	        window.postMessage(JSON.stringify(returnData), _baseUrl);
	        window.close();		
		}		
	}
};