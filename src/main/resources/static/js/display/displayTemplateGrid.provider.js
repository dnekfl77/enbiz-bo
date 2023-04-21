$.namespace("displayTemplateGrid.settings");
displayTemplateGrid.settings = {
    fields : [ {
        fieldName : "tmplNo"
    }, {
        fieldName : "tmplNm"
    }, {
        fieldName : "tmplTypCd"
    }, {
        fieldName : "tmplFilePath"
    }, {
        fieldName : "useYn"
    }, {
        fieldName : "conrCnt"
    }, {
        fieldName : "conrInsert"
    }, {
        fieldName : "sysModId"
    }, {
        fieldName : "sysModDtm"
    } ],
    columns : [ {
        name : "tmplNo",
        fieldName : "tmplNo",
        header : { text : msg.tmplNo },
        width : 70,
        editable : false,
        styleName : "disable-column",
    },{
        name : "tmplNm",
        fieldName : "tmplNm",
        header : { text : msg.tmplNm + ' *' },
        width : 250,
        editable : true,
        styleName : "left-column",
        editor : { maxLength : 200 }
    },{
        name : "tmplTypCd",
        fieldName : "tmplTypCd",
        header : { text : msg.tmplTypCd + ' *' },
        width : 90,
        editable : true,
        values : tmplTypCode,
        labels : tmplTypCdValues,
        editor : {
            type : "list",
            textReadOnly:true
       },
       lookupDisplay : true
    }, {
        name : "tmplFilePath",
        fieldName : "tmplFilePath",
        header : { text : msg.tmplFilePath + ' *' },
        width : 320,
        editable : true,
        styleName : "left-column",
        editor : { maxLength : 1300 }
    }, {
         name : "useYn",
         fieldName : "useYn",
         header : { text : msg.useYn + ' *' },
        width : 70,
        editable : true,
        renderer: {
             type: "check",
             trueValues: "Y",
             falseValues: "N"
        }
    }, {
         name : "conrCnt",
         fieldName : "conrCnt",
         header : { text : msg.conrCnt },
         width : 80,
        editable : false,
        styleName : "disable-column"
    }, {
         name : "conrInsert",
         fieldName : "conrInsert",
         header : { text : msg.conrInsert },
         width : 80,
         renderer : "renderer_imgBtn",
         styleName : "custom_renderer disable-column",
         editable : false
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
        form : "displayTemplateGridForm",
        action : _baseUrl + "display/displayTemplateMgmt.getDisplayTemplateMgmt.do",
        saveAction : _baseUrl + "display/displayTemplateMgmt.saveDisplayTemplateMgmt.do"
    }
};
