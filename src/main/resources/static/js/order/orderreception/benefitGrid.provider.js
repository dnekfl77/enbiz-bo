var col = x2coMessage.getMessage( {
	  promoTypNm : "orderMgmt.manualOrder.promotionGrid.grid.promoTypCdNm"		//할인유형
	, overlapCpnYn : "orderMgmt.manualOrder.promotionGrid.grid.overlapCpnYn"	//중복여부
	, promoNm : "orderMgmt.manualOrder.promotionGrid.grid.promoNm"				//프로모션명/카드종류
	, discountAmt : "orderMgmt.manualOrder.promotionGrid.grid.discountAmt"		//할인금액
	, goodsNm : "orderMgmt.manualOrder.promotionGrid.grid.goodsNm"				//상품명
	, itmNm : "orderMgmt.manualOrder.promotionGrid.grid.itmNm"					//단품명
	, salePrc : "orderMgmt.manualOrder.promotionGrid.grid.salePrc"				//판매가
	, ordQty : "orderMgmt.manualOrder.promotionGrid.grid.ordQty"				//수량
});

$.namespace("benefitGrid.settings");
benefitGrid.settings = {
	fields : [
		  { fieldName: "cpnIsuNo"		}	//쿠폰발급번호
		, { fieldName: "promoNo"		}	//프로모션번호
		, { fieldName: "promoTypCd"		}	//프로모션유형코드(MK002)
		, { fieldName: "promoTypNm"	    }	//할인유형
		, { fieldName: "overlapCpnYn"	}	//중복여부
		, { fieldName: "promoNm"		}	//프로모션명/카드종류
		, { fieldName: "discountAmt"	, dataType: "number"}	//할인금액
		, { fieldName: "goodsNo"		}	//상품번호
		, { fieldName: "goodsNm"		}	//상품명
		, { fieldName: "itmNo"			}	//단품번호
		, { fieldName: "itmNm"			}	//단품명
		, { fieldName: "salePrc"		, dataType: "number" }	//판매가
		, { fieldName: "ordQty"			, dataType: "number" }	//수량
		, { fieldName: "discountLevel"	}	//할인레벨
	]
	, columns : [
		{
			  name: 'promoNo'
			, fieldName: 'promoNo'
			, visible:false
		}
		,
		// 할인유형
		{
			  name: 'promoTypNm'
			, fieldName: 'promoTypNm'
			, width: 150
			, header: { text: col.promoTypNm }
			, editable : false
			, styleName: 'left-column disable-column'
		}

		// 중복여부
		, {
			name: 'overlapCpnYn'
			, fieldName: 'overlapCpnYn'
			, width: 50
			, header: { text: col.overlapCpnYn }
			, editable : false
			, styleName: 'disable-column'
		}

		// 프로모션명/카드종류
		, {
			name: 'promoNm'
			, fieldName: 'promoNm'
			, width: 150
			, header: { text: col.promoNm }
			, editable : false
			, styleName : "left-column disable-column"
			, footer: {
				styleName: "left-column"
			}
		}

		// 할인금액
		, {
			name: 'discountAmt'
			, fieldName: 'discountAmt'
			, width: 70
			, header: { text: col.discountAmt }
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

		// 상품명
		, {
			name: 'goodsNm'
			, fieldName: 'goodsNm'
			, width: 150
			, header: { text: col.goodsNm }
			, editable : false
			, styleName : "left-column disable-column"
		}

		// 단품명
		, {
			name: 'itmNm'
			, fieldName: 'itmNm'
			, width: 150
			, header: { text: col.itmNm }
			, editable : false
			, styleName : "left-column disable-column"
		}

		// 판매가
		, {
			name: 'salePrc'
			, fieldName: 'salePrc'
			, width: 60
			, header: { text: col.salePrc }
			, editable : false
			, styleName: 'disable-column'
			, dataType : "number"
			, numberFormat: "#,##0"
		}

		// 수량
		, {
			name: 'ordQty'
			, fieldName: 'ordQty'
			, width: 60
			, header: { text: col.ordQty }
			, editable : false
			, styleName: 'disable-column'
			, dataType : "number"
			, numberFormat: "#,##0"
		}
	]
	, validations : []
	, props : {
		  form : "benefitForm"
		, paging : false										// 페이지네이션 사용 여부
		, autoFitHeight : false									// 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, width : "100%"										// 그리드 설정 - 넓이 설정(default = 100%)
		, height : 550											// 그리드 설정 - 높이 설정(default = 자동설정)
		, checkbox : true
		, popup : false											// 그리드 설정 - 팝업 자동 resize
		, crud : false											// 그리드 설정 - cud 상태 컬럼 노출 여부
		, fitStyle : 'evenFill'									// evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
	}
};