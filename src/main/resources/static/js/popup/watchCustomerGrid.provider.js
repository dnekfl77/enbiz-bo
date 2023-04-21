var col = x2coMessage.getMessage( {
    mgrGbNm         : 'watchCustomerMgmt.watchCustomerDetailPopup.result.grid.mgrGbNm'
    ,mgrTypNm       : 'watchCustomerMgmt.watchCustomerDetailPopup.result.grid.mgrTypNm'
    ,regCausCont    : 'watchCustomerMgmt.watchCustomerDetailPopup.result.grid.regCausCont'
    ,mgrMbrRegId    : 'watchCustomerMgmt.watchCustomerDetailPopup.result.grid.mgrMbrRegId'
    ,regDtm         : 'watchCustomerMgmt.watchCustomerDetailPopup.result.grid.regDtm'
    ,mgrMbrRvcId    : 'watchCustomerMgmt.watchCustomerDetailPopup.result.grid.mgrMbrRvcId'
    ,rvcDtm         : 'watchCustomerMgmt.watchCustomerDetailPopup.result.grid.rvcDtm'
});

$.namespace("watchCustomerGrid.settings");
watchCustomerGrid.settings = {
    fields : [
        { fieldName: 'mgrMbrNo'}
        ,{ fieldName: 'mgrGbNm'}
        ,{ fieldName: 'mgrTypNm'}
        ,{ fieldName: 'regCausCont'}
        ,{ fieldName: 'mgrMbrRegId'}
        ,{ fieldName: 'regDtm'}
        ,{ fieldName: 'mgrMbrRvcId'}
        ,{ fieldName: 'rvcDtm'}
    ]
    ,columns : [
        {
            name: 'mgrMbrNo'
            ,fieldName: 'mgrMbrNo'
            ,width: '10'
            ,visible: false
        }
        ,{
            name: 'mgrGbNm'
            ,fieldName: 'mgrGbNm'
            ,width: '80'
            ,header: { text: col.mgrGbNm }
            ,editable: false
        }
        ,{
            name: 'mgrTypNm'
            ,fieldName: 'mgrTypNm'
            ,width: '80'
            ,header: { text: col.mgrTypNm }
            ,editable: false
        }
        ,{
            name: 'regCausCont'
            ,fieldName: 'regCausCont'
            ,width: '200'
            ,header: { text: col.regCausCont }
            ,editable: false
        }
        ,{
            name: 'mgrMbrRegId'
            ,fieldName: 'mgrMbrRegId'
            ,width: '90'
            ,header: { text: col.mgrMbrRegId }
            ,editable: false
        }
        ,{
            name: 'regDtm'
            ,fieldName: 'regDtm'
            ,width: '120'
            ,header: { text: col.regDtm }
            ,editable: false
        }
        ,{
            name: 'mgrMbrRvcId'
            ,fieldName: 'mgrMbrRvcId'
            ,width: '90'
            ,header: { text: col.mgrMbrRvcId }
            ,editable: false
        }
        ,{
            name: 'rvcDtm'
            ,fieldName: 'rvcDtm'
            ,width: '120'
            ,header: { text: col.rvcDtm }
            ,editable: false
        }
    ]
    ,props : {
        form : "watchCustomerGridForm"       // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "customer/watchCustomerMgmt.getWatchCustomerInfo.do"     // Request URL
        ,width : "100%"             // 그리드 설정 - 넓이 설정(default = 100%)
        ,height : 200               // 그리드 설정 - 높이 설정(default = 자동설정)
        ,autoFitHeight : false       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,popup : false               // 그리드 설정 - 팝업 자동 resize
        ,crud : false               // 그리드 설정 - 상태 필드 노출 여부
        ,checkbox : true           // 그리드 설정 - 체크박스 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false             // 페이지네이션 사용 여부
        ,fitStyle : 'none'      // 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화 여부
    }
};