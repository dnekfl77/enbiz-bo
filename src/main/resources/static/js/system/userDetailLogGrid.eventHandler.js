$.namespace("userDetailLogGrid.eventhandler");
userDetailLogGrid.eventhandler = {

        init : function(){
            this.gridLoading();
        },

        gridLoading : function(){
            // 그리드 셀 수정 불가 설정
            grid.setEditOptions({ editable: false });

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

		onSearch : function(pageIdx){
			let self = this;
			pageIdx = !pageIdx ? 0 : pageIdx;
			let pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
			self.controller.doQuery(self, "", pageIdx, pagingFunc);
		}
}