$.namespace("partnerCruPopup.eventhandler");
partnerCruPopup.eventhandler = {
    // 초기화
    initialize : function() {
        this.parametersCheck();
        this.calendarInit();
        this.bindButtonEvent();
    }
    // argMode : 선택구분 ( C : 등록, RU : 상세조회 및 수정 )
    ,parametersCheck : function() {
        if (typeof _parameterMode == "undefined" || _parameterMode == null || _parameterMode == "") {
            alert("화면 상태를 확인하지 못하였습니다.");
            return false;
        }
    }
    ,calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#contStrtDy').val(initFromAndToCalDate[0]);
        $('#contEndDy').val(initFromAndToCalDate[1]);
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
    ,validateDateByFromTo : function(fromElementId, toElementId, isAlert) {
        var _self = this;

        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : isAlert
        };
        ret = _self.validateInputIsEmpty(fromElementId, isAlert);
        if(!ret.result){return ret};
        ret = _self.validateInputIsEmpty(toElementId, isAlert);
        if(!ret.result){return ret};

        //common/validate.js
        //날짜비교함수 버그로 입력값에 대한 Date검사 별도로 해야 함.
        if(!isDate($("#"+fromElementId).val()) || !isDate($("#"+toElementId).val())){
            if(!isAlert){
                $obj.parent().addClass("error");
                $obj.parent().find("em").show().text($obj.data("msgEmpty"));
            }
            ret.result = false;
            ret.resultMsg = "날짜형식에 맞지 않습니다.";
        }
        if(!ret.result){return ret};

        //시작날짜와 종료날짜를 비교 common/validate.js
        if(isNotCompareDate($("#"+fromElementId).val(), $("#"+toElementId).val(), true)) {
            if(!isAlert){
                $obj.parent().addClass("error");
                $obj.parent().find("em").show().text($obj.data("msgEmpty"));
            }
            ret.result = false;
            ret.resultMsg = "계약시작일은 종료일 보다 클수 없습니다.";
        }
        if(!ret.result){return ret};

        if(!isAlert){
            $obj.parent().removeClass("error");
            $obj.parent().find("em").hide().text("");
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
        //협력사명
        ret = this.validateInputIsEmpty("entrNm", isAlert);
        if(!ret.result){return ret};
        //사업자종류
        ret = this.validateSelectIsEmpty("bmanKindCd", isAlert);
        if(!ret.result){return ret};
        //사업자등록번호
        ret = this.validateInputIsEmpty("bmanNo", isAlert);
        if(!ret.result){return ret};
        //거래형태
        ret = this.validateSelectIsEmpty("trdTypCd", isAlert);
        if(!ret.result){return ret};
        //거래상태
        ret = this.validateSelectIsEmpty("trdStatCd", isAlert);
        if(!ret.result){return ret};
        //계약기간
        ret = this.validateDateByFromTo("contStrtDy", "contEndDy", isAlert);
        if(!ret.result){return ret};
        //담당자휴대폰번호
        ret = this.validateCellNoBySectionSelect("aempCellNo", isAlert);
        if(!ret.result){return ret};
        //주소
        ret = this.validateAddress("zipNoAddrDtl", isAlert);
        if(!ret.result){return ret};

        return ret;
    }
    ,validateRecursiveBaseByGrid: function(objGridView, objGridProvider) {
        //수정중인 그리드 상태 commit(즉, 강제완료)으로 한다.
        objGridView.commit();

        var gridSetting = com.x2commerce.common.Util.namespaceObj(objGridView.localId + ".settings");
        var validCheckFields = gridSetting.validations
        var rows = objGridView.getItemCount();
        for(var row=0; row < rows; row++) {

        }
    }
    // 배송비정책 그리드 유효성 체크
    ,validateShippingFeeByGrid : function(objGridView, objGridProvider){
        //수정중인 그리드 상태 commit(즉, 강제완료)으로 한다.
        objGridView.commit();

        var rows = objGridView.getItemCount();
        for(var row=0; row < rows; row++) {
            switch (objGridView.getValue(row, "dlexTypCd")) {
                case "10" :   //무료
                    if (objGridView.getValue(row,"stdAmt") > 0
                        || objGridView.getValue(row,"dlexAmt") > 0
                        || objGridView.getValue(row,"ferryRgnDlexAmt") > 0
                        || objGridView.getValue(row,"jejuDlex") > 0
                        || objGridView.getValue(row,"jejuFerryRgnDlexAmt") > 0
                    ) {
                        alert("배송비 형태가 무료인 경우 배송비가 0보다 클 수 없습니다.");
                        return false;
                    }
                    break;
                case "20" :  //유료
                    if( objGridView.getValue(row,"stdAmt") > 0 && objGridView.getValue(row,"dlexAmt") > 0 ) {
                        if( objGridView.getValue(row,"stdAmt") < objGridView.getValue(row,"dlexAmt") ) {
                            alert("배송비 금액은 기준금액보다 클 수 없습니다.");
                            return false;
                        }
                        if( objGridView.getValue(row,"stdAmt") < objGridView.getValue(row,"ferryRgnDlexAmt") ) {
                            alert("추가배송비 금액은 기준금액보다 클 수 없습니다.");
                            return false;
                        }
                        if( objGridView.getValue(row,"stdAmt") < objGridView.getValue(row,"jejuDlex") ) {
                            alert("추가배송비 금액은 기준금액보다 클 수 없습니다.");
                            return false;
                        }
                        if( objGridView.getValue(row,"stdAmt") < objGridView.getValue(row,"jejuFerryRgnDlexAmt") ) {
                            alert("추가배송비 금액은 기준금액보다 클 수 없습니다.");
                            return false;
                        }
                    }
                    break;
                case "30" :  //조건부무료
                    break;
                default:
                    break;
            }

//            if (objGridProvider.getRowState(row) != 'deleted'){
//                if(objGridView.getValue(row, "useYn")  === "Y"){
//                    return true;
//                }
//            }
        }
        return true;
    }
    // 버튼 이벤트 바인딩
    ,bindButtonEvent : function(){
        var _self = this;

        $('#btn_partnerCruCancel').click(function(event) {
            _self.onCancel();
        });
        
        $('#btn_partnerCruSave').click(function(event) {
            event.preventDefault();
            _self.onSave();
        });

        //달력
        $('#btn_calendar').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#contStrtDy').val(),
                yyyymmdd2:$('#contEndDy').val(),
                //max_term:30,
                fn:function(pin) {
                    $('#contStrtDy').val(pin.yyyymmdd1);
                    $('#contEndDy').val(pin.yyyymmdd2);
                }
            });
        });

        $('#btn_addressSearch').click(function(){
            _self.popupZipNoList();
        });
    },
    //취소
    onCancel : function(){
        window.close();
    }, 
    //저장
    onSave : function() {
        var _self = this;

        // 텍스트 박스 readonly 처리 form 전송시 안됨!!
        $("#zipNoSeq").removeAttr("disabled");
        $("#zipNo").removeAttr("disabled");
        $("#zipAddr").removeAttr("disabled");
        $("#zipNoSeq").attr("readonly",true);
        $("#zipNo").attr("readonly",true);
        $("#zipAddr").attr("readonly",true);

        var _etDeliPolcBaseGrid = etDeliPolcBaseGrid.eventhandler.grid;
        var _etEntrAempInfoGrid = etEntrAempInfoGrid.eventhandler.grid;
        var _etEntrDlvpInfoGrid = etEntrDlvpInfoGrid.eventhandler.grid;

        var _etDeliPolcDataProvider = _etDeliPolcBaseGrid.getDataSource();
        var _etEntrAempDataProvider = _etEntrAempInfoGrid.getDataSource();
        var _etEntrDlvpDataProvider = _etEntrDlvpInfoGrid.getDataSource();

        if (!_self.validateShippingFeeByGrid(_etDeliPolcBaseGrid, _etDeliPolcDataProvider) ) {
            alert("error");
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
            if( confirm(_saveQuestionMessage) ) {
                var _saveUrl = _baseUrl + "popup/saveVendorWithOtherData.do";
                if(_parameterMode == "U"){
                    _saveUrl = _baseUrl + "popup/updateVendorWithOtherData.do";
                }

                _etDeliPolcBaseGrid.localProps.saveAction = _saveUrl;

                etDeliPolcBaseGrid.eventhandler.controller.doSave(
                    etDeliPolcBaseGrid.eventhandler
                    , _etDeliPolcBaseGrid.localId
                    , ["etDeliPolcBaseGrid", "etEntrAempInfoGrid", "etEntrDlvpInfoGrid"]
                    , "partnerCruForm"
                );
            }
        }
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
    ,gridEvent : {
        // 조회 완료 후 CallBack 함수
        afterQuerySuccess : function (grid, data) {
        }
    }
};