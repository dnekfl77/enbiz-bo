var adveWrdGridCol = x2coMessage.getMessage({
    adveWrd            :   'generalGoods.additionalInfo.adveWrdGrid.field.adveWrd'           // 홍보문구
    ,aplyStrDt         :   'generalGoods.additionalInfo.adveWrdGrid.field.aplyStrDt'         // 적용시작일자
    ,aplyEndDt         :   'generalGoods.additionalInfo.adveWrdGrid.field.aplyEndDt'         // 적용종료일자
    ,useYn             :   'generalGoods.additionalInfo.adveWrdGrid.field.useYn'             // 사용여부
});

$.namespace('adveWrdGrid.settings')
adveWrdGrid.settings = {
    fields : [
        { fieldName: 'adveWrd'      ,  dataType: 'text' },
        { fieldName: 'aplyStrDt'    ,  dataType: 'text' },
        { fieldName: 'aplyEndDt'    ,  dataType: 'text' },
        { fieldName: 'useYn'        ,  dataType: 'text' }
    ]
    ,columns : [
        {
            // 홍보문구
            name: 'adveWrd',
            fieldName: 'adveWrd',
            width : 200,
            styleName: 'left-column',
            editor : {
                type: 'line',
                maxLength: 30
            },
            header: { text: adveWrdGridCol.adveWrd + '*' }
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
            header: { text: adveWrdGridCol.aplyStrDt + '*'  }
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
            header: { text: adveWrdGridCol.aplyEndDt + '*'  }
        },
        {
            // 사용여부
            name: 'useYn',
            fieldName: 'useYn',
            width: 100,
            header: {text: adveWrdGridCol.useYn },
            sortable: false,
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
        ,crud : false                // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false       // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false              // 페이지네이션 사용 여부
    }
}