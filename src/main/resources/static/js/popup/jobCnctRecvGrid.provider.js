const jobCnctRecvMsg = x2coMessage.getMessage( {
	_title : "common.grid.job.cnct.mgmt.title"
	, _cnctPrgsStatNm : "common.grid.job.cnct.mgmt.cnctPrgsStatNm"
	, _user : "common.grid.job.cnct.mgmt.user"
	, _userDept : "common.grid.job.cnct.mgmt.userDept"
	, _emergYn : "common.grid.job.cnct.mgmt.emergYn"
	, _recvDtm : "common.grid.job.cnct.mgmt.recvDtm"
	, _ansDtm : "common.grid.job.cnct.mgmt.ansDtm"
});

const jobCnctRecvValidMsg = x2coMessage.getMessage( {
	_dtmEmpty : "common.alert.job.cnct.mgmt.dtm.empty"
	,_titleLimitLength : "common.alert.job.cnct.mgmt.title.byteLimit"
});

$.namespace("jobCnctRecvGrid.settings")
jobCnctRecvGrid.settings = {
    fields: [
        {       fieldName: "jobCnctNo"
        },{     fieldName: "title"
        },{     fieldName: "cnctPrgsStatNm"
        },{     fieldName: "user"
        },{     fieldName: "userDept"
        },{     fieldName: "emergYn"
        },{     fieldName: "recvDtm"
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
            fieldName: "title",
            header: {
                text: jobCnctRecvMsg._title
            },
            width: 180,
            editable : false
        }
        ,{
            fieldName: "cnctPrgsStatNm",
            header: {
                text: jobCnctRecvMsg._cnctPrgsStatNm
            },
            width: 80,
            editable : false
        }
        ,{
            fieldName: "user",
            header: {
                text: jobCnctRecvMsg._user
            },
            width: 100,
            editable : false
        }
        ,{
            fieldName: "userDept",
            header: {
                text: jobCnctRecvMsg._userDept
            },
            width: 100,
            editable : false
        }
        ,{
            fieldName: "emergYn",
            header: {
                text: jobCnctRecvMsg._emergYn
            },
            width: 80,
            editable : false
        }
        ,{
            fieldName: "recvDtm",
            header: {
                text: jobCnctRecvMsg._recvDtm
            },
            width: 150,
            editable : false
        }
        ,{
            fieldName: "ansDtm",
            header: {
                text: jobCnctRecvMsg._ansDtm
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
         height : "300px", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        //autoFitHeight: flase,
        crud: false,
        sumRowVisible: false,
        paging: true,
        form: "jobCnctRecvForm",
        action : _baseUrl + "popup/JobContact.getJobContactList.do"
    }
}