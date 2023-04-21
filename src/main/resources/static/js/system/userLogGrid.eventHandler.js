$.namespace("userLogGrid.eventhandler");
userLogGrid.eventhandler = {

        init : function(){
            this.gridLoading();
            this.bindButtonEvent();
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

		bindButtonEvent : function() {
			let self = this;
			
	     	$('#btn_search').click(function() {
				self.setConditionValue();	
	     		self.onSearch(0,true);
		    });
	     	
	     	$('#btn_init').click(function() {
            	$('#userLogGridForm')[0].reset();
        	});

			$("#userLogGridForm").keypress(function (e) {
	            if (e.which == 13){
	                $('#btn_search').click();
	                window.event.returnValue=false;
	            }
         	});
		},

		gridEvent : {
		 	onCurrentRowChanged : function(grid) {
				$("#userId").val(grid.getValue(grid.getCurrent().itemIndex, "userId"));
				userDetailLogGrid.eventhandler.onSearch(0);
			}
		},

		onSearch : function(pageIdx,isOpenToast) {	
			this.grid.cancel(); 
	        pageIdx = !pageIdx ? 0 : pageIdx;
	        let self = this;
	        let pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
	        this.controller.doQuery(this, "", pageIdx, pagingFunc, false, isOpenToast);
		},

		setConditionValue : function() {	
			$("#userIdConditionParam").val("");
			$("#userNmConditionParam").val("");
			
			switch($("#userConditionCd").val()) {
				case "10" :
					$("#userIdConditionParam").val($("#userIdNmInputValue").val());
				break;
				case "20" :
					$("#userNmConditionParam").val($("#userIdNmInputValue").val());
				break;
			}
		}
}