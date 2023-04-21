var goodsRegistMsg = x2coMessage.getMessage({
    resetConfirmMsg : 'adminCommon.alert.reset.check'
});

$.namespace("goodsRegist.eventhandler");
goodsRegist.eventhandler = {
    // 초기화
    init : function () {
        this.bindData();
        this.bindButtonEvent();
    }
    // 데이터 세팅
    ,bindData : function () {

        if ( goodsInfo === null ) return;

        // 승인상태 세팅
        $('#pregStatCd').val(goodsInfo.pregStatCd);

        // 매입형태 세팅
        $('#buyTypCd').val(goodsInfo.buyTypCd);

        // 배송처리유형 세팅
        $('#deliProcTypCd').val(goodsInfo.deliProcTypCd);

        // 판매기간
        var today = new Date();
        var year = today.getFullYear();
        var month = (today.getMonth()+1).toString().padStart(2,'0');
        var date = (today.getDate()+1).toString().padStart(2,'0');

        $('#saleStrDtm').val(year + '-' + month + '-' + date);
        $('#saleEndDtm').val('2999-12-31');

    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 초기화
        $('#btn_goods_regist_reset').off('click').on('click', function() {
            if(!confirm(goodsRegistMsg.resetConfirmMsg)) return;
            that.reset();
        });

        // 임시저장
        $('#btn_goods_regist_save').off('click').on( 'click', function () {
            that.save();
        });

        // 승인요청
        $('#btn_goods_regist_request_approval').off('click').on( 'click', function () {
            that.request();
        });
    }
    // 초기화
    ,reset : function () {

        basicInfo.eventhandler.resetBasicInfo();                // 기본정보 초기화
        goodsInfo.eventhandler.resetGoodsInfo();                // 상품정보 초기화
        announcementInfo.eventhandler.resetAnnouncementInfo();  // 상품고시품목정보 초기화
        priceInfo.eventhandler.resetPriceInfo();                // 가격정보 초기화
        deliveryInfo.eventhandler.resetDeliveryInfo();          // 배송정보 초기화
        itemListGrid.eventhandler.resetSaleInfo();              // 판매옵션 초기화

        detailInfo.eventhandler.resetDetailInfo();              // 상품상세설명 초기화

        dispCtgGrid.eventhandler.resetDispCtgGrid();            // 부가정보 > 전시카테고리 초기화
        assocGoodsGrid.eventhandler.resetAssocGoodsGrid();      // 부가정보 > 연관상품 초기화
        adveWrdGrid.eventhandler.resetAdveWrdGrid();            // 부가정보 > 홍보문구 초기화
        prestGrid.eventhandler.resetPrestGrid();                // 부가정보 > 증정품 초기화

        imageInfo.eventhandler.resetImageInfo();                // 상품이미지 초기화

        this.bindData();

    }
    ,save : function () {
        goodsCommon.eventhandler.save( this.callBackFnc );
    }
    ,request : function () {
        goodsCommon.eventhandler.request( this.callBackFnc );
    }
    ,callBackFnc : function ( data ) {
        if ( data.succeeded !== undefined && data.succeeded) goodsRegist.eventhandler.reset();
    }
}