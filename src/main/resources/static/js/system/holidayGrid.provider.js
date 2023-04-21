var col = x2coMessage.getMessage({
    holiDt    	    : 'holidayMgmt.grid.field.date',
    holiGbCd       : 'holidayMgmt.grid.field.section.cd',
    holiJobGbCd       : 'holidayMgmt.grid.field.job.section.cd',
    holiMemo           : 'holidayMgmt.grid.field.memo',
    useYn 		    : 'adminCommon.use.yn',
    sysRegDtm         : 'adminCommon.label.sys.reg.date',
    sysRegId          : 'adminCommon.label.sys.reg.id',
    sysModDtm 	    : 'adminCommon.label.sys.mod.date',
    sysModId 	    : 'adminCommon.label.sys.mod.id'
});

var alertMsg = x2coMessage.getMessage({
	selectYearMsg : 'holidayMgmt.alert.msg.selectYearMsg', //년도를 선택해 주세요.
	requireHolidayMsg : 'holidayMgmt.alert.msg.requireHolidayMsg'
});

$.namespace("holidayGrid.settings");
holidayGrid.settings = {
    fields : [ {
        fieldName : "holiDt"
    }, {
        fieldName : "holiJobGbCd"
        , dataType: 'text'
    }, {
        fieldName : "holiGbCd"
        , dataType: 'text'
    }, {
        fieldName : "holiMemo"
        , dataType: 'text'
    }, {
        fieldName : "useYn"
        , dataType: 'text'
    }, {
        fieldName : "sysRegDtm"
        , dataType: 'text'
    }, {
        fieldName : "sysRegId"
        , dataType: 'text'
    }, {
        fieldName : "sysModDtm"
        , dataType: 'text'
    }, {
        fieldName : "sysModId"
        , dataType: 'text'
    } ],
    columns : [
        {
            name : "holiDt",
            fieldName : "holiDt",
            header : { text : col.holiDt + "*" },
            editor: {
                type: "date",
                datetimeFormat: "yyyy-MM-dd",
                textReadOnly:true
            },
            datetimeFormat : "yyyy-MM-dd",
            width : 110,
            styleCallback : function ( grid, dataCell ){
                var ret = {};
                if(dataCell.item.rowState == 'created'){
                    ret.editable = true;
                } else {
                    ret.editable = false;
                    ret.styleName = 'disable-column';
                }
                return ret;
            }
        }, {
            name : "holiJobGbCd",
            fieldName : "holiJobGbCd",
            header : { text : col.holiJobGbCd + "*"},
            width : 100,
            editor :{
                type : "list",
                textReadOnly:true,
            },
            values : _jobkeys,
            labels : _jobValues,
            lookupDisplay : true,
            styleCallback : function ( grid, dataCell ){
                var ret = {};
                if(dataCell.item.rowState == 'created'){
                    ret.editable = true;
                } else {
                    ret.editable = false;
                    ret.styleName = 'disable-column';
                }
                return ret;
            }
        }, {
            name : "holiGbCd",
            fieldName : "holiGbCd",
            header : { text : col.holiGbCd + "*" },
            width : 100,
            editor :{
                type : "list",
                textReadOnly: true,
            },
            values : _gbkeys,
            labels : _gbValues,
            lookupDisplay : true
        }, {
            name : "holiMemo",
            fieldName : "holiMemo",
            header : { text : col.holiMemo },
            width : 300,
            editor :{
                maxLength: 100
            },
            styleName: 'left-column'
        }, {
           name : "useYn",
           fieldName : "useYn",
           header : { text : col.useYn },
           width : 80,
           editable : false,
           renderer: {
               type: "check",
               trueValues: "Y",
               falseValues: "N"
           }
   }, {
            name : "sysRegId",
            fieldName : "sysRegId",
            header : { text : col.sysRegId },
            styleName: 'disable-column',
            width : 100,
            editable : false
    }, {
            name : "sysRegDtm",
            fieldName : "sysRegDtm",
            styleName: 'disable-column',
            header : { text : col.sysRegDtm },
            width : 150,
            editable : false
    }, {
            name : "sysModId",
            fieldName : "sysModId",
            header : { text : col.sysModId },
            styleName: 'disable-column',
            width : 100,
            editable : false,
    }, {
            name : "sysModDtm",
            fieldName : "sysModDtm",
            header : { text : col.sysModDtm },
            styleName: 'disable-column',
            width : 150,
            editable : false
    } ],

    validations : [{
        fieldName : "holiDt",
        criteria : "value === undefined || value === ''",
        error : {
            level : "error",
            message : alertMsg.requireHolidayMsg
        }
    }],
    props : {
        paging : true,
        width : "100%",
        autoFitHeight : true,
        checkbox : true,
        crud : true,
        form : "hlddGridForm",
        sumRowVisible : false,
        action : _baseUrl + "system/holidayMgmt.getHolidayList.do",
        saveAction : _baseUrl + "system/holidayMgmt.saveHolidayList.do"
    }
};
