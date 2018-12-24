/**
 * Lk.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function() {
	const lk = {
		init: function() {
			this.stickyBlock();

			if ($(window).width() <= 480) {
				this.toggleContent();
				this.orderSetHeight();
			}
		},
		stickyBlock: function() {
			//Sticky Block
			if ($('.js-lk-sticky').length && $(window).width() > 1024) {
				var sidebar = new StickySidebar('.js-lk-sticky', {
					topSpacing: 10,
					bottomSpacing: 10,
					containerSelector: '.lk__inner',
					innerWrapperSelector: '.lk-nav'
				});
			}
		},
		toggleContent: function() {
			let $wrapper = $('.content-wrapper.lk');
			let $btnClose = $('.js-lk-content--close');
			let $lkContent = $('.js-lk-content');
			let $lkBox = $('.js-lk-box');
			let boxHeight = $lkBox.outerHeight(true);
			let $lkNav = $('.js-lk-nav');
			let $lkNavLink = $lkNav.find('.lk-nav__link');
			let timeOut = 200;
			let offset = 20;
			let thisPage = true;

			console.log('---', boxHeight);

			$wrapper
				.addClass('content-is-visible')
				.css('min-height', boxHeight);
			setTimeout(() => {
				$lkContent.addClass('has-animation');
			}, timeOut);

			$lkNavLink.each(function() {
				if ($lkBox.data('page') === $(this).data('page-target')) {
					$(this).on('click', function(e) {
						$lkContent.addClass('has-animation');

						setTimeout(() => {
							$wrapper
								.addClass('content-is-visible')
								.css('min-height', boxHeight);
						}, timeOut);

						e.preventDefault();
					});
				}
			});

			$btnClose.on('click', function() {
				$wrapper.removeClass('content-is-visible').removeAttr('style');

				setTimeout(() => {
					$lkContent.removeClass('has-animation');
				}, timeOut);
			});
		},
		orderSetHeight: function() {
			let $wrapper = $('.content-wrapper.lk');
			let wrapperHeight;

			$('.js-order-item').each(function() {
				let $parent = $(this).closest('.js-lk-box');
				let height;

				$(this).on('click', function() {
					if ($(this).hasClass('is-open')) {
						wrapperHeight = $wrapper.outerHeight(true);

						console.log('--- wrapperHeight first', wrapperHeight);

						setTimeout(() => {
							height = $(this).outerHeight(true);
							$wrapper.animate(
								{ 'min-height': wrapperHeight + height },
								300
							);
						}, 300);
					} else {
						wrapperHeight = $parent.outerHeight(true);
						height = $(this).height();

						console.log('--- $parent', $parent);
						console.log('--- wrapperHeight else', wrapperHeight);
						console.log('--- height else', height);
						console.log('--- result else', wrapperHeight - height);

						setTimeout(() => {
							$wrapper.animate(
								{ 'min-height': wrapperHeight - height / 1.15 },
								300
							);
						}, 300);
					}
				});
			});
		}
	};
	lk.init();
})();
