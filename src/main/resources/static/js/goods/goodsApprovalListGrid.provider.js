var col = x2coMessage.getMessage({
    pregStatCdNm     : 'goodsApprovalMgmt.grid.field.pregStatCdNm'    // 승인상태
    ,retnCausCdNm    : 'goodsApprovalMgmt.grid.field.retnCausCdNm'    // 반려사유
    ,goodsCompCdNm   : 'goodsApprovalMgmt.grid.field.goodsCompCdNm'   // 상품구성
    ,goodsTypCdNm    : 'goodsApprovalMgmt.grid.field.goodsTypCdNm'    // 상품유형
    ,saleMethCdNm    : 'goodsApprovalMgmt.grid.field.saleMethCdNm'    // 판매방식
    ,mdNm            : 'goodsApprovalMgmt.grid.field.mdNm'            // 담당MD
    ,pregGoodsNo     : 'goodsApprovalMgmt.grid.field.pregGoodsNo'     // 임시상품번호
    ,goodsNm         : 'goodsApprovalMgmt.grid.field.goodsNm'         // 상품명
    ,modlNm          : 'goodsApprovalMgmt.grid.field.modlNm'          // 모델명
    ,taxGbCdNm       : 'goodsApprovalMgmt.grid.field.taxGbCdNm'       // 과/면세구분
    ,buyTypCdNm      : 'goodsApprovalMgmt.grid.field.buyTypCdNm'      // 매입형태
    ,norPrc          : 'goodsApprovalMgmt.grid.field.norPrc'          // 정상가
    ,salePrc         : 'goodsApprovalMgmt.grid.field.salePrc'         // 판매가
    ,mrgnRate        : 'goodsApprovalMgmt.grid.field.mrgnRate'        // 마진율
    ,entrNm          : 'goodsApprovalMgmt.grid.field.entrNm'          // 협력사
    ,brandNm         : 'goodsApprovalMgmt.grid.field.brandNm'         // 브랜드
    ,deliProcTypCdNm : 'goodsApprovalMgmt.grid.field.deliProcTypCdNm' // 배송처리유형
    ,sysRegId        : 'goodsApprovalMgmt.grid.field.sysRegId'        // 상품등록자
    ,sysRegDtm       : 'goodsApprovalMgmt.grid.field.sysRegDtm'       // 상픔등록일시
    ,aprvDt          : 'goodsApprovalMgmt.grid.field.aprvDt'          // 상품승인일자
});

$.namespace('goodsApprovalListGrid.settings')
goodsApprovalListGrid.settings = {
    fields : [
        { fieldName: 'pregStatCd'       , dataType: 'text' },
        { fieldName: 'pregStatCdNm'     , dataType: 'text' },
        { fieldName: 'retnDt'           , dataType: 'text' },
        { fieldName: 'retnCaus'         , dataType: 'text' },
        { fieldName: 'retnCausCdNm'     , dataType: 'text' },
        { fieldName: 'goodsCompCdNm'    , dataType: 'text' },
        { fieldName: 'goodsCompCd'      , dataType: 'text' },
        { fieldName: 'goodsTypCdNm'     , dataType: 'text' },
        { fieldName: 'saleMethCdNm'     , dataType: 'text' },
        { fieldName: 'mdNm'             , dataType: 'text' },
        { fieldName: 'pregGoodsNo'      , dataType: 'text' },
        { fieldName: 'goodsNm'          , dataType: 'text' },
        { fieldName: 'modlNm'           , dataType: 'text' },
        { fieldName: 'taxGbCdNm'        , dataType: 'text' },
        { fieldName: 'buyTypCdNm'       , dataType: 'text' },
        { fieldName: 'norPrc'           , dataType: 'number' },
        { fieldName: 'salePrc'          , dataType: 'number' },
        { fieldName: 'mrgnRate'         , dataType: 'number' },
        { fieldName: 'entrNm'           , dataType: 'text' },
        { fieldName: 'brandNm'          , dataType: 'text' },
        { fieldName: 'deliProcTypCdNm'  , dataType: 'text' },
        { fieldName: 'sysRegId'         , dataType: 'text' },
        { fieldName: 'sysRegDtm'        , dataType: 'text' },
        { fieldName: 'aprvDt'           , dataType: 'text' }
    ]
    ,columns : [
        {
            // 승인상태코드명
            name: 'pregStatCdNm',
            fieldName: 'pregStatCdNm',
            width: 100,
            header: { text: col.pregStatCdNm }
        },
        {
            // 반려사유코드명
            name: 'retnCausCdNm',
            fieldName: 'retnCausCdNm',
            width: 200,
            styleName : "column-underline-c left-column",
            header: { text: col.retnCausCdNm }
        },
        {
            // 상품구성코드명
            name: 'goodsCompCdNm',
            fieldName: 'goodsCompCdNm',
            width: 100,
            header: { text: col.goodsCompCdNm }
        },
        {
            // 상품유형코드명
            name: 'goodsTypCdNm',
            fieldName: 'goodsTypCdNm',
            width: 100,
            header: { text: col.goodsTypCdNm }
        },
        {
            // 판매방식코드명
            name: 'saleMethCdNm',
            fieldName: 'saleMethCdNm',
            width: 100,
            header: { text: col.saleMethCdNm }
        },
        {
            // 담당MD
            name: 'mdNm',
            fieldName: 'mdNm',
            width: 100,
            sortable: false,
            header: { text: col.mdNm }
        },
        {
            // 임시상품번호
            name: 'pregGoodsNo',
            fieldName: 'pregGoodsNo',
            width: 120,
            styleName : "column-underline-c",
            header: { text: col.pregGoodsNo }
        },
        {
            //임시상품명
            name: 'goodsNm',
            fieldName: 'goodsNm',
            width: 300,
            styleName : "column-underline-l",
            header: { text: col.goodsNm }
        },
        {
            // 모델명
            name: 'modlNm',
            fieldName: 'modlNm',
            width: 300,
            styleName : "left-column",
            header: { text: col.modlNm }
        },
        {
            // 과/면세구분코드명
            name: 'taxGbCdNm',
            fieldName: 'taxGbCdNm',
            width: 100,
            header: { text: col.taxGbCdNm }
        },
        {
            // 매입형태코드명
            name: 'buyTypCdNm',
            fieldName: 'buyTypCdNm',
            width: 100,
            header: { text: col.buyTypCdNm }
        },
        {
            // 정상가
            name: 'norPrc',
            fieldName: 'norPrc',
            width: 100,
            styleName: 'right-column',
            numberFormat: '#,##0',
            header: { text: col.norPrc }
        },
        {
            // 판매가
            name: 'salePrc',
            fieldName: 'salePrc',
            width: 100,
            styleName: 'right-column',
            numberFormat: '#,##0',
            header: { text: col.salePrc }
        },
        {
            // 마진율
            name: 'mrgnRate',
            fieldName: 'mrgnRate',
            width: 100,
            styleName: 'right-column',
            numberFormat: '0.00',
            suffix: '%',
            header: { text: col.mrgnRate }
        },
        {
            // 협력사명
            name: 'entrNm',
            fieldName: 'entrNm',
            width: 250,
            styleName : "left-column",
            header: { text: col.entrNm }
        },
        {
            // 브랜드명
            name: 'brandNm',
            fieldName: 'brandNm',
            width: 150,
            styleName : "left-column",
            header: { text: col.brandNm }
        },
        {
            // 배송처리유형코드명
            name: 'deliProcTypCdNm',
            fieldName: 'deliProcTypCdNm',
            width: 100,
            header: { text: col.deliProcTypCdNm }
        },
        {
            // 상품등록자
            name: 'sysRegId',
            fieldName: 'sysRegId',
            width: 100,
            header: { text: col.sysRegId }
        },
        {
            // 상품등록일시
            name: 'sysRegDtm',
            fieldName: 'sysRegDtm',
            width: 130,
            header: { text: col.sysRegDtm }
        },
        {
            // 승인일자
            name: 'aprvDt',
            fieldName: 'aprvDt',
            width: 130,
            header: { text: col.aprvDt }
        }
    ]
    ,props : {
        form : 'goodsApprovalListGridForm'   // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + 'goods/GoodsApprovalMgmt.getGoodsApprovalList.do'
        ,autoFitHeight : true           // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,popup : false                  // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true                // 그리드 설정 - 체크박스 필드 노출 여부
        ,crud : false                   // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false          // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : true                  // 페이지네이션 사용 여부
    }
}