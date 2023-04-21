var col = x2coMessage.getMessage({
    ctrlTgtNo   : 'paymentMeanMgmt.controlUpdateGrid.label.ctrlTgtNo'
});

$.namespace("controlUpdateGrid.settings");
controlUpdateGrid.settings = {
    fields : [ { fieldName : "ctrlGbCd" }
             , { fieldName : "ctrlTgtNo" }
             , { fieldName : "ctrlTgtDtlNo" }],
    columns : [ {
        name : "ctrlGbCd",
        fieldName : "ctrlGbCd",
        width : 100,
        lookupDisplay : true,
        values : ctrlGbCdValues,
        labels : ctrlGbCdLabels,
        editor : {
            type : 'list',
            textReadOnly : true,
        },
        styleCallback: function(grid, dataCell){
            var ret = {};
            if(dataCell.item.rowState == 'created'){
                ret.editable = true;
            } else {
                ret.editable = false;
                ret.styleName = "disable-column";
            }
            return ret;
        }
    }, {
        name : "ctrlTgtNo",
        fieldName : "ctrlTgtNo",
        width : 100,
        lookupDisplay : true,
        lookupSourceId : "ctrlTgtNo",
        lookupKeyFields : ["ctrlGbCd", "ctrlTgtNo"],
        editor : {
            type : "list",
            textReadOnly : true
        },
        styleCallback: function(grid, dataCell){
            var ret = {};
            if(dataCell.item.rowState == 'created'){
                ret.editable = true;
            } else {
                ret.editable = false;
                ret.styleName = "disable-column";
            }
            return ret;
        }
    }, {
        name : "ctrlTgtDtlNo",
        fieldName : "ctrlTgtDtlNo",
        width : 100,
        lookupSourceId : "ctrlTgtDtlNo",
        lookupKeyFields : ["ctrlGbCd", "ctrlTgtNo","ctrlTgtDtlNo"],
        editor : {
            type : "list",
            textReadOnly:true
        },
        lookupDisplay : true,
        styleCallback: function(grid, dataCell){
            var ret = {};
            if(dataCell.item.rowState == 'created'){
                ret.editable = true;
            } else {
                ret.editable = false;
                ret.styleName = "disable-column";
            }
            return ret;
        }
    }],
    props : {
        paging : false,
        width : "100%",
        height : "250px",
        autoFitHeight : false,
        sumRowVisible : false,
        fitStyle : "evenFill",
        checkbox : true,
        crud : true,
        form : "controlGridForm",
        action : _baseUrl + "payment/paymentMeanControlMgmt.getPaymentMeanControlDetail.do",
        saveAction : _baseUrl + "payment/paymentMeanControlMgmt.savePaymentMeanControlDetail.dos"
    }
};