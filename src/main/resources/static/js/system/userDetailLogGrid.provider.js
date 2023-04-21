const userDetailLogMessage = x2coMessage.getMessage( {
     _loginDtm           : "userAccessHistoryInquiry.label.grid.loginDtm",
     _loutDtm            : "userAccessHistoryInquiry.label.grid.loutDtm",
     _loginIpAddr  		: "userAccessHistoryInquiry.label.grid.loginIpAddr"
});

$.namespace("userDetailLogGrid.settings");
userDetailLogGrid.settings = {
	fields : [ {
		fieldName : "loginDtm"
	}, {
		fieldName : "loutDtm"
	}, {
		fieldName : "loginIpAddr"
	}],
	columns : [{ 
		name : "loginDtm",
		fieldName : "loginDtm",
		header : {
			text : userDetailLogMessage._loginDtm
		},
		width : 150,
        styleName : "disable-column"
	}, {
		name : "loutDtm",
		fieldName : "loutDtm",
		header : {
			text : userDetailLogMessage._loutDtm
		},
		width : 150,
        styleName : "disable-column"
	}, {
		name : "loginIpAddr",
		fieldName : "loginIpAddr",
		header : {
			text : userDetailLogMessage._loginIpAddr
		},
		width : 120,
        styleName : "disable-column"
	}],
	props : {
		paging : true,
        autoFitHeight : true,
		form : "userDetailLogGridForm",
		sumRowVisible : false,
		autoFitHeight: true,
		action : _baseUrl + "system/userAccessHistoryInquiry.getDetailLoginHistoryList.do"
	}
}