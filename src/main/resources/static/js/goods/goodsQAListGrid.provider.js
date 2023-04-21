var col = x2coMessage.getMessage({
      procStatCdNm : 'goodsQAMgmt.grid.field.procStatCdNm'
    , questDispStatCdNm : 'goodsQAMgmt.grid.field.questDispStatCdNm'
    , questTypCdNm : 'goodsQAMgmt.grid.field.questTypCdNm'
    , questNo : 'goodsQAMgmt.grid.field.questNo'
    , questCont : 'goodsQAMgmt.grid.field.questCont'
    , loginId : 'goodsQAMgmt.grid.field.loginId'
    , questDtm : 'goodsQAMgmt.grid.field.questDtm'
    , goodsNo : 'goodsQAMgmt.grid.field.goodsNo'
    , goodsNm : 'goodsQAMgmt.grid.field.goodsNm'
    , brandNm : 'goodsQAMgmt.grid.field.brandNm'
    , entrNm : 'goodsQAMgmt.grid.field.entrNm'
    , questDispProcmnId : 'goodsQAMgmt.grid.field.questDispProcmnId'
    , questDispProcDtm : 'goodsQAMgmt.grid.field.questDispProcDtm'
    , qaAnsCnt : 'goodsQAMgmt.grid.field.qaAnsCnt'
    , stdCtgHierarchy : 'goodsQAMgmt.grid.field.stdCtgHierarchy'
    , mdId : 'goodsQAMgmt.grid.field.mdId'
});

$.namespace('goodsQAListGrid.settings');
goodsQAListGrid.settings = {
    fields : [
         { fieldName: 'procStatCdNm'      , dataType: 'text' }
        ,{ fieldName: 'questDispStatCdNm' , dataType: 'text' }
        ,{ fieldName: 'questTypCdNm'      , dataType: 'text' }
        ,{ fieldName: 'questNo'           , dataType: 'text' }
        ,{ fieldName: 'questCont'         , dataType: 'text' }
        ,{ fieldName: 'loginId'           , dataType: 'text' }
        ,{ fieldName: 'questDtm'          , dataType: 'text' }
        ,{ fieldName: 'goodsNo'           , dataType: 'text' }
        ,{ fieldName: 'goodsNm'           , dataType: 'text' }
        ,{ fieldName: 'brandNm'           , dataType: 'text' }
        ,{ fieldName: 'entrNm'            , dataType: 'text' }
        ,{ fieldName: 'questDispProcmnId' , dataType: 'text' }
        ,{ fieldName: 'questDispProcDtm'  , dataType: 'text' }
        ,{ fieldName: 'qaAnsCnt'          , dataType: 'number' }
        ,{ fieldName: 'stdCtgHierarchy'   , dataType: 'text' }
        ,{ fieldName: 'mdId'              , dataType: 'text' }
        ,{ fieldName: 'procStatCd'        , dataType: 'text' }
        ,{ fieldName: 'questDispStatCd'   , dataType: 'text' }
        ,{ fieldName: 'mvotYn'            , dataType: 'text' }
    ]
    ,columns : [
         { name: 'procStatCdNm'      , fieldName: 'procStatCdNm'      , header: { text:col.procStatCdNm      } ,width: 100
             , styleCallback: function(grid, dataCell){
                 var ret = {}
                 var procStatCd = grid.getValue(dataCell.index.itemIndex, "procStatCd");
                 if( procStatCd === '10' ){ //미처리
                     ret.styleName = 'chk_all';
                 }
                 return ret;
             }}
        ,{ name: 'questDispStatCdNm' , fieldName: 'questDispStatCdNm' , header: { text:col.questDispStatCdNm } ,width: 100  }
        ,{ name: 'questTypCdNm'      , fieldName: 'questTypCdNm'      , header: { text:col.questTypCdNm      } ,width: 80   }
        ,{ name: 'questNo'           , fieldName: 'questNo'           , header: { text:col.questNo           } ,width: 100  }
        ,{ name: 'questCont'         , fieldName: 'questCont'         , header: { text:col.questCont         } ,width: 300  ,styleName : "column-underline-l"}
        ,{ name: 'loginId'           , fieldName: 'loginId'           , header: { text:col.loginId           } ,width: 100  }
        ,{ name: 'questDtm'          , fieldName: 'questDtm'          , header: { text:col.questDtm          } ,width: 150  }
        ,{ name: 'goodsNo'           , fieldName: 'goodsNo'           , header: { text:col.goodsNo           } ,width: 120  ,styleName : "column-underline-c"}
        ,{ name: 'goodsNm'           , fieldName: 'goodsNm'           , header: { text:col.goodsNm           } ,width: 300  ,styleName : "column-underline-l"}
        ,{ name: 'brandNm'           , fieldName: 'brandNm'           , header: { text:col.brandNm           } ,width: 100  ,styleName : "left-column"}
        ,{ name: 'entrNm'            , fieldName: 'entrNm'            , header: { text:col.entrNm            } ,width: 200  ,styleName : "left-column"}
        ,{ name: 'questDispProcmnId' , fieldName: 'questDispProcmnId' , header: { text:col.questDispProcmnId } ,width: 100  }
        ,{ name: 'questDispProcDtm'  , fieldName: 'questDispProcDtm'  , header: { text:col.questDispProcDtm  } ,width: 150  }
        ,{ name: 'qaAnsCnt'          , fieldName: 'qaAnsCnt'          , header: { text:col.qaAnsCnt          } ,width: 60   ,numberFormat : '0'}
        ,{ name: 'stdCtgHierarchy'   , fieldName: 'stdCtgHierarchy'   , header: { text:col.stdCtgHierarchy   } ,width: 300  ,styleName : "left-column"}
        ,{ name: 'mdId'              , fieldName: 'mdId'              , header: { text:col.mdId              } ,width: 100  }
        ,{ name: 'procStatCd'        , fieldName: 'procStatCd'        , visible : false }
        ,{ name: 'questDispStatCd'   , fieldName: 'questDispStatCd'   , visible : false }
        ,{ name: 'mvotYn'            , fieldName: 'mvotYn'            , visible : false }
    ]
    ,props : {
        form : 'goodsQAListForm'
        ,action : _baseUrl + 'goods/GoodsQAMgmt.getGoodsQAList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : true
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
    }
}