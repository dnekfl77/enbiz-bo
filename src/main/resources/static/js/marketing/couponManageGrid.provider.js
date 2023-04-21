var col = x2coMessage.getMessage( {
    promoNo  : "couponMgmt.grid.field.promoNo",                 // 쿠폰번호
    promoNm : "couponMgmt.grid.field.promoNm",                  // 쿠폰명
    promoTypCd : "couponMgmt.grid.field.promoTypCd",            // 쿠폰유형코드
    promoTypNm : "couponMgmt.grid.field.promoTypNm",            // 쿠폰유형
    promoStatCd : "couponMgmt.grid.field.promoStatCd",          // 쿠폰상태코드
    promoStatNm : "couponMgmt.grid.field.promoStatNm",          // 쿠폰상태
    fixamtFxrtGbCd : "couponMgmt.grid.field.fixamtFxrtGbCd",    // 정액/정율 구분코드
    fixamtFxrtGbNm : "couponMgmt.grid.field.fixamtFxrtGbNm",    // 정액/정율 구분
    dcRateAmt: "couponMgmt.grid.field.dcRateAmt",               // 할인액(율)
    promoStrDtm : "couponMgmt.grid.field.promoStrDtm",          // 전시시작일자
    promoEndDtm : "couponMgmt.grid.field.promoEndDtm",          // 전시종료일자
    usePsbStrDt : "couponMgmt.grid.field.usePsbStrDt",          // 사용시작일자
    usePsbEndDt : "couponMgmt.grid.field.usePsbEndDt",          // 사용종료일자
    sysModId : "adminCommon.label.sys.mod.id",            // 등록자
    sysModDtm : "adminCommon.label.sys.mod.date" // 등록일시
});

$.namespace("couponManageGrid.settings");
couponManageGrid.settings = {
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
        fieldName : "dcRateAmt",
        dataType  : "number"
    },{
        fieldName : "promoStrDtm"
    },{
        fieldName : "promoEndDtm"
    },{
        fieldName : "usePsbStrDt"
    },{
        fieldName : "usePsbEndDt"
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
        width : 80,
        styleName : "column-underline-c"
    }, {
        name : "promoNm",
        fieldName : "promoNm",
        header : {
            text : col.promoNm
        },
        width : 200,
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
            if(grid.getValue(dataCell.index.itemIndex, "fixamtFxrtGbCd") == '02'){
                ret.suffix = "%"
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
        name : "usePsbStrDt",
        fieldName : "usePsbStrDt",
        header : {
            text : col.usePsbStrDt
        },
        width : 130
    },{
        name : "usePsbEndDt",
        fieldName : "usePsbEndDt",
        header : {
            text : col.usePsbEndDt
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
        form : "couponManageGridForm",
        action : _baseUrl + "marketing/couponMgmt.getCouponList.do",
        autoFitHeight : true,
        paging : true,
        checkbox : false,
        stateBar : false,
        crud : false,
        sumRowVisible : false,
    }
};
