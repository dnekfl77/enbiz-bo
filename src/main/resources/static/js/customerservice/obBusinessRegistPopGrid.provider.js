var col = x2coMessage.getMessage({
    mbrNo       : 'csAllocationMgmt.obBusinessRegistPop.grid.mbrNo',
    ordNo       : 'csAllocationMgmt.obBusinessRegistPop.grid.ordNo',
    accpCont    : 'csAllocationMgmt.obBusinessRegistPop.grid.accpCont',
    yn          : 'csAllocationMgmt.obBusinessRegistPop.grid.yn',
    failCont    : 'csAllocationMgmt.obBusinessRegistPop.grid.failCont',
    cnslTypNo   : 'csAllocationMgmt.obBusinessRegistPop.grid.cnslTypNo',
    obTypNo     : 'csAllocationMgmt.obBusinessRegistPop.grid.obTypNo'
});

$.namespace("obBusinessRegistPopGrid.settings");
obBusinessRegistPopGrid.settings = {
    fields : [
          {fieldName : "mbrNo"}
        , {fieldName : "ordNo"}
        , {fieldName : "accpCont"}
        , {fieldName : "yn"}
        , {fieldName : "failCont"}
        , {fieldName : "cnslTypNo"}
        , {fieldName : "obTypNo"}
    ],
    columns : [ {
        name : "mbrNo",
        fieldName : "mbrNo",
        header : {
            text : col.mbrNo
        },
        width : 80,
        editable : false,
    }, {
        name : "ordNo",
        fieldName : "ordNo",
        header : {
            text : col.ordNo
        },
        width : 80,
        editable : false,
    }, {
        name : "accpCont",
        fieldName : "accpCont",
        header : {
            text : col.accpCont
        },
        width : 200,
        editable : false,
    }, {
        name: "yn",
        fieldName: "yn",
        header: {
            text: col.yn
        },
        width : 60,
        editable : false,
    }, {
        name: "failCont",
        fieldName: "failCont",
        header: {
            text: col.failCont
        },
        width : 120,
        editable : false,
        styleName : 'error-column'
    }, {
        name: "cnslTypNo",
        fieldName: "cnslTypNo",
        visible: false
    }, {
        name: "obTypNo",
        fieldName: "obTypNo",
        visible: false
    } ],
    props : {
        paging : false,
        rows : 0,
        width : "100%",
        height : "300",
        autoFitHeight : false,
        sumRowVisible : false,
        form : "obBusinessRegistPopForm",
        fitStyle : "evenFill",
        saveAction : _baseUrl + "customerservice/csAllocationMgmt.saveObCsCounselInfoListExcel.do"
    }
};
