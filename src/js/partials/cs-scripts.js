//Accordeon
$('.js-cs-accordeon')
	.find('.cs-accordeon__item')
	.find('.cs-accordeon__title')
	.on('click', function() {
		if (
			$(this)
				.parent()
				.hasClass('is-open')
		) {
			$(this)
				.parent()
				.removeClass('is-open')
				.find('.cs-accordeon__content')
				.slideUp();
		} else {
			$(this)
				.parent()
				.addClass('is-open')
				.find('.cs-accordeon__content')
				.slideDown();
		}
	});

//cs dropdown
if ($('.js-dropdown').length) {
	$(document)
		.on('click', '.js-dropdown', function() {
			if ($(this).hasClass('is-active')) {
				$(this).removeClass('is-active');
			} else {
				$('.js-dropdown').removeClass('is-active');
				$(this).addClass('is-active');
			}
		})
		.on('click', '.js-dropdown a', function(e) {
			e.stopPropagation();
		});
}

//cs checkbox
$('.js-cs-checkbox').on('click', function() {
	let _this = $(this);
	let input = _this.find('input');
	let $leftTitle = $(this).prev('.cs-checkbox__title');
	let $rightTitle = $(this).next('.cs-checkbox__title');
	let $notIpItem = $('.js-not-ip');
	let $input = $('.js-checkbox--box').find('.pedit__field');
	let $item = $('.js-checkbox--box').find('.pedit__item');

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

$(document).on('click', '.js-cs-radio--pseudo', function() {
	if ($(this).hasClass('is-checked')) {
		$(this).removeClass('is-checked');
	} else {
		$('.js-cs-radio--pseudo').removeClass('is-checked');
		$(this).addClass('is-checked');
	}
});
