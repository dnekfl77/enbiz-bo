const customerTermsAgreeGridHeaderMessage = {
    siteNm          : 'customerMgmt.customerDetailAndOthersPopup.termsInfo.grid.siteNm'
    ,smsRecvAgrYn    : 'customerMgmt.customerDetailAndOthersPopup.termsInfo.grid.smsRecvAgrYn'
    ,emailRecvAgrYn  : 'customerMgmt.customerDetailAndOthersPopup.termsInfo.grid.emailRecvAgrYn'
    ,appPushAgrYn    : 'customerMgmt.customerDetailAndOthersPopup.termsInfo.grid.appPushAgrYn'
    ,autoLoginAgrYn  : 'customerMgmt.customerDetailAndOthersPopup.termsInfo.grid.autoLoginAgrYn'
    ,moblRectAgrYn   : 'customerMgmt.customerDetailAndOthersPopup.termsInfo.grid.moblRectAgrYn'
};
const customerTermsAgreeGridMessage = x2coMessage.getMessage(customerTermsAgreeGridHeaderMessage);

$.namespace('customerTermsAgreeGrid.settings');
customerTermsAgreeGrid.settings = {
    fields: [
        {fieldName: 'mbrNo'}
        ,{fieldName: 'siteNo'}
        ,{fieldName: 'siteNm'}
        ,{fieldName: 'smsRecvAgrYn'}
        ,{fieldName: 'emailRecvAgrYn'}
        ,{fieldName: 'appPushAgrYn'}
        ,{fieldName: 'autoLoginAgrYn'}
        ,{fieldName: 'moblRectAgrYn'}
    ],
    columns: [
        {
            name: "mbrNo"
            ,fieldName: "mbrNo"
            ,width: '1'
            ,visible: false
        }
        ,{
            name: "siteNo"
            ,fieldName: "siteNo"
            ,width: '1'
            ,visible: false
        }
        ,{
            name: 'siteNm'
            ,fieldName: 'siteNm'
            ,width: '250'
            ,header: {
                text : customerTermsAgreeGridMessage.siteNm
            }
            ,editable : false
            ,styleName : "column-underline-c"
        }
        ,{
            name: 'smsRecvAgrYn'
            ,fieldName: 'smsRecvAgrYn'
            ,width: '90'
            ,header: {
                text : customerTermsAgreeGridMessage.smsRecvAgrYn
            }
            ,editable : false
        }
        ,{
            name: 'emailRecvAgrYn'
            ,fieldName: 'emailRecvAgrYn'
            ,width: '100'
            ,header: {
                text: customerTermsAgreeGridMessage.emailRecvAgrYn
            }
            ,editable : false
        }
        ,{
            name: 'appPushAgrYn'
            ,fieldName: 'appPushAgrYn'
            ,width: '100'
            ,header: {
                text: customerTermsAgreeGridMessage.appPushAgrYn
            }
            ,editable : false
        }
        ,{
            name: 'autoLoginAgrYn'
            ,fieldName: 'autoLoginAgrYn'
            ,width: '100'
            ,header: {
                text: customerTermsAgreeGridMessage.autoLoginAgrYn
            }
            ,editable : false
        }
        ,{
            name: 'moblRectAgrYn'
            ,fieldName: 'moblRectAgrYn'
            ,width: '100'
            ,header: {
                text: customerTermsAgreeGridMessage.moblRectAgrYn
            }
            ,editable : false
        }
    ]
    ,props : {
        width : '100%'
        ,height : '150' // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        ,autoFitHeight : false
        ,sumRowVisible : false
        ,fitStyle : 'evenFill'
        ,checkbox : false
        ,crud : false
        ,paging : false
        ,form : 'customerTermsAgreeGridForm'
        ,action : _baseUrl + 'vendor/getCustomerTermsAgree.do'
    }
}