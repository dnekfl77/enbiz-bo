var col = x2coMessage.getMessage({
  ansTmplNo : 'goodsQATemplateMgmt.grid.field.ansTmplNo'
  , ansTmplNm : 'goodsQATemplateMgmt.grid.field.ansTmplNm'
  , ansTmplCont : 'goodsQATemplateMgmt.grid.field.ansTmplCont'
  , useYn : 'goodsQATemplateMgmt.grid.field.useYn'
  , sysRegId : 'goodsQATemplateMgmt.grid.field.sysRegId'
  , sysRegDtm : 'goodsQATemplateMgmt.grid.field.sysRegDtm'
  , sysModId : 'goodsQATemplateMgmt.grid.field.sysModId'
  , sysModDtm : 'goodsQATemplateMgmt.grid.field.sysModDtm'
});

$.namespace('goodsQATemplateListGrid.settings');
goodsQATemplateListGrid.settings = {
    fields : [
         { fieldName: 'ansTmplNo'   , dataType: 'text' }
        ,{ fieldName: 'ansTmplNm'   , dataType: 'text' }
        ,{ fieldName: 'ansTmplCont' , dataType: 'text' }
        ,{ fieldName: 'useYn'       , dataType: 'text' }
        ,{ fieldName: 'sysRegId'    , dataType: 'text' }
        ,{ fieldName: 'sysRegDtm'   , dataType: 'text' }
        ,{ fieldName: 'sysModId'    , dataType: 'text' }
        ,{ fieldName: 'sysModDtm'   , dataType: 'text' }
    ]
    ,columns : [
         { name: 'ansTmplNo'   ,fieldName: 'ansTmplNo'   ,header: { text:col.ansTmplNo         } ,width: 150 ,styleName : "disable-column" ,editable: false  }
        ,{ name: 'ansTmplNm'   ,fieldName: 'ansTmplNm'   ,header: { text:col.ansTmplNm + '*'   } ,width: 200 ,styleName : "column-underline-l" ,editable: false}
        ,{ name: 'ansTmplCont' ,fieldName: 'ansTmplCont' ,header: { text:col.ansTmplCont + '*' } ,width: 550 ,styleName : "column-underline-l" ,editable: false}
        ,{ name: 'useYn'       ,fieldName: 'useYn'       ,header: { text:col.useYn + '*'       } ,width: 80  ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,editable: false ,sortable :false }
        ,{ name: 'sysRegId'    ,fieldName: 'sysRegId'    ,header: { text:col.sysRegId          } ,width: 120 ,styleName : "disable-column" ,editable: false  }
        ,{ name: 'sysRegDtm'   ,fieldName: 'sysRegDtm'   ,header: { text:col.sysRegDtm         } ,width: 170 ,styleName : "disable-column" ,editable: false  }
        ,{ name: 'sysModId'    ,fieldName: 'sysModId'    ,header: { text:col.sysModId          } ,width: 120 ,styleName : "disable-column" ,editable: false  }
        ,{ name: 'sysModDtm'   ,fieldName: 'sysModDtm'   ,header: { text:col.sysModDtm         } ,width: 170 ,styleName : "disable-column" ,editable: false  }
    ]
    ,props : {
        form : 'goodsQATemplateForm'
        ,action : _baseUrl + 'goods/GoodsQATemplateMgmt.getGoodsQATemplateList.do'
        ,saveAction : _baseUrl + 'goods/GoodsQATemplateMgmt.saveGoodsQATemplateList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : true
        ,crud : true
        ,sumRowVisible : false
        ,paging : true
    }
}