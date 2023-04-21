$.namespace("customerRefundAccountPopup.eventhandler");
customerRefundAccountPopup.eventhandler = {
    inputErrClear : function() {
        $("[data-msg-empty]").each(function(index, val){
            $(val).parent().removeClass("error");
            if($(this).attr("id").indexOf("file") != -1) {
                $(val).parent().parent().find("em").hide().text("");
            } else {
                $(val).parent().find("em").hide().text("");
            }
        })
    }
    ,validateInputIsEmpty : function(elementId, isAlert) {
        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : isAlert
        };
        var $obj = $("#"+elementId);
        if($.trim($obj.val()) == "") {
            if(!isAlert){
                $obj.parent().addClass("error");
                $obj.parent().find("em").show().text($obj.data("msgEmpty"));
            }
            ret.result = false;
            ret.resultMsg = $obj.data("msgEmpty");

            $("html, body").animate({scrollTop : $obj.offset().top - (window.innerHeight/2)}, 0);
        } else {
            if(!isAlert){
                $obj.parent().removeClass("error");
                $obj.parent().find("em").hide().text("");
            }
        }

        return ret;
    }
    ,validateSelectIsEmpty : function(elementId, isAlert) {
        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : isAlert
        };

        var $obj = $("#"+elementId);
        if($obj.find("option:enabled:selected").length == 0
            || $obj.find("option:enabled:selected").val() == "") {
            if(!isAlert){
                $obj.parent().addClass("error");
                $obj.parent().find("em").show().text($obj.data("msgEmpty"));
            }
            ret.result = false;
            ret.resultMsg = $obj.data("msgEmpty");
            $("html, body").animate({scrollTop : $obj.offset().top - (window.innerHeight/2)}, 0);
        } else {
            if(!isAlert){
                $obj.parent().removeClass("error");
                $obj.parent().find("em").hide().text("");
            }
        }

        return ret;
    }
    ,validationRegister : function(isAlert) {
        this.inputErrClear();
        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : isAlert
        };
        //필수입력 체크
        //은행
        ret = this.validateSelectIsEmpty("rfdBankCd", isAlert);
        if(!ret.result){return ret};
        //계좌번호
        ret = this.validateInputIsEmpty("rfdActnNo", isAlert);
        if(!ret.result){return ret};
        //예금주
        ret = this.validateInputIsEmpty("rfdActnDepositorNm", isAlert);
        if(!ret.result){return ret};

        return ret;
    }
    // 닫기
    ,close : function () {
        window.close();
    }

    ,bindButtonEvent: function () {
        var _self = this;

        // 닫기버튼
        $("#btn_popup_close").click(function() {
            _self.close();
        });

        //저장버튼
        $('#btn_popup_apply').click(function(){
            event.preventDefault();

            var ret = {
                result : true
                , resultMsg : ""
                , resultFn : null
                , resultAlert : true
            };

            ret = _self.validationRegister(ret.resultAlert);

            if(!ret.result) {
                if(ret.resultAlert){
                    alert(ret.resultMsg);
                }
                if(ret.resultFn != undefined
                    && ret.resultFn != null
                    && typeof(ret.resultFn)=="function"){
                    ret.resultFn();
                }
                return false;
            } else {
                if( confirm(_msg.confirmSaveMsg) ) {
                    let parameter = $("form[name=customerRefundAccountForm]").serialize() ;

                    common.Ajax.sendJSONRequest(
                        "POST",
                        _baseUrl + "customer/customerMgmt.saveCustomerRefundAccount.do",
                        parameter,
                        function(obj) {
                            if (obj.succeeded == true) {
                                _self.close();
                            }else{
                            }
                        }
                    );
                }
            }
        });
    }

    // 초기화
    ,initialize : function() {
        this.bindButtonEvent();
    }
};