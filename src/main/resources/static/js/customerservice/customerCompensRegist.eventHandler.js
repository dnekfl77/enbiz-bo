
$.namespace("customerCompensRegist.eventhandler");
customerCompensRegist.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
    },
    bindButtonEvent : function(){
        var self = this;

        $("input:text[numberOnly]").on("keyup", function() {
            var currentVal = $(this).val();
            $(this).val(onlyInputNumber(currentVal));
        })


        $(document).on("propertychange change keyup paste input",'.dataCont',function(){
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        //보상수단
        $('#cpnsMeanCd').change(function(){
            if($(this).val() === cashCode){
                $('.cash').attr('disabled',false);
                if(!(ccnData.rfdActnNo === undefined || ccnData.rfdActnNo === null)) {
                    $('#payActnNo').val(ccnData.rfdActnNo);
                }
            }else{
                $('#payActnNo').val('');
                $('#payDepositorNm').val('');
                $('.cash').attr('disabled',true);
            }
        })

        // 보상유형
        $('#btn-regist-cpnsTyp').click(function(){
            self.callRewardTypeListPopup();
        })

        // 보상유형 초기화
        $('#btn-reset-cpnsTyp').click(function(){
            $('#cpnsTypNm').val('');
            $('#cpnsTypNo').val('');
            $('#cpnsStdRate').val('');
            $('#maxPayLim').val('');
        })

        $('#btn_accNumValid').click(function(){
            if($('#payActnNo').is(":disabled")){
                return;
            }
            alert("한섬에서...");
        })

        $('#btn_close').click(function () {
            window.close();
        })

        $('#btn_save').click(function () {
            if (!confirm(_msg.confirmSaveMsg)) {
                return false;
            }

            if(!self._saveValidation()){
                return false;
            }

            var param = {};
            param.ccnNo         = ccnData.ccnNo;

            //보상수단
            param.cpnsMeanCd    = $('#cpnsMeanCd').val();

            //보상유형
            param.cpnsTypNo     = $('#cpnsTypNo').val();

            //귀책구분
            param.rspnGbCd      = $('#rspnGbCd').val();

            //보상금액
            param.cpnsAmt       = $('#cpnsAmt').val();

            if(param.cpnsMeanCd === cashCode) {
                //은행
                param.payBankCd = $('#payBankCd').val();

                //예금주
                param.payActnNo = $('#payActnNo').val();

                //환불계좌번호
                param.payDepositorNm = $('#payDepositorNm').val();
            }

            //승인요청메모
            param.accpCont  = $('#accpCont').val();
            param.mbrNo         = ccnData.mbrNo;
            param.ordNo         = ccnData.ordNo;
            param.goodsNo       = ccnData.goodsNo;
            common.Ajax.sendJSONRequest(
                "post"
                ,_baseUrl + "customerservice/integratedCounselMgmt.saveCustomerCompens.do"
                ,param
                ,function (result) {
                    if(result.succeeded){
                      alert('저장되었습니다!');
                      window.close();
                    }
                },null,null,true);


        })

    },
    callRewardTypeListPopup : function(){
        var pin = {};
        var POP_DATA = {
            url: _baseUrl + 'customerservice/rewardTypeMgmt.rewardTypeListPopup.do'
            , winName: 'popupCsCpnsTypCdListPopup'
            , title: '보상유형조회 팝업'
            , _title: '보상유형조회 팝업'
            , left: 20
            , top: 20
            , width: 520
            , height: 600
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupCsCpnsTypCdListCallback);
    },
    popupCsCpnsTypCdListCallback : function(e){
        var csCpnsTypeData = JSON.parse(e.data);
        $('#cpnsTypNo').val(csCpnsTypeData[0].cpnsTypNo);
        $('#cpnsTypNm').val(csCpnsTypeData[0].cpnsTypSmlNm);
        $('#cpnsStdRate').val(csCpnsTypeData[0].cpnsTypSmlNm + " / " + csCpnsTypeData[0].cpnsStdNm + " / " +  csCpnsTypeData[0].cpnsStdRate);
        $('#maxPayLim').val(csCpnsTypeData[0].maxPayLim);
    },
    _saveValidation : function(){

        var cpnsMeanCd = $('#cpnsMeanCd').val();
        if(cpnsMeanCd === null || cpnsMeanCd === '' || cpnsMeanCd === undefined){
            alert('보상수단은 필수값입니다!');
            $('#cpnsMeanCd').focus();
            return false;
        }

        var cpnsTypNm = $('#cpnsTypNm').val();
        var cpnsTypNo = $('#cpnsTypNo').val();
        if(cpnsTypNm === null || cpnsTypNm === '' || cpnsTypNm === undefined){
            alert('보상유형은 필수값입니다!');
            $('#cpnsTypNm').focus();
            return false;
        }

        if(cpnsTypNo === null || cpnsTypNo === '' || cpnsTypNo === undefined){
            alert('보상유형은 필수값입니다!');
            $('#cpnsTypNm').focus();
            return false;
        }

        var rspnGbCd = $('#rspnGbCd').val();
        if(rspnGbCd === null || rspnGbCd === '' || rspnGbCd === undefined){
            alert('귀책구분은 필수값입니다!');
            $('#rspnGbCd').focus();
            return false;
        }

        var cpnsAmt = $('#cpnsAmt').val();
        var limitVal = $('#maxPayLim').val();
        if(cpnsAmt === null || cpnsAmt === '' || cpnsAmt === undefined){
            alert('보상금액은 필수값입니다!');
            $('#cpnsAmt').focus();
            return false;
        }

        if(parseInt(cpnsAmt) > parseInt(limitVal)){
            alert('최대 지급한도를 초과하여 입력할 수 없습니다!');
            $(this).val(0);
            $('#cpnsAmt').focus();
            return false;
        }

        var accpCont = $('#accpCont').val();
        if(accpCont === null || accpCont === '' || accpCont.trim().length === 0){
            alert('승인요청메모는 필수값입니다!');
            $('#accpCont').focus();
            return false;
        }

        if(cpnsMeanCd === cashCode){

            var payBankCd = $('#payBankCd').val();
            if(payBankCd === null || payBankCd === ''){
                alert('은행은 필수값입니다!');
                $('#payBankCd').focus();
                return false;
            }

            var payDepositorNm = $('#payDepositorNm').val();
            if(payDepositorNm === null || payDepositorNm === '' || payDepositorNm.trim().length === 0){
                alert('예금주는 필수값입니다!');
                $('#payDepositorNm').focus();
                return false;
            }

            var payActnNo = $('#payActnNo').val();
            if(payActnNo === null || payActnNo === ''){
                alert('계좌번호는 필수값입니다!');
                $('#payActnNo').focus();
                return false;
            }

        }

        return true;
    }
};
