$.namespace("csProcRegistrationPopup.eventhandler");
csProcRegistrationPopup.eventhandler = {
    alertMessage : x2coMessage.getMessage( {
        custCnslGbCd: 'integratedCounselMgmt.csRegistrationPopup.msg.custCnslGbCd',
        accpTypCd: 'integratedCounselMgmt.csRegistrationPopup.msg.accpTypCd',
        ccnPrgsStatCd: 'integratedCounselMgmt.csRegistrationPopup.msg.ccnPrgsStatCd',
        cnslProcCont: 'integratedCounselMgmt.csRegistrationPopup.msg.cnslProcCont',
        accpCont: 'integratedCounselMgmt.csRegistrationPopup.msg.accpCont',
        goodsNo: 'integratedCounselMgmt.csRegistrationPopup.msg.goodsNo',
        prmsDtm: 'integratedCounselMgmt.csRegistrationPopup.msg.prmsDtme',
        notiTmCd: 'integratedCounselMgmt.csRegistrationPopup.msg.notiTmCd',
        prmsMethCd: 'integratedCounselMgmt.csRegistrationPopup.msg.prmsMethCd',
        tel: 'integratedCounselMgmt.csRegistrationPopup.msg.tel',
        cnslMemo: 'integratedCounselMgmt.csRegistrationPopup.msg.cnslMemo',
        mvotAfAempId: 'integratedCounselMgmt.csRegistrationPopup.msg.mvotAfAempId',
        csMvotTypNo: 'integratedCounselMgmt.csRegistrationPopup.msg.csMvotTypNo',
        mvotReqCont: 'integratedCounselMgmt.csRegistrationPopup.msg.mvotReqCont',
        saveSuccess: 'adminCommon.message.saved.successfully',
        saveFail: 'adminCommon.message.saved.fail',
        canelQuestion: 'integratedCounselMgmt.csProcRegistrationPopup.msg.canelQuestion',
        ccnPrgsStatCdSuccess: 'integratedCounselMgmt.csRegistrationPopup.msg.ccnPrgsStatCdSuccess',
        obProcTypCd: 'integratedCounselMgmt.csProcRegistrationPopup.msg.obProcTypCd',
        oneToOne: 'integratedCounselMgmt.csProcRegistrationPopup.msg.oneToOne',
        afterCallNotSucc: 'integratedCounselMgmt.csProcRegistrationPopup.msg.afterCallNotSucc',
        afterTransNotSucc: 'integratedCounselMgmt.csProcRegistrationPopup.msg.afterTransNotSucc',
        afterCpnsNotSucc: 'integratedCounselMgmt.csProcRegistrationPopup.msg.afterCpnsNotSucc'
    }),

    // 초기화
    init : function () {
        this.bindButtonEvent();
        this.getObProcTypCd('20')
    },

    bindButtonEvent : function(){
        var self = this;

        //=============== 처리상태 =================
        $('input[name=ccnPrgsStatCd]').change(function(){
            var value = $(this).val();
            var code = '';

            //기처리
            if(value === '50'){
                code = '40';
            }else{
                code = value;
            }
            self.getObProcTypCd(code);
        })

        $(document).on("propertychange change keyup paste input",'.dataCont',function(){
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        //=============== 후속업무 =================
        $('.afterTask').change(function(){
            var el = "." + $(this).val();
            if($(this).is(":checked")){
                $('input:radio[name=ccnPrgsStatCd]:input[value="20"]').prop('checked',true);
                $('.tabs-area').show();
                $('.tabs-body').show();
                $(el).show();
                $(el).click();
            }else{
                $('.tabs').children().not(el).click();
                $(el).hide();
            }

            if(!$('#afterCall').is(":checked") && !$('#afterTransfer').is(":checked")){
                $('.tabs-area').hide();
                $('.tabs-body').hide();
            }
        })

        //=============== 예약/알람일시 =================
        $('#display-calendar').click(function() {
            showCalendar({
                type:'C', // C:해당 날짜 1개 선택
                format:'yyyy-MM-dd HH:mm',
                hour: new Date().getHours()+'',
                fn:function(pin) {
                    console.log(pin);
                    var nowTime = pin.today + ' ' + pin.hour1 + ':' + pin.min1;
                    var selectedTime = pin.yyyymmdd + ' ' + pin.hour + ':' + pin.min;
                    if(nowTime > selectedTime){
                        alert("현 시점 이후로 선택 가능합니다");
                        return false;
                    }
                    $('#prmsDtm').val(selectedTime);
                }
            });
        });

        //=============== 이관담당자 =================
        $('#btn-regist-user').click(function(){
            self.callUserPopup();
        })

        $('#btn-reset-user').click(function(){
            $('#mvotAfAempId').val('');
            $('#mvotAfAempNm').val('');
        })

        $('#csMvotTypNo').change(function(){
            var tmplMemo = $('#csMvotTypNo option:selected').attr("data-memo");
            console.log(tmplMemo);
            $('#mvotReqCont').val(tmplMemo);
        })

        $('#apply').click(function(){

            var form1 = $('#csCnslTypInfoForm');
            var form3 = $('#telForm');
            var form4 = $('#transferForm');
            var disabled1 = form1.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var disabled3 = form3.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var disabled4 = form4.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var form1Obj = form1.serializeObject();
            var form3Obj = form3.serializeObject();
            var form4Obj = form4.serializeObject();

            if(!self.saveValidation(form1Obj,form3Obj,form4Obj)){
                disabled1.attr('disabled','disabled');
                disabled3.attr('disabled','disabled');
                disabled4.attr('disabled','disabled');
                return false;
            }

            disabled1.attr('disabled','disabled')
            disabled3.attr('disabled','disabled')
            disabled4.attr('disabled','disabled')

            if(!confirm(_msg.confirmSaveMsg)){
                return false;
            }

            var obj = {};

            obj['ccnNo'] = processingDetails.ccnNo;

            Object.keys(form1Obj).forEach(function(key){
                obj[key] = form1Obj[key];
            })

            obj['cellNoYn'] = 'N';
            obj['afterCall'] = 'N';
            obj['afterTransfer'] = 'N';

            if($('#afterCall').is(':checked')) {
                obj['afterCall'] = 'Y';
                Object.keys(form3Obj).forEach(function (key) {
                    obj[key] = form3Obj[key];
                })

                cellPhoneList.forEach(function(data){
                    if(data.cd === form3Obj.telRgnNo){
                        obj['cellNoYn'] = 'Y';
                    }
                })
            }

            obj['emergMvotYn'] = $('#emergMvotYn').is(':checked') ? 'Y' : 'N';

            if($('#afterTransfer').is(':checked')) {
                obj['afterTransfer'] = 'Y';
                Object.keys(form4Obj).forEach(function (key) {
                    obj[key] = form4Obj[key];
                })
            }

            var registerCsProcCallback = function(res){
                if(res.succeeded){
                    alert(csProcRegistrationPopup.eventhandler.alertMessage.saveSuccess);
                    window.postMessage('succeeded', _baseUrl);
                    window.close();
                }else{
                    alert(csProcRegistrationPopup.eventhandler.alertMessage.saveFail);
                }
            };

            common.Ajax.sendJSONRequest(
                "POST"
                ,_baseUrl + "customerservice/integratedCounselMgmt.saveCounselProcess.do"
                ,obj
                ,registerCsProcCallback
            )
        })

        $('#close').click(function(){
            if (!confirm(self.alertMessage.canelQuestion)) {
                return;
            }
            window.close();
        })
    },
    getObProcTypCd : function(code){
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "common/getForwardCdCdNmFromStStdCdByGrpCdRef1Val.do",
            'code=CS014&referCode='+code,
            function ( result ) {
                if(result.succeeded){
                    $('#obProcTypCd option').not("[value='']").remove();

                    if(Object.keys(result.data).length === 0){
                        return;
                    }

                    result.data.CS014.forEach(function(item){
                        $('#obProcTypCd').append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                    });
                }
            });
    },
    callUserPopup : function(){
        var pin = {
            argSelectType: '1'
            , argWorkStatCd: '01'
            , argUseYn: 'Y'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자 조회'
            , _title: '사용자 조회'
            , left: 20
            , top: 20
            , width: 900
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupUserListCallback);
    },
    popupUserListCallback : function(e){
        var userData = JSON.parse(e.data);
        $('#mvotAfAempId').val(userData[0].userId);
        $('#mvotAfAempNm').val(userData[0].userNm);
    },
    saveValidation : function(form1Obj,form3Obj,form4Obj){

        //처리상태
        if(!$('input:radio[name=ccnPrgsStatCd]').is(':checked')){
            alert(this.alertMessage.ccnPrgsStatCd);
            $('input:radio[name=ccnPrgsStatCd]').focus();
            return false;
        }

        //처리유형
        //OB일때
        if(custCnslGbCd === '20') {
            if (form1Obj.obProcTypCd === undefined || form1Obj.obProcTypCd.trim() === '') {
                alert(this.alertMessage.obProcTypCd);
                $('#obProcTypCd').focus();
                return false;
            }
        }

        //처리내용
        var prgsStatCd = $('input:radio[name=ccnPrgsStatCd]:checked').val(); //처리상태
        if(prgsStatCd !== '10'){
            if(form1Obj.cnslProcCont === undefined || form1Obj.cnslProcCont.trim() === ''){
                alert(this.alertMessage.cnslProcCont);
                $('#cnslProcCont').focus();
                return false;
            }
        }

        //후속업무
        if(prgsStatCd !== '20'){
            if($('#afterCall').is(':checked') || $('#afterTransfer').is(':checked')){
                alert(this.alertMessage.ccnPrgsStatCdSuccess);
                return false;
            }
        }

        //전화약속
        if($('#afterCall').is(':checked')){
            //예약일시
            if(form3Obj.prmsDtm === ''){
                alert(this.alertMessage.prmsDtm);
                $('#prmsDtm').focus();
                return false;
            }

            //알림시간코드
            if(form3Obj.notiTmCd === ''){
                alert(this.alertMessage.notiTmCd);
                $('#notiTmCd').focus();
                return false;
            }

            //약속방식
            if(!$('input:radio[name=prmsMethCd]').is(':checked')){
                alert(this.alertMessage.prmsMethCd);
                $('input:radio[name=prmsMethCd]').focus();
                return false;
            }

            //전화번호는 필수값 입니다.
            if(form3Obj.telRgnNo===''){
                alert(this.alertMessage.tel);
                $('#telRgnNo').focus();
                return false;
            }

            if(form3Obj.telTxnoNo===''){
                alert(this.alertMessage.tel);
                $('#telTxnoNo').focus();
                return false;
            }

            if(form3Obj.telEndNo === ''){
                alert(this.alertMessage.tel);
                $('#telEndNo').focus();
                return false;
            }

            if(form3Obj.cnslMemo === ''){
                alert(this.alertMessage.cnslMemo);
                $('#cnslMemo').focus();
                return false;
            }

        }

        //업무이관
        if($('#afterTransfer').is(':checked')){
            if(form4Obj.mvotAfAempId === ''){
                alert(this.alertMessage.mvotAfAempId);
                $('#mvotAfAempId').focus();
                return false;
            }

            if(form4Obj.csMvotTypNo === ''){
                alert(this.alertMessage.csMvotTypNo);
                $('#csMvotTypNo').focus();
                return false;
            }

            if(form4Obj.mvotReqCont.trim() === ''){
                alert(this.alertMessage.mvotReqCont);
                $('#mvotReqCont').focus();
                return false;
            }
        }

        // 1:1 문의일경우 답변받은게 아니면
        if(processingDetails.accpTypCd === '20'){
            if(processingDetails.ansDtm === null || processingDetails.ansDtm === undefined){
                alert(this.alertMessage.oneToOne);
                return false;
            }
        }

        //전화약속 , 업무이관 , 보상 미완료일 경우 완료 처리 불가
        if(processingDetails.telYn === 'N'){
            if(prgsStatCd !== '20'){
                alert(this.alertMessage.afterCallNotSucc);
                return false;
            }
        }

        if(processingDetails.transYn === 'N'){
            if(prgsStatCd !== '20'){
                alert(this.alertMessage.afterTransNotSucc);
                return false;
            }
        }

        if(processingDetails.cpnsPayYn === 'N'){
            if(prgsStatCd !== '20'){
                alert(this.alertMessage.afterCpnsNotSucc);
                return false;
            }
        }

        return true;
    }

};
