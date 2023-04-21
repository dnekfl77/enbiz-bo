$.namespace("displayConnectPopupTotal.eventhandler");
displayConnectPopupTotal.eventhandler = {
    // 초기화
    init : function () {
        this.bindButtonEvent();
        this.valSetting();
    },

    bindButtonEvent : function(){
        // 닫기
        $("#btn_popup_close").click(function() {
            if( confirm(msg.cancelMsg) ) {
                window.close();
            }
        });
    },

    valSetting : function(){
        $("#conrNo").text(connerReq.conrNo);
        $("#conrNm").text(connerReq.conrNm);
        $("#hierarchyNm").text(dispDetail.hierarchyNm);
        $("#userNm").text(connerReq.userNm);
        $("#conrDesc").text(connerReq.conrDesc);

        if(connerReq.conrImgPathNm != "") {
            var img = document.createElement("img");
            img.setAttribute("src", connerReq.conrImgPathNm);
            img.setAttribute("alt", "uploadImage");
            img.setAttribute("flag", "none");
            img.setAttribute("langcd", "");
            img.setAttribute("class", "image");
            img.setAttribute("style", "width:auto;height:90px;");
            document.querySelector("div#imgFile").appendChild(img);
        } else {
            var img = document.createElement("img");
            img.setAttribute("src", "/static/img/noimg.png");
            img.setAttribute("alt", "uploadImage");
            img.setAttribute("flag", "none");
            img.setAttribute("langcd", "");
            img.setAttribute("class", "image");
            img.setAttribute("style", "width:auto;height:90px;");
            document.querySelector("div#imgFile").appendChild(img);
        }

        if(connerReq.setUseYn == "N") {
            var param = { dispCtgNo : dispDetail.dispCtgNo, conrNo : connerReq.conrNo, setYn : connerReq.setUseYn };
            common.Ajax.sendRequestSync(
                 "POST"
                 , _baseUrl + "display/displayConnectMgmt.getConrTgtCdList.do"
                 , param
                 , function(obj) {
                      if (obj.data != null) {
                         displayConnectPopupTotal.eventhandler.tabSetting(obj.data);
                      }
                 }
            );
        }
    },

    tabSetting : function(data){
        $('.tabs-area > ul > li').remove();
        for(var i=0; i<data.length; i++) {
            $('.tabs-area > ul').append("<li><a>" + data[i].conrTgtName + " (" + data[i].conrTgtCnt + "개) </a>"
                                        + "<input type='hidden' name='conrTgtCd' value='" + data[i].conrTgtCd + "'/>"
                                        + "<input type='hidden' name='conrTgtNo' value='" + data[i].conrTgtNo + "'/></li>");
        }

        $('.tabs-area > ul > li').on('click', function(){
              $(this).siblings().removeClass('active');
              $(this).addClass('active');

              var inx = $(this).index();
              var tab_body = $(this).parent().siblings('.tabs-body');
              tab_body.children('.tab-cont').hide();
              tab_body.children('.tab-cont:eq(' + inx + ')').show();

              var conrTgtCd = $(this).children('input[name=conrTgtCd]').val();
              var conrTgtNo = $(this).children('input[name=conrTgtNo]').val();
              $('.tabs-area > .tabs-body > .tab-cont').hide();
              $(".tabs-area > .tabs-body > div").each(function(){
                  var id = $(this).attr("id").split("_");
                  if(id[1] == conrTgtCd) {
                      $(".tabs-area > .tabs-body > .tab-cont[id=tabGrid_" + conrTgtCd + "]").show();
                  }
              });
              displayConnectPopupTotal.eventhandler.tabEvent(conrTgtCd);
        });

        // 화면 로드시 첫번째 탭 선택
        $('.tabs-area > ul > li:eq(0)').addClass('active');

        var conrTgtCd = $('.tabs-area > ul > .active > input[name=conrTgtCd]').val();
        var conrTgtNo = $('.tabs-area > ul > .active > input[name=conrTgtNo]').val();

        $('.tabs-area > .tabs-body > .tab-cont').hide();
        $(".tabs-area > .tabs-body > div").each(function(){
            var id = $(this).attr("id").split("_");
            if(id[1] == conrTgtCd) {
                $(".tabs-area > .tabs-body > .tab-cont[id=tabGrid_" + conrTgtCd + "]").show();
            }
        });

        displayConnectPopupTotal.eventhandler.tabEvent(conrTgtCd);
    },

    tabEvent : function(type){
       if(type == "11") { // 상품
            connectTabGoodsGrid.eventhandler.init();
       } else if(type == "12") { // 브랜드
            connectTabBrandGrid.eventhandler.init();
       } else if(type == "13") { // 상품리뷰
            connectTabReviewGrid.eventhandler.init();
       } else if(type == "14") { // 기획전
            connectTabMkdpGrid.eventhandler.init();
       } else if(type == "21") { // HTML
            connectTabHtmlGrid.eventhandler.init();
       } else if(type == "22") { // 이미지배너
            connectTabImgGrid.eventhandler.init();
       } else if(type == "23") { // TEXT 베너
            connectTabTextGrid.eventhandler.init();
       }
    }

};