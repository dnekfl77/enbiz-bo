$.namespace("footerGroupListGrid.settings");
footerGroupListGrid.settings = {
	fields : [
		  {fieldName : "siteNo"}
		, {fieldName : "fortNo"}
		, {fieldName : "sysGbCd"}
		, {fieldName : "fotrContGbCd"}
		, {fieldName : "dispSeq", dataType : "number"}
		, {fieldName : "useYn"}
	],
	columns : [{
			  name : "siteNo"
			, fieldName : "siteNo"
			, visible : false
		}, {
			  name : "fortNo"
			, fieldName : "fortNo"
			, visible : false
		}, {
			  name : "sysGbCd"
			, fieldName : "sysGbCd"
			, header : {text : msg.sysGbCd + " *"}
			, values : sysGbCode
			, labels : sysGbValues
			, editor : {
				type : "list",
				textReadOnly:true
			}
			, lookupDisplay : true
			, styleCallback: function(grid, dataCell){
			    var ret = {}
                if(dataCell.item.rowState == 'created'){
                    ret.editable = true;
                } else {
                    ret.editable = false;
                    ret.styleName = "disable-column";
                }
			    return ret;
			}
		}, {
			name : "fotrContGbCd"
			, fieldName : "fotrContGbCd"
			, header : { text : msg.fotrContGbCd + " *" }
			, values : fotrContGbCode
			, labels : fotrContGbValues
			, editor : {
				type : "list",
				textReadOnly:true
			}
			, lookupDisplay : true
			, styleCallback: function(grid, dataCell){
			    var ret = {}
                if(dataCell.item.rowState == 'created'){
                    ret.editable = true;
                } else {
                    ret.editable = false;
                    ret.styleName = "disable-column";
                }
			    return ret;
			}
		}, {
			name : "dispSeq"
			, fieldName : "dispSeq"
			, type: "data"
			, numberFormat: "#0"
			, editor : {
				type: "number"
				, integerOnly : true // 정수값만 허용
				, maxLength : 5
			}
			, header : { text : msg.dispSeq + " *" }
		}, {
			 name : "useYn",
			 fieldName : "useYn",
			 header : { text : msg.useYn + " *" },
			 width : 80,
			 renderer: {
				 type: "check",
				 trueValues: "Y",
				 falseValues: "N"
			 }
		}
	]
	, props : {
		  width : "100%"
		, autoFitHeight : false
		, sumRowVisible : false
		, fitStyle : "evenFill"
		, checkbox : true
		, crud : true
		, form : "footerListForm"
		, action : _baseUrl + "display/footerMgmt.getFooterMgmtGroup.do"
		, saveAction : _baseUrl + "display/footerMgmt.saveCcFotrInfoGroup.do"
	}
};
