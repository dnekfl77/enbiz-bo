var detailGoodsInfoMsg = x2coMessage.getMessage({
    invalidSaleEndDateMsg : 'generalGoods.goodsInfo.alert.msg.invalidSaleEndDateMsg'
    ,cantChangeSaleStatCdWithSaleEnd : 'generalGoods.goodsInfo.alert.msg.cantChangeSaleStatCdWithSaleEnd'
    ,cantChangeSaleStatCdToSoldOutMsg : 'generalGoods.goodsInfo.alert.msg.cantChangeSaleStatCdToSoldOutMsg'
    ,cantChangeSaleStatCdToSalesMsg : 'generalGoods.goodsInfo.alert.msg.cantChangeSaleStatCdToSalesMsg'
    ,itemSaleStatCdCanBeChangeMsg : 'generalGoods.goodsInfo.alert.msg.itemSaleStatCdCanBeChangeMsg'
    ,noGoodsNmMsg : 'generalGoods.goodsInfo.alert.msg.noGoodsNmMsg'
    ,noShrtGoodsNmMsg : 'generalGoods.goodsInfo.alert.msg.noShrtGoodsNmMsg'
    ,noSaleStatCdMsg : 'generalGoods.goodsInfo.alert.msg.noSaleStatCdMsg'
    ,noBrandNoMsg : 'generalGoods.goodsInfo.alert.msg.noBrandNoMsg'
    ,noModelNmMsg : 'generalGoods.goodsInfo.alert.msg.noModelNmMsg'
    ,nohomeNmMsg : 'generalGoods.goodsInfo.alert.msg.nohomeNmMsg'
    ,noMfcoNmMsg : 'generalGoods.goodsInfo.alert.msg.noMfcoNmMsg'
    ,noSalemnNmMsg : 'generalGoods.goodsInfo.alert.msg.noSalemnNmMsg'
    ,noBuyrAgeLmtCdMsg : 'generalGoods.goodsInfo.alert.msg.noBuyrAgeLmtCdMsg'
    ,noSaleEndDtmMsg : 'generalGoods.goodsInfo.alert.msg.noSaleEndDtmMsg'
    ,noDispYnMsg : 'generalGoods.goodsInfo.alert.msg.noDispYnMsg'
    ,noPrcCompaExpYnMsg : 'generalGoods.goodsInfo.alert.msg.noPrcCompaExpYnMsg'
    ,noSchPsbYnMsg : 'generalGoods.goodsInfo.alert.msg.noSchPsbYnMsg'
    ,noSchKwdNmMsg : 'generalGoods.goodsInfo.alert.msg.noSchKwdNmMsg'
});

$.namespace('detailGoodsInfo.eventhandler');
detailGoodsInfo.eventhandler = {
    // 초기화
    init : function () {
        if ( pageType === 'R') $('#saleStatCd').prop('disabled', true);
        this.bindButtonEvent();
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 판매상태 변경
        var preSaleStatCd;
        $('#saleStatCd').on( 'click' , function () {
            preSaleStatCd = this.value;
        }).change( function () {
            if ( !that.checkSaleStatCode( preSaleStatCd, this.value ) ) {
                $('#saleStatCd').val(preSaleStatCd); // 변경불가한 경우 원복
            }
        });

        // 브랜드 검색 버튼 클릭
        $('#btn_brand_popup_call').on( 'click', function () {
            var pin = {
                argSelectType: '1' // 선택구분   ( 단건선택 : 1, 다건선택 : N )
            };
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
            popCommon(pin, POP_DATA, function ( e ) {
                var returnValue = JSON.parse(e.data);
                $('#brandNo').val(returnValue[0].brandNo);
                $('#brandNm').val(returnValue[0].brandNm);
            });
        });

        // 브랜드 검색 결과 초기화 버튼 클릭
        $('#btn_brand_popup_reset').on( 'click', function () {
            $('#brandNo').val('');
            $('#brandNm').val('');
        });

        // 판매종료일자 캘린더 호출
        $('#goodsInfo [name=btn_callCalender]').on( 'click', function () {

            showCalendar({
                type : 'C',
                format : 'yyyy-MM-dd',
                yyyymmdd : $('#saleEndDtm').val(),
                fn : function ( pin ) {
                    var saleStrDtm = $('#saleStrDtm').val();
                    var saleEndDtm = pin.yyyymmdd;

                    // 판매시작일 이전날짜 선택 불가
                    if ( saleEndDtm <= saleStrDtm ){
                        alert(detailGoodsInfoMsg.invalidSaleEndDateMsg);
                        return;
                    }

                    $('#saleEndDtm').val(saleEndDtm);
                }
            });
        });
    }
    // 판매상태 변경가능여부 확인 ( 변경전 판매상태, 변경후 판매상태 )
    ,checkSaleStatCode : function ( preSaleStatCd, postSaleStatCd ) {

        var originSaleStatCd = _saleStatCd; // 초기 판매상태

        if ( originSaleStatCd === '40' ) { // '판매종료'일 경우 변경불가
            alert(detailGoodsInfoMsg.cantChangeSaleStatCdWithSaleEnd);
            return false;
        }

        if ( preSaleStatCd === '40' ) {
            // 단품의 판매상태 원복, 수정 가능하도록 처리
            detailItemListGrid.eventhandler.setItemSaleStateCode('');
        } else if ( preSaleStatCd === '20') {
            if ( detailItemListGrid.eventhandler.checkItemSaleStateCode('20')) {
                detailItemListGrid.eventhandler.setItemSaleStateCode('');
            }
        }

        var isChangable = true;
        switch ( originSaleStatCd ) {
            case '10' : // 판매중
                switch ( postSaleStatCd ) {
                    case '10' : break;
                    case '20' : alert(detailGoodsInfoMsg.cantChangeSaleStatCdToSoldOutMsg); isChangable = false; break;
                    case '30' : break;
                    case '40' :
                        if(confirm(detailGoodsInfoMsg.itemSaleStatCdCanBeChangeMsg)) detailItemListGrid.eventhandler.setItemSaleStateCode('40');  // 단품의 모든 판매상태를 판매종료로 변경
                        break;
                }
                break;
            case '20' : // 품절
                switch ( postSaleStatCd ) {
                    case '10' :
                        // 단품의 모든 판매상태가 품절인 경우 수정 불가
                        if ( detailItemListGrid.eventhandler.checkItemSaleStateCode('20') ) {
                            alert(detailGoodsInfoMsg.cantChangeSaleStatCdToSalesMsg);
                            isChangable = false;
                        }
                        break;
                    case '20' : break;
                    case '30' : break;
                    case '40' :
                        if(confirm(detailGoodsInfoMsg.itemSaleStatCdCanBeChangeMsg)) detailItemListGrid.eventhandler.setItemSaleStateCode('40');  // 단품의 모든 판매상태를 판매종료로 변경
                        break;
                }
                break;

            case '30' : // 일시중단
                switch ( postSaleStatCd ) {
                    case '10' : break;
                    case '20' : break;
                    case '30' : break;
                    case '40' :
                        if(confirm(detailGoodsInfoMsg.itemSaleStatCdCanBeChangeMsg)) detailItemListGrid.eventhandler.setItemSaleStateCode('40');  // 단품의 모든 판매상태를 판매종료로 변경
                        break;
                }
                break;
        }

        return isChangable;
    }
    // 판매상태 변경 > 단품판매상태가 모든 품절 또는 판매종료인 경우 호출
    ,setGoodsSaleStateCode : function ( saleStatCd ) {
        $('#saleStatCd').val(saleStatCd);
    }
    // 상품정보 초기화
    ,resetGoodsInfo : function ( ) {

        // Form 초기화
        $('#goodsInfo')[0].reset();

        // Form 초기화 안되는 항목 수동 초기화
        $('input[type=hidden][name=brandNo]').val('');
        $('#goodsInfo').find(":radio").attr('disabled', false);

    }
    // 상품정보 유효성 체크
    ,validationCheck : function () {

        // 상품명을 입력하지 않은 경우
        if ( $('#goodsInfo input[name=goodsNm]').val() === '' ) {
            alert(detailGoodsInfoMsg.noGoodsNmMsg);
            $('#goodsInfo input[name=goodsNm]').focus();
            return false;
        }

        // 단축 온라인 상품명을 입력하지 않은경우
        if ( $('#goodsInfo input[name=shrtGoodsNm]').val() === '' ) {
            alert(detailGoodsInfoMsg.noShrtGoodsNmMsg);
            $('#goodsInfo input[name=shrtGoodsNm]').focus();
            return false;
        }

        // 판매상태를 선택하지 않은경우
        if ( $('#goodsInfo [name=saleStatCd]').val() === '' ) {
            alert(detailGoodsInfoMsg.noSaleStatCdMsg);
            $('#goodsInfo [name=saleStatCd]').focus();
            return false;
        }

        // 브랜드번호가 없는 경우
        if ( $('#goodsInfo input[name=brandNo]').val() === '' ) {
            alert(detailGoodsInfoMsg.noBrandNoMsg);
            $('#brandNm').focus();
            return false;
        }

        // 모델명을 입력하지 않은경우
        if ( $('#goodsInfo input[name=modlNm]').val() === '' ) {
            alert(detailGoodsInfoMsg.noModelNmMsg);
            $('#goodsInfo input[name=modlNm]').focus();
            return false;
        }

        // 원산지를 입력하지 않은경우
        if ( $('#goodsInfo input[name=homeNm]').val() === '' ) {
            alert(detailGoodsInfoMsg.nohomeNmMsg);
            $('#goodsInfo input[name=homeNm]').focus();
            return false;
        }

        // 제조사를 입력하지 않은경우
        if ( $('#goodsInfo input[name=mfcoNm]').val() === '' ) {
            alert(detailGoodsInfoMsg.noMfcoNmMsg);
            $('#goodsInfo input[name=mfcoNm]').focus();
            return false;
        }

        // 판매자를 입력하지 않은경우
        if ( $('#goodsInfo input[name=salemnNm]').val() === '' ) {
            alert(detailGoodsInfoMsg.noSalemnNmMsg);
            $('#goodsInfo input[name=salemnNm]').focus();
            return false;
        }

        // 구입자 나이제한을 선택하지 않은경우
        if( $('#goodsInfo [name=buyrAgeLmtCd]').val() === '' ) {
            alert(detailGoodsInfoMsg.noBuyrAgeLmtCdMsg);
            $('#goodsInfo [name=buyrAgeLmtCd]').focus();
            return false;
        }

        // 판매종료일자를 선택하지 않은경우
        if( $('#goodsInfo input[name=saleEndDtm]').val() === '' ) {
            alert(detailGoodsInfoMsg.noSaleEndDtmMsg);
            $('#goodsInfo input[name=saleEndDtm]').focus();
            return false;
        }

        // 전시매장 노출여부를 선택하지 않은경우
        if ( $('#goodsInfo :radio[name=dispYn]:checked').val() === undefined ) {
            alert(detailGoodsInfoMsg.noDispYnMsg);
            $('#goodsInfo :radio[name=dispYn]').focus();
            return false;
        }

        // 가격비교 노출여부를 선택하지 않은경우
        if ( $('#goodsInfo :radio[name=prcCompaExpYn]:checked').val() === undefined ) {
            alert(detailGoodsInfoMsg.noPrcCompaExpYnMsg);
            $('#goodsInfo :radio[name=prcCompaExpYn]').focus();
            return false;
        }

        // 검색키워드 노출여부를 선택하지 않은경우
        if ( $('#goodsInfo :radio[name=schPsbYn]:checked').val() === undefined ) {
            alert(detailGoodsInfoMsg.noSchPsbYnMsg);
            $('#goodsInfo :radio[name=schPsbYn]').focus();
            return false;
        }

        // 검색키워드 노출여부가 '노출'인 경우
        if ( $('#goodsInfo :radio[name=schPsbYn]:checked').val() === 'Y' ) {

            // 검색키워드를 입력하지 않은 경우
            if ( $('#goodsInfo input[name=schKwd1Nm]').val() === '' ) {
                alert(detailGoodsInfoMsg.noSchKwdNmMsg);
                $('#goodsInfo :radio[name=schKwd1Nm]').focus();
                return;
            }
            if ( $('#goodsInfo input[name=schKwd2Nm]').val() === '' ) {
                alert(detailGoodsInfoMsg.noSchKwdNmMsg);
                $('#goodsInfo :radio[name=schKwd2Nm]').focus();
                return;
            }
            if ( $('#goodsInfo input[name=schKwd3Nm]').val() === '' ) {
                alert(detailGoodsInfoMsg.noSchKwdNmMsg);
                $('#goodsInfo :radio[name=schKwd3Nm]').focus();
                return false;
            }
        }
        return true;
    }
    // 상품정보 조회
    ,getGoodsInfo : function () {

        var goodsInfoForm = $('#goodsInfo');
        var disabled = goodsInfoForm.find(':input:disabled',':select:disabled',':radio:disabled').removeAttr('disabled');
        var goodsInfoObj = goodsInfoForm.serializeObject();
        disabled.prop('disabled',true);

        return goodsInfoObj;

    }
    // 상품정보 세팅
    ,setGoodsInfo : function ( goodsInfoData ) {

        var prGoodsBase = goodsInfoData.prGoodsBase;

        // 상품명 세팅
        $('#goodsNm').val(prGoodsBase.goodsNm);

        // 단축 온라인 상품명 세팅
        $('#shrtGoodsNm').val(prGoodsBase.shrtGoodsNm);

        // 판매상태 세팅
        $('#saleStatCd').val(prGoodsBase.saleStatCd);

        // 판매상태가 판매종료인경우 수정불가처리
        if ( prGoodsBase.saleStatCd === '40') {
            $('#saleStatCd').attr('disabled',true);
        }

        // 브랜드 세팅
        $('#brandNm').val(convertNullToEmptyString(prGoodsBase.brandNm));
        $('#brandNo').val(convertNullToEmptyString(prGoodsBase.brandNo));

        // 모델명 세팅
        $('#modlNm').val(convertNullToEmptyString(prGoodsBase.modlNm))

        // 원산지 세팅
        $('#homeNm').val(convertNullToEmptyString(prGoodsBase.homeNm));

        // 제조사 세팅
        $('#mfcoNm').val(convertNullToEmptyString(prGoodsBase.mfcoNm));

        // 수입자 세팅
        $('#incomNm').val(convertNullToEmptyString(prGoodsBase.incomNm));

        // 판매자 세팅
        $('#salemnNm').val(convertNullToEmptyString(prGoodsBase.salemnNm));

        // 구입자 나이제한 세팅
        $('#buyrAgeLmtCd').val(prGoodsBase.buyrAgeLmtCd);

        // 판매기간 세팅
        $('#saleStrDtm').val(prGoodsBase.saleStrDtm);
        $('#saleEndDtm').val(prGoodsBase.saleEndDtm);

        // 전시매장 노출여부 & 가격비교 노출여부 & 검색키워드 노출여부 세팅
        $('#goodsInfo :radio[name=dispYn][value="'+prGoodsBase.dispYn+'"], :radio[name=prcCompaExpYn][value="'+prGoodsBase.prcCompaExpYn+'"], :radio[name=schPsbYn][value="'+prGoodsBase.schPsbYn+'"]').prop('checked', true);

        // 상품유형이 '사은품(20)'인 경우, 모두 disable 처리
        if ( prGoodsBase.goodsTypCd === '20' ) {
            $('#goodsInfo').find("[name=dispYn],[name=prcCompaExpYn],[name=schPsbYn]").prop('disabled', true);
        }

        // 검색키워드 세팅
        $('#schKwd1Nm').val(convertNullToEmptyString(prGoodsBase.schKwd1Nm));
        $('#schKwd2Nm').val(convertNullToEmptyString(prGoodsBase.schKwd2Nm));
        $('#schKwd3Nm').val(convertNullToEmptyString(prGoodsBase.schKwd3Nm));

    }
}