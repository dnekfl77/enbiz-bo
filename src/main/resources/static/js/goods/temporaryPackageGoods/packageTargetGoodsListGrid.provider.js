var col = x2coMessage.getMessage( {
    goodsNo :  'packageGoods.packageTargetGoodsListGrid.field.goodsNo'
    ,goodsNm :  'packageGoods.packageTargetGoodsListGrid.field.goodsNm'
    ,modelNm :  'packageGoods.packageTargetGoodsListGrid.field.modelNm'
    ,brandNm :  'packageGoods.packageTargetGoodsListGrid.field.brandNm'
    ,mdNm :  'packageGoods.packageTargetGoodsListGrid.field.mdId'
    ,saleStatCdNm :  'packageGoods.packageTargetGoodsListGrid.field.saleStatCdNm'
    ,goodsRegDtm :  'packageGoods.packageTargetGoodsListGrid.field.goodsRegDtm'
});

$.namespace('packageTargetGoodsListGrid.settings');
packageTargetGoodsListGrid.settings = {
    fields : [
        { fieldName: 'goodsNo'              ,  dataType: 'text'   },   // 상품번호
        { fieldName: 'goodsNm'              ,  dataType: 'text'   },   // 상품명
        { fieldName: 'modlNm'               ,  dataType: 'text'   },   // 모델명
        { fieldName: 'brandNm'              ,  dataType: 'text'   },   // 브랜드명
        { fieldName: 'entrNo'               ,  dataType: 'text'   },   // 협력사번호
        { fieldName: 'entrNm'               ,  dataType: 'text'   },   // 협력사명
        { fieldName: 'mdId'                 ,  dataType: 'text'   },   // 담당MD
        { fieldName: 'saleStatCdNm'         ,  dataType: 'text'   },   // 판매상태코드명
        { fieldName: 'goodsRegDtm'          ,  dataType: 'text'   },   // 상품등록일자
        { fieldName: 'dispYn'               ,  dataType: 'text'   },   // 전시상태
        { fieldName: 'deliProcTypCdNm'      ,  dataType: 'text'   },   // 배송처리유형명
        { fieldName: 'deliGoodsGbCdNm'      ,  dataType: 'text'   },   // 배송상품구분코드명
        { fieldName: 'salePrc'              ,  dataType: 'number' },   // 판매가
        { fieldName: 'dispDlexAmt'          ,  dataType: 'text'   },   // 배송비
    ]
    ,columns : [
        {
            name: 'goodsNo',
            fieldName: 'goodsNo',
            width : 100,
            editable : false,
            header: { text: col.goodsNo }
        }
        ,{
            name: 'goodsNm',
            fieldName: 'goodsNm',
            width : 200,
            editable : false,
            styleName: 'left-column',
            header: { text: col.goodsNm }
        }
        ,{
            name: 'modlNm',
            fieldName: 'modlNm',
            width : 200,
            editable : false,
            styleName: 'left-column',
            header: { text: col.modelNm }
        }
        ,{
            name: 'brandNm',
            fieldName: 'brandNm',
            width : 150,
            editable : false,
            styleName: 'left-column',
            header: { text: col.brandNm }
        }
        ,{
            name: 'mdId',
            fieldName: 'mdId',
            width : 100,
            editable : false,
            header: { text: col.mdNm }
        }
        ,{
            name: 'saleStatCdNm',
            fieldName: 'saleStatCdNm',
            width : 100,
            editable : false,
            header: { text: col.saleStatCdNm }
        }
        ,{
            name: 'goodsRegDtm',
            fieldName: 'goodsRegDtm',
            width : 120,
            editable : false,
            header: { text: col.goodsRegDtm }
        }
    ]
    ,props : {
        form : 'packageTargetGoodsListGridForm'   // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + 'goods/TemporaryPackageGoods.getPackageTargetGoodsList.do' // Request URL
        ,autoFitHeight : false          // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,popup : true                   // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true                // 그리드 설정 - 체크박스 필드 노출 여부
        ,crud : false                   // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false          // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : true                  // 페이지네이션 사용 여부
        ,saveAction : _baseUrl + ''
        ,fitStyle : "evenFill"
    }
}