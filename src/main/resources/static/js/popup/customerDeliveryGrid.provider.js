const customerDeliveryGridHeaderMessage = {
    userSortSeq : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.userSortSeq'
    ,dlvpNm : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.dlvpNm'
    ,rcvmnNm : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.rcvmnNm'
    ,baseDlvpYn : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.baseDlvpYn'
    ,zipNo : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.zipNo'
    ,zipAddr : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.zipAddr'
    ,dtlAddr : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.dtlAddr'
    ,telNo : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.telNo'
    ,cellNo : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.cellNo'
    ,useYn : 'customerMgmt.customerDetailAndOthersPopup.deliveryInfo.grid.useYn'
};
const customerDeliveryGridMessage = x2coMessage.getMessage(customerDeliveryGridHeaderMessage);

var validMsg = x2coMessage.getMessage( {
    notNull : 'customerMgmt.customerDetailAndOthersPopup.grid.msg.notNull'
});

$.namespace("customerDeliveryGrid.settings");
customerDeliveryGrid.settings = {
    fields: [
        {fieldName: "mbrNo"}
        ,{fieldName: "mbrDlvpSeq"}
        ,{fieldName: "userSortSeq", dataType: 'number'}
        ,{fieldName: "dlvpNm"}
        ,{fieldName: "rcvmnNm"}
        ,{fieldName: "baseDlvpYn"}
        ,{fieldName: "zipNoSeq"}
        ,{fieldName: "zipNo"}
        ,{fieldName: "zipAddr"}
        ,{fieldName: "dtlAddr"}
        ,{fieldName: "telNo"}
        ,{fieldName: "telRgnNo"}
        ,{fieldName: "telTxnoNo"}
        ,{fieldName: "telEndNo"}
        ,{fieldName: "cellNo"}
        ,{fieldName: "cellSctNo"}
        ,{fieldName: "cellTxnoNo"}
        ,{fieldName: "cellEndNo"}
        ,{fieldName: "useYn"}
    ],
    columns: [
        {
            name: "mbrNo"
            ,fieldName: "mbrNo"
            ,width: '1'
            ,visible: false
        }
        ,{
            name: "mbrDlvpSeq"
            ,fieldName: "mbrDlvpSeq"
            ,width: '1'
            ,visible: false
        }
        ,{
            name: "userSortSeq"
            ,fieldName: "userSortSeq"
            ,width: '80'
            ,type: "data"
            ,numberFormat: "#,##0"
            ,header: {
                text : customerDeliveryGridMessage.userSortSeq + "*"
            }
        }
        ,{
            name: "dlvpNm"
            ,fieldName: "dlvpNm"
            ,width: '200'
            ,styleName: 'left-column'
            ,header: {
                text: customerDeliveryGridMessage.dlvpNm + "*"
            }
        }
        ,{
            name: "rcvmnNm"
            ,fieldName: "rcvmnNm"
            ,width: '90'
            ,header: {
                text: customerDeliveryGridMessage.rcvmnNm + "*"
            }
        }
        ,{
            name: "baseDlvpYn"
            ,fieldName: "baseDlvpYn"
            ,width: '80'
            ,header: {
                text: customerDeliveryGridMessage.baseDlvpYn + "*"
            }
            ,values : ['Y', 'N']
            ,labels : ['기본배송지', '추가']
            ,lookupDisplay : true
            ,editor : {
                type : "dropdown"
                ,textReadOnly:true
            }
        }
        ,{
            name: 'zipNoSeq'
            ,fieldName: 'zipNoSeq'
            ,visible: false
        }
        ,{
            name: "zipNo"
            ,fieldName: "zipNo"
            ,width: '80'
            ,header: {
                text: customerDeliveryGridMessage.zipNo + "*"
            }
            ,button: 'action'
            ,editable: false
        }
        ,{
            name: "zipAddr"
            ,fieldName: "zipAddr"
            ,width: '100'
            ,header: {
                text: customerDeliveryGridMessage.zipAddr + "*"
            }
            ,editable: false
        }
        ,{
            name: "dtlAddr"
            ,fieldName: "dtlAddr"
            ,width: '150'
            ,header: {
                text: customerDeliveryGridMessage.dtlAddr + "*"
            }
        }
        ,{
            name: "telNo"
            ,fieldName: "telNo"
            ,width: '120'
            ,header: {
                text: customerDeliveryGridMessage.telNo
            }
            ,maxLength: 11
            ,textFormat: '(02|0[3-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4}); \$1-$2-$3'
        }
        ,{name: "telRgnNo",fieldName: "telRgnNo",width: '1',visible: false}
        ,{name: "telTxnoNo",fieldName: "telTxnoNo",width: '1',visible: false}
        ,{name: "telEndNo",fieldName: "telEndNo",width: '1',visible: false}
        ,{
            name: "cellNo"
            ,fieldName: "cellNo"
            ,width: '120'
            ,header: {
                text: customerDeliveryGridMessage.cellNo
            }
            ,maxLength: 11
            ,textFormat: '(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4}); \$1-$2-$3'
        }
        ,{name: "cellSctNo",fieldName: "cellSctNo",width: '1',visible: false}
        ,{name: "cellTxnoNo",fieldName: "cellTxnoNo",width: '1',visible: false}
        ,{name: "cellEndNo",fieldName: "cellEndNo",width: '1',visible: false}
        ,{
            name: "useYn"
            ,fieldName: "useYn"
            ,width: '80'
            ,header: {
                text: customerDeliveryGridMessage.useYn
            }
            ,editable: false
            ,renderer: {
                type: "check"
                ,trueValues: "Y"
                ,falseValues: "N"
            }
        }
    ]
    ,validations: [
        { fieldName:"userSortSeq", criteria:"value === undefined || value === NaN"
            , error: {level:'error', message: validMsg.notNull}
        }
        ,{ fieldName:"dlvpNm", criteria:"value === undefined || value === NaN"
            , error: {level:'error', message: validMsg.notNull}
        }
        ,{ fieldName:"rcvmnNm", criteria:"value === undefined || value === NaN"
            , error: {level:'error', message: validMsg.notNull}
        }
        ,{ fieldName:"baseDlvpYn", criteria:"value === undefined || value === NaN"
            , error: {level:'error', message: validMsg.notNull}
        }
        ,{ fieldName:"useYn", criteria:"value === undefined || value === NaN"
            , error: {level:'error', message: validMsg.notNull}
        }
//        ,{ fieldName:"zipNo", criteria:"value === undefined || value === NaN"
//            , error: {level:'error', message: validMsg.notNull}
//        }
//        ,{ fieldName:"zipAddr", criteria:"value === undefined || value === NaN"
//            , error: {level:'error', message: validMsg.notNull}
//        }
//        ,{ fieldName:"dtlAddr", criteria:"value === undefined || value === NaN"
//            , error: {level:'error', message: validMsg.notNull}
//        }
    ]
    ,props : {
        width: "100%"
        ,height: "200" // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        ,autoFitHeight: false
        ,sumRowVisible: false
        // ,fitStyle: 'evenFill'
        ,checkbox: true
        ,crud: true
        ,form: "customerDeliveryGridForm"
        ,action: _baseUrl + "customer/customerMgmt.getCustomerDelivery.do"
        ,saveAction: _baseUrl + "popup/customerMgmt.saveCustomerDetailAndOthersData.do"
        ,paging: false
    }
}