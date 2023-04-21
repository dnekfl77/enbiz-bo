$.namespace('brandGrid.eventhandler');
brandGrid.eventhandler = {
    // 초기화
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    }
    // 팝업 호출시 넘어오는 Argument 값 확인
    ,argCheck : function () {
        if (_gridType != '1' && _gridType != 'N') {
            alert(_msg.invalidAccessMsg);
            this.close();
        }
    }
    // 그리드 추가 옵션 설정
    ,gridLoading : function () {

        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable: false });

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
    // 이벤트 바인딩
    ,bindButtonEvent : function () {

        var that = this;

        // 초기화 버튼 클릭 이벤트 처리
        $('#btn_popup_init').click(function () {
            that.reset( '01' );
        });

        // 조회 버튼 클릭 이벤트 처리
        $('#btn_popup_list').click(function () {
            that.search(0, true);
        });

        // 닫기 버튼 클릭 이벤트 처리
        $('#btn_popup_close').click(function () {
            that.close();
        });

        // 적용 버튼 클릭 이벤트 처리
        $('#btn_popup_apply').click(function () {
            that.onApply();
        });

        // Enter 이벤트 처리
        $('#brandGridForm').keypress(function (e) {
            if (e.which == 13) {
                $('#btn_popup_list').click();
                window.event.returnValue = false;
            }
        });

        // 검색 조건 변경시
        $('#searchOption').change(function (e) {
            that.reset($(this).val());
        });

        // 검색어 입력값 체크
        $("#searchWord").on("propertychange change keyup paste input", function() {
            if( $('#searchOption').val() === '02') return;
            var currentVal = $(this).val();
            $(this).val(onlyInputNumber(currentVal));
        });

    }
    // 초기화
    ,reset : function ( searchOption ) {

        // 브랜드번호 searchOption ( 01 ) , maxlength ( 15 )
        // 브랜드명 searchOption ( 02 ) , maxlength ( 400 )
        var maxlength = ( searchOption === '01' ) ? 15 : 400;
        $('#searchOption').val(searchOption);
        $('#searchWord').attr( 'maxlength', maxlength ).val('');

    }
    // 조회
    ,search : function (pageNo, isOpenToast) {
        this.grid.cancel();
        var that = this;

        var searchOption = $('#searchOption').val();
        var searchWord = $('#searchWord').val();
        var brandNo = ( searchOption === '01') ? searchWord : '';
        var brandNm = ( searchOption === '02') ? searchWord : '';

        var extraQueryString = '&brandNo=' + brandNo + '&brandNm=' + brandNm;
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.search(pageNo, true); };
        this.controller.doQuery(that, extraQueryString, pageNo, pageFunc, null, isOpenToast);
    }
    // 닫기
    ,close : function () {
        window.close();
    }
    // 적용
    ,onApply : function () {

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
    }
    ,returnData : function ( data ) {

        var grid = this.grid;
        var provider = grid.getDataSource();

        var returnData = [];
        var putReturnData = function ( dataRow ) {
            var row = provider.getJsonRow( dataRow );
            returnData.push({
                brandNo : row.brandNo
                , brandNm : row.brandNm
                , useYn : (row.useYn === '사용')? 'Y' : 'N'
            });
        }

        if ( $.isArray(data) ) {
            data.forEach(i => putReturnData(i));
        } else {
            putReturnData(data);
        }

        window.postMessage(JSON.stringify(returnData), _baseUrl);
        window.close();
    }
    // Grid 이벤트 처리
    ,gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
        ,onCellDblClicked : function(grid, clickData) {
            if ( clickData.cellType === 'gridEmpty' ) return;
            brandGrid.eventhandler.returnData(clickData.dataRow);
        }
    }
};
