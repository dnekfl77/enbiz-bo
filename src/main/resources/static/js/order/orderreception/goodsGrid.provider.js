var col = x2coMessage.getMessage( {
	_dlvpNm :"orderReception.manualOrder.goodsInfo.grid.dlvpNm"						//배송지
	, _rcvmnNm :"orderReception.manualOrder.goodsInfo.grid.rcvmnNm"					//수취인
	, _goodsNo :"orderReception.manualOrder.goodsInfo.grid.goodsNo"					//상품번호
	, _goodsNm :"orderReception.manualOrder.goodsInfo.grid.goodsNm"					//상품명
	, _optnNm :"orderReception.manualOrder.goodsInfo.grid.optnNm"					//단품명
	, _brandNm :"orderReception.manualOrder.goodsInfo.grid.brandNm"					//브랜드
	, _salePrc :"orderReception.manualOrder.goodsInfo.grid.salePrc"					//판매가
	, _ordQty :"orderReception.manualOrder.goodsInfo.grid.ordQty"					//주문수량
	, _stkQty :"orderReception.manualOrder.goodsInfo.grid.stkQty"					//재고
	, _prestNm :"orderReception.manualOrder.goodsInfo.grid.prestNm"					//증정품
	, _goodsTypNm :"orderReception.manualOrder.goodsInfo.grid.goodsTypNm"			//상품유형
	, _deliGoodsGbNm :"orderReception.manualOrder.goodsInfo.grid.deliGoodsGbNm"		//배송상품구분
	, _deliWayNm :"orderReception.manualOrder.goodsInfo.grid.deliWayNm"				//배송수단
	, _deliProcTypNm :"orderReception.manualOrder.goodsInfo.grid.deliProcTypNm"		//배송처리구분
	, _deliDday :"orderReception.manualOrder.goodsInfo.grid.deliDday"				//배송기일
	, _saleMethCd :"orderReception.manualOrder.goodsInfo.grid.saleMethCd"			//배송예약구분
	, _shipIndiFcstDt :"orderReception.manualOrder.goodsInfo.grid.shipIndiFcstDt"	//배송상품배송시작일
	, _deliMsg :"orderReception.manualOrder.goodsInfo.grid.deliMsg"					//배송메세지(20Byte)
	, _buyTypCd :"orderReception.manualOrder.goodsInfo.grid.buyTypCd"				//거래형태
	, _entrNm :"orderReception.manualOrder.goodsInfo.grid.entrNm"					//협력사명
});

$.namespace("goodsGrid.settings");
goodsGrid.settings = {
    fields : [
		  { fieldName: "mbrNo"				, dataType: "text" }// 회원번호
		, { fieldName: "dispCtgNo"			, dataType: "text" }// 전시카테고리번호
		, { fieldName: "siteNo"				, dataType: "text" }// 사이트번호
		, { fieldName: "stdCtgNo"			, dataType: "text" }// 표준카테고리번호
		, { fieldName: "entrNo"				, dataType: "text" }// 협력사번호
		, { fieldName: "brandNo"			, dataType: "text" }// 브랜드번호
		, { fieldName: "chlNo"				, dataType: "text" }// 채널번호
		, { fieldName: "itmNo"				, dataType: "text" }// 단품번호
		, { fieldName: "buyQtyLmtYn"		, dataType: "text" }// 구매수량제한여부
		, { fieldName: "minLmtQty"			, dataType: "number" }// 최소구매수량
		, { fieldName: "maxLmtQty"			, dataType: "number" }// 최대구매수량
		, { fieldName: "mbrDlvpSeq"			, dataType: "text" }// 회원배송지순번(배송지명)
		, { fieldName: "mbrDlvpSeqBefore"	, dataType: "text" }// 회원배송지순번(배송지명) : 선택된 데이터 보관용
		, { fieldName: "bdlDeliPsbYn"		, dataType: "text" }// 묶음배송가능여부
		, { fieldName: "deliPolcNo"			, dataType: "text" }// 배송정책번호
		, { fieldName: "rcvmnNm"			, dataType: "text" }// 수취인
		, { fieldName: "goodsNo"			, dataType: "text" }// 상품번호
		, { fieldName: "goodsNm"			, dataType: "text" }// 상품명
		, { fieldName: "optnNm"				, dataType: "text" }// 단품명
		, { fieldName: "brandNm"			, dataType: "text" }// 브랜드
		, { fieldName: "salePrc"			, dataType: "number" }// 판매가
		, { fieldName: "ordQty"				, dataType: "number" }// 주문수량
		, { fieldName: "stkQty"				, dataType: "number" }// 재고
		, { fieldName: "prestNm"			, dataType: "text" }// 증정품
		, { fieldName: "goodsTypCdNm"		, dataType: "text" }// 상품유형
		, { fieldName: "deliGoodsGbCdNm"	, dataType: "text" }// 배송상품구분
		, { fieldName: "deliWayCdNm"		, dataType: "text" }// 배송수단(배송수단코드(PR009))
		, { fieldName: "deliWayCd"			, dataType: "text" }// 배송수단코드(PR009))
		, { fieldName: "deliProcTypCd"		, dataType: "text" }// 배송처리유형코드(PR008)
		, { fieldName: "deliProcTypCdNm"	, dataType: "text" }// 배송처리구분(배송처리유형코드(PR008))
		, { fieldName: "deliDday"			, dataType: "text" }// 배송기일
		, { fieldName: "saleMethCdNm"		, dataType: "text" }// 배송예약구분(판매방식코드(PR003))
		, { fieldName: "fwdidcPrarDy"		, dataType: "text" }// 예약상품배송시작일(출고지시예정일자)
		, { fieldName: "deliMsg"			, dataType: "text" }// 배송메세지(20Byte)
		, { fieldName: "buyTypCdNm"			, dataType: "text" }// 거래형태(매입형태코드(PR006))
		, { fieldName: "entrNm"				, dataType: "text" }// 협력사명
    ]
    , columns : [
		{name : "mbrNo"				, fieldName : "mbrNo"			, visible : false}// 회원번호
		, {name : "dispCtgNo"		, fieldName : "dispCtgNo"		, visible : false}// 전시카테고리번호
		, {name : "siteNo"			, fieldName : "siteNo"			, visible : false}// 사이트번호
		, {name : "stdCtgNo"		, fieldName : "stdCtgNo"		, visible : false}// 표준카테고리번호
		, {name : "entrNo"			, fieldName : "entrNo"			, visible : false}// 협력사번호
		, {name : "brandNo"			, fieldName : "brandNo"			, visible : false}// 브랜드번호
		, {name : "chlNo"			, fieldName : "chlNo"			, visible : false}// 채널번호
		, {name : "itmNo"			, fieldName : "itmNo"			, visible : false}// 단품번호
		, {name : "minLmtQty"		, fieldName : "minLmtQty"		, visible : false}// 최소구매수량
		, {name : "maxLmtQty"		, fieldName : "maxLmtQty"		, visible : false}// 최대구매수량
		, {name : "bdlDeliPsbYn"	, fieldName : "bdlDeliPsbYn"	, visible : false}// 묶음배송가능여부
		, {name : "deliPolcNo"		, fieldName : "deliPolcNo"		, visible : false}// 배송정책번호
		, {name : "deliWayCd"		, fieldName : "deliWayCd"		, visible : false}// 배송수단코드(PR009)
		, {name : "deliProcTypCd"	, fieldName : "deliProcTypCd"	, visible : false}// 배송처리유형코드(PR008)
		// 배송지
        , {
            name: 'mbrDlvpSeq'
            , fieldName: 'mbrDlvpSeq'
            , width: 300
            , header: { text: col._dlvpNm }
			, lookupDisplay : true
			, editor : {
	            type : 'dropdown',
				textReadOnly: true,         // 키보드 입력 방지
            } , footer: {
                styleName: "center"
            }
        }

		// 수취인
        , {
            name: 'rcvmnNm'
            , fieldName: 'rcvmnNm'
            , width: 80
            , header: { text: col._rcvmnNm }
			, editable : true
			, styleName: 'left-column'
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

		// 브랜드
        , {
            name: 'brandNm'
            , fieldName: 'brandNm'
            , width: 80
            , header: { text: col._brandNm }
			, editable : false
			, styleName: 'left-column disable-column'
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
            , footer: {
                expression: "sum",
                numberFormat: "#,##0",
                styleName: "right-column"
              }
        }

		// 주문수량
        , {
            name: 'ordQty'
            , fieldName: 'ordQty'
            , width: 80
            , header: { text: col._ordQty }
			, editable : true
			, styleName: 'right-column'
			, dataType : "number"
			, numberFormat: "#,##0"
            , footer: {
                expression: "sum",
                numberFormat: "#,##0",
                styleName: "right-column"
            }
        }

		// 재고
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

		// 증정품
        , {
            name: 'prestNm'
            , fieldName: 'prestNm'
            , width: 150
            , header: { text: col._prestNm }
			, editable : false
			, styleName: 'left-column disable-column'
        }

		// 상품유형
        , {
            name: 'goodsTypCdNm'
            , fieldName: 'goodsTypCdNm'
            , width: 80
            , header: { text: col._goodsTypNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// 배송상품구분
        , {
            name: 'deliGoodsGbCdNm'
            , fieldName: 'deliGoodsGbCdNm'
            , width: 80
            , header: { text: col._deliGoodsGbNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// 배송수단
        , {
            name: 'deliWayCdNm'
            , fieldName: 'deliWayCdNm'
            , width: 80
            , header: { text: col._deliWayNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// //배송처리구분
        , {
            name: 'deliProcTypCdNm'
            , fieldName: 'deliProcTypCdNm'
            , width: 80
            , header: { text: col._deliProcTypNm }
			, editable : false
			, styleName: 'disable-column'
        }

		// 배송기일
        , {
            name: 'deliDday'
            , fieldName: 'deliDday'
            , width: 80
            , header: { text: col._deliDday }
			, editable : false
			, styleName: 'disable-column right-column'
            , displayCallback : function(grid,index,value){
                var formattingValue = '';

                if(value === null || value === undefined){
                    return formattingValue;
                }

                formattingValue = value + "일";

                return formattingValue;
            }
        }

		// 배송예약구분
        , {
            name: 'saleMethCdNm'
            , fieldName: 'saleMethCdNm'
            , width: 80
            , header: { text: col._saleMethCd }
			, editable : false
			, styleName: 'disable-column'
        }

		// 예약상품배송시작일
        , {
            name: 'fwdidcPrarDy'
            , fieldName: 'fwdidcPrarDy'
            , width: 120
            , header: { text: col._shipIndiFcstDt }
			, editable : false
			, styleName: 'disable-column'
        }

		// 배송메세지(20Byte)
        , {
            name: 'deliMsg'
            , fieldName: 'deliMsg'
            , width: 240
            , header: { text: col._deliMsg }
			, editable : true
			, editor :{maxLength: 20}
			, styleName: 'left-column'
        }

		// 거래형태
        , {
            name: 'buyTypCdNm'
            , fieldName: 'buyTypCdNm'
            , width: 80
            , header: { text: col._buyTypCd }
			, editable : false
			, styleName: 'disable-column'
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
          paging : false          // 페이지네이션 사용 여부
        , autoFitHeight : false   // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, width : "100%"             // 그리드 설정 - 넓이 설정(default = 100%)
		, height : 250               // 그리드 설정 - 높이 설정(default = 자동설정)
        , sumRowVisible : false  // 그리드 설정 - 하단 합계 영역 노출 여부
		, checkbox : true		 // 그리드 설정 - 체크박스 필드 노출 여부
        , popup : false          // 그리드 설정 - 팝업 자동 resize
        , crud : false           // 그리드 설정 - cud 상태 컬럼 노출 여부
        , fitStyle : 'none'      // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
    }
};