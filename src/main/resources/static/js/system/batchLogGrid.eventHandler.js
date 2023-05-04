$.namespace("batchLogGrid.eventhandler");
batchLogGrid.eventhandler = {
	// 초기화
	init : function () {
		this.gridLoading();
		this.bindButtonEvent();
	},
	gridLoading : function () {
		var self = this;
		
		// 그리드 셀 수정 불가 설정
		this.grid.setEditOptions({ editable: false });

		// 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
			grid.setCurrent({ itemIndex: itemIndex })
		};
		this.grid.setRowStyleCallback = function(grid, item, fixed) {
			if (item.checked) {
				return 'rg-trcol_active'
			}
		};
	},
	
	bindButtonEvent : function () {
		var self = this;
		
		$('#btn_search').on('click', function() {
			self.onSearch(0,true);
		});
		
		$('#btn_init').on('click', function() {
			//$('#stdDt').val('');
			//$('input[name="batchPgmNm"]').val('');
			$('#batchLogSearchForm')[0].reset();
		});
		
		$("#batchLogSearchForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_search').click();
                window.event.returnValue=false;
            }
        });
		//달력
        $('#calendarButton').click(function() {
			showCalendar({
				type:'B', // A:시작,종료일선택, B:해당 날짜 1개 선택 C: 날짜+시간 선택, D 년월 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#createTime').val(),
                //max_term:0,
                fn:function(pin) {
                    $('#createTime').val(pin.yyyymmdd);
                }    
			});	
		});
	},
	onSearch : function (pageNo, isOpenToast) {
		var self = this;
		self.grid.cancel();
		
		pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return self.onSearch(pageNo); };

		self.controller.doQuery(self, '', pageNo, pageFunc, false, isOpenToast);
	}
	
	
}