var gridHeaders = x2coMessage.getMessage({
    optnNo     : 'optionMgmt.optionListGrid.field.optnNo'
    ,optnNm     : 'optionMgmt.optionListGrid.field.optnNm'
    ,sortSeq    : 'optionMgmt.optionListGrid.field.sortSeq'
    ,useYn      : 'optionMgmt.optionListGrid.field.useYn'
    ,sysModId   : 'optionMgmt.optionListGrid.field.sysModId'
    ,sysModDtm  : 'optionMgmt.optionListGrid.field.sysModDtm'
    ,sysRegId  : 'optionMgmt.optionListGrid.field.sysRegId'
    ,sysRegDtm  : 'optionMgmt.optionListGrid.field.sysRegDtm'
});

$.namespace("optionListGrid.settings")
optionListGrid.settings = {
	fields : [
		 { fieldName: 'optnCatNo'	, dataType: 'text' }
		,{ fieldName: 'optnNo'		, dataType: 'text' }
		,{ fieldName: 'optnNm'		, dataType: 'text' }
		,{ fieldName: 'sortSeq'		, dataType: 'text' }
		,{ fieldName: 'useYn'		, dataType: 'text' }
		,{ fieldName: 'sysModId'	, dataType: 'text' }
		,{ fieldName: 'sysModDtm'	, dataType: 'text' }
		,{ fieldName: 'sysRegId'	, dataType: 'text' }
		,{ fieldName: 'sysRegDtm'	, dataType: 'text' }
	]
	, columns : [
		{
			name: 'optnNo'
			, fieldName: 'optnNo'
			, width : 100
			, styleName: 'disable-column'
			, header: { text: gridHeaders.optnNo }
			, editable: false
		}
		, {
			name: 'optnNm'
			, fieldName: 'optnNm'
			, width : 150
			, styleName: 'left-column'
			, header: { text: gridHeaders.optnNm + '*'}
		}
		, {
			name: 'sortSeq'
			, fieldName: 'sortSeq'
			, width : 80
			, header: { text: gridHeaders.sortSeq + '*'}
			, numberFormat: "#0"
			, editor : {
				type: "number"
				, integerOnly: true
				, maxLength: 3
			}
		}
		, {
			name: 'useYn'
			, fieldName: 'useYn'
			, width : 80
			, header: { text: gridHeaders.useYn + '*'}
			, sortable: false
			, lookupDisplay: true
			, editable : false
			, renderer: {
				type: "check"
				, trueValues: "Y"
				, falseValues: "N"
			}
		}
		, {
			name: 'sysModId'
			, fieldName: 'sysModId'
			, width : 80
			, editable : false
			, styleName: 'disable-column'
			, header: { text: gridHeaders.sysModId }
		}
		, {
			name: 'sysModDtm'
			, fieldName: 'sysModDtm'
			, width : 120
			, editable : false
			, styleName: 'disable-column'
			, header: { text: gridHeaders.sysModDtm }
		}
		, {
			name: 'sysRegId'
			, fieldName: 'sysRegId'
			, width : 80
			, editable : false
			, styleName: 'disable-column'
			, header: { text: gridHeaders.sysRegId }
		}
		, {
			name: 'sysRegDtm'
			, fieldName: 'sysRegDtm'
			, width : 120
			, editable : false
			, styleName: 'disable-column'
			, header: { text: gridHeaders.sysRegDtm }
		}
	]
	, validations : []
	, props : {
		form : 'optionCategoryListGridForm'	// 서버로 전달할 데이터 Form ID값
		, autoFitHeight : false		// 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
		, height : 240
        , fitStyle : "evenFill"     // 그리드 설정 - evenFill : 채우기
		, popup : false				// 그리드 설정 - 팝업 자동 resize
		, checkbox : true			// 그리드 설정 - 체크박스 필드 노출 여부
		, crud : true				// 그리드 설정 - 상태 필드 노출 여부
		, sumRowVisible : false		// 그리드 설정 - 하단 합계 영역 노출 여부
		, paging : true				// 그리드 설정 - 페이지네이션 사용 여부
		, action : _baseUrl + 'goods/OptionMgmt.getOptionList.do' // Request URL
		, saveAction : _baseUrl + 'goods/OptionMgmt.saveOptionList.do'
	}
}