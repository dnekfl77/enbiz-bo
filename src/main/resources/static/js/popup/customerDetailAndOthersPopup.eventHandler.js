$.namespace("customerDetailAndOthersPopup.eventhandler");
customerDetailAndOthersPopup.eventhandler = {
    // 초기화
    initialize : function() {
        this.parametersCheck();
        this.bindButtonEvent();
    }
    // 회원번호가 필수임.!!
    ,parametersCheck : function() {
        if (typeof _parameterMbrNo == "undefined" || _parameterMbrNo == null || _parameterMbrNo == "") {
            alert("요청정보를 확인하세요.");
            return false;
        }
    }
    ,inputErrClear : function() {
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
    ,validateCellNoBySectionSelect : function(elementId, isAlert) {
        var _self = this;

        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : isAlert
        };

        var cellNo = "";

        $('#'+elementId).children('select').each(function(){
            ret = _self.validateSelectIsEmpty(this.id, isAlert);
            if(!ret.result){return ret};
            cellNo = $("#"+this.id).val();
        });
        $('#'+elementId).children('input').each(function(){
            ret = _self.validateInputIsEmpty(this.id, isAlert);
            if(!ret.result){return ret};
            cellNo = cellNo + $("#"+this.id).val();
        });
        if(!ret.result){return ret};

        var cellNoRule = /^\d{3}\d{3,4}\d{4}$/;

        if (!(cellNoRule.test(cellNo))) {
            if(!isAlert){
                $obj.parent().addClass("error");
                $obj.parent().find("em").show().text($obj.data("msgEmpty"));
            }
            ret.result = false;
            ret.resultMsg = $obj.data("msgEmpty");
        }
        return ret;
    }
    ,validateAddress : function(elementId, isAlert) {
        var _self = this;

        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : isAlert
        };

        $('#'+elementId).children('input').each(function(){
            ret = _self.validateInputIsEmpty(this.id, isAlert);
            if(!ret.result){return ret};
        });
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
        //회원/법인명
        ret = this.validateInputIsEmpty("mbrNm", isAlert);
        if(!ret.result){return ret};

        //값이 존재할 경우 체크
        if($('#telRgnNo').val().length > 0 || $('#telTxnoNo').val().length > 0 || $('#telEndNo').val().length > 0) {
            var telNo = $('#telRgnNo').val() + $('#telTxnoNo').val() + $('#telEndNo').val();

            if (!telNo.isPhone()) {
                ret.result = false;
                ret.resultMsg = "전화번호 형식이 맞지 않습니다.";
            }
        }
        if($('#cellSctNo').val().length > 0 || $('#cellTxnoNo').val().length > 0 || $('#cellEndNo').val().length > 0) {
            var cellNo = $('#cellSctNo').val() + $('#cellTxnoNo').val() + $('#cellEndNo').val();

            if (!cellNo.isMobile()) {
                ret.result = false;
                ret.resultMsg = "휴대전화번호 형식이 맞지 않습니다.";
            }
        }
        if($('#emailId').val().length > 0 || $('#emailDomain').val().length > 0) {
            var emailAddr = $('#emailId').val() + '@' + $('#emailDomain').val();

            if (!emailAddr.isEmail()) {
                ret.result = false;
                ret.resultMsg = "메일 형식이 맞지 않습니다.";
            }
        }
        if($('#zipNo').val().length > 0) {
            if($('#zipAddr').val().length <= 0 || $('#dtlAddr').val().length <= 0) {
                ret.result = false;
                ret.resultMsg = "주소입력시 상세주소까지 필수 입력입니다.";
            }
        }

        return ret;
    }
    // 배송지 정보 그리드 유효성 체크
    ,validateCustomerDeliveryByGrid : function(objGridView, objGridProvider){
        //수정중인 그리드 상태 commit(즉, 강제완료)으로 한다.
        objGridView.commit();

        var rows = objGridView.getItemCount();

        for(var row=0; row < rows; row++) {
            if (objGridView.getValue(row, "zipNoSeq") == undefined || objGridView.getValue(row, "zipNoSeq") == '') {
                alert("주소정보가 정상 입력되지 않았습니다.");
                return false;
            }
            if (objGridView.getValue(row, "zipAddr") == undefined || objGridView.getValue(row, "zipAddr") == '') {
                alert("주소정보가 정상 입력되지 않았습니다.");
                return false;
            }
            if (objGridView.getValue(row, "dtlAddr") == undefined || objGridView.getValue(row, "dtlAddr") == '') {
                alert("주소정보가 정상 입력되지 않았습니다.");
                return false;
            }
            if (objGridView.getValue(row, "telNo") != '') {
                var regExp = /(02|0[3-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
                var telNoArr = regExp.exec(objGridView.getValue(row, "telNo"));

                objGridView.setValue(row, 'telRgnNo', telNoArr[1]);
                objGridView.setValue(row, 'telTxnoNo', telNoArr[2]);
                objGridView.setValue(row, 'telEndNo', telNoArr[3]);

                if (!objGridView.getValue(row, "telNo").isPhone()) {
                    alert("전화번호가 올바르지 않습니다. 다시 확인하시기 바랍니다.");
                    return false;
                }
            }
            if (objGridView.getValue(row, "cellNo") != '') {
                var regExp = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
                var cellNoArr = regExp.exec(objGridView.getValue(row, "cellNo"));

                objGridView.setValue(row, 'cellSctNo', cellNoArr[1]);
                objGridView.setValue(row, 'cellTxnoNo', cellNoArr[2]);
                objGridView.setValue(row, 'cellEndNo', cellNoArr[3]);

                if (!objGridView.getValue(row, "cellNo").isMobile()) {
                    alert("휴대전화번호가 올바르지 않습니다. 다시 확인하시기 바랍니다.");
                    return false;
                }
            }
        }

        return true;
    }
    //취소
    ,onCancel : function(){
        window.close();
    }
    //저장
    ,onSave : function() {
        var _self = this;

        // 텍스트 박스 readonly 처리 form 전송시 안됨!!
        $("#zipNoSeq").removeAttr("disabled");
        $("#zipNo").removeAttr("disabled");
        $("#zipAddr").removeAttr("disabled");
        $("#zipNoSeq").attr("readonly",true);
        $("#zipNo").attr("readonly",true);
        $("#zipAddr").attr("readonly",true);

        if($('#emailId').val().length > 0 && $('#emailDomain').val().length > 0) {
            $('#emailAddr').val($('#emailId').val() + '@' + $('#emailDomain').val());
        }

        var _etMbrDlvpInfoGrid = customerDeliveryGrid.eventhandler.grid;
        var _etMbrDlvpInfoProvider = _etMbrDlvpInfoGrid.getDataSource();

        if (!_self.validateCustomerDeliveryByGrid(_etMbrDlvpInfoGrid, _etMbrDlvpInfoProvider) ) {
            return false;
        }

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
                customerDeliveryGrid.eventhandler.controller.doSave(
                    customerDeliveryGrid.eventhandler
                    , _etMbrDlvpInfoGrid.localId
                    , ["customerDeliveryGrid"]
                    , "customerDetailForm"
                );
            }
        }

        return false;
    }
    ,popupZipNoList : function(){
        var pin = {
            // argSelectType: $("#zipNoListForm [name='argSelectType']:checked").val()
            argSelectType: 1
        };
        var POP_DATA = {
            url: '/popup/zipCodeMgmtPopup.zipNoListPopup.do'
            , winName: 'zipNoListPopup'
            , title: '우편번호 조회'
            , _title: '우편번호 조회'
            , left: 20
            , top: 20
            , width: 660
            , height: 800
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupZipNoListCallback);
    }
    ,popupZipNoListCallback : function(e) {
        var zipObj = [];
        zipObj = JSON.parse(e.data)

        $('#zipNoSeq').val(zipObj[0].zipNoSeq);
        $('#zipNo').val(zipObj[0].zipNo);
        $('#zipAddr').val(zipObj[0].address);
    }
    ,popupRefundAccount : function(){
        var pin = {
            mbrNo: $('#mbrNo').val()
            ,mbrNm: $('#mbrNm').val()
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/customerMgmt.customerRefundAccountPopup.do'
            , winName: 'viewCustomerRefundAccountPopup'
            , title: '환불계좌관리'
            , _title: '환불계좌관리'
            , left: 20
            , top: 20
            , width: 500
            , height: 400
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA);
    }
    ,popupCustomerGradeHistory : function(){
        var pin = {
            mbrNo: $('#mbrNo').val()
            ,mbrNm: $('#mbrNm').val()
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/customerMgmt.customerGradeHistoryPopup.do'
            , winName: 'customerGradeHistoryPopupView'
            , title: '회원등급이력조회'
            , _title: '회원등급이력조회'
            , left: 20
            , top: 20
            , width: 500
            , height: 470
            , scrollbars: false
            , autoresize: false
        };

        popCommon(pin, POP_DATA);
    }
    // 버튼 이벤트 바인딩
    ,bindButtonEvent : function(){
        var _self = this;

        $('#btnCancel').click(function(event) {
            _self.onCancel();
        });
        
        $('#btnSave').click(function(event) {
            event.preventDefault();
            _self.onSave();
        });

        $('#btnAddressSearch').click(function(){
            _self.popupZipNoList();
        });

        $('#btnRefundAccountPopup').click(function() {
            _self.popupRefundAccount();
        });

        $('#btnCustomerGradeHistoryPopup').click(function() {
            _self.popupCustomerGradeHistory();
        });

        //2차 분량 S
        $('#btnActPoint').click(function(){
            alert('2차에 개발 예정 입니다.');
        });
        $('#btnCoupon').click(function(){
            alert('2차에 개발 예정 입니다.');
        });
        $('#btnFreeShippingVoucher').click(function(){
            alert('2차에 개발 예정 입니다.');
        });
        $('#btnSavings').click(function(){
            alert('2차에 개발 예정 입니다.');
        });
        $('#btnDeposit').click(function(){
            alert('2차에 개발 예정 입니다.');
        });
        //2차 분량 E

        $('#domainSelect').change(function() {
            $("#domainSelect option:selected").each(function () {
                if($(this).val()== ''){ //직접입력일 경우
                    $("#emailDomain").val('');                        //값 초기화
                    $("#emailDomain").attr("readOnly",false); //활성화
                    $("#emailDomain").removeClass('disabled');
                }else{ //직접입력이 아닐경우
                    $("#emailDomain").val($(this).text());      //선택값 입력
                    $("#emailDomain").attr("readOnly",true); //비활성화
                    $("#emailDomain").addClass('disabled');
                }
            });
        });
    }
    ,gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
            //검색 결과 없을 경우
            if (data.payloads.length == 0) {
                if (localStorage.alertifyExists === 'true') {
                    localStorage.alertifyExists = 'false';
                }
            }
        }
    }
};