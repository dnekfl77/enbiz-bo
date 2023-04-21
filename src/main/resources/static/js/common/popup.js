/**
 *  공통 팝업
 */

/**
 *  전체 팝업 호출 함수
 */
function openWindow(url, title, l, t, w, h) {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop

  const isNotOpener = typeof opener == "undefined" || opener == null;

  let newWindow=null;
  if(isNotOpener) {
    newWindow = window.open(url, title, 'resizable=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  } else {
    newWindow = window.open(url, title, 'resizable=no, width=' + w + ', height=' + h + ', top=' + top+100 + ', left=' + left+100);
  }

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
  return newWindow
}

var _fullWidth = (screen.width - 20);  //팝업 사이즈 모니터 해상도 맞춤
var _fullHeight = (screen.height - 100);  //팝업 사이즈 모니터 해상도 맞춤
(function(window){
	//5.openwin
	/**
	 * pin:{
	 *		url:string,
	 *		winName:string,
	 *		title:string,
	 *		_title:string,	팝업브라우저의 타이틀 변경시
	 *		params:map,
	 *		autoresize:boolean
	 * }
	 *
	 * parameter를 배열 형식으로 넘기면 갯수에 맞게 처리됨 (ex) params:{..., name:[a:'name', b:'name', c:'name'], ...}  name=a&name=b&name=c
	 * type -> deprecated type을 사용하지 않습니다. width와 height는 직접 셋팅하셔야 합니다. s->small(350*400), m->middle(550*400), l->large(750*400) height는 변동가능
	 */
	popup = function(pin, callbackFn) {
		var defaultProps = {
			winName: "",
			title: "",
			_title: "",
			params: {},
			scrollbars: false,
			resizable: true,
			action: false
		};

		if (!pin.width) {
			switch (pin.type) {
				case "s":
					pin.width = "390px";
					break;
				case "sl":
					pin.width = "440px";
					break;
				case "m":
					pin.width = "590px";
					break;
				case "l":
					pin.width = "790px";
					break;
				case "xl":
					pin.width = "840px";
					break;
				case "xml":
					pin.width = "940px";
					break;
				case "xxl":
					pin.width = "100%";
					break;
				default:
				    pin.width = "600px";
                    break;
			}
		}
		if ( !pin.height ) {
			pin.height = "400";
		}

		pin = $.extend(defaultProps, pin||{});

		if (pin.params && pin.type) {
			pin.params.type = pin.type;
		}

		var form = $();
		var params = "";

		var openUrl = "";
		//post방식
		if( pin.action ){
			form = $('<form></form>').attr('id','popupAction').attr('method', 'post')
			        .css('display','none').attr('target', pin.winName).attr('action', pin.url);

			$.each(pin.params, function(name, value){
				var element = $('<input></input>').attr('name', name).attr('value', value);
				form.append(element);
			});
			var element = $('<input></input>').attr('name', '_title').attr('value', pin._title);
			form.append(element);
			$('body').append(form);
		} else {	//get방식
			$.each(pin.params, function(name, value){
				if ($.isArray(value)) {
					$.each(value, function(index, value){
						params += ("&" + name + "=" + encodeURIComponent(value));
					});
				} else {
					params += ("&" + name + "=" + encodeURIComponent(value));
				}
			});

			// 택배사 추적 같은 경우 풀 url 주소로 넘어 오기 때문에 & 처리로 하기 위함.
			if (pin.dlvp_yn){
				openUrl = "http://"+ pin.url.replace("http://", "");
			}else{
				if(!(pin.action) && '' != pin.url){
					openUrl = pin.url;
					if (pin.url.indexOf('?') >= 0) {
						openUrl = openUrl + "&title=" + encodeURIComponent(pin.title) + "&type=" + pin.type +
						    ( pin.action ? '' : params );
					} else {
						openUrl = openUrl + "?title=" + encodeURIComponent(pin.title) + "&type=" + pin.type +
						    ( pin.action ? '' : params );
					}
				}
			}
		}

		var _left = (screen.width)/2 - (pin.width+"").replace(/px/, '')/2 ;
		var _top = (screen.height)/2 - (pin.height+"").replace(/px/, '')/2;

		if(!(pin.action) && '' != pin.url && '' != pin._title ){
			openUrl += "&_title=" + encodeURIComponent(pin._title);
		}
		var winName = (typeof pin.winName == "string" ? pin.winName : "winPopup");
		winName = winName.replaceAll(" ", "");
		var win = window.open(
			openUrl,
			winName,
			"menubar=no, left=0, top=0, scrollbars=" + (pin.scrollbars ? "yes" : "no") +
			", resizable=" + (pin.resizable ? "yes" : "no") +
			", toolbar=0,location=0, directories=0, status=0, menubar=0, width=" + pin.width +
			", height=" + pin.height
		);
		win.addEventListener("message", callbackFn);

		//post일때 submit
		if(pin.action){
			form.submit();
		}

		//포커스
		if(win != undefined && win != null ){
			win.focus();
		}
		return win;
	};

	/**
	 * 개  요 : 팝업 공통
	 * 사용예 : popCommon({"faqId"			: "123456789"},{url:"aa",title:"",......});
	 */
	popCommon = function(pin, POP_DATA, callbackFn) {
		if(POP_DATA.resizable==null){
			POP_DATA.resizable = true;
		}

		var win = popup({url: POP_DATA.url
           , winname: POP_DATA.winname
           , title: POP_DATA.title
           , _title: POP_DATA._title
           , left: POP_DATA.left
           , top: POP_DATA.top
           , width: POP_DATA.width
           , height: POP_DATA.height
           , params: pin
           , scrollbars: POP_DATA.scrollbars
           , autoresize: POP_DATA.autoresize
           , resizable: POP_DATA.resizable
		}, callbackFn);

		return win;
	};

	/*
	 * CUD 팝업 공통 confirm
	 */
	closePop = function() {
	    var _closeMessage = x2coMessage.getMessage("adminCommon.alert.popup.close");

	    if(!confirm(_closeMessage) ) { return false; }

	    window.close();
	    return true;
	};
})(window);