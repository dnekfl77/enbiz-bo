/*
	[전시그룹매핑정보-PR_DISP_GRP_MAPP_INFO - PrDispGrpMappInfo]

	전시그룹유형코드(DP011)		DISP_GRP_TYP_CD			dispGrpTypCd			VARCHAR	10		PK		FK(전시그룹기본)
	전시그룹번호				DISP_GRP_NO				dispGrpNo				VARCHAR	15		PK		FK(전시그룹기본)
	전시매장구분코드(DP012)		DISP_SHOP_GB_CD			dispShopGbCd			VARCHAR	10		PK		SubSet
	매장카테고리번호			SHOP_CTG_NO				shopCtgNo				VARCHAR	15		PK		FK(전시카테고리기본)
	전시순서					DISP_SEQ				dispSeq					NUMERIC	5
	사용여부					USE_YN					useYn					VARCHAR	1
	시스템등록자ID				SYS_REG_ID				sysRegId				VARCHAR	30
	시스템등록일시				SYS_REG_DTM				sysRegDtm				TIMESTAMP
	시스템수정자ID				SYS_MOD_ID				sysModId				VARCHAR	30
	시스템수정일시				SYS_MOD_DTM				sysModDtm				TIMESTAMP
*/
//기획전 목록 그리드 컬럼정의
var col = x2coMessage.getMessage({
	shopCtgNo: 'displayExhibitionGroupManagement.partGrid.shopCtgNo'			//기획전 번호
	, mkdpNm: 'displayExhibitionGroupManagement.partGrid.mkdpNm'				//기획전명
	, dispSeq: 'displayExhibitionGroupManagement.partGrid.dispSeq'				//전시순서
	, useYn: 'displayExhibitionGroupManagement.partGrid.useYn'					//사용여부
	, dispGrpTypNm: 'displayExhibitionGroupManagement.partGrid.dispGrpTypNm'	//전시그룹유형코드(DP011)
	, dispStrDtm: 'displayExhibitionGroupManagement.partGrid.dispStrDtm'		//전시 시작일자
	, dispEndDtm: 'displayExhibitionGroupManagement.partGrid.dispEndDtm'		//전시 종료일자
	, mdNm: 'displayExhibitionGroupManagement.partGrid.mdNm'					//담당MD명
});

$.namespace("partGrid.settings");
partGrid.settings = {
	fields : [
		{fieldName : "dispGrpNo"}		//전시그룹번호
		, {fieldName : "shopCtgNo"}		//매장카테고리번호(기획전번호)
		, {fieldName : "mkdpNm"}		//기획전명
		, {fieldName : "dispSeq"}		//전시순서
		, {fieldName : "useYn"}			//사용여부
		, {fieldName : "dispGrpTypCd"}	//기획전 유형코드
		, {fieldName : "dispGrpTypNm"}	//기획전 유형명
		, {fieldName : "dispStrDtm"}	//전시 시작일자
		, {fieldName : "dispEndDtm"}	//전시 종료일자
		, {fieldName : "mdNm"}			//담당MD
		, {fieldName : "mdId"}			//담당MD
	]
	, columns : [
		{ name : "dispGrpNo" , fieldName : "dispGrpNo" , visible : false }//전시그룹번호
		, { name : "dispGrpTypCd" , fieldName : "dispGrpTypCd" , visible : false }//전시그룹유형코드(DP011)
		, { name : "mdId" , fieldName : "mdId" , visible : false }//담당MD아이디

		//기획전번호
		, {
			name : "shopCtgNo"
			, fieldName : "shopCtgNo"
			, width : 60
			, type: "data"
			, editable : false
			, styleName : "disable-column"
			, header : {text : col.shopCtgNo}
		}

		//기획전명
		, {
			name : "mkdpNm"
			, fieldName : "mkdpNm"
			, width : 200
			, editable : false
			, styleName : "disable-column"
			, header : {text : col.mkdpNm + " *"}
		}

		//전시순서
		, {
			name : "dispSeq"
			, fieldName : "dispSeq"
			, width : 30
			, styleName : "right-column"
			, editable : true
			, header : {text : col.dispSeq + " *"}
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
			, editable : false
			, styleName : "disable-column"
			, header : {
				styles: {"background": "linear,#33ffff00,#ffffd500,90"}
				, text : col.useYn + " *"
			}
			, renderer: {
				type: "check"
				, trueValues: "Y"
				, falseValues: "N"
			}
		}

		//기획전유형 - 전시그룹유형코드명(DP011)
		, {
			name : "dispGrpTypNm"
			, fieldName : "dispGrpTypNm"
			, width : 90
			, header : {text : col.dispGrpTypNm}
			, editable : false
			, styleName : "disable-column"
		}

		//전시 시작일자
		, {
			name : "dispStrDtm"
			, fieldName : "dispStrDtm"
			, width : 70
			, header : {text : col.dispStrDtm}
			, editable : false
			, styleName : "disable-column"
		}

		//전시 종료일자
		, {
			name : "dispEndDtm"
			, fieldName : "dispEndDtm"
			, width : 70
			, type: "data"
			, header : {text : col.dispEndDtm}
			, editable : false
			, styleName : "disable-column"
		}

		//담당MD명
		, {
			name : "mdNm"
			, fieldName : "mdNm"
			, width : 80
			, type: "data"
			, header : {text : col.mdNm}
			, editable : false
			, styleName : "disable-column"
		}
	]
	, props : {
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
		, action : "/display/displayExhibitionGroupMgmt.getPrDispGrpMappInfoList.do"
		, saveAction : "/display/displayExhibitionGroupMgmt.savePrDispGrpMappInfoList.do"
	}
};
