var col = x2coMessage.getMessage( {
    zipNoSeq 		: "baseInfoMgmt.realgrid.popup.zipNoListPopup.grid.field.zipNo",  //우편번호순번
    zipNo 		: "baseInfoMgmt.realgrid.popup.zipNoListPopup.grid.field.zipNo",  //우편번호
    roadNm  	: "baseInfoMgmt.realgrid.popup.zipNoListPopup.grid.field.roadNm", //도로명
});

$.namespace("zipNoListGrid.settings");
zipNoListGrid.settings = {
    fields:[{
        fieldName : "zipNoSeq"
    },{
        fieldName : "zipNo"
    },{
        fieldName : "address"
    }],
    columns:[{
        name : "zipNoSeq",
        fieldName : "zipNoSeq",
        header : {
            text : col.zipNoSeq
        },
        visible: false
    }, {
        name : "zipNo",
        fieldName : "zipNo",
        header : {
            text : col.zipNo
        },
        width : 100
    }, {
        name : "address",
        fieldName : "address",
        header : {
            text : col.roadNm
        },
        width : 300,
        styleName : "left-column"
    }],
    props : {
        paging : true,
        autoFitHeight : true,     // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        popup : true,             // 그리드 설정 - 팝업 자동 resize
        sumRowVisible : false,      // 그리드 설정 - 하단 합계 영역 노출 여부
        checkbox : true,          // 그리드 설정 - 체크박스 필드 노출 여부
        crud : false,             // 그리드 설정 - 상태 필드 노출 여부
        form : "zipNoGridListForm",    // 서버로 전달할 데이터 Form ID값
        action : _baseUrl + "popup/zipCodeMgmtPopup.getZipNoPopupList.do" // Request URL
    }
};
