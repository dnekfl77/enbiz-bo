var col = x2coMessage.getMessage( {
    promoNo  : "promotionMgmt.manage.grid.promoNo",                 // 프로모션번호
    promoNm : "promotionMgmt.manage.grid.promoNm",                  // 프로모션명
    promoTypCd : "promotionMgmt.manage.grid.promoTypCd",            // 프로모션유형코드
    promoTypNm : "promotionMgmt.manage.grid.promoTypNm",            // 프로모션유형
    promoStatCd : "promotionMgmt.manage.grid.promoStatCd",          // 프로모션상태코드
    promoStatNm : "promotionMgmt.manage.grid.promoStatNm",          // 프로모션상태
    fixamtFxrtGbCd : "promotionMgmt.manage.grid.fixamtFxrtGbCd",    // 정액/정율 구분코드
    fixamtFxrtGbNm : "promotionMgmt.manage.grid.fixamtFxrtGbNm",    // 정액/정율 구분
    dcRateAmt : "promotionMgmt.manage.grid.dcRateAmt",              // 할인액(율)
    promoStrDtm : "promotionMgmt.manage.grid.promoStrDtm",          // 프로모션시작일시
    promoEndDtm : "promotionMgmt.manage.grid.promoEndDtm",          // 프로모션종료일시
    sysModId : "adminCommon.label.sys.mod.id",                // 수정자
    sysModDtm : "adminCommon.label.sys.mod.date"               // 수정일시
});

$.namespace("promotionGrid.settings");
promotionGrid.settings = {
    fields:[{
        fieldName : "promoNo"
    },{
        fieldName : "promoNm"
    },{
        fieldName : "promoTypCd"
    },{
        fieldName : "promoTypNm"
    },{
        fieldName : "promoStatCd"
    },{
        fieldName : "promoStatNm"
    },{
        fieldName : "fixamtFxrtGbCd"
    },{
        fieldName : "fixamtFxrtGbNm"
    },{
        fieldName : "dcRateAmt" , dataType : "number"
    },{
        fieldName : "promoStrDtm"
    },{
        fieldName : "promoEndDtm"
    },{
        fieldName : "sysModId"
    },{
        fieldName : "sysModDtm"
    }],
    columns:[{
        name : "promoNo",
        fieldName : "promoNo",
        header : {
            text : col.promoNo
        },
        width : 150,
        styleName : "column-underline-c"
    }, {
        name : "promoNm",
        fieldName : "promoNm",
        header : {
            text : col.promoNm
        },
        width : 300,
        styleName : "column-underline-l"
    }, {
        name : "promoTypCd",
        fieldName : "promoTypCd",
        header : {
            text : col.promoTypCd
        },
        width : 100,
        visible: false
    }, {
        name : "promoTypNm",
        fieldName : "promoTypNm",
        header : {
            text : col.promoTypNm
        },
        width : 140
    }, {
        name : "promoStatCd",
        fieldName : "promoStatCd",
        header : {
            text : col.promoStatCd
        },
        width : 140,
        visible: false
    }, {
        name : "promoStatNm",
        fieldName : "promoStatNm",
        header : {
            text : col.promoStatNm
        },
        width : 140
    }, {
        name : "fixamtFxrtGbCd",
        fieldName : "fixamtFxrtGbCd",
        header : {
            text : col.fixamtFxrtGbCd
        },
        visible: false
    }, {
        name : "fixamtFxrtGbNm",
        fieldName : "fixamtFxrtGbNm",
        header : {
            text : col.fixamtFxrtGbNm
        },
        width : 130
    }, {
        name : "dcRateAmt",
        fieldName : "dcRateAmt",
        header : {
            text : col.dcRateAmt
        },
        width : 130,
        styleName : "right-column",
        styleCallback: function(grid, dataCell){
            var ret = {};
            if(grid.getValue(dataCell.index.itemIndex, "fixamtFxrtGbCd") === '02'){
                ret.suffix = "%";
                ret.numberFormat = "#,##0"
            }else{
                ret.numberFormat = "#,##0"
            }
            return ret;
        }
    }, {
        name : "promoStrDtm",
        fieldName : "promoStrDtm",
        header : {
            text : col.promoStrDtm
        },
        width : 130
    },{
        name : "promoEndDtm",
        fieldName : "promoEndDtm",
        header : {
            text : col.promoEndDtm
        },
        width : 130
    },{
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 130
    },{
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 130
    } ],
    validations : [
        // { fieldName : "bwNm", criteria : "value === undefined || value.trim() === ''"  , error : { level : "error", message : _bwNmMessage } }
    ],
    props : {
        paging : true,
        width : "100%",
        // height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        autoFitHeight : true,
        checkbox : false,
        stateBar : false,
        crud : false,
        sumRowVisible : false,
        form : "promotionGridForm",
        action : _baseUrl + "marketing/promotionMgmt.getPromotionManagingList.do"
    }
};
