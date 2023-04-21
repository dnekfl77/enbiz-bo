/*
	[전시그룹기본- PR_DISP_GRP_BASE - PrDispGrpBase]

	전시그룹유형코드(DP011)	DISP_GRP_TYP_CD		dispGrpTypCd	VARCHAR	10		PK		SubSet
	전시그룹번호			DISP_GRP_NO			dispGrpNo		VARCHAR	15		PK
	전시그룹명				DISP_GRP_NM			dispGrpNm		VARCHAR	300
	사이트번호				SITE_NO				siteNo			VARCHAR	15		Y		FK(전시몰기본)
	전시몰번호				DPML_NO				dpmlNo			VARCHAR	15		Y		FK(전시몰기본)
	전시순서				DISP_SEQ			dispSeq			NUMERIC	5
	적용시작일시			APLY_STR_DTM		aplyStrDtm		TIMESTAMP
	적용종료일시			APLY_END_DTM		aplyEndDtm		TIMESTAMP
	전시그룹설명			DISP_GRP_DESC		dispGrpDesc		VARCHAR	1000
	시스템등록자ID			SYS_REG_ID			sysRegId		VARCHAR	30
	시스템등록일시			SYS_REG_DTM			sysRegDtm		TIMESTAMP
	시스템수정자ID			SYS_MOD_ID			sysModId		VARCHAR	30
	시스템수정일시			SYS_MOD_DTM			sysModDtm		TIMESTAMP
*/
//기획전 그룹 목록 그리드 컬럼 정의
var grpCol = x2coMessage.getMessage({
	dispGrpNo:		'displayExhibitionGroupManagement.grpGrid.dispGrpNo'	//그룹 번호
	, dispGrpNm:	'displayExhibitionGroupManagement.grpGrid.dispGrpNm'	//그룹명
	, dispSeq:		'displayExhibitionGroupManagement.grpGrid.dispSeq'		//전시순서
	, useYn:		'displayExhibitionGroupManagement.grpGrid.useYn'		//사용여부
	, aplyStrDtm:	'displayExhibitionGroupManagement.grpGrid.aplyStrDtm'	//전시 시작일자
	, aplyEndDtm:	'displayExhibitionGroupManagement.grpGrid.aplyEndDtm'	//전시 종료일자
	, dispGrpDesc:	'displayExhibitionGroupManagement.grpGrid.dispGrpDesc'	//그룹 설명
	, sysModId:		'displayExhibitionGroupManagement.grpGrid.sysModId'		//수정자
	, sysModDtm:	'displayExhibitionGroupManagement.grpGrid.sysModDtm'	//수정일시
});

$.namespace("grpGrid.settings");
grpGrid.settings = {
	fields : [
		{fieldName : "dispGrpTypCd"}	//전시그룹유형코드(DP011)
		, {fieldName : "siteNo"}		//사이트번호
		, {fieldName : "dispGrpNo"}		//전시그룹번호
		, {fieldName : "dispGrpNm"}		//전시그룹명
		, {fieldName : "dispSeq", dataType : "number"}//전시순서
		, {fieldName : "useYn"}			//사용여부
		, {fieldName : "aplyStrDtm"}	//전시 시작일자
		, {fieldName : "aplyEndDtm"}	//전시 종료일자
		, {fieldName : "dispGrpDesc"}	//전시그룹설명
		, {fieldName : "sysModId"}		//수정자ID
		, {fieldName : "sysModDtm"}		//수정일시
	],
	columns : [
		{ name : "dispGrpTypCd" , fieldName : "dispGrpTypCd" , visible : false }
		, {name : "siteNo" , fieldName : "siteNo" , visible : false }

		//그룹 번호
		, {
			name : "dispGrpNo"
			, fieldName : "dispGrpNo"
			, width : 60
			, header : {text : grpCol.dispGrpNo}
			, editable : false
			, styleName : "disable-column"
		}

		//그룹명
		, {
			name : "dispGrpNm"
			, fieldName : "dispGrpNm"
			, width : 200
			, header : {text : grpCol.dispGrpNm + " *"}
		}

		//전시순서
		, {
			name : "dispSeq"
			, fieldName : "dispSeq"
			, styleName : "right-column"
			, width : 60
			, editable : true
			, header : {text : grpCol.dispSeq + " *"}
			, numberFormat: "#0"
			, editor : {
				type: "number"
				, integerOnly : true // 정수값만 허용
				, maxLength : 5
			}
		}
		//사용여부
		, {
			 name : "useYn"
			 , fieldName : "useYn"
			, width : 60
			 , editable : true
			 , header : {
				 styles: {"background": "linear,#33ffff00,#ffffd500,90"},
				 text : grpCol.useYn + " *"
			 }
			 , renderer: {
				 type: "check",
				 trueValues: "Y",
				 falseValues: "N"
			 }
		}

		// 전시 시작일자
		,{
			name: 'aplyStrDtm'
			, fieldName: 'aplyStrDtm'
			, width : 70
			, datetimeFormat : "yyyy-MM-dd"
			, header: { text: grpCol.aplyStrDtm  + " *"}
			, editor : {
				type: 'date'
				, textReadOnly : true	 // 키보드 입력 금지 여부
				, datetimeFormat: 'yyyy-MM-dd'
			}
		}

		// 전시 종료일자
		, {
			name: 'aplyEndDtm'
			, fieldName: 'aplyEndDtm'
			, width : 70
			, datetimeFormat : "yyyy-MM-dd"
			, header: { text: grpCol.aplyEndDtm  + " *"}
			, editor : {
				type: 'date'
				, textReadOnly : true	 // 키보드 입력 금지 여부
				, datetimeFormat: 'yyyy-MM-dd'
			}
		}

		// 전시그룹설명
		, {
			name: 'dispGrpDesc'
			, fieldName: 'dispGrpDesc'
			, width : 200
			, editor : {
				type: "multiline"
			}
			, header: { text: grpCol.dispGrpDesc }
		}

		// 수정자
		, {
			name: 'sysModId'
			, fieldName: 'sysModId'
			, width : 100
			, editor : {textReadOnly : true}	 // 키보드 입력 금지 여부
			, header: { text: grpCol.sysModId }
			, editable : false
			, styleName : "disable-column"
		}

		// 수정일시
		, {
			name: 'sysModDtm'
			, fieldName: 'sysModDtm'
			, width : 100
			, editor : {textReadOnly : true}	 // 키보드 입력 금지 여부
			, header: { text: grpCol.sysModDtm }
			, editable : false
			, styleName : "disable-column"
		}
	],
	props : {
		//paging : true
		//, defrow : 10
		//, rows : 0
		//, height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
		//stateBar : false, // 상태바 삭제 (삭제인 경우만 적어주기, crud 보다 상위)
		width : "100%"
		, autoFitHeight : false
		, sumRowVisible : false
		, fitStyle : "evenFill"	  //evenFill : 채우기
		, checkbox : true
		, crud : true
		, form : "searchForm"
		, action : "/display/displayExhibitionGroupMgmt.getPrDispGrpBaseList.do"
		, saveAction : "/display/displayExhibitionGroupMgmt.savePrDispGrpBaseList.do"
	}
};
