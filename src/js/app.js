$(document).ready(function() {
    function contentPadding() {
        $('.content-wrapper')
            .not('.home')
            .css('padding-top', $('.header').outerHeight(true));
    }
    contentPadding();

    //First Screen Padding-Top
    $('.js-firstscreen').css('padding-top', $('.header').outerHeight(true));

    //Табы в поиске на главной
    if ($('.js-tab').length > 0 && $(window).width() > 768) {
        document.querySelector('.js-tab').addEventListener('click', tabs);
    }

    //Mobile menu subnav toggle
    $('.js-mobile-nav-sub--open').on('click', function() {
        $(this)
            .parent()
            .find('.mobile-nav--sub')
            .addClass('is-open');
    });

    $('.js-mobile-nav-sub--close').on('click', function() {
        $(this)
            .closest('.mobile-nav--sub')
            .removeClass('is-open');
    });

    //Slick Slider https://kenwheeler.github.io/slick/
    if (
        $('.js-cs-slider').length > 0 ||
        $('.js-cs-slider--card').length > 0 ||
        $('.js-cs-slider--news')
    ) {
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

        const $slider = $('.js-cs-slider--news');
        if ($(window).width() > 480) {
            $slider.on('init', () => {
                mouseWheel($slider);
            });
            function mouseWheel($slider) {
                $slider.on('wheel', { $slider: $slider }, mouseWheelHandler);
            }
        }
        $slider.slick({
            arrows: true,
            nextArrow: '.cs-slider__arrow--next',
            prevArrow: '.cs-slider__arrow--prev',
            // dots: false,
            autoplay: false,
            autoplaySpeed: 3000,
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: false,
            vertical: true,
            verticalSwiping: true
        });
        function mouseWheelHandler(event) {
            event.preventDefault();
            const $slider = event.data.$slider;
            const delta = event.originalEvent.deltaY;
            if (delta > 0) {
                $slider.slick('slickNext');
            } else {
                $slider.slick('slickPrev');
            }
        }

        $('.js-cs-slider--news')
            .find('.slick-slide')
            .first()
            .addClass('is-checked');
        $('.js-cs-slider--news')
            .find('.slick-slide')
            .on('click', function() {
                $('.js-cs-slider--news')
                    .find('.slick-slide')
                    .removeClass('is-checked');
                $(this).addClass('is-checked');
            });

        if ($(window).width() > 480) {
            $('.zoom')
                .wrap('<span style="display:inline-block"></span>')
                .css('display', 'block')
                .parent()
                .zoom();
        }
    }

    if ($('.js-filter-sticky').length > 0 && $(window).width() > 768) {
        var sidebar = new StickySidebar('.js-filter-sticky', {
            topSpacing: 80,
            bottomSpacing: 10,
            containerSelector: '.catalog__content',
            innerWrapperSelector: '.filter__inner'
        });
    }

    if ($('.js-sticky--news').length > 0 && $(window).width() > 768) {
        var sidebar = new StickySidebar('.js-sticky--news', {
            topSpacing: 120,
            bottomSpacing: 10,
            containerSelector: '.news__content',
            innerWrapperSelector: '.news__slider'
        });
    }

    if ($('.js-cart-sticky').length > 0 && $(window).width() > 1024) {
        var sidebar = new StickySidebar('.js-cart-sticky', {
            topSpacing: 80,
            bottomSpacing: 10,
            containerSelector: '.cart__inner',
            innerWrapperSelector: '.cart__sum'
        });
    }

    //Datepicker http://t1m0n.name/air-datepicker/docs/index-ru.html
    if ('.js-date'.length > 0) {
        $('.js-date').datepicker({
            dateFormat: 'dd.mm.yy',
            autoClose: true
        });
        $('.js-input-icon').click(function(event) {
            event.preventDefault();
            $(this)
                .parent()
                .find('.js-date')
                .focus();
        });
    }

    //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
    if ($('[data-fancybox]').length > 0) {
        $('[data-fancybox]').fancybox({
            baseClass: 'modal-window__wrap',
            touch: false,
            closeClickOutside: true,
            autoFocus: false,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    }

    //Custom Select https://select2.org/
    if ($('.js-select').length > 0) {
        $('.js-select').select2({
            container: '.cs-select__container'
        });
        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });

        $(document).click(function(event) {
            if (
                $(event.target).closest('.select2-dropdown, .select2-container')
                    .length
            )
                return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });

        $(document).on('focus', '.select2-search__field', function(e) {
            e.stopPropagation();
        });
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: '+7 (999) 999-99-99',
            showMaskOnHover: false
        });
    }

    //Click event to scroll to top
    $('.js-go-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > $(this).height()) {
            $('.js-go-top').addClass('is-visible');
        } else {
            $('.js-go-top').removeClass('is-visible');
        }
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function() {
        var elementClick = $(this).attr('href');
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 60 + 'px' }, 300);
        return false;
    });

    //Stop drag
    $('img').on('dragstart', function(event) {
        event.preventDefault();
    });

    $('.js-garanty-item--more').on('click', function() {
        $(this)
            .closest('.garanty-item')
            .find('.is-hidden')
            .removeClass('is-hidden');
        $(this).css('display', 'none');
    });

    $('.js-lk-nav')
        .find('.lk-nav__item')
        .on('click', function() {
            $('.js-lk-nav')
                .find('.lk-nav__item')
                .removeClass('is-active');
            $(this).addClass('is-active');
        });

    if ($(window).width() <= 768) {
        tabTransform();
    }

    /*
     * Header.js
     */
    //=include partials/header.js

    /*
     * Catalog.js
     */
    //=include partials/catalog.js

    /*
     * contacts.js
     */
    //=include partials/contacts.js

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
