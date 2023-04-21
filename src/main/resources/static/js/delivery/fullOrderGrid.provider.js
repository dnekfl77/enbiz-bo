var col = x2coMessage.getMessage({
    ordNo             : 'deliveryMgmt.fullOrderInquiry.grid.label.ordNo',   // 주문번호
    ordFnshDtm        : 'deliveryMgmt.fullOrderInquiry.grid.label.ordFnshDtm',   // 주문일자
    sndIndiFcstDt     : 'deliveryMgmt.fullOrderInquiry.grid.label.sndIndiFcstDt',   // 발송지시예정일자
    ordMediaCd        : 'deliveryMgmt.fullOrderInquiry.grid.label.ordMediaCd',   // 주문매체
    saleMethCd        : 'deliveryMgmt.fullOrderInquiry.grid.label.saleMethCd',   // 판매방식
    deliProcTypCd     : 'deliveryMgmt.fullOrderInquiry.grid.label.deliProcTypCd',   // 배송처리유형
    deliWayCd         : 'deliveryMgmt.fullOrderInquiry.grid.label.deliWayCd',   // 배송수단
    ordDtlStatCd      : 'deliveryMgmt.fullOrderInquiry.grid.label.ordDtlStatCd',   // 주문진행상태
    entrNm            : 'deliveryMgmt.fullOrderInquiry.grid.label.entrNm',   // 협력사명
    goodsNo           : 'deliveryMgmt.fullOrderInquiry.grid.label.goodsNo',   // 상품코드
    goodsNm           : 'deliveryMgmt.fullOrderInquiry.grid.label.goodsNm',   // 상품명
    itmNo             : 'deliveryMgmt.fullOrderInquiry.grid.label.itmNo',   // 단품코드
    itmNm             : 'deliveryMgmt.fullOrderInquiry.grid.label.itmNm',   // 단품명
    ordQty            : 'deliveryMgmt.fullOrderInquiry.grid.label.ordQty',   // 주문수량
    salePrc           : 'deliveryMgmt.fullOrderInquiry.grid.label.salePrc',   // 판매가
    aplyAdtnAmt       : 'deliveryMgmt.fullOrderInquiry.grid.label.aplyAdtnAmt',   // 할인금액
    ordPrc            : 'deliveryMgmt.fullOrderInquiry.grid.label.ordPrc',   // 주문금액
    deliMsg           : 'deliveryMgmt.fullOrderInquiry.grid.label.deliMsg',   // 배송메시지
    shopTrafMsg       : 'deliveryMgmt.fullOrderInquiry.grid.label.shopTrafMsg',   // 매장전달메시지
    ordManNm          : 'deliveryMgmt.fullOrderInquiry.grid.label.ordManNm',   // 주문자명
    rcvmnNm           : 'deliveryMgmt.fullOrderInquiry.grid.label.rcvmnNm',   // 수취인명
    ordManTel         : 'deliveryMgmt.fullOrderInquiry.grid.label.ordManTel',   // 주문자연락처
    rcvmnTel          : 'deliveryMgmt.fullOrderInquiry.grid.label.rcvmnTel',   // 수취인연락처
    addr              : 'deliveryMgmt.fullOrderInquiry.grid.label.addr'    // 주소
});

$.namespace("fullOrderGrid.settings");
fullOrderGrid.settings = {
    fields : [ { fieldName : "ordNo" }
             , { fieldName : "ordFnshDtm" }
             , { fieldName : "sndIndiFcstDt" }
             , { fieldName : "ordMediaCd" }
             , { fieldName : "saleMethCd" }
             , { fieldName : "deliProcTypCd" }
             , { fieldName : "deliWayCd" }
             , { fieldName : "ordDtlStatCd" }
             , { fieldName : "entrNm" }
             , { fieldName : "goodsNo" }
             , { fieldName : "goodsNm" }
             , { fieldName : "itmNo" }
             , { fieldName : "itmNm" }
             , { fieldName : "ordQty", dataType: "number" }
             , { fieldName : "salePrc", dataType: "number" }
             , { fieldName : "aplyAdtnAmt", dataType: "number" }
             , { fieldName : "ordPrc", dataType: "number" }
             , { fieldName : "deliMsg" }
             , { fieldName : "shopTrafMsg" }
             , { fieldName : "ordManNm" }
             , { fieldName : "rcvmnNm" }
             , { fieldName : "mbrNo" }
             , { fieldName : "umemCellSctNo" }
             , { fieldName : "umemCellTxnoNo" }
             , { fieldName : "umemCellEndNo" }
             , { fieldName : "cellSctNo" }
             , { fieldName : "cellTxnoNo" }
             , { fieldName : "cellEndNo" }
             , { fieldName : "ordManTel" }
             , { fieldName : "rcvmnCellSctNo" }
             , { fieldName : "rcvmnCellTxnoNo" }
             , { fieldName : "rcvmnCellEndNo" }
             , { fieldName : "rcvmnTel" }
             , { fieldName : "zipAddr" }
             , { fieldName : "dtlAddr" }
             , { fieldName : "addr" } ],
    columns : [ {
        name : "ordNo",
        fieldName : "ordNo",
        header : {
            text : col.ordNo
        },
        width : 300,
        styleName : "disable-column column-underline-c"
    }, {
        name : "ordFnshDtm",
        fieldName : "ordFnshDtm",
        header : {
            text : col.ordFnshDtm
        },
        width : 100,
        styleName : "disable-column"
    }, {
        name : "sndIndiFcstDt",
        fieldName : "sndIndiFcstDt",
        header : {
            text : col.sndIndiFcstDt
        },
        width : 100,
        styleName : "disable-column"
    }, {
         name : "ordMediaCd",
         fieldName : "ordMediaCd",
         header : {
            text : col.ordMediaCd
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "saleMethCd",
         fieldName : "saleMethCd",
         header : {
            text : col.saleMethCd
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
         name : "ordDtlStatCd",
         fieldName : "ordDtlStatCd",
         header : {
            text : col.ordDtlStatCd
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "entrNm",
         fieldName : "entrNm",
         header : {
            text : col.entrNm
         },
         width : 120,
         styleName : "disable-column left-column"
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
         styleName : "disable-column left-column"
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
         name : "ordQty",
         fieldName : "ordQty",
         header : {
            text : col.ordQty
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
         name : "aplyAdtnAmt",
         fieldName : "aplyAdtnAmt",
         header : {
            text : col.aplyAdtnAmt
         },
         width : 100,
         numberFormat: "#,##0",
         styleName : "disable-column right-column"
    }, {
         name : "ordPrc",
         fieldName : "ordPrc",
         header : {
            text : col.ordPrc
         },
         width : 100,
         numberFormat: "#,##0",
         styleName : "disable-column right-column"
    }, {
         name : "deliMsg",
         fieldName : "deliMsg",
         header : {
            text : col.deliMsg
         },
         width : 200,
         styleName : "disable-column left-column"
    }, {
         name : "shopTrafMsg",
         fieldName : "shopTrafMsg",
         header : {
            text : col.shopTrafMsg
         },
         width : 180,
         styleName : "disable-column left-column"
    }, {
         name : "ordManNm",
         fieldName : "ordManNm",
         header : {
            text : col.ordManNm
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
         name : "mbrNo",
         fieldName : "mbrNo",
         visible : false
    }, {
         name : "umemCellSctNo",
         fieldName : "umemCellSctNo",
         visible : false
    }, {
         name : "umemCellTxnoNo",
         fieldName : "umemCellTxnoNo",
         visible : false
    }, {
         name : "umemCellEndNo",
         fieldName : "umemCellEndNo",
         visible : false
    }, {
         name : "cellSctNo",
         fieldName : "cellSctNo",
         visible : false
    }, {
         name : "cellTxnoNo",
         fieldName : "cellTxnoNo",
         visible : false
    }, {
         name : "cellEndNo",
         fieldName : "cellEndNo",
         visible : false
    }, {
         name : "ordManTel",
         fieldName : "ordManTel",
         header : {
            text : col.ordManTel
         },
         width : 100,
         styleName : "disable-column",
         "displayCallback": function(grid,index,value){
            var mbrNo = grid.getValue(index.itemIndex, "mbrNo");
            var umemCellSctNo = grid.getValue(index.itemIndex, "umemCellSctNo");
            var umemCellTxnoNo = grid.getValue(index.itemIndex, "umemCellTxnoNo");
            var umemCellEndNo = grid.getValue(index.itemIndex, "umemCellEndNo");
            var cellSctNo = grid.getValue(index.itemIndex, "cellSctNo");
            var cellTxnoNo = grid.getValue(index.itemIndex, "cellTxnoNo");
            var cellEndNo = grid.getValue(index.itemIndex, "cellEndNo");

            var formattingValue = '';
            if (mbrNo == nonMembersNumber) { // 비회원인 경우
                formattingValue += umemCellSctNo === null || umemCellSctNo === '' ? "" : umemCellSctNo + "-" ;
                formattingValue += umemCellTxnoNo === null || umemCellTxnoNo === ''  ? "" : umemCellTxnoNo + "-";
                formattingValue += umemCellEndNo === null  || umemCellEndNo === '' ? "" : umemCellEndNo;
            } else { // 회원인 경우
                formattingValue += cellSctNo === null || cellSctNo === '' ? "" : cellSctNo + "-" ;
                formattingValue += cellTxnoNo === null || cellTxnoNo === ''  ? "" : cellTxnoNo + "-";
                formattingValue += cellEndNo === null  || cellEndNo === '' ? "" : cellEndNo;
            }
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
         name : "rcvmnTel",
         fieldName : "rcvmnTel",
         header : {
            text : col.rcvmnTel
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
    }],
    props : {
        paging : true,
        defrow : 10,
        rows : 0,
        width : "100%",
        autoFitHeight : true,
        sumRowVisible : false,
        checkbox : false,
        crud : false,
        form : "fullOrderGridForm",
        action : _baseUrl + "delivery/fullOrderInquiryList.getFullOrderInquiryList.do"
    }
};
