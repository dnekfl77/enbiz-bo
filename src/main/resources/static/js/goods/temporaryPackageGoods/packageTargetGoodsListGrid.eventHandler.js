var packageTargetGoodsListMsg = x2coMessage.getMessage({
    noGoodsRegDtmMsg : 'packageGoods.pkgGoodsPopup.alert.msg.noGoodsRegDtmMsg'
    ,noSearchWordMsg : 'packageGoods.pkgGoodsPopup.alert.msg.noSearchWordMsg'
    ,noSelectedGoodsMsg : 'packageGoods.pkgGoodsPopup.alert.msg.noSelectedGoodsMsg'
});

$.namespace('packageTargetGoodsListGrid.eventhandler');
packageTargetGoodsListGrid.eventhandler = {
    init : function () {
        this.setCalendar();
        this.gridSetting();
        this.bindButtonEvent();
    }
    ,setCalendar : function () {
        var fromAndToCalDate = recentlyCalenderData(30);
        $('#goodsRegStartDtm').val(fromAndToCalDate[0]);
        $('#goodsRegEndDtm').val(fromAndToCalDate[1]);
    }
    ,gridSetting : function () {
        this.grid.editOptions.editable = false;
        this.grid.onItemChecked = function (grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex });
        };
        this.grid.setRowStyleCallback(function (grid, item, fixed) {
            if (item.checked) return 'rg-trcol_active';
        });
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#btn_call_calender').on( 'click', function () {
            showCalendar({
                type : 'A',
                format : 'yyyy-MM-dd',
                yyyymmdd1 : $('#goodsRegStartDtm').val(),
                yyyymmdd2 : $('#goodsRegEndDtm').val(),
                fn:function(pin) {
                    $('#goodsRegStartDtm').val(pin.yyyymmdd1);
                    $('#goodsRegEndDtm').val(pin.yyyymmdd2);
                }
            });
        });

        $('#btn_call_md_popup').on('click', function () {
            var pin = {
                argSelectType   : '1'
                , argWorkStatCd : '01'   // 근무상태 ( 01 : 재직중, 02 : 퇴사 )
                , argUseYn      : 'Y'
            };
            var POP_DATA = {
                url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
                , winName: 'mdListPopup'
                , title: 'MD조회'
                , _title: 'MD조회'
                , left: 20
                , top: 20
                , width: 690
                , height: 600
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, function(e){
                var returnValue = JSON.parse(e.data);
                $('#mdId').val(returnValue[0].userId)
                $('#mdNm').val(returnValue[0].userNm);
            });
        });

        $('#btn_reset_md_popup').on( 'click', function () {
            $('#mdId').val('')
            $('#mdNm').val('');
        });

        $('#btn_call_brand_popup').on( 'click', function() {
            var pin = { argSelectType: '1' };
            var POP_DATA = {
                url: _baseUrl + 'popup/brandMgmt.brandListPopup.do'
                , winName: 'brandListPopup'
                , title: '브랜드조회'
                , _title: '브랜드조회'
                , left: 20
                , top: 20
                , width: 790
                , height: 590
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, function(e){
                var returnValue = JSON.parse(e.data);
                $('#brandNo').val(returnValue[0].brandNo);
                $('#brandNm').val(returnValue[0].brandNm);
            });
        });

        $('#btn_reset_brand_popup').on( 'click', function () {
            $('#brandNo').val('')
            $('#brandNm').val('');
        });

        $('#btn_call_stdCtg_popup').on( 'click', function() {
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
            popCommon(pin, POP_DATA, function(e){
                var returnValue = JSON.parse(e.data);
                $('#stdCtgNo').val(returnValue.stdCtgNo);
                $('#stdCtgNm').val(returnValue.stdCtgNm);
            });
        });

        $('#btn_reset_stdCtg_popup').on( 'click', function () {
            $('#stdCtgNo').val('')
            $('#stdCtgNm').val('');
        });

        $('#searchOption').change(function (e) {
            that.resetSearchOption(this.value);
        });

        $("#searchWord").on("keyup", function () {
            if ( $('#searchOption').val() === '01') return;
            var currentVal = $(this).val();
            $(this).val(currentVal.replace(/[^0-9]/g,'')); // 상품번호 -> 숫자만 입력가능
        });

        // 초기화
        $('#btn_popup_init').on( 'click', function () {
            that.reset();
        });

        // 조회
        $('#btn_popup_list').on( 'click', function () {
            that.search(0);
        });

        // 닫기
        $('#btn_popup_close').on( 'click', function () {
            that.close();
        });

        // 적용
        $('#btn_popup_apply').on( 'click', function () {
            that.apply();
        });

        com.x2commerce.common.Util.setupEnterSearch('packageTargetGoodsListGridForm','btn_popup_list');
    }
    ,resetSearchOption : function ( optionValue ) {
        var maxlength = ( optionValue === '01' ) ? 400 : 12; // 상품명 & 상품번호
        $('#searchOption').val( optionValue );
        $('#searchWord').attr( 'maxlength', maxlength ).val('');
    }
    ,reset : function () {
        $('#packageTargetGoodsListGridForm')[0].reset();
        $('#packageTargetGoodsListGridForm').find('input[type=hidden]').not(':first').val('');
        this.resetSearchOption('');
        this.setCalendar();
    }
    ,validate : function () {

        var searchOption = $('#searchOption').val();

        // 검색조건을 선택하지 않은경우
        if ( searchOption === '' ) {
            // 검색 필수값
            if( $('#goodsRegStartDtm').val() === '' || $('#goodsRegEndDtm').val() === '') {
                alert(packageTargetGoodsListMsg.noGoodsRegDtmMsg);
                return false;
            }
        } else {
            if ( $('#searchWord').val() === '') {
                alert(packageTargetGoodsListMsg.noSearchWordMsg);
                return false;
            }
        }

        return true;
    }
    ,search : function ( pageNo ) {

        var that = this;
        var extraQueryString = '';

        if(!this.validate()) return;

        var searchOption = $('#searchOption').val();
        var searchWord = $('#searchWord').val();

        var saleStatCdList = ( searchOption === '') ? $('#saleStatCdNm').val().split(',') : $('#saleStatCdNm').children(':first').val().split(',');
        $('#saleStatCdList').val(saleStatCdList);

        $('#goodsNm').val( ( searchOption === '01')? searchWord : '');
        $('#goodsNo').val( ( searchOption === '02')? searchWord : '');

        this.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.search(pageNo, false); };
        this.controller.doQuery(that, extraQueryString, pageNo, pageFunc, false);
    }
    ,close : function () {
        window.close();
    }
    ,apply : function () {

        var dataRow = this.grid.getCurrent().dataRow;
        if ( dataRow === -1 ) {
            alert(packageTargetGoodsListMsg.noSelectedGoodsMsg);
            return;
        }
        this.returnData( dataRow );
    }
    ,returnData : function ( dataRow ) {

        var grid = this.grid;
        var provider = grid.getDataSource();

        var returnData = [];
        var row = provider.getJsonRow( dataRow );
        returnData.push({
            tgtGoodsNo : row.goodsNo
            ,goodsNm : row.goodsNm
            ,brandNm : row.brandNm
            ,entrNo : row.entrNo
            ,entrNm : row.entrNm
            ,mdId : row.mdId
            ,saleStatCdNm : row.saleStatCdNm
            ,dispYn : row.dispYn
            ,deliProcTypCdNm : row.deliProcTypCdNm
            ,deliGoodsGbCdNm :row.deliGoodsGbCdNm
            ,salePrc : row.salePrc
            ,dispDlexAmt : row.dispDlexAmt
        });

        window.postMessage(JSON.stringify(returnData), _baseUrl);
        window.close();
    }
    ,gridEvent : {
        onCellDblClicked : function( grid, clickData ) {
            if ( clickData.cellType === 'gridEmpty' || clickData.cellType === "header" ) return;
            packageTargetGoodsListGrid.eventhandler.returnData( clickData.dataRow );
        }
    }
}