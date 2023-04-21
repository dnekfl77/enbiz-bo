var col = x2coMessage.getMessage({
    goodsNo       : 'displayConnectManagement.connectTabReviewGrid.goodsNo',
    goodsNm       : 'displayConnectManagement.connectTabReviewGrid.goodsNm',
    revCont       : 'displayConnectManagement.connectTabReviewGrid.revCont',
    dispSeq       : 'displayConnectManagement.connectTabReviewGrid.dispSeq',
    dispYn        : 'displayConnectManagement.connectTabReviewGrid.dispYn',
    dispStrDtm    : 'displayConnectManagement.connectTabReviewGrid.dispStrDtm',
    dispEndDtm    : 'displayConnectManagement.connectTabReviewGrid.dispEndDtm',
    conrContNo    : 'displayConnectManagement.connectTabReviewGrid.revNo',
    revScrVal     : 'displayConnectManagement.connectTabReviewGrid.revScrVal',
    salePrc       : 'displayConnectManagement.connectTabReviewGrid.salePrc',
    mdNm          : 'displayConnectManagement.connectTabReviewGrid.mdNm'
});

$.namespace("connectTabReviewGrid.settings");
connectTabReviewGrid.settings = {
    fields : [    { fieldName : "dispCtgNo" }
                , { fieldName : "conrNo" }
                , { fieldName : "conrTgtNo" }
                , { fieldName : "conrTgtCd" }
                , { fieldName : "goodsNo" }
                , { fieldName : "goodsNm" }
                , { fieldName : "revCont" }
                , { fieldName : "dispSeq" }
                , { fieldName : "dispYn" }
                , { fieldName : "dispStrDtm" }
                , { fieldName : "dispEndDtm" }
                , { fieldName : "conrContNo" }
                , { fieldName : "revScrVal" }
                , { fieldName : "salePrc", dataType: "number" }
                , { fieldName : "mdNm" }
    ],
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
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
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
        styleName : "disable-column left-column",
        editable : false
    }, {
        name : "revCont",
        fieldName : "revCont",
        header : {
            text : col.revCont
        },
        width : 200,
        styleName : "disable-column left-column",
        renderer:{
          showTooltip:true
        },
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
            text : col.dispEndDtm + ' *'
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
        name : "conrContNo",
        fieldName : "conrContNo",
        header : {
            text : col.conrContNo
        },
        width : 80,
        styleName : "disable-column",
        editable : false
   }, {
        name : "revScrVal",
        fieldName : "revScrVal",
        header : {
            text : col.revScrVal
        },
        width : 80,
        styleName : "disable-column",
        editable : false
   }, {
        name : "salePrc",
        fieldName : "salePrc",
        header : {
            text : col.salePrc
        },
        width : 80,
        numberFormat: "#,##0",
        styleName : "disable-column right-column",
        editable : false
   }, {
        name : "mdNm",
        fieldName : "mdNm",
        header : {
            text : col.mdNm
        },
        width : 80,
        styleName : "disable-column",
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
        action : _baseUrl + "display/displayConnectMgmt.getPrConrContInfoReviewList.do",
        saveAction : _baseUrl + "/display/displayConnectMgmt.savePrConrContInfoList.do"
    }
};
