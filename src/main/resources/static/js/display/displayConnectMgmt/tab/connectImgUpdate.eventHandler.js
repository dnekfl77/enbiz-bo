$.namespace("connectImgUpdate.eventhandler");
connectImgUpdate.eventhandler = {
    // 초기화
    init : function () {
        this.calendarInit();
        this.valSetting();
        this.bindButtonEvent();
    },

    // 켈린더 날짜 기본 셋팅
    calendarInit : function(){
        var initFromAndToCalDate = recentlyCalenderData(0);

        var today = new Date(); // 현재날짜
        today = today.getFullYear() + "-" + addzero(today.getMonth() + 1) + "-" + addzero(today.getDate());
        var lastDate = new Date(); // 현재날짜
	    lastDate = new Date(lastDate.setDate(lastDate.getDate()+30)); // 한달뒤
        lastDate = lastDate.getFullYear() + "-" + addzero(lastDate.getMonth() + 1) + "-" + addzero(lastDate.getDate());

        $('#startDate').val(today);
        $('#endDate').val(lastDate);
        $('#endHour').val('23');
        $('#endMinute').val('59');
    },

    valSetting : function(){
        var self = this;
        if(req.argInsertUpdate == "U") { // 수정
            $("#conrContNo").val(req.conrContNo);
            $("#altCont").val(req.altCont);
            $("#movFrmeCd").val(req.movFrmeCd);
            $("#linkUrlAddr").val(req.linkUrlAddr);
            $("#contDesc").val(req.contDesc);
            $("#dispSeq").val(req.dispSeq);
            $('input:radio[name=dispYn]:input[value=' + req.dispYn + ']').attr("checked",true); // 전시여부

            var strDate = req.dispStrDtm.split(" ");
            $("#startDate").val(strDate[0]);
            var strDate_time = strDate[1].split(":");
            $("#startHour").val(strDate_time[0]);
            $("#startMinute").val(strDate_time[1]);

            var endDate = req.dispEndDtm.split(" ");
            $("#endDate").val(endDate[0]);
            var endDate_time = endDate[1].split(":");
            $("#endHour").val(endDate_time[0]);
            $("#endMinute").val(endDate_time[1]);

            // 첨부파일 셋팅
            $("#contFileNm").val(req.contFileNm);
            $("#contPathNm").val(req.contPathNm);
            if(req.contFileNm != "" && req.contPathNm != "") {
                $(".input-group.file-upload").append('<ul class="file-list"></ul>');
                $(".input-group.file-upload > .file-list").append('<li id="li_file">' + req.contFileNm + '<button id="btn_file_delete" class="delete" type="button">삭제</button></li>');
                $("#btn_file_delete").on("click", function(e) {
                    $("#contFileNm").val("");
                    $("#contPathNm").val("");
                    $("#li_file").remove();
                    self.imgSetting("/static/img/noimg.png");
                });
                this.imgSetting(req.contPathNm);
            } else {
                this.imgSetting("/static/img/noimg.png");
            }

        } else { // 입력
            $('input:radio[name=dispYn]').first().attr("checked",true); // 전시여부
            this.imgSetting("/static/img/noimg.png");
        }
    },

    bindButtonEvent : function(){
        var self = this;

        // 전시시작일시 달력 이벤트
        $("#calendarButton1").click(function() {
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

        // 전시종료일시 달력 이벤트
        $("#calendarButton2").click(function() {
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

                        // 첨부파일형식 체크
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

                        $(".input-group.file-upload > .file-list").append(`<li id="uploadedLi">${e.currentTarget.files[0].name} <button id="btn_file_delete" class="delete" type="button">삭제</button></li>`);

                        $("#btn_file_delete").on("click", function(e) {
                            $("#uploadedFile").remove();
                            $("#uploadedLi").remove();
                            self.imgSetting("/static/img/noimg.png");
                        });

                        // 이미지 미리보기
                        var reader = new FileReader();
                        reader.onload = function (e) {
                           self.imgSetting(e.target.result);
                        }
                        reader.readAsDataURL(e.currentTarget.files[0]);
                    }
                });
                $("#uploadedFile").click();
            }
        });

        // 저장 버튼
        $("#btn_popup_save").click(function() {
            self.onSave();
        });

        // 취소버튼
        $("#btn_popup_cancel").click(function() {
            self.onCancel();
        });
    },

    checkDateVal : function(){
        var today = new Date(); // 현재날짜
        today = today.getFullYear() + "" + addzero(today.getMonth() + 1) + "" + addzero(today.getDate());

        var startDate = $("#startDate").val().replace(/-/g, '');
        var endDate = $("#endDate").val().replace(/-/g, '');

        if (today <= startDate) {
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
        } else {
            alert(msg.dataCheck1);
            return false;
        }
        return true;
    },

    valCheck : function() {
        if($('#dispSeq').val() == null || $('#dispSeq').val() == '') { // 전시순서
             alert("전시순서는 " + msg.necessaryCheckMessage);
             $('#dispSeq').focus();
             return false;
        } else if($(".input-group.file-upload > .file-list > li").length <= 0) { // 첨부파일 확인
             alert("이미지 배너 파일 첨부는 " + msg.necessaryCheckMessage);
             $(".input-group.file-upload > a").focus();
             return false;
        } else if($('#altCont').val() == null || $('#altCont').val() == '') { // 이미지 ALT 내용
            alert("이미지 ALT 내용은 " + msg.necessaryCheckMessage);
            $('#altCont').focus();
            return false;
        } else if($('#linkUrlAddr').val() == null || $('#linkUrlAddr').val() == '') { // 연결 URL
            alert("연결 URL은 " + msg.necessaryCheckMessage);
            $('#linkUrlAddr').focus();
            return false;
        } else if($('#contDesc').val() == null || $('#contDesc').val() == '') { // 이미지 배너 설명
            alert("이미지 배너 설명은 " + msg.necessaryCheckMessage);
            $('#contDesc').focus();
            return false;
        }
        return true;
    },

    onSave : function() {
        var self = this;
        // 파일저장 -> 폼저장
        if(this.checkDateVal() && this.valCheck() ) { // 날짜 확인, 빈값 확인
            if(confirm(msg.save)) {
                // 첨부파일 저장
                const uploadFile = new FormData();
                var file = $(".input-group.file-upload input[type=file]")
                if(file.getFileSize() > maxUploadSizePerFile) {
                    alert(_msg.fileLimitSize);
                    return false;
                } else {
                    uploadFile.append("file", file[0].files[0]);
                    uploadFile.append("type", "displayConnectManagement");
                }

                $.ajax({
                    url: "/display/displayConnectMgmt.upLoadFile.do",
                    data:uploadFile,
                    type:'POST',
                    enctype:'multipart/form-data',
                    processData:false,
                    contentType:false,
                    dataType:'json',
                    cache:false,
                    success:function(data){
                        self.imgSetting(data.fileDetail.I_FILE_URL);
                        self.onFormSave(data.fileDetail);
                    },
                    error: function(error) {
                         console.log("fileSave error : " + error);
                    }
                });

            } else {   // confirm(msg.save)
                return;
            }
        } else {
           return;
        }

    },

    onFormSave : function(data) {
        if(data != null){
            $("#contFileNm").val(data.I_FILE_TITLE);  // 원본파일명
            $("#contPathNm").val(data.I_FILE_URL); // 파일경로
        }
        var startDate = $("#startDate").val() + " " + $("#startHour").val() + ":" + $("#startMinute").val() + ":00";
        var endDate = $("#endDate").val() + " " + $("#endHour").val() + ":" + $("#endMinute").val() + ":59";
        $("#dispStrDtm").val(startDate);
        $("#dispEndDtm").val(endDate);

        // form 전체 disabled 풀어주기
        $("form input:disabled, select:disabled, radio:disabled").removeAttr("disabled");

        common.Ajax.sendRequest(
            "POST"
            ,_baseUrl + "/display/displayConnectMgmt.saveConnectPopup.do"
            ,$("#htmlForm").serialize()
            ,function(obj) {
                 if (obj.succeeded) {
                    opener.connectTabImgGrid.eventhandler.onSearch(0);
                    window.close();
                 } else {
                    console.log("이미지 배너 등록/수정 저장 오류");
                 }
            }
        );
    },

    onCancel : function() {
        if(confirm(msg.cancelMessage)) {
            window.close();
        } else {
           return;
        }
    },

    imgSetting : function(src){
        $("div#imgFile > img").remove();
        var img = document.createElement("img");
        img.setAttribute("src", src);
        img.setAttribute("alt", "uploadImage");
        img.setAttribute("flag", "none");
        img.setAttribute("langcd", "");
        img.setAttribute("class", "image");
        img.setAttribute("style", "width:auto;height:90px;");
        document.querySelector("div#imgFile").appendChild(img);
    }

};