var col = x2coMessage.getMessage({
    conrContNo    : 'displayConnectManagement.connectTabMkdpGrid.mkdpNo',
    mkdpNm        : 'displayConnectManagement.connectTabMkdpGrid.mkdpNm',
    dispStat      : 'displayConnectManagement.connectTabMkdpGrid.mkdpState',
    dispSeq       : 'displayConnectManagement.connectTabMkdpGrid.dispSeq',
    dispYn        : 'displayConnectManagement.connectTabMkdpGrid.dispYn',
    dispStrDtm    : 'displayConnectManagement.connectTabMkdpGrid.dispStrDtm',
    dispEndDtm    : 'displayConnectManagement.connectTabMkdpGrid.dispEndDtm',
    mkdpTypCd     : 'displayConnectManagement.connectTabMkdpGrid.mkdpTypCd',
    mdNm          : 'displayConnectManagement.connectTabMkdpGrid.mdNm'
});

$.namespace("connectTabMkdpGrid.settings");
connectTabMkdpGrid.settings = {
    fields : [ { fieldName : "dispCtgNo" }
            , { fieldName : "conrNo" }
            , { fieldName : "conrTgtNo" }
            , { fieldName : "conrTgtCd" }
            , { fieldName : "conrContNo" }
            , { fieldName : "mkdpNm" }
            , { fieldName : "dispStat" }
            , { fieldName : "dispSeq" }
            , { fieldName : "dispYn" }
            , { fieldName : "dispStrDtm" }
            , { fieldName : "dispEndDtm" }
            , { fieldName : "mkdpTypCd" }
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
        name : "conrContNo",
        fieldName : "conrContNo",
        header : {
            text : col.conrContNo
        },
        width : 80,
        styleName : "disable-column",
        editable : false
    }, {
        name : "mkdpNm",
        fieldName : "mkdpNm",
        header : {
            text : col.mkdpNm
        },
        width : 120,
        styleName : "disable-column left-column",
        editable : false
    }, {
        name : "dispStat",
        fieldName : "dispStat",
        header : {
            text : col.dispStat
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
        name : "mkdpTypCd",
        fieldName : "mkdpTypCd",
        header : {
            text : col.mkdpTypCd
        },
        width : 80,
        styleName : "disable-column",
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
        action : _baseUrl + "display/displayConnectMgmt.getPrConrContInfoMkdpList.do",
        saveAction : _baseUrl + "/display/displayConnectMgmt.savePrConrContInfoList.do"
    }
};
