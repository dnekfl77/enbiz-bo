$.namespace("cooperateGrid.eventhandler");
cooperateGrid.eventhandler = {
    onSearch : function(pageIdx, isOpenToast) {
        this.grid.cancel();

        pageIdx = !pageIdx ? 0 : pageIdx;

        var _self = this;
        var pagingFunc = function(pageIdx) {
            return _self.onSearch(pageIdx, false);
        };

        this.controller.doQuery(this, '', pageIdx, pagingFunc, null, isOpenToast);
    }
    ,clearGrid : function () {
        this.grid.getDataSource().clearRows();
    }
    ,popupRegitster : function(mode, entrNo) {
        var pin = {
            mode : mode,
            entrNo: entrNo
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/cooperateAndOthersPopupView.do'
            , winName: 'cooperateAndOthersPopupView'
            , title: '제휴사 등록 팝업'
            , _title: '제휴사 등록 팝업'
            , left: 20
            , top: 20
            , width: 1050
            , height: 700
            , scrollbars: false
            , autoresize: false
         };
         popCommon(pin, POP_DATA);
    }
    ,bindButtonEvent: function () {
        var _self = this;

        $('#btn_search').on("click", t => {
            this.onSearch(0, true);
        });

        $('#btn_init').on("click", t => {
            this.reset();
            //this.clearGrid();
        });

        // Enter 이벤트 처리
        $("#cooperateSearchForm").keypress(function (e) {
            if (e.which == 13) {
                $('#btn_search').click();
                window.event.returnValue = false;
            }
        });

        this.grid.onCellDblClicked = function(grid, clickData){
            var currentData = _self.grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.column==='entrNo'|| clickData.column==='entrNm'){
                _self.popupRegitster('U', currentData.entrNo);
            }
        }

        // 협력사 등록 팝업
        $('#btnCooperateRegister').click(function() {
            _self.popupRegitster('C');
        });
    }
    // 검색 조건 초기화
    ,reset : function () {
        $('#cooperateSearchForm')[0].reset();
    }
    ,gridEvent: {
    }
};