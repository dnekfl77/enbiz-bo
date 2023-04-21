var col = x2coMessage.getMessage({
    evltItemNm : 'reviewEvaluationItemMgmt.reviewEvaluationItemDetail.grid.field.evltItemNm'
    ,evltVal : 'reviewEvaluationItemMgmt.reviewEvaluationItemDetail.grid.field.evltVal'
    ,sortSeq : 'reviewEvaluationItemMgmt.reviewEvaluationItemDetail.grid.field.sortSeq'
});

$.namespace('reviewEvaluationItemDetailGrid.settings');
reviewEvaluationItemDetailGrid.settings = {
    fields : [
         { fieldName: 'evltItemNm'   , dataType: 'text' }
        ,{ fieldName: 'evltVal'      , dataType: 'text' }
        ,{ fieldName: 'sortSeq'      , dataType: 'number' }
    ]
    ,columns : [
         { name: 'evltItemNm' ,fieldName: 'evltItemNm' ,header: { text:col.evltItemNm    } ,width: 120 }
        ,{ name: 'evltVal'    ,fieldName: 'evltVal'    ,header: { text:col.evltVal       } ,width: 200 ,styleName : "left-column" }
        ,{ name: 'sortSeq'    ,fieldName: 'sortSeq'    ,header: { text:col.sortSeq       } ,width: 90  ,numberFormat : '0' }
    ]
    ,props : {
        form : ''
        ,action : _baseUrl + ''
        ,autoFitHeight : false
        ,height : 200
        ,popup : true
        ,checkbox : false
        ,crud : false
        ,sumRowVisible : false
        ,paging : false
    }
}