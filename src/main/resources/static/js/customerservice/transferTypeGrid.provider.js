var col = x2coMessage.getMessage( {
    csMvotTypNo   :  "transferTypeMgmt.grid.label.csMvotTypNo",
    csMvotTypNm   :  "transferTypeMgmt.grid.label.csMvotTypNm",
    csTypDesc     :  "transferTypeMgmt.grid.label.csTypDesc",
    tmplMemo      :  "transferTypeMgmt.grid.label.tmplMemo",
    useYn         :  "transferTypeMgmt.grid.label.useYn",
    sysModId      :  "transferTypeMgmt.grid.label.sysModId",
    sysModDtm     :  "transferTypeMgmt.grid.label.sysModDtm"
});

$.namespace("transferTypeGrid.settings");
transferTypeGrid.settings = {
    fields : [ { fieldName : "csMvotTypNo" }
            , { fieldName : "csMvotTypNm" }
            , { fieldName : "csTypDesc" }
            , { fieldName : "tmplMemo" }
            , { fieldName : "tmplMemoYn" }
            , { fieldName : "useYn" }
            , { fieldName : "sysModId" }
            , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "csMvotTypNo",
        fieldName : "csMvotTypNo",
        header : {
            text : col.csMvotTypNo
        },
        width : 100,
        editor :{
            maxLength: 15
        },
        editable : false,
        styleName : "disable-column"
    }, {
        name : "csMvotTypNm",
        fieldName : "csMvotTypNm",
        header : {
            text : col.csMvotTypNm + " *"
        },
        width : 170,
        editor :{
            maxLength: 100
        },
        styleCallback: function(grid, dataCell){
            var ret = {};
            if(dataCell.item.rowState == 'created'){
                ret.editable = true;
                ret.styleName = "left-column";
            } else {
                ret.editable = false;
                ret.styleName = "left-column disable-column";
            }
            return ret;
        }
    }, {
        name : "csTypDesc",
        fieldName : "csTypDesc",
        header : {
            text : col.csTypDesc
        },
        width : 220,
        editor :{
            maxLength: 200
        },
        editable : true,
        styleName : "left-column"
    }, {
        name : "tmplMemo",
        fieldName : "tmplMemo",
        visible : false
    }, {
        name : "tmplMemoYn",
        fieldName : "tmplMemoYn",
        header : {
            text : col.tmplMemo
        },
        width : 100,
        editable : false
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn + " *"
        },
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        width : 80,
        editable : true
    }, {
        name : "sysModId",
        fieldName: "sysModId",
        header: {
            text: col.sysModId
        },
        width: 100,
        styleName: 'disable-column',
        editable : false
    },{
        name : "sysModDtm",
        fieldName: "sysModDtm",
        header: {
            text: col.sysModDtm
        },
        width: 150,
        styleName: 'disable-column',
        editable : false
    }],
    props: {
        form : 'transferTypeGridForm',
        width: "100%",
        autoFitHeight : true,
        crud: true,
        checkbox: true,
        sumRowVisible : false,
        paging: true,
        action: "/customerservice/transferTypeMgmt.getTransferTypeList.do",
        saveAction: "/customerservice/transferTypeMgmt.saveTransferTypeList.do"
    }
};