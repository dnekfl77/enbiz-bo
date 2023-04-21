var _orderGiftMsg = x2coMessage.getMessage( {
	noSelectedSave    : "orderReception.manualOrder.orderGiftInfo.msg.noSelectedSave",
	nextQuestion      : "orderReception.manualOrder.orderGiftInfo.msg.nextQuestion",
});


$.namespace('orderGiftGrid.eventhandler');
orderGiftGrid.eventhandler = {
	// 초기화
	init : function () {
		this.bindButtonEvent();
	}

	//이벤트 처리
	, bindButtonEvent : function(){

		// 사은품 선택완료
		$("#orderGiftCompleted").click(function() {

			//상품선택 이전 클릭 막기
			if($('#goodsCheck').val()==='N'){
				return;
			}

			//사은품선택후 막기
			if($('#aeCheck').val() === 'Y'){
				return;
			}

			var checkedRows = orderGiftGrid.eventhandler.grid.getCheckedRows();
			if(checkedRows.length <= 0){
				if(!confirm(_orderGiftMsg.noSelectedSave)){
					return;
				}
			}else{
				if(!confirm(_orderGiftMsg.nextQuestion)){
					return;
				}
			}

			var giftGrid = orderGiftGrid.eventhandler.grid;
			var provider = giftGrid.getDataSource();

			for( var row = 0; row < giftGrid.getItemCount(); row++ ){
				var _itemIndex = giftGrid.getItemIndex(row);
				var dataRow = giftGrid.getDataRow(_itemIndex);

				if(giftGrid.isCheckedItem(_itemIndex)){
					continue;
				}

				provider.setOptions({ softDeleting: false });
				provider.removeRow(dataRow);
			}

			orderGiftGrid.eventhandler.grid.columnByName("mbrDlvpSeq").editable = false;
			$('#aeCheck').val('Y'); //사은품 선택 완료

			//혜택적용 호출
			benefitGrid.eventhandler.onSearch("A");
		});

		// 사은품 수정
		$("#orderGiftRevise").click(function() {
			if(!confirm(_commonMsg.next)){
				return false;
			}

			receiveManualOrder.reviseSetting(3);
		});
	}

	// 사은품 조회
	, onSearch : function() {

		var gGrid = goodsGrid.eventhandler.grid;
		var provider = gGrid.getDataSource();

		var paramObj ={};

		//비회원
		if($("#mbrNo").val()===noMember){
			paramObj.mbrNo = noMember;
		}else {
			paramObj.mbrNo = memberData.mbrNo;
		}

		var goodsInfoList = [];

		for( var row = 0; row < gGrid.getItemCount(); row++ ){
			var index = gGrid.getItemIndex(row);

			//사이트 , 채널은 server에서
			var goodsNo = provider.getValue(gGrid.getDataRow(index), "goodsNo");     //상품
			var itmNo = provider.getValue(gGrid.getDataRow(index), "itmNo");     //상품
			var salePrc = provider.getValue(gGrid.getDataRow(index), "salePrc");     //펀매가
			var ordQty = provider.getValue(gGrid.getDataRow(index), "ordQty");    	 //주문수량
			var stdCtgNo = provider.getValue(gGrid.getDataRow(index), "stdCtgNo");   //표준상품분류
			var dispCtgNo = provider.getValue(gGrid.getDataRow(index), "dispCtgNo"); //전시카테고리
			var brandNo = provider.getValue(gGrid.getDataRow(index), "brandNo");     //브랜드
			var entrNo = provider.getValue(gGrid.getDataRow(index), "entrNo");       //협력사

			goodsInfoList.push(goodsNo+","+itmNo+","+salePrc+","+ordQty+","+stdCtgNo+","+dispCtgNo+","+brandNo+","+entrNo);
		}

		paramObj.mbrNo = $("#mbrNo").val();
		paramObj.media = backOfficeCode;
		paramObj.goodsInfoList = goodsInfoList;

		common.Ajax.sendJSONRequest("POST"
			, _baseUrl + "order/orderReception.getOrderGiftList.do"
			, JSON.stringify(paramObj)
			, this.callBackOrderGift
			, false
			,"application/json;charset=UTF-8"
		);

	}
	,callBackOrderGift : function(data){
		if(data.length === 0){
			alert('조회된 사은품이 없습니다!');
			return false;
		}
		var grid = orderGiftGrid.eventhandler.grid;
		var provider = grid.getDataSource();

		provider.addRows(data);
		orderGiftGrid.eventhandler.setDlvp(grid,provider);
		grid.commit();
	}

	//배송지 목록
	, setDlvp : function(grid,provider){
		$.realGridUtils.clearDropDown(grid, 'mbrDlvpSeq');//배송지  DropDown 전체 삭제
		orderDlvpInfo.forEach(function(allDlvpInfo){
			$.realGridUtils.addDropDownItems(grid, 'mbrDlvpSeq', allDlvpInfo.dlvpAddr, allDlvpInfo.mbrDlvpSeq);
		})

		for( var row = 0; row < grid.getItemCount(); row++ ){
			var index = grid.getItemIndex(row);
			provider.setValue(grid.getDataRow(index), 'mbrDlvpSeq', orderDlvpInfo[0].mbrDlvpSeq);// 배송지
		}
	}
	,onCancel : function(type){
		$('#aeCheck').val('N');
		orderGiftGrid.eventhandler.grid.columnByName("mbrDlvpSeq").editable = true;
		if(type==='D') {
			this.defaultHandler.onCancel(orderGiftGrid.eventhandler.grid);
		}
	}
	//그리드 이벤트 핸들링
	, gridEvent : {
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
			}
		}
	}
};