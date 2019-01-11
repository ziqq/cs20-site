'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * App.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

var Base = {
	init: function init() {
		this.scrollBar();
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
		$('img').on('dragstart', function (event) {
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
			$('.js-cs-card').each(function () {
				var $img = $(this).find('.cs-card__img');
				var $date = $(this).find('.cs-card__date');
				$img.insertAfter($date);
			});
		}

		$(window).resize(function () {
			Base.setHeight();
			Base.textOverflow();
		});
	},
	scrollBar: function scrollBar() {
		var scrollBar = $('.js-scroll');
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
			scrollBar.on('mouseover mousedown', function () {
				$(this).getNiceScroll().resize();
			});
		}
	},
	setHeight: function setHeight() {
		//Product title equalheight
		_heightses($('.js-product-title-equalheight'));
		_heightses($('.js-category-title-equalheight'));

		function _heightses(selector) {
			selector.equalHeights();
		}
	},
	textOverflow: function textOverflow() {
		$('.js-text-overflow').each(function () {
			var media = $(this).data('text-media');
			var size = $(this).data('text-overflow');
			var sizeNow = void 0;

			if (media) {
				if ($(window).width() > 480 && $(window).width() < 1200) {
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
	inputMask: function inputMask() {
		//Masked inputmask https://github.com/RobinHerbots/Inputmask
		if ($('.js-phone-mask').length) {
			$('.js-phone-mask').inputmask({
				mask: '+7 (999) 999-99-99',
				showMaskOnHover: false
			});
		}
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
	tooltip: function tooltip() {
		var $tooltip = $('.js-tooltip');
		var trigger = void 0;

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
	setFixedBlcok: function setFixedBlcok() {
		var $fixBlock = $('.js-fix-block');
		var fixBlockHeight = $fixBlock.outerHeight(true);
		var blockOffsetTop = $fixBlock.offset().top;
		var wHeight = $(window).height();

		$(window).scroll(function () {
			var scroll = $(this).scrollTop();

			if (scroll + wHeight - fixBlockHeight <= blockOffsetTop) {
				$fixBlock.addClass('is-fixed');
			} else {
				$fixBlock.removeClass('is-fixed');
			}
		});
	},
	showHideText: function showHideText() {
		var $textBlock = $('.js-text');
		var $textBtnShow = $('.js-text--show');
		var open = false;

		$textBtnShow.on('click', function () {
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
	addInCart: function addInCart() {
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
	},
	stopScroll: function stopScroll() {
		var $cartSum = $('.js-cart-sum');

		$cartSum.addClass('is-visible');

		function onScrollStopped(domElement, callback) {
			var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;

			domElement.addEventListener('scroll', function () {
				clearTimeout(callback.timeout);
				callback.timeout = setTimeout(callback, timeout);
			});
		}

		onScrollStopped(window, function () {
			setTimeout(function () {
				$cartSum.addClass('is-visible');
			}, 500);
		});

		$(window).on('scroll', function () {
			$cartSum.removeClass('is-visible');
		});
	},
	goTop: function goTop() {
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
	},
	goTo: function goTo() {
		//Click event to scroll to section whith id like href
		$('.js-goto').click(function () {
			var _this = $(this);
			var elementClick = $(this).attr('href');
			var destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination - 60 + 'px' }, 400);

			if (_this.hasClass('btn--filter')) {
				$('html, body').animate({ scrollTop: destination - 60 + 'px' }, 400, function () {
					_this.hide();
				});
			}

			return false;
		});
	},
	relativeBtn: function relativeBtn() {
		if ($(window).width() <= 768) {
			$(window).scroll(function () {
				var wHeight = $(window).height();
				var scroll = $(this).scrollTop();
				var $btn = $('.js-relative-btn');
				var $block = $('.js-relative-block');
				var blockOffset = $block.offset().top;
				var blockHeight = $block.height();

				if (scroll + wHeight < blockOffset + blockHeight) {
					$btn.css('display', 'block');
					console.log('---', '1');
				} else {
					$btn.css('display', 'none');
					console.log('---', '2');
				}
			});
		}
	},
	moveBlocks: function moveBlocks() {
		var $imageBlock = $('.js-block-image');

		function imageBlockMove() {
			if ($imageBlock.length) {
				$imageBlock.each(function () {
					var $image = $(this).find('.block-image__img');
					var $desc = $(this).find('.block-image__desc');
					var $title = $(this).find('.block-image__title');
					var $text = $(this).find('.block-image__text');
					var $subTitle = $(this).find('.block-image__subtitle');
					var $subText = $(this).find('.block-image__subtext');

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

		$(window).on('resize', function () {
			imageBlockMove();
		});
	}
};

$(function () {
	Base.init();

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

	(function () {
		$('.js-select--box').each(function () {
			var $selectCountry = $(this).find('.js-select--country');
			var $selectRegion = $(this).find('.js-select--region');
			var $selectCity = $(this).find('.js-select--city');

			$selectCountry.on('select2:select', function () {
				_enabled($selectRegion);
			});
			$selectRegion.on('select2:select', function () {
				_enabled($selectCity);
			});

			function _enabled(el) {
				el.removeAttr('disabled');
			}
		});

		$('.js-select--country, .js-select--region, .js-select--city').select2();
	})();

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

				function sliderInit() {
					if ($(window).width() > 768) {
						$slide = $(this).find('.cs-slider__slide').not('.cs-slider__slide--link');
					} else {
						$slide = $(this).find('.cs-slider__slide');
					}

					if ($slide.length > 4 || $(window).width() < 1024) {
						$arrowPrev.css('display', 'flex');
						$arrowNext.css('display', 'flex');
						if (!$slides.hasClass('slick-initialized')) {
							$slides.slick({
								prevArrow: $arrowPrev,
								nextArrow: $arrowNext,
								speed: 300,
								slidesToShow: 4,
								slidesToScroll: 1,
								infinite: false,
								arrows: true,
								dots: true,

								responsive: [{
									breakpoint: 1025,
									settings: 'unslick'
								}, {
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
								$('.news-slider .slick-slide').equalHeights();
							}, 100);
						}
					}
				}
				sliderInit();

				$(window).resize(function () {
					sliderInit();
				});
			});
		}

		var $sliderCatergory = $('.js-cs-slider--category');
		if ($sliderCatergory.length) {
			$sliderCatergory.each(function () {
				var $slides = $(this).find('.cs-slider__slides');
				var $slide = $(this).find('.cs-slider__slide');
				var $arrowPrev = $(this).find('.cs-slider__arrow--prev').hide();
				var $arrowNext = $(this).find('.cs-slider__arrow--next').hide();

				function sliderInit() {
					if ($slide.length > 7 && $(window).width() > 480) {
						$arrowPrev.css('display', 'flex');
						$arrowNext.css('display', 'flex');
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
								settings: 'unslick'
							}]
						});
					}
				}
				sliderInit();

				$(window).resize(function () {
					sliderInit();
				});
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
					$arrowPrev.css('display', 'flex');
					$arrowNext.css('display', 'flex');
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
					$arrowPrev.css('display', 'flex');
					$arrowNext.css('display', 'flex');
					$slides.on('init', function (event, slick, currentSlide) {
						var slide = $(this).find('.slick-slide');
						console.log('---currentSlide', currentSlide);

						slide.eq(currentSlide + 1).addClass('slick-slide--next');
						slide.eq(currentSlide + 2).addClass('slick-slide--next-1');
					}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
						var slide = $(this).find('.slick-slide');

						slide.removeClass('slick-slide--next slick-slide--next-1');
						// use custom transition
						slide.eq(nextSlide + 1).addClass('slick-slide--next');
						slide.eq(nextSlide + 2).addClass('slick-slide--next-1');
					}).not('.slick-initialized').slick({
						prevArrow: $arrowPrev,
						nextArrow: $arrowNext,
						speed: 1000,
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
						dots: true,
						// infinite: false,
						// fade: true,
						// vertical: true,
						// adaptiveHeight: true,
						infinite: true,

						responsive: [{
							breakpoint: 482,
							settings: {
								adaptiveHeight: true
							}
						}]
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
					$arrowPrev.css('display', 'flex');
					$arrowNext.css('display', 'flex');
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
		var next, prev, timeline;

		next = function next() {
			return $('.hero-slider__slide:first-child').fadeOut(400, 'swing', function () {
				return $('.hero-slider__slide:first-child').appendTo('.hero-slider__slides').hide();
			}).fadeIn(400, 'swing');
		};

		prev = function prev() {
			return $('.hero-slider__slide:first-child').fadeOut(400, 'swing', function () {
				return $('.hero-slider__slide:last-child').prependTo('.hero-slider__slides').fadeIn(400, 'swing');
			}).fadeIn(400, 'swing');
		};

		// timeline = setInterval(next, 1200);

		// $('body').hover(function() {
		// 	return clearInterval(timeline);
		// });

		$('.hero-slider__slide').click(function () {
			return next();
		});

		$('.js-hero-slider-btn--prev').on('click', function () {
			prev();
		});

		$('.js-hero-slider-btn--next').on('click', function () {
			next();
		});

		$('.hero-slider__btn').on('click', function (e) {
			e.stopPropagation();
		});
	}).call(this);

	(function () {
		var $stories = $('.js-stories');

		if ($stories.length) {
			$stories.each(function () {
				var $item = $(this).find('.storis__item');
				var $storiesSlider = $(this).find('.stories-slider');
				var _this = $(this);

				$item.on('click', function () {
					var id = $(this).data('stories-target');

					_this.find('[data-stories-slide=' + id + ']').addClass('is-visible');

					checkInit(id);
				});

				function checkInit(id) {
					if ($(this).find('.stories-slider[data-stories-slide=' + id + ']').hasClass('is-visible')) {
						console.log('---', 'Slider INIT');
					}
				}

				function initSlider() {
					var $sliderStories = $('.js-cs-slider--stories');
					if ($sliderStories.length) {
						$sliderStories.each(function () {
							var $slides = $(this).find('.cs-slider__slides');
							var $slide = $(this).find('.cs-slider__slide');
							var $dot = $(this).find('.slick-dots li');
							var $arrowPrev = $(this).find('.cs-slider__arrow--prev').hide();
							var $arrowNext = $(this).find('.cs-slider__arrow--next').hide();

							if ($slide.length > 1) {
								var _$slides$not$slick;

								$arrowPrev.show();
								$arrowNext.show();

								$dot.addClass('is-empty');

								$(this).on('init', function () {
									var _this2 = this;

									$(this).find('.slick-dots li').addClass('is-empty');

									setTimeout(function () {
										$(_this2).find('.slick-dots li').first().removeClass('is-empty');
									}, 300);
								});

								$slides.not('.slick-initialized').slick((_$slides$not$slick = {
									prevArrow: $arrowPrev,
									nextArrow: $arrowNext,
									arrows: true,
									infinite: false,
									dots: true,
									speed: 400,
									autoplay: false
								}, _defineProperty(_$slides$not$slick, 'autoplay', true), _defineProperty(_$slides$not$slick, 'autoplaySpeed', 5000), _defineProperty(_$slides$not$slick, 'slidesToShow', 1), _defineProperty(_$slides$not$slick, 'slidesToScroll', 1), _$slides$not$slick)).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
									$(this).find('.slick-dots li').eq(nextSlide).removeClass('is-empty');
									$(this).find('.slick-dots li').eq(currentSlide).removeClass('is-empty');
								}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
									console.log('--- currentSlide', currentSlide);
									console.log('--- lenght', $slide.length);

									if (currentSlide == $slide.length - 1) {
										console.log('---', 'DONE');
										setTimeout(function () {
											$sliderStories.closest('.stories-container').css('display', 'none');
										}, 5000);
									}
								});
							}
						});
					}
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
	$('.js-cs-checkbox').on('click', function () {
		var _this = $(this);
		var input = _this.find('input');
		var $leftTitle = $(this).prev('.cs-checkbox__title');
		var $rightTitle = $(this).next('.cs-checkbox__title');
		var $notIpItem = $('.js-not-ip');
		var $input = $('.js-checkbox--box').find('.pedit__field');
		var $item = $('.js-checkbox--box').find('.pedit__item');

		if (input.is(':checked')) {
			_this.removeClass('is-checked');
			input.prop('checked', false);
			$leftTitle.addClass('is-checked');
			$rightTitle.removeClass('is-checked');
			$notIpItem.show();
		} else {
			_this.addClass('is-checked');
			input.prop('checked', true);
			$rightTitle.addClass('is-checked');
			$leftTitle.removeClass('is-checked');
			$notIpItem.hide();
		}
	});

	$('.js-cs-radio--pseudo').on('click', function () {
		var id = $(this).data('info-delivery');

		$('.js-cs-radio--pseudo').not($(this)).removeClass('is-checked');
		$(this).addClass('is-checked');

		$('[data-info-delivery-text]').hide();
		$('[data-info-delivery-text=' + id + ']').show();
	});
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
			var $btnFixed = $('.js-btn-fixed');
			var $btnOpen = $('.js-filter--open');
			var btnOpenOffset = $btnFixed.offset().top;
			var $btnClose = $('.js-filter--close');

			$btnOpen.on('click', _open);

			$btnClose.on('click', _close);

			$(document).on('click', '.overlay--filter', _close);

			$(window).scroll(function () {
				var scroll = $(this).scrollTop();

				if (scroll - 50 > btnOpenOffset) {
					$btnFixed.css({
						position: 'fixed',
						top: 10,
						bottom: 'auto',
						boxShadow: '0 5px 25px rgba(0,0,0,.2)'
					});
				} else {
					$btnFixed.removeAttr('style');
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

	// $('.product-item').each(function() {
	// 	if ($(window).width() <= 480 && $(this).width() < 265) {
	// 		$(this)
	// 			.find('.js-text-overflow')
	// 			.attr('data-text-overflow', 35);
	// 	} else {
	// 		$(this)
	// 			.find('.js-text-overflow')
	// 			.attr('data-text-overflow', 45);
	// 	}
	// });

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

	if ($(window).width() < 375) {
		$('.js-sorting-btn').removeClass('is-active').last().addClass('is-active');
		$('.js-products').addClass('layout-two-column');
	}
})();

/**
 * Card.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function () {
	var $tab = $('.js-card-tabs');

	if ($(window).width() > 480) {
		$tab.tabs();
	} else {
		if ($tab.hasClass('ui-tabs')) {
			$tab.tabs('destroy');
		}

		$('.js-card-tabs .tab__title').each(function () {
			var titleId = $(this).find('a').attr('href').slice(1);

			var contentId = $(this).closest('.js-card-tabs').find('.tab__content').attr('id');

			if (contentId === titleId) {}
		});

		$('.js-card-tabs').find('.tab__content').each(function () {
			var contentId = $(this).attr('id');
			var titleId = void 0;

			$(this).closest('.js-card-tabs').find('.tab__title a').each(function () {
				titleId = $(this).attr('href').slice(1);
			});

			console.log('--- contentId', contentId);
			console.log('--- titleId', titleId);

			if (contentId === titleId) {}
		});
	}
})();

/**
 * Cart.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function () {
	//Sticky Block
	if ($('.js-cart-sticky').length && $(window).width() >= 1024) {
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
			this.stickyBlock();

			if ($(window).width() <= 480) {
				this.toggleContent();
				this.orderSetHeight();
			}
		},
		stickyBlock: function stickyBlock() {
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
		toggleContent: function toggleContent() {
			var $wrapper = $('.content-wrapper.lk');
			var $btnClose = $('.js-lk-content--close');
			var $lkContent = $('.js-lk-content');
			var $lkBox = $('.js-lk-box');
			var boxHeight = $lkBox.outerHeight(true);
			var $lkNav = $('.js-lk-nav');
			var $lkNavLink = $lkNav.find('.lk-nav__link');
			var timeOut = 200;
			var offset = 20;
			var thisPage = true;

			console.log('---', boxHeight);

			$wrapper.addClass('content-is-visible').css('min-height', boxHeight);
			setTimeout(function () {
				$lkContent.addClass('has-animation');
			}, timeOut);

			$lkNavLink.each(function () {
				if ($lkBox.data('page') === $(this).data('page-target')) {
					$(this).on('click', function (e) {
						$lkContent.addClass('has-animation');

						setTimeout(function () {
							$wrapper.addClass('content-is-visible').css('min-height', boxHeight);
						}, timeOut);

						e.preventDefault();
					});
				}
			});

			$btnClose.on('click', function () {
				$wrapper.removeClass('content-is-visible').removeAttr('style');

				setTimeout(function () {
					$lkContent.removeClass('has-animation');
				}, timeOut);
			});
		},
		orderSetHeight: function orderSetHeight() {
			var $wrapper = $('.content-wrapper.lk');
			var wrapperHeight = void 0;

			$('.js-order-item').each(function () {
				var $parent = $(this).closest('.js-lk-box');
				var height = void 0;

				$(this).on('click', function () {
					var _this3 = this;

					if ($(this).hasClass('is-open')) {
						wrapperHeight = $wrapper.outerHeight(true);

						console.log('--- wrapperHeight first', wrapperHeight);

						setTimeout(function () {
							height = $(_this3).outerHeight(true);
							$wrapper.animate({ 'min-height': wrapperHeight + height }, 300);
						}, 300);
					} else {
						wrapperHeight = $parent.outerHeight(true);
						height = $(this).height();

						console.log('--- $parent', $parent);
						console.log('--- wrapperHeight else', wrapperHeight);
						console.log('--- height else', height);
						console.log('--- result else', wrapperHeight - height);

						setTimeout(function () {
							$wrapper.animate({ 'min-height': wrapperHeight - height / 1.15 }, 300);
						}, 300);
					}
				});
			});
		}
	};
	lk.init();
})();

/**
 * Map.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function () {
	var $mapFilter = $('.js-map-filter');
	var $selectCity = $('.js-select--city');
	var $btnMapOpen = $('.js-map--open');
	var $btnMapClose = $('.js-map--close');
	var $address = $('.js-map-address');
	var $btnBack = $('.js-map-address--back');
	var $overlay = $('.js-overlay');

	$btnMapOpen.on('click', function () {
		$mapFilter.addClass('is-visible');
		$overlay.addClass('is-visible');
	});

	$btnMapClose.on('click', function () {
		$mapFilter.removeClass('is-visible');
		$overlay.removeClass('is-visible').removeClass('overlay--map');
	});

	$('.overlay--map').on('click', function () {
		$mapFilter.removeClass('is-visible').removeClass('overlay--map');
	});

	$selectCity.on('select2:select', function () {
		$address.addClass('is-open');
	});

	$btnBack.on('click', function () {
		$address.removeClass('is-open');
	});
})();