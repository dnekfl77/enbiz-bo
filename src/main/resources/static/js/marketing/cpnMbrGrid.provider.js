var col = x2coMessage.getMessage( {
    cpnIsuNo   : "couponMgmt.grid.field.issuedNo",             // 쿠폰발급번호
    loginId    : "couponMgmt.grid.field.loginMbrId",              // 로그인ID (회원ID)
    mbrNo      : "couponMgmt.grid.field.mbrNo",                // 회원번호
    mbrNm      : "couponMgmt.grid.field.mbrNm",                // 회원이름
    cpnNo      : "couponMgmt.grid.field.couponNo", // 쿠폰번호
    mbrGradeCd : "couponMgmt.grid.field.mbrGradeCd", // 회원등급코드
    mbrGradeNm : "couponMgmt.grid.field.mbrGradeNm", // 회원등급
    useYn      : "adminCommon.use.yn",                      //사용여부
    valiStrtDtm: "couponMgmt.grid.field.valiStrtDtm",                //유효시작일시
    valiEndDtm : "couponMgmt.grid.field.valiEndDtm"                  //유효종료일시
});

$.namespace("cpnMbrGrid.settings");
cpnMbrGrid.settings = {
    fields:[{
        fieldName : "cpnIsuNo"
    },{
        fieldName : "loginId"
    },{
        fieldName : "mbrNo"
    },{
        fieldName : "mbrNm"
    },{
        fieldName : "cpnNo"
    },{
        fieldName : "mbrGradeCd"
    },{
        fieldName : "mbrGradeNm"
    },{
        fieldName : "useYn"
    },{
        fieldName : "valiStrtDtm"
    }, {
        fieldName: "valiEndDtm"
    }],
    columns:[{
        name : "cpnIsuNo",
        fieldName : "cpnIsuNo",
        header : {
            text : col.cpnIsuNo
        },
        width : 90,
        editable : false
    }
    , {
        name : "loginId",
        fieldName : "loginId",
        header : {
            text : col.loginId
        },
        width : 150,
        editable : false
    }, {
        name : "mbrNo",
        fieldName : "mbrNo",
        header : {
            text : col.mbrNo
        },
        width : 80,
        visible: false,
        editable : false
    }, {
        name : "mbrNm",
        fieldName : "mbrNm",
        header : {
            text : col.mbrNm
        },
        width : 110,
        editable : false
    }, {
        name : "cpnNo",
        fieldName : "cpnNo",
        header : {
            text : col.cpnNo
        },
        width : 100,
        editable : false,
        visible: false
    }, {
        name : "mbrGradeCd",
        fieldName : "mbrGradeCd",
        header : {
            text : col.mbrGradeCd
        },
        visible: false,
        editable : false,
        width : 100
    }, {
        name : "mbrGradeNm",
        fieldName : "mbrGradeNm",
        header : {
            text : col.mbrGradeNm
        },
        width: 110,
        editable : false
    }, {
        name : "useYn",
        fieldName : "useYn",
        header : {
            text : col.useYn
        },
        width : 110,
        editable : false,
        "displayCallback": function(grid,index,value){
            var formattingValue = '';
            if(value==='Y'){
                formattingValue = '사용';
            }else{
                formattingValue = '사용안함';
            }
            return formattingValue;
        }
    }, {
        name : "valiStrtDtm",
        fieldName : "valiStrtDtm",
        header : {
            text : col.valiStrtDtm
        },
        width : 130,
        editable : false
    }, {
        name : "valiEndDtm",
        fieldName : "valiEndDtm",
        header : {
            text : col.valiEndDtm
        },
        width : 130,
        editable : false
    }
    ],
    validations : [
        // { fieldName : "bwNm", criteria : "value === undefined || value.trim() === ''"  , error : { level : "error", message : _bwNmMessage } }
    ],
    props : {
        paging : true,
        width : "100%",
        height : "300",
        sumRowVisible : false,
        autoFitHeight : true,
        fitStyle : "evenFill",      //evenFill : 채우기
        checkbox : true,
        crud : true,
        form : "cpnMbrGridForm",
        action : _baseUrl + "marketing/couponMgmt.getCouponIssuedMemberList.do",
        saveAction : _baseUrl + "marketing/couponMgmt.saveCouponIssuedMember.do"
    }
};
