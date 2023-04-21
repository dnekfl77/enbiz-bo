var announcementInfoMsg = x2coMessage.getMessage({
    minSafeCertiItemMsg           : 'generalGoods.announcementInfo.alert.msg.minSafeCertiItemMsg'
    ,maxSafeCertiItemMsg           : 'generalGoods.announcementInfo.alert.msg.maxSafeCertiItemMsg'
    ,noGoodsNotiLisartCdMsg        : 'generalGoods.announcementInfo.alert.msg.noGoodsNotiLisartCdMsg'
    ,noSafeCertiNeedYnMsg          : 'generalGoods.announcementInfo.alert.msg.noSafeCertiNeedYnMsg'
    ,noSafeCertiGbCdMsg            : 'generalGoods.announcementInfo.alert.msg.noSafeCertiGbCdMsg'
    ,noSafeCertiNoMsg              : 'generalGoods.announcementInfo.alert.msg.noSafeCertiNoMsg'
    ,noAplyDateMsg                 : 'generalGoods.announcementInfo.alert.msg.noAplyDateMsg'
});

$.namespace('announcementInfo.eventhandler');
announcementInfo.eventhandler = {
    // 초기화
    init : function () {

        this.bindButtonEvent();
    }
    // 기본정보 > 표준분류 세팅시 호출
    ,setAnnoucementInfoData : function ( param ) {
        var goodsNotiLisartCd   = convertNullToEmptyString(param.goodsNotiLisartCd); // 상품고시품목코드 (default : '')
        var safeCertiNeedYn     = convertNullToEmptyString(param.safeCertiNeedYn);   // 안전인증대상여부 (default : 'N')
        safeCertiNeedYn         = ( safeCertiNeedYn === '' )? 'N' : safeCertiNeedYn;

        // 상품고시품목코드 세팅
        $('#goodsNotiLisartCd').val( goodsNotiLisartCd );
        // 표준분류를 선택한 경우, 상품고시품목코드 수정 불가 처리
        $('#goodsNotiLisartCd').removeClass('disabled').attr('disabled', ( goodsNotiLisartCd === '' )? false : true);

        // 상품고시항목 세팅
        this.getAnnoucementItemInfo( goodsNotiLisartCd, safeCertiNeedYn );

    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 상품고시품목코드 선택값 변경
        $('#goodsNotiLisartCd').change( function () {
            that.getAnnoucementItemInfo( $(this).val(), 'N');
        });

        // 안전인증대상여부 변경
        $(document).on('change', 'input[name=safeCertiNeedYn]', function(){

            var safeCertiNeedYn = $(this).val();

            //안전인증정보 초기화
            $('#safeCertiInfoList').children().not(':first-child').remove();

            // 안전인증정보영역 노출
            if (safeCertiNeedYn === 'Y' ) {
                that.addSafeCertiInfo();
                $('#section_safeCertiInfo').show();
            }else {
                $('#section_safeCertiInfo').hide();
            }
        });

    }
    // 상품고시항목 세팅
    ,getAnnoucementItemInfo : function ( goodsNotiLisartCd, safeCertiNeedYn) {

        var that = this;

        // 상품고시항목정보 초기화
        $("#announcementInfoTable").children().not(':first-child').remove();

        common.Ajax.sendRequestSync(
            "get",
            _baseUrl + "goods/TemporaryGeneralGoods.getGoodsNotificationItemList.do",
            { goodsNotiLisartCd : goodsNotiLisartCd, safeCertiNeedYn : safeCertiNeedYn },
            function ( data ) {
                // 상품고시항목정보 삽입
                $("#announcementInfoTable").append(data);

                if(safeCertiNeedYn === 'Y'){
                    // 안전인증정보 추가
                    that.addSafeCertiInfo();
                }
            }, false
        );
    }
    // 안전인증정보 추가
    ,addSafeCertiInfo : function ( position ) {

        var that = this;
        var safeCertiInfoCnt = $('div[name=newSafeCertiInfo]').length;

        // 최대 인증정보 개수 제한
        if( safeCertiInfoCnt === 5 ){
            alert(announcementInfoMsg.maxSafeCertiItemMsg);
            return;
        }

        var templete = $('div[name=safeCertiInfo_tmpl]');

        // 초기 세팅시 추가 위치 ( 템플릿 뒤 )
        if( safeCertiInfoCnt === 0 ) position = templete;

        var newSafeCertiInfo = templete.clone();
        newSafeCertiInfo.attr('name','newSafeCertiInfo');
        position.after( newSafeCertiInfo );
        newSafeCertiInfo.show();

        // 안전인증정보 추가 버튼 클릭
        newSafeCertiInfo.find('.btn_add_safe_certi_info').bind('click', function () {
             that.addSafeCertiInfo( $(this).parent() );
        });

        // 안전인증정보 삭제 버튼 클릭
        newSafeCertiInfo.find('.btn_remove_safe_certi_info').bind('click', function () {
            // 최소 인증정보 개수 제한
            var safeCertiInfoCnt = $('div[name=newSafeCertiInfo]').length;
            if(safeCertiInfoCnt === 1){
                alert(announcementInfoMsg.minSafeCertiItemMsg);
                return;
            }
            $(this).parent().remove();
        });

        // 캘린더 호출
        newSafeCertiInfo.find('.btn_callCalendar').bind('click', function () {
            var aplyStrDt = $(this).parent().find('input[name=aplyStrDt]');
            var aplyEndDt = $(this).parent().find('input[name=aplyEndDt]');

            showCalendar({
                type : 'A',
                format : 'yyyy-MM-dd',
                yyyymmdd1 : aplyStrDt.val(),
                yyyymmdd2 : aplyEndDt.val(),
                fn:function(pin) {
                    aplyStrDt.val(pin.yyyymmdd1);
                    aplyEndDt.val(pin.yyyymmdd2);
                }
            });
        });

        // 인증기관명 - 문자만 입력 가능
        newSafeCertiInfo.find('input[name=safeCertiOrnNm]').bind('keyup', function () {
            var currentVal = $(this).val();
            $(this).val(currentVal.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]/g,''));

        });

        // 인증번호 - 숫자만 입력 가능
        newSafeCertiInfo.find('input[name=safeCertiNo]').bind('keyup', function () {
            var currentVal = $(this).val();
            $(this).val(currentVal.replace(/[^0-9]/g,''));
        });

        return newSafeCertiInfo;
    }
    // 상품고시품목정보 초기화
    ,resetAnnouncementInfo : function () {
        this.setAnnoucementInfoData('', 'N');
    }
    // 상품고시품목정보 유효성 체크
    ,validationCheck : function () {

        // 상품고시품목코드를 선택하지 않은경우
        if ( $('#announcementInfo [name=goodsNotiLisartCd]').val() === '' ) {
            alert(announcementInfoMsg.noGoodsNotiLisartCdMsg);
            $('#announcementInfo [name=goodsNotiLisartCd]').focus();
            return false;
        }

        // 상품고시항목 내용을 입력하지 않은 경우
        var items = $('#announcementInfoTable').children().not(':first-child, :nth-last-child(2), :last-child');
        if ( items.length > 0 ) {

            var isEmpty = false;

            items.each( function ( index, data ) {
                var itemNm = $(data).find('.itemNm').text();    // 상품고시항목명
                var itemCont = $(data).find('.itemCont');       // 상품고시항목내용 - input,textarea,calender
                var itemRadio = $(data).find('.itemRadio');     // 상품고시항목내용 - radio

                if( itemCont.length > 0 && itemCont.val() === '' ){
                    alert('상품고시품목정보의 ['+itemNm+'] 을(를) 입력해주세요.');
                    itemCont.focus();
                    isEmpty = true;
                    return false;

                } else if ( itemRadio.length > 0 && itemRadio.find(':radio:checked').val() === undefined ) {
                    alert('상품고시품목정보의 ['+itemNm+'] 을(를) 선택해주세요.');
                    itemRadio.find('radio').focus();
                    isEmpty = true;
                    return false;
                }
            });

            if( isEmpty ) return false;
        }

        // 안전인증대상여부를 선택하지 않은 경우
        if ( $('#announcementInfo :radio[name=safeCertiNeedYn]:checked').val() === undefined ) {
            alert(announcementInfoMsg.noSafeCertiNeedYnMsg);
            $('#announcementInfo :radio[name=safeCertiNeedYn]').focus();
            return false;
        }

        // 안전인증대상여부가 '대상'인 경우
        if ( $('#announcementInfo :radio[name=safeCertiNeedYn]:checked').val() === 'Y' ) {

            var isEmpty = false;
            var safeCertiInfoList = $('#safeCertiInfoList').children().not(':first-child');

            // 등록된 안전인증정보가 없는 경우
            if( safeCertiInfoList.length == 0 ) {
                alert(announcementInfoMsg.minSafeCertiItemMsg);
                return false;
            }

            // 안전인증정보 내용을 입력하지 않은 경우
            safeCertiInfoList.each( function( index, data ) {

                var safeCertiGbCd   = $(data).find('select[name=safeCertiGbCd]'); // 안전인증구분코드
                var safeCertiNo     = $(data).find('input[name=safeCertiNo]');    // 안전인증번호
                var aplyStrDt       = $(data).find('input[name=aplyStrDt]');      // 적용시작일시
                var aplyEndDt       = $(data).find('input[name=aplyEndDt]');      // 적용종료일시

                if( safeCertiGbCd.val() === '' ) {
                    alert(announcementInfoMsg.noSafeCertiGbCdMsg);
                    safeCertiGbCd.focus();
                    isEmpty = true;
                    return false;
                }

                if( safeCertiNo.val() === '' ) {
                    alert(announcementInfoMsg.noSafeCertiNoMsg);
                    safeCertiNo.focus();
                    isEmpty = true;
                    return false;
                }

                if( aplyStrDt.val() === '' || aplyEndDt.val() === '' ) {
                    alert(announcementInfoMsg.noAplyDateMsg);
                    aplyStrDt.focus();
                    isEmpty = true;
                    return false;
                }
            });

            if(isEmpty) return false;
        }

        return true;
    }
    // 등록 > 상품고시품목정보 조회
    ,getAnnouncementInfo : function () {

        var goodsNotiLisartCd = $('#goodsNotiLisartCd').val();
        var safeCertiNeedYn = $('#announcementInfo :radio[name=safeCertiNeedYn]:checked').val();

        var itemInfo = [];
        var safeCertiInfo = [];

        // ================= 상품고시항목 저장 ================= //
        var inputTypeItems = $('#announcementInfo').find('.itemCont');
        var radioTypeItems = $('#announcementInfo').find('.itemRadio');

        // 상품고시항목 - input,textarea,calender
        if( inputTypeItems.length > 0 ){
            inputTypeItems.each( function( index, data ){
                itemInfo.push({
                    goodsNotiLisartCd : goodsNotiLisartCd,                     // 상품고시품목코드
                    goodsNotiItemCd   : $(data).attr('data-goodsNotiItemCd'),  // 상품고시항목코드
                    notiItemCmt       : $(data).val()                          // 고시항목내용
                });
            });
        }

        // 상품고시항목 - radio
        if( radioTypeItems.length > 0 ){
            radioTypeItems.each(function( index, data ){
                itemInfo.push({
                    goodsNotiLisartCd : goodsNotiLisartCd,
                    goodsNotiItemCd   : $(data).find(':radio:checked').attr('name'),
                    notiItemCmt       : $(data).find(':radio:checked').val()
                });
            });
        }

        // ================= 안전인증정보 저장 ================= //

        // 안전인증대상일 경우
        if ( safeCertiNeedYn === 'Y' ) {

            var safeCertiInfoList = $('#safeCertiInfoList').children().not(':first-child');
            if ( safeCertiInfoList.length > 0 ) {
                safeCertiInfoList.each( function ( index, data ) {

                    var aplyStrDt = $(data).find('input[name=aplyStrDt]').val();    // 적용시작일시
                    var aplyEndDt = $(data).find('input[name=aplyEndDt]').val();    // 적용종료일시

                    safeCertiInfo.push({
                        safeCertiGbCd   : $(data).find('select[name=safeCertiGbCd]').val(),    // 안전인증구분코드
                        safeCertiOrnNm  : $(data).find('input[name=safeCertiOrnNm]').val(),    // 안전인증기관명
                        safeCertiNo     : $(data).find('input[name=safeCertiNo]').val(),       // 안전인증번호
                        aplyStrDt       : replaceCalendarStringWithLength(aplyStrDt),          // 적용시작일시
                        aplyEndDt       : replaceCalendarStringWithLength(aplyEndDt)           // 적용종료일시
                    });
                });
            }
        }

        var announcementInfoObj = {
            goodsNotiLisartCd : goodsNotiLisartCd,  // 상품고시품목코드
            safeCertiNeedYn : safeCertiNeedYn,      // 안전인증대상여부
            itemInfo : itemInfo,                    // 상품항목정보
            safeCertiInfo : safeCertiInfo           // 상품안전인증이력
        }

        return announcementInfoObj;
    }
    // 상세 > 상품고시품목정보 세팅
    ,setAnnouncementInfo : function ( announcementInfoData ) {

        var that = this;
        
        var goodsNotiLisartCd   = convertNullToEmptyString(announcementInfoData.goodsNotiLisartCd);
        var safeCertiNeedYn     = announcementInfoData.safeCertiTgtYn;

        // 상품고시품목코드 세팅
        $('#goodsNotiLisartCd').val( goodsNotiLisartCd );
        $('#goodsNotiLisartCd').addClass('disabled').attr('disabled', true);

        // 상품고시항목 세팅
        this.getAnnoucementItemInfo( goodsNotiLisartCd, safeCertiNeedYn );

        var prPregGoodsItemInfoList = announcementInfoData.prPregGoodsItemInfoList;
        if( prPregGoodsItemInfoList != null && prPregGoodsItemInfoList.length > 0 ){
            prPregGoodsItemInfoList.forEach( function ( data ) {

                // 입력방식 : input,textarea,calender,radio
                var input = $('#announcementInfo input[data-goodsnotiitemcd='+data.goodsNotiItemCd+']');
                var textArea = $('#announcementInfo textarea[data-goodsnotiitemcd='+data.goodsNotiItemCd+']');
                var radio = $('#announcementInfo :radio[name='+data.goodsNotiItemCd+']');

                if ( input.length > 0 ) { input.val(data.notiItemCmt); return true; }
                if ( textArea.length > 0 ) { textArea.val(data.notiItemCmt); return true; }
                if ( radio.length > 0 ) { $('#announcementInfo :radio[name='+data.goodsNotiItemCd+'][value='+data.notiItemCmt+']').prop('checked', true); return true; }

            });
        }

        // 안전인증정보 세팅
        var prPregGoodsSafeCertiHistList = announcementInfoData.prPregGoodsSafeCertiHistList;
        var newSafeCertiInfo = $('div[name=newSafeCertiInfo]');
        if ( prPregGoodsSafeCertiHistList != null && prPregGoodsSafeCertiHistList.length > 0 ) {
            $.each(prPregGoodsSafeCertiHistList, function ( index, data ) {
                newSafeCertiInfo.find('select[name=safeCertiGbCd]').val(data.safeCertiGbCd)
                newSafeCertiInfo.find('input[name=safeCertiOrnNm]').val(data.safeCertiOrnNm)
                newSafeCertiInfo.find('input[name=safeCertiNo]').val(data.safeCertiNo)
                newSafeCertiInfo.find('input[name=aplyStrDt]').val(data.aplyStrDt)
                newSafeCertiInfo.find('input[name=aplyEndDt]').val(data.aplyEndDt)
                if( (index + 1) === prPregGoodsSafeCertiHistList.length ) return false;
                newSafeCertiInfo = that.addSafeCertiInfo( newSafeCertiInfo );
            });
        }
    }
}