$.namespace("standardDisplayCategoryConnectGrid.settings")
standardDisplayCategoryConnectGrid.settings = {
	fields : [
		  { fieldName: 'stdCtgNo' }
		, { fieldName: 'dispCtgNo' }
		, { fieldName: 'dispCtgNm' }
		, { fieldName: 'repCtgYn' }
		, { fieldName: 'useYn' }
		, { fieldName: 'sysModId' }
		, { fieldName: 'sysModDtm' }
	]
	, columns : [
		{
			  name: 'stdCtgNo'
			, fieldName: 'stdCtgNo'
            , visible: false
		}, {
			  name: 'dispCtgNo'
			, fieldName: 'dispCtgNo'
			, width : 120
			, editable : false
			, styleName: 'disable-column'
			, header: { text: msg.dispCtgNo }
		}, {
			name: 'dispCtgNm'
			, fieldName: 'dispCtgNm'
			, width : 210
			, styleName: 'left-column disable-column'
			, editable : false
			, header: { text: msg.dispCtgNm}
		}, {
			name: 'repCtgYn'
			, fieldName: 'repCtgYn'
			, width : 110
			, header: { text: msg.repCtgYn + ' *' }
			, lookupDisplay: true
			, editable : true
			, renderer: {
				type: "check"
				, trueValues: "Y"
				, falseValues: "N"
			}
		}, {
			  name: 'useYn'
			, fieldName: 'useYn'
			, width : 80
			, header: { text: msg.useYn + ' *' }
			, lookupDisplay: true
			, editable : false
			, renderer: {
				type: "check"
				, trueValues: "Y"
				, falseValues: "N"
			}
		}, {
			  name: 'sysModId'
			, fieldName: 'sysModId'
			, width : 100
			, editable : false
			, styleName: 'disable-column'
			, header: { text: msg.sysModId }
		}, {
			  name: 'sysModDtm'
			, fieldName: 'sysModDtm'
			, width : 120
			, editable : false
			, styleName: 'disable-column'
			, header: { text: msg.sysModDtm }
		}
	]
	, props : {
		form : 'stdCtgDispInfoForm'
		, autoFitHeight : false
		, popup : false
		, checkbox : true
		, crud : true
		, sumRowVisible : false
		, paging : true
		, action : _baseUrl + 'display/standardDisplayCategoryConnect.getStandardDisplayCategoryConnect.do'
		, saveAction : _baseUrl + 'display/standardDisplayCategoryConnect.saveStandardDisplayCategoryConnect.do'
	}
}