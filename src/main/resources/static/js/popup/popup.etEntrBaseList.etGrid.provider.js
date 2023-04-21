var col = x2coMessage.getMessage( {
    entrNo    :		"baseInfoMgmt.label.popup.etEntrBaseList.entrNo",     //협력사 번호
    entrNm    :	    "baseInfoMgmt.label.popup.etEntrBaseList.entrNm",     //협력사명
    entrGbNm  :     "baseInfoMgmt.label.popup.etEntrBaseList.entrGbNm",   //협력사 구분
    entrGbCd  :		"baseInfoMgmt.label.popup.etEntrBaseList.entrGbCd",   //협력사 구분코드
    trdStatNm :     "baseInfoMgmt.label.popup.etEntrBaseList.trdStatNm",  //거래상태
    trdStatCd :	    "baseInfoMgmt.label.popup.etEntrBaseList.trdStatCd",  //거래상태코드
    bmanNo	  :	    "baseInfoMgmt.label.popup.etEntrBaseList.bmanNo",     //사업자번호
    rpstmnNm  :		"baseInfoMgmt.label.popup.etEntrBaseList.rpstmnNm",   //대표자번호
    aempNm    :     "baseInfoMgmt.label.popup.etEntrBaseList.aempNm",     //담당자명
    btyp      :     "baseInfoMgmt.label.popup.etEntrBaseList.btyp",       //업태
    bkind	  :     "baseInfoMgmt.label.popup.etEntrBaseList.bkind"       //업종
});

$.namespace("etGrid.settings");
etGrid.settings = {
    fields:[{
      fieldName : "entrNo"
    },{
      fieldName : "entrNm"
    },{
      fieldName : "entrGbNm"
    },{
      fieldName : "entrGbCd"
    },{
      fieldName : "trdStatNm"
    },{
      fieldName : "trdStatCd"
    },{
      fieldName : "bmanNo"
    },{
      fieldName : "rpstmnNm"
    },{
      fieldName : "aempNm"
    },{
      fieldName : "btyp"
    },{
      fieldName : "bkind"
    }],
    columns:[{
        name : "entrNo",
        fieldName : "entrNo",
        header : {
            text : col.entrNo
        },
        width : 80
    }, {
        name : "entrNm",
        fieldName : "entrNm",
        header : {
            text : col.entrNm
        },
        width : 200,
        styleName : "left-column"
    }, {
        name : "entrGbNm",
        fieldName : "entrGbNm",
        header : {
            text : col.entrGbNm
        },
        width : 100,
        editable : false
    }, {
        name : "entrGbCd",
        fieldName : "entrGbCd",
        header : {
            text : col.entrGbCd
        },
        width : 140,
        visible : false
    }, {
        name : "trdStatNm",
        fieldName : "trdStatNm",
        header : {
            text : col.trdStatNm
        },
        width : 140
    }, {
        name : "trdStatCd",
        fieldName : "trdStatCd",
        header : {
            text : col.trdStatCd
        },
        width : 140,
        visible: false
    }, {
        name : "bmanNo",
        fieldName : "bmanNo",
        header : {
            text : col.bmanNo
        },
        width : 130
        ,textFormat: '([1-9]{1}[0-9]{2})([0-9]{2})([0-9]{5}); \$1-$2-$3'

    }, {
        name : "rpstmnNm",
        fieldName : "rpstmnNm",
        header : {
            text : col.rpstmnNm
        },
        width : 130
    }, {
        name : "aempNm",
        fieldName : "aempNm",
        header : {
            text : col.aempNm
        },
        width : 130
    }, {
        name : "btyp",
        fieldName : "btyp",
        header : {
            text : col.btyp
        },
        width : 130,
        styleName : "left-column"
    },{
        name : "bkind",
        fieldName : "bkind",
        header : {
            text : col.bkind
        },
        width : 130,
        styleName : "left-column"
    } ],

    validations : [
        // { fieldName : "bwNm", criteria : "value === undefined || value.trim() === ''"  , error : { level : "error", message : _bwNmMessage } }
    ],
    props : {
        paging : true,
        // height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        autoFitHeight : true,
        popup : true,
        checkbox : true,
        crud : false,
        sumRowVisible : false,
        form : "etEntrBaseListGridForm",
        action : _baseUrl + "popup/enteranceMgmt.getEtEntrBaseListPopup.do"
    }
};
