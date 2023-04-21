const jobCnctSendMsg = x2coMessage.getMessage( {
	_title : "common.grid.job.cnct.mgmt.title"
	, _cnctPrgsStatNm : "common.grid.job.cnct.mgmt.cnctPrgsStatNm"
	, _recvmn : "common.grid.job.cnct.mgmt.recvmn"
	, _recvmnDept : "common.grid.job.cnct.mgmt.recvmnDept"
	, _emergYn : "common.grid.job.cnct.mgmt.emergYn"
	, _sendDtm : "common.grid.job.cnct.mgmt.sendDtm"
	, _ansDtm : "common.grid.job.cnct.mgmt.ansDtm"
});

const jobCnctSendValidMsg = x2coMessage.getMessage( {
	_dtmEmpty : "common.alert.job.cnct.mgmt.dtm.empty"
	,_titleLimitLength : "common.alert.job.cnct.mgmt.title.byteLimit"
});

$.namespace("jobCnctSendGrid.settings")
jobCnctSendGrid.settings = {
    fields: [
        {       fieldName: "jobCnctNo"
        },{     fieldName: "recvmnId"
        },{     fieldName: "title"
        },{     fieldName: "cnctPrgsStatNm"
        },{     fieldName: "recvmn"
        },{     fieldName: "recvmnDept"
        },{     fieldName: "emergYn"
        },{     fieldName: "sendDtm"
        },{     fieldName: "ansDtm"
        }
    ],
    columns: [{
            fieldName: "jobCnctNo",
            header: {
                text: "jobCnctNo"
            },
            width: 100,
            editable: false,
            visible: false
        }
        ,{
            fieldName: "recvmnId",
            header: {
                text: "recvmnId"
            },
            width: 100,
            editable: false,
            visible: false
        }
        ,{
            fieldName: "title",
            header: {
                text: jobCnctSendMsg._title
            },
            width: 180,
            editable : false
        }
        ,{
            fieldName: "cnctPrgsStatNm",
            header: {
                text: jobCnctSendMsg._cnctPrgsStatNm
            },
            width: 80,
            editable : false
        }
        ,{
            fieldName: "recvmn",
            header: {
                text: jobCnctSendMsg._recvmn
            },
            width: 100,
            editable : false
        }
        ,{
            fieldName: "recvmnDept",
            header: {
                text: jobCnctSendMsg._recvmnDept
            },
            width: 100,
            editable : false
        }
        ,{
            fieldName: "emergYn",
            header: {
                text: jobCnctSendMsg._emergYn
            },
            width: 80,
            editable : false
        }
        ,{
            fieldName: "sendDtm",
            header: {
                text: jobCnctSendMsg._sendDtm
            },
            width: 150,
            editable : false
        }
        ,{
            fieldName: "ansDtm",
            header: {
                text: jobCnctSendMsg._ansDtm
            },
            width: 150,
            editable : false
        }
    ],
    validations: [{}],
    props: {
        // rows: _defaultPage,
        width: "100%",
        fitStyle : "none",
         height : "200px", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        //autoFitHeight: true,
        crud: false,
        sumRowVisible: false,
        paging: true,
        form: "jobCnctSendForm",
        action : _baseUrl + "popup/JobContact.getJobContactList.do"
    }
}