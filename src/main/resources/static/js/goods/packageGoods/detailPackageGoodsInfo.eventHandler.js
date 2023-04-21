var detailPkgGoodsInfoMsg = x2coMessage.getMessage({
    cantChangeSaleStatCdToSoldOutMsg : 'packageGoods.goodsInfo.alert.msg.cantChangeSaleStatCdToSoldOutMsg'
    ,invalidSaleEndDateMsg : 'packageGoods.goodsInfo.alert.msg.invalidSaleEndDateMsg'
    ,noGoodsNmMsg : 'packageGoods.goodsInfo.alert.msg.noGoodsNmMsg'
    ,noSaleStatCdMsg : 'packageGoods.goodsInfo.alert.msg.noSaleStatCdMsg'
    ,noBrandNoMsg : 'packageGoods.goodsInfo.alert.msg.noBrandNoMsg'
    ,noModelNmMsg : 'packageGoods.goodsInfo.alert.msg.noModelNmMsg'
    ,nohomeNmMsg : 'packageGoods.goodsInfo.alert.msg.nohomeNmMsg'
    ,noMfcoNmMsg : 'packageGoods.goodsInfo.alert.msg.noMfcoNmMsg'
    ,noSalemnNmMsg : 'packageGoods.goodsInfo.alert.msg.noSalemnNmMsg'
    ,noSaleDtmMsg : 'packageGoods.goodsInfo.alert.msg.noSaleDtmMsg'
    ,noDispYnMsg : 'packageGoods.goodsInfo.alert.msg.noDispYnMsg'
    ,noPrcCompaExpYnMsg : 'packageGoods.goodsInfo.alert.msg.noPrcCompaExpYnMsg'
    ,noSchPsbYnMsg : 'packageGoods.goodsInfo.alert.msg.noSchPsbYnMsg'
    ,noSchKwdNmMsg : 'packageGoods.goodsInfo.alert.msg.noSchKwdNmMsg'
});

$.namespace('detailPackageGoodsInfo.eventhandler');
detailPackageGoodsInfo.eventhandler = {
    init : function () {
        this.bindButtonEvent();
    }
    ,bindButtonEvent : function () {

        // 판매상태 변경
        var preSaleStatCd;
        $('#saleStatCd').on( 'click' , function () {
            preSaleStatCd = this.value;
        }).change( function () {
            // 판매상태 '판매중' -> '품절'로 변경 불가
            if ( _saleStatCd === '10' && this.value === '20' ) {
                alert(detailPkgGoodsInfoMsg.cantChangeSaleStatCdToSoldOutMsg);
                $('#saleStatCd').val(preSaleStatCd);
            }
        });

        // 브랜드 검색
        $('#btn_brand_popup_call').on('click', function () {
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
            popCommon(pin, POP_DATA, function ( e ) {
                var returnValue = JSON.parse(e.data);
                $('#brandNo').val(returnValue[0].brandNo);
                $('#brandNm').val(returnValue[0].brandNm);
            });
        });

        // 브랜드 초기화
        $('#btn_brand_popup_reset').on( 'click', function () {
            $('#brandNo, #brandNm').val('');
        });

        // 판매기간 캘린더 호출
        $('#btn_call_sale_calender').on( 'click', function () {
            showCalendar({
                type : 'C',
                format : 'yyyy-MM-dd',
                yyyymmdd : $('#saleEndDtm').val(),
                fn : function ( pin ) {
                    var saleStrDtm = $('#saleStrDtm').val();
                    var saleEndDtm = pin.yyyymmdd;

                    // 판매시작일 이전날짜 선택 불가
                    if ( saleEndDtm <= saleStrDtm ){
                        alert(detailPkgGoodsInfoMsg.invalidSaleEndDateMsg);
                        return;
                    }
                    $('#saleEndDtm').val(saleEndDtm);
                }
            });
        });

        // 검색키워드 노출여부 변경 > 검색 키워드 초기화
        $('#pkgGoodsInfo :radio[name=schPsbYn]').change( function () {
            $('#schKwd1Nm , #schKwd2Nm, #schKwd3Nm').val('');
            $('#schKwd1Nm , #schKwd2Nm, #schKwd3Nm').prop('disabled', ( this.value === 'N' ));
        });
    }
    ,resetPkgGoodsInfo : function () {
        $('#pkgGoodsInfo')[0].reset();
        $('#brandNo').val('');
        $('#schKwd1Nm , #schKwd2Nm, #schKwd3Nm').prop('disabled', false);
    }
    ,validatePkgGoodsInfo : function () {

        // 상품명을 입력하지 않은 경우
        if ( $('#goodsNm').val() === '' ) {
            alert(detailPkgGoodsInfoMsg.noGoodsNmMsg);
            $('#goodsNm').focus();
            return false;
        }

        // 판매상태를 선택하지 않은 경우
        if ( $('#saleStatCd').val() === '' ) {
            alert(detailPkgGoodsInfoMsg.noSaleStatCdMsg);
            $('#saleStatCd').focus();
            return false;
        }

        // 브랜드번호가 없는 경우
        if ( $('#brandNo').val() === '' ) {
            alert(detailPkgGoodsInfoMsg.noBrandNoMsg);
            $('#brandNm').focus();
            return false;
        }

        // 모델명을 입력하지 않은경우
        if ( $('#modlNm').val() === '' ) {
            alert(detailPkgGoodsInfoMsg.noModelNmMsg);
            $('#modlNm').focus();
            return false;
        }

        // 원산지를 입력하지 않은경우
        if ( $('#homeNm').val() === '' ) {
            alert(detailPkgGoodsInfoMsg.nohomeNmMsg);
            $('#homeNm').focus();
            return false;
        }

        // 제조사를 입력하지 않은경우
        if ( $('#mfcoNm').val() === '' ) {
            alert(detailPkgGoodsInfoMsg.noMfcoNmMsg);
            $('#mfcoNm').focus();
            return false;
        }

        // 판매자를 입력하지 않은경우
        if ( $('#salemnNm').val() === '' ) {
            alert(detailPkgGoodsInfoMsg.noSalemnNmMsg);
            $('#salemnNm').focus();
            return false;
        }

        // 판매기간을 선택하지 않은경우
        if( $('#saleEndDtm').val() === '' ) {
            alert(detailPkgGoodsInfoMsg.noSaleDtmMsg);
            $('#saleEndDtm').focus();
            return false;
        }

        // 전시매장 노출여부를 선택하지 않은경우
        if ( $('#pkgGoodsInfo :radio[name=dispYn]:checked').val() === undefined ) {
            alert(detailPkgGoodsInfoMsg.noDispYnMsg);
            $('#pkgGoodsInfo :radio[name=dispYn]').focus();
            return false;
        }

        // 가격비교 노출여부를 선택하지 않은경우
        if ( $('#pkgGoodsInfo :radio[name=prcCompaExpYn]:checked').val() === undefined ) {
            alert(detailPkgGoodsInfoMsg.noPrcCompaExpYnMsg);
            $('#pkgGoodsInfo :radio[name=prcCompaExpYn]').focus();
            return false;
        }

        // 검색키워드 노출여부를 선택하지 않은경우
        if ( $('#pkgGoodsInfo :radio[name=schPsbYn]:checked').val() === undefined ) {
            alert(detailPkgGoodsInfoMsg.noSchPsbYnMsg);
            $('#pkgGoodsInfo :radio[name=schPsbYn]').focus();
            return false;
        }

        // 검색키워드 노출여부가 '노출'인 경우
        if ( $('#pkgGoodsInfo :radio[name=schPsbYn]:checked').val() === 'Y' ) {

            // 검색키워드를 입력하지 않은 경우
            if ( $('#schKwd1Nm').val() === '' ) {
                alert(detailPkgGoodsInfoMsg.noSchKwdNmMsg);
                $('#schKwd1Nm').focus();
                return;
            }
            if ( $('#schKwd2Nm').val() === '' ) {
                alert(detailPkgGoodsInfoMsg.noSchKwdNmMsg);
                $('#schKwd2Nm').focus();
                return;
            }
            if ( $('#schKwd3Nm').val() === '' ) {
                alert(detailPkgGoodsInfoMsg.noSchKwdNmMsg);
                $('#schKwd3Nm').focus();
                return false;
            }
        }
        return true;
    }
    ,getPkgGoodsInfo : function () {
        return $('#pkgGoodsInfo').serializeObject();
    }
    ,setPkgGoodsInfo : function ( data ) {

        // 상품명 세팅
        $('#goodsNm').val(data.goodsNm);

        // 판매상태 세팅
        $('#saleStatCd').val(data.saleStatCd);

        // 판매상태가 판매종료인경우 수정불가처리
        if ( data.saleStatCd === '40') {
            $('#saleStatCd').attr('disabled',true);
        }

        // 브랜드 세팅
        $('#brandNm').val(data.brandNm);
        $('#brandNo').val(data.brandNo);

        // 모델명 세팅
        $('#modlNm').val(data.modlNm);

        // 원산지 세팅
        $('#homeNm').val(data.homeNm);

        // 제조사 세팅
        $('#mfcoNm').val(data.mfcoNm);

        // 수입자 세팅
        $('#incomNm').val(convertNullToEmptyString(data.incomNm));

        // 판매자 세팅
        $('#salemnNm').val(data.salemnNm);

        // 판매기간 세팅
        $('#saleStrDtm').val(data.saleStrDtm);
        $('#saleEndDtm').val(data.saleEndDtm);

        // 전시매장 노출여부 & 가격비교 노출여부 & 검색키워드 노출여부 세팅
        $('#pkgGoodsInfo :radio[name=dispYn][value="'+data.dispYn+'"], :radio[name=prcCompaExpYn][value="'+data.prcCompaExpYn+'"], :radio[name=schPsbYn][value="'+data.schPsbYn+'"]').prop('checked', true);

        if ( data.schPsbYn === 'Y' ) {
            // 검색키워드 세팅
            $('#schKwd1Nm').val(convertNullToEmptyString(data.schKwd1Nm));
            $('#schKwd2Nm').val(convertNullToEmptyString(data.schKwd2Nm));
            $('#schKwd3Nm').val(convertNullToEmptyString(data.schKwd3Nm));
        } else {
            $('#schKwd1Nm , #schKwd2Nm, #schKwd3Nm').prop('disabled', true);
        }
    }
}