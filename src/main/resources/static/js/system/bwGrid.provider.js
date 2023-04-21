var col = x2coMessage.getMessage({
    bwNm    		       : 'badWordMgmt.label.badword.name',
    bwDesc   	           : 'badWordMgmt.label.badword.desc',
    useYn    	           : 'adminCommon.use.yn',
    sysRegDtm              : 'adminCommon.label.sys.reg.date',
    sysRegId 		       : 'adminCommon.label.sys.reg.id',
    sysModDtm		       : 'adminCommon.label.sys.mod.date',
    sysModId			   : 'adminCommon.label.sys.mod.id',
    title                  : 'badWordMgmt.label.title.badword.management'
});

var alertMsg = x2coMessage.getMessage({
	bwNmMessage 	       : 'badWordMgmt.badword.name.invalid.input',
    noDataMessage          : 'adminCommon.grid.alert.no.searched.data',
    dupMessage 	           : 'badWordMgmt.badword.name.dup',
    emptyExcel             : 'adminCommon.grid.alert.no.searched.data',
    rowCheckMsg            : 'adminCommon.alert.no.selected.item.for.delete',
    messageNotCheckedData  : 'adminCommon.grid.alert.no.selected.row',
    initGridMessage   	   : 'adminCommon.grid.alert.init'
});

$.namespace("bwGrid.settings");
bwGrid.settings = {
    fields : [ {
        fieldName : "bwSeq"
    }, {
        fieldName : "bwNm"
    }, {
        fieldName : "bwDesc"
    }, {
        fieldName : "useYn"
    }, {
        fieldName : "sysRegDtm"
    }, {
        fieldName : "sysRegId"
    }, {
        fieldName : "sysModDtm"
    }, {
        fieldName : "sysModId"
    } ],
    columns : [ {
        name : "bwNm",
        fieldName : "bwNm",
        header : {
            text : col.bwNm + "*"
        },
        width : 200,
        editable : true,
        styleName : "left-column",
        editor :{
            maxLength: 30
        }
    }, {
        name : "bwDesc",
        fieldName : "bwDesc",
        header : {
            text : col.bwDesc
        },
        width : 400,
        editable : true,
        styleName : "left-column",
        editor :{
            maxLength: 100
        }
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn + "*"
        },
        width : 70,
        editable : false,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "sysRegId",
        fieldName : "sysRegId",
        header : {
            text : col.sysRegId
        },
        width : 100,
        editable : false,
        styleName: 'disable-column'
    }, {
        name : "sysRegDtm",
        fieldName : "sysRegDtm",
        header : {
            text : col.sysRegDtm
        },
        width : 150,
        editable : false,
        styleName: 'disable-column'
    }, {
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : col.sysModId
        },
        width : 100,
        editable : false,
        styleName: 'disable-column'
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : col.sysModDtm
        },
        width : 150,
        editable : false,
        styleName: 'disable-column'
    } ],
    validations : [
        {
            fieldName : "bwNm",
            criteria : "value === undefined || value.trim() === ''"  ,
            error : { level : "error", message : alertMsg.bwNmMessage }
        }
    ],
    props : {
        paging : true,
        width : "100%", 
        autoFitHeight : true,
        checkbox : true,
        crud : true,
        form : "bwGridForm",
        sumRowVisible : false,
        action : _baseUrl + "system/badWordMgmt.getBadWordList.do",
        saveAction : _baseUrl + "system/badWordMgmt.saveBadWord.do"
    }
};
