var col = x2coMessage.getMessage( {
    custInqTypNm  : "inquiryTypeMgmt.gridL.label.custInqTypNm",   // 유형명
    sortSeq       : "inquiryTypeMgmt.gridL.label.sortSeq",       //정렬순서
    useYn         : "inquiryTypeMgmt.gridL.label.useYn",         //사용여부
});

$.namespace("inquiryTypeLGrid.settings");
inquiryTypeLGrid.settings = {
    fields: [{
        fieldName: "custInqTypCd"
    },{
        fieldName: "custInqTypNm"
    }, {
        fieldName: "sortSeq", dataType: "number"
    }, {
        fieldName: "useYn",
    }, {
        fieldName: "sysModId"
    }],
    columns : [{
        name : "custInqTypCd",
        fieldName : "custInqTypCd",
        visible: false
    }, {
        name : "custInqTypNm",
        fieldName : "custInqTypNm",
        header : {
            text : col.custInqTypNm+" *"
        },
        width : 200,
        editable : true,
        editor :{
            maxLength: 20
        },
        styleCallback: function(grid, dataCell){
            var ret = {}
            var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
            if(sysModId !== undefined){
                ret.editable = false;
                ret.styleName = 'disable-column';
            }
            return ret;
        }
    }, {
        name : "sortSeq",
        fieldName : "sortSeq",
        header : {
            text : col.sortSeq+" *"
        },
        editor :{
            maxLength: 5
        },
        width : 80,
        editable : true,
        numberFormat: "#,##0",
    },{
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn +" *"
        },
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        width : 80,
        editable : false,
        lookupDisplay : true
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        visible : false
    }],
    validations: [],
    props: {
        form : 'inquiryTypeGridForm',
        autoFitHeight : true,
        crud: true,
        checkbox: true,
        sumRowVisible : false,
        paging: true,
        popup : false,
        action: "/customerservice/inquiryTypeMgmt.getInquiryTypeLarge.do",
        saveAction: "/customerservice/inquiryTypeMgmt.saveInquiryType.do"
    }
};