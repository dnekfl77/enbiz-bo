$.namespace('orderHistGrid.eventhandler');
orderHistGrid.eventhandler = {
	// 초기화
	init : function () {
		this.resetDate();
		this.gridLoading();
		this.bindButtonEvent();
	}
	, gridLoading : function(){
		this.grid.setCheckableExpression("(values['selectYn'] = 'Y') and (values['stkQty'] > 0)", true);
	}

	//조회조건 초기화
	, resetDate : function(){
		var now = new Date();	// 현재 날짜 및 시간
		var oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));	// 한달 전
		$('#ordFnshStartDtm').val(this.getFormatDate(oneMonthAgo, "-"));//조회시작일
		$('#ordFnshEndDtm').val(this.getFormatDate(new Date(), "-"));//조회종료일
	}

	//이벤트 처리
	, bindButtonEvent : function(){
		var _self = this;

		// 고객주문이력 검색 조건 초기화
		$('#btnOrderHistSearchInit').click(function () {
			$('#orderHistSearchForm')[0].reset();
			_self.resetDate();
		});
		// 고객주문이력 검색
		$('#btnOrderHistSearch').click(function () {
			_self.onOrderHistSearch(0);
		});

        $('#btn_call_calender').on( 'click', function () {
            _self.callCalender();
        });
	}


	//날짜포멧
    , getFormatDate : function (date, format) {
        var year = date.getFullYear();              //yyyy
	    var month = (1 + date.getMonth());          //M
	    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
	    var day = date.getDate();                   //d
	    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
	    return  year + format + month + format + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    }


	//달력
    , callCalender : function () {
        showCalendar({
            type : 'A', // A : 시작,종료일선택, B : 해당 날짜 1개 선택
            format : 'yyyy-MM-dd',
            yyyymmdd1 : $('#ordFnshStartDtm').val(),
            yyyymmdd2 : $('#ordFnshEndDtm').val(),
            fn:function(pin) {
                $('#ordFnshStartDtm').val(pin.yyyymmdd1);
                $('#ordFnshEndDtm').val(pin.yyyymmdd2);
            }
        });
    }

	// 고객주문이력 조회
	, onOrderHistSearch : function (pageNo) {
		this.grid.cancel();
		var _self = this;

		pageNo = !pageNo ? 0 : pageNo;
		var pageFunc = function (pageNo) { return _self.onKeyWordSearch(pageNo); };

		var extraQueryString = 'periodYn=' + ($('#periodYn').is(":checked") ? "Y" : "N");
		this.controller.doQuery(_self, extraQueryString, pageNo, pageFunc);
	}

	, gridEvent  : {
		onCellDblClicked : function(grid, clickData){

			if(clickData.column === "goodsNo" || clickData.column === "goodsNm"){
				var goodsNo = grid.getDataSource().getValue(grid.getCurrent().dataRow, "goodsNo");
				var pin = { type: 'R', goodsNo: goodsNo };
				var POP_DATA = {
					url: _baseUrl + 'goods/GoodsCommon.goodsView.do'
					, winName: 'goodsDetailPopup'
					, title: '상품상세팝업'
					, _title: '상품상세팝업'
					, left: 20
					, top: 20
					, width: 1500
					, height: 700
					, scrollbars: false
					, autoresize: false
				};
				popCommon(pin, POP_DATA,function(e){});
			}else{

				var selectYn = grid.getDataSource().getValue(grid.getCurrent().dataRow, "selectYn");
				var stkQty = grid.getDataSource().getValue(grid.getCurrent().dataRow, "stkQty");

				if(selectYn === 'N'){
					alert(_alertMsg.selectYn);
					return;
				}

				if(stkQty <= 0){
					alert(_alertMsg.stkQty);
					return;
				}

				var selectDataList = [];
				var data = grid.getDataSource().getJsonRow(clickData.dataRow);
				var dataList = {};


				//popup hidden
				dataList.itmNo = data.itmNo;					// 단품번호
				dataList.buyQtyLmtYn = data.buyQtyLmtYn;		// 구매수량제한여부
				dataList.minLmtQty = data.minLmtQty;			// 최소구매수량
				dataList.maxLmtQty = data.maxLmtQty;			// 최대구매수량
				dataList.goodsTypCdNm = data.goodsTypCdNm;		// 상품유형코드(PR002)
				dataList.deliGoodsGbCdNm = data.deliGoodsGbCdNm;// 배송상품구분코드(PR010)
				dataList.deliWayCdNm = data.deliWayCdNm;		// 배송수단코드(PR009)
				dataList.deliDday = data.deliDday;				// 배송기일
				dataList.saleMethCdNm = data.saleMethCdNm;		// 판매방식코드(PR003)
				dataList.fwdidcPrarDy = data.fwdidcPrarDy;		// 예약상품배송시작일(출고지시예정일자)
				dataList.buyTypCdNm = data.buyTypCdNm;			// 거래형태(매입형태코드(PR006))
				dataList.dispCtgNo = data.dispCtgNo;			// 전시카테고리번호
				dataList.siteNo = data.siteNo;					// 사이트번호
				dataList.stdCtgNo = data.stdCtgNo;				// 표준카테고리번호
				dataList.entrNo = data.entrNo;					// 협력사번호
				dataList.brandNo = data.brandNo;				// 브랜드번호
				dataList.chlNo = data.chlNo;					// 채널번호
				dataList.bdlDeliPsbYn = data.bdlDeliPsbYn;		// 묶음배송가능여부
				dataList.deliPolcNo = data.deliPolcNo;			// 배송정책번호
				dataList.deliProcTypCd = data.deliProcTypCd;	// 배송처리유형코드(PR008)
				dataList.deliWayCd = data.deliProcTypCd;		// 배송수단코드(PR009)(01:택배배송, 02:무배송)

				//popup Show
				dataList.goodsNo = data.goodsNo;				// 상품번호
				dataList.goodsNm = data.goodsNm;				// 상품명
				dataList.optnNm = data.optnNm;					// 단품명
				dataList.brandNm = data.brandNm;				// 브랜드
				dataList.salePrc = data.salePrc;				// 판매가
				dataList.stkQty = data.stkQty;					// 재고수량
				dataList.prestNm = data.prestNm;				// 증정품명
				dataList.deliProcTypCdNm = data.deliProcTypCdNm;// 배송처리구분
				dataList.entrNm = data.entrNm;					// 협력사명

				selectDataList.push(dataList);
				window.postMessage(JSON.stringify(selectDataList), _baseUrl);
			}
		}
	}
};