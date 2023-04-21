var alertMessage = x2coMessage.getMessage( {
    couponNm       : 'couponMgmt.error.msg.couponNmMsg',
    couponType     : 'couponMgmt.error.msg.couponTypeMsg',
    couponStatus   : 'couponMgmt.error.msg.couponStatusMsg',
    promoDesc      : 'couponMgmt.error.msg.promoDescMsg',
    issusubcd      : 'couponMgmt.error.msg.issusubcdMsg',
    restrictCount  : 'couponMgmt.error.msg.restrictCountMsg',
    applyMedia     : 'couponMgmt.error.msg.applyMediaMsg',
    issuedDays     : 'couponMgmt.error.msg.issuedDaysMsg',
    fromPeriod     : 'couponMgmt.error.msg.fromPeriodMsg',
    applyDay       : 'couponMgmt.error.msg.applyDayMsg',
    useHours       : 'couponMgmt.error.msg.useHoursMsg',
    discountAmtAndRate : 'couponMgmt.error.msg.discountAmtAndRateMsg',
    discountMaxDcAmt   : 'couponMgmt.error.msg.discountMaxDcAmtMsg',
    discountAmt    : 'couponMgmt.error.msg.discountAmtMsg',
    discountRate   : 'couponMgmt.error.msg.discountRateMsg',
    target         : 'couponMgmt.error.msg.targetMsg',
    minBuyAmt      : 'couponMgmt.error.msg.minBuyAmtMsg',
    minBuyAmtLimit : 'couponMgmt.error.msg.minBuyAmtLimitMsg',
    saveMsg : 'adminCommon.grid.alert.save',
    deleteMsg : 'adminCommon.grid.alert.delete',
    predateStartdateMsg : 'adminCommon.message.current.predate.startdate',
    predateEnddateMsg : 'adminCommon.message.current.predate.enddate',
    ingCouponNotDeleteMsg : 'couponMgmt.error.msg.ingCouponNotDelete',
    deleteComplateMsg : 'adminCommon.message.deleted.successfully'
});

couponDetail = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.bindData();
        this.bindEvent();
        this.possibleChangeTag();
    },
    bindEvent : function(){
        var that = this;

        $("#li-tab1").click(function(){
            $("#li-tab1").addClass('active')
            $("#li-tab2").removeClass('active')
            $("#tab-cont1").show();
            $("#tab-cont2").hide();
        });

        $("#li-tab2").click(function(){
            $("#li-tab1").removeClass('active')
            $("#li-tab2").addClass('active')
            $("#tab-cont1").hide();
            $("#tab-cont2").show();
            cpnMbrGrid.eventhandler.grid.resetSize();
        });

        $(document).on("click",".target-delete",function(){
            if(confirm(alertMessage.deleteMsg)){
                $(this).closest('li').remove();
            }
        });

        $(document).on("click",".target-init",function(){
            $(this).parents('.add').prev().children("li").remove();
        });

        //저장버튼시
        $('#coupon-manage-save').click(function(){
            if(!that.couponValidation()){
               return;
            }

            if(!confirm(alertMessage.saveMsg)){
                return;
            }

            that.couponSave();
        });
        
        //쿠폰유형 변경시
        $('#form-select-coupon-type').change(function(){
            // 무료배송 , 무료반품 쿠폰일경우
            // 1. 적용대상 ,제외대상 제외 ( UI 제거 )
            // 2. 할인유형 정액 and 할인금액 설정X and 최대할인금액 설정X
            if($(this).val() === '14' || $(this).val() === '15'){
                $('#apply-target-form').hide();
                $('#except-target-form').hide();
                $("input[name=discount-amt-rate][value='01']").prop('checked',true);
                $("input[name=discount-amt-rate]").attr('disabled',true);
                $('#discount-amtandrate').attr('disabled',true).val('');
                $('#discount-maxdcamt').attr('disabled',true).val('');

            }else{
                $('#apply-target-form').show();
                $('#except-target-form').show();
                $("input[name=discount-amt-rate]").attr('disabled',false);
                $('#discount-amtandrate').attr('disabled',false);
                $('#discount-maxdcamt').attr('disabled',false);
            }
        });

        //전시기간 선택시
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
                            alert(alertMessage.predateStartdateMsg); //현재보다 이전 일자입니다.[시작일]
                            return false;
                        }
                    }
                    if(_dispEndDtime != pinDay2){
                        if(pinDay2 < toDay){
                            $('#_Calendar_LAYER').hide();
                            alert(alertMessage.predateEnddateMsg); //현재보다 이전 일자입니다.[종료일]
                            return false;
                        }
                    }

                    $('#disp-start-date').val(pin.yyyymmdd1 + " " + pin.hour1 + ":" + pin.min1);
                    $('#disp-end-date').val(pin.yyyymmdd2 + " " + pin.hour2 + ":" + pin.min2);
                }
            });
        });

        //유효기간 선택시
        $('#use-period-calendar').click(function() {
            showCalendar({
                type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
                format:'yyyy-MM-dd',
                yyyymmdd1:$('#use-start-date').val(),
                yyyymmdd2:$('#use-end-date').val(),
                max_term:90,
                fn:function(pin) {
                    var date = new Date();
                    var toDay = date.getFullYear() + '' + ((date.getMonth() < 9) ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + date.getDate();
                    var pinDay1 = (pin.yyyymmdd1).split("-").join("");
                    var pinDay2 = (pin.yyyymmdd2).split("-").join("");
                    var _dispStrtDtime = $('#use-start-date').val().replace(/-/gi,"").substring(0,8);
                    var _dispEndDtime = $('#use-end-date').val().replace(/-/gi,"").substring(0,8);
                    if(_dispStrtDtime != pinDay1){
                        if(pinDay1 < toDay){
                            $('#_Calendar_LAYER').hide();
                            alert(alertMessage.predateStartdateMsg); //현재보다 이전 일자입니다.[시작일]
                            return false;
                        }
                    }
                    if(_dispEndDtime != pinDay2){
                        if(pinDay2 < toDay){
                            $('#_Calendar_LAYER').hide();
                            alert(alertMessage.predateEnddateMsg); //현재보다 이전 일자입니다.[종료일]
                            return false;
                        }
                    }
                    $('#use-start-date').val(pin.yyyymmdd1);
                    $('#use-end-date').val(pin.yyyymmdd2);
                }
            });
        });


        //숫자만입력
        $("input:text[numberOnly]").on("keyup", function() {
            $(this).val($(this).val().replace(/[^0-9]/g,""));
        });


        $('#select-form-issumethcd').change(function(){
            // 01 : 대상지정발급 , 02 : 조건부자동발급 , 03 : 고객다운로드발급
            var data = $(this).val();

            if(data === '02'){
                $('#condition-issued').show();
                $('#user-issued').hide();
            }else if(data === '03'){
                $('#user-issued').show();
                $('#condition-issued').hide();
            }else{
                $('#condition-issued').hide();
                $('#user-issued').hide();
            }

        })

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


        //사용요일 전체 선택시
        $("input[name=days-all]").click(function(){
            if($("input[name=days-all]").prop("checked")){
                $("input[name=apply-day]").prop("checked",true);
            }else{
                $("input[name=apply-day]").prop("checked",false);
            }
        })

        //타임쿠폰 클릭시
        $("#time-coupon").click(function(){
            if($("#time-coupon").prop("checked")){
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

        //삭제버튼 눌렀을경우
        $("#coupon-manage-delete").click(function(){
            that.couponDelete();
        });

        //취소 버튼
        $("#coupon-manage-close").click(function(){
            window.close();
        })


    },
    bindData : function(){
        if(coupon==null){
           return;
        }

       //=======적용매체=======
        var mediaList = coupon.aplyPsbMediaCd;
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

        //=======적용회원 대상=======
        var mbrGradeAplyYn = coupon.mbrUprGradeAplyYn;
        if(mbrGradeAplyYn==='Y'){
           $('#apply-user-checkbox').prop("checked",true);
        }

        //=======발급방식=======
        var issuMethCd = coupon.issuMethCd;
        $("#select-form-issumethcd").val(issuMethCd);
        if(issuMethCd === '02'){
           $('#condition-issued').show();
           $('#user-issued').hide();
           $("#benefit-autoissu-typcd").val(coupon.autoIssuTypCd);
           $("#benefit-autoissu-potmcd").val(coupon.autoIssuPotmCd);
           $("#condition-issued-days").val(coupon.anvyBeIssuDaynub);
        }else if(issuMethCd === '03') {
           $('#user-issued').show();
           $('#condition-issued').hide();
           $("#cpbook-disp-yn").val(coupon.cpbookDispYn);
           $("#benefit-issue-methcd").val(coupon.dcCpbookCd);
        }
        //=======유효기간구분=======
        var aplyTermGbCd = coupon.aplyTermGbCd;
        if(aplyTermGbCd==='01'){ //일자지정
            $("input[name=benefit-period][value='N']").prop('checked',true);
            $("#use-start-date").val(coupon.usePsbStrDt);
            $("#use-end-date").val(coupon.usePsbEndDt);
        }else if(aplyTermGbCd==='02'){ //발급일로부터
            var initFromAndToCalDate = recentlyCalenderData(-30);
            $("input[name=benefit-period][value='Y']").prop('checked',true);
            $("#from-period").val(coupon.issuDdStdCpnUseDds);
            $('#use-start-date').val(initFromAndToCalDate[1]);
            $('#use-end-date').val(initFromAndToCalDate[0]);
        }
       //요일
        var useWdayCd = coupon.useWdayCd;
        if(useWdayCd.length===7){
            $("input[name=days-all]").prop("checked",true);
        }
        for(var day of useWdayCd){
            var that = day;
            $("input[name=apply-day]").each(function(){
                if($(this).val() === that){
                    $(this).prop("checked",true);
                }
            })
        }
        //사용시간대
        var tmCpnYn = coupon.tmCpnYn;
        if(tmCpnYn=='Y'){
          $("select[name=time-coupon-hm]").attr('disabled',false);
          $("#time-coupon").prop("checked",true);
          var usePsbStrTm = coupon.usePsbStrTm;
          var usePsbEndTm = coupon.usePsbEndTm;
          $("#use-start-hours").val(usePsbStrTm.substring(0,2));
          $("#use-start-minute").val(usePsbStrTm.substring(2,4));
          $("#use-end-hours").val(usePsbEndTm.substring(0,2));
          $("#use-end-minute").val(usePsbEndTm.substring(2,4));
        }
        //할인유형
        var fixamtFxrtGbCd = coupon.fixamtFxrtGbCd;
        if(fixamtFxrtGbCd==='01'){
            $("input[name=discount-amt-rate][value='01']").prop('checked',true);
        }else{
            $("input[name=discount-amt-rate][value='02']").prop('checked',true);
        }

        $("#discount-amtandrate").val(coupon.dcRateAmt);
        $("#discount-minbuyAmt").val(coupon.minBuyAmt);
        $("#discount-maxdcamt").val(coupon.maxDcAmt);

        if(!(coupon.promoTypCd === '14' || coupon.promoTypCd === '15')) {
            this.addTargetUI("#apply-site-ul", coupon.aplySites)
            this.addTargetUI("#apply-goods-ul", coupon.aplyGoods)
            this.addTargetUI("#apply-stdgoods-ul", coupon.aplyStdGoods)
            this.addTargetUI("#apply-category-ul", coupon.aplyCategory)
            this.addTargetUI("#apply-brand-ul", coupon.aplyBrand)
            this.addTargetUI("#apply-entr-ul", coupon.aplyEntr)
            this.addTargetUI("#apply-channel-ul", coupon.aplyChannel)
            this.addTargetUI("#except-goods-ul", coupon.exceptGoods)
            this.addTargetUI("#except-stdGoods-ul", coupon.exceptStdGoods)
        }else{
            $('#apply-target-form').hide();
            $('#except-target-form').hide();
            $("input[name=discount-amt-rate]").attr('disabled',true);
            $('#discount-amtandrate').attr('disabled',true);
            $('#discount-maxdcamt').attr('disabled',true)

        }

    },
    possibleChangeTag : function(){
        var that = this;
        // 전시시작 > 오늘 ? 태그 비활성화 : continue ~
        if(coupon==null) {
            return;
        }
        //비활성화
        if(!this.possibleChangeCouponValidate()){
            $('#tab-cont1 input').attr("disabled",true);
            $('#tab-cont1 select').attr("disabled",true);
            $("#tab-cont1 a").unbind();
            $("#tab-cont1 span").unbind();
            $(document).off("click",".target-delete");
            $(document).off("click",".target-init");

            //쿠폰상태 , 삭제 , 저장 , 취소 버튼만 활성화
            $('#form-select-coupon-status').attr("disabled",false);

            $('#coupon-manage-delete').click(function(){
                that.couponDelete();
            });

            $('#coupon-manage-save').click(function(){

                if(!confirm(alertMessage.saveMsg)){
                    return;
                }

                if(!that.couponValidation()){
                    return;
                }
                that.couponSave();
            });

            $('#coupon-manage-close').click(function(){
                window.close();
            });
        }

    },
    calendarInit : function(){
        if(coupon!=null) {
            return;
        }

        var initFromAndToCalDate = recentlyCalenderData(-30);
        //전시기간 달력
        var initDate = new Date();
        var hours = initDate.getHours() < 10 ? '0'+initDate.getHours():initDate.getHours();
        var minute = initDate.getMinutes() < 10 ? '0'+initDate.getMinutes():initDate.getMinutes();
        $("#disp-start-date").val(initFromAndToCalDate[1]+" "+hours+":"+minute);
        $("#disp-end-date").val(initFromAndToCalDate[0]+" 23:59");

        //쿠푠혜택 달력
        $('.coupon-calendar-start').val(initFromAndToCalDate[1]);
        $('.coupon-calendar-end').val(initFromAndToCalDate[0]);
    },
    possibleChangeCouponValidate : function(){
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
    couponValidation : function(){
        //쿠폰 저장전 Validation func
        //"=========기본정보========="
        if($("#coupon-name").val().trim() === ''){
            alert(alertMessage.couponNm);
            $("#coupon-name").focus();
            return false;
        }

        if($("#form-select-coupon-type").val() === ''){
            alert(alertMessage.couponType);
            $("#form-select-coupon-type").focus();
            return false;
        }

        if($("#form-select-coupon-status").val() === ''){
            alert(alertMessage.couponStatus);
            $("#form-select-coupon-status").focus();
            return false;
        }
        
        if($("input[name=promoDesc]").val().trim() === '') {
            alert(alertMessage.promoDesc);
            $("input[name=promoDesc]").focus();
            return false;
        }            


        //"=========쿠폰혜택========="
        if($("#select-form-issusubcd").val()===''){
            alert(alertMessage.issusubcd);
            $("#select-form-issusubcd").focus();
            return false;
        }

        var restrictCount = $("input[name=benefitRestrict]:checked").val();  //발급횟수제한
        if(restrictCount==='Y'){
            //발급횟수제한
            if($("#issu-restrict-count").val()===''){
                alert(alertMessage.restrictCount);
                $("#issu-restrict-count").focus();
                return false;
            }
        }


        var medialength = $("input[name=apply-media]:checked").length;
        if(medialength === 0){
            alert(alertMessage.applyMedia);
            $("input[name=apply-media]").focus();
            return false;
        }

        // 01:대상자지정발급, 02:조건부자동발급 ,03:고객다운로드발급
        var issuMethCd = $("#select-form-issumethcd").val();
        if(issuMethCd==='02'){
            if($("#condition-issued-days").val()===''){
                alert(alertMessage.issuedDays);
                $("#condition-issued-days").focus();
                return false;
            }
        }

        var benefitPeriod = $("input[name=benefit-period]:checked").val();
        if(benefitPeriod==='Y'){
            if($("#from-period").val()===''){
                alert(alertMessage.fromPeriod);
                $("#from-period").focus();
                return false;
            }
        }

        var daysLength = $("input[name=apply-day]:checked").length;
        if(daysLength===0){
            alert(alertMessage.applyDay);
            $("input[name=apply-day]").focus();
            return false;
        }

        var timeCoupon = $("#time-coupon").is(":checked")? "Y" : "N";
        if(timeCoupon === 'Y'){
            var startTm = $("#use-start-hours").val()+''+$("#use-start-minute").val();
            var endTm = $("#use-end-hours").val()+''+$("#use-end-minute").val();
            if(startTm >= endTm){
                alert(alertMessage.useHours);
                return false;
            }
        }

        var couponType = $('#form-select-coupon-type').val();

        if(couponType !== '14' && couponType !== '15') {
            if ($("#discount-amtandrate").val() === '') {
                alert(alertMessage.discountAmtAndRate);
                $("#discount-amtandrate").focus();
                return false;
            }

            if ($("#discount-maxdcamt").val() === '') {
                alert(alertMessage.discountMaxDcAmt);
                $("#discount-maxdcamt").focus();
                return false;
            }

            //정액  : 01 ,정률 : 02
            if($("input[name=discount-amt-rate]:checked").val()==='01'){
                var amt = $("#discount-amtandrate").val();
                if(amt < 10 || amt > 999999){
                    alert(alertMessage.discountAmt);
                    return false;
                }
            }else{
                var rate = $("#discount-amtandrate").val();
                if(rate < 1 || rate > 40){
                    alert(alertMessage.discountRate);
                    return false;
                }
            }

            if($("#apply-target-form").find('li').length === 0){
                alert(alertMessage.target);
                return false;
            }
        }

        if($("#discount-minbuyAmt").val()===''){
            alert(alertMessage.minBuyAmt);
            $("#discount-minbuyAmt").focus();
            return false;
        }

        if($("#discount-minbuyAmt").val() < 10 || $("#discount-minbuyAmt").val() > 9999999 ){
            alert(alertMessage.minBuyAmtLimit);
            $("#discount-minbuyAmt").focus();
            return false;
        }

        return true;
    },
    couponSave : function(){
        var thisForm = $('#coupon-form');
        var disabled = thisForm.find(':input:disabled',':select:disabled').removeAttr('disabled');
        var thisFormObject = thisForm.serializeObject();
        //=============기본정보=============//
        thisFormObject.promoNo = $("#coupon-no").val();

        thisFormObject.promoStrDtm = replaceCalendarString($("#disp-start-date").val()).replace(/:/g,"").replace(/(\s*)/g,"");//전시 시작날짜짜
        thisFormObject.promoEndDtm = replaceCalendarString($("#disp-end-date").val()).replace(/:/g,"").replace(/(\s*)/g,""); //전시 종료날짜
        //=============쿠폰혜택=============//

        var restrictCount = $("input[name=benefitRestrict]:checked").val();  //발급횟수제한
        if(restrictCount==='Y'){
            thisFormObject.issuQty = $("#issu-restrict-count").val();
        }
        thisFormObject.issuLmtYn = restrictCount;


        //- 적용매체
        var mediaArray = [];
        $("input[name=apply-media]:checked").each(function(){
            mediaArray.push($(this).val());
        })
        thisFormObject.aplyPsbMediaCd = mediaArray;

        //- 적용회원 이상
        thisFormObject.mbrUprGradeAplyYn = $("#apply-user-checkbox").is(":checked")? "Y" : "N";

        //- 유효기간 구분 ( 01 : 기간기준 , 02 : 발급일로부터 )
        thisFormObject.aplyTermGbCd = $("input[name=benefit-period]:checked").val() === "Y" ? "02" : "01";
        thisFormObject.issuDdStdCpnUseDds = $("#from-period").val();
        thisFormObject.usePsbStrDt = replaceCalendarString($("#use-start-date").val());  //사용시작날짜
        thisFormObject.usePsbEndDt = replaceCalendarString($("#use-end-date").val());    //사용종료날짜

        //- 사용요일
        var useDays = [];
        $("input[name=apply-day]:checked").each(function(){
            useDays.push($(this).val());
        })
        thisFormObject.useWdayCd = useDays;

        //- 사용시간대
        thisFormObject.tmCpnYn = $("#time-coupon").is(":checked")? "Y" : "N";
        thisFormObject.usePsbStrTm = $("#use-start-hours").val() + $("#use-start-minute").val();
        thisFormObject.usePsbEndTm = $("#use-end-hours").val() + $("#use-end-minute").val();


        //- 할인유형 ( 01 : 정액 , 02 : 정률 )
        thisFormObject.fixamtFxrtGbCd = $("input[name=discount-amt-rate]:checked").val();


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

        var registerCouponCallback = function(res){
            if(res.succeeded){
                window.postMessage('succeeded', _baseUrl);
                window.close();
            }
        };

        delete thisFormObject['apply-media-all'];
        delete thisFormObject['apply-media'];
        delete thisFormObject['days-all'];
        delete thisFormObject['apply-day'];
        delete thisFormObject['benefit-period'];
        delete thisFormObject['time-coupon-hm'];
        delete thisFormObject['discount-amt-rate'];

        //전송 전
        disabled.attr('disabled','disabled')
        var param = JSON.stringify(thisFormObject);
        common.Ajax.sendJSONRequest("POST"
            , _baseUrl + "marketing/couponMgmt.saveCoupon.do"
            , param
            , registerCouponCallback
            , true
            ,"application/json;charset=UTF-8"
        );
    },
    couponDelete : function(){
        //202103101315
        if(!this.possibleChangeCouponValidate()){
            alert(alertMessage.ingCouponNotDeleteMsg);
            return false;
        }

        if(!confirm(alertMessage.deleteMsg)){
            return false;
        }

        var deleteCouponCallBack = function(data){
            var deleteResult = JSON.parse(data);
            if(deleteResult.succeeded){
                alert(alertMessage.deleteComplateMsg);
                window.postMessage('succeeded', _baseUrl);
                window.close();
            }
        }
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "marketing/couponMgmt.delCoupon.do",
            {promoNo: $("#coupon-no").val()},
            deleteCouponCallBack)
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
            argSelectType: '1',
            goodsCompCd: '10'
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
        couponDetail.addTargetUI("#apply-site-ul",popupData);
    },
    popupGoodsListCallback : function(e){
        //상품조회
        var goodsData = JSON.parse(e.data);
        var popupData = [{ key : goodsData[0].goodsNo , data : goodsData[0].goodsNm}];
        couponDetail.addTargetUI("#apply-goods-ul",popupData);
    },
    popupStdGoodsCallback : function(e){
        //표준상품 조회 콜백
        var stdGoodsData = JSON.parse(e.data);
        var popupData = [{ key : stdGoodsData.stdCtgNo , data : stdGoodsData.stdCtgNm}];
        couponDetail.addTargetUI("#apply-stdgoods-ul",popupData);
    },
    popupDisplayCateTreeCallback : function(e){
        //전시 카테고리
        var categoryData = JSON.parse(e.data);
        var popupData = [{ key :  categoryData[0].dispCtgNo , data : categoryData[0].hierarchyNm}];
        couponDetail.addTargetUI("#apply-category-ul",popupData);
    },
    popupBrandListCallback : function(e){
        //브랜드 조회 콜백
        var brandData = JSON.parse(e.data);
        var popupData = [{ key : brandData[0].brandNo , data : brandData[0].brandNm}];
        couponDetail.addTargetUI("#apply-brand-ul",popupData);
    },
    popupEntrBaseListCallback : function(e){
        //협력사 조회 콜백
        var entrData = JSON.parse(e.data);
        var popupData = [{ key : entrData[0].entrNo , data : entrData[0].entrNm}];
        couponDetail.addTargetUI("#apply-entr-ul",popupData);
    },
    popupChannelListCallback : function(e){
        //채널 조회 콜백
        var channelData = JSON.parse(e.data);
        var popupData = [{ key : channelData[0].chlNo , data : channelData[0].chlNm}];
        couponDetail.addTargetUI("#apply-channel-ul",popupData);
    },

    popupGoodsListExceptCallback : function(e){
        //상품조회
        var goodsData = JSON.parse(e.data);
        var popupData = [{ key : goodsData[0].goodsNo , data : goodsData[0].goodsNm}];
        couponDetail.addTargetUI("#except-goods-ul",popupData);
    },
    popupStdGoodsExceptCallback : function(e){
        //표준상품 조회 콜백
        var stdGoodsData = JSON.parse(e.data);
        var popupData = [{ key : stdGoodsData.stdCtgNo , data : stdGoodsData.stdCtgNm}];
        couponDetail.addTargetUI("#except-stdGoods-ul",popupData);
    }
};
