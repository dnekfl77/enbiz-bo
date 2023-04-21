$.namespace("footerMenuListGrid.settings");
footerMenuListGrid.settings = {
    fields : [ {
        fieldName : "siteNo"
    }, {
	    fieldName : "fortNo"
    }, {
	    fieldName : "uprFotrNo"
    }, {
	    fieldName : "sysGbCd"
    }, {
	    fieldName : "fotrContGbCd"
    }, {
        fieldName : "menuNm"
    }, {
        fieldName : "linkUrl"
    }, {
        fieldName : "movFrmeCd"
    }, {
        fieldName : "dispSeq" , dataType : "number"
    }, {
        fieldName : "useYn"
    } ],
    columns : [ {
          name : "siteNo"
        , fieldName : "siteNo"
		, visible : false
    }, {
          name : "fortNo"
        , fieldName : "fortNo"
		, visible : false
    }, {
          name : "uprFotrNo"
        , fieldName : "uprFotrNo"
		, visible : false
    }, {
          name : "sysGbCd"
        , fieldName : "sysGbCd"
		, visible : false
    }, {
          name : "fotrContGbCd"
        , fieldName : "fotrContGbCd"
		, visible : false
    }, {
          name : "menuNm"
        , fieldName : "menuNm"
		, type: "data"
        , header : { text : msg.menuNm + " *" }
        , width : 150
		, editor : { maxLength: 200 }
		, styleName: 'left-column'
    }, {
          name : "linkUrl"
        , fieldName : "linkUrl"
		, type: "data"
        , header : { text : msg.linkUrl + " *" }
        , width : 240
		, editor : { maxLength: 1000 }
		, styleName: 'left-column'
    }, {
          name : "movFrmeCd"
        , fieldName : "movFrmeCd"
        , header : { text : msg.movFrmeCd + " *" }
        , values : movFrmeCode
        , labels : movFrmeValues
        , editor : {
            type : "list",
            textReadOnly:true
        }
        , lookupDisplay : true
        , width : 100
    }, {
          name : "dispSeq"
        , fieldName : "dispSeq"
		, type: "data"
		, numberFormat: "#0000"
		, editor : {
			type: "number"
			, integerOnly : true // 정수값만 허용
			, maxLength : 5
        }
        , header : { text : msg.dispSeq + " *" }
        , width : 80
    }, {
         name : "useYn",
         fieldName : "useYn",
         header : { text : msg.useYn + " *" },
         width : 80,
         editable : true,
         renderer: {
             type: "check",
             trueValues: "Y",
             falseValues: "N"
         }
    }],
    props : {
          width : "100%"
        , autoFitHeight : false
        , sumRowVisible : false
        , fitStyle : "none"
        , checkbox : true
        , crud : true
        , form : "footerListForm"
        , action : _baseUrl + "display/footerMgmt.getFooterMgmtMenu.do"
        , saveAction : _baseUrl + "display/footerMgmt.saveCcFotrInfoMenu.do"
    }
};
