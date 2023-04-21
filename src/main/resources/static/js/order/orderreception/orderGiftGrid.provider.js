var col = x2coMessage.getMessage( {
	addEvtTypCdNm : "orderReception.manualOrder.orderGiftInfo.grid.addEvtTypCdNm"	//행사유형
	, aeNm        : "orderReception.manualOrder.orderGiftInfo.grid.aeNm"			//행사명
	, goodsNo     : "orderReception.manualOrder.orderGiftInfo.grid.goodsNo"		//사은품번호
	, goodsNm     : "orderReception.manualOrder.orderGiftInfo.grid.goodsNm"		//사은품명
	, dlvpNm      : "orderReception.manualOrder.orderGiftInfo.grid.dlvpNm"			//배송지
	, stkQty      : "orderReception.manualOrder.orderGiftInfo.grid.stkQty"			//재고
});

$.namespace("orderGiftGrid.settings");
orderGiftGrid.settings = {
    fields : [
		{ fieldName: "mbrNo"				, dataType: "text" }//회원번호
		, { fieldName: "aeNo"				, dataType: "text" }//사은행사번호
		, { fieldName: "aeFvrSeq"			, dataType: "text" }//사은행사혜택순번
		, { fieldName: "addEvtTypCd"		, dataType: "text" }//행사유형
        , { fieldName: "addEvtTypCdNm"		, dataType: "text" }//행사유형
		, { fieldName: "aeNm"				, dataType: "text" }//행사명
		, { fieldName: "goodsNo"			, dataType: "text" }//사은품번호 - 상품번호
		, { fieldName: "goodsNm"			, dataType: "text" }//사은품명
        , { fieldName: "itmNo"			    , dataType: "text" }
        , { fieldName: "itmNm"			    , dataType: "text" }
		, { fieldName: "dlvpAddr"			, dataType: "text" }//배송지명
		, { fieldName: "dlvpNm"				, dataType: "text" }//배송지
		, { fieldName: "zipNo"				, dataType: "text" }//배송지 우편번호
		, { fieldName: "mbrDlvpSeq"			, dataType: "text" }//회원배송지순번
		, { fieldName: "stkQty"				, dataType: "text" }//재고
		, { fieldName: "deliPolcNo"			, dataType: "text" }//배송정책
		, { fieldName: "bdlDeliPsbYn"		, dataType: "text" }//묶음배송여부
    ]
    , columns : [
		// 사은행사유형코드
        {
            name: 'addEvtTypCdNm'
            , fieldName: 'addEvtTypCdNm'
            , width: 150
            , header: { text: col.addEvtTypCdNm }
			, editable : false
			, styleName: 'left-column disable-column'
        }

		// 행사명
        , {
            name: 'aeNm'
            , fieldName: 'aeNm'
            , width: 150
            , header: { text: col.aeNm }
			, editable : false
			, styleName: 'left-column disable-column'
        }

		// 사은품번호 - 상품번호
        , {
            name: 'goodsNo'
            , fieldName: 'goodsNo'
            , width: 80
            , header: { text: col.goodsNo }
			, editable : false
            , styleName : "disable-column column-underline-c"
        }

		// 사은품명 - 상품명
        , {
            name: 'goodsNm'
            , fieldName: 'goodsNm'
            , width: 150
            , header: { text: col.goodsNm }
			, editable : false
            , styleName : "disable-column column-underline-c"
        }

		// 배송지
        , {
            name: 'mbrDlvpSeq'
            , fieldName: 'mbrDlvpSeq'
            , width: 150
            , header: { text: col.dlvpNm }
			, lookupDisplay : true
			, visible : true
			, editor : {
	            type : 'dropdown'
				, displayLabels: 'label'     // 드롭다운 목록 표시방식
				, domainOnly: true           // 드롭다운 목록에있는 값만 선택 가능
				, textReadOnly: true         // 키보드 입력 방지
	        }
        }

		// 재고
        , {
            name: 'stkQty'
            , fieldName: 'stkQty'
            , width: 80
            , header: { text: col.stkQty }
			, editable : false
			, styleName: 'right-column disable-column'
			, dataType : "number"
			, numberFormat: "#,##0"
        }
    ]
    , validations : []
    , props : {
        form : "orderGiftForm"   // 서버로 전달할 데이터 Form ID값
        , action : _baseUrl + "order/orderReception.getOrderGiftList.do" // Request URL
        , autoFitHeight : false   // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, width : "100%"             // 그리드 설정 - 넓이 설정(default = 100%)
		, height : 200               // 그리드 설정 - 높이 설정(default = 자동설정)
        , sumRowVisible : false  // 그리드 설정 - 하단 합계 영역 노출 여부
		, checkbox : true		 // 그리드 설정 - 체크박스 필드 노출 여부
        , popup : false          // 그리드 설정 - 팝업 자동 resize
        , crud : false           // 그리드 설정 - cud 상태 컬럼 노출 여부
        , fitStyle : 'evenFill'      // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
    }
};