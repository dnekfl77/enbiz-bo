var col = x2coMessage.getMessage({
    evltValNo : 'reviewEvaluationItemMgmt.itemMgmtTab.evltValueListGrid.field.evltValNo'
    , evltVal : 'reviewEvaluationItemMgmt.itemMgmtTab.evltValueListGrid.field.evltVal'
    , sortSeq : 'reviewEvaluationItemMgmt.itemMgmtTab.evltValueListGrid.field.sortSeq'
    , sysModId : 'reviewEvaluationItemMgmt.itemMgmtTab.evltValueListGrid.field.sysModId'
    , sysModDtm : 'reviewEvaluationItemMgmt.itemMgmtTab.evltValueListGrid.field.sysModDtm'
});

$.namespace('reviewEvaluationValueListGrid.settings');
reviewEvaluationValueListGrid.settings = {
    fields : [
         { fieldName: 'evltValNo' , dataType: 'text' }
        ,{ fieldName: 'evltVal'   , dataType: 'text' }
        ,{ fieldName: 'sortSeq'   , dataType: 'text' }
        ,{ fieldName: 'sysModId'  , dataType: 'text' }
        ,{ fieldName: 'sysModDtm' , dataType: 'text' }
        ,{ fieldName: 'evltItemNo', dataType: 'text' }
    ]
    ,columns : [
         { name: 'evltValNo' ,fieldName: 'evltValNo' ,header: { text:col.evltValNo     } ,width: 150 ,styleName : "disable-column" ,editable: false  }
        ,{ name: 'evltVal'   ,fieldName: 'evltVal'   ,header: { text:col.evltVal + '*' } ,width: 520 ,styleName : "left-column" ,editor: { maxLength: 8 } }
        ,{ name: 'sortSeq'   ,fieldName: 'sortSeq'   ,header: { text:col.sortSeq + '*' } ,width: 100 ,numberFormat : '0', sortable: false, editor: { type: 'number' ,integerOnly: true, maxLength: 3 }}
        ,{ name: 'sysModId'  ,fieldName: 'sysModId'  ,header: { text:col.sysModId      } ,width: 150 ,styleName : "disable-column" ,editable: false  }
        ,{ name: 'sysModDtm' ,fieldName: 'sysModDtm' ,header: { text:col.sysModDtm     } ,width: 200 ,styleName : "disable-column" ,editable: false  }
    ]
    ,props : {
        form : 'reviewEvaluationItemListForm'
        ,action : _baseUrl + 'goods/ReviewEvaluationItemMgmt.getReviewEvaluationValueList.do'
        ,saveAction : _baseUrl + 'goods/ReviewEvaluationItemMgmt.saveReviewEvaluationValueList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : true
        ,crud : true
        ,sumRowVisible : false
        ,paging : true
    }
}