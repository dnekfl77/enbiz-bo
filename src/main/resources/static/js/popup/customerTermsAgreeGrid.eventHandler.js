$.namespace("customerTermsAgreeGrid.eventhandler");
customerTermsAgreeGrid.eventhandler = {
    loadingData : function() {
        //그리드 데이터 세팅
        this.controller.callbackForCommonSuccess(this.grid, _etMbrSvcAgrInfoList);
    }
    //그리드 데이터 조회
    ,onSearch : function(chlNo){
        const extraQueryString = "chlNo=" + chlNo;
        this.grid.cancel();
        this.controller.doQuery(this, extraQueryString);
    }
    //그리드 데이터 초기화
    ,clearGrid : function () {
        this.grid.cancel();
        this.grid.getDataSource().clearRows();
    }
    ,popupTermsByMbrNoSiteNo : function(mbrNo, siteNo){
        if (mbrNo === undefined || mbrNo === '' || siteNo === undefined || siteNo === '') {
            alert('요청정보를 확인하세요.');
            return false;
        }

        var pin = {
            mbrNo: mbrNo
            ,siteNo: siteNo
            ,mbrNm: $('#mbrNm').val()
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/customerMgmt.customerTermsAgreeHistoryPopup.do'
            , winName: 'customerTermsAgreeHistoryPopupView'
            , title: '마케팅서비스동의이력조회'
            , _title: '마케팅서비스동의이력조회'
            , left: 20
            , top: 20
            , width: 500
            , height: 470
            , scrollbars: false
            , autoresize: false
        };

        popCommon(pin, POP_DATA);
    }

    ,bindButtonEvent: function () {
        var _self = this;

        _self.grid.onCellDblClicked = function(grid, clickData) {
            var currentData = grid.getDataSource().getJsonRow(clickData.dataRow);
            if(clickData.column==='siteNm') {
                _self.popupTermsByMbrNoSiteNo(currentData.mbrNo, currentData.siteNo);
            }
        };

    }

    ,gridEvent : {
    }

    // 초기화
    ,initialize : function() {
        this.loadingData();
        this.bindButtonEvent();
    }
};