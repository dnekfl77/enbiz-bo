var detailGoodsCommonMsg = x2coMessage.getMessage({
    resetConfirmMsg : 'adminCommon.alert.reset'
    ,closeConfirmMsg : 'adminCommon.alert.popup.close'
    ,saveConfirmMsg : 'adminCommon.grid.alert.save'
});

$.namespace('detailGoodsCommon.eventhandler');
detailGoodsCommon.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
        this.bindData();
        this.setButton();
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 미리보기
        $('#btn_goods_detail_preview').off('click').on( 'click', function () {
            that.preview();
        });

        // 저장
        $('#btn_goods_detail_save').off('click').on( 'click', function () {
            that.save();
        });

        // 초기화
        $('#btn_goods_detail_reset').off('click').on( 'click', function() {
            if(!confirm(detailGoodsCommonMsg.resetConfirmMsg)) return;
            that.reset();
        });

        // 닫기
        $('#btn_goods_detail_close').off('click').on( 'click', function () {
            if( pageType === 'E' && _saleStatCd !== '40' && !confirm(detailGoodsCommonMsg.closeConfirmMsg)) return;
            that.close();
        });

        // 입력 byte 수 제한
        $("input:text[checkByte]").on("keyup change", function () {
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        // 입력 타입 제한 (숫자)
        $("input:text[numberOnly]").on("keyup", function () {
            var currentVal = $(this).val();
            $(this).val(currentVal.replace(/[^0-9]/g,''));
        });

        // 입력 타입 제한 (영문,한글), 공백 허용
        $("input:text[characterOnly]").on("keyup", function () {
            var currentVal = $(this).val();
            $(this).val(currentVal.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]/g,''));
        });

        // 입력 타입 제한 (숫자,영문,한글), 공백허용
        $("input:text[numberCharacterOnly]").on("keyup", function () {
            var currentVal = $(this).val();
            $(this).val(currentVal.replace(/[^0-9가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]/g,''));
        });

    }
    // 버튼 세팅
    ,setButton : function () {

        // 읽기전용 or 판매상태 ( 판매종료 : 40 )
        if ( pageType === 'R' || _saleStatCd === '40' ) {

            // 이벤트 바인딩 해제
            $('#btn_goods_detail_save').unbind('click');
            $('#btn_goods_detail_reset').unbind('click');
            return;
        }

        $('#btn_goods_detail_save, #btn_goods_detail_reset').removeClass('disabled');

    }
    // 데이터 세팅
    ,bindData : function () {

        console.log('>>>>>>>>>>> 조회 데이터 <<<<<<<<<<<<');
        console.log(goodsInfo);

        if ( goodsInfo === null ) return;

        // ========== 기본정보 ========== //
        detailBasicInfo.eventhandler.setBasicInfo(goodsInfo);

        // ========== 상품정보 ========== //
        detailGoodsInfo.eventhandler.setGoodsInfo(goodsInfo);

        // ========== 상품고시품목정보 ========== //
        detailAnnouncementInfo.eventhandler.setAnnouncementInfo(goodsInfo);
        
        // ========== 가격정보 ========== //
        detailPriceHistGrid.eventhandler.setPriceInfo(goodsInfo);

        // ========== 배송정보 ========= //
        detailDeliveryInfo.eventhandler.setDeliveryInfo(goodsInfo);

        // ========== 판매옵션 ========= //
        detailItemListGrid.eventhandler.setSaleInfo(goodsInfo);

        // ========== 상품상세 ========= //
        //detailInfo.eventhandler.setDetailInfo();

        // ========== 부가정보 ========= //

        // 전시카테고리
        detailDispCtgGrid.eventhandler.setDispCtgGrid(goodsInfo);

        // 연관상품
        detailAssocGoodsGrid.eventhandler.setAssocGoodsGrid(goodsInfo);

        // 홍보문구
        detailAdveWrdGrid.eventhandler.setAdveWrdGrid(goodsInfo.prAdveWrdHistList);

        // 증정품
        detailPrestGrid.eventhandler.setPrestGrid(goodsInfo.prPrestHistList);

        // 상품이미지
        //imageInfo.eventhandler.setImageInfo();

    }
    // 미리보기
    ,preview : function () {
        alert('서비스 준비중입니다.');
    }
    ,validation : function () {

        if ( !detailBasicInfo.eventhandler.validationCheck())         return false;
        if ( !detailGoodsInfo.eventhandler.validationCheck())         return false;
        if ( !detailAnnouncementInfo.eventhandler.validationCheck() ) return false;
        if ( !detailPriceHistGrid.eventhandler.validationCheck() )    return false;
        if ( !detailDeliveryInfo.eventhandler.validationCheck() )     return false;
        if ( !detailItemListGrid.eventhandler.validationCheck() )     return false;
        // if ( !detailInfo.eventhandler.validationCheck() )             return false;
        if ( !detailDispCtgGrid.eventhandler.validationCheck() )      return false;
        if ( !detailAssocGoodsGrid.eventhandler.validationCheck() )   return false;
        if ( !detailAdveWrdGrid.eventhandler.validationCheck() )      return false;
        if ( !detailPrestGrid.eventhandler.validationCheck() )        return false;
        // if ( !imageInfo.eventhandler.validationCheck() )              return false;

        return true;
    }
    ,getSendData : function () {

        var basicInfoObj          = detailBasicInfo.eventhandler.getBasicInfo();
        var goodsInfoObj          = detailGoodsInfo.eventhandler.getGoodsInfo();
        var announcementInfoObj   = detailAnnouncementInfo.eventhandler.getAnnouncementInfo();
        var priceInfoObj          = detailPriceHistGrid.eventhandler.getPriceInfo();
        var deliveryInfoObj       = detailDeliveryInfo.eventhandler.getDeliveryInfo();
        var saleInfoObj           = detailItemListGrid.eventhandler.getSaleInfo();
        var detailInfoObj         = detailInfo.eventhandler.getDetailInfo();
        var dispCtgGridData       = detailDispCtgGrid.eventhandler.getDispCtgGrid();
        var assocGoodsGridData    = detailAssocGoodsGrid.eventhandler.getAssocGoodsGrid();
        var adveWrdGridData       = detailAdveWrdGrid.eventhandler.getAdveWrdGrid();
        var prestGridData         = detailPrestGrid.eventhandler.getPrestGrid();
        var imageInfoObj          = imageInfo.eventhandler.getImageInfo();

        console.log('>>>>>>>>>>> 입력 데이터 <<<<<<<<<<<<');
        console.log('기본정보 : '); console.log(basicInfoObj);
        console.log('상품정보 : '); console.log(goodsInfoObj);
        console.log('상품고시품목정보 : '); console.log(announcementInfoObj);
        console.log('가격정보 : '); console.log(priceInfoObj);
        console.log('배송정보 : '); console.log(deliveryInfoObj);
        console.log('판매옵션 : '); console.log(saleInfoObj);
        console.log('상품상세설명 : '); console.log(detailInfoObj);
        console.log('부가정보 > 전시카테고리 : '); console.log(dispCtgGridData);
        console.log('부가정보 > 연관상품 : '); console.log(assocGoodsGridData);
        console.log('부가정보 > 홍보문구 : '); console.log(adveWrdGridData);
        console.log('부가정보 > 증정품 : '); console.log(prestGridData);
        console.log('상품이미지 : '); console.log(imageInfoObj);

        // ========== 상품기본 ========== //
        var prGoodsBase = {
            goodsNo         : basicInfoObj.goodsNo                      // 상품번호
            ,goodsNm        : goodsInfoObj.goodsNm 	                    // 상품명
            ,shrtGoodsNm    : goodsInfoObj.shrtGoodsNm                  // 단축상품명
            ,lgcGoodsNo     : basicInfoObj.lgcGoodsNo                   // 기간계상품번호
            ,saleMethCd     : basicInfoObj.saleMethCd                   // 판매방식코드(PR003)
            ,brandNo        : goodsInfoObj.brandNo	                    // 브랜드번호
            ,modlNm         : goodsInfoObj.modlNm		                // 모델명
            ,homeNm         : goodsInfoObj.homeNm		                // 원산지명
            ,mfcoNm         : goodsInfoObj.mfcoNm		                // 제조사명
            ,incomNm        : goodsInfoObj.incomNm	                    // 수입자명
            ,salemnNm       : goodsInfoObj.salemnNm	                    // 판매자명
            ,safeCertiTgtYn : announcementInfoObj.safeCertiNeedYn       // 안전인증대상여부
            ,buyrAgeLmtCd   : goodsInfoObj.buyrAgeLmtCd                 // 구입자나이제한코드(PR004)
            ,dispYn         : goodsInfoObj.dispYn      	                // 전시여부
            ,saleStatCd     : goodsInfoObj.saleStatCd	                // 판매상태코드(PR005)
            ,saleEndDtm     : goodsInfoObj.saleEndDtm	                // 판매종료일시
            ,stkMgrYn       : saleInfoObj.stkMgrYn	                    // 재고관리여부
            ,buyQtyLmtYn    : saleInfoObj.buyQtyLmtYn	                // 구매수량제한여부
            ,minLmtQty      : saleInfoObj.minLmtQty	                    // 최소제한수량
            ,maxLmtQty      : saleInfoObj.maxLmtQty                     // 최대제한수량
            ,deliGoodsGbCd  : deliveryInfoObj.deliGoodsGbCd             // 배송상품구분코드(PR010)
            ,deliDday       : deliveryInfoObj.deliDday 	                // 배송기일
            ,tdaySndPsbYn   : deliveryInfoObj.tdaySndPsbYn              // 당일발송가능여부
            ,wdSndPsbTm     : deliveryInfoObj.wdSndPsbTm                // 평일발송가능여부
            ,sdaySndPsbYn   : deliveryInfoObj.sdaySndPsbYn              // 토요일발송가능여부
            ,sdaySndPsbTm   : deliveryInfoObj.sdaySndPsbTm              // 토요일발송가능시간
            ,itmSoutNotiYn  : saleInfoObj.itmSoutNotiYn                 // 단품품절알림여부
            ,deliPolcNo     : deliveryInfoObj.deliPolcNo	            // 배송정책번호
            ,bdlDeliPsbYn   : deliveryInfoObj.bdlDeliPsbYn	            // 묶음배송가능여부
            ,bdlRtnPsbYn    : deliveryInfoObj.bdlRtnPsbYn	            // 묶음반품가능여부
            ,rtnPsbYn       : deliveryInfoObj.rtnPsbYn	   	            // 반품가능여부
            ,exchPsbYn      : deliveryInfoObj.exchPsbYn	   	            // 교환가능여부
            ,prcCompaExpYn  : goodsInfoObj.prcCompaExpYn                // 가격비교노출여부
            ,schPsbYn       : goodsInfoObj.schPsbYn	                    // 검색가능여부
            ,schKwd1Nm      : goodsInfoObj.schKwd1Nm	                // 검색키워드1명
            ,schKwd2Nm      : goodsInfoObj.schKwd2Nm	                // 검색키워드2명
            ,schKwd3Nm      : goodsInfoObj.schKwd3Nm	                // 검색키워드3명
        };

        // ========== 예약판매이력 ========== //
        var prRsvSaleHist = basicInfoObj.rsvSaleInfo;

        // ========== 상품항목정보 ========== //
        var prGoodsItemInfoList = announcementInfoObj.itemInfo;

        // ========== 상품안전인증이력 ========== //
        var prGoodsSafeCertiHistList = announcementInfoObj.safeCertiInfo;

        // ========== 상품결제수단정보 ========== //
        var prGoodsPayMeanInfoList = priceInfoObj.payMeanInfo;

        // ========== 상품홍보문구이력 ========== //
        var prAdveWrdHistList = adveWrdGridData;

        // ========== 연관상품정보 ========== //
        var prPrestHistList = prestGridData;


        console.log('>>>>>>>>>>> 저장 데이터 <<<<<<<<<<<<');
        console.log('상품기본 : '); console.log(prGoodsBase);
        console.log('예약판매이력 : '); console.log(prRsvSaleHist);
        console.log('상품항목정보 : '); console.log(prGoodsItemInfoList);
        console.log('상품안전인증이력 : '); console.log(prGoodsSafeCertiHistList);
        console.log('상품결제수단정보 : '); console.log(prGoodsPayMeanInfoList);
        console.log('상품홍보문구이력 : '); console.log(prAdveWrdHistList);
        console.log('증정품이력 : '); console.log(prPrestHistList);

        var sendData = {};
        sendData['detailDispCtgGrid'] = dispCtgGridData;                            // 표준카테고리전시정보
        sendData['detailAssocGoodsGrid'] = assocGoodsGridData;                      // 연계상품정보
        sendData['detailItemListGridData'] = saleInfoObj.detailItemListGridData;    // 단품기본
        sendData.formPayload = {
            prGoodsBase : prGoodsBase,
            prRsvSaleHist : prRsvSaleHist,
            prGoodsItemInfoList : prGoodsItemInfoList,
            prGoodsSafeCertiHistList : prGoodsSafeCertiHistList,
            prGoodsPayMeanInfoList : prGoodsPayMeanInfoList,
            prAdveWrdHistList : prAdveWrdHistList,
            prPrestHistList : prPrestHistList
        };

        return sendData;

    }
    ,sendData : function ( sendData, callBackFnc ) {

        console.log('>>>>>>>>>>> 전송 데이터 <<<<<<<<<<<<');
        console.log(sendData);

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + 'goods/GoodsCommon.modifyGeneralGoods.do'
            , JSON.stringify(sendData)
            , callBackFnc
            , true
            ,"application/json;charset=UTF-8"
            , false
        );

    }
    // 저장
    ,save : function () {

        if ( !this.validation() ) return;
        if ( !confirm(detailGoodsCommonMsg.saveConfirmMsg) ) return;

        this.sendData( this.getSendData(), this.saveCallBackFnc );
    }
    ,saveCallBackFnc : function ( data ) {
        if( data.succeeded !== undefined && data.succeeded ) window.location.reload(); // 새로고침
    }

    // 초기화
    ,reset : function () {

        detailBasicInfo.eventhandler.resetBasicInfo();
        detailGoodsInfo.eventhandler.resetGoodsInfo();
        detailAnnouncementInfo.eventhandler.resetAnnouncementInfo();
        detailPriceHistGrid.eventhandler.resetPriceInfo();
        detailDeliveryInfo.eventhandler.resetDeliveryInfo();
        detailItemListGrid.eventhandler.resetSaleInfo();
        detailInfo.eventhandler.resetDetailInfo();
        detailDispCtgGrid.eventhandler.resetDispCtgGrid();
        detailAssocGoodsGrid.eventhandler.resetAssocGoodsGrid();
        detailAdveWrdGrid.eventhandler.resetAdveWrdGrid();
        detailPrestGrid.eventhandler.resetPrestGrid();
        imageInfo.eventhandler.resetImageInfo();

        this.bindData();
    }
    // 닫기
    ,close : function () {
        window.close();
    }
}