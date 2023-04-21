var col = x2coMessage.getMessage( {
    brand_no      : 'baseInfoMgmt.label.popup.brandList.brandNo'
    ,brand_nm     : 'baseInfoMgmt.label.popup.brandList.brandNm'
    ,eng_brand_nm : 'baseInfoMgmt.label.popup.brandList.engBrandNm'
    ,use_yn       : 'baseInfoMgmt.label.popup.brandList.useYn'
    ,sys_mod_id   : 'baseInfoMgmt.label.popup.brandList.sysModId'
    ,sys_mod_dtm  : 'baseInfoMgmt.label.popup.brandList.sysModDtm'
});

$.namespace("brandGrid.settings");
brandGrid.settings = {
    fields : [
        { fieldName: 'brandNo',     dataType: "text" },
        { fieldName: 'brandNm',     dataType: "text" },
        { fieldName: 'engBrandNm',  dataType: "text" },
        { fieldName: 'useYn',       dataType: "text" },
        { fieldName: 'sysModId',    dataType: "text" },
        { fieldName: 'sysModDtm',   dataType: "text"}
    ]
    ,columns : [{
            // 브랜드 번호
            name: 'brandNo',
            fieldName: 'brandNo',
            width : 80,
            header: { text: col.brand_no }
        },
        {
            // 브랜드명
            name: 'brandNM',
            fieldName: 'brandNM',
            width : 150,
            styleName: 'left-column',
            header: { text: col.brand_nm }
        },
        {
            // 영문브랜드명
            name: 'engBrandNm',
            fieldName: 'engBrandNm',
            width : 150,
            styleName: 'left-column',
            header: { text: col.eng_brand_nm }
        },
        {
            // 사용여부
            name: 'useYn',
            fieldName: 'useYn',
            width : 80,
            header: { text: col.use_yn }
        },
        {
            // 수정자
            name: 'sysModId',
            fieldName: 'sysModId',
            width : 100,
            styleName: 'left-column',
            header: { text: col.sys_mod_id }
        },
        {
            // 수정일시
            name: 'sysModDtm',
            fieldName: 'sysModDtm',
            width : 120,
            header: { text: col.sys_mod_dtm }
        }]
    ,props : {
        form : "brandGridForm"      // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "popup/brandMgmt.getBrandList.do" // Request URL
        ,autoFitHeight : true       // 그리드 설정 - 사이즈 자동 조정 여부
        ,popup : true               // 그리드 설정 - 팝업 여부
        ,checkbox : true            // 그리드 설정 - 체크박스 필드 노출 여부
        ,crud : false               // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : true              // 페이지네이션 사용 여부
    }

};