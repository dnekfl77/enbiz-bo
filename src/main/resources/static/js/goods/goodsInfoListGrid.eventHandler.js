var goodsInfoMsg = x2coMessage.getMessage({
    noSelectedGoodsRegDtm             : 'goodsMgmt.alert.msg.noSelectedGoodsRegDtm'
});

$.namespace('goodsInfoListGrid.eventhandler')
goodsInfoListGrid.eventhandler = {
    init : function () {
        this.gridSetting();
        this.calenderSetting();
        this.bindButtonEvent();
    }
    ,gridSetting : function () {
        this.grid.setEditOptions({ editable: false });
    }
    ,calenderSetting : function () {
        if ($('#goodsRegStartDtm').val() === "" ) {
            var defaultDays = 7;
            var fromAndToCalDate = recentlyCalenderData(defaultDays);

            $('#goodsRegStartDtm').val(fromAndToCalDate[0]);
            $('#goodsRegEndDtm').val(fromAndToCalDate[1]);
        } else {
            this.search(0, false);
        }
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_calender').on( 'click', function () {
            that.callCalender();
        });

        $('#btn_call_md_popup').on( 'click', function () {
            that.callMdPopup();
        });

        $('#btn_reset_md_popup').on( 'click', function () {
            $('#mdId').val('');
            $('#mdNm').val('');
        });

        $('#btn_call_entr_popup').on( 'click', function () {
            that.callEntrPopup();
        });

        $('#btn_reset_entr_popup').on( 'click', function () {
            $('#entrNo').val('');
            $('#entrNm').val('');
        });

        $('#btn_call_stdctg_popup').on( 'click', function () {
            that.callStdCtgPopup();
        });

        $('#btn_reset_stdctg_popup').on( 'click', function () {
            $('#stdCtgNo').val('');
            $('#stdCtgHierarchy').val('');
        });

        $('#btn_call_brand_popup').on( 'click', function () {
            that.callBrandPopup();
        });

        $('#btn_reset_brand_popup').on( 'click', function () {
            $('#brandNo').val('');
            $('#brandNm').val('');
        });

        $('#btn_reset').on( 'click', function () {
            that.reset();
        });

        $('#btn_search').on( 'click', function () {
            that.search(0, true);
        });
    }
    ,reset : function () {
        $('#goodsInfoGridForm')[0].reset();
        this.calenderSetting();
        $('#goodsNoList, #mdId, #stdCtgNo, #brandNo').val('');
    }
    ,search : function ( pageNo, isOpenToast ) {
        var that = this;
        var extraQueryString = '';

        if ( !that.validation() ) return;

        this.setGoodsNoList();

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.search(pageNo, false); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null, isOpenToast );
    }
    ,validation : function () {

        if( $('#goodsRegStartDtm').val() === '' || $('#goodsRegEndDtm').val() === '' ) {
            alert(goodsInfoMsg.noSelectedGoodsRegDtm);
            return false;
        }
        return true;
    }
    ,setGoodsNoList : function () {

        var goodsNo = $('#goodsNo').val();
        var goodsNoList = ( goodsNo === '' ) ? '' : goodsNo.replace(/\n*$/g, '').split('\n');
        $('#goodsNoList').val(goodsNoList);

    }
    ,callCalender : function () {
        showCalendar({
            type : 'A', // A : 시작,종료일선택, B : 해당 날짜 1개 선택
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#goodsRegStartDtm').val(),
            yyyymmdd2 : $('#goodsRegEndDtm').val(),
            fn:function(pin) {
                $('#goodsRegStartDtm').val(pin.yyyymmdd1);
                $('#goodsRegEndDtm').val(pin.yyyymmdd2);
            }
        });
    }
    ,callMdPopup : function () {
        var pin = {
            argSelectType: '1'
            , argWorkStatCd: '01'
            , argUseYn: 'Y'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
            , winName: 'mdListPopup'
            , title: 'MD조회팝업'
            , _title: 'MD조회팝업'
            , left: 20
            , top: 20
            , width: 690
            , height: 600
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function(e) {
            var returnValue = JSON.parse(e.data);
            $('#mdId').val(returnValue[0].userId);
            $('#mdNm').val(returnValue[0].userNm);
        });
    }
    ,callEntrPopup : function () {
        var pin = { argSelectType   : '1'};
        var POP_DATA = {
            url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
            , winName: 'etEntrListPopup'
            , title: '협력사조회팝업'
            , _title: '협력사조회팝업'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function (e) {
            var returnValue = JSON.parse(e.data);
            $('#entrNo').val(returnValue[0].entrNo);
            $('#entrNm').val(returnValue[0].entrNm);
        });
    }
    ,callStdCtgPopup : function () {

        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'popup/standardCategory.prStdCtgListPopup.do'
            , winName: 'prStdCtgListPopup'
            , title: '상품표준분류팝업'
            , _title: '상품표준분류팝업'
            , left: 20
            , top: 20
            , width: 400
            , height: 500
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function ( e ) {
            var returnValue = JSON.parse(e.data);
            $('#stdCtgNo').val(returnValue.stdCtgNo);
            $('#stdCtgHierarchy').val(returnValue.hierarchyText);
        });
    }
    ,callBrandPopup : function () {
        var pin = { argSelectType: '1'};
        var POP_DATA = {
            url: _baseUrl + 'popup/brandMgmt.brandListPopup.do'
            , winName: 'brandListPopup'
            , title: '브랜드조회팝업'
            , _title: '브랜드조회팝업'
            , left: 20
            , top: 20
            , width: 790
            , height: 590
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA,function(e){
            var returnValue = JSON.parse(e.data);
            $('#brandNo').val(returnValue[0].brandNo);
            $('#brandNm').val(returnValue[0].brandNm);
        });
    }
    ,gridEvent : {
        onCellDblClicked : function ( grid, clickedCell ) {
            if( clickedCell.cellType === 'header' ) return;
            var rowData = grid.getDataSource().getJsonRow(clickedCell.dataRow);
            if( clickedCell.column === 'goodsNo' || clickedCell.column === 'goodsNm' ) {

                var pin = { type: 'E', goodsNo: rowData.goodsNo };
                var POP_DATA = {
                    url: _baseUrl + 'goods/GoodsCommon.goodsView.do'
                    , winName: 'goodsDetailPopup'
                    , title: '상품상세팝업'
                    , _title: '상품상세팝업'
                    , left: 20
                    , top: 20
                    , width: 1500
                    , height: 700
                    , scrollbars: false
                    , autoresize: false
                };
                popCommon(pin, POP_DATA,function(e){ });
            }
        }
    }
}