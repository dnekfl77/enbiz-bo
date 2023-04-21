var col = x2coMessage.getMessage({
    mersNo          : 'noInterestInstallmentGuideMgmt.franchiseeInstallmentGrid.label.mersNo',
    onoffLineGbCd   : 'noInterestInstallmentGuideMgmt.franchiseeInstallmentGrid.label.onoffLineGbCd',
    aplySite        : 'noInterestInstallmentGuideMgmt.franchiseeInstallmentGrid.label.aplySite'
});

$.namespace("franchiseeInstallmentGrid.settings");
franchiseeInstallmentGrid.settings = {
    fields : [ { fieldName : "mersNo" }
             , { fieldName : "onoffLineGbCd" }
             , { fieldName : "aplySite" }],
    columns : [ {
        name : "mersNo",
        fieldName : "mersNo",
        header : {
            text : col.mersNo
        },
        width : 50,
        styleName : "disable-column"
    }, {
        name : "onoffLineGbCd",
        fieldName : "onoffLineGbCd",
        header : {
            text : col.onoffLineGbCd
        },
        width : 80,
        styleName : "disable-column"
    }, {
        name : "aplySite",
        fieldName : "aplySite",
        header : {
            text : col.aplySite
        },
        width : 200,
        styleName : "disable-column left-column"
    }],
    props : {
        paging : false,
        width : "100%",
        height : "200px",
        fitStyle : "evenFill",
        sumRowVisible : false,
        checkbox : true,
        crud : false,
        form : "franchiseeInstallmentForm",
        action : _baseUrl + "payment/NoInterestInstallmentGuideMgmt.getTotalMersList.do"
    }
};