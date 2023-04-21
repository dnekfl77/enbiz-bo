const recvGrpMsg = x2coMessage.getMessage({
	_recvGrpNo : "receiveGroupMgmt.grid.header.label.recvGrpNo",
	_recvGrpNm : "receiveGroupMgmt.grid.header.label.recvGrpNm",
	_pblYn : "receiveGroupMgmt.grid.header.label.pblYn",
	_useYn : "adminCommon.use.yn",
	_sysModId : "adminCommon.label.sys.mod.id",
	_sysModDtm : "adminCommon.label.sys.mod.date"
});

const recvGrpValidMsg = x2coMessage.getMessage( {
    _recvGrpNmEmtMsg : "receiveGroupMgmt.message.recv.grp.mgmt.recv.grp.nm.empty",
    _pblYnEmtMsg : "receiveGroupMgmt.message.recv.grp.mgmt.recv.pbl.yn.empty",
    _recvGrpNmDuplicateMsg : "receiveGroupMgmt.message.recv.grp.mgmt.recv.grp.nm.duplicate",
	_rowChkMsg : "adminCommon.alert.no.selected.item.for.delete"
});

const _defaultPage = 0;

$.namespace("recvGrpGrid.settings");
recvGrpGrid.settings = {
	fields: [{
		fieldName: "recvGrpNo"
	}, {
		fieldName: "recvGrpNm"
	}, {
		fieldName: "pblYn"
	}, {
		fieldName: "useYn"
	}, {
		fieldName: "sysModId"
	},{
		fieldName: "sysModDtm"
	}],
	 columns : [ {
        name : "recvGrpNo",
        fieldName : "recvGrpNo",
        header : {
            styles: {"background": "linear,#33ffff00,#ffffd500,90"}, text : recvGrpMsg._recvGrpNo
        },
        styleName: 'disable-column',
        width : 100,
        editable : false,
		visible : true
    }, {
        name : "recvGrpNm",
        fieldName : "recvGrpNm",
        header : {
            text : recvGrpMsg._recvGrpNm+"*"
        },
        styleName: "left-column",
        width : 200,
        editable : true,
        editor :{
            maxLength: 60
        }
    }, {
        name : "pblYn",
        fieldName : "pblYn",
        header : {
            text : recvGrpMsg._pblYn+"*"
        },
        width : 80,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N",
            textReadOnly:true
        },
        editable : false
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : recvGrpMsg._useYn+"*"
        },
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N",
            textReadOnly:true
        },
        width : 80,
        editable : false
     },{
        name : "sysModId",
        fieldName : "sysModId",
        header : {
            text : recvGrpMsg._sysModId
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
            text : recvGrpMsg._sysModDtm
        },
        width : 150,
        editable : false,
        styleName: 'disable-column',
        styles : {
            textAlignment : "center"
        }
    }],
	validations: [{
		fieldName: "recvGrpNm",
		criteria: "$.trim(value) === ''",
		error: {
			level: "error",
			message: recvGrpValidMsg._recvGrpNmEmtMsg
		}
	},{
		fieldName: "pblYn",
		criteria: "$.trim(value) === ''",
		error: {
			level: "error",
			message: recvGrpValidMsg._pblYnEmtMsg
		}
	}
	],
	props: {
		width: "100%",
		crud: true,
        checkbox: true,
        autoFitHeight : true,
        sumRowVisible : false,
        paging: true,
		fitStyle : "evenFill",      //evenFill : 채우기
		form: "recvGrpGridForm",
		action: "/system/receiveGroupMgmt.getReceiveGroupList.do",
		saveAction: "/system/receiveGroupMgmt.saveReceiveGroup.do"
	}
};