$.namespace("individualButtonRightGrid.settings");
individualButtonRightGrid.settings = {
    fields: [{
		fieldName: "useYn" 
	},{
		fieldName: "rtTgtNm"
	},{
		fieldName: "rtTgtTypCd"
	},{
        fieldName: "rtTgtSeq"
     },{
        fieldName: "rtGrpNo"
     }],
	 columns : [ {
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
        name : "rtTgtNm",
        fieldName : "rtTgtNm",
        header : {
            text : col.rtTgtNm
        },
        width : 250,
        editable : false,
        styleName: 'disable-column left-column'
    },{
        name : "rtTgtTypCd",
        fieldName : "rtTgtTypCd",
        header : {
            text : col.rtTgtTypCd
        },
        width : 100,
        styleName: 'disable-column',
        editable : false,
        values: rtTgtTypCode,
        labels: rtTgtTypValues,
        lookupDisplay:true,
        domainOnly:true
    },{
        name : "rtTgtSeq",
        fieldName : "rtTgtSeq",
        visible:false
    },{
        name : "rtGrpNo",
        fieldName : "rtGrpNo",
        visible:false
    }],
    props : {
        width : "100%",
		paging : false,
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : true,
        crud : true,
        form : "individualButtonRightGridForm",
        action : _baseUrl + "system/rightGroupMgmt.getRightGroupButtonGridList.do",
		saveAction : _baseUrl + "system/individualRightMgmt.saveIndividualRightButtonGridList.do"
    }
};
