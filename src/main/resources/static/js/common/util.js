/**
 * 유틸리티 함수 모음
 * 1.common
 * 2.cookie
 * 3.date
 * 4.number
 * 5.openwin
 * 6.text
 * 7.validate
 */


String.prototype.addZero = function() {
	return ("0" + this).substr(-2, 2);
};

String.prototype.toInt = function () {
    if (/^-/.test(this)) {
        return this.replace(/\..*$/g, '').replace(/[^\d]/g, '') * -1;
    } else {
        return this.replace(/\..*$/g, '').replace(/[^\d]/g, '') * 1;
    }
};
String.prototype.toNum = function () {
    if (/^-/.test(this)) {
        return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '');
    } else {
        return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '');
    }
};
String.prototype.toFloat = function () {
	if (/^-/.test(this)) {
		return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '') * -1.0;
	} else {
		return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '') * 1.0;
	}
};
String.prototype.toComma = function () {
	if(this.trim() == ""){
		return "";
	}
    var num = (this.trim().toFloat() + '').split(/\./);
    var commal = function (text) {
        var ret = text.replace(/(\d)(\d{3},)/g, '$1,$2');
        if (ret == text) return ret;
        return commal(ret);
    };
    var commar = function (text) {
        var ret = text.replace(/(,\d{3})(\d)/g, '$1,$2');
        if (ret == text) return ret;
        return commar(ret);
    };
    var ret = commal(num[0].replace(/(\d)(\d{3})$/g, '$1,$2'));
    if (num.length > 1) {
        ret += '.' + commar(num[1].replace(/^(\d{3})(\d)/g, '$1,$2'));
    }
    return ret;
};
String.prototype.isEmpty = function() {
	if(this === null || this === undefined
	|| typeof this === "undefined" || this.trim() === "") {
		return true;
	}
	return false;
};

/**
 * url Param 정보를 JSON으로 반환해주는 함수
 * @return json
 */
$.namespace("x2co.util");
(function(w, $, ns) {
    x2co.util = x2co[ns] || {};

    x2co.util = {
        getParam : function() {
            var searchStr = window.location.search.replace(/\?/g, ""),
            	searchSplit = searchStr.split("&"),
            	paramObj = {};

            $.each(searchSplit, function(key, value) {
                var valueSplit = value.split("=");
                paramObj[valueSplit[0]] = valueSplit[1];
            });

            return paramObj;
        },
    };
})(window, jQuery, "util");



//grid 컬럼 값으로 itemIndex값을 구하는 플러그인 함수
$.fn.getIndexByData = function(colNm, colVal) {
	var grid = $(this).getGridView(),
		count = grid.getItemCount(),
		i = 0;

	for(i = 0; i < count ; i++) {
		if(grid.getValue(i , colNm) === colVal) {
			targetRow = i;
			return targetRow;
		}
	}
	return 0;
};

//grid 컬럼 값으로 포커스 이동시키는 플러그인 함수
$.fn.setFocus = function(colNm, colVal, callback) {
	var $grid = $(this),
		grid = $grid.getGridView(),
		itemIndex = $grid.getIndexByData(colNm, colVal);

	setTimeout(function() {
 	grid.setCurrent({itemIndex : itemIndex});
 	if(typeof callback === "function") {
 		callback(itemIndex);
 	}
	}, 500);
};

(function(window){

	//1.common
	_pageX = 0,
	_pageY = 0;
	/**
	 * 와이즈그리드내에서 마우스의 위치를 확인하기 위하여 마우스 위치를 저장한다.
	 */
	$(document).ready(function(){
		$(document).mousemove(function(e){
			_pageX = e.pageX;
			_pageY = e.pageY;
		});
	});

	/**
	 * 입력값에 의한 날짜 반환
	 */
	dataToDateString = function(dateData) {
		var type = typeof dateData,
			nowDate = (new Date()).dateToFormat();
		if(!!dateData) {
			if(type === "string") {
				try {
					dateData = $.trim(dateData);
					return (new Date(dateData)).dateToFormat();
				} catch(e) {
					return nowDate;
				}
			} else if(type === "object" && "getDate" in dateData) {
				return dateData.dateToFormat();
			} else {
				return nowDate;
			}
		} else {
			return nowDate;
		}
	};

	/**
	 * 캘린더 호출
	 * targetID : 선택 날자 입력 Obj
	 */
	callCalendar = function(targetID) {
		var obj = targetID;
		if (typeof targetID == "string" && targetID != "") {
			obj = $("#"+ targetID);
		} else if (typeof targetID == "object" && !(targetID instanceof jQuery)) {
			obj = $(targetID);
		}
		if (!(obj instanceof jQuery)) {
			return;
		}
		showCalendar({
			type:'B', // A:시작,종료일선택, B:해당 날짜 1개 선택
			format:'yyyy-MM-dd',
			max_term:null,
			fn:function(pin) {
				obj.val(pin.yyyymmdd);
			}
		});
	};

	/**
	 * 캘린더
	 * pin:{
	 * 		type:string,		//A:2단 달력(시작/종료 선택형), B:3단 달력(단일선택), C:1단 달력(단일선택 popup에서만 사용)
	 * 		format:string,		//'yyyy-MM-dd', 'yyyy-MM-dd HH'. 'yyyy-MM-dd HH:mm'	중 택1 미지정시 yyyy-MM-dd
	 * 		yyyymmdd:string,	//기준년월일 yyyy-MM-dd의 포맷으로 넘긴다.
	 * 		yyyymmdd1:string,	//기준년월일 yyyy-MM-dd의 포맷으로 넘긴다.	->	A형 좌측
	 * 		yyyymmdd2:string,	//기준년월일 yyyy-MM-dd의 포맷으로 넘긴다.	->	A형 우측
	 * 		hours:array,		//시간 select box 옵션, 미지정시 00 ~ 23 -> ['00','02','04',...]
	 * 		mins:array,			//분 select box 옵션, 미지정시 00 ~ 59 -> ['00','10','20',...]
	 * 		max_date1:string,	//'2010-06-10 00:00',	해당일 이후는 셋팅안됨(format과 동일하게 셋팅)
	 * 		min_date1:string,	//'2010-06-01 00:00'	해당일 이전은 셋팅안됨(format과 동일하게 셋팅)
	 * 		max_date2:string,	//'2010-06-10 00:00'	해당일 이후는 셋팅안됨(format과 동일하게 셋팅)
	 * 		min_date2:string,	//'2010-06-01 00:00'	해당일 이전은 셋팅안됨(format과 동일하게 셋팅)
	 * 		max_term:number,	//시작일과 종료일의 범위가  max_term 넘을 수 없다.
	 * 		max_term_check:boolean,	//시작일과 종료일의 범위가 max_term 과 일치하여야 한다.
	 * 		center:boolean,		//달력을 무조건 화면의 중앙에 위치 시킨다.(디폴트 false)
	 * 		startEndChk:boolean		//시작일과 종료일이 같은지 체크한다.
	 * }
	 */
	showCalendar = function(pin) {
		pin = $.extend({type:'A', center:false, max_term_check:false}, pin||{});

		// 잘못 입력된 날짜 재정의 ex)pin={yyyymmdd : ""} or pin={yyyymmdd : "2016-12"} 등등
		$.each(["yyyymmdd","yyyymmdd1","yyyymmdd2","max_date1","max_date2","min_date1","min_date2"], function() {
			if(this in pin) {
			    if(pin[this] == ""){
                    pin[this] = dataToDateString(pin[this]);
                }else{
                    var reDate = pin[this].match(/(\d{4}-\d{2}-\d{2})(\s\d{0,2}\:\d{0,2}:?\d{0,2}?)?/);
                    pin[this] = dataToDateString(reDate[1]) + reDate[2];
                }
			}
		});

		var width = (pin.type == 'A') ? '452px' : '612px' ;
		var height = (pin.type == 'A') ? '251px' : '178px' ;
		if (pin.type == 'B' && pin.format != 'yyyy-MM-dd') {
			height = '235px';
		} else if (pin.type == 'C') {
			width = '232px';
			if (pin.format != 'yyyy-MM-dd') {
				height = '240px';
			} else {
				height = '196px';
			}
		}

		var calendar_id = "_Calendar_LAYER";

        // S calendar div layer id setting 2021.06.14 by nhpark
        pin.id = calendar_id;
        pin.height = height;
        // E calendar div layer id setting 2021.06.14 by nhpark

		createLayer({
			id:calendar_id,
			width:width,
			height:height,
			top:pin.top,
			left:pin.left,
			center:pin.center
		});

		pin.width = width;

        //console.log('after createLayer pin = ', pin);

		$('#' + calendar_id).createCalendar(pin);
	};

	/**
	 * layer를 뛰운다. active x 위에서도 보여질 수 있도록 iframe 처리한다.
	 * pin:{
	 * 		id:string,		layer의ID :ID로 레이어를 참조할 수 있다.
	 * 		width:string,	layer의 폭
	 * 		height:string,	layer의 높이
	 * 		top:string,		layer의 x좌표 -> 미지정시 마우스의 현재 위치
	 * 		left:string		layer의 y좌표 -> 미지정시 마우스의 현재 위치
	 * 		html:HTML,		layer의 내용
	 * 		show:boolean,	기본적으로 보임 -> 미지정시 true
	 * 		center:boolean,	레이어를 무조건 화면의 중앙에 위치 시킨다.
	 * 		resize:boolean	내용에 맞춰서 크기 변경 여부 (디폴트 false)
	 * }
	 */
	createLayer = function(pin) {
		pin = $.extend({top:_pageY, left:_pageX-200, show:true, resize:false}, pin||{});
		if (!pin.id) {
			alert('Layer id를 지정하세요!');
			return;
		}
		if (!pin.width) {
			alert('width를 지정하세요!');
			return;
		}
		if (!pin.height) {
			alert('height를 지정하세요!');
			return;
		}

		var display = $('#' + pin.id).css('display');

		if (typeof(display) == "undefined") {	//layer 미생성 단계
			var display = pin.show ? "block" : "none" ;

			if (navigator.appVersion.indexOf('MSIE 7') > 0) {	//IE 7
				pin.width = parseInt(pin.width.replace(/px/g, ''), 10);
				pin.height = parseInt(pin.height.replace(/px/g, ''), 10) + 10;
			} else {
				pin.width = parseInt(pin.width.replace(/px/g, ''), 10);
				pin.height = parseInt(pin.height.replace(/px/g, ''), 10);
			}

			var iframe = $('<iframe></iframe>');
			iframe.attr('id', pin.id + "_IFRAME").css('display', 'block').css('position', 'absolute').css('top', '0px').css('left', '0px');
			iframe.css('z-index', '-1').css('filter', 'alpha(opacity=0)').css('opacity', '0').css('-moz-opacity', '0');
			iframe.css('width', pin.width+10).css('height', pin.height+20);
			iframe.attr('src', 'about:blank');

			var maindiv = $('<div></div>').attr('id', pin.id + "_CONTAINER")
				.css('display', display)
				.css('position', 'relative')
				.css('width', pin.width)
				.css('height', pin.height);	//실제 내용이 삽일될 영역
			if (pin.html) {
				maindiv.append(pin.html);
			}

			var outterdiv = $('<div></div>').attr('id', pin.id)
				.css('top', pin.top)
				.css('left', pin.left)
				.css('display', 'block')
				.css('position', 'absolute')
				.css('z-index', '99999');

			//outterdiv.append(maindiv);
			outterdiv.append(iframe);

			if (pin.resize) {
				outterdiv.css('height', maindiv.attr('scrollHeight'));
				outterdiv.css('width', maindiv.attr('scrollWidth'));
				iframe.css('height', maindiv.attr('scrollHeight'));
				iframe.css('width', maindiv.attr('scrollWidth'));
			}
			$('body').append(outterdiv);

		} else if (display == 'block') {
			$('#' + pin.id).remove();
		} else if (display == 'none') {
			$('#' + pin.id).show();
		}
	};

	/**
	 * 10보다 작으면 앞에 0을 붙임
	 */
	addzero = function(n) {
		return n < 10 ? "0" + n : n;
	};

	/**
	 * 그리드 높이 구하기
	 * 검색부분과 조회그리드 하나일 경우 해상도에 맞게 그리드 높이를 맞추기 위해서 사용함
	 * 검색부분과 그리드가 하나인 템플릿에서 사용합
	 * 그리드 props 설정에서 높이 설정하는 부분을
	 * height:getGridHeight(), 로 설정
	 * @return
	 */
	getGridHeight = function (){
		try{
		searchHeight = $( window ).height()-document.getElementById("search_bar").offsetHeight-190 ;
		if(searchHeight < 100){
			searchHeight = 200;
		}
		}catch(e){
			searchHeight = $( window ).height() - 390;
		}
		//alert(searchHeight);
		return searchHeight;
	};

	getGridHeightByGridCount = function (cnt){
		//alert($( window ).height());
		//alert( document.getElementById("content").offsetHeight);
		searchHeight = $( window ).height()-document.getElementById("search_bar").offsetHeight-220 ;
		//alert(searchHeight);
		var height = searchHeight/cnt;
		if(height<100){
			height=100;
		}
		return height;
	};

	//4.number

	/**
	 * <pre>
	 * 숫자나 문자열을 통화(Money) 형식으로 만든다.
	 * 단, 양수만 허용한다.
	 * &lt;input type="text" name="test" value="" onkeyup="this.value=toCurrency(this.value);"&gt;
	 * or
	 * var num = toCurrency(document.form[0].text.value);
	 * </pre>
	 * @param	amount	"1234567"
	 * @return	currencyString "1,234,567"
	 * @see #toCurrency(amount)
	 */
	toCurrencyPositive = function(amount){
		var firstChar = amount.substr(0,1);
		if(firstChar == "-"){
			amount = amount.substring(1, amount.length);
		}
		return toCurrency(amount);
	};

    /**
     * 숫자만 입력 가능
     * @param {*} text : 문자
     */
    number = function(el){
        var text = el.value;
        el.value = text.replace(/[^0-9]/g, '');
    }

    /** 한글지우기
     */
    delHangle = function(evt) {
        var objTarget = evt.srcElement || evt.target;
        var _value = event.srcElement.value;
        if(/[ㄱ-ㅎㅏ-ㅡ가-핳]/g.test(_value)){
            objTarget.value = null;
        }
    }

    /** % 입력란
     * 소수점 둘째자리까지 표현, 100이하의 숫자
     */
    decimalPoint2 = function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;

        var _value = event.srcElement.value;

        if (event.keyCode < 48 || charCode > 57 ) {
            if(event.keyCode != 46) { // 숫자와 . 만 입력가능하도록함
                return false;
            }
        }

        // 소수점(.)이 두번 이상 나오지 못하게
        var _pattern0 = /^\d*[.]\d*$/; // 현재 value값에 소수점(.) 이 있으면 . 입력불가
        if (_pattern0.test(_value)) {
            if (charCode == 46) {
                return false;
            }
        }

        // 100 이하의 숫자만 입력가능
        var _pattern1 = /^\d{2}$/; // 현재 value값이 2자리 숫자이면 . 만 입력가능
        if (_pattern1.test(_value)) {
            if (charCode != 46) {
                //alert("100 이하의 숫자만 입력가능합니다");
                return false;
            }
        }

        // 소수점 둘째자리까지만 입력가능
        var _pattern2 = /^\d*[.]\d{2}$/; // 현재 value값이 소수점 둘째짜리 숫자이면 더이상 입력 불가
        if (_pattern2.test(_value)) {
            //alert("소수점 둘째자리까지만 입력가능합니다.");
            return false;
        }

        return true;
    }

	/**
	 * 한글, 영문, 엔터 글자수 체크
	 * ex) onFocus=getChkByte(this,50) onKeyUp=getChkByte(this,50)
	 */
	getChkByte = function(aro_name, ari_max){

		var ls_str = aro_name.value; // 이벤트가 일어난 컨트롤의 value 값
		var li_str_len = ls_str.length; // 전체길이

		// 변수초기화
		var li_max = ari_max; // 제한할 글자수 크기
		var i = 0; // for문에 사용
		var li_byte = 0; // 한글일경우는 2 그밗에는 1을 더함
		var li_len = 0; // substring하기 위해서 사용
		var ls_one_char = ""; // 한글자씩 검사한다
		var ls_str2 = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

		for(i=0; i< li_str_len; i++){
			ls_one_char = ls_str.charAt(i);// 한글자추출
			if (escape(ls_one_char).length > 4){// 한글이면 3를 더한다. 엔터
				li_byte += 3;
			}else if(ls_one_char=="\r\n" && ls_str.charAt(i+1)=="\r\n"){//엔터
				li_byte += 2;
			}else{
				li_byte++;
			}

			// 전체 크기가 li_max를 넘지않으면
			if(li_byte <= li_max){
				li_len = i + 1;
			}
		}

		// 전체길이를 초과하면
		if(li_byte > li_max){
			ls_str2 = ls_str.substr(0, li_len);
			aro_name.value = ls_str2;
			alert("한글 "+Math.floor(li_max/3)+"자, 영문  "+li_max+"자를 초과 입력할수 없습니다.");
		}
	};

	String.prototype.getByte = function(b, i, c) {
		var s = this;
		for(b = i = c = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
		return b;
	};
	
	String.prototype.format = function() {
		a = this;
		for (k in arguments) {
			a = a.replace("{" + k + "}", arguments[k])
		}
		return a;
	}

	/**
	 * byte수 조회
	 * obj : 대상 문자열 또는 필드
	 */
	getByteLength = function(obj){
		var s;
		if (typeof(obj) == "string") {	//문자열
			s = obj;
		} else if(typeof obj === "object") {
			s = obj.value;
		} else {
			s = "";
		}
		return s.getByte();
	};

	/**
	 * 허용 Byte를 초과한 index
	 * obj : 대상 문자열 또는 필드
	 * maxlen : 허용할 Byte
	 */
	getByteCheckIndex = function(obj, maxlen){
		var s;
		var index = 0;
		if (typeof(obj) == "string") {	//문자열
			s = obj;
		} else {
			if (obj.value !=null){
				s = obj.value;
			}
		}
		var len = 0;
		if ( s == null ) {
			return 0;
		}
		for(var i = 0 ; i < s.length ; i ++) {
			var c = escape(s.charAt(i));
			if ( c.length == 1 ) {
				len ++;
			} else if ( c.indexOf("%u") != -1 ) {
				len += 2;
			} else if ( c.indexOf("%") != -1 ) {
				len += c.length/3;
			}
			if( len > maxlen){
				index = i;
				break;
			}
		}
		return index;
	};

	/**
	 * 10보다 작으면 앞에 0을 붙임
	 */
	addzero = function(n) {
		return n < 10 ? "0" + n : n;
	};

	//7.validate
	/**
	 * <pre>
	 * NumberCheck
	 * 숫자인지 여부체크.
	 * </pre>
	 * @param field form.element
	 * @param error_msg 에러 message
	 * @return boolean
	 */
	isNumberVal = function(val){

		if(checkDigitOnly(val, false) ) {
			return true;
		} else {
			return false;
		}
	};

	trim = function(str) {
		return String(str).trim();
	};

	/**
	 * <pre>
	 * 숫자인지 아닌지  검사한다.
	 * 검사할 값이 "" 일 경우 true를 리턴하고 싶으면, space인수에 true를 넣으면 된다.
	 * </pre>
	 * @param digitChar 검사할 string
	 * @param space ""일 때 허용여부(true||false)
	 * @return boolean
	 */
	checkDigitOnly = function(digitChar, space) {
		if(!space){
			if ( digitChar == null || digitChar=='' ){
	    		return false ;
	    	}
		}

		for(var i=0;i<digitChar.length;i++){
	    	var c=digitChar.charCodeAt(i);
	       	if( !(  0x30 <= c && c <= 0x39 ) ) {
	       		return false ;
	       	}
	     }
	    return true ;
	};

	/**
	 * <pre>
	 * NumberCheck
	 * 빈공간을 허용한다.
	 * </pre>
	 * @param field form.element
	 * @param error_msg 에러 message
	 * @return boolean
	 */
	isNumber = function(field, error_msg){
		var val = field.value;

		if(checkDigitOnly(val, false) ) {
			return true;
		} else {
			if(error_msg) {
				alert(error_msg);
				field.focus();
				field.select();
			}
			return false;
		}
	};

	/**
	 * <pre>
	 * 실수 검사(음수 포함)
	 * </pre>
	 * @param field form.element
	 * @param error_msg 에러 message
	 * @return boolean
	 */
	isFloat = function (field, error_msg) {

		var val = field.value;
	    var re = /^[-]?\d*\.?\d*$/;

	    val = val.toString();

	    if (!val.match(re)) {
	    	if(error_msg.length > 0) {
	    		alert(error_msg);
	    		field.focus();
	    		field.select();
	    	}
	        return false;
	    }
	    return true;
	};

	/**
	 * <pre>
	 * 실수 검사
	 * </pre>
	 * @param field form.element
	 * @param error_msg 에러 message
	 * @return boolean
	 */
	isUnsignFloat = function (field, error_msg) {

		var val = field.value;
	    var re = /^\d*\.?\d*$/;

	    val = val.toString();

	    if (!val.match(re)) {
	    	if(error_msg.length > 0) {
	    		alert(error_msg);
	    		field.focus();
	    		field.select();
	    	}
	        return false;
	    }
	    return true;
	};

	/**
	 * <pre>
	 * 날짜 검사 (yyyy-mm-dd)검사
	 * </pre>
	 * @param field form.element
	 * @param error_msg 에러 message
	 * @return boolean
	 */
	isDate = function (field) {

		var val = field.value;
		var matches;

		/**
		 * 9999-12-31 날짜형식이 맞지 않다는 오류가 발생하여 처리
		 */
		if(matches = val.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
			if(!checkDate(matches[1], matches[2], matches[3])) {
				field.focus();
				return false;
			}
			return true;
		}
		else {
			alert("날짜 형식이 올바르지 않습니다.\n\n2010-01-01형식으로 입력해 주십시요.");
			field.focus();
			return false;
		}

	};

	/**
	 * 날짜 형식 검사
	 */
	checkDate = function(yyyy, mm, dd) {
		if (typeof(yyyy) == "undefined" || yyyy == null || yyyy == "" || yyyy.length != 4) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		}
		if (typeof(mm) == "undefined" || mm == null || mm == "" || mm.length > 2) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		}
		if (typeof(dd) == "undefined" || dd == null || dd == "" || dd.length > 2) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		}
		mm =  mm.length == 1 ? "0" + mm : mm;
		dd =  dd.length == 1 ? "0" + dd : dd;

		var date = new Date(yyyy +"/"+ mm +"/"+ dd);

		if (yyyy - date.getFullYear() != 0) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		}

		if (mm - date.getMonth() - 1 != 0) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		}

		if (dd - date.getDate() != 0) {
			alert("날짜 형식이 올바르지 않습니다.");
			return false;
		}
		return true;
	};

	Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    // yyyymmdd 형식의 문자열 리턴
    Date.prototype.yyyymmdd = function() {
      var mm = this.getMonth() + 1; // getMonth() is zero-based
      var dd = this.getDate();

      return [this.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
             ].join('');
    };

	Date.prototype.dateToFormat = function(datePieces, timePieces) {
		var year = this.getFullYear(),
			month = (this.getMonth() + 1).toString().addZero(),
			day = this.getDate().toString().addZero(),
			hours = this.getHours().toString().addZero(),
			minutes = this.getMinutes().toString().addZero(),
			seconds = this.getSeconds().toString().addZero();

		datePieces = datePieces || "-";
		timePieces = timePieces || ":";
		return year + datePieces + month + datePieces + day + " " + hours + timePieces + minutes + timePieces + seconds;
	};

	/**
	 * 데이트 포맷 검사
	 */
	dateFormatCheck = function(str){
        //regExp = /^(19-29)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
		regExp = /^(19|20|21|22|23|24|25|26|27|28|29)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
        if(!regExp.test(str)){
            return false;
        }else{
            return true
        }
    };

	dateGFormatCheck = function(str){
        regExp = /^(1|2)\d{3}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
        if(!regExp.test(str)){
            return false;
        }else{
            return true
        }
    };

	inputDateFormatCheck = function(str,event){
		var element = str;
		var length = element.val().length;
		element.css({imeMode:"inactive"});
		//alert(event.which);
		if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8)) {
		    //alert('숫자임!');
		    //alert(element.val());
		    if(event.which != 8){
		    	if(length==4) element.val(element.val() + "-");
		    	if(length==7) element.val(element.val() + "-");
		    }
		    if(length==10){
		    	if(!dateFormatCheck(element.val())){
		    		alert("날짜를 제대로 입력해주세요");

		    	}

			}
		} else {
		    //alert('숫자아님!');
		    event.preventDefault();
		}
	};



	/**
	 * 특수문자 검사
	 */
	hasSpecialChar = function(value) {
		for (i = 0; i < value.length; i++)
	    {
	        var ch = value.charCodeAt(i);

	        if((ch >= 0  && ch <= 47) || (ch >= 58 && ch <= 64) ||
	           (ch >= 91 && ch <= 94) || (ch == 96) ||
	           (ch >= 123 && ch <= 255))
	            return true;
	    }
	    return false;
	};

	/**
	 * <pre>
	 * 문자열 Valid 검사처리
	 * </pre>
	 * @param value
	 * @param space
	 * @return boolean
	 */
	checkValid = function(value, space) {
		var retvalue = false;

		//value이 0("" 이나 null)이면 무조건 false
		for (var i = 0 ; i < value.length ; i++) {
			if (space == true) {
				//value이 0이 아닐때 space가 있어야만 true(valid)
				if (value.charAt(i) == ' ') {
					retvalue = true;
					break;
				}
			} else {
				//value이 0이 아닐때 space가 아닌 글자가 있어야만 true(valid)
				if (value.charAt(i) != ' ') {
					retvalue = true;
					break;
				}
			}
		}

		return retvalue;
	};

	/**
	 * <pre>
	 * field Empty 및 공백 처리
	 * error_msg가 ""이면 alert와 focusing을 하지 않는다
	 * </pre>
	 * @param field form.element
	 * @param error_msg 에러 Message
	 * @return boolean
	 */
	isEmpty = function(field, error_msg) {
		// error_msg가 ""이거나 값을 넘기지 않으면 alert와 focusing을 하지 않는다
		if(error_msg == null || error_msg == "") {
			if(!checkValid(field.value, false)) {
				return true;
			} else {
				return false;
			}
		} else {
			if(!checkValid(field.value, false)) {
				alert(error_msg);
				field.focus() ;
				return true;
			} else {
				return false;
			}
		}
	};

	isEmptyValue = function(value){
		if(value === undefined || value === null || value.trim() === ""){
			return true;
		}
		return false;
	}

	/**
	 * <pre>
	 * 정확한 길이가  아닌지 검사
	 * 정확한 길이면 false, 정확한 길이가 아닌면 true
	 * </pre>
	 * @param field 길이를 검사할 element form.element
	 * @param len 비교할 길이
	 * @param error_msg 에러 Message
	 * @return boolean
	 */
	isNotExactLength = function(field, len, error_msg) {

		if(field.value.length != len) {
			alert(error_msg);
			field.focus();
			field.select();
			return true;
		}
		return false;
	};

	/**
	 * 주민등록번호 Check
	 * @param pid1 주민번호 앞자리 - form.element
	 * @param pid2 주민번호 뒤자리 - form.element
	 * @return boolean
	 */
	isNotValidPID = function(pid1, pid2) {

		if(isEmpty(pid1,"주민등록번호를 입력해 주세요!")) {
			return true;
		}
		if(isEmpty(pid2,"주민등록번호를 입력해 주세요!")) {
			return true;
		}
		if(!isNumber(pid1,"주민등록번호 앞자리는 숫자로만 기입해 주세요!")) {
			return true;
		}
		if(!isNumber(pid2,"주민등록번호 뒷자리는 숫자로만 기입해 주세요!")) {
			return true;
		}
		if(isNotExactLength(pid1, 6, "주민등록번호 앞자리는 6자리입니다!")) {
			return true;
		}
		if(isNotExactLength(pid2, 7, "주민등록번호 뒷자리는 7자리입니다!")) {
			return true;
		}
		strchr = pid1.value.concat(pid2.value);
		if (strchr.length == 13	) {
			nlength = strchr.length;
			num1 = strchr.charAt(0);
			num2 = strchr.charAt(1);
			num3 = strchr.charAt(2);
			num4 = strchr.charAt(3);
			num5= strchr.charAt(4);
			num6 = strchr.charAt(5);
			num7 = strchr.charAt(6);
			num8 = strchr.charAt(7);
			num9 = strchr.charAt(8);
			num10 = strchr.charAt(9);
			num11 = strchr.charAt(10);
			num12 = strchr.charAt(11);

			var total = (num1*2)+(num2*3)+(num3*4)+(num4*5)+(num5*6)+(num6*7)+(num7*8)+(num8*9)+(num9*2)+(num10*3)+(num11*4)+(num12*5);
			total = (11-(total%11)) % 10;

			if(total != strchr.charAt(12)) {
				alert("주민등록번호가 올바르지 않습니다. \n다시 입력해 주세요!");
				pid1.value="";
				pid2.value="";
				pid1.focus();
				return true;
			}
			return false;
		} else {
			alert("주민등록번호가 올바르지 않습니다. \n다시 입력해 주세요!");
			pid1.value = "";
			pid2.value = "";
			pid1.focus();
			return true;
		}
	};

	/**
	 * 주민등록번호 Check
	 * @param pid1 주민번호
	 * @return boolean
	 */
	isNotValidPIDVal = function(pid, isNeedMsg) {

		if(!checkDigitOnly(pid, false)) {
			if(isNeedMsg) {
				alert('주민등록번호는 숫자로만 기입해 주십시요.');
			}
			return true;
		}
		if(pid.length != 13) {
			if(isNeedMsg) {
				alert('주민등록번호는 13자리 숫자로 입력해 주십시요.');
			}
			return true;
		}

		nlength = pid.length;
		num1 = pid.charAt(0);
		num2 = pid.charAt(1);
		num3 = pid.charAt(2);
		num4 = pid.charAt(3);
		num5 = pid.charAt(4);
		num6 = pid.charAt(5);
		num7 = pid.charAt(6);
		num8 = pid.charAt(7);
		num9 = pid.charAt(8);
		num10 = pid.charAt(9);
		num11 = pid.charAt(10);
		num12 = pid.charAt(11);

		var total = (num1 * 2) + (num2 * 3) + (num3 * 4) + (num4 * 5)  + (num5 * 6) + (num6 * 7) +
					(num7 * 8) + (num8 * 9) + (num9 * 2) + (num10 * 3) + (num11*4)  + (num12 * 5);
		total = (11 - (total % 11)) % 10;

		if(total != pid.charAt(12)) {
			if(isNeedMsg) {
				alert("주민등록번호가 올바르지 않습니다. \n다시 입력해 주세요!");
			}
			return true;
		}
		return false;
	};

	/**
	 * 사업자등록번호 Check
	 * @param bid1 사업자등록번호 앞자리 - form.element
	 * @param bid2 사업자등록번호 중간 자리 - form.element
	 * @param bid3 사업자등록번호 중간 자리 - form.element
	 * @return boolean
	 */
	isNotValidBID= function(bid1, bid2, bid3) {
		if(isEmpty(bid1,"사업자등록번호를 입력해주십시오.")) {
			return true;
		}
		if(isEmpty(bid2,"사업자등록번호를 입력해주십시오.")) {
			return true;
		}
		if(isEmpty(bid3,"사업자등록번호를 입력해주십시오.")) {
			return true;
		}
		if(!isNumber(bid1,"사업자등록번호 앞자리는 숫자로만 기입해 주세요!")) {
			return true;
		}
		if(!isNumber(bid2,"사업자등록번호 가운데자리는 숫자로만 기입해 주세요!")) {
			return true;
		}
		if(!isNumber(bid3,"사업자등록번호 뒷자리는 숫자로만 기입해 주세요!")) {
			return true;
		}
		if(isNotExactLength(bid1, 3, "사업자등록번호 앞자리는 3자리입니다!")) {
			return true;
		}
		if(isNotExactLength(bid2, 2, "사업자등록번호 뒷자리는 2자리입니다!")) {
			return true;
		}
		if(isNotExactLength(bid3, 5, "사업자등록번호 뒷자리는 5자리입니다!")) {
			return true;
		}
		strchr = bid1.value.concat(bid2.value.concat(bid3.value));

		num1 = strchr.charAt(0);
		num2 = strchr.charAt(1);
		num3 = strchr.charAt(2);
		num4 = strchr.charAt(3);
		num5= strchr.charAt(4);
		num6 = strchr.charAt(5);
		num7 = strchr.charAt(6);
		num8 = strchr.charAt(7);
		num9 = strchr.charAt(8);
		num10 = strchr.charAt(9);

		var total = (num1*1)+(num2*3)+(num3*7)+(num4*1)+(num5*3)+(num6*7)+(num7*1)+(num8*3)+(num9*5);
		total = total + parseInt((num9 * 5) / 10);
		var tmp = total % 10;
		if(tmp == 0) {
			var num_chk = 0;
		} else {
			var num_chk = 10 - tmp;
		}

		if(num_chk != num10) {
			alert("사업자등록번호가 올바르지 않습니다. \n다시 입력해 주세요!");
			bid1.value="";
			bid2.value="";
			bid3.value="";
			bid1.focus();
			return true;
		}
		return false;
	};

	/**
	 * 사업자등록번호 값 검사
	 * @param  bid       사업자 등록번호
	 * @param  isNeedMsg 메세지 노출여부
	 * @return boolean
	 */
	isNotValidBIDVal = function(bid, isNeedMsg) {
		// 입력값 검사
		if(!checkValid(bid, false)) {
			if(isNeedMsg) {
				alert('사업자 등록번호를 입력해 주십시요.');
			}
			return true;
		}

		if(bid.length != 10) {
			if(isNeedMsg) {
				alert('사업자 등록번호는 하이픈을 제외하고 10자를 입력하셔야 합니다.');
			}
			return true;
		}
		num1  = bid.charAt(0);
		num2  = bid.charAt(1);
		num3  = bid.charAt(2);
		num4  = bid.charAt(3);
		num5  = bid.charAt(4);
		num6  = bid.charAt(5);
		num7  = bid.charAt(6);
		num8  = bid.charAt(7);
		num9  = bid.charAt(8);
		num10 = bid.charAt(9);

		var total = (num1 * 1) + (num2 * 3) + (num3 * 7) + (num4 * 1) + (num5 * 3) +
					(num6 * 7) + (num7 * 1) + (num8 * 3) + (num9 * 5);
		total = total + parseInt((num9 * 5) / 10);
		var tmp = total % 10;
		if(tmp == 0) {
			var num_chk = 0;
		} else {
			var num_chk = 10 - tmp;
		}

		if(num_chk != num10) {
			if(isNeedMsg) {
				alert('사업자등록번호가 정확하지 않습니다.');
			}
			return true;
		}
		return false;
	};

	/**
	 *  E-Mail Check
	 * @param field form.element
	 * @return boolean
	 */
	isNotValidEmail = function(field, message) {
		var checkflag = true;
		var retvalue;

		if(field.value == "") {
			retvalue = false;
		} else {
			if (window.RegExp) {
				var tempstring = "a";
				var exam = new RegExp(tempstring);
				if (tempstring.match(exam)) {
					var ret1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
					var ret2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
					retvalue = (!ret1.test(field.value) && ret2.test(field.value));
				} else {
					checkflag = false;
				}
			} else {
				checkflag = false;
			}
			if (!checkflag) {
				retvalue = ( (field.value != "") && (field.value.indexOf("@")) > 0 && (field.value.index.Of(".") > 0) );
			}
		}
		if(retvalue) {
			return false;
		} else {
			if (message) {
				alert(message);
			} else {
				alert("이메일주소를 입력해주십시오.");
			}
			try {
				field.focus();
				field.select();
			} catch(e) {}
			return true;
		}
	};

	/**
	 * TelNumber Check
	 * @param field form.element
	 * @return boolean
	 */
	isNotValidTel = function(field, message) {
		var count;
		var permitChar = "0123456789-";
		for (var i = 0; i < field.value.length; i++) {
			count = 0;
			for (var j = 0; j < permitChar.length; j++) {
				if(field.value.charAt(i) == permitChar.charAt(j)) {
					count++;
					break;
				}
			}
			if (count == 0) {
				if(message != null) {
					alert(message);
				}
				else {
					alert("전화번호가 정확하지 않습니다. \n다시 입력해 주세요!");
				}
				field.focus();
				field.select();
				return true;
				break;
			}
		}
		return false;
	};

	/**
	 * 전화번호 검사(국번:selectbox, 번호1:text, 번호2:text 일 경우 사)
	 */
	checkTelno = function(tel1, tel2, tel3) {
		if ( tel1.value == "" ) {
			alert("국번을 선택하세요!");
			tel1.focus();
			return true;
		}
		if ( tel2.value.trim() == "" || tel2.value.trim().length < 3 ) {
			alert("전화번호를 3자리이상 숫자로 입력하세요");
			tel2.focus();
			return true;
		}
		if (isNaN(tel2.value)) {
			alert("전화번호를 3자리이상 숫자로 입력하세요");
			tel2.focus();
			return true;
		}
		tel2.value = tel2.value.trim();
		if ( tel3.value.trim() == "" || tel3.value.trim().length < 4 ) {
			alert("전화번호를 4자리이상 숫자로 입력하세요");
			tel3.focus();
			return true;
		}
		if (isNaN(tel3.value)) {
			alert("전화번호를 4자리이상 숫자로 입력하세요");
			tel3.focus();
			return true;
		}
	};

	/**
	 * 패스워드 유효성 검사
	 * 1.6자 이상 ~ 15자 이하
	 * 2.영대문자, 영소문자, 숫자, 특수기호중 2가지 이상이ㅡ 조합
	 * 3.동일문자 3회이상 반복 불가
	 * 4.키보드상 연속문자열 4자 이상 사용불가
	 * 5.사용자ID와 연속 3문자 이상 중복 불가
	 * 6.연속된 숫자/문자 3자 이상 사용불가
	 *
	 * 패스워드가 부적합하면 true 리턴
	 */
	checkPassword = function(passwd, usr_id) {

		//숫자/문자의 순서대로 3자 이상 사용금지
		var strights = ['012345678901', '987654321098', 'abcdefghijklmnopqrstuvwxyzab', 'zyxwvutsrqponmlkjihgfedcbazy'];

		//연속된 키보드 조합
		var keypads = [
			       		'`1234567890-=', 	'=-0987654321`', 	'~!@#$%^&*()_+', 	'+_)(*&^%$#@!~',
			       		'qwertyuiop[]\\', 	'\\][poiuytrewq', 	'QWERTYUIOP{}|',	'|}{POIUYTREWQ',
			       		'asdfghjkl;\'', 	'\';lkjhgfdsa', 	'ASDFGHJKL:"', 		'":LKJHGFDSA',
			       		'zxcvbnm,./', 		'/.,mnbvcxz', 		'ZXCVBNM<>?', 		'?><MNBVCXZ'
			       		];

		var getPattern = function(str, casesensitive) {

			//정규식 생성전에 예약어를 escape 시킨다.
			var reserves = ['\\', '^', '$', '.', '[', ']', '{', '}', '*', '+', '?', '(', ')', '|'];

			$.each(reserves, function(index, reserve){
				var pattern = new RegExp('\\' + reserve, 'g');
				if (pattern.test(str)) {
					str = str.replace(pattern, '\\' + reserve);
				}
			});
			var pattern = null;
			if (casesensitive == false) {
				pattern = new RegExp(str, 'i');
			}
			else {
				pattern = new RegExp(str);
			}
			return pattern;
		}

		if (passwd.match(/^.{6,15}$/g) == null) {
			alert('비밀번호는 6자리 이상 15자리 미만으로 입력하세요.');
			return true;
		}

		var valid_count = 0;
		if (passwd.match(/[a-z]/) != null) {
			valid_count++;
		}
		if (passwd.match(/[A-Z]/) != null) {
			valid_count++;
		}
		if (passwd.match(/[0-9]/) != null) {
			valid_count++;
		}
		if (passwd.match(/\W/) != null) {
			valid_count++;
		}
		if(valid_count < 2) {
			alert('비밀번호는 영문대문자/영문소문자/숫자/특수기호중 2가지 이상을 혼합하여 입력하세요.');
			return true;
		}

		for (var i = 0 ; i < passwd.length ; i++) {
			if (passwd.charAt(i+1) != '' && passwd.charAt(i+2) != '') {
				if (passwd.charCodeAt(i) == passwd.charCodeAt(i+1) && passwd.charCodeAt(i+1) == passwd.charCodeAt(i+2)) {	//동일문자 3회 반복
					alert('동일문자를 연속3회이상 반복 하실 수 없습니다.');
					return true;
				}

				var str = passwd.charAt(i)+''+passwd.charAt(i+1)+''+passwd.charAt(i+2);
				var pattern = getPattern(str, false);
				for (var j = 0 ; j < strights.length ; j++) {
					if (pattern.exec(strights[j]) != null) {
						alert('연속된 알파벳/숫자 조합을 사용할 수 없습니다.');
						return true;
					}
				}

				//아이디와 3자 이상 중복 불가
				if (pattern.exec(usr_id) != null) {
					alert('아이디와 3자 이상 중복될 수 없습니다.');
					return true;
				}
			}
		}

		for (var i = 0 ; i < passwd.length ; i++) {
			if (passwd.charAt(i+1) != '' && passwd.charAt(i+2) != '' && passwd.charAt(i+3) != '') {

				var str = passwd.charAt(i)+''+passwd.charAt(i+1)+''+passwd.charAt(i+2) +''+ passwd.charAt(i+3);
				var pattern = getPattern(str);
				for (var j = 0 ; j < keypads.length ; j++) {
					if (pattern.exec(keypads[j]) != null) {
						alert('연속된 키보드 조합을 사용할 수 없습니다.');
						return true;
					}
				}
			}
		}
		return false;
	};


	/**
	 * 3자리 콤마 구분 (화폐표현)
	 *
	 * 예)
	 * var hehehe = s.Util.getNumberFormat(1800000);
	 * hehehe -> 1,800,000
	 */
	getNumberFormat = function(str) {
		if(typeof str != "string") str = str.toString();
		return str.toComma();
	};

	/**
	 * 숫자만(int)		마이너스 허용
	 *
	 * 예)
	 * var hehehe = s.Util.getNumberFormat("한글-1800000ABC");
	 * hehehe -> -1800000
	 */
	getToInt = function(str) {
		if(typeof str != "string") str = str.toString();
		return str.toInt();
	};

	/**
	 * 숫자만(num)
	 *
	 * 예)
	 * var hehehe = getToNum("한글-1800000ABC");
	 * hehehe -> 1800000
	 */
	getToNum = function(str) {
		if(typeof str != "string") str = str.toString();
		return str.toNum();
	};

	/**
	 * 소숫점 포함 숫자만(num)
	 *
	 * 예)
	 * var hehehe = getToFloat("한글-18000.10ABC");
	 * hehehe -> 18000.10
	 */
	getToFloat = function(str) {
		if(typeof str != "string") str = str.toString();
		return str.toFloat();
	};

	/**
	 * 3자리 콤마 구분 입력 (화폐표현)
	 *
	 * 예)
	 * $("#container").on("keyup blur", "#textbox_id1, #textbox_id2", function() {
     * 		s.Util.setComma(this);
     * });
	 */
	setComma = function(obj) {
		var str = obj.value;
		if (str == "0") {
			return;
		}
		str = getNumberFormat(str);
		if (str == "0") str = "";
		obj.value = str;
	};

	/**
	 * 숫자만 입력(int)		마이너스 허용
	 *
	 * blur 만 사용 가능합니다.
	 *
	 * 예)
	 * $("#container").on("blur", "#textbox_id1, #textbox_id2", function() {
     * 		s.Util.setInteger(this);
     * });
     *
	 */
	setInteger = function(obj) {
		var str = obj.value;
		if (str == "0") {
			return;
		}
		str = getToInt(str);
		if (str == "0") str = "";
		obj.value = str;
	};

	/**
	 * 숫자만 입력(num)
	 *
	 * 예)
	 * $("#container").on("keyup blur", "#textbox_id1, #textbox_id2", function() {
     * 		s.Util.setDigit(this);
     * });
	 */
	setDigit = function(obj) {
		var str = obj.value;
		str = getToNum(str);
		obj.value = str;
	};

	/**
	 * 숫자만 입력(num)
	 *
	 * 예)
	 * $("#container").on("keyup blur", "#textbox_id1, #textbox_id2", function() {
     * 		setFloat(this);
     * });
	 */
	setFloat = function(obj) {
		var str = obj.value;
		str = getToFloat(str);
		obj.value = str;
	};

	/**
	 * 숫자만 입력(num)
	 *
	 * 예)
	 * $("#container").on("keydown", "#textbox_id1, #textbox_id2", function(e) {
     * 		setFloatKey(e);
     * });
	 */
	setFloatKey = function(e) {
		e = (e ? e : event);
		var keyCd = e.keyCode;
	    if (keyCd != 8 && keyCd != 9 && keyCd != 46
	    		&& keyCd != 110 && keyCd != 190	// .
	    		&& (keyCd < 48 || keyCd > 57)
	    		&& (keyCd < 96 || keyCd > 105)
	    ){
	        e.returnValue=false;
	        return false;
	    }
	};

	showMessage = function(msg) {
		commerce.admin.message.showMessage({'msgC':'', 'msgKrnCn':msg});
	};
})(window);

/**
 * object 들의  value 를 초기값 또는 "" 로 reset 한다.
 * clearObjects('input1', 'checkbox1', 'emedit1')
 * @param arguments ids
 */
function clearObjects(){
	var args = arguments;
	for(var i = 0; i < args.length; i++){
		clearObjectValue(args[i]);
	}
}

/**
 * object value 를 초기값 또는 "" 로 reset 한다.
 * clearObjectValue('input1')
 * @param obj id
 */
function clearObjectValue(obj){
	if( typeof(obj) == "string"){
		obj = document.getElementById(obj);
	}

    if(obj != null && typeof(obj) == "object"){

	    var tname = obj.tagName;

	    if(typeof(tname) == "undefined") {
	        if(typeof(obj) == "object"){
	            if(typeof(obj.length) != "undefined"){
	                var ntype = typeof(obj[0]) != "undefined" ? obj[0].type : "" ;
	                if(ntype == "checkbox" || ntype == "radio"){
	                    for(var j = 0; j < obj.length; j++){
	                    	obj[j].checked = false;
	                    }
	                }
	            }
	        }

	    }
	    else if(tname == "INPUT"){
	        var ntype = obj.type;
	        if(ntype == "checkbox" || ntype == "radio"){
	            obj.checked = false;
	        }else {
	            obj.value = "";
	        }

	    }
	    else if(tname == "TEXTAREA"){
            obj.value = "";
	    }
	    else if(tname == "SELECT"){
	        obj.selectedIndex = 0;
	    }
	    else if(tname == "OBJECT"){

	    }
	}
}

/**
 * 셀렉트 박스 값 셋팅
 */
function setCode(divId,objList){

    for(var i=$(divId).get(0).length-1; i>=1;i--){
        $(divId).get(0).options[i] = null;
    }
    for(i=0 ;objList.length > i;i++ ){
        var list = objList[i];
        $(divId).get(0).options[i+1] = new Option(list.CD_NM,list.CD);
    }
}

/**
 * html의 특수문자를 표현하기 위해
 *
 * @param srcString
 * @return String
 * @exception Exception
 * @see
 */
function getHtmlStrCnvr(srcString) {

	var tmpString = srcString;
	tmpString = tmpString.split("&lt;").join("<");
	tmpString = tmpString.split("&gt;").join(">");
	tmpString = tmpString.split("&amp;").join("&");
	//tmpString = tmpString.split("&nbsp;").join(" ");
	tmpString = tmpString.split("&apos;").join("\'");
	tmpString = tmpString.split("&quot;").join("\"");
	return  tmpString;
}

function decodeXss(str){
	if(str != null && typeof str === 'string'){
		var tmp = str;
		tmp = tmp.replace(/&#x27;/gi, "'");
		tmp = tmp.replace(/&amp;/gi, "&");
		tmp = tmp.replace(/&quot;/gi, "\"");
		tmp = tmp.replace(/&lt;/gi, "<");
		tmp = tmp.replace(/&gt;/gi, ">");
		tmp = tmp.replace(/&#x2F;/gi, "/");
		return tmp;
	}
}

$(document).ready(function(){
	window.setTimeout(function() {
		$("input[type='text'],input[type='hidden']").each(function() {
			var val = this.value;
			if (typeof val == "string" && val != "") {
				this.value = decodeXss(val);
			}
		});
	}, 500);
});

/**
 * textarea Enter를 BR 태그로 변환
 * @param srcString
 * @return String
 * @exception Exception
 * @see
 */
function getEnterToBr(srcString) {

	srcString=srcString.split("\r\n").join("<br/>");
	srcString=srcString.split("\n").join("<br/>");
	srcString=srcString.split("\n\n").join("<br/>");
	return  srcString;
}

function getEnterToBr2(srcString) {

	srcString=srcString.split("\r\n").join("<br/>");
	srcString=srcString.split("\n").join("<br/>");
	return  srcString;
}

/**
 * textarea  BR 태그를 Enter로 변환
 *
 * @param srcString
 * @return String
 * @exception Exception
 * @see
 */
function getBrToEnter(srcString) {

	srcString=srcString.split("<br/>").join("\r\n");
	return  srcString;
}

/**
 * textarea Quot를 Prime으로 변환
 * @param srcString
 * @return String
 * @exception Exception
 * @see
 */
function getQuotToPrime(srcString) {

	srcString=srcString.split("\"").join("'");
	return  srcString;
}

function getStrSub(str, size) {
    if (str == null || str == "") {
        return "";
    }

    var len = str.length;
    if (len >= size) {
        str = str.substring(0, size) + "...";
    }
    return str;
}

// 20120101 을 2012-01-01로 변경
function getCalendarDateFormat(val){
	var year = val.substring(0,4);
	var month = val.substring(4,6);
	var day = val.substring(6,8);

	return year + "-" + month + "-" + day;

}

//달력 기간 설정
//@sDate : 시작일자의 input id, @eDate : 종료일자의 input id, @p : 기간
function setTerm(sDate, eDate, p){
	var addDay = (p.indexOf('today') == 0) ? 0 : 1;
	$("#" + sDate).val(Date.create().addDays(addDay).rewind(p).format("{yyyy}-{MM}-{dd}"));
	$("#" + eDate).val(Date.create().format("{yyyy}-{MM}-{dd}"));
}

//파일폼 용량 반환
$.fn.getFileSize = function() {
	var file = $(this)[0];
	if(file && file.files && file.files.length && file.files[0].size) {
		return file.files[0].size;
	} else {
		return 0;
	}
};

//파일 포맷 체크
function getFileFormatCheck(objId, allowExtension){
	var f = $("#" + objId).val().toLowerCase();
	f = f.slice(f.lastIndexOf(".") + 1);
	if(allowExtension.indexOf(f) == -1){
		alert(allowExtension + " 등의 파일만 업로드 가능합니다.");
		return false;
	}
	return true;
}

//테이블 드래그 소팅 이벤트 추가
function dragSortEventInit(tableId) {
  $("#" + tableId).children("tbody").sortable(
  {
      placeholder: "",
      cursor: "move",
      start: function (event, ui) {
          var $thArry = $("#" + tableId).find("th");
          $thArry.each(function (i, th) {
              $(ui.item.context).children("td:eq(" + i + ")");
          });
      },
      update: function (event, ui) { setNumber(tableId); },
      stop: function (event, ui) { }
  });
}

//체크된 tr들 순서 변경
function trSortChange(direction, tableId){
	if($("#" + tableId).find("tr:has(:checkbox:checked)").length == 0){
		alert("이동할 항목을 선택해 주세요."); return;
	}

	jQuery.fn.reverse = [].reverse;
	if (direction == "up") {					//위로
		$("#" + tableId).find("tr:has(:checkbox:checked)").each(function(){
			 $(this).after($(this).prev());
		});
	} else if (direction == "down") {			//아래로
		$("#" + tableId).find("tr:has(:checkbox:checked)").reverse().each(function(){
			$(this).before($(this).next());
		});
	} else if (direction == "top") {			//젤위로
		$("#" + tableId).find("tr:has(:checkbox:checked)").reverse().each(function(){
			$("#" + tableId).prepend($(this));
		});
	} else if (direction == "bottom") {			//젤아래로
		$("#" + tableId).find("tr:has(:checkbox:checked)").each(function(){
			$("#" + tableId).append($(this));
		});
	}
}


/**
 * 숫자만 입력 가능
 * @param {*} text : 문자
 */
function onlyInputNumber(text) {
	var returnText = ''
	returnText = text.replace(/[^0-9]/g, '')
	return returnText
}


/**
 * 달력 특정 문자를 공백으로 replace
 * @param inputString
 */
function replaceCalendarString(inputString){
	return inputString.replace(/-/gi,'');
}

/**
 * 달력 특정 문자를 공백으로 replace (8글자 제한)
 * 형식 : 2021-04-21 -> 20210421
 * @param inputString
 */
function replaceCalendarStringWithLength(inputString){
	return inputString.replace(/-/gi,'').substring(0,8);
}

/**
 * 오늘 날짜 계산
 * 형식 : 2021-04-26
 * @returns {string}
 */
function getTodayDate() {
	var today = new Date();
	var year = today.getFullYear();
	var month = (today.getMonth()+1).toString().padStart(2,'0');
	var date = today.getDate().toString().padStart(2,'0');

	return year + '-' + month + '-' + date;
}

/**
 * 오늘 날짜 & 시간 계산
 * 형식 : 2021-05-31 00:00:00
 * @returns {string}
 */
function getTodayDtm() {
	var today = new Date();
	var year = today.getFullYear();
	var month = (today.getMonth()+1).toString().padStart(2,'0');
	var date = today.getDate().toString().padStart(2,'0');

	var hour = today.getHours().toString().padStart(2,'0');
	var min = today.getMinutes().toString().padStart(2,'0');
	var seconds = today.getSeconds().toString().padStart(2,'0');

	return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + seconds;
}

/**
 * 최근날짜 from - to Date 값 가져오기
 */
function recentlyCalenderData(term){
	var fromDate = new Date();
	var returnFromDate = new Date(fromDate.setDate(fromDate.getDate()-term));
	var returnToDate = new Date();
	var returnData = [];

	returnFromDate = calendarFormatting(returnFromDate);
	returnToDate = calendarFormatting(returnToDate);

	returnData.push(returnFromDate);
	returnData.push(returnToDate);

	return returnData;
}

function calendarFormatting(dateParam , separator){
	var year = dateParam.getFullYear();
	var month = dateParam.getMonth() + 1;
	var day = dateParam.getDate();

	if(month.toString().length===1){
		month = "0" + month;
	}

	if(day.toString().length===1){
		day = "0" + day;
	}
	
	if(separator == undefined) {
		return year + "-" + month + "-" + day;		
	} else {
		return year + separator + month + separator + day;
	}
}

function getTodayHours() {
	var initDate = new Date();
	return initDate.getHours() < 10 ? '0'+initDate.getHours():initDate.getHours();
}

function getTodayMinutes() {
	var initDate = new Date();
	return initDate.getMinutes() < 10 ? '0'+initDate.getMinutes():initDate.getMinutes();
}

function openToast(message) {
	toastr.options = {
	  closeButton: true,
	  progressBar: true,
	  showMethod: "slideDown", 
	  hideMethod: "slideUp",
	  newestOnTop : true,
	  positionClass : 'toast-bottom-right',
	  timeOut: 1000
    };
    toastr.success(null, message);
}

// jQuery show/hide를 state로 처리 할 수 있게 하는 플러그인 함수
// $("#aaaa").show(); => $("#aaaa").display(true);
// $("#aaaa").hide(); => $("#aaaa").display(false);
// var a = 10, b = 9;
// $("#aaaa").display(a > b); // 조건식 결과에 따라 show/hide 가능
(function () {
    var matched, browser;

    // Use of jQuery.browser is frowned upon.
    // More details: http://api.jquery.com/jQuery.browser
    // jQuery.uaMatch maintained for back-compat
    jQuery.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }

    jQuery.browser = browser;
})();
(function($) {
"use strict";
	if(!$) return;

	// input file type 초기화 플러그인 함수
	$.fn.clearFileInput = function() {
		var $fileInput = $(this);

		if ($.browser.msie) {
			// ie 일때 input[type=file] init.
			$fileInput.replaceWith( $fileInput.clone(true) );
		} else {
			// other browser 일때 input[type=file] init.
			$fileInput.val("");
		}
	};

	$.fn.display = function( state ) {
	    var that = this;
	    $.each(that, function() {
	        var $el = $(this);
	        if( state === true ) {
	            $el.show();
	        } else {
	            $el.hide();
	        }
	    });

	    return $(that);
	};

	$.fn.serializeObject = function(){

        var that = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = that.build([], that.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = that.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = that.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);

// resize 1번만 하도록 End
$(window).resize(function() {
    if(this.resizeTo) {
        clearTimeout(this.resizeTo);
    }
    this.resizeTo = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 300);
});
