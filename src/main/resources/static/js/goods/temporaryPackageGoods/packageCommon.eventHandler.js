var packageGoodsCommonMsg = x2coMessage.getMessage({
    saveConfirmMsg : 'adminCommon.grid.alert.save'
    ,approvalRequestConfirmMsg : 'packageGoods.alert.msg.approvalRequestConfirmMsg'
});

$.namespace('packageCommon.eventhandler');
packageCommon.eventhandler = {
    init : function () {
        if ( _pageType === 'R') {
            packageRegist.eventhandler.init();
        } else if ( _pageType === 'U') {
            packageDetail.eventhandler.init();
        }
        this.bindButtonEvent();
    }
    ,bindButtonEvent: function () {

        // 입력 byte 수 제한
        $("input:text[checkByte]").on("keyup change", function () {
            var limitByte = $(this).attr("data-limitByte");
            byteLimitCheck($(this), limitByte, '');
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
    ,reset : function () {
        packageBasicInfo.eventhandler.resetPkgBasicInfo();
        packageGoodsInfo.eventhandler.resetPkgGoodsInfo();
        packageRelatedGoodsListGrid.eventhandler.resetPkgInfo();
        packageDetailInfo.eventhandler.resetDetailInfo();
        packageImageInfo.eventhandler.resetImageInfo();
    }
    ,save : function ( callBackFnc ) {

        if( !this.validatePkgGoodsInfo() ) return;
        if ( !confirm(packageGoodsCommonMsg.saveConfirmMsg) ) return;

        var saveData = this.getSendData();
        this.send( saveData, callBackFnc )

    }
    ,request : function ( callBackFnc ) {

        if( !this.validatePkgGoodsInfo() ) return;
        if( !confirm(packageGoodsCommonMsg.approvalRequestConfirmMsg) ) return;

        var requestData = this.getSendData();
        requestData.formPayload.pregStatCd = '20';                                              // 승인상태 : 승인대기(20)
        requestData.formPayload.aprvReqDt = replaceCalendarStringWithLength(getTodayDate());    // 승인요청일자

        this.send( requestData, callBackFnc )

    }
    ,validatePkgGoodsInfo : function () {
        if(!packageBasicInfo.eventhandler.validatePkgBasicInfo()) return false;
        if(!packageGoodsInfo.eventhandler.validatePkgGoodsInfo()) return false;
        if(!packageRelatedGoodsListGrid.eventhandler.validatePkgInfo()) return false;
        //if(!packageDetailInfo.eventhandler.validationCheck()) return false;
        //if(!packageImageInfo.eventhandler.validationCheck()) return false;
        return true;
    }
    ,getSendData : function () {

        // ========== 기본정보 ========== //
        var pkgBasicInfoObj = packageBasicInfo.eventhandler.getPkgBasicInfo();

        // ========== 상품정보 ========== //
        var pkgGoodsObj = packageGoodsInfo.eventhandler.getPkgGoodsInfo();

        // ========== 묶음상품구성 ========== //
        var pkgObj = packageRelatedGoodsListGrid.eventhandler.getPkgInfo();

        // ========== 상품상세설명 ========== //
        var pkgDetailInfoObj =  packageDetailInfo.eventhandler.getDetailInfo();

        // ========== 상품이미지 ========== //
        var pkgImageInfoObj = packageImageInfo.eventhandler.getImageInfo();

        console.log('>>>>>>>>>>> 입력 데이터 <<<<<<<<<<<<');
        console.log('기본정보 : '); console.log(pkgBasicInfoObj);
        console.log('상품정보 : '); console.log(pkgGoodsObj);
        console.log('묶음상품구성 : '); console.log(pkgObj);
        console.log('상품상세설명 : '); console.log(pkgDetailInfoObj);
        console.log('상품이미지 : '); console.log(pkgImageInfoObj);

        var prPregGoodsBase = {
            pregGoodsNo     : pkgBasicInfoObj.pregGoodsNo         // 가등록상품번호
            ,entrNo         : pkgBasicInfoObj.entrNo              // 협력사번호
            ,stdCtgNo       : pkgBasicInfoObj.stdCtgNo            // 표준분류카테고리번호
            ,goodsNm        : pkgGoodsObj.goodsNm                 // 상품명
            ,pregStatCd     : pkgGoodsObj.pregStatCd              // 가등록상태코드
            ,brandNo        : pkgGoodsObj.brandNo                 // 브랜드번호
            ,modlNm         : pkgGoodsObj.modlNm                  // 모델명
            ,homeNm         : pkgGoodsObj.homeNm                  // 원산지명
            ,mfcoNm         : pkgGoodsObj.mfcoNm                  // 제조사명
            ,incomNm        : pkgGoodsObj.incomNm                 // 수입자명
            ,salemnNm       : pkgGoodsObj.salemnNm                // 판매자명
            ,saleStrDtm     : pkgGoodsObj.saleStrDtm              // 판매시작일시
            ,saleEndDtm     : pkgGoodsObj.saleEndDtm              // 판매종료일시
            ,dispYn         : pkgGoodsObj.dispYn                  // 전시여부
            ,prcCompaExpYn  : pkgGoodsObj.prcCompaExpYn           // 가격비교노출여부
            ,schPsbYn       : pkgGoodsObj.schPsbYn                // 검색가능여부
            ,schKwd1Nm      : pkgGoodsObj.schKwd1Nm               // 검색키워드1명
            ,schKwd2Nm      : pkgGoodsObj.schKwd2Nm               // 검색키워드2명
            ,schKwd3Nm      : pkgGoodsObj.schKwd3Nm               // 검색키워드3명
            ,pkgGoodsPrioRnkCd : pkgObj.pkgGoodsPrioRnkCd         // 묶음상품우선순위코드
        };

        var sendData = {};
        sendData.packageRelatedGoodsListGrid = pkgObj.packageRelatedGoodsListGridData;
        sendData.formPayload = prPregGoodsBase;

        return sendData;
    }
    ,send : function ( sendData, callBackFnc ) {

        console.log('>>>>>>>>>>> 저장 데이터 <<<<<<<<<<<<');
        console.log(sendData);

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + 'goods/TemporaryPackageGoods.saveTemporaryPackageGoods.do'
            , JSON.stringify(sendData)
            , callBackFnc
            , true
            ,"application/json;charset=UTF-8"
            , ( _pageType === 'R')
        );

    }
}