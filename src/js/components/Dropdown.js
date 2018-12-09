(function() {
	let $html = $('html');
	let $overlay = $('.js-overlay');
	let $dropdown = $(document).find('.js-c-dropdown');
	let activeClass = 'is-active';
	let open = false;

	$dropdown.on('click', function() {
		if (!open) {
			_open($(this));
		} else {
			_close();
		}
	});

	$(document).on('click', '.overlay--dropdown', _close);

	function _open(el) {
		$dropdown.removeClass(activeClass);
		el.addClass(activeClass);
		$overlay.addClass(activeClass).addClass('overlay--dropdown');
		// $html.addClass('is-fixed');
		open = true;
	}

	function _close() {
		$dropdown.removeClass(activeClass);
		$overlay.removeClass(activeClass).removeClass('overlay--dropdown');
		// $html.removeClass('is-fixed');
		open = false;
	}
})();
