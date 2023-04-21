$.namespace("termsConditionsListGrid.settings");
termsConditionsListGrid.settings = {
    fields : [    { fieldName : "cmAgmtSeq" }
                , { fieldName : "siteNm" }
                , { fieldName : "cmAgmtGbNm" }
                , { fieldName : "agmtPolcNm" }
                , { fieldName : "title" }
                , { fieldName : "aplyStrDt" }
                , { fieldName : "aplyEndDt" }
                , { fieldName : "sysModId" }
                , { fieldName : "sysModDtm" }
    ],
    columns : [{
            name : "cmAgmtSeq",
            fieldName : "cmAgmtSeq",
            visible : false
        }, {
            name : "siteNm",
            fieldName : "siteNm",
            header : { text : msg.siteNm },
            width : 120,
            styleName : "disable-column"
        }, {
            name : "cmAgmtGbNm",
            fieldName : "cmAgmtGbNm",
            header : { text : msg.cmAgmtPolcGbCd },
            width : 200,
            styleName : "disable-column"
        }, {
            name : "agmtPolcNm",
            fieldName : "agmtPolcNm",
            header : { text : msg.agmtPolcCd },
            width : 200,
            styleName : "disable-column"
        }, {
            name : "title",
            fieldName : "title",
            header : { text : msg.title },
            width : 280,
            styleName : "column-underline-l disable-column"
        }, {
            name : "aplyStrDt",
            fieldName : "aplyStrDt",
            header : { text : msg.aplyStrDt },
            width : 100,
            styleName : "disable-column"
        }, {
            name : "aplyEndDt",
            fieldName : "aplyEndDt",
            header : { text : msg.aplyEndDt },
            width : 100,
            styleName : "disable-column"
        }, {
            name : "sysModId",
            fieldName : "sysModId",
            header : { text : msg.modId },
            width : 80,
            styleName : "disable-column"
        }, {
            name : "sysModDtm",
            fieldName : "sysModDtm",
            header : { text : msg.modDtm },
            width : 120,
			styleName : "disable-column"
        }
    ],
    props : {
        width : "100%",
        form : "termsConditionsListGridForm",
        autoFitHeight : true,
        paging : true,
        crud : false,
        sumRowVisible : false,
        fitStyle : "none",
        action : _baseUrl + "display/termsConditionsMgmt.getTermsConditionsMgmt.do"
    }
};