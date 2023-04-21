var col = x2coMessage.getMessage( {
    _mbr_no          : 'baseInfoMgmt.label.popup.mbrlist.grid.field.mbrNo'
    ,_mbr_gb_nm      : 'baseInfoMgmt.label.popup.mbrlist.grid.field.mbrGbNm'
    ,_login_id       : 'baseInfoMgmt.label.popup.mbrlist.grid.field.loginId'
    ,_mbr_nm         : 'baseInfoMgmt.label.popup.mbrlist.grid.field.mbrNm'
    ,_mbr_grade_nm   : 'baseInfoMgmt.label.popup.mbrlist.grid.field.mbrGradeNm'
    ,_mbr_grade_cd   : 'baseInfoMgmt.label.popup.mbrlist.grid.field.mbrGradeCd'
    ,_mbr_stat_nm    : 'baseInfoMgmt.label.popup.mbrlist.grid.field.mbrStatNm'
    ,_cell_no        : 'baseInfoMgmt.label.popup.mbrlist.grid.field.cellNo'
    ,_tel_no         : 'baseInfoMgmt.label.popup.mbrlist.grid.field.telNo'
    ,_email_addr     : 'baseInfoMgmt.label.popup.mbrlist.grid.field.emailAddr'
});

$.namespace("mbrGrid.settings");
mbrGrid.settings = {
    fields : [
        { fieldName: "mbrNo",       dataType: "text" },
        { fieldName: "mbrGbNm",     dataType: "text" },
        { fieldName: "loginId",     dataType: "text" },
        { fieldName: "mbrGbCd",     dataType: "text" },
        { fieldName: "mbrMgrCd",     dataType: "text" },
        { fieldName: "mbrNm",       dataType: "text" },
        { fieldName: "mbrGradeNm",  dataType: "text" },
        { fieldName: "mbrGradeCd",  dataType: "text" },
        { fieldName: "mbrStatNm",   dataType: "text" },
        { fieldName: "cellNo",   dataType: "text" },
        { fieldName: "telNo",    dataType: "text" },
        { fieldName: "emailAddr",   dataType: "text" },
        { fieldName: "telRgnNo",   dataType: "text" },
        { fieldName: "telTxnoNo",   dataType: "text" },
        { fieldName: "telEndNo",   dataType: "text" },
        { fieldName: "cellSctNo",   dataType: "text" },
        { fieldName: "cellTxnoNo",   dataType: "text" },
        { fieldName: "cellEndNo",   dataType: "text" },
        { fieldName: "zipNoSeq",   dataType: "text" },
        { fieldName: "zipNo",   dataType: "text" },
        { fieldName: "zipAddr",   dataType: "text" },
        { fieldName: "dtlAddr",   dataType: "text" },
    ]
    ,columns : [{
            name: 'mbrNo',
            fieldName: 'mbrNo',
            visible: false,
            header: { text: col._mbr_no }
        },
        {
            name: 'mbrGbNm',
            fieldName: 'mbrGbNm',
            width: '80',
            header: { text: col._mbr_gb_nm }
        },
        {
            name: 'loginId',
            fieldName: 'loginId',
            width: '90',
            styleName: 'left-column',
            header: { text: col._login_id }
        },
        {
            name: 'mbrNm',
            fieldName: 'mbrNm',
            width: '80',
            header: { text: col._mbr_nm }
        },
        {
            name: 'mbrGradeNm',
            fieldName: 'mbrGradeNm',
            width: '80',
            styleName: 'left-column',
            header: { text: col._mbr_grade_nm }
        },
        {
            name: 'mbrGradeCd',
            fieldName: 'mbrGradeCd',
            width: '80',
            styleName: 'left-column',
            visible: false,
            header: { text: col._mbr_grade_cd }
        },
        {
            name: 'mbrStatNm',
            fieldName: 'mbrStatNm',
            width: '80',
            header: { text: col._mbr_stat_nm }
        },
        {
            name: 'cellNo',
            fieldName: 'cellNo',
            width: '120',
            header: { text: col._cell_no }
        },
        {
            name: 'telNo',
            fieldName: 'telNo',
            width: '120',
            header: { text: col._tel_no }
        },
        {
            name: 'emailAddr',
            fieldName: 'emailAddr',
            width: '200',
            header: { text: col._email_addr }
        }]
    ,validations : [

    ]
    ,props : {
        form : "mbrGridForm"         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "popup/memberSearch.getMemberList.do" // Request URL
        ,autoFitHeight : true       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,popup : true               // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true            // 그리드 설정 - 체크박스 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
//        ,fitStyle : 'evenFill'      // 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화 여부
        ,paging : true              // 페이지네이션 사용 여부
        ,defrow : 10
    }
};