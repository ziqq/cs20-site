/**
 * App.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

const Base = {
	init: function() {
		this.scrollBar();
		this.select();
		this.tooltip();
		this.inputMask();
		this.popups();
		this.setHeight();
		this.showHideText();
		this.plusMinus();
		this.upsateResize();
		this.goTop();

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
		}
	},
	scrollBar: function() {
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
	setHeight: function() {
		//Product title equalheight
		_heightses($('.js-product-title-equalheight'));
		_heightses($('.js-category-title-equalheight'));

		function _heightses(selector) {
			selector.equalHeights();
		}
	},
	plusMinus: function() {
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
	inputMask: function() {
		//Masked inputmask https://github.com/RobinHerbots/Inputmask
		if ($('.js-phone-mask').length) {
			$('.js-phone-mask').inputmask({
				mask: '+7 (999) 999-99-99',
				showMaskOnHover: false
			});
		}
	},
	popups: function() {
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
	select: function() {
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
	tooltip: function() {
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
	setFixedBlcok: function() {
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
	showHideText: function() {
		let $textBlock = $('.js-text');
		let $textBtn = $('.js-text--show');
		let open = false;
		if ($(window).width() <= 480) {
			$textBlock.hide();
			$textBtn.on('click', function() {
				if (!open) {
					$textBlock.slideDown();
					open = true;
				} else {
					$textBlock.slideUp();
					open = false;
				}
			});
		}
	},
	upsateResize: function() {
		$(window).resize(function() {
			Base.setHeight();
		});
	},
	stopScroll: function() {
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
	goTop: function() {
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
	goTo: function() {
		//Click event to scroll to section whith id like href
		$('.js-goto').click(function() {
			var elementClick = $(this).attr('href');
			var destination = $(elementClick).offset().top;
			$('html, body').animate(
				{ scrollTop: destination - 60 + 'px' },
				300
			);
			return false;
		});
	}
};

$(function() {
	Base.init();

	function textOverflow(s) {
		$('.js-text-overflow').each(function() {
			let media = s || $(this).data('text-media');
			let size = s || $(this).data('text-overflow');
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
	}
	textOverflow();

	$(window).resize(function() {
		textOverflow();
	});

	if ($(window).width() < 480) {
		//Contacts move block
		$('.js-contacts-map').appendTo('.js-contacts-map--place');

		//News image move on xs screen
		$('.js-cs-card').each(function() {
			let $img = $(this).find('.cs-card__img');
			let $date = $(this).find('.cs-card__date');
			$img.insertAfter($date);
		});
	}

	//=include components/Select.js
	//=include components/Dropdown.js
	//=include components/Search.js
	//=include components/Slider.js
	//=include components/Stories.js
	//=include modules/Menu.js
	//=include partials/cs-scripts.js

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

	// function contentPadding() {
	// 	$('.content-wrapper')
	// 		.not('.home')
	// 		.css('padding-top', $('.header').outerHeight(true));
	// }
	// contentPadding();

	//Mobile menu subnav toggle
	// $('.js-mobile-nav-sub--open').on('click', function() {
	// 	$(this)
	// 		.parent()
	// 		.find('.mobile-nav--sub')
	// 		.addClass('is-open');
	// });

	// $('.js-mobile-nav-sub--close').on('click', function() {
	// 	$(this)
	// 		.closest('.mobile-nav--sub')
	// 		.removeClass('is-open');
	// });

	//Slick Slider https://kenwheeler.github.io/slick/
	// if ($('.js-cs-slider--news').length > 0) {
	// 	const $slider = $('.js-cs-slider--news');
	// 	if ($(window).width() > 480) {
	// 		$slider.on('init', () => {
	// 			mouseWheel($slider);
	// 		});
	// 		function mouseWheel($slider) {
	// 			$slider.on('wheel', { $slider: $slider }, mouseWheelHandler);
	// 		}
	// 	}
	// 	$slider.slick({
	// 		arrows: true,
	// 		nextArrow: '.cs-slider__arrow--next',
	// 		prevArrow: '.cs-slider__arrow--prev',
	// 		// dots: false,
	// 		autoplay: false,
	// 		autoplaySpeed: 3000,
	// 		slidesToShow: 6,
	// 		slidesToScroll: 1,
	// 		infinite: false,
	// 		vertical: true,
	// 		verticalSwiping: true
	// 	});
	// 	function mouseWheelHandler(event) {
	// 		event.preventDefault();
	// 		const $slider = event.data.$slider;
	// 		const delta = event.originalEvent.deltaY;
	// 		if (delta > 0) {
	// 			$slider.slick('slickNext');
	// 		} else {
	// 			$slider.slick('slickPrev');
	// 		}
	// 	}

	// 	$slider
	// 		.find('.slick-slide')
	// 		.first()
	// 		.addClass('is-checked');
	// 	$slider.find('.slick-slide').on('click', function() {
	// 		$('.js-cs-slider--news')
	// 			.find('.slick-slide')
	// 			.removeClass('is-checked');
	// 		$(this).addClass('is-checked');
	// 	});
	// }

	// if ($('.js-cs-slider').length > 0) {
	// 	$('.js-cs-slider').slick({
	// 		arrows: true,
	// 		nextArrow: '.cs-slider__arrow--next',
	// 		prevArrow: '.cs-slider__arrow--prev',
	// 		dots: true,
	// 		autoplay: true,
	// 		autoplaySpeed: 2000,
	// 		slidesToShow: 1,
	// 		slidesToScroll: 1,
	// 		infinite: true
	// 	});
	// }

	// if ($('.js-cs-slider--card').length > 0) {
	// 	$('.js-cs-slider--card').slick({
	// 		arrows: true,
	// 		nextArrow: '.cs-slider__arrow--next',
	// 		prevArrow: '.cs-slider__arrow--prev',
	// 		dots: true,
	// 		autoplay: false,
	// 		autoplaySpeed: 3000,
	// 		slidesToShow: 1,
	// 		slidesToScroll: 1,
	// 		infinite: true
	// 	});
	// }

	// if ($(window).width() > 480) {
	// 	$('.zoom')
	// 		.wrap('<span style="display:inline-block"></span>')
	// 		.css('display', 'block')
	// 		.parent()
	// 		.zoom();
	// }

	// if ($('.js-sticky--news').length > 0 && $(window).width() > 768) {
	// 	var sidebar = new StickySidebar('.js-sticky--news', {
	// 		topSpacing: 120,
	// 		bottomSpacing: 10,
	// 		containerSelector: '.news__content',
	// 		innerWrapperSelector: '.news__slider'
	// 	});
	// }

	//Datepicker http://t1m0n.name/air-datepicker/docs/index-ru.html
	// if ('.js-date'.length > 0) {
	// 	$('.js-date').datepicker({
	// 		dateFormat: 'dd.mm.yy',
	// 		autoClose: true
	// 	});
	// 	$('.js-input-icon').click(function(event) {
	// 		event.preventDefault();
	// 		$(this)
	// 			.parent()
	// 			.find('.js-date')
	// 			.focus();
	// 	});
	// }

	//Custom Select https://select2.org/
	// if ($('.js-select').length > 0) {
	// 	$('.js-select').select2({
	// 		container: '.cs-select__container'
	// 	});
	// 	$('.js-select.no-search').select2({
	// 		minimumResultsForSearch: -1
	// 	});

	// 	$(document).click(function(event) {
	// 		if (
	// 			$(event.target).closest('.select2-dropdown, .select2-container')
	// 				.length
	// 		)
	// 			return;
	// 		$('.js-select').select2('close');
	// 		event.stopPropagation();
	// 	});

	// 	$(document).on('focus', '.select2-search__field', function(e) {
	// 		e.stopPropagation();
	// 	});
	// }

	// $('.js-garanty-item--more').on('click', function() {
	// 	$(this)
	// 		.closest('.garanty-item')
	// 		.find('.is-hidden')
	// 		.removeClass('is-hidden');
	// 	$(this).css('display', 'none');
	// });

	// $('.js-lk-nav')
	// 	.find('.lk-nav__item')
	// 	.on('click', function() {
	// 		$('.js-lk-nav')
	// 			.find('.lk-nav__item')
	// 			.removeClass('is-active');
	// 		$(this).addClass('is-active');
	// 	});

	// if ($(window).width() <= 768) {
	// 	tabTransform();
	// }
});

//=include pages/catalog.js
//=include pages/cart.js
//=include pages/lk.js
//=include pages/map.js
//=include partials/functions.js
