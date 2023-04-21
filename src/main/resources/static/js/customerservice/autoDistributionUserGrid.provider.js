var col = x2coMessage.getMessage( {
    userId :  "csAllocationMgmt.autoDtSettingPop.grid.user.userId", // 사용자 ID
    userNm :  "csAllocationMgmt.autoDtSettingPop.grid.user.userNm", // 사용자 이름
    deptCd :  "csAllocationMgmt.autoDtSettingPop.grid.user.deptCd", // 그룹코드
});

$.namespace("autoDistributionUserGrid.settings");
autoDistributionUserGrid.settings = {
    fields:[
          { fieldName : "userId" }
        , { fieldName : "userNm" }
        , { fieldName : "deptCd" }
    ],
    columns:[{
        name : "userId",
        fieldName : "userId",
        header : {
            text : col.userId
        },
        editable:false
    }, {
        name : "userNm",
        fieldName : "userNm",
        header : {
            text : col.userNm
        },
        editable:false
    }, {
        name : "deptCd",
        fieldName : "deptCd",
        visible: false
    }],
    validations : [],
    props : {
        width: "100%",
        paging : true,
        autoFitHeight : true,
        crud : false,
        checkbox: false,
        sumRowVisible : false,
        form: "autoDistributionUserForm",
        action : _baseUrl + "customerservice/csAllocationMgmt.getCsDeptUserList.do"
    }
};
