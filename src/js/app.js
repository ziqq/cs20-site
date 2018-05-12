$(document).ready(function () {

    function contentPadding(){
        $('.content-wrapper').not('.home').css('padding-top', $('.header').outerHeight(true));
    }contentPadding();
    

    //First Screen Padding-Top
    $('.js-firstscreen').css('padding-top', $('.header').outerHeight(true));

    //Табы в поиске на главной
    if ( $('.js-home-search-tab').length > 0 && $(window).width() > 768) {
        document.querySelector('.js-home-search-tab').addEventListener('click', tabs);       
    }

    //Mobile menu subnav toggle
    $('.js-mobile-nav-sub--open').on('click', function(){
        $(this).parent().find('.mobile-nav--sub').addClass('is-open');
    });

    $('.js-mobile-nav-sub--close').on('click', function(){
        $(this).closest('.mobile-nav--sub').removeClass('is-open');
    });

    //Input Focus
    if($('.js-input').length){
        $('.js-input').focus(function (){
            $(this).parent('.input').addClass('is-focus');
        }).blur(function(){
            if($(this).val() == ''){
                $(this).parent('.input').removeClass('is-focus');
            }
        });
    }

    //Slick Slider https://kenwheeler.github.io/slick/
    if($('.js-cs-slider').length > 0 || $('.js-cs-slider--card').length > 0){
        $('.js-cs-slider').slick({
            arrows: true,
            nextArrow: '.cs-slider__arrow--next',
            prevArrow: '.cs-slider__arrow--prev',
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
        });

        $('.js-cs-slider--card').slick({            
            arrows: true,
            nextArrow: '.cs-slider__arrow--next',
            prevArrow: '.cs-slider__arrow--prev',
            dots: true,
            autoplay: false,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
        });
        // $('.cs-slider__img').zoom();
        
        $('.zoom')
        .wrap('<span style="display:inline-block"></span>')
        .css('display', 'block')
        .parent()
        .zoom();
    }

    //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
    if($('[data-fancybox]').length > 0){
        $('[data-fancybox]').fancybox({
            baseClass : 'modal-window__wrap',      
            touch: false,
            closeClickOutside : true,
            autoFocus: false,
            helpers: {
                overlay:{
                    locked: false
                }
            }
        });
    }

    //Custom Select https://select2.org/
    if($('.js-select').length > 0){
        $('.js-select').select2({
            container: ".cs-select__container"
        });
        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });

        $(document).click(function(event) {
            if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });

        $(document).on("focus", '.select2-search__field', function(e) {
            e.stopPropagation();
        });
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if($('.js-phone-mask').length > 0){
        $('.js-phone-mask').inputmask({
            mask: "+7 (999) 999-99-99",
            showMaskOnHover: false
        });        
    }

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 60 + 'px' }, 300);
        return false; 
    });

    //Stop drag
    $("img").on("dragstart", function(event) { event.preventDefault(); });

    
    /*
     * Header.js
     */
      //=include partials/header.js


    /*
     * Catalog.js
     */
    //=include partials/catalog.js

    
    /*
     * Cart.js
     */
    //=include partials/cart.js

    
    /*
     * cs-scripts.js
     */
    //=include partials/cs-scripts.js

});


    /*
     * function
     */
      //=include partials/functions.js