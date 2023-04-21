var packageGoodsInfoMsg = x2coMessage.getMessage({
    noGoodsNmMsg : 'packageGoods.goodsInfo.alert.msg.noGoodsNmMsg'
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

$.namespace('packageGoodsInfo.eventhandler');
packageGoodsInfo.eventhandler = {
    init : function () {
        this.bindButtonEvent();
    }
    ,bindButtonEvent : function () {

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
                type : 'A',
                format : 'yyyy-MM-dd',
                yyyymmdd1 : $('#saleStrDtm').val(),
                yyyymmdd2 : $('#saleEndDtm').val(),
                fn:function(pin) {
                    var saleStrDtm = pin.yyyymmdd1;
                    var saleEndDtm = pin.yyyymmdd2;
                    if(saleStrDtm <= pin.today){
                        alert(goodsInfoMsg.invalidSaleDateMsg);
                        return;
                    }
                    $('#saleStrDtm').val(saleStrDtm);
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
            alert(packageGoodsInfoMsg.noGoodsNmMsg);
            $('#goodsNm').focus();
            return false;
        }

        // 브랜드번호가 없는 경우
        if ( $('#brandNo').val() === '' ) {
            alert(packageGoodsInfoMsg.noBrandNoMsg);
            $('#brandNm').focus();
            return false;
        }

        // 모델명을 입력하지 않은경우
        if ( $('#modlNm').val() === '' ) {
            alert(packageGoodsInfoMsg.noModelNmMsg);
            $('#modlNm').focus();
            return false;
        }

        // 원산지를 입력하지 않은경우
        if ( $('#homeNm').val() === '' ) {
            alert(packageGoodsInfoMsg.nohomeNmMsg);
            $('#homeNm').focus();
            return false;
        }

        // 제조사를 입력하지 않은경우
        if ( $('#mfcoNm').val() === '' ) {
            alert(packageGoodsInfoMsg.noMfcoNmMsg);
            $('#mfcoNm').focus();
            return false;
        }

        // 판매자를 입력하지 않은경우
        if ( $('#salemnNm').val() === '' ) {
            alert(packageGoodsInfoMsg.noSalemnNmMsg);
            $('#salemnNm').focus();
            return false;
        }

        // 판매기간을 선택하지 않은경우
        if( $('#saleStrDtm').val() === '' || $('#saleEndDtm').val() === '' ) {
            alert(packageGoodsInfoMsg.noSaleDtmMsg);
            $('#saleStrDtm').focus();
            return false;
        }

        // 전시매장 노출여부를 선택하지 않은경우
        if ( $('#pkgGoodsInfo :radio[name=dispYn]:checked').val() === undefined ) {
            alert(packageGoodsInfoMsg.noDispYnMsg);
            $('#pkgGoodsInfo :radio[name=dispYn]').focus();
            return false;
        }

        // 가격비교 노출여부를 선택하지 않은경우
        if ( $('#pkgGoodsInfo :radio[name=prcCompaExpYn]:checked').val() === undefined ) {
            alert(packageGoodsInfoMsg.noPrcCompaExpYnMsg);
            $('#pkgGoodsInfo :radio[name=prcCompaExpYn]').focus();
            return false;
        }

        // 검색키워드 노출여부를 선택하지 않은경우
        if ( $('#pkgGoodsInfo :radio[name=schPsbYn]:checked').val() === undefined ) {
            alert(packageGoodsInfoMsg.noSchPsbYnMsg);
            $('#pkgGoodsInfo :radio[name=schPsbYn]').focus();
            return false;
        }

        // 검색키워드 노출여부가 '노출'인 경우
        if ( $('#pkgGoodsInfo :radio[name=schPsbYn]:checked').val() === 'Y' ) {

            // 검색키워드를 입력하지 않은 경우
            if ( $('#schKwd1Nm').val() === '' ) {
                alert(packageGoodsInfoMsg.noSchKwdNmMsg);
                $('#schKwd1Nm').focus();
                return;
            }
            if ( $('#schKwd2Nm').val() === '' ) {
                alert(packageGoodsInfoMsg.noSchKwdNmMsg);
                $('#schKwd2Nm').focus();
                return;
            }
            if ( $('#schKwd3Nm').val() === '' ) {
                alert(packageGoodsInfoMsg.noSchKwdNmMsg);
                $('#schKwd3Nm').focus();
                return false;
            }
        }
        return true;
    }
    ,getPkgGoodsInfo : function () {
        var pkgGoodsObj = $('#pkgGoodsInfo').serializeObject();
        pkgGoodsObj.pregStatCd = $('#pregStatCd').val();
        return pkgGoodsObj;
    }
    ,setPkgGoodsInfo : function ( data ) {

        // 상품명 세팅
        $('#goodsNm').val(data.goodsNm);

        // 승인상태 세팅
        $('#pregStatCd').val(data.pregStatCd);

        // 임시저장 -> 임시저장/반려 상태인경우 가능
        // 승인요청 -> 임시저장 상태인경우 가능
        if ( data.pregStatCd !== '10' ) {
            if ( data.pregStatCd === '30' ) {
                $('#btn_temp_pkg_goods_detail_request_approval').unbind('click').addClass('disabled');
            } else {
                $('#btn_temp_pkg_goods_detail_save, #btn_temp_pkg_goods_detail_request_approval').unbind('click').addClass('disabled');
            }
        }

        // 승인상태가 '반려(30)'인 경우
        if (data.pregStatCd === '30') {
            // 반려 사유 세팅
            $('#retnCausCd').show().val(data.retnCausCd);
            $('#retnCaus').show().text(data.retnCaus);
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