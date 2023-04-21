var stDeptCdCol = x2coMessage.getMessage({
	deptCd :		'userDeptMgmt.grid.deptCd'		//부서코드
	, deptNm :		'userDeptMgmt.grid.deptNm'		//부서명
	, jobGrpCd : 'userDeptMgmt.grid.jobGrpCd'		//업무그룹
	, sortSeq :		'userDeptMgmt.grid.sortSeq'		//정렬순서
	, useYn :		'adminCommon.use.yn'		//사용여부
	, sysModId :	'adminCommon.label.sys.mod.id'	//수정자
	, sysModDtm :	'adminCommon.label.sys.mod.day'	//수정일시
});

var alertMsg = x2coMessage.getMessage({
	saveConfirmMsg			: 'adminCommon.grid.alert.save'			// 저장하시겠습니까?
	, saveRequiredMsg		: 'userDeptMgmt.alert.msg.save.require'			// (은)는 필수값입니다.
	, gridInit				: 'adminCommon.grid.alert.init'				// 그리드 작업을 초기화 합니다.
	, noCheckedRowErrMsg	: 'adminCommon.grid.alert.no.selected.row'					// 선택된 Row가 없습니다.
	, noSearchedDataMsg		: 'adminCommon.grid.alert.no.searched.data'	// 조회된 데이터가 없습니다.
	, noSelectedDataMsg		: 'adminCommon.alert.no.selected.item.for.apply'	// 적용할 항목을 선택해주세요.
	, invalidAccessMsg		: 'adminCommon.message.invaild.access'			// 잘못된 접근 경로입니다.
});