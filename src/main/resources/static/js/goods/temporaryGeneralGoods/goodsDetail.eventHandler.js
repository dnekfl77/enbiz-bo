var goodsDetailMsg = x2coMessage.getMessage({
    resetConfirmMsg : 'adminCommon.alert.reset.check'
    ,closeConfirmMsg : 'adminCommon.alert.close.check'
});

$.namespace('goodsDetail.eventhandler');
goodsDetail.eventhandler = {
    // 초기화
    init : function () {
        this.setButton();
        this.bindData();
        this.bindButtonEvent();
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 초기화
        $('#btn_temp_goods_detail_reset').off('click').on( 'click', function() {
            if(!confirm(goodsDetailMsg.resetConfirmMsg)) return;
            that.reset();
        });

        // 임시저장(수정)
        $('#btn_temp_goods_detail_save').off('click').on( 'click', function () {
            that.save();
        });

        // 승인요청
        $('#btn_temp_goods_detail_request_approval').off('click').on( 'click', function () {
            that.request();
        });

        // 닫기
        $('#btn_temp_goods_detail_close').off('click').on( 'click', function () {
            if(!confirm(goodsDetailMsg.closeConfirmMsg)) return;
            that.close();
        });
    }
    // 버튼 세팅
    ,setButton : function () {

        if ( goodsInfo === null ) return;

        // 임시저장버튼 > 승인상태가 임시저장(10) 혹은 반려(30)인 경우 임시저장버튼 활성화처리
        if( goodsInfo.pregStatCd == '10' || goodsInfo.pregStatCd == '30' ) {
            $('#btn_temp_goods_detail_save').removeClass('disabled');
        }

        // 승인요청버튼 > 승인상태가 임시저장(10)인 경우 활성화처리
        if( goodsInfo.pregStatCd == '10' ) {
            $('#btn_temp_goods_detail_request_approval').removeClass('disabled');
        }
    }
    // 데이터 세팅
    ,bindData : function () {

        console.log('>>>>>>>>>>> 조회 데이터 <<<<<<<<<<<<');
        console.log(goodsInfo);

        if ( goodsInfo === null ) return;

        // ========== 기본정보 ========== //
        basicInfo.eventhandler.setBasicInfo( goodsInfo );

        // ========== 상품정보 ========== //
        goodsInfo.eventhandler.setGoodsInfo( goodsInfo );

        // ========== 상품고시품목정보 ========== //
        announcementInfo.eventhandler.setAnnouncementInfo( goodsInfo );

        // ========== 가격정보 ========== //
        priceInfo.eventhandler.setPriceInfo( goodsInfo );

        // ========== 배송정보 ========== //
        deliveryInfo.eventhandler.setDeliveryInfo( goodsInfo );

        // ========== 판매옵션 ========== //
        itemListGrid.eventhandler.setSaleInfo( goodsInfo );

        // ========== 상품상세설명 ========== //
        detailInfo.eventhandler.setDetailInfo( goodsInfo );

        // ========== 부가정보 ========== //

        // 전시카테고리
        dispCtgGrid.eventhandler.setDispCtgGrid( goodsInfo );

        // 연관상품
        assocGoodsGrid.eventhandler.setAssocGoodsGrid( goodsInfo.prPregAssocGoodsInfoList );

        // 홍보문구
        adveWrdGrid.eventhandler.setAdveWrdGrid( goodsInfo.prPregAdveWrdHistList );

        // 증정품
        prestGrid.eventhandler.setPrestGrid( goodsInfo.prPregPrestHistList );

        // ========== 상품이미지 ========== //
        imageInfo.eventhandler.setImageInfo( goodsInfo );

    }
    // 초기화
    ,reset : function () {
        goodsRegist.eventhandler.reset();   // 초기화
        this.bindData();                    // 데이터세팅
    }
    // 닫기
    ,close : function ( ) {
        window.close();
    }
    ,save : function () {
        goodsCommon.eventhandler.save( this.callBackFnc );
    }
    ,request : function () {
        goodsCommon.eventhandler.request( this.callBackFnc );
    }
    ,callBackFnc : function ( data ) {
        if( data.succeeded !== undefined && data.succeeded ) window.location.reload(); // 새로고침
    }
}