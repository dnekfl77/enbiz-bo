var col = x2coMessage.getMessage({
    payMeanCtrlNo   : 'methodsOfPaymentManagement.methodsOfPaymentControlManagement.controlGrid.label.payMeanCtrlNo',
    dvcGbCd         : 'methodsOfPaymentManagement.methodsOfPaymentControlManagement.controlGrid.label.dvcGbCd',
    ctrlTgtNo       : 'methodsOfPaymentManagement.methodsOfPaymentControlManagement.controlGrid.label.ctrlTgtNo',
    ctrlTgtDtlNo    : 'methodsOfPaymentManagement.methodsOfPaymentControlManagement.controlGrid.label.ctrlTgtDtlNo',
    useLmtDate      : 'methodsOfPaymentManagement.methodsOfPaymentControlManagement.controlGrid.label.useLmtDate',
    state           : 'methodsOfPaymentManagement.methodsOfPaymentControlManagement.controlGrid.label.state',
    useYn           : 'methodsOfPaymentManagement.methodsOfPaymentControlManagement.controlGrid.label.useYn',
    sysModId        : 'methodsOfPaymentManagement.methodsOfPaymentManagement.pgByPaymentGrid.label.sysModId',
    sysModDtm       : 'methodsOfPaymentManagement.methodsOfPaymentManagement.pgByPaymentGrid.label.sysModDtm'
});

$.namespace("controlGrid.settings");
controlGrid.settings = {
    fields : [ { fieldName : "payMeanCtrlNo" }
             , { fieldName : "dvcGbCd" }
             , { fieldName : "ctrlTgtNo" }
             , { fieldName : "ctrlTgtDtlNo" }
             , { fieldName : "useLmtDate" }
             , { fieldName : "state" }
             , { fieldName : "useYn" }
             , { fieldName : "sysModId" }
             , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "payMeanCtrlNo",
        fieldName : "payMeanCtrlNo",
        header : {
            text : col.payMeanCtrlNo
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "dvcGbCd",
        fieldName : "dvcGbCd",
        header : {
            text : col.dvcGbCd
        },
        width : 80,
        styleName : "disable-column"
    }, {
        name : "ctrlTgtNo",
        fieldName : "ctrlTgtNo",
        header : {
            text : col.ctrlTgtNo
        },
        width : 100,
        styleName : "disable-column"
    }, {
        name : "ctrlTgtDtlNo",
        fieldName : "ctrlTgtDtlNo",
        header : {
            text : col.ctrlTgtDtlNo
        },
        width : 100,
        styleName : "disable-column"
    }, {
        name : "useLmtDate",
        fieldName : "useLmtDate",
        header : {
            text : col.useLmtDate
        },
        width : 250,
        styleName : "disable-column"
    }, {
        name : "state",
        fieldName : "state",
        header : {
            text : col.state
        },
        width : 80,
        styleName : "disable-column"
    }, {
         name : "useYn",
         fieldName : "useYn",
         header : {
            text : col.useYn
         },
         readOnly : true,
         width : 80,
         renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
         },
         styleName : "disable-column"
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 80,
        styleName : "disable-column"
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 120,
        styleName : "disable-column"
    }],
    props : {
        paging : true,
        defrow : 10,
        rows : 0,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        fitStyle : "evenFill",
        checkbox : false,
        crud : false,
        form : "controlGridForm",
        //action : _baseUrl + "payment/methodsOfPaymentManagement.getMethodsOfPaymentControlList.do",
        action : _baseUrl + "payment/paymentMeanControlMgmt.getPaymentMeanControl.do",
    }
};