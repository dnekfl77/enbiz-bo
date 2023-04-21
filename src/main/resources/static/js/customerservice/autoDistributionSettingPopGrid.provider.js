var col = x2coMessage.getMessage( {
    aempId :  "csAllocationMgmt.autoDtSettingPop.grid.aempId",
    autoDivGbCd :  "csAllocationMgmt.autoDtSettingPop.grid.autoDivGbCd",
    autoDivGbNm :  "csAllocationMgmt.autoDtSettingPop.grid.autoDivGbNm",
    autoDivDtlNo :  "csAllocationMgmt.autoDtSettingPop.grid.autoDivDtlNo",
    autoDivDtlNm :  "csAllocationMgmt.autoDtSettingPop.grid.autoDivDtlNm",
    dayclQuotQty :  "csAllocationMgmt.autoDtSettingPop.grid.dayclMaxQuotQty",
    state :  "csAllocationMgmt.autoDtSettingPop.grid.state"
});

$.namespace("autoDistributionSettingPopGrid.settings");
autoDistributionSettingPopGrid.settings = {
    fields:[
          { fieldName : "autoDivNo" }
        , { fieldName : "aempId" }
        , { fieldName : "aempNm" }
        , { fieldName : "autoDivGbCd" }
        , { fieldName : "autoDivDtlNo" }
        , { fieldName : "dayclQuotQty" , dataType:"number" }
        , { fieldName : "state" }
        , { fieldName : "autoDivPsbYn" }
    ],
    columns:[{
        name : "autoDivNo",
        fieldName : "autoDivNo",
        visible: false
    },{
        name : "aempId",
        fieldName : "aempId",
        visible: false
    },{
        name : "aempNm",
        fieldName : "aempNm",
        header : {
            text : col.aempId
        },
    }, {
        name : "autoDivGbCd",
        fieldName : "autoDivGbCd",
        header : {
            text : col.autoDivGbNm + "*"
        },
        width : 100,
        lookupDisplay:true,
        values: _autoDivGbValues,
        labels: _autoDivGblabels,
        editor : {
            type : 'dropdown',
            textReadOnly: true,
        },
        styleCallback: function(grid, dataCell){
            var ret = {}
            var state = grid.getValue(dataCell.index.itemIndex, "state");
            if(state !== undefined){
                ret.readOnly = 'true';
                ret.styleName = 'disable-column';
            }
            return ret;
        }
    }, {
        name : "autoDivDtlNo",
        fieldName : "autoDivDtlNo",
        header : {
            text : col.autoDivDtlNm
        },
        width : 100,
        lookupDisplay:true,
        lookupSourceId: "autoDivDtlNo",
        lookupKeyFields: ["autoDivGbCd","autoDivDtlNo"],
        editor : {
            type : 'dropdown',
            textReadOnly: true,
        },
        styleCallback: function(grid, dataCell){
            var ret = {}
            var state = grid.getValue(dataCell.index.itemIndex, "state");
            if(state !== undefined){
                ret.readOnly = 'true';
                ret.styleName = 'disable-column';
            }
            return ret;
        }
    }, {
        name : "dayclQuotQty",
        fieldName : "dayclQuotQty",
        header : {
            text : col.dayclQuotQty + "*"
        },
        numberFormat: "#0",
        editor : {
            type: "number"
            , integerOnly: true // 정수값만 허용
            , maxLength: 5
        }
        ,editable: true
    }, {
        name : "state",
        fieldName : "state",
        header : {
            text : col.state
        },
        editable: false,
    },{
        name : "autoDivPsbYn",
        fieldName : "autoDivPsbYn",
        visible: false
    }],
    validations : [],
    props : {
        width: "100%",
        paging : true,
        autoFitHeight : true,
        checkbox: true,
        crud : true,
        sumRowVisible : false,
        form: "autoDistributionSettingPopForm",
        action : "/customerservice/csAllocationMgmt.getAutoDistributionManager.do",
        saveAction:  "/customerservice/csAllocationMgmt.saveAutoDistributionManager.do"
    }
};
