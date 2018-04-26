//Accordeon
$('.js-cs-accordeon').find('.cs-accordeon__item').find('.cs-accordeon__title').on('click', function(){
	if($(this).parent().hasClass('is-open')){
		$(this).parent().removeClass('is-open').find('.cs-accordeon__content').slideUp();
	}else{
		$(this).parent().addClass('is-open').find('.cs-accordeon__content').slideDown();
	} 
});

 //BB dropdown
 if($('.js-dropdown').length > 0){
 	$(document).on('click', '.js-dropdown', function (){
 		if($(this).hasClass('is-active')){
 			$(this).removeClass('is-active');
 		}else{
 			$('.js-dropdown').removeClass('is-active');
 			$(this).addClass('is-active');
 		}       
 	});
 	$(document).on('click', function(e) {
 		if ($(e.target).closest('.js-dropdown').length) return;
 		$('.js-dropdown').removeClass('is-active');
 		e.stopPropagation();
 	});
 }