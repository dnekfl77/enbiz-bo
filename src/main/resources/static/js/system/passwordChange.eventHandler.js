$.namespace("passwordChange.eventhandler");
passwordChange.eventhandler = {

    init : function () {
        this.bindButtonEvent();
    },

    bindButtonEvent : function(){
        var self = this;

		// 확인버튼
        $('#btn_passwd_change').on('click', function () {
            if(!self.valueCheck()) return;
            if(!self.currentPasswdCheck()) return;
            self.passwordCheck();
        });
    },

    valueCheck : function(){
        if($('#currentPasswd').val() == null || $('#currentPasswd').val() == '') {
             alert("기존 비밀번호는 " + msg.necessaryCheckMessage);
             $('#currentPasswd').focus();
             return false;
        } else if($('#newPasswd').val() == null || $('#newPasswd').val() == '') {
             alert("신규 비밀번호는 " + msg.necessaryCheckMessage);
             $('#newPasswd').focus();
             return false;
        } else if($('#newPasswdConfirm').val() == null || $('#newPasswdConfirm').val() == '') {
             alert("비밀번호 확인은 " + msg.necessaryCheckMessage);
             $('#newPasswdConfirm').focus();
             return false;
        }
        return true;
    },

    currentPasswdCheck : function(){
        var result = true;
        var param = {
                currentPasswd : $('#currentPasswd').val()
        }
        common.Ajax.sendRequestSync(
             "POST"
             , _baseUrl + "system/passwordChange.currentPasswordCheck.do"
             , param
             , function(obj) {
                  if (!obj.succeeded) {
                     result = false;
                  }
             }
        );

        if(result){
            return true;
        } else {
            alert(msg.notConfirm);
            return false;
        }
    },

    passwordCheck : function(){
        const newPasswd = $('#newPasswd').val();
        const passwdConfirm = $('#newPasswdConfirm').val();
        if (newPasswd !== passwdConfirm) {
            alert(msg.passwdNotSame);
            return;
        }

        if ( checkPassword(newPasswd, $('#loginId').val()) ) return;

        let param = {};
        param.newPasswd = newPasswd;
        param.currentPasswd = $('#currentPasswd').val();

        common.Ajax.sendJSONRequest(
             "POST"
             , _baseUrl + "system/passwordChange.updatePassword.do"
             , param
             ,function() {
                  $('input:password').val('');
             }
             , true
        );
    }
};