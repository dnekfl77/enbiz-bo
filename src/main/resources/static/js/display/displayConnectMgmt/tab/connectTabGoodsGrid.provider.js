var col = x2coMessage.getMessage({
    conrContNo    : 'displayConnectManagement.connectTabGoodsGrid.goodsNo',
    goodsNm       : 'displayConnectManagement.connectTabGoodsGrid.goodsNm',
    saleStatCd    : 'displayConnectManagement.connectTabGoodsGrid.saleStatCd',
    dispSeq       : 'displayConnectManagement.connectTabGoodsGrid.dispSeq',
    dispYn        : 'displayConnectManagement.connectTabGoodsGrid.dispYn',
    dispStrDtm    : 'displayConnectManagement.connectTabGoodsGrid.dispStrDtm',
    dispEndDtm    : 'displayConnectManagement.connectTabGoodsGrid.dispEndDtm',
    norPrc        : 'displayConnectManagement.connectTabGoodsGrid.norPrc',
    salePrc       : 'displayConnectManagement.connectTabGoodsGrid.salePrc'
});

$.namespace("connectTabGoodsGrid.settings");
connectTabGoodsGrid.settings = {
    fields : [ {
        fieldName : "dispCtgNo"
    }, {
        fieldName : "conrNo"
    }, {
        fieldName : "conrTgtNo"
    }, {
        fieldName : "conrTgtCd"
    }, {
        fieldName : "conrContNo"
    }, {
        fieldName : "goodsNm"
    }, {
        fieldName : "saleStatCd"
    }, {
        fieldName : "dispSeq"
    }, {
        fieldName : "dispYn"
    }, {
        fieldName : "dispStrDtm"
    }, {
        fieldName : "dispEndDtm"
    }, {
        fieldName : "norPrc"
    },  {
        fieldName : "salePrc"
    }],
    columns : [ {
        name : "dispCtgNo",
        fieldName : "dispCtgNo",
        visible : false
    }, {
        name : "conrNo",
        fieldName : "conrNo",
        visible : false
    }, {
        name : "conrTgtNo",
        fieldName : "conrTgtNo",
        visible : false
    }, {
        name : "conrTgtCd",
        fieldName : "conrTgtCd",
        visible : false
    }, {
        name : "conrContNo",
        fieldName : "conrContNo",
        header : {
            text : col.conrContNo
        },
        width : 80,
        styleName : "disable-column",
        editable : false
    }, {
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        width : 120,
        styleName : "disable-column right-column",
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
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq + " *"
        },
        width : 80,
        styleName : "right-column",
        editable : true,
        editor : {
            maxLength : 3
        }
    }, {
        name : "dispYn",
        fieldName : "dispYn",
        header : {
            text : col.dispYn + " *"
        },
        width : 70,
        editable : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    },  {
        name : "dispStrDtm",
        fieldName : "dispStrDtm",
        header : {
           text : col.dispStrDtm + ' *'
        },
        width : 120,
        editable : true,
        editor : {
            type : "date",
            datetimeFormat : "yyyy-MM-dd HH:mm:ss",
            minDate: new Date("2021-01-01 00:00:00"),
            maxDate: new Date("2999-12-31 23:59:59")
        }
   }, {
       name : "dispEndDtm",
       fieldName : "dispEndDtm",
       header : {
            text : col.dispEndDtm + '*'
       },
       width : 120,
       editable : true,
       editor : {
            type : "date",
            datetimeFormat : "yyyy-MM-dd HH:mm:ss",
            minDate: new Date("2021-01-01 00:00:00"),
            maxDate: new Date("2999-12-31 23:59:59")
       }
   },{
        name : "norPrc",
        fieldName : "norPrc",
        header : {
            text : col.norPrc
        },
        width : 80,
        styleName : "disable-column right-column",
        editable : false
   }, {
        name : "salePrc",
        fieldName : "salePrc",
        header : {
            text : col.salePrc
        },
        width : 80,
        styleName : "disable-column right-column",
        editable : false
   }],

    props : {
        paging : false,
        rows : 0,
        width : "100%",
        height : "180",
        autoFitHeight : false,
        sumRowVisible : false,
        fitStyle : "none",
        checkbox : true,
        crud : true,
        form : "displayConnectForm",
        action : _baseUrl + "display/displayConnectMgmt.getPrConrContInfoGoodsList.do",
        saveAction : _baseUrl + "/display/displayConnectMgmt.savePrConrContInfoList.do"
    }
};
