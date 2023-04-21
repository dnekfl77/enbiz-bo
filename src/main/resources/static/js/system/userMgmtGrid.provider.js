const userGridHeaderMessage = {
	userId: 			'userMgmt.grid.header.label.userId'			//사용자아이디
	, userNm: 			'userMgmt.grid.header.label.userNm'			//사용자명
	, orgTypNm: 		'userMgmt.grid.header.label.orgTypNm'		//업무그룹코드명
	, deptNm: 			'userMgmt.grid.header.label.deptNm'			//부서명
	, ocpNm: 			'userMgmt.grid.header.label.ocpNm'			//직책코드명
	, workStatNm: 		'userMgmt.grid.header.label.workStatNm'		//근무상태코드명
	, pwdLockYn: 		'userMgmt.grid.header.label.pwdLockYn'		//비밀번호잠김여부
	, indInfoDealYn: 	'userMgmt.grid.header.label.indInfoDealYn'	//개인정보취급여부
	, sysModId: 		'adminCommon.label.sys.mod.id'		//시스템수정자ID
	, sysModDtm: 		'adminCommon.label.sys.mod.date'		//시스템수정일시
};
const userMessage = x2coMessage.getMessage(userGridHeaderMessage);

$.namespace("umGrid.settings");
umGrid.settings = {
	fields: [
		{fieldName: "userId"}			//사용자아이디
		, {fieldName: "userNm"}			//사용자명
		, {fieldName: "orgTypNm"}		//업무그룹코드명
		, {fieldName: "deptNm"}			//부서명
		, {fieldName: "ocpNm"}			//직책코드명
		, {fieldName: "workStatNm"}		//근무상태코드명
		, {fieldName: "pwdLockYn"}		//비밀번호잠김여부
		, {fieldName: "indInfoDealYn"}	//개인정보취급여부
		, {fieldName: "sysModId"}		//시스템수정자ID
		, {fieldName: "sysModDtm"}		//시스템수정일시
	]
	, columns: [
		//사용자아이디
		{
			name: "userId"
			, fieldName: "userId"
			, styleName : "column-underline-l"
			, header: {text: userMessage.userId}
			, width : 150
		}
		//사용자명
		, {
			name: "userNm"
			, fieldName: "userNm"
			, styleName : "column-underline-l"
			, header: {text: userMessage.userNm}
			, width : 150
		}
		//업무그룹코드명
		, {
			name: "orgTypNm"
			, fieldName: "orgTypNm"
			, header: {text : userMessage.orgTypNm}
			, width : 150
		}
		//부서명
		, {
			name: "deptNm"
			, fieldName: "deptNm"
			, header: {text : userMessage.deptNm}
			, width : 150
		}
		//직책코드
		, {
			name: "ocpNm"
			, fieldName: "ocpNm"
			, header: {text : userMessage.ocpNm}
			, width : 150
		}
		//근무상태코드명
		, {
			name: "workStatNm"
			, fieldName: "workStatNm"
			, header: {text: userMessage.workStatNm}
			, width : 100
		}
		//비밀번호잠김여부
		, {
			name: "pwdLockYn"
			, fieldName: "pwdLockYn"
			, header: {text: userMessage.pwdLockYn}
			, renderer: {
				type: "check",
				trueValues: "Y",
				falseValues: "N"
			}
			, readOnly : true
			, width : 150
		}
		//개인정보취급여부
		, {
			name: "indInfoDealYn"
			, fieldName: "indInfoDealYn"
			, header: {text: userMessage.indInfoDealYn}
			, renderer: {
				type: "check",
				trueValues: "Y",
				falseValues: "N"
			}
			, readOnly : true
			, width : 150
		}
		//시스템수정자ID
		, {
			name: "sysModId"
			, fieldName: "sysModId"
			, header: {text: userMessage.sysModId}
			, width : 150
		}
		//시스템수정일시
		, {
			name: "sysModDtm"
			, fieldName: "sysModDtm"
			, header: {text: userMessage.sysModDtm}
			, width : 200
		}
	]
	, props : {
		autoFitHeight : true
		, sumRowVisible : false
		, checkbox : false
		, crud : false
        , paging : true              // 페이지네이션 사용 여부
		, form : "userSearchForm"
		, action : _baseUrl + "system/userMgmt.getUserList.do"
	}
}