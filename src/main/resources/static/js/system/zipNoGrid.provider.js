$.namespace("zipNoGrid.settings");

zipNoGrid.settings = {
    fields: [
        { fieldName: "zipNoSeq"},
        { fieldName: "zipNo" },
        { fieldName: "ctpNm" },
        { fieldName: "sigNm" },
        { fieldName: "hemdNm" },
        { fieldName: "lnbrMnnm" },
        { fieldName: "lnbrSlno" },
        { fieldName: "roadNm" },
        { fieldName: "buldMnnm" },
        { fieldName: "buldSlno" },
        { fieldName: "bdMgtSn"},
        { fieldName: "posBulNm" },
        { fieldName: "buldDtlNm" }
    ],
    columns: [
        {
            name: "zipNo", // 우편번호
            fieldName: "zipNo",
            header: { text: msg._zipNo },
            width : 80
        },
        {
            name: "ctpNm", // 시도명
            fieldName: "ctpNm",
            header: { text: msg._ctpNm },
            width : 120,
            editor :{ maxLength: 10 }
        },
        {
            name: "sigNm", // 시군구명
            fieldName: "sigNm",
            header: { text: msg._sigNm },
            width : 100,
            editor :{ maxLength: 10 }
        },
        {
            name: "hemdNm", // 행정동명
            fieldName: "hemdNm",
            header: { text: msg._hemdNm },
            width : 100,
            editor :{ maxLength: 10 }
        },
        {
            name: "lnbrMnnm", // 지번본번
            fieldName: "lnbrMnnm",
            header: { text: msg._lnbrMnnm },
            width : 70,
            editor :{ maxLength: 4 }
        },
        {
            name: "lnbrSlno", // 지번부번
            fieldName: "lnbrSlno",
            header: { text: msg._lnbrSlno },
            width : 70,
            editor :{ maxLength: 4 }
        },
        {
            name: "roadNm", // 도로명
            fieldName: "roadNm",
            header: { text: msg._roadNm },
            width : 150,
            styleName: "left-column",
            editor :{ maxLength: 20 }
        },
        {
            name: "buldMnnm", // 건물본번
            fieldName: "buldMnnm",
            header: { text: msg._buldMnnm },
            width : 70,
            editor :{ maxLength: 4 }
        },
        {
            name: "buldSlno", // 건물부번
            fieldName: "buldSlno",
            header: { text: msg._buldSlno },
            width : 70,
            editor :{ maxLength: 4 }
        },
        {
            name: "posBulNm", // 건물명
            fieldName: "posBulNm",
            header: { text: msg._posBulNm },
            width : 200,
            styleName: "left-column",
            editor :{ maxLength: 30 }
        },
        {
            name: "buldDtlNm",
            fieldName: "buldDtlNm",
            header: { text: msg._buldDtlNm },
            width : 200,
            styleName: "left-column",
            editor :{ maxLength: 30 }
        }
    ],
    validations: [
        {
            fieldName: "ctpNm",
            criteria : "value === undefined || value.trim() === ''",
            error : {
                level : "error",
                message : msg._emCtpNmMsg
            }
        },
        {
            fieldName: "ctpNm",
            criteria : "value === undefined || value.length > 10",
            error : {
                level : "error",
                message : msg._lnthCtpNmMsg
            }
        },
        {
            fieldName: "sigNm",
            criteria : "value === undefined || value.trim() === ''",
            error : {
                level : "error",
                message : msg._emSigNmMsg
            }
        },
        {
            fieldName: "sigNm",
            criteria : "value === undefined || value.length > 10",
            error : {
                level : "error",
                message : msg._lnthSigNmMsg
            }
        },
        {
            fieldName: "hemdNm",
            criteria : "value === undefined || value.trim() === ''",
            error : {
                level : "error",
                message : msg._emHemdNmMsg
            }
        },
        {
            fieldName: "hemdNm",
            criteria : "value === undefined || value.length > 10",
            error : {
                level : "error",
                message : msg._lnthEmdNmMsg
            }
        },
        {
            fieldName: "lnbrMnnm",
            criteria : "value === undefined || value.length > 4",
            error : {
                level : "error",
                message : msg._lnthLnbrMnnmMsg
            }
        },
        {
            fieldName: "lnbrSlno",
            criteria : "value === undefined || value.length > 4",
            error : {
                level : "error",
                message : msg._lnthLnbrSlnoMsg
            }
        },
        {
            fieldName: "roadNm",
            criteria : "value === undefined || value.trim() === ''",
            error : {
                level : "error",
                message : msg._emRoadNmMsg
            }
        },
        {
            fieldName: "roadNm",
            criteria : "value === undefined || value.length > 20",
            error : {
                level : "error",
                message : msg._lnthRoadNmMsg
            }
        },
        {
            fieldName: "buldMnnm",
            criteria : "value === undefined || value.length > 4",
            error : {
                level: "error",
                message: msg._lnthBuldMnnmMsg
            }
        },
        {
            fieldName: "buldSlno",
            criteria : "value === undefined || value.length > 4",
            error : {
                level : "error",
                message : msg._lnthBuldSlnoMsg
            }
        },
        {
            fieldName: "buldLdgNm",
            criteria : "value === undefined || value.length > 30",
            error : {
                level : "error",
                message : msg._lnthBuldLdgNmMsg
            }
        },
        {
            fieldName: "buldDtlNm",
            criteria : "value === undefined || value.length > 30",
            error : {
                level : "error",
                message : msg._lnthBuldDtlNmMsg
            }
        }
    ],
    props: {
        paging: true,
        crud: true,
        checkbox: true,
        sumRowVisible : false,
        width: "100%",
        autoFitHeight: true,
        fitStyle : "evenFill",
        form: "zipNoGridForm",
        action: _baseUrl + "system/zipNoMgmt.getZipNoList.do",
        saveAction: _baseUrl + "system/zipNoMgmt.saveZipNo.do"
    }
}