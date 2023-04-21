var packageDetailMsg = x2coMessage.getMessage({
    resetConfirmMsg : 'adminCommon.alert.reset.check'
    ,closeConfirmMsg : 'adminCommon.alert.close.check'
});

$.namespace('packageDetail.eventhandler');
packageDetail.eventhandler = {
    init : function () {
        this.bindButtonEvent();
        this.bindData();
    }
    ,bindButtonEvent : function () {
        var that = this;

        // 초기화
        $('#btn_temp_pkg_goods_detail_reset').off('click').on( 'click', function() {
            if(!confirm(packageDetailMsg.resetConfirmMsg)) return;
            that.reset();
        });

        // 임시저장
        $('#btn_temp_pkg_goods_detail_save').off('click').on( 'click', function () {
            that.save();
        });

        // 승인요청
        $('#btn_temp_pkg_goods_detail_request_approval').off('click').on( 'click', function () {
            that.request();
        });

        // 닫기
        $('#btn_temp_pkg_goods_detail_close').off('click').on( 'click', function () {
            if(!confirm(packageDetailMsg.closeConfirmMsg)) return;
            that.close();
        });
    }
    ,bindData : function () {

        var prPregGoodsBase = _pkgGoodsInfo;

        console.log('>>>>>>>>>>> 조회 데이터 <<<<<<<<<<<<');
        console.log(prPregGoodsBase);

        packageBasicInfo.eventhandler.setPkgBasicInfo(prPregGoodsBase);
        packageGoodsInfo.eventhandler.setPkgGoodsInfo(prPregGoodsBase);
        packageRelatedGoodsListGrid.eventhandler.setPkgInfo(prPregGoodsBase, prPregGoodsBase.prPregRelGoodsInfoList);
        //pkgDetailInfo.eventhandler.setDetailInfo();
        //pkgImageInfo.eventhandler.setImageInfo();
    }
    ,reset : function () {
        packageCommon.eventhandler.reset();
        this.bindData();
    }
    ,save : function () {
        packageCommon.eventhandler.save( this.callBackFnc );
    }
    ,request : function () {
        packageCommon.eventhandler.request( this.callBackFnc );
    }
    ,callBackFnc : function ( data ) {
        if( data.succeeded !== undefined && data.succeeded ) window.location.reload(); // 새로고침
    }
    ,close : function () {
        window.close();
    }
}