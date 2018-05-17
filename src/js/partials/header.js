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

    $('.js-header-phone').insertAfter('.home-search');

    //Home Search < 768

    // $('.js-tab--transform').find('.tab__content').each(function(e){
    //     $(this).slideUp();
    //     // $(this).removeAttr('style').insertAfter($(this).closest('.js-tab--transform').find('[data-tab="' + e + ']'));
    // });

    function tabTransform(){
        var tab = $('.js-tab--transform');

        $('.js-tab').addClass('js-cs-accordeon');
        tab.find('.tab__title').addClass('cs-accordeon__title').wrap('<div class="cs-accordeon__item">');

        tab.find('[data-tab-content="0"]').removeAttr('style').insertAfter('[data-tab="0"]');
        tab.find('[data-tab-content="1"]').insertAfter('[data-tab="1"]');
        tab.find('[data-tab-content="2"]').insertAfter('[data-tab="2"]');
        tab.find('[data-tab-content="3"]').insertAfter('[data-tab="3"]');
        tab.find('[data-tab-content="4"]').insertAfter('[data-tab="4"]');
        tab.find('[data-tab-content="5"]').insertAfter('[data-tab="5"]');
        tab.find('.tab__content').addClass('cs-accordeon__content');
        tab.find('.tab__contentes').remove();

    }tabTransform();
}