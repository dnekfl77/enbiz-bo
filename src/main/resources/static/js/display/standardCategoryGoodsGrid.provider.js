$.namespace("standardCategoryGoodsGrid.settings")
standardCategoryGoodsGrid.settings = {
    fields : [
        { fieldName: 'goodsNo'     },
        { fieldName: 'goodsNm'     },
        { fieldName: 'saleStatCdNm'},
    ]
    ,columns : [
        {
            // 상품번호
            name: 'goodsNo',
            fieldName: 'goodsNo',
            width : 100,
            styleName: 'disable-column',
            header: { text: msg.goodsNo }
        },
        {
            // 상품명
            name: 'goodsNm',
            fieldName: 'goodsNm',
            width : 500,
            styleName: 'disable-column left-column',
            header: { text: msg.goodsNm }
        },
        {
            // 판매상태코드명
            name: 'saleStatCdNm',
            fieldName: 'saleStatCdNm',
            width : 100,
            styleName: 'disable-column',
            header: { text: msg.saleStatCdNm }
        },
    ]
    , props : {
          width : "100%"
        , autoFitHeight : false       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        , popup : false               // 그리드 설정 - 팝업 자동 resize
        , checkbox : false            // 그리드 설정 - 체크박스 필드 노출 여부
        , crud : false                // 그리드 설정 - 상태 필드 노출 여부
        , sumRowVisible : false       // 그리드 설정 - 하단 합계 영역 노출 여부
        , paging : true               // 페이지네이션 사용 여부
        , action : _baseUrl + "display/standardCategoryMgmt.getStandardCategoryMgmtGoodsList.do"
    }
}