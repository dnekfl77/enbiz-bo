var col = x2coMessage.getMessage({
	entrNm			: 'vendorCommission.grid.label.entrNm',
	norPrc			: 'vendorCommission.grid.label.norPrc',
	salePrc			: 'vendorCommission.grid.label.salePrc',
	cpnSum			: 'vendorCommission.grid.label.cpnSum',
	cpnSumEntr		: 'vendorCommission.grid.label.cpnSumEntr',
	paySum			: 'vendorCommission.grid.label.paySum',
	payPg			: 'vendorCommission.grid.label.payPg',
	payMilg			: 'vendorCommission.grid.label.payMilg',
	payEm			: 'vendorCommission.grid.label.payEm',
	payHp			: 'vendorCommission.grid.label.payHp',
	dlexEntr		: 'vendorCommission.grid.label.dlexEntr',
	cmsnPrc		 	: 'vendorCommission.grid.label.cmsnPrc',
	entrPrc		 	: 'vendorCommission.grid.label.entrPrc'
});

$.namespace("vendorCommissionGrid.settings");
vendorCommissionGrid.settings = {
	fields : [ 
		{ fieldName : "entrNm" },
		{ fieldName : "norPrc", dataType: "number" },
		{ fieldName : "salePrc", dataType: "number" },
		{ fieldName : "cpnSum", dataType: "number" },
		{ fieldName : "cpnSumEntr", dataType: "number" },
		{ fieldName : "paySum", dataType: "number" },
		{ fieldName : "payPg", dataType: "number" },
		{ fieldName : "payMilg", dataType: "number" },
		{ fieldName : "payEm", dataType: "number" },
		{ fieldName : "payHp", dataType: "number" },
		{ fieldName : "dlexEntr", dataType: "number" },
		{ fieldName : "cmsnPrc", dataType: "number" },
		{ fieldName : "entrPrc", dataType: "number" }
	],
	columns : [
		{
			name : "entrNm",
			fieldName : "entrNm",
			header : {
				text : col.entrNm
			},
			width : 120,
			styleName : "disable-column"
		}, {
			name : "norPrc",
			fieldName : "norPrc",
			header : {
				text : col.norPrc
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "salePrc",
			fieldName : "salePrc",
			header : {
				text : col.salePrc
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "cpnSum",
			fieldName : "cpnSum",
			header : {
				text : col.cpnSum
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "cpnSumEntr",
			fieldName : "cpnSumEntr",
			header : {
				text : col.cpnSumEntr
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "paySum",
			fieldName : "paySum",
			header : {
				text : col.paySum
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "payPg",
			fieldName : "payPg",
			header : {
				text : col.payPg
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "payMilg",
			fieldName : "payMilg",
			header : {
				text : col.payMilg
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "payEm",
			fieldName : "payEm",
			header : {
				text : col.payEm
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "payHp",
			fieldName : "payHp",
			header : {
				text : col.payHp
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "dlexEntr",
			fieldName : "dlexEntr",
			header : {
				text : col.dlexEntr
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "cmsnPrc",
			fieldName : "cmsnPrc",
			header : {
				text : col.cmsnPrc
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}, {
			name : "entrPrc",
			fieldName : "entrPrc",
			header : {
				text : col.entrPrc
			},
			width : 120,
			numberFormat: "#,##0",
			styleName : "disable-column right-column"
		}
	],
	props : {
		paging : true,
		rows : 0,
		width : "100%",
		autoFitHeight : true,
		sumRowVisible : false,
		checkbox : false,
		crud : false,
		form : "vendorCommissionGridForm",
		action : _baseUrl + "adjust/vendorCommission.getVendorCommissionList.do"
	}
};
