//Accordeon
$('.js-cs-accordeon').find('.cs-accordeon__item').find('.cs-accordeon__title').on('click', function(){
    if($(this).parent().hasClass('is-open')){
        $(this).parent().removeClass('is-open').find('.cs-accordeon__content').css('display', 'none');
    }else{
        $(this).parent().addClass('is-open').find('.cs-accordeon__content').removeAttr('style');
    }   
});