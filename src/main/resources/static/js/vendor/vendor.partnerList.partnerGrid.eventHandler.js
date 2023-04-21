$.namespace("partnerGrid.eventhandler");
partnerGrid.eventhandler = {
    // 초기화
    initialize : function () {
//        this.argCheck();
        this.gridLoading();
        this.bindButtonEvent();
    }
    // 팝업 호출시 넘어오는 Argument 값 확인
    ,argCheck : function () {
        if ( (_gridType != '1' && _gridType != 'N')
            || (_argMbrStatCd != '' && _argMbrStatCd != '10' && _argMbrStatCd != '20' && _argMbrStatCd != '30')
        ) {
            alert(_msg.invalidAccessMsg);
            this.close();
        }
    }
    // 그리드 추가 옵션 설정
    ,gridLoading : function () {
        var _self = this;

        // 그리드 셀 수정 불가 설정
        this.grid.setEditOptions({ editable : false });

        //그리드 셀 체크시 색상 변경 기능 설정
        grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        })
    }
    // 이벤트 바인딩
    ,bindButtonEvent : function () {

        var _self = this;

        this.grid.onCellDblClicked = function(grid, clickData){
            var currentData = _self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.column==='entrNo'|| clickData.column==='entrNm'){
                _self.popupRegitster('U', currentData.entrNo);
            }
        }

        // 초기화 버튼 클릭 이벤트 처리
        $('#btn_partnerList_init').click(function () {
            _self.reset();
            //_self.clearGrid();
        });

        // 조회 버튼 클릭 이벤트 처리
        $('#btn_partnerList_search').click(function () {
            _self.search(0, true);
        });

        // Enter 이벤트 처리
        $("#partnerGridForm").keypress(function (e) {
            if (e.which == 13) {
                $('#btn_partnerList_search').click();
                window.event.returnValue = false;
            }
        });

        // 협력사 등록 팝업
        $('#btn_partnerlist_grid_register').click(function() {
            _self.popupRegitster('C');
        });
    }
    // 검색 조건 초기화
    ,reset : function () {
        $('#partnerGridForm')[0].reset();
    }
    ,clearGrid : function () {
        this.grid.getDataSource().clearRows();
    }
    // 회원 목록 조회
    ,search : function (pageNo, isOpenToast) {
        this.grid.cancel();
        var _self = this;

        if (_self.searchValidation() == false ) {
            return;
        }

        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return _self.search(pageNo, false); };
        this.controller.doQuery(_self, '', pageNo, pageFunc, null, isOpenToast);
    }
    // 팝업 종료
    ,close : function () {
        window.close();
    }
    // Grid 이벤트 처리
    ,gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
        //afterQueryError : function(xhr, status, error){}
        //afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){}
        //afterSaveFail : function(xhr, status, error){}
        //onRowCountChanged : function(){}
    }
    , searchValidation : function () {
        var bSearchValidate = true;

        return bSearchValidate;
    }
    ,
    popupRegitster : function(mode, entrNo) {
        var pin = {
            argMode : mode,
            entrNo: entrNo
        };
        var POP_DATA = {
            url: (typeof entrNo === "undefined") ? _baseUrl + 'popup/partnerCruNewPopup.do'
                                                 : _baseUrl + "popup/partnerCruDetailPopup.do"
            , winName: 'partnerCruPopup'
            , title: '협력사 등록 팝업'
            , _title: '협력사 등록 팝업'
            , left: 20
            , top: 20
            , width: 1300
            , height: 700
            , scrollbars: false
            , autoresize: false
         };
         popCommon(pin, POP_DATA);
    }
};