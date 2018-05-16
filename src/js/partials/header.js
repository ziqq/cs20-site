//При скроле добавляем класс к хедеру
var lastScrollTop = 0;
$(window).scroll(function(event){
    var scroll = $(this).scrollTop();
    if (scroll > 0){   
        $('.header').addClass('is-fixed');
    } else {
        $('.header').removeClass('is-fixed');
    }
});

//Header hamburger
$('.js-nav-toggle').on('click', function() {
    if($(this).hasClass('is-open')){
        $(this).removeClass('is-open');
        $('.js-nav').fadeOut();
        $('html').removeAttr('style');
    }else{
        $(this).addClass('is-open');
        $('.js-nav').fadeIn();
        $('html').css('overflow', 'hidden');
    }
    return false;
});

//Очитска  инпута  по клику на кнопку
$('.js-home-search-clear').on('click', function(){
    $(this).parent().find('input[type="text"]').val('');
});

//Мобильное меню аккордеон вместо таабов
if ($(window).width() > 768) {
}else{
    $('.js-category-item-moveto').prependTo('.js-category-moveto');

    //Home Search < 768
    $('.js-tab').addClass('js-cs-accordeon');
    $('.js-tab--transform').find('.tab__title').addClass('cs-accordeon__title').wrap('<div class="cs-accordeon__item">');

    $('.js-tab--transform').find('.tab__content').each(function(e){
        console.log(e);
        // $(this).removeAttr('style').insertAfter($(this).closest('.js-tab--transform').find('[data-tab="' + e + ']'));
    });

    // $('.js-tab--transform').find('.tab__content--car').removeAttr('style').insertAfter('[data-tab="0"]');
    // $('.js-tab--transform').find('.tab__content--product').insertAfter('[data-tab="1"]');
    // $('.js-tab--transform').find('.tab__content--series').insertAfter('[data-tab="2"]');
    // $('.js-tab--transform').find('.tab__content--articul').insertAfter('[data-tab="3"]');
    $('.js-tab--transform').find('.tab__content').addClass('cs-accordeon__content');
    // $('.js-tab--transform').find('.tab__contentes').remove();

    $('.js-header-phone').insertAfter('.home-search');
}