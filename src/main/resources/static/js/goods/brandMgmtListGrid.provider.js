const col = x2coMessage.getMessage( {
    brandNo   : 'brandMgmt.grid.field.brandNo', //  브랜드번호
    brandNm   : 'brandMgmt.grid.field.brandNm', //  브랜드명
    useYn     : 'brandMgmt.grid.field.useYn'    //  사용 여부
});

$.namespace("brandMgmtListGrid.settings");
brandMgmtListGrid.settings = {
    fields:[
        {fieldName : "brandNo"},
        {fieldName : "brandNm"},
        {fieldName : "useYn"},
        {fieldName : "dispOptnCd"},
        {fieldName : "korBrandNm"},
        {fieldName : "engBrandNm"},
        {fieldName : "korSchNm"},
        {fieldName : "engSchNm"},
        {fieldName : "scw1Nm"},
        {fieldName : "scw2Nm"},
        {fieldName : "scw3Nm"},
        {fieldName : "brandDescCmt"},
        {fieldName : "sysModId"},
        {fieldName : "sysModDtm"}
    ],
    columns:[{
        name : "brandNo",
        fieldName : "brandNo",
        header : {
            text : col.brandNo
        },
        width : 80
    }, {
        name : "brandNm",
        fieldName : "brandNm",
        header : {
            text : col.brandNm
        },
        styleName : "left-column",
        width : 185
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn
        },
        readOnly : true,
        renderer: {
            type: "check" ,
            trueValues: "Y" ,
            falseValues: "N"
        },
        width : 80,
    },{
        name : "dispOptnCd", fieldName : "dispOptnCd", header : {text : 'hidden'}, visible :false
    },{
        name : "korBrandNm", fieldName : "korBrandNm", header : {text : 'hidden'}, visible :false
    },{
        name : "engBrandNm", fieldName : "engBrandNm", header : {text : 'hidden'}, visible :false
    },{
        name : "korSchNm", fieldName : "korSchNm", header : {text : 'hidden'}, visible :false
    },{
        name : "engSchNm", fieldName : "engSchNm", header : {text : 'hidden'}, visible :false
    },{
        name : "scw1Nm", fieldName : "scw1Nm", header : {text : 'hidden'}, visible :false
    },{
        name : "scw2Nm", fieldName : "scw2Nm", header : {text : 'hidden'}, visible :false
    },{
        name : "scw3Nm", fieldName : "scw3Nm", header : {text : 'hidden'}, visible :false
    },{
        name : "brandDescCmt", fieldName : "brandDescCmt", header : {text : 'hidden'}, visible :false
    },{
        name : "sysModId", fieldName : "sysModId", header : {text : 'hidden'}, visible :false
    },{
        name : "sysModDtm", fieldName : "sysModDtm", header : {text : 'hidden'}, visible :false
    }],
    validations : [

    ],
    props : {
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : false,
        fitStyle : "evenFill",
        crud : false,
        form : "brandMgmtListGridForm",
        action : _baseUrl + "goods/brandMgmt.getBrandList.do"
    }
};
