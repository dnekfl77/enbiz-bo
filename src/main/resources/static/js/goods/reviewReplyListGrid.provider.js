var col = x2coMessage.getMessage({
    replySeq : 'reviewMgmt.reviewDetail.grid.field.replySeq'
    , replyCont : 'reviewMgmt.reviewDetail.grid.field.replyCont'
    , wrtmnId : 'reviewMgmt.reviewDetail.grid.field.wrtmnId'
    , wrtmnGbCdNm : 'reviewMgmt.reviewDetail.grid.field.wrtmnGbCdNm'
    , sysRegDtm : 'reviewMgmt.reviewDetail.grid.field.sysRegDtm'
    , replySeqDispStatCdNm : 'reviewMgmt.reviewDetail.grid.field.replySeqDispStatCdNm'
    
});

$.namespace('reviewReplyListGrid.settings');
reviewReplyListGrid.settings = {
    fields : [
         { fieldName: 'replySeq'              , dataType: 'number' }
        ,{ fieldName: 'replyCont'             , dataType: 'text' }
        ,{ fieldName: 'wrtmnId'               , dataType: 'text' }
        ,{ fieldName: 'wrtmnGbCdNm'           , dataType: 'text' }
        ,{ fieldName: 'sysRegDtm'             , dataType: 'text' }
        ,{ fieldName: 'replySeqDispStatCdNm'  , dataType: 'text' }
        ,{ fieldName: 'revNo'                 , dataType: 'text' }
        ,{ fieldName: 'replySeqDispStatCd'    , dataType: 'text' }
    ]
    ,columns : [
        { name: 'replySeq'               ,fieldName: 'replySeq'             , header: { text: col.replySeq             } , width: 100 ,numberFormat : '0'}
        , { name: 'replyCont'            ,fieldName: 'replyCont'            , header: { text: col.replyCont            } , width: 700 ,styleName : "column-underline-l"}
        , { name: 'wrtmnId'              ,fieldName: 'wrtmnId'              , header: { text: col.wrtmnId              } , width: 120 }
        , { name: 'wrtmnGbCdNm'          ,fieldName: 'wrtmnGbCdNm'          , header: { text: col.wrtmnGbCdNm          } , width: 120 }
        , { name: 'goosysRegDtmsNo'      ,fieldName: 'sysRegDtm'            , header: { text: col.sysRegDtm            } , width: 200 }
        , { name: 'replySeqDispStatCdNm' ,fieldName: 'replySeqDispStatCdNm' , header: { text: col.replySeqDispStatCdNm } , width: 120 }
    ]
    ,props : {
        form : ''
        ,action : _baseUrl + 'goods/ReviewMgmt.getReviewReplyList.do'
        ,autoFitHeight : false
        ,height : 200
        ,popup : true
        ,checkbox : true
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
    }
}