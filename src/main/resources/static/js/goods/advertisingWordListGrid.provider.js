var col = x2coMessage.getMessage( {
    goodsNo   : 'advertisingWordMgmt.grid.field.goodsNo',    // 상품번호
    goodsNm   : 'advertisingWordMgmt.grid.field.goodsNm',    // 상품명
    adveWrd   : 'advertisingWordMgmt.grid.field.adveWrd',    // 홍보문구
    useYn     : 'advertisingWordMgmt.grid.field.useYn',      // 사용여부
    aplyStrDt : 'advertisingWordMgmt.grid.field.aplyStrDt',  // 적용 시작 일자
    aplyEndDt : 'advertisingWordMgmt.grid.field.aplyEndDt',  // 적용 종료 일자
    sysModId  : 'advertisingWordMgmt.grid.field.sysModId',   // 수정자
    sysModDtm : 'advertisingWordMgmt.grid.field.sysModDtm'   // 수정 일시
});

$.namespace("advertisingWordListGrid.settings");
advertisingWordListGrid.settings = {
    fields:[{
        fieldName : "goodsNo"
    },{
        fieldName : "goodsNm"
    },{
        fieldName : "adveWrd"
    },{
        fieldName : "useYn"
    },{
        fieldName : "aplyStrDt"
    },{
        fieldName : "aplyEndDt"
    },{
        fieldName : "sysModId"
    },{
        fieldName : "sysModDtm"
    }],
    columns:[{
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
        },
        editable : false,
        width : 120,
        styleName: 'disable-column'
    }, {
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        editable : false,
        width : 300,
        styleName: 'left-column disable-column'
    }, {
        name : "adveWrd",
        fieldName : "adveWrd",
        header : {
            text : col.adveWrd+'(100byte)*'
        },
        styleName: 'left-column',
        width : 450,
        editor: {
            maxLength:30
        },
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn+'*'
        },
        editable: false,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        width : 100
    }, {
        name : "aplyStrDt",
        fieldName : "aplyStrDt",
        header : {
            text : col.aplyStrDt+'*'
        },
        editor: {
            type: "date",
            datetimeFormat: "yyyy-MM-dd",
            textReadOnly:true
        },
        width : 150
    }, {
        name : "aplyEndDt",
        fieldName : "aplyEndDt",
        header : {
            text : col.aplyEndDt+'*'
        },
        editor: {
            type: "date",
            datetimeFormat: "yyyy-MM-dd",
            textReadOnly:true
        },
        width : 150
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        editable: false,
        styleName: 'disable-column',
        width : 120
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        editable: false,
        styleName: 'disable-column',
        width : 180
    }],
    validations : [

    ],
    props : {
        paging : true,
        width : "100%",
        autoFitHeight : true,
        checkbox : true,
        crud : true,
        sumRowVisible : false,
        form : "advertisingWordListForm",
        action : _baseUrl + "goods/AdvertisingWordMgmt.getAdvertisingWordList.do",
        saveAction : _baseUrl + 'goods/AdvertisingWordMgmt.saveAdvertisingWordList.do'
    }
};
