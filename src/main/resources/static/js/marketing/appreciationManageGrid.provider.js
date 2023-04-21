var col = x2coMessage.getMessage( {
    aeNo         : "appreciationEventMgmt.appreciate.manage.grid.aeNo",         // 사은행사번호
    aeNm         : "appreciationEventMgmt.appreciate.manage.grid.aeNm",         // 사은행사명
    addEvtTypCd  : "appreciationEventMgmt.appreciate.manage.grid.addEvtTypCd",  // 사은행사유형
    aePrgsStatCd : "appreciationEventMgmt.appreciate.manage.grid.aePrgsStatCd", // 사은행사상태
    aeStrDtm     : "appreciationEventMgmt.appreciate.manage.grid.aeStrDtm",     // 사은행사시작일시
    aeEndDtm     : "appreciationEventMgmt.appreciate.manage.grid.aeEndDtm",     // 사은행사종료일시
    sysModId     : "adminCommon.label.sys.mod.id",     // 수정자
    sysModDtm    : "adminCommon.label.sys.mod.date"     // 수정일시
});

$.namespace("appreciationManageGrid.settings");
appreciationManageGrid.settings = {
    fields:[{
        fieldName : "aeNo"
    },{
        fieldName : "aeNm"
    },{
        fieldName : "addEvtTypCd"
    },{
        fieldName : "addEvtTypNm"
    },{
        fieldName : "aePrgsStatCd"
    },{
        fieldName : "aePrgsStatNm"
    },{
        fieldName : "aeStrDtm"
    },{
        fieldName : "aeEndDtm"
    },{
        fieldName : "sysModId"
    },{
        fieldName : "sysModDtm"
    }],
    columns:[{
        name : "aeNo",
        fieldName : "aeNo",
        header : {
            text : col.aeNo
        },
        width : 80,
        styleName : "column-underline-c"
    }, {
        name : "aeNm",
        fieldName : "aeNm",
        header : {
            text : col.aeNm
        },
        width : 200,
        styleName : "column-underline-l"
    }, {
        name : "addEvtTypCd",
        fieldName : "addEvtTypCd",
        header : {
            text : col.addEvtTypCd
        },
        visible:false
    }, {
        name : "addEvtTypNm",
        fieldName : "addEvtTypNm",
        header : {
            text : col.addEvtTypCd
        },
        width : 140
    }, {
        name : "aePrgsStatCd",
        fieldName : "aePrgsStatCd",
        header : {
            text : col.aePrgsStatCd
        },
        visible:false
    }, {
        name : "aePrgsStatNm",
        fieldName : "aePrgsStatNm",
        header : {
            text : col.aePrgsStatCd
        },
        width : 100
    }, {
        name : "aeStrDtm",
        fieldName : "aeStrDtm",
        header : {
            text : col.aeStrDtm
        },
        width : 140
    }, {
        name : "aeEndDtm",
        fieldName : "aeEndDtm",
        header : {
            text : col.aeEndDtm
        },
        width : 140
    },{
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 130
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 140
    }],
    validations : [
        // { fieldName : "bwNm", criteria : "value === undefined || value.trim() === ''"  , error : { level : "error", message : _bwNmMessage } }
    ],
    props : {
        paging : true,
        // height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        autoFitHeight : true,
        checkbox : false,
        stateBar : false,
        crud : false,
        sumRowVisible : false,
        form : "appreciationManageGridForm",
        action : _baseUrl + "marketing/appreciationEventMgmt.getAppreciationEventList.do"
    }
};
