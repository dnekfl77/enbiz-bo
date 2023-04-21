var col = x2coMessage.getMessage({
    aempId            : "csAllocationMgmt.csAssignment.grid2.aempId",
    state             : "csAllocationMgmt.csAssignment.grid2.state",
    numOfAssignments  : "csAllocationMgmt.csAssignment.grid2.numOfAssignments",
    numOfUnassignments: "csAllocationMgmt.csAssignment.grid2.numOfUnassignments",
    receipt           : "csAllocationMgmt.csAssignment.grid2.receipt",
    inProgress        : "csAllocationMgmt.csAssignment.grid2.inProgress",
    complete          : "csAllocationMgmt.csAssignment.grid2.complete",
    already           : "csAllocationMgmt.csAssignment.grid2.already"
});

$.namespace("csAssignmentManageDetailGrid.settings");
csAssignmentManageDetailGrid.settings = {
    fields: [
        {fieldName: "autoDivNo"},
        {fieldName: "autoDivGbCd"},
        {fieldName: "autoDivDtlNo"},
        {fieldName: "aempId"},
        {fieldName: "aempNm"},
        {fieldName: "state"},
        {fieldName: "numOfAssignments", dataType: "number"},
        {fieldName: "numOfUnassignments", dataType: "number"},
        {fieldName: "receipt", dataType: "number"},
        {fieldName: "inProgress", dataType: "number"},
        {fieldName: "complete", dataType: "number"},
        {fieldName: "already", dataType: "number"},
    ],
    columns : [{
        name : "autoDivNo",
        fieldName : "autoDivNo",
        visible : false
    },{
        name : "autoDivGbCd",
        fieldName : "autoDivGbCd",
        visible : false
    },{
        name : "autoDivDtlNo",
        fieldName : "autoDivDtlNo",
        visible : false
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
        editable: false,
        width: 150
    },{
        name : "state",
        fieldName : "state",
        header : {
            text : col.state
        },
        editable: false,
        width: 150
    },{
        name : "numOfAssignments",
        fieldName : "numOfAssignments",
        header : {
            text : col.numOfAssignments
        },
        editable: false,
        numberFormat:"#,##0",
        styleName: "right-column",
        width: 100
    },{
        name : "numOfUnassignments",
        fieldName : "numOfUnassignments",
        header : {
            text : col.numOfUnassignments
        },
        editable: false,
        width: 100,
        numberFormat:"#,##0",
        styleName: "right-column"
    },{
        name : "receipt",
        fieldName : "receipt",
        header : {
            text : col.receipt
        },
        editable: false,
        numberFormat:"#,##0",
        styleName: "right-column",
        width: 100
    },{
        name : "inProgress",
        fieldName : "inProgress",
        header : {
            text : col.inProgress
        },
        editable: false,
        numberFormat:"#,##0",
        styleName: "right-column",
        width: 100
    },{
        name : "complete",
        fieldName : "complete",
        header : {
            text : col.complete
        },
        editable: false,
        numberFormat:"#,##0",
        styleName: "right-column",
        width: 100
    },{
        name : "already",
        fieldName : "already",
        header : {
            text : col.already
        },
        editable: false,
        numberFormat:"#,##0",
        styleName: "right-column",
        width: 100
    }],
    validations: [],
    props: {
        form : 'csAssignmentManageForm',
        width: "100%",
        height : "300px",
        checkbox: true,
        crud: false,
        sumRowVisible : false,
        paging: false,
        popup : false,
        action: "/customerservice/csAllocationMgmt.getCsAllocationDetailMgmt.do"
    }
};