$.namespace("displayCornerPopupGrid.settings");
displayCornerPopupGrid.settings = {
    fields : [ { fieldName : "conrNo" }
             , { fieldName : "conrNm" }
             , { fieldName : "dispTgt" }
             , { fieldName : "useYn" }
             , { fieldName : "userNm" } ],
    columns : [ {
        name : "conrNo",
        fieldName : "conrNo",
        header : { text : msg.displayCornerNo },
        width : 80
    },{
        name : "conrNm",
        fieldName : "conrNm",
        header : { text : msg.displayCornerNm },
        width : 200
    }, {
         name : "dispTgt",
         fieldName : "dispTgt",
         header : { text : msg.displayTarget },
        width : 250,
        styleName : "left-column"
    }, {
         name : "useYn",
         fieldName : "useYn",
         header : { text : msg.useYn },
         width : 60
    },{
         name : "userNm",
         fieldName : "userNm",
         header : { text : msg.displayManager },
         width : 80
    }],
    props : {
        paging : false,
        width : "100%",
        popup : true,
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : true,
        crud : false,
        form : "cornerPopupForm",
        action : _baseUrl + "display/displayTemplateMgmt.getDisplayTemplateMgmtCornerPopup.do"
    }
};
