var goodsQATransferMsg = x2coMessage.getMessage({
    noMvotCausMsg : 'goodsQAMgmt.goodsQADetail.goodsQATransfer.alert.msg.noMvotCausMsg'
    ,minMvotCausMsg : 'goodsQAMgmt.goodsQADetail.goodsQATransfer.alert.msg.minMvotCausMsg'
    ,maxMvotCausMsg : 'goodsQAMgmt.goodsQADetail.goodsQATransfer.alert.msg.maxMvotCausMsg'
    ,confirmTransferMsg : 'goodsQAMgmt.goodsQADetail.goodsQATransfer.alert.msg.confirmTransferMsg'
});

$.namespace("goodsQATransfer.eventhandler");
goodsQATransfer.eventhandler = {
    init : function () {
        this.bindButtonEvent();
    }
    ,bindButtonEvent : function () {

        var that = this;

        // 취소 & 닫기
        $('#btn_popup_cancel, #btn_popup_close').on('click', function () {
            that.close(false);
        });

        // 저장
        $('#btn_popup_save').on('click', function () {
            that.save();
        });
    }
    ,close : function ( succeeded ) {
        window.postMessage( JSON.stringify({succeeded : succeeded}), _baseUrl );
        window.close();
    }
    ,save : function () {

        var that = this;
        var mvotCaus = $('#mvotCaus').val();

        var param = {};
        param.questNo = _questInfo.questNo;
        param.mvotCaus = mvotCaus;

        mvotCaus = mvotCaus.replace(/\s+/g,'');

        if ( !mvotCaus ) {
            alert(goodsQATransferMsg.noMvotCausMsg);
            return;
        }

        if ( mvotCaus.length < 5 ) {
            alert(goodsQATransferMsg.minMvotCausMsg);
            return;
        }

        if ( mvotCaus.length > 4000 ) {
            alert(goodsQATransferMsg.maxMvotCausMsg);
            return;
        }

        if ( !confirm(goodsQATransferMsg.confirmTransferMsg) ) return;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/GoodsQAMgmt.transferGoodsQuestion.do"
            , param
            , function ( data ) {
                if ( data.succeeded ) {
                    that.close(true);
                }
            }
            , null
            , null
            ,false
        );
    }
}