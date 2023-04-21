var reviewReplyRegistMsg = x2coMessage.getMessage({
     noReplyContMsg              : 'reviewMgmt.reviewReplyRegist.alert.msg.noReplyContMsg'
    ,maxReplyContMsg              : 'reviewMgmt.reviewReplyRegist.alert.msg.maxReplyContMsg'
    ,confirmBadWordRegistMsg    : 'reviewMgmt.reviewReplyRegist.alert.msg.confirmBadWordRegistMsg'
    ,confirmRegistMsg           : 'reviewMgmt.reviewReplyRegist.alert.msg.confirmRegistMsg'
    ,successReplyRegistMsg      : 'reviewMgmt.reviewReplyRegist.alert.msg.successReplyRegistMsg'
});

$.namespace("reviewReplyRegist.eventhandler");
reviewReplyRegist.eventhandler = {
    init : function () {
        this.bindButtonEvent();
    }
    ,bindButtonEvent : function () {

        var that = this;

        // 취소 & 닫기
        $('#btn_popup_close, #btn_popup_bottom_close').on('click', function () {
            that.cancel(false);
        });

        // 저장
        $('#btn_popup_apply').on('click', function () {
            that.save();
        });
    }
    ,cancel : function ( succeeded ) {
        window.postMessage( JSON.stringify({succeeded : succeeded}), _baseUrl );
        window.close();
    }
    ,save : function () {

        var that = this;
        var replyCont =  $('#replyCont').val();
        if ( replyCont === '' ) {
            alert(reviewReplyRegistMsg.noReplyContMsg);
            return;
        }

        if ( replyCont.length > 4000 ) {
            alert(reviewReplyRegistMsg.maxReplyContMsg);
            return;
        }

        // 금칙어 확인

        if ( !confirm(reviewReplyRegistMsg.confirmRegistMsg) ) return;

        var param = {};
        param.revNo = _revNo;
        param.replyCont = replyCont;

        common.Ajax.sendJSONRequest(
            "POST"
            , _baseUrl + "goods/ReviewMgmt.registReviewReply.do"
            , param
            , function ( data ) {
                if ( data.succeeded ) {
                    that.cancel(true);
                }
            }, null, null, false
        );
    }
}