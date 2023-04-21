var col = x2coMessage.getMessage({
    ordNo             : 'deliveryMgmt.deliveryList.grid.label.ordNo',         // 주문번호
    deliNo            : 'deliveryMgmt.deliveryList.grid.label.deliNo',        // 배송번호
    deliTypCd         : 'deliveryMgmt.deliveryList.grid.label.deliTypCd',     // 배송유형
    deliProcTypCd     : 'deliveryMgmt.deliveryList.grid.label.deliProcTypCd', // 배송처리유형
    deliWayCd         : 'deliveryMgmt.deliveryList.grid.label.deliWayCd',     // 배송수단
    deliPrgsStatCd    : 'deliveryMgmt.deliveryList.grid.label.deliPrgsStatCd',// 배숭진행상태
    hdcCd             : 'deliveryMgmt.deliveryList.grid.label.hdcCd',         // 택배사
    invNo             : 'deliveryMgmt.deliveryList.grid.label.invNo',         // 운송장번호
    bpckPsbYn         : 'deliveryMgmt.deliveryList.grid.label.bpckPsbYn',     // 합포장여부
    ordererNm         : 'deliveryMgmt.deliveryList.grid.label.ordererNm',     // 주문자
    rcvmnNm           : 'deliveryMgmt.deliveryList.grid.label.rcvmnNm',       // 수취인
    rcvmnTel          : 'deliveryMgmt.deliveryList.grid.label.rcvmnTel',      // 수취인전화번호
    rcvmnCell         : 'deliveryMgmt.deliveryList.grid.label.rcvmnCell',     // 수취인휴대전화
    addr              : 'deliveryMgmt.deliveryList.grid.label.addr',          // 배송지
    ordFnshDtm        : 'deliveryMgmt.deliveryList.grid.label.ordFnshDtm',    // 주문완료일자
    indiDtm           : 'deliveryMgmt.deliveryList.grid.label.indiDtm',       // 발송지시일자
    procDtm           : 'deliveryMgmt.deliveryList.grid.label.procDtm',       // 발송완료일자
    fnshDtm           : 'deliveryMgmt.deliveryList.grid.label.fnshDtm',       // 배송완료일자
    sndWaitCausCd     : 'deliveryMgmt.deliveryList.grid.label.sndWaitCausCd', // 지연사유
    sndWaitCausSms    : 'deliveryMgmt.deliveryList.grid.label.sndWaitCausSms',// 지연안내(sms)
    goodsNo           : 'deliveryMgmt.deliveryList.grid.label.goodsNo',       // 상품코드
    goodsNm           : 'deliveryMgmt.deliveryList.grid.label.goodsNm',       // 상품명
    itmNo             : 'deliveryMgmt.deliveryList.grid.label.itmNo',         // 단품코드
    itmNm             : 'deliveryMgmt.deliveryList.grid.label.itmNm',         // 단품명
    indiQty           : 'deliveryMgmt.deliveryList.grid.label.indiQty',       // 지시수량
    salePrc           : 'deliveryMgmt.deliveryList.grid.label.salePrc',       // 판매가
    entrNo            : 'deliveryMgmt.deliveryList.grid.label.entrNo',        // 협력사
    deliGoodsGbCd     : 'deliveryMgmt.deliveryList.grid.label.deliGoodsGbCd' // 배송상품구분
});

$.namespace("deliveryGrid.settings");
deliveryGrid.settings = {
    fields : [ { fieldName : "ordNo" }
             , { fieldName : "deliNo" }
             , { fieldName : "deliTypCd" }
             , { fieldName : "deliProcTypCd" }
             , { fieldName : "deliWayCd" }
             , { fieldName : "deliPrgsStatCd" }
             , { fieldName : "hdcCd" }
             , { fieldName : "invNo" }
             , { fieldName : "bpckPsbYn" }
             , { fieldName : "ordererNm" }
             , { fieldName : "rcvmnNm" }
             , { fieldName : "rcvmnTelRgnNo" }
             , { fieldName : "rcvmnTelTxnoNo" }
             , { fieldName : "rcvmnTelEndNo" }
             , { fieldName : "rcvmnTel" }
             , { fieldName : "rcvmnCellSctNo" }
             , { fieldName : "rcvmnCellTxnoNo" }
             , { fieldName : "rcvmnCellEndNo" }
             , { fieldName : "rcvmnCell" }
             , { fieldName : "zipAddr" }
             , { fieldName : "dtlAddr" }
             , { fieldName : "addr" }
             , { fieldName : "ordFnshDtm" }
             , { fieldName : "indiDtm" }
             , { fieldName : "procDtm" }
             , { fieldName : "fnshDtm" }
             , { fieldName : "sndWaitCausCd" }
             , { fieldName : "sndWaitCausCdNm" }
             , { fieldName : "sndWaitCausSms" }
             , { fieldName : "goodsNo" }
             , { fieldName : "goodsNm" }
             , { fieldName : "itmNo" }
             , { fieldName : "itmNm" }
             , { fieldName : "indiQty", dataType: "number"  }
             , { fieldName : "salePrc", dataType: "number"  }
             , { fieldName : "entrNo" }
             , { fieldName : "deliGoodsGbCd" }],
    columns : [ {
        name : "ordNo",
        fieldName : "ordNo",
        header : {
            text : col.ordNo
        },
        width : 100,
        styleName : "disable-column column-underline-c"
    }, {
        name : "deliNo",
        fieldName : "deliNo",
        header : {
            text : col.deliNo
        },
        width : 80,
        styleName : "disable-column column-underline-c"
    }, {
        name : "deliTypCd",
        fieldName : "deliTypCd",
        header : {
            text : col.deliTypCd
        },
        width : 80,
        styleName : "disable-column"
    }, {
         name : "deliProcTypCd",
         fieldName : "deliProcTypCd",
         header : {
            text : col.deliProcTypCd
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "deliWayCd",
         fieldName : "deliWayCd",
         header : {
            text : col.deliWayCd
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "deliPrgsStatCd",
         fieldName : "deliPrgsStatCd",
         header : {
            text : col.deliPrgsStatCd
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "hdcCd",
         fieldName : "hdcCd",
         header : {
            text : col.hdcCd
         },
         width : 80,
        styleName : "disable-column"
    }, {
         name : "invNo",
         fieldName : "invNo",
         header : {
            text : col.invNo
         },
         width : 80,
         styleName : "disable-column  column-underline-c"
    }, {
         name : "bpckPsbYn",
         fieldName : "bpckPsbYn",
         header : {
            text : col.bpckPsbYn
         },
         width : 80,
         readOnly : true,
         renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
         },
         styleName : "disable-column"
    }, {
         name : "ordererNm",
         fieldName : "ordererNm",
         header : {
            text : col.ordererNm
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "rcvmnNm",
         fieldName : "rcvmnNm",
         header : {
            text : col.rcvmnNm
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "rcvmnTelRgnNo",
         fieldName : "rcvmnTelRgnNo",
         visible : false
    }, {
         name : "rcvmnTelTxnoNo",
         fieldName : "rcvmnTelTxnoNo",
         visible : false
    }, {
         name : "rcvmnTelEndNo",
         fieldName : "rcvmnTelEndNo",
         visible : false
    }, {
         name : "rcvmnTel",
         fieldName : "rcvmnTel",
         header : {
            text : col.rcvmnTel
         },
         width : 100,
         styleName : "disable-column",
         "displayCallback": function(grid,index,value){
            var rcvmnTelRgnNo = grid.getValue(index.itemIndex, "rcvmnTelRgnNo");
            var rcvmnTelTxnoNo = grid.getValue(index.itemIndex, "rcvmnTelTxnoNo");
            var rcvmnTelEndNo = grid.getValue(index.itemIndex, "rcvmnTelEndNo");

            var formattingValue = '';
            formattingValue += rcvmnTelRgnNo === null || rcvmnTelRgnNo === '' ? "" : rcvmnTelRgnNo + "-" ;
            formattingValue += rcvmnTelTxnoNo === null || rcvmnTelTxnoNo === ''  ? "" : rcvmnTelTxnoNo + "-";
            formattingValue += rcvmnTelEndNo === null  || rcvmnTelEndNo === '' ? "" : rcvmnTelEndNo;
            return formattingValue;
         }
    }, {
         name : "rcvmnCellSctNo",
         fieldName : "rcvmnCellSctNo",
         visible : false
    }, {
         name : "rcvmnCellTxnoNo",
         fieldName : "rcvmnCellTxnoNo",
         visible : false
    }, {
         name : "rcvmnCellEndNo",
         fieldName : "rcvmnCellEndNo",
         visible : false
    }, {
         name : "rcvmnCell",
         fieldName : "rcvmnCell",
         header : {
            text : col.rcvmnCell
         },
         width : 100,
         styleName : "disable-column",
         "displayCallback": function(grid,index,value){
            var rcvmnCellSctNo = grid.getValue(index.itemIndex, "rcvmnCellSctNo");
            var rcvmnCellTxnoNo = grid.getValue(index.itemIndex, "rcvmnCellTxnoNo");
            var rcvmnCellEndNo = grid.getValue(index.itemIndex, "rcvmnCellEndNo");

            var formattingValue = '';
            formattingValue += rcvmnCellSctNo === null || rcvmnCellSctNo === '' ? "" : rcvmnCellSctNo + "-" ;
            formattingValue += rcvmnCellTxnoNo === null || rcvmnCellTxnoNo === ''  ? "" : rcvmnCellTxnoNo + "-";
            formattingValue += rcvmnCellEndNo === null  || rcvmnCellEndNo === '' ? "" : rcvmnCellEndNo;
            return formattingValue;
         }
    }, {
         name : "zipAddr",
         fieldName : "zipAddr",
         visible : false
    }, {
         name : "dtlAddr",
         fieldName : "dtlAddr",
         visible : false
    }, {
         name : "addr",
         fieldName : "addr",
         header : {
            text : col.addr
         },
         width : 300,
         styleName : "disable-column left-column",
         "displayCallback": function(grid,index,value){
             var zipAddr = grid.getValue(index.itemIndex, "zipAddr");
             var dtlAddr = grid.getValue(index.itemIndex, "dtlAddr");

             var formattingValue = '';
             formattingValue += zipAddr === null || zipAddr === '' ? "" : zipAddr + " ";
             formattingValue += dtlAddr === null || dtlAddr === ''  ? "" : dtlAddr;
             return formattingValue;
         }
    }, {
         name : "ordFnshDtm",
         fieldName : "ordFnshDtm",
         header : {
            text : col.ordFnshDtm
         },
         width : 100,
         styleName : "disable-column"
    }, {
         name : "indiDtm",
         fieldName : "indiDtm",
         header : {
            text : col.indiDtm
         },
         width : 100,
         styleName : "disable-column"
    }, {
         name : "procDtm",
         fieldName : "procDtm",
         header : {
            text : col.procDtm
         },
         width : 100,
         styleName : "disable-column"
    }, {
         name : "fnshDtm",
         fieldName : "fnshDtm",
         header : {
            text : col.fnshDtm
         },
         width : 100,
         styleName : "disable-column"
    }, {
         name : "sndWaitCausCd",
         fieldName : "sndWaitCausCd",
         visible : false
    }, {
         name : "sndWaitCausCdNm",
         fieldName : "sndWaitCausCdNm",
         header : {
            text : col.sndWaitCausCd
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "sndWaitCausSms",
         fieldName : "sndWaitCausSms",
         header : {
            text : col.sndWaitCausSms
         },
         width : 80,
         styleName : "disable-column column-underline-c"
    }, {
         name : "goodsNo",
         fieldName : "goodsNo",
         header : {
            text : col.goodsNo
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "goodsNm",
         fieldName : "goodsNm",
         header : {
            text : col.goodsNm
         },
         width : 180,
         styleName : "disable-column  column-underline-l"
    }, {
         name : "itmNo",
         fieldName : "itmNo",
         header : {
            text : col.itmNo
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "itmNm",
         fieldName : "itmNm",
         header : {
            text : col.itmNm
         },
         width : 180,
         styleName : "disable-column left-column"
    }, {
         name : "indiQty",
         fieldName : "indiQty",
         header : {
            text : col.indiQty
         },
         width : 80,
         numberFormat: "#,##0",
         styleName : "disable-column right-column"
    }, {
         name : "salePrc",
         fieldName : "salePrc",
         header : {
            text : col.salePrc
         },
         width : 100,
         numberFormat: "#,##0",
         styleName : "disable-column right-column"
    }, {
         name : "entrNo",
         fieldName : "entrNo",
         header : {
            text : col.entrNo
         },
         width : 120,
         styleName : "disable-column left-column"
    }, {
         name : "deliGoodsGbCd",
         fieldName : "deliGoodsGbCd",
         header : {
            text : col.deliGoodsGbCd
         },
         width : 80,
         styleName : "disable-column"
    } ],
    props : {
        paging : true,
        defrow : 10,
        rows : 0,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : false,
        crud : false,
        form : "deliveryGridForm",
        action : _baseUrl + "delivery/deliveryList.getDeliveryInquiryList.do"
    }
};
