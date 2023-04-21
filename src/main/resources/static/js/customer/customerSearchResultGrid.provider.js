var col = x2coMessage.getMessage( {
    _mbrNo        : "customerMgmt.customerManagementView.result.grid.mbrNo"
    ,_mbrMgrNm   : "customerMgmt.customerManagementView.result.grid.mbrMgrNm"
    ,_mbrGradeNm : "customerMgmt.customerManagementView.result.grid.mbrGradeNm"
    ,_mbrNm      : "customerMgmt.customerManagementView.result.grid.mbrNm"
    ,_mbrStatNm  : "customerMgmt.customerManagementView.result.grid.mbrStatNm"
    ,_loginId    : "customerMgmt.customerManagementView.result.grid.loginId"
    ,_emailAddr  : "customerMgmt.customerManagementView.result.grid.emailAddr"
    ,_cellNo     : "customerMgmt.customerManagementView.result.grid.cellNo"
    ,_address    : "customerMgmt.customerManagementView.result.grid.address"
    ,_sysRegDtm  : "customerMgmt.customerManagementView.result.grid.sysRegDtm"
    ,_sysModId   : "customerMgmt.customerManagementView.result.grid.sysModId"
    ,_sysModDtm  : "customerMgmt.customerManagementView.result.grid.sysModDtm"
});

$.namespace("customerSearchResultGrid.settings");
customerSearchResultGrid.settings = {
    fields : [
        { fieldName: "mbrNo"        , dataType: "text" }
        ,{ fieldName: "mbrMgrNm"     , dataType: "text" }
        ,{ fieldName: "mbrGradeNm"   , dataType: "text" }
        ,{ fieldName: "mbrNm"        , dataType: "text" }
        ,{ fieldName: "mbrStatNm"    , dataType: "text" }
        ,{ fieldName: "loginId"      , dataType: "text" }
        ,{ fieldName: "emailAddr"    , dataType: "text" }
        ,{ fieldName: "cellNo"       , dataType: "text" }
        ,{ fieldName: "address"      , dataType: "text" }
        ,{ fieldName: "sysRegDtm"    , dataType: "text" }
        ,{ fieldName: "sysModId"     , dataType: "text" }
        ,{ fieldName: "sysModDtm"    , dataType: "text" }
    ]
    ,columns : [
        {
            name: 'mbrNo'
            ,fieldName: 'mbrNo'
            ,width: '80'
            ,header: { text: col._mbrNo }
            ,styleName : "column-underline-c"
        }
        ,{
            name: 'mbrMgrNm'
            ,fieldName: 'mbrMgrNm'
            ,width: '80'
            ,header: { text: col._mbrMgrNm }
        }
        ,{
            name: 'mbrGradeNm',
            fieldName: 'mbrGradeNm',
            width: '80',
            header: { text: col._mbrGradeNm }
        }
        ,{
            name: 'mbrNm'
            ,fieldName: 'mbrNm'
            ,width: '80'
            ,header: { text: col._mbrNm }
            ,styleName : "column-underline-c"
        }
        ,{
            name: 'mbrStatNm'
            ,fieldName: 'mbrStatNm'
            ,width: '80'
            ,header: { text: col._mbrStatNm }
        }
        ,{
            name: 'loginId'
            ,fieldName: 'loginId'
            ,width: '80'
            ,header: { text: col._loginId }
        }
        ,{
            name: 'emailAddr'
            ,fieldName: 'emailAddr'
            ,width: '120'
            ,styleName: 'left-column'
            ,header: { text: col._emailAddr }
        }
        ,{
            name: 'cellNo'
            ,fieldName: 'cellNo'
            ,width: '100'
            ,header: { text: col._cellNo }
        }
        ,{
            name: 'address'
            ,fieldName: 'address'
            ,width: '150'
            ,styleName: 'left-column'
            ,header: { text: col._address }
        }
        ,{
            name: 'sysRegDtm'
            ,fieldName: 'sysRegDtm'
            ,width: '120'
            ,header: { text: col._sysRegDtm }
        }
        ,{
            name: 'sysModId'
            ,fieldName: 'sysModId'
            ,width: '80'
            ,styleName: 'disable-column'
            ,header: { text: col._sysModId }
        }
        ,{
            name: 'sysModDtm'
            ,fieldName: 'sysModDtm'
            ,width: '120'
            ,styleName: 'disable-column'
            ,header: { text: col._sysModDtm }
        }
    ]
    ,validations : []
    ,props : {
        form : "customerSearchGridForm"                         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "customer/customerMgmt.getCustomerList.do" // Request URL
        ,autoFitHeight : true   // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,sumRowVisible : false  // 그리드 설정 - 하단 합계 영역 노출 여부
        ,popup : false          // 그리드 설정 - 팝업 자동 resize
        ,crud : false           // 그리드 설정 - cud 상태 컬럼 노출 여부
        ,checkbox : false       // 그리드 설정 - 체크박스 필드 노출 여부
        ,fitStyle : 'none'      // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
        ,paging : true          // 페이지네이션 사용 여부
    }
};