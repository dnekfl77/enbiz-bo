var col = x2coMessage.getMessage({
    cd    	    : 'paymentMeanMgmt.pgGrid.label.pgCode',
    cdNm        : 'paymentMeanMgmt.pgGrid.label.pgName',
    useYn       : 'paymentMeanMgmt.pgGrid.label.useYn'
});

$.namespace("pgGrid.settings");
pgGrid.settings = {
    fields : [ { fieldName : "cd" }
             , { fieldName : "cdNm" }
             , { fieldName : "useYn" }],
    columns : [ {
        name : "cd",
        fieldName : "cd",
        header : {
            text : col.cd
        },
        editable : false,
        width : 70,
        styleName : "disable-column"
    }, {
        name : "cdNm",
        fieldName : "cdNm",
        header : {
            text : col.cdNm
        },
        editable : false,
        width : 120,
        styleName : "disable-column column-underline-l"
    }, {
         name : "useYn",
         fieldName : "useYn",
         header : {
            text : col.useYn
         },
         editable : true,
         width : 60,
         renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
         }
    }],
    props : {
        paging : false,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        fitStyle : "evenFill",
        stateBar : false,
        checkbox : true,
        crud : true,
        //action : _baseUrl + "payment/methodsOfPaymentManagement.getPgList.do",
        action : _baseUrl + "payment/paymentMeanMgmt.getPgList.do",
        //saveAction : _baseUrl + "payment/methodsOfPaymentManagement.savePgList.do"
        saveAction : _baseUrl + "payment/paymentMeanMgmt.savePgList.do"
    }
};