var detailBasicInfoMsg = x2coMessage.getMessage({
    invalidFwdidcPrarDateMsg : 'generalGoods.basicInfo.alert.msg.invalidFwdidcPrarDateMsg'
    ,noFwdidcPrarDyMsg : 'generalGoods.basicInfo.alert.msg.noFwdidcPrarDyMsg'
    ,noRsvStopCausCdMsg : 'generalGoods.basicInfo.alert.msg.noRsvStopCausCdMsg'
});

$.namespace("detailBasicInfo.eventhandler")
detailBasicInfo.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
    }
    // 이벤트
    ,bindButtonEvent : function () {

        // 예약이력 팝업 호출
        $('#btn_call_rsv_sale_hist_popup').on( 'click', function () {

            var pin = { goodsNo : $('#goodsNo').val() };
            var POP_DATA = {
                url: _baseUrl + 'goods/ReservationGoodsMgmt.reservationGoodsHistoryView.do'
                , winName: 'reservationSaleGoodsChange'
                , title: '예약상품이력조회'
                , _title: '예약상품이력조회'
                , left: 20
                , top: 20
                , width: 900
                , height: 610
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA);

        });

        // 예약상품출고지시일 날짜 변경
        $('#basicInfo [name=btn_callCalender]').on( 'click', function () {

            showCalendar({
                type : 'C',
                format : 'yyyy-MM-dd',
                yyyymmdd : $('#fwdidcPrarDy').val(),
                fn : function ( pin ) {
                    var rsvEndDtm = $('#rsvEndDtm').val();
                    var fwdidcPrarDy = pin.yyyymmdd;

                    //예약주문종료일(rsvEndDtm) < 예액상품출고지시일(fwdidcPrarDy) 확인
                    if( rsvEndDtm >= fwdidcPrarDy ){
                        alert(detailBasicInfoMsg.invalidFwdidcPrarDateMsg);
                        return;
                    }

                    $('#fwdidcPrarDy').val(fwdidcPrarDy);
                }
            });
        });

        // 기간종료 후 판매방식 체크 ( checked : 01 일반판매, unchecked : 02 품절 )
        $('#fwdidcPrarDyCheckBox').change( function () {
            $('#rsvEndAfProcMethCd').val( (this.checked) ? '01' : '02' );
        });

        // 예약중단여부 변경
        $('#basicInfo [name=rsvStopYn]').change( function () {

            if ( $(this).val() === 'N' ) { // 예약중
                $('#section_rsv').find('td:nth-child(2)').attr("colspan", 3);
                $('#rsvStopCausCd').val('');
                $('.section_rsv_stop').hide();
            } else { // 예약중단
                $('#section_rsv').find('td:nth-child(2)').attr("colspan", 1);
                $('#rsvStopCausCd').val('');
                $('.section_rsv_stop').show();
            }
        });
    }
    // 기본정보 초기화
    ,resetBasicInfo : function ( ) {

        // Form 초기화
        $('#basicInfo')[0].reset();

        // Form 초기화 안되는 항목 수동 초기화
        $('#rsvEndAfProcMethCd').val('01');
        $('#rsvStopYn').val('');

        $('#section_rsv').hide();
        $('#section_rsv').find('td:nth-child(2)').attr("colspan", 3);

        $('#section_rsv_ing').hide();
        $('.section_rsv_stop').hide();

    }
    // 기본정보 유효성 체크
    ,validationCheck : function () {

        // 판매방식이 '예약판매(20)'인 경우
        if ( $('#basicInfo :radio[name=saleMethCd]:checked').val() === '20' ) {

            var preRsvStopYn = $('#rsvStopYn').val(); // 조회값
            var postRsvStopYn = $('#basicInfo :radio[name=rsvStopYn]:checked').val(); // 선택값

            if( postRsvStopYn === 'N' ) { // 예약중

                // 예약상품출고지시일을 선택하지 않은 경우
                if( $('#fwdidcPrarDy').val() === '' ) {
                    alert(detailBasicInfoMsg.noFwdidcPrarDyMsg);
                    $('#fwdidcPrarDy').focus();
                    return false;
                }

            } else { // 예약중단

                // 예약중 -> 예약중단
                if ( preRsvStopYn === 'N' ) {

                    // 예약중단사유를 선택하지 않은경우
                    if ( $('#rsvStopCausCd').val() === '' ) {
                        alert(detailBasicInfoMsg.noRsvStopCausCdMsg);
                        $('#rsvStopCausCd').focus();
                        return false;
                    }
                }
            }
        }
        return true;
    }
    // 기본정보 조회
    ,getBasicInfo : function () {

        var basicInfoObj = {
            goodsNo : $('#goodsNo').val(),                                      // 상품번호
            lgcGoodsNo : $('#lgcGoodsNo').val(),                                // 기간계 상품번호
            saleMethCd : $('#basicInfo :radio[name=saleMethCd]:checked').val(), // 판매방식
            rsvSaleInfo : { rsvStopYn : '' }
        }

        if ( !(basicInfoObj.saleMethCd === '20') ) return basicInfoObj;

        var preRsvStopYn = $('#rsvStopYn').val();                                   // 조회값
        var postRsvStopYn = $('#basicInfo :radio[name=rsvStopYn]:checked').val();   // 선택값

        if( postRsvStopYn === 'N' ) {
            var rsvStrtDtm = $('#rsvStrtDtm').val();
            if ( rsvStrtDtm > getTodayDtm().substr(0,16) ) { // 예약중 && 수정가능기간
                basicInfoObj.rsvSaleInfo.rsvStopYn = 'N';
                basicInfoObj.rsvSaleInfo.fwdidcPrarDy = replaceCalendarStringWithLength($('#fwdidcPrarDy').val());  // 예약상품출고지시일
                basicInfoObj.rsvSaleInfo.rsvEndAfProcMethCd = $('#rsvEndAfProcMethCd').val();                       // 예약종료 후 판매방식
            }
        } else { // 예약중단

            // 예약중 -> 예약중단
            if ( preRsvStopYn === 'N' ) {
                basicInfoObj.rsvSaleInfo.rsvStopYn = 'Y';
                basicInfoObj.rsvSaleInfo.rsvStopCausCd = $('#rsvStopCausCd').val(); //예약중단사유코드
            }
        }

        return basicInfoObj;

    }
    // 기본정보 세팅
    ,setBasicInfo : function ( basicInfoData ){

        var prGoodsBase = basicInfoData.prGoodsBase;

        // 상품번호 세팅
        $('#goodsNo').val(prGoodsBase.goodsNo);

        // 기간계상품번호 세팅
        var lgcGoodsNo = convertNullToEmptyString(prGoodsBase.lgcGoodsNo);
        $('#lgcGoodsNo').val(lgcGoodsNo);
        $('#lgcGoodsNo_byte').text(byteCheck(lgcGoodsNo));

        // 상품유형 세팅(수정불가)
        $('#basicInfo').find("[name=goodsTypCd]").attr('disabled', true);
        $('#basicInfo :radio[name=goodsTypCd][value='+prGoodsBase.goodsTypCd+']').prop('checked', true);

        // 판매방식 세팅(수정불가)
        $('#basicInfo').find("[name=saleMethCd]").attr('disabled', true);
        $('#basicInfo :radio[name=saleMethCd][value='+prGoodsBase.saleMethCd+']').prop('checked', true);

        // 협력사번호 세팅
        $('#entrNo').val(prGoodsBase.entrNo);
        $('#entrNm').val(prGoodsBase.entrNm);

        // 표준분류 세팅
        $('#stdCtgHierarchy').val(prGoodsBase.stdCtgHierarchy);

        // 담당MD 세팅
        $('#mdId').val(convertNullToEmptyString(prGoodsBase.mdId));

        // 판매방식 "예약판매(20)"인 경우
        var prRsvSaleHist = basicInfoData.prRsvSaleHist;
        if ( prGoodsBase.saleMethCd === '20') {

            // 예약중단
            if ( prRsvSaleHist === null ) {
                $('#rsvStopYn').val('Y');
                $('#basicInfo').find("[name=rsvStopYn]").attr('disabled', true); // 수정불가
                $('#basicInfo :radio[name=rsvStopYn][value=Y]').prop('checked', true);
                $('#section_rsv').show();
            // 예약중
            } else {
                $('#rsvStopYn').val(prRsvSaleHist.rsvStopYn);
                $('#basicInfo :radio[name=rsvStopYn][value='+prRsvSaleHist.rsvStopYn+']').prop('checked', true);
                $('#section_rsv').show();

                // 예약주문가능기간 & 예액상품출고지시일 세팅
                $('#rsvStrtDtm').val(prRsvSaleHist.rsvStrtDtm);
                $('#rsvEndDtm').val(prRsvSaleHist.rsvEndDtm);
                $('#fwdidcPrarDy').val(prRsvSaleHist.fwdidcPrarDy);

                // 예약 종료 후 판매방식 세팅
                if ( prRsvSaleHist.rsvEndAfProcMethCd === '02' ) {
                    $('#fwdidcPrarDyCheckBox').prop('checked', false);
                    $('#rsvEndAfProcMethCd').val('02');
                }

                $('#section_rsv_ing').show();

                // 예약주문가능기간이 현재날짜 기준 이미 시작된 경우, 수정 불가
                if ( prRsvSaleHist.rsvStrtDtm < getTodayDtm().substr(0,16) ) {
                    $('#basicInfo [name=btn_callCalender]').unbind('click');
                    $('#fwdidcPrarDyCheckBox').prop('disabled', true);
                }
            }
        }
    }
}