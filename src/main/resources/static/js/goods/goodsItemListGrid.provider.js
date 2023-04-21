var col = x2coMessage.getMessage( {
    goodsNo : "goodsItemMgmt.grid.field.goodsNo",               // 상품번호
    goodsNm : "goodsItemMgmt.grid.field.goodsNm",               // 상품명
    saleStatNm : "goodsItemMgmt.grid.field.saleStatCd",         // 상품판매상태
    modlNm : "goodsItemMgmt.grid.field.modlNm",                 // 모델명
    entrNm : "goodsItemMgmt.grid.field.entrNm",                 // 협력사
    strCtg : "goodsItemMgmt.grid.field.stdCtg",                 // 표준분류
    itmNo : "goodsItemMgmt.grid.field.itmNo",                   // 단품번호
    itmNm : "goodsItemMgmt.grid.field.itmNm",                   // 단품명
    stkMgrYn : "goodsItemMgmt.grid.field.stkMgrYn",             // 재고관리여부
    stkQty : "goodsItemMgmt.grid.field.stkQty",                 // 재고수량
    dispSeq  : "goodsItemMgmt.grid.field.dispSeq",              // 전시순서
    itmSaleStatCd : "goodsItemMgmt.grid.field.itmSaleStatCd",   // 단품판매상태
    soutNotiYn : "goodsItemMgmt.grid.field.soutNotiYn",         // 품절알림여부
    soutNotiStdQty : "goodsItemMgmt.grid.field.soutNotiStdQty", // 품절알림기준수량
    lgcItmNo : "goodsItemMgmt.grid.field.lgcItmNo",             // 기간계단품번호
    soutCausCd : "goodsItemMgmt.grid.field.soutCausCd",         // 품절사유
    salePrc : "goodsItemMgmt.grid.field.salePrc",               // 판매가
    soldoutPeriod : "goodsItemMgmt.grid.field.soldoutPeriod",   // 품절처리일자
    deliProcTypCd : "goodsItemMgmt.grid.field.deliProcTypCd",   // 배송처리유형
    deliProcTypNm : "goodsItemMgmt.grid.field.deliProcTypCd",   // 배송처리유형
    soldUserNm : "goodsItemMgmt.grid.field.soldoutId",          // 품질처리자
    userNm : "goodsItemMgmt.grid.field.md",                     // 담당MD
    sysModId : "goodsItemMgmt.grid.field.sysModId",             // 수정자
    sysModDtm : "goodsItemMgmt.grid.field.sysModDtm"            // 수정일시
});

$.namespace("goodsItemListGrid.settings");
goodsItemListGrid.settings = {
    fields:[{
        fieldName : "goodsNo"
    },{
        fieldName : "goodsNm"
    },{
        fieldName : "saleStatCd"
    },{
        fieldName : "saleStatNm"
    },{
        fieldName : "modlNm"
    },{
        fieldName : "entrNm"
    },{
        fieldName : "strCtg"
    },{
        fieldName : "itmNo"
    },{
        fieldName : "itmNm"
    },{
        fieldName : "stkMgrYn"
    },{
        fieldName : "stkQty"
    },{
        fieldName : "dispSeq"
    },{
        fieldName : "itmSaleStatCd"
    },{
        fieldName : "soutNotiYn"
    },{
        fieldName : "soutNotiStdQty"
    },{
        fieldName : "lgcItmNo"
    },{
        fieldName : "soutCausCd"
    },{
        fieldName : "salePrc" , dataType : "number"
    },{
        fieldName : "histStrDtm"
    },{
        fieldName : "deliProcTypCd"
    },{
        fieldName : "deliProcTypNm"
    },{
        fieldName : "soldUserNm"
    },{
        fieldName : "userNm"
    },{
        fieldName : "sysModId"
    },{
        fieldName : "sysModDtm"
    },{
        fieldName : "hiddenItmSaleStatCd"
    }],
    columns:[{
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
        },
        editable : false,
        width : 120,
        styleName: 'column-underline-c disable-column'
    }, {
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        editable : false,
        width : 250,
        styleName: 'column-underline-l disable-column'
    }, {
        name : "saleStatNm",
        fieldName : "saleStatNm",
        header : {
            text : col.saleStatNm
        },
        styleName: 'disable-column',
        editable : false,
        width : 100
    }, {
        name : "modlNm",
        fieldName : "modlNm",
        styleName: 'left-column disable-column',
        header : {
            text : col.modlNm
        },
        editable : false,
        width : 250
    }, {
        name : "entrNm",
        fieldName : "entrNm",
        styleName: 'left-column disable-column',
        header : {
            text : col.entrNm
        },
        editable : false,
        width : 130
    }, {
        name : "strCtg",
        fieldName : "strCtg",
        header : {
            text : col.strCtg
        },
        editable: false,
        styleName: 'left-column disable-column',
        width : 300
    }, {
        name : "itmNo",
        fieldName : "itmNo",
        header : {
            text : col.itmNo
        },
        editable: false,
        styleName: 'disable-column',
        width : 100
    }, {
        name : "itmNm",
        fieldName : "itmNm",
        header : {
            text : col.itmNm
        },
        editable: false,
        styleName: 'left-column disable-column',
        width : 120
    }, {
        name : "stkMgrYn",
        fieldName : "stkMgrYn",
        header : {
            text : col.stkMgrYn
        },
        editable: false,
        styleName: 'disable-column',
        width : 110,
        readOnly : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "stkQty",
        fieldName : "stkQty",
        header : {
            text : col.stkQty
        },
        width : 100,
        editor: {
            type: 'number',
            integerOnly: true,
            maxIntegerLength: 3
        }
    }, {
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq
        },
        width : 80,
        editor: {
            type: 'number',
            integerOnly: true,
            maxIntegerLength: 3
        }
    },{
        name : "itmSaleStatCd",
        fieldName : "itmSaleStatCd",
        header : {
            text : col.itmSaleStatCd
        },
        width : 120,
        lookupDisplay: true,
        editor : {
            type : 'dropdown',
            displayLabels: 'label',
            domainOnly: true,
            textReadOnly: true
        },
        lookupSourceId: "saleStatLookupSource",
        lookupKeyFields:["hiddenItmSaleStatCd","itmSaleStatCd"],
        styleCallback: function(grid, dataCell){
            var ret = {}
            var hiddenItmSaleStatCd = grid.getValue(dataCell.index.itemIndex, "hiddenItmSaleStatCd");
            if(hiddenItmSaleStatCd ==='40'){
                ret.editable = false;
            }
            return ret;
        },
    },{
        name : "hiddenItmSaleStatCd",
        fieldName : "hiddenItmSaleStatCd",
        values: Object.keys(_sale_stat_select),
        labels: com.x2commerce.common.Util.getValues(_sale_stat_select),
        visible : false
    },{
        name : "soutNotiYn",
        fieldName : "soutNotiYn",
        header : {
            text : col.soutNotiYn
        },
        width : 110,
        editable: false,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "soutNotiStdQty",
        fieldName : "soutNotiStdQty",
        header : {
            text : col.soutNotiStdQty
        },
        width : 120,
        styleCallback: function(grid, dataCell){
            var ret = {}
            var soutNotiYn = grid.getValue(dataCell.index.itemIndex, "soutNotiYn");
            if(soutNotiYn ==='N'){
                ret.editable = false;
            }
            return ret;
        },
        editor: {
            type: 'number',
            integerOnly: true,
            maxIntegerLength: 3
        }
    }, {
        name : "lgcItmNo",
        fieldName : "lgcItmNo",
        header : {
            text : col.lgcItmNo
        },
        editable: false,
        styleName: 'disable-column',
        width : 120
    }, {
        name : "soutCausCd",
        fieldName : "soutCausCd",
        header : {
            text : col.soutCausCd
        },
        editable: false,
        styleName: 'left-column disable-column',
        width : 160
    }, {
        name : "salePrc",
        fieldName : "salePrc",
        header : {
            text : col.salePrc
        },
        editable: false,
        styleName: 'right-column disable-column',
        width : 80,
        numberFormat:"#,##0"
    }, {
        name : "histStrDtm",
        fieldName : "histStrDtm",
        header : {
            text : col.soldoutPeriod
        },
        editable: false,
        styleName: 'disable-column',
        width : 120
    }, {
        name : "deliProcTypNm",
        fieldName : "deliProcTypNm",
        header : {
            text : col.deliProcTypCd
        },
        editable: false,
        styleName: 'disable-column',
        width : 120
    }, {
        name : "soldUserNm",
        fieldName : "soldUserNm",
        header : {
            text : col.soldUserNm
        },
        editable: false,
        styleName: 'disable-column',
        width : 120
    }, {
        name : "userNm",
        fieldName : "userNm",
        header : {
            text : col.userNm
        },
        editable: false,
        styleName: 'disable-column',
        width : 120
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        editable: false,
        styleName: 'disable-column',
        width : 160
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        editable: false,
        styleName: 'disable-column',
        width : 160
    }],
    validations : [

    ],
    props : {
        paging : true,
        width : "100%",
        autoFitHeight : true,
        checkbox : true,
        crud : true,
        sumRowVisible : false,
        form : "goodsItemListGridForm",
        action : _baseUrl + "goods/GoodsItemMgmt.getGoodsItemList.do",
        saveAction : _baseUrl + 'goods/GoodsItemMgmt.saveGoodsItemList.do'
    }
};
