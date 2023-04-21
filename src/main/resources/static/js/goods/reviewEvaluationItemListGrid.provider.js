var col = x2coMessage.getMessage({
    evltItemNo : 'reviewEvaluationItemMgmt.itemMgmtTab.evltItemListGrid.field.evltItemNo'
    , evltItemNm : 'reviewEvaluationItemMgmt.itemMgmtTab.evltItemListGrid.field.evltItemNm'
    , stdCtgMapCnt : 'reviewEvaluationItemMgmt.itemMgmtTab.evltItemListGrid.field.stdCtgMapCnt'
    , useYn : 'reviewEvaluationItemMgmt.itemMgmtTab.evltItemListGrid.field.useYn'
    , sysModId : 'reviewEvaluationItemMgmt.itemMgmtTab.evltItemListGrid.field.sysModId'
    , sysModDtm : 'reviewEvaluationItemMgmt.itemMgmtTab.evltItemListGrid.field.sysModDtm'
});

$.namespace('reviewEvaluationItemListGrid.settings');
reviewEvaluationItemListGrid.settings = {
    fields : [
         { fieldName: 'evltItemNo'  , dataType: 'text' }
        ,{ fieldName: 'evltItemNm'  , dataType: 'text' }
        ,{ fieldName: 'stdCtgMapCnt', dataType: 'number' }
        ,{ fieldName: 'useYn'       , dataType: 'text' }
        ,{ fieldName: 'sysModId'    , dataType: 'text' }
        ,{ fieldName: 'sysModDtm'   , dataType: 'text' }
    ]
    ,columns : [
         { name: 'evltItemNo'   ,fieldName: 'evltItemNo'   ,header: { text:col.evltItemNo        } ,width: 150 ,styleName : "disable-column" ,editable: false  }
        ,{ name: 'evltItemNm'   ,fieldName: 'evltItemNm'   ,header: { text:col.evltItemNm + '*'  } ,width: 400 ,styleName : "left-column" ,editor: { maxLength: 4 } }
        ,{ name: 'stdCtgMapCnt' ,fieldName: 'stdCtgMapCnt' ,header: { text:col.stdCtgMapCnt      } ,width: 120 ,styleName : "column-underline-c disable-column" ,numberFormat : '0' ,editable: false }
        ,{ name: 'useYn'        ,fieldName: 'useYn'        ,header: { text:col.useYn + '*'       } ,width: 100  ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,editable: false ,sortable :false }
        ,{ name: 'sysModId'     ,fieldName: 'sysModId'     ,header: { text:col.sysModId          } ,width: 150 ,styleName : "disable-column" ,editable: false  }
        ,{ name: 'sysModDtm'    ,fieldName: 'sysModDtm'    ,header: { text:col.sysModDtm         } ,width: 200 ,styleName : "disable-column" ,editable: false  }
    ]
    ,props : {
        form : 'reviewEvaluationItemListForm'
        ,action : _baseUrl + 'goods/ReviewEvaluationItemMgmt.getReviewEvaluationItemList.do'
        ,saveAction : _baseUrl + 'goods/ReviewEvaluationItemMgmt.saveReviewEvaluationItemList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : true
        ,crud : true
        ,sumRowVisible : false
        ,paging : true
    }
}