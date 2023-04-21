//메세지 정의

//Header 정의
var col = x2coMessage.getMessage( {
	_dlvpNm			: "orderReception.deliveryPopup.member.grid.dlvpNm"		//배송지명
	, _rcvmnNm		: "orderReception.deliveryPopup.member.grid.rcvmnNm"		//수취인명
	, _baseDlvpYn	: "orderReception.deliveryPopup.member.grid.baseDlvpYn"	//기본배송지
	, _zipNo		: "orderReception.deliveryPopup.member.grid.zipNo"		//우편번호
	, _zipAddr		: "orderReception.deliveryPopup.member.grid.zipAddr"		//기본 주소
	, _dtlAddr		: "orderReception.deliveryPopup.member.grid.dtlAddr"		//상세주소
	, _cellNo		: "orderReception.deliveryPopup.member.grid.cellNo"		//휴대폰
	, _telNo		: "orderReception.deliveryPopup.member.grid.telNo"		//전화번호
	, _deliMsg		: "orderReception.deliveryPopup.member.grid.deliMsg"		//배송메시지
	, _useYn		: "orderReception.deliveryPopup.member.grid.useYn"		//사용여부
	, _userSortSeq	: "orderReception.deliveryPopup.member.grid.userSortSeq"	//정렬순서
	, _sysModId		: "orderReception.deliveryPopup.member.grid.sysModId"		//수정자
	, _sysModDtm	: "orderReception.deliveryPopup.member.grid.sysModDtm"	//수정일시
});

$.namespace("deliveryMemberGrid.settings");
deliveryMemberGrid.settings = {
	fields: [
		{ fieldName: "mbrNo"			, dataType: "text" }// 회원번호
		, { fieldName: "mbrDlvpSeq"		, dataType: "text" }// 회원배송지순번
		, { fieldName: "zipNoSeq"		, dataType: "number" }// 우편번호순번
		, { fieldName: "telRgnNo"		, dataType: "text" }// 전화지역번호
		, { fieldName: "telTxnoNo"		, dataType: "text" }// 전화국번번호
		, { fieldName: "telEndNo"		, dataType: "text" }// 전화끝번호
		, { fieldName: "cellSctNo"		, dataType: "text" }// 휴대폰구분번호
		, { fieldName: "cellTxnoNo"		, dataType: "text" }// 휴대폰국번번호
		, { fieldName: "cellEndNo"		, dataType: "text" }// 휴대폰끝번호
		, { fieldName: "dlvpNm"			, dataType: "text" }// 배송지명
		, { fieldName: "rcvmnNm"		, dataType: "text" }// 수취인명
		, { fieldName: "baseDlvpYn"		, dataType: "text" }// 기본배송지
		, { fieldName: "dlvpAddr"		, dataType: "text" }// [배송지 full] apply 적용시 사용
		, { fieldName: "zipNo"			, dataType: "text" }// 우편번호
		, { fieldName: "zipAddr"		, dataType: "text" }// 기본 주소
		, { fieldName: "dtlAddr"		, dataType: "text" }// 상세주소
		, { fieldName: "cellNo"			, dataType: "text" }// 휴대폰
		, { fieldName: "telNo"			, dataType: "text" }// 전화번호
		, { fieldName: "deliMsg"		, dataType: "text" }// 전화번호
		, { fieldName: "useYn"			, dataType: "text" }// 사용여부
		, { fieldName: "userSortSeq"	, dataType: "number" }// 정렬순서
		, { fieldName: "sysModId"		, dataType: "text" }// 수정자
		, { fieldName: "sysModDtm"		, dataType: "text" }// 수정일시
	]
	, columns: [
		{name: "mbrNo"				, fieldName: "mbrNo"			, visible: false}	// 회원번호
		, {name: "mbrDlvpSeq"		, fieldName: "mbrDlvpSeq"		, visible: false}	// 회원배송지순번
		, {name: "zipNoSeq"			, fieldName: "zipNoSeq"			, visible: false}	// 우편번호순번
		, { name: "telRgnNo"		, fieldName: "telRgnNo"			, visible: false}	// 전화지역번호
		, { name: "telTxnoNo"		, fieldName: "telTxnoNo"		, visible: false}	// 전화국번번호
		, { name: "telEndNo"		, fieldName: "telEndNo"			, visible: false}	// 전화끝번호
		, { name: "cellSctNo"		, fieldName: "cellSctNo"		, visible: false}	// 휴대폰구분번호
		, { name: "cellTxnoNo"		, fieldName: "cellTxnoNo"		, visible: false}	// 휴대폰국번번호
		, { name: "cellEndNo"		, fieldName: "cellEndNo"		, visible: false}	// 휴대폰끝번호

		// 배송지명
		, {
			name: 'dlvpNm'
			, fieldName: 'dlvpNm'
			, width: 120
			, header: { text: col._dlvpNm +" *" }
		}
		// 수취인명
		, {
			name: 'rcvmnNm'
			, fieldName: 'rcvmnNm'
			, width: 80
			, header: { text: col._rcvmnNm + " *" }
		}
		// 기본배송지
		, {
			name: 'baseDlvpYn'
			, fieldName: 'baseDlvpYn'
			, width: 80
			, header: { text: col._baseDlvpYn }
			, editable: false
			, lookupDisplay : true
			, renderer: {
				type: "check",
				trueValues: "Y",
				falseValues: "N"
			}
		}
		// 우편번호
		, {
			name: "zipNo"
			, fieldName: "zipNo"
			, width: 80
			, header: { text: col._zipNo+" *" }
			, editable: false
			, button: "action"
		}
		// 기본 주소
		, {
			name: 'zipAddr'
			, fieldName: 'zipAddr'
			, width: 250
			, header: { text: col._zipAddr+" *" }
			, editable: false
			, styleName: "left-column disable-column"
		}
		// 상세주소
		, {
			name: 'dtlAddr'
			, fieldName: 'dtlAddr'
			, width: 100
			, header: { text: col._dtlAddr+" *" }
		}
		// 휴대폰
		, {
			name: 'cellNo'
			, fieldName: 'cellNo'
			, width: 110
			, header: { text: col._cellNo+" *" }
			, displayCallback: function(grid,index,value){
				var formattingValue = value;

				var regNum = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
				if(regNum.test(value)){
					formattingValue = value.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
				}

				return formattingValue;
			}
		}
		// 전화번호
		, {
			name: 'telNo'
			, fieldName: 'telNo'
			, width: 110
			, header: { text: col._telNo }
			, displayCallback: function(grid,index,value){
				var formattingValue = value;

				var regNum = /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/;
				if(regNum.test(value)){
					formattingValue = value.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, "$1-$2-$3").replace("--", "-");
				}

				return formattingValue;
			}
		}
		// 배송 메시지
		, {
			name: 'deliMsg'
			, fieldName: 'deliMsg'
			, width: 150
			, header: { text: col._deliMsg }
		}
		// 사용여부
		, {
			name: 'useYn'
			, fieldName: 'useYn'
			, width: 70
			, header: { text: col._useYn+" *" }
			, editable: false
			, lookupDisplay : true
			, renderer: {
				type: "check",
				trueValues: "Y",
				falseValues: "N"
			}
		}
		// 정렬순서
		, {
			name: 'userSortSeq'
			, fieldName: 'userSortSeq'
			, width: 70
			, header: { text: col._userSortSeq+" *" }
			, numberFormat: "#,##0"
		}
		// 수정자
		, {
			name: 'sysModId'
			, fieldName: 'sysModId'
			, width: 100
			, header: { text: col._sysModId }
			, editable: false
			, styleName: 'disable-column'
		}
		// 수정자
		, {
			name: 'sysModDtm'
			, fieldName: 'sysModDtm'
			, width: 150
			, header: { text: col._sysModDtm }
			, editable: false
			, styleName: 'disable-column'
		}
	]
	, validations: []
	, props: {
		form: "deliveryGridForm"						 // 서버로 전달할 데이터 Form ID값
		, paging: false		  // 페이지네이션 사용 여부
		, action: _baseUrl + "order/orderReception.getMemberDeliveryList.do" // Request URL
		, saveAction : _baseUrl + "order/orderReception.saveMemberDeliveryList.do"
		, autoFitHeight: false   // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, width: "100%"			 // 그리드 설정 - 넓이 설정(default = 100%)
		, height: 210			   // 그리드 설정 - 높이 설정(default = 자동설정)
		, sumRowVisible: false  // 그리드 설정 - 하단 합계 영역 노출 여부
		, checkbox: true		 // 그리드 설정 - 체크박스 필드 노출 여부
		, popup: false		  // 그리드 설정 - 팝업 자동 resize
		, crud: true		   // 그리드 설정 - cud 상태 컬럼 노출 여부
		, fitStyle: 'none'	  // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
	}
};