var col = x2coMessage.getMessage({
    site_nm    	            : 'sitePopupMgmt.grid.field.siteNm',
    popup_nm    		    : 'sitePopupMgmt.grid.field.popupNm',
    preview   	            : 'sitePopupMgmt.grid.field.preview',
    popup_disp_dtm          : 'sitePopupMgmt.grid.field.popupTerm',
    prio_rnk 		        : 'sitePopupMgmt.grid.field.prioRnk',
    screen_nm               : 'sitePopupMgmt.grid.field.popupTgtScrn',
    disp_media_cd           : 'sitePopupMgmt.grid.field.displayMedia',
    use_yn 		            : 'sitePopupMgmt.grid.field.useYn'
});

$.namespace("sitePopupGrid.settings");
sitePopupGrid.settings = {
    fields : [ {
        fieldName : "siteNo"
    }, {
        fieldName : "siteNm"
    }, {
        fieldName : "popupNo"
    }, {
        fieldName : "popupNm"
    }, {
        fieldName : "preview"
    }, {
        fieldName : "popupDispDtm"
    }, {
        fieldName : "prioRnk"
    }, {
        fieldName : "screenNm"
    }, {
        fieldName : "dispMediaCd"
    }, {
        fieldName : "useYn"
    } ],
    columns : [ {
        name : "siteNo",
        fieldName : "siteNo",
        visible : false
    },{
        name : "siteNm",
        fieldName : "siteNm",
        header : {
            text : col.site_nm
        },
        width : 150,
        styleName : "left-column"
    },{
        name : "popupNo",
        fieldName : "popupNo",
        visible : false
    }, {
        name : "popupNm",
        fieldName : "popupNm",
        header : {
            text : col.popup_nm
        },
        width : 300,
        styleName : "column-underline-l"
    }, {
         name : "preview",
         fieldName : "preview",
         header : {
            text : col.preview
         },
        width : 80,
        renderer : "renderer_imgBtn",
        styleName : "custom_renderer"
    }, {
         name : "popupDispDtm",
         fieldName : "popupDispDtm",
         header : {
            text : col.popup_disp_dtm
         },
         width : 150
    }, {
         name : "prioRnk",
         fieldName : "prioRnk",
         header : {
            text : col.prio_rnk
         },
         width : 70
    }, {
         name : "screenNm",
         fieldName : "screenNm",
         header : {
            text : col.screen_nm
         },
         width : 250,
        styleName : "left-column"
    }, {
         name : "dispMediaCd",
         fieldName : "dispMediaCd",
         header : {
            text : col.disp_media_cd
         },
         width : 80
    }, {
         name : "useYn",
         fieldName : "useYn",
         header : { text : col.use_yn },
         width : 70,
         renderer: {
             type: "check",
             trueValues: "Y",
             falseValues: "N"
         }
    }],
    props : {
        paging : true,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        fitStyle : "none",
        stateBar : false,
        checkbox : true,
        crud : false,
        form : "sitePopupGridForm",
        action : _baseUrl + "display/sitePopupMgmt.getSitePopupMgmt.do"
    }
};
