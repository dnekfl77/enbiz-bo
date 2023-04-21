var col = x2coMessage.getMessage({
    goodsNo     : 'marketingDisplayManagement.mkdpGoodsGrid.goodsNo',
    goodsNm     : 'marketingDisplayManagement.mkdpGoodsGrid.goodsNm',
    dispSeq     : 'marketingDisplayManagement.mkdpGoodsGrid.dispSeq',
    saleStatCd  : 'marketingDisplayManagement.mkdpGoodsGrid.saleStatCd',
    entrNm      : 'marketingDisplayManagement.mkdpGoodsGrid.entrNm',
    norPrc      : 'marketingDisplayManagement.mkdpGoodsGrid.norPrc',
    salePrc     : 'marketingDisplayManagement.mkdpGoodsGrid.salePrc',
    sysRegDtm   : 'marketingDisplayManagement.mkdpGoodsGrid.sysRegDtm',
    sysModId    : 'marketingDisplayManagement.mkdpGoodsGrid.sysModId',
    sysModDtm   : 'marketingDisplayManagement.mkdpGoodsGrid.sysModDtm'
});

$.namespace("mkdpGoodsGrid.settings");
mkdpGoodsGrid.settings = {
    fields : [ { fieldName : "mkdpNo" }
            , { fieldName : "divobjNo" }
            , { fieldName : "goodsNo" }
            , { fieldName : "goodsNm" }
            , { fieldName : "dispSeq" }
            , { fieldName : "saleStatCd" }
            , { fieldName : "entrNm" }
            , { fieldName : "norPrc" }
            , { fieldName : "salePrc" }
            , { fieldName : "sysRegDtm" }
            , { fieldName : "sysModId" }
            , { fieldName : "sysModDtm" }
    ],
    columns : [ {
        name : "mkdpNo",
        fieldName : "mkdpNo",
        visible : false
    }, {
        name : "divobjNo",
        fieldName : "divobjNo",
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
        width : 180,
        styleName : "disable-column left-column",
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
            type: "number",
            integerOnly : true, // 정수값만 허용
            maxIntegerLength: 5
        },
        numberFormat : '0'
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
        name : "entrNm",
        fieldName : "entrNm",
        header : {
            text : col.entrNm
        },
        width : 120,
        styleName : "disable-column left-column",
        editable : false
    }, {
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
    }, {
        name : "sysRegDtm",
        fieldName : "sysRegDtm",
        header : {
            text : col.sysRegDtm
        },
        width : 120,
        styleName : "disable-column",
        editable : false
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 80,
        styleName : "disable-column",
        editable : false
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 120,
        styleName : "disable-column",
        editable : false
    }],
    props : {
        paging : false,
        rows : 0,
        width : "100%",
        height : "200",
        sumRowVisible : false,
        fitStyle : "none",
        checkbox : true,
        crud : true,
        form : "marketingDisplayForm",
        action : _baseUrl + "display/marketingDisplayMgmt.getPrMkdpGoodsInfoList.do",
        saveAction : _baseUrl + "/display/marketingDisplayMgmt.savePrMkdpGoodsInfoList.do"
    }
};
