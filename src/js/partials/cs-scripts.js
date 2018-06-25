//Accordeon
$('.js-cs-accordeon').find('.cs-accordeon__item').find('.cs-accordeon__title').on('click', function(){
	if($(this).parent().hasClass('is-open')){
		$(this).parent().removeClass('is-open').find('.cs-accordeon__content').slideUp();
	}else{
		$(this).parent().addClass('is-open').find('.cs-accordeon__content').slideDown();
	} 
});

 //cs dropdown
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

//cs checkbox
$(document).on('click', '.js-cs-checkbox', function (){
    var _this = $(this);
    var input = _this.find('input');
    if(input.is(':checked')){
        _this.removeClass('is-checked');
        input.prop("checked", false);
    }else{
        _this.addClass('is-checked');
        input.prop("checked", true);
    }
});

$(document).on('click', '.js-cs-radio--pseudo', function (){
    if($(this).hasClass('is-checked')){
        $(this).removeClass('is-checked');
    }else{
        $('.js-cs-radio--pseudo').removeClass('is-checked');
        $(this).addClass('is-checked');
    }
});