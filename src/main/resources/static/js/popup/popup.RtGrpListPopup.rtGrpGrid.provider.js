var col = x2coMessage.getMessage({
    rt_grp_no    	 : 'rightGroupMgmt.label.rtgrp.base.no',
    sys_gb_nm 		 : 'rightGroupMgmt.label.rtgrp.base.sys.gb',
    rt_grp_nm        : 'rightGroupMgmt.label.rtgrp.base.nm',
    aply_str_dt      : 'rightGroupMgmt.label.data.aply.strt.dttm',
    aply_end_dt      : 'rightGroupMgmt.label.data.aply.end.dttm',
    defaultPage      : 0
});

$.namespace("rtGrpGrid.settings");
rtGrpGrid.settings = {
    fields : [ {
        fieldName : "rtGrpNo"
    }, {
        fieldName : "sysGbNm"
    }, {
        fieldName : "rtGrpNm"
    }, {
        fieldName : "aplyStrDt"
    }, {
        fieldName : "aplyEndDt"
    }],
    columns : [ {
        name : "rtGrpNo",
        fieldName : "rtGrpNo",
        header : {
            text : col.rt_grp_no
        },
        width : 100
    }, {
        name : "sysGbNm",
        fieldName : "sysGbNm",
        header : {
            text : col.sys_gb_nm
        },
        width : 150
    }, {
        name : "rtGrpNm",
        fieldName : "rtGrpNm",
        header : {
            text : col.rt_grp_nm
        },
        width : 150
    }, {
         name : "aplyStrDt",
         fieldName : "aplyStrDt",
         header : {
            text : col.aply_str_dt
         },
         width : 120
    }, {
          name : "aplyEndDt",
          fieldName : "aplyEndDt",
          header : {
             text : col.aply_end_dt
          },
          width : 120
    }],
    
    validations : [
       //  { fieldName : "bwNm", criteria : "value === undefined || value.trim() === ''"  , error : { level : "error", message : _bwNmMessage } }
    ],
    props : {
        paging : true,
        rows : col.defaultPage,
        width : "100%", 
        // height : "100%", // grid의 기본 height. autoFitHeight 값이 true이 경우 이 값은 무시된다.
        autoFitHeight : true,
        popup : true,
        sumRowVisible : false,
        checkbox : true,
        //fitStyle : 'evenFill',
        crud : false,
        form : "rtGrpGridForm",
        action : _baseUrl + "system/rightGroupMgmt.getUserRightGroupButtonGridList.do"
    }
};
