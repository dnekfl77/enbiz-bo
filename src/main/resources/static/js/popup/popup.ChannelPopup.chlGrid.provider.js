var col = x2coMessage.getMessage({
    chl_clss_cd    	 : 'baseInfoMgmt.label.popup.channelListPopup.chlClssCd',
    chl_typ_cd 		 : 'baseInfoMgmt.label.popup.channelListPopup.chl_typ_cd',
    chl_no           : 'baseInfoMgmt.label.popup.channelListPopup.chl_no',
    chl_nm   	     : 'baseInfoMgmt.label.popup.channelListPopup.chl_nm'
});

$.namespace("chlGrid.settings");
chlGrid.settings = {
    fields : [ 
	{ fieldName : "chlClssCd", dataType: "text" }, 
	{ fieldName : "chlTypCd",  dataType: "text" }, 
	{ fieldName : "chlNo",     dataType: "text" }, 
	{ fieldName : "chlNm",     dataType: "text" }
	],
    columns : [ {
        name : "chlClssCd",
        fieldName : "chlClssCd",
        width : 90,
        header : { text : col.chl_clss_cd}
    }, {
        name : "chlTypCd",
        fieldName : "chlTypCd",
        width : 120,
        header : { text : col.chl_typ_cd }
    }, {
        name : "chlNo",
        fieldName : "chlNo",
        width : 100,
        header : { text : col.chl_no }
    }, {
         name : "chlNm",
         fieldName : "chlNm",
         width : 250,
         header : { text : col.chl_nm },
         styleName : "left-column"
    }],
    
    validations : [
       //  { fieldName : "bwNm", criteria : "value === undefined || value.trim() === ''"  , error : { level : "error", message : _bwNmMessage } }
    ],
    props : {
        paging : false,
        //rows : col.defaultPage,
        width : "100%", 
        // height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        autoFitHeight : true,
        popup : true,
        sumRowVisible : false,
        checkbox : true,
        //fitStyle : 'evenFill',
        crud : false,
        form : "chlGridForm",
        action : _baseUrl + "display/channelMgmt.getChannelList.do"
    }
};
