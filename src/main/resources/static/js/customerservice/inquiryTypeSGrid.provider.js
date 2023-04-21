var col = x2coMessage.getMessage( {
	custInqTypNm : "inquiryTypeMgmt.gridS.label.custInqTypNm",	 // 유형명(최대30자)
	ordGoodsMdtyYn : "inquiryTypeMgmt.gridS.label.ordGoodsMdtyYn", // 주문상품 필수여부
	ansSubCd : "inquiryTypeMgmt.gridS.label.ansSubCd",			 // 답변주체
	cnslTypNo : "inquiryTypeMgmt.gridS.label.cnslTypNo",		   // 매핑상담유형
	sortSeq : "inquiryTypeMgmt.gridS.label.sortSeq",			   // 정렬순서
	useYn : "inquiryTypeMgmt.gridS.label.useYn",				   // 사용여부
	sysModId : "inquiryTypeMgmt.gridS.label.sysModId",			 // 수정자
	sysModDtm: "inquiryTypeMgmt.gridS.label.sysModDtm"
});

$.namespace("inquiryTypeSGrid.settings");
inquiryTypeSGrid.settings = {
	fields: [{
		fieldName: "custInqTypCd"
	},{
		fieldName: "custInqTypNm"
	},{
		fieldName: "ordGoodsMdtyYn"
	},{
		fieldName: "ansSubCd"
	},{
		fieldName: "cnslTypText"
	},{
		fieldName: "cnslTypNo"
	}, {
		fieldName: "sortSeq", dataType: "number"
	}, {
		fieldName: "useYn",
	}, {
		fieldName: "sysModId"
	}, {
		fieldName: "sysModDtm"
	},{
		fieldName: "uprCustInqTypCd"
	}],
	columns : [{
		name : "custInqTypCd",
		fieldName : "custInqTypCd",
		visible: false
	}, {
		name : "custInqTypNm",
		fieldName : "custInqTypNm",
		header : {
			text : col.custInqTypNm+" *"
		},
		width : 200,
		editable : true,
		editor :{
			maxLength: 20
		},
		styleCallback: function(grid, dataCell){
			var ret = {}
			var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
			if(sysModId !== undefined){
				ret.editable = false;
				ret.styleName = 'disable-column';
			}
			return ret;
		}
	}, {
		name : "ordGoodsMdtyYn",
		fieldName : "ordGoodsMdtyYn",
		header : {
			text : col.ordGoodsMdtyYn
		},
		width : 100,
		lookupDisplay:true,
		values: ['','Y','N'],
		labels: ['선택','가능','불가능'],
		editor : {
			type : 'dropdown',
			dropDownCount: 3,
			displayLabels: 'label',	 // 드롭다운 목록 표시방식
			domainOnly: true,		   // 드롭다운 목록에있는 값만 선택 가능
			textReadOnly: true,		 // 키보드 입력 방지
		},
		editable : true,
		styleCallback: function(grid, dataCell){
			var ret = {}
			var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
			if(sysModId !== undefined){
				ret.editable = false;
				ret.styleName = 'disable-column';
			}
			return ret;
		}
	}, {
		name : "ansSubCd",
		fieldName : "ansSubCd",
		header : {
			text : col.ansSubCd
		},
		width : 100,
		lookupDisplay:true,
		values: _values,
		labels: _labels,
		editor : {
			type : 'dropdown',
			dropDownCount: 3,
			displayLabels: 'label',	 // 드롭다운 목록 표시방식
			domainOnly: true,		   // 드롭다운 목록에있는 값만 선택 가능
			textReadOnly: true,		 // 키보드 입력 방지
		},
		editable : true,
		styleCallback: function(grid, dataCell){
			var ret = {}
			var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
			if(sysModId !== undefined){
				ret.editable = false;
				ret.styleName = 'disable-column';
			}
			return ret;
		}
	}, {
		name : "cnslTypText",
		fieldName : "cnslTypText",
		header : {
			text : col.cnslTypNo+" *"
		},
		width : 200,
		button: 'action',
		buttonVisibility: 'always',
		editable : false,
		styleCallback: function(grid, dataCell){
			var ret = {}
			var sysModId = grid.getValue(dataCell.index.itemIndex, "sysModId");
			if(sysModId !== undefined){
				ret.styleName = 'disable-column';
			}
			return ret;
		},
		buttonVisibleCallback : function(grid, index, focused, mouseEntered) {
			if( grid.getValue(index.itemIndex, "sysModId") !== undefined ){
				return false;
			} else {
				return true;
			}
		}
	}, {
		name : "cnslTypNo",
		fieldName : "cnslTypNo",
		header : {
			text : '매핑번호'
		},
		visible: false
	}, {
		name : "sortSeq",
		fieldName : "sortSeq",
		header : {
			text : col.sortSeq+" *"
		},
		editor :{
			maxLength: 5
		},
		width : 80,
		editable : true,
		numberFormat: "#,##0",
	},{
		name : "useYn",
		fieldName : "useYn",
		header : {
			text : col.useYn +" *"
		},
		renderer: {
			type: "check",
			trueValues: "Y",
			falseValues: "N"
		},
		width : 80,
		editable : false,
		lookupDisplay : true
	}, {
		name : "sysModId",
		fieldName : "sysModId",
		header : {
			text : col.sysModId +" *"
		},
		editable : false,
		styleName : 'disable-column'
	}, {
		name : "sysModDtm",
		fieldName : "sysModDtm",
		header : {
			text : col.sysModDtm +" *"
		},
		editable : false,
		styleName : 'disable-column'
	}, {
		name : "uprCustInqTypCd",
		fieldName : "uprCustInqTypCd",
		visible: false
	}],
	validations: [],
	props: {
		form : 'inquiryTypeGridForm'
		, autoFitHeight : true
		, crud: true
		, checkbox: true
		, sumRowVisible : false
		, paging: true
		, popup : false
		, action: "/customerservice/inquiryTypeMgmt.getInquiryTypeSmall.do"
		, saveAction: "/customerservice/inquiryTypeMgmt.saveInquiryType.do"
	}
};