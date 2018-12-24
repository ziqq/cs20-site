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

			if ($slide.length > 4 || $(window).width() <= 1024) {
				$arrowPrev.css('display', 'flex');
				$arrowNext.css('display', 'flex');
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
