var col = x2coMessage.getMessage( {
    goods_comp_nm       : 'baseInfoMgmt.label.popup.goodsList.grid.field.goodsCompNm'
    ,goods_typ_nm       : 'baseInfoMgmt.label.popup.goodsList.grid.field.goodsTypNm'
    ,goods_no           : 'baseInfoMgmt.label.popup.goodsList.grid.field.goodsNo'
    ,goods_nm           : 'baseInfoMgmt.label.popup.goodsList.grid.field.goodsNm'
    ,modl_nm            : 'baseInfoMgmt.label.popup.goodsList.grid.field.modlNm'
    ,entr_Nm            : 'baseInfoMgmt.label.popup.goodsList.grid.field.entrNm'
    ,sale_stat_nm       : 'baseInfoMgmt.label.popup.goodsList.grid.field.saleStatNm'
    ,sale_meth_nm       : 'baseInfoMgmt.label.popup.goodsList.grid.field.saleMethNm'
    ,buy_typ_nm         : 'baseInfoMgmt.label.popup.goodsList.grid.field.buyTypNm'
    ,deli_proc_typ_nm   : 'baseInfoMgmt.label.popup.goodsList.grid.field.deliProcTypNm'
    ,goods_reg_dtm      : 'baseInfoMgmt.label.popup.goodsList.grid.field.goodsRegDtm'
    ,md_nm              : 'baseInfoMgmt.label.popup.goodsList.grid.field.mdNm'
    ,valid_msg          : 'baseInfoMgmt.label.popup.goodsList.alert.msg.messageMsg'
});

$.namespace("goodsGrid.settings");
goodsGrid.settings = {
    fields : [
        { fieldName: 'goodsCompCdNm',   dataType: "text" },
        { fieldName: 'goodsTypCdNm',    dataType: "text" },
        { fieldName: 'goodsNo',         dataType: "text" },
        { fieldName: 'goodsNm',         dataType: "text" },
        { fieldName: 'modlNm',          dataType: "text" },
        { fieldName: 'entrNm',          dataType: "text" },
        { fieldName: 'saleStatCd',      dataType: "text" },
        { fieldName: 'saleStatCdNm',    dataType: "text" },
        { fieldName: 'saleMethCdNm',    dataType: "text" },
        { fieldName: 'buyTypCdNm',      dataType: "text" },
        { fieldName: 'deliProcTypCdNm', dataType: "text" },
        { fieldName: 'goodsRegDtm',     dataType: "text" },
        { fieldName: 'mdNm',            dataType: "text" }
    ]
    ,columns : [{
        // 상품구성코드명
        name: 'goodsCompCdNm',
        fieldName: 'goodsCompCdNm',
        width : 100,
        header: { text: col.goods_comp_nm }
    },
    {
        // 상품유형코드명
        name: 'goodsTypCdNm',
        fieldName: 'goodsTypCdNm',
        width : 100,
        header: { text: col.goods_typ_nm }
    },
    {
        // 상품번호
        name: 'goodsNo',
        fieldName: 'goodsNo',
        width : 100,
        header: { text: col.goods_no }
    },
    {
        // 상품명
        name: 'goodsNm',
        fieldName: 'goodsNm',
        width : 200,
        styleName: 'left-column',
        header: { text: col.goods_nm }
    },
    {
        // 모델명
        name: 'modlNm',
        fieldName: 'modlNm',
        width : 200,
        styleName: 'left-column',
        header: { text: col.modl_nm }
    },
    {
        // 협력사명
        name: 'entrNm',
        fieldName: 'entrNm',
        width : 150,
        styleName: 'left-column',
        header: { text: col.entr_Nm }
    },
    {
        // 판매상태코드명
        name: 'saleStatCdNm',
        fieldName: 'saleStatCdNm',
        width : 100,
        header: { text: col.sale_stat_nm }
    },
    {
        // 판매방식코드명
        name: 'saleMethCdNm',
        fieldName: 'saleMethCdNm',
        width : 100,
        header: { text: col.sale_meth_nm }
    },
    {
        // 매입형태코드명
        name: 'buyTypCdNm',
        fieldName: 'buyTypCdNm',
        width : 100,
        header: { text: col.buy_typ_nm }
    },
    {
        // 배송처리유형코드명
        name: 'deliProcTypCdNm',
        fieldName: 'deliProcTypCdNm',
        width : 100,
        header: { text: col.deli_proc_typ_nm }
    },
    {
        // 상품등록일자
        name: 'goodsRegDtm',
        fieldName: 'goodsRegDtm',
        width : 100,
        header: { text: col.goods_reg_dtm }
    },
    {
        // 담당MD명
        name: 'mdNm',
        fieldName: 'mdNm',
        width : 100,
        header: { text: col.md_nm }
    },
    {
        // 판매상태코드
        name : 'saleStatCd',
        fieldName: 'saleStatCd',
        visible: false
    }]
    ,props : {
        form : "goodsGridForm"      // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "popup/goodsMgmtPopup.getGoodsList.do" // Request URL
        ,autoFitHeight : true       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,popup : true               // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true            // 그리드 설정 - 체크박스 필드 노출 여부
        ,crud : false               // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : true              // 페이지네이션 사용 여부
    }
}