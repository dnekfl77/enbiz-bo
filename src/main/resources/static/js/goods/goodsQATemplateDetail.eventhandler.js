var goodsQATemplateDetailMsg = x2coMessage.getMessage({
    noAnsTmplNmMsg : 'goodsQATemplateMgmt.save.popup.alert.msg.noAnsTmplNmMsg'
    ,noAnsTmplContMsg : 'goodsQATemplateMgmt.save.popup.alert.msg.noAnsTmplContMsg'
});

$.namespace('goodsQATemplateDetail.eventhandler');
goodsQATemplateDetail.eventhandler = {
    init : function () {
        this.bindButtonEvent();
    }
    ,bindButtonEvent : function () {

        $('#btn_popup_cancel').on( 'click', function () {
            window.close();
        });

        $('#btn_popup_apply').on( 'click', function () {

            var ansTmplNm = $('#ansTmplNm').val();
            var ansTmplCont = $('#ansTmplCont').val();

            if ( ansTmplNm.isEmpty() ) {
                alert(goodsQATemplateDetailMsg.noAnsTmplNmMsg);
                return;
            }

            if ( ansTmplCont.isEmpty() ) {
                alert(goodsQATemplateDetailMsg.noAnsTmplContMsg);
                return;
            }

            var data = {};
            data.ansTmplNm = ansTmplNm;
            data.ansTmplCont = ansTmplCont;

            window.postMessage( JSON.stringify(data), _baseUrl );
            window.close();

        });
    }
}