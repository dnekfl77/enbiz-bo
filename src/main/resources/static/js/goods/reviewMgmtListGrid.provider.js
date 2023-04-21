var col = x2coMessage.getMessage({
      goodsNo :  'reviewMgmt.grid.field.goodsNo'
    , goodsNm :  'reviewMgmt.grid.field.goodsNm'
    , revScrVal :  'reviewMgmt.grid.field.revScrVal'
    , revNo :  'reviewMgmt.grid.field.revNo'
    , revCont :  'reviewMgmt.grid.field.revCont'
    , revGbCdNm :  'reviewMgmt.grid.field.revGbCdNm'
    , revTypCdNm :  'reviewMgmt.grid.field.revTypCdNm'
    , loginId :  'reviewMgmt.grid.field.loginId'
    , revWrtDtm :  'reviewMgmt.grid.field.revWrtDtm'
    , ordNo :  'reviewMgmt.grid.field.ordNo'
    , replyCnt :  'reviewMgmt.grid.field.replyCnt'
    , hlpfulCnt :  'reviewMgmt.grid.field.hlpfulCnt'
    , revDispStatCdNm :  'reviewMgmt.grid.field.revDispStatCdNm'
    , entrNm :  'reviewMgmt.grid.field.entrNm'
    , dispProcmnId :  'reviewMgmt.grid.field.dispProcmnId'
    , dispProcDtm :  'reviewMgmt.grid.field.dispProcDtm'
});

$.namespace('reviewMgmtListGrid.settings');
reviewMgmtListGrid.settings = {
    fields : [
         { fieldName: 'goodsNo'          , dataType: 'text' }
        ,{ fieldName: 'goodsNm'          , dataType: 'text' }
        ,{ fieldName: 'revScrVal'        , dataType: 'number' }
        ,{ fieldName: 'revNo'            , dataType: 'text' }
        ,{ fieldName: 'revCont'          , dataType: 'text' }
        ,{ fieldName: 'revGbCdNm'        , dataType: 'text' }
        ,{ fieldName: 'revTypCdNm'       , dataType: 'text' }
        ,{ fieldName: 'revDispStatCdNm'  , dataType: 'text' }
        ,{ fieldName: 'loginId'          , dataType: 'text' }
        ,{ fieldName: 'revWrtDtm'        , dataType: 'text' }
        ,{ fieldName: 'ordNo'            , dataType: 'text' }
        ,{ fieldName: 'replyCnt'         , dataType: 'number' }
        ,{ fieldName: 'hlpfulCnt'        , dataType: 'number' }
        ,{ fieldName: 'entrNm'           , dataType: 'text' }
        ,{ fieldName: 'dispProcmnId'     , dataType: 'text' }
        ,{ fieldName: 'dispProcDtm'      , dataType: 'text' }
        ,{ fieldName: 'revGbCd'          , dataType: 'text' }
        ,{ fieldName: 'revTypCd'         , dataType: 'text' }
        ,{ fieldName: 'revDispStatCd'    , dataType: 'text' }
    ]
    ,columns : [
         { name: 'goodsNo'          ,fieldName: 'goodsNo'          , header: { text: col.goodsNo         } , width: 120 ,styleName : "column-underline-c" }
        ,{ name: 'goodsNm'          ,fieldName: 'goodsNm'          , header: { text: col.goodsNm         } , width: 300 ,styleName : "column-underline-l" }
        ,{ name: 'revScrVal'        ,fieldName: 'revScrVal'        , header: { text: col.revScrVal       } , width: 70  ,numberFormat : '0'
           , styleCallback: function(grid, dataCell){
                var ret = {}
                var revScrVal = grid.getValue(dataCell.index.itemIndex, "revScrVal");
                if(revScrVal < 3){
                    ret.styleName = 'chk_all';
                }
                return ret;
             }}
        ,{ name: 'revNo'            ,fieldName: 'revNo'            , header: { text: col.revNo           } , width: 100 ,styleName : "column-underline-c" }
        ,{ name: 'revCont'          ,fieldName: 'revCont'          , header: { text: col.revCont         } , width: 500 ,styleName : "column-underline-l" }
        ,{ name: 'revGbCdNm'        ,fieldName: 'revGbCdNm'        , header: { text: col.revGbCdNm       } , width: 80  }
        ,{ name: 'revTypCdNm'       ,fieldName: 'revTypCdNm'       , header: { text: col.revTypCdNm      } , width: 80  }
        ,{ name: 'revDispStatCdNm'  ,fieldName: 'revDispStatCdNm'  , header: { text: col.revDispStatCdNm } , width: 70  }
        ,{ name: 'loginId'          ,fieldName: 'loginId'          , header: { text: col.loginId         } , width: 100 ,styleName : "left-column" }
        ,{ name: 'revWrtDtm'        ,fieldName: 'revWrtDtm'        , header: { text: col.revWrtDtm       } , width: 150 }
        ,{ name: 'ordNo'            ,fieldName: 'ordNo'            , header: { text: col.ordNo           } , width: 150 ,textFormat: "([0-9]{8})([0-9]{6});$1-$2"}
        ,{ name: 'replyCnt'         ,fieldName: 'replyCnt'         , header: { text: col.replyCnt        } , width: 70  ,numberFormat : '0' }
        ,{ name: 'hlpfulCnt'        ,fieldName: 'hlpfulCnt'        , header: { text: col.hlpfulCnt       } , width: 90  ,numberFormat : '0' }
        ,{ name: 'entrNm'           ,fieldName: 'entrNm'           , header: { text: col.entrNm          } , width: 200 ,styleName : "left-column" }
        ,{ name: 'dispProcmnId'     ,fieldName: 'dispProcmnId'     , header: { text: col.dispProcmnId    } , width: 100 }
        ,{ name: 'dispProcDtm'      ,fieldName: 'dispProcDtm'      , header: { text: col.dispProcDtm     } , width: 150 }
    ]
    ,props : {
        form : 'reviewMgmtForm'
        ,action : _baseUrl + 'goods/ReviewMgmt.getReviewList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : true
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
    }
}