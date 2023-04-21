$.namespace("common.Ajax");
common.Ajax = {

	getAjaxObj : function(_method, _url, _data){
		return $.ajax({
	       	 type 	: _method
	       	, url 	: _url
	       	, data 	: _data
	    });
	}

    , sendRequestSync : function(_method, _url, _data, _callback, isToast){
		var that = this;
		$.ajax({
       	 type 	: _method
       	, url 	: _url
       	, data 	: _data
       	, async  : false
       	, success: function(response){that.proceed(response, _callback, isToast);}
       	, error	: function (jqXHR,error, errorThrown){that.error(jqXHR,error, errorThrown);}
       	, beforeSend : function (){that.before();}
       	, complete : function (){that.after();}
       });
	}

	, sendRequest : function(_method, _url, _data, _callback, isToast){
		var that = this;
		$.ajax({
       	 type 	: _method
       	, url 	: _url
       	, data 	: _data
       	, success: function(response){that.proceed(response, _callback, isToast);}
       	, error	: function (jqXHR,error, errorThrown){that.error(jqXHR,error, errorThrown);}
       	, beforeSend : function (){that.before();}
       	, complete : function (){that.after();}
       });
	}
	
	, sendMultiPartRequest : function(_url, _data, _callback, isProgressBar, isToast){
		var that = this;
		$.ajax({
       	 type 	: "post"
       	, url 	: _url
       	, data 	: _data
       	, processData: false
       	, contentType: false
       	, enctype: 'multipart/form-data'
       	, dataType : "json"
       	, success: function(response){that.proceed(response, _callback, isToast);}
       	, error	: function (jqXHR,error, errorThrown){that.error(jqXHR,error, errorThrown);}
       	, beforeSend : function (){that.before(isProgressBar);}
       	, complete : function (){that.after(isProgressBar);}
       });
	}

	, sendJSONRequest : function(_method, _url, _data, _callback, _async, _contentType, isToast){
	    var that = this;
	    _async = _async ? _async : true;
	    _contentType = _contentType ? _contentType : "application/x-www-form-urlencoded;charset=UTF-8";

		$.ajax({
	       	 type 	: _method
	       	, url 	: _url
	       	, data 	: _data
	       	, async  : _async
	       	, contentType: _contentType
	       	, dataType : "json"
	       	, success: function(response){that.proceed(response, _callback, isToast);}
	       	, error	: function (jqXHR,error, errorThrown){that.error(jqXHR,error, errorThrown);}
	       	, beforeSend : function (){that.before();}
	       	, complete : function (){that.after();}
	       });
	}

	/**
	 * 순차적으로 여러 개의 ajax 요청을 전송할 때 사용한다.
	 * ajax 객체를 생성하기 위해 common.Ajax.getAjaxObj 메소드를 사용할 수도 있다.
	 * 사용 방법은 다음과 같다.
	 *
	 *  //1. 순차적으로 동작할 ajax 호출을 작성하고 배열에 입력한다.
	 *  var ajax1 = $.ajax(_baseUrl + "/board/listJSON.do");
     *	var ajax2 = $.ajax(_baseUrl + "/board/listJSON.do");
     *	var requests = [ajax1, ajax2];
     *
     *  //2. 구현된 callback 메소드를 각각 순서대로 배열에 입력한다.
     *	var callbacks = [commerce.front.BoardList._callback_getBoardList, commerce.front.BoardList._callback_getBoardList];
     *
     *  //3. common.Ajax.sendMultipleRequest를 호출한다.
     *	common.Ajax.sendMultipleRequest(requests, callbacks);
	 *
	 * @param _requests
	 * @param _callbacks
	 */
	, sendMultipleRequest : function(_requests, _callbacks){
		var that = this;
		$.when.apply(undefined, _requests).done(function(){
			for(var i = 0 ; i < arguments.length ; i ++){
				that.proceed(arguments[i][0], _callbacks[i]);
			}
		});
	}

	/**
	 * JSONP 요청을 전송하는 메소드
	 *
	 * @param _method
	 * @param _url
	 * @param _data
	 * @param _callback
	 */
	, sendJsonpRequest : function(_method, _url, _data, _callback,isToast){
		var that = this;
		$.ajax({
	       	 type 	: _method
	       	,url 	: _url
	       	,data 	: _data
	       	,dataType : "jsonp"
	       	,success: function(response){that.proceed(response, _callback, isToast);}
	       	,error	: function (jqXHR,error, errorThrown){that.error(jqXHR,error, errorThrown);}
	       	,beforeSend : function (){that.before();}
	       	,complete : function (){that.after();}
	       });
	}

	, proceed : function(response, _callback, isToast){
		var that = this;

        if ( typeof response === "string" ) {
            if (response.indexOf("!DOCTYPE") > 0) {
                alert("시스템 오류가 발생하였습니다. 새로고침 후 다시 확인해 주세요. \n새로고침 후 안되시면 시스템 담당자에게 문의해 주세요.");
            } else {
                if(response.message){
                    alert(that.decodeXss(response.message));
                }

                if(_callback){
                    _callback(that.decodeXss(response));
                }
            }
        } else {
            if(response.message){
				if(isToast) {
					openToast(that.decodeXss(response.message));
				} else {
	                alert(that.decodeXss(response.message));
				}
            }

            if(_callback){
                _callback(that.decodeXss(response));
            }
        }
	}

	, error : function(xhr, status, error) {
	    $('#progressBar').remove();//progressBar Remove
        console.log(xhr, status, error);
        if(xhr && xhr.status){
			if (xhr.status == 401) { //로그아웃의경우
				location.replace(_baseUrl + "loginForm.do");
			} else if (xhr.status == 500) {//500인경우 시스템장애로 alert
				alert(_msg.systemError);
			} else if (xhr.status == 403 || xhr.status == 400) {
				alert("Error : " + $.parseJSON(xhr.responseText).message);
			} else if (xhr.status == 424) {
				alert($.parseJSON(xhr.responseText).message);
			} else {
				alert(_msg.processError);	
			}
		}else{
			alert(_msg.processError);//시스템 장애로인해 오류가 발생했습니다.\n담당자에게 문의 바랍니다.
		}
    }

	, before : function(isProgressBar){
		if (!isProgressBar) isProgressBar = true;
		if (isProgressBar) {
			//저장, 삭제, 조회
			var html='';
			html+='<div class="spinner-back" id="progressBar">';
			html+='	<div class="spinner-border" role="status">';
			html+='		<span class="visually-hidden">Loading...</span>';
			html+='	</div>';
			html+='</div>';
			$('body').append(html);//progressBar show
		}

		if(localStorage.alertifyExists === undefined || localStorage.alertifyExists === 'false'){
			// alertify.message('요청이 처리중입니다. 잠시만 기다려주세요.', 0);
			localStorage.alertifyExists = 'true';
		}
	}

	, after : function(isProgressBar){
		if (!isProgressBar) isProgressBar = true;
		if (isProgressBar) {
			$('#progressBar').remove();//progressBar Remove
		}
		if(localStorage.alertifyExists === 'true'){
			// alertify.dismissAll();
			// alertify.message('처리가 완료되었습니다.', 1);
			localStorage.alertifyExists = 'false';
		}

	}

	, getJSON : function(text){
		try{
			if(!text) {
				return false;
			}
			var obj = eval(text);

			// 에러가 발생했다면 "error"라는 key 이름으로 object에 value가 입력되어 있다고 가정한다.
			if(obj.error) {
				alert("비동기 통신에 문제가 생겼습니다. ["+obj.error+"]");

				return;
			}

			if(typeof obj == "object") return obj;
		}
		catch(e){ return false; }
	}

	, decodeXss : function (str){
		if (str == null) {
			return str;
		}
		var obj = str;
		if (obj instanceof Array) {
			for (var i=0, len = obj.length; i < len; i++) {
				obj[i] = this.decodeXss(obj[i]);
			}
		} else if(obj instanceof Object) {
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) {
					obj[attr] = this.decodeXss(obj[attr]);
				}
			}
		}
		return obj;
	}
};