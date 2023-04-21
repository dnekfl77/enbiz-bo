var col = x2coMessage.getMessage({
    ImgBanner       : 'displayConnectManagement.connectTabImgGrid.ImgBanner',
    linkUrlAddr     : 'displayConnectManagement.connectTabImgGrid.linkUrlAddr',
    contDesc        : 'displayConnectManagement.connectTabImgGrid.contDesc',
    dispSeq         : 'displayConnectManagement.connectTabImgGrid.dispSeq',
    dispYn          : 'displayConnectManagement.connectTabImgGrid.dispYn',
    dispStrDtm      : 'displayConnectManagement.connectTabImgGrid.dispStrDtm',
    dispEndDtm      : 'displayConnectManagement.connectTabImgGrid.dispEndDtm',
    contPathNm      : 'displayConnectManagement.connectTabImgGrid.contPathNm',
    altCont         : 'displayConnectManagement.connectTabImgGrid.altCont'
});

$.namespace("connectTabImgGrid.settings");
connectTabImgGrid.settings = {
    fields : [ { fieldName : "dispCtgNo" }
            , { fieldName : "conrNo" }
            , { fieldName : "conrTgtNo" }
            , { fieldName : "conrTgtCd" }
            , { fieldName : "conrContNo" }
            , { fieldName : "ImgBanner" }
            , { fieldName : "linkUrlAddr" }
            , { fieldName : "contDesc" }
            , { fieldName : "dispSeq" }
            , { fieldName : "dispYn" }
            , { fieldName : "dispStrDtm" }
            , { fieldName : "dispEndDtm" }
            , { fieldName : "contPathNm" }
            , { fieldName : "altCont" }
    ],
    columns : [ {
        name : "dispCtgNo",
        fieldName : "dispCtgNo",
        visible : false
    }, {
        name : "conrNo",
        fieldName : "conrNo",
        visible : false
    }, {
        name : "conrTgtNo",
        fieldName : "conrTgtNo",
        visible : false
    }, {
        name : "conrTgtCd",
        fieldName : "conrTgtCd",
        visible : false
    }, {
        name : "conrContNo",
        fieldName : "conrContNo",
        visible : false
    }, {
        name : "ImgBanner",
        fieldName : "ImgBanner",
        header : {
            text : col.ImgBanner
        },
        renderer: {
            type: "image",
            imageCallback: function (grid, cell) {
                var brandImg = grid.getValue(cell.item.index, "ImgBanner");
                if( brandImg != null && brandImg != '') {
                    return brandImg;
                } else {
                    return "/static/img/noimg.png";
                }
            },
            imageHeight: 80
        },
        width : 120,
        styleName : "disable-column",
        editable : false
    }, {
        name : "linkUrlAddr",
        fieldName : "linkUrlAddr",
        header : {
            text : col.linkUrlAddr
        },
        width : 150,
        styleName : "disable-column left-column"
    }, {
        name : "contDesc",
        fieldName : "contDesc",
        header : {
            text : col.contDesc
        },
        width : 150,
        styleName : "disable-column column-underline-l"
    }, {
        name : "dispSeq",
        fieldName : "dispSeq",
        header : {
            text : col.dispSeq
        },
        width : 80,
        styleName : "disable-column right-column"
    }, {
        name : "dispYn",
        fieldName : "dispYn",
        header : {
            text : col.dispYn
        },
        width : 70,
        readOnly : true,
        renderer: {
            type: "check",
            trueValues: "Y",
            falseValues: "N"
        },
        styleName : "disable-column"
    },  {
        name : "dispStrDtm",
        fieldName : "dispStrDtm",
        header : {
           text : col.dispStrDtm
        },
        width : 120,
        styleName : "disable-column"
   }, {
       name : "dispEndDtm",
       fieldName : "dispEndDtm",
       header : {
            text : col.dispEndDtm
       },
       width : 120,
       styleName : "disable-column"
   }, {
       name : "contPathNm",
       fieldName : "contPathNm",
       header : {
           text : col.contPathNm
       },
       width : 150,
       styleName : "disable-column left-column"
   }, {
       name : "altCont",
       fieldName : "altCont",
       header : {
           text : col.altCont
       },
       width : 150,
       styleName : "disable-column left-column"
   }],

    props : {
        paging : false,
        rows : 0,
        width : "100%",
        height : "180",
        autoFitHeight : false,
        sumRowVisible : false,
        fitStyle : "none",
        checkbox : true,
        crud : true,
        form : "displayConnectForm",
        action : _baseUrl + "display/displayConnectMgmt.getPrConrContInfoImgList.do",
        saveAction : _baseUrl + "/display/displayConnectMgmt.savePrConrContInfoList.do"
    }
};
