$.namespace('sysNtcDetailPopup.eventhandler');
sysNtcDetailPopup.eventhandler = {
    // 초기화
    init : function () {
		this.bindButtonEvent();
    },
    bindButtonEvent : function () {
        $('#btn_popup_bottom_close').click(function () {
            window.close();
        });
    }
};
