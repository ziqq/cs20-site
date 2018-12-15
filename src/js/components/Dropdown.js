(function() {
	let $html = $('html');
	let $overlay = $('.js-overlay');
	let $dropdown = $(document).find('.js-c-dropdown');
	let activeClass = 'is-active';
	let open = false;

	$dropdown.each(function() {
		let $toggle = $(this).find('.toggle');

		$(this).on('click', function() {
			if (!open) {
				_open($(this));
			} else {
				_close();
			}
		});

		$('.js-cs-dropdown--close').on('click', function(e) {
			e.stopPropagation();

			_close();
		});

		$(document).on('click', '.overlay--dropdown', _close);

		function _open(el) {
			$dropdown.removeClass(activeClass);
			el.addClass(activeClass);
			$toggle.addClass('is-active');
			$overlay.addClass(activeClass).addClass('overlay--dropdown');
			open = true;

			if ($(window).width() < 480) {
				$html.addClass('is-fixed');
			}
		}

		function _close() {
			$dropdown.removeClass(activeClass);
			$toggle.removeClass('is-active');
			$overlay.removeClass(activeClass).removeClass('overlay--dropdown');
			$html.removeClass('is-fixed');
			open = false;
		}
	});
})();
