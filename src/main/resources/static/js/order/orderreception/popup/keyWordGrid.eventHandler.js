$.namespace('keyWordGrid.eventhandler')
keyWordGrid.eventhandler = {
	// 초기화
	init : function () {
		this.gridLoading();
		this.bindButtonEvent();
	}
	, gridLoading : function(){
		this.grid.setCheckableExpression("(values['selectYn'] = 'Y') and (values['stkQty'] > 0)", true);
	}

	//이벤트 처리
	, bindButtonEvent : function(){
		var _self = this;

		// 협력사 조회
		$('#btn_call_entr_popup').on( 'click', function () {
			_self.callEntrPopup();
		});

		// 협력사 초기화
		$('#btn_reset_entr_popup').on( 'click', function () {
			$('#entrNo').val('');
			$('#entrNm').val('');
		});

		// 전시 카테고리 TREE 공통팝업 호출
		$('#btn_dispPopup_call').click(function() {
			_self.displayCategoryTreeCall();
		});

		// 전시카테고리 초기화
		$('#btn_dispPopup_reset').on( 'click', function () {
			$('#dispCtgNo').val('');
			$('#dispCtgNm').val('');
		});

		// 키워드 검색 조건 초기화
		$('#btnKeyWordSearchInit').click(function () {
			$('#keyWordSearchForm')[0].reset();
		});

		// 키워드 검색
		$('#btnKeyWordSearch').click(function () {
			_self.onKeyWordSearch(0);
		});
	}

	//협력사조회 팝업
	, callEntrPopup : function () {
		var pin = {
			argSelectType   : '1' // 선택구분 ( 1 : 단건선택, N : 다건선택 )
		};
		var POP_DATA = {
			url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
			, winName: 'etEntrListPopup'
			, title: '협력사조회'
			, _title: '협력사조회'
			, left: 20
			, top: 20
			, width: 1000
			, height: 700
			, scrollbars: false
			, autoresize: false
		};
		popCommon(pin, POP_DATA, function (e) {
			var returnValue = JSON.parse(e.data);
			$('#entrNo').val(returnValue[0].entrNo);
			$('#entrNm').val(returnValue[0].entrNm);
		});
	}

	// 전시 카테고리 공통팝업 호출
	, displayCategoryTreeCall : function() {
		var pin = {};
		var POP_DATA = {
			  url: _baseUrl + 'popup/displayCategoryMgmtPopup.displayCategoryTreeListPopup.do'
			, winName: 'displayCategoryTreePopup'
			, title: '전시 카테고리 Tree 조회'
			, _title: '전시 카테고리 Tree 조회'
			, left: 20
			, top: 20
			, width: 400
			, height: 400
			, scrollbars: false
			, autoresize: false
		};
		popCommon(pin, POP_DATA, this.popupDisplayCategoryTreeCallback);
	}

	// 전시카테고리 공통팝업 콜백
	, popupDisplayCategoryTreeCallback : function(e) {
        var resultData = JSON.parse(e.data);
        $('#dispCtgNm').val(resultData[0].dispCtgNm);
        $('#dispCtgNo').val(resultData[0].dispCtgNo);
	}

	// 키워드 조회
	, onKeyWordSearch : function (pageNo) {
		this.grid.cancel();
		var _self = this;

		pageNo = !pageNo ? 0 : pageNo;
		var pageFunc = function (pageNo) { return _self.onKeyWordSearch(pageNo); };
		this.controller.doQuery(_self, '', pageNo, pageFunc);
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