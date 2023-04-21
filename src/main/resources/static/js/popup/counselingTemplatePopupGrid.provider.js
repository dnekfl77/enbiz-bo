var col = x2coMessage.getMessage({
    cnslGbCd       : 'counselingTemplateListPopup.grid.field.cnslGbCd',
    cnslTypCd      : 'counselingTemplateListPopup.grid.field.cnslTypCd',
    tmplNm         : 'counselingTemplateListPopup.grid.field.tmplNm',
    tmplCont       : 'counselingTemplateListPopup.grid.field.tmplCont'
});

$.namespace("counselingTemplatePopupGrid.settings");
counselingTemplatePopupGrid.settings = {
    fields : [ { fieldName : "cnslAempId" }
            , { fieldName : "cnslTmplNo" }
            , { fieldName : "cnslGbCd" }
            , { fieldName : "cnslTypCd" }
            , { fieldName : "tmplNm" }
            , { fieldName : "tmplCont" }
    ],
    columns : [ {
        name : "cnslAempId",
        fieldName : "cnslAempId",
        visible : false
    }, {
        name : "cnslTmplNo",
        fieldName : "cnslTmplNo",
        visible : false
    }, {
        name : "cnslGbCd",
        fieldName : "cnslGbCd",
        header : {
            text : col.cnslGbCd
        },
        width : 80
    }, {
        name : "cnslTypCd",
        fieldName : "cnslTypCd",
        header : {
            text : col.cnslTypCd
        },
        width : 80
    }, {
        name : "tmplNm",
        fieldName : "tmplNm",
        header : {
            text : col.tmplNm
        },
        width : 200,
        styleName : "left-column"
    }, {
        name : "tmplCont",
        fieldName : "tmplCont",
        header : {
            text : col.tmplCont
        },
        width : 250,
        styleName : "left-column",
        renderer:{
          showTooltip:true
        }
    }],
    props : {
        paging : false,
        width : "100%",
        height : "300",
        sumRowVisible : false,
        popup : true,
        checkbox : true,
        fitStyle : 'evenFill',
        crud : false,
        form : "counselingTemplateForm",
        action : _baseUrl + "customerservice/counselingTemplateMgmt.getCsCounselingTemplateInfoList.do"
    }
};
