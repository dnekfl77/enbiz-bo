var col = x2coMessage.getMessage( {
    holiDt          : 'holidayMgmt.grid.field.date'
    ,holiGbCd       : 'holidayMgmt.grid.field.section.cd'
    ,holiJobGbCd    : 'holidayMgmt.grid.field.job.section.cd'
    ,useYn          : 'holidayMgmt.grid.field.use.yn'
    ,holiMemo       : 'holidayMgmt.grid.field.memo'
    ,errorMessage   : 'holidayMgmt.info.label.upload.err.msg'
});

var alertMsg = x2coMessage.getMessage({
    requireHolidayMsg          		: 'holidayMgmt.alert.msg.requireHolidayMsg'//_dateDefault
    ,requireHolidaySctCdMsg         : 'holidayMgmt.alert.msg.requireHolidaySctCdMsg'//_gubunDefault
    ,requireSctCdMsg                : 'holidayMgmt.alert.msg.requireSctCdMsg'//_jobCdDefault
    ,holidayWrongInputMsg           : 'holidayMgmt.alert.msg.holidayWrongInputMsg'//_wrongDate
    ,sctCdWrongInputMsg             : 'holidayMgmt.alert.msg.sctCdWrongInputMsg'//_wrongJobCd
    ,noSelectedRowMsg               : 'adminCommon.grid.alert.no.selected.row'
    ,confirmDeleteMsg               : 'adminCommon.grid.alert.delete'
    ,overLapHolidayMsg              : 'holidayMgmt.alert.msg.overLapHolidayMsg'//_duplicatedData
    ,checkUploadFileTypeMsg         : 'holidayMgmt.alert.msg.checkUploadFileTypeMsg'//_wrongFileType
    ,jobSctCdWrongInputMsg          : 'holidayMgmt.alert.msg.jobSctCdWrongInputMsg'//_wrongFileType
});

$.namespace("holidayManyGrid.settings");
holidayManyGrid.settings = {
    fields : [
        { fieldName: 'holiDt'       , dataType: "text" },
        { fieldName: 'holiJobGbCd'  , dataType: "text" },
        { fieldName: 'holiGbCd'     , dataType: "text" },
        { fieldName: 'holiMemo'     , dataType: "text" },
        { fieldName: 'useYn'        , dataType: "text" },
        { fieldName: 'errorMessage' , dataType: "text" }
    ]
    ,columns : [{
            name: 'holiDt',
            fieldName: 'holiDt',
            width : 110,
            header: { text: col.holiDt + "*" },
            editor: {
                type: "date",
                datetimeFormat: "yyyy-MM-dd",
                textReadOnly:true
            },
            datetimeFormat : "yyyy-MM-dd"
        },
        {
            name: 'holiJobGbCd',
            fieldName: 'holiJobGbCd',
            width : 100,
            header: { text: col.holiJobGbCd + "*" },
            values : _jobkeys,
            labels : _jobValues,
            editor : {
                type : "list",
                textReadOnly:true
           },
           lookupDisplay : true
        },
        {
            name: 'holiGbCd',
            fieldName: 'holiGbCd',
            width : 100,
            header: { text: col.holiGbCd + "*" },
            values : _gbkeys,
            labels : _gbValues,
            editor : {
                type : "list",
                textReadOnly:true
           },
           lookupDisplay : true
        },
        {
            name: 'holiMemo',
            fieldName: 'holiMemo',
            width: 200,
            header: { text: col.holiMemo },
            editor :{
                maxLength: 100
            },
            styleName: 'left-column'
        },
        {
            name: 'useYn',
            fieldName: 'useYn',
            width : 80,
            header: { text: col.useYn + "*" },
            editable : false,
            renderer: {
               type: "check",
               trueValues: "Y",
               falseValues: "N"
           }
        }, {
            name: "errorMessage",
            fieldName: "errorMessage",
            width : 300,
            header: { text: col.errorMessage },
            styleName : "error-column disable-column multiline-editor",
            editor :{
                type: "multiline"
            },
            editable : false
        }]
    ,props : {
        form : "holiManyGridForm"   // 서버로 전달할 데이터 Form ID값
        ,saveAction : _baseUrl + "system/holidayMgmt.registHolidayExcelList.do"
        ,autoFitHeight : true       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,popup : true               // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true            // 그리드 설정 - 체크박스 필드 노출 여부
        ,width : "100%"             // 그리드 설정 - 넓이 설정(default = 100%)
        ,height : 300               // 그리드 설정 - 높이 설정(default = 자동설정)
        ,crud : true               // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,defrow : 100               // 페이지네이션 - 그리드 영역에 보여질 행 수
    }
};