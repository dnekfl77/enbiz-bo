var col = x2coMessage.getMessage({
    evltItemNo : 'reviewEvaluationItemMgmt.reviewEvaluationItemListPopup.grid.field.evltItemNo'
    ,evltItemNm : 'reviewEvaluationItemMgmt.reviewEvaluationItemListPopup.grid.field.evltItemNm'
});

$.namespace('reviewEvaluationItemListForAddGrid.settings');
reviewEvaluationItemListForAddGrid.settings = {
    fields : [
         { fieldName: 'evltItemNo'      , dataType: 'text' }
        ,{ fieldName: 'evltItemNm'      , dataType: 'text' }
        ,{ fieldName: 'addYn'           , dataType: 'text' }
    ]
    ,columns : [
         { name: 'evltItemNo' ,fieldName: 'evltItemNo' ,header: { text:col.evltItemNo    } ,width: 150 }
        ,{ name: 'evltItemNm' ,fieldName: 'evltItemNm' ,header: { text:col.evltItemNm    } ,width: 250 ,styleName : "left-column" }
    ]
    ,props : {
        form : 'reviewEvaluationItemListForAddForm'
        ,action : _baseUrl + 'goods/ReviewEvaluationItemMgmt.getReviewEvaluationItemListForAdd.do'
        ,autoFitHeight : true
        ,popup : true
        ,checkbox : true
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
        ,fitStyle : 'evenFill'
    }
}