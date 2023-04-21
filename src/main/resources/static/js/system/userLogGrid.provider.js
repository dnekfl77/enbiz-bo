const userlogMessage = x2coMessage.getMessage( {
  	 _user              	: "userAccessHistoryInquiry.label.User",
     _system          	: "userAccessHistoryInquiry.label.grid.system",
     _userId 	        : "userAccessHistoryInquiry.label.grid.userId",
     _userNm             : "userAccessHistoryInquiry.label.grid.userNm",
     _loginDtm           : "userAccessHistoryInquiry.label.grid.loginDtm",
     _loutDtm            : "userAccessHistoryInquiry.label.grid.loutDtm",
     _pwdLockYn  		: "userAccessHistoryInquiry.label.grid.pwdLockYn",
     _loginCnt   	    : "userAccessHistoryInquiry.label.grid.loginCnt"
});

$.namespace("userLogGrid.settings");
userLogGrid.settings = {
	fields : [ {
		fieldName : "sysGbNm"
	}, {
		fieldName : "userId"
	}, {
		fieldName : "userNm"
	}, {
		fieldName : "loginDtm"
	}, {
		fieldName : "loutDtm"
	}, {
		fieldName : "pwdLockYn"
	}, {
		fieldName : "loginCnt"
	} ],
	columns : [ {
		name : "sysGbNm",
		fieldName : "sysGbNm",
		header : {
			text : userlogMessage._system
		},
		width : 100,
        styleName : "disable-column"
	}, {
		name : "userId",
		fieldName : "userId",
		header : {
			text : userlogMessage._userId
		},
		width : 100,
        styleName : "disable-column"
	}, {
		name : "userNm",
		fieldName : "userNm",
		header : {
			text : userlogMessage._userNm
		},
		width : 100,
        styleName : "disable-column"
	}, {
		name : "loginDtm",
		fieldName : "loginDtm",
		header : {
			text : userlogMessage._loginDtm
		},
		width : 150,
        styleName : "disable-column"
	}, {
		name : "loutDtm",
		fieldName : "loutDtm",
		header : {
			text : userlogMessage._loutDtm
		},
		width : 150,
        styleName : "disable-column"
	}, {
		name : "pwdLockYn",
		fieldName : "pwdLockYn",
		header : {
			text : userlogMessage._pwdLockYn
		},
        readOnly : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
		width : 70,
        styleName : "disable-column"
	}, {
		name : "loginCnt",
		fieldName : "loginCnt",
		header : {
			text : userlogMessage._loginCnt
		},
		width : 70,
        styleName : "disable-column right-column"
	} ],
	props : {
		paging : true,
		checkbox : false,
		form : "userLogGridForm",
		sumRowVisible : false,
		autoFitHeight: true,
		action : _baseUrl + "system/userAccessHistoryInquiry.getLastLoginInfoList.do"
	}
}