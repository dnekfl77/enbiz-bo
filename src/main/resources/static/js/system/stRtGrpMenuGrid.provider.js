$.namespace("stRtGrpMenuGrid.settings");
stRtGrpMenuGrid.settings = {
	fields: [{
		fieldName: "useYn" 
	}, {
		fieldName: "rtTgtSeq"
	}, {
		fieldName: "rtTgtNm"
	}, {
		fieldName: "popupYn"
	}, {
		fieldName: "rtGrpNo"
	}, {
		fieldName: "sysGbCd"
	}, {
        fieldName: "hierarchy"
    }],
	 columns : [ {
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
        editable : false
    },{
        name : "rtTgtSeq",
        fieldName : "rtTgtSeq",
        header : {
            text : col.rt_tgt_seq
        },
        width : 100,
        styleName: "disable-column",
        editable : false
    }, {
        name : "rtTgtNm",
        fieldName : "rtTgtNm",
        styleName: "disable-column left-column",
        header : {
            text : col.rt_tgt_nm
        },
        renderer: {
        	type: "html",
        	callback: function(grid, cell, w, h) {
        		var str ="";
        		var gbn ="┕&nbsp;";
        		var level = cell.value.split(",")[0];
        		for(var i =0; i <level;i++) {
        			str += "&nbsp;&nbsp;&nbsp;";
        		}
        		str += level > 1 ? gbn : "";
        		str += cell.value.split(",")[1];
        		return str;
        	}
        },
        width : 220,
        editable : false
    },{
        name : "popupYn",
        fieldName : "popupYn",
        header : {
            text : col.popup_use_yn
        },
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        width : 80,
        editable : false,
        readOnly : true,
        styleName: "disable-column"
    },{
        name : "rtGrpNo",
        fieldName : "rtGrpNo",
        visible:false
    },{
        name : "sysGbCd",
        fieldName : "sysGbCd",
        visible:false
    },{
        name : "hierarchy",
        fieldName : "hierarchy",
        visible:false
    }],
	props: {
		width: "100%",
		height : "250px",
		crud: true,
        checkbox: true,
        sumRowVisible : false,
        paging: false,
        form: "stRtGrpMenuGridForm",
		action : _baseUrl + "system/rightGroupMgmt.getRightGroupMenuGridList.do",
		saveAction : _baseUrl + "system/rightGroupMgmt.saveRightGroupMenuGridList.do"
	}
};