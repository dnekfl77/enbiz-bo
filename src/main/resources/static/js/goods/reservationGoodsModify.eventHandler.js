var alertMessage = x2coMessage.getMessage( {
    invalidRsvStartDtmMsg  : 'reservationGoodsMgmt.reservationGoodsModify.alert.msg.invalidRsvStartDtmMsg',
    invalidFwDidcPrarDyMsg : 'reservationGoodsMgmt.reservationGoodsModify.alert.msg.invalidFwDidcPrarDyMsg',
    fwdidcPrarDyImpossMsg  : 'reservationGoodsMgmt.reservationGoodsModify.alert.msg.fwdidcPrarDyImpossMsg',
    noStopCodeMsg          : 'reservationGoodsMgmt.reservationGoodsModify.alert.msg.noStopCodeMsg',
    noRsvDtmMsg            : 'reservationGoodsMgmt.reservationGoodsModify.alert.msg.noRsvDtmMsg',
    noFwdidcPrarDyMsg      : 'reservationGoodsMgmt.reservationGoodsModify.alert.msg.noFwdidcPrarDyMsg',
    noAfterMethodMsg       : 'reservationGoodsMgmt.reservationGoodsModify.alert.msg.noAfterMethodMsg'
});

$.namespace("reservationGoodsModify.eventhandler");
reservationGoodsModify.eventhandler = {
    init : function () {
        this.bindButtonEvent();
    },
    bindButtonEvent : function() {
        var self= this;

        // 예약주문 가능시간
        $('#rsvDtm-calendar').click(function() {
            var ymd1 = $('#rsv-strt-dtm').val().split(/ /);
            var hour1 = (ymd1.length == 2) ? ymd1[1].split(/:/)[0]: "00";
            var min1 =  (ymd1.length == 2) ? ymd1[1].split(/:/)[1] : "00";

            var ymd2 = $('#rsv-end-dtm').val().split(/ /);
            var hour2 = (ymd2.length == 2) ? ymd2[1].split(/:/)[0]: "23";
            var min2 =  (ymd2.length == 2) ? ymd2[1].split(/:/)[1] : "59";

            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd HH:mm',
                yyyymmdd1:ymd1[0],
                yyyymmdd2:ymd1[0],
                hour1:hour1,
                hour2:hour2,
                min1:min1,
                min2:min2,
                max_term:90,
                fn:function(pin) {

                    var today = `${pin.today} ${(pin.hour).toString().padStart(2,'0')}:${pin.min}`;
                    var start = `${pin.yyyymmdd1} ${pin.hour1}:${pin.min1}`;
                    var end = `${pin.yyyymmdd2} ${pin.hour2}:${pin.min2}`;

                    // 현재보다 이전 일자 선택 불가
                    if ( start <= today ) {
                        alert(alertMessage.invalidRsvStartDtmMsg);
                        return;
                    }

                    $('#rsv-strt-dtm').val(start);
                    $('#rsv-end-dtm').val(end);
                }
            });
        });

        // 출고지시 예정일자
        $('#fwdidcPrarDy-calendar').click( function () {
            showCalendar({
                type : 'C',
                format : 'yyyy-MM-dd',
                yyyymmdd : $('#fwdidcPrarDy').val(),
                fn : function ( pin ) {
                    var rsvEndDtm = $('#rsv-end-dtm').val();
                    var fwdidcPrarDy = pin.yyyymmdd;
                    var toDay = pin.today1;

                    if(fwdidcPrarDy < toDay){
                        alert(alertMessage.invalidFwDidcPrarDyMsg);
                        return;
                    }

                    // 예약주문종료일 >= 예액상품출고지시일 선택 불가
                    if( rsvEndDtm >= fwdidcPrarDy ){
                        alert(alertMessage.fwdidcPrarDyImpossMsg);
                        return;
                    }

                    $('#fwdidcPrarDy').val(fwdidcPrarDy);
                }
            });
        });

        $('#btn_apply').click(function(){
            self.apply();
        });

        $('#btn_close').click(function(){
            window.close();
        });
    },
    apply : function () {

        if(!this.validation()) return;

        var paramObject = {};
        var saleMethCd = $('input[name=sale-type]:checked').val();

        // 예약상품 => 일반상품
        if(saleMethCd==='10'){
            paramObject.rsvStrtDtm = '';
            paramObject.rsvEndDtm = '';
            paramObject.fwdidcPrarDy = '';
            paramObject.rsvEndAfProcMethCd = '';
            paramObject.rsvStopCausCd = $('input[name=stop-code]:checked').val();
        }else{
            // 일반상품 => 예약상품
            paramObject.rsvStrtDtm = replaceCalendarString($('#rsv-strt-dtm').val());
            paramObject.rsvEndDtm = replaceCalendarString($('#rsv-end-dtm').val());
            paramObject.fwdidcPrarDy = replaceCalendarString($('#fwdidcPrarDy').val());
            paramObject.rsvEndAfProcMethCd = $('input[name=after-method]:checked').val();
            paramObject.rsvStopCausCd = '';
        }

        paramObject.goodsNoList = goodsNoList;
        paramObject.saleMethCd = saleMethCd;

        var callback = function(e){
            if(e.succeeded){
                window.postMessage('succeeded', _baseUrl);
                window.close();
            }
        }

        common.Ajax.sendJSONRequest("POST"
            , _baseUrl + "goods/ReservationGoodsMgmt.modifyGoodsSaleMethod.do"
            , paramObject
            , callback
            , true
            , null
            , false
        );
    },
    validation : function(){
        // 변경할 판매 방식
        var saleMethCd  = $('input[name=sale-type]:checked').val();

        // 예약상품 => 일반상품
        if(saleMethCd === '10'){
            if($('input[name=stop-code]:checked').val() === undefined){
                alert(alertMessage.noStopCodeMsg);
                return false;
            }
        // 일반상품 => 예약상품
        }else{
            if($('#rsv-strt-dtm').val() === '' || $('#rsv-end-dtm').val() === ''){
                alert(alertMessage.noRsvDtmMsg);
                return false;
            }

            if($('#fwdidcPrarDy').val() === ''){
                alert(alertMessage.noFwdidcPrarDyMsg);
                return false;
            }

            if($('#rsv-end-dtm').val().substring(0,10) >= $('#fwdidcPrarDy').val()){
                alert(alertMessage.fwdidcPrarDyImpossMsg);
                return false;
            }

            if($('input[name=after-method]:checked').val() === undefined){
                alert(alertMessage.noAfterMethodMsg);
                return false;
            }
        }
        return true;
    }
};
