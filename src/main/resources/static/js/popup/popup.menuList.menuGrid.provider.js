var col = x2coMessage.getMessage( {
    rtTgtSeq : "baseInfoMgmt.label.popup.menuList.rtTgtSeq",  //권한대상순번
    sysGbNm  : "baseInfoMgmt.label.popup.menuList.sysGbCd",   //시스템 구분
    rtTgtNm  : "baseInfoMgmt.label.popup.menuList.rtTgtNm",   //메뉴명
    custInfoInclYn : "baseInfoMgmt.label.popup.menuList.custInfoInclYn", //고객정보포함여부
    useYn    : "baseInfoMgmt.label.popup.menuList.useYn",     //사용여부
});

$.namespace("menuGrid.settings");
menuGrid.settings = {
    fields:[{
        fieldName : "rtTgtSeq"
    },{
        fieldName : "sysGbNm"
    },{
        fieldName : "rtTgtNm"
    },{
        fieldName : "custInfoInclYn"
    },{
        fieldName : "useYn"
    }],
    columns:[{
        name : "rtTgtSeq",
        fieldName : "rtTgtSeq",
        header : {
            text : col.rtTgtSeq
        },
        width : 90
    }, {
        name : "sysGbNm",
        fieldName : "sysGbNm",
        header : {
            text : col.sysGbNm
        },
        width : 100
    }, {
        name : "rtTgtNm",
        fieldName : "rtTgtNm",
        header : {
            text : col.rtTgtNm
        },
        width : 220
    }, {
        name : "custInfoInclYn",
        fieldName : "custInfoInclYn",
        header : {
            text : col.custInfoInclYn
        },
        width : 200
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn
        },
        width : 100
    }],
    props : {
        form : "menuGridForm",
        paging : false,
        popup : true,             // 그리드 설정 - 팝업 자동 resize
        height : 300,               // 그리드 설정 - 높이 설정
        sumRowVisible : false,      // 그리드 설정 - 하단 합계 영역 노출 여부
        checkbox : true,          // 그리드 설정 - 체크박스 필드 노출 여부
        crud : false,             // 그리드 설정 - 상태 필드 노출 여부
    }
};
