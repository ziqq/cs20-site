(function() {
	let $stories = $('.js-stories');

	if ($stories.length) {
		$stories.each(function() {
			let $item = $(this).find('.storis__item');
			let $storiesSlider = $(this).find('.stories-slider');
			let _this = $(this);

			$item.on('click', function() {
				let id = $(this).data('stories-target');

				_this
					.find('[data-stories-slide=' + id + ']')
					.addClass('is-visible');

				checkInit(id);
			});

			function checkInit(id) {
				if (
					$(this)
						.find('.stories-slider[data-stories-slide=' + id + ']')
						.hasClass('is-visible')
				) {
					console.log('---', 'Slider INIT');
				}
			}

			function initSlider() {
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
									console.log(
										'--- currentSlide',
										currentSlide
									);
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
			}
		});
	}
})();
