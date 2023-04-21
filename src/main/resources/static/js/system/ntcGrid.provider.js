$.namespace("ntcGrid.settings");
ntcGrid.settings = {
    fields : [
        {
            fieldName : "notiMsgSeq"
        }, {
            fieldName : "siteNo"
        }, {
            fieldName : "msgGbCd"
        }, {
            fieldName : "baseNotiMethodCd"
        }, {
            fieldName : "title"
        }, {
            fieldName : "aplyStrDt",
            dataType: "datetime",
            datetimeFormat: "yyyyMMdd"
        }, {
            fieldName : "aplyEndDt",
            dataType: "datetime",
            datetimeFormat: "yyyyMMdd"
        }, {
            fieldName : "sysRegId"
        }, {
            fieldName : "sysRegDtm"
        }, {
            fieldName : "sysModId"
        }, {
            fieldName : "sysModDtm"
        },{
            fieldName : "baseNotiMethodNm"
        }, {
            fieldName : "msgGbNm"
        }
    ],
    columns : [
        {
           name : "msgGbNm",
           fieldName : "msgGbNm",
           header : {
               text : _ntc_gbcd
           },
           width : 140,
           editable : false,
           styles : {
               textAlignment : "left"
           },
           editor :{
               maxLength: 100
           }
       }, {
            name : "baseNotiMethodNm",
            fieldName : "baseNotiMethodNm",
            header : {
             text : _ntc_mthd
            },
            width : 140,
            editable : false,
            styles : {
             textAlignment : "left"
            },
            editor :{
             maxLength: 100
            }
       }, {
            name : "title",
            fieldName : "title",
            header : {
                text : _ntc_title
            },
            width : 220,
            editable : false,
            styleName: "left-column",
            editor :{
                maxLength: 100
            }
       }, {
          name : "aplyStrDt",
          fieldName : "aplyStrDt",
          header : {
              text : _aplySrtDtm
          },
          width : 100,
          editable : false,
          styles : {
              textAlignment : "center"
          },
          datetimeFormat: "yyyy-MM-dd"
      }, {
           name : "aplyEndDt",
           fieldName : "aplyEndDt",
           header : {
               text : _aplyEndDtm
           },

           width : 100,
           editable : false,
           styles : {
               textAlignment : "center"
           },
           datetimeFormat: "yyyy-MM-dd"
       }, {
            name : "sysRegId",
            fieldName : "sysRegId",
            header : {
                text : _sysRegId
            },
            width : 80,
            editable : false,
            styles : {
                textAlignment : "near"
            }
        }, {
            name : "sysRegDtm",
            fieldName : "sysRegDtm",
            header : {
                text : _sysRegDtm
            },
            width : 120,
            editable : false,
            styles : {
                textAlignment : "center",
                datetimeFormat : "yyyy-MM-dd HH:mm:ss"
            }
        }, {
            name : "sysModId",
            fieldName : "sysModId",
            header : {
                text : _sysModId
            },
            width : 80,
            editable : false,
            styles : {
                textAlignment : "near"
            }
        }, {
            name : "sysModDtm",
            fieldName : "sysModDtm",
            header : {
                text : _sysModDtm
            },
            width : 120,
            editable : false,
            styles : {
                textAlignment : "center",
                datetimeFormat : "yyyy-MM-dd HH:mm:ss"
            },
            footer : {
                styles : {
                    textAlignment : "far",
                    prefix : "Rows : "
                },
                expression : "count"
            }
        }
    ],
    validations : [
    ],
    props : {
        paging : true,
        sumRowVisible : false,
        autoFitHeight : true,
        form : "ntcGridForm",
        action : _baseUrl + "system/noticeMessageMgmt.getNoticeMessageList.do"
    }
};
