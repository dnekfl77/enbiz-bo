var col = x2coMessage.getMessage({
    pgGbCd          : 'franchiseeMgmt.franchiseeGrid.label.pgGbCd',
    mersNo          : 'franchiseeMgmt.franchiseeGrid.label.mersNo',
    acqrCd          : 'franchiseeMgmt.franchiseeGrid.label.acqrCd',
    onoffLineGbCd   : 'franchiseeMgmt.franchiseeGrid.label.onoffLineGbCd',
    siteNm          : 'franchiseeMgmt.franchiseeGrid.label.siteNm',
    nintUseYn       : 'franchiseeMgmt.franchiseeGrid.label.nintUseYn',
    pointUseYn      : 'franchiseeMgmt.franchiseeGrid.label.pointUseYn',
    termlId         : 'franchiseeMgmt.franchiseeGrid.label.termlId',
    useYn           : 'franchiseeMgmt.franchiseeGrid.label.useYn',
    sysModId        : 'franchiseeMgmt.franchiseeGrid.label.sysModId',
    sysModDtm       : 'franchiseeMgmt.franchiseeGrid.label.sysModDtm'
});

$.namespace("franchiseeGrid.settings");
franchiseeGrid.settings = {
    fields : [ { fieldName : "pgGbCd" }
             , { fieldName : "mersNo" }
             , { fieldName : "acqrCd" }
             , { fieldName : "onoffLineGbCd" }
             , { fieldName : "siteNm" }
             , { fieldName : "nintUseYn" }
             , { fieldName : "pointUseYn" }
             , { fieldName : "termlId" }
             , { fieldName : "useYn" }
             , { fieldName : "sysModId" }
             , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "pgGbCd",
        fieldName : "pgGbCd",
        header : {
            text : col.pgGbCd
        },
        width : 80,
        styleName : "disable-column"
    }, {
        name : "mersNo",
        fieldName : "mersNo",
        header : {
            text : col.mersNo
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "acqrCd",
        fieldName : "acqrCd",
        header : {
            text : col.acqrCd
        },
        width : 100,
        styleName : "disable-column"
    }, {
        name : "onoffLineGbCd",
        fieldName : "onoffLineGbCd",
        header : {
            text : col.onoffLineGbCd
        },
        width : 100,
        styleName : "disable-column"
    }, {
        name : "siteNm",
        fieldName : "siteNm",
        header : {
            text : col.siteNm
        },
        width : 150,
        styleName : "disable-column"
    }, {
         name : "nintUseYn",
         fieldName : "nintUseYn",
         header : {
            text : col.nintUseYn
         },
         readOnly : true,
         width : 100,
         renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
         },
         styleName : "disable-column"
    }, {
         name : "pointUseYn",
         fieldName : "pointUseYn",
         header : {
            text : col.pointUseYn
         },
         readOnly : true,
         width : 100,
         renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
         },
         styleName : "disable-column"
    }, {
        name : "termlId",
        fieldName : "termlId",
        header : {
            text : col.termlId
        },
        width : 150,
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
        form : "franchiseeGridForm",
        action : _baseUrl + "payment/FranchiseeMgmt.getFranchisee.do",
    }
};