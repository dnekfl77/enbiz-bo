var col = x2coMessage.getMessage({
	//#기획전 등록/수정 팝업 그리드 컬럼정의
	mkdpTypCd	 	: 'displayExhibitionGroupManagement.popup.grid.field.mkdpTypCd'	//기획전유형
	, mkdpTypNm	 	: 'displayExhibitionGroupManagement.popup.grid.field.mkdpTypCd'	//기획전유형
	, mkdpNo	 	: 'displayExhibitionGroupManagement.popup.grid.field.mkdpNo'		//기획전번호
	, mkdpNm	 	: 'displayExhibitionGroupManagement.popup.grid.field.mkdpNm'		//기획전명
	, dispStat	 	: 'displayExhibitionGroupManagement.popup.grid.field.mkdpStat'	//기획전상태
	, dispYn	 	: 'displayExhibitionGroupManagement.popup.grid.field.dispYn'		//전시여부
	, dispStrDtm	: 'displayExhibitionGroupManagement.popup.grid.field.dispStrDtm'	//전시시작일
	, dispEndDtm	: 'displayExhibitionGroupManagement.popup.grid.field.dispEndDtm'	//전시종료일
	, mdId	 		: 'displayExhibitionGroupManagement.popup.grid.field.mdId'		//담당MD
	, mdNm	 		: 'displayExhibitionGroupManagement.popup.grid.field.mdNm'		//담당MD
});

$.namespace("mkdpGrid.settings");
mkdpGrid.settings = {
	fields : [
		{fieldName : "mkdpTypCd", dataType: "text"}		//기획전유형 코드
		, {fieldName : "mkdpTypNm", dataType: "text"}	//기획전유형 명
		, {fieldName : "mkdpNo", dataType: "text"}		//기획전번호
		, {fieldName : "mkdpNm", dataType: "text"}		//기획전명
		, {fieldName : "dispStatName", dataType: "text"}	//기획전상태명
		, {fieldName : "dispStat", dataType: "text"}	//기획전상태
		, {fieldName : "dispYn", dataType: "text"}		//전시여부
		, {fieldName : "dispStrDtm", dataType: "text"}	//전시시작일
		, {fieldName : "dispEndDtm", dataType: "text"}	//전시종료일
		, {fieldName : "mdNm", dataType: "text"}		//담당MD
		, {fieldName : "mdId", dataType: "text"}		//담당MD
	]
	, columns : [
		{
			//기획전유형  코드
			name : "mkdpTypCd"
			, fieldName : "mkdpTypCd"
			, header : {text : col.mkdpTypCd}
			, editable : false
			, visible : false
		}, {
			//기획전유형 명
			name : "mkdpTypNm"
			, fieldName : "mkdpTypNm"
			, width : 100
			, header : {text : col.mkdpTypNm}
			, editable : false
		}, {
			//기획전번호
			name : "mkdpNo"
			, fieldName : "mkdpNo"
			, width : 80
			, header : {text : col.mkdpNo}
			, editable : false
		}, {
			//기획전명
			name : "mkdpNm"
			, fieldName : "mkdpNm"
			, width : 150
			, styleName: 'left-column'
			, header : {text : col.mkdpNm}
			, editable : false
		}, {
			//기획전상태명
			name : "dispStatName"
			, fieldName : "dispStatName"
			, width : 100
			, header : {text : col.dispStat}
			, editable : false
		}, {
            //기획전상태
            name : "dispStat"
            , fieldName : "dispStat"
			, visible : false
        },{
			//전시여부
			name : "dispYn"
			, fieldName : "dispYn"
			, width : 80
			, header : {text : col.dispYn}
		}, {
			//전시시작일
			name : "dispStrDtm"
			, fieldName : "dispStrDtm"
			, width : 130
			, header : {text : col.dispStrDtm}
		}, {
			//전시종료일
			name : "dispEndDtm"
			, fieldName : "dispEndDtm"
			, width : 130
			, header : {text : col.dispEndDtm}
		}, {
			//담당MD
			name : "mdNm"
			, fieldName : "mdNm"
			, width : 100
			, header : {text : col.mdNm}
		}, {
			//담당MD
			name : "mdId"
			, fieldName : "mdId"
			, visible : false
		}
	]
	, props : {
		paging : true
		, defrow : 10
		, rows : col.defaultPage
		, width : "100%"
		//, height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
		, autoFitHeight : true
        , fitStyle : "evenFill"      //evenFill : 채우기
		, popup : true
		, sumRowVisible : false
		, checkbox : true
		, crud : false
		, form : "searchForm"
		, action : _baseUrl + "display/displayExhibitionGroupMgmt.getMarketDisplayList.do"
	}
};
