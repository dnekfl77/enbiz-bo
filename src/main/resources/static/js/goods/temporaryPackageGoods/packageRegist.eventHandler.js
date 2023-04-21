var packageRegistMsg = x2coMessage.getMessage({
    resetConfirmMsg : 'adminCommon.alert.reset.check'
});

$.namespace('packageRegist.eventhandler');
packageRegist.eventhandler = {
    init : function () {
        this.bindData();
        this.bindButtonEvent();
    }
    ,bindData : function () {

        // 승인상태
        $('#pregStatCd').val(_pkgGoodsInfo.pregStatCd);

        // 판매기간
        var today = new Date();
        var year = today.getFullYear();
        var month = (today.getMonth()+1).toString().padStart(2,'0');
        var date = (today.getDate()+1).toString().padStart(2,'0');

        $('#saleStrDtm').val(year + '-' + month + '-' + date);
        $('#saleEndDtm').val('2999-12-31');
    }
    ,bindButtonEvent : function () {

        var that = this;
        // 초기화
        $('#btn_pkg_goods_regist_reset').off('click').on( 'click', function() {
            if(!confirm(packageRegistMsg.resetConfirmMsg)) return;
            that.reset();
        });

        // 임시저장
        $('#btn_pkg_goods_regist_save').off('click').on( 'click', function () {
            that.save();
        });

        // 승인요청
        $('#btn_pkg_goods_regist_request_approval').off('click').on( 'click', function () {
            that.request();
        });
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
        if ( data.succeeded !== undefined && data.succeeded) packageRegist.eventhandler.reset();
    }
}