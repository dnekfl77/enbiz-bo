var col = x2coMessage.getMessage({
    disp_ctg_no    	 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.disp_ctg_no',
    site_nm    		 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.site_nm',
    shop_typ_cd   	 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.shop_typ_cd',
    lrg_ctg_no    	 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.lrg_ctg_no',
    lrg_ctg_nm 		 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.lrg_ctg_nm',
    mid_ctg_no       : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.mid_ctg_no',
    mid_ctg_nm 		 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.mid_ctg_nm',
    sml_ctg_no		 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.sml_ctg_no',
    sml_ctg_nm		 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.sml_ctg_nm',
    sml_ctg_no		 : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.sml_ctg_no',
    thn_ctg_no 	     : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.thn_ctg_no',
    thn_ctg_nm       : 'baseInfoMgmt.label.popup.displayCategoryListPopup.grid.field.thn_ctg_nm',
    disp_yn 	     : 'baseInfoMgmt.label.popup.displayCategoryListPopup.search.label.disp_yn'
});

$.namespace("dcGrid.settings");
dcGrid.settings = {
    fields : [ {
        fieldName : "dispCtgNo"
    }, {
        fieldName : "dispCtgNm"
    }, {
        fieldName : "siteNm"
    }, {
        fieldName : "shopTypCd"
    }, {
        fieldName : "lrgCtgNo"
    }, {
        fieldName : "lrgCtgNm"
    }, {
        fieldName : "midCtgNo"
    }, {
        fieldName : "midCtgNm"
    }, {
        fieldName : "smlCtgNo"
    }, {
        fieldName : "smlCtgNm"
    }, {
        fieldName : "thnCtgNo"
    }, {
        fieldName : "thnCtgNm"
    }, {
        fieldName : "dispYn"
    } ],
    columns : [ {
        name : "dispCtgNo",
        fieldName : "dispCtgNo",
        visible : false
    }, {
       name : "dispCtgNm",
       fieldName : "dispCtgNm",
       visible : false
    }, {
        name : "siteNm",
        fieldName : "siteNm",
        header : {
            text : col.site_nm
        },
        width : 150,
        styleName : "left-column"
    }, {
         name : "shopTypCd",
         fieldName : "shopTypCd",
         header : {
            text : col.shop_typ_cd
         },
         width : 80
    }, {
         name : "lrgCtgNo",
         fieldName : "lrgCtgNo",
         header : {
            text : col.lrg_ctg_no
         },
         width : 100
    }, {
         name : "lrgCtgNm",
         fieldName : "lrgCtgNm",
         header : {
            text : col.lrg_ctg_nm
         },
         width : 150,
        styleName : "left-column"
    }, {
         name : "midCtgNo",
         fieldName : "midCtgNo",
         header : {
            text : col.mid_ctg_no
         },
         width : 100
    }, {
         name : "midCtgNm",
         fieldName : "midCtgNm",
         header : {
            text : col.mid_ctg_nm
         },
         width : 150,
        styleName : "left-column"
    }, {
         name : "smlCtgNo",
         fieldName : "smlCtgNo",
         header : {
            text : col.sml_ctg_no
         },
         width : 100
    }, {
         name : "smlCtgNm",
         fieldName : "smlCtgNm",
         header : {
            text : col.sml_ctg_nm
         },
         width : 150,
        styleName : "left-column"
    }, {
         name : "thnCtgNo",
         fieldName : "thnCtgNo",
         header : {
            text : col.thn_ctg_no
         },
         width : 100
    }, {
         name : "thnCtgNm",
         fieldName : "thnCtgNm",
         header : {
            text : col.thn_ctg_nm
         },
         width : 150,
        styleName : "left-column"
    }, {
         name : "dispYn",
         fieldName : "dispYn",
         header : {
            text : col.disp_yn
         },
         width : 80
    } ],
    props : {
        paging : true,
        defrow : 10,
        rows : col.defaultPage,
        width : "100%",
        // height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        autoFitHeight : true,
        popup : true,
        sumRowVisible : false,
        checkbox : true,
        crud : false,
        form : "dcGridForm",
        action : _baseUrl + "popup/displayCategoryMgmtPopup.getDisplayCategoryList.do"
    }
};
