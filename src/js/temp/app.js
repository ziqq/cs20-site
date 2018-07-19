'use strict';

$(document).ready(function () {
    function contentPadding() {
        $('.content-wrapper').not('.home').css('padding-top', $('.header').outerHeight(true));
    }
    contentPadding();

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

        var $slider = $('.js-cs-slider--news');
        if ($(window).width() > 480) {
            var mouseWheel = function mouseWheel($slider) {
                $slider.on('wheel', { $slider: $slider }, mouseWheelHandler);
            };

            $slider.on('init', function () {
                mouseWheel($slider);
            });
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


        $('.js-cs-slider--news').find('.slick-slide').first().addClass('is-checked');
        $('.js-cs-slider--news').find('.slick-slide').on('click', function () {
            $('.js-cs-slider--news').find('.slick-slide').removeClass('is-checked');
            $(this).addClass('is-checked');
        });

        if ($(window).width() > 480) {
            $('.zoom').wrap('<span style="display:inline-block"></span>').css('display', 'block').parent().zoom();
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
            container: '.cs-select__container'
        });
        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });

        $(document).click(function (event) {
            if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });

        $(document).on('focus', '.select2-search__field', function (e) {
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
        var elementClick = $(this).attr('href');
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 60 + 'px' }, 300);
        return false;
    });

    //Stop drag
    $('img').on('dragstart', function (event) {
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
    $(window).scroll(function () {
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

        searchInput.on('focus', function () {
            if ($(this).val() !== '') {
                var hint = $(this).closest('.js-search').find('.search__hint');
                hint.removeAttr('style');
            } else {
                hint.css('display', 'none');
            }
        });

        searchInput.on('blur', function () {
            var hint = $(this).closest('.js-search').find('.search__hint');
            hint.css('display', 'none');
        });
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
        $(this).closest('.js-filter-content').find('.cs-checkbox').find('input').prop('checked', true);
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
    }
    productTransform();

    //Tabs
    $('#cart-tab').tabs();
    $('.js-news-tab').tabs();

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
            input.prop('checked', false);
        } else {
            _this.addClass('is-checked');
            input.prop('checked', true);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNvbnRlbnRQYWRkaW5nIiwibm90IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJ3aWR0aCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwidGFicyIsIm9uIiwicGFyZW50IiwiZmluZCIsImFkZENsYXNzIiwiY2xvc2VzdCIsInJlbW92ZUNsYXNzIiwibW91c2VXaGVlbEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNsaWRlciIsImRhdGEiLCJkZWx0YSIsIm9yaWdpbmFsRXZlbnQiLCJkZWx0YVkiLCJzbGljayIsImFycm93cyIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImRvdHMiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwibW91c2VXaGVlbCIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwiZmlyc3QiLCJ3cmFwIiwiem9vbSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJjbGljayIsImZvY3VzIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJ0b3VjaCIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaW5wdXRtYXNrIiwibWFzayIsInNob3dNYXNrT25Ib3ZlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJ0YWJUcmFuc2Zvcm0iLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwidmFsIiwicHJlcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJwcm9wIiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJ0ZXh0IiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJ2YWx1ZXMiLCJoYW5kbGUiLCJjb250YWN0c093bmVyIiwiY29udGFjdHNSaWdodEJsb2NrIiwiYXBwZW5kVG8iLCJjb250YWN0c0l0ZW1GaXJzdCIsImNvbnRhY3RzTWFwIiwiJGlucHV0IiwiY291bnQiLCJjaGFuZ2UiLCJyZXNpemUiLCJwcm9kdWN0VHJhbnNmb3JtIiwic2xpZGVVcCIsInNsaWRlRG93biIsIl90aGlzIiwiaW5wdXQiLCJpcyIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsInRhYiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekIsYUFBU0MsY0FBVCxHQUEwQjtBQUN0QkgsVUFBRSxrQkFBRixFQUNLSSxHQURMLENBQ1MsT0FEVCxFQUVLQyxHQUZMLENBRVMsYUFGVCxFQUV3QkwsRUFBRSxTQUFGLEVBQWFNLFdBQWIsQ0FBeUIsSUFBekIsQ0FGeEI7QUFHSDtBQUNESDs7QUFFQTtBQUNBSCxNQUFFLGlCQUFG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LEtBQWQsQ0FBb0JDLE9BQXBCLEdBQThCLE1BQTlCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQ7QUFDQSxTQUFTdkQsWUFBVCxHQUF3QjtBQUNwQixRQUFJd0QsTUFBTXhJLEVBQUUsb0JBQUYsQ0FBVjs7QUFFQUEsTUFBRSxTQUFGLEVBQWFnQixRQUFiLENBQXNCLGlCQUF0QjtBQUNBd0gsUUFBSXpILElBQUosQ0FBUyxhQUFULEVBQXdCQyxRQUF4QixDQUFpQyxxQkFBakMsRUFBd0R5QixJQUF4RCxDQUE2RCxrQ0FBN0Q7O0FBRUErRixRQUFJekgsSUFBSixDQUFTLHdCQUFULEVBQW1Db0UsVUFBbkMsQ0FBOEMsT0FBOUMsRUFBdURJLFdBQXZELENBQW1FLGdCQUFuRTtBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyxlQUFULEVBQTBCQyxRQUExQixDQUFtQyx1QkFBbkM7QUFDQXdILFFBQUl6SCxJQUFKLENBQVMsaUJBQVQsRUFBNEJxSCxNQUE1QjtBQUNIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgZnVuY3Rpb24gY29udGVudFBhZGRpbmcoKSB7XHJcbiAgICAgICAgJCgnLmNvbnRlbnQtd3JhcHBlcicpXHJcbiAgICAgICAgICAgIC5ub3QoJy5ob21lJylcclxuICAgICAgICAgICAgLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkpO1xyXG4gICAgfVxyXG4gICAgY29udGVudFBhZGRpbmcoKTtcclxuXHJcbiAgICAvL0ZpcnN0IFNjcmVlbiBQYWRkaW5nLVRvcFxyXG4gICAgJCgnLmpzLWZpcnN0c2NyZWVuJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKSk7XHJcblxyXG4gICAgLy/QotCw0LHRiyDQsiDQv9C+0LjRgdC60LUg0L3QsCDQs9C70LDQstC90L7QuVxyXG4gICAgaWYgKCQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFicyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9Nb2JpbGUgbWVudSBzdWJuYXYgdG9nZ2xlXHJcbiAgICAkKCcuanMtbW9iaWxlLW5hdi1zdWItLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAuZmluZCgnLm1vYmlsZS1uYXYtLXN1YicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb2JpbGUtbmF2LS1zdWInKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXHJcbiAgICBpZiAoXHJcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlcicpLmxlbmd0aCA+IDAgfHxcclxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCB8fFxyXG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKVxyXG4gICAgKSB7XHJcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlcicpLnNsaWNrKHtcclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLWNhcmQnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgJHNsaWRlciA9ICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKTtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgJHNsaWRlci5vbignaW5pdCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIG1vdXNlV2hlZWwoJHNsaWRlcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3VzZVdoZWVsKCRzbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgICRzbGlkZXIub24oJ3doZWVsJywgeyAkc2xpZGVyOiAkc2xpZGVyIH0sIG1vdXNlV2hlZWxIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAkc2xpZGVyLnNsaWNrKHtcclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgLy8gZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICAgICAgdmVydGljYWxTd2lwaW5nOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnVuY3Rpb24gbW91c2VXaGVlbEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgJHNsaWRlciA9IGV2ZW50LmRhdGEuJHNsaWRlcjtcclxuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBldmVudC5vcmlnaW5hbEV2ZW50LmRlbHRhWTtcclxuICAgICAgICAgICAgaWYgKGRlbHRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyLnNsaWNrKCdzbGlja1ByZXYnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpXHJcbiAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxyXG4gICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJylcclxuICAgICAgICAgICAgLmZpbmQoJy5zbGljay1zbGlkZScpXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICQoJy56b29tJylcclxuICAgICAgICAgICAgICAgIC53cmFwKCc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrXCI+PC9zcGFuPicpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLnpvb20oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCQoJy5qcy1maWx0ZXItc3RpY2t5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1maWx0ZXItc3RpY2t5Jywge1xyXG4gICAgICAgICAgICB0b3BTcGFjaW5nOiA4MCxcclxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmNhdGFsb2dfX2NvbnRlbnQnLFxyXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5maWx0ZXJfX2lubmVyJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkKCcuanMtc3RpY2t5LS1uZXdzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlja3ktLW5ld3MnLCB7XHJcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDEyMCxcclxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLm5ld3NfX2NvbnRlbnQnLFxyXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5uZXdzX19zbGlkZXInXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCQoJy5qcy1jYXJ0LXN0aWNreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB7XHJcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLWNhcnQtc3RpY2t5Jywge1xyXG4gICAgICAgICAgICB0b3BTcGFjaW5nOiA4MCxcclxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmNhcnRfX2lubmVyJyxcclxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuY2FydF9fc3VtJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vRGF0ZXBpY2tlciBodHRwOi8vdDFtMG4ubmFtZS9haXItZGF0ZXBpY2tlci9kb2NzL2luZGV4LXJ1Lmh0bWxcclxuICAgIGlmICgnLmpzLWRhdGUnLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtZGF0ZScpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxyXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtaW5wdXQtaWNvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICBiYXNlQ2xhc3M6ICdtb2RhbC13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJy5jcy1zZWxlY3RfX2NvbnRhaW5lcidcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QyLWRyb3Bkb3duLCAuc2VsZWN0Mi1jb250YWluZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MignY2xvc2UnKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdmb2N1cycsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXHJcbiAgICAgICAgICAgIHNob3dNYXNrT25Ib3ZlcjogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcclxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XHJcbiAgICB9KTtcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXHJcbiAgICAkKCcuanMtZ290bycpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDYwICsgJ3B4JyB9LCAzMDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vU3RvcCBkcmFnXHJcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWdhcmFudHktaXRlbS0tbW9yZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5nYXJhbnR5LWl0ZW0nKVxyXG4gICAgICAgICAgICAuZmluZCgnLmlzLWhpZGRlbicpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmpzLWxrLW5hdicpXHJcbiAgICAgICAgLmZpbmQoJy5say1uYXZfX2l0ZW0nKVxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWxrLW5hdicpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxrLW5hdl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgdGFiVHJhbnNmb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIEhlYWRlci5qc1xyXG4gICAgICovXHJcbiAgICAvL9Cf0YDQuCDRgdC60YDQvtC70LUg0LTQvtCx0LDQstC70Y/QtdC8INC60LvQsNGB0YEg0Log0YXQtdC00LXRgNGDXHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChzY3JvbGwgPiAwKSB7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXInKS5hZGRDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vSGVhZGVyIGhhbWJ1cmdlclxyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy/QntGH0LjRgtGB0LrQsCAg0LjQvdC/0YPRgtCwICDQv9C+INC60LvQuNC60YMg0L3QsCDQutC90L7Qv9C60YNcclxuICAgICQoJy5qcy1ob21lLXNlYXJjaC1jbGVhcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWwoJycpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8v0JzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOINCw0LrQutC+0YDQtNC10L7QvSDQstC80LXRgdGC0L4g0YLQsNCw0LHQvtCyXHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgIH1lbHNle1xyXG4gICAgICAgICQoJy5qcy1jYXRlZ29yeS1pdGVtLW1vdmV0bycpLnByZXBlbmRUbygnLmpzLWNhdGVnb3J5LW1vdmV0bycpO1xyXG4gICAgXHJcbiAgICAgICAgJCgnLmpzLWhlYWRlci1waG9uZScpLmluc2VydEFmdGVyKCcuaG9tZS1zZWFyY2gnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9Nb2JpbGUgU2VhcmNoXHJcbiAgICBpZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgc2VhcmNoSW5wdXQgPSAkKCcuanMtc2VhcmNoLWlucHV0Jyk7XHJcbiAgICBcclxuICAgICAgICBzZWFyY2hJbnB1dC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKS5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICBzZWFyY2hJbnB1dC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXNlYXJjaCcpLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKS5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcbiAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBDYXRhbG9nLmpzXHJcbiAgICAgKi9cclxuICAgIC8vQ2F0YWxvZyBJdGVtIFZpZXcgVG9nZ2xlXHJcbiAgICAkKCcuanMtc29ydGluZy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtc29ydGluZy1idG4nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJCgnLmpzLXNvcnRpbmctYnRuLS1saXN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXByb2R1Y3RzJykuZmluZCgnLnByb2R1Y3QtaXRlbScpLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmpzLXNvcnRpbmctLWJ0bi0tdGlsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1wcm9kdWN0cycpLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKS5yZW1vdmVDbGFzcygncHJvZHVjdC1pdGVtLS13aWRlJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy9GaWx0ZXIgT3BlbiBCdG5cclxuICAgICQoJy5qcy1maWx0ZXItLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtZmlsdGVyLXN0aWNreScpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLm92ZXJsYXknKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIH0pO1xyXG4gICAgLy9GaWx0ZXIgQ2xvc2UgQnRuXHJcbiAgICAkKCcuanMtZmlsdGVyLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1maWx0ZXItc3RpY2t5JykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkKCcub3ZlcmxheScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy9GaWx0ZXIgU2VsZWN0IEFsbFxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJCgnLmpzLWNzLWNoZWNrYm94LS1wc2V1ZG8nKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKCcuanMtc2VsZWN0LWFsbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLmpzLWZpbHRlci1jb250ZW50JykuZmluZCgnLmNzLWNoZWNrYm94JykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1maWx0ZXItY29udGVudCcpLmZpbmQoJy5jcy1jaGVja2JveCcpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL9Cf0L4g0LrQu9C40LrRgyDQsiDQvdC1INCx0LvQvtC60LAg0YHQutGA0YvQstCw0LXQvCDQtdCz0L5cclxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtZmlsdGVyLXN0aWNreSwgLmpzLWZpbHRlci0tb3BlbicpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICQoJy5qcy1maWx0ZXItc3RpY2t5JykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkKCcub3ZlcmxheScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgaWYgKCQoJyNqcy1maWx0ZXItc2xpZGVyJykubGVuZ3RoID4gMCkge1xyXG4gICAgXHJcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1maWx0ZXItc2xpZGVyJyk7XHJcbiAgICAgICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWZpbHRlci1zbGlkZXInKS5kYXRhKCdlbmQnKTtcclxuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcclxuICAgICAgICB2YXIgc3RhcnRQcmljZTtcclxuICAgICAgICB2YXIgZW5kUHJpY2U7XHJcbiAgICAgICAgdmFyIGFyclBhcmFtcztcclxuICAgICAgICB2YXIgc1VybDtcclxuICAgIFxyXG4gICAgICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xyXG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcclxuICAgICAgICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICdtaW4nOiBhbGxQcmljZVN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgJ21heCc6IGFsbFByaWNlRW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcclxuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KHBhcnNlSW50KHZhbHVlc1toYW5kbGVdKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBjb250YWN0cy5qc1xyXG4gICAgICovXHJcbiAgICBpZigkKCcuanMtY29udGFjdHMnKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgIHZhciBjb250YWN0c093bmVyID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzLW93bmVyJyk7XHJcbiAgICAgICAgdmFyIGNvbnRhY3RzUmlnaHRCbG9jayA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0c19fcmlnaHQnKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnRhY3RzT3duZXIuYXBwZW5kVG8oY29udGFjdHNSaWdodEJsb2NrKTtcclxuICAgIH0gZWxzZSBpZigkKCcuanMtY29udGFjdHMnKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgIHZhciBjb250YWN0c0l0ZW1GaXJzdCA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0cy1pdGVtJykuZmlyc3QoKTtcclxuICAgICAgICB2YXIgY29udGFjdHNNYXAgPSAkKCcuanMtY29udGFjdHMnKS5maW5kKCcuY29udGFjdHNfX21hcCcpLmZpcnN0KCk7XHJcbiAgICBcclxuICAgICAgICBjb250YWN0c01hcC5hcHBlbmRUbyhjb250YWN0c0l0ZW1GaXJzdCk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKlxyXG4gICAgICogQ2FydC5qc1xyXG4gICAgICovXHJcbiAgICAkKCcuanMtY291bnRlci0tbWludXMnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gcGFyc2VJbnQoJGlucHV0LnZhbCgpKSAtIDE7XHJcbiAgICAgICAgY291bnQgPSBjb3VudCA8IDEgPyAxIDogY291bnQ7XHJcbiAgICAgICAgJGlucHV0LnZhbChjb3VudCk7XHJcbiAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmpzLWNvdW50ZXItLXBsdXMnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgJGlucHV0LnZhbChwYXJzZUludCgkaW5wdXQudmFsKCkpICsgMSk7XHJcbiAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL0NhcnQgSXRlbXMgbWFrZSBpbiBhIGNvbHVtbiBhdCB3dyA8PSA0ODBcclxuICAgICQod2luZG93KS5yZXNpemUocHJvZHVjdFRyYW5zZm9ybSk7XHJcbiAgICBmdW5jdGlvbiBwcm9kdWN0VHJhbnNmb3JtKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhcnQtaXRlbXMnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuanMtY2FydC1pdGVtcycpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnByb2R1Y3QtaXRlbScpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3Byb2R1Y3QtaXRlbS0td2lkZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb2R1Y3RUcmFuc2Zvcm0oKTtcclxuICAgIFxyXG4gICAgLy9UYWJzXHJcbiAgICAkKCcjY2FydC10YWInKS50YWJzKCk7XHJcbiAgICAkKCcuanMtbmV3cy10YWInKS50YWJzKCk7XHJcbiAgICBcclxuXHJcbiAgICAvKlxyXG4gICAgICogY3Mtc2NyaXB0cy5qc1xyXG4gICAgICovXHJcbiAgICAvL0FjY29yZGVvblxyXG4gICAgJCgnLmpzLWNzLWFjY29yZGVvbicpXHJcbiAgICAgICAgLmZpbmQoJy5jcy1hY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX190aXRsZScpXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNzLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgLy9jcyBkcm9wZG93blxyXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vY3MgY2hlY2tib3hcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY3MtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBpbnB1dCA9IF90aGlzLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgaWYgKGlucHV0LmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIGlucHV0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RoaXMuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgaW5wdXQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNzLXJhZGlvLS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuanMtY3MtcmFkaW8tLXBzZXVkbycpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG59KTtcclxuXHJcbi8qXHJcbiAgICAgKiBmdW5jdGlvblxyXG4gICAgICovXHJcbi8v0KLQsNCx0YtcclxuZnVuY3Rpb24gdGFicyhlKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcclxuICAgICAgICB2YXIgZGF0YVRhYiAgICA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XHJcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XHJcbiAgICAgICAgdmFyIHRhYlRpdGxlICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5mdW5jdGlvbiB0YWJUcmFuc2Zvcm0oKSB7XHJcbiAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgJCgnLmpzLXRhYicpLmFkZENsYXNzKCdqcy1jcy1hY2NvcmRlb24nKTtcclxuICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdjcy1hY2NvcmRlb25fX3RpdGxlJykud3JhcCgnPGRpdiBjbGFzcz1cImNzLWFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKS5yZW1vdmVBdHRyKCdzdHlsZScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJyk7XHJcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcclxuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjJcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMlwiXScpO1xyXG4gICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiM1wiXScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIzXCJdJyk7XHJcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCI0XCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjRcIl0nKTtcclxuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjVcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiNVwiXScpO1xyXG4gICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnQnKS5hZGRDbGFzcygnY3MtYWNjb3JkZW9uX19jb250ZW50Jyk7XHJcbiAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XHJcbn1cclxuXHJcbiJdfQ==
