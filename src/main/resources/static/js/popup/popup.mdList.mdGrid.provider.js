var col = x2coMessage.getMessage( {
     md_id              : 'baseInfoMgmt.label.popup.mdlist.grid.field.mdId'
    ,md_nm              : 'baseInfoMgmt.label.popup.mdlist.grid.field.mdNm'
    ,md_emp_no          : 'baseInfoMgmt.label.popup.mdlist.grid.field.empNo'
    ,md_dept_nm         : 'baseInfoMgmt.label.popup.mdlist.grid.field.deptNm'
    ,md_work_stat_cd    : 'baseInfoMgmt.label.popup.mdlist.grid.field.workStatCd'
    ,md_use_yn          : 'baseInfoMgmt.label.popup.mdlist.grid.field.useYn'
});

$.namespace("mdGrid.settings");
mdGrid.settings = {
    fields : [
        { fieldName: "userId",      dataType: "text" },
        { fieldName: "userNm",      dataType: "text" },
        { fieldName: "deptNm",      dataType: "text" },
        { fieldName: "workStatNm",  dataType: "text" },
        { fieldName: "useYn",       dataType: "text" }
    ]
    ,columns : [{
            // MD아이디
            name: 'userId',
            fieldName: 'userId',
            visible: false,
            header: { text: col.md_id }
        },
        {
            // MD명
            name: 'userNm',
            fieldName: 'userNm',
            width: '150',
            styleName: 'left-column',
            header: { text: col.md_nm }
        },
        {
            // 부서명
            name: 'deptNm',
            fieldName: 'deptNm',
            width: '150',
            styleName: 'left-column',
            header: { text: col.md_dept_nm }
        },
        {
            // 근무상태
            name: 'workStatNm',
            fieldName: 'workStatNm',
            width: '100',
            header: { text: col.md_work_stat_cd }
        },
        {
            // 사용여부
            name: 'useYn',
            fieldName: 'useYn',
            width: '100',
            header: { text: col.md_use_yn }
        }]
    ,props : {
        form : "mdGridForm"         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "popup/userMgmtPopup.getUserListNoPage.do" // Request URL
        ,autoFitHeight : true       // 그리드 설정 - 사이즈 자동 조정 여부
        ,popup : true               // 그리드 설정 - 팝업 여부
        ,checkbox : true            // 그리드 설정 - 체크박스 필드 노출 여부
        ,fitStyle : "evenFill"      //evenFill : 채우기
        ,crud : false               // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false             // 페이지네이션 사용 여부
    }
};