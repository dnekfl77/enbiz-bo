var col = x2coMessage.getMessage( {
      rt_tgt_nm : 'menuMgmt.code.label.rt.tgt.nm'
    , sys_gb_cd : 'menuMgmt.code.label.sys.gb.cd'
    , rt_tgt_typ_cd : 'menuMgmt.code.label.rt.tgt.typ.cd'
    , call_url : 'menuMgmt.code.label.call.url'
    , btn_id : 'menuMgmt.code.label.btn.id'
    , upr_rt_tgt_seq : 'menuMgmt.code.label.upr.rt.tgt.seq'
    , use_yn : 'adminCommon.use.yn'
    , sort_seq : 'menuMgmt.code.label.sort.seq'
    , popup_yn : 'menuMgmt.code.label.popup.yn'
    , cust_info_incl_yn : 'menuMgmt.code.label.cust.info.incl.yn'
    , rmk_cont : 'menuMgmt.code.label.rmk.cont'
});

$.namespace("subMenuListGrid.settings");
subMenuListGrid.settings = {
    fields : [ {
        fieldName : "rtTgtSeq"
    }, {
        fieldName : "rtTgtNm"
    }, {
        fieldName : "sysGbCd"
    }, {
        fieldName : "rtTgtTypCd"
    }, {
        fieldName : "callUrl"
    }, {
        fieldName : "btnId"
    }, {
        fieldName : "uprRtTgtSeq"
    }, {
        fieldName : "useYn"
    }, {
        fieldName : "sortSeq"
    }, {
        fieldName : "popupYn"
    }, {
        fieldName : "rmkCont"
    }],
    columns : [{
        name : "rtTgtSeq",
        fieldName : "rtTgtSeq",
        visible : false
    }, {
        name : "rtTgtNm",
        fieldName : "rtTgtNm",
        header : {
            text : col.rt_tgt_nm + " *"
        },
        width : 180,
        editable : true,
        editor :{
            maxLength: 200
        },
        styleName : "left-column",
    }, {
        name : "sysGbCd",
        fieldName : "sysGbCd",
        header : {
            text : col.sys_gb_cd
        },
        width : 80,
        editable : false,
        styleName : "disable-column",
        values : gbKeys,
        labels : gbValues,
        editor : {
            type : "list",
            textReadOnly:true
        },
        lookupDisplay : true
    }, {
        name : "rtTgtTypCd",
        fieldName : "rtTgtTypCd",
        header : {
            text : col.rt_tgt_typ_cd + " *"
        },
        width : 80,
        editable : true,
        values : typKeys,
        labels : typValues,
        editor : {
            type : "list",
            textReadOnly:true
        },
        lookupDisplay : true
    }, {
        name : "callUrl",
        fieldName : "callUrl",
        header : {
            text : col.call_url
        },
        width : 180,
        editable : true,
        editor :{
            maxLength: 2000
        },
        styleName : "left-column"
    }, {
        name : "btnId",
        fieldName : "btnId",
        header : {
            text : col.btn_id
        },
        width : 120,
        editable : true,
        editor :{
            maxLength: 100
        },
        styleName : "left-column"
    }, {
        name : "uprRtTgtSeq",
        fieldName : "uprRtTgtSeq",
        header : {
            text : col.upr_rt_tgt_seq
        },
        width : 80,
        editable : false,
        styleName : "disable-column"
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.use_yn + " *"
        },
        width : 60,
        editable : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "sortSeq",
        fieldName : "sortSeq",
        header : {
            text : col.sort_seq + " *"
        },
        width : 60,
        editable : true,
        editor :{
            maxLength: 5
        }
    }, {
        name : "popupYn",
        fieldName : "popupYn",
        header : {
            text : col.popup_yn + " *"
        },
        width : 60,
        editable : false,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        }
    }, {
        name : "rmkCont",
        fieldName : "rmkCont",
        header : {
            text : col.rmk_cont
        },
        width : 250,
        editable : true,
        styleName : "left-column"
    }],
    props : {
        paging : true,
        defrow : 10,
        rows : 0,
        width : "100%",
        autoFitHeight : false,
        checkbox : true,
        crud : true,
        form : "menuGridForm",
        sumRowVisible : false,
        fitStyle : "none",
        action : _baseUrl + "system/menuMgmt.getSubMenuList.do",
        saveAction : _baseUrl + "system/menuMgmt.saveSubMenuList.do"
    }
};