var col = x2coMessage.getMessage({
    rsvStrtDtm         : 'reservationGoodsMgmt.reservationGoodsHistory.grid.field.rsvStrtDtm',          // 예약 주문 시작일
    rsvEndDtm          : 'reservationGoodsMgmt.reservationGoodsHistory.grid.field.rsvEndDtm',           // 예약 주문 종료일
    fwdidcPrarDy       : 'reservationGoodsMgmt.reservationGoodsHistory.grid.field.fwdidcPrarDy',        // 출고 지시예정일
    rsvEndAfProcMethCd : 'reservationGoodsMgmt.reservationGoodsHistory.grid.field.rsvEndAfProcMethCd',  // 에약 종료 후 판매방식
    rsvStopYn          : 'reservationGoodsMgmt.reservationGoodsHistory.grid.field.rsvStopYn',           // 예약중단여부
    rsvStopCausCd      : 'reservationGoodsMgmt.reservationGoodsHistory.grid.field.rsvStopCausCd',       // 예약중단사유
    sysModId           : 'reservationGoodsMgmt.reservationGoodsHistory.grid.field.sysModId',            // 수정자
    sysModDtm          : 'reservationGoodsMgmt.reservationGoodsHistory.grid.field.sysModDtm'            // 수정일시
});

$.namespace("reservationGoodsHistoryGrid.settings");
reservationGoodsHistoryGrid.settings = {
    fields:[
        {fieldName : "rsvStrtDtm"},
        {fieldName : "rsvEndDtm"},
        {fieldName : "fwdidcPrarDy"},
        {fieldName : "rsvEndAfProcMethNm"},
        {fieldName : "rsvStopYn"},
        {fieldName : "rsvStopCausNm"},
        {fieldName : "sysModId"},
        {fieldName : "sysModDtm"}
    ],
    columns:[{
        name : "rsvStrtDtm",
        fieldName : "rsvStrtDtm",
        header : {
            text : col.rsvStrtDtm
        },
        width : 150
    }, {
        name : "rsvEndDtm",
        fieldName : "rsvEndDtm",
        header : {
            text : col.rsvEndDtm
        },
        width : 150
    }, {
        name : "fwdidcPrarDy",
        fieldName : "fwdidcPrarDy",
        header : {
            text : col.fwdidcPrarDy
        },
        width : 150
    }, {
        name : "rsvEndAfProcMethNm",
        fieldName : "rsvEndAfProcMethNm",
        header : {
            text : col.rsvEndAfProcMethCd
        },
        width : 150
    }, {
        name : "rsvStopYn",
        fieldName : "rsvStopYn",
        header : {
            text : col.rsvStopYn
        },
        width : 80
    },{
        name : "rsvStopCausNm",
        fieldName : "rsvStopCausNm",
        header : {
            text : col.rsvStopCausCd
        },
        width : 150
    },{
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 80
    },{
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 150
    }],
    validations : [

    ],
    props : {
        width : "100%",
        height : "300px",
        crud : false,
        fitStyle : "evenFill",
        sumRowVisible : false,
        checkbox : false,
        action : _baseUrl + "goods/ReservationGoodsMgmt.getReservationGoodsHistory.do"
    }
};
