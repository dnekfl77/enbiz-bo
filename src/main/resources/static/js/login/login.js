$.namespace("commerce.admin.Login");
commerce.admin.Login = {
    //초기화
    initialize : function () {
        var _self = this;

        this.bindButtonEvent();

        if(!(_response===undefined || _response === null || _response === "")) {
            //비밀번호 변경
            if (_response.tpCd == "05") {
                layerPopOpen('layer-popup-password-change');
            }

            //비밀번호 초기화
            if (_response.tpCd == "06") {
                layerPopOpen('layer-popup-password-change');
            }
        }

        _self.focusOnLoginId();
    }
    // 이벤트 바인딩
    ,bindButtonEvent : function () {
        var _self = this;

        //비밀번호 변경
        $('#btn_password_initialize').click(function() {
            _self.onPasswordInitialize();
        });

        //비밀번호 변경
        $('#btn_passwd_change').click(function() {
            _self.onChangePassword();
        });

        //아이디 저장
        $('.form-input-ck').click(function(){
            if ($('.form-input-ck').hasClass('on')) {
                $('.form-input-ck').removeClass('on');
            } else {
                $('.form-input-ck').addClass('on');
            }
        });
    }
	,doLogin : function() {
		var f = document.loginForm;

		if (isBlank(f.loginId)) {
			alert(_idInputValid);
			f.loginId.focus();
			return false;
		}

		if (isBlank(f.password)) {
			alert(_pwdInputValid);
			f.password.focus();
			return false;
		}

		if ($('.form-input-ck').hasClass('on')) {
			setCookie("saveid", f.loginId.value, new Date(9999, 11, 31));
		} else {
			setCookie("saveid", '');
		}

		f.action = _baseUrl + "login.do";
		f.submit();
	},

	// 엔터키를 누를 경우
	handle_keypress : function(e) {
		if (e.keyCode == 13) {
			commerce.admin.Login.doLogin();
		}
	},

	focusOnLoginId : function(){
		var saveId = getCookie('saveid');
		$('[name=loginId]').focus();
		if (saveId) {
			$('[name=loginId]').val(saveId);
			$('.form-input-ck').addClass('on');
			$('#idsave').attr("checked", true);
		} else {
		    $('.form-input-ck').removeClass('on');
		}
	},
	loginVaildator : function(pwStr){

	}
    ,onLayerPopupClose : function(handlerId) {
        $('#'+handlerId).closest('.layer-popup').removeClass('open');
        if($('.layer-popup.open').length == 0) {
            $('html').removeClass('layer-open');
        }
        $('body').unbind('touchmove');
        $(window).scrollTop(ingScroll);
    }
    ,onPasswordInitialize : function(handler) {
        var _self = this;

        var initLoginId = $('#initLoginId').val();
        var cellSctNo   = $('#cellSctNo').val();
        var cellTxnoNo  = $('#cellTxnoNo').val();
        var cellEndNo   = $('#cellEndNo').val();

        if ("" == initLoginId) {
            alert(_baseIdInputValid);
            return false;
        }

        // 휴대폰번호 체크
        if ("" == cellSctNo) {
            alert(_messageInvalidCellNm);
            return false;
        }

        if ("" == cellTxnoNo) {
            alert(_messageInvalidCellNm);
            return false;
        }

        if ("" == cellEndNo) {
            alert(_messageInvalidCellNm);
            return false;
        }

        var passwordInitializeCallback = function (response) {
            if(response.resultType == 'Y') {
                //alert(response.message);
                _self.onLayerPopupClose('layer-popup-password-initialize');
            }
        };

        var parameter = {
                loginId : initLoginId
               ,cellSctNo : cellSctNo
               ,cellTxnoNo : cellTxnoNo
               ,cellEndNo : cellEndNo
        };

        common.Ajax.sendJSONRequest("POST"
            ,_baseUrl + "system/passwordInit.do"
            ,parameter
            ,passwordInitializeCallback
        );
    }
	,onChangePassword : function() {
	    var _self = this;

        const passwdChangeMessage = x2coMessage.getMessage({passwdNotSame : 'psrnMgmt.alert.passwd.not.same'});
        const newPasswd = $('#newPasswd').val();
        const passwdConfirm = $('#newPasswdConfirm').val();
        if (newPasswd !== passwdConfirm) {
            alert(passwdChangeMessage.passwdNotSame);
            return;
       }

        var loginId = $('#loginId').val();

        //util.js 참고
        if (checkPassword(newPasswd, loginId)) return;

        var passwdChangeCallback = function (response) {
            if (response.succeeded) {
                $('input:password').val('');
                _self.onLayerPopupClose('layer-popup-password-change');
            }
        };

        var param = {};
        param.newPasswd = newPasswd;
        param.currentPasswd = $('#currentPasswd').val();
        common.Ajax.sendJSONRequest("POST"
            , _baseUrl + "system/updatePasswordByPasswordInitialize.do"
            , param, passwdChangeCallback, true);
    }
};

jQuery(document).ready(function() {
	commerce.admin.Login.focusOnLoginId();
	commerce.admin.Login.initialize();

	cookiedata = document.cookie;
    if ( cookiedata.indexOf("noticeLayer=none") > 0 ){     
        $("#loginPop").hide();
    }
});