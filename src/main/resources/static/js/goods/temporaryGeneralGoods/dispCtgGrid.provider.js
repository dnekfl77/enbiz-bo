var dispCtgGridCol = x2coMessage.getMessage({
    siteNm             :   'generalGoods.additionalInfo.dispCtgGrid.field.siteNm'            // 사이트
    ,dispCtgHierarchy  :   'generalGoods.additionalInfo.dispCtgGrid.field.dispCtgHierarchy'  // 전시카테고리
    ,repCtgYn          :   'generalGoods.additionalInfo.dispCtgGrid.field.repCtgYn'          // 대표카테고리여부
});


$.namespace('dispCtgGrid.settings')
dispCtgGrid.settings = {
    fields : [
        { fieldName: 'siteNm'               , dataType: 'text' },   // 사이트명
        { fieldName: 'dispCtgHierarchy'     , dataType: 'text' },   // 전시카테고리 구조
        { fieldName: 'repCtgYn'             , dataType: 'text' },   // 대표 카테고리 여부
        { fieldName: 'stdCtgNo'             , dataType: 'text' },   // 표준 카테고리 번호
        { fieldName: 'dispCtgNo'            , dataType: 'text' },   // 전시 카테고리 번호
        { fieldName: 'useYn'                , dataType: 'text' },   // 사용 여부
    ]
    ,columns : [
        {
            // 사이트명
            name: 'siteNm',
            fieldName: 'siteNm',
            width : 150,
            editable : false,
            styleName: 'disable-column',
            header: { text: dispCtgGridCol.siteNm }
        },
        {
            // 전시카테고리 구조
            name: 'dispCtgHierarchy',
            fieldName: 'dispCtgHierarchy',
            width : 250,
            editable : false,
            styleName: 'disable-column left-column',
            header: { text: dispCtgGridCol.dispCtgHierarchy }
        },
        {
            // 대표 카테고리 여부
            name: 'repCtgYn',
            fieldName: 'repCtgYn',
            width : 130,
            header: { text: dispCtgGridCol.repCtgYn + '*'},
            editable : false,
            renderer: {
                type: "check",
                trueValues: "Y",
                falseValues: "N"
            }
        }
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