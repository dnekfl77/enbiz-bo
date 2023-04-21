var col = x2coMessage.getMessage({
    ccnNo        : "integratedCounselMgmt.integratedCounseling.grid.label.ccnNo", //상담번호
    accpDtm      : "integratedCounselMgmt.integratedCounseling.grid.label.accpDtm", //접수일시
    ccnPrgsStatCd: "integratedCounselMgmt.integratedCounseling.grid.label.ccnPrgsStatCd", //처리상태
    custCnslGbCd : "integratedCounselMgmt.integratedCounseling.grid.label.custCnslGbCd", //상담구분
    accpTypCd    : "integratedCounselMgmt.integratedCounseling.grid.label.accpTypCd", //접수유형
    cnslTypNo    : "integratedCounselMgmt.integratedCounseling.grid.label.cnslTypNo", //상담유형
    accpMediaCd  : "integratedCounselMgmt.integratedCounseling.grid.label.accpMediaCd", //접수매체
    mbrId        : "integratedCounselMgmt.integratedCounseling.grid.label.mbrId", //회원ID
    mbrNm        : "integratedCounselMgmt.integratedCounseling.grid.label.mbrNm", //회원명
    acptmnNm     : "integratedCounselMgmt.integratedCounseling.grid.label.acptmnNm", //접수자
    procmnNm     : "integratedCounselMgmt.integratedCounseling.grid.label.procmnNm", //처리자
    quotDtm      : "integratedCounselMgmt.integratedCounseling.grid.label.quotDtm", //할당일시
    fnshmnNm     : "integratedCounselMgmt.integratedCounseling.grid.label.fnshmnNm", //완료자
    fnshDtm      : "integratedCounselMgmt.integratedCounseling.grid.label.fnshDtm" //완료일시
});

$.namespace("integratedCounselingGrid.settings");
integratedCounselingGrid.settings = {
    fields: [
        {fieldName: "ccnNo"},
        {fieldName: "accpDtm"},
        {fieldName: "ccnPrgsStatCd"},
        {fieldName: "custCnslGbCd"},
        {fieldName: "accpTypCd"},
        {fieldName: "cnslTypText"},
        {fieldName: "accpMediaCd"},
        {fieldName: "mbrId"},
        {fieldName: "mbrNm"},
        {fieldName: "acptmnNm"},
        {fieldName: "procmnNm"},
        {fieldName: "quotDtm"},
        {fieldName: "fnshmnNm"},
        {fieldName: "fnshDtm"},
    ],
    columns : [{
        name : "ccnNo",
        fieldName : "ccnNo",
        header : {
            text : col.ccnNo
        },
        editable: false
    },{
        name : "accpDtm",
        fieldName : "accpDtm",
        header : {
            text : col.accpDtm
        },
        editable: false,
        width: 150
    },{
        name : "ccnPrgsStatCd",
        fieldName : "ccnPrgsStatCd",
        header : {
            text : col.ccnPrgsStatCd
        },
        editable: false
    },{
        name : "custCnslGbCd",
        fieldName : "custCnslGbCd",
        header : {
            text : col.custCnslGbCd
        },
        editable: false
    },{
        name : "accpTypCd",
        fieldName : "accpTypCd",
        header : {
            text : col.accpTypCd
        },
        editable: false
    },{
        name : "cnslTypText",
        fieldName : "cnslTypText",
        header : {
            text : col.cnslTypNo
        },
        editable: false,
        width: 200
    },{
        name : "accpMediaCd",
        fieldName : "accpMediaCd",
        header : {
            text : col.accpMediaCd
        },
        editable: false
    },{
        name : "mbrId",
        fieldName : "mbrId",
        header : {
            text : col.mbrId
        },
        editable: false
    },{
        name : "mbrNm",
        fieldName : "mbrNm",
        header : {
            text : col.mbrNm
        },
        editable: false
    },{
        name : "acptmnNm",
        fieldName : "acptmnNm",
        header : {
            text : col.acptmnNm
        },
        editable: false
    },{
        name : "procmnNm",
        fieldName : "procmnNm",
        header : {
            text : col.procmnNm
        },
        editable: false
    },{
        name : "quotDtm",
        fieldName : "quotDtm",
        header : {
            text : col.quotDtm
        },
        editable: false
    },{
        name : "fnshmnNm",
        fieldName : "fnshmnNm",
        header : {
            text : col.fnshmnNm
        },
        editable: false
    },{
        name : "fnshDtm",
        fieldName : "fnshDtm",
        header : {
            text : col.fnshDtm
        },
        editable: false
    }],
    validations: [],
    props: {
        form : 'integratedCounselingGridForm',
        width: "100%",
        height : "230px",
        checkbox: true,
        sumRowVisible : false,
        paging: true,
        popup : false,
        action: "/customerservice/integratedCounselMgmt.integratedCounselList.do"
    }
};