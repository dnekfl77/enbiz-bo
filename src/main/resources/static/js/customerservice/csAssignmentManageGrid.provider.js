var col = x2coMessage.getMessage({
    autoDivCd : "csAllocationMgmt.csAssignment.grid1.autoDivCd",
    autoDivGbCd: "csAllocationMgmt.csAssignment.grid1.autoDivGbCd",
    autoDivDtlNo: "csAllocationMgmt.csAssignment.grid1.autoDivDtlNo",
    sameDayAlloStatus: "csAllocationMgmt.csAssignment.grid1.sameDayAlloStatus",
    numOfPeopleHandling: "csAllocationMgmt.csAssignment.grid1.numOfPeopleHandling",
    numOfAllotableCases: "csAllocationMgmt.csAssignment.grid1.numOfAllotableCases",
    allocationStatus: "csAllocationMgmt.csAssignment.grid1.allocationStatus",
    numOfAssignments: "csAllocationMgmt.csAssignment.grid1.numOfAssignments",
    numOfUnassignments: "csAllocationMgmt.csAssignment.grid1.numOfUnassignments",
    processingStatus: "csAllocationMgmt.csAssignment.grid1.processingStatus",
    receipt: "csAllocationMgmt.csAssignment.grid1.receipt",
    inProgress: "csAllocationMgmt.csAssignment.grid1.inProgress",
    complete: "csAllocationMgmt.csAssignment.grid1.complete",
    already : "csAllocationMgmt.csAssignment.grid1.already"
});

$.namespace("csAssignmentManageGrid.settings");
csAssignmentManageGrid.settings = {
    fields: [
        {fieldName: "autoDivGbCd"},
        {fieldName: "autoDivGbNm"},
        {fieldName: "autoDivDtlNo"},
        {fieldName: "autoDivDtlNm"},
        {fieldName: "numOfPeopleHandling" , dataType: "number"},
        {fieldName: "numOfAllotableCases", dataType: "number"},
        {fieldName: "numOfAssignments", dataType: "number"},
        {fieldName: "numOfUnassignments", dataType: "number"},
        {fieldName: "receipt", dataType: "number"},
        {fieldName: "inProgress", dataType: "number"},
        {fieldName: "complete", dataType: "number"},
        {fieldName: "already", dataType: "number"},
    ],
    columns : [{
        name : "autoDivGbCd",
        fieldName : "autoDivGbCd",
        visible:false,
    },{
        name : "autoDivGbNm",
        fieldName : "autoDivGbNm",
        header : {
            text : col.autoDivGbCd
        },
        editable: false,
        footer: {
            styleName: "center"
        },
        width: 150
    },{
        name : "autoDivDtlNo",
        fieldName : "autoDivDtlNo",
        visible: false
    },{
        name : "autoDivDtlNm",
        fieldName : "autoDivDtlNm",
        header : {
            text : col.autoDivDtlNo
        },
        editable: false,
        width: 150
    },{
        name : "numOfPeopleHandling",
        fieldName : "numOfPeopleHandling",
        header : {
            text : col.numOfPeopleHandling
        },
        editable: false,
        numberFormat:"#,##0",
        footer: {
            expression: "sum",
            numberFormat: "#,##0",
            styleName: "right-column"
        },
        styleName: "right-column",
        width: 100
    },{
        name : "numOfAllotableCases",
        fieldName : "numOfAllotableCases",
        header : {
            text : col.numOfAllotableCases
        },
        editable: false,
        numberFormat:"#,##0",
        footer: {
            expression: "sum",
            numberFormat: "#,##0",
            styleName: "right-column"
        },
        styleName: "right-column",
        width: 100
    },{
        name : "numOfAssignments",
        fieldName : "numOfAssignments",
        header : {
            text : col.numOfAssignments
        },
        editable: false,
        numberFormat:"#,##0",
        footer: {
            expression: "sum",
            numberFormat: "#,##0",
            styleName: "right-column"
        },
        styleName: "right-column",
        width: 100
    },{
        name : "numOfUnassignments",
        fieldName : "numOfUnassignments",
        header : {
            text : col.numOfUnassignments
        },
        editable: false,
        numberFormat:"#,##0",
        footer: {
            expression: "sum",
            numberFormat: "#,##0",
            styleName: "right-column"
        },
        styleName: "right-column",
        width: 100
    },{
        name : "receipt",
        fieldName : "receipt",
        header : {
            text : col.receipt
        },
        editable: false,
        numberFormat:"#,##0",
        footer: {
            expression: "sum",
            numberFormat: "#,##0",
            styleName: "right-column"
        },
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
        footer: {
            expression: "sum",
            numberFormat: "#,##0",
            styleName: "right-column"
        },
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
        footer: {
            expression: "sum",
            numberFormat: "#,##0",
            styleName: "right-column"
        },
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
        footer: {
            expression: "sum",
            numberFormat: "#,##0",
            styleName: "right-column"
        },
        styleName: "right-column",
        width: 100
    }],
    validations: [],
    props: {
        form : 'csAssignmentManageForm',
        height : "300px",
        checkbox: false,
        crud: false,
        sumRowVisible : false,
        paging: false,
        popup : false,
        action: "/customerservice/csAllocationMgmt.getCsAllocationMgmt.do"
    }
};