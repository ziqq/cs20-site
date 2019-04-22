/**
 * App.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

$(function() {
	App.init();
	Cart.init();

	//=include components/Select.js
	//=include components/Dropdown.js
	//=include components/Search.js
	//=include components/Slider.js
	//=include components/Stories.js
	//=include modules/Menu.js
	//=include partials/cs-scripts.js
});

const App = {
	init: function() {
		this.scrollBar();
		this.checkBox();
		this.select();
		this.tooltip();
		this.inputMask();
		this.popups();
		this.setHeight();
		this.textOverflow();
		this.showHideText();
		this.addInCart();
		this.plusMinus();
		this.goTop();
		this.goTo();
		this.relativeBtn();
		this.moveBlocks();

		$('body').removeClass('loading');

		//First Screen Padding-Top
		$('.js-firstscreen').css('padding-top', $('.header').outerHeight(true));

		//Init tabs
		$('.js-tabs').tabs();

		//Stop drag
		$('img').on('dragstart', function(event) {
			event.preventDefault();
		});

		if ($(window).width() <= 768) {
			this.stopScroll();
		}

		if ($(window).width() <= 480) {
			this.setFixedBlcok();

			//Contacts move block
			$('.js-contacts-map').appendTo('.js-contacts-map--place');

			//News image move on xs screen
			$('.js-cs-card').each(function() {
				let $img = $(this).find('.cs-card__img');
				let $date = $(this).find('.cs-card__date');
				$img.insertAfter($date);
			});
		}

		$(window).resize(function() {
			App.setHeight();
			App.textOverflow();
		});
	},
	scrollBar() {
		let scrollBar = $('.js-scroll');
		if (scrollBar.length && $(window).width() > 768) {
			scrollBar.niceScroll({
				cursorcolor: '#c4c4c4',
				// horizrailenabled: false,
				// autohidemode: false,
				boxzoom: false,
				verge: 500,
				cursorwidth: 4,
				cursorborder: 'none',
				cursorborderradius: 30
			});
			scrollBar.on('mouseover mousedown', function() {
				$(this)
					.getNiceScroll()
					.resize();
			});
		}
	},
	checkBox() {
		new CheckBox({ selector: '.js-cs-checkbox' });
		new Radio({ selector: '.js-cs-radio' });
	},
	setHeight() {
		//Product title equalheight
		_heightses($('.js-product-title-equalheight'));
		_heightses($('.js-category-title-equalheight'));

		function _heightses(selector) {
			selector.equalHeights();
		}
	},
	textOverflow() {
		$('.js-text-overflow').each(function() {
			let media = $(this).data('text-media');
			let size = $(this).data('text-overflow');
			let sizeNow;

			if (media) {
				if ($(window).width() > 480 && $(window).width() < 1200) {
					sizeNow = size;
				} else {
					sizeNow = 'auto';
				}
			} else {
				sizeNow = size;
			}

			let text = $(this).text();

			if (text.length > sizeNow) {
				$(this).text(text.slice(0, sizeNow) + ' ...');
			}
		});
	},
	plusMinus() {
		$('.js-counter--minus').click(function() {
			var $input = $(this)
				.parent()
				.find('input');
			var count = parseInt($input.val()) - 1;
			count = count < 1 ? 1 : count;
			$input.val(count);
			$input.change();
			return false;
		});
		$('.js-counter--plus').click(function() {
			var $input = $(this)
				.parent()
				.find('input');
			$input.val(parseInt($input.val()) + 1);
			$input.change();
			return false;
		});
	},
	inputMask() {
		//Masked inputmask https://github.com/RobinHerbots/Inputmask
		if ($('.js-phone-mask').length) {
			$('.js-phone-mask').inputmask({
				mask: '+7 (999) 999-99-99',
				showMaskOnHover: false
			});
		}
	},
	popups() {
		//Modal FancyBox 3 https://fancyapps.com/fancybox/3/
		if ($('[data-fancybox]').length) {
			$('[data-fancybox]').fancybox({
				baseClass: 'modal-window__wrap',
				touch: false,
				closeClickOutside: true,
				autoFocus: false,
				helpers: {
					overlay: {
						locked: false
					}
				}
			});
		}

		$('.js-popup-close').on('click', function() {
			let popup = $(this).attr('href');
			setTimeout(() => {
				$.fancybox.open($(popup), {
					touch: false
				});
			}, 100);
		});
	},
	select() {
		let $select = $('.js-select');

		if ($(window).width() > 768) {
			$select.each(function() {
				let $parent = $(this).parent();

				if ($(this).hasClass('no-search')) {
					$(this).select2({
						dropdownParent: $parent,
						minimumResultsForSearch: -1
					});
				} else {
					$(this).select2({
						dropdownParent: $parent
					});
				}
			});
		} else {
			$select.wrap('<label class="cs-select">');
		}
	},
	tooltip() {
		let $tooltip = $('.js-tooltip');
		let trigger;

		if ($(window).width() >= 1024) {
			trigger = 'hover';
		} else {
			trigger = 'click';
		}

		if ($tooltip.length) {
			$('.js-tooltip').tooltipster({
				theme: 'tooltipster-shadow',
				maxWidth: 270,
				side: 'right',
				trigger: trigger
			});
		}
	},
	setFixedBlcok() {
		let $fixBlock = $('.js-fix-block');
		let fixBlockHeight = $fixBlock.outerHeight(true);
		let blockOffsetTop = $fixBlock.offset().top;
		let wHeight = $(window).height();

		$(window).scroll(function() {
			let scroll = $(this).scrollTop();

			if (scroll + wHeight - fixBlockHeight <= blockOffsetTop) {
				$fixBlock.addClass('is-fixed');
			} else {
				$fixBlock.removeClass('is-fixed');
			}
		});
	},
	showHideText() {
		let $textBlock = $('.js-text');
		let $textBtnShow = $('.js-text--show');
		let open = false;

		$textBtnShow.on('click', function() {
			if (!open) {
				$(this).addClass('is-checked');
				$textBlock.slideDown();
				open = true;
			} else {
				$(this).removeClass('is-checked');
				$textBlock.slideUp();
				open = false;
			}
		});
	},
	addInCart() {
		//Add in card
		$('.js-add-in-cart').on('click', function(e) {
			if ($(this).hasClass('is-checked')) {
				$(this).removeClass('is-checked');
			} else {
				$(this).addClass('is-checked');
			}

			e.preventDefault();
			e.stopPropagation();
		});
	},
	stopScroll() {
		let $cartSum = $('.js-cart-sum');

		$cartSum.addClass('is-visible');

		function onScrollStopped(domElement, callback, timeout = 250) {
			domElement.addEventListener('scroll', () => {
				clearTimeout(callback.timeout);
				callback.timeout = setTimeout(callback, timeout);
			});
		}

		onScrollStopped(window, () => {
			setTimeout(() => {
				$cartSum.addClass('is-visible');
			}, 500);
		});

		$(window).on('scroll', function() {
			$cartSum.removeClass('is-visible');
		});
	},
	goTop() {
		//Click event to scroll to top
		$('.js-go-top').on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 800);
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > $(this).height()) {
				$('.js-go-top').addClass('is-visible');
			} else {
				$('.js-go-top').removeClass('is-visible');
			}
		});
	},
	goTo() {
		//Click event to scroll to section whith id like href
		$('.js-goto').click(function() {
			let _this = $(this);
			var elementClick = $(this).attr('href');
			var destination = $(elementClick).offset().top;

			$('html, body').animate(
				{ scrollTop: destination - 60 + 'px' },
				400
			);

			if (_this.hasClass('btn--filter')) {
				$('html, body').animate(
					{ scrollTop: destination - 60 + 'px' },
					400,
					function() {
						_this.hide();
					}
				);
			}

			return false;
		});
	},
	relativeBtn() {
		if ($(window).width() <= 768) {
			$(window).scroll(function() {
				let wHeight = $(window).height();
				let scroll = $(this).scrollTop();
				let $btn = $('.js-relative-btn');
				let $block = $('.js-relative-block');
				let blockOffset = $block.offset().top;
				let blockHeight = $block.height();

				if (scroll + wHeight < blockOffset + blockHeight) {
					$btn.css('display', 'block');
				} else {
					$btn.css('display', 'none');
				}
			});
		}
	},
	moveBlocks() {
		let $imageBlock = $('.js-block-image');
		let $quote = $('.js-quote');

		function imageBlockMove() {
			if ($imageBlock.length) {
				$imageBlock.each(function() {
					let $image = $(this).find('.block-image__img');
					let $desc = $(this).find('.block-image__desc');
					let $title = $(this).find('.block-image__title');
					let $text = $(this).find('.block-image__text');
					let $subTitle = $(this).find('.block-image__subtitle');
					let $subText = $(this).find('.block-image__subtext');

					if ($(window).width() <= 480) {
						$title.insertBefore($image);
						$text.insertBefore($image);
					} else {
						$title.appendTo($desc);
						$text.appendTo($desc);
					}

					if ($(window).width() <= 768) {
						$subTitle.appendTo($(this));
						$subText.appendTo($(this));
					} else {
						$subTitle.appendTo($desc);
						$subText.appendTo($desc);
					}
				});
			}
		}
		imageBlockMove();

		function removeBr() {
			if ($(window).width() <= 480 && $quote.length) {
				$quote.each(function() {
					$(this)
						.find('br')
						.remove();
				});
			}
		}
		removeBr();

		$(window).on('resize', function() {
			imageBlockMove();
			removeBr();
		});
	}
};

//=include components/Checkbox.js
//=include pages/catalog.js
//=include pages/card.js
//=include pages/cart.js
//=include pages/lk.js
//=include pages/map.js
