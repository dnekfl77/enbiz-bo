$.namespace('cashBill');
cashBill = {

    init : function(){
        // $('.cashBill').hide();
        this.bindEvent();
    },

    bindEvent : function(){

        //현금 영수증 신청구분
        $(document).on("click","input[name=cashBillType]",function(){
            var cashBillType = $(this).val();
            $('.cashBillTypeForm:eq('+cashBillType+')').show();
            $('.cashBillTypeForm:not(:eq('+cashBillType+'))').hide();
        });


        $(document).on("change",".authMethod",function(){
            var val = $(this).val();
            if(val !== '0'){
              $('.fourType').show();
            }else{
              $('.fourType').hide();
            }
        });
    }


}