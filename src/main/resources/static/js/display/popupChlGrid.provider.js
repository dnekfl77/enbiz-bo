var col = x2coMessage.getMessage({
    chl_no           : 'sitePopupMgmt.popupChlGrid.field.chlNo',
    chl_nm   	     : 'sitePopupMgmt.popupChlGrid.field.chlNm',
    link_info   	 : 'sitePopupMgmt.popupChlGrid.field.linkInfo'
});

$.namespace("popupChlGrid.settings");
popupChlGrid.settings = {
    fields : [ {
        fieldName : "chlNo"
    }, {
        fieldName : "chlNm"
    }, {
        fieldName : "linkInfo"
    }, {
        fieldName : "popupNo"
    }],
    columns : [ {
        name : "chlNo",
        fieldName : "chlNo",
        header : { text : col.chl_no },
        width : 80,
        styleName : "disable-column",
        editable : false
    },{
        name : "chlNm",
        fieldName : "chlNm",
        header : { text : col.chl_nm },
        width : 220,
        styleName : "left-column disable-column",
        editable : false
    },{
        name : "linkInfo",
        fieldName : "linkInfo",
        header : { text : col.link_info },
        width : 280,
        styleName : "left-column",
        editable : true
    }, {
        name : "popupNo",
        fieldName : "popupNo",
        visible : false
    }],
    props : {
        paging : false,
        width : "814",
        height : "100",
        fitStyle : "none",
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "sitePopupForm",
        action : _baseUrl + "display/sitePopupMgmt.getSitePopupChlAplyInfo.do"
    }
};
