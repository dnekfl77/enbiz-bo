$.namespace("jobCnctReg.eventhandler")

const jobCnctRegMsg = x2coMessage.getMessage( {
    _cancelMessage : "adminCommon.alert.cancel"
    , _recvmnEmptyMessage : "common.alert.job.cnct.reg.recvmn.empty"
    , _titleEmptyMessage : "common.alert.job.cnct.reg.title.empty"
    , _titleByteLimitMessage : "common.alert.job.cnct.reg.title.byteLimit"
    , _contEmptyMessage : "common.alert.job.cnct.reg.cont.empty"
    , _contByteLimitMessage : "common.alert.job.cnct.reg.cont.byteLimit"
    , _saveConfirmMessage : "adminCommon.alert.save"
});

let editor = [];

jobCnctReg.eventhandler = {
    // 초기화
    init : function () {
		//web socket setting
        sock = new SockJS("/ws-stomp");
        ws = Stomp.over(sock);	
    }
    // 이벤트
    ,bindButtonEvent : function () {
        const _self = this;

        // 내용 byte 수 제한
        $('#cont').on("keyup change", function () {
            var limitByte = $(this).attr("data-limitByte");
            var markId = $(this).attr("data-markId");
            byteLimitCheck($(this), limitByte, markId);
        });

        // 취소 버튼
        $("#btn_jobCnctReg_cancel").on("click", function() {
            if( confirm(jobCnctRegMsg._cancelMessage) ) {
                window.self.close();
            }
        });
		//발송 버튼
        $("#btn_jobCnctReg_send").on("click", function() {
            // upload File이 있으면
            if($(".input-group.file-upload input[type=file]").length > 0) {
                _self.validFiles();
                _self.uploadFiles();
            } else {
                _self.onSave();
            }
        });
        //대상 추가 버튼
        $("#add-recvmn").click(function(){
			var recvType = $("input:radio[name=recvType]:checked").val();
			if (recvType == "G") {
				 _self.callReceiveGroupPopup();
			}
			else if (recvType == "U") {
	            _self.callUserPopup();
			}
        });
		//추가한 수신 대상자 개별 삭제
        $(document).on("click",".target-delete",function(){
            if(confirm("삭제하시겠습니까?")){
                $(this).closest('li').remove();
            }
        });
		//수신 대상자 초기화
        $(document).on("click",".target-init",function(){
            $(this).parents('.add').prev().children("li").remove();
        });
    }
	//첨부파일 체크
    ,validFiles: function() {
        if($(".input-group.file-upload > .file-list > li").length > 3) {
            alert(msg._msgAtchFileLength);
            return false;
        }

        let isAllowExtension = true;
        let isLimitFileSize = true;
        let fileCnt = 0;
        $(".input-group.file-upload input[type=file]").each((idx, file) => {

            if( getFileFormatCheck(file.id, _allowExtension) ) {
                isAllowExtension = false;
                return false;
            }

            if(file.files.length > 0 && file.files[0].size > _maxUploadSizePerFile) {
                alert(msg._msgAtchFileLimitSize);
                isLimitFileSize = false;

                return false;
            }

            fileCnt += file.files.length;
        });
	}
	//수신그룹 조회 팝업
	,callReceiveGroupPopup : function(){
        var pin = {
            argSelectType: 'N'
        };		
        var POP_DATA = {
            url: _baseUrl + 'popup/boardManagement.recvGrpListPopup.do'
            , winName: 'recvGrpListPopup'
            , title: '수신그룹 조회'
            , _title: '수신그룹 조회'
            , left: 20
            , top: 20
            , width: 500
            , height: 550
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupRecvGrpListCallback);
    }
	//사용자 조회 팝업
	,callUserPopup : function(){
        var pin = {
            argSelectType: 'N'
            , argWorkStatCd: '01'
            , argUseYn: 'Y'
        };		
        var POP_DATA = {
            url: _baseUrl + 'popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: '사용자 조회'
            , _title: '사용자 조회'
            , left: 20
            , top: 20
            , width: 900
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, this.popupUserListCallback);
    }
	//수신그룹 조회 팝업창에서 수신그룹 선택 후 
    ,popupRecvGrpListCallback : function(e){
        var resultData = JSON.parse(e.data);
		
		//선택한 수신그룹에 등록된 사용자(수신자) 정보를 조회
        let param = { recvGrpNoList : resultData };			
        common.Ajax.sendJSONRequest(
            "GET"
            ,_baseUrl + "popup/boardManagement.getRecvmnList.do"
            ,param
            ,function(e) {
				var returnValJStr = JSON.stringify(e)
				var returnValJSon = JSON.parse(returnValJStr);
				var returnValJArr = returnValJSon.payloads
				
				for (var i=0; i<returnValJArr.length; i++) {
					var popupData = [{ key : returnValJArr[i].userId , data : returnValJArr[i].userNm}];
					jobCnctReg.eventhandler.addTargetUI("#add-recvmn-ul",popupData);
				}						
            }
        );
    }
	//사용자 조회 팝업창에서 사용자 선택 후
    ,popupUserListCallback : function(e){
        var resultData = JSON.parse(e.data);
		
		for (var i=0; i<resultData.length; i++) {
	        var popupData = [{ key : resultData[i].userId , data : resultData[i].userNm}];
	        jobCnctReg.eventhandler.addTargetUI("#add-recvmn-ul",popupData);
		}
    }
	//팝업창에서 선택한 사용자를 대상자 UI 에 표시
    ,addTargetUI : function(targetUl,list){
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
    }
	//첨부파일 업로드
	,uploadFiles: function() {
        const _self = this;
        const uploadFile = new FormData();

        $(".input-group.file-upload input[type=file]").each((idx, file) => {
            if(file && file.files && file.files.length > 0) {
                uploadFile.append("files", file.files[0]);
            }
        });
        uploadFile.append("mainPath", _mainPath);
        uploadFile.append("subPath", _subPath);

        $.ajax({
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            url: "/file/tmp/upload/multi",
            method: "post",
            data: uploadFile,
            success: function(data) {
                _self.onSave(data);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
	//업무연락 발송
	,onSave: function(data) {
        const _self = this;

        if(!_self.vaildator()) {
            return false;
        }
		//확인
		if (!confirm(jobCnctRegMsg._saveConfirmMessage)) {
			return false;
		}

        //수신대상 목록 세팅
        var recvmnIdArr = [];
        $("#add-recvmn-ul").children().each(function(){
            recvmnIdArr.push($(this).attr('dataName'));
        });
		$("#recvmnIds").val(recvmnIdArr);

        var parameter = $("form[name=jobCnctRegForm]").serialize() ;

       	common.Ajax.sendJSONRequest(
			"POST",
			_baseUrl + "/popup/JobContact.saveJobContact.do",
			parameter,
			function(obj) {
				//업무연락 저장 후 수신자들에게 메시지 전송
			    if (obj.succeeded == true) {
			        $("#add-recvmn-ul").children().each(function(){
						ws.send("/pub/alarm/message", {}, JSON.stringify(
							{type:'ALARM', id:$(this).attr('dataName'), messageTxt : $("#loginId").val()+"님이 보내신 메시지가 도착햇습니다!"}));	
			        });				
					
			        opener.jobCnctRecvGrid.eventhandler.onSearch();
			        opener.jobCnctSendGrid.eventhandler.onSearch();
			        window.close();
			    }else{
			        // alert(_addFailMsg);
			    }
		});
    }
	//발송 전 입력 값 체크
    ,vaildator: function() {
		var title = $("#title").val();
		var cont = $("#cont").val();
		console.log("byteCheck(cont) : " +byteCheck(cont));
		
        // 대상자 
		if ($("#add-recvmn-ul").children().length == 0) {
            alert(jobCnctRegMsg._recvmnEmptyMessage);
            return false;
		}
        // 제목 
		if (title.trim() == "") {
            alert(jobCnctRegMsg._titleEmptyMessage);
			$("#title").focus();
            return false;
		}
		else if (byteCheck(title) > 300) {
            alert(jobCnctRegMsg._titleByteLimitMessage);
			$("#title").focus();
            return false;
		}
        // 내용 
		if (cont.trim() == "") {
            alert(jobCnctRegMsg._contEmptyMessage);
			$("#cont").focus();
            return false;
		}
		else if (byteCheck(cont) > 4000) {
            alert(jobCnctRegMsg._contByteLimitMessage);
			$("#cont").focus();
            return false;
		}
		
        return true;
    }

}