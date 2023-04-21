$.namespace("marketingDisplayPopup.eventhandler");
marketingDisplayPopup.eventhandler = {
    // 초기화
    init : function () {
        this.tabSetting();

        var oEditors = [];
        this.calendarInit();

        if(req.argInsertUpdate == "I") { // 입력
            this.editerInit(oEditors);
            this.valueInit();
        } else if(req.argInsertUpdate == "U") { // 수정
            if(req.dispStat != "30") {
                this.editerInit(oEditors);
            } else {
                this.editerDisabled(oEditors);
                $(".inside").attr('disabled',true); // 구분자별 상품 정보 탭 _ 그리드 버튼 처리
            }
            this.valueSetting();
            this.disabledSetting();
        }

        this.bindButtonEvent(oEditors);
    },

    tabSetting : function(){
        $('.tabs-area').each(function(){
            $(this).children('.tabs-body').children('.tab-cont:first').show();
            var tab_type = $(this).children('.tabs').children('li');

            tab_type.on('click',function(){
                  var inx = $(this).index();
                  var tab_body = $(this).parent().siblings('.tabs-body');
                  $(this).siblings().removeClass('active');
                  $(this).addClass('active');

                  if(inx == 1) {
                      mkdpDivGrid.eventhandler.init();
                      mkdpGoodsGrid.eventhandler.init();
                  }

                  tab_body.children('.tab-cont').hide();
                  tab_body.children('.tab-cont:eq(' + inx + ')').show();
            });
        });
    },

    editerInit : function(oEditors) {
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: "mkdpTtlHtml",
			sSkinURI: "/static/js/libs/smartEditor/SmartEditor2Skin.html",
			fCreator: "createSEditor2"
      	});
    },

    editerDisabled : function(oEditors) {
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: "mkdpTtlHtml",
			sSkinURI: "/static/js/libs/smartEditor/SmartEditor2Skin.html",
			fCreator: "createSEditor2",
			fOnAppLoad : function(){
                var editor = oEditors.getById["mkdpTtlHtml"];
                editor.exec("DISABLE_WYSIWYG");
                editor.exec("DISABLE_ALL_UI");
            }
      	});
    },

    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(0);
        $('#startDate').val(initFromAndToCalDate[0]);
        $('#endDate').val(initFromAndToCalDate[1]);
        $('#endHour').val('23');
        $('#endMinute').val('59');
    },

    valueInit : function(){
        $('input:radio[name=dispYn]:input[value=Y]').attr("checked",true); // 전시여부
        this.imgSetting(1,"/static/img/noimg.png"); // 기획전 PC 배너
        this.imgSetting(2,"/static/img/noimg.png"); // 기획전 모바일 배너
        $(".tabs-area > .tabs > li:eq(1)").hide();
    },

    valueSetting : function(){
        $("#mkdpNo").val(req.mkdpNo);
        $("#marketingDisplayNo").text(req.mkdpNo);
        $("#siteNo").val(req.siteNo);
        $("#mkdpTypCd").val(req.mkdpTypCd);
        $("#mkdpNm").val(req.mkdpNm);
        $("#mdId").val(req.mdId);
        $("#mdNm").val(req.mdNm);
        $("#dispSeq").val(req.dispSeq);
        $("#mkdpListPrtCnt").val(req.mkdpListPrtCnt);
        $('input:radio[name=dispYn]:input[value='+ req.dispYn +']').attr("checked",true);
        $("#tmplNo").val(req.tmplNo);
        $("#tmplNm").val(req.tmplNm);
        $("#tmplPathNm").val(req.tmplPathNm);
        $("#kwd1Nm").val(req.kwd1Nm);
        $("#kwd2Nm").val(req.kwd2Nm);
        $("#kwd3Nm").val(req.kwd3Nm);

        var strDate = req.dispStrDtm.split(" "); //popupDispStrDtm
        $("#startDate").val(strDate[0]);
        var strDate_time = strDate[1].split(":");
        $("#startHour").val(strDate_time[0]);
        $("#startMinute").val(strDate_time[1]);

        var endDate = req.dispEndDtm.split(" ");
        $("#endDate").val(endDate[0]);
        var endDate_time = endDate[1].split(":");
        $("#endHour").val(endDate_time[0]);
        $("#endMinute").val(endDate_time[1]);

        $("#sysModId").text(req.sysModId);
        $("#sysModDtm").text(req.sysModDtm);
        $("#mkdpTtlHtml").val(req.mkdpTtlHtml);

        // 첨부파일 셋팅
        this.imgSetting(1,"/static/img/noimg.png"); // 기획전 PC 배너
        this.imgSetting(2,"/static/img/noimg.png"); // 기획전 모바일 배너
        if(reqImg.length > 0) {
            for(let imgInfo of reqImg){
                let imageView;
                if(imgInfo.imgTypCd === '01'){ // 기획전 PC 배너
                   $('input[name=image1]').val(imgInfo.bnrImgFileNm);
                   this.imgSetting(1,imgInfo.bnrImgPathNm);
                }else if(imgInfo.imgTypCd === '02'){ // 기획전 모바일 배너
                   $('input[name=image2]').val(imgInfo.bnrImgFileNm);
                   this.imgSetting(2,imgInfo.bnrImgPathNm);
                }
            }
        }
    },

    disabledSetting : function() {
        // dispStat ( 10:준비중 / 20:진행중 / 30:종료 )
        // 수정불가 내역 셋팅
        if(req.dispStat == "30") { // 진행중인 경우
            $("#siteNo").attr('disabled',true);
            $("#mkdpTypCd").attr('disabled',true);

            $("#picker-group-1 > span").css("display","none");
            $("#startDate").attr('disabled',true);
            $("#startHour").attr('disabled',true);
            $("#startMinute").attr('disabled',true);
        } else if(req.dispStat == "30") { // 종료인 경우
            $('#marketingDisplayForm').find(':input',':select',':textarea').attr('disabled',true);
            $(".input-group-addon").css("display","none");
            $(".small").css("display","none"); // form 안의 버튼 막기
        }
    },

    bindButtonEvent : function(oEditors){
        var self = this;

		//달력버튼
     	$('#calendarButton1').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#startDate').val(),
				max_term:0,
				fn:function(pin) {
					$('#startDate').val(pin.yyyymmdd);
				}
			});
		});

		//달력버튼
     	$('#calendarButton2').click(function() {
			showCalendar({
				type:'C', // C:해당 날짜 1개 선택
				format:'yyyy-MM-dd',
				yyyymmdd:$('#endDate').val(),
				max_term:0,
				fn:function(pin) {
					$('#endDate').val(pin.yyyymmdd);
				}
			});
		});

		// 담당MD 검색버튼 클릭시
		$('#btn_call_md_popup').click(function () {
		    self.onMdPopup();
		});

		// 담당MD 지우개버튼 클릭시
		$('#btn_reset_md_popup').click(function () {
			$('#mdId').val('');
			$('#mdNm').val('');
		});

		// 템플릿 검색버튼 클릭시
		$('#btn_call_tmpl_popup').click(function () {
		    self.onTmplPopup();
		});

		// 템플릿 지우개버튼 클릭시
		$('#btn_reset_tmpl_popup').click(function () {
			$('#tmplNo').val('');
			$('#tmplNm').val('');
			$('#tmplPathNm').val('');
		});

        // 파일 선택 클릭
        $('.btn_image_upload').on('click',e => {
           let el = $(e.currentTarget);
           el.siblings('.imageFile').click();
        });

        $('.imageFile').on('change', e => {
            // 이미지 확장자 체크
            var fileType = ["image/png", "image/gif", "image/jpeg"];
            var fileCheck = false;
            for(var i=0; i<fileType.length; i++){
                if(e.target.files[0].type === fileType[i]) {
                    fileCheck = true;
                    break;
                }
            }
            if(!fileCheck) {
                alert(msg.fileTypeError);
                return false;
            }

            // 이미지 사이즈 체크
            if(e.target.files[0].size > maxUploadSizeImgFile) {
                alert(msg.fileLimitSize);
                return false;
            }

            $(e.currentTarget).siblings('.imageFileName').val(e.target.files[0].name);

            // 이미지 미리보기
            let idx = e.target.id.substring(e.target.id.length-1, e.target.id.length);
            var reader = new FileReader();
            reader.onload = function (e) {
               self.imgSetting(idx, e.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        });

        $('.btn_image_clear').on('click',e => {
           let fileId = $(e.currentTarget).parent().find('.imageFileName')[0].name;
           let idx = fileId.substring(fileId.length-1, fileId.length);
           $(e.currentTarget).parent().find('.imageFileName').val('');

           if($.browser.msie) {
               $(e.currentTarget).parent().find('.imageFile').replaceWith( el.parent().find('.imageFile').clone(true));
           } else{
               $(e.currentTarget).parent().find('.imageFile').val('');
           }
           this.imgSetting(idx,"/static/img/noimg.png");
        });

        // 취소 버튼
        $('#btn_popup_cancel').click(function() {
            if(confirm(msg.cancelMessage) == true) {
                window.close();
            } else {
               return;
            }
        });

        // 저장 버튼
        $('#btn_popup_save').click(function() {
            self.onSave(oEditors);
        });

        // 상단 _ 모바일 미리보기 버튼
        $('#mobilePreView').click(function() {
            alert("모바일 미리보기 팝업");
        });

        // 상단 _ PC 미리보기 버튼
        $('#pcPreView').click(function() {
            alert("PC 미리보기 팝업");
        });

    },

    // 담당MD 조회
    onMdPopup : function(){
        var pin = {
            argSelectType   : '1'	//  결과값 갯수
            , argWorkStatCd : '01'  //  근무상태 ( 01 : 재직중, 02 : 퇴사 )
            , argUseYn	  : 'Y'	    //  사용여부
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
    },

    // 템플릿 조회
    onTmplPopup : function(){
        var pin = {
            argSelectType   : '1'	//  결과값 갯수
            , argTmplTypCd : '08'   //  08 : 기획전 메인
        };
        var POP_DATA = {
            url: _baseUrl + 'popup/templateMgmtPopup.templateListPopup.do'
            , winName: 'templatePopup'
            , title: '템플릿 조회'
            , _title: '템플릿 조회'
            , left: 20
            , top: 20
            , width: 1000
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function (e) {
            var returnValue = JSON.parse(e.data);
            $('#tmplNo').val(returnValue[0].tmplNo);
            $('#tmplNm').val(returnValue[0].tmplNm);
            $('#tmplPathNm').val(returnValue[0].tmplFilePath);
        });
    },

    checkDateVal : function(){
        var today = new Date(); // 현재날짜
        today = today.getFullYear() + "" + addzero(today.getMonth() + 1) + "" + addzero(today.getDate());

        var startDate = $("#startDate").val().replace(/-/g, '');
        var endDate = $("#endDate").val().replace(/-/g, '');

        if(req.argInsertUpdate == "I") {
            if (today > startDate) {
                alert(msg.dataCheck1);
                return false;
            }
        }

        if(endDate < startDate) {
            alert(msg.dataCheck3);
            return false;
        } else {
            if (endDate < startDate) {
                alert(msg.dataCheck3);
                return false;
            } else if (endDate == startDate) {  // 날짜가 같은 경우 시간 비교
                if( $("#endHour").val() < $("#startHour").val() ) {
                    alert(msg.dataCheck3);
                    return false;
                } else if( $("#endHour").val() == $("#startHour").val() ) { // 시간이 같은 경우 분 비교
                    if( $("#endMinute").val() <= $("#startMinute").val() ) {
                        alert(msg.dataCheck3);
                        return false;
                    }
               }
            }
        }

        return true;
    },

    valCheck : function(){

        if($('#siteNo').val() == null || $('#siteNo').val() == '') { // 사이트
            alert("사이트는 " + msg.necessaryCheckMessage);
            $('#siteNo').focus();
            return false;
        } else if($('#mkdpTypCd').val() == null || $('#mkdpTypCd').val() == '') { // 기획전 유형
            alert("기획전 유형은 " + msg.necessaryCheckMessage);
            $('#mkdpTypCd').focus();
            return false;
        } else if($('#mkdpNm').val() == null || $('#mkdpNm').val() == '') { // 기획전 명
             alert("기획전명은 " + msg.necessaryCheckMessage);
             $('#mkdpNm').focus();
             return false;
        } else if($('#mdNm').val() == null || $('#mdNm').val() == '') { // 담당 MD
             alert("담당 MD는 " + msg.necessaryCheckMessage);
             $('#mdNm').focus();
             return false;
        } else if($('#dispSeq').val() == null || $('#dispSeq').val() == '') { // 전시순서
             alert("전시순서는 " + msg.necessaryCheckMessage);
             $('#dispSeq').focus();
             return false;
        } else if($('#mkdpListPrtCnt').val() == null || $('#mkdpListPrtCnt').val() == '') { // 리스트 출력 수
             alert("리스트 출력 수는 " + msg.necessaryCheckMessage);
             $('#mkdpListPrtCnt').focus();
             return false;
        } else if($('#tmplNm').val() == null || $('#tmplNm').val() == '') { // 템플릿
             alert("템플릿은 " + msg.necessaryCheckMessage);
             $('#tmplNm').focus();
             return false;
        }

        return true;
    },

    formatDate : function () {
        var dispStrDtm = $("#startDate").val() + " " + $("#startHour").val() + ":" + $("#startMinute").val() + ":00";
        $("#dispStrDtm").val(dispStrDtm);
        var dispEndDtm = $("#endDate").val() + " " + $("#endHour").val() + ":" + $("#endMinute").val() + ":59";
        $("#dispEndDtm").val(dispEndDtm);
    },

    onSave : function(oEditors) {
        if(this.checkDateVal()){ // 날짜 체크 & 값 체크


	        var dataResource = grid.getDataSource();
	        var rowState = dataResource.getAllStateRows();
	        var rowList = rowState.created.concat(rowState.updated);
	        var indexList = grid.getItemsOfRows(rowList);
	        var log = grid.validateCells(indexList,false); // null 전체
	        if(log != null) {
	            alert(log[0].message);
	            return;
	        }

            this.formatDate(); // 날짜 셋팅
            oEditors.getById["mkdpTtlHtml"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터의 내용을 textarea에 적용

            // 첨부파일 셋팅
            let imageFiles = $('input[type=file]');
            const uploadFile = new FormData();
            var thisForm = $('#marketingDisplayForm');
            var disabled = thisForm.find(':input:disabled',':select:disabled').removeAttr('disabled');
            var thisFormObject = thisForm.serializeObject();
            thisFormObject.imgList = new Array();

            for(let i=0;i<imageFiles.length;i++){
                if(imageFiles[i].files[0] !== undefined) {
                    uploadFile.append('file',imageFiles[i].files[0]);
                    uploadFile.append('type',"marketingDisplayManagement");
                    var imgTypCdList = new Object();
                    imgTypCdList.imgTypCd = '0' + (i+1);
                    thisFormObject.imgList.push(imgTypCdList);
                }
            }

            uploadFile.append('prMkdpBaseRequest',JSON.stringify(thisFormObject));
            disabled.attr('disabled','disabled');

            $.ajax({
                url: _baseUrl + "display/marketingDisplayMgmt.saveMarketingDisplay.do",
                data:uploadFile,
                type:'POST',
                enctype:'multipart/form-data',
                processData:false,
                contentType:false,
                dataType:'json',
                cache:false,
                success:function(obj){
                    if(obj.succeeded){
                        alert(msg.successfully);
                        if(obj.data != null) {
                            req = obj.data[0];
                            reqImg = obj.data[1];
                            $(".tabs-area > .tabs > li:eq(1)").show();
                            marketingDisplayPopup.eventhandler.valueSetting();
                            mkdpDivGrid.eventhandler.onSearch(0);
                        }
                    }
                },
                error: function(error){
                }
            });

        }
    },

    imgSetting : function(idx, src){
        $("div#imgFile" +idx + " > img").remove();
        var img = document.createElement("img");
        img.setAttribute("src", _uploadDomain+src);
        img.setAttribute("alt", "uploadImage");
        img.setAttribute("flag", "none");
        img.setAttribute("langcd", "");
        img.setAttribute("class", "image");
        img.setAttribute("style", "width:auto;height:90px;");
        document.querySelector("div#imgFile" +idx).appendChild(img);
    }
};