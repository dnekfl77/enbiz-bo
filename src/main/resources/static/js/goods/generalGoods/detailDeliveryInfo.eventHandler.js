var detailDeliveryInfoMsg = x2coMessage.getMessage({
    noDeliGoodsGbCdMsg : 'generalGoods.deliveryInfo.alert.msg.noDeliGoodsGbCdMsg'
    ,noDeliWayCdMsg : 'generalGoods.deliveryInfo.alert.msg.noDeliWayCdMsg'
    ,noDeliPolcNoMsg : 'generalGoods.deliveryInfo.alert.msg.noDeliPolcNoMsg'
    ,noDeliDdayMsg : 'generalGoods.deliveryInfo.alert.msg.noDeliDdayMsg'
});

$.namespace('detailDeliveryInfo.eventhandler')
detailDeliveryInfo.eventhandler = {
    // 초기화
    init: function () {

        // 배송기일 옵션
        this.options = {
            // 일반상품
            '01' : [
                {value: '0', text: '오늘발송'},
                {value: '1', text: '1일'},
                {value: '2', text: '2일'},
                {value: '3', text: '3일'}
            ],
            // 설치상품
            '02' : [
                {value: '3', text: '3일'},
                {value: '5', text: '5일'},
                {value: '7', text: '7일'},
                {value: '10', text: '10일'}
            ],
            // 주문상품
            '03' : [
                {value: '3', text: '3일'},
                {value: '5', text: '5일'},
                {value: '7', text: '7일'},
                {value: '10', text: '10일'},
                {value: '15', text: '15일'}
            ]
        };

        this.bindButtonEvent();
    }
    // 이벤트
    ,bindButtonEvent: function () {

        var that = this;

        // 배송상품구분 선택값 변경
        $('#deliveryInfo  [name=deliGoodsGbCd]').change( function () {
            // 배송상품구분코드값에 따라 배송기일 옵션 변경
            that.setDeliDdayOptions(this.value);
        });

        // 발송예정일 선택값 변경 > 당일 발송 가능여부 변경
        $('#deliveryInfo [name=deliDday]').change( function () {
            that.changeTdaySndPsbYn(( this.value === '0' )? 'Y' : 'N');
        });

        // 토요일 발송 가능여부 변경
        $('#deliveryInfo input[name=sdaySndPsbYn]').change( function () {
            that.changeSdaySndPsbYn($(this).val());
        });
    }
    // 당일 발송 가능 여부 변경
    ,changeTdaySndPsbYn : function ( tdaySndPsbYn ) {

        $('#tdaySndPsbYn').val(tdaySndPsbYn);

        if ( tdaySndPsbYn === 'Y' ) {
            $('#deliDdayDetail').show();
        } else {
            $('#deliDdayDetail').hide();
        }

        this.changeSdaySndPsbYn('N');
        $('#tdaySndHour').val('00');
        $('#tdaySndMinute').val('00');

    }
    // 토요일 발송 가능여부 변경
    ,changeSdaySndPsbYn : function ( sdaySndPsbYn ) {

        $('input:radio[name=sdaySndPsbYn][value='+sdaySndPsbYn+']').prop('checked',true);

        if ( sdaySndPsbYn === 'Y' ) {
            $('#sdaySndDetail').show();
        } else {
            $('#sdaySndDetail').hide();
        }

        $('#sdaySndHour').val('00');
        $('#sdaySndMinute').val('00');

    }
    // 배송기일 옵션 세팅
    ,setDeliDdayOptions : function ( deliGoodsGbCd ) {

        $('#deliDday').empty().append($('<option/>').val('').text(':: 선택 ::'));
        $('#deliDday').val('').trigger('change');

        var optionArr = this.options[deliGoodsGbCd];
        if(!Array.isArray(optionArr)) return;

        optionArr.forEach(function (el, index) {
            $('#deliDday').append(
                $('<option/>').val(el.value).text(el.text)
            );
        });
    }
    // 배송정보 초기화
    ,resetDeliveryInfo : function () {
        // Form 초기화
        $('#deliveryInfo')[0].reset();
        this.changeTdaySndPsbYn('N');
    }
    // 배송정보 유효성 체크
    ,validationCheck : function () {

        // 배송상품구분을 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliGoodsGbCd]').val() === '' ) {
            alert(detailDeliveryInfoMsg.noDeliGoodsGbCdMsg);
            $('#deliveryInfo [name=deliGoodsGbCd]').focus();
            return false;
        }

        // 배송수단을 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliWayCd]').val() === '' ) {
            alert(detailDeliveryInfoMsg.noDeliWayCdMsg);
            $('#deliveryInfo [name=deliWayCd]').focus();
            return false;
        }

        // 배송비/반품비를 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliPolcNo]').val() === '' ) {
            alert(detailDeliveryInfoMsg.noDeliPolcNoMsg);
            $('#deliveryInfo [name=deliPolcNo]').focus();
            return false;
        }

        // 발송예정일을 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliDday]').val() === '' ) {
            alert(detailDeliveryInfoMsg.noDeliDdayMsg);
            $('#deliveryInfo [name=deliDday]').focus();
            return false;
        }

        return true;
    }
    // 배송정보 조회
    ,getDeliveryInfo : function () {

        var deliveryInfoForm = $('#deliveryInfo');
        var disabled = deliveryInfoForm.find(':disabled').prop('disabled',false);
        var deliveryInfoObj = deliveryInfoForm.serializeObject();
        disabled.prop('disabled',true);

        var wdSndPsbTm = '';    // 평일발송가능시간
        var sdaySndPsbTm = '';  // 토요일발송가능시간

        // 발송예정일이 '오늘발송(0)'인 경우
        if ( $('#deliveryInfo [name=deliDday]').val() === '0' ) {
            // 평일발송가능시간 세팅 ( 형식 : 1230 )
            wdSndPsbTm = $('#tdaySndHour').val().concat($('#tdaySndMinute').val());
        }

        // 툐요일발송가능여부가 '가능'인 경우
        if( $('#deliveryInfo :radio[name=sdaySndPsbYn]:checked').val() === 'Y' ) {
            // 토요일발송가능시간 세팅 ( 형식 : 1230 )
            sdaySndPsbTm = $('#sdaySndHour').val().concat($('#sdaySndMinute').val());
        }

        deliveryInfoObj.wdSndPsbTm = wdSndPsbTm;
        deliveryInfoObj.sdaySndPsbTm = sdaySndPsbTm;

        return deliveryInfoObj;
    }
    // 배송정보 세팅
    ,setDeliveryInfo : function ( deliveryInfoData ) {

        var prGoodsBase = deliveryInfoData.prGoodsBase;

        // 배송처리유형 세팅
        $('#deliProcTypCd').val(prGoodsBase.deliProcTypCd);

        // 배송상품구분 세팅
        // 상품유형이 '사은품(20)'일 경우, 배송상품구분코드 수정불가
        $('#deliGoodsGbCd').val( prGoodsBase.deliGoodsGbCd );
        $('#deliGoodsGbCd').prop('disabled', ( prGoodsBase.goodsTypCd === '20' ) );

        // 배송상품구분값에 따른 발송예정일 Select box 세팅
        this.setDeliDdayOptions( prGoodsBase.deliGoodsGbCd );

        // 배송수단 세팅
        $('#deliWayCd').val(prGoodsBase.deliWayCd);
        $('#deliWayCd').prop( 'disabled' ,true );

        // 배송비/반품비 세팅
        $('#deliPolcNo').val(prGoodsBase.deliPolcNo);

        // 발송예정일 세팅
        $('#deliDday').val(prGoodsBase.deliDday);

        // 오늘발송가능여부 세팅
        $('#tdaySndPsbYn').val(prGoodsBase.tdaySndPsbYn);

        // 발송예정일이 0이고, 당일발송가능여부가 'Y'인 경우
        if ( prGoodsBase.deliDday === 0 && prGoodsBase.tdaySndPsbYn === 'Y') {

            // 평일발송가능시간 세팅 ( 값이 없을경우 00:00 세팅 )
            var wdSndPsbTm = ( prGoodsBase.wdSndPsbTm === null || prGoodsBase.wdSndPsbTm === '' )? '0000' : prGoodsBase.wdSndPsbTm;

            $('#tdaySndHour').val(wdSndPsbTm.substring(0,2));
            $('#tdaySndMinute').val(wdSndPsbTm.substring(2,4));
            $('#deliDdayDetail').show();

            // 토요일발송가능여부 세팅
            $('#deliveryInfo :radio[name=sdaySndPsbYn][value='+prGoodsBase.sdaySndPsbYn+']').prop('checked',true);

            // 토요일발송가능여부가 'Y'인 경우
            if ( prGoodsBase.sdaySndPsbYn === 'Y' ){

                // 토요일발송가능시간 세팅
                var sdaySndPsbTm = ( prGoodsBase.sdaySndPsbTm === null || prGoodsBase.sdaySndPsbTm === '' )? '0000' : prGoodsBase.sdaySndPsbTm;
                $('#sdaySndHour').val(sdaySndPsbTm.substring(0,2));
                $('#sdaySndMinute').val(sdaySndPsbTm.substring(2,4));
                $('#sdaySndDetail').show();
            }
        }

        // 묶음매송여부, 묶음반품가능여부, 반품가능여부, 교환가능여부 세팅
        // 상품유형이 '사은품(20)'일 경우, 수정불가
        $('#deliveryInfo :radio[name=bdlDeliPsbYn][value='+prGoodsBase.bdlDeliPsbYn+'], :radio[name=bdlRtnPsbYn][value='+prGoodsBase.bdlRtnPsbYn+'], :radio[name=rtnPsbYn][value='+prGoodsBase.rtnPsbYn+'], :radio[name=exchPsbYn][value='+prGoodsBase.exchPsbYn+']').prop('checked', true);
        $('#deliveryInfo').find("[name=bdlDeliPsbYn],[name=bdlRtnPsbYn],[name=rtnPsbYn],[name=exchPsbYn]").prop('disabled', ( prGoodsBase.goodsTypCd === '20' ));

    }
}