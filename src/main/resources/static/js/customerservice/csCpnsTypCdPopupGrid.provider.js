var col = x2coMessage.getMessage( {
    cpnsTypLrgNm :  "rewardTypeMgmt.grid.field.cpnsTypLrgNm", // 대분류
    cpnsTypSmlNm :  "rewardTypeMgmt.grid.field.cpnsTypSmlNm"  // 소분류
});

$.namespace("csCpnsTypCdPopupGrid.settings");
csCpnsTypCdPopupGrid.settings = {
    fields:[{ fieldName : "cpnsTypNo" }
          , { fieldName : "cpnsTypLrgNm" }
          , { fieldName : "cpnsTypSmlNm" }
          , { fieldName : "cpnsSubCd" }
          , { fieldName : "cpnsSubNm" }
          , { fieldName : "cpnsStdCd" }
          , { fieldName : "cpnsStdNm" }
          , { fieldName : "cpnsStdRate" }
          , { fieldName : "maxPayLim" }],
    columns:[{
        name : "cpnsTypNo",
        fieldName : "cpnsTypNo",
        visible: false
    }, {
        name : "cpnsSubCd",
        fieldName : "cpnsSubCd",
        visible: false
    }, {
        name : "cpnsSubNm",
        fieldName : "cpnsSubNm",
        visible: false
    }, {
        name : "cpnsStdCd",
        fieldName : "cpnsStdCd",
        visible: false
    }, {
        name : "cpnsStdNm",
        fieldName : "cpnsStdNm",
        visible: false
    }, {
        name : "cpnsStdRate",
        fieldName : "cpnsStdRate",
        visible: false
    }, {
        name : "maxPayLim",
        fieldName : "maxPayLim",
        visible: false
    }, {
        name : "cpnsTypLrgNm",
        fieldName : "cpnsTypLrgNm",
        header : {
            text : col.cpnsTypLrgNm
        },
        width : 180,
        styleName : "left-column"
    }, {
        name : "cpnsTypSmlNm",
        fieldName : "cpnsTypSmlNm",
        header : {
            text : col.cpnsTypSmlNm
        },
        width : 250,
        styleName : "left-column"
    }],
    props : {
        paging : false,
        autoFitHeight : true,
        popup : true,
        crud : false,
        sumRowVisible : false,
        form : "csCpnsTypCdPopupGridForm",
        action : _baseUrl + "customerservice/rewardTypeMgmt.getCsCompensTypeCodePopup.do"
    }
};
