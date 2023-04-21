var col = x2coMessage.getMessage( {
	_stdLrgCtgNm		: "orderReception.addGoodsPopup.grid.stdLrgCtgNm"		// 표준대분류명
	, _stdMidCtgNm		: "orderReception.addGoodsPopup.grid.stdMidCtgNm"		// 표준중분류명
	, _goodsNo			: "orderReception.addGoodsPopup.grid.goodsNo"			// 상품번호
	, _goodsNm			: "orderReception.addGoodsPopup.grid.goodsNm"			// 상품명
	, _optnNm			: "orderReception.addGoodsPopup.grid.optnNm"			// 단품명
	, _norPrc			: "orderReception.addGoodsPopup.grid.norPrc"			// 정상가
	, _salePrc			: "orderReception.addGoodsPopup.grid.salePrc"			// 판매가
	, _stkQty			: "orderReception.addGoodsPopup.grid.stkQty"			// 재고수량
	, _saleStatCdNm		: "orderReception.addGoodsPopup.grid.saleStatCdNm"		// 판매상태
	, _prestNm			: "orderReception.addGoodsPopup.grid.prestNm"			// 증정품명
	, _deliProcTypCdNm	: "orderReception.addGoodsPopup.grid.deliProcTypCdNm"	// 배송처리유형
	, _dispCtgNm		: "orderReception.addGoodsPopup.grid.dispCtgNm"		// 전시카테고리
	, _brandNm			: "orderReception.addGoodsPopup.grid.brandNm"			// 브랜드명
	, _entrNm			: "orderReception.addGoodsPopup.grid.entrNm"			// 협력사명
});

$.namespace("keyWordGrid.settings");
keyWordGrid.settings = {
    fields : [
		{ fieldName: "itmNo"				, dataType: "text" }// 단품번호
		, { fieldName: "buyQtyLmtYn"		, dataType: "text" }// 구매수량제한여부
		, { fieldName: "minLmtQty"			, dataType: "number" }// 최소구매수량
		, { fieldName: "maxLmtQty"			, dataType: "number" }// 최대구매수량
		, { fieldName: "goodsTypCdNm"		, dataType: "text" }// 상품유형코드(PR002)
		, { fieldName: "deliGoodsGbCdNm"	, dataType: "text" }// 배송상품구분코드(PR010)
		, { fieldName: "deliWayCdNm"		, dataType: "text" }// 배송수단코드(PR009)
		, { fieldName: "deliDday"			, dataType: "text" }// 배송기일
		, { fieldName: "saleMethCdNm"		, dataType: "text" }// 판매방식코드(PR003)
		, { fieldName: "fwdidcPrarDy"		, dataType: "text" }// 출고지시예정일자(예약상품배송시작일)
		, { fieldName: "buyTypCdNm"			, dataType: "text" }// 거래형태(매입형태코드(PR006))
		, { fieldName: "dispCtgNo"			, dataType: "text" }// 전시카테고리번호
		, { fieldName: "siteNo"				, dataType: "text" }// 사이트번호
		, { fieldName: "stdCtgNo"			, dataType: "text" }// 표준카테고리번호
		, { fieldName: "entrNo"				, dataType: "text" }// 협력사번호
		, { fieldName: "brandNo"			, dataType: "text" }// 브랜드번호
		, { fieldName: "chlNo"				, dataType: "text" }// 채널번호
		, { fieldName: "stdLrgCtgNm"		, dataType: "text" }// 표준대분류명
		, { fieldName: "stdMidCtgNm"		, dataType: "text" }// 표준중분류명
		, { fieldName: "goodsNo"			, dataType: "text" }// 상품번호
		, { fieldName: "goodsNm"			, dataType: "text" }// 상품명
		, { fieldName: "optnNm"				, dataType: "text" }// 단품명
		, { fieldName: "norPrc"				, dataType: "text" }// 정상가
		, { fieldName: "salePrc"			, dataType: "number" }// 판매가
		, { fieldName: "stkQty"				, dataType: "number" }// 재고수량
		, { fieldName: "saleStatCdNm"		, dataType: "text" }// 판매상태
		, { fieldName: "prestNm"			, dataType: "text" }// 증정품명
		, { fieldName: "deliProcTypCdNm"	, dataType: "text" }// 배송처리유형
		, { fieldName: "dispCtgNm"			, dataType: "text" }// 전시카테고리
		, { fieldName: "brandNm"			, dataType: "text" }// 브랜드명
		, { fieldName: "entrNm"				, dataType: "text" }// 협력사명
		, { fieldName: "bdlDeliPsbYn"		, dataType: "text" }// 묶음배송가능여부
		, { fieldName: "deliPolcNo"			, dataType: "text" }// 배송정책번호
		, { fieldName: "deliProcTypCd"		, dataType: "text" }// 배송처리유형코드(PR008)
		, { fieldName: "selectYn"		    , dataType: "text" }// 선택가능여부
    ]
    , columns : [
		{name : "itmNo"				, fieldName : "itmNo"			, visible : false}// 단품번호
		, {name : "minLmtQty"		, fieldName : "minLmtQty"		, visible : false}// 최소구매수량
		, {name : "maxLmtQty"		, fieldName : "maxLmtQty"		, visible : false}// 최대구매수량
		, {name : "goodsTypCdNm"	, fieldName : "goodsTypCdNm"	, visible : false}// 상품유형코드(PR002)
		, {name : "deliGoodsGbCdNm"	, fieldName : "deliGoodsGbCdNm"	, visible : false}// 배송상품구분코드(PR010)
		, {name : "deliWayCdNm"		, fieldName : "deliWayCdNm"		, visible : false}// 배송수단코드(PR009)
		, {name : "deliDday"		, fieldName : "deliDday"		, visible : false}// 배송기일
		, {name : "saleMethCdNm"	, fieldName : "saleMethCdNm"	, visible : false}// 최대구매수량
		, {name : "fwdidcPrarDy"	, fieldName : "fwdidcPrarDy"	, visible : false}// 예약상품배송시작일(출고지시예정일자)
		, {name : "buyTypCdNm"		, fieldName : "buyTypCdNm"		, visible : false}// 거래형태(매입형태코드(PR006))
		, {name : "dispCtgNo"		, fieldName : "dispCtgNo"		, visible : false}// 전시카테고리번호
		, {name : "siteNo"			, fieldName : "siteNo"			, visible : false}// 사이트번호
		, {name : "stdCtgNo"		, fieldName : "stdCtgNo"		, visible : false}// 표준카테고리번호
		, {name : "entrNo"			, fieldName : "entrNo"			, visible : false}// 협력사번호
		, {name : "brandNo"			, fieldName : "brandNo"			, visible : false}// 브랜드번호
		, {name : "chlNo"			, fieldName : "chlNo"			, visible : false}// 채널번호
		, {name : "bdlDeliPsbYn"	, fieldName : "bdlDeliPsbYn"	, visible : false}// 묶음배송가능여부
		, {name : "deliPolcNo"		, fieldName : "deliPolcNo"		, visible : false}// 배송정책번호
		, {name : "deliProcTypCd"	, fieldName : "deliProcTypCd"	, visible : false}// 배송처리유형코드(PR008)
		// 표준대분류명
        , {
            name: 'stdLrgCtgNm'
            , fieldName: 'stdLrgCtgNm'
            , width: '80'
            , header: { text: col._stdLrgCtgNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// 표준중분류명
        , {
            name: 'stdMidCtgNm'
            , fieldName: 'stdMidCtgNm'
            , width: 80
            , header: { text: col._stdMidCtgNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// 상품번호
        , {
            name: 'goodsNo'
            , fieldName: 'goodsNo'
            , width: 80
            , header: { text: col._goodsNo }
			, editable : false
            , styleName : "disable-column column-underline-c"
        }

		// 상품명
        , {
            name: 'goodsNm'
            , fieldName: 'goodsNm'
            , width: 400
            , header: { text: col._goodsNm }
			, styles :  { textAlignment : "near" }
			, editable : false
            , styleName : "left-column disable-column column-underline-c"
        }

		// 단품명
        , {
            name: 'optnNm'
            , fieldName: 'optnNm'
            , width: 150
            , header: { text: col._optnNm }
			, editable : false
			, styleName: 'left-column disable-column'
        }

		// 정상가
        , {
            name: 'norPrc'
            , fieldName: 'norPrc'
            , width: 80
            , header: { text: col._norPrc }
			, editable : false
			, styleName: 'right-column disable-column'
			, dataType : "number"
			, numberFormat: "#,##0"
        }

		// 판매가
        , {
            name: 'salePrc'
            , fieldName: 'salePrc'
            , width: 80
            , header: { text: col._salePrc }
			, editable : false
			, styleName: 'right-column disable-column'
			, dataType : "number"
			, numberFormat: "#,##0"
        }

		// 재고수량
        , {
            name: 'stkQty'
            , fieldName: 'stkQty'
            , width: 80
            , header: { text: col._stkQty }
			, editable : false
			, styleName: 'right-column disable-column'
			, dataType : "number"
			, numberFormat: "#,##0"
        }

		// 판매상태
        , {
            name: 'saleStatCdNm'
            , fieldName: 'saleStatCdNm'
            , width: 80
            , header: { text: col._saleStatCdNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// 증정품명
        , {
            name: 'prestNm'
            , fieldName: 'prestNm'
            , width: 150
            , header: { text: col._prestNm }
			, editable : false
			, styleName: 'left-column disable-column'
        }

		// 배송처리유형
        , {
            name: 'deliProcTypCdNm'
            , fieldName: 'deliProcTypCdNm'
            , width: 80
            , header: { text: col._deliProcTypCdNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// 전시카테고리
        , {
            name: 'dispCtgNm'
            , fieldName: 'dispCtgNm'
            , width: 80
            , header: { text: col._dispCtgNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// 브랜드
        , {
            name: 'brandNm'
            , fieldName: 'brandNm'
            , width: 80
            , header: { text: col._brandNm }
			, editable : false
			, styleName: 'left-column disable-column'
        }

		// 협력사명
        , {
            name: 'entrNm'
            , fieldName: 'entrNm'
            , width: 150
            , header: { text: col._entrNm }
			, editable : false
			, styleName: 'left-column disable-column'
        }
    ]
    , validations : []
    , props : {
        form : "keyWordSearchForm"                         // 서버로 전달할 데이터 Form ID값
        , paging : true          // 페이지네이션 사용 여부
        , action : _baseUrl + "order/orderReception.getGoodsKeyWordListPopup.do" // Request URL
        , autoFitHeight : false   // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, width : "100%"             // 그리드 설정 - 넓이 설정(default = 100%)
		, height : 290               // 그리드 설정 - 높이 설정(default = 자동설정)
        , sumRowVisible : false  // 그리드 설정 - 하단 합계 영역 노출 여부
		, checkbox : true		 // 그리드 설정 - 체크박스 필드 노출 여부
        , popup : false          // 그리드 설정 - 팝업 자동 resize
        , crud : false           // 그리드 설정 - cud 상태 컬럼 노출 여부
        , fitStyle : 'none'      // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
    }
};