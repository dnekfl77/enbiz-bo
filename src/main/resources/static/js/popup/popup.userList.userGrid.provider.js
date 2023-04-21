var col = x2coMessage.getMessage( {
    userId 		: "baseInfoMgmt.label.popup.userList.gUserId",     //사용자 ID
    userNm  	: "baseInfoMgmt.label.popup.userList.gUserNm",     //사용자명
    jobGrpCd  	: "baseInfoMgmt.label.popup.userList.gjobGrpCd",   //조직 유형 코드
    orgTypNm  	: "baseInfoMgmt.label.popup.userList.gOrgTypNm",   //조직 유형
    deptNm 		: "baseInfoMgmt.label.popup.userList.gDeptNm",     //부서명
    workStatCd  : "baseInfoMgmt.label.popup.userList.gWorkStatCd", //근무 상태 코드
    workStatNm  : "baseInfoMgmt.label.popup.userList.gWorkStatNm", //근무 상태
    useYn		: "baseInfoMgmt.label.popup.userList.gUseYn"       //사용 여부
});

$.namespace("userGrid.settings");
userGrid.settings = {
    fields:[{
        fieldName : "userId"
    },{
        fieldName : "userNm"
    },{
        fieldName : "jobGrpCd"
    },{
        fieldName : "orgTypNm"
    },{
        fieldName : "deptNm"
    },{
        fieldName : "workStatCd"
    },{
        fieldName : "workStatNm"
    },{
        fieldName : "useYn"
    }],
    columns:[{
        name : "userId",
        fieldName : "userId",
        header : {
            text : col.userId
        },
        width : 100
    }, {
        name : "userNm",
        fieldName : "userNm",
        header : {
            text : col.userNm
        },
        width : 120
    }, {
        name : "jobGrpCd",
        fieldName : "jobGrpCd",
        header : {
            text : col.jobGrpCd
        },
        width : 120,
        visible: false
    }, {
        name : "orgTypNm",
        fieldName : "orgTypNm",
        header : {
            text : col.orgTypNm
        },
        width : 140
    }, {
        name : "120",
        fieldName : "deptNm",
        header : {
            text : col.deptNm
        },
        width : 140
    }, {
        name : "workStatCd",
        fieldName : "workStatCd",
        header : {
            text : col.workStatCd
        },
        width : 100,
        visible: false
    }, {
        name : "workStatNm",
        fieldName : "workStatNm",
        header : {
            text : col.workStatNm
        },
        width : 105
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn
        },
        width : 100
    }],
    props : {
        paging : true,
        autoFitHeight : true,     // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        popup : true,             // 그리드 설정 - 팝업 자동 resize
        sumRowVisible : false,      // 그리드 설정 - 하단 합계 영역 노출 여부
        checkbox : true,          // 그리드 설정 - 체크박스 필드 노출 여부
        crud : false,             // 그리드 설정 - 상태 필드 노출 여부
        form : "userGridForm",    // 서버로 전달할 데이터 Form ID값
        action : _baseUrl + "popup/userMgmtPopup.getUserList.do" // Request URL
    }
};
