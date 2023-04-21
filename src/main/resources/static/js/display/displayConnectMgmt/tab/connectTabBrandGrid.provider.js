var col = x2coMessage.getMessage({
    conrContNo      : 'displayConnectManagement.connectTabBrandGrid.brandNo',
    brandImg        : 'displayConnectManagement.connectTabBrandGrid.brandImg',
    brandNm         : 'displayConnectManagement.connectTabBrandGrid.brandNm',
    movFrmeCd       : 'displayConnectManagement.connectTabBrandGrid.movFrmeCd',
    linkUrlAddr     : 'displayConnectManagement.connectTabBrandGrid.linkUrlAddr',
    dispSeq         : 'displayConnectManagement.connectTabBrandGrid.dispSeq',
    dispYn          : 'displayConnectManagement.connectTabBrandGrid.dispYn',
    dispStrDtm      : 'displayConnectManagement.connectTabBrandGrid.dispStrDtm',
    dispEndDtm      : 'displayConnectManagement.connectTabBrandGrid.dispEndDtm'
});

$.namespace("connectTabBrandGrid.settings");
connectTabBrandGrid.settings = {
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
        fieldName : "brandImg"
    }, {
        fieldName : "brandNm"
    }, {
        fieldName : "movFrmeCd"
    }, {
        fieldName : "linkUrlAddr"
    }, {
        fieldName : "dispSeq"
    }, {
        fieldName : "dispYn"
    }, {
        fieldName : "dispStrDtm"
    }, {
        fieldName : "dispEndDtm"
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
        name : "brandImg",
        fieldName : "brandImg",
        header : {
            text : col.brandImg
        },
        renderer: {
            type: "image",
            imageCallback: function (grid, cell) {
                var brandImg = grid.getValue(cell.item.index, "brandImg");
                if( brandImg != null && brandImg != '') {
                    return brandImg;
                } else {
                    return "/static/img/noimg.png";
                }
            },
            imageHeight: 80
        },
        width : 120,
        styleName : "disable-column",
        editable : false
    }, {
        name : "brandNm",
        fieldName : "brandNm",
        header : {
            text : col.brandNm
        },
        width : 120,
        styleName : "disable-column left-column",
        editable : false
    }, {
        name : "movFrmeCd",
        fieldName : "movFrmeCd",
        header : {
            text : col.movFrmeCd + " *"
        },
        width : 80,
        editable : true,
        values : movFrmeCode,
        labels : movFrmeCdValues,
        editor : {
            type : "list",
            textReadOnly:true
       },
       lookupDisplay : true
    }, {
        name : "linkUrlAddr",
        fieldName : "linkUrlAddr",
        header : {
            text : col.linkUrlAddr + " *"
        },
        width : 120,
        styleName : "left-column",
        editable : true
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
        action : _baseUrl + "display/displayConnectMgmt.getPrConrContInfoBrandList.do",
        saveAction : _baseUrl + "/display/displayConnectMgmt.savePrConrContInfoList.do"
    }
};
