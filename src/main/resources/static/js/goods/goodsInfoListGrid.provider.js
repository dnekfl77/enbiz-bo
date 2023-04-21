var goodsInfoListGridCol = x2coMessage.getMessage({
    goodsCompCdNm    : 'goodsMgmt.grid.field.goodsCompCdNm'
    ,goodsTypCdNm    : 'goodsMgmt.grid.field.goodsTypCdNm'
    ,goodsNo         : 'goodsMgmt.grid.field.goodsNo'
    ,goodsNm         : 'goodsMgmt.grid.field.goodsNm'
    ,modlNm          : 'goodsMgmt.grid.field.modlNm'
    ,brandNm         : 'goodsMgmt.grid.field.brandNm'
    ,saleStatCdNm    : 'goodsMgmt.grid.field.saleStatCdNm'
    ,saleMethCdNm    : 'goodsMgmt.grid.field.saleMethCdNm'
    ,taxGbCdNm       : 'goodsMgmt.grid.field.taxGbCdNm'
    ,buyTypCdNm      : 'goodsMgmt.grid.field.buyTypCdNm'
    ,norPrc          : 'goodsMgmt.grid.field.norPrc'
    ,salePrc         : 'goodsMgmt.grid.field.salePrc'
    ,mrgnRate        : 'goodsMgmt.grid.field.mrgnRate'
    ,prcCompaExpYn   : 'goodsMgmt.grid.field.prcCompaExpYn'
    ,dispYn          : 'goodsMgmt.grid.field.dispYn'
    ,itmSoutNotiYn   : 'goodsMgmt.grid.field.itmSoutNotiYn'
    ,entrNm          : 'goodsMgmt.grid.field.entrNm'
    ,mdNm            : 'goodsMgmt.grid.field.mdNm'
    ,stdCtgHierarchy : 'goodsMgmt.grid.field.stdCtgHierarchy'
    ,deliProcTypCdNm : 'goodsMgmt.grid.field.deliProcTypCdNm'
    ,deliGoodsGbCdNm : 'goodsMgmt.grid.field.deliGoodsGbCdNm'
    ,goodsRegDtm     : 'goodsMgmt.grid.field.goodsRegDtm'
    ,saleStrDtm      : 'goodsMgmt.grid.field.saleStrDtm'
    ,saleEndDtm      : 'goodsMgmt.grid.field.saleEndDtm'
});

$.namespace('goodsInfoListGrid.settings')
goodsInfoListGrid.settings = {
    fields : [
         { fieldName: 'goodsCompCd'      , dataType: 'text' }
        ,{ fieldName: 'goodsCompCdNm'    , dataType: 'text' }
        ,{ fieldName: 'goodsTypCdNm'     , dataType: 'text' }
        ,{ fieldName: 'goodsNo'          , dataType: 'text' }
        ,{ fieldName: 'goodsNm'          , dataType: 'text' }
        ,{ fieldName: 'modlNm'           , dataType: 'text' }
        ,{ fieldName: 'brandNm'          , dataType: 'text' }
        ,{ fieldName: 'saleStatCdNm'     , dataType: 'text' }
        ,{ fieldName: 'saleMethCdNm'     , dataType: 'text' }
        ,{ fieldName: 'taxGbCdNm'        , dataType: 'text' }
        ,{ fieldName: 'buyTypCdNm'       , dataType: 'text' }
        ,{ fieldName: 'norPrc'           , dataType: 'number' }
        ,{ fieldName: 'salePrc'          , dataType: 'number' }
        ,{ fieldName: 'mrgnRate'         , dataType: 'number' }
        ,{ fieldName: 'prcCompaExpYn'    , dataType: 'text' }
        ,{ fieldName: 'dispYn'           , dataType: 'text' }
        ,{ fieldName: 'itmSoutNotiYn'    , dataType: 'text' }
        ,{ fieldName: 'entrNm'           , dataType: 'text' }
        ,{ fieldName: 'mdNm'             , dataType: 'text' }
        ,{ fieldName: 'stdCtgHierarchy'  , dataType: 'text' }
        ,{ fieldName: 'deliProcTypCdNm'  , dataType: 'text' }
        ,{ fieldName: 'deliGoodsGbCdNm'  , dataType: 'text' }
        ,{ fieldName: 'goodsRegDtm'      , dataType: 'text' }
        ,{ fieldName: 'saleStrDtm'       , dataType: 'text' }
        ,{ fieldName: 'saleEndDtm'       , dataType: 'text' }
    ]
    ,columns : [
         {name: 'goodsCompCdNm'   , fieldName: 'goodsCompCdNm'  , width: 100 , header: { text: goodsInfoListGridCol.goodsCompCdNm   } }
        ,{name: 'goodsTypCdNm'    , fieldName: 'goodsTypCdNm'   , width: 100 , header: { text: goodsInfoListGridCol.goodsTypCdNm    } }
        ,{name: 'goodsNo'         , fieldName: 'goodsNo'        , width: 120 , header: { text: goodsInfoListGridCol.goodsNo         } ,styleName : "column-underline-c" }
        ,{name: 'goodsNm'         , fieldName: 'goodsNm'        , width: 300 , header: { text: goodsInfoListGridCol.goodsNm         } ,styleName : "column-underline-l" }
        ,{name: 'modlNm'          , fieldName: 'modlNm'         , width: 300 , header: { text: goodsInfoListGridCol.modlNm          } ,styleName : "left-column" }
        ,{name: 'brandNm'         , fieldName: 'brandNm'        , width: 150 , header: { text: goodsInfoListGridCol.brandNm         } ,styleName : "left-column" }
        ,{name: 'saleStatCdNm'    , fieldName: 'saleStatCdNm'   , width: 100 , header: { text: goodsInfoListGridCol.saleStatCdNm    } }
        ,{name: 'saleMethCdNm'    , fieldName: 'saleMethCdNm'   , width: 100 , header: { text: goodsInfoListGridCol.saleMethCdNm    } }
        ,{name: 'taxGbCdNm'       , fieldName: 'taxGbCdNm'      , width: 100 , header: { text: goodsInfoListGridCol.taxGbCdNm       } }
        ,{name: 'buyTypCdNm'      , fieldName: 'buyTypCdNm'     , width: 100 , header: { text: goodsInfoListGridCol.buyTypCdNm      } }
        ,{name: 'norPrc'          , fieldName: 'norPrc'         , width: 100 , header: { text: goodsInfoListGridCol.norPrc          } ,styleName: 'right-column' ,numberFormat: '#,##0' }
        ,{name: 'salePrc'         , fieldName: 'salePrc'        , width: 100 , header: { text: goodsInfoListGridCol.salePrc         } ,styleName: 'right-column' ,numberFormat: '#,##0' }
        ,{name: 'mrgnRate'        , fieldName: 'mrgnRate'       , width: 100 , header: { text: goodsInfoListGridCol.mrgnRate        } ,styleName: 'right-column' ,numberFormat: '0.00' ,suffix: '%' }
        ,{name: 'prcCompaExpYn'   , fieldName: 'prcCompaExpYn'  , width: 100 , header: { text: goodsInfoListGridCol.prcCompaExpYn   } ,readOnly: true ,sortable: false ,lookupDisplay: true ,renderer: { type: "check", trueValues: "Y", falseValues: "N"} }
        ,{name: 'dispYn'          , fieldName: 'dispYn'         , width: 100 , header: { text: goodsInfoListGridCol.dispYn          } ,readOnly: true ,sortable: false ,lookupDisplay: true ,renderer: { type: "check", trueValues: "Y", falseValues: "N"} }
        ,{name: 'itmSoutNotiYn'   , fieldName: 'itmSoutNotiYn'  , width: 100 , header: { text: goodsInfoListGridCol.itmSoutNotiYn   } ,readOnly: true ,sortable: false ,lookupDisplay: true ,renderer: { type: "check", trueValues: "Y", falseValues: "N"} }
        ,{name: 'entrNm'          , fieldName: 'entrNm'         , width: 250 , header: { text: goodsInfoListGridCol.entrNm          } ,styleName : "left-column" }
        ,{name: 'mdNm'            , fieldName: 'mdNm'           , width: 100 , header: { text: goodsInfoListGridCol.mdNm            } }
        ,{name: 'stdCtgHierarchy' , fieldName: 'stdCtgHierarchy', width: 300 , header: { text: goodsInfoListGridCol.stdCtgHierarchy } ,styleName : "left-column" }
        ,{name: 'deliProcTypCdNm' , fieldName: 'deliProcTypCdNm', width: 100 , header: { text: goodsInfoListGridCol.deliProcTypCdNm } }
        ,{name: 'deliGoodsGbCdNm' , fieldName: 'deliGoodsGbCdNm', width: 100 , header: { text: goodsInfoListGridCol.deliGoodsGbCdNm } }
        ,{name: 'goodsRegDtm'     , fieldName: 'goodsRegDtm'    , width: 150 , header: { text: goodsInfoListGridCol.goodsRegDtm     } }
        ,{name: 'saleStrDtm'      , fieldName: 'saleStrDtm'     , width: 130 , header: { text: goodsInfoListGridCol.saleStrDtm      } }
        ,{name: 'saleEndDtm'      , fieldName: 'saleEndDtm'     , width: 130 , header: { text: goodsInfoListGridCol.saleEndDtm      } }
    ]
    ,props : {
        form : 'goodsInfoGridForm'
        ,action : _baseUrl + 'goods/GoodsMgmt.getGoodsList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : false
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
    }
}