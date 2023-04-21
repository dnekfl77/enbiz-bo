var itemListGridCol = x2coMessage.getMessage({
     stkQty            : 'generalGoods.saleInfo.itemListGrid.field.stkQty'                      // 재고수량
    ,soutNotiYn        : 'generalGoods.saleInfo.itemListGrid.field.soutNotiYn'                  // 품절알림여부
    ,soutNotiStdQty    : 'generalGoods.saleInfo.itemListGrid.field.soutNotiStdQty'              // 품절알림기준수량
    ,lgcItmNo          : 'generalGoods.saleInfo.itemListGrid.field.lgcItmNo'                    // 기간계단품번호
});

$.namespace('itemListGrid.settings')
itemListGrid.settings = {
    fields : [
        { fieldName: 'stkQty'            ,  dataType: 'number'  }, // 재고수량
        { fieldName: 'soutNotiYn'        ,  dataType: 'text'    }, // 품절알림여부
        { fieldName: 'soutNotiStdQty'    ,  dataType: 'number'  }, // 품절알림기준수량
        { fieldName: 'lgcItmNo'          ,  dataType: 'text'    }  // 기간계단품번호
    ]
    ,columns : [
        {
            // 재고수량
            name: 'stkQty',
            fieldName: 'stkQty',
            width : 80,
            header: { text: itemListGridCol.stkQty + '*' },
            editor: {
                type: 'number',
                integerOnly: true       // 정수값만 입력 허용
            },
            numberFormat : '0'          // 그리드 숫자 표현 방식
        },
        {
            // 품절알림여부
            name: 'soutNotiYn',
            fieldName: 'soutNotiYn',
            width : 120,
            header: { text: itemListGridCol.soutNotiYn + '*' },
            sortable: false,
            editable : false,
            renderer: {
                type: "check",
                trueValues: "Y",
                falseValues: "N"
            }
        },
        {
            // 품절알림기준수량
            name: 'soutNotiStdQty',
            fieldName: 'soutNotiStdQty',
            width : 120,
            header: { text: itemListGridCol.soutNotiStdQty + '*' },
            editor: {
                type: 'number',
                integerOnly: true,    // 정수값만 입력 허용
            },
            numberFormat : '0'        // 그리드 숫자 표현 방식
        },
        {
            // 기간계단품번호
            name: 'lgcItmNo',
            fieldName: 'lgcItmNo',
            width : 120,
            styleName: 'left-column',
            editor : {
                type: 'line',
                maxLength: 15
            },
            header: { text: itemListGridCol.lgcItmNo }
        }
    ]
    ,props : {
        form : ''                       // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + ''         // Request URL
        ,autoFitHeight : false          // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,height : 300
        ,popup : false                  // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true                // 그리드 설정 - 체크박스 필드 노출 여부
        ,crud : false                   // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false          // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false                 // 페이지네이션 사용 여부
        ,saveAction : _baseUrl + ''
    }
}