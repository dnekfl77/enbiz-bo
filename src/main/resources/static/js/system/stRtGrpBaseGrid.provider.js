$.namespace("stRtGrpBaseGrid.settings");
stRtGrpBaseGrid.settings = {
    fields: [{
        fieldName: "rtGrpNo"
    }, {
        fieldName: "sysGbCd"
    }, {
        fieldName: "rtGrpNm"
    }, {
        fieldName: "aplyStrDt"
    }, {
        fieldName: "aplyEndDt"
    }, {
        fieldName: "useYn"
    }, {
        fieldName: "sysModId"
    }, {
        fieldName: "sysModDtm"
    }],
    columns : [ {
        name : "rtGrpNo",
        fieldName : "rtGrpNo",
        header : {
            text : col.rt_grp_no
        },
        width : 100,
        editable : false,
        styleName: 'disable-column'
    }, {
        name : "sysGbCd",
        fieldName : "sysGbCd",
        header : {
            text : col.sys_gb_cd + " *"
        },
        width : 80,
        lookupDisplay:true,
        domainOnly:true,
        dropDownWhenClick:true,
        values: systemCode,
        labels: systemValues,
        editor: {
            type: "list",
            textReadOnly: true
        } ,
        editable : true,
        styleCallback: function(grid, dataCell){
           var ret = {}
           var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
           if(sysModId !== undefined){
                ret.readOnly = 'true';
                ret.styleName = 'disable-column';
           }
           return ret;
        }
    }, {
        name : "rtGrpNm",
        fieldName : "rtGrpNm",
        header : {
            text : col.rt_grp_nm + " *"
        },
        width : 250,
        editable : true,
        styleName: 'left-column',
        editor :{
            maxLength: 300
        }
    }, {
        name : "aplyStrDt",
        fieldName : "aplyStrDt",
        header : {
            text : col.aply_str_dt + " *"
        },
        editor: {
            "type": "date",
            "datetimeFormat": "yyyy-MM-dd",
            textReadOnly:true
        },
        width : 120,
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
        name : "aplyEndDt",
        fieldName : "aplyEndDt",
        header : {
            text : col.aply_end_dt + " *"
        },
        editor: {
            "type": "date",
            "datetimeFormat": "yyyy-MM-dd",
            textReadOnly:true
        },
        width : 120,
        styleCallback: function(grid, dataCell){
            var ret = {}
            var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
            if(sysModId !== undefined){
                ret.editable = false;
                ret.styleName = 'disable-column';
            }
            return ret;
        }
    },{
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.use_yn
        },
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        width : 80,
        editable : true
    },{
        name : "sysModId",
        fieldName: "sysModId",
        header: {
            text: col.sysModId
        },
        width: 120,
        styleName: 'disable-column',
        editable : false
    },
    {
        name : "sysModDtm",
        fieldName: "sysModDtm",
        header: {
            text: col.sysModDtm
        },
        width: 150,
        styleName: 'disable-column',
        editable : false
    }],
    props: {
        width: "100%",
        height : "200px",
        crud: true,
        checkbox: true,
        sumRowVisible : false,
        paging: false,
        form: "stRtGrpBaseGridForm",
        action : _baseUrl + "system/rightGroupMgmt.getRightGroupBaseList.do",
        saveAction : _baseUrl + "system/rightGroupMgmt.saveRightGroupBaseList.do"
    }
};