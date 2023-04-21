const menuUserStatusMessage = x2coMessage.getMessage({
  	_systemDescription : "menuUsageStatusInquiry.label.systemDescription",
	_rtTgtNm : "menuUsageStatusInquiry.label.rtTgtNm",
	_rtTgtSeq : "menuUsageStatusInquiry.label.grid.rtTgtSeq",
	_menuRegDtm : "menuUsageStatusInquiry.label.grid.menuRegDtm",
	_userCnt : "menuUsageStatusInquiry.label.grid.userCnt",
	_menuUseCnt : "menuUsageStatusInquiry.label.grid.menuUseCnt",
	_lastUseDtm : "menuUsageStatusInquiry.label.grid.lastUseDtm",
	_userId : "menuUsageStatusInquiry.label.grid.userId",
	_userNm : "menuUsageStatusInquiry.label.grid.userNm",
	_userMenuUseCnt : "menuUsageStatusInquiry.label.grid.userMenuUseCnt"
});

$.namespace("menuUserStatusGrid.settings");
menuUserStatusGrid.settings = {
	fields : [ {
		fieldName : "sysGbNm"
	}, {
		fieldName : "rtTgtSeq"
	}, {
		fieldName : "rtTgtNm"
	}, {
		fieldName : "menuRegDtm"
	}, {
		fieldName : "userCnt"
	}, {
		fieldName : "menuUseCnt"
	}, {
		fieldName : "userId"
	}, {
		fieldName : "userNm"
	}, {
		fieldName : "lastUseDtm"
	},{
		fieldName : "userMenuUseCnt"
	} ],
	columns : [ {
		name : "sysGbNm",
		fieldName : "sysGbNm",
		header : {
			text : menuUserStatusMessage._systemDescription
		},
		width : 100,
		visible : true
	}, {
		name : "rtTgtSeq",
		fieldName : "rtTgtSeq",
		header : {
			text : menuUserStatusMessage._rtTgtSeq
		},
		width : 100,
		visible : true
	}, {
		name : "rtTgtNm",
		fieldName : "rtTgtNm",
		styleName: 'left-column',
		header : {
			text : menuUserStatusMessage._rtTgtNm
		},
		width : 200,
		visible : true
	}, {
		name : "menuRegDtm",
		fieldName : "menuRegDtm",
		header : {
			text : menuUserStatusMessage._menuRegDtm
		},
		width : 150,
		visible : true
	}, {
		name : "userCnt",
		fieldName : "userCnt",
		header : {
			text : menuUserStatusMessage._userCnt
		},
		width : 70,
		visible : true
	}, {
		name : "menuUseCnt",
		fieldName : "menuUseCnt",
		header : {
			text : menuUserStatusMessage._menuUseCnt
		},
		width : 70,
		visible : true
	}, {
		name : "userId",
		fieldName : "userId",
		header : {
			text : menuUserStatusMessage._userId
		},
		width : 150,
		visible : false
	}, {
		name : "userNm",
		fieldName : "userNm",
		header : {
			text : menuUserStatusMessage._userNm
		},
		width : 150,
		visible : false
	}, {
		name : "lastUseDtm",
		fieldName : "lastUseDtm",
		header : {
			text : menuUserStatusMessage._lastUseDtm
		},
		width : 150,
		visible : true
	}, {
		name : "userMenuUseCnt",
		fieldName : "userMenuUseCnt",
		header : {
			text : menuUserStatusMessage._userMenuUseCnt
		},
		width : 70,
		visible : false
	} ],
	validations : [],
	props : {
		paging : true,
		checkbox : false,
		form : "menuUserStatusGridForm",
		sumRowVisible : false,
		autoFitHeight: true,
		action : _baseUrl + "system/menuUsageStatusInquiry.getMenuUseStatusList.do"
	}
}