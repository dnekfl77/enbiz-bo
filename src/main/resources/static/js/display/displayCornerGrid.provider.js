$.namespace("displayCornerGrid.settings");
displayCornerGrid.settings = {
    fields : [ {
        fieldName : "conrNo"
    }, {
        fieldName : "conrNm"
    }, {
        fieldName : "tmplNm"
    }, {
        fieldName : "conrTgtNm"
    }, {
        fieldName : "setUseYn"
    }, {
        fieldName : "useYn"
    }, {
        fieldName : "userNm"
    }, {
        fieldName : "sysModId"
    }, {
        fieldName : "sysModDtm"
    } ],
    columns : [ {
        name : "conrNo",
        fieldName : "conrNo",
        header : { text : msg.displayCornerNo },
        width : 80,
        styleName : "disable-column",
        editable : false
    },{
        name : "conrNm",
        fieldName : "conrNm",
        header : { text : msg.displayCornerNm },
        width : 180,
        styleName : "column-underline-l disable-column",
        editable : false
    },{
        name : "tmplNm",
        fieldName : "tmplNm",
        header : { text : msg.connectionDisplayTemplate },
        width : 230,
        styleName : "left-column disable-column",
        editable : false
    }, {
         name : "conrTgtNm",
         fieldName : "conrTgtNm",
         header : { text : msg.displayTarget },
        width : 230,
        styleName : "left-column disable-column",
        editable : false
    }, {
         name : "setUseYn",
         fieldName : "setUseYn",
         header : { text : msg.setUseYn },
         width : 80,
         styleName : "disable-column",
         editable : false
    }, {
         name : "useYn",
         fieldName : "useYn",
         header : { text : msg.useYn + " *" },
         width : 70,
         editable : true,
         renderer: {
             type: "check",
             trueValues: "Y",
             falseValues: "N"
         }
    },{
         name : "userNm",
         fieldName : "userNm",
         header : { text : msg.displayManager },
         width : 80,
         styleName : "disable-column",
         editable : false
    }, {
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
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "displayCornerGridForm",
        action : _baseUrl + "display/displayCornerMgmt.getDisplayCornerMgmt.do",
        saveAction : _baseUrl + "display/displayCornerMgmt.saveDisplayCornerMgmt.do"
    }
};
