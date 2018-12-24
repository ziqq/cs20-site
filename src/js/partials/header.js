//Очитска  инпута  по клику на кнопку
$('.js-home-search-clear').on('click', function() {
	$(this)
		.parent()
		.find('input[type="text"]')
		.val('');
});
