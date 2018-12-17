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

			if ($(window).width() > 768) {
				$slide = $(this)
					.find('.cs-slider__slide')
					.not('.cs-slider__slide--link');
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

					responsive: [
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
				}, 100);
			}
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

					responsive: [
						{
							breakpoint: 769,
							settings: {
								slidesToShow: 5
							}
						},
						{
							breakpoint: 482,
							unslick: true
						}
					]
				});
			}
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

	let $sliderStories = $('.js-cs-slider--stories');
	if ($sliderStories.length) {
		$sliderStories.each(function() {
			let $slides = $(this).find('.cs-slider__slides');
			let $slide = $(this).find('.cs-slider__slide');
			let $dot = $(this).find('.slick-dots li');
			let $arrowPrev = $(this)
				.find('.cs-slider__arrow--prev')
				.hide();
			let $arrowNext = $(this)
				.find('.cs-slider__arrow--next')
				.hide();

			if ($slide.length > 1) {
				$arrowPrev.show();
				$arrowNext.show();

				$dot.addClass('is-empty');

				$(this).on('init', function() {
					$(this)
						.find('.slick-dots li')
						.addClass('is-empty');

					setTimeout(() => {
						$(this)
							.find('.slick-dots li')
							.first()
							.removeClass('is-empty');
					}, 300);
				});

				$slides
					.not('.slick-initialized')
					.slick({
						prevArrow: $arrowPrev,
						nextArrow: $arrowNext,
						arrows: true,
						infinite: false,
						dots: true,
						speed: 400,
						autoplay: false,
						autoplay: true,
						autoplaySpeed: 5000,
						slidesToShow: 1,
						slidesToScroll: 1
					})

					.on('beforeChange', function(
						event,
						slick,
						currentSlide,
						nextSlide
					) {
						$(this)
							.find('.slick-dots li')
							.eq(nextSlide)
							.removeClass('is-empty');
						$(this)
							.find('.slick-dots li')
							.eq(currentSlide)
							.removeClass('is-empty');
					})
					.on('afterChange', function(
						event,
						slick,
						currentSlide,
						nextSlide
					) {
						console.log('--- currentSlide', currentSlide);
						console.log('--- lenght', $slide.length);

						if (currentSlide == $slide.length - 1) {
							console.log('---', 'DONE');
							setTimeout(() => {
								$sliderStories
									.closest('.stories-container')
									.css('display', 'none');
							}, 5000);
						}
					});
			}
		});
	}
})();
