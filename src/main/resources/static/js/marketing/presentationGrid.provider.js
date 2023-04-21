var col = x2coMessage.getMessage( {
    goodsNo   : "presentationMgmt.present.manage.grid.goodsNo",    // 상품번호
    goodsNm   : "presentationMgmt.present.manage.grid.goodsNm",    // 상품명
    prestNm   : "presentationMgmt.present.manage.grid.prestNm",    // 증정메시지
    aplyStrDt : "presentationMgmt.present.manage.grid.aplyStrDt",  // 적용시작일자
    aplyEndDt : "presentationMgmt.present.manage.grid.aplyEndDt",  // 적용종료일자
    useYn     : "adminCommon.use.yn",      // 사용여부
    sysModId : "adminCommon.label.sys.mod.id",    // 수정자
    sysModDtm : "adminCommon.label.sys.mod.date"   // 수정일시
});

$.namespace("presentationGrid.settings");
presentationGrid.settings = {
    fields:[{
        fieldName : "goodsNo"
    },{
        fieldName : "goodsNm"
    },{
        fieldName : "prestNm"
    },{
        fieldName : "aplyStrDt"
    },{
        fieldName : "aplyEndDt"
    },{
        fieldName : "useYn"
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
        width : 150,
        styleName: 'disable-column'
    }, {
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        editable : false,
        width : 250,
        styleName: 'left-column disable-column'
    }, {
        name : "prestNm",
        fieldName : "prestNm",
        header : {
            text : col.prestNm+'*'
        },
        styleName: 'left-column',
        width : 200,
        "editor": {
            maxLength:100
        },
    }, {
        name : "aplyStrDt",
        fieldName : "aplyStrDt",
        header : {
            text : col.aplyStrDt+'*'
        },
        editor: {
            "type": "date",
            "datetimeFormat": "yyyy-MM-dd",
            textReadOnly:true
        },
        width : 140
    }, {
        name : "aplyEndDt",
        fieldName : "aplyEndDt",
        header : {
            text : col.aplyEndDt+'*'
        },
        editor: {
            "type": "date",
            "datetimeFormat": "yyyy-MM-dd",
            textReadOnly:true
        },
        width : 140
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
        width : 80
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        editable: false,
        styleName: 'disable-column'
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        editable: false,
        styleName: 'disable-column',
        width : 160
    }],
    validations : [
        // {
        //     fieldName: "prestNm",
        //     criteria: "value === undefined || value.trim() === ''",
        //     error: {
        //         level: "error",
        //         message: '증정메시지는 필수값입니다!'
        //     }
        // },
        // {
        //     fieldName: "aplyStrDt",
        //     criteria: "value === undefined || value.trim() === ''",
        //     error: {
        //         level: "error",
        //         message: '적용시작일자는 필수값입니다!'
        //     }
        // },
        // {
        //     fieldName: "aplyEndDt",
        //     criteria: "value === undefined || value.trim() === ''",
        //     error: {
        //         level: "error",
        //         message: '적용종료일자는 필수값입니다!'
        //     }
        // }
    ],
    props : {
        paging : true,
        // height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        autoFitHeight : true,
        checkbox : true,
        crud : true,
        sumRowVisible : false,
        form : "presentationGridForm",
        action : _baseUrl + "marketing/presentationMgmt.getPresentationManageList.do",
        saveAction : _baseUrl + 'marketing/presentationMgmt.savePresentation.do'
    }
};
