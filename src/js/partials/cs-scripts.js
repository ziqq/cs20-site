//Accordeon
$('.js-cs-accordeon').find('.cs-accordeon__item').find('.cs-accordeon__title').on('click', function(){
	if($(this).parent().hasClass('is-open')){
		$(this).parent().removeClass('is-open').find('.cs-accordeon__content').slideUp();
	}else{
		$(this).parent().addClass('is-open').find('.cs-accordeon__content').slideDown();
	}   
});

 //BB dropdown
 if($('.js-cs-dropdown').length > 0){
 	$(document).on('click', '.js-cs-dropdown', function (){
 		if($(this).hasClass('is-active')){
 			$(this).removeClass('is-active');
 		}else{
 			$('.js-cs-dropdown').removeClass('is-active');
 			$(this).addClass('is-active');
 		}       
 	});
 	$(document).on('click', function(e) {
 		if ($(e.target).closest('.js-cs-dropdown').length) return;
 		$('.js-cs-dropdown').removeClass('is-active');
 		e.stopPropagation();
 	});
 }