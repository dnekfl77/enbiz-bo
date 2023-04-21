var col = x2coMessage.getMessage({
    divobjNm    : 'marketingDisplayManagement.mkdpDivObjGrid.divobjNm',
    dispYn      : 'marketingDisplayManagement.mkdpDivObjGrid.dispYn',
    dispSeq     : 'marketingDisplayManagement.mkdpDivObjGrid.dispSeq',
    tmplNo      : 'marketingDisplayManagement.mkdpDivObjGrid.tmplNo'
});

$.namespace("mkdpDivGrid.settings");
mkdpDivGrid.settings = {
    fields : [ { fieldName : "mkdpNo" }
            , { fieldName : "divobjNo" }
            , { fieldName : "divobjNm" }
            , { fieldName : "dispYn" }
            , { fieldName : "dispSeq" }
            , { fieldName : "tmplNo" }
    ],
    columns : [ {
        name : "mkdpNo",
        fieldName : "mkdpNo",
        visible : false
    }, {
        name : "divobjNo",
        fieldName : "divobjNo",
        visible : false
    }, {
        name : "divobjNm",
        fieldName : "divobjNm",
        header : {
            text : col.divobjNm + " *"
        },
        width : 150,
        styleName : "left-column",
        editable : true
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
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq + " *"
        },
        width : 50,
        styleName : "right-column",
        editable : true,
        editor : {
            type: "number",
            integerOnly : true, // 정수값만 허용
            maxIntegerLength: 5
        },
        numberFormat : '0'
    }, {
        name : "tmplNo",
        fieldName : "tmplNo",
        header : {
            text : col.tmplNo + '*'
        },
        width : 100,
        editable : true,
        values : tmplCode,
        labels : tmplCdValues,
        editor : {
            type : "list",
            textReadOnly:true
        },
       lookupDisplay : true
    }],
    props : {
        paging : false,
        rows : 0,
        width : "100%",
        height : "170",
        sumRowVisible : false,
        fitStyle : "evenFill",
        checkbox : true,
        crud : true,
        form : "marketingDisplayForm",
        action : _baseUrl + "display/marketingDisplayMgmt.getPrMkdpDivObjInfoList.do",
        saveAction : _baseUrl + "/display/marketingDisplayMgmt.savePrMkdpDivObjInfoList.do"
    }
};
