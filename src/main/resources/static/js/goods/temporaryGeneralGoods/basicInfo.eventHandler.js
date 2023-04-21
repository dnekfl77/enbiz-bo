var basicInfoMsg = x2coMessage.getMessage({
    beforeChangeStdCtgMsg    : 'generalGoods.basicInfo.alert.msg.beforeChangeStdCtgMsg'
    ,beforeResetStdCtgMsg     : 'generalGoods.basicInfo.alert.msg.beforeResetStdCtgMsg'
    ,invalidRsvStartDateMsg   : 'generalGoods.basicInfo.alert.msg.invalidRsvStartDateMsg'
    ,invalidRsvEndDateMsg     : 'generalGoods.basicInfo.alert.msg.invalidRsvEndDateMsg'
    ,invalidFwdidcPrarDateMsg : 'generalGoods.basicInfo.alert.msg.invalidFwdidcPrarDateMsg'
    ,noGoodsTypCdMsg          : 'generalGoods.basicInfo.alert.msg.noGoodsTypCdMsg'
    ,noSaleMethCdMsg          : 'generalGoods.basicInfo.alert.msg.noSaleMethCdMsg'
    ,noEntrNoMsg              : 'generalGoods.basicInfo.alert.msg.noEntrNoMsg'
    ,noStdCtgNoMsg            : 'generalGoods.basicInfo.alert.msg.noStdCtgNoMsg'
    ,noRsvDtmMsg              : 'generalGoods.basicInfo.alert.msg.noRsvDtmMsg'
    ,noFwdidcPrarDyMsg        : 'generalGoods.basicInfo.alert.msg.noFwdidcPrarDyMsg'
});

$.namespace("basicInfo.eventhandler")
basicInfo.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 상품유형 변경시
        $('#basicInfo :radio[name=goodsTypCd]').change( function () {

            var goodsTypeCd = $(this).val();

            // 사은품(20)
            if ( goodsTypeCd === '20' ) {

                // 판매방식 "일반판매(10)" 세팅, 수정불가
                $('#basicInfo').find("[name=saleMethCd]").attr('disabled', true);
                $('#basicInfo :radio[name=saleMethCd][value="10"]').prop('checked', true);
                $('#basicInfo :radio[name=saleMethCd][value="10"]').trigger('change');

            // 일반상품 (10)
            } else {
                $('#basicInfo :radio[name=saleMethCd]').attr('disabled', false);
            }

            // 상품정보 > 전시매장노출여부,가격비교노출여부,검색키워드노출여부 활성화 여부 변경
            goodsInfo.eventhandler.setGoodsInfoData( goodsTypeCd );

            // 가격정보 > 공급가, 정상사, 판매가 입력 최솟값 변경 ( 사은품 : 0원, 일반상품 : 100원 )
            priceInfo.eventhandler.setPriceInfoData( goodsTypeCd );

            // 배송정보 > 배송상품구분값 변경, 배송/반품/교환 여부 변경
            deliveryInfo.eventhandler.setDeliveryInfoData.setDeliGoodsGbCd( goodsTypeCd );

            // 판매옵션 > 구매수량제한여부, 옵션여부 변경
            itemListGrid.eventhandler.setSaleInfoData.setOptnBuyQtyLmtYn( goodsTypeCd );


        });

        // 판매방식 "예약판매(20)" 선택시 -> 예약주문가능기간/예액상품출고지시일 노출(default : 숨김)
        $('#basicInfo :radio[name=saleMethCd]').change( function () {
            var saleMethCd = $(this).val();
            if ( saleMethCd === '20' ) {
                $('#section_rsvDtm').show();
            } else {
                $('#section_rsvDtm').hide();

                // 예약주문가능기간, 예약상품출고지시일 초기화
                $('#rsvStrtDtm, #rsvEndDtm, #fwdidcPrarDy').val('');
                $('#fwdidcPrarDyCheckBox').prop('checked', true);
                $('#rsvEndAfProcMethCd').val('01');
            }
        });

        // 협력사 검색 버튼 클릭
        $('#btn_entr_popup_call').bind( 'click', function () {
            that.callEntrPopup();
        });

        // 협력사 검색 결과 초기화 버튼 클릭
        $('#btn_entr_popup_reset').bind( 'click', function () {

            $('#entrNo').val('');
            $('#entrNm').val('');

            // 배송정보 > '배송비/반품비' 셀렉트박스 초기화
            deliveryInfo.eventhandler.setDeliveryInfoData.setDeliPolcNo( '' );

            // 판매옵션 > 협력사번호 초기화
            itemListGrid.eventhandler.setSaleInfoData.setEntrNo('');
        });

        // 표준분류 검색 버튼 클릭
        $('#btn_stdctg_popup_call').click( function () {

            if(!confirm(basicInfoMsg.beforeChangeStdCtgMsg)) return;
            that.callStdCtgPopup();
        });

        // 표준분류 검색 결과 초기화 버튼 클릭
        $('#btn_stdctg_popup_reset').click( function () {

            if(!confirm(basicInfoMsg.beforeResetStdCtgMsg)) return;

            $('#stdCtgHierarchy').val('');
            $('#stdCtgNo').val('');
            $('#mdId').val('');

            // 상품고시품목정보 > 상품고시품목코드, 안전인증대상여부 초기화
            announcementInfo.eventhandler.setAnnoucementInfoData({goodsNotiLisartCd : '', safeCertiNeedYn : 'N'});

            // 부가정보 > 전시카테고리 목록 초기화
            dispCtgGrid.eventhandler.setDispCtgGridData( '' );

        });

        // 캘린더 호출
        $('#basicInfo [name=btn_callCalender]').click( function () {

            var option = $(this).attr("data-option");
            var pin = {};

            // 예약주문가능기간
            if ( option === '01') {

                var date1 = $('#rsvStrtDtm').val();
                var ymd1 = date1.split(/ /);
                var hour1 = "";
                var min1 = "";
                if (ymd1.length == 2) {
                    hour1 = ymd1[1].split(/:/)[0];
                    min1 = ymd1[1].split(/:/)[1];
                }
                var date2 = $('#rsvEndDtm').val();
                var ymd2 = date2.split(/ /);
                var hour2 = "";
                var min2 = "";
                if (ymd2.length == 2) {
                    hour2 = ymd2[1].split(/:/)[0];
                    min2 = ymd2[1].split(/:/)[1];
                }

                pin = {
                    format: "yyyy-MM-dd HH:mm",
                    yyyymmdd1: date1,
                    hour1: hour1,
                    min1: min1,
                    yyyymmdd2: date2,
                    hour2: hour2,
                    min2: min2,
                    type: "A",
                    fn: function ( pin ) {
                        var rsvStartDtm = pin.yyyymmdd1;
                        var rsvEndDtm = pin.yyyymmdd2;
                        var fwdidcPrarDy = $('#fwdidcPrarDy').val();
                        var todayDtm = getTodayDate();

                        if ( rsvStartDtm <= todayDtm ){
                            alert(basicInfoMsg.invalidRsvStartDateMsg);
                            return;
                        }

                        //예약주문종료일(rsvEndDtm) < 예액상품출고지시일(fwdidcPrarDy) 확인
                        if ( fwdidcPrarDy !== '' && rsvEndDtm >= fwdidcPrarDy ){
                            alert(basicInfoMsg.invalidRsvEndDateMsg);
                            return;
                        }

                        $('#rsvStrtDtm').val(`${pin.yyyymmdd1} ${pin.hour1}:${pin.min1}:00`);
                        $('#rsvEndDtm').val(`${pin.yyyymmdd2} ${pin.hour2}:${pin.min2}:59`);

                    }
                };

            // 예약상품출고지시일
            } else if ( option === '02') {
                pin = {
                    type : 'C',
                    format : 'yyyy-MM-dd',
                    yyyymmdd : $('#fwdidcPrarDy').val(),
                    fn : function ( pin ) {
                        var rsvEndDtm = $('#rsvEndDtm').val();
                        var fwdidcPrarDy = pin.yyyymmdd;

                        //예약주문종료일(rsvEndDtm) < 예액상품출고지시일(fwdidcPrarDy) 확인
                        if( rsvEndDtm >= fwdidcPrarDy ){
                            alert(basicInfoMsg.invalidFwdidcPrarDateMsg);
                            return;
                        }

                        $('#fwdidcPrarDy').val(fwdidcPrarDy);
                    }
                };
            }
            showCalendar(pin);
        });

        // 기간종료 후 판매방식 체크 ( checked : 01 일반판매, unchecked : 02 품절 )
        $('#fwdidcPrarDyCheckBox').change( function () {

            $('#rsvEndAfProcMethCd').val( (this.checked) ? '01' : '02' );

        });
    }
    // 협력사 조회 팝업 호출
    ,callEntrPopup : function () {

        var that = this;

        var pin = {
            argSelectType: '1'      // 선택구분   ( 단건선택 : 1, 다건선택 : N )
            , argEntrGbCd: ''       // 협력사구분  ( 상품공급업자 : 10, 제휴사업자 : 20 )
            , argTrdStatCd: '20'    // 거래상태   ( 거래대기 : 10, 거래중 : 20, 거래종료 : 30 )
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
            , winName: 'etEntrListPopup'
            , title: '협력사조회'
            , _title: '협력사조회'
            , left: 10
            , top: 10
            , width: 741
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function ( e ) {
            var returnValue = JSON.parse(e.data);
            var entrNo = returnValue[0].entrNo;
            var entrNm = returnValue[0].entrNm;

            $('#entrNo').val(entrNo);
            $('#entrNm').val(entrNm);

            // 배송정보 > '배송비/반품비' 셀렉트박스 세팅
            deliveryInfo.eventhandler.setDeliveryInfoData.setDeliPolcNo( entrNo );

            // 판매옵션 > 협력사번호 세팅
            itemListGrid.eventhandler.setSaleInfoData.setEntrNo( entrNo );
        });

    }
    // 표준분류 조회 팝업 호출
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
            $('#mdId').val(returnValue.mdId);

            // 상품고시품목정보 > 상품고시품목코드, 안전인증대상여부 세팅
            announcementInfo.eventhandler.setAnnoucementInfoData({goodsNotiLisartCd : returnValue.goodsNotiLisartCd,
                                                                    safeCertiNeedYn : returnValue.safeCertiNeedYn });

            // 부가정보 > 전시카테고리 목록 조회
            dispCtgGrid.eventhandler.setDispCtgGridData( returnValue.stdCtgNo );

        });
    }
    // 기본정보 초기화
    ,resetBasicInfo : function ( ) {

        // Form 초기화
        $('#basicInfo')[0].reset();

        // Form 초기화 안되는 항목 수동 초기화
        $('input[type=hidden][name=stdCtgNo]').val('');

        $('#basicInfo :radio[name=goodsTypCd][value="10"]').trigger('change');
        $('#basicInfo :radio[name=saleMethCd][value="10"]').trigger('change');

    }
    // 기본정보 유효성 체크
    ,validationCheck : function () {

        // 상품유형을 선택하지 않은경우
        if ( $('#basicInfo :radio[name=goodsTypCd]:checked').val() === undefined ) {
            alert(basicInfoMsg.noGoodsTypCdMsg);
            $('#basicInfo :radio[name=goodsTypCd]').focus();
            return false;
        }

        // 판매방식을 선택하지 않은경우
        if ( $('#basicInfo :radio[name=saleMethCd]:checked').val() === undefined ) {
            alert(basicInfoMsg.noSaleMethCdMsg);
            $('#basicInfo :radio[name=saleMethCd]').focus();
            return false;
        }

        // 협력사 번호가 없는경우
        if ( $('#basicInfo input[name=entrNo]').val() === '' ) {
            alert(basicInfoMsg.noEntrNoMsg);
            $('#basicInfo input[name=entrNo]').focus();
            return false;
        }

        // 표준분류 카테고리 번호가 없는 경우
        if ( $('#basicInfo input[name=stdCtgNo]').val() === '' ) {
            alert(basicInfoMsg.noStdCtgNoMsg);
            $('#stdCtgHierarchy').focus();
            return false;
        }

        // 판매방식이 '예약판매(20)'인 경우
        if ( $('#basicInfo :radio[name=saleMethCd]:checked').val() === '20' ) {

            // 예약주문가능기간을 선택하지 않은 경우
            if( $('#basicInfo input[name=rsvStrtDtm]').val() === '' ||
                $('#basicInfo input[name=rsvEndDtm]').val() === '' ) {
                alert(basicInfoMsg.noRsvDtmMsg);
                $('#basicInfo input[name=rsvStrtDtm]').focus();
                return false;
            }

            // 예약상품출고지시일을 선택하지 않은 경우
            if( $('#basicInfo input[name=fwdidcPrarDy]').val() === '' ) {
                alert(basicInfoMsg.noFwdidcPrarDyMsg);
                $('#basicInfo input[name=fwdidcPrarDy]').focus();
                return false;
            }
        }
        return true;
    }
    // 등록 > 기본정보 조회
    ,getBasicInfo : function () {

        var basicInfoForm = $('#basicInfo');
        var disabled = basicInfoForm.find(':radio:disabled').prop('disabled',false);
        var basicInfoObj = basicInfoForm.serializeObject();
        disabled.prop('disabled',true);

        // 판매방식이 예약판매일 경우
        if( basicInfoObj.saleMethCd === '20' ){
            basicInfoObj.fwdidcPrarDy = replaceCalendarStringWithLength(basicInfoObj.fwdidcPrarDy);
        }

        return basicInfoObj;

    }
    // 상세 > 기본정보 세팅
    ,setBasicInfo : function ( basicInfoData ){

        // 임시상품번호 세팅
        $('#pregGoodsNo').val(basicInfoData.pregGoodsNo);

        // 기간계상품번호 세팅
        var lgcGoodsNo = convertNullToEmptyString(basicInfoData.lgcGoodsNo);
        $('#lgcGoodsNo').val(lgcGoodsNo);
        //$('#lgcGoodsNo_byte').text(byteCheck(lgcGoodsNo));

        // 상품유형 세팅(수정불가)
        $('#basicInfo').find("[name=goodsTypCd]").attr('disabled', true);
        $('#basicInfo :radio[name=goodsTypCd][value='+basicInfoData.goodsTypCd+']').prop('checked', true);

        // 판매방식 세팅(수정불가)
        $('#basicInfo').find("[name=saleMethCd]").attr('disabled', true);
        $('#basicInfo :radio[name=saleMethCd][value='+basicInfoData.saleMethCd+']').prop('checked', true);

        // 협력사번호 세팅
        $('#entrNo').val(basicInfoData.entrNo);
        $('#entrNm').val(basicInfoData.entrNm);

        // 협력사 검색 & 초기화 버튼 이벤트 제거
        $('#btn_entr_popup_call').addClass('disabled').unbind('click');
        $('#btn_entr_popup_reset').addClass('disabled').unbind('click');

        // 표준분류 세팅
        $('#stdCtgNo').val(basicInfoData.stdCtgNo);
        $('#stdCtgHierarchy').val(basicInfoData.stdCtgHierarchy);

        // 담당MD 세팅
        $('#mdId').val(convertNullToEmptyString(basicInfoData.mdId));

        // 판매방식 "예약판매(20)"인 경우
        var prPregRsvSaleHist = basicInfoData.prPregRsvSaleHist;
        if ( basicInfoData.saleMethCd === '20' && prPregRsvSaleHist !== null ) {

            // 예약주문가능기간&예액상품출고지시일 세팅
            $('#rsvStrtDtm').val(prPregRsvSaleHist.rsvStrtDtm);
            $('#rsvEndDtm').val(prPregRsvSaleHist.rsvEndDtm);
            $('#fwdidcPrarDy').val(prPregRsvSaleHist.fwdidcPrarDy);

            // 예약 종료 후 판매방식 세팅
            if ( prPregRsvSaleHist.rsvEndAfProcMethCd === '02' ) {
                $('#fwdidcPrarDyCheckBox').prop('checked', false);
                $('#rsvEndAfProcMethCd').val('02');
            }

            // 예약판매 영역 노출
            $('#section_rsvDtm').show();

        }
    }
}