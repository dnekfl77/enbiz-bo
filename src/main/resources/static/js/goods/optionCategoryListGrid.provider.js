var gridHeaders = x2coMessage.getMessage({
    optnCatRegGbCdNm : 'optionMgmt.optionCategoryListGrid.field.optnCatRegGbCdNm'
    ,entrNm           : 'optionMgmt.optionCategoryListGrid.field.entrNm'
    ,optnCatTypCdNm   : 'optionMgmt.optionCategoryListGrid.field.optnCatTypCdNm'
    ,optnCatNm        : 'optionMgmt.optionCategoryListGrid.field.optnCatNm'
    ,sortSeq          : 'optionMgmt.optionCategoryListGrid.field.sortSeq'
    ,useYn            : 'optionMgmt.optionCategoryListGrid.field.useYn'
    ,sysModId         : 'optionMgmt.optionCategoryListGrid.field.sysModId'
    ,sysModDtm        : 'optionMgmt.optionCategoryListGrid.field.sysModDtm'
    ,sysRegId         : 'optionMgmt.optionCategoryListGrid.field.sysRegId'
    ,sysRegDtm        : 'optionMgmt.optionCategoryListGrid.field.sysRegDtm'
});

$.namespace("optionCategoryListGrid.settings")
optionCategoryListGrid.settings = {
	fields : [
		 { fieldName: 'optnCatRegGbCd'	, dataType: 'text' }
		,{ fieldName: 'entrNo'			, dataType: 'text' }
		,{ fieldName: 'entrNm'			, dataType: 'text' }
		,{ fieldName: 'optnCatTypCd'	, dataType: 'text' }
		,{ fieldName: 'optnCatNo'		, dataType: 'text' }
		,{ fieldName: 'optnCatNm'		, dataType: 'text' }
		,{ fieldName: 'sortSeq'			, dataType: 'number' }
		,{ fieldName: 'useYn'			, dataType: 'text' }
		,{ fieldName: 'sysModId'		, dataType: 'text' }
		,{ fieldName: 'sysModDtm'		, dataType: 'text' }
		,{ fieldName: 'sysRegId'		, dataType: 'text' }
		,{ fieldName: 'sysRegDtm'		, dataType: 'text' }
	]
	, columns : [
		{
			name: 'optnCatRegGbCd'
			,fieldName: 'optnCatRegGbCd'
			,width : 100
			,header: { text: gridHeaders.optnCatRegGbCdNm + '*' }
			,values : Object.keys(_optnCatRegGbCd_select)
			,labels : com.x2commerce.common.Util.getValues(_optnCatRegGbCd_select)
			,lookupDisplay : true
			,editor : {
                type : "dropdown"
			    ,textReadOnly:true
            }
		}, {
			name: 'entrNm'
			,fieldName: 'entrNm'
			,width : 150
			,header: { text: gridHeaders.entrNm + '*'}
			,renderer: "renderer_imgBtn"
			,styleName: 'left-column custom_renderer'
			,editable: false
		}, {
			name: 'optnCatTypCd'
			,fieldName: 'optnCatTypCd'
			,width : 80
			,header: { text: gridHeaders.optnCatTypCdNm + '*'}
			,values : Object.keys(_optnCatTypCd_select)
			,labels : com.x2commerce.common.Util.getValues(_optnCatTypCd_select)
			,lookupDisplay : true
			,editor : {
                type : "dropdown"
			    ,textReadOnly:true
            }
		}, {
			name: 'optnCatNm'
			,fieldName: 'optnCatNm'
			,width : 150
			,styleName: 'left-column'
			,header: { text: gridHeaders.optnCatNm + '*'}
			,editor: {
				maxLength: 50
			}
		}, {
			name: 'sortSeq'
			,fieldName: 'sortSeq'
			,width : 80
			,header: { text: gridHeaders.sortSeq + '*'}
            ,numberFormat: "#0"
			,editor : {
				type: "number"
				, integerOnly: true
				, maxLength: 3
			}
		}, {
			name: 'useYn'
			,fieldName: 'useYn'
			,width : 80
			,header: { text: gridHeaders.useYn + '*'}
			,sortable: false
			,editable : false
			,renderer: {
				type: "check"
				,trueValues: "Y"
				,falseValues: "N"
			}
		}, {
			name: 'sysModId'
			,fieldName: 'sysModId'
			,width : 100
			,editable : false
			,styleName: 'disable-column'
			,header: { text: gridHeaders.sysModId }
		}, {
			name: 'sysModDtm'
			,fieldName: 'sysModDtm'
			,width : 150
			,editable : false
			,styleName: 'disable-column'
			,header: { text: gridHeaders.sysModDtm }
		}, {
			name: 'sysRegId'
			,fieldName: 'sysRegId'
			,width : 100
			,editable : false
			,styleName: 'disable-column'
			,header: { text: gridHeaders.sysRegId }
		}, {
			name: 'sysRegDtm'
			,fieldName: 'sysRegDtm'
			,width : 150
			,editable : false
			,styleName: 'disable-column'
			,header: { text: gridHeaders.sysRegDtm }
		}
	]
	,validations: []
	, props : {
		form : 'optionCategoryListGridForm'
		, autoFitHeight : false
		, height : 240
        , fitStyle : "evenFill"
		, popup : false
		, checkbox : true
		, crud : true
		, sumRowVisible : false
		, paging : true
		, action : _baseUrl + 'goods/OptionMgmt.getOptionCategoryList.do'
		, saveAction : _baseUrl + 'goods/OptionMgmt.saveOptionCategoryList.do'
	}
}