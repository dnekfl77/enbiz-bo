var col = x2coMessage.getMessage({
      dispMediaCdNm : 'customerNoticeMgmt.grid.label.cus.ntc.mgmt.dispMediaCdNm'
    , ntcClssCdNm : 'customerNoticeMgmt.grid.label.cus.ntc.mgmt.ntcClssCdNm'
    , ntcNo : 'customerNoticeMgmt.grid.label.cus.ntc.mgmt.ntcNo'
    , ntcTitleNm : 'customerNoticeMgmt.grid.label.cus.ntc.mgmt.ntcTitleNm'
    , bbYn : 'adminCommon.bul.yn'
    , bbStrDtm : 'customerNoticeMgmt.grid.label.cus.ntc.mgmt.bbStrDtm'
    , bbEndDtm : 'customerNoticeMgmt.grid.label.cus.ntc.mgmt.bbEndDtm'
    , sysModId : 'adminCommon.label.sys.mod.id'
    , sysModDtm : 'adminCommon.label.sys.mod.date'
    , sysRegId : 'adminCommon.label.sys.reg.id'
    , sysRegDtm : 'adminCommon.label.sys.reg.date'
});

$.namespace('cusNtcListGrid.settings');
cusNtcListGrid.settings = {
    fields : [
         { fieldName: 'dispMediaCdNm'   , dataType: 'text' }
        ,{ fieldName: 'ntcClssCdNm'     , dataType: 'text' }
        ,{ fieldName: 'ntcNo'           , dataType: 'text' }
        ,{ fieldName: 'ntcTitleNm'      , dataType: 'text' }
        ,{ fieldName: 'bbYn'            , dataType: 'text' }
        ,{ fieldName: 'bbStrDtm'        , dataType: 'text' }
        ,{ fieldName: 'bbEndDtm'        , dataType: 'text' }
        ,{ fieldName: 'sysModId'        , dataType: 'text' }
        ,{ fieldName: 'sysModDtm'       , dataType: 'text' }
        ,{ fieldName: 'sysRegId'        , dataType: 'text' }
        ,{ fieldName: 'sysRegDtm'       , dataType: 'text' }
    ]
    ,columns : [
         { name: 'dispMediaCdNm' ,fieldName: 'dispMediaCdNm' ,header: { text:col.dispMediaCdNm } ,width: 120 }
        ,{ name: 'ntcClssCdNm'   ,fieldName: 'ntcClssCdNm'   ,header: { text:col.ntcClssCdNm   } ,width: 120 }
        ,{ name: 'ntcNo'         ,fieldName: 'ntcNo'         ,header: { text:col.ntcNo         } ,width: 100 ,styleName : "column-underline-c"}
        ,{ name: 'ntcTitleNm'    ,fieldName: 'ntcTitleNm'    ,header: { text:col.ntcTitleNm    } ,width: 200 ,styleName : "column-underline-l"}
        ,{ name: 'bbYn'          ,fieldName: 'bbYn'          ,header: { text:col.bbYn          } ,width: 80  ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,sortable :false ,readOnly : true }
        ,{ name: 'bbStrDtm'      ,fieldName: 'bbStrDtm'      ,header: { text:col.bbStrDtm      } ,width: 110 }
        ,{ name: 'bbEndDtm'      ,fieldName: 'bbEndDtm'      ,header: { text:col.bbEndDtm      } ,width: 110 }
        ,{ name: 'sysModId'      ,fieldName: 'sysModId'      ,header: { text:col.sysModId      } ,width: 100 }
        ,{ name: 'sysModDtm'     ,fieldName: 'sysModDtm'     ,header: { text:col.sysModDtm     } ,width: 150 }
        ,{ name: 'sysRegId'      ,fieldName: 'sysRegId'      ,header: { text:col.sysRegId      } ,width: 100 }
        ,{ name: 'sysRegDtm'     ,fieldName: 'sysRegDtm'     ,header: { text:col.sysRegDtm     } ,width: 150 }
    ]
    ,props : {
        form : 'cusNtcMgmtForm'
        ,action : _baseUrl + 'system/customerNoticeMgmt.getCustomerNoticeList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : false
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
    }
}