const recvmnMsg = x2coMessage.getMessage({
	_userId : "receiveGroupMgmt.grid.header.label.userId"
	, _userNm : "receiveGroupMgmt.grid.header.label.userNm"
	, _deptNm : "receiveGroupMgmt.grid.header.label.deptNm"
	, _jobGrpNm : "receiveGroupMgmt.grid.header.label.jobGrpNm"
	, _sysModId : "adminCommon.label.sys.mod.id"
	, _sysModDtm : "adminCommon.label.sys.mod.date"
});

const recvmnValidMsg = x2coMessage.getMessage( {
    _recvGrpUnSelectedMessage : "receiveGroupMgmt.message.recv.grp.mgmt.recvmn.grp.unselected"
    , _recvmnUserDuplicateMsg : "receiveGroupMgmt.message.recv.grp.mgmt.recvmn.user.duplicate"
	, _rowChkMsg : "adminCommon.alert.no.selected.item.for.delete"
});

const _mnDefaultPage = 0;

$.namespace("recvmnGrid.settings");
recvmnGrid.settings = {
	fields: [{
		fieldName: "recvGrpNo"
	}, {
		fieldName: "userId"
	}, {
		fieldName: "userNm"
	}, {
		fieldName: "deptNm"
	}, {
		fieldName: "jobGrpNm"
	}, {
		fieldName: "sysModId"
	},{
		fieldName: "sysModDtm"
	}],
	 columns : [ {
        name : "recvGrpNo",
        fieldName : "recvGrpNo",
        header : {
            styles: {"background": "linear,#33ffff00,#ffffd500,90"},
            text : recvmnMsg._userId
        },
        width : 100,
        editable : false,
		visible : false
    }, {
        name : "userId",
        fieldName : "userId",
        header : {
            styles: {"background": "linear,#33ffff00,#ffffd500,90"},
            text : recvmnMsg._userId
        },
        width : 100,
        editable : false,
		visible : true
    }, {
        name : "userNm",
        fieldName : "userNm",
        header : {
            text : recvmnMsg._userNm
        },
        width : 100,
        editable : false,
        visible : true
    }, {
        name : "deptNm",
        fieldName : "deptNm",
        header : {
            text : recvmnMsg._deptNm
        },
        width : 150,
        editable : false,
        visible : true
    }, {
        name : "jobGrpNm",
        fieldName : "jobGrpNm",
        header : {
            text : recvmnMsg._jobGrpNm
        },
        width : 150,
        editable : false
     },{
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : recvmnMsg._sysModId
        },
        width : 80,
        editable : false,
        styleName: 'disable-column',
        styles : {
            textAlignment : "center"
        }
    }, {
        name : "sysModDtm",
        fieldName : "sysModDtm",
        header : {
            text : recvmnMsg._sysModDtm
        },
        width : 150,
        editable : false,
        styleName: 'disable-column',
        styles : {
            textAlignment : "center"
        }
    }],
	props: {
		width: "100%",
		crud: true,
        checkbox: true,
        autoFitHeight : true,
        sumRowVisible : false,
        paging: true,
		fitStyle : "evenFill",      //evenFill : 채우기
		form: "recvmnGridForm",
		action: "/system/receiveGroupMgmt.getReceiveManagerList.do",
		saveAction: "/system/receiveGroupMgmt.saveReceiveManager.do"
	}
};