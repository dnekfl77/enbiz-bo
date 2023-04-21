var col = x2coMessage.getMessage( {
    goodsTypCd      : "reservationGoodsMgmt.grid.field.goodsTypCd",     // 상품유형
    goodsNo         : "reservationGoodsMgmt.grid.field.goodsNo",        // 상품번호
    goodsNm         : "reservationGoodsMgmt.grid.field.goodsNm",        // 상품명
    modlNm          : "reservationGoodsMgmt.grid.field.modlNm",         // 모델명
    brandNm         : "reservationGoodsMgmt.grid.field.brandNm",        // 브랜드명
    saleStatCd      : "reservationGoodsMgmt.grid.field.saleStatCd",     // 판매상태
    saleMethCd      : "reservationGoodsMgmt.grid.field.saleMethCd",     // 판매방식
    entrNm          : "reservationGoodsMgmt.grid.field.entrNm",         // 협력사명
    mdNm            : "reservationGoodsMgmt.grid.field.mdNm",           // 담당MD
    stdCtgNm        : "reservationGoodsMgmt.grid.field.stdCtgNm",       // 표준분류
    useYn           : "reservationGoodsMgmt.grid.field.useYn",          // 전시여부
    buyTypCd        : "reservationGoodsMgmt.grid.field.buyTypCd",       // 매입형태
    taxGbCd         : "reservationGoodsMgmt.grid.field.taxGbCd",        // 면/과세구분
    norPrc          : "reservationGoodsMgmt.grid.field.norPrc",         // 정상가
    mrgnRate        : "reservationGoodsMgmt.grid.field.mrgnRate",       // 마진율
    salePrc         : "reservationGoodsMgmt.grid.field.salePrc",        // 판매가
    goodsRegDtm     : "reservationGoodsMgmt.grid.field.goodsRegDtm",    // 상품등록일시
    rsvStrtDtm      : "reservationGoodsMgmt.grid.field.rsvStrtDtm",     // 예약판매 시작일시
    rsvEndDtm       : "reservationGoodsMgmt.grid.field.rsvEndDtm",      // 예약판매 종료일시
    fwdidcPrarDy    : "reservationGoodsMgmt.grid.field.fwdidcPrarDy",   // 예약상품 출고지시 일자
    afterProcMethCd : "reservationGoodsMgmt.grid.field.afterProcMethCd" // 예약종료 후 판매 방식
});

$.namespace("reservationGoodsListGrid.settings");
reservationGoodsListGrid.settings = {
    fields:[{ fieldName : "goodsTypCd" },
            { fieldName : "goodsTypNm" },
            { fieldName : "goodsNo" },
            { fieldName : "goodsNm" },
            { fieldName : "modlNm" },
            { fieldName : "brandNm" },
            { fieldName : "saleStatCd" },
            { fieldName : "saleStatNm" },
            { fieldName : "saleMethCd" },
            { fieldName : "saleMethNm" },
            { fieldName : "entrNm"  },
            { fieldName : "md"  },
            { fieldName : "strCtg" },
            { fieldName : "dispYn" },
            { fieldName : "buyTypNm" },
            { fieldName : "taxGbNm"},
            { fieldName : "norPrc" , dataType : "number"},
            { fieldName : "mrgnRate" , dataType : "number"},
            { fieldName : "salePrc" , dataType : "number"},
            { fieldName : "goodsRegDtm" },
            { fieldName : "rsvStrtDtm" },
            { fieldName : "rsvEndDtm"},
            { fieldName : "fwdidcPrarDy"},
            { fieldName : "rsvEndAfProcMethNm"}
    ],
    columns:[{
        name : "goodsTypNm",
        fieldName : "goodsTypNm",
        header : {
            text : col.goodsTypCd
        },
        width : 100
    }, {
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
        },
        width : 110,
        styleName: 'column-underline-c'
    }, {
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        width : 200,
        styleName: 'column-underline-l'
    }, {
        name : "modlNm",
        fieldName : "modlNm",
        header : {
            text : col.modlNm
        },
        styleName: 'left-column',
        width : 200
    }, {
        name : "brandNm",
        fieldName : "brandNm",
        header : {
            text : col.brandNm
        },
        styleName: 'left-column',
        width : 150
    }, {
        name : "saleStatNm",
        fieldName : "saleStatNm",
        header : {
            text : col.saleStatCd
        },
        width: 100
    }, {
        name : "saleMethNm",
        fieldName : "saleMethNm",
        header : {
            text : col.saleMethCd
        },
        width : 100
    }, {
        name : "entrNm",
        fieldName : "entrNm",
        header : {
            text : col.entrNm
        },
        styleName: 'left-column',
        width : 150
    }, {
        name : "md",
        fieldName : "md",
        header : {
            text : col.mdNm
        },
        width : 100
    }, {
        name : "strCtg",
        fieldName : "strCtg",
        header : {
            text : col.stdCtgNm
        },
        styleName: 'left-column',
        width : 250
    }, {
        name : "dispYn",
        fieldName : "dispYn",
        header : {
            text : col.useYn
        },
        width : 100,
        readOnly : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "buyTypNm",
        fieldName : "buyTypNm",
        header : {
            text : col.buyTypCd
        },
        width : 100
    },{
        name : "taxGbNm",
        fieldName : "taxGbNm",
        header : {
            text : col.taxGbCd
        },
        width : 100,
    }, {
        name : "norPrc",
        fieldName : "norPrc",
        header : {
            text : col.norPrc
        },
        width : 100,
        numberFormat:"#,##0",
        styleName: 'right-column'
    }, {
        name : "mrgnRate",
        fieldName : "mrgnRate",
        header : {
            text : col.mrgnRate
        },
        width : 100,
        numberFormat:"#,##0.##;.;,;f",
        suffix:'%',
        styleName: 'right-column'
    }, {
        name : "salePrc",
        fieldName : "salePrc",
        header : {
            text : col.salePrc
        },
        width : 100,
        numberFormat:"#,##0",
        styleName: 'right-column'
    }, {
        name : "goodsRegDtm",
        fieldName : "goodsRegDtm",
        header : {
            text : col.goodsRegDtm
        },
        width : 160
    }, {
        name : "rsvStrtDtm",
        fieldName : "rsvStrtDtm",
        header : {
            text : col.rsvStrtDtm
        },
        width : 160
    }, {
        name : "rsvEndDtm",
        fieldName : "rsvEndDtm",
        header : {
            text : col.rsvEndDtm
        },
        width : 160
    }, {
        name : "fwdidcPrarDy",
        fieldName : "fwdidcPrarDy",
        header : {
            text : col.fwdidcPrarDy
        },
    }, {
        name : "rsvEndAfProcMethNm",
        fieldName : "rsvEndAfProcMethNm",
        header : {
            text : col.afterProcMethCd
        },
        width : 160
    }],
    validations : [

    ],
    props : {
        paging : true,
        width : "100%",
        autoFitHeight : true,
        checkbox : true,
        stateBar : false,
        crud : true,
        sumRowVisible : false,
        form : "reservationGoodsListForm",
        action : _baseUrl + "goods/ReservationGoodsMgmt.getReservationGoodsList.do"
    }
};
