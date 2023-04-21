var col = x2coMessage.getMessage({
    pgGbCd          : 'paymentCommissionMgmt.clearingCommissionGrid.label.pgGbCd',
    cmsnTgtLgrpCd   : 'paymentCommissionMgmt.clearingCommissionGrid.label.cmsnTgtLgrpCd',
    cmsnTgtSgrpCd   : 'paymentCommissionMgmt.clearingCommissionGrid.label.cmsnTgtSgrpCd',
    cmsnGbCd        : 'paymentCommissionMgmt.clearingCommissionGrid.label.cmsnGbCd',
    cmsnTypCd       : 'paymentCommissionMgmt.clearingCommissionGrid.label.cmsnTypCd',
    mersNo          : 'paymentCommissionMgmt.clearingCommissionGrid.label.mersNo',
    instMonCnt      : 'paymentCommissionMgmt.clearingCommissionGrid.label.instMonCnt',
    cmsnRate        : 'paymentCommissionMgmt.clearingCommissionGrid.label.cmsnRate',
    cmsnAmt         : 'paymentCommissionMgmt.clearingCommissionGrid.label.cmsnAmt',
    cmsn            : 'paymentCommissionMgmt.clearingCommissionGrid.label.cmsn',
    adjGbCd         : 'paymentCommissionMgmt.clearingCommissionGrid.label.adjGbCd',
    vatInclYn       : 'paymentCommissionMgmt.clearingCommissionGrid.label.vatInclYn',
    rmkCont         : 'paymentCommissionMgmt.clearingCommissionGrid.label.rmkCont',
    aplyStrDt       : 'paymentCommissionMgmt.clearingCommissionGrid.label.aplyStrDt',
    aplyEndDt       : 'paymentCommissionMgmt.clearingCommissionGrid.label.aplyEndDt',
    sysModId        : 'paymentCommissionMgmt.clearingCommissionGrid.label.sysModId',
    sysModDtm       : 'paymentCommissionMgmt.clearingCommissionGrid.label.sysModDtm'
});

$.namespace("clearingCommissionGrid.settings");
clearingCommissionGrid.settings = {
    fields : [ { fieldName : "pgGbCd" }
             , { fieldName : "pgGb" }
             , { fieldName : "cmsnTgtLgrpCd" }
             , { fieldName : "cmsnTgtLgrp" }
             , { fieldName : "cmsnTgtSgrpCd" }
             , { fieldName : "cmsnTgtSgrp" }
             , { fieldName : "cmsnGbCd" }
             , { fieldName : "cmsnGb" }
             , { fieldName : "cmsnTypCd" }
             , { fieldName : "cmsnTyp" }
             , { fieldName : "mersNo" }
             , { fieldName : "instMonCnt" }
             , { fieldName : "cmsnRate" , dataType : "number" }
             , { fieldName : "cmsnAmt" , dataType : "number" }
             , { fieldName : "adjGbCd" }
             , { fieldName : "vatInclYn" }
             , { fieldName : "rmkCont" }
             , { fieldName : "aplyStrDt" }
             , { fieldName : "aplyEndDt" }
             , { fieldName : "aplyStrDtm" }
             , { fieldName : "aplyEndDtm" }
             , { fieldName : "sysModId" }
             , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "pgGbCd",
        fieldName : "pgGbCd",
        header : {
            text : col.pgGbCd
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "pgGb",
        fieldName : "pgGb",
        visible : false
    }, {
        name : "cmsnTgtLgrpCd",
        fieldName : "cmsnTgtLgrpCd",
        header : {
            text : col.cmsnTgtLgrpCd
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "cmsnTgtLgrp",
        fieldName : "cmsnTgtLgrp",
        visible : false
    }, {
        name : "cmsnTgtSgrpCd",
        fieldName : "cmsnTgtSgrpCd",
        header : {
            text : col.cmsnTgtSgrpCd
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "cmsnTgtSgrp",
        fieldName : "cmsnTgtSgrp",
        visible : false
    }, {
        name : "cmsnGbCd",
        fieldName : "cmsnGbCd",
        header : {
            text : col.cmsnGbCd
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "cmsnGb",
        fieldName : "cmsnGb",
        visible : false
    }, {
        name : "cmsnTypCd",
        fieldName : "cmsnTypCd",
        header : {
            text : col.cmsnTypCd
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "cmsnTyp",
        fieldName : "cmsnTyp",
        visible : false
    }, {
        name : "mersNo",
        fieldName : "mersNo",
        header : {
            text : col.mersNo
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "instMonCnt",
        fieldName : "instMonCnt",
        header : {
            text : col.instMonCnt
        },
        width : 80,
        styleName : "disable-column"
    }, {
        name : "cmsnRate",
        fieldName : "cmsnRate",
        header : {
            text : col.cmsnRate
        },
        width : 80,
        numberFormat:"#,##0.##",
        styleName : "disable-column right-column"
    }, {
        name : "cmsnAmt",
        fieldName : "cmsnAmt",
        header : {
            text : col.cmsnAmt
        },
        width : 80,
        numberFormat:"#,##0",
        styleName : "disable-column right-column"
    }, {
        name : "adjGbCd",
        fieldName : "adjGbCd",
        header : {
            text : col.adjGbCd
        },
        width : 80,
        styleName : "disable-column"
    }, {
        name : "vatInclYn",
        fieldName : "vatInclYn",
        header : {
            text : col.vatInclYn
        },
        width : 80,
        styleName : "disable-column"
    }, {
        name : "rmkCont",
        fieldName : "rmkCont",
        header : {
            text : col.rmkCont
        },
        width : 100,
        styleName : "disable-column"
    }, {
        name : "aplyStrDt",
        fieldName : "aplyStrDt",
        header : {
            text : col.aplyStrDt
        },
        width : 100,
        styleName : "disable-column"
    }, {
        name : "aplyEndDt",
        fieldName : "aplyEndDt",
        header : {
            text : col.aplyEndDt
        },
        width : 100,
        styleName : "disable-column"
    }, {
        name : "aplyStrDtm",
        fieldName : "aplyStrDtm",
        visible : false
    }, {
        name : "aplyEndDtm",
        fieldName : "aplyEndDtm",
        visible : false
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
        checkbox : false,
        crud : false,
        form : "clearingCommissionGridForm",
        action : _baseUrl + "payment/PaymentCommissionMgmt.getPaymentCommission.do"
    }
};