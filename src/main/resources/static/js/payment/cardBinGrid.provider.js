var col = x2coMessage.getMessage({
    cardBinno   : 'cardBinMgmt.cardBinGrid.label.cardBinno',
    iscmCd      : 'cardBinMgmt.cardBinGrid.label.iscmCd',
    cardcoNm    : 'cardBinMgmt.cardBinGrid.label.cardcoNm',
    mbrGbCd     : 'cardBinMgmt.cardBinGrid.label.mbrGbCd',
    cardTypCd   : 'cardBinMgmt.cardBinGrid.label.cardTypCd',
    aplyDt      : 'cardBinMgmt.cardBinGrid.label.aplyDt',
    rmk         : 'cardBinMgmt.cardBinGrid.label.rmk',
    sysModId    : 'cardBinMgmt.cardBinGrid.label.sysModId',
    sysModDtm   : 'cardBinMgmt.cardBinGrid.label.sysModDtm'
});

$.namespace("cardBinGrid.settings");
cardBinGrid.settings = {
    fields : [ { fieldName : "cardBinno", dataType: "number" }
             , { fieldName : "iscmCd" }
             , { fieldName : "cardcoNm" }
             , { fieldName : "mbrGbCd" }
             , { fieldName : "cardTypCd" }
             , { fieldName : "aplyDt" }
             , { fieldName : "rmk" }
             , { fieldName : "sysModId" }
             , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "cardBinno",
        fieldName : "cardBinno",
        header : {
            text : col.cardBinno + " *"
        },
		editor :{
			maxLength: 6
		},
        width : 80,
        numberFormat: "##0",
        editable : true,
        styleCallback: function(grid, dataCell){
            var ret = {};
            if(dataCell.item.rowState == 'created'){
                ret.editable = true;
            } else {
                ret.editable = false;
                ret.styleName = "disable-column";
            }
            return ret;
        }
    }, {
        name : "iscmCd",
        fieldName : "iscmCd",
        header : {
            text : col.iscmCd + " *"
        },
        width : 100,
        values : iscmCode,
        labels : iscmCdValues,
        editor : {
            type : "list",
            textReadOnly:true
        },
        lookupDisplay : true,
        editable : true
    }, {
        name : "cardcoNm",
        fieldName : "cardcoNm",
        header : {
            text : col.cardcoNm + " *"
        },
        width : 150,
        editable : true,
        styleName : "left-column"
    }, {
        name : "mbrGbCd",
        fieldName : "mbrGbCd",
        header : {
            text : col.mbrGbCd + " *"
        },
        width : 80,
        values : mbrGbCode,
        labels : mbrGbCdValues,
        editor : {
            type : "list",
            textReadOnly:true
        },
        lookupDisplay : true,
        editable : true
    }, {
        name : "cardTypCd",
        fieldName : "cardTypCd",
        header : {
            text : col.cardTypCd + " *"
        },
        width : 80,
        values : cardTypCode,
        labels : cardTypCdValues,
        editor : {
            type : "list",
            textReadOnly:true
        },
        lookupDisplay : true,
        editable : true
    }, {
         name : "aplyDt",
         fieldName : "aplyDt",
         header : {
             text : col.aplyDt + " *"
         },
         width : 100,
         editable : true,
         editor : {
            type : "date",
            datetimeFormat : "yyyy-MM-dd",
            minDate: new Date("2021-01-01"),
            maxDate: new Date("2999-12-31")
         }
    }, {
        name : "rmk",
        fieldName : "rmk",
        header : {
            text : col.rmk
        },
        width : 200,
        editable : true,
        styleName : "left-column"
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 80,
        editable : false,
        styleName : "disable-column"
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 120,
        editable : false,
        styleName : "disable-column"
    }],
    props : {
        paging : true,
        defrow : 10,
        rows : 0,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        fitStyle : "evenFill",
        checkbox : true,
        crud : true,
        form : "cardBinGridForm",
        action : _baseUrl + "payment/cardBinMgmt.getCardBin.do",
        saveAction : _baseUrl + "payment/cardBinMgmt.saveCardBin.do"
    }
};