$.namespace("displayCornerTemplateGrid.settings");
displayCornerTemplateGrid.settings = {
    fields : [ {
        fieldName : "tmplNo"
    }, {
        fieldName : "tmplNm"
    }, {
        fieldName : "tmplFilePath"
    }, {
        fieldName : "tmplTypCd"
    }, {
        fieldName : "useYn"
    }],
    columns : [ {
        name : "tmplNo",
        fieldName : "tmplNo",
        header : { text : msg.tmplNo },
        width : 80,
        styleName : "disable-column",
        editable : false
    },{
        name : "tmplNm",
        fieldName : "tmplNm",
        header : { text : msg.tmplNm },
        width : 220,
        styleName : "left-column disable-column",
        editable : false
    },{
        name : "tmplFilePath",
        fieldName : "tmplFilePath",
        header : { text : msg.tmplFilePath },
        width : 300,
        styleName : "left-column disable-column",
        editable : false
    },{
        name : "tmplTypCd",
        fieldName : "tmplTypCd",
        header : { text : msg.tmplTypCd },
        width : 80,
        styleName : "disable-column",
        editable : false
    },{
        name : "useYn",
        fieldName : "useYn",
        header : { text : msg.useYn },
        width : 80,
        styleName : "disable-column",
        editable : false
    }],
    props : {
        paging : false,
        width : "900",
        height : "180",
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "displayCornerForm",
        action : _baseUrl + "display/displayCornerMgmt.getTmplConrMappInfo.do"
    }
};
