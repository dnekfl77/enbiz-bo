var col = x2coMessage.getMessage({
    goodsNm             : 'deliveryMgmt.deliveryDetail.grid.label.goodsNm', // 상품명
    itmNm               : 'deliveryMgmt.deliveryDetail.grid.label.itmNm', // 단품명
    indiQty             : 'deliveryMgmt.deliveryDetail.grid.label.indiQty', // 지시수량
    hdcCd               : 'deliveryMgmt.deliveryDetail.grid.label.hdcCd', // 택배사
    invNo               : 'deliveryMgmt.deliveryDetail.grid.label.invNo', // 송장번호
    supPcost            : 'deliveryMgmt.deliveryDetail.grid.label.supPcost', // 공급원가
    salePrc             : 'deliveryMgmt.deliveryDetail.grid.label.salePrc', // 판매가
    deliPrgsStatCd      : 'deliveryMgmt.deliveryDetail.grid.label.deliPrgsStatCd', // 배송진행상태
    indiDtm             : 'deliveryMgmt.deliveryDetail.grid.label.indiDtm', // 발송지시예정일자
    procDtm             : 'deliveryMgmt.deliveryDetail.grid.label.procDtm', // 발송완료일자
    fnshDtm             : 'deliveryMgmt.deliveryDetail.grid.label.fnshDtm', // 배송완료일자
    dlexChrgSubCd       : 'deliveryMgmt.deliveryDetail.grid.label.dlexChrgSubCd' // 배송비부담주체
});

$.namespace("deliveryGoodsGrid.settings");
deliveryGoodsGrid.settings = {
    fields : [ { fieldName : "goodsNm" }
             , { fieldName : "itmNm" }
             , { fieldName : "indiQty", dataType: "number" }
             , { fieldName : "hdcCd" }
             , { fieldName : "invNo" }
             , { fieldName : "supPcost", dataType: "number" }
             , { fieldName : "salePrc" , dataType: "number" }
             , { fieldName : "deliPrgsStatCd" }
             , { fieldName : "indiDtm" }
             , { fieldName : "procDtm" }
             , { fieldName : "fnshDtm" }
             , { fieldName : "dlexChrgSubCd" }],
    columns : [ {
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        width : 200,
        styleName : "disable-column column-underline-l"
    }, {
        name : "itmNm",
        fieldName : "itmNm",
        header : {
            text : col.itmNm
        },
        width : 170,
        styleName : "disable-column left-column"
    }, {
        name : "indiQty",
        fieldName : "indiQty",
        header : {
            text : col.indiQty
        },
        width : 80,
        numberFormat: "#,##0",
        styleName : "disable-column right-column"
    }, {
         name : "hdcCd",
         fieldName : "hdcCd",
         header : {
            text : col.hdcCd
         },
         width : 80,
         styleName : "disable-column left-column"
    }, {
         name : "invNo",
         fieldName : "invNo",
         header : {
            text : col.invNo
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "supPcost",
         fieldName : "supPcost",
         header : {
            text : col.supPcost
         },
         width : 80,
         numberFormat: "#,##0",
         styleName : "disable-column right-column"
    }, {
         name : "salePrc",
         fieldName : "salePrc",
         header : {
            text : col.salePrc
         },
         width : 80,
         numberFormat: "#,##0",
         styleName : "disable-column right-column"
    }, {
         name : "deliPrgsStatCd",
         fieldName : "deliPrgsStatCd",
         header : {
            text : col.deliPrgsStatCd
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "indiDtm",
         fieldName : "indiDtm",
         header : {
            text : col.indiDtm
         },
         width : 100,
         styleName : "disable-column"
    }, {
         name : "procDtm",
         fieldName : "procDtm",
         header : {
            text : col.procDtm
         },
         width : 100,
         styleName : "disable-column"
    }, {
         name : "fnshDtm",
         fieldName : "fnshDtm",
         header : {
            text : col.fnshDtm
         },
         width : 100,
         styleName : "disable-column"
    }, {
         name : "dlexChrgSubCd",
         fieldName : "dlexChrgSubCd",
         header : {
            text : col.dlexChrgSubCd
         },
         width : 100,
         styleName : "disable-column"
    }],
    props : {
        paging : false,
        defrow : 10,
        rows : 0,
        width : "100%",
        height : "220px",
        autoFitHeight : false,
        sumRowVisible : false,
        checkbox : false,
        crud : false,
        form : "deliveryDetailForm",
        action : _baseUrl + "delivery/deliveryMgmt.getDeliveryGoodsList.do"
    }
};
