var col = x2coMessage.getMessage({
    rt_tgt_seq  : "userFavoriteMenuMgmt.label.bmmgmt.base.seq",
    rt_tgt_nm 	: "userFavoriteMenuMgmt.label.bmmgmt.base.nm",
    sort_seq 	: "userFavoriteMenuMgmt.label.bmmgmt.sort.seq",
    use_yn 	    : "adminCommon.use.yn",
    sysModDtm 	: "adminCommon.label.sys.mod.date"
});

$.namespace("favoritesGrid.settings");
favoritesGrid.settings = {
	fields: [{ fieldName: "rtTgtSeq" }
	        , { fieldName: "rtTgtNm" }
	        , { fieldName: "sortSeq", dataType: "number" }
	        , { fieldName: "useYn" }
	        , { fieldName: "sysModDtm" }]
	, columns : [{
        name : "rtTgtSeq",
        fieldName : "rtTgtSeq",
        header : {
            text : col.rt_tgt_seq
        },
        width : 100,
        editable : false,
        styleName : "disable-column"
    }, {
        name : "rtTgtNm",
        fieldName : "rtTgtNm",
        styleName: "left-column",
        header : {
            text : col.rt_tgt_nm
        },
        width : 300,
        editable : false,
        styleName : "disable-column"
    }, {
        name : "sortSeq",
        fieldName : "sortSeq",
        header : {
            text : col.sort_seq + " *"
        },
         editor: {
        	maxLength: 5
        },
		numberFormat: "#,##0",
        width : 100,
        editable : true,
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.use_yn
        },
        renderer: {
             type: "check",
             trueValues: "Y",
             falseValues: "N"
        },
        width : 80,
        editable : true
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 120,
        editable : false,
        styleName : "disable-column"
    }],
	props: {
        paging: true,
		crud: true,
        checkbox: true,
        sumRowVisible : false,
        autoFitHeight: true,
		form: "favoritesGridForm",
		action: _baseUrl + "system/userFavoriteMenuMgmt.getUserFavoriteMenuList.do",
		saveAction: _baseUrl + "system/userFavoriteMenuMgmt.saveUserFavoriteMenu.do"
	}
};