$.namespace("gcGrid.settings");
gcGrid.settings = {
	fields: [
	      { fieldName: "grpCd"       }
        , { fieldName: "grpCdNm"     }
        , { fieldName: "grpCdDesc"   }
        , { fieldName: "useYn"       }
        , { fieldName: "ref1ValDesc" }
        , { fieldName: "ref2ValDesc" }
        , { fieldName: "ref3ValDesc" }
        , { fieldName: "ref4ValDesc" }
        , { fieldName: "ref5ValDesc" }
        , { fieldName: "sysRegId"    }
        , { fieldName: "sysRegDtm"   }
        , { fieldName: "sysModId"    }
        , { fieldName: "sysModDtm"   }
    ],
	 columns : [
	     {
            name : "grpCd",
            fieldName : "grpCd",
            header : { text : message._grp_cd + "*"},
            width : 100,
            editable : true,
            editor :{ maxLength: 10},
            styleCallback: function(grid, dataCell){
                 var ret = {}
                 var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
                 if( sysModId !== undefined ){
                     ret.editable = false;
                     ret.styleName = 'disable-column';
                 }
                 return ret;
            }
        }, {
            name : "grpCdNm",
            fieldName : "grpCdNm",
            header : { text : message._grp_cd_nm + "*" },
            styleName: "left-column",
            width : 180,
            editable : true,
            editor :{ maxLength: 60 }
        }, {
            name : "grpCdDesc",
            fieldName : "grpCdDesc",
            header : { text : message._grp_cd_desc },
            styleName: "left-column",
            width : 250,
            editable : true,
            editor :{ maxLength: 300 }
        },{
            name : "useYn",
            fieldName : "useYn",
            header : { text : message._use_yn + '*' },
            renderer: {
                type: "check",
                trueValues: "Y",
                falseValues: "N",
                textReadOnly: true
            },
            width : 80,
            editable : false
        },{
             name : "ref1ValDesc",
             fieldName : "ref1ValDesc",
             header : { text : message._ref_1_val },
             width : 150,
             styleName: "left-column",
             editable : true
         },{
             name : "ref2ValDesc",
             fieldName : "ref2ValDesc",
             header : { text : message._ref_2_val },
             width : 150,
             styleName: "left-column",
             editable : true
         },{
             name : "ref3ValDesc",
             fieldName : "ref3ValDesc",
             header : { text : message._ref_3_val },
             width : 150,
             styleName: "left-column",
             editable : true
         },{
             name : "ref4ValDesc",
             fieldName : "ref4ValDesc",
             header : { text : message._ref_4_val },
             width : 150,
             styleName: "left-column",
             editable : true
         },{
             name : "ref5ValDesc",
             fieldName : "ref5ValDesc",
             header : { text : message._ref_5_val},
             width : 150,
             styleName: "left-column",
             editable : true
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
		crud: true,
        checkbox: true,
        autoFitHeight : true,
        sumRowVisible : false,
        paging: true,
		form: "gcGridForm",
		action: "/system/commonCodeMgmt.getGroupCodeList.do",
		saveAction: "/system/commonCodeMgmt.saveGroupCode.do"
	}
};