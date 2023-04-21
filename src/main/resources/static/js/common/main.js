$.namespace("commerce.admin.Common");
var _common = {
	cannotAccess : function() {
		alert('접근할 수 없습니다. 권한이 부족합니다.');
	}
};

$.namespace("commerce.admin.Main");
commerce.admin.Main = {
	logout : function() {
		window.location.replace(_baseUrl + "logout.do");
	},
	toLoginPage : function() {
		window.location.replace(_baseUrl + "loginForm.do");
	},
	changeLocale : function(locale) {
		window.location.replace(_baseUrl + "main/changeLocale.do?_locale="+ locale);
	},
	changeDbLocale : function(locale) {
		window.location.replace(_baseUrl + "main/changeLocale.do?_dblocale="+ locale);
	}
};
//jQuery(document).ready(function(){
//	$('#selectSb').find("[name=selectflag]").removeClass(function() {
//		  return $( this ).attr( "class" );
//	}).addClass("flag_"+_currentLocaleLanguage);
//
//	$('#selectDb').find("[name=selectflag]").removeClass(function() {
//		  return $( this ).attr( "class" );
//	}).addClass("flag_"+_dbLocaleLanguage);
//
//	common.Ajax.sendJSONRequest(
//        "POST",
//        _baseUrl + "system/baseInfoMgmt.getCodeDetailListAjax.do",
//        {grpCd : "COM101", langCd : _currentLocaleLanguage},
//        function(result){
//            $.each(result.data, function(index, code){
//                var liTemplate = $('[type=sb_template]').clone();
//                liTemplate.attr("type","sb");
//                liTemplate.attr("code",code.cd);
//                liTemplate.find("[name=flag]").addClass("flag_"+code.cd);
//                liTemplate.find("[class=lang]").append(code.cdNm);
//                liTemplate.appendTo($('#sbLanguageBin'));
//                liTemplate.show();
//
//                liTemplate.find("[class=lang]").bind('click',function(){
//                    var selectedLocale = code.cd;
//                    if(selectedLocale != _currentLocaleLanguage){
//                        $('#selectSb').find("[name=selectflag]").removeClass(function() {
//                            return $(this).attr('class');
//                            }).addClass("flag_"+selectedLocale);
//                        commerce.admin.Main.changeLocale(selectedLocale);
//                    }
//                });
//            })
//        }
//	);
//
//	common.Ajax.sendJSONRequest(
//        "POST",
//        _baseUrl + "system/baseInfoMgmt.getCodeDetailListAjax.do",
//        {grpCd : "COM100", langCd : _dbLocaleLanguage},
//        function(result){
//            $.each(result.data, function(index, code){
//
//                var liTemplate = $('[type=db_template]').clone();
//                liTemplate.attr("type","db");
//                liTemplate.attr("code",code.cd);
//                liTemplate.find("[name=flag]").addClass("flag_"+code.cd);
//                liTemplate.find("[class=lang]").append(code.cdNm);
//                liTemplate.appendTo($('#dbLanguageBin'));
//                liTemplate.show();
//
//                liTemplate.find("[class=lang]").bind('click',function(){
//                    var selectedDbLang = code.cd;
//                    if(selectedDbLang != _dbLocaleLanguage){
//                        $('#selectDb').find("[name=selectflag]").removeClass(function() {
//                            return $(this).attr('class');
//                            }).addClass("flag_"+selectedDbLang);
//                        commerce.admin.Main.changeDbLocale(selectedDbLang);
//                    }
//                });
//            })
//        }
//	);
//});
