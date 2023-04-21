var prcRsvModPopupMsg = x2coMessage.getMessage({
    invalidHistStrDateThenTodayMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.invalidHistStrDateThenTodayMsg'
    ,invalidHistStrDateThenBeforeMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.invalidHistStrDateThenBeforeMsg'
    ,noHistStrTimeMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.noHistStrTimeMsg'
    ,noSalePrcMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.noSalePrcMsg'
    ,noHistStrDtmMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.noHistStrDtmMsg'
    ,invalidMeasureMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.invalidMeasureMsg'
    ,salePrcSmallerThanSupPcostMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.salePrcSmallerThanSupPcostMsg'
    ,salePrcBiggerThanNorPrcMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.salePrcBiggerThanNorPrcMsg'
    ,noPrcChgCausCdMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.noPrcChgCausCdMsg'
    ,reservePrcChgConfirmMsg : 'generalGoods.priceInfo.prcRsvModPopup.alert.msg.reservePrcChgConfirmMsg'
});

$.namespace("detailPriceReservationModifyPopup.eventhandler");
detailPriceReservationModifyPopup.eventhandler = {
    init : function () {
        this.setData();
        this.bindButtonEvent();
    }
    ,setData : function () {
        this.data = {
            goodsNo       : _priceInfo.goodsNo             // 상품번호
            , histStrDtm  : _priceInfo.histStrDtm          // 이력시작일시
            , supPcost    : _priceInfo.supPcost            // 공급원가
            , norPrc      : _priceInfo.norPrc              // 정상가
            , salePrc     : _priceInfo.salePrc             // 판매가
        }
        this.minPrice = parseInt(_minPrice);               // 상품유형별 최솟값(사은품 : 0원, 일반상품 : 100원)
        $('#preSalePrc').val( getNumberFormat( this.data.salePrc ) );
    }
    ,bindButtonEvent : function () {

        var that = this;

        $('#postSalePrc').on('keyup', function () {
            this.value = getNumberFormat( this.value );
            $('#salePrcChgRate').val(
                ( this.value === '' ) ? '' :
                that.calcSalePrcChangeRate(
                    that.data.salePrc, parseInt(getToNum(this.value))
                )
            );
        });

        $('#btn_call_calender').on( 'click', function () {
            that.callCalender();
        });

        $('#btn_popup_apply').on( 'click', function () {
            that.apply();
        });

        $('#btn_popup_close').on( 'click', function () {
            that.close();
        });
    }
    ,callCalender : function () {

        var that = this;
        var date = $('#histStrDtm').val();
        var ymd = date.split(/ /);
        var hour = "";
        var min = "";
        if (ymd.length == 2) {
            hour = ymd[1].split(/:/)[0];
            min = ymd[1].split(/:/)[1];
        }

        showCalendar({
            type:'C',
            format:'yyyy-MM-dd HH:mm',
            yyyymmdd: date,
            hour: hour,
            min: min,
            fn: function( pin ) {
                var todayDtm = `${pin.today1} ${pin.hour1}:${pin.min1}`;
                var selectedDtm = `${pin.yyyymmdd} ${pin.hour}:${pin.min}`;

                if ( pin.hour === null || pin.min === null ) {
                    alert(prcRsvModPopupMsg.noHistStrTimeMsg);
                    return false;
                }

                if ( todayDtm >= selectedDtm ) {
                    alert(prcRsvModPopupMsg.invalidHistStrDateThenTodayMsg);
                    return false;
                }

                if ( that.data.histStrDtm >= selectedDtm ) {
                    alert(prcRsvModPopupMsg.invalidHistStrDateThenBeforeMsg);
                    return false
                }

                $('#histStrDtm').val(selectedDtm);
            }
        });
    }
    // 변동률 계산 ( 기존값, 변경값)
    ,calcSalePrcChangeRate : function ( preSalePrc, postSalePrc ) {
        return ((( postSalePrc - preSalePrc ) / preSalePrc ) * 100 ).toFixed(2);
    }
    // 마진율 계산 ( 공급가, 판매가 )
    ,calcMarginRate : function ( supPcost, salePrc ) {
        return ((( salePrc - supPcost ) / salePrc ) * 100 ).toFixed(2);
    }
    ,validationCheck : function () {

        var postSalePrc = $('#postSalePrc').val();
        if ( postSalePrc === '' ) {
            alert( prcRsvModPopupMsg.noSalePrcMsg );
            $('#postSalePrc').focus();
            return false;
        }

        postSalePrc = parseInt(getToNum(postSalePrc));
        if ( postSalePrc < this.minPrice ) { // 최솟값 입력제한
            alert( '판매가는 ' + this.minPrice + '원 이상 입력 가능합니다.');
            $('#postSalePrc').focus();
            return false;
        }

        if ( postSalePrc % 10 !== 0 ) { // 10원단위 입력제한
            alert( prcRsvModPopupMsg.invalidMeasureMsg );
            $('#postSalePrc').focus();
            return false;
        }

        if ( postSalePrc < this.data.supPcost ) { // 공급가보다 작은경우
            alert(prcRsvModPopupMsg.salePrcSmallerThanSupPcostMsg);
            $('#postSalePrc').focus();
            return false;
        }

        if ( postSalePrc > this.data.norPrc ) { // 정상가보다 큰경우
            alert(prcRsvModPopupMsg.salePrcBiggerThanNorPrcMsg);
            $('#postSalePrc').focus();
            return false;
        }

        if ( $('#histStrDtm').val() === '' ) {
            alert(prcRsvModPopupMsg.noHistStrDtmMsg);
            $('#histStrDtm').focus();
            return false;
        }

        if ( $('#prcChgCausCd').val() === '' ) {
            alert(prcRsvModPopupMsg.noPrcChgCausCdMsg);
            $('#prcChgCausCd').focus();
            return false;
        }

        return true;

    }
    ,apply : function () {

        var that = this;
        if ( !this.validationCheck() ) return;

        that.data.salePrc = parseInt(getToNum($('#postSalePrc').val()));
        that.data.histStrDtm = ($('#histStrDtm').val()).concat(':00');
        that.data.mrgnRate = parseFloat(that.calcMarginRate( that.data.supPcost, that.data.salePrc ));
        that.data.prcChgCausCd = $('#prcChgCausCd').val();

        if(!confirm(prcRsvModPopupMsg.reservePrcChgConfirmMsg)) return;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + 'goods/GoodsCommon.modifyGeneralGoodsPriceReservation.do'
            , that.data
            , function ( result ) {
                if ( result.succeeded !== undefined && result.succeeded) {
                    var returnData = {
                        salePrc : that.data.salePrc,
                        mrgnRate : that.data.mrgnRate,
                        histStrDtm : (that.data.histStrDtm).substr(0,16),
                        prcChgCausCd : that.data.prcChgCausCd
                    }
                    window.postMessage( JSON.stringify(returnData), _baseUrl );
                    that.close()
                };
            }, null, null, false
        );
    }
    ,close : function () {
        window.close();
    }
}