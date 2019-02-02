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
		$('#cart-tabs').tabs({
			active: page
		});
	}
};

Cart.init();
