$.namespace("stRtGrpBtnGrid.settings");
stRtGrpBtnGrid.settings = {
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
        name : "rtTgtNm",
        fieldName : "rtTgtNm",
        header : {
            text : col.rt_tgt_nm_btn
        },
        width : 250,
        editable : false,
        styleName: 'disable-column left-column'
    },{
        name : "rtTgtTypCd",
        fieldName : "rtTgtTypCd",
        header : {
            text : col.rt_tgt_typ_cd
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
	props: {
        paging: false,
		width: "100%",
		height : "250px",
		crud: true,
		checkbox: true,
		sumRowVisible : false,
		form: "stRtGrpBtnGridForm",
		action : _baseUrl + "system/rightGroupMgmt.getRightGroupButtonGridList.do",
		saveAction : _baseUrl + "system/rightGroupMgmt.saveRightGroupMenuGridList.do"
	}
};