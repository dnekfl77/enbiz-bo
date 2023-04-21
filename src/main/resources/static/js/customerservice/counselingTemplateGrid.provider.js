var col = x2coMessage.getMessage({
    cnslGbCd       : 'counselingTemplateMgmt.counselingTemplateGrid.cnslGbCd',
    cnslTypCd      : 'counselingTemplateMgmt.counselingTemplateGrid.cnslTypCd',
    tmplNm         : 'counselingTemplateMgmt.counselingTemplateGrid.tmplNm',
    tmplCont       : 'counselingTemplateMgmt.counselingTemplateGrid.tmplCont',
    sysRegId       : 'adminCommon.label.sys.reg.id',
    sysRegDtm      : 'adminCommon.label.sys.reg.date',
    sysModId       : 'adminCommon.label.sys.mod.id',
    sysModDtm      : 'adminCommon.label.sys.mod.date'
});

$.namespace("counselingTemplateGrid.settings");
counselingTemplateGrid.settings = {
    fields : [ { fieldName : "cnslAempId" }
            , { fieldName : "cnslTmplNo" }
            , { fieldName : "cnslGbCd" }
            , { fieldName : "cnslTypCd" }
            , { fieldName : "tmplNm" }
            , { fieldName : "tmplCont" }
            , { fieldName : "sysRegId" }
            , { fieldName : "sysRegDtm" }
            , { fieldName : "sysModId" }
            , { fieldName : "sysModDtm" }
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
        width : 80,
        styleName : "disable-column"
    }, {
        name : "cnslTypCd",
        fieldName : "cnslTypCd",
        header : {
            text : col.cnslTypCd
        },
        width : 80,
        styleName : "disable-column"
    }, {
        name : "tmplNm",
        fieldName : "tmplNm",
        header : {
            text : col.tmplNm
        },
        width : 200,
        styleName : "disable-column column-underline-l"
    }, {
        name : "tmplCont",
        fieldName : "tmplCont",
        header : {
            text : col.tmplCont
        },
        width : 250,
        styleName : "disable-column left-column",
        renderer:{
          showTooltip:true
        }
    }, {
       name : "sysRegId",
       fieldName : "sysRegId",
       header : {
           text : col.sysRegId
       },
       width : 80,
       styleName : "disable-column"
   }, {
       name : "sysRegDtm",
       fieldName : "sysRegDtm",
       header : {
           text : col.sysRegDtm
       },
       width : 120,
       styleName : "disable-column"
   }, {
       name : "sysModId",
       fieldName : "sysModId",
       header : {
           text : col.sysModId
       },
       width : 80,
       styleName : "disable-column"
   }, {
       name : "sysModDtm",
       fieldName : "sysModDtm",
       header : {
           text : col.sysModDtm
       },
       width : 120,
       styleName : "disable-column"
   }],

    props : {
        paging : true,
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "counselingTemplateForm",
        action : _baseUrl + "customerservice/counselingTemplateMgmt.getCsCounselingTemplateInfoList.do",
        saveAction : _baseUrl + "customerservice/counselingTemplateMgmt.saveCsCounselingTemplateInfoList.do"
    }
};
