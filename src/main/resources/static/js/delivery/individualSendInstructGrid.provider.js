var col = x2coMessage.getMessage({
    ordNo             : 'deliveryMgmt.individualSendInstruct.grid.label.ordNo',            // 주문번호
    ordManNm          : 'deliveryMgmt.individualSendInstruct.grid.label.ordManNm',         // 주문자
    rcvmnNm           : 'deliveryMgmt.individualSendInstruct.grid.label.rcvmnNm',          // 수취인
    saleMethCd        : 'deliveryMgmt.individualSendInstruct.grid.label.saleMethCd',       // 판매방식
    sndIndiFcstDt     : 'deliveryMgmt.individualSendInstruct.grid.label.sndIndiFcstDt',    // 발송지시예정일
    deliProcTypCd     : 'deliveryMgmt.individualSendInstruct.grid.label.deliProcTypCd',    // 배송처리유형
    deliWayCd         : 'deliveryMgmt.individualSendInstruct.grid.label.deliWayCd',        // 배송수단
    ordDtlStatCd      : 'deliveryMgmt.individualSendInstruct.grid.label.ordDtlStatCd',     // 진행상태
    ordCall           : 'deliveryMgmt.individualSendInstruct.grid.label.ordCall',          // 주문자휴대전화
    ordTel            : 'deliveryMgmt.individualSendInstruct.grid.label.ordTel'            // 주문자전화번호
});

$.namespace("individualSendInstructGrid.settings");
individualSendInstructGrid.settings = {
    fields : [ { fieldName : "ordNo" }
             , { fieldName : "ordSeq" }
             , { fieldName : "deliUnitNo" }
             , { fieldName : "dlvpSeq" }
             , { fieldName : "siteNo" }
             , { fieldName : "ordDtlGbCd" }
             , { fieldName : "deliPolcNo" }
             , { fieldName : "dlexChrgSubCd" }
             , { fieldName : "entrNo" }
             , { fieldName : "ordManNm" }
             , { fieldName : "ordManNmMask" }
             , { fieldName : "rcvmnNm" }
             , { fieldName : "saleMethCd" }
             , { fieldName : "sndIndiFcstDt" }
             , { fieldName : "deliProcTypCd" }
             , { fieldName : "deliProcTypNm" }
             , { fieldName : "deliWayCd" }
             , { fieldName : "deliWayNm" }
             , { fieldName : "ordDtlStatCd" }
             , { fieldName : "mbrNo" }
             , { fieldName : "umemCellSctNo" }
             , { fieldName : "umemCellTxnoNo" }
             , { fieldName : "umemCellEndNo" }
             , { fieldName : "cellSctNo" }
             , { fieldName : "cellTxnoNo" }
             , { fieldName : "cellEndNo" }
             , { fieldName : "ordCall" }
             , { fieldName : "umemTelRgnNo" }
             , { fieldName : "umemTelTxnoNo" }
             , { fieldName : "umemTelEndNo" }
             , { fieldName : "telRgnNo" }
             , { fieldName : "telTxnoNo" }
             , { fieldName : "telEndNo" }
             , { fieldName : "ordTel" } ],
    columns : [ {
        name : "ordNo",
        fieldName : "ordNo",
        header : {
            text : col.ordNo
        },
        width : 100,
        styleName : "disable-column column-underline-c"
    }, {
         name : "ordSeq",
         fieldName : "ordSeq",
         visible : false
    }, {
         name : "deliUnitNo",
         fieldName : "deliUnitNo",
         visible : false
    }, {
         name : "dlvpSeq",
         fieldName : "dlvpSeq",
         visible : false
    }, {
         name : "siteNo",
         fieldName : "siteNo",
         visible : false
    }, {
         name : "ordDtlGbCd",
         fieldName : "ordDtlGbCd",
         visible : false
    }, {
         name : "deliPolcNo",
         fieldName : "deliPolcNo",
         visible : false
    }, {
         name : "dlexChrgSubCd",
         fieldName : "dlexChrgSubCd",
         visible : false
    }, {
         name : "entrNo",
         fieldName : "entrNo",
         visible : false
    }, {
         name : "ordManNm",
         fieldName : "ordManNm",
         visible : false
    }, {
         name : "ordManNmMask",
         fieldName : "ordManNmMask",
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
         name : "saleMethCd",
         fieldName : "saleMethCd",
         header : {
            text : col.saleMethCd
         },
         width : 80,
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
         name : "deliProcTypCd",
         fieldName : "deliProcTypCd",
         visible : false
    }, {
         name : "deliProcTypNm",
         fieldName : "deliProcTypNm",
         header : {
            text : col.deliProcTypCd
         },
         width : 80,
         styleName : "disable-column"
    }, {
         name : "deliWayCd",
         fieldName : "deliWayCd",
         visible : false
    }, {
         name : "deliWayNm",
         fieldName : "deliWayNm",
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
         name : "ordCall",
         fieldName : "ordCall",
         header : {
            text : col.ordCall
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
         name : "umemTelRgnNo",
         fieldName : "umemTelRgnNo",
         visible : false
    }, {
         name : "umemTelTxnoNo",
         fieldName : "umemTelTxnoNo",
         visible : false
    }, {
         name : "umemTellEndNo",
         fieldName : "umemTellEndNo",
         visible : false
    }, {
         name : "telRgnNo",
         fieldName : "telRgnNo",
         visible : false
    }, {
         name : "telTxnoNo",
         fieldName : "telTxnoNo",
         visible : false
    }, {
         name : "telEndNo",
         fieldName : "telEndNo",
         visible : false
    }, {
         name : "ordTel",
         fieldName : "ordTel",
         header : {
            text : col.ordTel
         },
         width : 100,
         styleName : "disable-column",
         "displayCallback": function(grid,index,value){
            var mbrNo = grid.getValue(index.itemIndex, "mbrNo");
            var umemTelRgnNo = grid.getValue(index.itemIndex, "umemTelRgnNo");
            var umemTelTxnoNo = grid.getValue(index.itemIndex, "umemTelTxnoNo");
            var umemTelEndNo = grid.getValue(index.itemIndex, "umemTelEndNo");
            var telRgnNo = grid.getValue(index.itemIndex, "telRgnNo");
            var telTxnoNo = grid.getValue(index.itemIndex, "telTxnoNo");
            var telEndNo = grid.getValue(index.itemIndex, "telEndNo");

            var formattingValue = '';
            if (mbrNo == nonMembersNumber) { // 비회원인 경우
                formattingValue += umemTelRgnNo === null || umemTelRgnNo === '' ? "" : umemTelRgnNo + "-" ;
                formattingValue += umemTelTxnoNo === null || umemTelTxnoNo === ''  ? "" : umemTelTxnoNo + "-";
                formattingValue += umemTelEndNo === null  || umemTelEndNo === '' ? "" : umemTelEndNo;
            } else { // 회원인 경우
                formattingValue += telRgnNo === null || telRgnNo === '' ? "" : telRgnNo + "-" ;
                formattingValue += telTxnoNo === null || telTxnoNo === ''  ? "" : telTxnoNo + "-";
                formattingValue += telEndNo === null  || telEndNo === '' ? "" : telEndNo;
            }
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
        checkbox : true,
        crud : false,
        form : "individualSendInstructGridForm",
        action : _baseUrl + "delivery/individualSendInstruct.getIndividualSendInstructList.do"
    }
};
