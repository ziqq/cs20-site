(function() {
	let $hamburger = $('.js-hamburger');
	let $nav = $('.js-mobile-nav');
	let $overlay = $('.js-overlay');
	let $html = $('html');

	$hamburger.on('click', _open);

	$(document).on('click', '.overlay--menu', _close);

	$('.js-mobile-nav--close').on('click', _close);

	function _open(e) {
		$nav.addClass('is-open');
		$overlay.addClass('is-active').addClass('overlay--menu');
		$html.addClass('is-fixed');
		e.preventDefault();
		e.stopPropagation();
	}

	function _close(e) {
		$nav.removeClass('is-open');
		$overlay.removeClass('is-active').removeClass('overlay--menu');
		$html.removeClass('is-fixed');
		e.preventDefault();
		e.stopPropagation();
	}
})();
