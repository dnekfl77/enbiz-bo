$.namespace('dashboard.eventhandler');
dashboard.eventhandler = {
    init : function () {
        this.bindButtonEvent();
    }
    ,bindButtonEvent : function () {
		$('#btn_goodsTodayNewCnt').off('click').on('click', function() {
            var goodsRegStartDtm = getTodayDate();
            var goodsRegEndDtm = getTodayDate();
            var saleStatCd = '10';
            var link = "/goods/GoodsMgmt.goodsMgmtView.do?goodsRegStartDtm=" + goodsRegStartDtm
                        + "&goodsRegEndDtm=" + goodsRegEndDtm + "&saleStatCd=" + saleStatCd;
            var id = "1100019-1100012";
            var text = "상품관리";

            parent.openIframeByManual(id, text, link);
        });
        $('#btn_goodsTodaySoldOutCnt').off('click').on('click', function() {
            var goodsRegStartDtm = getTodayDate();
            var goodsRegEndDtm = getTodayDate();
            var saleStatCd = '20';
            var link = "/goods/GoodsMgmt.goodsMgmtView.do?goodsRegStartDtm=" + goodsRegStartDtm
                        + "&goodsRegEndDtm=" + goodsRegEndDtm + "&saleStatCd=" + saleStatCd;
            var id = "1100019-1100012";
            var text = "상품관리";

            parent.openIframeByManual(id, text, link);
        });
        $('#btn_goods2WeekSellingCnt').off('click').on('click', function() {
            var fromAndToCalDate = recentlyCalenderData(14);
            var goodsRegStartDtm = fromAndToCalDate[0];
            var goodsRegEndDtm = fromAndToCalDate[1];
            var saleStatCd = '10';
            var link = "/goods/GoodsMgmt.goodsMgmtView.do?goodsRegStartDtm=" + goodsRegStartDtm
                        + "&goodsRegEndDtm=" + goodsRegEndDtm + "&saleStatCd=" + saleStatCd;
            var id = "1100019-1100012";
            var text = "상품관리";

            parent.openIframeByManual(id, text, link);
        });
        $('#btn_goods2WeekSoldOutCnt').off('click').on('click', function() {
            var fromAndToCalDate = recentlyCalenderData(14);
            var goodsRegStartDtm = fromAndToCalDate[0];
            var goodsRegEndDtm = fromAndToCalDate[1];
            var saleStatCd = '20';
            var link = "/goods/GoodsMgmt.goodsMgmtView.do?goodsRegStartDtm=" + goodsRegStartDtm
                        + "&goodsRegEndDtm=" + goodsRegEndDtm + "&saleStatCd=" + saleStatCd;
            var id = "1100019-1100012";
            var text = "상품관리";

            parent.openIframeByManual(id, text, link);
        });

        $('#btn_noticeMore').off('click').on('click', function() {
            var link = "/system/systemNoticeMgmt.systemNoticeMgmtView.do";
            var id = "1100097-1101875";
            var text = "시스템 공지관리";

            parent.openIframeByManual(id, text, link);
        });

        $('#btn_alarmMore').off('click').on('click', function() {
            openJobCnctListpop();
        });

        $('#btn_goodsQnaIngMore').off('click').on('click', function() {
            alert('작업 중 입니다');
            return ;
            var fromAndToCalDate = recentlyCalenderData(30);
            var goodsRegStartDtm = fromAndToCalDate[0];
            var goodsRegEndDtm = fromAndToCalDate[1];
            var saleStatCd = '20';
            var link = "/system/systemNoticeMgmt.systemNoticeMgmtView.do";
            var id = "1100097-1101875";
            var text = "시스템 공지관리";

            parent.openIframeByManual(id, text, link);
        });
        $('#btn_approvalMore').off('click').on('click', function() {
            var fromAndToCalDate = recentlyCalenderData(30);
            var aprvReqStartDt = fromAndToCalDate[0];
            var aprvReqEndDt = fromAndToCalDate[1];
            var link = "/goods/GoodsInfoManagement.goodsApprovalMgmtView.do?aprvReqStartDt=" + aprvReqStartDt
                            + "&aprvReqEndDt=" + aprvReqEndDt;
            var id = "1100018-1100012";
            var text = "상품승인관리";
            parent.openIframeByManual(id, text, link);
        });
    },
	openSysNtcPopup : function(bbcNo) {
		var pin = {bbcNo: bbcNo, scrId: ''};
        var POP_DATA = {
            url: '/main/sysNtcDetailPopup.do'
            , winName: 'openSysNtcPopup'
         	, title: 'test'
          	, _title: 'test'
            , left: 20
            , top: 20
            , width: 800
            , height: 700
            , scrollbars: false
            , autoresize: false
        }
        popCommon(pin, POP_DATA, null);
	}
}