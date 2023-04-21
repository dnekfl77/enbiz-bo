var col = x2coMessage.getMessage({
    contTitleNm     : 'displayConnectManagement.connectTabTextGrid.contTitleNm',
    movFrmeCd       : 'displayConnectManagement.connectTabTextGrid.movFrmeCd',
    linkUrlAddr     : 'displayConnectManagement.connectTabTextGrid.linkUrlAddr',
    contDesc        : 'displayConnectManagement.connectTabTextGrid.contDesc',
    dispSeq         : 'displayConnectManagement.connectTabTextGrid.dispSeq',
    dispYn          : 'displayConnectManagement.connectTabTextGrid.dispYn',
    dispStrDtm      : 'displayConnectManagement.connectTabTextGrid.dispStrDtm',
    dispEndDtm      : 'displayConnectManagement.connectTabTextGrid.dispEndDtm'
});

$.namespace("connectTabTextGrid.settings");
connectTabTextGrid.settings = {
    fields : [ { fieldName : "dispCtgNo" }
            , { fieldName : "conrNo" }
            , { fieldName : "conrTgtNo" }
            , { fieldName : "conrTgtCd" }
            , { fieldName : "conrContNo" }
            , { fieldName : "contTitleNm" }
            , { fieldName : "movFrmeCd" }
            , { fieldName : "linkUrlAddr" }
            , { fieldName : "contDesc" }
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
        name : "contTitleNm",
        fieldName : "contTitleNm",
        header : {
            text : col.contTitleNm + " *"
        },
        width : 150,
        styleName : "left-column",
        editable : true,
        editor : {
            maxLength : 300
        }
    }, {
        name : "movFrmeCd",
        fieldName : "movFrmeCd",
        header : {
            text : col.movFrmeCd + " *"
        },
        width : 80,
        editable : true,
        values : movFrmeCode,
        labels : movFrmeCdValues,
        editor : {
            type : "list",
            textReadOnly:true
       },
       lookupDisplay : true
    }, {
        name : "linkUrlAddr",
        fieldName : "linkUrlAddr",
        header : {
            text : col.linkUrlAddr + " *"
        },
        width : 150,
        styleName : "left-column",
        editable : true,
        editor : {
            maxLength : 1000
        }
    }, {
        name : "contDesc",
        fieldName : "contDesc",
        header : {
            text : col.contDesc + " *"
        },
        width : 200,
        styleName : "left-column",
        editable : true,
        editor : {
            maxLength : 4000
        }
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
    },  {
        name : "dispStrDtm",
        fieldName : "dispStrDtm",
        header : {
           text : col.dispStrDtm + ' *'
        },
        width : 120,
        editable : true,
        editor : {
            type : "date",
            datetimeFormat : "yyyy-MM-dd HH:mm:ss",
            minDate: new Date("2021-01-01 00:00:00"),
            maxDate: new Date("2999-12-31 23:59:59")
        }
   }, {
       name : "dispEndDtm",
       fieldName : "dispEndDtm",
       header : {
            text : col.dispEndDtm + '*'
       },
       width : 120,
       editable : true,
       editor : {
            type : "date",
            datetimeFormat : "yyyy-MM-dd HH:mm:ss",
            minDate: new Date("2021-01-01 00:00:00"),
            maxDate: new Date("2999-12-31 23:59:59")
       }
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
        action : _baseUrl + "display/displayConnectMgmt.getPrConrContInfoTextList.do",
        saveAction : _baseUrl + "/display/displayConnectMgmt.savePrConrContInfoList.do"
    }
};
