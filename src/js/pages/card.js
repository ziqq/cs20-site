/**
 * Card.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function() {
	// let $cardTitle = $('.card__title');
	let $cardInfo = $('.card-info');
	//Move block in divece
	if ($(window).width() <= 768) {
		// $cardTitle.insertBefore('.card__inner');
		$cardInfo.insertAfter('.card__inner');
	}

	if ($(window).width() > 480) {
		$('.js-card-tabs').tabs();
	} else {
		let open = false;
		$('.js-card-tabs .tab__title').each(function() {
			let id = $(this)
				.find('a')
				.attr('href')
				.slice(1);

			$(this)
				.closest('.js-card-tabs')
				.find('.tab__content')
				.filter('#' + id)
				.appendTo($(this));
		});

		$('.js-card-tabs .tab__title a').on('click', function(e) {
			let id = $(this)
				.attr('href')
				.slice(1);

			$(this)
				.closest('.js-card-tabs')
				.find('.tab__content')
				.not('#' + id)
				.slideUp();

			$(this)
				.closest('.js-card-tabs')
				.find('.tab__content')
				.filter('#' + id)
				.slideToggle();

			e.preventDefault();
		});
	}
})();
