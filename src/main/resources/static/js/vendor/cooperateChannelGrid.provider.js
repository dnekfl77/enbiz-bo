const cooperateChannelGridHeaderMessage = {
    entrNo      : 'vendorMgmt.cooperateChannelGrid.header.entrNo'
    ,entrNm     : 'vendorMgmt.cooperateChannelGrid.header.entrNm'
    ,trdStatNm  : 'vendorMgmt.cooperateChannelGrid.header.trdStatNm'
};
const cooperateChannelGridMessage = x2coMessage.getMessage(cooperateChannelGridHeaderMessage);

$.namespace("cooperateChannelGrid.settings");
cooperateChannelGrid.settings = {
    fields: [
        {
            fieldName: "entrNo"
        }
        ,{
            fieldName: "entrNm"
        }
        ,{
            fieldName: "trdStatNm"
        }
    ],
    columns: [
        {
            name: "entrNo"
            ,fieldName: "entrNo"
            ,editable : false
            ,width: '80'
            ,header: {
                text : cooperateChannelGridMessage.entrNo
            }
        }
        ,{
            name: "entrNm"
            ,fieldName: "entrNm"
            ,editable : false
            ,width: '180'
            ,styleName: 'left-column'
            ,header: {
                text: cooperateChannelGridMessage.entrNm
            }
        }
        ,{
            name: "trdStatNm"
            ,fieldName: "trdStatNm"
            ,editable : false
            ,width: '80'
            ,header: {
                text: cooperateChannelGridMessage.trdStatNm
            }
        }
    ]
    ,props : {
        width : "100%"
        // height : "500px", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        ,autoFitHeight : true
        ,sumRowVisible : false
        // ,fitStyle : 'evenFill'
        ,checkbox : false
        ,crud : false
        ,form : "cooperateChannelGridSearchForm"
        ,action : _baseUrl + "vendor/cooperateChannelListView.do"
        // ,saveAction : _baseUrl + "vendor/saveCooperate.do"
    }
}