$.namespace("mdGrid.eventhandler");
mdGrid.eventhandler = {
    // 초기화
    init : function () {
        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    }
    // 팝업 호출시 넘어오는 Argument 필수값 확인
    ,argCheck : function () {
        if ( (_gridType != '1' && _gridType != 'N')
            || (_argWorkStatCd != '01' && _argWorkStatCd != '02')
            || (_argUseYn != 'Y' && _argUseYn != 'N')
        ) {
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
            that.reset();
        });

        // 조회 버튼 클릭 이벤트 처리
        $('#btn_popup_list').click(function () {
            that.search(0,true);
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
        $("#mdGridForm").keypress(function (e) {
            if (e.which == 13) {
                $('#btn_popup_list').click();
                window.event.returnValue = false;
            }
        });

    }
    // 검색 조건 초기화
    ,reset : function () {
        $('[name=mdGridForm] [name=userNm]').val('');
    }
    // MD 목록 조회
    ,search : function (pageNo,isOpenToast) {
        this.grid.cancel();
        var that = this;
        var extraQueryString = '&useYn='+ _argUseYn + '&' + 'workStatCd='+ _argWorkStatCd + '&userGbCd=10&jobGrpCd=13&userId=';

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.search(pageNo); };
        this.controller.doQuery(that, extraQueryString, pageNo, pageFunc,false,isOpenToast);
    }
    // 팝업 종료
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
            this.returnData( rowIndexList );
        }
    }
    ,returnData : function ( data ) {

        var grid = this.grid;
        var provider = grid.getDataSource();

        var returnData = [];
        var putReturnData = function ( dataRow ) {
            var row = provider.getJsonRow( dataRow );
            returnData.push({
                 userId : row.userId
                ,userNm : row.userNm
                ,useYn : ( row.useYn === '사용' )? 'Y' : 'N'
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
            mdGrid.eventhandler.returnData( clickData.dataRow );
        }
    }
};