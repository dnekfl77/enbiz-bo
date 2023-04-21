var goodsCommonMsg = x2coMessage.getMessage({
    saveConfirmMsg : 'adminCommon.grid.alert.save'
    ,approvalRequestConfirmMsg : 'generalGoods.alert.msg.approvalRequestConfirmMsg'
});

$.namespace('goodsCommon.eventhandler')
goodsCommon.eventhandler = {
    init : function () {
        if ( pageType === 'C') {
            goodsDetail.eventhandler.init();
        } else {
            goodsRegist.eventhandler.init();
        }
        this.bindButtonEvent();
    }
    ,bindButtonEvent: function () {

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
    // 저장 데이터 유효성 체크
    ,validation : function () {

        if ( !basicInfo.eventhandler.validationCheck() )        return false;
        if ( !goodsInfo.eventhandler.validationCheck() )        return false;
        if ( !announcementInfo.eventhandler.validationCheck() ) return false;
        if ( !priceInfo.eventhandler.validationCheck() )        return false;
        if ( !deliveryInfo.eventhandler.validationCheck() )     return false;
        if ( !itemListGrid.eventhandler.validationCheck() )     return false;
        //if ( !detailInfo.eventhandler.validationCheck() )     return false;
        if ( !dispCtgGrid.eventhandler.validationCheck() )      return false;
        if ( !assocGoodsGrid.eventhandler.validationCheck() )   return false;
        if ( !adveWrdGrid.eventhandler.validationCheck() )      return false;
        if ( !prestGrid.eventhandler.validationCheck() )        return false;
        //if ( !imageInfo.eventhandler.validationCheck() )      return false;

        return true;
    }
    // 저장 데이터 세팅
    ,getSendData : function () {

        var basicInfoObj           = basicInfo.eventhandler.getBasicInfo();
        var goodsInfoObj           = goodsInfo.eventhandler.getGoodsInfo();
        var announcementInfoObj    = announcementInfo.eventhandler.getAnnouncementInfo();
        var priceInfoObj           = priceInfo.eventhandler.getPriceInfo();
        var deliveryInfoObj        = deliveryInfo.eventhandler.getDeliveryInfo();
        var saleInfoObj            = itemListGrid.eventhandler.getSaleInfo();
        var detailInfoObj          = detailInfo.eventhandler.getDetailInfo();
        var dispCtgGridData        = dispCtgGrid.eventhandler.getDispCtgGrid();
        var assocGoodsGridData     = assocGoodsGrid.eventhandler.getAssocGoodsGrid();
        var adveWrdGridData        = adveWrdGrid.eventhandler.getAdveWrdGrid();
        var prestGridData          = prestGrid.eventhandler.getPrestGrid();
        var imageInfoObj           = imageInfo.eventhandler.getImageInfo();

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

        // ========== 가등록 상품기본 ========== //
        var prPregGoodsBase = {
            pregGoodsNo    : basicInfoObj.pregGoodsNo             // 가등록상품번호
            ,lgcGoodsNo     : basicInfoObj.lgcGoodsNo              // 기간계상품번호
            ,goodsTypCd     : basicInfoObj.goodsTypCd              // 상품유형코드
            ,saleMethCd     : basicInfoObj.saleMethCd              // 판매방식코드
            ,entrNo         : basicInfoObj.entrNo                  // 협력사번호
            ,stdCtgNo       : basicInfoObj.stdCtgNo                // 표준분류카테고리번호
            ,goodsNm        : goodsInfoObj.goodsNm                 // 상품명
            ,shrtGoodsNm    : goodsInfoObj.shrtGoodsNm             // 단축상품명
            ,pregStatCd     : goodsInfoObj.pregStatCd              // 가등록상태코드
            ,brandNo        : goodsInfoObj.brandNo                 // 브랜드번호
            ,modlNm         : goodsInfoObj.modlNm                  // 모델명
            ,homeNm         : goodsInfoObj.homeNm                  // 원산지명
            ,mfcoNm         : goodsInfoObj.mfcoNm                  // 제조사명
            ,incomNm        : goodsInfoObj.incomNm                 // 수입자명
            ,salemnNm       : goodsInfoObj.salemnNm                // 판매자명
            ,buyrAgeLmtCd   : goodsInfoObj.buyrAgeLmtCd            // 구입자나이제한코드
            ,saleStrDtm     : goodsInfoObj.saleStrDtm              // 판매시작일시
            ,saleEndDtm     : goodsInfoObj.saleEndDtm              // 판매종료일시
            ,dispYn         : goodsInfoObj.dispYn                  // 전시여부
            ,prcCompaExpYn  : goodsInfoObj.prcCompaExpYn           // 가격비교노출여부
            ,schPsbYn       : goodsInfoObj.schPsbYn                // 검색가능여부
            ,schKwd1Nm      : goodsInfoObj.schKwd1Nm               // 검색키워드1명
            ,schKwd2Nm      : goodsInfoObj.schKwd2Nm               // 검색키워드2명
            ,schKwd3Nm      : goodsInfoObj.schKwd3Nm               // 검색키워드3명
            ,safeCertiTgtYn : announcementInfoObj.safeCertiNeedYn  // 안전인증대상여부
            ,buyTypCd       : priceInfoObj.buyTypCd                // 매입형태코드(PR006)
            ,taxGbCd        : priceInfoObj.taxGbCd                 // 과면세구분코드(PR007)
            ,deliProcTypCd  : deliveryInfoObj.deliProcTypCd        // 배송처리유형코드
            ,deliGoodsGbCd  : deliveryInfoObj.deliGoodsGbCd        // 배송상품구분코드
            ,deliWayCd      : deliveryInfoObj.deliWayCd            // 배송수단코드
            ,deliDday       : deliveryInfoObj.deliDday             // 배송기일
            ,tdaySndPsbYn   : deliveryInfoObj.tdaySndPsbYn         // 당일발송가능여부
            ,wdSndPsbTm     : deliveryInfoObj.wdSndPsbTm           // 평일발송가능시간
            ,sdaySndPsbYn   : deliveryInfoObj.sdaySndPsbYn         // 툐요일발송가능여부
            ,sdaySndPsbTm   : deliveryInfoObj.sdaySndPsbTm         // 토요일발송가능시간
            ,bdlDeliPsbYn   : deliveryInfoObj.bdlDeliPsbYn         // 묶음배송가능여부
            ,bdlRtnPsbYn    : deliveryInfoObj.bdlRtnPsbYn          // 묶음반품가능여부
            ,rtnPsbYn       : deliveryInfoObj.rtnPsbYn             // 반품가능여부
            ,exchPsbYn      : deliveryInfoObj.exchPsbYn            // 교환가능여부
            ,deliPolcNo     : deliveryInfoObj.deliPolcNo           // 배송정책번호
            ,stkMgrYn       : saleInfoObj.stkMgrYn                 // 재고관리여부
            ,itmSoutNotiYn  : saleInfoObj.itmSoutNotiYn            // 단품품절알림여부
            ,buyQtyLmtYn    : saleInfoObj.buyQtyLmtYn              // 구매수량제한여부
            ,minLmtQty      : saleInfoObj.minLmtQty                // 최소제한수량
            ,maxLmtQty      : saleInfoObj.maxLmtQty                // 최대제한수량
        };

        // ========== 가등록 예약판매이력 ========= //
        prPregGoodsBase.prPregRsvSaleHist = {
            rsvStrtDtm         : basicInfoObj.rsvStrtDtm,         // 예약시작일시
            rsvEndDtm          : basicInfoObj.rsvEndDtm,          // 예약종료일시
            fwdidcPrarDy       : basicInfoObj.fwdidcPrarDy,       // 예약상품출고지시일
            rsvEndAfProcMethCd : basicInfoObj.rsvEndAfProcMethCd  // 예약종료후판매방식코드
        };

        // ========== 가등록 상품항목정보 ========== //
        prPregGoodsBase.prPregGoodsItemInfoList = announcementInfoObj.itemInfo;

        // ========== 가등록 상품안전인증이력 ======= //
        prPregGoodsBase.prPregGoodsSafeCertiHistList = announcementInfoObj.safeCertiInfo;

        // ========== 가등록 상품가격이력 ========== //
        prPregGoodsBase.prPregGoodsPrcHist = {
            histStrDtm   : priceInfoObj.histStrDtm,   // 이력시작일시
            histEndDtm   : priceInfoObj.histEndDtm,   // 이력종료일시
            supPcost     : priceInfoObj.supPcost,     // 공급원가
            norPrc       : priceInfoObj.norPrc,       // 정상가
            salePrc      : priceInfoObj.salePrc,      // 판매가
            mrgnRate     : priceInfoObj.mrgnRate,     // 마진율
            prcChgCausCd : priceInfoObj.prcChgCausCd  // 가격변경사유코드
        };

        // ========== 가등록 상품결제수단정보 ========== //
        prPregGoodsBase.prPregGoodsPayMeanInfoList = priceInfoObj.payMeanInfo;

        // ========== 가등록 단품옵션정보 ========== //
        prPregGoodsBase.prPregItmOptnInfoList = saleInfoObj.itemOptnInfo;

        // ========== 가등록 단품기본 ========== //
        prPregGoodsBase.prPregItmBaseList = saleInfoObj.itemBaseInfo;

        // ========== 가등록 상품홍보문구이력 ========== //
        prPregGoodsBase.prPregAdveWrdHistList = adveWrdGridData;

        // ========== 가등록 증정품이력 ========== //
        prPregGoodsBase.prPregPrestHistList = prestGridData;

        // var prPregGoodsContInfoList = [];
        // prPregGoodsBase.prPregGoodsContInfoList = prPregGoodsContInfoList; // 가등록 상품컨텐츠정보

        console.log('>>>>>>>>>>> 저장 데이터 <<<<<<<<<<<<');
        console.log('가등록 상품기본 : '); console.log(prPregGoodsBase);
        console.log('가등록 예약판매이력 : '); console.log(prPregGoodsBase.prPregRsvSaleHist);
        console.log('가등록 상품항목정보 : '); console.log(prPregGoodsBase.prPregGoodsItemInfoList);
        console.log('가등록 상품안전인증이력 : '); console.log(prPregGoodsBase.prPregGoodsSafeCertiHistList);
        console.log('가등록 상품가격이력 : '); console.log(prPregGoodsBase.prPregGoodsPrcHist);
        console.log('가등록 상품결제수단정보 : '); console.log(prPregGoodsBase.prPregGoodsPayMeanInfoList);
        console.log('가등록 단품옵션정보 : '); console.log(prPregGoodsBase.prPregItmOptnInfoList);
        console.log('가등록 단품기본 : '); console.log(prPregGoodsBase.prPregItmBaseList);
        console.log('가등록 상품홍보문구이력 : '); console.log(prPregGoodsBase.prPregAdveWrdHistList);
        console.log('가등록 증정품이력 : '); console.log(prPregGoodsBase.prPregPrestHistList);

        var sendData = {};
        sendData['dispCtgGrid'] = dispCtgGridData;         // 표준카테고리전시정보 목록
        sendData['assocGoodsGrid'] = assocGoodsGridData;   // 가등록 연계상품정보 목록
        sendData.formPayload = prPregGoodsBase;

        return sendData;

    }
    ,sendData : function ( sendData, callBackFnc ) {

        console.log('>>>>>>>>>>> 전송 데이터 <<<<<<<<<<<<');
        console.log(sendData);

        // 이미지 저장

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + (( pageType === 'C') ? 'goods/TemporaryGeneralGoods.modifyTemporaryGeneralGoods.do' : 'goods/TemporaryGeneralGoods.registTemporaryGeneralGoods.do')
            , JSON.stringify(sendData)
            , callBackFnc
            , true
            ,"application/json;charset=UTF-8"
            ,!( pageType === 'C')
        );

    }
    // 수정 및 저장
    ,save : function ( callBackFnc ) {

        // 저장 가능 조건 - 승인상태 : 임시저장(10), 반려(30)
        if ($('#pregStatCd').val() === '20' || $('#pregStatCd').val() === '40') return;

        if ( !this.validation() ) return;
        if ( !confirm(goodsCommonMsg.saveConfirmMsg) ) return;

        var sendData = this.getSendData();
        this.sendData(sendData, callBackFnc);

    }
    // 승인요청
    ,request : function ( callBackFnc ) {

        // 승인요청 가능 조건 - 승인상태가 : 임시저장(10)
        if ( $('#pregStatCd').val() === '20' || $('#pregStatCd').val() === '30' || $('#pregStatCd').val() === '40' ) return;

        if ( !this.validation() ) return;
        if(  !confirm(goodsCommonMsg.approvalRequestConfirmMsg) ) return;

        var requestData = this.getSendData();
        requestData.formPayload.pregStatCd = '20';                                             // 승인상태 : 승인대기(20)
        requestData.formPayload.aprvReqDt = replaceCalendarStringWithLength(getTodayDate());   // 승인요청일자

        this.sendData(requestData, callBackFnc);

    }
    // 전시이미지
    ,saveDetailImageFiles : function ( detailInfoObj ) {

        var detailImageExist = ( detailInfoObj.detailType === 'image' )? true : false;
        var detailImageSaveSuccess = false;
        var result = [];

        if ( detailImageExist ) {
            var detailImageFiles = detailInfoObj.detailInfo;
            this.saveImageFiles( detailImageFiles, function ( data ) {
                if (Array.isArray(data)) {
                    data.forEach(function ( goodsContInfo ) {
                        result.push({
                            cmtTypCd: goodsContInfo.cmtTypCd
                            , goodsDtlDesc: ''
                            , imgGbCd: goodsContInfo.imgGbCd
                            , contFilePathNm: goodsContInfo.contFilePathNm
                            , contFileNm: goodsContInfo.contFileNm
                        });
                    });
                    detailImageSaveSuccess = true;
                }
            });
            if (!detailImageSaveSuccess) {
                console.log('Result >> 전시이미지 저장 실패')
                return null;
            }
        }
        return result;
    }
    // 기본이미지
    ,saveBaseImageFiles : function (imageInfoObj) {

        var baseImageSaveSuccess = false;
        var result = [];

        this.saveImageFiles( imageInfoObj.baseImageFiles, function ( data ) {
            if (Array.isArray(data)) {
                data.forEach(function ( goodsContInfo ) {
                    result.push({
                        cmtTypCd: goodsContInfo.cmtTypCd
                        , goodsDtlDesc: ''
                        , imgGbCd: goodsContInfo.imgGbCd
                        , contFilePathNm: goodsContInfo.contFilePathNm
                        , contFileNm: goodsContInfo.contFileNm
                    });
                });
                baseImageSaveSuccess = true;
            }
        });

        if (!baseImageSaveSuccess) {
            console.log('Result >> 기본이미지 저장 실패')
            return null;
        }
        return result;
    }
    // 추가이미지
    ,saveSubImageFiles : function ( imageInfoObj ) {

        var subImageSaveSuccess = false;
        var subImageExist = ( imageInfoObj.subImageFiles.get('file') === null
            || imageInfoObj.subImageFiles.get('file') === undefined )? false : true;
        var result = [];

        if ( subImageExist ) {
            this.saveImageFiles( imageInfoObj.subImageFiles, function (data) {
                if (Array.isArray(data)) {
                    data.forEach(function ( goodsContInfo ) {
                        result.push({
                            cmtTypCd: goodsContInfo.cmtTypCd
                            , goodsDtlDesc: ''
                            , imgGbCd: goodsContInfo.imgGbCd
                            , contFilePathNm: goodsContInfo.contFilePathNm
                            , contFileNm: goodsContInfo.contFileNm
                        });
                    });
                    subImageSaveSuccess = true;
                }
            });
            if (!subImageSaveSuccess) {
                console.log('Result >> 추가이미지 저장 실패')
                return null;
            }
        }
        return result;

    }
    ,saveImageFiles : function ( imageFiles, callBackFnc ) {

        $.ajax({
            url: "/goods/TemporaryGeneralGoods.uploadTemporaryGeneralGoodsImage.do",
            data: imageFiles,
            type: 'POST',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            dataType: 'json',
            cache: false,
            async: false,
            success: callBackFnc,
            error: function (error) {
                // 이미지 저장 실패
            }
        });
    }
}