var detailPrestGridCol = x2coMessage.getMessage({
    prestNm            :   'generalGoods.additionalInfo.prestGrid.field.prestNm'             // 증정메세지
    ,aplyStrDt         :   'generalGoods.additionalInfo.prestGrid.field.aplyStrDt'           // 적용시작일자
    ,aplyEndDt         :   'generalGoods.additionalInfo.prestGrid.field.aplyEndDt'           // 적용종료일자
    ,useYn             :   'generalGoods.additionalInfo.prestGrid.field.useYn'               // 사용여부
});

$.namespace('detailPrestGrid.settings')
detailPrestGrid.settings = {
    fields : [
        { fieldName: 'prestNm'      ,  dataType: 'text' },
        { fieldName: 'aplyStrDt'    ,  dataType: 'text' },
        { fieldName: 'aplyEndDt'    ,  dataType: 'text' },
        { fieldName: 'useYn'        ,  dataType: 'text' }
    ]
    ,columns : [
        {
            // 홍보문구
            name: 'prestNm',
            fieldName: 'prestNm',
            width : 200,
            styleName: 'left-column',
            editor : {
                type: 'line',
                maxLength: 30
            },
            header: { text: detailPrestGridCol.prestNm + '*' }
        },
        {
            // 적용시작일자
            name: 'aplyStrDt',
            fieldName: 'aplyStrDt',
            width : 150,
            editor : {
                type: 'date',
                datetimeFormat: 'yyyy-MM-dd',
                textReadOnly : true     // 키보드 입력 금지 여부
            },
            datetimeFormat : "yyyy-MM-dd",
            header: { text: detailPrestGridCol.aplyStrDt + '*'}
        },
        {
            // 적용종료일자
            name: 'aplyEndDt',
            fieldName: 'aplyEndDt',
            width : 150,
            editor : {
                type: 'date',
                datetimeFormat: 'yyyy-MM-dd',
                textReadOnly : true     // 키보드 입력 금지 여부
            },
            datetimeFormat : "yyyy-MM-dd",
            header: { text: detailPrestGridCol.aplyEndDt + '*'}
        },
        {
            // 사용여부
            name: 'useYn',
            fieldName: 'useYn',
            width: 100,
            header: {text: detailPrestGridCol.useYn},
            sortable: false,
            editable : false,
            renderer: {
                type: "check",
                trueValues: "Y",
                falseValues: "N"
            }
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
        ,crud : false                // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false       // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false              // 페이지네이션 사용 여부
    }
}