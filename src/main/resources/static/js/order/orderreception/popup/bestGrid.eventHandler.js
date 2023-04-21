$.namespace('bestGrid.eventhandler');
bestGrid.eventhandler = {
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

		// 찜목록 검색
		$('#btnBestSearch').click(function () {
			_self.onBestSearch(0);
		});
	}

	// 찜목록 조회
	, onBestSearch : function (pageNo) {
		this.grid.cancel();
		var _self = this;

		pageNo = !pageNo ? 0 : pageNo;
		var pageFunc = function (pageNo) { return _self.onBestSearch(pageNo); };
		this.controller.doQuery(_self, '', pageNo, pageFunc);
	}

	//상품 상세 팝업(작업중...)
	, callGoodsPopup : function(){
		var pin = {
			mbrNo: $('#mbrNo').val()
		};
		var POP_DATA = {
			url: _baseUrl + 'popup/goodsMgmtPopup.goodsListPopup.do'
			, winName: 'goodsListPopup'
			, title: '상품 조회'
			, _title: '상품 조회'
			, left: 20
			, top: 20
			, width: 1000
			, height: 700
			, scrollbars: false
			, autoresize: false
		};

		popCommon(pin, POP_DATA, this.popupGoodsListCallback);
	}

	, gridEvent  : {
		onCellDblClicked : function(grid, clickData){
			if(clickData.column != "goodsNo" && clickData.column != "goodsNm"){

				const selectDataList = [];
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

			var filedName = clickData.fieldName;
			var nRow = clickData.itemIndex;

			switch(filedName){
				//상품명
				case "goodsNm" :
					// 상품상세 팝업
					var goodsNoVal = grid.getValue(nRow, 'goodsNo');
					var pin = {searchGoodsNo : goodsNoVal, scrId : "400529"};
					callGoodsPopup(pin);
				break;

				//상품번호
				case "goodsNo" :
					// 상품상세 팝업
					var goodsNoVal = grid.getValue(nRow, 'goodsNo');
					var pin = {searchGoodsNo : goodsNoVal, scrId : "400529"};
					callGoodsPopup(pin);
				break;
			}
		}
	}
};