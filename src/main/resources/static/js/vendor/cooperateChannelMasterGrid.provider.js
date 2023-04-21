const cooperateChannelMasterGridHeaderMessage = {
    chlNo      : 'vendorMgmt.cooperateChannelMasterGrid.header.chlNo'
    ,chlNm     : 'vendorMgmt.cooperateChannelMasterGrid.header.chlNm'
    ,siteNo    : 'vendorMgmt.cooperateChannelMasterGrid.header.siteNo'
    ,chlClssCd : 'vendorMgmt.cooperateChannelMasterGrid.header.chlClssCd'
    ,chlTypNm  : 'vendorMgmt.cooperateChannelMasterGrid.header.chlTypNm'
    ,aplyStrDt : 'vendorMgmt.cooperateChannelMasterGrid.header.aplyStrDt'
    ,aplyEndDt : 'vendorMgmt.cooperateChannelMasterGrid.header.aplyEndDt'
    ,chlDesc   : 'vendorMgmt.cooperateChannelMasterGrid.header.chlDesc'
    ,entrNo    : 'vendorMgmt.cooperateChannelMasterGrid.header.entrNo'
};
const cooperateChannelMasterMessage = x2coMessage.getMessage(cooperateChannelMasterGridHeaderMessage);

$.namespace('cooperateChannelMasterGrid.settings');
cooperateChannelMasterGrid.settings = {
    fields: [
        {fieldName: 'chlNo'}
        ,{fieldName: 'chlNm'}
        ,{fieldName: 'siteNo'}
        ,{fieldName: 'chlClssCd'}
        ,{fieldName: 'chlTypCd'}
        ,{fieldName: 'aplyStrDt'}
        ,{fieldName: 'aplyEndDt'}
        ,{fieldName: 'chlDesc'}
        ,{fieldName: 'entrNo'}
    ],
    columns: [
        {
            name: 'chlNo'
            ,fieldName: 'chlNo'
            ,width: '80'
            ,header: {
                text : cooperateChannelMasterMessage.chlNo
            }
            ,editable : false
            ,styleName: 'disable-column'
        }
        ,{
            name: 'chlNm'
            ,fieldName: 'chlNm'
            ,width: '180'
            ,header: {
                text: cooperateChannelMasterMessage.chlNm + '*'
            }
            ,styleName: 'left-column'
            ,editor : {
                maxLength : 100
            }
        }
        ,{
            name: 'siteNo'
            ,fieldName: 'siteNo'
            ,width: '120'
            ,header: {
                text: cooperateChannelMasterMessage.siteNo + '*'
            }
            ,values : Object.keys(_siteNo_select)
            ,labels : com.x2commerce.common.Util.getValues(_siteNo_select)
            ,lookupDisplay : true
            ,editor : {
                type : 'dropdown'
                ,textReadOnly : true
            }
            ,visible : true
        }
        ,{
            name: 'chlClssCd'
            ,fieldName: 'chlClssCd'
            ,width: '80'
            ,header: {
                text: cooperateChannelMasterMessage.chlClssCd + '*'
            }
            ,values : Object.keys(_chlClssCd_select)
            ,labels : com.x2commerce.common.Util.getValues(_chlClssCd_select)
            ,lookupDisplay : true
            ,editor : {
                type : 'dropdown'
                ,textReadOnly : true
            }
            ,visible : true
        }
        ,{
            name: 'chlTypCd'
            ,fieldName: 'chlTypCd'
            ,width: '80'
            ,header: {
                text: cooperateChannelMasterMessage.chlTypNm + '*'
            }
            ,values : Object.keys(_chlTypCd_select)
            ,labels : com.x2commerce.common.Util.getValues(_chlTypCd_select)
            ,lookupDisplay : true
            ,editor : {
                type : 'dropdown'
                ,textReadOnly : true
            }
        }
        ,{
            name: 'aplyStrDt'
            ,fieldName: 'aplyStrDt'
            ,width: '90'
            ,header: { text: cooperateChannelMasterMessage.aplyStrDt + '*' }
            ,editor : {
                type : 'date'
                ,datetimeFormat : 'yyyy-MM-dd'
                ,minDate: new Date('2021-01-01')
                ,maxDate: new Date('2999-12-31')
            }
            ,datetimeFormat: 'yyyy-MM-dd'
        }
        ,{
            name: 'aplyEndDt'
            ,fieldName: 'aplyEndDt'
            ,width: '90'
            ,header: { text: cooperateChannelMasterMessage.aplyEndDt + '*' }
            ,editor : {
                type : 'date'
                ,datetimeFormat : 'yyyy-MM-dd'
                ,minDate: new Date('2021-01-01')
                ,maxDate: new Date('2999-12-31')
            }
            ,datetimeFormat: 'yyyy-MM-dd'
        }
        ,{
            name: 'chlDesc'
            ,fieldName: 'chlDesc'
            ,width: '200'
            ,header: { text: cooperateChannelMasterMessage.chlDesc }
            ,styleName: 'left-column'
            ,editor : {
                maxLength : 100
            }
        }
        ,{
            name: 'entrNo'
            ,fieldName: 'entrNo'
            ,width: '80'
            ,header: { text: cooperateChannelMasterMessage.entrNo }
            ,editable : false
            ,styleName: 'disable-column'
        }
    ]
    ,props : {
        width : '100%'
        ,height : '240' // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        ,autoFitHeight : false
        ,sumRowVisible : false
        // ,fitStyle : 'evenFill'
        ,checkbox : true
        ,crud : true
        ,paging : false
        ,form : 'cooperateChannelMasterSearchForm'
        ,action : _baseUrl + 'vendor/getCcChlBaseByEntrNo.do'
        ,saveAction : _baseUrl + 'vendor/saveCcChlBase.do'
    }
}