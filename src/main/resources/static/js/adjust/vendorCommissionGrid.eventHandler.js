$.namespace("vendorCommissionGrid.eventhandler");

vendorCommissionGrid.eventhandler = {
    // 초기화
    init : function () {
		this.gridLoading();
		this.calendarInit();
        this.bindButtonEvent();
    },
    
    gridLoading : function(){
		this.grid.setEditOptions({ editable: false }) // 그리드 수정불가
	},
    
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(3);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
    },
    
    bindButtonEvent : function(){
        var self = this;
        
        //달력버튼
        $('#calendarButton').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#startDate').val(),
                yyyymmdd2:$('#endDate').val(),
                max_term:31,
                fn:function(pin) {
                    $('#startDate').val(pin.yyyymmdd1);
                    $('#endDate').val(pin.yyyymmdd2);
                }
            });
        });
        
        $('#calendar-term').change(function(){
            $('#calendar-term option:selected').each(function(){
                var fromAndToCalDate = recentlyCalenderData($(this).val());
                $('#startDate').val(fromAndToCalDate[0]);
                $('#endDate').val(fromAndToCalDate[1]);
            })
        });
        
        $('#btn_list').click(function() {
            self.onSearch(0, true);
        });
        
        $('#btn_init').click(function() {
            $('#vendorCommissionGridForm')[0].reset();
            self.calendarInit();
        });
        
        $("#vendorCommissionGridForm").keypress(function (e){
            if (e.which == 13){
                $('#btn_list').click();
                window.event.returnValue=false;
            }
        });
        
        // 협력사 검색
        $('#btn_entr_popup_call').on('click', function () {
            var pin = {
	            argSelectType: '1'      // 선택구분   ( 단건선택 : 1, 다건선택 : N )
	            , argEntrGbCd: '10'     // 협력사구분  ( 상품공급업자 : 10, 제휴사업자 : 20 )
	            , argTrdStatCd: ''      // 거래상태   ( 거래대기 : 10, 거래중 : 20, 거래종료 : 30 )
	        };
	        var POP_DATA = {
	            url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
	            , winName: 'etEntrListPopup'
	            , title: '협력사조회'
	            , _title: '협력사조회'
	            , left: 10
	            , top: 10
	            , width: 741
	            , height: 700
	            , scrollbars: false
	            , autoresize: false
	        };
	        popCommon(pin, POP_DATA, function ( e ) {
	            var returnValue = JSON.parse(e.data);
	            var entrNo = returnValue[0].entrNo;
	            var entrNm = returnValue[0].entrNm;
	
	            $('#entrNo').val(entrNo);
	            $('#entrNm').val(entrNm);
	        });
        });
        
        // 협력사 초기화
        $('#btn_entr_popup_reset').on( 'click', function () {
            $('#entrNo, #entrNm').val('');
        });
        
//        $('#btn_grid_excel').click(function() {
//            self.onExcelExport();
//        });
    },
    
    onSearch : function(pageNo, isOpenToast){
        var that = this;
        this.grid.cancel();
        
        var startDate = replaceCalendarString($('#startDate').val());
        var endDate = replaceCalendarString($('#endDate').val());
        var param = '&startDate=' + startDate + '&endDate=' + endDate;
        
        pageNo = !pageNo ? 0 : pageNo;
        var pageFunc = function (pageNo) { return that.onSearch(pageNo); };
        this.controller.doQuery(this, param, pageNo, pageFunc, null, isOpenToast);
    },
    
//    onExcelExport: function() {
//        var self = this;
//        var startDate = replaceCalendarString($('#startDate').val());
//        var endDate = replaceCalendarString($('#endDate').val());
//        if($('#goodsNo').val() == null) { $('#goodsNo').val('') }
//        if($('#entrNo').val() == null) { $('#entrNo').val('') }
//
//        var excelHeader = self.defaultHandler.onExcelHeader(this.grid); // 그리드 해더 추출
//
//        var param = 'startDate=' + startDate + '&endDate=' + endDate;
//        param += "&" + $("#fullOrderGridForm").serialize() + "&excelHeader=" + encodeURIComponent(JSON.stringify(excelHeader));
//
//        window.location.href = _baseUrl + "delivery/fullOrderInquiryList.fullOrderInquiryExcelDownload.do?" + param;
//    },
};