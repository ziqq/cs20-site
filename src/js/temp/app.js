'use strict';

$(document).ready(function () {

    function contentPadding() {
        $('.content-wrapper').not('.home').css('padding-top', $('.header').outerHeight(true));
    }contentPadding();

    //First Screen Padding-Top
    $('.js-firstscreen').css('padding-top', $('.header').outerHeight(true));

    //Табы в поиске на главной
    if ($('.js-tab').length > 0 && $(window).width() > 768) {
        document.querySelector('.js-tab').addEventListener('click', tabs);
    }

    //Mobile menu subnav toggle
    $('.js-mobile-nav-sub--open').on('click', function () {
        $(this).parent().find('.mobile-nav--sub').addClass('is-open');
    });

    $('.js-mobile-nav-sub--close').on('click', function () {
        $(this).closest('.mobile-nav--sub').removeClass('is-open');
    });

    //Slick Slider https://kenwheeler.github.io/slick/
    if ($('.js-cs-slider').length > 0 || $('.js-cs-slider--card').length > 0 || $('.js-cs-slider--news')) {
        var mouseWheel = function mouseWheel($slider) {
            $('.js-cs-slider--news').on('wheel', { $slider: $slider }, mouseWheelHandler);
        };

        var mouseWheelHandler = function mouseWheelHandler(event) {
            event.preventDefault();
            var $slider = event.data.$slider;
            var delta = event.originalEvent.deltaY;
            if (delta > 0) {
                $slider.slick('slickNext');
            } else {
                $slider.slick('slickPrev');
            }
        };

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

        var $slider = $(".js-cs-slider--news");
        $slider.on('init', function () {
            mouseWheel($slider);
        }).slick({
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


        $('.js-cs-slider--news').find('.slick-slide').first().addClass('is-checked');
        $('.js-cs-slider--news').find('.slick-slide').on('click', function () {
            $('.js-cs-slider--news').find('.slick-slide').removeClass('is-checked');
            $(this).addClass('is-checked');
        });

        $('.zoom').wrap('<span style="display:inline-block"></span>').css('display', 'block').parent().zoom();
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
        $('.js-input-icon').click(function (event) {
            event.preventDefault();
            $(this).parent().find('.js-date').focus();
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
            container: ".cs-select__container"
        });
        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });

        $(document).click(function (event) {
            if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });

        $(document).on("focus", '.select2-search__field', function (e) {
            e.stopPropagation();
        });
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if ($('.js-phone-mask').length > 0) {
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
    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.js-go-top').addClass('is-visible');
        } else {
            $('.js-go-top').removeClass('is-visible');
        }
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 60 + 'px' }, 300);
        return false;
    });

    //Stop drag
    $("img").on("dragstart", function (event) {
        event.preventDefault();
    });

    $('.js-garanty-item--more').on('click', function () {
        $(this).closest('.garanty-item').find('.is-hidden').removeClass('is-hidden');
        $(this).css('display', 'none');
    });

    $('.js-lk-nav').find('.lk-nav__item').on('click', function () {
        $('.js-lk-nav').find('.lk-nav__item').removeClass('is-active');
        $(this).addClass('is-active');
    });

    if ($(window).width() <= 768) {
        tabTransform();
    }

    /*
     * Header.js
     */
    //При скроле добавляем класс к хедеру
    var lastScrollTop = 0;
    $(window).scroll(function (event) {
        var scroll = $(this).scrollTop();
        if (scroll > 0) {
            $('.header').addClass('is-fixed');
        } else {
            $('.header').removeClass('is-fixed');
        }
    });

    //Header hamburger
    $('.js-nav-toggle').on('click', function () {
        if ($(this).hasClass('is-open')) {
            $(this).removeClass('is-open');
            $('.js-nav').fadeOut();
            $('html').removeAttr('style');
        } else {
            $(this).addClass('is-open');
            $('.js-nav').fadeIn();
            $('html').css('overflow', 'hidden');
        }
        return false;
    });

    //Очитска  инпута  по клику на кнопку
    $('.js-home-search-clear').on('click', function () {
        $(this).parent().find('input[type="text"]').val('');
    });

    //Мобильное меню аккордеон вместо таабов
    if ($(window).width() > 768) {} else {
        $('.js-category-item-moveto').prependTo('.js-category-moveto');

        $('.js-header-phone').insertAfter('.home-search');
    }

    /*
     * Catalog.js
     */
    //Catalog Item View Toggle
    $('.js-sorting-btn').on('click', function () {
        $('.js-sorting-btn').removeClass('is-active');
        $(this).addClass('is-active');
    });

    $('.js-sorting-btn--list').on('click', function () {
        $('.js-products').find('.product-item').addClass('product-item--wide');
    });
    $('.js-sorting--btn--tile').on('click', function () {
        $('.js-products').find('.product-item').removeClass('product-item--wide');
    });

    //Filter Open Btn
    $('.js-filter--open').on('click', function () {
        $('.js-filter-sticky').addClass('is-open');
        $('html').css('overflow', 'hidden');
        $('.overlay').css('display', 'block');
    });
    //Filter Close Btn
    $('.js-filter--close').on('click', function () {
        $('.js-filter-sticky').removeClass('is-open');
        $('html').removeAttr('style');
        $('.overlay').removeAttr('style');
    });

    //Filter Select All
    $(document).on('click', '.js-cs-checkbox--pseudo', function () {
        if ($(this).hasClass('is-checked')) {
            $(this).removeClass('is-checked');
        } else {
            $('.js-cs-checkbox--pseudo').removeClass('is-checked');
            $(this).addClass('is-checked');
        }
        return false;
    });

    $('.js-select-all').on('click', function () {
        $(this).closest('.js-filter-content').find('.cs-checkbox').addClass('is-checked');
        $(this).closest('.js-filter-content').find('.cs-checkbox').find('input').prop("checked", true);
        return false;
    });

    //По клику в не блока скрываем его  
    $(document).click(function (event) {
        if ($(event.target).closest('.js-filter-sticky, .js-filter--open').length) return;
        event.stopPropagation();
        $('.js-filter-sticky').removeClass('is-open');
        $('html').removeAttr('style');
        $('.overlay').removeAttr('style');
    });

    if ($('#js-filter-slider').length > 0) {

        var slider = document.getElementById('js-filter-slider');
        var allPriceStart = $('#js-filter-slider').data('start');
        var allPriceEnd = $('#js-filter-slider').data('end');
        var spans = [$('#jsPriceStart'), $('#jsPriceEnd')];
        var startPrice;
        var endPrice;
        var arrParams;
        var sUrl;

        if (spans[0].text() == '') {
            startPrice = allPriceStart;
        } else {
            startPrice = parseInt(spans[0].text());
        }

        if (spans[1].text() == '') {
            endPrice = allPriceEnd;
        } else {
            endPrice = parseInt(spans[1].text());
        }

        noUiSlider.create(slider, {
            start: [startPrice, endPrice],
            connect: true,
            range: {
                'min': allPriceStart,
                'max': allPriceEnd
            }
        });
        slider.noUiSlider.on('update', function (values, handle) {
            spans[handle].text(parseInt(values[handle]));
        });
    }

    /*
     * contacts.js
     */
    if ($('.js-contacts').length > 0 && $(window).width() <= 768 && $(window).width() > 480) {
        var contactsOwner = $('.js-contacts').find('.contacts-owner');
        var contactsRightBlock = $('.js-contacts').find('.contacts__right');

        contactsOwner.appendTo(contactsRightBlock);
    } else if ($('.js-contacts').length > 0 && $(window).width() <= 480) {
        var contactsItemFirst = $('.js-contacts').find('.contacts-item').first();
        var contactsMap = $('.js-contacts').find('.contacts__map').first();

        contactsMap.appendTo(contactsItemFirst);
    }

    /*
     * Cart.js
     */
    $('.js-counter--minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.js-counter--plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    //Cart Items make in a column at ww <= 480
    $(window).resize(productTransform);
    function productTransform() {
        if ($(window).width() <= 480) {
            $('.js-cart-items').find('.product-item').removeClass('product-item--wide');
        } else {
            $('.js-cart-items').find('.product-item').addClass('product-item--wide');
        }
    }productTransform();

    /*
     * cs-scripts.js
     */
    //Accordeon
    $('.js-cs-accordeon').find('.cs-accordeon__item').find('.cs-accordeon__title').on('click', function () {
        if ($(this).parent().hasClass('is-open')) {
            $(this).parent().removeClass('is-open').find('.cs-accordeon__content').slideUp();
        } else {
            $(this).parent().addClass('is-open').find('.cs-accordeon__content').slideDown();
        }
    });

    //cs dropdown
    if ($('.js-dropdown').length > 0) {
        $(document).on('click', '.js-dropdown', function () {
            if ($(this).hasClass('is-active')) {
                $(this).removeClass('is-active');
            } else {
                $('.js-dropdown').removeClass('is-active');
                $(this).addClass('is-active');
            }
        });
        $(document).on('click', function (e) {
            if ($(e.target).closest('.js-dropdown').length) return;
            $('.js-dropdown').removeClass('is-active');
            e.stopPropagation();
        });
    }

    //cs checkbox
    $(document).on('click', '.js-cs-checkbox', function () {
        var _this = $(this);
        var input = _this.find('input');
        if (input.is(':checked')) {
            _this.removeClass('is-checked');
            input.prop("checked", false);
        } else {
            _this.addClass('is-checked');
            input.prop("checked", true);
        }
    });

    $(document).on('click', '.js-cs-radio--pseudo', function () {
        if ($(this).hasClass('is-checked')) {
            $(this).removeClass('is-checked');
        } else {
            $('.js-cs-radio--pseudo').removeClass('is-checked');
            $(this).addClass('is-checked');
        }
    });
});

/*
 * function
 */
//Табы
function tabs(e) {
    var target = e.target;
    if (target.className == 'tab__title') {
        var dataTab = target.getAttribute('data-tab');
        var tabContent = document.querySelectorAll('.tab__content');
        var tabTitle = document.querySelectorAll('.tab__title');
        for (var i = 0; i < tabTitle.length; i++) {
            tabTitle[i].classList.remove('is-active');
        }
        target.classList.add('is-active');
        for (var i = 0; i < tabContent.length; i++) {
            if (dataTab == i) {
                tabContent[i].style.display = 'block';
            } else {
                tabContent[i].style.display = 'none';
            }
        }
    }
}

//tabs ---> accordeon
function tabTransform() {
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
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNvbnRlbnRQYWRkaW5nIiwibm90IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJ3aWR0aCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwidGFicyIsIm9uIiwicGFyZW50IiwiZmluZCIsImFkZENsYXNzIiwiY2xvc2VzdCIsInJlbW92ZUNsYXNzIiwibW91c2VXaGVlbCIsIiRzbGlkZXIiLCJtb3VzZVdoZWVsSGFuZGxlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJkYXRhIiwiZGVsdGEiLCJvcmlnaW5hbEV2ZW50IiwiZGVsdGFZIiwic2xpY2siLCJhcnJvd3MiLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJkb3RzIiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJpbmZpbml0ZSIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwiZmlyc3QiLCJ3cmFwIiwiem9vbSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJjbGljayIsImZvY3VzIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJ0b3VjaCIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaW5wdXRtYXNrIiwibWFzayIsInNob3dNYXNrT25Ib3ZlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJ0YWJUcmFuc2Zvcm0iLCJsYXN0U2Nyb2xsVG9wIiwiaGFzQ2xhc3MiLCJmYWRlT3V0IiwicmVtb3ZlQXR0ciIsImZhZGVJbiIsInZhbCIsInByZXBlbmRUbyIsImluc2VydEFmdGVyIiwicHJvcCIsInNsaWRlciIsImdldEVsZW1lbnRCeUlkIiwiYWxsUHJpY2VTdGFydCIsImFsbFByaWNlRW5kIiwic3BhbnMiLCJzdGFydFByaWNlIiwiZW5kUHJpY2UiLCJhcnJQYXJhbXMiLCJzVXJsIiwidGV4dCIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwidmFsdWVzIiwiaGFuZGxlIiwiY29udGFjdHNPd25lciIsImNvbnRhY3RzUmlnaHRCbG9jayIsImFwcGVuZFRvIiwiY29udGFjdHNJdGVtRmlyc3QiLCJjb250YWN0c01hcCIsIiRpbnB1dCIsImNvdW50IiwiY2hhbmdlIiwicmVzaXplIiwicHJvZHVjdFRyYW5zZm9ybSIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJfdGhpcyIsImlucHV0IiwiaXMiLCJjbGFzc05hbWUiLCJkYXRhVGFiIiwiZ2V0QXR0cmlidXRlIiwidGFiQ29udGVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YWJUaXRsZSIsImkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzdHlsZSIsImRpc3BsYXkiLCJ0YWIiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFZOztBQUUxQixhQUFTQyxjQUFULEdBQXlCO0FBQ3JCSCxVQUFFLGtCQUFGLEVBQXNCSSxHQUF0QixDQUEwQixPQUExQixFQUFtQ0MsR0FBbkMsQ0FBdUMsYUFBdkMsRUFBc0RMLEVBQUUsU0FBRixFQUFhTSxXQUFiLENBQXlCLElBQXpCLENBQXREO0FBQ0g7O0FBR0Q7QUFDQU4sTUFBRSxpQkFBRixF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QXBCLEdBQThCLE9BQTlCO0FBQ0gsYUFGRCxNQUVLO0FBQ0RSLDJCQUFXRyxDQUFYLEVBQWNJLEtBQWQsQ0FBb0JDLE9BQXBCLEdBQThCLE1BQTlCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQ7QUFDQSxTQUFTdEQsWUFBVCxHQUF1QjtBQUNuQixRQUFJdUQsTUFBTXZJLEVBQUUsb0JBQUYsQ0FBVjs7QUFFQUEsTUFBRSxTQUFGLEVBQWFnQixRQUFiLENBQXNCLGlCQUF0QjtBQUNBdUgsUUFBSXhILElBQUosQ0FBUyxhQUFULEVBQXdCQyxRQUF4QixDQUFpQyxxQkFBakMsRUFBd0R5QixJQUF4RCxDQUE2RCxrQ0FBN0Q7O0FBRUE4RixRQUFJeEgsSUFBSixDQUFTLHdCQUFULEVBQW1DcUUsVUFBbkMsQ0FBOEMsT0FBOUMsRUFBdURJLFdBQXZELENBQW1FLGdCQUFuRTtBQUNBK0MsUUFBSXhILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3lFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBK0MsUUFBSXhILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3lFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBK0MsUUFBSXhILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3lFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBK0MsUUFBSXhILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3lFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBK0MsUUFBSXhILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3lFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBK0MsUUFBSXhILElBQUosQ0FBUyxlQUFULEVBQTBCQyxRQUExQixDQUFtQyx1QkFBbkM7QUFDQXVILFFBQUl4SCxJQUFKLENBQVMsaUJBQVQsRUFBNEJvSCxNQUE1QjtBQUNIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBjb250ZW50UGFkZGluZygpe1xyXG4gICAgICAgICQoJy5jb250ZW50LXdyYXBwZXInKS5ub3QoJy5ob21lJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKSk7XHJcbiAgICB9Y29udGVudFBhZGRpbmcoKTtcclxuICAgIFxyXG5cclxuICAgIC8vRmlyc3QgU2NyZWVuIFBhZGRpbmctVG9wXHJcbiAgICAkKCcuanMtZmlyc3RzY3JlZW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpKTtcclxuXHJcbiAgICAvL9Ci0LDQsdGLINCyINC/0L7QuNGB0LrQtSDQvdCwINCz0LvQsNCy0L3QvtC5XHJcbiAgICBpZiAoICQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFicyk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxyXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5tb2JpbGUtbmF2LS1zdWInKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcubW9iaWxlLW5hdi0tc3ViJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXHJcbiAgICBpZigkKCcuanMtY3Mtc2xpZGVyJykubGVuZ3RoID4gMCB8fCAkKCcuanMtY3Mtc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCB8fCAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJykpe1xyXG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXInKS5zbGljayh7XHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1jYXJkJykuc2xpY2soeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDMwMDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRzbGlkZXIgPSAkKFwiLmpzLWNzLXNsaWRlci0tbmV3c1wiKTtcclxuICAgICAgICAkc2xpZGVyXHJcbiAgICAgICAgLm9uKCdpbml0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtb3VzZVdoZWVsKCRzbGlkZXIpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2xpY2soeyAgICBcclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgLy8gZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICAgICAgdmVydGljYWxTd2lwaW5nOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICBmdW5jdGlvbiBtb3VzZVdoZWVsKCRzbGlkZXIpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpLm9uKCd3aGVlbCcsIHsgJHNsaWRlcjogJHNsaWRlciB9LCBtb3VzZVdoZWVsSGFuZGxlcilcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbW91c2VXaGVlbEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBjb25zdCAkc2xpZGVyID0gZXZlbnQuZGF0YS4kc2xpZGVyXHJcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gZXZlbnQub3JpZ2luYWxFdmVudC5kZWx0YVlcclxuICAgICAgICAgICAgaWYoZGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyLnNsaWNrKCdzbGlja05leHQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlci5zbGljaygnc2xpY2tQcmV2JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpLmZpbmQoJy5zbGljay1zbGlkZScpLmZpcnN0KCkuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJykuZmluZCgnLnNsaWNrLXNsaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpLmZpbmQoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkKCcuem9vbScpXHJcbiAgICAgICAgLndyYXAoJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIj48L3NwYW4+JylcclxuICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJylcclxuICAgICAgICAucGFyZW50KClcclxuICAgICAgICAuem9vbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkKCcuanMtZmlsdGVyLXN0aWNreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtZmlsdGVyLXN0aWNreScsIHtcclxuICAgICAgICAgICAgdG9wU3BhY2luZzogODAsXHJcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxyXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXRhbG9nX19jb250ZW50JyxcclxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuZmlsdGVyX19pbm5lcidcclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmICgkKCcuanMtc3RpY2t5LS1uZXdzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlja3ktLW5ld3MnLCB7XHJcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDEyMCxcclxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLm5ld3NfX2NvbnRlbnQnLFxyXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5uZXdzX19zbGlkZXInXHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJCgnLmpzLWNhcnQtc3RpY2t5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpIHtcclxuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtY2FydC1zdGlja3knLCB7XHJcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxyXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAxMCxcclxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuY2FydF9faW5uZXInLFxyXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5jYXJ0X19zdW0nXHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL0RhdGVwaWNrZXIgaHR0cDovL3QxbTBuLm5hbWUvYWlyLWRhdGVwaWNrZXIvZG9jcy9pbmRleC1ydS5odG1sXHJcbiAgICBpZiAoKCcuanMtZGF0ZScpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtZGF0ZScpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxyXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtaW5wdXQtaWNvbicpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5qcy1kYXRlJykuZm9jdXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL01vZGFsIEZhbmN5Qm94IDMgaHR0cHM6Ly9mYW5jeWFwcHMuY29tL2ZhbmN5Ym94LzMvXHJcbiAgICBpZigkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgIGJhc2VDbGFzcyA6ICdtb2RhbC13aW5kb3dfX3dyYXAnLCAgICAgIFxyXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlIDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgICAgICAgb3ZlcmxheTp7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICBpZigkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBjb250YWluZXI6IFwiLmNzLXNlbGVjdF9fY29udGFpbmVyXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuc2VsZWN0Mi1kcm9wZG93biwgLnNlbGVjdDItY29udGFpbmVyJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCdjbG9zZScpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJmb2N1c1wiLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuICAgIGlmKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICBtYXNrOiBcIis3ICg5OTkpIDk5OS05OS05OVwiLFxyXG4gICAgICAgICAgICBzaG93TWFza09uSG92ZXI6IGZhbHNlXHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA4MDApO1xyXG4gICAgfSk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpe1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnIH0sIDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyBcclxuICAgIH0pO1xyXG5cclxuICAgIC8vU3RvcCBkcmFnXHJcbiAgICAkKFwiaW1nXCIpLm9uKFwiZHJhZ3N0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH0pO1xyXG5cclxuICAgIFxyXG4gICAgJCgnLmpzLWdhcmFudHktaXRlbS0tbW9yZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZ2FyYW50eS1pdGVtJykuZmluZCgnLmlzLWhpZGRlbicpLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICAgICQoJy5qcy1say1uYXYnKS5maW5kKCcubGstbmF2X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcuanMtbGstbmF2JykuZmluZCgnLmxrLW5hdl9faXRlbScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIEhlYWRlci5qc1xyXG4gICAgICovXHJcbiAgICAgIC8v0J/RgNC4INGB0LrRgNC+0LvQtSDQtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9Cw0YHRgSDQuiDRhdC10LTQtdGA0YNcclxuICAgICAgdmFyIGxhc3RTY3JvbGxUb3AgPSAwO1xyXG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgaWYgKHNjcm9sbCA+IDApeyAgIFxyXG4gICAgICAgICAgICAgICQoJy5oZWFkZXInKS5hZGRDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIC8vSGVhZGVyIGhhbWJ1cmdlclxyXG4gICAgICAkKCcuanMtbmF2LXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKXtcclxuICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgLy/QntGH0LjRgtGB0LrQsCAg0LjQvdC/0YPRgtCwICDQv9C+INC60LvQuNC60YMg0L3QsCDQutC90L7Qv9C60YNcclxuICAgICAgJCgnLmpzLWhvbWUtc2VhcmNoLWNsZWFyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWwoJycpO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIC8v0JzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOINCw0LrQutC+0YDQtNC10L7QvSDQstC80LXRgdGC0L4g0YLQsNCw0LHQvtCyXHJcbiAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAgICQoJy5qcy1jYXRlZ29yeS1pdGVtLW1vdmV0bycpLnByZXBlbmRUbygnLmpzLWNhdGVnb3J5LW1vdmV0bycpO1xyXG4gICAgICBcclxuICAgICAgICAgICQoJy5qcy1oZWFkZXItcGhvbmUnKS5pbnNlcnRBZnRlcignLmhvbWUtc2VhcmNoJyk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIENhdGFsb2cuanNcclxuICAgICAqL1xyXG4gICAgLy9DYXRhbG9nIEl0ZW0gVmlldyBUb2dnbGVcclxuICAgICQoJy5qcy1zb3J0aW5nLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLmpzLXNvcnRpbmctYnRuJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoJy5qcy1zb3J0aW5nLWJ0bi0tbGlzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLmpzLXByb2R1Y3RzJykuZmluZCgnLnByb2R1Y3QtaXRlbScpLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmpzLXNvcnRpbmctLWJ0bi0tdGlsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLmpzLXByb2R1Y3RzJykuZmluZCgnLnByb2R1Y3QtaXRlbScpLnJlbW92ZUNsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL0ZpbHRlciBPcGVuIEJ0blxyXG4gICAgJCgnLmpzLWZpbHRlci0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLmpzLWZpbHRlci1zdGlja3knKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICQoJy5vdmVybGF5JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICB9KTtcclxuICAgIC8vRmlsdGVyIENsb3NlIEJ0blxyXG4gICAgJCgnLmpzLWZpbHRlci0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy5qcy1maWx0ZXItc3RpY2t5JykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkKCcub3ZlcmxheScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy9GaWx0ZXIgU2VsZWN0IEFsbFxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKCcuanMtY3MtY2hlY2tib3gtLXBzZXVkbycpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoJy5qcy1zZWxlY3QtYWxsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1maWx0ZXItY29udGVudCcpLmZpbmQoJy5jcy1jaGVja2JveCcpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuanMtZmlsdGVyLWNvbnRlbnQnKS5maW5kKCcuY3MtY2hlY2tib3gnKS5maW5kKCdpbnB1dCcpLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL9Cf0L4g0LrQu9C40LrRgyDQsiDQvdC1INCx0LvQvtC60LAg0YHQutGA0YvQstCw0LXQvCDQtdCz0L4gIFxyXG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1maWx0ZXItc3RpY2t5LCAuanMtZmlsdGVyLS1vcGVuJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgJCgnLmpzLWZpbHRlci1zdGlja3knKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICQoJy5vdmVybGF5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBpZiAoJCgnI2pzLWZpbHRlci1zbGlkZXInKS5sZW5ndGggPiAwKSB7XHJcbiAgICBcclxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWZpbHRlci1zbGlkZXInKTtcclxuICAgICAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1maWx0ZXItc2xpZGVyJykuZGF0YSgnc3RhcnQnKTtcclxuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xyXG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG4gICAgICAgIHZhciBzdGFydFByaWNlO1xyXG4gICAgICAgIHZhciBlbmRQcmljZTtcclxuICAgICAgICB2YXIgYXJyUGFyYW1zO1xyXG4gICAgICAgIHZhciBzVXJsO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICAgICAgZW5kUHJpY2UgPSBhbGxQcmljZUVuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAnbWluJzogYWxsUHJpY2VTdGFydCxcclxuICAgICAgICAgICAgICAgICdtYXgnOiBhbGxQcmljZUVuZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh2YWx1ZXMsIGhhbmRsZSkge1xyXG4gICAgICAgICAgICBzcGFuc1toYW5kbGVdLnRleHQocGFyc2VJbnQodmFsdWVzW2hhbmRsZV0pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogY29udGFjdHMuanNcclxuICAgICAqL1xyXG4gICAgaWYoJCgnLmpzLWNvbnRhY3RzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjggJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApe1xyXG4gICAgICB2YXIgY29udGFjdHNPd25lciA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0cy1vd25lcicpO1xyXG4gICAgICB2YXIgY29udGFjdHNSaWdodEJsb2NrID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzX19yaWdodCcpO1xyXG4gICAgXHJcbiAgICAgIGNvbnRhY3RzT3duZXIuYXBwZW5kVG8oY29udGFjdHNSaWdodEJsb2NrKTtcclxuICAgIH0gZWxzZSBpZigkKCcuanMtY29udGFjdHMnKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDQ4MCl7XHJcbiAgICAgIHZhciBjb250YWN0c0l0ZW1GaXJzdCA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0cy1pdGVtJykuZmlyc3QoKTtcclxuICAgICAgdmFyIGNvbnRhY3RzTWFwID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzX19tYXAnKS5maXJzdCgpO1xyXG4gICAgXHJcbiAgICAgIGNvbnRhY3RzTWFwLmFwcGVuZFRvKGNvbnRhY3RzSXRlbUZpcnN0KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiBDYXJ0LmpzXHJcbiAgICAgKi9cclxuICAgICQoJy5qcy1jb3VudGVyLS1taW51cycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dCcpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IHBhcnNlSW50KCRpbnB1dC52YWwoKSkgLSAxO1xyXG4gICAgICAgIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xyXG4gICAgICAgICRpbnB1dC52YWwoY291bnQpO1xyXG4gICAgICAgICRpbnB1dC5jaGFuZ2UoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQoJy5qcy1jb3VudGVyLS1wbHVzJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgJGlucHV0LnZhbChwYXJzZUludCgkaW5wdXQudmFsKCkpICsgMSk7XHJcbiAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL0NhcnQgSXRlbXMgbWFrZSBpbiBhIGNvbHVtbiBhdCB3dyA8PSA0ODBcclxuICAgICQod2luZG93KS5yZXNpemUocHJvZHVjdFRyYW5zZm9ybSk7XHJcbiAgICBmdW5jdGlvbiBwcm9kdWN0VHJhbnNmb3JtKCl7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAkKCcuanMtY2FydC1pdGVtcycpLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKS5yZW1vdmVDbGFzcygncHJvZHVjdC1pdGVtLS13aWRlJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXJ0LWl0ZW1zJykuZmluZCgnLnByb2R1Y3QtaXRlbScpLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9cHJvZHVjdFRyYW5zZm9ybSgpO1xyXG4gICAgXHJcblxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogY3Mtc2NyaXB0cy5qc1xyXG4gICAgICovXHJcbiAgICAvL0FjY29yZGVvblxyXG4gICAgJCgnLmpzLWNzLWFjY29yZGVvbicpLmZpbmQoJy5jcy1hY2NvcmRlb25fX2l0ZW0nKS5maW5kKCcuY3MtYWNjb3JkZW9uX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBcdGlmKCQodGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XHJcbiAgICBcdFx0JCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5jcy1hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XHJcbiAgICBcdH1lbHNle1xyXG4gICAgXHRcdCQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuY3MtYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVEb3duKCk7XHJcbiAgICBcdH0gXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgIC8vY3MgZHJvcGRvd25cclxuICAgICBpZigkKCcuanMtZHJvcGRvd24nKS5sZW5ndGggPiAwKXtcclxuICAgICBcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbiAoKXtcclxuICAgICBcdFx0aWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpe1xyXG4gICAgIFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgIFx0XHR9ZWxzZXtcclxuICAgICBcdFx0XHQkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgXHRcdH0gICAgICAgXHJcbiAgICAgXHR9KTtcclxuICAgICBcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICBcdFx0aWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgIFx0XHQkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgXHR9KTtcclxuICAgICB9XHJcbiAgICBcclxuICAgIC8vY3MgY2hlY2tib3hcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY3MtY2hlY2tib3gnLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBpbnB1dCA9IF90aGlzLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgaWYoaW5wdXQuaXMoJzpjaGVja2VkJykpe1xyXG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICBpbnB1dC5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIF90aGlzLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIGlucHV0LnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNzLXJhZGlvLS1wc2V1ZG8nLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoJy5qcy1jcy1yYWRpby0tcHNldWRvJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICAgIC8v0KLQsNCx0YtcclxuICAgICAgZnVuY3Rpb24gdGFicyhlKSB7XHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcclxuICAgICAgICAgICAgICB2YXIgZGF0YVRhYiAgICA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XHJcbiAgICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XHJcbiAgICAgICAgICAgICAgdmFyIHRhYlRpdGxlICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xyXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ICAgXHJcbiAgICAgIH0gXHJcbiAgICAgIFxyXG4gICAgICAvL3RhYnMgLS0tPiBhY2NvcmRlb25cclxuICAgICAgZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCl7XHJcbiAgICAgICAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XHJcbiAgICAgIFxyXG4gICAgICAgICAgJCgnLmpzLXRhYicpLmFkZENsYXNzKCdqcy1jcy1hY2NvcmRlb24nKTtcclxuICAgICAgICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdjcy1hY2NvcmRlb25fX3RpdGxlJykud3JhcCgnPGRpdiBjbGFzcz1cImNzLWFjY29yZGVvbl9faXRlbVwiPicpO1xyXG4gICAgICBcclxuICAgICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKS5yZW1vdmVBdHRyKCdzdHlsZScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJyk7XHJcbiAgICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcclxuICAgICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjJcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMlwiXScpO1xyXG4gICAgICAgICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiM1wiXScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIzXCJdJyk7XHJcbiAgICAgICAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCI0XCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjRcIl0nKTtcclxuICAgICAgICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjVcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiNVwiXScpO1xyXG4gICAgICAgICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnQnKS5hZGRDbGFzcygnY3MtYWNjb3JkZW9uX19jb250ZW50Jyk7XHJcbiAgICAgICAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XHJcbiAgICAgIH0iXX0=
