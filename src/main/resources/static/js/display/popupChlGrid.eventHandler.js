$.namespace("popupChlGrid.eventhandler");
popupChlGrid.eventhandler = {

    init : function () {
        this.gridLoading();
        this.editerInit();
        this.calendarInit();
        this.valueInit();
        if(requestData != null) { // 수정
            this.valueSetting();
            this.onSearch(0, false); // 적용 채널 조회
        }
        this.bindButtonEvent();
    },

    gridLoading : function(){
        var self = this;

        // 선택된 그리드 배경색 넣기
		this.grid.onItemChecked = function(grid, itemIndex, checked) {
            grid.setCurrent({ itemIndex: itemIndex })
        }
        this.grid.setRowStyleCallback(function(grid, item, fixed) {
            if (item.checked) {
                return 'rg-trcol_active'
            }
        });
    },

    editerInit : function() {
		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: "popupCont",
			sSkinURI: _baseUrl + "static/js/libs/smartEditor/SmartEditor2Skin.html",
			fCreator: "createSEditor2"
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
        $('input:radio[name=dispMediaCd]').first().attr("checked",true);
        this.layoutSetting();

        $('input:radio[name=useYn]').first().attr("checked",true);
        $('input:radio[name=prtTypCd]').first().attr("checked",true);
    },

    valueSetting : function(){
        $("#siteNo").val(requestData.siteNo);
        $("#popupNo").val(requestData.popupNo);
        $("#popupNm").val(requestData.popupNm);
        $('input:radio[name=dispMediaCd]:input[value='+ requestData.dispMediaCd +']').attr("checked",true);
        this.layoutSetting();

        var strDate = requestData.popupDispStrDtm.split(" ");
        $("#startDate").val(strDate[0]);
        var strDate_time = strDate[1].split(":");
        $("#startHour").val(strDate_time[0]);
        $("#startMinute").val(strDate_time[1]);

        var endDate = requestData.popupDispEndDtm.split(" ");
        $("#endDate").val(endDate[0]);
        var endDate_time = endDate[1].split(":");
        $("#endHour").val(endDate_time[0]);
        $("#endMinute").val(endDate_time[1]);

        $("#prioRnk").val(requestData.prioRnk);
        $("#popupTypCd").val(requestData.popupTypCd);
        $("#popupSzWdt").val(requestData.popupSzWdt);
        $("#popupSzHigh").val(requestData.popupSzHigh);
        $("#popupLocLeft").val(requestData.popupLocLeft);
        $("#popupLocTop").val(requestData.popupLocTop);
        $("#popupLnk").val(requestData.popupLnk);
        $("#popupCont").val(requestData.popupCont);
        $('input:radio[name=useYn]:input[value='+ requestData.useYn +']').attr("checked",true);
        $('input:radio[name=prtTypCd]:input[value='+ requestData.prtTypCd +']').attr("checked",true);

        // 대상화면 checkbox 셋팅
        if(requestData.screenNm != null) {
            var val = requestData.screenNm.split(",");
            var chkbox = $("input[name=popupTgtScrn]");
            for(j=0;j<val.length;j++) {
                $('input:checkbox[name=popupTgtScrn]:input[value='+ val[j] +']').attr("checked",true);
            }
        }

        // 첨부파일 셋팅
        $("#popupImgFileNm").val(requestData.popupImgFileNm);
        $("#popupImgPathNm").val(requestData.popupImgPathNm);
        if(requestData.popupImgFileNm != "" && requestData.popupImgPathNm != "") {
            $(".input-group.file-upload").append('<ul class="file-list"></ul>');
            $(".input-group.file-upload > .file-list").append('<li id="li_file">' + requestData.popupImgFileNm + '<button id="btn_file_delete" class="delete" type="button">삭제</button></li>');
            $("#btn_file_delete").on("click", function(e) {
                $("#popupImgFileNm").val("");
                $("#popupImgPathNm").val("");
                $("#li_file").remove();
            });
        }

    },

    bindButtonEvent : function(){
        var self = this;

         $("input:radio[name=dispMediaCd]").change(function(){
            self.layoutSetting();
         });

        // 그리드 채널 추가 버튼
        $("#btn_grid_insert").click(function() {
            self.channelPopup();
        });

        // 그리드 행삭제 버튼
        $("#btn_grid_remove").click(function() {
            self.grid.cancel();
            self.onDelete();
        });

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

		// 파일 선택 버튼
	    $("#btn_fileUpload").on("click", function(e) {
            e.preventDefault();
            if($(".input-group.file-upload > .file-list > li").length == 1) {
                alert(msg.fileLength);
                return false;
            } else {
                $(".input-group.file-upload > input[type=file]").remove();
                $(".input-group.file-upload").append('<input type="file" style="display: none" name="files" id="uploadedFile"/>');

                $("#uploadedFile").on("change", function(e) {
                    if(e.currentTarget.files.length > 0) {
                        if(e.currentTarget.files[0].size > maxUploadSizePerFile) {
                            alert(msg.fileLimitSize);
                            return false;
                        }

                        var fileType = ["image/png", "image/gif", "image/jpeg"];
                        var fileCheck = false;
                        for(var i=0; i<fileType.length; i++){
                            if(e.currentTarget.files[0].type === fileType[i]) {
                                fileCheck = true;
                                break;
                            }
                        }

                        if(!fileCheck) {
                            alert(msg.fileTypeError);
                            return false;
                        }

                        if( $(".input-group.file-upload > .file-list").length <= 0 ) {
                            $(".input-group.file-upload").append('<ul class="file-list"></ul>');
                        }

                        $(".input-group.file-upload > .file-list").append(`<li id="uploadedLi">${e.currentTarget.files[0].name} <button id="delete" class="delete" type="button">삭제</button></li>`);

                        $("#delete").on("click", function(e) {
                            $("#uploadedFile").remove();
                            $("#uploadedLi").remove();
                        });
                    }
                });
                $("#uploadedFile").click();
            }
        });

        // 취소 버튼
        $('#btn_popup_cancel').click(function() {
            if(confirm(msg.cancelMessage)) {
                window.close();
            } else {
               return;
            }
        });

        // 저장 버튼
        $('#btn_popup_save').click(function() {
            self.onSave();
        });
    },

    onSave : function() {
        this.grid.commit();
        var dataResource = this.grid.getDataSource();
        for(var i = 0; i<this.grid.getItemCount(); i++){
            if(this.grid.getDataSource().getRowState(i) == "created") {
                this.grid.checkRow(i);
            }
        }

        var formData = new FormData();
        if(!this.checkDate()){ return false; }  // 날짜 체크
        if(!this.valCheck()){ return false; }   // 값 체크

        if(!confirm(msg.saveQuestionMessage)) { return false; }

        this.checkBoxVal(); // checkbox 값 셋팅
        this.farmatDate(); // 날짜 셋팅
        oEditors.getById["popupCont"].exec("UPDATE_CONTENTS_FIELD", []); // 에디터의 내용을 textarea에 적용

        // 모바일인 경우 첨부파일 저장
        if($("input[name=dispMediaCd]:checked").val() == "02"){
            if($(".input-group.file-upload input[type=file]").length > 0) {
                var file = $(".input-group.file-upload input[type=file]")
                if(file.getFileSize() > 200000) {
                    alert(msg.fileLimitSize);
                    return false;
                } else {
                    formData.append("file", file[0].files[0]);
                }
            }
        }

        if(requestData != null) { // 업데이트 전에 disabled 풀어주기
            $('input:radio[name=dispMediaCd]').attr("disabled",false);
        }
        $("input[name=popupTgtScrn]").attr("disabled",true);

        var sitePopupForm = $('#sitePopupForm').serializeObject();
        formData.append('prSitePopupInfoRequest', JSON.stringify(sitePopupForm));
        formData.append('popupChlGrid', JSON.stringify(this.controller.extractGridPayloads(this.grid)));

        $.ajax({
            url: _baseUrl + "display/sitePopupMgmt.saveSitePopupMgmt.do",
            data:formData,
            type:'POST',
            enctype:'multipart/form-data',
            processData:false,
            contentType:false,
            dataType:'json',
            cache:false,
            success:function(data){
                alert(data.message);
                if(data.succeeded){
                    opener.sitePopupGrid.eventhandler.onSearch(0, false);
                    window.close();
               }
            },
            error:function(){
                if(requestData != null) {
                    $('input:radio[name=dispMediaCd]').attr("disabled",true);
                }
                $("input[name=popupTgtScrn]").attr("disabled",false);
            },
        });
    },

    layoutSetting : function() {
        if($("input[name=dispMediaCd]:checked").val() == "01"){ // PC인 경우
            $("#pc_layout_1").css("display","");
            $("#pc_layout_2").css("display","");
            $("#mobile_layout_1").css("display","none");
            $("#mobile_layout_2").css("display","none");
        }else if($("input[name=dispMediaCd]:checked").val() == "02"){ // 모바일인 경우
            $("#pc_layout_1").css("display","none");
            $("#pc_layout_2").css("display","none");
            $("#mobile_layout_1").css("display","");
            $("#mobile_layout_2").css("display","");
        }
    },

    farmatDate : function () {
        var popupDispStrDtm = $("#startDate").val() + " " + $("#startHour").val() + ":" + $("#startMinute").val() + ":00";
        $("#popupDispStrDtm").val(popupDispStrDtm);
        var popupDispEndDtm = $("#endDate").val() + " " + $("#endHour").val() + ":" + $("#endMinute").val() + ":59";
        $("#popupDispEndDtm").val(popupDispEndDtm);
    },

    checkBoxVal : function(){
        var result = Array();
        var cnt = 0;
        var chkbox = $("input[name=popupTgtScrn]");
        for(i=0;i<chkbox.length;i++) {
            if(chkbox[i].checked == true) {
                result[cnt] = chkbox[i].value;
                cnt++;
            }
        }
        $('#popupTgtScrnList').val(result);
    },

    checkDate : function(){
        var startLastDate = new Date(); // 선택 불가능한 마지막 날짜
	    startLastDate = new Date(startLastDate.setDate(startLastDate.getDate()-1));
        startLastDate = startLastDate.getFullYear() + "" + addzero(startLastDate.getMonth() + 1) + "" + addzero(startLastDate.getDate());

        var lastDate = new Date(); // 선택가능한 마지막 날짜
	    lastDate = new Date(lastDate.setDate(lastDate.getDate()+91)); // 3개월(91일로 계산)
        lastDate = lastDate.getFullYear() + "" + addzero(lastDate.getMonth() + 1) + "" + addzero(lastDate.getDate());

        var startDate = $("#startDate").val().replace(/-/g, '');
        var endDate = $("#endDate").val().replace(/-/g, '');

        // 입력인 경우 현재보다 이전날짜는 선택 불가
        if(requestData == null) {
            if (startLastDate >= startDate) {
                alert(msg.dataCheck1);
                return false;
            }
        }

        // 팝업 시작일자는 현재날짜 기준 3개월 이내 날짜 선택 가능
        if(lastDate < startDate) {
            alert(msg.dataCheck2);
            return false;
        }

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

        return true;
    },

    valCheck : function(){
        if($('#siteNo').val() == null || $('#siteNo').val() == '') { // 사이트
            alert(msg.siteNm + msg.necessaryCheckMessage);
            $('#siteNo').focus();
            return false;
        } else if($('#popupNm').val() == null || $('#popupNm').val() == '') { // 팝업명
             alert(msg.popupNm + msg.necessaryCheckMessage);
             $('#popupNm').focus();
             return false;
        } else if($('#prioRnk').val() == null || $('#prioRnk').val() == '') { // 우선순위
             alert(msg.prioRnk + msg.necessaryCheckMessage);
             $('#prioRnk').focus();
             return false;
        } else if($('#popupTypCd').val() == null || $('#popupTypCd').val() == '') { // 팝업 유형
             alert(msg.popupTypCd + msg.necessaryCheckMessage);
             $('#popupTypCd').focus();
             return false;
        } else if($("input[name=popupTgtScrn]:checked").length == 0) { // 대상 화면
            alert(msg.popupTgtScrn + msg.necessaryCheckMessage);
            $("input[name=popupTgtScrn][0]").focus();
            return false;
        }

        if(!($('#prioRnk').val() >= 1 && $('#prioRnk').val() < 100)) { // 우선순위 (1~99 사이의 수)
            alert(msg.numberRange1CheckMessage);
            $('#prioRnk').focus();
            return false;
        }

        if($("input[name=dispMediaCd]:checked").val() == "01") { // PC인 경우

            oEditors.getById["popupCont"].exec("UPDATE_CONTENTS_FIELD", []);
            var editorVal = $("#popupCont").val();

            // 빈값 체크
            if($('#popupSzWdt').val() == null || $('#popupSzWdt').val() == '') { // 팝업 사이즈 넓이
                 alert(msg.popupSizeWdt + msg.necessaryCheckMessage);
                 $('#popupSzWdt').focus();
                 return false;
            } else if($('#popupSzHigh').val() == null || $('#popupSzHigh').val() == '') { // 팝업 사이즈 높이
                 alert(msg.popupSizeHigh + msg.necessaryCheckMessage);
                 $('#popupSzHigh').focus();
                 return false;
            } else if($('#popupLocLeft').val() == null || $('#popupLocLeft').val() == '') { // 팝업 좌측위치
                 alert(msg.popupLocationLeft + msg.necessaryCheckMessage);
                 $('#popupLocLeft').focus();
                 return false;
            } else if($('#popupLocTop').val() == null || $('#popupLocTop').val() == '') { // 팝업 상단위치
                 alert(msg.popupLocationTop + msg.necessaryCheckMessage);
                 $('#popupLocTop').focus();
                 return false;
            } else if( editorVal == ""  || editorVal == null || editorVal == '&nbsp;' || editorVal == '<p>&nbsp;</p>')  { // 팝업 내용
                  alert(msg.popupCont + msg.necessaryCheckMessage);
                  oEditors.getById["popupCont"].exec("FOCUS"); //포커싱
                  return false;
             }

            // 값 범위 체크
            if(!($('#popupSzWdt').val() >= 1 && $('#popupSzWdt').val() <= 2000)) { // 팝업 사이즈 넓이 (1~2000 사이의 수)
                alert(msg.numberRange2CheckMessage);
                $('#popupSzWdt').focus();
                return false;
            } else if(!($('#popupSzHigh').val() >= 1 && $('#popupSzHigh').val() <= 1000)) { // 팝업 사이즈 높이 (1~1000 사이의 수)
                alert(msg.numberRange3CheckMessage);
                $('#popupSzHigh').focus();
                return false;
            } else if(!($('#popupLocLeft').val() >= 0 && $('#popupLocLeft').val() <= 1500)) { // 팝업 좌측위치 (0~1500 사이의 수)
                alert(msg.numberRange4CheckMessage);
                $('#popupLocLeft').focus();
                return false;
            } else if(!($('#popupLocTop').val() >= 0 && $('#popupLocTop').val() <= 800)) { // 팝업 상단위치 (0~800 사이의 수)
                alert(msg.numberRange5CheckMessage);
                $('#popupLocTop').focus();
                return false;
            }

        } else if($("input[name=dispMediaCd]:checked").val() == "02") { // mobile인 경우

            // 빈값 체크
            if($('#popupLnk').val() == null || $('#popupLnk').val() == '') { // 팝업 링크
                 alert(msg.popupLnk + msg.necessaryCheckMessage);
                 $('#popupLnk').focus();
                 return false;
            } else if($(".input-group.file-upload > .file-list > li").length == 0) { // 이미지 올리기
                  alert(msg.img + msg.necessaryCheckMessage);
                  $('#btn_fileUpload').focus();
                  return false;
            }

        }
        return true;
    },

    channelPopup : function(){
        var pin = {
            argSelectType: 'N',
            argChlClssCd:''
        };
        var POP_DATA = {
            url: _baseUrl + 'channel/channelMgmt.channelList.do'
            , winName: 'channelPopup'
            , title: '채널 조회'
            , _title: '채널 조회'
            , left: 20
            , top: 20
            , width: 750
            , height: 550
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.channelPopupCallback.bind(this));
    },

    channelPopupCallback : function(e){
        this.grid.commit();
        var resultData = JSON.parse(e.data);
        var chlContents = resultData; // 중복을 제거한 값
        var rowCount = this.grid.getItemCount(); // 원래 그리드에 있던 행의 수

        // 수정인 경우만 체크
        for(var i = 0; i<rowCount; i++){
            for(var j = 0; j<resultData.length; j++) {
                if(resultData[j].chlNo == this.grid.getValue(i , "chlNo") ) { // 추가된 채널과 원래 그리드에 있던 채널 비교
                    chlContents.splice(j,1); // 중복 요소 삭제
                }
            }
        }

        this.grid.getDataSource().addRows(chlContents);
    },

    onDelete : function() {
        var checkedItems = this.grid.getCheckedItems();
        if (checkedItems.length == 0) {
            alert(msg.deleteRowCheck);
            return;
        }
        this.defaultHandler.onDelete(grid);
    },

    gridEvent : {
        // 저장 완료후 콜백함수
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);
            if(data.succeeded){
                opener.sitePopupGrid.eventhandler.onSearch(0, false);
                window.close();
           }
        }
    },

    onSearch : function(pageIdx, isOpenToast){
        this.grid.cancel();
        pageIdx = !pageIdx ? 0 : pageIdx;
        var self = this;
        var pagingFunc = function(pageIdx){return self.onSearch(pageIdx, false);};
        this.controller.doQuery(this,"",pageIdx, pagingFunc, null, isOpenToast);
    }

};