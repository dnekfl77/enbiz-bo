var col = x2coMessage.getMessage({
    mkdpNo      : 'marketingDisplayManagement.marketingDisplay.mkdpNo',
    mkdpNm      : 'marketingDisplayManagement.marketingDisplay.mkdpNm',
    dispStat    : 'marketingDisplayManagement.marketingDisplay.dispStat',
    dispSeq     : 'marketingDisplayManagement.marketingDisplay.dispSeq',
    dispYn      : 'marketingDisplayManagement.marketingDisplay.dispYn',
    mkdpTypCd   : 'marketingDisplayManagement.marketingDisplay.mkdpTypCd',
    dispStrDtm  : 'marketingDisplayManagement.marketingDisplay.dispStrDtm',
    dispEndDtm  : 'marketingDisplayManagement.marketingDisplay.dispEndDtm',
    mdNm        : 'marketingDisplayManagement.marketingDisplay.MdNm',
    sysRegId    : 'marketingDisplayManagement.marketingDisplay.sysRegId',
    sysRegDtm   : 'marketingDisplayManagement.marketingDisplay.sysRegDtm',
    sysModId    : 'marketingDisplayManagement.marketingDisplay.sysModId',
    sysModDtm   : 'marketingDisplayManagement.marketingDisplay.sysModDtm'
});

$.namespace("marketingDisplayGrid.settings");
marketingDisplayGrid.settings = {
    fields : [ { fieldName : "mkdpNo" }
            , { fieldName : "mkdpNm" }
            , { fieldName : "dispStat" }
            , { fieldName : "dispStatName" }
            , { fieldName : "dispSeq" }
            , { fieldName : "dispYn" }
            , { fieldName : "mkdpTypNm" }
            , { fieldName : "dispStrDtm" }
            , { fieldName : "dispEndDtm" }
            , { fieldName : "mdNm" }
            , { fieldName : "sysRegId" }
            , { fieldName : "sysRegDtm" }
            , { fieldName : "sysModId" }
            , { fieldName : "sysModDtm" }
    ],
    columns : [ {
        name : "mkdpNo",
        fieldName : "mkdpNo",
        header : {
            text : col.mkdpNo
        },
        width : 80,
        styleName : "disable-column column-underline-c",
        editable : false
    }, {
        name : "mkdpNm",
        fieldName : "mkdpNm",
        header : {
            text : col.mkdpNm
        },
        width : 150,
        styleName : "disable-column column-underline-l",
        editable : false
    }, {
        name : "dispStat",
        fieldName : "dispStat",
        visible : false
    }, {
        name : "dispStatName",
        fieldName : "dispStatName",
        header : {
            text : col.dispStat
        },
        width : 80,
        styleName : "disable-column",
        editable : false
    }, {
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq + " *"
        },
        width : 80,
        styleName : "right-column",
        editable : true,
        editor : {
            maxLength : 3
        }
    }, {
        name : "dispYn",
        fieldName : "dispYn",
        header : {
            text : col.dispYn + " *"
        },
        width : 70,
        editable : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
         name : "mkdpTypNm",
         fieldName : "mkdpTypNm",
         header : {
             text : col.mkdpTypCd
         },
         width : 80,
         styleName : "disable-column",
         editable : false
    }, {
        name : "dispStrDtm",
        fieldName : "dispStrDtm",
        header : {
           text : col.dispStrDtm
        },
        width : 120,
        styleName : "disable-column",
        editable : false
   }, {
       name : "dispEndDtm",
       fieldName : "dispEndDtm",
       header : {
            text : col.dispEndDtm
       },
       width : 120,
       styleName : "disable-column",
       editable : false
   }, {
        name : "mdNm",
        fieldName : "mdNm",
        header : {
            text : col.mdNm
        },
        width : 80,
        styleName : "disable-column",
        editable : false
   }, {
       name : "sysRegId",
       fieldName : "sysRegId",
       header : {
           text : col.sysRegId
       },
       width : 80,
       styleName : "disable-column",
       editable : false
   }, {
       name : "sysRegDtm",
       fieldName : "sysRegDtm",
       header : {
           text : col.sysRegDtm
       },
       width : 120,
       styleName : "disable-column",
       editable : false
   }, {
       name : "sysModId",
       fieldName : "sysModId",
       header : {
           text : col.sysModId
       },
       width : 80,
       styleName : "disable-column",
       editable : false
   }, {
       name : "sysModDtm",
       fieldName : "sysModDtm",
       header : {
           text : col.sysModDtm
       },
       width : 120,
       styleName : "disable-column",
       editable : false
   }],

    props : {
        paging : false,
        rows : 0,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        fitStyle : "evenFill",
        checkbox : true,
        crud : true,
        form : "marketingDisplayForm",
        action : _baseUrl + "display/marketingDisplayMgmt.getPrMkdpBaseList.do",
        saveAction : _baseUrl + "/display/marketingDisplayMgmt.savePrMkdpBaseList.do"
    }
};
