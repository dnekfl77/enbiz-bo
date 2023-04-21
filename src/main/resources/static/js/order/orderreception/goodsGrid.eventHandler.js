var _goodsMsg = x2coMessage.getMessage( {
	noGoods      : "orderReception.manualOrder.goodsInfo.msg.noGoods",
	nextQuestion : "orderReception.manualOrder.goodsInfo.msg.nextQuestion",
	maxLmtQty    : "orderReception.manualOrder.goodsInfo.msg.maxLmtQty",
	minLmtQty    : "orderReception.manualOrder.goodsInfo.msg.minLmtQty",
	stkQty       : "orderReception.manualOrder.goodsInfo.msg.stkQty",
});

$.namespace('goodsGrid.eventhandler');
goodsGrid.eventhandler = {
	// 초기화
	init : function () {
		this.gridLoading();
		this.bindButtonEvent();
	}
	, gridLoading : function(){
		this.grid.setFooters({visible:true});
		// this.grid.columnByName("mbrDlvpSeq").footer.text = "합계";
		this.grid.rowIndicator.footText = "합계";
	}

	//이벤트 처리
	, bindButtonEvent : function(){

		var _self = this;

		// 상품 추가 클릭
		$("#goodsAdd").click(function() {

			if($('#goodsCheck').val()==='Y'){
				return;
			}

			if($("#mbrNo").val() === ''){
				alert('회원을 선택해 주세요.');
				return;
			}
			_self.goodsSearchPopup($("#mbrNo").val());
		})

		// 상품 삭제 클릭
		$("#goodsDelete").click(function(){

			if($('#goodsCheck').val()==='Y'){
				return;
			}

			_self.onDelete();
		})
		
		// 배송지 선택 클릭
		$("#dlvpSeleted").click(function(){

			if($('#goodsCheck').val()==='Y'){
				return;
			}

			var checkedRows = goodsGrid.eventhandler.grid.getCheckedRows();
			if(checkedRows.length <= 0){
				alert(_msg.noSelectedDataMsg);
				return;
			}

			if($('#chkNoMember').is(":checked")){
				var count = goodsGrid.eventhandler.grid.getItemCount();
				if(count === 0){
					alert("비회원은 상품을 추가후 배송지 등록을 해주세요!");
					return;
				}
			}

			_self.appendDeliveryPopup();
		})

		//주문상품 수정
		$("#goodsRevise").click(function(){
			if(!confirm(_commonMsg.next)){
				return;
			}
			receiveManualOrder.reviseSetting(2);
		})

		// 주문상품 선택
		$("#goodsCompleted").click(function(){
			if($('#goodsCheck').val()==='Y'){
				return;
			}

			if(!_self.goodsInfoValidation()){
				return;
			}


			if(!confirm(_goodsMsg.nextQuestion)){
				return false;
			}

			$('#goodsCheck').val('Y');
			$("#aeToggle").click();
			orderGiftGrid.eventhandler.onSearch();//사은품 조회
			goodsGrid.eventhandler.grid.columnByName("mbrDlvpSeq").editable = false;
			goodsGrid.eventhandler.grid.columnByName("ordQty").editable = false;
		})

		// 메시지 클릭
		$("#btn_goodsTextApply").click(function(){
			_self.onMessageSetting();
		})

	},onDelete : function() {

		var checkedItems = this.grid.getCheckedItems();
		if (checkedItems.length === 0) {
			alert(_msg.noSelectedDataMsg);
			return false;
		}

		if(!confirm(_commonMsg.delete)){
			return;
		}

		this.defaultHandler.onDelete(this.grid);

	},onCancel : function(type){
		$('#goodsCheck').val('N');
		goodsGrid.eventhandler.grid.columnByName("mbrDlvpSeq").editable = true;
		goodsGrid.eventhandler.grid.columnByName("ordQty").editable = true;
		if(type==='D'){
			this.defaultHandler.onCancel(goodsGrid.eventhandler.grid);
		}
	},onMessageSetting : function(){

		var gGrid = goodsGrid.eventhandler.grid;

		//추가된 배송지 기본배송지로 Set
		for( var row = 0; row < gGrid.getItemCount(); row++ ){
			var goodsInfoText = $('#btn_goodsText').val();
			if($('#goodsTextType').val() === '0'){
				gGrid.getDataSource().setValue(gGrid.getDataRow(row), "rcvmnNm", goodsInfoText);		// 수취인
			}else{
				gGrid.getDataSource().setValue(gGrid.getDataRow(row), "deliMsg", goodsInfoText);		// 수취인
			}
		}

	}, goodsSearchPopup : function (mbrNo) {
		// 상품조회 팝업 호출
		var pin = {
			mbrNo: mbrNo
		};

		var POP_DATA = {
			url: _baseUrl + 'order/orderReception.addOrderGoodsPopup.do'
			, winName: 'goodsSearch'
			, title: '상품조회'
			, _title: '상품조회'
			, left: 10
			, top: 10
			, width: 950
			, height: 710
			, scrollbars: false
			, autoresize: false
		};
		popCommon(pin, POP_DATA, this.goodsSearchCallback.bind(this));

	}, goodsSearchCallback : function(e){

		this.grid.commit();
		var resultData = JSON.parse(e.data);
		var contents = resultData; // 중복을 제거한 값
		var rowCount = this.grid.getItemCount(); // 원래 그리드에 있던 행의 수

		// 중복 요소 체크
		for(var i = 0; i<rowCount; i++){
			for(var j = 0; j<resultData.length; j++) {
				if(resultData[j].goodsNo === this.grid.getValue(i , "goodsNo") && resultData[j].itmNo === this.grid.getValue(i , "itmNo")) { // 추가된 상품과 원래 그리드에 있던 상품 비교
					contents.splice(j,1); // 중복 요소 삭제
				}
			}
		}

		// 상품추가 팝업 후 리턴 값 셋팅
		this.gridAddRows(contents);

	}, appendDeliveryPopup : function () {
		// 배송지 추가 팝업 호출
		if($("#mbrNo").val()===''){
			alert('회원을 선택해 주세요.');
			return;
		}

		//회원 배송지 추가
		if(!$("#chkNoMember").is(":checked")){
			var pin = {
				mbrNo: $("#mbrNo").val()
			};

			var POP_DATA = {
				url: _baseUrl + 'order/orderReception.orderDeliveryPopup.do'
				, winName: 'orderDeliveryPopup'
				, title: '배송지 추가'
				, _title: '배송지 추가'
				, left: 10
				, top: 10
				, width: 850
				, height: 370
				, scrollbars: false
				, autoresize: false
			};
			var callback = function(e) {
				console.log("data:::", e.data);
				var dlvpObj = JSON.parse(e.data);
				console.log(dlvpObj);
				goodsGrid.eventhandler.setDlvp(dlvpObj);
			};
			popCommon(pin, POP_DATA, callback);

		}else{
			//비회원배송지
			var pin = {};

			var POP_DATA = {
				url: _baseUrl + 'order/orderReception.orderDeliveryNoMemberPopup.do'
				, winName: 'appendDeliveryNomember'
				, title: '배송지 추가'
				, _title: '배송지 추가'
				, left: 10
				, top: 10
				, width: 850
				, height: 310
				, scrollbars: false
				, autoresize: false
			};

			var callback = function(e) {
				console.log("noMemberDelivpData:::", e.data);
				var dlvpObj = JSON.parse(e.data);
				dlvpObj.forEach(function(data){
					orderDlvpInfo.push(data);
				});
				goodsGrid.eventhandler.setDlvp(dlvpObj);
			};

			popCommon(pin, POP_DATA, callback);
		}
	}

	//행추가
	, gridAddRows : function(contents){
		var gGrid = goodsGrid.eventhandler.grid;
		var provider = gGrid.getDataSource();

		gGrid.getDataSource().addRows(contents);
		gGrid.commit();

		//추가된 배송지 기본배송지로 Set
		for( var row = 0; row < gGrid.getItemCount(); row++ ){

			var index = gGrid.getItemIndex(row);

			provider.setValue(gGrid.getDataRow(index), 'mbrNo', $("#mbrNo").val());//회원번호

			//추가된 Row check
			if(!provider.getValue(index, "mbrDlvpSeq")){
				if(Array.isArray(orderDlvpInfo) && orderDlvpInfo.length > 0){
					provider.setValue(gGrid.getDataRow(index), 'mbrDlvpSeq', orderDlvpInfo[0].mbrDlvpSeq);// 배송지
					provider.setValue(gGrid.getDataRow(index), "rcvmnNm", orderDlvpInfo[0].rcvmnNm);		 // 수취인
					provider.setValue(gGrid.getDataRow(index), "mbrDlvpSeqBefore", orderDlvpInfo[0].mbrDlvpSeq);		 // 수취인
				}
			}

			var buyQtyLmtYn = provider.getValue(gGrid.getDataRow(index), "buyQtyLmtYn");       //구매수량제한여부
			var minLmtQty = provider.getValue(gGrid.getDataRow(index), "minLmtQty");         //최소제한수량
			var ordQty = provider.getValue(gGrid.getDataRow(index), "ordQty");

			if(ordQty > 0){
				provider.setValue(gGrid.getDataRow(index), "ordQty", ordQty); //주문수량
			}
			else if(buyQtyLmtYn==='Y'){
				provider.setValue(gGrid.getDataRow(index), "ordQty", minLmtQty); //주문수량 ( 최소제한수량 )
			}else{
				provider.setValue(gGrid.getDataRow(index), "ordQty", 0); //주문수량
			}
		}

	}

	// 배송지 목록 object 변경
	// 회원 배송지 팝업 동기화(저장시)
	,setDlvpObject : function(mbrDlvpList){
		//배송지 팝업 저장지 orderDlvpInfo만 동기화 , 상품 그리드에 선택된 데이터들은 변경X
		orderDlvpInfo = mbrDlvpList;
		goodsGrid.eventhandler.setDlvp(mbrDlvpList,'N');
	}
	
	//배송지 목록 변경
	, setDlvp : function(mbrDlvpList,gridCheckDataSyncPopupApply){
		console.log("mbrDlvpList:::",mbrDlvpList);
		if(!Array.isArray(mbrDlvpList)){
			return;
		}

		var gGrid = goodsGrid.eventhandler.grid;
		gGrid.commit();


		$.realGridUtils.clearDropDown(goodsGrid.eventhandler.grid, 'mbrDlvpSeq');

		orderDlvpInfo.forEach(function(allDlvpInfo){
			$.realGridUtils.addDropDownItems(gGrid, 'mbrDlvpSeq', allDlvpInfo.dlvpAddr, allDlvpInfo.mbrDlvpSeq);
		})


		var provider = gGrid.getDataSource();

		//추가된 배송지 기본배송지로 Set
		for(var row = 0; row < gGrid.getItemCount(); row++) {

			var index = gGrid.getItemIndex(row);
			var mbrDlvpSeqBefore = provider.getValue(gGrid.getDataRow(index), "mbrDlvpSeqBefore"); //기존 선택된 배송지

			if(isEmptyValue(mbrDlvpSeqBefore)){
				provider.setValue(gGrid.getDataRow(index), 'mbrDlvpSeq', mbrDlvpList[0].mbrDlvpSeq);//배송지
				provider.setValue(gGrid.getDataRow(index), "rcvmnNm", mbrDlvpList[0].rcvmnNm);//수취인
				provider.setValue(gGrid.getDataRow(index), "mbrDlvpSeqBefore", mbrDlvpList[0].mbrDlvpSeq);
				continue;
			}

			orderDlvpInfo.forEach(function(dlvpInfo){
				if(mbrDlvpSeqBefore === dlvpInfo.mbrDlvpSeq){
					provider.setValue(gGrid.getDataRow(index), 'mbrDlvpSeq', dlvpInfo.mbrDlvpSeq);//배송지
					provider.setValue(gGrid.getDataRow(index), "rcvmnNm", dlvpInfo.rcvmnNm);//수취인
					provider.setValue(gGrid.getDataRow(index), "mbrDlvpSeqBefore", dlvpInfo.mbrDlvpSeq);
					return false;
				}
			})
		}

		if(gridCheckDataSyncPopupApply !== null && gridCheckDataSyncPopupApply !== undefined && gridCheckDataSyncPopupApply === 'N'){
			return;
		}

		var checkedRows = gGrid.getCheckedRows();
		var checkedDataSourceRows = gGrid.getItemsOfRows(checkedRows);
		checkedDataSourceRows.forEach(function(row) {
			var s_dataRow = gGrid.getDataRow(row);
			provider.setValue(s_dataRow, 'mbrDlvpSeq', mbrDlvpList[0].mbrDlvpSeq);//배송지
			provider.setValue(s_dataRow, "rcvmnNm", mbrDlvpList[0].rcvmnNm);//수취인
			provider.setValue(s_dataRow, "mbrDlvpSeqBefore", mbrDlvpList[0].mbrDlvpSeq);
			provider.setValue(s_dataRow, "deliMsg", mbrDlvpList[0].deliMsg);
		})


	}
	, goodsInfoValidation : function(){

		var gGrid = goodsGrid.eventhandler.grid;
		var checkedRows = gGrid.getCheckedRows();

		gGrid.commit();

		if(checkedRows.length === 0){
			alert(_goodsMsg.noGoods);
			return false;
		}

		var provider = gGrid.getDataSource();

		for( var row = 0; row < gGrid.getItemCount(); row++ ){
			var _itemIndex = gGrid.getItemIndex(row);
			var dataRow = gGrid.getDataRow(_itemIndex);

			var mbrDlvpSeq = provider.getValue(dataRow,"mbrDlvpSeq");
			var ordQty = provider.getValue(dataRow,"ordQty");
			var stkQty = provider.getValue(dataRow,"stkQty");
			var buyQtyLmtYn = provider.getValue(dataRow,"buyQtyLmtYn");
			var minLmtQty = provider.getValue(dataRow,"minLmtQty");
			var maxLmtQty = provider.getValue(dataRow,"maxLmtQty");

			if(mbrDlvpSeq === null || mbrDlvpSeq === undefined || mbrDlvpSeq.trim() === ''){
				alert('배송지를 선택해주세요!');
				return false;
			}
			
			if(ordQty === null || ordQty === undefined || ordQty <= 0){
				alert('주문수량을 확인해주세요!');
				return false;
			}

			if(buyQtyLmtYn==='Y'){
				if(maxLmtQty < ordQty){
					alert('최대수량: '+maxLmtQty +' '+_goodsMsg.maxLmtQty);
					return false;
				}else if(ordQty < minLmtQty){
					alert('최소수량: '+minLmtQty +' '+_goodsMsg.minLmtQty);
					return false;
				}
			}else{
				if(ordQty > stkQty){
					alert(_goodsMsg.stkQty);
					return false;
				}
			}
		}

		return true;
	}

	, gridEvent : {
		afterQuerySuccess : function(grid, data) {

		}
		, onCellEdited : function (grid, itemIndex, row, field) {
			//배송지 변경 이벤트
			grid.commit();
			if(grid.getCurrent().fieldName === 'mbrDlvpSeq'){
				var mbrDlvpSeq = grid.getValue(row, "mbrDlvpSeq");
				$.each(orderDlvpInfo, function(index, item) {
					if(item.mbrDlvpSeq === mbrDlvpSeq){
						grid.getDataSource().setValue(row,"rcvmnNm", item.rcvmnNm);
						grid.getDataSource().setValue(row,"mbrDlvpSeqBefore", item.mbrDlvpSeq);
					}
				})
			}
		}
		,onEditRowChanged : function (grid, itemIndex, dataRow, field, oldValue, newValue) {
			console.log("changed");
			var provider = grid.getDataSource();
			var fieldName = provider.getOrgFieldName(field);
			grid.commit(true);

			if(fieldName === 'ordQty'){
				var stkQty = provider.getValue(dataRow,"stkQty");
				var buyQtyLmtYn = provider.getValue(dataRow,"buyQtyLmtYn");
				var minLmtQty = provider.getValue(dataRow,"minLmtQty");
				var maxLmtQty = provider.getValue(dataRow,"maxLmtQty");

				//구매제한이 있을경우
				if(buyQtyLmtYn==='Y'){
					if(maxLmtQty < newValue){
						alert('최대수량: '+maxLmtQty +' '+_goodsMsg.maxLmtQty);
					}else if(newValue < minLmtQty){
						alert('최소수량: '+minLmtQty +' '+_goodsMsg.minLmtQty);
					}
				}else{
					if(newValue > stkQty){
						alert(_goodsMsg.stkQty);
					}
				}
			}
		},onCellDblClicked : function(grid, clickData){
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