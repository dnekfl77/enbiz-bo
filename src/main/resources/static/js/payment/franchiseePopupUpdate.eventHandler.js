$.namespace("franchiseePopupUpdate.eventhandler");
franchiseePopupUpdate.eventhandler = {
    // 초기화
    init : function () {
        if( req.argInsertUpdate == "I") { // 입력
            this.valueInit();
        }
        if(req.argInsertUpdate == "U") { // 수정
            this.valueSetting();
        }
        this.bindButtonEvent();
    },

    // 초기화면 값 셋팅
    valueInit : function(){
        $('input:radio[name=onoffLineGbCd]').first().attr("checked",true); // 온오프라인 구분
        $('input:radio[name=pointUseYn]').first().attr("checked",true); // 포인트 사용여부
        $('input:radio[name=nintUseYn]').first().attr("checked",true); // 무이자 사용여부
        $('input:radio[name=useYn]').first().attr("checked",true); // 사용여부
        $('input:radio[name=aplySiteGbCd]').first().attr("checked",true); // 적용사이트 (기본 : 범용)
        $("#btn_site_insert").css("display","none"); // 적용사이트 : 범용 인경우 숨김
        $(".quick-search").css("display","none"); // 적용사이트 : 범용 인경우 숨김
    },

    // 수정 시 값 셋팅
    valueSetting : function(){
        $("#mersNoText").text(req.mersNo);
        $("#mersNo").val(req.mersNo);
        $("#acqrCd").val(req.acqrCd);
        $('input:radio[name=onoffLineGbCd]:input[value='+ req.onoffLineGbCd +']').attr("checked",true);
        $("#pgGbCd").val(req.pgGbCd);
        $('input:radio[name=pointUseYn]:input[value='+ req.pointUseYn +']').attr("checked",true);
        $('input:radio[name=nintUseYn]:input[value='+ req.nintUseYn +']').attr("checked",true);
        $("#termlId").val(req.termlId);
        $('input:radio[name=useYn]:input[value='+ req.useYn +']').attr("checked",true);
        $('input:radio[name=aplySiteGbCd]:input[value='+ req.aplySiteGbCd +']').attr("checked",true);
        $("#sysModId").text(req.sysModId);
        $("#sysModDtm").text(req.sysModDtm);
        this.siteButtonSetting();

        if(req.aplySiteGbCd == "20"){ // 일부적용
            this.addTargetUI("#apply-site-ul", reqSiteList)
        }
    },

    bindButtonEvent : function(){
        var self = this;

         $("input:radio[name='aplySiteGbCd']").change(function(){
            self.siteButtonSetting();
         });

        // 사이트 추가
        $("#btn_site_insert").click(function() {
            self.onCallSitePopup();
        });

        // 닫기 버튼
        $("#btn_popup_cancel").click(function() {
            if(confirm(msg.cancelMessage) == true) {
                window.close();
            } else {
               return;
            }
        });

        // 저장 버튼
        $("#btn_popup_save").click(function() {
            self.onSave();
        });

        $(document).on("click",".target-delete",function(){
            if(confirm("삭제하시겠습니까?")){
                $(this).closest('li').remove();
            }
        });

    },

    siteButtonSetting : function() {
        if($("input[name=aplySiteGbCd]:checked").val() == "10"){ // 범용
            $("#btn_site_insert").css("display","none");
            $(".quick-search").css("display","none");
        }else if($("input[name=aplySiteGbCd]:checked").val() == "20"){ // 일부적용
            $("#btn_site_insert").css("display","");
            $(".quick-search").css("display","");
        }
    },

    // 사이트 추가
    onCallSitePopup : function(){
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
        popCommon(pin, POP_DATA, function(e){
             //사이트 조회
             var siteData = JSON.parse(e.data);
             var popupData = [{ key : siteData.siteNo , data : siteData.siteNm}];
             franchiseePopupUpdate.eventhandler.addTargetUI("#apply-site-ul",popupData);
         });
    },

    // 선택된 사이트 데이터 삽입
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

    // 필수 입력 값 체크
    valCheck : function(){
        if($('#acqrCd').val() == null || $('#acqrCd').val() == '') { // 매입사
            alert("매입사는 " + msg.necessaryCheckMessage);
            $('#acqrCd').focus();
            return false;
        } else if($('#pgGbCd').val() == null || $('#pgGbCd').val() == '') { // PG사
            alert("PG사는 " + msg.necessaryCheckMessage);
            $('#pgGbCd').focus();
            return false;
        } else if($('#termlId').val() == null || $('#termlId').val() == '') { // 터미널ID
             alert("터미널ID는 " + msg.necessaryCheckMessage);
             $('#termlId').focus();
             return false;
        } else if($("input[name=aplySiteGbCd]:checked").val() == "20"){ // 적용사이트 : 일부적용인 경우 선택된 사이트가 하나 이상 존재해야함
            if($("#apply-site-ul > li").length <= 0) {
                 alert(msg.siteCheckMessage);
                 return false;
            }
        }

        return true;
    },

    checkSiteList : function(){
        var result = [];
        $("#apply-site-ul").children().each(function(){
            result.push($(this).attr('dataName'));
        })
        $('#siteList').val(result);
    },

    // 저장
    onSave : function() {
        if( !this.valCheck() ) { // 폼 빈값 확인
            return;
        }

        if( !confirm(msg.save)) { // 저장확인 문구
            return;
        }

        if($("input[name=aplySiteGbCd]:checked").val() == "20") {
            this.checkSiteList();
        }

        if(req.argInsertUpdate == "U") { // 업데이트 전에 disabled 풀어주기
            $("#franchiseeForm").find(':input',':select').attr('disabled',false);
        }

        common.Ajax.sendRequest(
            "POST"
            , _baseUrl + "payment/FranchiseeMgmt.saveFranchiseeDetail.do"
            , $("#franchiseeForm").serialize()
            , function ( data ) {
                  if(data.succeeded){
                      // alert(data.message);
                      opener.franchiseeGrid.eventhandler.onSearch(0);
                      window.close();
                  } else {
                      console.log("가맹점 등록/수정 오류");
                  }
            }
        );
    }
};