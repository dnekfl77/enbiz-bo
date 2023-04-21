var col = x2coMessage.getMessage({
    dispCtgNo       : 'displayCategoryMgmt.goodsListGrid.field.dispCtgNo',
    goodsNo         : 'displayCategoryMgmt.goodsListGrid.field.goodsNo',
    dispSeq         : 'displayCategoryMgmt.goodsListGrid.field.dispSeq',
    dispYn          : 'displayCategoryMgmt.goodsListGrid.field.dispYn',
    errorMessage    : 'displayCategoryMgmt.goodsListGrid.field.errorMessage'
});

$.namespace("goodsListGrid.settings");
goodsListGrid.settings = {
    fields : [ {
        fieldName : "dispCtgNo"
    }, {
        fieldName : "goodsNo"
    }, {
        fieldName : "dispSeq"
    }, {
        fieldName : "dispYn"
    }, {
        fieldName : "errorMessage"
    }],
    columns : [ {
        name : "dispCtgNo",
        fieldName : "dispCtgNo",
        header : {
            text : col.dispCtgNo
        },
        width : 110,
        readOnly : true,
        styleName : "disable-column"
    }, {
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
        },
        width : 110,
        readOnly : true,
        styleName : "disable-column"
    }, {
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq
        },
        width : 80,
        readOnly : true,
        styleName : "right-column disable-column"
    }, {
       name : "dispYn",
       fieldName : "dispYn",
       header : {
           text : col.dispYn
       },
       width : 80,
       readOnly : true,
       renderer: {
           type: "check",
           trueValues: "Y",
           falseValues: "N"
       },
       styleName : "disable-column"
   }, {
       name: "errorMessage",
       fieldName: "errorMessage",
       width : 350,
       readOnly : true,
       header: {
            text: col.errorMessage
       },
       styleName : "left-column disable-column"
   } ],
    props : {
        paging : true,
        width : "100%",
        autoFitHeight : true,
        checkbox : true,
        crud : true,
        sumRowVisible : false,
        form : "goodsListGridForm",
        saveAction : _baseUrl + "display/displayCategoryMgmt.saveDisplayCategoryMgmtExcelGoodsList.do"
    }
};
