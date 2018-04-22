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
    $(this).toggleClass('is-open');
    $('.js-nav').fadeToggle();
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
    $('.js-home-search-tab').addClass('js-cs-accordeon');
    $('.js-home-search').find('.tab__title').addClass('cs-accordeon__title').wrap('<div class="cs-accordeon__item">');
    $('.js-home-search').find('.tab__content--car').removeAttr('style').insertAfter('[data-tab="0"]');
    $('.js-home-search').find('.tab__content--product').insertAfter('[data-tab="1"]');
    $('.js-home-search').find('.tab__content--series').insertAfter('[data-tab="2"]');
    $('.js-home-search').find('.tab__content--articul').insertAfter('[data-tab="3"]');
    $('.js-home-search').find('.tab__content').addClass('cs-accordeon__content');
    $('.js-home-search').find('.tab__contentes').remove();

    $('.js-header-phone').insertAfter('.home-search');
}