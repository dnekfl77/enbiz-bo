var col = x2coMessage.getMessage({
    faqNo    	    : 'faqMgmt.grid.label.faqNo',
    faqLgrpCd       : 'faqMgmt.grid.label.faqLgrpCd',
    faqMgrpCd       : 'faqMgmt.grid.label.faqMgrpCd',
    title           : 'faqMgmt.grid.label.title',
    bbYn 		    : 'faqMgmt.grid.label.bbYn',
    sortSeq         : 'faqMgmt.grid.label.sortSeq',
    qryCnt          : 'faqMgmt.grid.label.qryCnt',
    sysModId 	    : 'faqMgmt.grid.label.sysModId',
    sysModDtm 	    : 'faqMgmt.grid.label.sysModDtm'
});

var alertMsg = x2coMessage.getMessage({
	saveRequiredMsg : 'faqMgmt.message.necessaryCheckMessage' // (은)는 필수값입니다.
});

$.namespace("faqGrid.settings");
faqGrid.settings = {
    fields : [ { fieldName : "faqNo" }
             , { fieldName : "faqLgrpCd" }
             , { fieldName : "faqMgrpCd" }
             , { fieldName : "title" }
             , { fieldName : "bbYn" }
             , { fieldName : "sortSeq", dataType: "number" }
             , { fieldName : "qryCnt", dataType: "number" }
             , { fieldName : "sysModId" }
             , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "faqNo",
        fieldName : "faqNo",
        header : {
            text : col.faqNo
        },
        editable : false,
        width : 80,
        styleName : "disable-column"
    }, {
        name : "faqLgrpCd",
        fieldName : "faqLgrpCd",
        header : {
            text : col.faqLgrpCd
        },
        editable : false,
        width : 100,
        styleName : "disable-column"
    }, {
         name : "faqMgrpCd",
         fieldName : "faqMgrpCd",
         header : {
             text : col.faqMgrpCd
         },
         width : 100,
         editable : false,
         styleName : "disable-column"
    }, {
         name : "title",
         fieldName : "title",
         header : {
            text : col.title
         },
         editable : false,
         width : 250,
         styleName : "disable-column column-underline-l"
    }, {
         name : "bbYn",
         fieldName : "bbYn",
         header : {
            text : col.bbYn
         },
         editable : true,
         width : 80,
         renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
         }
    }, {
         name : "sortSeq",
         fieldName : "sortSeq",
         header : {
            text : col.sortSeq
         },
         editable : true,
         width : 80,
         numberFormat: "#,##0",
         editor :{
			type: 'number',
			integerOnly: true,	// 정수값만 입력 허용
			maxIntegerLength: 5   // 입력 허용 가능 자리수
         },
         styleName : "right-column"
    }, {
         name : "qryCnt",
         fieldName : "qryCnt",
         header : {
            text : col.qryCnt
         },
         editable : false,
         width : 80,
         numberFormat: "#,##0",
         styleName : "disable-column right-column"
    }, {
         name : "sysModId",
         fieldName : "sysModId",
         header : {
            text : col.sysModId
         },
         editable : false,
         width : 80,
         styleName : "disable-column"
    }, {
         name : "sysModDtm",
         fieldName : "sysModDtm",
         header : {
            text : col.sysModDtm
         },
         editable : false,
         width : 120,
         styleName : "disable-column"
    }]
    , validations : [
		{
			fieldName: "sortSeq"
			, criteria: "$.trim(value) === ''"
			, error: {
				level: "error"
				, message: col.sortSeq + alertMsg.saveRequiredMsg
			}
		}
	]
    ,props : {
        paging : true,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "faqGridForm",
        action : _baseUrl + "system/faqMgmt.getFaqList.do",
        saveAction : _baseUrl + "system/faqMgmt.saveFaqList.do"
    }
};