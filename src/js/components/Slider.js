(function() {
	let $slider = $('.js-cs-slider');
	if ($slider.length) {
		$slider.each(function() {
			let $slides = $(this).find('.cs-slider__slides');
			let $slide;
			let $arrowPrev = $(this)
				.find('.cs-slider__arrow--prev')
				.hide();
			let $arrowNext = $(this)
				.find('.cs-slider__arrow--next')
				.hide();

			function sliderInit() {
				if ($(window).width() > 768) {
					$slide = $(this)
						.find('.cs-slider__slide')
						.not('.cs-slider__slide--link');
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

							responsive: [
								{
									breakpoint: 1025,
									settings: 'unslick'
								},
								{
									breakpoint: 769,
									settings: {
										slidesToShow: 3
									}
								},
								{
									breakpoint: 482,
									settings: {
										slidesToShow: 1
									}
								}
							]
						});
						setTimeout(() => {
							Base.setHeight();
							$('.news-slider .slick-slide').equalHeights();
						}, 100);
					}
				}
			}
			sliderInit();

			$(window).resize(function() {
				sliderInit();
			});
		});
	}

	let $sliderCatergory = $('.js-cs-slider--category');
	if ($sliderCatergory.length) {
		$sliderCatergory.each(function() {
			let $slides = $(this).find('.cs-slider__slides');
			let $slide = $(this).find('.cs-slider__slide');
			let $arrowPrev = $(this)
				.find('.cs-slider__arrow--prev')
				.hide();
			let $arrowNext = $(this)
				.find('.cs-slider__arrow--next')
				.hide();

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

						responsive: [
							{
								breakpoint: 769,
								settings: {
									slidesToShow: 5
								}
							},
							{
								breakpoint: 482,
								settings: 'unslick'
							}
						]
					});
				}
			}
			sliderInit();

			$(window).resize(function() {
				sliderInit();
			});
		});
	}

	let $sliderInfo = $('.js-cs-slider--info');
	if ($sliderInfo.length) {
		$sliderInfo.each(function() {
			let $slides = $(this).find('.cs-slider__slides');
			let $slide = $(this).find('.cs-slider__slide');
			let $arrowPrev = $(this)
				.find('.cs-slider__arrow--prev')
				.hide();
			let $arrowNext = $(this)
				.find('.cs-slider__arrow--next')
				.hide();

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

	let $sliderHero = $('.js-cs-slider--hero');
	if ($sliderHero.length) {
		$sliderHero.each(function() {
			let $slides = $(this).find('.cs-slider__slides');
			let $slide = $(this).find('.cs-slider__slide');
			let $arrowPrev = $(this)
				.find('.cs-slider__arrow--prev')
				.hide();
			let $arrowNext = $(this)
				.find('.cs-slider__arrow--next')
				.hide();

			if ($slide.length > 1) {
				$arrowPrev.css('display', 'flex');
				$arrowNext.css('display', 'flex');
				$slides
					.on('init', function(event, slick, currentSlide) {
						let slide = $(this).find('.slick-slide');
						console.log('---currentSlide', currentSlide);

						slide
							.eq(currentSlide + 1)
							.addClass('slick-slide--next');
						slide
							.eq(currentSlide + 2)
							.addClass('slick-slide--next-1');
					})
					.on('beforeChange', function(
						event,
						slick,
						currentSlide,
						nextSlide
					) {
						let slide = $(this).find('.slick-slide');

						slide.removeClass(
							'slick-slide--next slick-slide--next-1'
						);
						// use custom transition
						slide.eq(nextSlide + 1).addClass('slick-slide--next');
						slide.eq(nextSlide + 2).addClass('slick-slide--next-1');
					})
					.not('.slick-initialized')
					.slick({
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

						responsive: [
							{
								breakpoint: 482,
								settings: {
									adaptiveHeight: true
								}
							}
						]
					});
			}
		});
	}

	let $sliderCard = $('.js-cs-slider--card');
	if ($sliderCard.length) {
		$sliderCard.each(function() {
			let $slides = $(this).find('.cs-slider__slides');
			let $slide = $(this).find('.cs-slider__slide');
			let $arrowPrev = $(this)
				.find('.cs-slider__arrow--prev')
				.hide();
			let $arrowNext = $(this)
				.find('.cs-slider__arrow--next')
				.hide();

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

(function() {
	var next, prev, timeline;

	next = function() {
		return $('.hero-slider__slide:first-child')
			.fadeOut(400, 'swing', function() {
				return $('.hero-slider__slide:first-child')
					.appendTo('.hero-slider__slides')
					.hide();
			})
			.fadeIn(400, 'swing');
	};

	prev = function() {
		return $('.hero-slider__slide:first-child')
			.fadeOut(400, 'swing', function() {
				return $('.hero-slider__slide:last-child')
					.prependTo('.hero-slider__slides')
					.fadeIn(400, 'swing');
			})
			.fadeIn(400, 'swing');
	};

	// timeline = setInterval(next, 1200);

	// $('body').hover(function() {
	// 	return clearInterval(timeline);
	// });

	$('.hero-slider__slide').click(function() {
		return next();
	});

	$('.js-hero-slider-btn--prev').on('click', function() {
		prev();
	});

	$('.js-hero-slider-btn--next').on('click', function() {
		next();
	});

	$('.hero-slider__btn').on('click', function(e) {
		e.stopPropagation();
	});
}.call(this));
