/**
 * Card.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function() {
	let $tab = $('.js-card-tabs');

	if ($(window).width() > 480) {
		$tab.tabs();
	} else {
		if ($tab.hasClass('ui-tabs')) {
			$tab.tabs('destroy');
		}

		$('.js-card-tabs .tab__title').each(function() {
			let titleId = $(this)
				.find('a')
				.attr('href')
				.slice(1);

			let contentId = $(this)
				.closest('.js-card-tabs')
				.find('.tab__content')
				.attr('id');

			if (contentId === titleId) {
			}
		});

		$('.js-card-tabs')
			.find('.tab__content')
			.each(function() {
				let contentId = $(this).attr('id');
				let titleId;

				$(this)
					.closest('.js-card-tabs')
					.find('.tab__title a')
					.each(function() {
						titleId = $(this)
							.attr('href')
							.slice(1);
					});

				if (contentId === titleId) {
				}
			});
	}
})();
