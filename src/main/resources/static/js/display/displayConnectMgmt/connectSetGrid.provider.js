var col = x2coMessage.getMessage({
    setNm         : 'displayConnectMgmt.connerSetGrid.field.conrNm',
    dispSeq        : 'displayConnectMgmt.connerSetGrid.field.dispSeq',
    dispYn         : 'displayConnectMgmt.connerSetGrid.field.dispYn',
    setDesc       : 'displayConnectMgmt.connerSetGrid.field.conrDesc',
    sysModId       : 'displayConnectMgmt.connerSetGrid.field.sysModId',
    sysModDtm      : 'displayConnectMgmt.connerSetGrid.field.sysModDtm'
});

$.namespace("connectSetGrid.settings");
connectSetGrid.settings = {
    fields : [ {
        fieldName : "dispCtgNo"
    }, {
        fieldName : "conrNo"
    }, {
        fieldName : "conrTgtNo"
    }, {
        fieldName : "dpthNo"
    }, {
        fieldName : "grpTgtNo"
    }, {
        fieldName : "setNm"
    }, {
        fieldName : "dispSeq"
    }, {
        fieldName : "dispYn"
    }, {
        fieldName : "setDesc"
    }, {
        fieldName : "sysModId"
    }, {
        fieldName : "sysModDtm"
    }],
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
        name : "dpthNo",
        fieldName : "dpthNo",
        visible : false
    },  {
        name : "grpTgtNo",
        fieldName : "grpTgtNo",
        visible : false
    }, {
        name : "setNm",
        fieldName : "setNm",
        header : {
            text : col.setNm + " *"
        },
        width : 120,
        styleName : "left-column",
        editable : true,
        editor : {
            maxLength : 300
        }
    }, {
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq + " *"
        },
        width : 50,
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
        width : 50,
        editable : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "setDesc",
        fieldName : "setDesc",
        header : {
            text : col.setDesc
        },
        width : 170,
        styleName : "left-column",
        editable : true,
        editor : {
            maxLength : 4000
        }
    }, {
         name : "sysModId",
         fieldName : "sysModId",
         header : {
            text : col.sysModId
         },
         width : 60,
         styleName : "disable-column",
         editable : false
    }, {
         name : "sysModDtm",
         fieldName : "sysModDtm",
         header : {
            text : col.sysModDtm
         },
         width : 110,
         styleName : "disable-column",
         editable : false
    }],

    props : {
        paging : false,
        rows : 0,
        width : "100%",
        height : "170",
        autoFitHeight : false,
        sumRowVisible : false,
        fitStyle : "evenFill",
        checkbox : false,
        crud : true,
        form : "displayConnectForm",
        action : _baseUrl + "display/displayConnectMgmt.getSetConnerList.do",
        saveAction : _baseUrl + "/display/displayConnectMgmt.saveSetConnerList.do"
    }
};
