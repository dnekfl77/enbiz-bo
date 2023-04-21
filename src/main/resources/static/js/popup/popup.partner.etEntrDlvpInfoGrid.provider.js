var col = x2coMessage.getMessage( {
    _entrDlvpNo  : "vendorMgmt.enterprise.delivery.grid.entrDlvpNo"
    ,_entrNo     : "vendorMgmt.enterprise.delivery.grid.entrNo"
    ,_dlvpTypCd  : "vendorMgmt.enterprise.delivery.grid.dlvpTypCd"
    ,_dlvpNm     : "vendorMgmt.enterprise.delivery.grid.dlvpNm"
    ,_useYn      : "vendorMgmt.enterprise.delivery.grid.useYn"
    ,_zipNoSeq   : "vendorMgmt.enterprise.delivery.grid.zipNoSeq"
    ,_zipNo      : "vendorMgmt.enterprise.delivery.grid.zipNo"
    ,_zipAddr    : "vendorMgmt.enterprise.delivery.grid.zipAddr"
    ,_dtlAddr    : "vendorMgmt.enterprise.delivery.grid.dtlAddr"
    ,_utakmnNm   : "vendorMgmt.enterprise.delivery.grid.utakmnNm"
    ,_aempTelNo  : "vendorMgmt.enterprise.delivery.grid.aempTelNo"
    ,_aempCellNo : "vendorMgmt.enterprise.delivery.grid.aempCellNo"
    ,_sysModId   : "vendorMgmt.enterprise.delivery.grid.sysModId"
    ,_sysModDtm  : "vendorMgmt.enterprise.delivery.grid.sysModDtm"
});

var validMsg = x2coMessage.getMessage( {
    _notnull : 'vendorMgmt.grid.msg.notnull'
});

$.namespace("etEntrDlvpInfoGrid.settings");
etEntrDlvpInfoGrid.settings = {
    fields : [
        { fieldName: "entrDlvpNo",       dataType: "text" }
        ,{ fieldName: "entrNo",     dataType: "text" }
        ,{ fieldName: "dlvpTypCd",     dataType: "text" }
        ,{ fieldName: "dlvpNm",     dataType: "text" }
        ,{ fieldName: "utakmnNm",    dataType: "text" }
        ,{ fieldName: "aempTelRgnNo",    dataType: "text" }
        ,{ fieldName: "aempTelTxnoNo",    dataType: "text" }
        ,{ fieldName: "aempTelEndNo",    dataType: "text" }
        ,{ fieldName: "aempTelNo",    dataType: "text" }
        ,{ fieldName: "aempCellSctNo",    dataType: "text" }
        ,{ fieldName: "aempCellTxnoNo",    dataType: "text" }
        ,{ fieldName: "aempCellEndNo",    dataType: "text" }
        ,{ fieldName: "aempCellNo",    dataType: "text" }
        ,{ fieldName: "zipNoSeq",  dataType: "text" }
        ,{ fieldName: "zipNo",   dataType: "text" }
        ,{ fieldName: "zipAddr",   dataType: "text" }
        ,{ fieldName: "dtlAddr",    dataType: "text" }
        ,{ fieldName: "useYn",       dataType: "text" }
        ,{ fieldName: "sysModId",    dataType: "text" }
        ,{ fieldName: "sysModDtm",    dataType: "text" }
    ]
    ,columns : [{
            name: 'entrDlvpNo'
            ,fieldName: 'entrDlvpNo'
            ,visible: false
            ,header: { text: col._entrDlvpNo }
        }
        ,{
            name: 'entrNo'
            ,fieldName: 'entrNo'
            ,visible: false
            ,header: { text: col._entrNo }
        }
        ,{
            name: 'dlvpTypCd'
            ,fieldName: 'dlvpTypCd'
            ,width: '80'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._dlvpTypCd + " *" }
            ,values : Object.keys(_dlvp_type_select)
            ,labels : com.x2commerce.common.Util.getValues(_dlvp_type_select)
            ,lookupDisplay : true
            ,editor : {
                type : "dropdown"
                ,textReadOnly:true
            }
        }
        ,{
            name: 'dlvpNm'
            ,fieldName: 'dlvpNm'
            ,width: '80'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._dlvpNm + " *" }
            ,editor: {
                maxLength : 100
            }
        }
        ,{
            name: 'utakmnNm'
            ,fieldName: 'utakmnNm'
            ,width: '80'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._utakmnNm + " *" }
            ,editor: {
                maxLength : 50
            }
        }
        ,{
            name: 'aempTelRgnNo'
            ,fieldName: 'aempTelRgnNo'
            ,width: '40'
            ,header: { text: col._aempTelNo }
            ,editor: {
                maxLength : 3
            }
            ,visible: false
        }
        ,{
            name: 'aempTelTxnoNo'
            ,fieldName: 'aempTelTxnoNo'
            ,width: '40'
            ,header: { text: col._aempTelNo }
            ,editor: {
                maxLength : 4
            }
            ,visible: false
        }
        ,{
            name: 'aempTelEndNo'
            ,fieldName: 'aempTelEndNo'
            ,width: '40'
            ,header: { text: col._aempTelNo }
            ,editor: {
                maxLength : 4
            }
            ,visible: false
        }
        ,{
            name: 'aempTelNo'
            ,fieldName: 'aempTelNo'
            ,width: '120'
            ,header: { text: col._aempTelNo }
            ,editor: {
                maxLength : 12
            }
            ,textFormat: '(02|0[3-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4}); \$1-$2-$3'
        }
        ,{
            name: 'aempCellSctNo'
            ,fieldName: 'aempCellSctNo'
            ,width: '40'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._aempCellNo + " *" }
            ,editor: {
                maxLength : 3
            }
            ,visible: false
        }
        ,{
            name: 'aempCellTxnoNo'
            ,fieldName: 'aempCellTxnoNo'
            ,width: '40'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._aempCellNo + " *" }
            ,editor: {
                maxLength : 4
            }
            ,visible: false
        }
        ,{
            name: 'aempCellEndNo'
            ,fieldName: 'aempCellEndNo'
            ,width: '40'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._aempCellNo + " *" }
            ,editor: {
                maxLength : 4
            }
            ,visible: false
        }
        ,{
            name: 'aempCellNo'
            ,fieldName: 'aempCellNo'
            ,width: '120'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._aempCellNo + " *" }
            ,editor: {
                maxLength : 12
            }
            ,textFormat: '(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4}); \$1-$2-$3'
        }
        ,{
            name: 'zipNoSeq'
            ,fieldName: 'zipNoSeq'
            ,visible: false
            ,header: { text: col._zipNoSeq + " *" }
        }
        ,{
            name: 'zipNo'
            ,fieldName: 'zipNo'
            ,width: '80'
            ,button: 'action'
            ,header: { text: col._zipNo + " *" }
            ,editable : false
        }
        ,{
            name: 'zipAddr'
            ,fieldName: 'zipAddr'
            ,width: '100'
            ,editable : false
            ,header: { text: col._zipAddr + " *" }
        }
        ,{
            name: 'dtlAddr'
            ,fieldName: 'dtlAddr'
            ,width: '150'
            ,header: { text: col._dtlAddr + " *" }
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
        { fieldName : "dlvpTypCd"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "dlvpNm"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "utakmnNm"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "aempCellSctNo"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "aempCellTxnoNo"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "aempCellEndNo"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "useYn"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
    ]
    ,props : {
        form : "enterpriseDeliveryGridForm"         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "" // Request URL
        ,saveAction : _baseUrl + ""
        ,autoFitHeight : false       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,height : 120
        ,popup : false               // 그리드 설정 - 팝업 자동 resize
        ,crud : true               // 그리드 설정 - cud 상태 컬럼 노출 여부
        ,checkbox : true            // 그리드 설정 - 체크박스 필드 노출 여부
        ,paging : false              // 페이지네이션 사용 여부
    }
};