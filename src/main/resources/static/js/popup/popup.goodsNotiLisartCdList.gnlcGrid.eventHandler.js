$.namespace("gnlcGrid.eventhandler");
gnlcGrid.eventhandler = {
    // 초기화
    init : function () {
        this.gridLoading();
        this.bindButtonEvent();
    }
    // 그리드 세팅
    ,gridLoading : function () {

        var that = this;

        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable: false });

        //그리드 데이터 세팅
        this.controller.callbackForCommonSuccess(this.grid, _gnlcList);

        //그리드 셀 체크시 색상 변경 기능 설정
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active';
            }
        });
        //그리드 행 더블클릭 이벤트 발생시
        this.grid.onCellDblClicked = function( grid, clickData ) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            that.apply(clickData.dataRow)
        }
    }
    // 이벤트 바인딩
    ,bindButtonEvent : function () {

        var that = this;

        // 닫기 버튼 클릭 이벤트 처리
        $('#btn_popup_bottom_close').click(function () {
            that.close();
        });

    }
    // 팝업 종료
    ,close : function () {
        window.close();
    }
    // 적용
    ,apply : function (checkedRowNum) {
        if (checkedRowNum === '') return;
        var returnValue = this.grid.getDataSource().getJsonRow(checkedRowNum);
        window.postMessage(JSON.stringify(returnValue), _baseUrl);
        this.close();
    }
};