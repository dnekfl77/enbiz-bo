var col = x2coMessage.getMessage({
     pregStatCdNm      : 'goodsTemporarySaveMgmt.grid.field.pregStatCdNm'      //  승인상태
    ,retnCausCdNm      : 'goodsTemporarySaveMgmt.grid.field.retnCausCdNm'      //  반려사유코드명
    ,goodsCompCdNm     : 'goodsTemporarySaveMgmt.grid.field.goodsCompCdNm'     //  상품구성
    ,goodsTypCdNm      : 'goodsTemporarySaveMgmt.grid.field.goodsTypCdNm'      //  상품유형
    ,saleMethCdNm      : 'goodsTemporarySaveMgmt.grid.field.saleMethCdNm'      //  판매방식
    ,mdNm              : 'goodsTemporarySaveMgmt.grid.field.mdNm'              //  담당MD
    ,pregGoodsNo       : 'goodsTemporarySaveMgmt.grid.field.pregGoodsNo'       //  임시상품번호
    ,goodsNm           : 'goodsTemporarySaveMgmt.grid.field.goodsNm'           //  상품명
    ,modlNm            : 'goodsTemporarySaveMgmt.grid.field.modlNm'            //  모델명
    ,entrNm            : 'goodsTemporarySaveMgmt.grid.field.entrNm'            //  협력사
    ,brandNm           : 'goodsTemporarySaveMgmt.grid.field.brandNm'           //  브랜드
    ,stdCtgHierarchy   : 'goodsTemporarySaveMgmt.grid.field.stdCtgHierarchy'   //  표준분류
    ,buyTypCdNm        : 'goodsTemporarySaveMgmt.grid.field.buyTypCdNm'        //  매입형태
    ,sysRegId          : 'goodsTemporarySaveMgmt.grid.field.sysRegId'          //  등록자
    ,goodsRegDtm       : 'goodsTemporarySaveMgmt.grid.field.goodsRegDtm'       //  임시저장일자
});

$.namespace('goodsTemporarySaveListGrid.settings')
goodsTemporarySaveListGrid.settings = {
    fields : [
        { fieldName: 'pregStatCd'      ,   dataType: 'text' },
        { fieldName: 'pregStatCdNm'    ,   dataType: 'text' },
        { fieldName: 'retnDt'          ,   dataType: 'text' },
        { fieldName: 'retnCaus'        ,   dataType: 'text' },
        { fieldName: 'retnCausCdNm'    ,   dataType: 'text' },
        { fieldName: 'goodsCompCd'     ,   dataType: 'text' },
        { fieldName: 'goodsCompCdNm'   ,   dataType: 'text' },
        { fieldName: 'goodsTypCdNm'    ,   dataType: 'text' },
        { fieldName: 'saleMethCdNm'    ,   dataType: 'text' },
        { fieldName: 'mdNm'            ,   dataType: 'text' },
        { fieldName: 'pregGoodsNo'     ,   dataType: 'text' },
        { fieldName: 'goodsNm'         ,   dataType: 'text' },
        { fieldName: 'modlNm'          ,   dataType: 'text' },
        { fieldName: 'entrNm'          ,   dataType: 'text' },
        { fieldName: 'brandNm'         ,   dataType: 'text' },
        { fieldName: 'stdCtgHierarchy' ,   dataType: 'text' },
        { fieldName: 'buyTypCdNm'      ,   dataType: 'text' },
        { fieldName: 'sysRegId'        ,   dataType: 'text' },
        { fieldName: 'goodsRegDtm'     ,   dataType: 'text' }
    ]
    ,columns : [
        {
            //승인상태
            name: 'pregStatCdNm',
            fieldName: 'pregStatCdNm',
            width: 100,
            header: { text: col.pregStatCdNm }
        },
        {
            //반려사유코드명
            name: 'retnCausCdNm',
            fieldName: 'retnCausCdNm',
            width: 150,
            styleName : "column-underline-c left-column",
            header: { text: col.retnCausCdNm }
        },
        {
            //상품구성
            name: 'goodsCompCdNm',
            fieldName: 'goodsCompCdNm',
            width: 100,
            header: { text: col.goodsCompCdNm }
        },
        {
            //상품유형
            name: 'goodsTypCdNm',
            fieldName: 'goodsTypCdNm',
            width: 100,
            header: { text: col.goodsTypCdNm }
        },
        {
            //판매방식
            name: 'saleMethCdNm',
            fieldName: 'saleMethCdNm',
            width: 100,
            header: { text: col.saleMethCdNm }
        },
        {
            //담당MD
            name: 'mdNm',
            fieldName: 'mdNm',
            width: 100,
            header: { text: col.mdNm }
        },
        {
            //임시상품번호
            name: 'pregGoodsNo',
            fieldName: 'pregGoodsNo',
            width: 100,
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
            //모델명
            name: 'modlNm',
            fieldName: 'modlNm',
            width: 300,
            styleName: 'left-column',
            header: { text: col.modlNm }
        },
        {
            //협력사
            name: 'entrNm',
            fieldName: 'entrNm',
            width: 250,
            styleName: 'left-column',
            header: { text: col.entrNm }
        },
        {
            //브랜드
            name: 'brandNm',
            fieldName: 'brandNm',
            width: 150,
            styleName: 'left-column',
            header: { text: col.brandNm }
        },
        {
            //표준분류
            name: 'stdCtgHierarchy',
            fieldName: 'stdCtgHierarchy',
            width: 300,
            styleName: 'left-column',
            header: { text: col.stdCtgHierarchy }
        },
        {
            //매입형태
            name: 'buyTypCdNm',
            fieldName: 'buyTypCdNm',
            width: 100,
            header: { text: col.buyTypCdNm }
        },
        {
            //등록자
            name: 'sysRegId',
            fieldName: 'sysRegId',
            width: 100,
            header: { text: col.sysRegId }
        },
        {
            //임시저장일자
            name: 'goodsRegDtm',
            fieldName: 'goodsRegDtm',
            width: 130,
            header: { text: col.goodsRegDtm }
        }
    ]
    ,props : {
        form : 'goodsTemporarySaveListGridForm'   // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + 'goods/GoodsTemporarySaveMgmt.getGoodsTemporarySaveList.do'
        ,autoFitHeight : true        // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,popup : false               // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true             // 그리드 설정 - 체크박스 필드 노출 여부
        ,crud : false                // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false       // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : true               // 페이지네이션 사용 여부
    }
}