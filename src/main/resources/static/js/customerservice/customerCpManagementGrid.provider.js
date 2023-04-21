var col = x2coMessage.getMessage({
    custCpnsAplyNo: "customerCompensMgmt.grid.custCpnsAplyNo",
    accpDtm       : "customerCompensMgmt.grid.accpDtm",
    cpnsAprvStatCd: "customerCompensMgmt.grid.cpnsAprvStatCd",
    cpnsPayStatCd : "customerCompensMgmt.grid.cpnsPayStatCd",
    cpnsTypNm     : "customerCompensMgmt.grid.cpnsTypNm",
    cpnsMeanCd    : "customerCompensMgmt.grid.cpnsMeanCd",
    rspnGbCd      : "customerCompensMgmt.grid.rspnGbCd",
    cpnsAmt       : "customerCompensMgmt.grid.cpnsAmt",
    maxPayLim     : "customerCompensMgmt.grid.maxPayLim",
    overAmt       : "customerCompensMgmt.grid.overAmt",
    ordNo         : "customerCompensMgmt.grid.ordNo",
    goodsNo       : "customerCompensMgmt.grid.goodsNo",
    goodsNm       : "customerCompensMgmt.grid.goodsNm",
    itmNm         : "customerCompensMgmt.grid.itmNm",
    loginId       : "customerCompensMgmt.grid.loginId",
    mbrNm         : "customerCompensMgmt.grid.mbrNm",
    entrNm        : "customerCompensMgmt.grid.entrNm",
    acptmnId      : "customerCompensMgmt.grid.acptmnId",
    aprvDtm       : "customerCompensMgmt.grid.aprvDtm",
    aprmnId       : "customerCompensMgmt.grid.aprmnId",
    retnDtm       : "customerCompensMgmt.grid.retnDtm",
    retnProcmnId  : "customerCompensMgmt.grid.retnProcmnId",
    payDtm        : "customerCompensMgmt.grid.payDtm"
});

$.namespace("customerCpManagementGrid.settings");
customerCpManagementGrid.settings = {
    fields: [
        {fieldName: "custCpnsAplyNo"},
        {fieldName: "accpDtm"},
        {fieldName: "cpnsAprvStatCd"},
        {fieldName: "cpnsAprvStatNm"},
        {fieldName: "cpnsPayStatCd"},
        {fieldName: "cpnsPayStatNm"},
        {fieldName: "cpnsTypNm"},
        {fieldName: "cpnsMeanCd"},
        {fieldName: "rspnGbCd"},
        {fieldName: "cpnsAmt"},
        {fieldName: "maxPayLim"},
        {fieldName: "overAmt"},
        {fieldName: "ordNo"},
        {fieldName: "goodsNo"},
        {fieldName: "goodsNm"},
        {fieldName: "itmNm"},
        {fieldName: "loginId"},
        {fieldName: "mbrNm"},
        {fieldName: "entrNm"},
        {fieldName: "acptmnId"},
        {fieldName: "aprvDtm"},
        {fieldName: "aprmnId"},
        {fieldName: "retnDtm"},
        {fieldName: "retnProcmnId"},
        {fieldName: "payDtm"},
    ],
    columns : [{
        name : "custCpnsAplyNo",
        fieldName : "custCpnsAplyNo",
        header : {
            text : col.custCpnsAplyNo
        },
        editable: false,
        styleName : "column-underline-c"
    },{
        name : "accpDtm",
        fieldName : "accpDtm",
        header : {
            text : col.accpDtm
        },
        editable: false,
        width: 150
    },{
        name : "cpnsAprvStatCd",
        fieldName : "cpnsAprvStatCd",
        visible : false
    },{
        name : "cpnsAprvStatNm",
        fieldName : "cpnsAprvStatNm",
        header : {
            text : col.cpnsAprvStatCd
        },
        editable: false
    },{
        name : "cpnsPayStatCd",
        fieldName : "cpnsPayStatCd",
        visible : false
    },{
        name : "cpnsPayStatNm",
        fieldName : "cpnsPayStatNm",
        header : {
            text : col.cpnsPayStatCd
        },
        editable: false
    },{
        name : "cpnsTypNm",
        fieldName : "cpnsTypNm",
        header : {
            text : col.cpnsTypNm
        },
        editable: false
    },{
        name : "cpnsMeanCd",
        fieldName : "cpnsMeanCd",
        header : {
            text : col.cpnsMeanCd
        },
        editable: false,
        width: 150
    },{
        name : "rspnGbCd",
        fieldName : "rspnGbCd",
        header : {
            text : col.rspnGbCd
        },
        editable: false
    },{
        name : "cpnsAmt",
        fieldName : "cpnsAmt",
        header : {
            text : col.cpnsAmt
        },
        editable: false
    },{
        name : "maxPayLim",
        fieldName : "maxPayLim",
        header : {
            text : col.maxPayLim
        },
        editable: false
    },{
        name : "overAmt",
        fieldName : "overAmt",
        header : {
            text : col.overAmt
        },
        editable: false
    },{
        name : "ordNo",
        fieldName : "ordNo",
        header : {
            text : col.ordNo
        },
        editable: false
    },{
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
        },
        editable: false,
        width: 150
    },{
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        editable: false,
        width: 200
    },{
        name : "itmNm",
        fieldName : "itmNm",
        header : {
            text : col.itmNm
        },
        editable: false,
        width: 200
    },{
        name : "loginId",
        fieldName : "loginId",
        header : {
            text : col.loginId
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
        name : "entrNm",
        fieldName : "entrNm",
        header : {
            text : col.entrNm
        },
        editable: false
    },{
        name : "acptmnId",
        fieldName : "acptmnId",
        header : {
            text : col.acptmnId
        },
        editable: false
    },{
        name : "aprvDtm",
        fieldName : "aprvDtm",
        header : {
            text : col.aprvDtm
        },
        editable: false,
        width: 200
    },{
        name : "aprmnId",
        fieldName : "aprmnId",
        header : {
            text : col.aprmnId
        },
        editable: false
    },{
        name : "retnDtm",
        fieldName : "retnDtm",
        header : {
            text : col.retnDtm
        },
        editable: false,
        width: 200
    },{
        name : "retnProcmnId",
        fieldName : "retnProcmnId",
        header : {
            text : col.retnProcmnId
        },
        editable: false
    },{
        name : "payDtm",
        fieldName : "payDtm",
        header : {
            text : col.payDtm
        },
        editable: false,
        width: 200
    }],
    validations: [],
    props: {
        form : 'customerCpManagementForm',
        autoFitHeight : true,
        checkbox: true,
        sumRowVisible : false,
        paging: true,
        popup : false,
        action: "/customerservice/customerCompensMgmt.getCustomerCompensMgmtList.do"
    }
};