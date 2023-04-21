$.namespace("deliRegnZipGrid.settings");
deliRegnZipGrid.settings = {
	fields : [ {
		fieldName : "zipNo"
	}, {
		fieldName : "baseAddr"
	},{
      	fieldName : "deliRegnGbCd"
    }],
	columns : [{ 
		name : "zipNo",
		fieldName : "zipNo",
		header : {
			text : _zipNo
		},
		width : 100,
		editable : false,
		styles : {
			textAlignment : "center"
		},
		visible : true
	}, {
		name : "baseAddr",
		fieldName : "baseAddr",
		header : {
			text : _baseAddr
		},
		width : 300,
		editable : false,
		styleName: "left-column",
		visible : true
	}, {
        name : "deliRegnGbCd",
        fieldName : "deliRegnGbCd",
        header : {
            text : _baseAddr
        },
        width : 300,
        editable : false,
        styleName: "left-column",
        visible : false
	}],
	
	validations : [],
	
	props : {
		paging : true,
		defrow : 100,
        rows : [5, 20 , 50, 100],
        width : "100%",
        checkbox : true,
       // autoFitHeight : true,
		form : "dlvRgnGridForm",
		fitStyle : "none",
		sumRowVisible : false,
		action : _baseUrl + "delivery/deliveryRegionMgmt.getDeliRegnByZipCdList.do",
		saveAction : _baseUrl + "/delivery/deliveryRegionMgmt.saveCdDeliRegnByZipCd.do"
	}
}