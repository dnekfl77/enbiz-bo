var goodsApprovalReturnPopupMsg = x2coMessage.getMessage({
     noSelectedReturnCusMsg              : 'goodsApprovalMgmt.returnPopup.alert.msg.noSelectedReturnCusMsg'
    ,noInputReturnCusMsg                 : 'goodsApprovalMgmt.returnPopup.alert.msg.noInputReturnCusMsg'
    ,goodsReturnConfirmMsg               : 'goodsApprovalMgmt.returnPopup.alert.msg.goodsReturnConfirmMsg'
});

$.namespace("goodsApprovalReturnPopup.eventhandler");
goodsApprovalReturnPopup.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
    }
    // 이벤트
    ,bindButtonEvent : function () {

        var that = this;

        // 취소
        $('#btn_popup_close').on('click', function () {
            that.close(false);
        });

        // 반려
        $('#btn_popup_return').on('click', function () {
            that.return();
        });
    }
    ,return : function () {

        var that = this;

        var retnCausCd = $('#retnCausCd').val();
        var retnCaus =  $('#retnCaus').val();

        // 반려사유를 선택하지 않은 경우
        if ( retnCausCd === '' ) {
            alert(goodsApprovalReturnPopupMsg.noSelectedReturnCusMsg);
            return;
        }

        // 반려 사유 상세를 입력하지 않은 경우
        if ( retnCaus === '' ) {
            alert(goodsApprovalReturnPopupMsg.noInputReturnCusMsg);
            return;
        }

        // 반려사유 확인 메세지
        if (!confirm(goodsApprovalReturnPopupMsg.goodsReturnConfirmMsg) ) return;

        var param = { retnCausCd : retnCausCd, retnCaus : retnCaus, pregGoodsNo : pregGoodsNo };
        common.Ajax.sendRequest("POST"
            , _baseUrl + "goods/GoodsApprovalMgmt.returnGoods.do"
            , param
            , function ( result ) {
                that.close(result.succeeded);
            }, false
        );
    }
    ,close : function ( succeeded ) {
        window.postMessage( JSON.stringify({succeeded : succeeded}), _baseUrl );
        window.close();
    }
}

