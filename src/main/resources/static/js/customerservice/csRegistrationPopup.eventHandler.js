$.namespace("csRegistrationPopup.eventhandler");
csRegistrationPopup.eventhandler = {

    alertMessage : x2coMessage.getMessage( {
        inqmnNm: 'integratedCounselMgmt.csRegistrationPopup.msg.inqmnNm',
        cnslTypText: 'integratedCounselMgmt.csRegistrationPopup.msg.cnslTypText',
        custCnslGbCd: 'integratedCounselMgmt.csRegistrationPopup.msg.custCnslGbCd',
        accpTypCd: 'integratedCounselMgmt.csRegistrationPopup.msg.accpTypCd',
        ccnPrgsStatCd: 'integratedCounselMgmt.csRegistrationPopup.msg.ccnPrgsStatCd',
        custCnslGbCdIB: 'integratedCounselMgmt.csRegistrationPopup.msg.custCnslGbCdIB',
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
        ccnPrgsStatCdSuccess: 'integratedCounselMgmt.csRegistrationPopup.msg.ccnPrgsStatCdSuccess',
        noCnslProcContNoAfter: 'integratedCounselMgmt.csRegistrationPopup.msg.noCnslProcContNoAfter'
    }),

    // 초기화
    init : function () {
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

        //=============== 회원ID =================
        $('#btn-regist-memberId').click(function(){
            self.callMemberPopup();
        })

        $('#btn-reset-memberId').click(function(){
            $('.memberData').val('');
            $('.ordData').val('');
            $('.goodsData').val('');
        })

        $('input[name=noMember]').change(function(){
            $('.memberData').val('');
            if($(this).is(':checked')){
                $('#inqmnNm').attr("disabled",false);
                $('#mbrNo').val(noMemberNo);
            }else{
                $('#inqmnNm').attr("disabled",true);
            }
        })

        //=============== 주문정보 =================
        $('#btn-regist-ordNo').click(function(){
            alert('주문팝업 작업후 생산');
            self.callOrderPopup();
        })

        $('#btn-reset-ordNo').click(function(){
            $('.ordData').val('');
            $('.goodsData').val('');
        })


        //=============== 상품정보 =================
        $('#btn-regist-goodsNo').click(function(){
            if($('#ordNo').val() !== ''){
                return;
            }
            self.callGoodsPopup();
        })

        $('#btn-reset-goodsNo').click(function(){
            $('.goodsData').val('');
        })

        //=============== 상담유형 =================
        $('#btn-regist-cnslTypNo').click(function(){
            self.callCnslTypePopup();
        })

        $('#btn-reset-cnslTypNo').click(function(){
           $('.cnslLrgTypData').val('');
        })


        //=============== 상담구분 =================
        $('#custCnslGbCd').change(function(){
            var custCnslGbCd = $(this).val();

            //IB
            if(custCnslGbCd === '10'){
                $('input:radio[name=ccnPrgsStatCd]:input[value="20"]').prop('checked',true);
                $('input:radio[name=ccnPrgsStatCd]:input[value="10"]').attr('disabled',true);
            }else{
                $('input:radio[name=ccnPrgsStatCd]:input[value="10"]').attr('disabled',false).prop('checked',true);
            }

            //접수유형
            common.Ajax.sendRequest(
                "get",
                _baseUrl + "common/getForwardCdCdNmFromStStdCdByGrpCdRef1Val.do",
                'code=CS003&referCode='+custCnslGbCd,
                function ( result ) {
                    $('#accpTypCd').attr('disabled',false);

                    if(result.succeeded){
                        $('#accpTypCd option').not("[value='']").remove();
                        if(Object.keys(result.data).length === 0){
                            return;
                        }

                        result.data.CS003.forEach(function(item){
                            $('#accpTypCd').append($("<option value='"+item.cd+"'>"+item.cdNm+"</option>"));
                        });

                        if(custCnslGbCd === '10'){
                            $('#accpTypCd').val('10');
                            $('#accpTypCd').attr('disabled',true);
                        }
                    }
                });
        })

        $(document).on("propertychange change keyup paste input",'.dataCont',function(){
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        //=============== 후속업무 =================
        $('.afterTask').change(function(){

            if($('#cnslProcCont').val().trim() === ''){
                alert('처리내용 입력후 후속업무를 등록할수 있습니다')
               return false;
            }

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

            var form1 = $('#csCnslTypInfoForm1');
            var form2 = $('#csCnslTypInfoForm2');
            var form3 = $('#telForm');
            var form4 = $('#transferForm');
            var disabled1 = form1.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var disabled2 = form2.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var disabled3 = form3.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var disabled4 = form4.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var form1Obj = form1.serializeObject();
            var form2Obj = form2.serializeObject();
            var form3Obj = form3.serializeObject();
            var form4Obj = form4.serializeObject();

            if(!self.saveValidation(form1Obj,form2Obj,form3Obj,form4Obj)){
                disabled1.attr('disabled','disabled')
                disabled2.attr('disabled','disabled')
                disabled3.attr('disabled','disabled')
                disabled4.attr('disabled','disabled')
                return false;
            }

            disabled1.attr('disabled','disabled')
            disabled2.attr('disabled','disabled')
            disabled3.attr('disabled','disabled')
            disabled4.attr('disabled','disabled')

            if(!confirm(_msg.confirmSaveMsg)){
                return false;
            }

            var obj = {};

            Object.keys(form1Obj).forEach(function(key){
                obj[key] = form1Obj[key];
            })

            obj['accpMediaCd'] = '10';  //접수매체
            obj['cnslSubCd']   = '20';  //상담주체

            Object.keys(form2Obj).forEach(function(key){
                obj[key] = form2Obj[key];
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

            var registerCsCallback = function(res){
                if(res.succeeded){
                    alert(csRegistrationPopup.eventhandler.alertMessage.saveSuccess);
                    window.postMessage('succeeded', _baseUrl);
                    window.close();
                }else{
                    alert(csRegistrationPopup.eventhandler.alertMessage.saveFail);
                }
            };

            common.Ajax.sendJSONRequest(
                "POST"
                ,_baseUrl + "customerservice/integratedCounselMgmt.saveCounsel.do"
                ,obj
                ,registerCsCallback
            )
        })

        $('#close').click(function(){
            window.close();
        })
    },
    callMemberPopup : function(){
        var pin = {
              argSelectType: '1'
            , argMbrStatCd: ""
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
        popCommon(pin, POP_DATA, this.popupCallMbrCallback);
    },
    callOrderPopup : function(){
        var pin = {
            argSelectType: '1'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/goodsMgmtPopup.goodsListPopup.do'
            , winName: 'goodsListPopup'
            , title: '상품 조회'
            , _title: '상품 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupOrderCallback);
    },
    callGoodsPopup : function(){
        var pin = {
            argSelectType: '1'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/goodsMgmtPopup.goodsListPopup.do'
            , winName: 'goodsListPopup'
            , title: '상품 조회'
            , _title: '상품 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };

        popCommon(pin, POP_DATA, this.popupGoodsListCallback);
    },
    callCnslTypePopup : function(){
        var pin = {
            custCnslGbCd : ""
        };
        var POP_DATA = {
            url: _baseUrl + 'customerservice/counselingTypeMgmt.counselingTypeListPopup.do'
            , winName: 'popupCnslTypeListPopup'
            , title: '상담유형조회 팝업'
            , _title: '상담유형조회 팝업'
            , left: 20
            , top: 20
            , width: 800
            , height: 670
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupCnslTypeListCallback);
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
    popupCallMbrCallback : function(e){
        var mbrData = JSON.parse(e.data);
        $('#memberId').val(mbrData[0].loginId);
        $('#inqmnNm').val(mbrData[0].mbrNm);
        $('#mbrNo').val(mbrData[0].mbrNo);
    },
    popupOrderCallback : function(e){
        var goodsData = JSON.parse(e.data);
        $('#ordNo').val(goodsData[0].goodsNo);
    },
    popupGoodsListCallback : function(e){
        var goodsData = JSON.parse(e.data);
        $('#goodsNo').val(goodsData[0].goodsNo);
        $('#goodsNm').val(goodsData[0].goodsNm);
    },
    popupCnslTypeListCallback : function(e){
        var cnslType = JSON.parse(e.data);
        $('#cnslLrgTypNo').val(cnslType[0].cnslLrgTypNo);
        $('#cnslMidTypNo').val(cnslType[0].cnslMidTypNo);
        $('#cnslTypNo').val(cnslType[0].cnslSmlTypNo);
        $('#cnslTypText').val(cnslType[0].cnslLrgTypNm +'>'+ cnslType[0].cnslMidTypNm +'>' +cnslType[0].cnslSmlTypNm );

        if(cnslType[0].goodsSelMdtyYn === 'Y'){
            $('#goodsSelMdtyYn').val(cnslType[0].goodsSelMdtyYn);
            $('#cnslProcCont').val(cnslType[0].respBaseMemo);
        }
    },
    popupUserListCallback : function(e){
        var userData = JSON.parse(e.data);
        $('#mvotAfAempId').val(userData[0].userId);
        $('#mvotAfAempNm').val(userData[0].userNm);
    },
    saveValidation : function(form1Obj,form2Obj,form3Obj,form4Obj){

        //회원ID
        if(form1Obj.inqmnNm === undefined || form1Obj.inqmnNm === ''){
            alert(this.alertMessage.inqmnNm);
            $('#inqmnNm').focus();
            return false;
        }

        //상담유형
        if(form2Obj.cnslTypText === undefined || form2Obj.cnslTypText === ''){
            alert(this.alertMessage.cnslTypText);
            $('#cnslTypText').focus();
            return false;
        }

        //상담구분
        if(form2Obj.custCnslGbCd === undefined || form2Obj.custCnslGbCd === ''){
            alert(this.alertMessage.custCnslGbCd);
            $('#custCnslGbCd').focus();
            return false;
        }

        //접수유형
        if(form2Obj.accpTypCd === undefined || form2Obj.accpTypCd === ''){
            alert(this.alertMessage.accpTypCd);
            $('#accpTypCd').focus();
            return false;
        }

        //처리상태
        if(!$('input:radio[name=ccnPrgsStatCd]').is(':checked')){
            alert(this.alertMessage.ccnPrgsStatCd);
            $('input:radio[name=ccnPrgsStatCd]').focus();
            return false;
        }

        //IB일때 접수 상태 불가능 and 처리내용 필수
        if(form2Obj.custCnslGbCd === '10'){
            var ccnPrgsStatCd = $('input:radio[name=ccnPrgsStatCd]:checked').val();
            if(ccnPrgsStatCd === '10'){
                alert(this.alertMessage.custCnslGbCdIB);
                $('input:radio[name=ccnPrgsStatCd]').focus();
                return false;
            }
        }

        //처리상태가 접수가 아닌경우 처리내용은 필수
        var prgsStatCd = $('input:radio[name=ccnPrgsStatCd]:checked').val();
        if(prgsStatCd !== '10'){
            if(form2Obj.cnslProcCont === undefined || form2Obj.cnslProcCont.trim() === ''){
                alert(this.alertMessage.cnslProcCont);
                $('#cnslProcCont').focus();
                return false;
            }
        }

        //완료인경우 후속업무 등록 못함
        if(prgsStatCd === '40'){
            if($('#afterCall').is(':checked') || $('#afterTransfer').is(':checked')){
                alert(this.alertMessage.ccnPrgsStatCdSuccess);
                return false;
            }
        }

        //처리내용이 없는데 후속업무를 선택했을떄
        if(form2Obj.cnslProcCont === undefined || form2Obj.cnslProcCont.trim() === ''){
            if($('#afterCall').is(':checked') || $('#afterTransfer').is(':checked')){
                alert(this.alertMessage.noCnslProcContNoAfter);
                return false;
            }
        }


        if(form2Obj.accpCont === undefined || form2Obj.accpCont.trim() === ''){
            alert(this.alertMessage.accpCont);
            $('#accpCont').focus();
            return false;
        }

        if(form2Obj.goodsSelMdtyYn === 'Y'){
            if(form1Obj.goodsNo === ''){
                alert(this.alertMessage.goodsNo);
                $('#goodsNo').focus();
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

        return true;
    }

};
