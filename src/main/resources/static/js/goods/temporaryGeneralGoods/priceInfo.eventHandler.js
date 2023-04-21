var priceInfoMsg = x2coMessage.getMessage({
    noBuyTypCdMsg                 : 'generalGoods.priceInfo.alert.msg.noBuyTypCdMsg'
    ,noTaxGbCdMsg                  : 'generalGoods.priceInfo.alert.msg.noTaxGbCdMsg'
    ,salePrcSmallerThanSupPcostMsg : 'generalGoods.priceInfo.alert.msg.salePrcSmallerThanSupPcostMsg'
    ,salePrcBiggerThanNorPrcMsg    : 'generalGoods.priceInfo.alert.msg.salePrcBiggerThanNorPrcMsg'
    ,minPayWayCdMsg                : 'generalGoods.priceInfo.alert.msg.minPayWayCdMsg'
});

$.namespace('priceInfo.eventhandler');
priceInfo.eventhandler = {
    // 초기화
    init : function () {

        this.bindButtonEvent();
        this.minPrice = 100; // 금액 최소 입력값 ( default : 일반상품 )
    }
    // 기본정보 > 상품유형변경시 호출
    ,setPriceInfoData : function ( goodsTypeCd ) {

        // 상품유형 : 사은품(20)
        if ( goodsTypeCd === '20' ) {

            // 사은품일 경우 0원 입력 허용
            this.minPrice = 0;

        // 상품유형 : 일반상품 (10)
        } else {

            // 일반상품일경우 100원 이상 입력 가능
            this.minPrice = 100;
        }
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 공급가,판매가 입력시 마진율 자동 계산
        $('#priceInfo').on('keyup', '.priceValue', function () {
            this.value = getNumberFormat(this.value);
            that.calcMarginRate();
        });

        // 결제가능수단 전체 체크/해제
        $('#btn_check_all_payway').click( function () {
            $('input[name=payWayCd]').prop('checked',(this.checked)? true : false);
        });

        // 각 결제수단 체크/해제 -> 전체 체크 체크/해제
        $('#priceInfo input[type=checkbox][name=payWayCd]').change( function () {

            var allCnt = $('#priceInfo input[type=checkbox][name=payWayCd]').length              // 총 결제가능수단 개수
            var checkedCnt = $('#priceInfo input[type=checkbox][name=payWayCd]:checked').length; // 체크된 결제가능수단 개수

            if( allCnt === checkedCnt ) {
                $('#btn_check_all_payway').prop( 'checked', true );
            } else {
                $('#btn_check_all_payway').prop('checked', false);
            }
        });

    }
    // 마진율 계산
    ,calcMarginRate : function () {
        var supPcost  = parseInt(getToNum($('#supPcost').val()));  // 공급가
        var salePrc   = parseInt(getToNum($('#salePrc').val()));   // 판매가

        if ( !( supPcost > 0 && salePrc > 0 ) ) {
            $('#mrgnRate').val('')
            return;
        }

        // 마진율 계산 공식 : ((판매가 - 공급가) / 판매가) * 100
        // 소수점 둘째자리까지만 표현
        var mrginRate  = (((salePrc - supPcost) / salePrc) * 100).toFixed(2);
        $('#mrgnRate').val(mrginRate);
    }
    // 가격정보 초기화
    ,resetPriceInfo : function ( ) {

        // Form 초기화
        $('#priceInfo')[0].reset();

    }
    // 가격정보 유효성 체크
    ,validationCheck : function () {

        var that = this;

        // 매입형태를 선택하지 않은 경우
        if( $('#priceInfo [name=buyTypCd]').val() === '' ){
            alert(priceInfoMsg.noBuyTypCdMsg);
            $('#priceInfo [name=buyTypCd]').focus();
            return false;
        }

        // 과/면세구분을 선택하지 않은 경우
        if( $('#priceInfo [name=taxGbCd]').val() === '' ){
            alert(priceInfoMsg.noTaxGbCdMsg);
            $('#priceInfo [name=taxGbCd]').focus();
            return false;
        }

        // 공급가,정상가,판매가를 올바르게 입력하지 않은 경우
        var isInvalidPrice = false;
        $('#priceInfo').find('.priceValue').each( function ( index, data ) {

            var priceName = $(data).parent().prev().find('strong').text();
            var priceValue = $(data).val();
            var inputName = $(data).attr('name');

            // 값을 입력하지 않은 경우
            if ( priceValue === '' ) {
                alert( priceName + '를 입력해주세요.');
                $('#priceInfo [name='+inputName+']').focus();
                isInvalidPrice = true;
                return false;
            }

            priceValue = parseInt(getToNum(priceValue));
            // 입력값이 최솟값 미만인경우 -> 최솟값은 상품유형에 따라 변경
            if ( priceValue < that.minPrice ) {
                alert( priceName + '는 ' + that.minPrice + '원 이상 입력 가능합니다.');
                $('#priceInfo [name='+inputName+']').focus();
                isInvalidPrice = true;
                return false;
            }

            // 입력값이 10원단위로 입력하지 않은 경우
            if ( priceValue % 10 !== 0 ) {
                alert( priceName + '는 10원 단위로 입력가능합니다.');
                $('#priceInfo [name='+inputName+']').focus();
                isInvalidPrice = true;
                return false;
            }

        });

        if( isInvalidPrice ) return false;

        // 공급가 <= 판매가 <= 정상가 아닌경우
        var supPcost    = parseInt( getToNum( $('#priceInfo [name=supPcost]').val()));    // 공급가
        var norPrc      = parseInt( getToNum( $('#priceInfo [name=norPrc]').val()));      // 정상가
        var salePrc     = parseInt( getToNum( $('#priceInfo [name=salePrc]').val()));     // 판매가

        // 판매가가 공급가보다 작은경우
        if( salePrc < supPcost ) {
            alert(priceInfoMsg.salePrcSmallerThanSupPcostMsg);
            $('#priceInfo [name=salePrc]').focus();
            return false;
        }

        // 판매가가 정상가보다 큰 경우
        if( salePrc > norPrc ) {
            alert(priceInfoMsg.salePrcBiggerThanNorPrcMsg);
            $('#priceInfo [name=salePrc]').focus();
            return false;
        }

        // 결제가능수단을 최소 한개이상 선택하지 않은경우
        var checkedCnt = $('#priceInfo input[type=checkbox][name=payWayCd]:checked').length;
        if ( checkedCnt === 0 ) {
            alert(priceInfoMsg.minPayWayCdMsg);
            $('#btn_check_all_payway').focus();
            return false;
        }

        return true;

    }
    // 등록 > 가격정보 조회
    ,getPriceInfo : function () {

        var priceInfoForm = $('#priceInfo');
        var disabled = priceInfoForm.find(':disabled').prop('disabled',false);
        var priceInfoObj = priceInfoForm.serializeObject();
        disabled.prop('disabled',true);

        priceInfoObj.supPcost  = getToNum(priceInfoObj.supPcost);
        priceInfoObj.norPrc    = getToNum(priceInfoObj.norPrc);
        priceInfoObj.salePrc   = getToNum(priceInfoObj.salePrc);

        // ================= 상품결제수단정보 저장 ================= //
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
        priceInfoObj.histStrDtm   = getTodayDate().concat(' 00:00:00'); // 이력시작일시
        priceInfoObj.histEndDtm   = '2999-12-31 23:59:59';                                      // 이력종료일시
        priceInfoObj.prcChgCausCd = '';                                                         // 가격변경사유코드
        priceInfoObj.payMeanInfo  = payMeanInfo;

        return priceInfoObj;
    }
    // 상세 > 가격정보 세팅
    ,setPriceInfo : function ( priceInfoData ) {

        // 매입형태 세팅
        $('#buyTypCd').val(priceInfoData.buyTypCd);

        // 과/면세 구분 세팅
        $('#taxGbCd').val(priceInfoData.taxGbCd);

        var prPregGoodsPrcHist = priceInfoData.prPregGoodsPrcHist;
        if ( prPregGoodsPrcHist != null ) {
            $('#supPcost').val(getNumberFormat(prPregGoodsPrcHist.supPcost));     // 공급가 세팅
            $('#salePrc').val(getNumberFormat(prPregGoodsPrcHist.salePrc));       // 판매가 세팅
            $('#norPrc').val(getNumberFormat(prPregGoodsPrcHist.norPrc));         // 정상가 세팅
            $('#mrgnRate').val(prPregGoodsPrcHist.mrgnRate);     // 마진율 세팅
        }

        // 결제가능수단 세팅
        var payWayCdList = [];
        var prPregGoodsPayMeanInfoList = priceInfoData.prPregGoodsPayMeanInfoList;
        if ( prPregGoodsPayMeanInfoList != null && prPregGoodsPayMeanInfoList.length > 0 ) {
            $.each( prPregGoodsPayMeanInfoList, function ( index, data ) {
                payWayCdList.push(data.payWayCd); // 결제수단코드 추출
            });
        }

        var payWayCdCheckbox = $('input[name=payWayCd]');
        payWayCdCheckbox.prop('checked',false ); // 전체체크 해제 (Default : 전체 체크)
        payWayCdCheckbox.each( function ( index, data ) {
            $(data).prop('checked', payWayCdList.includes( $(data).val() ) );   // 일치하는 결제수단코드만 체크
        });

        // 조회한 결제수단코드 수가 전체 결제수단코드수와 일치하는 경우, 전체 체크
        $('#btn_check_all_payway').prop( 'checked', ( payWayCdList.length === payWayCdCheckbox.length ));

    }
}