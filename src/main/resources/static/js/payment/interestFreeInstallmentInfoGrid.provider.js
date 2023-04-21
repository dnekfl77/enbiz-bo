var col = x2coMessage.getMessage({
    nintInstGdNo    : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.nintInstGdNo',
    acqrCd          : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.acqrCd',
    mersNo          : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.mersNo',
    nintInstNm      : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.nintInstNm',
    aplyStrDtm      : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.aplyStrDtm',
    aplyEndDtm      : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.aplyEndDtm',
    tgtAmt          : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.tgtAmt',
    nintMonth       : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.nintMonth',
    state           : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.state',
    sysModId        : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.sysModId',
    sysModDtm       : 'noInterestInstallmentGuideMgmt.interestFreeInstallmentInfoGrid.label.sysModDtm'
});

$.namespace("interestFreeInstallmentInfoGrid.settings");
interestFreeInstallmentInfoGrid.settings = {
    fields : [ { fieldName : "nintInstGdNo" }
             , { fieldName : "acqrCd" }
             , { fieldName : "mersNo" }
             , { fieldName : "nintInstNm" }
             , { fieldName : "aplyStrDtm" }
             , { fieldName : "aplyEndDtm" }
             , { fieldName : "tgtAmt" , dataType : "number" }
             , { fieldName : "nintMonth" }
             , { fieldName : "state" }
             , { fieldName : "sysModId" }
             , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "nintInstGdNo",
        fieldName : "nintInstGdNo",
        header : {
            text : col.nintInstGdNo
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
        lookupKeyFields : ["nintInstGdNo", "mersNo"],
        editor : {
            type : "list",
            textReadOnly : true
        },
        styleName : "disable-column left-column"
   }, {
        name : "nintInstNm",
        fieldName : "nintInstNm",
        header : {
            text : col.nintInstNm
        },
        width : 180,
        editable: false,
        styleName : "disable-column left-column"
    }, {
        name : "aplyStrDtm",
        fieldName : "aplyStrDtm",
        header : {
            text : col.aplyStrDtm
        },
        width : 200,
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
        name : "tgtAmt",
        fieldName : "tgtAmt",
        header : {
            text : col.tgtAmt
        },
        width : 100,
        editable: false,
        numberFormat:"#,##0",
        styleName : "disable-column right-column"
    }, {
        name : "nintMonth",
        fieldName : "nintMonth",
        header : {
            text : col.nintMonth
        },
        width : 140,
        editable: false,
        styleName : "disable-column right-column"
    }, {
        name : "state",
        fieldName : "state",
        header : {
            text : col.state
        },
        width : 100,
        editable: false,
        styleName : "disable-column"
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
        form : "interestFreeInstallmentInfoGridForm",
        action : _baseUrl + "payment/NoInterestInstallmentGuideMgmt.getNoInterestInstallmentGuide.do"
    }
};