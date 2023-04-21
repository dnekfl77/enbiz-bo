var titleMsg = x2coMessage.getMessage( {
    deliPolcNo             : "vendorMgmt.deliveryPolicyGrid.deliPolcNo"
    ,entrNo                : "vendorMgmt.deliveryPolicyGrid.entrNo"
    ,entrNm                : "vendorMgmt.deliveryPolicyGrid.entrNm"
    ,dlexTypCd             : "vendorMgmt.deliveryPolicyGrid.dlexTypCd"
    ,stdAmt                : "vendorMgmt.deliveryPolicyGrid.stdAmt"
    ,dlexAmt               : "vendorMgmt.deliveryPolicyGrid.dlexAmt"
    ,ferryRgnDlexAmt       : "vendorMgmt.deliveryPolicyGrid.ferryRgnDlexAmt"
    ,jejuDlex              : "vendorMgmt.deliveryPolicyGrid.jejuDlex"
    ,jejuFerryRgnDlexAmt   : "vendorMgmt.deliveryPolicyGrid.jejuFerryRgnDlexAmt"
    ,rtnAmt                : "vendorMgmt.deliveryPolicyGrid.rtnAmt"
    ,useYn                 : "vendorMgmt.deliveryPolicyGrid.useYn"
    ,sysModId              : "vendorMgmt.deliveryPolicyGrid.sysModId"
    ,sysModDtm             : "vendorMgmt.deliveryPolicyGrid.sysModDtm"
});

var validMsg = x2coMessage.getMessage( {
    _notnull : 'vendorMgmt.grid.msg.notnull'
});

$.namespace("vendorDeliveryPolicyGrid.settings");
vendorDeliveryPolicyGrid.settings = {
    fields : [
        { fieldName: "deliPolcNo",           dataType: "text" }
        ,{ fieldName: "entrNo",              dataType: "text" }
        ,{ fieldName: "entrNm",              dataType: "text" }
        ,{ fieldName: "dlexTypCd",           dataType: "text" }
        ,{ fieldName: "stdAmt",              dataType: "number" }
        ,{ fieldName: "dlexAmt",             dataType: "number" }
        ,{ fieldName: "ferryRgnDlexAmt",     dataType: "number" }
        ,{ fieldName: "jejuDlex",            dataType: "number" }
        ,{ fieldName: "jejuFerryRgnDlexAmt", dataType: "number" }
        ,{ fieldName: "rtnAmt",              dataType: "number" }
        ,{ fieldName: "useYn",               dataType: "text" }
        ,{ fieldName: "sysModId",            dataType: "text" }
        ,{ fieldName: "sysModDtm",           dataType: "text" }
    ]
    ,columns : [
        {
            name: 'deliPolcNo'
			,fieldName: 'deliPolcNo'
			,visible: false
			,header: { text: titleMsg.deliPolcNo }
        }
        ,{
            name: 'entrNo'
			,fieldName: 'entrNo'
			,header: { text: titleMsg.entrNo }
			,editable: false
			,styleName: 'disable-column'
        }
        ,{
            name: 'entrNm'
			,fieldName: 'entrNm'
			,width: '150'
			,header: { text: titleMsg.entrNm }
			,styleName: "left-column"
			,editable: false
			,styleName: 'disable-column'
        }
        ,{
            name: 'dlexTypCd'
			,fieldName: 'dlexTypCd'
			,width: '80'
			,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: titleMsg.dlexTypCd + " *" }
			,values : Object.keys(_dlex_type_select)
			,labels : com.x2commerce.common.Util.getValues(_dlex_type_select)
			,lookupDisplay : true
			,editor : {
                type : "dropdown"
			    ,textReadOnly:true
            }
        }
        ,{
            name: 'stdAmt'
			,fieldName: 'stdAmt'
			,type: "data"
			,numberFormat: "#,##0"
			,width: '80'
			,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: titleMsg.stdAmt + " *" }
			,styleName: "right-column"
            ,styleCallback: function(grid, dataCell){
                var ret = {};
                var _dlexTypCd = grid.getValue(dataCell.index.itemIndex, 'dlexTypCd');

                switch (_dlexTypCd) {
                //전체 입력불가
                case '10':
                    ret.editable = false;
                    break;
                case '20':
                    ret.editable = false;
                    break;
                case '30':
                    ret.editable = true;
                    break;
                default:
                    ret.editable = true;
                    break;
                }

                return ret;
            }
        }
        ,{
            name: 'dlexAmt'
			,fieldName: 'dlexAmt'
			,type: "data"
			,numberFormat: "#,##0"
			,width: '80'
			,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: titleMsg.dlexAmt + " *" }
			,styleName: "right-column"
            ,styleCallback: function(grid, dataCell){
                var ret = {};
                var _dlexTypCd = grid.getValue(dataCell.index.itemIndex, 'dlexTypCd');

                switch (_dlexTypCd) {
                //전체 입력불가
                case '10':
                    ret.editable = false;
                    break;
                case '20':
                    ret.editable = true;
                    break;
                case '30':
                    ret.editable = true;
                    break;
                default:
                    ret.editable = true;
                    break;
                }

                return ret;
            }
        }
        ,{
            name: 'ferryRgnDlexAmt'
			,fieldName: 'ferryRgnDlexAmt'
			,type: "data"
			,numberFormat: "#,##0"
			,width: '100'
			,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: titleMsg.ferryRgnDlexAmt + " *" }
			,styleName: "right-column"
            ,styleCallback: function(grid, dataCell){
                var ret = {};
                var _dlexTypCd = grid.getValue(dataCell.index.itemIndex, 'dlexTypCd');

                switch (_dlexTypCd) {
                //전체 입력불가
                case '10':
                    ret.editable = false;
                    break;
                case '20':
                    ret.editable = true;
                    break;
                case '30':
                    ret.editable = true;
                    break;
                default:
                    ret.editable = true;
                    break;
                }

                return ret;
            }
        }
        ,{
            name: 'jejuDlex'
			,fieldName: 'jejuDlex'
			,type: "data"
			,numberFormat: "#,##0"
			,width: '100'
			,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: titleMsg.jejuDlex + " *" }
			,styleName: "right-column"
            ,styleCallback: function(grid, dataCell){
                var ret = {};
                var _dlexTypCd = grid.getValue(dataCell.index.itemIndex, 'dlexTypCd');

                switch (_dlexTypCd) {
                //전체 입력불가
                case '10':
                    ret.editable = false;
                    break;
                case '20':
                    ret.editable = true;
                    break;
                case '30':
                    ret.editable = true;
                    break;
                default:
                    ret.editable = true;
                    break;
                }

                return ret;
            }
        }
        ,{
            name: 'jejuFerryRgnDlexAmt'
			,fieldName: 'jejuFerryRgnDlexAmt'
			,type: "data"
			,numberFormat: "#,##0"
			,width: '150'
			,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: titleMsg.jejuFerryRgnDlexAmt + " *" }
			,styleName: "right-column"
            ,styleCallback: function(grid, dataCell){
                var ret = {};
                var _dlexTypCd = grid.getValue(dataCell.index.itemIndex, 'dlexTypCd');

                switch (_dlexTypCd) {
                //전체 입력불가
                case '10':
                    ret.editable = false;
                    break;
                case '20':
                    ret.editable = true;
                    break;
                case '30':
                    ret.editable = true;
                    break;
                default:
                    ret.editable = true;
                    break;
                }

                return ret;
            }
        }
        ,{
            name: 'rtnAmt'
			,fieldName: 'rtnAmt'
			,type: "data"
			,numberFormat: "#,##0"
			,width: '80'
			,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: titleMsg.rtnAmt + " *" }
			,styleName: "right-column"
        }
        ,{
            name: 'useYn'
			,fieldName: 'useYn'
			,width: '80'
			,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: titleMsg.useYn + " *" }
            ,sortable: false     // 정렬 기능 비활성화
            ,lookupDisplay: true // 그리드 표시 방식 ( true : label, false : value)
            ,editable : false
			,renderer: {
                type: "check"
                ,trueValues: "Y"
                ,falseValues: "N"
            }
        }
        ,{
            name: 'sysModId'
			,fieldName: 'sysModId'
			,width: '80'
			,editable : false
			,styleName: 'disable-column'
			,header: { text: titleMsg.sysModId }
        }
        ,{
            name: 'sysModDtm'
			,fieldName: 'sysModDtm'
			,width: '120'
			,editable : false
			,styleName: 'disable-column'
			,header: { text: titleMsg.sysModDtm }
        }
    ]
    ,validations : [
    ]
    ,props : {
        form : "vendorDeliveryPolicyGridForm"                                   // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "vendor/vendorMgmt.deliveryPolicyListView.do"          // Request URL
        ,saveAction : _baseUrl + "vendor/vendorMgmt.saveEtDeliPolcBase.do"      // Save URL
        ,width : "100%"
        //,height : "100%"              // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        ,autoFitHeight : true
        ,paging : true
        ,sumRowVisible : false
        ,checkbox : true
        ,crud : true
        ,fitStyle : "none"      //evenFill : 채우기
    }
};
