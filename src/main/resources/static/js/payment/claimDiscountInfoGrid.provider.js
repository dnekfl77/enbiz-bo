var col = x2coMessage.getMessage({
    clmDcGdNo       : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.clmDcGdNo',
    acqrCd          : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.acqrCd',
    mersNo          : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.mersNo',
    aplyStrDtm      : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.aplyStrDtm',
    aplyEndDtm      : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.aplyEndDtm',
    payStdAmt       : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.payStdAmt',
    fixamtFxrtGbCd  : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.fixamtFxrtGbCd',
    dcRateAmt       : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.dcRateAmt',
    sysModId        : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.sysModId',
    sysModDtm       : 'claimDiscountGuideMgmt.claimDiscountInfoGrid.label.sysModDtm'
});

$.namespace("claimDiscountInfoGrid.settings");
claimDiscountInfoGrid.settings = {
    fields : [ { fieldName : "clmDcGdNo" }
             , { fieldName : "acqrCd" }
             , { fieldName : "mersNo" }
             , { fieldName : "aplyStrDtm" }
             , { fieldName : "aplyEndDtm" }
             , { fieldName : "payStdAmt" , dataType : "number" }
             , { fieldName : "fixamtFxrtGbCd" }
             , { fieldName : "dcRateAmt" , dataType : "number" }
             , { fieldName : "sysModId" }
             , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "clmDcGdNo",
        fieldName : "clmDcGdNo",
        header : {
            text : col.clmDcGdNo
        },
        width : 80,
        editable: false,
        styleName : "column-underline-c disable-column"
    }, {
        name : "acqrCd",
        fieldName : "acqrCd",
        header : {
            text : col.acqrCd
        },
        width : 100,
        editable: false,
        styleName : "column-underline-c disable-column"
    }, {
        name : "mersNo",
        fieldName : "mersNo",
        header : {
            text : col.mersNo
        },
        width : 200,
        editable: true,
        lookupDisplay : true,
        lookupSourceId : "mersList",
        lookupKeyFields : ["clmDcGdNo", "mersNo"],
        editor : {
            type : "list",
            textReadOnly : true
        },
        styleName : "disable-column left-column"
    }, {
        name : "aplyStrDtm",
        fieldName : "aplyStrDtm",
        header : {
            text : col.aplyStrDtm
        },
        width : 120,
        editable: false,
        styleName : "disable-column"
    }, {
        name : "aplyEndDtm",
        fieldName : "aplyEndDtm",
        header : {
            text : col.aplyEndDtm
        },
        width : 120,
        editable: false,
        styleName : "disable-column"
    }, {
        name : "payStdAmt",
        fieldName : "payStdAmt",
        header : {
            text : col.payStdAmt
        },
        width : 100,
        editable: false,
        numberFormat:"#,##0",
        styleName : "disable-column right-column"
    }, {
        name : "fixamtFxrtGbCd",
        fieldName : "fixamtFxrtGbCd",
        header : {
            text : col.fixamtFxrtGbCd
        },
        width : 100,
        editable: false,
        styleName : "disable-column"
    }, {
        name : "dcRateAmt",
        fieldName : "dcRateAmt",
        header : {
            text : col.dcRateAmt
        },
        width : 100,
        editable: false,
        numberFormat:"#,##0",
        styleName : "disable-column right-column"
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 80,
        editable: false,
        styleName : "disable-column"
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 120,
        editable: false,
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
        form : "claimDiscountInfoGridForm",
        action : _baseUrl + "payment/ClaimDiscountGuideMgmt.getClaimDiscountGuide.do"
    }
};