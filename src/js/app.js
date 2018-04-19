$(document).ready(function () {

    if ($(window).width() > 768) {
    }else{
        $('.js-category-item-moveto').prependTo('.js-category-moveto');

        //Home Search < 768
        $('.js-home-search-tab').addClass('js-cs-accordeon');
        $('.js-home-search').find('.tab__title').addClass('cs-accordeon__title').wrap('<div class="cs-accordeon__item">');
        $('.js-home-search').find('.tab__content--car').insertAfter('[data-tab="0"]');
        $('.js-home-search').find('.tab__content--product').insertAfter('[data-tab="1"]');
        $('.js-home-search').find('.tab__content--series').insertAfter('[data-tab="2"]');
        $('.js-home-search').find('.tab__content--articul').insertAfter('[data-tab="3"]');
        $('.js-home-search').find('.tab__content').addClass('cs-accordeon__content');
        $('.js-home-search').find('.tab__contentes').remove();

        $('.js-header-phone').insertAfter('.home-search');
    }

    //First Screen Padding-Top
    $('.js-firstscreen').css('padding-top', $('.header').outerHeight(true));

    //Tabs Script
    if ( $('.js-home-search-tab').length > 0 && $(window).width() > 768) {
        document.querySelector('.js-home-search-tab').addEventListener('click', tabs);       
    }

    function tabs(e) {
        var target = e.target;
        if (target.className == 'tab__title') {
            var dataTab    = target.getAttribute('data-tab');
            var tabContent = document.querySelectorAll('.tab__content');
            var tabTitle   = document.querySelectorAll('.tab__title');
            for (var i = 0; i < tabTitle.length; i++) {
                tabTitle[i].classList.remove('is-active');
            }
            target.classList.add('is-active');
            for (var i = 0; i < tabContent.length; i++) {
                if (dataTab == i) {
                    tabContent[i].style.display = 'block';
                }else{
                    tabContent[i].style.display = 'none';
                }
            }
        }   
    }  

    //Clear Input Vall
    $('.js-home-search-clear').on('click', function(){
        $(this).parent().find('input[type="text"]').val('');
    });
    

    $(window).on("load",function(){
        //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll
        if($('.js-scroll').length > 0){
            $('.js-scroll').niceScroll({
                cursorcolor: '#e0e0e0',
                horizrailenabled: false,
                // autohidemode: false,
                boxzoom: false,
                "verge": "500",
                cursorwidth: '4px',
                cursorborder: 'none',
                cursorborderradius:'0'
            });
            $('.js-scroll').mouseover(function() {
                $(this).getNiceScroll().resize();
            });

        }        
    });

    //Slick Slider https://kenwheeler.github.io/slick/
    if($('.js-cs-slider').length > 0){
        $('.js-cs-slider').slick({
            nextArrow: '.cs-slider__arrow--next',
            prevArrow: '.cs-slider__arrow--prev',
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            autoplaySpeed: 5000,
            autoplay: true,
            dots: true
        });
    }

    //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
    if($('[data-fancybox]').length > 0){
        $('[data-fancybox]').fancybox({
            baseClass : 'bb-window__wrap',      
            // touch: false,
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
    if($('.js-select').length > 0 && $(window).width() > 320){
        $('.js-select').select2({
            placeholder: "Select a State",
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
    }else{
        // $('.js-select').wrap('<label class="bb-select">');
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if($('.js-phone-mask').length > 0){
        $('.js-phone-mask').inputmask({"mask": "+7 (999) 999-99-99"});        
    }

    //Toggle Menu Button
    $('.js-nav-toggle').on('click', function() {
        $(this).toggleClass('is-open');
        $('.js-nav').fadeToggle();
        return false;
    });

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
     * Catalog.js
     */

    //=include partials/catalog.js

    
    /*
     * cs-scripts.js
     */

    //=include partials/cs-scripts.js

});