$.namespace("recvGrpPopupGrid.eventhandler");
recvGrpPopupGrid.eventhandler = {

    // 초기화
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    },
	//이벤트
    bindButtonEvent : function(){
        var self = this;
		//조회
        $('#btn_popup_list').click(function() {
            self.onSearch(0);
        });
		//초기화
        $('#btn_popup_init').click(function() {
            $('#recvGrpPopupGridForm')[0].reset();
        });
		//엔터 입력
        $("#recvGrpPopupGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_popup_list').click();
                window.event.returnValue=false;
            }
        });
		//적용 버튼 클릭
        $('#btn_popup_apply').click(function(){
			self.onApply(self.grid, self.grid.getCheckedRows());
        });
		//닫기
        $("#btn_popup_close").click(function() {
            window.close();
        });
    },

    gridLoading : function(){
        // 그리드 셀 수정 불가 설정
        grid.setEditOptions({ editable: false })

        //그리드 셀 체크시 색상 변경 기능 설정
        grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        })
    },
	//gridType check
    argCheck : function(){
        if ( (_gridType != '1' && _gridType != 'N')) {
            alert(_msg.invalidAccessMsg);
            window.close();
        }
    },
    onSearch : function(pageIdx){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx);};
        var extraQueryString;
        this.controller.doQuery(this,extraQueryString,pageIdx, pagingFunc);
    },
    gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        },
		onCellDblClicked : function(grid, clickData) {
			recvGrpPopupGrid.eventhandler.onApply(grid, [clickData.dataRow]);
        }		
    },
    // 적용
    onApply : function (objGrid, targetRows) {
        if (targetRows.length === 0) {
            alert(_msg.noSelectedDataMsg);
            return;
		} else {
			//선택한 수신그룹 목록을 전달.
            var recvGrpNo = [];
            targetRows.forEach(function(item){
                var selectedData = grid.getDataSource().getJsonRow(item)
                recvGrpNo.push(selectedData.recvGrpNo);
            });
			window.postMessage(JSON.stringify(recvGrpNo), _baseUrl);
			window.close();
		}
	}
};