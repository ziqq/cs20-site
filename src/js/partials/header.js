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
}

//Mobile Search  
if ($('.js-search-input').length > 0) {
    var searchInput = $('.js-search-input');

    searchInput.on('keyup', function () {      
        var hint = $(this).closest('.js-search').find('.search__hint');  
        if ($(this).val() !== '') {
            hint.removeAttr('style');
        } else {
            hint.css('display', 'none');
        }
    });

    searchInput.on('focus', function() {
        if ($(this).val() !== '') {
            var hint = $(this).closest('.js-search').find('.search__hint'); 
            hint.removeAttr('style');
        } else {
            hint.css('display', 'none');
        }
    });

    searchInput.on('blur', function() {
        var hint = $(this).closest('.js-search').find('.search__hint'); 
        hint.css('display', 'none');
    });
} 