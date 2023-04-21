$(function(){

	
	$(window).on('scroll',  function() {
		var top = $(this).scrollTop();

		// top 버튼
		if ($('.js-top').length) {
			if (top > 15) {
				$('.js-top').fadeIn(500);
			} else if (top < 15) {
				$('.js-top').fadeOut(500);
			}
		}

		headerScroll();
		
	});

	// 상단으로 바로가기
	$('.js-top').bind("click", function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0},200);
	});

	// 메인 상단 고정
	function headerScroll(){
		if ($('.main-menu').length) {
			if ($(window).scrollTop() >= 60) {
				$('#header').addClass('scroll');
			}
			else {
				$('#header').removeClass('scroll');
			}
		}
	};
	headerScroll();

	// 탭메뉴
	$('.js-tab').each(function(i) {
		var oTab = $(this);
		var tabIndex = $(this).find('.on').attr('id').match(/\d+$/);
	
		$(this).find('.cont').find('#content-' + tabIndex[0]).show();
	
		$(this).find('.menu li a').click(function() {	
			var tabIndex = $(this).attr('id').match(/\d+$/);
			oTab.find('.menu li a').removeClass('on');
			$(this).addClass('on');
	
			oTab.find('.cont > div').hide();
			oTab.find('.cont').find('#content-' + tabIndex[0]).show();
	
			return false;
		});
	
	});

	// 액션바 구매하기
	$('#action-bar .buy').bind("click", function(e) {
		e.preventDefault();
		$('#action-bar .buy-option').addClass('active');
	});
	$('#action-bar .close').bind("click", function(e) {
		e.preventDefault();
		$('#action-bar .buy-option').removeClass('active');
	});
	

	// 좋아요
	$('.js-like').bind("click", function(e) {
		$('.js-like').toggleClass('on');
	  });
});