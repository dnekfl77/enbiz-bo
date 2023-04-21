var col = x2coMessage.getMessage( {
    _entrNo     : "vendorMgmt.enterprise.assignEmployee.grid.entrNo"
    ,_aempSeq   : "vendorMgmt.enterprise.assignEmployee.grid.aempSeq"
    ,_dutyCd    : "vendorMgmt.enterprise.assignEmployee.grid.dutyCd"
    ,_aempNm    : "vendorMgmt.enterprise.assignEmployee.grid.aempNm"
    ,_telNo     : "vendorMgmt.enterprise.assignEmployee.grid.telNo"
    ,_cellNo    : "vendorMgmt.enterprise.assignEmployee.grid.cellNo"
    ,_emailAddr : "vendorMgmt.enterprise.assignEmployee.grid.emailAddr"
    ,_sysModId  : "vendorMgmt.enterprise.assignEmployee.grid.sysModId"
    ,_sysModDtm : "vendorMgmt.enterprise.assignEmployee.grid.sysModDtm"
});

var validMsg = x2coMessage.getMessage( {
    _notnull : 'vendorMgmt.grid.msg.notnull'
});

$.namespace("cooperateEmployeeGrid.settings");
cooperateEmployeeGrid.settings = {
    fields : [
        { fieldName: "entrNo",       dataType: "text" }
        ,{ fieldName: "aempSeq",     dataType: "text" }
        ,{ fieldName: "dutyCd",     dataType: "text" }
        ,{ fieldName: "aempNm",     dataType: "text" }
        ,{ fieldName: "telRgnNo",       dataType: "text" }
        ,{ fieldName: "telTxnoNo",       dataType: "text" }
        ,{ fieldName: "telEndNo",       dataType: "text" }
        ,{ fieldName: "telNo",       dataType: "text" }
        ,{ fieldName: "cellSctNo",  dataType: "text" }
        ,{ fieldName: "cellTxnoNo",  dataType: "text" }
        ,{ fieldName: "cellEndNo",  dataType: "text" }
        ,{ fieldName: "cellNo",       dataType: "text" }
        ,{ fieldName: "emailAddr",   dataType: "text" }
        ,{ fieldName: "sysModId",    dataType: "text" }
        ,{ fieldName: "sysModDtm",    dataType: "text" }
    ]
    ,columns : [
        {
            name: 'entrNo'
            ,fieldName: 'entrNo'
            ,visible: false
            ,header: { text: col._entrNo }
        }
        ,{
            name: 'aempSeq'
            ,fieldName: 'aempSeq'
            ,visible: false
            ,header: { text: col._aempSeq }
        }
        ,{
            name: 'dutyCd'
            ,fieldName: 'dutyCd'
            ,width: '80'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._dutyCd + " *" }
            ,values : Object.keys(_duty_cd_select)
            ,labels : com.x2commerce.common.Util.getValues(_duty_cd_select)
            ,lookupDisplay : true
            ,editor : {
                type : "dropdown"
//                ,dropDownCount : 2
//                ,values : Object.keys(_duty_cd_select)
//                ,labels : com.x2commerce.common.Util.getValues(_duty_cd_select)
                ,textReadOnly:true
            }
        }
        ,{
            name: 'aempNm'
            ,fieldName: 'aempNm'
            ,width: '80'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._aempNm + " *" }
        }
        ,{
            name: 'telRgnNo'
            ,fieldName: 'telRgnNo'
            ,width: '40'
            ,header: { text: col._telNo }
            ,editor: {
                maxLength : 3
            }
            ,visible: false
        }
        ,{
            name: 'telTxnoNo'
            ,fieldName: 'telTxnoNo'
            ,width: '40'
            ,header: { text: col._telNo }
            ,editor: {
                maxLength : 4
            }
            ,visible: false
        }
        ,{
            name: 'telEndNo'
            ,fieldName: 'telEndNo'
            ,width: '40'
            ,header: { text: col._telNo }
            ,editor: {
                maxLength : 4
            }
            ,visible: false
        }
        ,{
            name: 'telNo'
            ,fieldName: 'telNo'
            ,width: '120'
            ,header: { text: col._telNo }
            ,editor: {
                maxLength : 12
            }
            ,textFormat: '(02|0[3-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4}); \$1-$2-$3'
        }
        ,{
            name: 'cellSctNo'
            ,fieldName: 'cellSctNo'
            ,width: '40'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._cellNo + " *" }
            ,editor: {
                maxLength : 3
            }
            ,visible: false
        }
        ,{
            name: 'cellTxnoNo'
            ,fieldName: 'cellTxnoNo'
            ,width: '40'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._cellNo + " *" }
            ,editor: {
                maxLength : 4
            }
            ,visible: false
        }
        ,{
            name: 'cellEndNo'
            ,fieldName: 'cellEndNo'
            ,width: '40'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._cellNo + " *" }
            ,editor: {
               maxLength : 4
            }
            ,visible: false
        }
        ,{
            name: 'cellNo'
            ,fieldName: 'cellNo'
            ,width: '120'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._cellNo + " *" }
            ,editor: {
                maxLength : 12
            }
            ,textFormat: '(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4}); \$1-$2-$3'
        }
        ,{
            name: 'emailAddr'
            ,fieldName: 'emailAddr'
            ,width: '200'
            ,header: { styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text: col._emailAddr + " *" }
            ,textFormat : '([a-zA-Z0-9._%+-]+)(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}); \$1$2'
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
        { fieldName : "dutyCd"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "aempNm"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "cellSctNo"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "cellTxnoNo"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "cellEndNo"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
        ,{ fieldName : "emailAddr"
            , criteria : "value === undefined || value === NaN"
            , error : { level : "error", message : validMsg._notnull}
        }
    ]
    ,props : {
        form : "enterpiseAssignEmployeeGridForm"         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "vendor/getEnterpriseAssignEmployeeList.do" // Request URL
        ,saveAction : _baseUrl + "vendor/saveEtEntrAempInfo.do"
        ,autoFitHeight : false       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,height : 192
//        ,popup : true               // 그리드 설정 - 팝업 자동 resize
        ,crud : true               // 그리드 설정 - cud 상태 컬럼 노출 여부
        ,checkbox : true            // 그리드 설정 - 체크박스 필드 노출 여부
        ,paging : false              // 페이지네이션 사용 여부
        ,defrow : 5
    }
};