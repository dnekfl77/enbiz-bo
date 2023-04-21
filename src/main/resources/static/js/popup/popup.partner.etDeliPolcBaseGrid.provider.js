var col = x2coMessage.getMessage( {
    _deliPolcNo             : "vendorMgmt.delivery.policy.grid.deliPolcNo"
    ,_entrNo                : "vendorMgmt.delivery.policy.grid.entrNo"
    ,_dlexTypCd             : "vendorMgmt.delivery.policy.grid.dlexTypCd"
    ,_stdAmt                : "vendorMgmt.delivery.policy.grid.stdAmt"
    ,_dlexAmt               : "vendorMgmt.delivery.policy.grid.dlexAmt"
    ,_ferryRgnDlexAmt       : "vendorMgmt.delivery.policy.grid.ferryRgnDlexAmt"
    ,_jejuDlex              : "vendorMgmt.delivery.policy.grid.jejuDlex"
    ,_jejuFerryRgnDlexAmt   : "vendorMgmt.delivery.policy.grid.jejuFerryRgnDlexAmt"
    ,_rtnAmt                : "vendorMgmt.delivery.policy.grid.rtnAmt"
    ,_useYn                 : "vendorMgmt.delivery.policy.grid.useYn"
    ,_sysModId              : "vendorMgmt.delivery.policy.grid.sysModId"
    ,_sysModDtm             : "vendorMgmt.delivery.policy.grid.sysModDtm"
});

var validMsg = x2coMessage.getMessage( {
    _notnull : 'vendorMgmt.grid.msg.notnull'
});

$.namespace("etDeliPolcBaseGrid.settings");
etDeliPolcBaseGrid.settings = {
    fields : [
        { fieldName: "deliPolcNo",       dataType: "text" }
        ,{ fieldName: "entrNo",     dataType: "text" }
        ,{ fieldName: "dlexTypCd",     dataType: "text" }
        ,{ fieldName: "stdAmt",       dataType: "number" }
        ,{ fieldName: "dlexAmt",  dataType: "number" }
        ,{ fieldName: "ferryRgnDlexAmt",   dataType: "number" }
        ,{ fieldName: "jejuDlex",   dataType: "number" }
        ,{ fieldName: "jejuFerryRgnDlexAmt",    dataType: "number" }
        ,{ fieldName: "rtnAmt",    dataType: "number" }
        ,{ fieldName: "useYn",    dataType: "text" }
        ,{ fieldName: "sysModId",    dataType: "text" }
        ,{ fieldName: "sysModDtm",    dataType: "text" }
    ]
    ,columns : [
        {
            name: 'deliPolcNo'
            ,fieldName: 'deliPolcNo'
            ,visible: false
            ,header: { text: col._deliPolcNo }
        }
        ,{
            name: 'entrNo'
            ,fieldName: 'entrNo'
            ,visible: false
            ,header: { text: col._entrNo }
        }
        ,{
            name: 'dlexTypCd'
            ,fieldName: 'dlexTypCd'
            ,width: '80'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._dlexTypCd + " *" }
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
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._stdAmt + " *" }
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
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._dlexAmt + " *" }
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
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._ferryRgnDlexAmt + " *" }
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
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._jejuDlex + " *" }
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
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._jejuFerryRgnDlexAmt + " *" }
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
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._rtnAmt + " *" }
            ,styleName: "right-column"
        }
        ,{
            name: 'useYn'
            ,fieldName: 'useYn'
            ,width: '80'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._useYn + " *" }
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
            ,header: { text: col._sysModId }
        }
        ,{
            name: 'sysModDtm'
            ,fieldName: 'sysModDtm'
            ,width: '120'
            ,editable : false
            ,styleName: 'disable-column'
            ,header: { text: col._sysModDtm }
        }
    ]
    ,validations : [
    ]
    ,props : {
        form : "deliveryPolicyGridForm"         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "vendor/vendorMgmt.getDeliveryPolicyList.do" // Request URL
        ,saveAction : _baseUrl + "vender/vendorMgmt.saveEtDeliPolcBase.do"
        ,autoFitHeight : false       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,height : 120
        ,popup : false               // 그리드 설정 - 팝업 자동 resize
        ,crud : true               // 그리드 설정 - cud 상태 컬럼 노출 여부
        ,checkbox : true            // 그리드 설정 - 체크박스 필드 노출 여부
        ,paging : false              // 페이지네이션 사용 여부
    }
};