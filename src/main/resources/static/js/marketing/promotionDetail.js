var alertMsg = x2coMessage.getMessage({
	deleteMsg : 'adminCommon.grid.alert.delete', //삭제하시겠습니까?
	saveMsg : 'adminCommon.grid.alert.save', //저장하시겠습니까?
	complateDeleteMsg : 'adminCommon.message.deleted.successfully', //삭제되었습니다.
	currentPredateStartdateMsg : 'adminCommon.message.current.predate.startdate', //현재보다 이전 일자입니다.[시작일]
	currentPredateEnddateMsg : 'adminCommon.message.current.predate.enddate', //현재보다 이전 일자입니다.[종료일]
	promotionNameRequireMsg : 'promotionMgmt.alert.msg.promotion.name.require',//프로모션명은 필수값입니다!
	promotionTypeRequireMsg : 'promotionMgmt.alert.msg.promotion.type.require',//프로모션유형은 필수값입니다!
	promotionStateRequireMsg : 'promotionMgmt.alert.msg.promotion.state.require',//프로모션상태는 필수값입니다!
	promotionDescRequireMsg : 'promotionMgmt.alert.msg.promotion.desc.require',//프로모션설명은 필수값입니다!
	applyCardRequireMsg : 'promotionMgmt.alert.msg.apply.card.require',//적용카드는 필수값입니다!
	applyMediaRequireMsg : 'promotionMgmt.alert.msg.apply.media.require',//적용매체는 필수값입니다!
	discountAmountRequireMsg : 'promotionMgmt.alert.msg.discount.amount.require',//할인율금액은 필수값입니다!
	discountAmount10_999999Msg : 'promotionMgmt.alert.msg.discount.amount.10_999999',//할인금액은 10~999999만 가능합니다!
	discountRate1_40Msg : 'promotionMgmt.alert.msg.discount.rate.1_40',//할인율은 1~40만 가능합니다!
	minBuyAmountRequireMsg : 'promotionMgmt.alert.msg.min.buy.amount.require',//최소구매금액은 필수값입니다!
	minBuyAmount10_999999Msg : 'promotionMgmt.alert.msg.min.buy.amount.10_999999',//최소구매금액은 10~999999만 가능합니다!
	maxDiscountAmountRequireMsg : 'promotionMgmt.alert.msg.max.discount.amount.require',//최대할인금액은 필수값입니다!
	applyTargetRequireMsg : 'promotionMgmt.alert.msg.apply.target.require',//적용대상은 필수값입니다!
	ingPromotionNotDeleteMsg : 'promotionMgmt.alert.msg.ing.promotion.not.delete' //이미 진행중인 프로모션은 삭제 할 수없습니다!
});

promotionDetail = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.bindData();
        this.bindEvent();
        this.possibleChangeTag();
    },
    bindEvent : function(){
        var that = this;

        $(document).on("click",".target-delete",function(){
            if(confirm(alertMsg.deleteMsg)){
                $(this).closest('li').remove();
            }
        });

        $(document).on("click",".target-init",function(){
            $(this).parents('.add').prev().children("li").remove();
        });

        $('#promotion-manage-close').click(function(){
            window.close();
        })

        //저장버튼시
        $('#promotion-manage-save').click(function(){
            if(!confirm(alertMsg.saveMsg)){
                return false;
            }
            if(!that.promotionValidation()){
                return;
            }
            that.promotionSave();
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
                            alert(alertMsg.currentPredateStartdateMsg); //현재보다 이전 일자입니다.[시작일]
                            return false;
                        }
                    }
                    if(_dispEndDtime != pinDay2){
                        if(pinDay2 < toDay){
                            $('#_Calendar_LAYER').hide();
                            alert(alertMsg.currentPredateEnddateMsg); //현재보다 이전 일자입니다.[종료일]
                            return false;
                        }
                    }

                    $('#disp-start-date').val(pin.yyyymmdd1 + " " + pin.hour1 + ":" + pin.min1);
                    $('#disp-end-date').val(pin.yyyymmdd2 + " " + pin.hour2 + ":" + pin.min2);
                }
            });
        });

        //숫자만입력
        $("input:text[numberOnly]").on("keyup", function() {
            $(this).val($(this).val().replace(/[^0-9]/g,""));
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
        $("#promotion-manage-delete").click(function(){
            that.promotionDelete();
        });

        //취소 버튼
        $("#promotion-manage-close").click(function(){
            window.close();
        })


    },
    bindData : function(){
        if(promotion==null){
            return;
        }

        //=======적용매체=======
        var mediaList = promotion.aplyPsbMediaCd;
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
        var mbrGradeAplyYn = promotion.mbrUprGradeAplyYn;
        if(mbrGradeAplyYn==='Y'){
            $('#apply-user-checkbox').prop("checked",true);
        }

        //할인유형
        var fixamtFxrtGbCd = promotion.fixamtFxrtGbCd;
        if(fixamtFxrtGbCd==='01'){
            $("input[name=discount-amt-rate][value='01']").prop('checked',true);
        }else{
            $("input[name=discount-amt-rate][value='02']").prop('checked',true);
        }

        $("#discount-amtandrate").val(promotion.dcRateAmt);
        $("#discount-minbuyAmt").val(promotion.minBuyAmt);
        $("#discount-maxdcamt").val(promotion.maxDcAmt);

        this.addTargetUI("#apply-site-ul", promotion.aplySites);
        this.addTargetUI("#apply-goods-ul", promotion.aplyGoods);
        this.addTargetUI("#apply-stdgoods-ul", promotion.aplyStdGoods);
        this.addTargetUI("#apply-category-ul", promotion.aplyCategory);
        this.addTargetUI("#apply-brand-ul", promotion.aplyBrand);
        this.addTargetUI("#apply-entr-ul", promotion.aplyEntr);
        this.addTargetUI("#apply-channel-ul", promotion.aplyChannel);
        this.addTargetUI("#except-goods-ul", promotion.exceptGoods);
        this.addTargetUI("#except-stdGoods-ul", promotion.exceptStdGoods);

    },
    possibleChangeTag : function(){
        var that = this;
        // 전시시작 > 오늘 ? 태그 비활성화 : continue ~
        if(promotion==null) {
            return;
        }
        //비활성화
        if(!this.possibleChangePromotionValidate()){
            $('input').attr("disabled",true);
            $('select').attr("disabled",true);
            $("a").unbind();
            $("span").unbind();
            $(document).off("click",".target-delete");
            $(document).off("click",".target-init");

            //쿠폰상태 , 삭제 , 저장 , 취소 버튼만 활성화
            $('#select-promotion-status').attr("disabled",false);

            $('#promotion-manage-delete').click(function(){
                that.promotionDelete();
            });

            $('#promotion-manage-save').click(function(){
                if(!confirm(alertMsg.saveMsg)){
                    return;
                }
                if(!that.promotionValidation()){
                    return;
                }
                that.promotionSave();
            });

            $('#promotion-manage-close').click(function(){
                window.close();
            });
        }

    },
    calendarInit : function(){
        if(promotion!=null) {
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
    possibleChangePromotionValidate : function(){
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
    promotionValidation : function(){
        //쿠폰 저장전 Validation func
        //"=========기본정보========="
        if($("#promoNm").val().trim() === ''){
            alert(alertMsg.promotionNameRequireMsg);
            $("#promoNm").focus();
            return false;
        }

        if($("#select-promotion-type").val() === ''){
            alert(alertMsg.promotionTypeRequireMsg);
            $("#select-promotion-type").focus();
            return false;
        }

        if($("#select-promotion-status").val() === ''){
            alert(alertMsg.promotionStateRequireMsg);
            $("#select-promotion-status").focus();
            return false;
        }

        if($("#text-promo-desc").val().trim() === '') {
            alert(alertMsg.promotionDescRequireMsg);
            $("#text-promo-desc").focus();
            return false;
        }

        //"=========프로모션혜택========="
        if($("#select-card-type").val() === ''){
            alert(alertMsg.applyCardRequireMsg);
            $("#select-card-type").focus();
            return false;
        }

        var medialength = $("input[name=apply-media]:checked").length;
        if(medialength === 0){
            alert(alertMsg.applyMediaRequireMsg);
            $("input[name=apply-media]").focus();
            return false;
        }


        if ($("#discount-amtandrate").val() === '') {
             alert(alertMsg.discountAmountRequireMsg);
             $("#discount-amtandrate").focus();
             return false;
         }

        //정액  : 01 ,정률 : 02
        if($("input[name=discount-amt-rate]:checked").val()==='01'){
           var amt = $("#discount-amtandrate").val();
           if(amt < 10 || amt > 9999999){
              alert(alertMsg.discountAmount10_999999Msg);
              return false;
           }
        }else{
           var rate = $("#discount-amtandrate").val();
           if(rate < 1 || rate > 40){
              alert(alertMsg.discountRate1_40Msg);
              return false;
           }
        }


        if($("#discount-minbuyAmt").val()===''){
            alert(alertMsg.minBuyAmountRequireMsg);
            $("#discount-minbuyAmt").focus();
            return false;
        }

        if($("#discount-minbuyAmt").val() < 10 || $("#discount-minbuyAmt").val() > 9999999 ){
            alert(alertMsg.minBuyAmount10_999999Msg);
            $("#discount-minbuyAmt").focus();
            return false;
        }

        if ($("#discount-maxdcamt").val() === '') {
            alert(alertMsg.maxDiscountAmountRequireMsg);
            $("#discount-maxdcamt").focus();
            return false;
        }

        if($("#apply-target-form").find('li').length === 0){
            alert(alertMsg.applyTargetRequireMsg);
            return false;
        }

        return true;
    },
    promotionSave : function(){
        var thisForm = $('#promotion-form');
        var disabled = thisForm.find(':input:disabled',':select:disabled').removeAttr('disabled');
        var thisFormObject = thisForm.serializeObject();

        //=============기본정보=============//
        thisFormObject.promoStrDtm = replaceCalendarString($("#disp-start-date").val()).replace(/:/g,"").replace(/(\s*)/g,"");//전시 시작날짜짜
        thisFormObject.promoEndDtm = replaceCalendarString($("#disp-end-date").val()).replace(/:/g,"").replace(/(\s*)/g,""); //전시 종료날짜

        //=============프로모션혜택=============//
        //- 적용매체
        var mediaArray = [];
        $("input[name=apply-media]:checked").each(function(){
            mediaArray.push($(this).val());
        })
        thisFormObject.aplyPsbMediaCd = mediaArray;

        //- 적용회원 이상
        thisFormObject.mbrUprGradeAplyYn = $("#apply-user-checkbox").is(":checked")? "Y" : "N";

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
            , _baseUrl + "marketing/promotionMgmt.savePromotion.do"
            , param
            , registerPromotionCallback
            , true
            ,"application/json;charset=UTF-8"
        );
    },
    promotionDelete : function(){
        //202103101315
        if(!this.possibleChangePromotionValidate()){
            alert(alertMsg.ingPromotionNotDeleteMsg);
            return false;
        }

        if(!confirm(alertMsg.deleteMsg)){
            return false;
        }

        var deletepromotionCallBack = function(data){
            var deleteResult = JSON.parse(data);
            if(deleteResult.succeeded){
                alert(alertMsg.complateDeleteMsg);
                window.postMessage('succeeded', _baseUrl);
                window.close();
            }
        }
        common.Ajax.sendRequest(
            "get",
            _baseUrl + "marketing/promotionMgmt.deletePromotion.do",
            {promoNo: $("#promoNo").val()},
            deletepromotionCallBack)
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
        promotionDetail.addTargetUI("#apply-site-ul",popupData);
    },
    popupGoodsListCallback : function(e){
        //상품조회
        var goodsData = JSON.parse(e.data);
        var popupData = [{ key : goodsData[0].goodsNo , data : goodsData[0].goodsNm}];
        promotionDetail.addTargetUI("#apply-goods-ul",popupData);
    },
    popupStdGoodsCallback : function(e){
        //표준상품 조회 콜백
        var stdGoodsData = JSON.parse(e.data);
        var popupData = [{ key : stdGoodsData.stdCtgNo , data : stdGoodsData.stdCtgNm}];
        promotionDetail.addTargetUI("#apply-stdgoods-ul",popupData);
    },
    popupDisplayCateTreeCallback : function(e){
        //전시 카테고리
        var categoryData = JSON.parse(e.data);
        var popupData = [{ key :  categoryData[0].dispCtgNo , data : categoryData[0].hierarchyNm}];
        promotionDetail.addTargetUI("#apply-category-ul",popupData);
    },
    popupBrandListCallback : function(e){
        //브랜드 조회 콜백
        var brandData = JSON.parse(e.data);
        var popupData = [{ key : brandData[0].brandNo , data : brandData[0].brandNm}];
        promotionDetail.addTargetUI("#apply-brand-ul",popupData);
    },
    popupEntrBaseListCallback : function(e){
        //협력사 조회 콜백
        var entrData = JSON.parse(e.data);
        var popupData = [{ key : entrData[0].entrNo , data : entrData[0].entrNm}];
        promotionDetail.addTargetUI("#apply-entr-ul",popupData);
    },
    popupChannelListCallback : function(e){
        //채널 조회 콜백
        var channelData = JSON.parse(e.data);
        var popupData = [{ key : channelData[0].chlNo , data : channelData[0].chlNm}];
        promotionDetail.addTargetUI("#apply-channel-ul",popupData);
    },

    popupGoodsListExceptCallback : function(e){
        //상품조회
        var goodsData = JSON.parse(e.data);
        var popupData = [{ key : goodsData[0].goodsNo , data : goodsData[0].goodsNm}];
        promotionDetail.addTargetUI("#except-goods-ul",popupData);
    },
    popupStdGoodsExceptCallback : function(e){
        //표준상품 조회 콜백
        var stdGoodsData = JSON.parse(e.data);
        var popupData = [{ key : stdGoodsData.stdCtgNo , data : stdGoodsData.stdCtgNm}];
        promotionDetail.addTargetUI("#except-stdGoods-ul",popupData);
    }
};
