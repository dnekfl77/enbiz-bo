$.namespace("detailGrid.settings");
detailGrid.settings = {
	fields: [
	      { fieldName: "grpCd"     }
		, { fieldName: "cd"        }
		, { fieldName: "cdNm"      }
		, { fieldName: "cdDesc"    }
		, { fieldName: "useYn"     }
		, { fieldName: "sortSeq", dataType: number }
        , { fieldName: "ref1Val"   }
        , { fieldName: "ref2Val"   }
        , { fieldName: "ref3Val"   }
        , { fieldName: "ref4Val"   }
        , { fieldName: "ref5Val"   }
        , { fieldName: "sysRegId"  }
        , { fieldName: "sysRegDtm" }
        , { fieldName: "sysModId"  }
        , { fieldName: "sysModDtm" }
    ],
	 columns : [ {
        name : "grpCd",
        fieldName : "grpCd",
        header : { text : message._grp_cd },
        width : 100,
        editable : false,
        editor :{ maxLength: 10 },
        styleName : 'disable-column'
    }, {
        name : "cd",
        fieldName : "cd",
        header : { text : message._cd+"*"},
        width : 100,
        editable : true,
        editor :{ maxLength: 10 },
        styleCallback: function(grid, dataCell){
             var ret = {}
             var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
             if(sysModId !== undefined){
                 ret.editable = false;
                 ret.styleName = 'disable-column';
             }
             return ret;
        }
    },  {
        name : "cdNm",
        fieldName : "cdNm",
        header : { text : message._cdNm+"*"},
       	styleName: "left-column",
        width : 180,
        editable : true,
        editor :{ maxLength: 200 }
    },{
        name : "cdDesc",
        fieldName : "cdDesc",
        header : { text : message._cdDesc},
       	styleName: "left-column",
        width : 250,
        editable : true,
        editor :{ maxLength: 1000 }
    },{
        name : "useYn",
        fieldName : "useYn",
        header : { text : message._use_yn+"*"},
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N",
            textReadOnly:true
        },
        width : 80,
        editable : false
    },{
        name : "sortSeq",
        fieldName : "sortSeq",
        header : { text : message._sort_seq+"*"},
        editor : {
            type: "number",
            integerOnly : true,
            maxIntegerLength: 5
        },
        numberFormat : '0',
        width : 80,
        editable : true
    }, {
        name : "ref1Val",
        fieldName : "ref1Val",
        header : { text : message._ref_1_val},
        width : 150,
        editable : true,
        styleName: "left-column",
        editor :{ maxLength: 33 }
     }, {
         name : "ref2Val",
         fieldName : "ref2Val",
         header : { text : message._ref_2_val},
         width : 150,
         editable : true,
         styleName: "left-column",
         editor :{ maxLength: 33 }
     }, {
         name : "ref3Val",
         fieldName : "ref3Val",
         header : { text : message._ref_3_val},
         width : 150,
         editable : true,
         styleName: "left-column",
         editor :{ maxLength: 33 }
     }, {
         name : "ref4Val",
         fieldName : "ref4Val",
         header : { text : message._ref_4_val},
         width : 150,
         editable : true,
         styleName: "left-column",
         editor :{ maxLength: 33 }
     }, {
         name : "ref5Val",
         fieldName : "ref5Val",
         header : { text : message._ref_5_val},
         width : 150,
         editable : true,
         styleName: "left-column",
         editor :{ maxLength: 33 }
     },{
         name : "sysRegId",
         fieldName : "sysRegId",
         header : { text : message._sysRegId },
         width : 100,
         editable : false,
         styleName: 'disable-column'
     }, {
         name : "sysRegDtm",
         fieldName : "sysRegDtm",
         header : { text : message._sysRegDtm },
         width : 150,
         editable : false,
         styleName: 'disable-column',
     }, {
         name : "sysModId",
         fieldName : "sysModId",
         header : { text : message._sysModId },
         width : 100,
         editable : false,
         styleName: 'disable-column'
     }, {
         name : "sysModDtm",
         fieldName : "sysModDtm",
         header : { text : message._sysModDtm },
         width : 150,
         editable : false,
         styleName: 'disable-column',
     }],
	validations: [],
	props: {
		width: "100%",
		autoFitHeight: true,
		crud: true,
        checkbox: true,
        sumRowVisible : false,
        paging: true,
		form: "detailGridForm",
		action: "/system/commonCodeMgmt.getStandardCodeList.do",
		saveAction: "/system/commonCodeMgmt.saveStandardCode.do"
	}
};

