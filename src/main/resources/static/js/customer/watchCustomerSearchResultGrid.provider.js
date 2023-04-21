var col = x2coMessage.getMessage( {
    mbrNo			 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.mbrNo"
    ,mbrNm			 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.mbrNm"
    ,mbrId			 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.mbrId"
    ,mgrGbNm		 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.mgrGbNm"
    ,mgrTypNm		 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.mgrTypNm"
    ,regCausCont	 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.regCausCont"
    ,ordNo			 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.ordNo"
    ,regDtm			 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.regDtm"
    ,mgrMbrRegId	 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.mgrMbrRegId"
    ,rvcDtm			 : "watchCustomerMgmt.watchCustomerManagementView.result.grid.rvcDtm"
    ,mgrMbrRvcId     : "watchCustomerMgmt.watchCustomerManagementView.result.grid.mgrMbrRvcId"
});

$.namespace("watchCustomerSearchResultGrid.settings");
watchCustomerSearchResultGrid.settings = {
    fields : [
        { fieldName:  "mgrMbrNo" }
        ,{ fieldName:  "mbrNo" }
        ,{ fieldName: "mbrNm" }
        ,{ fieldName: "mbrId" }
        ,{ fieldName: "mgrGbNm" }
        ,{ fieldName: "mgrTypNm" }
        ,{ fieldName: "regCausCont" }
        ,{ fieldName: "ordNo" }
        ,{ fieldName: "regDtm" }
        ,{ fieldName: "mgrMbrRegId" }
        ,{ fieldName: "rvcDtm" }
        ,{ fieldName: "mgrMbrRvcId" }
    ]
    ,columns : [
        {
            name: 'mgrMbrNo'
            ,fieldName: 'mgrMbrNo'
            ,width: '10'
            ,visible: false
        }
        ,{
            name: 'mbrNo'
            ,fieldName: 'mbrNo'
            ,width: '100'
            ,header: { text: col.mbrNo }
            ,styleName : "column-underline-c"
        }
        ,{
            name: 'mbrNm'
            ,fieldName: 'mbrNm'
            ,width: '100'
            ,header: { text: col.mbrNm }
            ,styleName : "column-underline-c"
        }
        ,{
            name: 'mbrId',
            fieldName: 'mbrId',
            width: '100',
            header: { text: col.mbrId }
        }
        ,{
            name: 'mgrGbNm'
            ,fieldName: 'mgrGbNm'
            ,width: '100'
            ,header: { text: col.mgrGbNm }
        }
        ,{
            name: 'mgrTypNm'
            ,fieldName: 'mgrTypNm'
            ,width: '100'
            ,header: { text: col.mgrTypNm }
        }
        ,{
            name: 'regCausCont'
            ,fieldName: 'regCausCont'
            ,width: '300'
            ,styleName: 'left-column'
            ,header: { text: col.regCausCont }
        }
        ,{
            name: 'ordNo'
            ,fieldName: 'ordNo'
            ,width: '120'
            ,header: { text: col.ordNo }
        }
        ,{
            name: 'regDtm'
            ,fieldName: 'regDtm'
            ,width: '120'
            ,header: { text: col.regDtm }
        }
        ,{
            name: 'mgrMbrRegId'
            ,fieldName: 'mgrMbrRegId'
            ,width: '80'
            ,header: { text: col.mgrMbrRegId }
        }
        ,{
            name: 'rvcDtm'
            ,fieldName: 'rvcDtm'
            ,width: '120'
            ,header: { text: col.rvcDtm }
        }
        ,{
            name: 'mgrMbrRvcId'
            ,fieldName: 'mgrMbrRvcId'
            ,width: '80'
            ,header: { text: col.mgrMbrRvcId }
        }
    ]
    ,validations : []
    ,props : {
        form : "watchCustomerSearchGridForm"                         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "customer/watchCustomerMgmt.getWatchCustomerList.do" // Request URL
        ,autoFitHeight : true   // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,sumRowVisible : false  // 그리드 설정 - 하단 합계 영역 노출 여부
        ,popup : false          // 그리드 설정 - 팝업 자동 resize
        ,crud : true           // 그리드 설정 - cud 상태 컬럼 노출 여부
        ,checkbox : true       // 그리드 설정 - 체크박스 필드 노출 여부
        ,fitStyle : 'none'      // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
        ,paging : true          // 페이지네이션 사용 여부
    }
};