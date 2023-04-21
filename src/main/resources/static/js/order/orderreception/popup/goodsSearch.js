var _alertMsg = x2coMessage.getMessage( {
	apply : "orderReception.message.apply",
	stkQty : "orderReception.addGoodsPopup.msg.stkQty",
	selectYn : "orderReception.addGoodsPopup.msg.selectYn",
});
$.namespace('goodsSearch')
goodsSearch = {
	init : function () {
		this.bindButtonEvent();
	}

	//페이지 이벤트 등록
	, bindButtonEvent: function () {
		var _self = this;

        //닫기 버튼
        $("#btn_popup_close").click(function() {
            window.close();
        });

		//적용 버튼
        $('#btn_popup_apply').click(function(){

			var index = $("li.active").val();
			var selectedGrid = {};

			switch(index){
				case 1 :
					selectedGrid = keyWordGrid.eventhandler.grid;
					break;
				case 2 :
					selectedGrid = orderHistGrid.eventhandler.grid;
					break;
				case 3 :
					selectedGrid = wishListGrid.eventhandler.grid;
					break;
				case 4 :
					selectedGrid = bestGrid.eventhandler.grid;
					break;
			}

			var checkedRows = selectedGrid.getCheckedRows();
			var checkedIndexRows = selectedGrid.getItemsOfRows(checkedRows);

			if (checkedRows.length === 0) {
				alert(_msg.noSelectedDataMsg);
				return false;
			}

			if(!confirm(_alertMsg.apply)) {
				return false;
			}

			var returnList = [];
			var check = true;
			checkedIndexRows.forEach((item) => {

				var selectYn = selectedGrid.getDataSource().getValue(selectedGrid.getDataRow(item), "selectYn");
				var stkQty = selectedGrid.getDataSource().getValue(selectedGrid.getDataRow(item), "stkQty");

				if(selectYn === 'N'){
					alert(_alertMsg.selectYn);
					check = false;
					return false;
				}

				if(stkQty <= 0){
					alert(_alertMsg.stkQty);
					check = false;
					return false;
				}

				var data = selectedGrid.getDataSource().getJsonRow(selectedGrid.getDataRow(item));
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
				returnList.push(dataList);
			});


			if(!check){
				return;
			}

			window.postMessage(JSON.stringify(returnList), _baseUrl);
			window.close();

        });
	}
}