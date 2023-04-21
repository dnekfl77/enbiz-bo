var col = x2coMessage.getMessage( {
    couponNo : "couponCostMgmt.coupon.usage.grid.couponNo",           //쿠폰번호
    useDay : "couponCostMgmt.coupon.usage.grid.useDay",          // 사용일자
    couponTyp : "couponCostMgmt.coupon.usage.grid.couponTyp",       // 쿠폰유형
    couponNm : "couponCostMgmt.coupon.usage.grid.couponNm",        // 쿠폰명
    issuedCount : "couponCostMgmt.coupon.usage.grid.issuedCount",     // 발급건수
    useCount : "couponCostMgmt.coupon.usage.grid.useCount",        // 사용건수
    cancelCount : "couponCostMgmt.coupon.usage.grid.cancelCount",     // 취소건수
    totalGoodsPrice : "couponCostMgmt.coupon.usage.grid.totalGoodsPrice", // 총상품금액(배송비제외)
    couponCost : "couponCostMgmt.coupon.usage.grid.couponCost",      // 쿠폰비용
    useRt : "couponCostMgmt.coupon.usage.grid.useRt",               // 사용률(%)
    rateAmt : "couponCostMgmt.coupon.usage.grid.rateAmt",             // 정액/정율구분
    discountAmt : "couponCostMgmt.coupon.usage.grid.discountAmt",         // 할인금액(율)
    sysModId : "adminCommon.label.sys.mod.id",            // 수정자
    sysModTime : "adminCommon.label.sys.mod.date"          // 수정일시
});

$.namespace("couponCostGrid.settings");
couponCostGrid.settings = {
    fields:[{
        fieldName : "cpnNo"
    },{
        fieldName : "useDtm"
    },{
        fieldName : "promoTypCd"
    },{
        fieldName : "promoTypNm"
    },{
        fieldName : "promoNm"
    },{
        fieldName : "isuCnt" , dataType : "number"
    },{
        fieldName : "useCnt"  , dataType : "number"
    },{
        fieldName : "cnclCnt" , dataType : "number"
    },{
        fieldName : "ordAmt" , dataType : "number"
    },{
        fieldName : "cpnAmt"  , dataType : "number"
    }, {
        fieldName: "useRt"  , dataType : "number"
    }, {
        fieldName: "fixamtFxrtGbCd"
    }, {
        fieldName: "fixamtFxrtGbNm"
    }, {
        fieldName: "dcRateAmt" , dataType : "number"
    }, {
        fieldName: "sysModId"
    }, {
        fieldName: "sysModDtm"
    }],
    columns:[{
            name : "cpnNo",
            fieldName : "cpnNo",
            header : {
                text : col.couponNo
            },
            width : 90,
            editable : false,
            styleName : "column-underline-c"
        }
        , {
            name : "useDtm",
            fieldName : "useDtm",
            header : {
                text : col.useDay
            },
            width : 150,
            editable : false
        }, {
            name : "promoTypCd",
            fieldName : "promoTypCd",
            header : {
                text : col.couponTyp
            },
            width : 80,
            editable : false,
            visible: false
        }, {
            name : "promoTypNm",
            fieldName : "promoTypNm",
            header : {
                text : col.couponTyp
            },
            width : 100,
            editable : false
        }
        , {
            name : "promoNm",
            fieldName : "promoNm",
            header : {
                text : col.couponNm
            },
            width : 200,
            editable : false,
            styleName : "column-underline-l"
        }, {
            name : "isuCnt",
            fieldName : "isuCnt",
            header : {
                text : col.issuedCount
            },
            width : 100,
            editable : false,
            numberFormat:"#,##0"
        }, {
            name : "useCnt",
            fieldName : "useCnt",
            header : {
                text : col.useCount
            },
            editable : false,
            width : 100,
            numberFormat:"#,##0"
        }, {
            name : "cnclCnt",
            fieldName : "cnclCnt",
            header : {
                text : col.cancelCount
            },
            width: 110,
            editable : false,
            numberFormat:"#,##0"
        }, {
            name : "ordAmt",
            fieldName : "ordAmt",
            header : {
                text : col.totalGoodsPrice
            },
            width : 150,
            editable : false,
            styleName : "right-column",
            numberFormat:"#,##0"
        }, {
            name : "cpnAmt",
            fieldName : "cpnAmt",
            header : {
                text : col.couponCost
            },
            width : 140,
            editable : false,
            styleName : "right-column",
            numberFormat:"#,##0"
        }, {
            name : "useRt",
            fieldName : "useRt",
            header : {
                text : col.useRt
            },
            width : 80,
            editable : false,
            styleName : "right-column",
            numberFormat:"#,##0.##;.;,;f",
            suffix:'%'
        }, {
            name : "fixamtFxrtGbCd",
            fieldName : "fixamtFxrtGbCd",
            header : {
                text : col.rateAmt
            },
            width : 140,
            editable : false,
            visible: false
        }, {
            name : "fixamtFxrtGbNm",
            fieldName : "fixamtFxrtGbNm",
            header : {
                text : col.rateAmt
            },
            width : 80,
            editable : false
        }, {
            name : "dcRateAmt",
            fieldName : "dcRateAmt",
            header : {
                text : col.discountAmt
            },
            width : 80,
            editable : false,
            styleName : "right-column",
            styleCallback: function(grid, dataCell){
                var ret = {};
                if(grid.getValue(dataCell.index.itemIndex, "fixamtFxrtGbCd") == '02'){
                    ret.suffix = "%";
                    ret.numberFormat = "#,##0"
                }else{
                    ret.numberFormat = "#,##0"
                }
                return ret;
            }
        }, {
            name : "sysModId",
            fieldName : "sysModId",
            header : {
                text : col.sysModId
            },
            width : 140,
            editable : false
        }, {
            name : "sysModDtm",
            fieldName : "sysModDtm",
            header : {
                text : col.sysModTime
            },
            width : 140,
            editable : false
        }

    ],
    validations : [
        // { fieldName : "bwNm", criteria : "value === undefined || value.trim() === ''"  , error : { level : "error", message : _bwNmMessage } }
    ],
    props : {
        paging : true,
        autoFitHeight : true,
        checkbox : false,
        stateBar : false,
        crud : false,
        sumRowVisible : false,
        form : "couponCostGridForm",
        action : _baseUrl + "marketing/couponMgmt.getCouponCostManageList.do"
    }
};
