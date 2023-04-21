var col = x2coMessage.getMessage( {
     cd      : 'baseInfoMgmt.label.popup.goodsNotiLisartCdList.grid.field.cd'
    ,cdNm    : 'baseInfoMgmt.label.popup.goodsNotiLisartCdList.grid.field.cdNm'
});

$.namespace("gnlcGrid.settings");
gnlcGrid.settings = {
    fields : [
        { fieldName: 'cd',      dataType: "text"  },
        { fieldName: 'cdNm',    dataType: "text"  },
        { fieldName: 'useYn',   dataType: "text"  }
    ]
    ,columns : [{
        //상품고시품목코드
        name: 'cd',
        fieldName: 'cd',
        width: '120',
        header: { text: col.cd }
    },
    {
        //상품고시품목코드명
        name: 'cdNm',
        fieldName: 'cdNm',
        width: '320',
        styleName: 'left-column',
        header: { text: col.cdNm }
    },
    {
        //사용여부
        name: 'useYn',
        fieldName: 'useYn',
        visible: false
    }]
    ,props : {
        form : "gnlcGridForm"       // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + ""     // Request URL
        ,popup : true               // 그리드 설정 - 팝업 자동 resize
        ,checkbox : false           // 그리드 설정 - 체크박스 필드 노출 여부
        ,height : 368               // 그리드 설정 - 높이 설정
        ,crud : false               // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false             // 페이지네이션 사용 여부
    }
};