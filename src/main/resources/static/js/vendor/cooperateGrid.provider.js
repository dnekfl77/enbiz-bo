var _gridHeader = x2coMessage.getMessage({
   entrNo      : 'vendorMgmt.cooperateGrid.header.entrNo'
   ,entrNm     : 'vendorMgmt.cooperateGrid.header.entrNm'
   ,trdStatNm  : 'vendorMgmt.cooperateGrid.header.trdStatNm'
   ,bmanNo     : 'vendorMgmt.cooperateGrid.header.bmanNo'
   ,contStrtDy : 'vendorMgmt.cooperateGrid.header.contStrtDy'
   ,contEndDy  : 'vendorMgmt.cooperateGrid.header.contEndDy'
   ,sysModId   : 'vendorMgmt.cooperateGrid.header.sysModId'
   ,sysModDtm  : 'vendorMgmt.cooperateGrid.header.sysModDtm'
});

$.namespace("cooperateGrid.settings");
cooperateGrid.settings = {
    fields: [
        {fieldName: "entrNo"}
        ,{fieldName: "entrNm"}
        ,{fieldName: "trdStatNm"}
        ,{fieldName: "bmanNo"}
        ,{fieldName: "contStrtDy"}
        ,{fieldName: "contEndDy"}
        ,{fieldName: "sysModId"}
        ,{fieldName: "sysModDtm"}
    ]
    ,columns: [
        {
            name: "entrNo"
            ,fieldName: "entrNo"
            ,editable : false
            ,width: '80'
            ,header: { text : _gridHeader.entrNo }
            ,styleName : "column-underline-c"
        }
        ,{
            name: "entrNm"
            ,fieldName: "entrNm"
            ,editable : false
            ,width: '200'
            ,styleName: 'left-column'
            ,header: { text: _gridHeader.entrNm }
            ,styleName : "column-underline-c"
        }
        ,{
            name: "trdStatNm"
            ,fieldName: "trdStatNm"
            ,editable : false
            ,width: '80'
            ,header: { text: _gridHeader.trdStatNm }
        }
        ,{
            name: "bmanNo"
            ,fieldName: "bmanNo"
            ,editable : false
            ,width: '80'
            ,header: { text: _gridHeader.bmanNo }
            ,textFormat: '([1-9]{1}[0-9]{2})([0-9]{2})([0-9]{5}); \$1-$2-$3'
        }
        ,{
            name: "contStrtDy"
            ,fieldName: "contStrtDy"
            ,editable : false
            ,width: '80'
            ,header: { text: _gridHeader.contStrtDy }
            ,textFormat: '([0-9]{4})([0-9]{2})([0-9]{2}); \$1-$2-$3'
        }
        ,{
            name: "contEndDy"
            ,fieldName: "contEndDy"
            ,editable : false
            ,width: '80'
            ,header: { text: _gridHeader.contEndDy }
            ,textFormat: '([0-9]{4})([0-9]{2})([0-9]{2}); \$1-$2-$3'
        }
        ,{
            name: 'sysModId'
			,fieldName: 'sysModId'
			,width: '80'
			,editable : false
			,header: { text: _gridHeader.sysModId }
        }
        ,{
            name: 'sysModDtm'
			,fieldName: 'sysModDtm'
			,width: '120'
			,editable : false
			,header: { text: _gridHeader.sysModDtm }
        }
    ]
    ,props : {
        form : "cooperateSearchForm"
        ,action : _baseUrl + "vendor/getCooperateByConditionView.do"
        ,saveAction : _baseUrl + "vendor/saveCooperate.do"
        ,width : "100%"
        // ,height : "500px", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        ,autoFitHeight: true
        ,sumRowVisible: false
        ,fitStyle: 'evenFill'
        ,checkbox: false
        ,crud: false
        ,paging: true
    }
}