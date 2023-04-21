function uncomma(str) {
	str = "" + str.replace(/,/gi, '');
	str = str.replace(/(^\s*)|(\s*$)/g, "");
	return (new Number(str));
}

var _alertMsg = x2coMessage.getMessage( {
	validMemberNo      : 'orderReception.manualOrder.validation.memberNo',
	validOrdManNm	   : 'orderReception.manualOrder.validation.ordManNm',
	validTellNoOrCellNo: 'orderReception.manualOrder.validation.tellNoOrCellNo',
	validEmail	       : 'orderReception.manualOrder.validation.email',
	validAddr	       : 'orderReception.manualOrder.validation.addr'
});

$.namespace('receiveManualOrder');
receiveManualOrder = {
	init : function () {
		// this.cssCustom();
		this.bindButtonEvent();
	}
	,cssCustom : function(){
		$(".data-toggle").unbind("click").bind("click",function(){
			var id = $(this).attr("id");

			//사은품 토글 클릭
			if(id === 'aeToggle'){
				if($('#goodsCheck').val() !== 'Y'){
					return;
				}
			}

			var toggleWrap = $(this).parent('.data-toggle');
			toggleWrap.toggleClass('hide');
			$(this).parents('.data').find('.data-body').toggleClass('hide');
			if(toggleWrap.hasClass('hide')) {
				$(this).find('span').text('열림');
			} else {
				$(this).find('span').text('닫힘');
			}
		});
	}
	//페이지 이벤트 등록
	, bindButtonEvent: function () {
		var _self = this;

		$('#btn_pay').click(function(){
			// if(!_self.validation()){
			// 	return false;
			// }
			//
			// if(!confirm(("주문 하시겠습니까?"))){
			// 	return false;
			// }

			_self.saveOrder();
		});

		$('#btn_cancel').click(function(){
			if(confirm("초기화 하시겠습니까?")){
				_self.reviseSetting(1);
			}
		});
	}
	//수정시 초기화 setting
	,reviseSetting : function(level) {
		switch(level){
			case 1:
			/*주문자정보 수정시*/
				goodsGrid.eventhandler.onCancel('D');
				orderGiftGrid.eventhandler.onCancel('D');
				benefitGrid.eventhandler.onCancel('D');
				dlvAmtGrid.eventhandler.onCancel('D');
				orderPay.onCancel();
				break;
			case 2:
				/****[상품선택 수정시]****/
				//02. 상품선택 해제
				goodsGrid.eventhandler.onCancel();
				//03.사은품 그리드 초기화
				orderGiftGrid.eventhandler.onCancel('D');
				//04.혜택적용 그리드 초기화
				benefitGrid.eventhandler.onCancel('D');
				//05.배송비 그리드 초기화
				dlvAmtGrid.eventhandler.onCancel('D');
				//06.결제 초기화
				orderPay.onCancel();
				//07현금영수증 발급신청
				break;
			case 3:
				/****[사은품 수정시]****/
				//03.사은품 선택완료 해제
				orderGiftGrid.eventhandler.onCancel();
				//04.혜택적용 그리드 초기화
				benefitGrid.eventhandler.onCancel('D');
				//05.배송비 그리드 초기화
				dlvAmtGrid.eventhandler.onCancel('D');
				//06.결제 초기화
				orderPay.onCancel();
				//07현금영수증 발급신청
				break;
			case 4:
				/****[혜택 수정시]****/
				benefitGrid.eventhandler.onCancel();
				dlvAmtGrid.eventhandler.onCancel('D');
				orderPay.onCancel();
				break;
			case 5:
				/****[배송비 수정시]****/
				dlvAmtGrid.eventhandler.onCancel();
				orderPay.onCancel();
				break;
		}
	}
	//결제 validation
	, validation : function(){

		//배송비 선택 여부
		if($('#dlvAmtCheck').val() === 'N'){
			return false;
		}

		//남은금액 0 아닐경우
		var remainingAmt = uncomma($('#remainingAmt').val());
		if(remainingAmt !== 0){
			alert('남은금액을 확인해주세요');
			$('#remainingAmt').focus();
			return false;
		}


		if(!this._orderMemberInfoValiadion()){
			return false;
		}

		return true;
	}

	//주문자 정보 validation
	, _orderMemberInfoValiadion : function() {
		var mbrNm = $('#mbrNm').val();
		var loginId = $('#loginId').val();

		if(mbrNm === undefined || mbrNm === ''){
			alert(_alertMsg.validMemberNo);
			$('#mbrNm').focus();
			return false;
		}

		if(loginId === undefined || loginId === ''){
			alert(_alertMsg.validMemberNo);
			$('#loginId').focus();
			return false;
		}

		var ordManNm = $('#ordManNm').val();
		if(ordManNm === undefined || ordManNm.trim() === ''){
			alert(_alertMsg.validOrdManNm);
			$('#ordManNm').focus();
			return false;
		}

		//비회원일경우
		if($('#chkNoMember').is(":checked")){
			var telRgnNo  = $('#telRgnNo').val();
			var telTxnoNo = $('#telTxnoNo').val();
			var telEndNo  = $('#telEndNo').val();
			var cellSctNo  = $('#cellSctNo').val();
			var cellTxnoNo  = $('#cellTxnoNo').val();
			var cellEndNo  = $('#cellEndNo').val();

			var telCheck = true;
			var cellCheck = true;

			if((telRgnNo === undefined || telRgnNo === '')
			   || (telTxnoNo === undefined || telTxnoNo === '')
			   || (telEndNo === undefined  || telEndNo === '')){
				telCheck = false;
			}

			if((cellSctNo === undefined || cellSctNo === '')
				|| (cellTxnoNo === undefined || cellTxnoNo === '')
				|| (cellEndNo === undefined  || cellEndNo === '')){
				cellCheck = false;
			}

			if(!telCheck && !cellCheck){
				alert(_alertMsg.validTellNoOrCellNo);
				return false;
			}

			var emailId = $('#emailId').val();
			var emailDomain = $('#emailDomain').val();

			if(emailId === undefined || emailId.trim() === '' ||
				emailDomain === undefined || emailDomain.trim() === ''){
				alert(_alertMsg.validEmail);
				$('#telRgnNo').focus();
				return false;
			}

			var umemZipNoSeq = $('#umemZipNoSeq').val();
			var umemZipNo = $('#umemZipNo').val();
			var umemZipAddr = $('#umemZipAddr').val();
			var umemDtlAddr = $('#umemDtlAddr').val();

			if(umemZipNoSeq === undefined || umemZipNoSeq.trim() === '' ||
				umemZipNo === undefined   || umemZipNo.trim() === '' ||
				umemZipAddr === undefined || umemZipAddr.trim() === '' ||
				umemDtlAddr === undefined || umemDtlAddr.trim() === ''){
				alert(_alertMsg.validAddr);
				$('#umemZipAddr').focus();
				return false;
			}

		}

		return true;
	}

	,saveOrder : function() {
		var paramObj = {};
		paramObj.ordBase = this.setOrdBaseData();
		paramObj.ordDlvp = this.setOrdDlvpData();
		// paramObj.ordDtl  = this.setOrdDtlData();

		console.log(paramObj);

		return;

		common.Ajax.sendJSONRequest("POST"
			, _baseUrl + "order/commonOrder.saveOrder.do"
			, paramObj
			, function(){}
			, false
		);
	}

	,setOrdBaseData : function(){
		var paramObj = {};
		var mbrNo = $('#mbrNo').val();

		paramObj = {
			siteNo : orderSite,
			ordMediaCd : save_ordMediaCd,
			mbrNo : $('#mbrNo').val(),
			ordManNm : $('#ordManNm').val(),
			fstOrdYn : 'Y',
			ordRsltCd : save_ordStatus
		};

		if(mbrNo === noMember){
			paramObj.mbrMgrCd = save_noMemberMgrCd;
			paramObj.umemEmailAddr = $('#emailId').val() + '@' + $('#emailDomain').val();
			paramObj.umemCellSctNo = $('#cellSctNo').val();
			paramObj.umemCellTxnoNo = $('#cellTxnoNo').val();
			paramObj.umemCellEndNo = $('#cellEndNo').val();
			paramObj.umemTelRgnNo = $('#telRgnNo').val();
			paramObj.umemTelTxnoNo = $('#telTxnoNo').val();
			paramObj.umemTelEndNo = $('#telEndNo').val();
			paramObj.umemZipNoSeq = $('#umemZipNoSeq').val();
			paramObj.umemZipNo = $('#umemZipNo').val();
			paramObj.umemZipAddr = $('#umemZipAddr').val();
			paramObj.umemDtlAddr = $('#umemDtlAddr').val();
		}else{
			paramObj.mbrGradeCd = memberData.mbrGradeCd;
			paramObj.mbrMgrCd = memberData.mbrMgrCd;
		}

		return paramObj;
	},

	setOrdDlvpData : function(){
		var dGrid = dlvAmtGrid.eventhandler.grid;
		var dProvider = dGrid.getDataSource();

		var paramList = [];

		for( var row = 0; row < dGrid.getItemCount(); row++ ) {
			var index = dGrid.getItemIndex(row);
			var mbrDlvpSeq = dProvider.getValue(dGrid.getDataRow(index), "mbrDlvpSeq");

			var paramObj = {};
			orderDlvpInfo.forEach(function(dlvp){
				if(dlvp.mbrDlvpSeq === mbrDlvpSeq){
					paramObj.dlvpNm = dlvp.dlvpNm;
					paramObj.rcvmnNm = dlvp.rcvmnNm;
					paramObj.zipNoSeq = dlvp.zipNoSeq;
					paramObj.zipNo = dlvp.zipNo;
					paramObj.zipAddr = dlvp.zipAddr;
					paramObj.dtlAddr = dlvp.dtlAddr;
					paramObj.rcvmnEmailAddr =  $('#emailId').val() + '@' + $('#emailDomain').val();
					paramObj.rcvmnCellSctNo =  $('#cellSctNo').val();
					paramObj.rcvmnCellTxnoNo=  $('#cellTxnoNo').val();
					paramObj.rcvmnCellEndNo =  $('#cellEndNo').val();
					paramObj.rcvmnTelRgnNo  =  $('#telRgnNo').val();
					paramObj.rcvmnTelTxnoNo =  $('#telTxnoNo').val();
					paramObj.rcvmnTelEndNo  =  $('#telEndNo').val();
					paramList.push(paramObj);
				}
			});
		}

		return paramList;

	},

	setOrdDtlData : function(){
		var paramObj = {};
	}

}