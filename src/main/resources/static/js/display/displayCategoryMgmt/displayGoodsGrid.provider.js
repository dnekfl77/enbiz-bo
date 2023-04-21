var col = x2coMessage.getMessage({
    goodsNo       : 'displayCategoryMgmt.displayGoodsGrid.field.goodsNo',
    goodsNm       : 'displayCategoryMgmt.displayGoodsGrid.field.goodsNm',
    dispSeq       : 'displayCategoryMgmt.displayGoodsGrid.field.dispSeq',
    dispYn        : 'displayCategoryMgmt.displayGoodsGrid.field.dispYn',
    norPrc        : 'displayCategoryMgmt.displayGoodsGrid.field.norPrc',
    salePrc       : 'displayCategoryMgmt.displayGoodsGrid.field.salePrc',
    goodsTypCd    : 'displayCategoryMgmt.displayGoodsGrid.field.goodsTypCd',
    saleStatCd    : 'displayCategoryMgmt.displayGoodsGrid.field.saleStatCd',
    entrNm        : 'displayCategoryMgmt.displayGoodsGrid.field.entrNm',
    sysRegDtm     : 'displayCategoryMgmt.displayGoodsGrid.field.sysRegDtm',
    sysModId      : 'displayCategoryMgmt.displayGoodsGrid.field.sysModId',
    sysModDtm     : 'displayCategoryMgmt.displayGoodsGrid.field.sysModDtm'
});
$.namespace("displayGoodsGrid.settings");
displayGoodsGrid.settings = {
    fields : [ {
        fieldName : "dispCtgNo"
    }, {
        fieldName : "goodsNo"
    }, {
        fieldName : "goodsNm"
    }, {
        fieldName : "dispSeq" , dataType : "number"
    }, {
        fieldName : "dispYn"
    }, {
        fieldName : "norPrc"
    }, {
        fieldName : "salePrc"
    }, {
        fieldName : "goodsTypCd"
    }, {
        fieldName : "saleStatCd"
    }, {
        fieldName : "entrNm"
    }, {
        fieldName : "sysRegDtm"
    }, {
        fieldName : "sysModId"
    }, {
        fieldName : "sysModDtm"
    }],
    columns : [ {
        name : "dispCtgNo",
        fieldName : "dispCtgNo",
        visible : false
    }, {
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
        },
        width : 100,
        styleName : "disable-column",
        editable : false
    },{
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        width : 250,
        styleName : "left-column",
        editable : false,
    },{
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq + " *"
        },
        width : 80,
        styleName : "right-column",
        editable : true,
		numberFormat: "#0",
        editor : {
            type: "number",
            integerOnly : true, // 정수값만 허용
            maxLength : 3
        }
    }, {
        name : "dispYn",
        fieldName : "dispYn",
        header : {
            text : col.dispYn + " *"
        },
        width : 80,
        editable : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "norPrc",
        fieldName : "norPrc",
        header : {
            text : col.norPrc
        },
        width : 90,
        styleName : "right-column disable-column",
        editable : false
    }, {
        name : "salePrc",
        fieldName : "salePrc",
        header : {
            text : col.salePrc
        },
        width : 90,
        styleName : "right-column disable-column",
        editable : false
    }, {
        name : "goodsTypCd",
        fieldName : "goodsTypCd",
        header : {
            text : col.goodsTypCd
        },
        width : 80,
        styleName : "disable-column",
        editable : false
    }, {
        name : "saleStatCd",
        fieldName : "saleStatCd",
        header : {
            text : col.saleStatCd
        },
        width : 80,
        styleName : "disable-column",
        editable : false
    }, {
        name : "entrNm",
        fieldName : "entrNm",
        header : {
            text : col.entrNm
        },
        width : 100,
        styleName : "disable-column left-column",
        editable : false
    }, {
         name : "sysRegDtm",
         fieldName : "sysRegDtm",
         header : {
             text : col.sysRegDtm
         },
         width : 100,
         editable : false,
    }, {
         name : "sysModId",
         fieldName : "sysModId",
         header : {
             text : col.sysModId
         },
         width : 80,
         editable : false
    }, {
         name : "sysModDtm",
         fieldName : "sysModDtm",
         header : {
             text : col.sysModDtm
         },
         width : 120,
         editable : false
    }],

    props : {
        paging : true,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "displayGoodsGridForm",
        action : _baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtGoodsList.do",
        saveAction : _baseUrl + "display/displayCategoryMgmt.saveDisplayCategoryMgmtGoodsList.do"
    }
};
