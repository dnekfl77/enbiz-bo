var _benefitMsg = x2coMessage.getMessage( {
	noSelectedSave    : 'orderReception.manualOrder.promotionInfo.msg.noSelectedSave',
	nextQuestion      : 'orderReception.manualOrder.promotionInfo.msg.nextQuestion',
});

$.namespace('benefitGrid.eventhandler');
benefitGrid.eventhandler = {
	// 초기화
	init : function () {
		this.gridLoading();
		this.bindButtonEvent();
	}
	, gridLoading : function(){
		this.grid.setFooters({visible:true});
		this.grid.rowIndicator.footText = "합계";
		this.grid.columnByName("promoNm").footer.text = "총할인금액";
		this.grid.groupBy(["promoNo","promoTypNm","overlapCpnYn","promoNm"], false);				//행그룹핑([fieldNames], sorting)
		this.grid.setRowGroup({
			mergeMode:true
			, expandedAdornments: 'none'		//Group정보 표시위치(footer, header, both, summary, none)
			, mergeExpanderVisibility: 'none'	//확장정보 포함 여부(default, none)
		})
		this.grid.checkBar.mergeRule = "value['promoNo']";
	}

	//이벤트 처리
	, bindButtonEvent : function(){

		var self = this;

		// 혜택선택 완료
		$("#promotionCompleted").click(function() {

			if($('#aeCheck').val() === 'N'){
				return;
			}

			if($('#promotionCheck').val() === 'Y'){
				return;
			}

			var checkedRows = benefitGrid.eventhandler.grid.getCheckedRows();
			if(checkedRows.length <= 0){
				if(!confirm(_benefitMsg.noSelectedSave)){
					return;
				}
				benefitGrid.eventhandler.onCancel('D');

			}else{

				if(!confirm(_benefitMsg.nextQuestion)){
					return;
				}
				benefitGrid.eventhandler.onSearch("S");
			}

			$('#promotionCheck').val('Y');
			dlvAmtGrid.eventhandler.onSearch();
		});

		// 혜택 수정
		$('#promotionRevise').click(function(){

			if(!confirm(_commonMsg.next)){
				return false;
			}

			receiveManualOrder.reviseSetting(4);
		});
	}

	//혜택적용호출
	, onSearch : function(type) {

		//type : 'A': 모두 , 'S' : 선택된것만만
		var gGrid = goodsGrid.eventhandler.grid;
		var provider = gGrid.getDataSource();
		var paramObj ={};

		var goodsInfoList = [];


		for( var row = 0; row < gGrid.getItemCount(); row++ ){
			var index = gGrid.getItemIndex(row);

			var goodsNo = provider.getValue(gGrid.getDataRow(index), "goodsNo");    //상품
			var itmNo = provider.getValue(gGrid.getDataRow(index)  , "itmNo");      //상품
			var salePrc = provider.getValue(gGrid.getDataRow(index), "salePrc");    //펀매가
			var ordQty = provider.getValue(gGrid.getDataRow(index), "ordQty");      //주문수량
			var stdCtgNo = provider.getValue(gGrid.getDataRow(index), "stdCtgNo");  //표준상품분류
			var dispCtgNo = provider.getValue(gGrid.getDataRow(index), "dispCtgNo");//전시카테고리
			var brandNo = provider.getValue(gGrid.getDataRow(index), "brandNo");    //브랜드
			var entrNo = provider.getValue(gGrid.getDataRow(index), "entrNo");      //협력사

			goodsInfoList.push(goodsNo+","+itmNo+","+salePrc+","+ordQty+","+stdCtgNo+","+dispCtgNo+","+brandNo+","+entrNo);
		}

		paramObj.mbrNo = $("#mbrNo").val();
		paramObj.media = backOfficeCode;
		paramObj.goodsInfoList = goodsInfoList;

		if(type !== 'A'){
			var pGrid = benefitGrid.eventhandler.grid;
			var pProvider = benefitGrid.eventhandler.grid.getDataSource();
			var promotionList = [];

			for(var i = 0; i<pProvider.getRowCount(); i++){
				var _itemIndex = pGrid.getItemIndex(i);
				if(pGrid.isCheckedItem(_itemIndex)){
					promotionList.push(pProvider.getValue(pGrid.getDataRow(_itemIndex),"promoNo"));
				}
			}

			paramObj.promotionList = promotionList;
		}

		/* 선택버튼 클릭후 그리드 refresh 후 조회 */
		this.defaultHandler.onCancel(benefitGrid.eventhandler.grid);

		common.Ajax.sendJSONRequest("POST"
			, _baseUrl + "order/orderReception.getBenefitList.do"
			, JSON.stringify(paramObj)
			, this.callBackBenefit
			, false
			,"application/json;charset=UTF-8"
		);
	}
	,callBackBenefit : function(data){
		if(data.length === 0){
			alert('조회된 혜택이 없습니다!');
			return false;
		}
		var grid = benefitGrid.eventhandler.grid;
		var provider = grid.getDataSource();

		provider.addRows(data);
		grid.commit();
	}
	,onCancel : function(type){
		$('#promotionCheck').val('N');
		if(type==='D') {
			this.defaultHandler.onCancel(benefitGrid.eventhandler.grid);
		}
	}
	//중복 check function
	,selectedCheck : function(grid, item){
		var provider = grid.getDataSource();
		var dataRow = grid.getDataRow(item);
		var thisDiscountLevel = provider.getValue(dataRow, "discountLevel");
		var thisPromoNo = provider.getValue(dataRow, "promoNo");
		var thisPromoTypCd = provider.getValue(dataRow, "promoTypCd");

		for(var i = 0; i<grid.getItemCount(); i++){
			var _itemIndex = grid.getItemIndex(i);
			var promoNo = provider.getValue(grid.getDataRow(_itemIndex),"promoNo");
			var discountLevel = provider.getValue(grid.getDataRow(_itemIndex),"discountLevel");
			var promoTypCd = provider.getValue(grid.getDataRow(_itemIndex),"promoTypCd");

			if(discountLevel === '2' && promoNo!==thisPromoNo && thisDiscountLevel === discountLevel){
				grid.checkItem(_itemIndex,false);
			}

			if(discountLevel !== '2' && promoNo!==thisPromoNo && thisPromoTypCd===promoTypCd){
				grid.checkItem(_itemIndex,false);
			}
		}
	}

	//그리드 이벤트 핸들링
	, gridEvent : {

		afterQuerySuccess : function(grid, data) {

		}

		/*grouping 된 데이터 check 눌렀을때*/
		,onItemsChecked :function (grid, items, checked) {
			if(!checked){
				return;
			}
			benefitGrid.eventhandler.selectedCheck(grid,items[0]);
		}

		/*grouping 안된  데이터 check 눌렀을때*/
		,onItemChecked :function (grid, items, checked) {
			if(!checked){
				return;
			}
			benefitGrid.eventhandler.selectedCheck(grid,items);
		}

	}
};