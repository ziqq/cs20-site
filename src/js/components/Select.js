(function() {
	let $select = $('.js-c-select');
	let $overlay = $('.js-overlay');
	let overlayActiveClass = '.overlay--select';
	let activeClass = 'is-active';
	let open = false;

	$select.each(function() {
		let $toggle = $(this).find('.c-select__toggle');
		let $val = $(this).find('.c-select__val');
		let $item = $(this).find('.c-select__link');
		let _this = $(this);
		let title = $val.text();

		_this.on('click', function(e) {
			if (!open) {
				_open($(this));
			} else {
				_close();
				if (!$item.hasClass('is-checked')) {
					$toggle.removeClass(activeClass);
				} else {
					$toggle.on('click', function(e) {
						_toggle();

						e.stopPropagation();
					});
				}
			}
		});

		// $item.on('click', function(e) {
		// 	// let val = $(this).text();

		// 	// $val.text(val);

		// 	// $item.removeClass('is-checked');
		// 	// $(this).addClass('is-checked');
		// 	// _close();
		// 	e.stopPropagation();
		// });

		// $toggle.on('click', function() {
		// 	$val.text(title);
		// });

		function _open(el) {
			$select.removeClass(activeClass);
			el.addClass(activeClass);
			$toggle.addClass(activeClass);
			$overlay.addClass(activeClass).addClass('overlay--select');
			open = true;
		}

		function _close() {
			$select.removeClass(activeClass);
			$overlay.removeClass(activeClass).removeClass('overlay--select');
			open = false;
		}

		function _toggle() {
			$item.removeClass('is-checked');
			$toggle.removeClass(activeClass);
			_close();
		}

		$(document).on('click', overlayActiveClass, function() {
			_close();
			if (!$item.hasClass('is-checked')) {
				_toggle();
			}
		});
	});
})();

(function() {
	$('.js-select--box').each(function() {
		let $selectCountry = $(this).find('.js-select--country');
		let $selectRegion = $(this).find('.js-select--region');
		let $selectCity = $(this).find('.js-select--city');

		$selectCountry.on('select2:select', function() {
			_enabled($selectRegion);
		});
		$selectRegion.on('select2:select', function() {
			_enabled($selectCity);
		});

		function _enabled(el) {
			el.removeAttr('disabled');
		}
	});

	$('.js-select--country, .js-select--region, .js-select--city').select2();
})();
