var col = x2coMessage.getMessage( {
    lrgTypNo :  "counselingTypeMgmt.pop.grid.field.lrgTypNo", // 대분류
    midTypNo :  "counselingTypeMgmt.pop.grid.field.midTypNo", // 중분류
    smlTypNo :  "counselingTypeMgmt.pop.grid.field.smlTypNo"  // 소분류
});

$.namespace("cnslTypeListPopupGrid.settings");
cnslTypeListPopupGrid.settings = {
    fields:[{
        fieldName : "cnslTypNo"
    },{
        fieldName : "cnslTypNm"
    },{
        fieldName : "custCnslGbCd"
    },{
        fieldName : "uprCnslTypNo"
    },{
        fieldName : "cnslLrgTypNo"
    },{
        fieldName : "cnslMidTypNo"
    },{
        fieldName : "cnslSmlTypNo"
    },{
        fieldName : "cnslLrgTypNm"
    },{
        fieldName : "cnslMidTypNm"
    },{
        fieldName : "cnslSmlTypNm"
    },{
        fieldName : "goodsSelMdtyYn"
    },{
        fieldName : "respBaseMemo"
    }],
    columns:[{
        name : "cnslTypNo",
        fieldName : "cnslTypNo",
        visible: false,
        width : 0
    }, {
        name : "cnslTypNm",
        fieldName : "cnslTypNm",
        visible: false,
        width : 0
    }, {
        name : "custCnslGbCd",
        fieldName : "custCnslGbCd",
        visible: false,
        width : 0
    }, {
        name : "uprCnslTypNo",
        fieldName : "uprCnslTypNo",
        visible: false,
        width : 0
    }, {
        name : "cnslLrgTypNo",
        fieldName : "cnslLrgTypNo",
        visible: false,
        width : 0
    }, {
        name : "cnslMidTypNo",
        fieldName : "cnslMidTypNo",
        visible: false,
        width : 0
    }, {
        name : "cnslSmlTypNo",
        fieldName : "cnslSmlTypNo",
        visible: false,
        width : 0
    }, {
        name : "cnslLrgTypNm",
        fieldName : "cnslLrgTypNm",
        header : {
            text : col.lrgTypNo
        },
        width : 140,
    }, {
        name : "cnslMidTypNm",
        fieldName : "cnslMidTypNm",
        header : {
            text : col.midTypNo
        },
        width : 140,
    }, {
        name : "cnslSmlTypNm",
        fieldName : "cnslSmlTypNm",
        header : {
            text : col.smlTypNo
        },
        width : 140
    }, {
        name : "goodsSelMdtyYn",
        fieldName : "goodsSelMdtyYn",
        visible: false
    }, {
        name : "respBaseMemo",
        fieldName : "respBaseMemo",
        visible: false
    }],
    validations : [],
    props : {
        paging : true,
        autoFitHeight : true,
        popup : true,
        crud : false,
        sumRowVisible : false,
        form : "cnslTypeListPopupGridForm",
        action : _baseUrl + "customerservice/counselingTypeMgmt.getCounselingTypeListPopup.do"
    }
};
