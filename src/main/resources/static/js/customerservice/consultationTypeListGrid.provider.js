var col = x2coMessage.getMessage( {
    cnslTypNo     :  "counselingTypeMgmt.grid.label.cnslTypNo",     // 상담유형번호
    cnslTypNm     :  "counselingTypeMgmt.grid.label.cnslTypNm",     // 상담유형명(최대20자)
    custCnslGbCd  :  "counselingTypeMgmt.grid.label.custCnclGbCd",  // 상담구분
    goodsSelMdtyYn:  "counselingTypeMgmt.grid.label.goodsSelMdtyYn",// 상품필수여부
    respBaseMemo  :  "counselingTypeMgmt.grid.label.respBaseMemo",  // 응대메모기본
    useYn         :  "adminCommon.use.yn",         // 사용여부
    sortSeq       :  "counselingTypeMgmt.grid.label.sortSeq",       // 정렬순서
    sysModId      :  "adminCommon.label.sys.mod.id",      // 수정자
    sysModDtm     :  "adminCommon.label.sys.mod.date"      // 수정일시
});

var validMsg = x2coMessage.getMessage( {
    cnslTypNo   :  "counselingTypeMgmt.grid.message.cnslTypNm",   // 상담유형번호
    sortSeq     :  "counselingTypeMgmt.grid.message.sortSeq",     // 상담유형명(최대20자)
});


$.namespace("consultationTypeListGrid.settings");
consultationTypeListGrid.settings = {
    fields: [{
        fieldName: "cnslTypNo"
    }, {
        fieldName: "cnslTypNm"
    }, {
        fieldName: "custCnslGbCd",
    }, {
        fieldName: "goodsSelMdtyYn",
    }, {
        fieldName: "respBaseMemo",
    }, {
        fieldName: "useYn"
    }, {
        fieldName: "sortSeq" ,   dataType: "number"
    }, {
        fieldName: "sysModId"
    }, {
        fieldName: "sysModDtm"
    }, {
        fieldName: "level" ,   dataType: "number"
    }, {
        fieldName: "respBaseMemoData"
    }, {
        fieldName: "cnslLrgTypNo"
    }, {
        fieldName: "cnslMidTypNo"
    }, {
        fieldName: "cnslSmlTypNo"
    }, {
        fieldName: "uprCnslTypNo"
    }],
    columns : [ {
        name : "cnslTypNo",
        fieldName : "cnslTypNo",
        header : {
            text : col.cnslTypNo
        },
        width : 100,
        editable : false,
        editor :{
            maxLength: 15
        },
        styleName: 'disable-column'
    }, {
        name : "cnslTypNm",
        fieldName : "cnslTypNm",
        header : {
            text : col.cnslTypNm+"*"
        },
        editor :{
            maxLength: 20
        },
        width : 200,
        editable : true
    }, {
        name : "custCnslGbCd",
        fieldName : "custCnslGbCd",
        header : {
            text : col.custCnslGbCd
        },
        width : 100,
        lookupDisplay:true,
        values: _values,
        labels: _labels,
        editor : {
            type : 'dropdown',
            dropDownCount: 3,
            displayLabels: 'label',     // 드롭다운 목록 표시방식
            domainOnly: true,           // 드롭다운 목록에있는 값만 선택 가능
            textReadOnly: true,         // 키보드 입력 방지
        },
        editable : true,
        styleCallback: function(grid, dataCell){
            var ret = {}
            var level = grid.getValue(dataCell.index.itemIndex, "level");
            if(level < 3){
                ret.readOnly = 'true';
                ret.styleName = 'disable-column';
            }
            return ret;
        }
    }, {
        name : "goodsSelMdtyYn",
        fieldName : "goodsSelMdtyYn",
        header : {
            text : col.goodsSelMdtyYn
        },
        width : 100,
        lookupDisplay:true,
        values: ['','Y','N'],
        labels: ['선택','Y','N'],
        editor : {
            type : 'dropdown',
            dropDownCount: 3,
            displayLabels: 'label',     // 드롭다운 목록 표시방식
            domainOnly: true,           // 드롭다운 목록에있는 값만 선택 가능
            textReadOnly: true,         // 키보드 입력 방지
        },
        editable: true,
        styleCallback: function(grid, dataCell){
            var ret = {}
            var level = grid.getValue(dataCell.index.itemIndex, "level");
            if(level < 3){
                ret.readOnly = 'true';
                ret.styleName = 'disable-column';
            }
            return ret;
        }
    }, {
        name : "respBaseMemo",
        fieldName : "respBaseMemo",
        header : {
            text : col.respBaseMemo
        },
        width : 120,
        styleCallback: function(grid, dataCell){
            var ret = {}
            var level = grid.getValue(dataCell.index.itemIndex, "level");
            if(level < 3){
                ret.readOnly = 'true';
                ret.styleName = 'disable-column';
            }
            return ret;
        },
        editable: false
    },{
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn
        },
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        width : 80,
        editable : false,
        lookupDisplay : true
    },{
        name : "sortSeq",
        fieldName: "sortSeq",
        header: {
            text: col.sortSeq
        },
        editor :{
            maxLength: 15
        },
        width: 80,
        numberFormat: "#,##0",
        editable : true
    },{
        name : "sysModId",
        fieldName: "sysModId",
        header: {
            text: col.sysModId
        },
        width: 150,
        styleName: 'disable-column',
        editable : false
    },{
        name : "sysModDtm",
        fieldName: "sysModDtm",
        header: {
            text: col.sysModDtm
        },
        width: 150,
        styleName: 'disable-column',
        editable : false
    },{
        name : "level",
        fieldName: "level",
        visible : false
    },{
        name : "respBaseMemoData",
        fieldName: "respBaseMemoData",
        visible : false
    },{
        name : "cnslLrgTypNo",
        fieldName: "cnslLrgTypNo",
        visible : false
    },{
        name : "cnslMidTypNo",
        fieldName: "cnslMidTypNo",
        visible : false
    },{
        name : "cnslSmlTypNo",
        fieldName: "cnslSmlTypNo",
        visible : false
    },{
        name : "uprCnslTypNo",
        fieldName: "uprCnslTypNo",
        visible : false
    }],
    validations: [],
    props: {
        form : 'consultationTypeListForm',
        autoFitHeight : true,
        crud: true,
        checkbox: true,
        sumRowVisible : false,
        paging: true,
        popup : false,
        action: "/customerservice/counselingTypeMgmt.getLowerCounselingTypeList.do",
        saveAction: "/customerservice/counselingTypeMgmt.saveCounselingType.do"
    }
};