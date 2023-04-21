var col = x2coMessage.getMessage({
    contDesc      : 'displayConnectManagement.connectTabHtmlGrid.contDesc',
    htmlFileCont  : 'displayConnectManagement.connectTabHtmlGrid.htmlFileCont',
    dispSeq       : 'displayConnectManagement.connectTabHtmlGrid.dispSeq',
    dispYn        : 'displayConnectManagement.connectTabHtmlGrid.dispYn',
    dispStrDtm    : 'displayConnectManagement.connectTabHtmlGrid.dispStrDtm',
    dispEndDtm    : 'displayConnectManagement.connectTabHtmlGrid.dispEndDtm'
});

$.namespace("connectTabHtmlGrid.settings");
connectTabHtmlGrid.settings = {
    fields : [ { fieldName : "dispCtgNo" }
            , { fieldName : "conrNo" }
            , { fieldName : "conrTgtNo" }
            , { fieldName : "conrTgtCd" }
            , { fieldName : "conrContNo" }
            , { fieldName : "contDesc" }
            , { fieldName : "htmlFileCont" }
            , { fieldName : "dispSeq" }
            , { fieldName : "dispYn" }
            , { fieldName : "dispStrDtm" }
            , { fieldName : "dispEndDtm" }
    ],
    columns : [ {
        name : "dispCtgNo",
        fieldName : "dispCtgNo",
        visible : false
    }, {
        name : "conrNo",
        fieldName : "conrNo",
        visible : false
    }, {
        name : "conrTgtNo",
        fieldName : "conrTgtNo",
        visible : false
    }, {
        name : "conrTgtCd",
        fieldName : "conrTgtCd",
        visible : false
    }, {
        name : "conrContNo",
        fieldName : "conrContNo",
        visible : false
    }, {
        name : "contDesc",
        fieldName : "contDesc",
        header : {
            text : col.contDesc
        },
        width : 150,
        styleName : "disable-column column-underline-l"
    }, {
        name : "htmlFileCont",
        fieldName : "htmlFileCont",
        header : {
            text : col.htmlFileCont
        },
        width : 150,
        styleName : "disable-column left-column"
    }, {
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq
        },
        width : 80,
        styleName : "disable-column right-column"
    }, {
        name : "dispYn",
        fieldName : "dispYn",
        header : {
            text : col.dispYn
        },
        width : 70,
        readOnly : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        styleName : "disable-column"
    },  {
        name : "dispStrDtm",
        fieldName : "dispStrDtm",
        header : {
           text : col.dispStrDtm
        },
        width : 120,
        styleName : "disable-column"
   }, {
       name : "dispEndDtm",
       fieldName : "dispEndDtm",
       header : {
            text : col.dispEndDtm
       },
       width : 120,
       styleName : "disable-column"
   }],

    props : {
        paging : false,
        rows : 0,
        width : "100%",
        height : "180",
        autoFitHeight : false,
        sumRowVisible : false,
        fitStyle : "none",
        checkbox : true,
        crud : true,
        form : "displayConnectForm",
        action : _baseUrl + "display/displayConnectMgmt.getPrConrContInfoHtmlList.do",
        saveAction : _baseUrl + "/display/displayConnectMgmt.savePrConrContInfoList.do"
    }
};
