$.namespace("stDeptCdListGrid.settings")
stDeptCdListGrid.settings = {
	fields : [
		{ fieldName: 'deptCd', dataType: 'text' }		//부서코드
		, { fieldName: 'deptNm', dataType: 'text' }		//부서명
		, { fieldName: 'jobGrpCd', dataType: 'text' }	//업무그룹
		, { fieldName: 'sortSeq',	dataType: 'number' }	//정렬순서
		, { fieldName: 'useYn', dataType: 'text' }		//사용여부
		, { fieldName: 'sysModId', dataType: 'text' }	//수정자
		, { fieldName: 'sysModDtm', dataType: 'text' }	//수정일시
		, { fieldName: 'uprDeptCd', dataType: 'text' }	//상위부서코드
	]

	, columns : [
		{
			//부서코드
			name: 'deptCd'
			, fieldName: 'deptCd'
			, width : 100
			, editable : false
			, styleName: 'disable-column'
			, header: { text: stDeptCdCol.deptCd }
		}
		, {
			//부서명
			name: 'deptNm'
			, fieldName: 'deptNm'
			, width : 150
			, styleName: 'left-column'
			, header: { text: stDeptCdCol.deptNm + '*' }
			, editor : {
				type: 'line'
				, maxLength: 300
			}
		}
		, {
			//업무그룹
			name: 'jobGrpCd'
			, fieldName: 'jobGrpCd'
            ,width: '80'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: stDeptCdCol.jobGrpCd + " *" }
            ,values : Object.keys(_job_grp_type_select)
            ,labels : com.x2commerce.common.Util.getValues(_job_grp_type_select)
            ,lookupDisplay : true
            ,editor : {
                type : "dropdown"
                ,textReadOnly:true
            },
	        styleCallback: function(grid, dataCell){
	            var ret = {}
	            var uprDeptCd = grid.getValue(dataCell.index.itemIndex, "uprDeptCd");
	            if(uprDeptCd == undefined || uprDeptCd != "10000"){
	                ret.editable = false;
	                ret.styleName = 'disable-column';
	            }
	            return ret;
	        }
		}
		, {
			//정렬순서
			name: 'sortSeq'
			, fieldName: 'sortSeq'
			, width : 80
			, header: { text: stDeptCdCol.sortSeq + '*' }
			, numberFormat : '0'		// 그리드 숫자 표현 방식
			, styleName: "right-column"
			, editor : {
				type: 'number',
				integerOnly: true,	// 정수값만 입력 허용
				maxIntegerLength: 5   // 입력 허용 가능 자리수
			}
		}
		, {
			// 사용여부
			name: 'useYn'
			, fieldName: 'useYn'
			, width : 80
			, header: {
				styles: {"background": "linear,#33ffff00,#ffffd500,90"}
				, text: stDeptCdCol.useYn
			}
			, sortable: false	 // 정렬 기능 비활성화
			, lookupDisplay: true // 그리드 표시 방식 ( true : label, false : value)
			, editable : false
			, renderer: {
				type: "check"
				, trueValues: "Y"
				, falseValues: "N"
			}
		}
		, {
			// 수정자
			name: 'sysModId'
			, fieldName: 'sysModId'
			, width : 100
			, editable : false
			, styleName: 'disable-column'
			, header: { text: stDeptCdCol.sysModId }
		}
		, {
			// 수정일시
			name: 'sysModDtm'
			, fieldName: 'sysModDtm'
			, width : 100
			, editable : false
			, styleName: 'disable-column'
			, header: { text: stDeptCdCol.sysModDtm }
		}
		, {
			//상위부서코드
			name: 'uprDeptCd'
			, fieldName: 'uprDeptCd'
			, visible: false
		}
	]
	, validations : [
	]
	, props : {
		form : 'stdCtgDispInfoForm'	// 서버로 전달할 데이터 Form ID값
		, autoFitHeight : false		// 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, fitStyle : "evenFill"		//evenFill : 채우기
		, popup : false				// 그리드 설정 - 팝업 자동 resize
		, checkbox : true			// 그리드 설정 - 체크박스 필드 노출 여부
		, crud : true				// 그리드 설정 - 상태 필드 노출 여부
		, sumRowVisible : false		// 그리드 설정 - 하단 합계 영역 노출 여부
		, paging : true				// 페이지네이션 사용 여부
		, action : _baseUrl + 'system/userDeptMgmt.getUserDeptMgmtList.do' // Request URL
		, saveAction : _baseUrl + 'system/userDeptMgmt.saveUserDeptList.do'
	}
}