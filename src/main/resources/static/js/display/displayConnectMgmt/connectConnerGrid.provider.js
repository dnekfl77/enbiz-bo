var col = x2coMessage.getMessage({
    conrNo          : 'displayConnectMgmt.connectConnerGrid.field.conrNo', // 진서코너번호
    conrNm          : 'displayConnectMgmt.connectConnerGrid.field.conrNm', // 전시코너명
    dispSeq         : 'displayConnectMgmt.connectConnerGrid.field.dispSeq', // 전시 순서
    conrTgtCd       : 'displayConnectMgmt.connectConnerGrid.field.conrTgtCd', // 전시대상 (+로 연결)
    dispYn          : 'displayConnectMgmt.connectConnerGrid.field.dispYn', // 전시여부
    useYn           : 'displayConnectMgmt.connectConnerGrid.field.useYn', // 사용여부
    dispStrDtm      : 'displayConnectMgmt.connectConnerGrid.field.dispStrDtm', // 전시시작일시
    dispEndDtm      : 'displayConnectMgmt.connectConnerGrid.field.dispEndDtm' // 전시종료일시
});

$.namespace("connectConnerGrid.settings");
connectConnerGrid.settings = {
    fields : [ {
        fieldName : "dispCtgNo"
    }, {
        fieldName : "siteNo"
    }, {
        fieldName : "tmplNo"
    }, {
        fieldName : "conrNo"
    }, {
        fieldName : "conrNm"
    }, {
        fieldName : "dispSeq"
    }, {
        fieldName : "conrTgtCd"
    }, {
        fieldName : "dispYn"
    }, {
        fieldName : "useYn"
    }, {
        fieldName : "dispStrDtm"
    }, {
        fieldName : "dispEndDtm"
    } ],
    columns : [ {
        name : "dispCtgNo",
        fieldName : "dispCtgNo",
        visible : false
    }, {
        name : "siteNo",
        fieldName : "siteNo",
        visible : false
    }, {
        name : "tmplNo",
        fieldName : "tmplNo",
        visible : false
    }, {
        name : "conrNo",
        fieldName : "conrNo",
        header : {
            text : col.conrNo
        },
        width : 80,
        styleName : "column-underline-c disable-column"
    }, {
        name : "conrNm",
        fieldName : "conrNm",
        header : {
            text : col.conrNm
        },
        width : 200,
        styleName : "column-underline-l disable-column"
    }, {
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq
        },
        width : 60,
        styleName : "right-column disable-column"
    }, {
        name : "conrTgtCd",
        fieldName : "conrTgtCd",
        header : {
            text : col.conrTgtCd
        },
        width : 300,
        styleName : "left-column disable-column"
    },{
        name : "dispYn",
        fieldName : "dispYn",
        header : {
            text : col.dispYn
        },
        width : 60,
        editable : false,
        readOnly : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        styleName : "disable-column"
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn
        },
        width : 60,
        editable : false,
        readOnly : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        styleName : "disable-column"
    }, {
         name : "dispStrDtm",
         fieldName : "dispStrDtm",
         header : {
             text : col.dispStrDtm
         },
         width : 120,
         styleName : "disable-column"
    }, {
         name : "dispEndDtm",
         fieldName : "dispEndDtm",
         header : {
             text : col.dispEndDtm
         },
         width : 120,
         styleName : "disable-column"
    }],

    props : {
        paging : false,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : false,
        crud : false,
        form : "connectConnerGridForm",
        action : _baseUrl + "display/displayConnectMgmt.getDisplayConnectMgmt.do"
    }
};
