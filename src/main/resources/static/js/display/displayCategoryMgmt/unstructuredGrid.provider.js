var col = x2coMessage.getMessage({
    dispCtgNo       : 'displayCategoryMgmt.unstructuredGrid.field.dispCtgNo',
    dispCtgNm       : 'displayCategoryMgmt.unstructuredGrid.field.dispCtgNm',
    dispSeq         : 'displayCategoryMgmt.unstructuredGrid.field.dispSeq',
    dispYn          : 'displayCategoryMgmt.unstructuredGrid.field.dispYn',
    useYn           : 'displayCategoryMgmt.unstructuredGrid.field.useYn',
    dispStrDt       : 'displayCategoryMgmt.unstructuredGrid.field.dispStrDt',
    dispEndDt       : 'displayCategoryMgmt.unstructuredGrid.field.dispEndDt',
    sysModId        : 'displayCategoryMgmt.unstructuredGrid.field.sysModId',
    sysModDtm       : 'displayCategoryMgmt.unstructuredGrid.field.sysModDtm'
});

$.namespace("unstructuredGrid.settings");
unstructuredGrid.settings = {
    fields : [ {
        fieldName : "dispCtgNo"
    }, {
        fieldName : "dispCtgNm"
    }, {
        fieldName : "dispSeq" , dataType : "number"
    }, {
        fieldName : "dispYn"
    }, {
        fieldName : "useYn"
    }, {
        fieldName : "dispStrDt"
    }, {
        fieldName : "dispEndDt"
    }, {
        fieldName : "sysModId"
    }, {
        fieldName : "sysModDtm"
    }],
    columns : [ {
        name : "dispCtgNo",
        fieldName : "dispCtgNo",
        header : {
            text : col.dispCtgNo
        },
        width : 110,
        styleName : "disable-column",
        editable : false
    },{
        name : "dispCtgNm",
        fieldName : "dispCtgNm",
        header : {
            text : col.dispCtgNm + " *"
        },
        width : 200,
        styleName : "left-column",
        editable : true,
        editor : {
            maxLength : 300
        }
    },{
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq + " *"
        },
        width : 80,
        styleName : "right-column",
        editable : true,
		numberFormat: "#0",
        editor : {
              type: "number"
            , integerOnly : true // 정수값만 허용
            , maxLength : 3
        }
    }, {
        name : "dispYn",
        fieldName : "dispYn",
        header : {
            text : col.dispYn + " *"
        },
        width : 80,
        editable : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn + " *"
        },
        width : 80,
        editable : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
         name : "dispStrDt",
         fieldName : "dispStrDt",
         header : {
             text : col.dispStrDt + " *"
         },
         width : 90,
         editable : true,
         editor : {
            type : "date",
            datetimeFormat : "yyyy-MM-dd",
            minDate: new Date("2021-01-01"),
            maxDate: new Date("2999-12-31")
         }
    }, {
         name : "dispEndDt",
         fieldName : "dispEndDt",
         header : {
             text : col.dispEndDt + " *"
         },
         width : 90,
         editable : true,
         editor : {
             type : "date",
             datetimeFormat : "yyyy-MM-dd",
             minDate: new Date("2021-01-01"),
             maxDate: new Date("2999-12-31")
         }
    }, {
         name : "sysModId",
         fieldName : "sysModId",
         header : {
             text : col.sysModId
         },
         width : 80,
         editable : false
    }, {
         name : "sysModDtm",
         fieldName : "sysModDtm",
         header : {
             text : col.sysModDtm
         },
         width : 120,
         editable : false
    }],

    props : {
        paging : false,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "unstructuredGridForm",
        action : _baseUrl + "display/displayCategoryMgmt.getDisplayCategoryMgmtSubCategoryList.do",
        saveAction : _baseUrl + "display/displayCategoryMgmt.saveDisplayCategoryMgmtCategoryList.do"
    }
};
