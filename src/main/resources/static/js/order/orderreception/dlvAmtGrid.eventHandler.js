var _dlvAmtGridMsg = x2coMessage.getMessage( {
	nextQuestion    : "orderReception.manualOrder.dlvAmtGrid.msg.nextQuestion"
});

$.namespace('dlvAmtGrid.eventhandler');
dlvAmtGrid.eventhandler = {
	// 초기화
	init : function () {
		this.gridLoading();
		this.bindButtonEvent();
	}
	, gridLoading : function(){
		this.grid.setFooters({visible:true});
		this.grid.rowIndicator.footText = "합계";
	}

	//이벤트 처리
	, bindButtonEvent : function(){

		// 배송비 선택
		$('#dlvAmtCompleted').click(function() {

			//혜택적용 클릭이전 막기
			if($('#promotionCheck').val()==='N'){
				return;
			}

			//배송비선택후 막기
			if($('#dlvAmtCheck').val() === 'Y'){
				return;
			}

			if(!confirm(_dlvAmtGridMsg.nextQuestion)){
				return;
			}

			dlvAmtGrid.eventhandler.grid.columnByName("dlvpCoupon").editable = false;
			$('#dlvAmtCheck').val('Y');

			orderPay.settingPayInfo();
		});

		$('#dlvAmtRevise').click(function(){

			if(!confirm(_commonMsg.next)){
				return false;
			}

			receiveManualOrder.reviseSetting(5);
		});
	}
	,onCancel : function(type){
		$('#dlvAmtCheck').val('N');
		dlvAmtGrid.eventhandler.grid.columnByName("dlvpCoupon").editable = true;
		if(type==='D') {
			this.defaultHandler.onCancel(dlvAmtGrid.eventhandler.grid);
		}
	}
	// 배송비 조회
	, onSearch : function() {

		//상품번호, 단품번호 , 수량 , 가격 , 할인가 , 배송정책 , 우편번호
		//상품 선택 그리드
		//사은품 선택 그리드
		var paramObj = {};
		var dlvList = [];
		this.getGoodsDlvInfo(goodsGrid.eventhandler.grid,dlvList,true);
		this.getGoodsDlvInfo(orderGiftGrid.eventhandler.grid,dlvList,false);
		console.log(dlvList);

		paramObj.dlvList = JSON.stringify(dlvList);

		common.Ajax.sendJSONRequest("POST"
			, _baseUrl + "order/orderReception.getDlvAmtList.do"
			, paramObj
			, this.callBackDlvAmt
			, false
		);
	}
	,getGoodsDlvInfo(vGrid,vDlvList,isGoods){
		/*
		* vGrid : grid
		* dlvList : 배송정보 조회 data 리스트
		* isGoods : true(상품) , false(사은품)
		*
		* */

		//혜택적용 그리드
		var bGrid = benefitGrid.eventhandler.grid;
		var bProvider = bGrid.getDataSource();
		var vProvider = vGrid.getDataSource();

		for( var row = 0; row < vGrid.getItemCount(); row++ ){
			var index = vGrid.getItemIndex(row);

			var goodsNo    = '';
			var goodsNm    = '';
			var itmNo      = '';
			var itmNm      = '';
			var salePrc    = '';
			var ordQty     = '';
			var deliPolcNo = '';
			var mbrDlvpSeq = '';
			var bdlDeliPsbYn = '';

			//혜택
			var benefitPrc = 0;

			if(isGoods) {
				goodsNo    = vProvider.getValue(vGrid.getDataRow(index), "goodsNo");       //상품
				goodsNm    = vProvider.getValue(vGrid.getDataRow(index), "goodsNm");       //상품명
				itmNo      = vProvider.getValue(vGrid.getDataRow(index), "itmNo");         //단품번호
				itmNm      = vProvider.getValue(vGrid.getDataRow(index), "optnNm");        //단품명
				salePrc    = vProvider.getValue(vGrid.getDataRow(index), "salePrc");       //펀매가
				ordQty     = vProvider.getValue(vGrid.getDataRow(index), "ordQty");    	   //주문수량
				deliPolcNo = vProvider.getValue(vGrid.getDataRow(index), "deliPolcNo");    //배송비 정책
				mbrDlvpSeq = vProvider.getValue(vGrid.getDataRow(index), "mbrDlvpSeq");    //회원배송지 순번
				bdlDeliPsbYn = vProvider.getValue(vGrid.getDataRow(index), "bdlDeliPsbYn");//묶음배송가능여부

				for (var j = 0; j < bGrid.getItemCount(); j++) {
					var bIndex = bGrid.getItemIndex(j);

					var bGoodsNo = bProvider.getValue(bGrid.getDataRow(bIndex), "goodsNo");
					var bItmNo = bProvider.getValue(bGrid.getDataRow(bIndex), "itmNo");
					var discountAmt = bProvider.getValue(bGrid.getDataRow(bIndex), "discountAmt");

					if (goodsNo === bGoodsNo && itmNo === bItmNo) {
						benefitPrc += discountAmt;
					}
				}
			}else{
				goodsNo    = vProvider.getValue(vGrid.getDataRow(index), "goodsNo");
				goodsNm    = vProvider.getValue(vGrid.getDataRow(index), "goodsNm");
				itmNo      = vProvider.getValue(vGrid.getDataRow(index), "itmNo");
				itmNm      = ''; /*증정품은 단품 한개만 존재함*/
				salePrc    = 0;
				ordQty     = 1;
				deliPolcNo = vProvider.getValue(vGrid.getDataRow(index), "deliPolcNo");
				mbrDlvpSeq = vProvider.getValue(vGrid.getDataRow(index), "mbrDlvpSeq");
				bdlDeliPsbYn = vProvider.getValue(vGrid.getDataRow(index), "bdlDeliPsbYn");//묶음배송가능여부
			}

			//배송정책 우편번호
			var zipNoSeq = '';
			var zipNo = '';
			var dlvpAddr = '';

			orderDlvpInfo.forEach(function(dlvp){
				if(mbrDlvpSeq === dlvp.mbrDlvpSeq){
					zipNo = dlvp.zipNo;
					zipNoSeq = dlvp.zipNoSeq;
					dlvpAddr = dlvp.dlvpAddr;
				}
			})

			vDlvList.push({
				goodsNo    : goodsNo,
				goodsNm    : goodsNm,
				itmNo      : itmNo,
				itmNm      : itmNm,
				salePrc    : salePrc,
				ordQty     : ordQty,
				discountAmt: benefitPrc,
				deliPolcNo : deliPolcNo,
				bdlDeliPsbYn : bdlDeliPsbYn,
				zipNoSeq   : zipNoSeq,
				zipNo      : zipNo,
				dlvpAddr   : dlvpAddr,
				mbrDlvpSeq   : mbrDlvpSeq
			});

		}
	}
	, callBackDlvAmt : function(data){
		console.log(data);
		var dGrid = dlvAmtGrid.eventhandler.grid;
		var provider = dGrid.getDataSource();

		/*배송비*/
		dGrid.getDataSource().addRows(data);

		var paramObj = {};
		paramObj.mbrNo = $("#mbrNo").val();

		common.Ajax.sendJSONRequest("POST"
			, _baseUrl + "order/orderReception.getDlvCouponList.do"
			, paramObj
			, dlvAmtGrid.eventhandler.callBackDlvCoupon
			, false
		);
	}
	, callBackDlvCoupon : function(dlvCouponList){

		$.realGridUtils.clearDropDown(dlvAmtGrid.eventhandler.grid, 'dlvpCoupon');//배송지  DropDown 전체 삭제
		$.realGridUtils.addDropDownItems(dlvAmtGrid.eventhandler.grid, 'dlvpCoupon', '::선택::', '0');
		dlvCouponList.forEach(function(dlvCoupon){
			$.realGridUtils.addDropDownItems(dlvAmtGrid.eventhandler.grid, 'dlvpCoupon', dlvCoupon.promoNm + '까지',dlvCoupon.cpnIsuNo);
		})

		var rowCount = dlvAmtGrid.eventhandler.grid.getItemCount(); // 그리드에 있던 행의 수

		// 수정인 경우만 체크
		for(var i = 0; i<rowCount; i++){
			var entrNm = this.grid.getValue(i, "entrNm");
			entrNm += "/기준금액:"+this.grid.getValue(i, "stdAmt");
			entrNm += "/배송비금액:"+this.grid.getValue(i, "dlexAmt");
			entrNm += "/도서산간배송비:"+this.grid.getValue(i, "ferryRgnDlexAmt");
			entrNm += "/제주도배송비:"+this.grid.getValue(i, "jejuFerryRgnDlexAmt");
			entrNm += "/제주도도서산간배송비:"+this.grid.getValue(i, "dlexAmt");
			this.grid.setValue(i, "entrNm", entrNm);
			this.grid.setValue(i , "dlvpCoupon", '0');
		}


	}
	//그리드 이벤트 핸들링
	, gridEvent : {
		afterQuerySuccess : function(grid, data) {

		}

		//할인수단 선택
		, onCellEdited : function (grid, itemIndex, row, field) {
			//할인수단 변경 이벤트
			if(grid.getCurrent().fieldName === 'dlvpCoupon'){
				grid.commit();

				var provider = grid.getDataSource();
				var dlvpCoupon = provider.getValue(grid.getDataRow(itemIndex),"dlvpCoupon");

				if(dlvpCoupon === '0'){
					provider.setValue(grid.getDataRow(itemIndex), "ordDeliAmt", provider.getValue(grid.getDataRow(itemIndex), "hiddenOrdDeliAmt"));//배송비
					return;
				}

				for(var i=0; i < grid.getItemCount(); i++) {
					//나머지 할인수단 제거, 배송비 원복
					var index = grid.getItemIndex(i);

					var hiddenOrdDeliAmt = provider.getValue(grid.getDataRow(index), "hiddenOrdDeliAmt");     //상품
					console.log(hiddenOrdDeliAmt);

					if(index !== itemIndex){
						provider.setValue(grid.getDataRow(index), "dlvpCoupon", "0");//할인수단
						provider.setValue(grid.getDataRow(index), "ordDeliAmt", hiddenOrdDeliAmt);//배송비
					}else{
						provider.setValue(grid.getDataRow(index), "ordDeliAmt", 0);//배송비 쿠폰적용
					}
				}
			}
		}

		//툴팁(협력사,적용상품)
		, onShowTooltip : function(grid, index, value) {
			var column = index.column;
			var itemIndex = index.itemIndex;

			var tooltip = value;

			//적용상품 툴팁
			if (column === "entrNm") {
				tooltip = grid.getValue(itemIndex, "entrNm");
			}else if (column === "goodsNmTitle") {
				tooltip = grid.getValue(itemIndex, "goodsNmTitle");
			}

			return tooltip;
		}
	}
};