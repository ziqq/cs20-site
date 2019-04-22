/**
 * Cart.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
const Cart = {
	init() {
		this.cartSticky();
		this.tab();
	},
	//Sticky Block
	cartSticky() {
		if ($('.js-cart-sticky').length && $(window).width() >= 1024) {
			var sidebar = new StickySidebar('.js-cart-sticky', {
				topSpacing: 10,
				bottomSpacing: 10,
				containerSelector: '.cart__inner',
				innerWrapperSelector: '.cart__sum'
			});
		}
	},
	tab() {
		$('#cart-tabs').tabs();
	},
	nextPage(page) {
		let $tab = $(document).find('#cart-tabs');

		$tab.tabs({
			active: page
		});

		setTimeout(() => {
			$(document)
				.find('.cart-box__title')
				.trigger('click');
		}, 300);

		// $(this)
		// 	.closest('.cart-box')
		// 	.find('.cart-box__title')
		// 	.trigger('click');
	}
};
