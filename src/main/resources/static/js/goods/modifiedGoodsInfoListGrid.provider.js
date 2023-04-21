var col = x2coMessage.getMessage({
    entrNm : 'goodsInfoModificationHistory.infoGrid.field.entrNm'
    , saleStatCdNm : 'goodsInfoModificationHistory.infoGrid.field.saleStatCdNm'
    , safeCertiTgtYn : 'goodsInfoModificationHistory.infoGrid.field.safeCertiTgtYn'
    , buyrAgeLmtCdNm : 'goodsInfoModificationHistory.infoGrid.field.buyrAgeLmtCdNm'
    , dispYn : 'goodsInfoModificationHistory.infoGrid.field.dispYn'
    , stkMgrYn : 'goodsInfoModificationHistory.infoGrid.field.stkMgrYn'
    , buyQtyLmtyn : 'goodsInfoModificationHistory.infoGrid.field.buyQtyLmtyn'
    , minLmtQty : 'goodsInfoModificationHistory.infoGrid.field.minLmtQty'
    , maxLmtQty : 'goodsInfoModificationHistory.infoGrid.field.maxLmtQty'
    , deliGoodsGbCdNm : 'goodsInfoModificationHistory.infoGrid.field.deliGoodsGbCdNm'
    , itmSoutNotiYn : 'goodsInfoModificationHistory.infoGrid.field.itmSoutNotiYn'
    , dispDlexAmt : 'goodsInfoModificationHistory.infoGrid.field.dispDlexAmt'
    , prcCompaExpYn : 'goodsInfoModificationHistory.infoGrid.field.prcCompaExpYn'
});

$.namespace('modifiedGoodsInfoListGrid.settings');
modifiedGoodsInfoListGrid.settings = {
    fields : [
        { fieldName: 'entrNm'            , dataType: 'text' }
        ,{ fieldName: 'saleStatCdNm'      , dataType: 'text' }
        ,{ fieldName: 'safeCertiTgtYn'    , dataType: 'text' }
        ,{ fieldName: 'buyrAgeLmtCdNm'    , dataType: 'text' }
        ,{ fieldName: 'dispYn'            , dataType: 'text' }
        ,{ fieldName: 'stkMgrYn'          , dataType: 'text' }
        ,{ fieldName: 'buyQtyLmtyn'       , dataType: 'text' }
        ,{ fieldName: 'minLmtQty'         , dataType: 'number' }
        ,{ fieldName: 'maxLmtQty'         , dataType: 'number' }
        ,{ fieldName: 'deliGoodsGbCdNm'   , dataType: 'text' }
        ,{ fieldName: 'itmSoutNotiYn'     , dataType: 'text' }
        ,{ fieldName: 'dispDlexAmt'       , dataType: 'text' }
        ,{ fieldName: 'prcCompaExpYn'     , dataType: 'text' }
    ]
    ,columns : [
        { name: 'entrNm'          , fieldName: 'entrNm'            , dataType: 'text'   ,header: { text: col.entrNm          } ,width: 200 ,styleName : "left-column" }
        ,{ name: 'saleStatCdNm'    , fieldName: 'saleStatCdNm'      , dataType: 'text'   ,header: { text: col.saleStatCdNm    } ,width: 100 }
        ,{ name: 'safeCertiTgtYn'  , fieldName: 'safeCertiTgtYn'    , dataType: 'text'   ,header: { text: col.safeCertiTgtYn  } ,width: 120  ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,readOnly: true ,sortable :false }
        ,{ name: 'buyrAgeLmtCdNm'  , fieldName: 'buyrAgeLmtCdNm'    , dataType: 'text'   ,header: { text: col.buyrAgeLmtCdNm  } ,width: 120 }
        ,{ name: 'dispYn'          , fieldName: 'dispYn'            , dataType: 'text'   ,header: { text: col.dispYn          } ,width: 80 ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,readOnly: true ,sortable :false }
        ,{ name: 'stkMgrYn'        , fieldName: 'stkMgrYn'          , dataType: 'text'   ,header: { text: col.stkMgrYn        } ,width: 100 ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,readOnly: true ,sortable :false }
        ,{ name: 'buyQtyLmtyn'     , fieldName: 'buyQtyLmtyn'       , dataType: 'text'   ,header: { text: col.buyQtyLmtyn     } ,width: 120 ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,readOnly: true ,sortable :false }
        ,{ name: 'minLmtQty'       , fieldName: 'minLmtQty'         , dataType: 'number' ,header: { text: col.minLmtQty       } ,width: 100 ,numberFormat: '0'}
        ,{ name: 'maxLmtQty'       , fieldName: 'maxLmtQty'         , dataType: 'number' ,header: { text: col.maxLmtQty       } ,width: 100 ,numberFormat: '0'}
        ,{ name: 'deliGoodsGbCdNm' , fieldName: 'deliGoodsGbCdNm'   , dataType: 'text'   ,header: { text: col.deliGoodsGbCdNm } ,width: 100 }
        ,{ name: 'itmSoutNotiYn'   , fieldName: 'itmSoutNotiYn'     , dataType: 'text'   ,header: { text: col.itmSoutNotiYn   } ,width: 120 ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,readOnly: true ,sortable :false }
        ,{ name: 'dispDlexAmt'     , fieldName: 'dispDlexAmt'       , dataType: 'text'   ,header: { text: col.dispDlexAmt     } ,width: 250 ,styleName : "left-column" }
        ,{ name: 'prcCompaExpYn'   , fieldName: 'prcCompaExpYn'     , dataType: 'text'   ,header: { text: col.prcCompaExpYn   } ,width: 120  ,renderer: { type: "check" ,trueValues: "Y" ,falseValues: "N" } ,readOnly: true ,sortable :false }
    ]
    ,props : {
        form : ''
        ,action : _baseUrl + 'goods/GoodsInfoModificationHistory.getModifiedGoodsList.do'
        ,autoFitHeight : false
        ,height : 150
        ,popup : false
        ,checkbox : false
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
    }
}