var col = x2coMessage.getMessage({
    payWayCd        : 'methodsOfPaymentManagement.methodsOfPaymentManagement.pgByPaymentGrid.label.payWayCd',
    linkYn          : 'methodsOfPaymentManagement.methodsOfPaymentManagement.pgByPaymentGrid.label.linkYn',
    sysModId        : 'methodsOfPaymentManagement.methodsOfPaymentManagement.pgByPaymentGrid.label.sysModId',
    sysModDtm       : 'methodsOfPaymentManagement.methodsOfPaymentManagement.pgByPaymentGrid.label.sysModDtm'
});

$.namespace("pgByPaymentGrid.settings");
pgByPaymentGrid.settings = {
    fields : [ { fieldName : "pgGbCd" }
             , { fieldName : "payWayCd" }
             , { fieldName : "linkYn" }
             , { fieldName : "sysModId" }
             , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "pgGbCd",
        fieldName : "pgGbCd",
        visible : false
    }, {
        name : "payWayCd",
        fieldName : "payWayCd",
        header : {
            text : col.payWayCd + '*'
        },
        width : 100,
        values : payWayCode,
        labels : payWayCdValues,
        editor : {
            type : "list",
            textReadOnly:true
        },
       lookupDisplay : true,
        styleCallback: function(grid, dataCell){
            var ret = {};
            if(dataCell.item.rowState == 'created'){
                ret.editable = true;
            } else if(dataCell.item.rowState == 'updated'){
                ret.editable = false;
                ret.styleName = "disable-column";
            } else if(dataCell.item.rowState == "none"){
                ret.editable = false;
                ret.readOnly = true;
                ret.styleName = "disable-column";
            }
            return ret;
        }
    }, {
         name : "linkYn",
         fieldName : "linkYn",
         header : {
            text : col.linkYn + '*'
         },
         editable : true,
         width : 80,
         renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
         }
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 80,
        editable : false,
        styleName : "disable-column"
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
    props : {
        paging : false,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        fitStyle : "evenFill",
        checkbox : true,
        crud : true,
        //action : _baseUrl + "payment/methodsOfPaymentManagement.getMethodsOfPaymentList.do",
        action : _baseUrl + "payment/paymentMeanMgmt.getPaymentMean.do",
        //saveAction : _baseUrl + "payment/methodsOfPaymentManagement.saveMethodsOfPaymentList.do"
        saveAction : _baseUrl + "payment/paymentMeanMgmt.savePaymentMean.do"
    }
};