$.namespace("customerCompensDetailRegist.eventhandler");
customerCompensDetailRegist.eventhandler = {
    // 초기화
    init : function () {
        this.htmlTagSetting();
        this.bindButtonEvent();
    },
    htmlTagSetting : function() {
        var cpnsMeanCd = data.cpnsMeanCd;         //보상수단
        var cpnsAprvStatCd = data.cpnsAprvStatCd; //승인상태
        var cpnsPayStatCd = data.cpnsPayStatCd;   //지급상태

        //승인상태 : 접수 , 지급상태 : 미지급
        if(cpnsAprvStatCd === receiptCd && cpnsPayStatCd === unpaidCd) {

            $('#cpnsAmt').attr("disabled",false);

            if(cpnsMeanCd === cashCode){
                $('#payBankCd').attr("disabled",false);
                $('#payDepositorNm').attr("disabled",false);
                $('#payActnNo').attr("disabled",false);
            }

            //접수자와 로그인한 사용자가 같을경우
            if(data.acptmnId === loginId) {
                $('#btn_apply').show();
                $('#btn_cancel').show();
                $('#accpCont').attr("disabled",false);
            }

            if(csCpUserGrade !== 'N'){
                $('#btn_apply').show();
                $('#btn_cancel').show();
                $('#btn_cpApproval').show();
                $('#btn_rewardReturn').show();
                $('#payReqMemo').attr("disabled",false);
            }

        }else if(cpnsAprvStatCd === rewardApprovalCd && cpnsPayStatCd === paymentRequestCd){
        //승인상태 : 보상승인 , 지급상태 : 미지급
            if(csCpUserGrade === 'P' || csCpUserGrade === 'ALL'){
                $('#cpnsAmt').attr("disabled",false);
                $('#btn_payApproval').show();
                $('#btn_payReturn').show();
            }
        }
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

        $('#btn_accNumValid').click(function(){
            if($('#payActnNo').is(":disabled")){
                return;
            }
            alert("한섬에서...");
        })

        //닫기
        $('#btn_close').click(function () {
            window.close();
        })

        //변경적용
        $('#btn_apply').click(function () {
            if (!confirm(_msg.confirmSaveMsg)) {
                return false;
            }

            if(!self._saveValidation()){
                return false;
            }

            self._applySave();
        })

        //접수취소
        $('#btn_cancel').click(function(){
            if (!confirm("접수취소 하시겠습니까?")) {
                return false;
            }

            self._cancelSave();
        })

        //보상승인
        $('#btn_cpApproval').click(function(){
            if (!confirm("보상승인 하시겠습니까?")) {
                return false;
            }

            if(!self._saveValidation()){
                return false;
            }

            self._cpApproval(rewardApprovalCd);
        })

        //보상반려 팝업 open
        $('#btn_rewardReturn').click(function(){
            layerPopOpen('layerPop-memo');
        })

        $('#returnCancel').click(function(){
            layerPopClose('layerPop-memo');
        })

        //보상 / 지급 반려처리
        $('#returnApply').click(function(){

            if($('#cpnsAmt').val().trim() === ''){
                alert('반려내용을 작성해주세요!');
                return;
            }

            if(rewardApprovalCd === data.cpnsAprvStatCd) {
                self._rewardReturn('P', $('#returnMemo').val());
            }else{
                self._rewardReturn('A', $('#returnMemo').val());
            }
        })

        //지급승인
        $('#btn_payApproval').click(function(){

            if (!confirm("지급승인 하시겠습니까?")) {
                return false;
            }

            if(!self._saveValidation()){
                return false;
            }

            self._cpApproval(payApprovalCd);
        })

        //지급반려 반려처리
        $('#btn_payReturn').click(function(){
            layerPopOpen('layerPop-memo');
        })

    },
    _applySave : function(){
        var param = {};
        param.custCpnsAplyNo         = data.custCpnsAplyNo;
        param.cpnsMeanCd         = data.cpnsMeanCd;

        //보상금액
        param.cpnsAmt       = $('#cpnsAmt').val();

        if(data.cpnsMeanCd === cashCode) {
            //은행
            param.payBankCd = $('#payBankCd').val();

            //예금주
            param.payActnNo = $('#payActnNo').val();

            //환불계좌번호
            param.payDepositorNm = $('#payDepositorNm').val();
        }

        param.accpCont  = $('#accpCont').val().trim(); //승인요청메모
        param.payReqMemo  = $('#payReqMemo').val().trim(); //지급요청메모

        common.Ajax.sendJSONRequest(
            "post"
            ,_baseUrl + "customerservice/customerCompensMgmt.saveCustomerCompensDetail.do"
            ,param
            ,function (result) {
                if(result.succeeded){
                    alert('변경적용 되었습니다!');
                    window.postMessage('succeeded', _baseUrl);
                    window.close();
                }
            },null,null,true);
    },
    _cancelSave : function(){
        var param = {};
        param.custCpnsAplyNo = data.custCpnsAplyNo;
        param.type           =  'C';

        common.Ajax.sendJSONRequest(
            "post"
            ,_baseUrl + "customerservice/customerCompensMgmt.returnCustomerCompensDetail.do"
            ,param
            ,function (result) {
                if(result.succeeded){
                    alert('접수취소 되었습니다!');
                    window.postMessage('succeeded', _baseUrl);
                    window.close();
                }
            },null,null,true);
    },
    _cpApproval : function(statCd){
        var param = {};
        param.custCpnsAplyNo     = data.custCpnsAplyNo;
        param.cpnsMeanCd         = data.cpnsMeanCd;
        param.cpnsAprvStatCd     = statCd;

        //보상금액
        param.cpnsAmt       = $('#cpnsAmt').val();

        if(data.cpnsMeanCd === cashCode) {
            //은행
            param.payBankCd = $('#payBankCd').val();

            //예금주
            param.payActnNo = $('#payActnNo').val();

            //환불계좌번호
            param.payDepositorNm = $('#payDepositorNm').val();
        }

        param.accpCont  = $('#accpCont').val().trim(); //승인요청메모
        param.payReqMemo  = $('#payReqMemo').val().trim(); //지급요청메모

        param.ordNo = data.ordNo;
        param.mbrNo = data.mbrNo;
        param.payBankCd = data.payBankCd;
        param.payDepositorNm = data.payDepositorNm;
        param.payActnNo = data.payActnNo;

        common.Ajax.sendJSONRequest(
            "post"
            ,_baseUrl + "customerservice/customerCompensMgmt.approveCustomerCompensDetail.do"
            ,param
            ,function (result) {
                if(result.succeeded){
                    alert('승인 되었습니다!');
                    window.postMessage('succeeded', _baseUrl);
                    window.close();
                }
            },null,null,true);
    },
    _rewardReturn : function(type,memo) {
        var param = {};
        param.custCpnsAplyNo = data.custCpnsAplyNo;
        param.type           = type;
        param.memo           = memo;

        common.Ajax.sendJSONRequest(
            "post"
            ,_baseUrl + "customerservice/customerCompensMgmt.returnCustomerCompensDetail.do"
            ,param
            ,function (result) {
                if(result.succeeded){
                    alert('반려 되었습니다!');
                    layerPopClose('layerPop-memo');
                    window.postMessage('succeeded', _baseUrl);
                    window.close();
                }
        },null,null,true)
    },
    _saveValidation : function(){
        var rewardAmt = 0;  //보상승인자 MAX 금액
        var payAmt = 0;     //지급승인자 MAX 금액

        csCpGradeAmtCode.CS025.forEach(function(data){
          if(data.cd === '10'){
              rewardAmt = data.cdNm;
          }
          if(data.cd === '20'){
              payAmt = data.cdNm;
          }
        })

        var cpnsAmt = $('#cpnsAmt').val();
        var limitVal = $('#maxPayLim').val();

        if(cpnsAmt === null || cpnsAmt === '' || cpnsAmt === undefined){
            alert('보상금액은 필수값입니다!');
            $('#cpnsAmt').focus();
            return false;
        }

        if(csCpUserGrade === 'All' || csCpUserGrade === 'P') {
            if (parseInt(cpnsAmt) > parseInt(payAmt)) {
                alert('지급승인자 최대 지급한도는 '+ payAmt + '원 입니다');
                $(this).val(0);
                $('#cpnsAmt').focus();
                return false;
            }
        }else if(csCpUserGrade === 'A'){
            if (parseInt(cpnsAmt) > parseInt(rewardAmt)) {
                alert('보상승인자 최대 지급한도는 '+ rewardAmt + '원 입니다');
                $(this).val(0);
                $('#cpnsAmt').focus();
                return false;
            }
        }else{
            if(parseInt(cpnsAmt) > parseInt(limitVal)){
                alert('최대 지급한도를 초과하여 입력할 수 없습니다!');
                $(this).val(0);
                $('#cpnsAmt').focus();
                return false;
            }
        }

        var accpCont = $('#accpCont').val();
        if(accpCont === null || accpCont === '' || accpCont.trim().length === 0){
            alert('승인요청메모는 필수값입니다!');
            $('#accpCont').focus();
            return false;
        }

        var cpnsMeanCd = $('#cpnsMeanCd').val();
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
