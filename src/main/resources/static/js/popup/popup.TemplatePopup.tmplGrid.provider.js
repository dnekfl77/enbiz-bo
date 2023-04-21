var col = x2coMessage.getMessage({
    tmpl_no    	     : 'baseInfoMgmt.label.popup.templateListPopup.grid.field.tmpl_no',
    tmpl_nm    		 : 'baseInfoMgmt.label.popup.templateListPopup.grid.field.tmpl_nm',
    tmpl_file_path   : 'baseInfoMgmt.label.popup.templateListPopup.grid.field.tmpl_file_path',
    tmpl_typ_cd   	 : 'baseInfoMgmt.label.popup.templateListPopup.grid.field.tmpl_typ_cd',
    use_yn           : 'baseInfoMgmt.label.popup.templateListPopup.grid.field.use_yn'
});

$.namespace("tmplGrid.settings");
tmplGrid.settings = {
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
    } ],
    columns : [ {
        name : "tmplNo",
        fieldName : "tmplNo",
        header : {
            text : col.tmpl_no
        },
        width : 102
    }, {
        name : "tmplNm",
        fieldName : "tmplNm",
        header : {
            text : col.tmpl_nm
        },
        width : 300,
        styleName : "left-column"
    }, {
        name : "tmplFilePath",
        fieldName : "tmplFilePath",
        header : {
            text : col.tmpl_file_path
        },
        width : 300,
        styleName : "left-column"
    }, {
         name : "tmplTypCd",
         fieldName : "tmplTypCd",
         header : {
            text : col.tmpl_typ_cd
         },
         width : 102
    }, {
         name : "useYn",
         fieldName : "useYn",
         header : {
            text : col.use_yn
         },
         width : 102
    } ],
    props : {
        paging : false,
        width : "100%",
        autoFitHeight : true,
        popup : true,
        sumRowVisible : false,
        checkbox : true,
        crud : false,
        form : "tmplGridForm",
        action : _baseUrl + "popup/templateMgmtPopup.getTemplateList.do"
    }
};
