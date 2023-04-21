var col = x2coMessage.getMessage({
      goodsNo : 'webStockMgmt.grid.field.goodsNo'                   // 상품번호
    , goodsNm : 'webStockMgmt.grid.field.goodsNm'                   // 상품명
    , itmNo : 'webStockMgmt.grid.field.itmNo'                       // 단품번호
    , itmNm : 'webStockMgmt.grid.field.itmNm'                       // 단품명
    , brandNm : 'webStockMgmt.grid.field.brandNm'                   // 브랜드
    , saleStatCdNm : 'webStockMgmt.grid.field.saleStatCdNm'         // 상품판매상태
    , itmSaleStatCdNm : 'webStockMgmt.grid.field.itmSaleStatCdNm'   // 단품판매상태
    , stkQty : 'webStockMgmt.grid.field.stkQty'                     // 웹재고수량
    , stdCtgHierarchy : 'webStockMgmt.grid.field.stdCtgHierarchy'   // 표준분류
    , entrNo : 'webStockMgmt.grid.field.entrNo'                     // 협력사번호
    , entrNm : 'webStockMgmt.grid.field.entrNm'                     // 협력사명
    , mdId : 'webStockMgmt.grid.field.mdId'                         // 담당MD
    , lgcItmNo : 'webStockMgmt.grid.field.lgcItmNo'                 // 협력사상품코드
    , sysModId : 'webStockMgmt.grid.field.sysModId'                 // 수정자
    , sysModDtm : 'webStockMgmt.grid.field.sysModDtm'               // 수정일시
});

$.namespace('webStockListGrid.settings');
webStockListGrid.settings = {
    fields : [
         { fieldName: 'goodsNo'           , dataType: 'text' }
        ,{ fieldName: 'goodsNm'           , dataType: 'text' }
        ,{ fieldName: 'itmNo'             , dataType: 'text' }
        ,{ fieldName: 'itmNm'             , dataType: 'text' }
        ,{ fieldName: 'brandNm'           , dataType: 'text' }
        ,{ fieldName: 'saleStatCdNm'      , dataType: 'text' }
        ,{ fieldName: 'itmSaleStatCdNm'   , dataType: 'text' }
        ,{ fieldName: 'stkQty'            , dataType: 'number' }
        ,{ fieldName: 'stdCtgHierarchy'   , dataType: 'text' }
        ,{ fieldName: 'entrNo'            , dataType: 'text' }
        ,{ fieldName: 'entrNm'            , dataType: 'text' }
        ,{ fieldName: 'mdId'              , dataType: 'text' }
        ,{ fieldName: 'lgcItmNo'          , dataType: 'text' }
        ,{ fieldName: 'sysModId'          , dataType: 'text' }
        ,{ fieldName: 'sysModDtm'         , dataType: 'text' }
    ]
    ,columns : [
         { name: 'goodsNo'           ,fieldName: 'goodsNo'          ,header: { text:col.goodsNo          } ,width: 120 ,editable: false ,styleName : "column-underline-c disable-column" }
        ,{ name: 'goodsNm'           ,fieldName: 'goodsNm'          ,header: { text:col.goodsNm          } ,width: 300 ,editable: false ,styleName : "column-underline-l disable-column" }
        ,{ name: 'itmNo'             ,fieldName: 'itmNo'            ,header: { text:col.itmNo            } ,width: 70 ,editable: false ,styleName : "disable-column" }
        ,{ name: 'itmNm'             ,fieldName: 'itmNm'            ,header: { text:col.itmNm            } ,width: 90 ,editable: false ,styleName : "left-column disable-column" }
        ,{ name: 'brandNm'           ,fieldName: 'brandNm'          ,header: { text:col.brandNm          } ,width: 100 ,editable: false ,styleName : "left-column disable-column"}
        ,{ name: 'saleStatCdNm'      ,fieldName: 'saleStatCdNm'     ,header: { text:col.saleStatCdNm     } ,width: 100 ,editable: false ,styleName : "disable-column"}
        ,{ name: 'itmSaleStatCdNm'   ,fieldName: 'itmSaleStatCdNm'  ,header: { text:col.itmSaleStatCdNm  } ,width: 100 ,editable: false ,styleName : "disable-column"}
        ,{ name: 'stkQty'            ,fieldName: 'stkQty'           ,header: { text:col.stkQty + '*'     } ,width: 100 ,editor: { type: 'number' ,integerOnly: true ,maxLength: 10 } ,numberFormat : '0' }
        ,{ name: 'stdCtgHierarchy'   ,fieldName: 'stdCtgHierarchy'  ,header: { text:col.stdCtgHierarchy  } ,width: 300 ,editable: false ,styleName : "left-column disable-column"}
        ,{ name: 'entrNo'            ,fieldName: 'entrNo'           ,header: { text:col.entrNo           } ,width: 100 ,editable: false ,styleName : "disable-column"}
        ,{ name: 'entrNm'            ,fieldName: 'entrNm'           ,header: { text:col.entrNm           } ,width: 200 ,editable: false ,styleName : "left-column disable-column"}
        ,{ name: 'mdId'              ,fieldName: 'mdId'             ,header: { text:col.mdId             } ,width: 120 ,editable: false ,styleName : "disable-column"}
        ,{ name: 'lgcItmNo'          ,fieldName: 'lgcItmNo'         ,header: { text:col.lgcItmNo         } ,width: 100 ,editable: false ,styleName : "disable-column"}
        ,{ name: 'sysModId'          ,fieldName: 'sysModId'         ,header: { text:col.sysModId         } ,width: 100 ,editable: false ,styleName : "disable-column"}
        ,{ name: 'sysModDtm'         ,fieldName: 'sysModDtm'        ,header: { text:col.sysModDtm        } ,width: 200 ,editable: false ,styleName : "disable-column"}

    ]
    ,props : {
        form : 'webStockListForm'
        ,action : _baseUrl + 'goods/WebStockMgmt.getWebStockList.do'
        ,saveAction : _baseUrl + 'goods/WebStockMgmt.modifyWebStockList.do'
        ,autoFitHeight : true
        ,popup : false
        ,checkbox : true
        ,crud : true
        ,sumRowVisible : false
        ,paging : true
    }
}