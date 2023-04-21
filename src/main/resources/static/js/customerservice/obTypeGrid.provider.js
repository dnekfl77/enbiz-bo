var col = x2coMessage.getMessage( {
    obTypNo     :  "obTypeMgmt.grid.label.obTypNo",
    obTypNm     :  "obTypeMgmt.grid.label.obTypNm",
    obTypDesc   :  "obTypeMgmt.grid.label.obTypDesc",
    cnslTypNm   :  "obTypeMgmt.grid.label.cnslTypNm",
    useYn       :  "obTypeMgmt.grid.label.useYn",
    sysModId    :  "obTypeMgmt.grid.label.sysModId",
    sysModDtm   :  "obTypeMgmt.grid.label.sysModDtm"
});

$.namespace("obTypeGrid.settings");
obTypeGrid.settings = {
    fields : [ { fieldName : "obTypNo" }
            , { fieldName : "obTypNm" }
            , { fieldName : "obTypDesc" }
            , { fieldName : "cnslTypNo" }
            , { fieldName : "cnslTypNm" }
            , { fieldName : "useYn" }
            , { fieldName : "sysModId" }
            , { fieldName : "sysModDtm" }],
    columns : [ {
        name : "obTypNo",
        fieldName : "obTypNo",
        header : {
            text : col.obTypNo
        },
        width : 100,
        editor :{
            maxLength: 15
        },
        editable : false,
        styleName : "disable-column"
    }, {
        name : "obTypNm",
        fieldName : "obTypNm",
        header : {
            text : col.obTypNm + " *"
        },
        width : 150,
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
        name : "obTypDesc",
        fieldName : "obTypDesc",
        header : {
            text : col.obTypDesc
        },
        width : 200,
        editor :{
            maxLength: 200
        },
        editable : true,
        styleName : "left-column"
    }, {
        name : "cnslTypNo",
        fieldName : "cnslTypNo",
        visible : false
    }, {
        name : "cnslTypNm",
        fieldName : "cnslTypNm",
        header : {
            text : col.cnslTypNm + " *"
        },
        width : 250,
        button : 'action',
        buttonVisibility: 'always',
        editable : false,
        buttonVisibleCallback : function(grid, index) {
            if( grid.getValue(index.itemIndex, "obTypNo") !== undefined ){
                return false;
            } else {
                return true;
            }
        },
        styleCallback : function(grid, dataCell){
            var ret = {};
            if(dataCell.item.rowState == 'created'){
                ret.styleName = "left-column";
            } else {
                ret.styleName = "left-column disable-column";
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
        name : "sysModId",
        fieldName: "sysModId",
        header: {
            text: col.sysModId
        },
        width: 80,
        styleName: 'disable-column',
        editable : false
    }, {
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
        form : 'obTypeGridForm',
        autoFitHeight : true,
        crud: true,
        checkbox: true,
        sumRowVisible : false,
        paging: true,
        action: "/customerservice/obTypeMgmt.getObTypeList.do",
        saveAction: "/customerservice/obTypeMgmt.saveObTypeList.do"
    }
};