var assocGoodsGridCol = x2coMessage.getMessage({
    sortSeq            :   'generalGoods.additionalInfo.assocGoodsGrid.field.sortSeq'        // 전시순번
    ,asctGoodsNo       :   'generalGoods.additionalInfo.assocGoodsGrid.field.asctGoodsNo'    // 연관상품번호
    ,asctGoodsNm       :   'generalGoods.additionalInfo.assocGoodsGrid.field.asctGoodsNm'    // 연관상품명
    ,saleStatCdNm      :   'generalGoods.additionalInfo.assocGoodsGrid.field.saleStatCdNm'   // 판매상태
});

$.namespace('assocGoodsGrid.settings')
assocGoodsGrid.settings = {
    fields : [
        { fieldName: 'sortSeq'          , dataType: 'number' },
        { fieldName: 'asctGoodsNo'      , dataType: 'text' },
        { fieldName: 'asctGoodsNm'      , dataType: 'text' },
        { fieldName: 'saleStatCdNm'     , dataType: 'text' },
        { fieldName: 'asctGbCd'         , dataType: 'text' }
    ]
    ,columns : [
        {
            // 전시순번
            name: 'sortSeq',
            fieldName: 'sortSeq',
            width : 80,
            header: { text: assocGoodsGridCol.sortSeq + '*' },
            editor: {
                type: 'number',
                integerOnly: true,    // 정수값만 입력 허용
                maxIntegerLength: 2   // 입력 허용 가능 자리수
            },
            numberFormat : '0'        // 그리드 숫자 표현 방식
        },
        {
            // 연관상품번호
            name: 'asctGoodsNo',
            fieldName: 'asctGoodsNo',
            width : 120,
            editable : false,
            styleName: 'disable-column',
            header: { text: assocGoodsGridCol.asctGoodsNo }
        },
        {
            // 연관상품명
            name: 'asctGoodsNm',
            fieldName: 'asctGoodsNm',
            width : 200,
            editable : false,
            styleName: 'disable-column left-column',
            header: { text: assocGoodsGridCol.asctGoodsNm }
        },
        {
            // 판매상태
            name: 'saleStatCdNm',
            fieldName: 'saleStatCdNm',
            width : 120,
            editable : false,
            styleName: 'disable-column',
            header: { text: assocGoodsGridCol.saleStatCdNm }
        }
    ]
    ,validations : [

    ]
    ,props : {
        form : ''                    // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + ''      // Request URL
        ,autoFitHeight : false       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,height : 200
        ,popup : false               // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true             // 그리드 설정 - 체크박스 필드 노출 여부
        ,crud : true                 // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false       // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false              // 페이지네이션 사용 여부
    }
}