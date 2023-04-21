var col = x2coMessage.getMessage( {
    cpnsTypNm     :  "rewardTypeMgmt.grid.label.cpnsTypNm",
    cpnsSubCd     :  "rewardTypeMgmt.grid.label.cpnsSubCd",
    cpnsStdCd     :  "rewardTypeMgmt.grid.label.cpnsStdCd",
    cpnsStdRate   :  "rewardTypeMgmt.grid.label.cpnsStdRate",
    maxPayLim     :  "rewardTypeMgmt.grid.label.maxPayLim",
    useYn         :  "rewardTypeMgmt.grid.label.useYn",
    sortSeq       :  "rewardTypeMgmt.grid.label.sortSeq",
    cpnsStdDesc   :  "rewardTypeMgmt.grid.label.cpnsStdDesc",
    sysModId      :  "rewardTypeMgmt.grid.label.sysModId",
    sysModDtm     :  "rewardTypeMgmt.grid.label.sysModDtm"
});

$.namespace("rewardTypeListGrid.settings");
rewardTypeListGrid.settings = {
    fields : [ { fieldName : "cpnsTypNo" }
            , { fieldName : "level" }
            , { fieldName : "cpnsTypNm" }
            , { fieldName : "cpnsSubCd" }
            , { fieldName : "cpnsStdCd" }
            , { fieldName : "cpnsStdRate" }
            , { fieldName : "maxPayLim", dataType: "number" }
            , { fieldName : "useYn" }
            , { fieldName : "sortSeq", dataType: "number" }
            , { fieldName : "cpnsStdDesc" }
            , { fieldName : "cpnsStdDescYn" }
            , { fieldName : "uprCpnsTypCd" }
            , { fieldName : "sysModId" }
            , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "cpnsTypNo",
        fieldName : "cpnsTypNo",
        visible : false
    }, {
        name : "level",
        fieldName : "level",
        visible : false
    }, {
        name : "cpnsTypNm",
        fieldName : "cpnsTypNm",
        header : {
            text : col.cpnsTypNm + " *"
        },
        width : 120,
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
        name : "cpnsSubCd",
        fieldName : "cpnsSubCd",
        header : {
            text : col.cpnsSubCd + " *"
        },
        width : 80,
        values : cpnsSubCdValues,
        labels : cpnsSubCdLabels,
        editor : {
            type : "list",
            textReadOnly:true
       },
       lookupDisplay : true,
       styleCallback: function(grid, dataCell){
           var ret = {};
           var level = grid.getValue(dataCell.index.itemIndex, "level");
           if(level == 2){
              ret.editable = true;
           } else {
              ret.editable = false;
              ret.styleName = "disable-column";
           }
           return ret;
       }
    },  {
        name : "cpnsStdCd",
        fieldName : "cpnsStdCd",
        header : {
            text : col.cpnsStdCd + " *"
        },
        width : 80,
        values : cpnsStdCdValues,
        labels : cpnsStdCdLabels,
        editor : {
            type : "list",
            textReadOnly : true
       },
       lookupDisplay : true,
       styleCallback: function(grid, dataCell){
           var ret = {};
           var level = grid.getValue(dataCell.index.itemIndex, "level");
           if(level == 2){
              ret.editable = true;
           } else {
              ret.editable = false;
              ret.styleName = "disable-column";
           }
           return ret;
       }
    }, {
        name : "cpnsStdRate",
        fieldName : "cpnsStdRate",
        header : {
            text : col.cpnsStdRate + " *"
        },
        width : 100,
        editor :{
            maxLength: 100
        },
        styleCallback: function(grid, dataCell){
            var ret = {};
            var level = grid.getValue(dataCell.index.itemIndex, "level");
            if(level == 2){
               ret.editable = true;
            } else {
               ret.editable = false;
               ret.styleName = "disable-column";
            }
            return ret;
        }
    }, {
        name : "maxPayLim",
        fieldName: "maxPayLim",
        header: {
            text: col.maxPayLim + " *"
        },
        editor :{
            maxLength: 10
        },
        width: 100,
        numberFormat: "#,##0",
        styleCallback: function(grid, dataCell){
            var ret = {};
            var level = grid.getValue(dataCell.index.itemIndex, "level");
            if(level == 2){
               ret.editable = true;
            } else {
               ret.editable = false;
               ret.styleName = "disable-column";
            }
            return ret;
        }
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
        name : "sortSeq",
        fieldName: "sortSeq",
        header: {
            text: col.sortSeq + " *"
        },
        editor :{
            maxLength: 5
        },
        width: 80,
        numberFormat: "#,##0",
        editable : true
    }, {
        name : "cpnsStdDesc",
        fieldName : "cpnsStdDesc",
        visible : false
    }, {
        name : "cpnsStdDescYn",
        fieldName : "cpnsStdDescYn",
        header : {
            text : col.cpnsStdDesc
        },
        width : 80,
        editable : false
    }, {
        name : "uprCpnsTypCd",
        fieldName : "uprCpnsTypCd",
        visible : false
    },{
        name : "sysModId",
        fieldName: "sysModId",
        header: {
            text: col.sysModId
        },
        width: 150,
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
        form : 'rewardTypeGridForm',
        autoFitHeight : true,
        crud: true,
        checkbox: true,
        sumRowVisible : false,
        paging: false,
        action: "/customerservice/rewardTypeMgmt.getLowerRewardTypeList.do",
        saveAction: "/customerservice/rewardTypeMgmt.saveRewardTypeList.do"
    }
};