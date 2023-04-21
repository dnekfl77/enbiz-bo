$.namespace("siteListGrid.settings");
siteListGrid.settings = {
	fields : [
		  {fieldName : "siteNo"}    // 사이트번호
		, {fieldName : "siteNm"}    // 사이트명
		, {fieldName : "siteDom"}   // 도메인
		, {fieldName : "trdStrtDt"} // 거래시작일
		, {fieldName : "trdEndDt"}  // 거래종료일
		, {fieldName : "sysModId"}  // 수정자
		, {fieldName : "sysModDtm"} // 수정일
	]

	, columns : [{
			name : "siteNo"
			, fieldName : "siteNo"
			, header : { text : msg.siteNo }
			, width : 90
			, editable : false
			, styleName : "disable-column"
		}, {
			name : "siteNm"
			, fieldName : "siteNm"
			, header : { text : msg.siteNm + " *" }
			, width : 300
			, editable : true
			, editor : { maxLength: 300 }
			, styleName: 'left-column'
		}, {
			name : "siteDom"
			, fieldName : "siteDom"
			, header : { text : msg.siteDom + " *" }
			, width : 300
			, editable : true
			, editor : { maxLength: 100 }
			, styleName: 'left-column'
		}, {
			name : "trdStrtDt"
			, fieldName : "trdStrtDt"
			, header : { text : msg.trdStrtDt + " *" }
			, width : 110
			, editable : true
			, editor : {
				type : "date"
				, datetimeFormat : "yyyy-MM-dd"
				, minDate: new Date("2021-01-01")
				, maxDate: new Date("2999-12-31")
			}
		}, {
			name : "trdEndDt"
			, fieldName : "trdEndDt"
			, header : {text : msg.trdEndDt + " *"}
			, width : 110
			, editable : true
			, editor : {
				type : "date"
				, datetimeFormat : "yyyy-MM-dd"
				, minDate: new Date("2021-01-01")
				, maxDate: new Date("2999-12-31")
			}
		}, {
			name : "sysModId"
			, fieldName : "sysModId"
			, header : {text : msg.modId}
			, width : 100
			, editable : false
			, styleName : "disable-column"
		}, {
			name : "sysModDtm"
			, fieldName : "sysModDtm"
			, header : {text : msg.modDtm}
			, width : 130
			, editable : false
			, styleName : "disable-column"
		}
	]
	, props : {
		width : "100%"
		, crud : true			// 그리드 설정 - cud 상태 컬럼 노출 여부
		, checkbox : true		// 그리드 설정 - 체크박스 필드 노출 여부
		, sumRowVisible : false	// 그리드 설정 - 하단 합계 영역 노출 여부
		, autoFitHeight : true	// 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, fitStyle : 'none'	    // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화(evenFill) 여부
		, popup : false			// 그리드 설정 - 팝업 자동 resize
		, paging : true			// 페이지네이션 사용 여부
		, form : "siteListGridForm"
		, action : _baseUrl + "display/siteMgmt.getSiteMgmt.do"
		, saveAction : _baseUrl + "display/siteMgmt.saveSiteBase.do"
	}
};