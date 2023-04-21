var col = x2coMessage.getMessage( {
    revNo 		: "displayConnectManagement.displayGoodsReviewPopup.grid.label.revNo",       // 상품리뷰번호
    revCont  	: "displayConnectManagement.displayGoodsReviewPopup.grid.label.revCont",     // 상품리뷰내용
    revScrVal  	: "displayConnectManagement.displayGoodsReviewPopup.grid.label.revScrVal",   // 상품리뷰 점수
    revWrtDtm  	: "displayConnectManagement.displayGoodsReviewPopup.grid.label.revWrtDtm",   // 작성일시
    goodsNo  	: "displayConnectManagement.displayGoodsReviewPopup.grid.label.goodsNo",     // 상품번호
    goodsNm  	: "displayConnectManagement.displayGoodsReviewPopup.grid.label.goodsNm",     // 상품명
    mdNm  	    : "displayConnectManagement.displayGoodsReviewPopup.grid.label.mdNm",        // 담당MD
    loginId  	: "displayConnectManagement.displayGoodsReviewPopup.grid.label.loginId",     // 회원ID
    mbrNm  	    : "displayConnectManagement.displayGoodsReviewPopup.grid.label.mbrNm"        // 회원명
});

$.namespace("displayGoodsReviewGrid.settings");
displayGoodsReviewGrid.settings = {
    fields : [ { fieldName : "revNo" }
            , { fieldName : "revCont" }
            , { fieldName : "revScrVal" }
            , { fieldName : "revWrtDtm" }
            , { fieldName : "goodsNo" }
            , { fieldName : "goodsNm" }
            , { fieldName : "mdId" }
            , { fieldName : "mdNm" }
            , { fieldName : "loginId" }
            , { fieldName : "mbrNm" }
            , { fieldName : "salePrc" }],
    columns:[{
        name : "revNo",
        fieldName : "revNo",
        header : {
            text : col.revNo
        },
        width : 80
    }, {
        name : "revCont",
        fieldName : "revCont",
        header : {
            text : col.revCont
        },
        width : 180,
        styleName : "left-column",
        renderer : {
          showTooltip : true
        }
    }, {
        name : "revScrVal",
        fieldName : "revScrVal",
        header : {
            text : col.revScrVal
        },
        width : 80
    }, {
        name : "revWrtDtm",
        fieldName : "revWrtDtm",
        header : {
            text : col.revWrtDtm
        },
        width : 120
    }, {
        name : "goodsNo",
        fieldName : "goodsNo",
        header : {
            text : col.goodsNo
        },
        width : 80
    }, {
        name : "goodsNm",
        fieldName : "goodsNm",
        header : {
            text : col.goodsNm
        },
        width : 180,
        styleName : "column-underline-l"
    }, {
        name : "mdId",
        fieldName : "mdId",
        visible : false
    }, {
        name : "mdNm",
        fieldName : "mdNm",
        header : {
            text : col.mdNm
        },
        width : 80
    }, {
        name : "loginId",
        fieldName : "loginId",
        header : {
            text : col.loginId
        },
        width : 100
    }, {
        name : "mbrNm",
        fieldName : "mbrNm",
        header : {
            text : col.mbrNm
        },
        width : 80
    }, {
        name : "salePrc",
        fieldName : "salePrc",
        visible : false
    }],
    props : {
        paging : true,
        defrow : 10,
        rows : col.defaultPage,
        autoFitHeight : true,
        popup : true,
        sumRowVisible : false,
        checkbox : true,
        crud : false,          
        form : "displayGoodsReviewGridForm",
        action : _baseUrl + "display/displayConnectMgmt.getDisplayGoodsReviewList.do"
    }
};
