const cooperateChannelDetailGridHeaderMessage = {
    chlNo       : 'vendorMgmt.cooperateChannelDetailGrid.header.chlNo'
    ,chlDtlNo   : 'vendorMgmt.cooperateChannelDetailGrid.header.chlDtlNo'
    ,chlDtlNm   : 'vendorMgmt.cooperateChannelDetailGrid.header.chlDtlNm'
    ,chlDtlDesc : 'vendorMgmt.cooperateChannelDetailGrid.header.chlDtlDesc'
    ,useYn      : 'vendorMgmt.cooperateChannelDetailGrid.header.useYn'
    ,sysModId   : 'vendorMgmt.cooperateChannelDetailGrid.header.sysModId'
    ,sysModDtm  : 'vendorMgmt.cooperateChannelDetailGrid.header.sysModDtm'
};
const cooperateChannelDetailGridMessage = x2coMessage.getMessage(cooperateChannelDetailGridHeaderMessage);

$.namespace('cooperateChannelDetailGrid.settings');
cooperateChannelDetailGrid.settings = {
    fields: [
        {fieldName: 'chlNo'}
        ,{fieldName: 'chlDtlNo'}
        ,{fieldName: 'chlDtlNm'}
        ,{fieldName: 'chlDtlDesc'}
        ,{fieldName: 'useYn'}
        ,{fieldName: 'sysModId'}
        ,{fieldName: 'sysModDtm'}
    ],
    columns: [
        {
            name: 'chlNo'
            ,fieldName: 'chlNo'
            ,width: '90'
            ,header: {
                text : cooperateChannelDetailGridMessage.chlNo
            }
            ,editable : false
            ,visible : false
        }
        ,{
            name: 'chlDtlNo'
            ,fieldName: 'chlDtlNo'
            ,width: '90'
            ,header: {
                text : cooperateChannelDetailGridMessage.chlDtlNo
            }
            ,editable : false
        }
        ,{
            name: 'chlDtlNm'
            ,fieldName: 'chlDtlNm'
            ,width: '200'
            ,header: {
                text: cooperateChannelDetailGridMessage.chlDtlNm + '*'
            }
            ,styleName: 'left-column'
            ,editor : {
                maxLength : 100
            }
        }
        ,{
            name: 'chlDtlDesc'
            ,fieldName: 'chlDtlDesc'
            ,width: '200'
            ,header: {
                text: cooperateChannelDetailGridMessage.chlDtlDesc
            }
            ,editor : {
                maxLength : 100
            }
        }
        ,{
            name: 'useYn'
            ,fieldName: 'useYn'
            ,width: '80'
            ,header: {
                text: cooperateChannelDetailGridMessage.useYn
            }
            ,sortable: false     // 정렬 기능 비활성화
            ,lookupDisplay: true // 그리드 표시 방식 ( true : label, false : value)
            ,editable : false
            ,renderer: {
                type: 'check',
                trueValues: 'Y',
                falseValues: 'N'
            }
        }
        ,{
            name: 'sysModId'
            ,fieldName: 'sysModId'
            ,width: '80'
            ,header: {
                text: cooperateChannelDetailGridMessage.sysModId
            }
            ,editable : false
            ,styleName: 'disable-column'
        }
        ,{
            name: 'sysModDtm'
            ,fieldName: 'sysModDtm'
            ,width: '120'
            ,header: {
                text: cooperateChannelDetailGridMessage.sysModDtm
            }
            ,editable : false
            ,styleName: 'disable-column'
        }
    ]
    ,props : {
        width : '100%'
        ,height : '238' // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        ,autoFitHeight : false
        ,sumRowVisible : false
        // ,fitStyle : 'evenFill'
        ,checkbox : true
        ,crud : true
        ,paging : false
        ,form : 'cooperateChannelDetailSearchForm'
        ,action : _baseUrl + 'vendor/getCcChlDtlInfoByChlNo.do'
        ,saveAction : _baseUrl + 'vendor/saveCcChlDtlInfo.do'
    }
}