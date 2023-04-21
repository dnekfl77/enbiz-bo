var col = x2coMessage.getMessage( {
    svcAgrTypNm    : 'customerMgmt.customerTermsAgreeHistoryPopup.termsAgreeHistory.grid.svcAgrTypNm'
    ,agrYn         : 'customerMgmt.customerTermsAgreeHistoryPopup.termsAgreeHistory.grid.agrYn'
    ,sysRegDtm      : 'customerMgmt.customerTermsAgreeHistoryPopup.termsAgreeHistory.grid.sysRegDtm'
});

$.namespace("customerTermsAgreeHistoryGrid.settings");
customerTermsAgreeHistoryGrid.settings = {
    fields : [
        { fieldName: 'svcAgrTypNm'}
        ,{ fieldName: 'agrYn'}
        ,{ fieldName: 'sysRegDtm'}
    ]
    ,columns : [
        {
            //상품고시품목코드
            name: 'svcAgrTypNm'
            ,fieldName: 'svcAgrTypNm'
            ,width: '120'
            ,header: { text: col.svcAgrTypNm }
        }
        ,{
            //상품고시품목코드명
            name: 'agrYn'
            ,fieldName: 'agrYn'
            ,width: '90'
            ,header: { text: col.agrYn }
        }
        ,{
            //사용여부
            name: 'sysRegDtm'
            ,fieldName: 'sysRegDtm'
            ,width: '120'
            ,header: { text: col.sysRegDtm }
        }
    ]
    ,props : {
        form : "customerTermsAgreeHistoryGridForm"       // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "customer/customerMgmt.getCustomerTermsAgreeHistory.do"     // Request URL
        ,width : "100%"             // 그리드 설정 - 넓이 설정(default = 100%)
        ,height : 200               // 그리드 설정 - 높이 설정(default = 자동설정)
        ,autoFitHeight : false       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,popup : false               // 그리드 설정 - 팝업 자동 resize
        ,crud : false               // 그리드 설정 - 상태 필드 노출 여부
        ,checkbox : false           // 그리드 설정 - 체크박스 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false             // 페이지네이션 사용 여부
        ,fitStyle : 'none'      // 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화 여부
    }
};