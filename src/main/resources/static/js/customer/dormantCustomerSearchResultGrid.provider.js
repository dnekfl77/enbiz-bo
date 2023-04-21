var col = x2coMessage.getMessage( {
    mbrNo        : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.mbrNo"
    ,mbrGradeNm  : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.mbrGradeNm"
    ,loginId     : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.loginId"
    ,mbrNm       : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.mbrNm"
    ,mbrMgrNm    : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.mbrMgrNm"
    ,mbrStatNm   : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.mbrStatNm"
    ,cellNo      : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.cellNo"
    ,emailAddr   : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.emailAddr"
    ,sysModDtm   : "dormantCustomerInquiry.dormantCustomerManagementView.result.grid.sysModDtm"
});

$.namespace("dormantCustomerSearchResultGrid.settings");
dormantCustomerSearchResultGrid.settings = {
    fields : [
        { fieldName: "mbrNo"        , dataType: "text" }
        ,{ fieldName: "mbrGradeNm"   , dataType: "text" }
        ,{ fieldName: "loginId"      , dataType: "text" }
        ,{ fieldName: "mbrNm"        , dataType: "text" }
        ,{ fieldName: "mbrMgrNm"     , dataType: "text" }
        ,{ fieldName: "mbrStatNm"    , dataType: "text" }
        ,{ fieldName: "cellNo"       , dataType: "text" }
        ,{ fieldName: "emailAddr"    , dataType: "text" }
        ,{ fieldName: "sysModDtm"    , dataType: "text" }
    ]
    ,columns : [
        {
            name: 'mbrNo'
            ,fieldName: 'mbrNo'
            ,width: '100'
            ,header: { text: col.mbrNo }
//            ,styleName : "column-underline-c"
        }
        ,{
            name: 'mbrGradeNm',
            fieldName: 'mbrGradeNm',
            width: '100',
            header: { text: col.mbrGradeNm }
        }
        ,{
            name: 'loginId'
            ,fieldName: 'loginId'
            ,width: '100'
            ,header: { text: col.loginId }
        }
        ,{
            name: 'mbrNm'
            ,fieldName: 'mbrNm'
            ,width: '100'
            ,header: { text: col.mbrNm }
//            ,styleName : "column-underline-c"
        }
        ,{
            name: 'mbrMgrNm'
            ,fieldName: 'mbrMgrNm'
            ,width: '100'
            ,header: { text: col.mbrMgrNm }
        }
        ,{
            name: 'mbrStatNm'
            ,fieldName: 'mbrStatNm'
            ,width: '80'
            ,header: { text: col.mbrStatNm }
        }
        ,{
            name: 'cellNo'
            ,fieldName: 'cellNo'
            ,width: '120'
            ,header: { text: col.cellNo }
        }
        ,{
            name: 'emailAddr'
            ,fieldName: 'emailAddr'
            ,width: '150'
            ,styleName: 'left-column'
            ,header: { text: col.emailAddr }
        }
        ,{
            name: 'sysModDtm'
            ,fieldName: 'sysModDtm'
            ,width: '150'
            ,styleName: 'disable-column'
            ,header: { text: col.sysModDtm }
        }
    ]
    ,validations : []
    ,props : {
        form : "dormantCustomerSearchGridForm"                         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "customer/dormantCustomerInquiry.getDormantCustomerBySearchCondition.do" // Request URL
        ,autoFitHeight : true   // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,sumRowVisible : false  // 그리드 설정 - 하단 합계 영역 노출 여부
        ,popup : false          // 그리드 설정 - 팝업 자동 resize
        ,crud : false           // 그리드 설정 - cud 상태 컬럼 노출 여부
        ,checkbox : false       // 그리드 설정 - 체크박스 필드 노출 여부
        ,fitStyle : 'evenFill'      // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
        ,paging : true          // 페이지네이션 사용 여부
    }
};