// Search
(function() {
	let $search = $('.js-search-input');
	let $overlay = $('.js-overlay');

	if ($search.length) {
		$search.each(function() {
			let $parent = $(this).closest('.js-search');
			let $btnClose = $parent.find('.js-search--reset');
			let $item = $parent.find('.search-hint__item');
			let _this = $(this);

			_this.on('keyup', _toggle).on('focus', _toggle);

			$btnClose.on('click', function() {
				$(this).css('display', 'none');
				_this.val('');
				_close();
			});

			$item.on('click', function(e) {
				let str = $(this)
					.find('.search-hint__text')
					.text()
					.trim();
				_this.val(str);
				_close();
				e.stopPropagation();
			});

			$overlay.on('click', _close);

			function _toggle() {
				if (_this.val() !== '') {
					_open();
				} else {
					_close();
					$btnClose.fadeOut();
				}
			}

			function _open() {
				$parent.addClass('is-active');
				$btnClose.fadeIn();
				$overlay.addClass('is-active').addClass('overlay--search');
			}

			function _close() {
				$parent.removeClass('is-active');
				$overlay
					.removeClass('is-active')
					.removeClass('overlay--search');
			}
		});
	}
})();
