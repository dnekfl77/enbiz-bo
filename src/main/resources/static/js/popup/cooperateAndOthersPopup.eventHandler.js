$.namespace("cooperateAndOthersPopup.eventhandler");
cooperateAndOthersPopup.eventhandler = {
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
    ,validateTelNoBySection : function(elementId, isAlert) {
        var _self = this;

        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : isAlert
        };

        var cellNo = "";

        var $obj = $("#"+elementId);
        $obj.children('input').each(function(){
            ret = _self.validateInputIsEmpty(this.id, isAlert);
            if(!ret.result){return ret};
            cellNo = cellNo + $("#"+this.id).val();
        });
        if(!ret.result){return ret};

        var cellNoRule = /^\d{2,3}\d{3,4}\d{4}$/;

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
    ,_validateCooperateRequest : function (isAlert) {
        this.inputErrClear();

        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : isAlert
        };
        //제휴사명
        ret = this.validateInputIsEmpty("entrNm", isAlert);
        if(!ret.result){$('#entrNm').focus(); return ret;};
        //대표자명
        ret = this.validateInputIsEmpty("rpstmnNm", isAlert);
        if(!ret.result){$('#rpstmnNm').focus(); return ret;};
        //사업자등록번호
        ret = this.validateInputIsEmpty("bmanNo", isAlert);
        if(!ret.result){$('#bmanNo').focus(); return ret;};
        //거래상태
        ret = this.validateSelectIsEmpty("trdStatCd", isAlert);
        if(!ret.result){$('#trdStatCd').focus(); return ret;};
        //계약기간
        ret = this.validateDateByFromTo("contStrtDy", "contEndDy", isAlert);
        if(!ret.result){$('#contStrtDy').focus(); return ret;};
        //담당자전화번호
        ret = this.validateTelNoBySection("aempTelNo", isAlert);
        if(!ret.result){$('#aempTelRgnNo').focus(); return ret;};
        //주소
        ret = this.validateAddress("zipNoAddrDtl", isAlert);
        if(!ret.result){$('#dtlAddr').focus(); return ret;};

        return ret;
    }
    //제휴사 담당자 그리드 유효성 체크
    ,validateCooperateEmployeeByGrid : function(objGridView, objGridProvider){
        //수정중인 그리드 상태 commit(즉, 강제완료)으로 한다.
        objGridView.commit();

        var rows = objGridView.getItemCount();

        for(var row=0; row < rows; row++) {
            if (objGridView.getValue(row, "telNo") != '') {
                var regExp = /(02|0[3-9]{1}[0-9]{1})([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
                var telNoArr = regExp.exec(objGridView.getValue(row, "telNo"));

                if (telNoArr != null ) {
                    objGridView.setValue(row, 'telRgnNo', telNoArr[1]);
                    objGridView.setValue(row, 'telTxnoNo', telNoArr[2]);
                    objGridView.setValue(row, 'telEndNo', telNoArr[3]);

                    if (!objGridView.getValue(row, "telNo").isPhone()) {
                        alert("전화번호가 올바르지 않습니다. 다시 확인하시기 바랍니다.");
                        return false;
                    }
                }
            }
            if (objGridView.getValue(row, "cellNo") != '') {
                var regExp = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
                var cellNoArr = regExp.exec(objGridView.getValue(row, "cellNo"));

                if (cellNoArr != null ) {
                    objGridView.setValue(row, 'cellSctNo', cellNoArr[1]);
                    objGridView.setValue(row, 'cellTxnoNo', cellNoArr[2]);
                    objGridView.setValue(row, 'cellEndNo', cellNoArr[3]);

                    if (!objGridView.getValue(row, "cellNo").isMobile()) {
                        alert("휴대전화번호가 올바르지 않습니다. 다시 확인하시기 바랍니다.");
                        return false;
                    }
                } else {
                    alert("휴대전화번호가 올바르지 않습니다. 다시 확인하시기 바랍니다.");
                    return false;
                }
            } else {
                alert("필수항목이 누락되었습니다.. 다시 확인하시기 바랍니다.");
                return false;
            }
            if (objGridView.getValue(row, "emailAddr") != '') {
                if (!objGridView.getValue(row, "emailAddr").isEmail()) {
                    alert("메일주소가 올바르지 않습니다. 다시 확인하시기 바랍니다.");
                    return false;
                }
            } else {
                alert("필수항목이 누락되었습니다.. 다시 확인하시기 바랍니다.");
                return false;
            }
        }

        return true;
    }
    //주소찾기
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

        var _etEntrAempInfoGrid = cooperateEmployeeGrid.eventhandler.grid;
        var _etEntrAempDataProvider = _etEntrAempInfoGrid.getDataSource();

        if (!_self.validateCooperateEmployeeByGrid(_etEntrAempInfoGrid, _etEntrAempDataProvider) ) {
            return false;
        }

        var ret = {
            result : true
            , resultMsg : ""
            , resultFn : null
            , resultAlert : true
        };

        ret = _self._validateCooperateRequest(ret.resultAlert);

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
                var _saveUrl = _baseUrl + "popup/saveCooperateWithOtherData.do";

                _etEntrAempInfoGrid.localProps.saveAction = _saveUrl;

                cooperateEmployeeGrid.eventhandler.controller.doSave(
                    cooperateEmployeeGrid.eventhandler
                    , _etEntrAempInfoGrid.localId
                    , ["cooperateEmployeeGrid"]
                    , "cooperateAndOthersForm"
                );
            }
        }
    }
    ,bindButtonEvent: function () {
        var _self = this;

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

        $('#btn_addressSearch').on('click', t => {
            this.popupZipNoList();
        });

        $('#btnCooperateAndOthersCancel').click(function(event) {
            _self.onCancel();
        });

        $('#btnCooperateAndOthersSave').click(function(event) {
            event.preventDefault();
            _self.onSave();
        });

    }
    ,calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(7);
        $('#contStrtDy').val(initFromAndToCalDate[0]);
        $('#contEndDy').val(initFromAndToCalDate[1]);
    }
    // 초기화
    ,initialize : function() {
        (function($) {
            $.fn.inputFilter = function(inputFilter) {
                return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                    if (inputFilter(this.value)) {
                        this.oldValue = this.value;
                        this.oldSelectionStart = this.selectionStart;
                        this.oldSelectionEnd = this.selectionEnd;
                    } else if (this.hasOwnProperty("oldValue")) {
                        this.value = this.oldValue;
                        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                    } else {
                        this.value = "";
                    }
                });
            };
        }(jQuery));

        $('#aempTelRgnNo,#aempTelTxnoNo,#aempTelEndNo,#faxRgnNo,#faxTxnoNo,#faxEndNo').each(function () {
            $(this).inputFilter(function (value) {
                return /^\d*$/.test(value);
            })
        });

        this.calendarInit();
        this.bindButtonEvent();
    }
};