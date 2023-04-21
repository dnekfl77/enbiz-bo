$.namespace("displayTemplateCornerGrid.settings");
displayTemplateCornerGrid.settings = {
    fields : [ {
        fieldName : "tmplNo"
    }, {
        fieldName : "conrNo"
    }, {
        fieldName : "conrNm"
    }, {
        fieldName : "dispYn"
    }, {
        fieldName : "dispSeq"
    }, {
        fieldName : "dispStrDtm"
    }, {
        fieldName : "dispEndDtm"
    }, {
        fieldName : "dispTgt"
    }, {
        fieldName : "sysModId"
    }, {
        fieldName : "sysModDtm"
    } ],
    columns : [ {
        name : "tmplNo",
        fieldName : "tmplNo",
        visible : false
    },{
        name : "conrNo",
        fieldName : "conrNo",
        header : { text : msg.conrNo },
        width : 80,
        editable : false,
        styleName : "disable-column"
    },{
        name : "conrNm",
        fieldName : "conrNm",
        header : { text : msg.conrNm },
        width : 250,
        editable : false,
        styleName : "column-underline-l disable-column"
    },{
        name : "dispYn",
        fieldName : "dispYn",
        header : { text : msg.dispYn + ' *' },
        width : 80,
        editable : true,
        renderer: {
             type: "check",
             trueValues: "Y",
             falseValues: "N"
        }
    }, {
        name : "dispSeq",
        fieldName : "dispSeq",
        header : { text : msg.dispSeq + ' *' },
        width : 60,
        editable : true,
        editor : {
            type: "number",
            integerOnly : true, // 정수값만 허용
            maxIntegerLength: 3
        },
        numberFormat : '0'
    }, {
         name : "dispStrDtm",
         fieldName : "dispStrDtm",
         header : { text : msg.dispStrDtm + ' *' },
        width : 120,
        editable : true,
        editor : {
           	type : "date",
            datetimeFormat : "yyyy-MM-dd HH:mm:ss"
        }
    }, {
         name : "dispEndDtm",
         fieldName : "dispEndDtm",
         header : { text : msg.dispEndDtm + ' *' },
         width : 120,
         editable : true,
        editor : {
           	type : "date",
            datetimeFormat : "yyyy-MM-dd HH:mm:ss"
        }
    }, {
         name : "dispTgt",
         fieldName : "dispTgt",
         header : { text : msg.dispTgt },
         width : 250,
         editable : false,
         styleName : "disable-column left-column"
    },{
         name : "sysModId",
         fieldName : "sysModId",
         header : { text : msg.sysModId },
         width : 80,
         styleName : "disable-column",
         editable : false
    }, {
         name : "sysModDtm",
         fieldName : "sysModDtm",
         header : { text : msg.sysModDtm },
         width : 120,
         styleName : "disable-column",
         editable : false
    }],

    props : {
        paging : false,
        width : "100%",
        height : "170",
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "displayTemplateCornerGridForm",
        action : _baseUrl + "display/displayTemplateMgmt.getDisplayTemplateMgmtCorner.do",
        saveAction : _baseUrl + "display/displayTemplateMgmt.saveDisplayTemplateMgmtCorner.do"
    }
};
