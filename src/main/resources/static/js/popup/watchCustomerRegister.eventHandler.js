$.namespace("watchCustomerRegister.eventhandler");
watchCustomerRegister.eventhandler = {
    // 팝업 종료
    close : function () {
        window.close();
    }
    ,onSave : function() {
        if($('#mbrNo').val().length <=0) {
            alert('필수 입력 항목이 누락되었습니다. 회원정보를 확인해 주세요.');
            return false;
        }

        var paramObj = $("form[name=watchCustomerRegisterForm]").serialize();

        var callbackOnSave = function(){
            alert('정상 저장되었습니다.');
            watchCustomerRegister.eventhandler.close();
        };

        if(confirm(_msg.confirmSaveMsg)) {
            common.Ajax.sendJSONRequest("POST"
                , _baseUrl + "customer/watchCustomerMgmt.saveWatchCustomer.do"
                , paramObj
                , callbackOnSave
            );
        }
    }
    // 이벤트 바인딩
    ,bindButtonEvent : function () {
        var that = this;

        // 닫기 버튼 클릭 이벤트 처리
        $('#btn_popup_close').click(function () {
            that.close();
        });
        // 닫기 버튼 클릭 이벤트 처리
        $('#btn_popup_apply').click(function () {
            that.onSave();
        });
        $('#btnMbrSearchPopup').on('click', function() {
            var pin = {
                argSelectType: '1'
                , argMbrStatCd: '10'
            };
            var POP_DATA = {
                url: _baseUrl + 'popup/memberSearch.memberSearchPopup.do'
                , winName: 'mbrListPopup'
                , title: '회원 조회 팝업'
                , _title: '회원 조회 팝업'
                , left: 20
                , top: 20
                , width: 1000
                , height: 700
                , scrollbars: false
                , autoresize: false
            };
            var callbackMbrSearchPopup = function (e) {
                var mbrObj = [];
                mbrObj = JSON.parse(e.data);

                $('#loginId').val(mbrObj[0].loginId);
                $('#mbrNo').val(mbrObj[0].mbrNo);
                $('#mbrNm').text(mbrObj[0].mbrNm);
                $('#emailAddr').text(mbrObj[0].emailAddr);
            };
            popCommon(pin, POP_DATA, callbackMbrSearchPopup);
        });
        $('#mgrGbCd').on('change', function () {
            var _mgrGbCd = $(this).val();

            if (_mgrGbCd.length <= 0) {
                alert('대상코드가 존재하지 않습니다.');
                $('#mgrTypCd').empty().append($('<option/>').val('').text(':: 선택 ::'));
                $('#mgrTypCd').val('').trigger('change');
                return false;
            }
            var paramObj = {
                code: 'ME009'
                ,referCode: _mgrGbCd
            }
            var callbackOptionRedraw = function(e) {
                $('#mgrTypCd').empty().append($('<option/>').val('').text(':: 선택 ::'));
                $('#mgrTypCd').val('').trigger('change');

                var optionArr = e.data.ME009;
                if(!Array.isArray(optionArr)) return;

                optionArr.forEach(function (el, index) {
                    $('#mgrTypCd').append(
                        $('<option/>').val(el.cd).text(el.cdNm)
                    );
                });
            }

            common.Ajax.sendJSONRequest("GET"
                , _baseUrl + "common/getForwardCdCdNmFromStStdCdByGrpCdRef1Val.do"
                , paramObj
                , callbackOptionRedraw
                , false
                ,"application/json;charset=UTF-8"
            );
        });
    }
    // 초기화
    ,initialize : function () {
        this.bindButtonEvent();
    }
};