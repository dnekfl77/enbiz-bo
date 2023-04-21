var goodsInfoMsg = x2coMessage.getMessage({
    invalidSaleDateMsg       : 'generalGoods.goodsInfo.alert.msg.invalidSaleDateMsg'
    ,noGoodsNmMsg             : 'generalGoods.goodsInfo.alert.msg.noGoodsNmMsg'
    ,noShrtGoodsNmMsg         : 'generalGoods.goodsInfo.alert.msg.noShrtGoodsNmMsg'
    ,noBrandNoMsg             : 'generalGoods.goodsInfo.alert.msg.noBrandNoMsg'
    ,noModelNmMsg             : 'generalGoods.goodsInfo.alert.msg.noModelNmMsg'
    ,nohomeNmMsg              : 'generalGoods.goodsInfo.alert.msg.nohomeNmMsg'
    ,noMfcoNmMsg              : 'generalGoods.goodsInfo.alert.msg.noMfcoNmMsg'
    ,noSalemnNmMsg            : 'generalGoods.goodsInfo.alert.msg.noSalemnNmMsg'
    ,noBuyrAgeLmtCdMsg        : 'generalGoods.goodsInfo.alert.msg.noBuyrAgeLmtCdMsg'
    ,noSaleDtmMsg             : 'generalGoods.goodsInfo.alert.msg.noSaleDtmMsg'
    ,noDispYnMsg              : 'generalGoods.goodsInfo.alert.msg.noDispYnMsg'
    ,noPrcCompaExpYnMsg       : 'generalGoods.goodsInfo.alert.msg.noPrcCompaExpYnMsg'
    ,noSchPsbYnMsg            : 'generalGoods.goodsInfo.alert.msg.noSchPsbYnMsg'
    ,noSchKwdNmMsg            : 'generalGoods.goodsInfo.alert.msg.noSchKwdNmMsg'
});

$.namespace('goodsInfo.eventhandler');
goodsInfo.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
    }
    // 기본정보 > 상품유형이 변경시 호출
    ,setGoodsInfoData : function ( goodsTypeCd ) {

        var value = 'Y';
        var isDisabled = false;

        // 상품유형 : 사은품(20)
        if ( goodsTypeCd === '20' ) {

            // 전시매장노출여부,가격비교노출여부,검색키워드노출여부 '노출안함' 세팅, 수정불가
            value = 'N';
            isDisabled = true;
        }

        $('#goodsInfo :radio[name=dispYn][value="'+value+'"], :radio[name=prcCompaExpYn][value="'+value+'"], :radio[name=schPsbYn][value="'+value+'"]').prop('checked', true);
        $('#goodsInfo').find("[name=dispYn],[name=prcCompaExpYn],[name=schPsbYn]").prop('disabled', isDisabled);

    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 브랜드 검색 버튼 클릭
        $('#btn_brand_popup_call').click( function () {
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
        $('#btn_brand_popup_reset').click( function () {
            $('#brandNo').val('');
            $('#brandNm').val('');
        });

        // 판매기간 캘린더 호출
        $('#goodsInfo [name=btn_callCalender]').click( function () {

            showCalendar({
                type : 'A',
                format : 'yyyy-MM-dd',
                yyyymmdd1 : $('#saleStrDtm').val(),
                yyyymmdd2 : $('#saleEndDtm').val(),
                fn:function(pin) {
                    var saleStrDtm = pin.yyyymmdd1;
                    var saleEndDtm = pin.yyyymmdd2;
                    var todayDtm = getTodayDate();

                    if(saleStrDtm <= todayDtm){
                        alert(goodsInfoMsg.invalidSaleDateMsg);
                        return;
                    }
                    $('#saleStrDtm').val(saleStrDtm);
                    $('#saleEndDtm').val(saleEndDtm);
                }
            });
        });
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
            alert(goodsInfoMsg.noGoodsNmMsg);
            $('#goodsInfo input[name=goodsNm]').focus();
            return false;
        }

        // 단축 온라인 상품명을 입력하지 않은경우
        if ( $('#goodsInfo input[name=shrtGoodsNm]').val() === '' ) {
            alert(goodsInfoMsg.noShrtGoodsNmMsg);
            $('#goodsInfo input[name=shrtGoodsNm]').focus();
            return false;
        }

        // 브랜드번호가 없는 경우
        if ( $('#goodsInfo input[name=brandNo]').val() === '' ) {
            alert(goodsInfoMsg.noBrandNoMsg);
            $('#brandNm').focus();
            return false;
        }

        // 모델명을 입력하지 않은경우
        if ( $('#goodsInfo input[name=modlNm]').val() === '' ) {
            alert(goodsInfoMsg.noModelNmMsg);
            $('#goodsInfo input[name=modlNm]').focus();
            return false;
        }

        // 원산지를 입력하지 않은경우
        if ( $('#goodsInfo input[name=homeNm]').val() === '' ) {
            alert(goodsInfoMsg.nohomeNmMsg);
            $('#goodsInfo input[name=homeNm]').focus();
            return false;
        }

        // 제조사를 입력하지 않은경우
        if ( $('#goodsInfo input[name=mfcoNm]').val() === '' ) {
            alert(goodsInfoMsg.noMfcoNmMsg);
            $('#goodsInfo input[name=mfcoNm]').focus();
            return false;
        }

        // 판매자를 입력하지 않은경우
        if ( $('#goodsInfo input[name=salemnNm]').val() === '' ) {
            alert(goodsInfoMsg.noSalemnNmMsg);
            $('#goodsInfo input[name=salemnNm]').focus();
            return false;
        }

        // 구입자 나이제한을 선택하지 않은경우
        if( $('#goodsInfo [name=buyrAgeLmtCd]').val() === '' ) {
            alert(goodsInfoMsg.noBuyrAgeLmtCdMsg);
            $('#goodsInfo [name=buyrAgeLmtCd]').focus();
            return false;
        }

        // 판매기간을 선택하지 않은경우
        if( $('#goodsInfo input[name=saleStrDtm]').val() === '' ||
            $('#goodsInfo input[name=saleEndDtm]').val() === '' ) {
            alert(goodsInfoMsg.noSaleDtmMsg);
            $('#goodsInfo input[name=saleStrDtm]').focus();
            return false;
        }

        // 전시매장 노출여부를 선택하지 않은경우
        if ( $('#goodsInfo :radio[name=dispYn]:checked').val() === undefined ) {
            alert(goodsInfoMsg.noDispYnMsg);
            $('#goodsInfo :radio[name=dispYn]').focus();
            return false;
        }

        // 가격비교 노출여부를 선택하지 않은경우
        if ( $('#goodsInfo :radio[name=prcCompaExpYn]:checked').val() === undefined ) {
            alert(goodsInfoMsg.noPrcCompaExpYnMsg);
            $('#goodsInfo :radio[name=prcCompaExpYn]').focus();
            return false;
        }

        // 검색키워드 노출여부를 선택하지 않은경우
        if ( $('#goodsInfo :radio[name=schPsbYn]:checked').val() === undefined ) {
            alert(goodsInfoMsg.noSchPsbYnMsg);
            $('#goodsInfo :radio[name=schPsbYn]').focus();
            return false;
        }

        // 검색키워드 노출여부가 '노출'인 경우
        if ( $('#goodsInfo :radio[name=schPsbYn]:checked').val() === 'Y' ) {

            // 검색키워드를 입력하지 않은 경우
            if ( $('#goodsInfo input[name=schKwd1Nm]').val() === '' ) {
                alert(goodsInfoMsg.noSchKwdNmMsg);
                $('#goodsInfo :radio[name=schKwd1Nm]').focus();
                return;
            }
            if ( $('#goodsInfo input[name=schKwd2Nm]').val() === '' ) {
                alert(goodsInfoMsg.noSchKwdNmMsg);
                $('#goodsInfo :radio[name=schKwd2Nm]').focus();
                return;
            }
            if ( $('#goodsInfo input[name=schKwd3Nm]').val() === '' ) {
                alert(goodsInfoMsg.noSchKwdNmMsg);
                $('#goodsInfo :radio[name=schKwd3Nm]').focus();
                return false;
            }
        }
        return true;
    }
    // 등록 > 상품정보 조회
    ,getGoodsInfo : function () {

        var goodsInfoForm = $('#goodsInfo');
        var disabled = goodsInfoForm.find(':input:disabled',':select:disabled',':radio:disabled').removeAttr('disabled');
        var goodsInfoObj = goodsInfoForm.serializeObject();
        disabled.prop('disabled',true);

        // 검색키워드 노출여부가 '노출안함'인 경우, 검색 키워드값 초기화
        if( goodsInfoObj.schPsbYn === 'N' ) {
            goodsInfoObj.schKwd1Nm = '';
            goodsInfoObj.schKwd2Nm = '';
            goodsInfoObj.schKwd3Nm = '';
        }

        return goodsInfoObj;

    }
    // 상세 > 상품정보 세팅
    ,setGoodsInfo : function ( goodsInfoData ) {

        // 상품명 세팅
        $('#goodsNm').val(goodsInfoData.goodsNm);

        // 단축 온라인 상품명 세팅
        $('#shrtGoodsNm').val(goodsInfoData.shrtGoodsNm);

        // 승인상태 세팅
        $('#pregStatCd').val(goodsInfoData.pregStatCd);

        // 승인상태가 '반려(30)'인 경우
        if (goodsInfoData.pregStatCd === '30') {
            // 반려 사유 세팅
            $('#retnCausCd').show();
            $('#retnCausCd').val(goodsInfoData.retnCausCd);
            $('#retnCaus').show();
            $('#retnCaus').text(goodsInfoData.retnCaus);
        }

        // 브랜드 세팅
        $('#brandNm').val(goodsInfoData.brandNm);
        $('#brandNo').val(goodsInfoData.brandNo);

        // 모델명 세팅
        $('#modlNm').val(goodsInfoData.modlNm)

        // 원산지 세팅
        $('#homeNm').val(goodsInfoData.homeNm);

        // 제조사 세팅
        $('#mfcoNm').val(goodsInfoData.mfcoNm);

        // 수입자 세팅
        $('#incomNm').val(convertNullToEmptyString(goodsInfoData.incomNm));

        // 판매자 세팅
        $('#salemnNm').val(goodsInfoData.salemnNm);

        // 구입자 나이제한 세팅
        $('#buyrAgeLmtCd').val(goodsInfoData.buyrAgeLmtCd);

        // 판매기간 세팅
        $('#saleStrDtm').val(goodsInfoData.saleStrDtm);
        $('#saleEndDtm').val(goodsInfoData.saleEndDtm);

        // 전시매장 노출여부 & 가격비교 노출여부 & 검색키워드 노출여부 세팅
        $('#goodsInfo :radio[name=dispYn][value="'+goodsInfoData.dispYn+'"], :radio[name=prcCompaExpYn][value="'+goodsInfoData.prcCompaExpYn+'"], :radio[name=schPsbYn][value="'+goodsInfoData.schPsbYn+'"]').prop('checked', true);

        // 상품유형이 '사은품(20)'인 경우, 모두 disable 처리
        if ( goodsInfoData.goodsTypCd === '20' ) {
            $('#goodsInfo').find("[name=dispYn],[name=prcCompaExpYn],[name=schPsbYn]").prop('disabled', true);
        }

        // 검색키워드 세팅
        $('#schKwd1Nm').val(convertNullToEmptyString(goodsInfoData.schKwd1Nm));
        $('#schKwd2Nm').val(convertNullToEmptyString(goodsInfoData.schKwd2Nm));
        $('#schKwd3Nm').val(convertNullToEmptyString(goodsInfoData.schKwd3Nm));

    }
}