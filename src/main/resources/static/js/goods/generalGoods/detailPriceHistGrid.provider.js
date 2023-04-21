var detailPriceHistGridCol = x2coMessage.getMessage({
    histStrDtm         : 'generalGoods.priceInfo.grid.field.histStrDtm'                // 적용시작일자
    ,histEndDtm        : 'generalGoods.priceInfo.grid.field.histEndDtm'                // 적용종료일자
    ,supPcost          : 'generalGoods.priceInfo.grid.field.supPcost'                  // 공급가
    ,norPrc            : 'generalGoods.priceInfo.grid.field.norPrc'                    // 정상가
    ,salePrc           : 'generalGoods.priceInfo.grid.field.salePrc'                   // 판매가
    ,mrgnRate          : 'generalGoods.priceInfo.grid.field.mrgnRate'                  // 마진율
    ,prcChgCausCdNm    : 'generalGoods.priceInfo.grid.field.prcChgCausCdNm'            // 가격변경사유
    ,sysRegId          : 'generalGoods.priceInfo.grid.field.sysRegId'                  // 등록자Id
    ,sysRegDtm         : 'generalGoods.priceInfo.grid.field.sysRegDtm'                 // 등록일시
});

$.namespace('detailPriceHistGrid.settings');
detailPriceHistGrid.settings = {
    fields : [
        { fieldName: 'histStrDtm'    ,  dataType: 'text'    },  // 적용시작일자
        { fieldName: 'histEndDtm'    ,  dataType: 'text'    },  // 적용종료일자
        { fieldName: 'supPcost'      ,  dataType: 'number'  },  // 공급가
        { fieldName: 'norPrc'        ,  dataType: 'number'  },  // 정상가
        { fieldName: 'salePrc'       ,  dataType: 'number'  },  // 판매가
        { fieldName: 'mrgnRate'      ,  dataType: 'number'  },  // 마진율
        { fieldName: 'prcChgCausCdNm',  dataType: 'text'    },  // 가격변경사유코드명
        { fieldName: 'sysRegId'      ,  dataType: 'text'    },  // 등록자Id
        { fieldName: 'sysRegDtm'     ,  dataType: 'text'    }   // 등록일시
    ]
    ,columns : [
         {name: 'histStrDtm'      , fieldName: 'histStrDtm'     , width: 150, editable: false, header: { text:detailPriceHistGridCol.histStrDtm     }}
        ,{name: 'histEndDtm'      , fieldName: 'histEndDtm'     , width: 150, editable: false, header: { text:detailPriceHistGridCol.histEndDtm     }}
        ,{name: 'supPcost'        , fieldName: 'supPcost'       , width: 80 , editable: false ,header: { text:detailPriceHistGridCol.supPcost       } ,styleName: 'right-column' ,numberFormat: '#,##0' }
        ,{name: 'norPrc'          , fieldName: 'norPrc'         , width: 80 , editable: false ,header: { text:detailPriceHistGridCol.norPrc         } ,styleName: 'right-column' ,numberFormat: '#,##0' }
        ,{name: 'salePrc'         , fieldName: 'salePrc'        , width: 80 , editable: false ,header: { text:detailPriceHistGridCol.salePrc        } ,styleName: 'right-column' ,numberFormat: '#,##0' }
        ,{name: 'mrgnRate'        , fieldName: 'mrgnRate'       , width: 80 , editable: false ,header: { text:detailPriceHistGridCol.mrgnRate       } ,styleName: 'right-column' ,numberFormat: '0.00' ,suffix: '%' }
        ,{name: 'prcChgCausCdNm'  , fieldName: 'prcChgCausCdNm' , width: 200, editable: false ,header: { text:detailPriceHistGridCol.prcChgCausCdNm }}
        ,{name: 'sysRegId'        , fieldName: 'sysRegId'       , width: 120, editable: false ,header: { text:detailPriceHistGridCol.sysRegId       }}
        ,{name: 'sysRegDtm'       , fieldName: 'sysRegDtm'      , width: 150, editable: false ,header: { text:detailPriceHistGridCol.sysRegDtm      }}
    ]
    ,props : {
        form : ''
        ,action : _baseUrl + 'goods/GoodsCommon.getGeneralGoodsPriceHistList.do'
        ,height: 140
        ,popup : false
        ,checkbox : false
        ,crud : false
        ,sumRowVisible : false
        ,paging : true
        ,fitStyle : "evenFill",
    }
}