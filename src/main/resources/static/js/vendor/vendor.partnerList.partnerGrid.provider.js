var col = x2coMessage.getMessage( {
    _entrNo         : "vendorMgmt.partner.list.result.grid.entrNo"
    ,_entrNm        : "vendorMgmt.partner.list.result.grid.entrNm"
    ,_trdStatNm     : "vendorMgmt.partner.list.result.grid.trdStatNm"
    ,_rpstmnNm      : "vendorMgmt.partner.list.result.grid.rpstmnNm"
    ,_bmanNo        : "vendorMgmt.partner.list.result.grid.bmanNo"
    ,_btype         : "vendorMgmt.partner.list.result.grid.btype"
    ,_bkind         : "vendorMgmt.partner.list.result.grid.bkind"
    ,_aempNm        : "vendorMgmt.partner.list.result.grid.aempNm"
    ,_aempTelNo     : "vendorMgmt.partner.list.result.grid.aempTelNo"
    ,_aempCellNo    : "vendorMgmt.partner.list.result.grid.aempCellNo"
    ,_trdTypNm      : "vendorMgmt.partner.list.result.grid.trdTypNm"
    ,_sysModNm      : "vendorMgmt.partner.list.result.grid.sysModNm"
    ,_sysModDtm     : "vendorMgmt.partner.list.result.grid.sysModDtm"
});

$.namespace("partnerGrid.settings");
partnerGrid.settings = {
    fields : [
        { fieldName: "entrNo",       dataType: "text" }
        ,{ fieldName: "entrNm",     dataType: "text" }
        ,{ fieldName: "trdStatNm",     dataType: "text" }
        ,{ fieldName: "rpstmnNm",       dataType: "text" }
        ,{ fieldName: "bmanNo",  dataType: "text" }
        ,{ fieldName: "btyp",   dataType: "text" }
        ,{ fieldName: "bkind",   dataType: "text" }
        ,{ fieldName: "aempNm",    dataType: "text" }
        ,{ fieldName: "aempTelNo",    dataType: "text" }
        ,{ fieldName: "aempCellNo",    dataType: "text" }
        ,{ fieldName: "trdTypNm",    dataType: "text" }
        ,{ fieldName: "sysModId",    dataType: "text" }
        ,{ fieldName: "sysModDtm",    dataType: "text" }
    ]
    ,columns : [
		{
            name: 'entrNo'
            ,fieldName: 'entrNo'
            ,width: '80'
            ,header: { text: col._entrNo }
            ,styleName : "column-underline-c"
        }
        ,{
            name: 'entrNm'
            ,fieldName: 'entrNm'
            ,width: '200'
            ,styleName: 'left-column'
            ,header: { text: col._entrNm }
            ,styleName : "column-underline-l"
        }
        ,{
            name: 'trdStatNm'
            ,fieldName: 'trdStatNm'
            ,width: '80'
            ,header: { text: col._trdStatNm }
        }
        ,{
            name: 'rpstmnNm'
            ,fieldName: 'rpstmnNm'
            ,width: '80'
            ,header: { text: col._rpstmnNm }
        }
        ,{
            name: 'bmanNo'
            ,fieldName: 'bmanNo'
            ,width: '120'
            ,header: { text: col._bmanNo }
//            ,"displayCallback": function(grid,index,value){
//                var formattingValue = '';
//                formattingValue += value.substr(0,3);
//                formattingValue += '-';
//                formattingValue += value.substr(3,2);
//                formattingValue += '-';
//                formattingValue += value.substr(5);
//                return formattingValue;
//            }
            ,textFormat: '([1-9]{1}[0-9]{2})([0-9]{2})([0-9]{5}); \$1-$2-$3'
        }
        ,{
            name: 'btyp'
            ,fieldName: 'btyp'
            ,width: '80'
            ,styleName: 'left-column'
            ,header: { text: col._btype }
        }
        ,{
            name: 'bkind'
            ,fieldName: 'bkind'
            ,width: '80'
            ,styleName: 'left-column'
            ,header: { text: col._bkind }
        }
        ,{
            name: 'aempNm'
            ,fieldName: 'aempNm'
            ,width: '80'
            ,header: { text: col._aempNm }
        }
        ,{
            name: 'aempTelNo'
            ,fieldName: 'aempTelNo'
            ,width: '120'
            ,header: { text: col._aempTelNo }
            ,textFormat: '(02|0[3-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4}); \$1-$2-$3'
        }
        ,{
            name: 'aempCellNo'
            ,fieldName: 'aempCellNo'
            ,width: '120'
            ,header: { text: col._aempCellNo }
            ,textFormat: '(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4}); \$1-$2-$3'
        }
        ,{
            name: 'trdTypNm'
            ,fieldName: 'trdTypNm'
            ,width: '80'
            ,header: { text: col._trdTypNm }
        }
        ,{
            name: 'sysModId'
            ,fieldName: 'sysModId'
            ,width: '80'
            ,header: { text: col._sysModNm }
        }
        ,{
            name: 'sysModDtm'
            ,fieldName: 'sysModDtm'
            ,width: '120'
            ,header: { text: col._sysModDtm }
        }
	]
    ,validations : [
    ]
    ,props : {
        form : "partnerGridForm"         // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + "vendor/vendorMgmt.partnerListView.do" // Request URL
        ,autoFitHeight : true       // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,sumRowVisible : false      // 그리드 설정 - 하단 합계 영역 노출 여부
        ,popup : false               // 그리드 설정 - 팝업 자동 resize
        ,crud : false               // 그리드 설정 - cud 상태 컬럼 노출 여부
        ,checkbox : false            // 그리드 설정 - 체크박스 필드 노출 여부
        ,fitStyle : 'none'      // evenFill, none 그리드 설정 - 그리드 너비에 맞게 컬럼 사이즈 최적화 여부
        ,paging : true              // 페이지네이션 사용 여부
        ,defrow : 10
    }
};