$.namespace("individualRightGrid.settings");
individualRightGrid.settings = {
    fields : [ {
        fieldName : "indivRtNo"
    }, {
        fieldName : "userId"
    }, {
		fieldName : "sysGbCd"
	}, {
        fieldName : "rtGrpNm"
    }, {
        fieldName : "regCausCont"
    }, {
        fieldName: "aplyStrDt"
    }, {
        fieldName: "aplyEndDt"
    }, {
		fieldName: "useYn"
	}, {
        fieldName : "atchFileRouteNm"
    }, {
        fieldName : "sysModId"
    }, {
        fieldName : "sysModDtm"
    }],
    columns : [ {
		 name : "indivRtNo",
		 fieldName : "indivRtNo",
		 visible : false
	},{
        name : "userId",
        fieldName : "userId",
        header : { text : col.userIdNm + " *" },
        width : 180,
        styleName : "column-underline-l",
        editable: false
    },{
		 name : "sysGbCd",
		 fieldName : "sysGbCd",
		 visible : false
	},{
        name : "rtGrpNm",
        fieldName : "rtGrpNm",
        header : { text : col.rightGrp },
        width : 180,
        styleName : "disable-column",
        editable: false
    },{
        name : "regCausCont",
        fieldName : "regCausCont",
        header : { text : col.registReason },
        width : 300,
        styleName : "left-column disable-column",
        editable : true
    },{
        name : "aplyStrDt",
        fieldName : "aplyStrDt",
        header : {
            text : col.aplyStrDt + " *"
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
                ret.editable = true;
                ret.styleName = 'disable-column';
            }
            return ret;
        }
    },{
        name : "aplyEndDt",
        fieldName : "aplyEndDt",
        header : {
            text : col.aplyEndDt + " *"
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
                ret.editable = true;
                ret.styleName = 'disable-column';
            }
            return ret;
        }
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
        editable : true
    },{
         name : "atchFileRouteNm",
         fieldName : "atchFileRouteNm",
         header : { text : col.attachFile },
         width : 130,
         styleName : "disable-column",
         editable : false,
         renderer: {
            type: "image",
            imageCallback: function (grid, cell) {
                var atchFileRouteNm = grid.getValue(cell.item.index, "atchFileRouteNm");
                if (atchFileRouteNm != null){
                    return "/static/img/clip.png";
                }else{
                    return "";
                }
            },
            imageHeight: 20
        }
    },{
         name : "sysModId",
         fieldName : "sysModId",
         header : { text : col.modifier },
         width : 80,
         styleName : "disable-column",
         editable : false
    },{
         name : "sysModDtm",
         fieldName : "sysModDtm",
         header : { text : col.modifyDate },
         width : 120,
         editable : false,
    }],
    props : {
        width : "100%",
		paging : false,
        autoFitHeight : false,
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "individualRightGridForm",
        action : _baseUrl + "system/individualRightMgmt.getIndividualRightMgmt.do",
        saveAction : _baseUrl + "system/individualRightMgmt.saveIndividualRightMgmt.do"
    }
};
