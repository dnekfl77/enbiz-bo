var col = x2coMessage.getMessage({
    evltItemNo : 'reviewEvaluationItemMgmt.mappingTab.grid.field.evltItemNo'
    , evltItemNm : 'reviewEvaluationItemMgmt.mappingTab.grid.field.evltItemNm'
    , sortSeq : 'reviewEvaluationItemMgmt.mappingTab.grid.field.sortSeq'
    , sysModId : 'reviewEvaluationItemMgmt.mappingTab.grid.field.sysModId'
    , sysModDtm : 'reviewEvaluationItemMgmt.mappingTab.grid.field.sysModDtm'
});

$.namespace('reviewEvaluationItemCategoryListGrid.settings');
reviewEvaluationItemCategoryListGrid.settings = {
    fields : [
         { fieldName: 'evltItemNo'      , dataType: 'text' }
        ,{ fieldName: 'evltItemNm'      , dataType: 'text' }
        ,{ fieldName: 'sortSeq'         , dataType: 'number' }
        ,{ fieldName: 'sysModId'        , dataType: 'text' }
        ,{ fieldName: 'sysModDtm'       , dataType: 'text' }
        ,{ fieldName: 'stdCtgNo'        , dataType: 'text' }
    ]
    ,columns : [
         { name: 'evltItemNo' ,fieldName: 'evltItemNo' ,header: { text:col.evltItemNo    } ,width: 150 ,editable: false ,styleName : "disable-column" }
        ,{ name: 'evltItemNm' ,fieldName: 'evltItemNm' ,header: { text:col.evltItemNm    } ,width: 400 ,editable: false ,styleName : "column-underline-l disable-column" }
        ,{ name: 'sortSeq'    ,fieldName: 'sortSeq'    ,header: { text:col.sortSeq + '*' } ,width: 120  ,editor: { type: 'number' ,integerOnly: true, maxLength:3 } ,numberFormat : '0'}
        ,{ name: 'sysModId'   ,fieldName: 'sysModId'   ,header: { text:col.sysModId      } ,width: 150 ,editable: false ,styleName : "disable-column" }
        ,{ name: 'sysModDtm'  ,fieldName: 'sysModDtm'  ,header: { text:col.sysModDtm     } ,width: 200 ,editable: false ,styleName : "disable-column" }
    ]
    ,props : {
        form : 'reviewEvaluationItemCategoryListForm'
        ,action : _baseUrl + 'goods/ReviewEvaluationItemMgmt.getReviewEvaluationItemListByCategory.do'
        ,saveAction : _baseUrl + 'goods/ReviewEvaluationItemMgmt.saveReviewEvaluationItemListByCategory.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : true
        ,crud : true
        ,sumRowVisible : false
        ,paging : true
    }
}