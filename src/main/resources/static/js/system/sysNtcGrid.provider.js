$.namespace("sysNtcGrid.settings")

sysNtcGrid.settings = {
    fields: [
        {       fieldName: "siteNo"
        },{     fieldName: "bbcNo"
        },{     fieldName: "sysGbNm"
        },{     fieldName: "bbGbNm"
        },{     fieldName: "ntcGbNm"
        },{     fieldName: "title"
        },{     fieldName: "bbYn"
        },{     fieldName: "bbStrDtm"
        },{     fieldName: "bbEndDtm"
        },{     fieldName: "fxdcYn"
        },{     fieldName: "popYn"
        },{     fieldName: "qryCnt" , dataType:"number"
        },{     fieldName: "dnldCnt", dataType:"number"
        },{     fieldName: "sysModId"
        },{     fieldName: "sysModDtm"
        }
    ],
    columns: [{
            fieldName: "siteNo",
            header: {
                text: "_site_no"
            },
            width: 150,
            editable: false,
            styleName: "rg-trcol_l",
            visible: false
        },
        {
            fieldName: "bbcNo",
            header: {
                text: "_bbc_no"
            },
            visible: false
        },
        {
            fieldName: "sysGbNm",
            header: {
                text: msg._sysGbNm
            },
            width: 150,
            editable : false
        },
        {
            fieldName: "bbGbNm",
            header: {
                text: msg._bbGbNm
            },
            width: 150,
            editable : false
        },
        {
            fieldName: "ntcGbNm",
            header: {
                text: msg._ntcGbNm
            },
            width: 150,
            editable : false
        },
        {
            fieldName: "title",
            header: {
                text: msg._title
            },
            width: 300,
            styleName : "column-underline-l",
            editable : false
        },
        {
            fieldName: "bbYn",
            header: {
                text: msg._bbYn
            },
            renderer: {
				type: "check",
				trueValues: "Y",
				falseValues: "N"
			},
            width: 150,
            readOnly : true
        },
        {
            fieldName: "bbStrDtm",
            header: {
                text: msg._bbStrDtm
            },
            width: 200,
            editable : false
        },
        {
            fieldName: "bbEndDtm",
            header: {
                text: msg._bbEndDtm
            },
            width: 200,
            editable : false
        },
        {
            fieldName: "fxdcYn",
            header: {
                text: msg._fxdcYn
            },
            renderer: {
				type: "check",
				trueValues: "Y",
				falseValues: "N"
			},
            width: 150,
            readOnly : true
        },
        {
            fieldName: "popYn",
            header: {
                text: msg._popYn
            },
            renderer: {
				type: "check",
				trueValues: "Y",
				falseValues: "N"
			},
            width: 150,
            readOnly : true
        },
        {
            fieldName: "qryCnt",
            header: {
                text: msg._qryCnt
            },
            numberFormat:"#,##0",
            styleName: "right-column",
            width: 150,
            editable : false
        },
        {
            fieldName: "sysModId",
            header: {
                text: msg._sysModId
            },
            width: 150,
            editable : false
        },
        {
            fieldName: "sysModDtm",
            header: {
                text: msg._sysModDtm
            },
            width: 200,
            editable : false
        }
    ],
    validations: [{}],
    props: {
        autoFitHeight: true,
        crud: false,
        sumRowVisible: false,
        paging: true,
        form: "sysNtcSearchForm",
        action : _baseUrl + "system/systemNoticeMgmt.getSystemNoticeList.do"
    }
}