var packageRelatedGoodsListGridCol = x2coMessage.getMessage({
    tgtGoodsNo         :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.tgtGoodsNo'
    ,goodsNm           :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.goodsNm'
    ,repYn             :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.repYn'
    ,sortSeq           :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.sortSeq'
    ,brandNm           :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.brandNm'
    ,entrNo            :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.entrNo'
    ,entrNm            :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.entrNm'
    ,mdId              :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.mdId'
    ,saleStatCdNm      :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.saleStatCdNm'
    ,dispYn            :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.dispYn'
    ,deliProcTypCdNm   :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.deliProcTypCdNm'
    ,deliGoodsGbCdNm   :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.deliGoodsGbCdNm'
    ,salePrc           :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.salePrc'
    ,dispDlexAmt       :  'packageGoods.pkgInfo.packageRelatedGoodsListGrid.field.dispDlexAmt'
});


$.namespace("packageRelatedGoodsListGrid.settings");
packageRelatedGoodsListGrid.settings = {
    fields : [
        { fieldName: 'tgtGoodsNo'        ,  dataType: 'text'   },   // 대상상품번호
        { fieldName: 'goodsNm'           ,  dataType: 'text'   },   // 상품명
        { fieldName: 'repYn'             ,  dataType: 'text'   },   // 대표여부
        { fieldName: 'sortSeq'           ,  dataType: 'number' },   // 정렬순서
        { fieldName: 'brandNm'           ,  dataType: 'text'   },   // 브랜드명
        { fieldName: 'entrNo'            ,  dataType: 'text'   },   // 협력사번호
        { fieldName: 'entrNm'            ,  dataType: 'text'   },   // 협력사명
        { fieldName: 'mdId'              ,  dataType: 'text'   },   // 담당MD
        { fieldName: 'saleStatCdNm'      ,  dataType: 'text'   },   // 판매상태코드명
        { fieldName: 'dispYn'            ,  dataType: 'text'   },   // 전시여부
        { fieldName: 'deliProcTypCdNm'   ,  dataType: 'text'   },   // 배송처리유형명
        { fieldName: 'deliGoodsGbCdNm'   ,  dataType: 'text'   },   // 배송상품구분코드명
        { fieldName: 'salePrc'           ,  dataType: 'number' },   // 판매가
        { fieldName: 'dispDlexAmt'       ,  dataType: 'text'   }    // 배송비
    ]
    ,columns : [
        {
            name: 'tgtGoodsNo',
            fieldName: 'tgtGoodsNo',
            width : 120,
            editable : false,
            styleName: 'disable-column',
            header: { text: packageRelatedGoodsListGridCol.tgtGoodsNo }
        }
        ,{
            name: 'goodsNm',
            fieldName: 'goodsNm',
            width : 200,
            editable : false,
            styleName: 'disable-column left-column',
            header: { text: packageRelatedGoodsListGridCol.goodsNm }
        }
        ,{
            name: 'repYn',
            fieldName: 'repYn',
            width : 80,
            sortable: false,
            editable : false,
            header: { text: packageRelatedGoodsListGridCol.repYn + '*'  },
            renderer: {
                type: "check",
                trueValues: "Y",
                falseValues: "N"
            }
        }
        ,{
            name: 'sortSeq',
            fieldName: 'sortSeq',
            width : 80,
            header: { text: packageRelatedGoodsListGridCol.sortSeq + '*' },
            editor: {
                type: 'number',
                integerOnly: true,
                maxIntegerLength: 2,
            },
            numberFormat : '0'
        }
        ,{
            name: 'brandNm',
            fieldName: 'brandNm',
            width : 200,
            editable : false,
            styleName: 'disable-column left-column',
            header: { text: packageRelatedGoodsListGridCol.brandNm }
        }
        ,{
            name: 'entrNo',
            fieldName: 'entrNo',
            width : 120,
            editable : false,
            styleName: 'disable-column',
            header: { text: packageRelatedGoodsListGridCol.entrNo }
        }
        ,{
            name: 'entrNm',
            fieldName: 'entrNm',
            width : 200,
            editable : false,
            styleName: 'disable-column left-column',
            header: { text: packageRelatedGoodsListGridCol.entrNm }
        }
        ,{
            name: 'mdId',
            fieldName: 'mdId',
            width : 120,
            editable : false,
            styleName: 'disable-column',
            header: { text: packageRelatedGoodsListGridCol.mdId }
        }
        ,{
            name: 'saleStatCdNm',
            fieldName: 'saleStatCdNm',
            width : 150,
            editable : false,
            styleName: 'disable-column',
            header: { text: packageRelatedGoodsListGridCol.saleStatCdNm }
        }
        ,{
            name: 'dispYn',
            fieldName: 'dispYn',
            width : 80,
            editable : false,
            sortable: false,
            readOnly: true,
            styleName: 'disable-column',
            header: { text: packageRelatedGoodsListGridCol.dispYn },
            renderer: {
                type: "check",
                trueValues: "Y",
                falseValues: "N"
            }
        }
        ,{
            name: 'deliProcTypCdNm',
            fieldName: 'deliProcTypCdNm',
            width : 150,
            editable : false,
            styleName: 'disable-column',
            header: { text: packageRelatedGoodsListGridCol.deliProcTypCdNm }
        }
        ,{
            name: 'deliGoodsGbCdNm',
            fieldName: 'deliGoodsGbCdNm',
            width : 150,
            editable : false,
            styleName: 'disable-column',
            header: { text: packageRelatedGoodsListGridCol.deliGoodsGbCdNm }
        }
        ,{
            name: 'salePrc',
            fieldName: 'salePrc',
            width: 100,
            editable: false,
            header: { text: packageRelatedGoodsListGridCol.salePrc },
            styleName: 'right-column',
            numberFormat: '#,##0'
        }
        ,{
            name: 'dispDlexAmt',
            fieldName: 'dispDlexAmt',
            width : 300,
            editable : false,
            styleName: 'disable-column left-column',
            header: { text: packageRelatedGoodsListGridCol.dispDlexAmt }
        }
    ]
    ,props : {
        form : ''                       // 서버로 전달할 데이터 Form ID값
        ,action : _baseUrl + ''         // Request URL
        ,autoFitHeight : false          // 그리드 설정 - 사이즈 자동 조정 여부(윈도우 크기에 맞게)
        ,height : 300
        ,popup : false                  // 그리드 설정 - 팝업 자동 resize
        ,checkbox : true                // 그리드 설정 - 체크박스 필드 노출 여부
        ,crud : true                    // 그리드 설정 - 상태 필드 노출 여부
        ,sumRowVisible : false          // 그리드 설정 - 하단 합계 영역 노출 여부
        ,paging : false                 // 페이지네이션 사용 여부
        ,saveAction : _baseUrl + ''
    }
}