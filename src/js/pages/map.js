/**
 * Map.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function() {
	let $mapFilter = $('.js-map-filter');
	let $selectCity = $('.js-select--city');
	let $btnMapOpen = $('.js-map--open');
	let $btnMapClose = $('.js-map--close');
	let $address = $('.js-map-address');
	let $btnBack = $('.js-map-address--back');
	let $overlay = $('.js-overlay');

	$btnMapOpen.on('click', function() {
		$mapFilter.addClass('is-visible');
		$overlay.addClass('is-visible');
	});

	$btnMapClose.on('click', function() {
		$mapFilter.removeClass('is-visible');
		$overlay.removeClass('is-visible').removeClass('overlay--map');
	});

	$('.overlay--map').on('click', function() {
		$mapFilter.removeClass('is-visible').removeClass('overlay--map');
	});

	$selectCity.on('select2:select', function() {
		$address.addClass('is-open');
	});

	$btnBack.on('click', function() {
		$address.removeClass('is-open');
	});
})();
