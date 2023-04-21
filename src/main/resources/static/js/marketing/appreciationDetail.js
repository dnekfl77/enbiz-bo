var col = x2coMessage.getMessage( {
    buyPrice   : "appreciationEventMgmt.appreciate.form.label.buy.price",    // 구매금액
    paymentGift   : "appreciationEventMgmt.appreciate.form.label.payment.gift",    // 지급사은품
    giftMessage   : "appreciationEventMgmt.appreciate.form.label.gift.message",    // 증정메시지
    priceMark : "adminCommon.label.price.mark",  // 원
    more : "appreciationEventMgmt.appreciate.form.label.more",  // 이상
    add : "adminCommon.button.add",//추가
    delete : "adminCommon.button.delete",//삭제
    deleteMsg : "adminCommon.alert.delete",//삭제하시겠습니까?
    saveMsg : "adminCommon.alert.save",//저장하시겠습니까?
    predateStartDateMsg : "adminCommon.message.current.predate.startdate",//현재보다 이전 일자 입니다.[시작일]
    predateEndDateMsg : "adminCommon.message.current.predate.enddate",//현대보다 이전 일자입니다.[종료일]
    aeNmMsg : "appreciationEventMgmt.ae.message.aeNm", // 사은행사명은 필수값입니다!
	aeEvtTypeMsg : "appreciationEventMgmt.ae.message.aeEvtType", // 사은행사유형은 필수값입니다!
	aeEvtStatusMsg : "appreciationEventMgmt.ae.message.aeEvtStatus", // 사은행사상태는 필수값입니다!
	aeDescMsg : "appreciationEventMgmt.ae.message.aeDesc", // 사은행사설명은 필수값입니다!
	aeMediaMsg : "appreciationEventMgmt.ae.message.aeMedia", // 적용매체는 필수값입니다!
	aeMbrTypeMsg : "appreciationEventMgmt.ae.message.aeMbrType", // 대상회원은 필수값입니다!
	buyPriceRequireMsg : "appreciationEventMgmt.ae.message.buy.price.require", // 구매금액은 필수값입니다!
	applyTargetRequireMsg : "appreciationEventMgmt.ae.message.apply.target.require", // 적용대상은 필수값입니다!
	applyTargetGoodsRequireMsg : "appreciationEventMgmt.ae.message.apply.target.goods.require", // 사은행사유형이 상품사은품인 경우 적용대상 상품은 필수값입니다!
	eventNotDeleteMsg : "appreciationEventMgmt.ae.message.ing.appreciation.event.not.delete", // 이미 진행중인 사은행사는 삭제 할 수 없습니다!
	deleteSuccessMsg : "adminCommon.message.deleted.successfully", // 삭제되었습니다.
	paymentGiftRequire : "appreciationEventMgmt.ae.message.payment.gift.require" // 지급사은품 필수값입니다!
});

appreciationDetail = {

    conditionText : '<div class="input-group block contidition-block">\n' +
        '  <span class="tit">'+col.buyPrice+'</span>\n' +
        '  <input type="text" id="minAmt" class="price input w20" numberOnly><em>'+col.priceMark+' '+col.more+'</em>\n' +
        '  <span class="tit">'+col.paymentGift+'</span>\n' +
        '  <input type="text" id="goodsNm" class="input disabled w20" readonly>\n' +
        '  <input type="hidden" id="goodsNo" value="">\n' +
        '  <a href="javascript:;" class="button small" id="btn-call-goods"><i class="icon-sarch"></i></a>\n' +
        '  <a href="javascript:;" class="icon-data-plus condition-plus">'+col.add+'</a>\n' +
        '  <a href="javascript:;" class="icon-data-minus">'+col.delete+'</a>\n' +
        '</div>'
    ,

    // 초기화
    init : function () {
        this.calendarInit();
        this.bindData();
        this.bindEvent();
        this.possibleChangeTag();
    },
    bindEvent : function(){
        var that = this;

        // (+) 버튼
        $(document).on("click",".condition-plus",function(){
            if($(".contidition-block").length < 10) {
                $(this).parent().after(that.conditionText);
            }
        });

        // (-) 버튼
        $(document).on("click",".icon-data-minus",function(){
            $(this).parent().detach();
        });

        $(document).on("click",".target-init",function(){
            $(this).parents('.add').prev().children("li").remove();
        });

        $(document).on("click",".target-delete",function(){
            if(confirm(col.deleteMsg)){
                $(this).closest('li').remove();
            }
        });

        //지급사은품 등록
        $(document).on("click","#btn-call-goods",function(){
            that.callEventGoodsPopup($(this));
        });

        //숫자만 입력
        $(document).on("keyup","input:text[numberOnly]",function(){
            $(this).val($(this).val().replace(/[^0-9]/g,""));
        });


        // 사은행사유형
        $('#select-event-type').change(function(){
            if($(this).val() === '10'){ //구매금액사은품
                $('#apply-stdgoods-tr').show();
                $('#apply-category-tr').show();
                $('#apply-brand-tr').show();
                $('#apply-entr-tr').show();
                $('#apply-channel-tr').show();
                $('#except-target-form').show();
            }else{  // 상품사은품
                $('#apply-stdgoods-tr').hide();
                $('#apply-category-tr').hide();
                $('#apply-brand-tr').hide();
                $('#apply-entr-tr').hide();
                $('#apply-channel-tr').hide();
                $('#except-target-form').hide();
            }
        });


        //저장버튼시
        $('#appreciation-manage-save').click(function(){
            if(!that.appreciationValidation()){
                return;
            }

            if(!confirm(col.saveMsg)){
                return false;
            }

            that.appreciationSave();
        });

        //사은행사기간 선택시
        $('#display-calendar').click(function() {
            var initDate = new Date();
            var hours = initDate.getHours() < 10 ? '0'+initDate.getHours():initDate.getHours();
            var minute = initDate.getMinutes() < 10 ? '0'+initDate.getMinutes():initDate.getMinutes();
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd HH:mm',
                yyyymmdd1:$('#disp-start-date').val(),
                yyyymmdd2:$('#disp-end-date').val(),
                hour1:hours,
                hour2:'23',
                min1:minute,
                min2:'59',
                max_term:90,
                fn:function(pin) {
                    var date = new Date();
                    var toDay = date.getFullYear() + '' + ((date.getMonth() < 9) ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + date.getDate();
                    var pinDay1 = (pin.yyyymmdd1).split("-").join("");
                    var pinDay2 = (pin.yyyymmdd2).split("-").join("");
                    var _dispStrtDtime = $('#disp-start-date').val().replace(/-/gi,"").substring(0,8);
                    var _dispEndDtime = $('#disp-end-date').val().replace(/-/gi,"").substring(0,8);
                    if(_dispStrtDtime != pinDay1){
                        if(pinDay1 < toDay){
                            $('#_Calendar_LAYER').hide();
                            alert(col.predateStartDateMsg); //현재보다 이전 일자입니다.[시작일]
                            return false;
                        }
                    }
                    if(_dispEndDtime != pinDay2){
                        if(pinDay2 < toDay){
                            $('#_Calendar_LAYER').hide();
                            alert(col.predateEndDateMsg); //현재보다 이전 일자입니다.[종료일]
                            return false;
                        }
                    }

                    $('#disp-start-date').val(pin.yyyymmdd1 + " " + pin.hour1 + ":" + pin.min1);
                    $('#disp-end-date').val(pin.yyyymmdd2 + " " + pin.hour2 + ":" + pin.min2);
                }
            });
        });

        //지급기간
        $('#use-period-calendar').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#pay-start-date').val(),
                yyyymmdd2:$('#pay-end-date').val(),
                max_term:90,
                fn:function(pin) {
                    var date = new Date();
                    var toDay = date.getFullYear() + '' + ((date.getMonth() < 9) ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + date.getDate();
                    var pinDay1 = (pin.yyyymmdd1).split("-").join("");
                    var pinDay2 = (pin.yyyymmdd2).split("-").join("");
                    var _dispStrtDtime = $('#pay-start-date').val().replace(/-/gi,"").substring(0,8);
                    var _dispEndDtime = $('#pay-end-date').val().replace(/-/gi,"").substring(0,8);
                    if(_dispStrtDtime != pinDay1){
                        if(pinDay1 < toDay){
                            $('#_Calendar_LAYER').hide();
                            alert(col.predateStartDateMsg); //현재보다 이전 일자입니다.[시작일]
                            return false;
                        }
                    }
                    if(_dispEndDtime != pinDay2){
                        if(pinDay2 < toDay){
                            $('#_Calendar_LAYER').hide();
                            alert(col.predateEndDateMsg); //현재보다 이전 일자입니다.[종료일]
                            return false;
                        }
                    }
                    $('#pay-start-date').val(pin.yyyymmdd1);
                    $('#pay-end-date').val(pin.yyyymmdd2);
                }
            });
        });

       

        //전체 초기화
        $('#apply-clear-all').click(function(){
            $('.quick-search ul').empty();
        });


        //적용매체 전체 선택시
        $("input[name=apply-media-all]").click(function(){
            if($("input[name=apply-media-all]").prop("checked")){
                $("input[name=apply-media]").prop("checked",true);
            }else{
                $("input[name=apply-media]").prop("checked",false);
            }
        })

        //특정시간대 클릭시
        $("#specific-time").click(function(){
            if($("#specific-time").prop("checked")){
                $("select[name=time-coupon-hm]").attr('disabled',false);
            }else{
                $("select[name=time-coupon-hm]").attr('disabled',true);
            }
        })

        //=========적용대상 클릭시=========
        //사이트
        $("#apply-site").click(function(){
            that.callSitePopup();
        })

        //상품
        $("#apply-goods").click(function(){
            that.callGoodsPopup();
        })
        //표준상품분류
        $("#apply-stdGoods").click(function(){
            that.callStdGoodsPopup();
        })

        //전시카테고리
        $("#apply-category").click(function(){
            that.callCategoryPopup();
        })

        //브랜드
        $("#apply-brand").click(function(){
            that.callBrandPopup();
        })

        //협력사
        $('#apply-entr').click(function(){
            that.callEntrPopup();
        })

        $('#apply-channel').click(function(){
            that.callChannelPopup();
        })

        //=========제외대상 클릭시=========
        //상품
        $("#except-goods").click(function(){
            that.callGoodsPopup("except");
        })

        //표준상품분류
        $("#except-stdGoods").click(function(){
            that.callStdGoodsPopup("except");
        })

        //삭제 눌렀을경우
        $('#appreciation-manage-delete').click(function(){
            that.appreciationDelete();
        });

        //닫기버튼 눌렸을경우
        $('#appreciation-manage-close').click(function(){
            window.close();
        });


    },
    bindData : function(){
        var self = this;

        if(appreciation==null){
            return;
        }

        //=======적용매체=======
        var mediaList = appreciation.aplyPsbMediaCd;
        if(mediaList.length===3){
            $("input[name=apply-media-all]").prop("checked",true);
        }

        for(var media of mediaList){
            var that = media;
            $("input[name=apply-media]").each(function(){
                if($(this).val() === that){
                    $(this).prop("checked",true);
                }
            })
        }

        //=======행사조건=======
        var tmEvtYn = appreciation.tmEvtYn;
        if(tmEvtYn==='Y'){
            $('#specific-time').prop("checked",true);
            $("select[name=time-coupon-hm]").attr('disabled',false);
            var aplyStrTm = appreciation.aplyStrTm;
            var aplyEndTm = appreciation.aplyEndTm;
            $("#use-start-hours").val(aplyStrTm.substring(0,2));
            $("#use-start-minute").val(aplyStrTm.substring(2,4));
            $("#use-end-hours").val(aplyEndTm.substring(0,2));
            $("#use-end-minute").val(aplyEndTm.substring(2,4));
        }

        var aeFvrInfoLength = appreciation.aeFvrInfo.length;
        for(var i=0;i<aeFvrInfoLength;i++) {
                if(i !== 0) {
                    $('.contidition-block:last').after(self.conditionText);
                }
                $('.contidition-block:last').children('#minAmt').val(appreciation.aeFvrInfo[i].aplyMinAmt);
                $('.contidition-block:last').children('#goodsNm').val(appreciation.aeFvrInfo[i].goodsNm);
                $('.contidition-block:last').children('#goodsNo').val(appreciation.aeFvrInfo[i].goodsNo);
        }

        // 사은행사유형
        if($('#select-event-type').val() === '20'){
            $('#apply-stdgoods-tr').hide();
            $('#apply-category-tr').hide();
            $('#apply-brand-tr').hide();
            $('#apply-entr-tr').hide();
            $('#apply-channel-tr').hide();
            $('#except-target-form').hide();
        }

        this.addTargetUI("#apply-site-ul", appreciation.aplySites);
        this.addTargetUI("#apply-goods-ul", appreciation.aplyGoods);
        this.addTargetUI("#apply-stdgoods-ul", appreciation.aplyStdGoods);
        this.addTargetUI("#apply-category-ul", appreciation.aplyCategory);
        this.addTargetUI("#apply-brand-ul", appreciation.aplyBrand);
        this.addTargetUI("#apply-entr-ul", appreciation.aplyEntr);
        this.addTargetUI("#apply-channel-ul", appreciation.aplyChannel);
        this.addTargetUI("#except-goods-ul", appreciation.exceptGoods);
        this.addTargetUI("#except-stdGoods-ul", appreciation.exceptStdGoods);

    },
    possibleChangeTag : function(){
        var that = this;
        // 전시시작 > 오늘 ? 태그 비활성화 : continue ~
        if(appreciation==null) {
            return;
        }

        //비활성화
        if(!this.possibleChangeAppreciationValidate()){
            $('input').attr("disabled",true);
            $('select').attr("disabled",true);
            $("a").unbind();
            $("span").unbind();
            $(document).off("click",".target-delete");
            $(document).off("click",".target-init");
            $(document).off("click",".condition-plus");
            $(document).off("click",".icon-data-minus");
            $(document).off("click","#btn-call-goods");

            //사은행사 상태 , 삭제 , 저장 , 취소 버튼만 활성화
            $('#select-event-status').attr("disabled",false);

            $('#appreciation-manage-delete').click(function(){
                that.appreciationDelete();
            });

            $('#appreciation-manage-save').click(function(){
                if(!that.appreciationValidation()){
                    return;
                }

                if(!confirm(col.saveMsg)){
                    return;
                }

                that.appreciationSave();
            });

            $('#appreciation-manage-close').click(function(){
                window.close();
            });
        }

    },
    calendarInit : function(){
        if(appreciation!=null) {
            return;
        }

        var initFromAndToCalDate = recentlyCalenderData(-30);
        //전시기간 달력
        var initDate = new Date();
        var hours = initDate.getHours() < 10 ? '0'+initDate.getHours():initDate.getHours();
        var minute = initDate.getMinutes() < 10 ? '0'+initDate.getMinutes():initDate.getMinutes();
        $("#disp-start-date").val(initFromAndToCalDate[1]+" "+hours+":"+minute);
        $("#disp-end-date").val(initFromAndToCalDate[0]+" 23:59");

    },
    possibleChangeAppreciationValidate : function(){
        //쿠폰 변경할수 있는지 Check func
        //202103101315
        var dispData = replaceCalendarString($("#disp-start-date").val()).replace(/:/g,"").replace(/(\s*)/g,"");
        var date = new Date();
        var deleteHours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
        var deleteMinute =  date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
        var today= recentlyCalenderData(0)[1].replace(/-/g,"") + deleteHours + deleteMinute;

        if(dispData < today){
            return false;
        }
        return true;
    },
    appreciationValidation : function(){
        //쿠폰 저장전 Validation func
        //"=========기본정보========="
        if($("#aeNm").val().trim() === ''){
            alert(col.aeNmMsg);
            $("#aeNm").focus();
            return false;
        }

        if($("#select-event-type").val() === ''){
            alert(col.aeEvtTypeMsg);
            $("#select-event-type").focus();
            return false;
        }

        if($("#select-event-status").val() === ''){
            alert(col.aeEvtStatusMsg);
            $("#select-event-status").focus();
            return false;
        }

        if($("#text-event-desc").val().trim() === '') {
            alert(col.aeDescMsg);
            $("#text-event-desc").focus();
            return false;
        }


        //"=========사은행사 지급설정========"

        var medialength = $("input[name=apply-media]:checked").length;
        if(medialength === 0){
            alert(col.aeMediaMsg);
            $("input[name=apply-media]").focus();
            return false;
        }


        if ($("#select-mbr-type").val() === '') {
            alert(col.aeMbrTypeMsg);
            $("#select-mbr-type").focus();
            return false;
        }

        var check = false;
        $(".contidition-block").each(function(){
            var minAmt = $(this).children('#minAmt');
            var goodsNm = $(this).children('#goodsNm');

            if( minAmt.val() === undefined || minAmt.val() === '' ){
                alert(col.buyPriceRequireMsg);
                minAmt.focus();
                check = true;
                return false;
            }

            if( goodsNm.val() === undefined || goodsNm.val() === '' ){
                alert(col.paymentGiftRequire);
                goodsNm.focus();
                check = true;
                return false;
            }
        })

        //each문 제어하기 위함
        if(check){
           return;
        }

        var aeType = $('#select-event-type').val();
        // 10 : 구매금액사은품 , 20 : 상품사은품
        if(aeType === '10'){
            if($("#apply-target-form").find('li').length === 0){
                alert(col.applyTargetRequireMsg);
                return false;
            }
        }else if(aeType === '20'){
            if($("#apply-goods-tr").find('li').length === 0){
                alert(col.applyTargetGoodsRequireMsg);
                return false;
            }
        }

        return true;
    },
    appreciationSave : function(){
        var thisForm = $('#appreciation-form');
        var disabled = thisForm.find(':input:disabled',':select:disabled').removeAttr('disabled');
        var thisFormObject = thisForm.serializeObject();

        //=============사은행사 지급설정=============//
        //- 사은행사기간
        thisFormObject.aeStrDtm = replaceCalendarString($("#disp-start-date").val()).replace(/:/g,"").replace(/(\s*)/g,"");//사은행사종료기간
        thisFormObject.aeEndDtm = replaceCalendarString($("#disp-end-date").val()).replace(/:/g,"").replace(/(\s*)/g,""); //사은행사종료기간

        //- 지급기간
        thisFormObject.payStrDt = replaceCalendarString($("#pay-start-date").val());//지급시작기간
        thisFormObject.payEndDt = replaceCalendarString($("#pay-end-date").val()); //지급종료기간


        //- 적용매체
        var mediaArray = [];
        $("input[name=apply-media]:checked").each(function(){
            mediaArray.push($(this).val());
        })
        thisFormObject.aplyPsbMediaCd = mediaArray;

        //- 특정시간대
        thisFormObject.tmEvtYn = $("#specific-time").is(":checked")? "Y" : "N";

        //- 특정시간대
        thisFormObject.aplyStrTm = $('#use-start-hours').val() + $('#use-start-minute').val();
        thisFormObject.aplyEndTm = $('#use-end-hours').val()   + $('#use-end-minute').val();


        //행사조건
        var aeFvrInfoList = []
        $('.contidition-block').each(function(){
            var goodsNo = $(this).children('#goodsNo').val()
            var minAmt = $(this).children('#minAmt').val()
            aeFvrInfoList.push({goodsNo:goodsNo,minAmt:minAmt});
        })
        thisFormObject.aeFvrInfo = aeFvrInfoList;

        //=============적용대상=============//
        //사이트
        var applySite = [];
        $("#apply-site-ul").children().each(function(){
            applySite.push($(this).attr('dataName'));
        })
        thisFormObject.aplySites = applySite;

        var applyGoods = [];
        $("#apply-goods-ul").children().each(function(){
            applyGoods.push($(this).attr('dataName'));
        })
        thisFormObject.aplyGoods = applyGoods;

        var applyStdGoods = [];
        $("#apply-stdgoods-ul").children().each(function(){
            applyStdGoods.push($(this).attr('dataName'));
        })
        thisFormObject.aplyStdGoods = applyStdGoods;

        var applyCategory = [];
        $("#apply-category-ul").children().each(function(){
            applyCategory.push($(this).attr('dataName'));
        })
        thisFormObject.aplyCategory = applyCategory;

        var applyBrand = [];
        $("#apply-brand-ul").children().each(function(){
            applyBrand.push($(this).attr('dataName'));
        })
        thisFormObject.aplyBrand = applyBrand;

        var applyEntr = [];
        $('#apply-entr-ul').children().each(function(){
            applyEntr.push($(this).attr('dataName'));
        })
        thisFormObject.aplyEntr = applyEntr;

        var applyChannel = [];
        $('#apply-channel-ul').children().each(function(){
            applyChannel.push($(this).attr('dataName'));
        })
        thisFormObject.aplyChannel = applyChannel;

        //=========제외대상 클릭시=========
        //상품
        var exceptGoods = [];
        $("#except-goods-ul").children().each(function(){
            exceptGoods.push($(this).attr('dataName'));
        })
        thisFormObject.exceptGoods = exceptGoods;

        //표준상품분류
        var exceptStdGoods = [];
        $("#except-stdGoods-ul").children().each(function(){
            exceptStdGoods.push($(this).attr('dataName'));
        })
        thisFormObject.exceptStdGoods = exceptStdGoods;


        //=============제외대상=============//
        var registerPromotionCallback = function(res){
            if(res.succeeded){
                window.postMessage('succeeded', _baseUrl);
                window.close();
            }
        };


        delete thisFormObject['apply-media-all'];
        delete thisFormObject['apply-media'];
        delete thisFormObject['apply-day'];
        delete thisFormObject['benefit-period'];
        delete thisFormObject['time-coupon-hm'];
        delete thisFormObject['discount-amt-rate'];

        //전송 전
        disabled.attr('disabled','disabled')
        var param = JSON.stringify(thisFormObject);
        common.Ajax.sendJSONRequest("POST"
            , _baseUrl + "marketing/appreciationEventMgmt.saveAppreciation.do"
            , param
            , registerPromotionCallback
            , true
            ,"application/json;charset=UTF-8"
        );
    },
    appreciationDelete : function(){
        //202103101315
        if(!this.possibleChangeAppreciationValidate()){
            alert(col.eventNotDeleteMsg);
            return false;
        }

        if(!confirm(col.deleteMsg)){
            return false;
        }

        var deleteAppreciationCallBack = function(data){
            var deleteResult = JSON.parse(data);
            if(deleteResult.succeeded){
                alert(col.deleteSuccessMsg);
                window.postMessage('succeeded', _baseUrl);
                window.close();
            }
        }
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "marketing/appreciationEventMgmt.deleteAppreciation.do",
            {aeNo: $("#aeNo").val()},
            deleteAppreciationCallBack,true)
    },
    callEventGoodsPopup : function(target){

        var callEventGoodsPopupCallBack = function(e){
            var goodsData = JSON.parse(e.data);
            target.siblings('#goodsNm').val(goodsData[0].goodsNm);
            target.siblings('#goodsNo').val(goodsData[0].goodsNo);
        }

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
        popCommon(pin, POP_DATA, callEventGoodsPopupCallBack);


    },
    callSitePopup : function(){
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'popup/siteManagement.siteListPopup.do'
            , winName: 'siteListPopup'
            , title: '사이트 조회'
            , _title: '사이트 조회'
            , left: 20
            , top: 20
            , width: 370
            , height: 500
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupSiteListCallback);
    },
    callGoodsPopup : function(target){
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

        popCommon(pin, POP_DATA, target==='except'? this.popupGoodsListExceptCallback : this.popupGoodsListCallback);
    },
    callStdGoodsPopup : function(target){
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'popup/standardCategory.prStdCtgListPopup.do'
            , winName: 'prStdCtgListPopup'
            , title: '표준상품 조회'
            , _title: '표준상품 조회'
            , left: 20
            , top: 20
            , width: 400
            , height: 500
            , scrollbars: false
            , autoresize: false
        };

        popCommon(pin, POP_DATA, target==='except'? this.popupStdGoodsExceptCallback : this.popupStdGoodsCallback);
    },
    callCategoryPopup : function(){
        var pin = {
            argSelectType: '1'
            , argWorkStatCd: '01'
            , argUseYn: 'Y'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/displayCategoryMgmtPopup.displayCategoryTreeListPopup.do'
            , winName: 'displayCategoryTree'
            , title: '전시카테고리 조회'
            , _title: '전시카테고리 조회'
            , left: 20
            , top: 20
            , width: 300
            , height: 400
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupDisplayCateTreeCallback);
    },
    callBrandPopup : function(){
        var pin = {
            argSelectType: '1'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/brandMgmt.brandListPopup.do'
            , winName: 'brandListPopup'
            , title: '브랜드 조회'
            , _title: '브랜드 조회'
            , left: 20
            , top: 20
            , width: 790
            , height: 590
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupBrandListCallback);
    },
    callEntrPopup : function(){
        var pin = {
            argSelectType: '1'
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/enteranceMgmt.etEntrBaseListPopup.do'
            , winName: 'etEntrBaseListPopup'
            , title: '협력사 조회'
            , _title: '협력사 조회'
            , left: 20
            , top: 20
            , width: 741
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupEntrBaseListCallback);
    },
    callChannelPopup : function(){
        var pin = {
            argSelectType: '1',
            argChlClssCd:''
        };
        var POP_DATA = {
            url: _baseUrl + 'channel/channelMgmt.channelList.do'
            , winName: 'channelList'
            , title: '채널 조회'
            , _title: '채널 조회'
            , left: 20
            , top: 20
            , width: 750
            , height: 550
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupChannelListCallback);
    },
    addTargetUI : function(targetUl,list){
        if(list.length>0) {
            var liList = $(targetUl).children('li');
            var keyArray = [];
            liList.each(function(){
               keyArray.push($(this).attr('dataName'));
            });

            for (var targetData of list) {

                if(targetData.key === '' || targetData.data === ''){
                    continue;
                }

                if(keyArray.includes(targetData.key)){
                    continue;
                }
                var data = '<li class="btt" dataName="' + targetData.key + '"><a onClick="" class="link">' + targetData.data + '</a><a onClick="" class="delete2 target-delete"></a></li>'
                $(targetUl).append(data);
            }
        }
    },
    popupSiteListCallback : function(e){
        //사이트 조회
        var siteData = JSON.parse(e.data);
        var popupData = [{ key : siteData.siteNo , data : siteData.siteNm}];
        appreciationDetail.addTargetUI("#apply-site-ul",popupData);
    },
    popupGoodsListCallback : function(e){
        //상품조회
        var goodsData = JSON.parse(e.data);
        var popupData = [{ key : goodsData[0].goodsNo , data : goodsData[0].goodsNm}];
        appreciationDetail.addTargetUI("#apply-goods-ul",popupData);
    },
    popupStdGoodsCallback : function(e){
        //표준상품 조회 콜백
        var stdGoodsData = JSON.parse(e.data);
        var popupData = [{ key : stdGoodsData.stdCtgNo , data : stdGoodsData.stdCtgNm}];
        appreciationDetail.addTargetUI("#apply-stdgoods-ul",popupData);
    },
    popupDisplayCateTreeCallback : function(e){
        //전시 카테고리
        var categoryData = JSON.parse(e.data);
        var popupData = [{ key :  categoryData[0].dispCtgNo , data : categoryData[0].hierarchyNm}];
        appreciationDetail.addTargetUI("#apply-category-ul",popupData);
    },
    popupBrandListCallback : function(e){
        //브랜드 조회 콜백
        var brandData = JSON.parse(e.data);
        var popupData = [{ key : brandData[0].brandNo , data : brandData[0].brandNm}];
        appreciationDetail.addTargetUI("#apply-brand-ul",popupData);
    },
    popupEntrBaseListCallback : function(e){
        //협력사 조회 콜백
        var entrData = JSON.parse(e.data);
        var popupData = [{ key : entrData[0].entrNo , data : entrData[0].entrNm}];
        appreciationDetail.addTargetUI("#apply-entr-ul",popupData);
    },
    popupChannelListCallback : function(e){
        //채널 조회 콜백
        var channelData = JSON.parse(e.data);
        var popupData = [{ key : channelData[0].chlNo , data : channelData[0].chlNm}];
        appreciationDetail.addTargetUI("#apply-channel-ul",popupData);
    },

    popupGoodsListExceptCallback : function(e){
        //상품조회
        var goodsData = JSON.parse(e.data);
        var popupData = [{ key : goodsData[0].goodsNo , data : goodsData[0].goodsNm}];
        appreciationDetail.addTargetUI("#except-goods-ul",popupData);
    },
    popupStdGoodsExceptCallback : function(e){
        //표준상품 조회 콜백
        var stdGoodsData = JSON.parse(e.data);
        var popupData = [{ key : stdGoodsData.stdCtgNo , data : stdGoodsData.stdCtgNm}];
        appreciationDetail.addTargetUI("#except-stdGoods-ul",popupData);
    }
};
