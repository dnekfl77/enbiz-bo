var deliveryInfoMsg = x2coMessage.getMessage({
    noDeliProcTypCdMsg             : 'generalGoods.deliveryInfo.alert.msg.noDeliProcTypCdMsg'
    ,noDeliGoodsGbCdMsg             : 'generalGoods.deliveryInfo.alert.msg.noDeliGoodsGbCdMsg'
    ,noDeliWayCdMsg                 : 'generalGoods.deliveryInfo.alert.msg.noDeliWayCdMsg'
    ,noDeliPolcNoMsg                : 'generalGoods.deliveryInfo.alert.msg.noDeliPolcNoMsg'
    ,noDeliDdayMsg                  : 'generalGoods.deliveryInfo.alert.msg.noDeliDdayMsg'
});

$.namespace('deliveryInfo.eventhandler')
deliveryInfo.eventhandler = {
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
    ,setDeliveryInfoData : {
        // 기본정보 > 상품유형변경시 호출 -> 배송상품구분 세팅
        setDeliGoodsGbCd : function ( goodsTypeCd ) {

            var deliGoodsGbCd, isDisabled;

            // 상품유형 : 사은품(20)
            if ( goodsTypeCd === '20' ) {

                // 배송상품구분 '일반상품(01)' 세팅, 수정불가
                // 묶음매송여부, 묶음반품가능여부, 반품가능여부, 교환가능여부 '가능' 세팅, 수정불가
                deliGoodsGbCd = '01';
                isDisabled = true;

                // 일반상품 (10)
            } else {
                deliGoodsGbCd = '';
                isDisabled = false;
            }

            $('#deliGoodsGbCd').val(deliGoodsGbCd);
            deliveryInfo.eventhandler.setDeliDdayOptions(deliGoodsGbCd);
            $('#deliGoodsGbCd').prop('disabled',isDisabled);

            $('#deliveryInfo :radio[name=bdlDeliPsbYn][value="Y"], :radio[name=bdlRtnPsbYn][value="Y"], :radio[name=rtnPsbYn][value="Y"], :radio[name=exchPsbYn][value="Y"]').prop('checked', true);
            $('#deliveryInfo').find("[name=bdlDeliPsbYn],[name=bdlRtnPsbYn],[name=rtnPsbYn],[name=exchPsbYn]").prop('disabled', isDisabled);

        },
        // 기본정보 > 협력사 선택시 호출 -> 배송비&반품비 셀렉트옵션 세팅
        setDeliPolcNo : function ( entrNo ) {

            if ( $('#deliProcTypCd').val() === '10' ) return; // 센터배송일 경우 목록 변경 불가
            deliveryInfo.eventhandler.setDeliPolcNoOptions( entrNo );
        }
    }
    // 이벤트
    ,bindButtonEvent: function () {

        var that = this;

        // 배송상품구분 선택값 변경
        $('#deliGoodsGbCd').change( function () {
            // 배송상품구분코드값에 따라 배송기일 옵션 변경
            that.setDeliDdayOptions(this.value);
        });

        // 발송예정일 선택값 변경
        $('#deliDday').change( function () {
            that.changeTdaySndPsbYn(( this.value === '0' )? 'Y' : 'N');
        });

        // 토요일 발송 가능여부 변경
        $('input[name=sdaySndPsbYn]').change( function () {
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
    // 배송비 & 반품비 셀렉트옵션 세팅
    ,setDeliPolcNoOptions : function ( entrNo ) {

        // 셀렉트박스 초기화
        $('#deliveryInfo select[name=deliPolcNo]').children().not(':first-child').remove();

        if( entrNo === '' ) return;

        common.Ajax.sendRequestSync("GET"
            , _baseUrl + "goods/TemporaryGeneralGoods.getDeliveryPolicyList.do"
            , { entrNo : entrNo }
            , function ( deliPolicies ) {
                if( Array.isArray(deliPolicies) ) {
                    deliPolicies.forEach( function ( policy ) {
                        $('#deliveryInfo select[name=deliPolcNo]').append(
                            $('<option/>').val(policy.deliPolcNo).text(policy.dispDlexAmt)
                        )
                    });
                }
            }, false
        );
    }
    // 배송정보 초기화
    ,resetDeliveryInfo : function ( ) {

        // Form 초기화
        $('#deliveryInfo')[0].reset();

        // Form 초기화 안되는 항목 수동 초기화
        // 배송비/반품비 옵션 초기화
        this.setDeliveryInfoData.setDeliPolcNo('');

    }
    // 배송정보 유효성 체크
    ,validationCheck : function () {

        // 배송처리유형을 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliProcTypCd]').val() === '' ) {
            alert(deliveryInfoMsg.noDeliProcTypCdMsg);
            $('#deliveryInfo [name=deliProcTypCd]').focus();
            return false;
        }

        // 배송상품구분을 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliGoodsGbCd]').val() === '' ) {
            alert(deliveryInfoMsg.noDeliGoodsGbCdMsg);
            $('#deliveryInfo [name=deliGoodsGbCd]').focus();
            return false;
        }

        // 배송수단을 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliWayCd]').val() === '' ) {
            alert(deliveryInfoMsg.noDeliWayCdMsg);
            $('#deliveryInfo [name=deliWayCd]').focus();
            return false;
        }

        // 배송비/반품비를 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliPolcNo]').val() === '' ) {
            alert(deliveryInfoMsg.noDeliPolcNoMsg);
            $('#deliveryInfo [name=deliPolcNo]').focus();
            return false;
        }

        // 발송예정일을 선택하지 않은 경우
        if ( $('#deliveryInfo [name=deliDday]').val() === '' ) {
            alert(deliveryInfoMsg.noDeliDdayMsg);
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

        // 배송처리유형 세팅
        $('#deliProcTypCd').val(deliveryInfoData.deliProcTypCd);

        // 배송상품구분 세팅
        // 상품유형이 '사은품(20)'일 경우, 배송상품구분코드 '일반상품(01)' 세팅, 수정불가
        var deliGoodsGbCd = ( deliveryInfoData.goodsTypCd === '20' )? '01' : deliveryInfoData.deliGoodsGbCd;
        $('#deliGoodsGbCd').val( deliGoodsGbCd );
        $('#deliGoodsGbCd').prop('disabled', ( deliveryInfoData.goodsTypCd === '20' ) );

        // 배송상품구분값에 따른 발송예정일 Select box 세팅
        this.setDeliDdayOptions(deliGoodsGbCd);

        // 배송수단 세팅
        $('#deliWayCd').val(deliveryInfoData.deliWayCd);

        // 배송비/반품비 세팅
        this.setDeliPolcNoOptions(( deliveryInfoData.deliProcTypCd === '10' )? '0' : deliveryInfoData.entrNo); // 센터배송일 경우 배송비 정책 고정
        $('#deliPolcNo').val(deliveryInfoData.deliPolcNo);

        // 발송예정일 세팅
        $('#deliDday').val(deliveryInfoData.deliDday);

        // 발송예정일이 0이고, 당일발송가능여부가 'Y'인 경우
        if ( deliveryInfoData.deliDday === 0 ) {

            // 오늘발송가능여부 세팅
            $('#tdaySndPsbYn').val('Y');

            // 평일발송가능시간 세팅 ( 값이 없을경우 00:00 세팅 )
            var wdSndPsbTm = ( deliveryInfoData.wdSndPsbTm === null || deliveryInfoData.wdSndPsbTm === '' )? '0000' : deliveryInfoData.wdSndPsbTm;

            $('#tdaySndHour').val(wdSndPsbTm.substring(0,2));
            $('#tdaySndMinute').val(wdSndPsbTm.substring(2,4));
            $('#deliDdayDetail').show();

            // 토요일발송가능여부가 'Y'인 경우
            if ( deliveryInfoData.sdaySndPsbYn === 'Y' ){

                // 토요일발송가능여부 세팅
                $('#deliveryInfo :radio[name=sdaySndPsbYn][value=Y]').prop('checked',true);

                // 토요일발송가능시간 세팅
                var sdaySndPsbTm = ( deliveryInfoData.sdaySndPsbTm === null || deliveryInfoData.sdaySndPsbTm === '' )? '0000' : deliveryInfoData.sdaySndPsbTm;
                $('#sdaySndHour').val(sdaySndPsbTm.substring(0,2));
                $('#sdaySndMinute').val(sdaySndPsbTm.substring(2,4));
                $('#sdaySndDetail').show();
            }
        }

        // 묶음매송여부, 묶음반품가능여부, 반품가능여부, 교환가능여부 세팅
        // 상품유형이 '사은품(20)'일 경우, '가능' 세팅, 수정불가
        var bdlDeliPsbYn = ( deliveryInfoData.goodsTypCd === '20' )? 'Y' : deliveryInfoData.bdlDeliPsbYn;
        var bdlRtnPsbYn = ( deliveryInfoData.goodsTypCd === '20' )? 'Y' : deliveryInfoData.bdlRtnPsbYn;
        var rtnPsbYn = ( deliveryInfoData.goodsTypCd === '20' )? 'Y' : deliveryInfoData.rtnPsbYn;
        var exchPsbYn = ( deliveryInfoData.goodsTypCd === '20' )? 'Y' : deliveryInfoData.exchPsbYn;

        $('#deliveryInfo :radio[name=bdlDeliPsbYn][value='+bdlDeliPsbYn+'], :radio[name=bdlRtnPsbYn][value='+bdlRtnPsbYn+'], :radio[name=rtnPsbYn][value='+rtnPsbYn+'], :radio[name=exchPsbYn][value='+exchPsbYn+']').prop('checked', true);
        $('#deliveryInfo').find("[name=bdlDeliPsbYn],[name=bdlRtnPsbYn],[name=rtnPsbYn],[name=exchPsbYn]").prop('disabled', ( deliveryInfoData.goodsTypCd === '20' ));

    }
}