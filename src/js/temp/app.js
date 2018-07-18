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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNvbnRlbnRQYWRkaW5nIiwibm90IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJ3aWR0aCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwidGFicyIsIm9uIiwicGFyZW50IiwiZmluZCIsImFkZENsYXNzIiwiY2xvc2VzdCIsInJlbW92ZUNsYXNzIiwibW91c2VXaGVlbEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNsaWRlciIsImRhdGEiLCJkZWx0YSIsIm9yaWdpbmFsRXZlbnQiLCJkZWx0YVkiLCJzbGljayIsImFycm93cyIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImRvdHMiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwibW91c2VXaGVlbCIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwiZmlyc3QiLCJ3cmFwIiwiem9vbSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJjbGljayIsImZvY3VzIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJ0b3VjaCIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaW5wdXRtYXNrIiwibWFzayIsInNob3dNYXNrT25Ib3ZlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJ0YWJUcmFuc2Zvcm0iLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwidmFsIiwicHJlcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJwcm9wIiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJ0ZXh0IiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJ2YWx1ZXMiLCJoYW5kbGUiLCJjb250YWN0c093bmVyIiwiY29udGFjdHNSaWdodEJsb2NrIiwiYXBwZW5kVG8iLCJjb250YWN0c0l0ZW1GaXJzdCIsImNvbnRhY3RzTWFwIiwiJGlucHV0IiwiY291bnQiLCJjaGFuZ2UiLCJyZXNpemUiLCJwcm9kdWN0VHJhbnNmb3JtIiwic2xpZGVVcCIsInNsaWRlRG93biIsIl90aGlzIiwiaW5wdXQiLCJpcyIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsInRhYiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekIsYUFBU0MsY0FBVCxHQUEwQjtBQUN0QkgsVUFBRSxrQkFBRixFQUNLSSxHQURMLENBQ1MsT0FEVCxFQUVLQyxHQUZMLENBRVMsYUFGVCxFQUV3QkwsRUFBRSxTQUFGLEVBQWFNLFdBQWIsQ0FBeUIsSUFBekIsQ0FGeEI7QUFHSDtBQUNESDs7QUFFQTtBQUNBSCxNQUFFLGlCQUFG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LEtBQWQsQ0FBb0JDLE9BQXBCLEdBQThCLE1BQTlCO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQ7QUFDQSxTQUFTdkQsWUFBVCxHQUF3QjtBQUNwQixRQUFJd0QsTUFBTXhJLEVBQUUsb0JBQUYsQ0FBVjs7QUFFQUEsTUFBRSxTQUFGLEVBQWFnQixRQUFiLENBQXNCLGlCQUF0QjtBQUNBd0gsUUFBSXpILElBQUosQ0FBUyxhQUFULEVBQXdCQyxRQUF4QixDQUFpQyxxQkFBakMsRUFBd0R5QixJQUF4RCxDQUE2RCxrQ0FBN0Q7O0FBRUErRixRQUFJekgsSUFBSixDQUFTLHdCQUFULEVBQW1Db0UsVUFBbkMsQ0FBOEMsT0FBOUMsRUFBdURJLFdBQXZELENBQW1FLGdCQUFuRTtBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyx3QkFBVCxFQUFtQ3dFLFdBQW5DLENBQStDLGdCQUEvQztBQUNBaUQsUUFBSXpILElBQUosQ0FBUyxlQUFULEVBQTBCQyxRQUExQixDQUFtQyx1QkFBbkM7QUFDQXdILFFBQUl6SCxJQUFKLENBQVMsaUJBQVQsRUFBNEJxSCxNQUE1QjtBQUNIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGNvbnRlbnRQYWRkaW5nKCkge1xuICAgICAgICAkKCcuY29udGVudC13cmFwcGVyJylcbiAgICAgICAgICAgIC5ub3QoJy5ob21lJylcbiAgICAgICAgICAgIC5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICB9XG4gICAgY29udGVudFBhZGRpbmcoKTtcblxuICAgIC8vRmlyc3QgU2NyZWVuIFBhZGRpbmctVG9wXG4gICAgJCgnLmpzLWZpcnN0c2NyZWVuJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKSk7XG5cbiAgICAvL9Ci0LDQsdGLINCyINC/0L7QuNGB0LrQtSDQvdCwINCz0LvQsNCy0L3QvtC5XG4gICAgaWYgKCQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhYnMpO1xuICAgIH1cblxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLm1vYmlsZS1uYXYtLXN1YicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG4gICAgaWYgKFxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyJykubGVuZ3RoID4gMCB8fFxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCB8fFxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJylcbiAgICApIHtcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLWNhcmQnKS5zbGljayh7XG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgJHNsaWRlciA9ICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKTtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICAgICAkc2xpZGVyLm9uKCdpbml0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1vdXNlV2hlZWwoJHNsaWRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdXNlV2hlZWwoJHNsaWRlcikge1xuICAgICAgICAgICAgICAgICRzbGlkZXIub24oJ3doZWVsJywgeyAkc2xpZGVyOiAkc2xpZGVyIH0sIG1vdXNlV2hlZWxIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkc2xpZGVyLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIC8vIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNixcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICAgICAgdmVydGljYWw6IHRydWUsXG4gICAgICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlV2hlZWxIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgJHNsaWRlciA9IGV2ZW50LmRhdGEuJHNsaWRlcjtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gZXZlbnQub3JpZ2luYWxFdmVudC5kZWx0YVk7XG4gICAgICAgICAgICBpZiAoZGVsdGEgPiAwKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzbGlkZXIuc2xpY2soJ3NsaWNrUHJldicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpXG4gICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgIC5maXJzdCgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpXG4gICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zbGljay1zbGlkZScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICAgICAgJCgnLnpvb20nKVxuICAgICAgICAgICAgICAgIC53cmFwKCc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrXCI+PC9zcGFuPicpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgLnpvb20oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICgkKCcuanMtZmlsdGVyLXN0aWNreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLWZpbHRlci1zdGlja3knLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiA4MCxcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuY2F0YWxvZ19fY29udGVudCcsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5maWx0ZXJfX2lubmVyJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoJCgnLmpzLXN0aWNreS0tbmV3cycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgdmFyIHNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWNreS0tbmV3cycsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDEyMCxcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcubmV3c19fY29udGVudCcsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5uZXdzX19zbGlkZXInXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICgkKCcuanMtY2FydC1zdGlja3knKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gMTAyNCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtY2FydC1zdGlja3knLCB7XG4gICAgICAgICAgICB0b3BTcGFjaW5nOiA4MCxcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxuICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuY2FydF9faW5uZXInLFxuICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuY2FydF9fc3VtJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0RhdGVwaWNrZXIgaHR0cDovL3QxbTBuLm5hbWUvYWlyLWRhdGVwaWNrZXIvZG9jcy9pbmRleC1ydS5odG1sXG4gICAgaWYgKCcuanMtZGF0ZScubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtZGF0ZScpLmRhdGVwaWNrZXIoe1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5JyxcbiAgICAgICAgICAgIGF1dG9DbG9zZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLWlucHV0LWljb24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWRhdGUnKVxuICAgICAgICAgICAgICAgIC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL01vZGFsIEZhbmN5Qm94IDMgaHR0cHM6Ly9mYW5jeWFwcHMuY29tL2ZhbmN5Ym94LzMvXG4gICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94XScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xuICAgICAgICAgICAgYmFzZUNsYXNzOiAnbW9kYWwtd2luZG93X193cmFwJyxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgICAgICAgIGhlbHBlcnM6IHtcbiAgICAgICAgICAgICAgICBvdmVybGF5OiB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBjb250YWluZXI6ICcuY3Mtc2VsZWN0X19jb250YWluZXInXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QyLWRyb3Bkb3duLCAuc2VsZWN0Mi1jb250YWluZXInKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoJ2Nsb3NlJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgc2hvd01hc2tPbkhvdmVyOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnIH0sIDMwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcuanMtZ2FyYW50eS1pdGVtLS1tb3JlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuZ2FyYW50eS1pdGVtJylcbiAgICAgICAgICAgIC5maW5kKCcuaXMtaGlkZGVuJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB9KTtcblxuICAgICQoJy5qcy1say1uYXYnKVxuICAgICAgICAuZmluZCgnLmxrLW5hdl9faXRlbScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJy5qcy1say1uYXYnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcubGstbmF2X19pdGVtJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEhlYWRlci5qc1xuICAgICAqL1xuICAgIC8v0J/RgNC4INGB0LrRgNC+0LvQtSDQtNC+0LHQsNCy0LvRj9C10Lwg0LrQu9Cw0YHRgSDQuiDRhdC10LTQtdGA0YNcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcbiAgICAgICAgaWYgKHNjcm9sbCA+IDApIHtcbiAgICAgICAgICAgICQoJy5oZWFkZXInKS5hZGRDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vSGVhZGVyIGhhbWJ1cmdlclxuICAgICQoJy5qcy1uYXYtdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICQoJy5qcy1uYXYnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAvL9Ce0YfQuNGC0YHQutCwICDQuNC90L/Rg9GC0LAgINC/0L4g0LrQu9C40LrRgyDQvdCwINC60L3QvtC/0LrRg1xuICAgICQoJy5qcy1ob21lLXNlYXJjaC1jbGVhcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudmFsKCcnKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL9Cc0L7QsdC40LvRjNC90L7QtSDQvNC10L3RjiDQsNC60LrQvtGA0LTQtdC+0L0g0LLQvNC10YHRgtC+INGC0LDQsNCx0L7QslxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgIH1lbHNle1xuICAgICAgICAkKCcuanMtY2F0ZWdvcnktaXRlbS1tb3ZldG8nKS5wcmVwZW5kVG8oJy5qcy1jYXRlZ29yeS1tb3ZldG8nKTtcbiAgICBcbiAgICAgICAgJCgnLmpzLWhlYWRlci1waG9uZScpLmluc2VydEFmdGVyKCcuaG9tZS1zZWFyY2gnKTtcbiAgICB9XG4gICAgXG4gICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgaWYgKCQoJy5qcy1zZWFyY2gtaW5wdXQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQoJy5qcy1zZWFyY2gtaW5wdXQnKTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXNlYXJjaCcpLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXNlYXJjaCcpLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNlYXJjaElucHV0Lm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXNlYXJjaCcpLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAgKiBDYXRhbG9nLmpzXG4gICAgICovXG4gICAgLy9DYXRhbG9nIEl0ZW0gVmlldyBUb2dnbGVcbiAgICAkKCcuanMtc29ydGluZy1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLXNvcnRpbmctYnRuJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtc29ydGluZy1idG4tLWxpc3QnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLXByb2R1Y3RzJykuZmluZCgnLnByb2R1Y3QtaXRlbScpLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcbiAgICB9KTtcbiAgICAkKCcuanMtc29ydGluZy0tYnRuLS10aWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1wcm9kdWN0cycpLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKS5yZW1vdmVDbGFzcygncHJvZHVjdC1pdGVtLS13aWRlJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9GaWx0ZXIgT3BlbiBCdG5cbiAgICAkKCcuanMtZmlsdGVyLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1maWx0ZXItc3RpY2t5JykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoJy5vdmVybGF5JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgfSk7XG4gICAgLy9GaWx0ZXIgQ2xvc2UgQnRuXG4gICAgJCgnLmpzLWZpbHRlci0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWZpbHRlci1zdGlja3knKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgJCgnLm92ZXJsYXknKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vRmlsdGVyIFNlbGVjdCBBbGxcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJCgnLmpzLWNzLWNoZWNrYm94LS1wc2V1ZG8nKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtc2VsZWN0LWFsbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1maWx0ZXItY29udGVudCcpLmZpbmQoJy5jcy1jaGVja2JveCcpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLmpzLWZpbHRlci1jb250ZW50JykuZmluZCgnLmNzLWNoZWNrYm94JykuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAvL9Cf0L4g0LrQu9C40LrRgyDQsiDQvdC1INCx0LvQvtC60LAg0YHQutGA0YvQstCw0LXQvCDQtdCz0L5cbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1maWx0ZXItc3RpY2t5LCAuanMtZmlsdGVyLS1vcGVuJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkKCcuanMtZmlsdGVyLXN0aWNreScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAkKCcub3ZlcmxheScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKCQoJyNqcy1maWx0ZXItc2xpZGVyJykubGVuZ3RoID4gMCkge1xuICAgIFxuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWZpbHRlci1zbGlkZXInKTtcbiAgICAgICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XG4gICAgICAgIHZhciBhbGxQcmljZUVuZCA9ICQoJyNqcy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xuICAgICAgICB2YXIgc3RhcnRQcmljZTtcbiAgICAgICAgdmFyIGVuZFByaWNlO1xuICAgICAgICB2YXIgYXJyUGFyYW1zO1xuICAgICAgICB2YXIgc1VybDtcbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xuICAgICAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoc3BhbnNbMV0udGV4dCgpID09ICcnKSB7XG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS50ZXh0KCkpO1xuICAgICAgICB9XG4gICAgXG4gICAgXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xuICAgICAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXG4gICAgICAgICAgICBjb25uZWN0OiB0cnVlLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAnbWluJzogYWxsUHJpY2VTdGFydCxcbiAgICAgICAgICAgICAgICAnbWF4JzogYWxsUHJpY2VFbmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNsaWRlci5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xuICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KHBhcnNlSW50KHZhbHVlc1toYW5kbGVdKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBcblxuICAgIC8qXG4gICAgICogY29udGFjdHMuanNcbiAgICAgKi9cbiAgICBpZigkKCcuanMtY29udGFjdHMnKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICB2YXIgY29udGFjdHNPd25lciA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0cy1vd25lcicpO1xuICAgICAgICB2YXIgY29udGFjdHNSaWdodEJsb2NrID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzX19yaWdodCcpO1xuICAgIFxuICAgICAgICBjb250YWN0c093bmVyLmFwcGVuZFRvKGNvbnRhY3RzUmlnaHRCbG9jayk7XG4gICAgfSBlbHNlIGlmKCQoJy5qcy1jb250YWN0cycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIHZhciBjb250YWN0c0l0ZW1GaXJzdCA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0cy1pdGVtJykuZmlyc3QoKTtcbiAgICAgICAgdmFyIGNvbnRhY3RzTWFwID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzX19tYXAnKS5maXJzdCgpO1xuICAgIFxuICAgICAgICBjb250YWN0c01hcC5hcHBlbmRUbyhjb250YWN0c0l0ZW1GaXJzdCk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAgKiBDYXJ0LmpzXG4gICAgICovXG4gICAgJCgnLmpzLWNvdW50ZXItLW1pbnVzJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xuICAgICAgICB2YXIgY291bnQgPSBwYXJzZUludCgkaW5wdXQudmFsKCkpIC0gMTtcbiAgICAgICAgY291bnQgPSBjb3VudCA8IDEgPyAxIDogY291bnQ7XG4gICAgICAgICRpbnB1dC52YWwoY291bnQpO1xuICAgICAgICAkaW5wdXQuY2hhbmdlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcuanMtY291bnRlci0tcGx1cycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgJGlucHV0LnZhbChwYXJzZUludCgkaW5wdXQudmFsKCkpICsgMSk7XG4gICAgICAgICRpbnB1dC5jaGFuZ2UoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8vQ2FydCBJdGVtcyBtYWtlIGluIGEgY29sdW1uIGF0IHd3IDw9IDQ4MFxuICAgICQod2luZG93KS5yZXNpemUocHJvZHVjdFRyYW5zZm9ybSk7XG4gICAgZnVuY3Rpb24gcHJvZHVjdFRyYW5zZm9ybSgpIHtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAgICAgJCgnLmpzLWNhcnQtaXRlbXMnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcucHJvZHVjdC1pdGVtJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3QtaXRlbS0td2lkZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWNhcnQtaXRlbXMnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcucHJvZHVjdC1pdGVtJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3Byb2R1Y3QtaXRlbS0td2lkZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb2R1Y3RUcmFuc2Zvcm0oKTtcbiAgICBcbiAgICAvL1RhYnNcbiAgICAkKCcjY2FydC10YWInKS50YWJzKCk7XG4gICAgJCgnLmpzLW5ld3MtdGFiJykudGFicygpO1xuICAgIFxuXG4gICAgLypcbiAgICAgKiBjcy1zY3JpcHRzLmpzXG4gICAgICovXG4gICAgLy9BY2NvcmRlb25cbiAgICAkKCcuanMtY3MtYWNjb3JkZW9uJylcbiAgICAgICAgLmZpbmQoJy5jcy1hY2NvcmRlb25fX2l0ZW0nKVxuICAgICAgICAuZmluZCgnLmNzLWFjY29yZGVvbl9fdGl0bGUnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jcy1hY2NvcmRlb25fX2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgIC8vY3MgZHJvcGRvd25cbiAgICBpZiAoJCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8vY3MgY2hlY2tib3hcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNzLWNoZWNrYm94JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBpbnB1dCA9IF90aGlzLmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgIGlmIChpbnB1dC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIGlucHV0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgaW5wdXQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jcy1yYWRpby0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1jcy1yYWRpby0tcHNldWRvJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxufSk7XG5cbi8qXG4gICAgICogZnVuY3Rpb25cbiAgICAgKi9cbi8v0KLQsNCx0YtcbmZ1bmN0aW9uIHRhYnMoZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcbiAgICAgICAgdmFyIGRhdGFUYWIgICAgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xuICAgICAgICB2YXIgdGFiQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX2NvbnRlbnQnKTtcbiAgICAgICAgdmFyIHRhYlRpdGxlICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vdGFicyAtLS0+IGFjY29yZGVvblxuZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCkge1xuICAgIHZhciB0YWIgPSAkKCcuanMtdGFiLS10cmFuc2Zvcm0nKTtcblxuICAgICQoJy5qcy10YWInKS5hZGRDbGFzcygnanMtY3MtYWNjb3JkZW9uJyk7XG4gICAgdGFiLmZpbmQoJy50YWJfX3RpdGxlJykuYWRkQ2xhc3MoJ2NzLWFjY29yZGVvbl9fdGl0bGUnKS53cmFwKCc8ZGl2IGNsYXNzPVwiY3MtYWNjb3JkZW9uX19pdGVtXCI+Jyk7XG5cbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJykucmVtb3ZlQXR0cignc3R5bGUnKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjJcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMlwiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjNcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiM1wiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjRcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiNFwiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjVcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiNVwiXScpO1xuICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JykuYWRkQ2xhc3MoJ2NzLWFjY29yZGVvbl9fY29udGVudCcpO1xuICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcbn1cblxuIl19
