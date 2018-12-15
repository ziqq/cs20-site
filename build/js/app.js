'use strict';

/**
 * App.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

var Base = {
	init: function init() {
		this.scrollBar();
		this.select();
		this.popups();
		this.setHeight();
		this.plusMinus();
		this.map();
		this.upsateResize();

		//First Screen Padding-Top
		$('.js-firstscreen').css('padding-top', $('.header').outerHeight(true));
	},
	scrollBar: function scrollBar() {
		var scrollBar = $('.js-scroll');
		if (scrollBar.length) {
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
			scrollBar.on('mouseover mousedown', function () {
				$(this).getNiceScroll().resize();
			});
		}
	},
	// select: function() {
	// 	let $select = $('.js-select');

	// 	if ($(window).width() > 768) {
	// 		$select.each(function() {
	// 			let $parent = $(this).parent();

	// 			if ($(this).hasClass('no-search')) {
	// 				$(this).select2({
	// 					dropdownParent: $parent,
	// 					minimumResultsForSearch: -1
	// 				});
	// 			} else {
	// 				$(this).select2({
	// 					dropdownParent: $parent
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		$select.wrap('<label class="cs-select">');
	// 	}
	// },
	setHeight: function setHeight() {
		//Product title equalheight
		_heightses($('.js-product-title-equalheight'));
		_heightses($('.js-category-title-equalheight'));

		function _heightses(selector) {
			selector.equalHeights();
		}
	},
	plusMinus: function plusMinus() {
		$('.js-counter--minus').click(function () {
			var $input = $(this).parent().find('input');
			var count = parseInt($input.val()) - 1;
			count = count < 1 ? 1 : count;
			$input.val(count);
			$input.change();
			return false;
		});
		$('.js-counter--plus').click(function () {
			var $input = $(this).parent().find('input');
			$input.val(parseInt($input.val()) + 1);
			$input.change();
			return false;
		});
	},
	popups: function popups() {
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

		$('.js-popup-close').on('click', function () {
			var popup = $(this).attr('href');
			setTimeout(function () {
				$.fancybox.open($(popup), {
					touch: false
				});
			}, 100);
		});
	},
	// select: function() {
	// 	let $select = $('.js-select');
	// 	$select.each(function() {
	// 		let placeholder = $(this).attr('placeholder');

	// 		$(this).selectize({
	// 			create: true,
	// 			sortField: 'text',
	// 			maxItems: 1,
	// 			singleOverride: true,
	// 			placeholder: placeholder
	// 		});
	// 	});
	// },
	select: function select() {
		var $select = $('.js-select');

		if ($(window).width() > 768) {
			$select.each(function () {
				var $parent = $(this).parent();

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
	map: function map() {
		var $map = $('.js-map');

		if ($map.length) {
			_initMap();
		}

		function _initMap() {
			var uluru = { lat: 51.9958, lng: 47.8191 };
			var map = new google.maps.Map(document.querySelector('.js-map'), {
				zoom: 17,
				center: uluru
			});
			// var marker = new google.maps.Marker({
			// 	position: { lat: 51.99577, lng: 47.81935 },
			// 	map: map,
			// 	icon: 'img/general/pin.png'
			// });
		}

		var $mapShops = $('.js-map-shops');

		if ($mapShops.length) {
			_initMapShops();
		}

		function _initMapShops() {
			var uluru = { lat: 51.9958, lng: 47.8191 };
			var map = new google.maps.Map(document.querySelector('.js-map-shops'), {
				zoom: 17,
				center: uluru
			});
			// var marker = new google.maps.Marker({
			// 	position: { lat: 51.99577, lng: 47.81935 },
			// 	map: map,
			// 	icon: 'img/general/pin.png'
			// });
		}
	},
	upsateResize: function upsateResize() {
		$(window).resize(function () {
			Base.setHeight();
		});
	}
};

$(function () {
	Base.init();

	var $window = $(window);
	var $body = $('body');

	$body.addClass('is-loading');

	function textOverflow(s) {
		$('.js-text-overflow').each(function () {
			var media = s || $(this).data('text-media');
			var size = s || $(this).data('text-overflow');
			var sizeNow = void 0;

			if (media) {
				if ($window.width() > 480 && $window.width() < 1200) {
					sizeNow = size;
				} else {
					sizeNow = 'auto';
				}
			} else {
				sizeNow = size;
			}

			var text = $(this).text();

			if (text.length > sizeNow) {
				$(this).text(text.slice(0, sizeNow) + ' ...');
			}
		});
	}
	textOverflow();

	$window.resize(function () {
		textOverflow();
	});

	if ($(window).width() < 480) {
		//Contacts move block
		$('.js-contacts-map').appendTo('.js-contacts-map--place');

		//News image move on xs screen
		$('.js-cs-card').each(function () {
			var $img = $(this).find('.cs-card__img');
			var $date = $(this).find('.cs-card__date');
			$img.insertAfter($date);
		});
	}

	(function () {
		var $select = $('.js-c-select');
		var $overlay = $('.js-overlay');
		var overlayActiveClass = '.overlay--select';
		var activeClass = 'is-active';
		var open = false;

		$select.each(function () {
			var $toggle = $(this).find('.c-select__toggle');
			var $val = $(this).find('.c-select__val');
			var $item = $(this).find('.c-select__link');
			var _this = $(this);
			var title = $val.text();

			_this.on('click', function (e) {
				if (!open) {
					_open($(this));
				} else {
					_close();
					if (!$item.hasClass('is-checked')) {
						$toggle.removeClass(activeClass);
					} else {
						$toggle.on('click', function (e) {
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

			$(document).on('click', overlayActiveClass, function () {
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

	(function () {
		var $html = $('html');
		var $overlay = $('.js-overlay');
		var $dropdown = $(document).find('.js-c-dropdown');
		var activeClass = 'is-active';
		var open = false;

		$dropdown.each(function () {
			var $toggle = $(this).find('.toggle');

			$(this).on('click', function () {
				if (!open) {
					_open($(this));
				} else {
					_close();
				}
			});

			$('.js-cs-dropdown--close').on('click', function (e) {
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

	// Search
	(function () {
		var $search = $('.js-search-input');
		var $overlay = $('.js-overlay');

		if ($search.length) {
			$search.each(function () {
				var $parent = $(this).closest('.js-search');
				var $btnClose = $parent.find('.js-search--reset');
				var $item = $parent.find('.search-hint__item');
				var _this = $(this);

				_this.on('keyup', _toggle).on('focus', _toggle);

				$btnClose.on('click', function () {
					$(this).css('display', 'none');
					_this.val('');
					_close();
				});

				$item.on('click', function (e) {
					var str = $(this).find('.search-hint__text').text().trim();
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
					$overlay.removeClass('is-active').removeClass('overlay--search');
				}
			});
		}
	})();

	(function () {
		var $slider = $('.js-cs-slider');
		if ($slider.length) {
			$slider.each(function () {
				var $slides = $(this).find('.cs-slider__slides');
				var $slide = void 0;
				var $arrowPrev = $(this).find('.cs-slider__arrow--prev').hide();
				var $arrowNext = $(this).find('.cs-slider__arrow--next').hide();

				if ($(window).width() > 768) {
					$slide = $(this).find('.cs-slider__slide').not('.cs-slider__slide--link');
				} else {
					$slide = $(this).find('.cs-slider__slide');
				}

				if ($slide.length > 4 || $(window).width() <= 768) {
					$arrowPrev.show();
					$arrowNext.show();
					$slides.not('.slick-initialized').slick({
						prevArrow: $arrowPrev,
						nextArrow: $arrowNext,
						speed: 300,
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: false,
						arrows: true,
						dots: true,

						responsive: [{
							breakpoint: 769,
							settings: {
								slidesToShow: 3
							}
						}, {
							breakpoint: 482,
							settings: {
								slidesToShow: 1
							}
						}]
					});
					setTimeout(function () {
						Base.setHeight();
					}, 100);
				}
			});
		}

		var $sliderCatergory = $('.js-cs-slider--category');
		if ($sliderCatergory.length) {
			$sliderCatergory.each(function () {
				var $slides = $(this).find('.cs-slider__slides');
				var $slide = $(this).find('.cs-slider__slide');
				var $arrowPrev = $(this).find('.cs-slider__arrow--prev').hide();
				var $arrowNext = $(this).find('.cs-slider__arrow--next').hide();

				if ($slide.length > 7 && $(window).width() > 480) {
					$arrowPrev.show();
					$arrowNext.show();
					$slides.not('.slick-initialized').slick({
						prevArrow: $arrowPrev,
						nextArrow: $arrowNext,
						speed: 400,
						slidesToShow: 7,
						slidesToScroll: 1,
						infinite: false,
						arrows: true,
						dots: false,

						responsive: [{
							breakpoint: 769,
							settings: {
								slidesToShow: 5
							}
						}, {
							breakpoint: 482,
							unslick: true
						}]
					});
				}
			});
		}

		var $sliderInfo = $('.js-cs-slider--info');
		if ($sliderInfo.length) {
			$sliderInfo.each(function () {
				var $slides = $(this).find('.cs-slider__slides');
				var $slide = $(this).find('.cs-slider__slide');
				var $arrowPrev = $(this).find('.cs-slider__arrow--prev').hide();
				var $arrowNext = $(this).find('.cs-slider__arrow--next').hide();

				if ($slide.length > 2 && $(window).width() <= 480) {
					$arrowPrev.show();
					$arrowNext.show();
					$slides.not('.slick-initialized').slick({
						prevArrow: $arrowPrev,
						nextArrow: $arrowNext,
						speed: 1000,
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: false,
						arrows: true,
						dots: false
					});
				}
			});
		}

		var $sliderHero = $('.js-cs-slider--hero');
		if ($sliderHero.length) {
			$sliderHero.each(function () {
				var $slides = $(this).find('.cs-slider__slides');
				var $slide = $(this).find('.cs-slider__slide');
				var $arrowPrev = $(this).find('.cs-slider__arrow--prev').hide();
				var $arrowNext = $(this).find('.cs-slider__arrow--next').hide();

				if ($slide.length > 1) {
					$arrowPrev.show();
					$arrowNext.show();
					$slides.not('.slick-initialized').slick({
						prevArrow: $arrowPrev,
						nextArrow: $arrowNext,
						speed: 1000,
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: false,
						arrows: true,
						dots: true,
						fade: true,
						adaptiveHeight: true
					});
				}
			});
		}

		var $sliderCard = $('.js-cs-slider--card');
		if ($sliderCard.length) {
			$sliderCard.each(function () {
				var $slides = $(this).find('.cs-slider__slides');
				var $slide = $(this).find('.cs-slider__slide');
				var $arrowPrev = $(this).find('.cs-slider__arrow--prev').hide();
				var $arrowNext = $(this).find('.cs-slider__arrow--next').hide();

				if ($slide.length > 1) {
					$arrowPrev.show();
					$arrowNext.show();
					$slides.not('.slick-initialized').slick({
						prevArrow: $arrowPrev,
						nextArrow: $arrowNext,
						speed: 400,
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: false,
						arrows: true,
						dots: true
					});
				}
			});
		}
	})();

	(function () {
		var $hamburger = $('.js-hamburger');
		var $nav = $('.js-mobile-nav');
		var $overlay = $('.js-overlay');
		var $html = $('html');

		$hamburger.on('click', _open);

		$(document).on('click', '.overlay--menu', _close);

		$('.js-mobile-nav--close').on('click', _close);

		function _open(e) {
			$nav.addClass('is-open');
			$overlay.addClass('is-active').addClass('overlay--menu');
			$html.addClass('is-fixed');
			e.preventDefault();
			e.stopPropagation();
		}

		function _close(e) {
			$nav.removeClass('is-open');
			$overlay.removeClass('is-active').removeClass('overlay--menu');
			$html.removeClass('is-fixed');
			e.preventDefault();
			e.stopPropagation();
		}
	})();

	//Accordeon
	$('.js-cs-accordeon').find('.cs-accordeon__item').find('.cs-accordeon__title').on('click', function () {
		if ($(this).parent().hasClass('is-open')) {
			$(this).parent().removeClass('is-open').find('.cs-accordeon__content').slideUp();
		} else {
			$(this).parent().addClass('is-open').find('.cs-accordeon__content').slideDown();
		}
	});

	//cs dropdown
	if ($('.js-dropdown').length) {
		$(document).on('click', '.js-dropdown', function () {
			if ($(this).hasClass('is-active')) {
				$(this).removeClass('is-active');
			} else {
				$('.js-dropdown').removeClass('is-active');
				$(this).addClass('is-active');
			}
		}).on('click', '.js-dropdown a', function (e) {
			e.stopPropagation();
		});
	}

	//cs checkbox
	$(document).on('click', '.js-cs-checkbox', function () {
		var _this = $(this);
		var input = _this.find('input');
		if (input.is(':checked')) {
			_this.removeClass('is-checked');
			input.prop('checked', false);
		} else {
			_this.addClass('is-checked');
			input.prop('checked', true);
		}
	});

	$(document).on('click', '.js-cs-radio--pseudo', function () {
		if ($(this).hasClass('is-checked')) {
			$(this).removeClass('is-checked');
		} else {
			$('.js-cs-radio--pseudo').removeClass('is-checked');
			$(this).addClass('is-checked');
		}
	});

	//Add in card
	$('.js-add-in-cart').on('click', function (e) {
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

	$('.js-tabs').tabs();

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

	//Masked inputmask https://github.com/RobinHerbots/Inputmask
	if ($('.js-phone-mask').length > 0) {
		$('.js-phone-mask').inputmask({
			mask: '+7 (999) 999-99-99',
			showMaskOnHover: false
		});
	}

	//Click event to scroll to top
	$('.js-go-top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 800);
	});
	$(window).scroll(function () {
		if ($(this).scrollTop() > $(this).height()) {
			$('.js-go-top').addClass('is-visible');
		} else {
			$('.js-go-top').removeClass('is-visible');
		}
	});

	//Click event to scroll to section whith id like href
	$('.js-goto').click(function () {
		var elementClick = $(this).attr('href');
		var destination = $(elementClick).offset().top;
		$('html, body').animate({ scrollTop: destination - 60 + 'px' }, 300);
		return false;
	});

	//Stop drag
	$('img').on('dragstart', function (event) {
		event.preventDefault();
	});

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

/**
 * Catalog.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function () {
	var Filter = {
		init: function init() {
			this.priceSlider();
			this.filterToggle();
			this.generateBtnApply();
			this.selectAll();

			if ($(window).width() > 768) {
				this.stickyFilter();
			}
		},
		stickyFilter: function stickyFilter() {
			if ($('.js-filter-sticky').length) {
				var sidebar = new StickySidebar('.js-filter-sticky', {
					topSpacing: 10,
					bottomSpacing: 0,
					containerSelector: '.catalog__content',
					innerWrapperSelector: '.filter__inner'
				});
			}
		},
		generateBtnApply: function generateBtnApply() {
			var $filter = $('.js-filter');
			var $item = $filter.find('.js-cs-checkbox');
			var render = true;

			$item.on('click', function (e) {
				_renderBtn($(this));

				if ($(window).width() >= 768) {
					$(this).parent().parent().on('mouseleave', function () {
						setTimeout(function () {
							return _hide();
						}, 3500);
					});
				}

				$filter.addClass('has-apply');

				e.stopPropagation();
			});

			$(document).on('click', '.js-btn--apply', function (e) {
				_hide();
				e.stopPropagation();
			});

			$('.js-filter-btn--reset').on('click', function (e) {
				_hide();
				e.stopPropagation();
			});

			function _hide() {
				$filter.removeClass('has-apply').find('.btn--apply').remove();
			}

			function _renderBtn(el) {
				render = false;
				$(document).find('.btn--apply').remove();
				var $btn = $('<button>');

				$btn.addClass('btn btn--default btn--apply js-btn--apply').text('Применить');
				$btn.appendTo(el);
			}
		},
		priceSlider: function priceSlider() {
			var $filterSlider = $('#js-filter-slider');
			if ($filterSlider.length) {
				var slider = document.getElementById('js-filter-slider');
				var allPriceStart = $filterSlider.data('start');
				var allPriceEnd = $filterSlider.data('end');
				var spans = [$('#jsPriceStart'), $('#jsPriceEnd')];
				var $priceStart = $('#jsPriceStart');
				var $priceEnd = $('#jsPriceEnd');
				var startPrice;
				var endPrice;

				if (spans[0].val() == '') {
					startPrice = allPriceStart;
				} else {
					startPrice = parseInt(spans[0].val());
				}

				if (spans[1].val() == '') {
					endPrice = allPriceEnd;
				} else {
					endPrice = parseInt(spans[1].val());
				}

				noUiSlider.create(slider, {
					start: [startPrice, endPrice],
					connect: true,
					range: {
						min: allPriceStart,
						max: allPriceEnd
					}
				});

				slider.noUiSlider.on('update', function (values, handle) {
					spans[handle].val(parseInt(values[handle]));
				});

				$priceStart.on('change', function () {
					slider.noUiSlider.set([this.value, null]);
				});

				$priceEnd.on('change', function () {
					slider.noUiSlider.set([null, this.value]);
				});
			}
		},
		filterToggle: function filterToggle() {
			var $html = $('html');
			var $overlay = $('.js-overlay');
			var $filterSticky = $('.js-filter-sticky');
			var $btnOpen = $('.js-filter--open');
			var btnOpenOffset = $btnOpen.offset().top;
			var $btnClose = $('.js-filter--close');

			$btnOpen.on('click', _open);

			$btnClose.on('click', _close);

			$(document).on('click', '.overlay--filter', _close);

			$(window).on('scroll', function () {
				var scroll = $(this).scrollTop();
				if (scroll > btnOpenOffset - 10) {
					$btnOpen.css({
						position: 'fixed',
						top: 10,
						bottom: 'auto',
						boxShadow: '0 5px 25px rgba(0,0,0,.2)'
					});
				} else {
					$btnOpen.removeAttr('style');
				}
			});

			function _open() {
				$filterSticky.addClass('is-open');
				$html.addClass('is-fixed');
				$overlay.addClass('is-active').addClass('overlay--filter');
			}

			function _close() {
				$filterSticky.removeClass('is-open');
				$html.removeClass('is-fixed');
				$overlay.removeClass('is-active');
			}
		},
		selectAll: function selectAll() {
			$('.js-select-all').on('click', function () {
				$(this).closest('.js-filter-content').find('.cs-checkbox').addClass('is-checked');
				$(this).closest('.js-filter-content').find('.cs-checkbox').find('input').prop('checked', true);
				return false;
			});
		}
	};
	Filter.init();

	//Catalog Item View Toggle
	$('.js-sorting-btn').on('click', function (e) {
		var sorting = $(this).data('sorting');

		$('.js-sorting-btn').removeClass('is-active');
		$(this).addClass('is-active');

		if (sorting == '2') {
			$('.js-products').addClass('layout-two-column');
		} else {
			$('.js-products').removeClass('layout-two-column');
		}

		setTimeout(function () {
			Base.setHeight();
		}, 300);
	});
})();

/**
 * Cart.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function () {
	//Sticky Block
	if ($('.js-cart-sticky').length && $(window).width() > 1024) {
		var sidebar = new StickySidebar('.js-cart-sticky', {
			topSpacing: 10,
			bottomSpacing: 10,
			containerSelector: '.cart__inner',
			innerWrapperSelector: '.cart__sum'
		});
	}
})();

/**
 * Lk.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function () {
	var lk = {
		init: function init() {
			this.tabs();
			this.stickyBlock();
			this.changePfofile();
		},
		stickyBlock: function stickyBlock() {
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
		changePfofile: function changePfofile() {
			$('.js-change-profile').on('click', function () {
				var profile = $(this).attr('data-profile');
				var tab = $('a[data-src="#new-profile"]');
				var index = $(this).data('tab-index');

				// tab.attr('href', '#' + profile)
				// 	.parent()
				// 	.trigger('click');

				// $('.tab__content').removeAttr('style');
				// $('#' + profile).css('display', 'block');

				$('.js-lk-tabs').tabs('option', 'active', index);

				$('a[href=#' + profile + ']').parent().removeClass('is-hidden');

				$.fancybox.close();
			});
		},
		tabs: function tabs() {
			$('.js-lk-tabs').tabs();
		}
	};
	lk.init();
})();

//Табы
function tabs(e) {
	var target = e.target;
	if (target.className == 'tab__title') {
		var dataTab = target.getAttribute('data-tab');
		var tabContent = document.querySelectorAll('.tab__content');
		var tabTitle = document.querySelectorAll('.tab__title');
		for (var i = 0; i < tabTitle.length; i++) {
			tabTitle[i].classList.remove('is-active');
		}
		target.classList.add('is-active');
		for (var i = 0; i < tabContent.length; i++) {
			if (dataTab == i) {
				tabContent[i].style.display = 'block';
			} else {
				tabContent[i].style.display = 'none';
			}
		}
	}
}

//tabs ---> accordeon
function tabTransform() {
	var tab = $('.js-tab--transform');

	$('.js-tab').addClass('js-cs-accordeon');
	tab.find('.tab__title').addClass('cs-accordeon__title').wrap('<div class="cs-accordeon__item">');

	tab.find('[data-tab-content="0"]').removeAttr('style').insertAfter('[data-tab="0"]');
	tab.find('[data-tab-content="1"]').insertAfter('[data-tab="1"]');
	tab.find('[data-tab-content="2"]').insertAfter('[data-tab="2"]');
	tab.find('[data-tab-content="3"]').insertAfter('[data-tab="3"]');
	tab.find('[data-tab-content="4"]').insertAfter('[data-tab="4"]');
	tab.find('[data-tab-content="5"]').insertAfter('[data-tab="5"]');
	tab.find('.tab__content').addClass('cs-accordeon__content');
	tab.find('.tab__contentes').remove();
}