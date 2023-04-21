$.namespace("customerGradeHistoryGrid.eventhandler");
customerGradeHistoryGrid.eventhandler = {
    //그리드 데이터 조회
    onSearch : function(){
        this.grid.cancel();
        this.controller.doQuery(this);
    }
    // 그리드 세팅
    ,gridLoading : function () {
        var that = this;

        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable: false });

        this.onSearch();

        //그리드 셀 체크시 색상 변경 기능 설정
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active';
            }
        });
    }
    // 팝업 종료
    ,close : function () {
        window.close();
    }
    // 이벤트 바인딩
    ,bindButtonEvent : function () {
        var that = this;

        // 닫기 버튼 클릭 이벤트 처리
        $('#btn_popup_bottom_close').click(function () {
            that.close();
        });

    }
    // 초기화
    ,initialize : function () {
        this.gridLoading();
        this.bindButtonEvent();
    }
};