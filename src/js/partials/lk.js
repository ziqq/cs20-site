/**
 * Lk.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function() {
	const lk = {
		init: function() {
			this.tabs();
			this.stickyBlock();
			this.changePfofile();
		},
		stickyBlock: function() {
			//Sticky Block
			if ($('.js-lk-sticky').length && $(window).width() > 1024) {
				var sidebar = new StickySidebar('.js-lk-sticky', {
					topSpacing: 10,
					bottomSpacing: 10,
					containerSelector: '.lk__inner',
					innerWrapperSelector: '.lk-nav__list'
				});
			}
		},
		changePfofile: function() {
			$('.js-change-profile').on('click', function() {
				let profile = $(this).attr('data-profile');
				let tab = $('a[data-src="#new-profile"]');
				let index = $(this).data('tab-index');

				// tab.attr('href', '#' + profile)
				// 	.parent()
				// 	.trigger('click');

				// $('.tab__content').removeAttr('style');
				// $('#' + profile).css('display', 'block');

				$('.js-lk-tabs').tabs('option', 'active', index);

				$('a[href=#' + profile + ']')
					.parent()
					.removeClass('is-hidden');

				$.fancybox.close();
			});
		},
		tabs: function() {
			$('.js-lk-tabs').tabs();
		}
	};
	lk.init();
})();
