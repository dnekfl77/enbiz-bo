$.namespace('orderPay');
orderPay = {

    init : function(){
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){

        var that = this;

        $(".payKinds").click(function(){
            $(this).closest("tr").find('.priceValue').first().val(0);
            that.inputAmtReCalculate();
        })


        $(".priceValue").keyup(function(event) {
            var idName = $(this).attr('id');
            var inputAmt  = getNumberFormat(this.value); /*입력금액*/
            var myPrice = uncomma($(this).closest("tr").find('.myPrice').first().val()); /*보유금액*/

            if(myPrice < uncomma(inputAmt)){
                this.value = getNumberFormat(myPrice);
                return false;
            }

            if(idName === 'inputReserves'){ //적립금
                var myReservesAmt = uncomma($('#reserves').val());
                if(myReservesAmt < 10){
                    alert('적립금 보유금액은 10원 이상만 사용 가능합니다.');
                    this.value = 0;
                    that.inputAmtReCalculate();
                    return false;
                }
            }

            this.value = inputAmt;
            that.inputAmtReCalculate();
        });

        $('.cashBillPayType').click(function(){
            if($('.cashBillPayType:checked').length > 0){
                $('.cashBill').show();
                $('.noCashBill').hide();
            }else{
                $('.cashBill').hide();
                $('.noCashBill').show();
            }
        })
    },
    inputAmtReCalculate : function(){
        var amt = 0;
        $('.payKinds:checked').each(function(){
            var thisValue = $(this).closest("tr").find('.priceValue').first().val();
            thisValue = thisValue === '' ? 0 : uncomma(thisValue);
            amt += thisValue;
        });

        $('#inputAmt').text(getNumberFormat(amt));
        var payAmt = uncomma($('#payAmt').text());

        var remainingAmt = payAmt-amt;

        if(remainingAmt < 0){
            alert('지불해야 하는 금액보다 지불하는 금액이 더 큽니다.');
            $('.priceValue').val(0);
            this.inputAmtReCalculate();
            return;
        }

        $('#remainingAmt').text(getNumberFormat(remainingAmt));
    },

    /*결제 정보 setting*/
    settingPayInfo : function(){
        //상품가격
        var gGrid = goodsGrid.eventhandler.grid;
        var provider = gGrid.getDataSource();

        var salePrcAmt = 0;

        for( var row = 0; row < gGrid.getItemCount(); row++ ){
            var index = gGrid.getItemIndex(row);
            var salePrc = provider.getValue(gGrid.getDataRow(index), "salePrc");    //펀매가
            var ordQty = provider.getValue(gGrid.getDataRow(index), "ordQty");      //주문수량

            salePrcAmt += (salePrc * ordQty);
        }
        $('#salePrcAmt').text(getNumberFormat(salePrcAmt));

        //배송비
        var dlvAmt = dlvAmtGrid.eventhandler.grid.getSummary("ordDeliAmt","sum");
        $('#shippingFee').text(getNumberFormat(dlvAmt));

        //혜택할인 가격
        var discountAmt = benefitGrid.eventhandler.grid.getSummary("discountAmt","sum");
        $('#discountAmt').text(getNumberFormat(discountAmt));

        $('#payAmt').text(getNumberFormat(salePrcAmt+dlvAmt-discountAmt));

        var mbrNo = $('#mbrNo').val();
        if(mbrNo === noMember){
            this.callBackEtMbrAstSumList();
        }

        /* 회원 자산 조회 */
        common.Ajax.sendJSONRequest("GET"
            , _baseUrl + "order/orderReception.getMeMbrAstSum.do"
            , 'mbrNo=' + mbrNo
            , this.callBackEtMbrAstSumList
            , false
            ,"application/json;charset=UTF-8"
        );

    },

    callBackEtMbrAstSumList : function(data){

        if(data === null || data === undefined){
            $('#deposit').val(0);
            $('#reserves').val(0);
            return false;
        }

        data.forEach(function(mbrAstSum){
            var posnAmt = getNumberFormat(mbrAstSum.posnAmt);

            if(mbrAstSum.astGbCd === '30'){
                /*30 : 적립금*/
                $('#reserves').val(posnAmt);
            }else if(mbrAstSum.astGbCd === '50'){
                /*50 : 예치금*/
                $('#deposit').val(posnAmt);
            }
        });

    },

    onCancel : function(){
        $('.price').val('').text('');
    }


}