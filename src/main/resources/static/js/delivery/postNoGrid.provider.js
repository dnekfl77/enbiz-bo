$.namespace("postNoGrid.settings");
postNoGrid.settings = {
	fields : [ {
		fieldName : "zipNo"
	}, {
		fieldName : "baseAddr"
	}],
	columns : [ {
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
	}],
	validations : [],
	props : {
		paging : true,
		defrow : 100,
		rows : [5, 20 , 50, 100],
        width : "100%", // grid의 기본 너비
		checkbox : true,
		form : "postNoGridInnerForm",
		fitStyle : "none",
		sumRowVisible : false,
		action : _baseUrl + "delivery/deliveryRegionMgmt.getRegnPostNoList.do"
	}
}