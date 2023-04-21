$.namespace("sysNtcTgtGrid.eventhandler")

let editor = [];

sysNtcTgtGrid.eventhandler = {

	message : x2coMessage.getMessage( {
        userListPopupTitle : "systemNoticeMgmt.label.popup.userList.title"
    }),

    pageInitEvent: function() {
        const _self = this;

        // 에디터 생성
        _self.initEditor();

        // 페이지 클래스 제거
        $(".search-cont.full-height").removeClass("full-height")

        // 공통코드 세팅.
        if(codeMap) {
            _self.setCodeOption("sysGbCd", "UR005");
            _self.setCodeOption("bbGbCd", "CM004");
            _self.setCodeOption("ntcTypCd", "CM006");

            $("#ntcGbCd").attr("true-value", "01");
            $("#ntcGbCd").attr("false-value", "02");
        }

        // 수정 데이터 초기화.
        if(_bbInfo) {
            _self.setModBbInfo();
        }

        _self.initPage();
    },
    initPage: function() {
        const _self = this;
        _self.changeSysGbCd();
        _self.changeNtcGbCd();
    },

    initEditor: function() {
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: editor,
            elPlaceHolder: "bbcCont",
            sSkinURI: "/static/js/libs/smartEditor/SmartEditor2Skin.html",
            fCreator: "createSEditor2"
        });
    },

    bindButtonEvent: function() {
        const _self = this;

        // 시스템 구분
        $("#sysGbCd").on("change", _self.changeSysGbCd);

        // 게시구분 - 전체게시 여부
        $("#ntcGbCd").on("change", _self.changeNtcGbCd);

        $("#fileUpload").on("click", function(e) {
            e.preventDefault();

            if($(".input-group.file-upload > .file-list > li").length >= 3) {
                alert(msg._msgAtchFileLength);
                return false;
            }

            let fileIdx = 0;
            if($(".input-group.file-upload input[type=file]").length > 0) {
                fileIdx = parseInt($(".input-group.file-upload input[type=file]").last().attr("id").replace("uploadedFile_", "")) + 1;
            }
            $(".input-group.file-upload").append(`<input type="file" style="display: none" name="files" id="uploadedFile_${fileIdx}"/>`);

            $(`#uploadedFile_${fileIdx}`).on("change", function(e) {
                if(e.currentTarget.files.length > 0) {
                    if(e.currentTarget.files[0].size > _maxUploadSizePerFile) {
                        alert(msg._msgAtchFileLimitSize);
                        return false;
                    }

                    if( $(".input-group.file-upload > .file-list").length <= 0 ) {
                        $(".input-group.file-upload").append(`<ul class="file-list"></ul>`)
                    }

                    $(".input-group.file-upload > .file-list").append(`<li id="uploadedLi_${fileIdx}">${e.currentTarget.files[0].name} <button id="delete_${fileIdx}" class="delete" type="button">삭제</button></li>`);

                    $(`#delete_${fileIdx}`).on("click", function(e) {
                        $(`#uploadedFile_${fileIdx}`).remove();
                        $(`#uploadedLi_${fileIdx}`).remove()
                    });
                }
            });

            $(`#uploadedFile_${fileIdx}`).on("blur", function (e) {
                console.log(e);
            });
            $(`#uploadedFile_${fileIdx}`).click();

        });

        $("#btn_popup_apply").on("click", function() {
            // upload File이 있으면
            if($(".input-group.file-upload input[type=file]").length > 0) {
                _self.validFiles();

                _self.uploadFiles();
            } else {
                _self.onSave();
            }
        });

        // 취소 이벤트
        $("#btn_popup_close").on("click", function() {
            if( confirm(msg._cancelMessage) ) {
                window.self.close();
            }
        });

        $("#bbDtm-showCalender").click(function(){
			if ($("input[name=bbYn]:checked").val() === 'Y') {	//공지 게시 시에만 날짜 선택이 가능하도록 함.
	            _self.showCalendar('#bbStrDtm','#bbEndDtm')
			}
        });

        $("#popBbDtm-showCalender").click(function(){
			if ($("input[name=popYn]:checked").val() === 'Y') {	//팝업 사용 시에만 날짜 선택이 가능하도록 함.
	            _self.showCalendar('#popBbStrDtm','#popBbEndDtm')
			}
        });

		//공지 게시 및 팝업 사용을 하지 않을 경우 관련 날짜 값을 초기화(service 에서 관련 처리가 있어 화면에도 동일하게 적용.)
		$("input[name=bbYn]").click(function(){
			var bbYnVal = $(this).val();
		    if (bbYnVal === 'N') {
				$('#bbStrDtm').val("");
				$('#bbEndDtm').val("");
			}
		});
		$("input[name=popYn]").click(function(){
			var popYnVal = $(this).val();
		    if (popYnVal === 'N') {
				$('#popBbStrDtm').val("");
				$('#popBbEndDtm').val("");
			}
		});


    },

    gridEvent: {
        afterSaveSuccess : function(eventHandler, mainGridName, gridNames, data){
            alert(data.message);

            if(data.succeeded){
                window.self.close();
            }
        }
    },

    changeSysGbCd: function() {
		const removeDisableSelector = ["#bbGbCd"];

		sysNtcTgtGrid.eventhandler.removeAttr(removeDisableSelector, "disabled");
		// 시스템구분이 "백오피스", "고객센터"인 경우 -> 게시판유형 "공지사항"만 등록 가능
        if($("#sysGbCd").val() === "11" || $("#sysGbCd").val() === "12") {
            $('#bbGbCd').val('100');
            sysNtcTgtGrid.eventhandler.addDisabled(["#bbGbCd"]);
        }
    },
    changeNtcGbCd: function() {
        sysNtcTgtGrid.eventhandler.removeAttr(["#btn_user_add", "#btn_user_del"], "disabled");
        if($("#ntcGbCd").is(":checked")) {
            sysNtcTgtGrid.eventhandler.addDisabled(["#btn_user_add", "#btn_user_del"]);
            // 그리드 행 삭제
            if(!_bbInfo) {
                sysNtcTgtGrid.eventhandler.grid.getDataSource().clearRows();
            }

            $("#btn_user_add").unbind("click");
            $("#btn_user_del").unbind("click");
        } else {
            $("#btn_user_add").on("click", sysNtcTgtGrid.eventhandler.callUserPopup);
            $("#btn_user_del").on("click", function() {
                const grid = sysNtcTgtGrid.eventhandler.grid;

                const checkedItems = grid.getCheckedItems();

                if(checkedItems.length <= 0) {
                    alert(msg._msgEmptyDelTgt);

                    return false;
                }

                sysNtcTgtGrid.eventhandler.defaultHandler.onDelete(grid, checkedItems);
            });
        }
    },

    setCodeOption: function (elId, grpCdNm) {
        if( elId && $(`#${elId}`).length > 0 && codeMap[grpCdNm] ) {
            const cdList = codeMap[grpCdNm];
            if( Array.isArray(cdList) && cdList.length > 0 ) {
                cdList.forEach(cd => {
                    $(`#${elId}`).append(`<option value="${cd.cd}">${cd.cdNm}</option>`)
                })
            }
        }
    },

    callUserPopup: function () {
        const argSelectType = "1";
        const argWorkStatCd = "01";
        const argUseYn = "Y";
        const self = this;

        const pin = {
            argSelectType: argSelectType
            , argWorkStatCd: argWorkStatCd
            , argUseYn: argUseYn
        };
        const POP_DATA = {
            url: '/popup/userMgmtPopup.userListPopup.do'
            , winName: 'userListPopup'
            , title: sysNtcTgtGrid.eventhandler.message.userListPopupTitle
            , _title: sysNtcTgtGrid.eventhandler.message.userListPopupTitle
            , left: 20
            , top: 20
            , width: 800
            , height: 700
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, popupUserListCallback);

        function popupUserListCallback (e) {
            if(e.data) {
                const data = JSON.parse(e.data);
                if(Array.isArray(data)) {
                    data.forEach(i => {
                        sysNtcTgtGrid.eventhandler.defaultHandler.onAdd(sysNtcTgtGrid.eventhandler.grid, i);
                    });
                } else {
                    sysNtcTgtGrid.eventhandler.defaultHandler.onAdd(sysNtcTgtGrid.eventhandler.grid, JSON.parse(e.data));
                }
            }
        }
    },

    // 수정 데이터 세팅 function
    setModBbInfo: function() {
        const _self = this;
        // 게시글 메인 정보 입력
        const sysBbInfo = _bbInfo.stSysBbInfo;
        if( sysBbInfo && Object.keys(sysBbInfo).length > 0) {
            Object.keys(sysBbInfo).forEach(key => {
                if($(`#${key}`).is("input[type=checkbox]")) {
                    let isChecked = false;

                    if($(`#${key}`).attr("true-value")) {
                        if($(`#${key}`).attr("true-value") === sysBbInfo[key]) {
                            isChecked = true;
                        }
                    } else {
                        if(sysBbInfo[key] === 'Y') {
                            isChecked = true;
                        }
                    }

                    $(`#${key}`).attr("checked", isChecked);
                } else if($(`input[name=${key}]`).is("input[type=radio]")){
                    $(`input[name=${key}]:input[value=${sysBbInfo[key]}]`).attr('checked',true);
                } else {
                    $(`#${key}`).val(sysBbInfo[key]);
                }
            });
        }

        // 첨부파일 입력.
        const atchFiles = _bbInfo.atchFileList;
        if(atchFiles && atchFiles.length > 0) {
            atchFiles.forEach(file => {
                if( $(".input-group.file-upload > .file-list").length <= 0 ) {
                    $(".input-group.file-upload").append(`<ul class="file-list"></ul>`)
                }

                $(".input-group.file-upload > .file-list").append(`<li id="li_file_${file.fileSeq}"><span class="download" onclick="com.x2commerce.common.Util.downloadfile('${file.atchFileRouteNm}','${file.atchFileNm}')">${file.atchFileNm}</span> <button id="btn_file_delete_${file.fileSeq}" file-seq="${file.fileSeq}" class="delete" type="button" >삭제</button></li>`);

                $(`#btn_file_delete_${file.fileSeq}`).on("click", function(e) {
                    let deleteFiles = sysNtcTgtGrid.eventhandler.grid.localParameters.delFileList;
                    if(!deleteFiles || !Array.isArray(deleteFiles)) {
                        deleteFiles = [];
                    }

                    deleteFiles.push(_bbInfo.atchFileList.find(i => i.fileSeq === parseInt(e.currentTarget.getAttribute("file-seq"))))

                    sysNtcTgtGrid.eventhandler.grid.setParam("delFileList", deleteFiles);

                    $(`#li_file_${file.fileSeq}`).remove();
                });
            });
        }

        // 공지 대상 세팅.
        _self.grid.setParam("bbcNo", _bbInfo.stSysBbInfo.bbcNo);
        _self.controller.doQuery(this);
    },

    addDisabled: function (selectors) {
        if(selectors) {
            if(Array.isArray(selectors)) {
                selectors.forEach(selector => {
                    $(selector).attr("disabled", "disabled");
                });
            } else {
                $(selectors).attr("disabled", "disabled");
            }
        }
    },

    removeAttr: function (selectors, attr) {
        if(selectors) {
            if(Array.isArray(selectors)) {
                selectors.forEach(selector => {
                    $(selector).removeAttr(attr);
                });
            } else {
                $(selectors).removeAttr(attr);
            }
        }
    },
    showCalendar: function (startEl,endEl) {
        var startDate = moment();//시작일시
        var endDate = moment();//종료일시
        endDate.set('hour', 23);
        endDate.set('minute', 59);

        if ($(startEl).val() && moment($(startEl).val(), "YYYY-MM-DD HH:mm:ss").isValid()) {
			startDate = moment($(startEl).val(), "YYYY-MM-DD HH:mm:ss");
		}

		if ($(endEl).val() && moment($(startEl).val(), "YYYY-MM-DD HH:mm:ss").isValid()) {
			endDate = moment($(endEl).val(), "YYYY-MM-DD HH:mm:ss");
		}

        showCalendar({
            type:'A', // A:시작,종료일선택, B:해당 날짜 1개 선택
            format:'yyyy-MM-dd HH:mm',
            yyyymmdd1:startDate.format("YYYY-MM-DD"),
            yyyymmdd2:endDate.format("YYYY-MM-DD"),
            hour1:startDate.format("HH"),
            hour2:endDate.format("HH"),
            min1:startDate.format("mm"),
            min2:endDate.format("mm"),
            max_term:90,
            fn:function(pin) {
                var toDay = calendarFormatting(new Date(),"");
                var pinDay1 = replaceCalendarStringWithLength(pin.yyyymmdd1);
                var pinDay2 = replaceCalendarStringWithLength(pin.yyyymmdd2);
                var _dispStrtDtime = replaceCalendarStringWithLength($(startEl).val());
                var _dispEndDtime = replaceCalendarStringWithLength($(endEl).val());
                if(_dispStrtDtime != pinDay1){
                    if(pinDay1 < toDay){
                        $('#_Calendar_LAYER').hide();
                        alert(x2coMessage.getMessage("systemNoticeMgmt.message.sys.ntc.mgmt.wrongselected.startdate")); //현재보다 이전 일자입니다.[시작일]
                        return false;
                    }
                }
                if(_dispEndDtime != pinDay2){
                    if(pinDay2 < toDay){
                        $('#_Calendar_LAYER').hide();
                        alert(x2coMessage.getMessage("systemNoticeMgmt.message.sys.ntc.mgmt.wrongselected.enddate")); //현재보다 이전 일자입니다.[종료일]
                        return false;
                    }
                }

                $(startEl).val(pin.yyyymmdd1 + " " + pin.hour1 + ":" + pin.min1);
                $(endEl).val(pin.yyyymmdd2 + " " + pin.hour2 + ":" + pin.min2);
            }
        });
    },

    uploadFiles: function() {
        const _self = this;
        const uploadFile = new FormData();

        $(".input-group.file-upload input[type=file]").each((idx, file) => {
            if(file && file.files && file.files.length > 0) {
                uploadFile.append("files", file.files[0]);
            }
        });
        
        common.Ajax.sendMultiPartRequest(
			_baseUrl + "system/systemNoticeMgmt.uploadFile.do",
			uploadFile,
			function(obj) {
			    if (obj.succeeded == true) {
					_self.onSave(obj.data);
			    }else{
			        alert(obj.message);
			    }
			},
			false
		);
    },

    validFiles: function() {

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

        if(!isAllowExtension || !isLimitFileSize) {
            return false;
        }

        if(fileCnt.length > 3) {
            alert(msg._msgAtchFileLength);
        }
    },

    onSave: function(data) {
        const _self = this;

        // 에디터의 데이터를 textarea에 넣어준다.
        editor.getById["bbcCont"].exec("UPDATE_CONTENTS_FIELD", []);

        if(!_self.vaildator()) {
            return false;
        }

        $("form input:disabled, select:disabled").removeAttr("disabled");
		$("#ntcGbCd").val($("#ntcGbCd").is(":checked") ? "01" : "02");
		$("#bbcNo").val(_bbInfo ? _bbInfo.stSysBbInfo.bbcNo : null);

		var sysNtcTgtGridData     = sysNtcTgtGrid.eventhandler.getSysNtcTgtGrid();

        var sendData = {};
        sendData['sysNtcTgtGrid'] = sysNtcTgtGridData;	//공지 대상 그리드 세팅

		var tmpFileList = null;
        if( data && data.length > 0 ) {
            tmpFileList = data;
        }
        
		var systemNoticeCudRequest = {
			bbcNo : _bbInfo ? _bbInfo.stSysBbInfo.bbcNo : null
			, fxdcYn : $("input[name=fxdcYn]:checked").val()
			, bbYn : $("input[name=bbYn]:checked").val()
			, popYn : $("input[name=popYn]:checked").val()
			, smsSndYn : "N"
			, emailSndYn : "N"
			, tmpFileList : tmpFileList
			, delFileList : sysNtcTgtGrid.eventhandler.grid.getParam("delFileList")
			, ntcGbCd : $("#ntcGbCd").is(":checked") ? "01" : "02"
			, sysGbCd : $("#sysGbCd").val()
			, bbGbCd : $("#bbGbCd").val()
			, title : $("#title").val()
			, ntcTypCd : $("#ntcTypCd").val()
			, bbStrDtm : $("#bbStrDtm").val()
			, bbEndDtm : $("#bbEndDtm").val()
			, popBbStrDtm : $("#popBbStrDtm").val()
			, popBbEndDtm : $("#popBbEndDtm").val()
			, bbcCont : $("#bbcCont").val()
		};
		sendData.formPayload =	systemNoticeCudRequest;

       	common.Ajax.sendJSONRequest(
			"POST",
			_baseUrl + "system/systemNoticeMgmt.saveSystemNotice.do",
			JSON.stringify(sendData),
			function(obj) {
			    if (obj.succeeded == true) {
					window.postMessage(null, _baseUrl);
			        window.close();
			    }else{
			        alert(obj.message);
			    }
			},
			true,
			"application/json;charset=UTF-8",
			false
		);

    },
    getSysNtcTgtGrid : function () {
        return this.controller.extractGridPayloads(this.grid);
    },

    vaildator: function() {
        let validMsg = "";

        // 시스템 구분코드
        if(!$("#sysGbCd").val()) {
            $("#sysGbCd").focus();
            alert(msg._msgEmptySysGbCd);
            return false;
        }

        if(!$("#ntcTypCd").val()) {
            $("#ntcTypCd").focus();
            alert(msg._msgEmptyNtcTypCd);
            return false;
        }

        // 제목
        if(!$("#title").val()) {
            $("#title").focus();
            alert(msg._msgEmptyTitle);
            return false;
        }

        // 제목 길이 체크
        if($('#title').val().length > 100){
            alert(msg._msgTitleLimitLength);
            return false;
        }

        // 게시글
        if(!$("#bbcCont").val() || !checkValid($("#bbcCont").val().replaceAll("<p>&nbsp;</p>", ""))) {
            $("#bbcCont").focus();
            alert(msg._msgEmptyBbcCont);
            return false;
        }

        if($("input[name=bbYn]:checked").val() === 'Y') {
            if ($('#bbStrDtm').val() === '' || $('#bbEndDtm').val() === '') {
                $("#bbStrDtm").focus();
                alert(msg._msgBbDtm);
                return false;
            }
        }

        if($("input[name=popYn]:checked").val() === 'Y') {
            if ($('#popBbStrDtm').val() === '' || $('#popBbEndDtm').val() === '') {
                $("#popBbStrDtm").focus();
                alert(msg._msgPopBbDtm);
                return false;
            }
        }

        if(!$("#ntcGbCd").is(":checked")) {
            const gridRowCnt = sysNtcTgtGrid.eventhandler.grid.getDataSource().getRowCount();
            if(gridRowCnt <= 0) {
                alert(msg._msgEmptyNtcTgt);
                return false;
            }

            const gridDeleteCnt = sysNtcTgtGrid.eventhandler.grid.getDataSource().getAllStateRows().deleted.length;
            if(gridRowCnt == gridDeleteCnt) {
                alert(msg._msgEmptyNtcTgt);
                return false;
            }
        }

        return true;
    }
}