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

// const Select = (function() {
// 	let select = {};
// 	let $select = $('.js-c-select');
// 	let $overlay = $('.js-overlay');
// 	let overlayActiveClass = '.overlay--select';
// 	let activeClass = 'is-active';
// 	let click = true;
// 	let open = false;
// 	let selected = false;
// 	let $toggle, $val, $dropdown, $item, $btnReset, title;

// 	select.init = function() {
// 		this.events();
// 	};

// 	select.events = function() {
// 		$select.on('click', function() {
// 			$toggle = $(this).find('.c-select__toggle');
// 			$val = $(this).find('.c-select__val');
// 			$dropdown = $(this).find('.c-select__dropdown');
// 			$item = $(this).find('.c-select__item');
// 			let _this = $(this);

// 			if (click) {
// 				title = $val.text();
// 				click = false;
// 			}

// 			if (!open) {
// 				select._open($(this));
// 			} else {
// 				select._close();
// 				if (!$item.hasClass('is-checked')) {
// 					$toggle.removeClass(activeClass);
// 				} else {
// 					$toggle.on('click', function(e) {
// 						select._toggle();

// 						e.stopPropagation();
// 					});
// 				}
// 			}

// 			$item.on('click', function(e) {
// 				let val = $(this).text();

// 				$val.text(val);

// 				$item.removeClass('is-checked');
// 				$(this).addClass('is-checked');

// 				e.stopPropagation();
// 			});

// 			$toggle.on('click', function() {
// 				$val.text(title);
// 			});
// 		});

// 		$(document).on('click', overlayActiveClass, function() {
// 			select._close();
// 			if (!$item.hasClass('is-checked')) {
// 				select._toggle();
// 			}
// 		});
// 	};

// 	select.changeValue = function() {
// 		console.log('---', 'YAAPPPP');
// 	};

// 	select._toggle = function() {
// 		$item.removeClass('is-checked');
// 		$toggle.removeClass(activeClass);
// 		select._close();
// 	};

// 	select._open = function(el) {
// 		$select.removeClass(activeClass);
// 		el.addClass(activeClass);
// 		$toggle.addClass(activeClass);
// 		$overlay.addClass(activeClass).addClass('overlay--select');
// 		open = true;
// 	};

// 	select._close = function() {
// 		$select.removeClass(activeClass);
// 		$overlay.removeClass(activeClass).removeClass('overlay--select');
// 		open = false;
// 	};

// 	return select;
// })();
