var _alertMsg = x2coMessage.getMessage( {
	dlvpNm    : 'orderReception.deliveryPopup.noMember.msg.dlvpNm',
	rcvmnNm   : 'orderReception.deliveryPopup.noMember.msg.rcvmnNm',
	cellNo	  : 'orderReception.deliveryPopup.noMember.msg.cellNo',
	emailAddr : 'orderReception.deliveryPopup.noMember.msg.emailAddr',
	zip	      : 'orderReception.deliveryPopup.noMember.msg.zip'
});

$.namespace('deliveryNoMember')
deliveryNoMember = {
	init : function () {
		this.bindButtonEvent();
	}

	//페이지 이벤트 등록
	, bindButtonEvent: function () {
		var _self = this;

		//주소찾기
		$("#btnAddressSearch").on("click", function(e) {
            _self.popupZipNoList();
		});

		//닫기
		$("#btn_popup_close").on("click", function(e) {
			window.close();
		});

		//이메일 도메인 선택
		$('#domainSelectBox').on('change', function(e) {
			$('#emailDomain').val($(this).val());
		});

		//적용
		$("#btn_popup_apply").on("click", function(e) {

			//배송지명(dlvpNm)
			if($("#dlvpNm").val() === null || $("#dlvpNm").val().trim() === ""){
				$("#dlvpNm").focus();
				alert(_alertMsg.dlvpNm);
				return true;
			}
			//수취인명(rcvmnNm)
			if($("#rcvmnNm").val() === null || $("#rcvmnNm").val().trim() === ""){
				$("#rcvmnNm").focus();
				alert(_alertMsg.rcvmnNm);
				return true;
			}

			//휴대폰번호(cellSctNo-cellTxnoNo-cellEndNo)휴대폰구분번호-휴대폰국번번호-휴대폰끝번호
			if($("#cellSctNo").val() === null || $("#cellSctNo").val() === ""){
				$("#cellSctNo").focus();
				alert(_alertMsg.cellNo);
				return true;
			}
			if($("#cellTxnoNo").val() == null || $("#cellTxnoNo").val() == ""){
				$("#cellTxnoNo").focus();
				alert(_alertMsg.cellNo);
				return true;
			}
			if($("#cellEndNo").val() == null || $("#cellEndNo").val() == ""){
				$("#cellEndNo").focus();
				alert(_alertMsg.cellNo);
				return true;
			}

			//이메일(emailId@emailDomain, emailId@domainSelectBox)
			if($("#emailId").val() == null || $("#emailId").val().trim() == ""){
				$("#emailId").focus();
				alert(_alertMsg.emailAddr);
				return true;
			}
			if($("#emailDomain").val() == null || $("#emailDomain").val().trim() == ""){
				$("#emailDomain").focus();
				alert(_alertMsg.emailAddr);
				return true;
			}

			//주소(zipNoSeq(hidden), zipNo, zipAddr, dtlAddr)
			if($("#zipNoSeq").val() === null || $("#zipNoSeq").val() === ""){
				$("#btnAddressSearch").focus();
				alert(_alertMsg.zip);
				return true;
			}
			if($("#zipNo").val() === null || $("#zipNo").val() === ""){
				$("#btnAddressSearch").focus();
				alert(_alertMsg.zip);
				return true;
			}
			if($("#zipAddr").val() === null || $("#zipAddr").val() === ""){
				$("#btnAddressSearch").focus();
				alert(_alertMsg.zip);
				return true;
			}
			if($("#dtlAddr").val() === null || $("#dtlAddr").val().trim() === ""){
				$("#dtlAddr").focus();
				alert(_alertMsg.zip);
				return true;
			}

            var returnData = {};
			returnData.mbrDlvpSeq		= $("#zipNoSeq").val()+$("#dtlAddr").val();			//회원 배송지 순번
			returnData.dlvpNm			= $("#dlvpNm").val();			//배송지명
			returnData.rcvmnNm			= $("#rcvmnNm").val();			//수취인명
			returnData.cellSctNo		= $("#cellSctNo").val();		//휴대폰구분번호
			returnData.cellTxnoNo		= $("#cellTxnoNo").val();		//휴대폰국번번호
			returnData.cellEndNo		= $("#cellEndNo").val();		//휴대폰끝번호
			returnData.emailId			= $("#emailId").val();			//이메일ID
			returnData.emailDomain 		= $("#emailDomain").val();		//이메일 Domain
			returnData.zipNoSeq			= $("#zipNoSeq").val();			//우편번호순번
			returnData.zipNo			= $("#zipNo").val();			//우편번호
			returnData.zipAddr			= $("#zipAddr").val();			//우편주소
			returnData.dtlAddr			= $("#dtlAddr").val();			//상세주소
			returnData.dlvpAddr			= "["+ $("#zipNo").val()+ "] " +$("#zipAddr").val()+ " " +$("#dtlAddr").val();	//배송지 주소

			var returnList = [];
			returnList.push(returnData);
            window.postMessage(JSON.stringify(returnList), _baseUrl);
            window.close();
		});
	}

	//주소찾기
	, popupZipNoList : function(){
		var pin = {
			argSelectType: 1
		};
		var POP_DATA = {
			url: '/popup/zipCodeMgmtPopup.zipNoListPopup.do'
			, winName: 'zipNoListPopup'
			, title: '우편번호 조회'
			, _title: '우편번호 조회'
			, left: 20
			, top: 20
			, width: 660
			, height: 800
			, scrollbars: false
			, autoresize: false
		};
		popCommon(pin, POP_DATA, this.popupZipNoListCallback);
	}
	,popupZipNoListCallback : function(e) {
		var zipObj = [];
		zipObj = JSON.parse(e.data);
		$('#zipNoSeq').val(zipObj[0].zipNoSeq);
		$('#zipNo').val(zipObj[0].zipNo);
		$('#zipAddr').val(zipObj[0].address);
	}
}