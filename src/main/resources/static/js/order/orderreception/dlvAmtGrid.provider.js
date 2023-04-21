var col = x2coMessage.getMessage( {
	dlvpNm : "orderMgmt.manualOrder.dlvAmtGrid.grid.dlvpNm"					//배송지
	, entrNm : "orderMgmt.manualOrder.dlvAmtGrid.grid.entrNm"				//협력사
	, goodsNm : "orderMgmt.manualOrder.dlvAmtGrid.grid.applyGoodsNm"	//적용상품
	, dlvpCoupon : "orderMgmt.manualOrder.dlvAmtGrid.grid.dlvpCoupon"		//할인수단
	, dlvAmt : "orderMgmt.manualOrder.dlvAmtGrid.grid.dlexAmt"				//배송비
});

$.namespace("dlvAmtGrid.settings");
dlvAmtGrid.settings = {
	fields : [
		{ fieldName: "dlvpAddr"				, dataType: "text" }	//배송지
		, { fieldName: "zipNo"				, dataType: "text" }	//배송지 우편번호
		, { fieldName: "entrNm"				, dataType: "text" }	//협력사
		, { fieldName: "goodsNmTitle"		, dataType: "text" }	//적용상품(상품명)
		, { fieldName: "dlvpCoupon"			, dataType: "text" }	//할인수단
		, { fieldName: "ordDeliAmt"			, dataType: "number" }	//배송비
		, { fieldName: "hiddenOrdDeliAmt"	, dataType: "number" }	//배송비(노출X)
		, { fieldName: "mbrNo"				, dataType: "text" }	//회원번호
		, { fieldName: "mbrDlvpSeq"			, dataType: "text" }	//회원배송지순번
		, { fieldName: "stdAmt"				, dataType: "number" }	//기준금액
		, { fieldName: "dlexAmt"			, dataType: "number" }	//배송비금액
		, { fieldName: "ferryRgnDlexAmt"	, dataType: "number" }	//도서산간배송비
		, { fieldName: "jejuDlex"			, dataType: "number" }	//제주도배송비
		, { fieldName: "jejuFerryRgnDlexAmt", dataType: "number" }	//제주도도서산간배송비
		, { fieldName: "goodsNo"			, dataType: "text" }	//상품번호
		, { fieldName: "goodsNmList"		, dataType: "text" }	//적용상품 전체 목록
		, { fieldName: "goodsCnt"			, dataType: "text" }	//적용상품 갯수
		, { fieldName: "bdlDeliPsbYn"		, dataType: "text" }	//묶음배송가능여부
		, { fieldName: "dlexTypCd"			, dataType: "text" }	//배송비형태코드(VD005)(10: 무료, 20: 유료, 30: 조건무무료)
	]
	, columns : [
		{name : "mbrNo"					, fieldName : "mbrNo"				, visible : false}// 회원번호
		, {name : "zipNo"				, fieldName : "zipNo"				, visible : false}// 배송지 우편번호
		, {name : "mbrDlvpSeq"			, fieldName : "mbrDlvpSeq"			, visible : false}// 회원배송지순번
		, {name : "stdAmt"				, fieldName : "stdAmt"				, visible : false}// 기준금액
		, {name : "dlexAmt"				, fieldName : "dlexAmt"				, visible : false}// 배송비금액
		, {name : "ferryRgnDlexAmt"		, fieldName : "ferryRgnDlexAmt"		, visible : false}// 도서산간배송비
		, {name : "jejuDlex"			, fieldName : "jejuDlex"			, visible : false}// 제주도배송비
		, {name : "jejuFerryRgnDlexAmt"	, fieldName : "jejuFerryRgnDlexAmt"	, visible : false}// 제주도도서산간배송비
		, {name : "goodsNo"				, fieldName : "goodsNo"				, visible : false}// 상품번호
		, {name : "goodsCnt"			, fieldName : "goodsCnt"			, visible : false}// 적용상품 갯수
		, {name : "goodsNmList"			, fieldName : "goodsNmList"			, visible : false}// 적용상품 전체 목록
		, {name : "bdlDeliPsbYn"		, fieldName : "bdlDeliPsbYn"		, visible : false}// 묶음배송가능여부
		, {name : "dlexTypCd"			, fieldName : "dlexTypCd"			, visible : false}// 배송비형태코드(VD005)(10: 무료, 20: 유료, 30: 조건무무료)

		// 배송지([배송지명]우편주소 상세주소, 회원배송지순번)
		, {
			name: 'dlvpAddr'
			, fieldName: 'dlvpAddr'
			, width: 400
			, header: { text: col.dlvpNm }
			, editable : false
			, styleName: 'left-column disable-column'
		}

		// 협력사
		, {
			name: 'entrNm'
			, fieldName: 'entrNm'
			, width: 150
			, header: { text: col.entrNm }
			, editable : false
			, renderer:{showTooltip: true}
			, styleName: 'left-column disable-column'
		}

		// 적용상품
		, {
			name: 'goodsNmTitle'
			, fieldName: 'goodsNmTitle'
			, width: 150
			, header: { text: col.goodsNm }
			, editable : false
			, renderer:{showTooltip: true}
			, styleName : "disable-column"
		}

		// 할인수단
		, {
            name: 'dlvpCoupon'
            , fieldName: 'dlvpCoupon'
            , width: 300
            , header: { text: col.dlvpCoupon }
			, lookupDisplay : true
			, visible : true
			, editor : {
	            type : 'dropdown'
				, displayLabels: 'label'     // 드롭다운 목록 표시방식
				, domainOnly: true           // 드롭다운 목록에있는 값만 선택 가능
				, textReadOnly: true         // 키보드 입력 방지
	        }
		}

		// 배송비
		, {
			name: 'ordDeliAmt'
			, fieldName: 'ordDeliAmt'
			, width: 80
			, header: { text: col.dlvAmt }
			, editable : false
			, styleName: 'right-column disable-column'
			, dataType : "number"
			, numberFormat: "#,##0"
			, footer: {
				expression: "sum",
				numberFormat: "#,##0",
				styleName: "right-column"
			}
		}
	]
	, validations : []
	, props : {
		  paging : false												// 페이지네이션 사용 여부
		, autoFitHeight : false										// 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, width : "100%"											// 그리드 설정 - 넓이 설정(default = 100%)
		, height : 200												// 그리드 설정 - 높이 설정(default = 자동설정)
		, checkbox : false											// 그리드 설정 - 체크박스 필드 노출 여부
		, popup : false												// 그리드 설정 - 팝업 자동 resize
		, crud : false												// 그리드 설정 - cud 상태 컬럼 노출 여부
	}
};