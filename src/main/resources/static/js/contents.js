$(function(){
  "use strict"

  //윈도우팝업일때 body overflow
  if($('.win-popup').length > 0) {
    $('body').css('overflow','auto');
  };

  //toggle
  $('.toggle').on('click', '.toggle-button', function() {
    var toggleWrap = $(this).parents('.toggle')
    toggleWrap.toggleClass('hide');
    toggleWrap.find('.toggle-cont').toggleClass('hide');
  });

  $('.data-toggle').on('click', '.toggle-button', function() {
    var toggleWrap = $(this).parent('.data-toggle');
    toggleWrap.toggleClass('hide');
    $(this).parents('.data').find('.data-body').toggleClass('hide');
    if(toggleWrap.hasClass('hide')) {
        $(this).find('span').text('열림');
    } else {
        $(this).find('span').text('닫힘');
        $('iframe').each(function(){
        	if($(this).attr("src") =="/static/js/libs/smartEditor/SmartEditor2Skin.html"){
        		$(this).css("height","300px");
				$(this).contents().find(".se2_to_html").click();
				$(this).contents().find(".se2_to_editor").click();
        	}
        });
    };
  });

  //snb
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
    // var midCookie = getCookie('midCookie');
    // var pgcode = $(this).attr('data');
    // if (mode == 0) {
    //     if (midCookie.search('@' + pgcode + '@') < 0) {
    //         if (!midCookie) midCookie = '@';
    //         midCookie += pgcode + '@';
    //     }
    // } else {
    //     midCookie = midCookie.replace(pgcode + '@', '');
    // }
    // setCookie('midCookie', midCookie, 365);
  });

  //tooltip
	$(document).on('click', '.tooltip .trigger', function(){
		// $('.tooltip .cont').toggleClass('on');
		$(this).next().toggleClass('on');
		$('.tooltip .trigger').not(this).next().removeClass('on');
	});

  //tooltip close
  $(document).on('click', '.tooltip .close', function(){
		$('.tooltip .cont').removeClass('on');
	});

  //iframe 제어
  let snbItem = $('#snb .depth2 li a');

  snbItem.on('click', function() {
    let getLink = $(this).data('link');
    let getId = $(this).data('id');
    let getText = $(this).text();
    let tab = $('#VIEW-TABS .item');
    let iframe = $('#VIEW-PAGE iframe');

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

  //VIEW-TABS 제어
  $('#VIEW-TABS').on('click', '.item', function() {
    let tabId = $(this).attr('id');
    let page = $('#VIEW-PAGE iframe');

    $(this).addClass('active').siblings().removeClass('active');

    for (var i =0; i < page.length; i++ ) {
      if($(page[i]).data('id') == tabId) {
        $('#VIEW-PAGE [data-id="'+tabId+'"]').addClass('active').siblings().removeClass('active');
        $('#snb .depth2 li').removeClass('active');
        $('#snb .depth2 li [data-id="'+tabId+'"]').parent().addClass('active');
      }
    }
  });

  //VIEW-TABS 닫기
  $('#VIEW-TABS').on('click', '.tab-close', function() {
    let removeTab = $(this).parent();
    let removeId = removeTab.attr('id');

    removeTab.remove();
    $('#VIEW-PAGE [data-id="'+removeId+'"]').remove();
    $('#snb .depth2 li [data-id="'+removeId+'"]').parent().removeClass('active');

    if($('#VIEW-TABS .item.active').length == 0) {
      $('#VIEW-TABS .item:last-child').addClass('active');
      $('#VIEW-PAGE iframe:last-child').addClass('active');

      let activeId = $('#VIEW-TABS .active').attr('id');
      $('#snb .depth2 li [data-id="'+activeId+'"]').parent().addClass('active');
    }
  });

  //layerPop btn-close
  var ingScroll = 0;
  $('.layer-popup .box .btn-close').on('click',function(){
		$(this).closest('.layer-popup').removeClass('open');
		if($('.layer-popup.open').length == 0) {
			$('html').removeClass('layer-open');
		}
		$('body').unbind('touchmove');
		$(window).scrollTop(ingScroll);
  });

  $('.notice-layer-popup .box .btn-close').on('click',function(){
		$(this).closest('.notice-layer-popup').removeClass('open');
		if($('.notice-layer-popup.open').length == 0) {
			$('html').removeClass('notice-layer-open');
		}
		$('body').unbind('touchmove');
		$(window).scrollTop(ingScroll);
  });

  tabsBody();
  layerpopSetting();
});

//windowPopOpen
function windowPopOpen(window) {
  open(window, "NewWindow", "left=0, top=0, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=200, height=200");
  if($('.win-popup')) {
    $('body').addClass('openPop');
  }
};

// windowPopClose
function windowPopClose(){
  self.close();
};

//layerPop setting
function layerpopSetting(){
	$('.layer-popup').each(function(){
		if($(window).height() > $(this).find('.box').innerHeight() + 30 ){
			$(this).addClass('fix-center');
		}else{
			$(this).removeClass('fix-center');
		}
	});
};

//layerPopOpen
function layerPopOpen(id){
	ingScroll = $(window).scrollTop();
	$('html').addClass('layer-open');
	$('#'+id).addClass('open');
	$('body').bind('touchmove', function(e){
		e.preventDefault();
	});
};

//layerPopClose
function layerPopClose(id){
	$('html').removeClass('layer-open');
	$('#'+id).removeClass('open');
	$('body').unbind('touchmove');
};

//noticeLayerPopOpen
function noticeLayerPopOpen(id){
	if ( ! getCookie(id)) {
		ingScroll = $(window).scrollTop();
		$('#'+id).addClass('open');
		$('body').bind('touchmove', function(e){
			e.preventDefault();
		});
	}
};

//noticeLayerPopClose
function noticeLayerPopClose(id){
	$('#'+id).removeClass('open');
	$('body').unbind('touchmove');
};
//오늘 하루 그만보기
function noticeLayerPopCloseToday(id) {
	noticeLayerPopClose(id);
	var expDate = new Date();
	expDate.setTime(expDate.getTime() + 1000*60*60*24);//쿠키 생성일 + 1일
	setCookie(id, "Y", expDate);
}

//tabs-area
function tabsBody(){
	$('.tabs-area').each(function(){
		$(this).children('.tabs-body').children('.tab-cont:first').show();
		var tab_type = $(this).children('.tabs').children('li');

		tab_type.on('click',function(){
            var inx = $(this).index();
            var tab_body = $(this).parent().siblings('.tabs-body');
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            tab_body.children('.tab-cont').hide();
            tab_body.children('.tab-cont:eq(' + inx + ')').show();
		});
	});
};