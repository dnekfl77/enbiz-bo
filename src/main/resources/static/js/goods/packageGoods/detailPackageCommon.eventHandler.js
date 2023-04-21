var detailPkgCommonMsg = x2coMessage.getMessage({
    resetConfirmMsg : 'adminCommon.alert.reset'
    ,closeConfirmMsg : 'adminCommon.alert.popup.close'
    ,saveConfirmMsg : 'adminCommon.grid.alert.save'
});

$.namespace('detailPackageCommon.eventhandler');
detailPackageCommon.eventhandler = {
    init : function () {
        this.bindButtonEvent();
        this.bindData();
        this.setButton();
    }
    ,bindButtonEvent : function () {

        var that = this;

        // 미리보기
        $('#btn_pkg_goods_detail_preview').off('click').on( 'click', function () {
            that.preview();
        });

        // 저장
        $('#btn_pkg_goods_detail_save').off('click').on( 'click', function () {
            that.save();
        });

        // 초기화
        $('#btn_pkg_goods_detail_reset').off('click').on( 'click', function() {
            if(!confirm(detailPkgCommonMsg.resetConfirmMsg)) return;
            that.reset();
        });

        // 닫기
        $('#btn_pkg_goods_detail_close').off('click').on( 'click', function () {
            if( pageType === 'E' && _saleStatCd !== '40' && !confirm(detailPkgCommonMsg.closeConfirmMsg)) return;
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
    ,setButton : function () {
        if ( pageType === 'R' || _saleStatCd === '40' ) { // 읽기전용, 판매상태가 '판매종료'
            // 이벤트 바인딩 해제
            $('#btn_pkg_goods_detail_save').unbind('click');
            $('#btn_pkg_goods_detail_reset').unbind('click');
            return;
        }
        $('#btn_pkg_goods_detail_save, #btn_pkg_goods_detail_reset').removeClass('disabled');
    }
    ,bindData : function () {

        console.log('>>>>>>>>>>> 조회 데이터 <<<<<<<<<<<<');
        console.log(goodsInfo);

        detailPackageBasicInfo.eventhandler.setPkgBasicInfo(goodsInfo.prGoodsBase);
        detailPackageGoodsInfo.eventhandler.setPkgGoodsInfo(goodsInfo.prGoodsBase);
        packageRelatedGoodsListGrid.eventhandler.setPkgInfo(goodsInfo.prGoodsBase, goodsInfo.prRelGoodsInfoList);
        // packageDetailInfo.eventhandler.setDetailInfo();
        // packageImageInfo.eventhandler.setImageInfo();
    }
    // 미리보기
    ,preview : function () {
        alert('서비스 준비중입니다.');
    }
    ,validatePkgGoodsInfo : function () {
        if(!detailPackageGoodsInfo.eventhandler.validatePkgGoodsInfo()) return false;
        if(!packageRelatedGoodsListGrid.eventhandler.validatePkgInfo()) return false;
        //if(!packageDetailInfo.eventhandler.validationCheck()) return false;
        //if(!packageImageInfo.eventhandler.validationCheck()) return false;
        return true;
    }
    ,getSendData : function () {

        // ========== 기본정보 ========== //
        var pkgDetailBasicInfoObj = detailPackageBasicInfo.eventhandler.getPkgBasicInfo();

        // ========== 상품정보 ========== //
        var pkgDetailGoodsObj = detailPackageGoodsInfo.eventhandler.getPkgGoodsInfo();

        // ========== 묶음상품구성 ========== //
        var pkgObj = packageRelatedGoodsListGrid.eventhandler.getPkgInfo();

        // ========== 상품상세설명 ========== //
        var pkgDetailInfoObj =  packageDetailInfo.eventhandler.getDetailInfo();

        // ========== 상품이미지 ========== //
        var pkgImageInfoObj = packageImageInfo.eventhandler.getImageInfo();

        console.log('>>>>>>>>>>> 입력 데이터 <<<<<<<<<<<<');
        console.log('기본정보 : '); console.log(pkgDetailBasicInfoObj);
        console.log('상품정보 : '); console.log(pkgDetailGoodsObj);
        console.log('묶음상품구성 : '); console.log(pkgObj);
        console.log('상품상세설명 : '); console.log(pkgDetailInfoObj);
        console.log('상품이미지 : '); console.log(pkgImageInfoObj);

        var prGoodsBase = {
            goodsNo         : pkgDetailBasicInfoObj.goodsNo             // 상품번호
            ,goodsNm        : pkgDetailGoodsObj.goodsNm                 // 상품명
            ,brandNo        : pkgDetailGoodsObj.brandNo                 // 브랜드번호
            ,modlNm         : pkgDetailGoodsObj.modlNm                  // 모델명
            ,homeNm         : pkgDetailGoodsObj.homeNm                  // 원산지명
            ,mfcoNm         : pkgDetailGoodsObj.mfcoNm                  // 제조사명
            ,incomNm        : pkgDetailGoodsObj.incomNm                 // 수입자명
            ,salemnNm       : pkgDetailGoodsObj.salemnNm                // 판매자명
            ,dispYn         : pkgDetailGoodsObj.dispYn                  // 전시여부
            ,saleStatCd     : pkgDetailGoodsObj.saleStatCd              // 판매상태
            ,saleEndDtm     : pkgDetailGoodsObj.saleEndDtm              // 판매종료일시
            ,prcCompaExpYn  : pkgDetailGoodsObj.prcCompaExpYn           // 가격비교노출여부
            ,schPsbYn       : pkgDetailGoodsObj.schPsbYn                // 검색가능여부
            ,schKwd1Nm      : pkgDetailGoodsObj.schKwd1Nm               // 검색키워드1명
            ,schKwd2Nm      : pkgDetailGoodsObj.schKwd2Nm               // 검색키워드2명
            ,schKwd3Nm      : pkgDetailGoodsObj.schKwd3Nm               // 검색키워드3명
            ,pkgGoodsPrioRnkCd : pkgObj.pkgGoodsPrioRnkCd               // 묶음상품우선순위코드
        };

        var sendData = {};
        sendData.packageRelatedGoodsListGrid = pkgObj.packageRelatedGoodsListGridData;
        sendData.formPayload = {
            prGoodsBase : prGoodsBase
        };

        return sendData;

    }
    ,send : function ( sendData, callBackFnc ) {

        console.log('>>>>>>>>>>> 저장 데이터 <<<<<<<<<<<<');
        console.log(sendData);

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + 'goods/GoodsCommon.modifyPackageGoods.do'
            , JSON.stringify(sendData)
            , callBackFnc
            , true
            ,"application/json;charset=UTF-8"
            ,false
        );

    }
    ,save : function () {
        if ( !this.validatePkgGoodsInfo() ) return;
        if ( !confirm(detailPkgCommonMsg.saveConfirmMsg) ) return;
        this.send( this.getSendData(), this.saveCallBackFnc )
    }
    ,saveCallBackFnc : function ( data ) {
        if ( data.succeeded !== undefined && data.succeeded ) window.location.reload(); // 새로고침
    }
    ,reset : function () {
        detailPackageGoodsInfo.eventhandler.resetPkgGoodsInfo();
        packageRelatedGoodsListGrid.eventhandler.resetPkgInfo();
        packageDetailInfo.eventhandler.resetDetailInfo();
        packageImageInfo.eventhandler.resetImageInfo();
        this.bindData();
    }
    ,close : function () {
        window.close();
    }
}