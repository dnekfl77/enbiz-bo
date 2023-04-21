var col = x2coMessage.getMessage( {
    siteNo    : 'baseInfoMgmt.label.popup.site.siteNo',
    siteNm    : 'baseInfoMgmt.label.popup.site.siteNm',
    trdStrtDt : 'baseInfoMgmt.label.popup.site.trdStrtDt',
    trdEndDt  : 'baseInfoMgmt.label.popup.site.trdEndDt'
});

$.namespace("sitePopGrid.settings");
sitePopGrid.settings = {
    fields : [
        { fieldName: 'siteNo',     dataType: "text"  },
        { fieldName: 'siteNm',     dataType: "text"  },
        { fieldName: 'trdStrtDt',  dataType: "text"  },
        { fieldName: 'trdEndDt',   dataType: "text"  }
    ]
    ,columns : [{
        //사이트번호
        name: 'siteNo',
        fieldName: 'siteNo',
        width: '100',
        header: {
            text: col.siteNo
        },
        visible: false
    },{
       //사이트명
       name: 'siteNm',
       fieldName: 'siteNm',
       width: '100',
       header: {
           text: col.siteNm
       }
    },{
       //거래시작일자
       name: 'trdStrtDt',
       fieldName: 'trdStrtDt',
       width: '100',
       header: {
           text: col.trdStrtDt
       }
    },{
       //거래종료일자
       name: 'trdEndDt',
       fieldName: 'trdEndDt',
       width: '100',
       header: {
           text: col.trdEndDt
       }
    }]
    ,props : {
        form : "sitePopGridForm"       // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + ""     // Request URL
        ,popup : true             // 그리드 설정 - 팝업 자동 resize
        ,checkbox : false           // 그리드 설정 - 체크박스 필드 노출 여부
        ,height : 360               // 그리드 설정 - 높이 설정(default = 자동설정)
        ,crud : false             // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false             // 페이지네이션 사용 여부
        // ,defrow : 100            // 페이지네이션 - 그리드 영역에 보여질 행 수
        // ,rows : _defaultPage     // 페이지네이션 - 그리드 default 페이지 번호
    }
};