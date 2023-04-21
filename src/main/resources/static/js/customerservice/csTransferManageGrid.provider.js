var col = x2coMessage.getMessage({
    ccnNo : "csTransferProcessing.grid.ccnNo",          // 상담번호
    csMvotTypNo : "csTransferProcessing.grid.csMvotTypNo",    // 이관번호
    csMvotTypNm : "csTransferProcessing.grid.csMvotTypNm",    // 이관유형
    mvotProcStatCd : "csTransferProcessing.grid.mvotProcStatCd", // 이관상태
    emergMvotYn : "csTransferProcessing.grid.emergMvotYn", // 긴급이관
    ordNo : "csTransferProcessing.grid.ordNo",      // 주문번호
    goodsNo : "csTransferProcessing.grid.goodsNo",    // 상품번호
    goodsNm : "csTransferProcessing.grid.goodsNm",    // 상품명
    mbrId : "csTransferProcessing.grid.mbrId",      // 회원ID
    mbrNm : "csTransferProcessing.grid.mbrNm",      // 회원명
    cnslTypNm: "csTransferProcessing.grid.cnslTypNm",  // 상담유형
    reqmnNm : "csTransferProcessing.grid.reqmnNm",    // 이관요청자
    mvotReqDtm : "csTransferProcessing.grid.mvotReqDtm", // 요청일시
    quotNm : "csTransferProcessing.grid.quotNm",   // 담당자
    quotDtm : "csTransferProcessing.grid.quotDtm",  // 할당일시
    fnshmnNm : "csTransferProcessing.grid.fnshmnNm", // 완료자
    fnshDtm : "csTransferProcessing.grid.fnshDtm"   // 완료일시
});

$.namespace("csTransferManageGrid.settings");
csTransferManageGrid.settings = {
    fields: [
        {fieldName: "ccnNo"},
        {fieldName: "cnslProcSeq"},
        {fieldName: "csMvotTypNo"},
        {fieldName: "csMvotTypNm"},
        {fieldName: "mvotProcStatCd"},
        {fieldName: "emergMvotYn"},
        {fieldName: "ordNo"},
        {fieldName: "goodsNo"},
        {fieldName: "goodsNm"},
        {fieldName: "mbrId"},
        {fieldName: "mbrNm"},
        {fieldName: "cnslTypNm"},
        {fieldName: "reqmnNm"},
        {fieldName: "mvotReqDtm"},
        {fieldName: "quotNm"},
        {fieldName: "quotDtm"},
        {fieldName: "fnshmnNm"},
        {fieldName: "fnshDtm"}
    ],
    columns : [{
        name : "ccnNo",
        fieldName : "ccnNo",
        header : {
            text : col.ccnNo
        },
        editable: false,
        styleName : "column-underline-c"
    },{
        name : "cnslProcSeq",
        fieldName : "cnslProcSeq",
        visible : false
    },{
        name : "csMvotTypNo",
        fieldName : "csMvotTypNo",
        header : {
            text : col.csMvotTypNo
        },
        editable: false
    },{
        name : "csMvotTypNm",
        fieldName : "csMvotTypNm",
        header : {
            text : col.csMvotTypNm
        },
        editable: false
    },{
        name : "mvotProcStatCd",
        fieldName : "mvotProcStatCd",
        header : {
            text : col.mvotProcStatCd
        },
        editable: false
    },{
        name : "emergMvotYn",
        fieldName : "emergMvotYn",
        header : {
            text : col.emergMvotYn
        },
        editable: false
    },{
        name : "ordNo",
        fieldName : "ordNo",
        header : {
            text : col.ordNo
        },
        editable: false,
        styleName : "column-underline-c"
    },{
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
        },
        width: 120,
        editable: false,
        styleName : "column-underline-c"
    },{
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        editable: false
    },{
        name : "mbrId",
        fieldName : "mbrId",
        header : {
            text : col.mbrId
        },
        editable: false
    },{
        name : "mbrNm",
        fieldName : "mbrNm",
        header : {
            text : col.mbrNm
        },
        editable: false
    },{
        name : "cnslTypNm",
        fieldName : "cnslTypNm",
        header : {
            text : col.cnslTypNm
        },
        editable: false,
        width: 120
    },{
        name : "reqmnNm",
        fieldName : "reqmnNm",
        header : {
            text : col.reqmnNm
        },
        editable: false
    },{
        name : "mvotReqDtm",
        fieldName : "mvotReqDtm",
        header : {
            text : col.mvotReqDtm
        },
        editable: false
    },{
        name : "quotNm",
        fieldName : "quotNm",
        header : {
            text : col.quotNm
        },
        editable: false,
        width: 120
    },{
        name : "quotDtm",
        fieldName : "quotDtm",
        header : {
            text : col.quotDtm
        },
        editable: false
    },{
        name : "fnshmnNm",
        fieldName : "fnshmnNm",
        header : {
            text : col.fnshmnNm
        },
        editable: false,
        width: 120
    },{
        name : "fnshDtm",
        fieldName : "fnshDtm",
        header : {
            text : col.fnshDtm
        },
        editable: false,
        width: 150
    }],
    validations: [],
    props: {
        form : 'csTransferManageGridForm',
        autoFitHeight : true,
        sumRowVisible : false,
        paging: true,
        popup : false,
        action: "/customerservice/csTransferProcessing.getCsTransferMgmtList.do"
    }
};