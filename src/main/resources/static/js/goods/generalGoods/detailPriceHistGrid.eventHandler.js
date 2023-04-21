var detailPriceHistMsg = x2coMessage.getMessage({
    reservedPrcHistIsExistMsg : 'generalGoods.priceInfo.alert.msg.reservedPrcHistIsExistMsg'
    ,minPayWayCdMsg : 'generalGoods.priceInfo.alert.msg.minPayWayCdMsg'
});

$.namespace('detailPriceHistGrid.eventhandler');
detailPriceHistGrid.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
        if(pageType === 'R') $('#btn_call_chgPrcRsv_popup').unbind('click').addClass('disabled');
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        $('.tabs-area').children('.tabs').children('li').each( function () {
            $(this).bind( 'click', function(){
                // 가격이력정보탭 클릭시
                if ( $(this).index() === 1 ) {
                    that.getGoodsPriceHistList(); // 가격이력조회
                }
            });
        });

        // 가격변경예약 버튼 클릭
        $('#btn_call_chgPrcRsv_popup').on('click', function () {
            // 이미 예약된 이력이 1건 있을경우, 예약 불가
            if(JSON.parse($(this).attr('data-isReserved'))) {
                alert(detailPriceHistMsg.reservedPrcHistIsExistMsg);
                return;
            }
            that.callChgPrcRsvPopup();
        });

        // 결제가능수단 전체 체크/해제
        $('#btn_check_all_payway').click( function () {
            $('input[name=payWayCd]').prop('checked',(this.checked)? true : false);
        });

        // 각 결제수단 체크/해제 -> 전체 체크 체크/해제
        $('#priceInfo input[type=checkbox][name=payWayCd]').change( function () {
            var allCnt = $('#priceInfo input[type=checkbox][name=payWayCd]').length              // 총 결제가능수단 개수
            var checkedCnt = $('#priceInfo input[type=checkbox][name=payWayCd]:checked').length; // 체크된 결제가능수단 개수
            $('#btn_check_all_payway').prop( 'checked', ( allCnt === checkedCnt ) );
        });

    }
    // 가격이력목록 조회
    ,getGoodsPriceHistList : function ( pageNo ) {
        var that = this;

        var goodsNo = $('#goodsNo').val();
        var extraQueryString = '&goodsNo='+goodsNo;

        that.grid.cancel();
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function ( pageNo ) { return that.getGoodsPriceHistList( pageNo); };
        this.controller.doQuery( that, extraQueryString, pageNo, pageFunc, null,false);
    }
    // 가격변경예약 팝업 호출
    ,callChgPrcRsvPopup : function () {

        var pin = {
            goodsNo: $('#goodsNo').val()
            ,goodsTypCd: $('#basicInfo :radio[name=goodsTypCd]:checked').val()
        };

        var POP_DATA = {
            url: _baseUrl + 'goods/GoodsCommon.generalGoodsPriceReservationModifyView.do'
            , winName: 'generalGoodsPriceReservationModifyView'
            , title: '가격변경예약'
            , _title: '가격변경예약'
            , left: 20
            , top: 20
            , width: 520
            , height: 320
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function ( e ) {
            var returnValue = JSON.parse(e.data);
            $('#btn_call_chgPrcRsv_popup').attr('data-isReserved', true);

            $('#salePrc').val(returnValue.salePrc);             // 판매가
            $('#mrgnRate').val(returnValue.mrgnRate);           // 마진율
            $('#histStrDtm').val(returnValue.histStrDtm);       // 가격변경시작일시
            $('#prcChgCausCd').val(returnValue.prcChgCausCd);   // 가격변경사유
        });

    }
    // 가격정보 초기화
    ,resetPriceInfo : function ( ) {
        $('#priceInfo')[0].reset();

        //탭초기화
        $('.tabs-area').children('.tabs').children('li').removeClass('active');
        $('.tabs-area').children('.tabs').children('li:first').addClass('active');

        $('.tabs-area').children('.tabs-body').children('.tab-cont').hide();
        $('.tabs-area').children('.tabs-body').children('.tab-cont:first').show();

    }
    // 가격정보 유효성 체크
    ,validationCheck : function () {

        // 결제가능수단을 최소 한개이상 선택하지 않은경우
        var checkedCnt = $('#priceInfo input[type=checkbox][name=payWayCd]:checked').length;
        if ( checkedCnt === 0 ) {
            alert(detailPriceHistMsg.minPayWayCdMsg);
            $('#btn_check_all_payway').focus();
            return false;
        }
        return true;
    }
    // 가격정보 조회
    ,getPriceInfo : function () {

        // 상품결제수단정보 저장
        var payMeanInfo = [];
        var payWayCdList = $('#priceInfo input[type=checkbox][name=payWayCd]:checked');
        if ( payWayCdList.length > 0 ){
            payWayCdList.each( function ( index, data ) {
                payMeanInfo.push({
                    payWayCd: $(data).val(),    // 결제수단코드
                    useYn: 'Y'                  // 사용여부
                });
            });
        }
        var priceInfoObj = { payMeanInfo : payMeanInfo };
        return priceInfoObj;
    }
    // 가격정보 세팅
    ,setPriceInfo : function ( priceInfoData ) {

        var prGoodsBase = priceInfoData.prGoodsBase;

        // 매입형태 세팅
        $('#buyTypCd').val(prGoodsBase.buyTypCd);

        // 과/면세 구분 세팅
        $('#taxGbCd').val(prGoodsBase.taxGbCd);

        var prGoodsPrcHist = priceInfoData.prGoodsPrcHist;
        if ( prGoodsPrcHist != null ) {
            $('#supPcost').val(getNumberFormat(prGoodsPrcHist.supPcost));     // 공급가 세팅
            $('#salePrc').val(getNumberFormat(prGoodsPrcHist.salePrc));       // 판매가 세팅
            $('#norPrc').val(getNumberFormat(prGoodsPrcHist.norPrc));         // 정상가 세팅
            $('#mrgnRate').val(prGoodsPrcHist.mrgnRate);                      // 마진율 세팅
        }

        // 가격변경적용기간 세팅
        $('#histStrDtm').val(prGoodsPrcHist.histStrDtm);
        $('#histEndDtm').val(prGoodsPrcHist.histEndDtm);

        // 가격변경사유 세팅
        $('#prcChgCausCd').val(convertNullToEmptyString(prGoodsPrcHist.prcChgCausCd));

        // 결제가능수단 세팅
        var payWayCdList = [];
        var prGoodsPayMeanInfoList = priceInfoData.prGoodsPayMeanInfoList;
        if ( prGoodsPayMeanInfoList != null && prGoodsPayMeanInfoList.length > 0 ) {
            $.each( prGoodsPayMeanInfoList, function ( index, data ) {
                payWayCdList.push(data.payWayCd); // 결제수단코드 추출
            });
        }

        var payWayCdCheckbox = $('input[name=payWayCd]');
        payWayCdCheckbox.prop('checked',false ); // 전체 항목 체크 해제 (Default : 전체 체크)
        payWayCdCheckbox.each( function ( index, data ) {
            $(data).prop('checked', payWayCdList.includes( $(data).val() ) );   // 일치하는 결제수단코드만 체크
        });

        // 조회한 결제수단코드 수가 전체 결제수단코드수와 일치하는 경우, 전체 체크
        $('#btn_check_all_payway').prop( 'checked', ( payWayCdList.length === payWayCdCheckbox.length ));

    }
}