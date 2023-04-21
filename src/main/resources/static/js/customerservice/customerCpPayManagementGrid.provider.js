var col = x2coMessage.getMessage({
    custCpnsAplyNo : "customerCompensPayMgmt.grid.custCpnsAplyNo",
    accpDtm : "customerCompensPayMgmt.grid.accpDtm",
    payDtm : "customerCompensPayMgmt.grid.payDtm",
    cpnsMeanCd : "customerCompensPayMgmt.grid.cpnsMeanCd",
    cpnsTypNo : "customerCompensPayMgmt.grid.cpnsTypNo",
    cpnsAmt : "customerCompensPayMgmt.grid.cpnsAmt",
    mbrId : "customerCompensPayMgmt.grid.mbrId",
    mbrNm : "customerCompensPayMgmt.grid.mbrNm",
    ordNo : "customerCompensPayMgmt.grid.ordNo",
    goodsNo : "customerCompensPayMgmt.grid.goodsNo"
});

$.namespace("customerCpPayManagementGrid.settings");
customerCpPayManagementGrid.settings = {
    fields: [
        {fieldName: "custCpnsAplyNo"},
        {fieldName: "accpDtm"},
        {fieldName: "payDtm"},
        {fieldName: "cpnsMeanCd"},
        {fieldName: "cpnsTypNm"},
        {fieldName: "cpnsAmt"},
        {fieldName: "loginId"},
        {fieldName: "mbrNm"},
        {fieldName: "ordNo"},
        {fieldName: "goodsNo"},
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
        name : "payDtm",
        fieldName : "payDtm",
        header : {
            text : col.payDtm
        },
        editable: false,
        width: 150
    },{
        name : "cpnsMeanCd",
        fieldName : "cpnsMeanCd",
        header : {
            text : col.cpnsMeanCd
        },
        editable: false
    },{
        name : "cpnsTypNm",
        fieldName : "cpnsTypNm",
        header : {
            text : col.cpnsTypNo
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
        name : "loginId",
        fieldName : "loginId",
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
        editable: false,
        width: 150
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
        editable: false
    }],
    validations: [],
    props: {
        form : 'customerCpPayManagementForm',
        autoFitHeight : true,
        checkbox: true,
        sumRowVisible : false,
        paging: true,
        popup : false,
        action: "/customerservice/customerCompensPayMgmt.getCustomerCompensPayMgmtList.do"
    }
};