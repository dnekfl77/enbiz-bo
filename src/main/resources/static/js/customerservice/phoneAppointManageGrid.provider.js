var col = x2coMessage.getMessage({
    callState    : "phoneAppointmentMgmt.grid.callState", //전약상태
    prmsDtm      : "phoneAppointmentMgmt.grid.prmsDtm",   //예약일시
    notiTmCd     : "phoneAppointmentMgmt.grid.notiTmCd",  //알림일시
    prmsMethCd   : "phoneAppointmentMgmt.grid.prmsMethCd",//약속방식
    cnslMemo     : "phoneAppointmentMgmt.grid.cnslMemo",  //상담메모
    mbrId        : "phoneAppointmentMgmt.grid.mbrId",     //회원ID
    mbrNm        : "phoneAppointmentMgmt.grid.mbrNm",     //회원명
    telNo        : "phoneAppointmentMgmt.grid.telNo",     //전화번호
    ordNo        : "phoneAppointmentMgmt.grid.ordNo",     //주문번호
    ccnNo        : "phoneAppointmentMgmt.grid.ccnNo",     //상담번호
    sysRegId     : "phoneAppointmentMgmt.grid.sysRegId",  //접수자
    sysRegPart   : "phoneAppointmentMgmt.grid.sysRegPart",//팀/실정보
    aempId       : "phoneAppointmentMgmt.grid.aempId",    //완료자
    aempPart     : "phoneAppointmentMgmt.grid.aempPart",  //팀/실정보
    aempProcDtm  : "phoneAppointmentMgmt.grid.aempProcDtm"//완료일시
});

$.namespace("phoneAppointManageGrid.settings");
phoneAppointManageGrid.settings = {
    fields: [
        {fieldName: "procState"},
        {fieldName: "prmsDtm"},
        {fieldName: "notiTmCd"},
        {fieldName: "prmsMethCd"},
        {fieldName: "cnslMemo"},
        {fieldName: "mbrId"},
        {fieldName: "mbrNm"},
        {fieldName: "telNo"},
        {fieldName: "telRgnNo"},
        {fieldName: "telTxnoNo"},
        {fieldName: "telEndNo"},
        {fieldName: "ordNo"},
        {fieldName: "ccnNo"},
        {fieldName: "acptmnNm"},
        {fieldName: "acptmnDept"},
        {fieldName: "procmnNm"},
        {fieldName: "procmnDept"},
        {fieldName: "aempProcDtm"},
    ],
    columns : [{
        name : "procState",
        fieldName : "procState",
        header : {
            text : col.callState
        },
        editable: false,
        styleName : "column-underline-c"
    },{
        name : "prmsDtm",
        fieldName : "prmsDtm",
        header : {
            text : col.prmsDtm
        },
        editable: false,
        width: 150
    },{
        name : "notiTmCd",
        fieldName : "notiTmCd",
        header : {
            text : col.notiTmCd
        },
        editable: false
    },{
        name : "prmsMethCd",
        fieldName : "prmsMethCd",
        header : {
            text : col.prmsMethCd
        },
        editable: false
    },{
        name : "cnslMemo",
        fieldName : "cnslMemo",
        header : {
            text : col.cnslMemo
        },
        editable: false,
        styleName : "left-column",
        renderer:{
            showTooltip:true
        },
        width: 200
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
        name : "telNo",
        fieldName : "telNo",
        header : {
            text : col.telNo
        },
        editable: false,
        "displayCallback": function(grid,index,value){
            var telRgnNo = grid.getValue(index.itemIndex, "telRgnNo");
            var telTxnoNo = grid.getValue(index.itemIndex, "telTxnoNo");
            var telEndNo = grid.getValue(index.itemIndex, "telEndNo");

            var formattingValue = '';
            formattingValue += telRgnNo === null || telRgnNo === '' ? "" : telRgnNo + "-" ;
            formattingValue += telTxnoNo === null || telTxnoNo === ''  ? "" : telTxnoNo + "-";
            formattingValue += telEndNo === null  || telEndNo === '' ? "" : telEndNo;
            return formattingValue;
        },
        width: 120
    },{
        name : "telRgnNo",
        fieldName : "telRgnNo",
        visible:false
    },{
        name : "telTxnoNo",
        fieldName : "telTxnoNo",
        visible:false
    },{
        name : "telEndNo",
        fieldName : "telEndNo",
        visible:false
    },{
        name : "ordNo",
        fieldName : "ordNo",
        header : {
            text : col.ordNo
        },
        editable: false,
        width: 120
    },{
        name : "ccnNo",
        fieldName : "ccnNo",
        header : {
            text : col.ccnNo
        },
        editable: false
    },{
        name : "acptmnNm",
        fieldName : "acptmnNm",
        header : {
            text : col.sysRegId
        },
        editable: false
    },{
        name : "acptmnDept",
        fieldName : "acptmnDept",
        header : {
            text : col.sysRegPart
        },
        editable: false,
        width: 120
    },{
        name : "procmnNm",
        fieldName : "procmnNm",
        header : {
            text : col.aempId
        },
        editable: false
    },{
        name : "procmnDept",
        fieldName : "procmnDept",
        header : {
            text : col.aempPart
        },
        editable: false,
        width: 120
    },{
        name : "aempProcDtm",
        fieldName : "aempProcDtm",
        header : {
            text : col.aempProcDtm
        },
        editable: false,
        width: 150
    }],
    validations: [],
    props: {
        form : 'phoneAppointManageGridForm',
        autoFitHeight : true,
        sumRowVisible : false,
        paging: true,
        popup : false,
        action: "/customerservice/phoneAppointmentMgmt.getPhoneAppointmentList.do"
    }
};