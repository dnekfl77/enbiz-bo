var col = x2coMessage.getMessage({
    goodsNo : 'goodsInfoModificationHistory.histGrid.field.goodsNo'
    , goodsNm : 'goodsInfoModificationHistory.histGrid.field.goodsNm'
    , goodsModItemCdNm : 'goodsInfoModificationHistory.histGrid.field.goodsModItemCdNm'
    , goodsModCont : 'goodsInfoModificationHistory.histGrid.field.goodsModCont'
    , sysRegId : 'goodsInfoModificationHistory.histGrid.field.sysRegId'
    , sysRegDtm : 'goodsInfoModificationHistory.histGrid.field.sysRegDtm'
});

$.namespace('modificationHistoryListGrid.settings');
modificationHistoryListGrid.settings = {
    fields : [
        { fieldName: 'goodsNo'            , dataType: 'text' }
        ,{ fieldName: 'goodsNm'            , dataType: 'text' }
        ,{ fieldName: 'goodsModItemCdNm'   , dataType: 'text' }
        ,{ fieldName: 'goodsModCont'       , dataType: 'text' }
        ,{ fieldName: 'sysRegId'           , dataType: 'text' }
        ,{ fieldName: 'sysRegDtm'          , dataType: 'text' }
    ]
    ,columns : [
        { name: 'goodsNo'          ,fieldName: 'goodsNo'          ,header: { text:col.goodsNo          } ,width: 150 }
        ,{ name: 'goodsNm'          ,fieldName: 'goodsNm'          ,header: { text:col.goodsNm          } ,width: 400 ,styleName : "left-column" }
        ,{ name: 'goodsModItemCdNm' ,fieldName: 'goodsModItemCdNm' ,header: { text:col.goodsModItemCdNm } ,width: 200 }
        ,{ name: 'goodsModCont'     ,fieldName: 'goodsModCont'     ,header: { text:col.goodsModCont     } ,width: 500 ,styleName : "left-column" }
        ,{ name: 'sysRegId'         ,fieldName: 'sysRegId'         ,header: { text:col.sysRegId         } ,width: 150 }
        ,{ name: 'sysRegDtm'        ,fieldName: 'sysRegDtm'        ,header: { text:col.sysRegDtm        } ,width: 210 }
    ]
    ,props : {
        form : 'modificationHistoryForm'
        ,action : _baseUrl + 'goods/GoodsInfoModificationHistory.getGoodsInfoModificationHistoryList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : false
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
    }
}