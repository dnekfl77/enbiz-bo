var grid, gridContainer, dataProvider,sock,ws;
var console = window.console || {
	log : function() {
	},
	info : function() {
	},
	warn : function() {
	},
	error : function() {
	}
};

$.namespace = function() {
	var a = arguments, o = null, i, j, d;
	for (i = 0; i < a.length; i = i + 1) {
		d = a[i].split(".");
		o = window;
		for (j = 0; j < d.length; j = j + 1) {
			o[d[j]] = o[d[j]] || {};
			o = o[d[j]];
		}
	}

	return o;
};

(function(window){
    $(document).ready(function(){
        /**
         * class가 only_number로 지정되어져 있는 컨트롤 들은 숫자만 입력 받도록 한다.
         */
        $(".only_number").keydown(function(event){
            inputNumber(event);
        });
    });
})(jQuery);

$.namespace("realgrid.properties");
realgrid.properties = {
    format : {
        ORD_NO:"SSSSSSSS-SSSSSSS",
        BREG_NO:"SSS-SS-SSSSS",
        SDATE:"SSSS-SS-SS",
        YM:"SSSS-SS",
        SSN:"SSN",
        SSN2:"SSSSSS-SSSSSSS",
        DATE2:"SSSS-SS-SS",
        CARD_NO:"SSSS-SSSS-SSSS-SSSS",
        SEQ_NO:"SSSSSSSS"
    }
};

$.namespace("com.x2commerce.common.Util");
com.x2commerce.common.Util = {
	// Evaluate String Criteria
	evaluate : function(criteria, value) {
		return new Function('value', "return " + criteria)(value);
	},

	// Get Window Namespace Object
	namespaceObj : function(objName) {
		return new Function('objName', "return window." + objName)(objName);
	},

	getGridView : function(gridName) {
		return this.namespaceObj(gridName + ".settings.grid");
	},

	getValues : function(obj) {
		var keysArr = Object.keys(obj);
		var valuesArr = [];

		for (var index in keysArr) {
			valuesArr.push(obj[keysArr[index]]);
		}

		return valuesArr;
	},

	cloneGrid : function(gridId, source, overridedSettings, overridedEventHandler) {
		$.namespace(gridId + ".settings");
		$.namespace(gridId + ".eventhandler");

		window[gridId].settings = $.extend(true, {}, source.settings, overridedSettings);
		window[gridId].eventhandler = $.extend(true, {}, source.eventhandler, overridedEventHandler);

		window[gridId].settings.grid = undefined;
		window[gridId].eventhandler.grid = undefined;
	},

	/**
	 * formId에 해당하는 모든 text박스에 엔터키 입력시 조회가 실행되도록 설정한다.
	 * forId : form태그의 ID값
	 * searchButtonId : 엔터 입력으로 실행될 조회 버튼의 ID를 입력
	 */
	setupEnterSearch : function(formId, searchButtonId) {
	    $("form[name="+formId+"] input[type=text]").keydown(function(event){
            com.x2commerce.common.Util.onEnterSearch(event, searchButtonId);
        });
	},

	/**
	 * 검색영역에서 input type='text'인 항목에서 enter key 입력시 검색버튼의 클릭이벤트를 호출한다.
	 * event : 윈도우 이벤트 객체
	 * searchButtonId : 엔터 입력으로 실행될 조회 버튼의 ID를 입력
	 */
	onEnterSearch : function(event, searchButtonId) {
	    try {
	        var event = event || window.event;
    	    if(event.keyCode !== 13) return false;
	        if(searchButtonId===undefined || searchButtonId === null || searchButtonId === "") {
	            return false;
	        }
	        $("#" + searchButtonId).click();
	    } catch(err){}
	},

	/**
	 * 파일 다운로드
	 */
	downloadfile : function(fullPath, originalFileName) {
		location.href = "/common/downloadFile.do?fullPath="+encodeURIComponent(fullPath)+"&originalFileName="+encodeURIComponent(originalFileName);
	}
};

window.onunload = function() {
    const isNotOpener = typeof opener == "undefined" || opener == null;

    dataProvider.clearRows();

    grid.destroy();
    dataProvider.destroy();

    if (!isNotOpener) {
        gridContainer.destroy();

        if (ws != null) {
            ws.close();
        }
        console.log("Disconnected");
    }

    grid = null;
    dataProvider = null;
    gridContainer = null;
}


$.namespace("com.x2commerce.common.menuUtil");
com.x2commerce.common.menuUtil = {

	menuAction : function() {
		$("#snb .title > a").on('click', function() {
            var midcate = $(this).parent();
            var smallcate = $(this).next('.depth2');
            var mode = 1;

            if (midcate.hasClass('active')) {
                midcate.removeClass('active');
                smallcate.slideUp('fast');
                mode = 0;
            } else {
                midcate.addClass('active');
                smallcate.slideDown('fast');
            }

            // 중단메뉴 ON,OFF 쿠키
            var midCookie = getCookie('midCookie');
            var pgcode = $(this).attr('data');
            if (mode == 0) {
                if (midCookie.search('@' + pgcode + '@') < 0) {
                    if (!midCookie) midCookie = '@';
                    midCookie += pgcode + '@';
                }
            } else {
                midCookie = midCookie.replace(pgcode + '@', '');
            }
            var todayDate = new Date();
            var oneYearLater = new Date(todayDate.setFullYear(todayDate.getFullYear() + 1));
            setCookie('midCookie', midCookie, oneYearLater);
        });
	},

	iframeAction : function() {
	    var snbItem = $('#snb .depth2 li a');
        snbItem.on('click', function() {
            let getLink = $(this).data('link');
            let getId = $(this).data('id');
            let getText = $(this).text();
            let tab = $('#VIEW-TABS .item');
            let iframe = $('#VIEW-PAGE iframe');

            $('#snb .depth2 li').each(function(){
                $(this).removeClass('active');
            });

            if (getLink === undefined) {
                alert('링크 주소가 없습니다. 시스템담당자에게 문의하세요.');
                return false;
            }

            if($('#VIEW-TABS #' + getId).length == 0 ) { //같은게 없다면
                if(tab.length < 10) { //열린탭이 10개 이하
                    $('#snb .depth2 li').removeClass('active');
                    $(this).parent().addClass('active');
                    tab.removeClass('active');
                    iframe.removeClass('active');

                    $('#VIEW-TABS').append("<a href='javascript:void(0)' class='item active' id=\'"+ getId +"\'><span>" + getText + "</span> <span class='tab-close'><i class='icon icon-circle-with-cross'></i></span></a>");
                    $('#VIEW-PAGE').append("<iframe src='"+ getLink +"' width='100%' height='100%' data-id='"+ getId +"' class='active'></iframe>");
                } else {
                    alert('최대 10개까지만 화면을 열 수 있습니다. \n열린 화면을 닫고 진행해 주세요.')
                }
            } else {
                $(this).parent().addClass('active').siblings('li').removeClass('active');
                $('#VIEW-TABS #' + getId).addClass('active').siblings().removeClass('active');
                $('#VIEW-PAGE [data-id="'+getId+'"]' ).addClass('active').siblings().removeClass('active');
            }
        });
	},

	iframeActionOfTop : function() {
	    var snbItem = top.$('#snb .depth2 li a');
        snbItem.on('click', function() {
            let getLink = $(this).data('link');
            let getId = $(this).data('id');
            let getText = $(this).text();
            let tab = top.$('#VIEW-TABS .item');
            let iframe = top.$('#VIEW-PAGE iframe');

            top.$('#snb .depth2 li').each(function(){
                $(this).removeClass('active');
            });

            if (getLink === undefined) {
                alert('링크 주소가 없습니다. 시스템담당자에게 문의하세요.');
                return false;
            }

            if(top.$('#VIEW-TABS #' + getId).length == 0 ) { //같은게 없다면
                if(tab.length < 10) { //열린탭이 10개 이하
                    top.$('#snb .depth2 li').removeClass('active');
                    $(this).parent().addClass('active');
                    tab.removeClass('active');
                    iframe.removeClass('active');

                    top.$('#VIEW-TABS').append("<a href='javascript:void(0)' class='item active' id=\'"+ getId +"\'><span>" + getText + "</span> <span class='tab-close'><i class='icon icon-circle-with-cross'></i></span></a>");
                    top.$('#VIEW-PAGE').append("<iframe src='"+ getLink +"' width='100%' height='100%' data-id='"+ getId +"' class='active'></iframe>");
                } else {
                    alert('최대 10개까지만 화면을 열 수 있습니다. \n열린 화면을 닫고 진행해 주세요.')
                }
            } else {
                $(this).parent().addClass('active').siblings('li').removeClass('active');
                top.$('#VIEW-TABS #' + getId).addClass('active').siblings().removeClass('active');
                top.$('#VIEW-PAGE [data-id="'+getId+'"]' ).addClass('active').siblings().removeClass('active');
            }
        });
	}
}
