$.namespace("standardCategoryMgmt.eventhandler");
standardCategoryMgmt.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
    }
    // 표준분류기본정보 조회
    , infoSetting : function ( data ) {
        this.stdCtgNo = data.stdCtgNo;
        var self = this;
        common.Ajax.sendRequest("GET"
            , _baseUrl + "display/standardCategoryMgmt.getStandardCategoryMgmtInfo.do"
            , { stdCtgNo : data.stdCtgNo }
            , function ( categoryInfo ) {
                self.categoryInfo = categoryInfo;
                self.setCategoryInfoTable();
                self.setCategoryInfoData();
            }
        );
    }
    // 표준분류기본정보 테이블 세팅
    ,setCategoryInfoTable : function(){
        // 리프여부에 따라 세팅
        var isLeafCtg = (this.categoryInfo.leafCtgYn === 'Y')? true : false;
        this.setSaveBtn(isLeafCtg);
        this.setUnvisibleElement(isLeafCtg);
        this.setUneditableElemtent(isLeafCtg);

    }
    // 표준분류기본정보 조회결과 세팅
    ,setCategoryInfoData : function () {
        var data = this.categoryInfo;

        $('#stdCtgNo').val(data.stdCtgNo);
        $('#stdCtgNm').val(data.stdCtgNm);

        $('#uprStdCtgNo').val(data.uprStdCtgNo);
        $('#uprStdCtgNm').val(data.uprStdCtgNm);

        $("input[name=useYn][value=" + data.useYn + "]").prop('checked', true);
        $("input[name=leafCtgYn][value=" + data.leafCtgYn + "]").prop('checked', true);
        $("input[name=safeCertiNeedYn][value=" + data.safeCertiNeedYn + "]").prop('checked', true);

        $('#sortSeq').val(data.sortSeq);
        $('#goodsNotiLisartCd').val(data.goodsNotiLisartCd);
        $('#goodsNotiLisartCdNm').val(data.goodsNotiLisartCdNm);

        $('#mdId').val(data.mdId);
        $('#mdNm').val(data.mdNm);

        $('#sysModId').text(data.sysModId);
        $('#sysModDtm').text(data.sysModDtm);

    }
    // 리프노드가 아닐 경우 -> 저장버튼 비활성화 처리
    ,setSaveBtn : function ( isLeafCtg ) {
        if ( isLeafCtg ) {
            $('#btn_save_category_info').removeClass('disabled');
        }else {
            $('#btn_save_category_info').addClass('disabled');
        }
    }
    // 리프노드가 아닐 경우 -> 노출 정보 변경
    ,setUnvisibleElement : function ( isLeafCtg ) {
        if ( isLeafCtg ) {
            $('.hideElement').show();
            $('.showElement').attr("colspan", 1);
        }else {
            $('.hideElement').hide();
            $('.showElement').attr("colspan", 3)
        }
    }
    // 리프노드가 아닐 경우 -> 수정 가능 여부 변경
    ,setUneditableElemtent : function ( isLeafCtg ) {

        if ( isLeafCtg ) {
            $('#stdCtgNm').removeClass("disabled");
            $('#stdCtgNm').prop('readonly', false);

            $('#sortSeq').removeClass("disabled");
            $('#sortSeq').prop('readonly', false);

            $("input[name=useYn]").prop('disabled', false);
        }else {
            $('#stdCtgNm').addClass("disabled");
            $('#stdCtgNm').prop('readonly', true);

            $('#sortSeq').addClass("disabled");
            $('#sortSeq').prop('readonly', true);

            $("input[name=useYn]").prop('disabled', true);
        }
    }
    ,bindButtonEvent : function () {
        var that = this;

        // 상품고시품목 검색버튼 클릭시
        $('#btn_call_gnl_popup').click(function () {
            var POP_DATA = {
                url: _baseUrl + 'popup/goodsMgmtPopup.goodsNotiLisartCdListPopup.do'
                , winName: 'goodsNotiLisartCdListPopup'
                , title: '상품고시품목 조회 팝업'
                , _title: '상품고시품목 조회 팝업'
                , left: 20
                , top: 20
                , width: 527
                , height: 530
                , scrollbars: false
                , autoresize: false
            };
            popCommon(null, POP_DATA, function (e) {
                var returnValue = JSON.parse(e.data);
                $('#goodsNotiLisartCdNm').val(returnValue.cdNm);
                $('#goodsNotiLisartCd').val(returnValue.cd);
            });
        });

        // 상품고시품목 지우개버튼 클릭시
        $('#btn_reset_gnl_popup').click(function () {
            $('#goodsNotiLisartCdNm').val('');
            $('#goodsNotiLisartCd').val('');
        });

        // 담당MD 검색버튼 클릭시
        $('#btn_call_md_popup').click(function () {
            var pin = {
                argSelectType   : '1'    //  결과값 갯수
                , argWorkStatCd : '01'   //  근무상태 ( 01 : 재직중, 02 : 퇴사 )
                , argUseYn      : 'Y'    //  사용여부
            };
            var POP_DATA = {
                url: _baseUrl + 'popup/userMgmtPopup.mdListPopup.do'
                , winName: 'mdListPopup'
                , title: 'MD조회'
                , _title: 'MD조회'
                , left: 20
                , top: 20
                , width: 690
                , height: 600
                , scrollbars: false
                , autoresize: false
            };
            popCommon(pin, POP_DATA, function (e) {
                var returnValue = JSON.parse(e.data);
                $('#mdId').val(returnValue[0].userId);
                $('#mdNm').val(returnValue[0].userNm);
            });
        });

        // 담당MD 지우개버튼 클릭시
        $('#btn_reset_md_popup').click(function () {
            $('#mdId').val('');
            $('#mdNm').val('');
        });

        // 저장 버튼 클릭
        $('#btn_save_category_info').click(function () {
            //리프표준분류의 경우에만 저장 가능
            if(that.categoryInfo.leafCtgYn !== 'Y') return;
            that.saveCategoryInfo();
        });

        // 입력값 체크 - 숫자만 입력 가능
        $("input:text[numberOnly]").on("keyup", function() {
            var currentVal = $(this).val();
            $(this).val(onlyInputNumber(currentVal));
        });

    }
    ,checkValidation : function( formData ){

        if( formData.stdCtgNm === '' ){
            alert(msg.stdCtgNm + msg.saveRequiredMsg);
            return false;
        }
        if( formData.useYn === '' || !( formData.useYn === 'Y' || formData.useYn === 'N')){
            alert(msg.useYn + msg.saveRequiredMsg);
            return false;
        }
        if( formData.sortSeq === '' ){
            alert(msg.sortSeq + msg.saveRequiredMsg);
            return false;
        }
        if( formData.safeCertiNeedYn === '' || !( formData.safeCertiNeedYn === 'Y' || formData.safeCertiNeedYn === 'N')){
            alert(msg.safeCertiNeedYn + msg.saveRequiredMsg);
            return false;
        }
        if( formData.goodsNotiLisartCd === '' ){
            alert(msg.goodsNotiLisartCdNm + msg.saveRequiredMsg);
            return false;
        }
        if( formData.mdId === '' ){
            alert(msg.mdNm + msg.saveRequiredMsg);
            return false;
        }
        return true;
    }
    // 저장
    ,saveCategoryInfo : function( ){
        var that = this;

        // 필수값 확인
        if(!this.checkValidation($('#categoryInfoForm').serializeObject())) return;

        if(!confirm(msg.saveConfirmMsg)) return;

        common.Ajax.sendRequest(
               "POST"
             , _baseUrl + "display/standardCategoryMgmt.saveStandardCategoryMgmtInfo.do"
             , fn_disabledSerialize("categoryInfoForm")
             , function(result) {
                  if(result.succeeded){
                      // 표준분류목록 Reload
                      standardCategoryTree.eventhandler.treeLoading();
                  }
             }
        );
    }
}