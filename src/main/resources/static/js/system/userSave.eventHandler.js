const userEventMessageParam = {
	idDuplCheckNeed : "userMgmt.alert.duplicate.check.need"//아이디 중복체크를 해주세요.
	, idDuplCheckOk : "userMgmt.alert.duplicate.check.ok"//사용 가능한 아이디입니다.
	, idDuplCheckFail : "userMgmt.alert.duplicate.check.fail"//사용 불가능한 아이디입니다.
	, domainWrite : "userMgmt.label.data.domain.write"
	, passwdInitYn : "userMgmt.alert.password.init.yn"
	, passwdUnlockYn : "userMgmt.alert.password.unlock.yn"
	, userIdBlank : "userMgmt.alert.validation.userid.blank"
	, userIdOverLength : "userMgmt.alert.validation.userid.length"
	, userIdAlphanumeric : "userMgmt.alert.validation.userid.alphanumeric"
	, userNmBlank : "userMgmt.alert.validation.usernm.blank"
	, userNmInvalid : "userMgmt.alert.validation.usernm.invalid"
	, rtGroNoBlank : "userMgmt.alert.validation.rtgrpno.blank"
	, jobGrpCdNotSelected : "userMgmt.alert.validation.jobGrpCd.select"
	, ocpCdNotSelected : "userMgmt.alert.validation.orgrolcd.select"
	, workStatCdNotSelected : "userMgmt.alert.validation.workstatcd.select"
	, telRegNoInvalid : "userMgmt.alert.validation.tel.regno"
	, telOtherNoInvalid : "userMgmt.alert.validation.tel.txno.endno"
	, deptNmOverLength : "userMgmt.alert.validation.deptnm.length"
	, cellTxnoInvalid : "userMgmt.alert.validation.cel.txno"
	, cellEndnoInvalid : 'userMgmt.alert.validation.cel.endno'
	, itelNoOverLength : "userMgmt.alert.validation.itelno.length"
	, itelNoNumeric : "userMgmt.alert.validation.itelno.numeric"
	, emailBlank : "userMgmt.alert.validation.email.blank"
	, emailInvalid : "userMgmt.alert.validation.email.invalid"
	, emailOverLength : "userMgmt.alert.validation.email.length"
	, indCheck : "userMgmt.alert.validation.ind.check"
	, saveYn : "adminCommon.grid.alert.save"//저장하시겠습니까?
	, updateTitle: "userMgmt.popup.label.update.title"//사용자 수정
	, userDeptPopupTitle : "userDeptMgmt.tree.title"//부서목록
};
const userEventMessage = x2coMessage.getMessage(userEventMessageParam);

class UserRequest {
	constructor() {
		this.userId =  '';				//사용자아이디
		this.userNm =  '';				//사용자명
		this.pwd =  '';					//비밀번호
		this.userGbCd = '';				//사용자구분코드(UR001)
		this.rtGrpNo = '';				//권한그룹번호
		this.jobGrpCd = '';				//업무그룹코드(UR002)
		this.ocpCd = '';				//조직역할코드(UR003)
		this.workStatCd = '';			//근무상태코드(UR004)
		this.deptCd = '';				//부서명
		this.telRgnNo = '';				//전화지역번호
		this.telTxnoNo = '';			//전화국번번호``
		this.telEndNo = '';				//전화끝번호
		this.cellSctNo = '';			//휴대폰구분번호
		this.cellTxnoNo = '';			//휴대폰국번번호
		this.cellEndNo = '';			//휴대폰끝번호
		this.cnslEntpNm = '';			//상담업체명
        this.ctiNo = '';				//CTI번호
		this.itelNo = '';				//내선번호
		this.emailAddr = '';			//이메일주소
		this.indInfoDealYn = '';		//개인정보취급여부
		this.useYn = '';				//사용여부
	}
}
$.namespace("userMgmtEventhandler");
userMgmtEventhandler = {
	duplCheckedId: ""
	, rtGrpNo: ""

	//사용자 등록 수정 화면 초기화
	, init : function(userId){
		if (userId) {
			userMgmtEventhandler._setUserModForm();
			common.Ajax.sendJSONRequest("GET", _baseUrl + "system/userMgmt.getUserDetail.do", "userId=" + userId, userMgmtEventhandler._callback_userDetail);
		}
		userMgmtEventhandler.bindButtonEvent();
	}

	//버튼 이벤트 등록
	, bindButtonEvent: function () {
		(function($) {
			$.fn.inputFilter = function(inputFilter) {
				return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
					if (inputFilter(userMgmtEventhandler.value)) {
						this.oldValue = this.value;
						this.oldSelectionStart = this.selectionStart;
						this.oldSelectionEnd = this.selectionEnd;
					} else if (this.hasOwnProperty("oldValue")) {
						this.value = this.oldValue;
						this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
					} else {
						this.value = "";
					}
				});
			};
		}(jQuery));

		//비밀번호 초기화 클릭
		$('#btn_user_dtl_pwd_init').on('click', t => {
			userMgmtEventhandler.passwdInit();
		});

		//권한그룹 클릭
		$('#btn_user_dtl_rtGrp_pop').on('click', function(){
			userMgmtEventhandler.rtGrpPop();
		});

		//부서목록 클릭
		$('#btn_user_dept_pop').on('click', function(){
			userMgmtEventhandler.userDeptPop();
		});

		//취소 버튼 이벤트
		$('#btnUserMgmtCruCancel').on('click', t => {
            if(confirm(msg.cancelMessage) == true) {
                window.close();
            } else {
               return;
            }
		});

		//저장 버튼 이벤트
		$('#btnUserMgmtCruSave').on('click', t => {
			userMgmtEventhandler.onSave();
		});

		//중복체크 버튼 클릭
		$('#btn_id_dupl_check').on('click', t => {
			userMgmtEventhandler.onCheckIdDuplicate();
		});

		//도메인선택 change
		$('#domainSelectBox').on('change', t => {
			userMgmtEventhandler.emailDomainChangeAction($('#domainSelectBox').val());
		});

		//비밀번호 잠김 해제 클릭
		$('#btn_user_dtl_pwd_unlock').on('click', t => {
			userMgmtEventhandler.passwdUnlock()
		});

		//개인정보취급여부 클릭
		$('#indInfoDealYn').on('click', t => {
			userMgmtEventhandler.indInfoDealChangeAction();
		});

		//업무그룹 변경
		$('#jobGrpCd').on('change', t => {
			//고객센터
			if('17'==$('#jobGrpCd').val()){
				$('#cnslEntpNm').prop("disabled", false).removeClass("disabled");//상담업체명 활성화
				$('#itelNo').prop("disabled", false).removeClass("disabled");//내선번호 활성화
				$('#ctiNo').prop("disabled", false).removeClass("disabled");//CTI번호 활성화
			}
			//그 외 selected
			else{
				$('#cnslEntpNm').prop("disabled", true).addClass("disabled");//상담업체명 비활성화
				$('#itelNo').prop("disabled", true).addClass("disabled");//내선번호 비활성화
				$('#ctiNo').prop("disabled", true).addClass("disabled");//CTI번호 비활성화
			}
		});

		$('#telRgnNo,#telTxnoNo,#telEndNo,#cellTxnoNo,#cellEndNo,#itelNo').each(function () {
			/*
			$(this).inputFilter(function (value) {
				return /^\d*$/.test(value);
			})
			*/
		});
	}

	//사용자 수정 페이지
	, _setUserModForm : function () {
		$('#userId').prop("disabled", true).addClass('disabled');//사용자 아이디 읽기전용
		$('#pageTitle').text(userEventMessage.updateTitle);//타이틀 변경(사용자 수정)
		$('#btn_id_dupl_check').hide();//중복체크 button
		$('#btn_user_dtl_pwd_init').show();//비밀번호 초기화버튼
	}
	, _callback_userDetail : function (response) {
		const userDetail = response.data;
		const userInfo = userDetail.userInfo;
		$("#userId").val(userInfo.userId);
		$("#userNm").val(userInfo.userNm);
		$("#rtGrpNo").val(userInfo.rtGrpNo);
		$("#jobGrpCd").val(userInfo.jobGrpCd);
		$("#ocpCd").val(userInfo.ocpCd);
		$("#workStatCd").val(userInfo.workStatCd);
		$("#deptCd").val(userInfo.deptCd);
		$("#telRgnNo").val(userInfo.telRgnNo);
		$("#telTxnoNo").val(userInfo.telTxnoNo);
		$("#telEndNo").val(userInfo.telEndNo);
		$("#cellSctNo").val(userInfo.cellSctNo);
		$("#cellTxnoNo").val(userInfo.cellTxnoNo);
		$("#cellEndNo").val(userInfo.cellEndNo);
		$("#itelNo").val(userInfo.itelNo);
		$("#cnslEntpNm").val(userInfo.cnslEntpNm);//상담업체명
		$("#ctiNo").val(userInfo.ctiNo);//CTI번호

		let [emailId, emailDomain] = userInfo.emailAddr.split('@');
		$("#emailId").val(emailId);
		userMgmtEventhandler.emailDomainChangeAction(emailDomain);

		$("#useYn").prop('checked', (userInfo.useYn === 'Y'));

		$("#useStrtDt").val(getCalendarDateFormat(userInfo.useStrtDt));
		$("#useEndDt").val(getCalendarDateFormat(userInfo.useEndDt));
		$("#rcntUseDtm").text(userMgmtEventhandler._convertDateObjToStr(userInfo.rcntUseDtm));

		$("#sysRegId").text(userInfo.sysRegId);
		$("#sysRegDtm").text(userMgmtEventhandler._dropMillisecond(userInfo.sysRegDtm));
		$("#sysModId").text(userInfo.sysModId);
		$("#sysModDtm").text(userMgmtEventhandler._dropMillisecond(userInfo.sysModDtm));

		if (userInfo.indInfoDealYn === 'Y') $("#indInfoDealYn").prop('checked', true);
		const indInfoRightList = userDetail.individualInfoRightList;
		indInfoRightList.forEach(each => {
			if (each.useYn === 'Y') {
				console.log("each",each);
				$(`input:checkbox[name=indInfoRight][value=${each.indInfoGbCd}]`).prop('checked', true);
			}
		});
		userMgmtEventhandler.indInfoDealChangeAction();

		if (userInfo.pwdLockYn === 'Y') {
			$("#pwdLockYn").prop('checked', true);
			$('#btn_user_dtl_pwd_unlock').show();
		}
		$("#pwdCntnFailCnt").val(userInfo.pwdCntnFailCnt);
		$("#lstPwdChgDtm").val(userMgmtEventhandler._convertDateObjToStr(userInfo.lstPwdChgDtm));
		//변경확인을 위한 값
		userMgmtEventhandler.rtGrpNo = userInfo.rtGrpNo;
	}
	, _convertDateObjToStr : function (dateObj) {
		if (dateObj) {
			return moment(dateObj).format("YYYY-MM-DD HH:mm:ss");
		}
	}
	, emailDomainChangeAction : function (domain = "") {
		// 도메인 셀렉트박스 자동 세팅
		let domainList = [];
		$('#domainSelectBox').children("option")
			.each((index, element) => domainList.push(element.textContent));
		if (domainList.indexOf(domain) > -1) {
			$('#domainSelectBox').val(domain);
		} else {
			$('#domainSelectBox').val('');
		}
		// 선택 값으로 도메인 인풋박스 세팅
		let selectedValue = $('#domainSelectBox').val();
		if (selectedValue) {
			$('#emailDomain').prop("disabled", true).addClass('disabled').val(selectedValue);
			return;
		}
		$('#emailDomain').prop("disabled", false).removeClass('disabled').val(domain);
	}
	, _dropMillisecond : function (dateStr) {
		return dateStr.slice(0, dateStr.indexOf('.'));
	}
	, indInfoDealChangeAction : function () {
		if ($('#indInfoDealYn').prop('checked')) {
			$('#indInfoCheckbox').show();
			let result = false;
			$('input:checkbox[name=indInfoRight]').each(function (idx) {
				if ($(this).prop('checked')) result = true;
			})
			/*if (!result) {
				$("input:checkbox[name=indInfoRight]").first().prop("checked", true);
			}*/
		} else {
			$('input:checkbox[name=indInfoRight]').prop("checked", false);
			$('#indInfoCheckbox').hide();
		}
	}
	, _setLeadingZero : function (number) {
		return number < 10 ? "0" + number : number;
	}

	//비밀번호 잠김 해제
	, passwdUnlock : function () {
		const userId = $("#paramUserId").val();
		if(!userId)return;
		if (userId && confirm(userEventMessage.passwdUnlockYn)) {
			common.Ajax.sendRequest("POST", _baseUrl + "system/userMgmt.unlockPassword.do",
				{userId: userId}, function(data){

				});
		}
	}
	//비밀번호 초기화
	, passwdInit : function () {
		const userId = $("#paramUserId").val();
		if(!userId)return;
		if (userId && confirm(userEventMessage.passwdInitYn)) {
			common.Ajax.sendRequest("POST", _baseUrl + "system/userMgmt.initializePassword.do",
				{userId: userId}, function(data){
					alert(data.data.userInfo.randomPasswd);
				});
		}
	}
	, _updateCallback : function (userId) {
		userMgmtEventhandler.eventhandler.onSearch(userId);
	}

	//사용자 정보 저장
	, onSave : function () {
		const create = $('#paramUserId').val()?"":"create";
		try {
			userMgmtEventhandler._validateUserRequest(create);
		} catch (e) {
			if (e.message) {
				alert(e.message);
			}
			return;
		}

		let userRequestObj = new UserRequest();
		let filedArr = Object.keys(userRequestObj);
		filedArr.forEach(field => {
		   userRequestObj[field] = $(`#${field}`).val() || "";
		});
		userRequestObj.userGbCd = '01';
		userRequestObj.emailAddr = `${$('#emailId').val()}@${$('#emailDomain').val()}`;
		userRequestObj.useYn = $('#useYn').prop('checked') ? 'Y' : 'N';

		//개인정보조회권한
		userRequestObj.indInfoDealYn = $('#indInfoDealYn').prop('checked') ? 'Y' : 'N';
		const indInfoRightArr = [];
		if (userRequestObj.indInfoDealYn === 'Y') {
			$('input:checkbox[name=indInfoRight]').each(function (idx) {
				const indInfoRight = {};
				indInfoRight.userId = $('#userId').val();
				indInfoRight.indInfoGbCd = $(this).val();
				indInfoRight.useYn = $(this).prop('checked') ? 'Y' : 'N';
				indInfoRightArr.push(indInfoRight);
			});
		} else {
			$('input:checkbox[name=indInfoRight]').each(function (idx) {
				const indInfoRight = {};
				indInfoRight.userId = $('#userId').val();
				indInfoRight.indInfoGbCd = $(this).val();
				indInfoRight.useYn = 'N';
				indInfoRightArr.push(indInfoRight);
			});
		}

		const requestObj = {};
		requestObj.userInfo = userRequestObj;
		requestObj.individualInfoRightList = indInfoRightArr;
		//권한그룹 변경 확인
		if (userMgmtEventhandler.rtGrpNo !== userRequestObj.rtGrpNo) {
			requestObj.changeRtGrpNoYn = 'Y';
			requestObj.beforeRtGrpNo = userMgmtEventhandler.rtGrpNo;
		} else {
			requestObj.changeRtGrpNoYn = 'N';
		}
		requestObj.createYn = create ? 'Y' : 'N';

		//저장하시겠습니까?
		if (confirm(userEventMessage.saveYn) !== true) {
            return;
        }

        console.log("requestObj.userInfo",requestObj.userInfo.deptCd)

		common.Ajax.sendJSONRequest("POST", _baseUrl + "system/userMgmt.saveUser.do",
			JSON.stringify(requestObj), userMgmtEventhandler._saveCallback.bind(this), true, 'application/json');
	}

	//데이터 유효성 검사
	,_validateUserRequest : function (create) {
		const userId = $('#userId').val().trim();

		//사용자아이디 Blank 여부
		if (isBlank(userId)) {
			$('#userId').focus();
			throw new Error(userEventMessage.userIdBlank);
		}

		//사용자아이디 중복체크 여부
		if (create === 'create' && (!this.duplCheckedId || userId !== this.duplCheckedId) ) {
			$('#userId').focus();
			throw new Error(userEventMessage.idDuplCheckNeed);//아이디 중복체크를 해주세요.
		}

		//사용자아이디 정합성(자릿수)
		if (create === 'create' && userId.match(/^.{8,12}$/g) === null) {
			$('#userId').focus();
			throw new Error(userEventMessage.userIdOverLength)
		}

		//사용자아이디 정합성(알파벳)
		if (create === 'create' && !isAlphanumeric(userId)) {
			$('#userId').focus();
			throw new Error(userEventMessage.userIdAlphanumeric);
		}

		//사용자명 체크
		const userNm = $('#userNm').val().trim();
		if (isBlank(userNm)) {
			$('#userNm').focus();
			throw new Error(userEventMessage.userNmBlank);
		}
		if (userNm.length > 200) {
			$('#userNm').focus();
			throw new Error(userEventMessage.userNmInvalid)
		}
		$('#userNm').val(userNm);

		//비밀번호 체크
		if (create === 'create' && checkPassword($('#pwd').val(), userId)) {
			$('#pwd').focus();
			throw new Error();
		}

		//전화번호
		const telRegNo = $('#telRgnNo').val().trim();
		if (isNaN(telRegNo) || telRegNo.length > 3) {
			$('#telRgnNo').focus();
			throw new Error(userEventMessage.telRegNoInvalid);
		}
		const telTxnoNo = $('#telTxnoNo').val().trim();
		if (isNaN(telTxnoNo) || telTxnoNo.length > 4) {
			$('#telTxnoNo').focus();
			throw new Error(userEventMessage.telOtherNoInvalid);
		}
		const telEndNo = $('#telEndNo').val().trim();
		if (isNaN(telEndNo) || telEndNo.length > 4) {
			$('#telEndNo').focus();
			throw new Error(userEventMessage.telOtherNoInvalid);
		}

		//휴대폰번호
		const cellTxnoNo = $('#cellTxnoNo').val().trim();
		if ( cellTxnoNo === "" || cellTxnoNo.length < 3 ) {
			$('#cellTxnoNo').focus();
			throw new Error(userEventMessage.cellTxnoInvalid);
		}
		if (isNaN(cellTxnoNo) || cellTxnoNo.length > 4) {
			$('#cellTxnoNo').focus();
			throw new Error(userEventMessage.cellTxnoInvalid);
		}
		$('#cellTxnoNo').val(cellTxnoNo);
		const cellEndNo = $('#cellEndNo').val().trim();
		if ( cellEndNo === "" || cellEndNo.length !== 4 ) {
			$('#cellEndNo').focus();
			throw new Error(userEventMessage.cellEndnoInvalid);
		}
		if (isNaN(cellEndNo)) {
			$('#cellEndNo').focus();
			throw new Error(userEventMessage.cellEndnoInvalid);
		}
		$('#cellEndNo').val(cellEndNo);

		//권한그룹 체크
		const rtGrpNo = $('#rtGrpNo').val();
		if (isBlank(rtGrpNo)) {
			$('#rtGrpNo').focus();
			throw new Error(userEventMessage.rtGroNoBlank);
		}

		//이메일
		const emailId = $('#emailId').val().trim();
		const emailDomain = $('#emailDomain').val().trim();
		if (isBlank(emailId)  || isBlank(emailDomain)) {
			$('#emailId').focus();
			throw new Error(userEventMessage.emailBlank)
		}
		const emailAddr = emailId + '@' + emailDomain;
		if (!isEmail(emailAddr)) {
			$('#emailId').focus();
			throw new Error(userEventMessage.emailInvalid)
		}
		if (emailAddr.length > 200) {
			$('#emailDomain').focus();
			throw new Error(userEventMessage.emailOverLength)
		}
		$('#emailId').val(emailId);
		$('#emailDomain').val(emailDomain);

		//업무그룹 체크
		const jobGrpCd = $('#jobGrpCd').val();
		if (isBlank(jobGrpCd)) {
			$('#jobGrpCd').focus()
			throw new Error(userEventMessage.jobGrpCdNotSelected);
		}

		//직책 체크
		const ocpCd = $('#ocpCd').val();
		if (isBlank(ocpCd)) {
			$('#ocpCd').focus();
			throw new Error(userEventMessage.ocpCdNotSelected);
		}

		//근무상태 체크
		const workStatCd = $('#workStatCd').val();
		if (isBlank(workStatCd)) {
			$('#workStatCd').focus();
			throw new Error(userEventMessage.workStatCdNotSelected)
		}

		//부서코드
		const deptCd = $('#deptCd').val().trim();
		if (deptCd && deptCd.length > 200) {
			$('#deptNm').focus();
			throw new Error(userEventMessage.deptNmOverLength);
		}
		$('#deptCd').val(deptCd);



		//상담석내선번호
		const itelNo = $('#itelNo').val().trim();
		if (itelNo && itelNo.length > 20) {
			$('#itelNo').focus();
			throw new Error(userEventMessage.itelNoOverLength)
		}
		if (isNaN(itelNo)) {
			$('#itelNo').focus();
			throw new Error(userEventMessage.itelNoNumeric)
		}

		if ($('#indInfoDealYn').prop("checked")) {
			let result = false;
			$('input:checkbox[name=indInfoRight]').each(function (idx) {
				if ($(this).prop('checked')) {
					result = true;	
				}
			})
			if (!result) {
				throw new Error(userEventMessage.indCheck)
			}
		}
	}

	, _saveCallback : function (response) {
		opener.umGrid.eventhandler.onSearch();
		window.close();
	}

	//사용자ID 중복체크
	, onCheckIdDuplicate : function () {
		var that = this;
		let userId = $("#userId").val().trim();
		if (!isAlphanumeric(userId)) {
			alert(userEventMessage.userIdAlphanumeric);
			return;
		}
		if (userId.match(/^.{8,12}$/g) === null) {
			alert(userEventMessage.userIdOverLength)
			return;
		}
        common.Ajax.sendJSONRequest(
            "GET"
            , _baseUrl + "system/userMgmt.getUserCount.do"
            , {userId:userId}
            , function(obj) {
				const count = obj.data;
				if (count > 0) {
					alert(userEventMessage.idDuplCheckFail);//사용 불가능한 아이디입니다.
					$("#userId").val("");
					return;
				}

				alert(userEventMessage.idDuplCheckOk);//사용 가능한 아이디입니다.
				that.duplCheckedId = $("#userId").val().trim();
            }
        );
	}

	//권한그룹 팝업
	, rtGrpPop : function (response) {
		let url = "/system/rightGroupMgmt.userRightGroupPopup.do";
		var pin = {
			sysGbCd : '11' //시스템구분코드(백오피스로 고정)
			, rtGrpNo : '' //권한그룹번호
			, rtGrpNm : '' //권한그룹명
			, argSelectType : '1'
		};
		var POP_DATA = {
			url: url
			, winName: 'userRtGrpPopup'
			, title: ''
			, _title: ''
			, left: 20
			, top: 20
			, width: 700
			, height: 550
			, scrollbars: false
			, autoresize: false
		}

		var popupRtGrpCallBack = function(e) {
			if(e.data != null && e.data != ''){
				var resultData = JSON.parse(e.data);
				if(resultData.length = 1){
					var setRtGrpData = resultData[0];
					$("#rtGrpNo").val(setRtGrpData.rtGrpNo);
				}
			}
		}

		popCommon(pin, POP_DATA, popupRtGrpCallBack);
	}

	, userDeptPop : function () {
		var pin = {};
        var POP_DATA = {
              url: '/popup/userMgmtPopup.userDeptMgmtListPopup.do'
            , winName: 'userDeptMgmtListPopup'
            , title: userEventMessageParam.userDeptPopupTitle
            , _title: userEventMessageParam.userDeptPopupTitle
            , left: 20
            , top: 20
            , width: 300
            , height: 400
            , scrollbars: false
            , autoresize: false
        };
        popCommon(pin, POP_DATA, function(e){
			var resultData = JSON.parse(e.data);
			$("#deptCd").val(resultData[0].deptCd);
		});
	}
};