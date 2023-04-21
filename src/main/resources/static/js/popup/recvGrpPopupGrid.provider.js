const recvGrpPopupMsg = x2coMessage.getMessage( {
	_recvGrpNo : "boardMgmt.grid.header.label.recvGrpNo"
	, _recvGrpNm : "boardMgmt.grid.header.label.recvGrpNm"
});

$.namespace("recvGrpPopupGrid.settings");
recvGrpPopupGrid.settings = {
    fields:[{
        fieldName : "recvGrpNo"
    },{
        fieldName : "recvGrpNm"
    }],
    columns:[{
        name : "recvGrpNo",
        fieldName : "recvGrpNo",
        header : {
            text : recvGrpPopupMsg._recvGrpNo
        },
        width : 100
    }, {
        name : "recvGrpNm",
        fieldName : "recvGrpNm",
        header : {
            text : recvGrpPopupMsg._recvGrpNm
        },
        width : 180
    }],
    props : {
        paging : true,
        autoFitHeight : true,     // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        popup : true,             // 그리드 설정 - 팝업 자동 resize
        sumRowVisible : false,      // 그리드 설정 - 하단 합계 영역 노출 여부
        checkbox : true,          // 그리드 설정 - 체크박스 필드 노출 여부
        crud : false,             // 그리드 설정 - 상태 필드 노출 여부
        form : "recvGrpPopupGridForm",    // 서버로 전달할 데이터 Form ID값
        action : _baseUrl + "popup/boardManagement.getRecvGrpList.do" // Request URL
    }
};
