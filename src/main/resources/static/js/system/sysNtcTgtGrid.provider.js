$.namespace("sysNtcTgtGrid.settings")

sysNtcTgtGrid.settings = {
    fields: [
        {fieldName: "userId"},
        {fieldName: "userNm"},
        {fieldName: "orgTypNm"},
        {fieldName: "workStatNm"}
    ],
    columns: [
        {
            name: "userId",
            fieldName: "userId",
            header: {
                text: msg._userId
            },
            editable : false,
            width: 150,
        },
        {
            name: "userNm",
            fieldName: "userNm",
            header: {
                text: msg._userNm
            },
            editable : false,
            width: 150,
        },
        {
            name: "orgTypNm",
            fieldName: "orgTypNm",
            header: {
                text: msg._jobGrpNm
            },
            editable : false,
            width: 150,
        },
        {
            name: "workStatNm",
            fieldName: "workStatNm",
            header: {
                text: msg._workStatNm
            },
            editable : false,
            width: 150,
        }
    ],
    validations: [{}],
    props: {
        checkbox: true,
        width: "100%",
        fitStyle : "evenFill",
        height : "200px", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        crud: _bbInfo && _bbInfo.stSysBbInfo && _bbInfo.stSysBbInfo.bbcNo,
        sumRowVisible: false,
        action: "/system/systemNoticeMgmt.getSystemNoticeTargetInfoList.do",
        saveAction: "/system/systemNoticeMgmt.saveSystemNotice.do"
    }
}