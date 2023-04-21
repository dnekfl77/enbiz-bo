var _customerMsg = x2coMessage.getMessage( {
    indInfodealYn  : 'orderReception.manualOrder.orderInfo.msg.err.indInfodealYn',
    change  : 'orderReception.manualOrder.orderInfo.msg.change'
});

$.namespace('orderCustomerInfo');
orderCustomerInfo = {
    init : function () {
        this.bindButtonEvent();
        this.orderMemberInfoSetting();
    }
    //페이지 이벤트 등록
    , bindButtonEvent: function () {
        var _self = this;

        //회원정보 조회 팝업
        $('#btn_mbr_popup_call').click(function(){
            if($('#chkNoMember').is(":checked")){
                return;
            }

            if(indInfodealYn !== 'Y'){
                alert(_customerMsg.indInfodealYn);
                return;
            }
            _self.popupMbrList();
        })

        // 회원/비회원 클릭
        $('#chkNoMember').click(function(){

            if(!confirm(_customerMsg.change)){
                return false;
            }

            receiveManualOrder.reviseSetting(1);

            //배송지 초기화
            orderCustomerInfo.memberDlvpInfoInit();

            $('.memberData').val('');
            $('.memberData').text('');

            if($(this).is(":checked")){
                $("#mbrNm").val("비회원");
                $("#loginId").val(noMember);
                $("#mbrNo").val(noMember);
                $(".tagHideShow").attr("disabled",false);
            }else{
                $("#mbrNm").val("");
                $("#loginId").val("");
                $("#mbrNo").val("");
                $(".tagHideShow").attr("disabled",true);
            }
        })

        //이메일 selectBox
        $(document).on("change","#domainSelectBox",function(){
            $('#emailDomain').val($(this).val());
        })

        //우편번호 popup
        $('#callZipPopup').click(function(){
            if(!$('#chkNoMember').is(":checked")){
                return;
            }
            _self.popupZipNoList();
        })

    }
    //회원배송정보 초기화
    , memberDlvpInfoInit : function(){
        orderDlvpInfo = [];
        $.realGridUtils.clearDropDown(goodsGrid.eventhandler.grid, 'mbrDlvpSeq');
        $.realGridUtils.clearDropDown(orderGiftGrid.eventhandler.grid, 'mbrDlvpSeq');
        $.realGridUtils.clearDropDown(dlvAmtGrid.eventhandler.grid, 'dlvpCoupon');
    }

    //주문자 정보 DataBinding
    , orderMemberInfoSetting : function(){
        if(memberData === null){
            return false;
        }

        $('#mbrNm').val(memberData.mbrNm);
        $('#loginId').val(memberData.loginId);
        $('#mbrNo').val(memberData.mbrNo);

        // 주문자 정보
        if(memberData.mbrNo === noMember) {
            $('#chkNoMember').click();
        }else{
            $('#ordManNm').val(memberData.mbrNo);
            $('#memberType').text(memberData.mbrMgrNm + " / " + memberData.mbrGradeNm);
            $('#telRgnNo').val(memberData.telRgnNo);
            $('#telTxnoNo').val(memberData.telTxnoNo);
            $('#telEndNo').val(memberData.telEndNo);
            $('#cellSctNo').val(memberData.cellSctNo);
            $('#cellTxnoNo').val(memberData.cellTxnoNo);
            $('#cellEndNo').val(memberData.cellEndNo);

            var email = memberData.emailAddr;
            if(!(email === null || email === undefined || email === '')){
                email = email.split('@');
                if(email.length === 2){
                    $('#emailId').val(email[0]);
                    $('#emailDomain').val(email[1]);
                }
            }

            $('#umemZipNoSeq').val(memberData.zipNoSeq);
            $('#umemZipNo').val(memberData.zipNo);
            $('#umemZipAddr').val(memberData.zipAddr);
            $('#umemDtlAddr').val(memberData.dtlAddr);
            $(".tagHideShow").attr("disabled",true);
        }

        orderDlvpInfo.forEach(function (item, index) {
            $.realGridUtils.addDropDownItems(goodsGrid.eventhandler.grid, 'mbrDlvpSeq', item.dlvpAddr, item.mbrDlvpSeq);
        })


    }

    //회원조회 popup
    , popupMbrList : function() {
        var pin = {
            argSelectType: "1" //선택구분(단건선택)
            , argMbrStatCd: "" //회원상태("":전체, 10:정상회원, 20:휴면회원, 30:탈퇴회원)
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
        popCommon(pin, POP_DATA, this.popupMbrListCallback);
    }

    //우편번호 popup
    , popupZipNoList : function() {
        var pin = {
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
        popCommon(pin, POP_DATA, this.popupZipNoCallback);
    }

    //회원선택 후 처리
    , popupMbrListCallback : function(e) {
        var info = JSON.parse(e.data)[0];

        console.log('====member info====');
        console.log(info);

        memberData = info;

        $('#mbrNo').val(info.mbrNo);//회원번호
        $('#mbrNm').val(info.mbrNm);//회원명
        $('#loginId').val(info.loginId);//ID
        $('#ordManNm').val(info.mbrNm);//주문자명
        $('#memberType').text(info.mbrStatNm+" / "+info.mbrGradeNm);//회원구분/등급
        $('#telRgnNo').val(info.telRgnNo);
        $('#telTxnoNo').val(info.telTxnoNo);
        $('#telEndNo').val(info.telEndNo);
        $('#cellSctNo').val(info.cellSctNo);
        $('#cellTxnoNo').val(info.cellTxnoNo);
        $('#cellEndNo').val(info.cellEndNo);

        var email = info.emailAddr;
        if(!(email === null || email === undefined || email === '')){
            email = email.split('@');
            if(email.length === 2){
                $('#emailId').val(email[0]);
                $('#emailDomain').val(email[1]);
            }
        }

        $('#umemZipNoSeq').val(info.zipNoSeq);
        $('#umemZipNo').val(info.zipNo);
        $('#umemZipAddr').val(info.zipAddr);
        $('#umemDtlAddr').val(info.dtlAddr);
        $(".tagHideShow").attr("disabled",true);


        orderCustomerInfo.memberDlvpInfoInit();

        //회원 배송지 조회
        common.Ajax.sendRequestSync(
            "GET"
            , _baseUrl + "order/orderReception.getMemberDlvpData.do"
            , {mbrNo: info.mbrNo}
            , function(_mbrDlvpList) {

                if(_mbrDlvpList.length <=0 ){
                    return;
                }

                orderDlvpInfo = _mbrDlvpList;

                $.each(_mbrDlvpList, function(index, item) {
                    $.realGridUtils.addDropDownItems(goodsGrid.eventhandler.grid, 'mbrDlvpSeq', item.dlvpAddr, item.mbrDlvpSeq);
                });

                var gGrid = goodsGrid.eventhandler.grid;
                gGrid.commit();
            }
        );
    }

    //우편번호 callBack
    , popupZipNoCallback : function(e) {
        var zipObj = [];
        zipObj = JSON.parse(e.data)[0];

        $("#umemZipNoSeq").val(zipObj.zipNoSeq); // 우편번호순번
        $("#umemZipNo").val(zipObj.zipNo);		 // 우편번호
        $("#umemZipAddr").val(zipObj.address);   // 기본주소
    }
}