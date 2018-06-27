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
    }productTransform();

    $('#cart-tab').tabs();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNvbnRlbnRQYWRkaW5nIiwibm90IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJ3aWR0aCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwidGFicyIsIm9uIiwicGFyZW50IiwiZmluZCIsImFkZENsYXNzIiwiY2xvc2VzdCIsInJlbW92ZUNsYXNzIiwibW91c2VXaGVlbEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNsaWRlciIsImRhdGEiLCJkZWx0YSIsIm9yaWdpbmFsRXZlbnQiLCJkZWx0YVkiLCJzbGljayIsImFycm93cyIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImRvdHMiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwibW91c2VXaGVlbCIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwiZmlyc3QiLCJ3cmFwIiwiem9vbSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJjbGljayIsImZvY3VzIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJ0b3VjaCIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaW5wdXRtYXNrIiwibWFzayIsInNob3dNYXNrT25Ib3ZlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJ0YWJUcmFuc2Zvcm0iLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwidmFsIiwicHJlcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJwcm9wIiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJ0ZXh0IiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJ2YWx1ZXMiLCJoYW5kbGUiLCJjb250YWN0c093bmVyIiwiY29udGFjdHNSaWdodEJsb2NrIiwiYXBwZW5kVG8iLCJjb250YWN0c0l0ZW1GaXJzdCIsImNvbnRhY3RzTWFwIiwiJGlucHV0IiwiY291bnQiLCJjaGFuZ2UiLCJyZXNpemUiLCJwcm9kdWN0VHJhbnNmb3JtIiwic2xpZGVVcCIsInNsaWRlRG93biIsIl90aGlzIiwiaW5wdXQiLCJpcyIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsInRhYiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7O0FBRXpCLGFBQVNDLGNBQVQsR0FBMEI7QUFDdEJILFVBQUUsa0JBQUYsRUFBc0JJLEdBQXRCLENBQTBCLE9BQTFCLEVBQW1DQyxHQUFuQyxDQUF1QyxhQUF2QyxFQUFzREwsRUFBRSxTQUFGLEVBQWFNLFdBQWIsQ0FBeUIsSUFBekIsQ0FBdEQ7QUFDSDs7QUFHRDtBQUNBTixNQUFFLGlC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QWYsRUFBa0I7QUFDZEgsMkJBQVdHLENBQVgsRUFBY0ksS0FBZCxDQUFvQkMsT0FBcEIsR0FBOEIsT0FBOUI7QUFDSCxhQUZELE1BRUs7QUFDRFIsMkJBQVdHLENBQVgsRUFBY0ksS0FBZCxDQUFvQkMsT0FBcEIsR0FBOEIsTUFBOUI7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7QUFFRDtBQUNBLFNBQVN2RCxZQUFULEdBQXdCO0FBQ3BCLFFBQUl3RCxNQUFNeEksRUFBRSxvQkFBRixDQUFWOztBQUVBQSxNQUFFLFNBQUYsRUFBYWdCLFFBQWIsQ0FBc0IsaUJBQXRCO0FBQ0F3SCxRQUFJekgsSUFBSixDQUFTLGFBQVQsRUFBd0JDLFFBQXhCLENBQWlDLHFCQUFqQyxFQUF3RHlCLElBQXhELENBQTZELGtDQUE3RDs7QUFFQStGLFFBQUl6SCxJQUFKLENBQVMsd0JBQVQsRUFBbUNvRSxVQUFuQyxDQUE4QyxPQUE5QyxFQUF1REksV0FBdkQsQ0FBbUUsZ0JBQW5FO0FBQ0FpRCxRQUFJekgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FpRCxRQUFJekgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FpRCxRQUFJekgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FpRCxRQUFJekgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FpRCxRQUFJekgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FpRCxRQUFJekgsSUFBSixDQUFTLGVBQVQsRUFBMEJDLFFBQTFCLENBQW1DLHVCQUFuQztBQUNBd0gsUUFBSXpILElBQUosQ0FBUyxpQkFBVCxFQUE0QnFILE1BQTVCO0FBQ0giLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgICBmdW5jdGlvbiBjb250ZW50UGFkZGluZygpIHtcbiAgICAgICAgJCgnLmNvbnRlbnQtd3JhcHBlcicpLm5vdCgnLmhvbWUnKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICB9Y29udGVudFBhZGRpbmcoKTtcblxuXG4gICAgLy9GaXJzdCBTY3JlZW4gUGFkZGluZy1Ub3BcbiAgICAkKCcuanMtZmlyc3RzY3JlZW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpKTtcblxuICAgIC8v0KLQsNCx0Ysg0LIg0L/QvtC40YHQutC1INC90LAg0LPQu9Cw0LLQvdC+0LlcbiAgICBpZiAoICQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhYnMpO1xuICAgIH1cblxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5tb2JpbGUtbmF2LS1zdWInKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5tb2JpbGUtbmF2LS1zdWInKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICBpZigkKCcuanMtY3Mtc2xpZGVyJykubGVuZ3RoID4gMCB8fCAkKCcuanMtY3Mtc2xpZGVyLS1jYXJkJykubGVuZ3RoID4gMCB8fCAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJykpIHtcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLWNhcmQnKS5zbGljayh7XG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgJHNsaWRlciA9ICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKTtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICAgICAkc2xpZGVyLm9uKCdpbml0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1vdXNlV2hlZWwoJHNsaWRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdXNlV2hlZWwoJHNsaWRlcikge1xuICAgICAgICAgICAgICAgICRzbGlkZXIub24oJ3doZWVsJywgeyAkc2xpZGVyOiAkc2xpZGVyIH0sIG1vdXNlV2hlZWxIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkc2xpZGVyLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIC8vIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNixcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICAgICAgdmVydGljYWw6IHRydWUsXG4gICAgICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlV2hlZWxIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgJHNsaWRlciA9IGV2ZW50LmRhdGEuJHNsaWRlcjtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gZXZlbnQub3JpZ2luYWxFdmVudC5kZWx0YVk7XG4gICAgICAgICAgICBpZihkZWx0YSA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyLnNsaWNrKCdzbGlja05leHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzbGlkZXIuc2xpY2soJ3NsaWNrUHJldicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpLmZpbmQoJy5zbGljay1zbGlkZScpLmZpcnN0KCkuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpLmZpbmQoJy5zbGljay1zbGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpLmZpbmQoJy5zbGljay1zbGlkZScpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICAgICAgJCgnLnpvb20nKVxuICAgICAgICAgICAgICAgIC53cmFwKCc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrXCI+PC9zcGFuPicpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgLnpvb20oKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKCQoJy5qcy1maWx0ZXItc3RpY2t5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtZmlsdGVyLXN0aWNreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXRhbG9nX19jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLmZpbHRlcl9faW5uZXInXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICgkKCcuanMtc3RpY2t5LS1uZXdzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3RpY2t5LS1uZXdzJywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogMTIwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5uZXdzX19jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLm5ld3NfX3NsaWRlcidcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCQoJy5qcy1jYXJ0LXN0aWNreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1jYXJ0LXN0aWNreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXJ0X19pbm5lcicsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5jYXJ0X19zdW0nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vRGF0ZXBpY2tlciBodHRwOi8vdDFtMG4ubmFtZS9haXItZGF0ZXBpY2tlci9kb2NzL2luZGV4LXJ1Lmh0bWxcbiAgICBpZiAoKCcuanMtZGF0ZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWRhdGUnKS5kYXRlcGlja2VyKHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eScsXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1pbnB1dC1pY29uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5qcy1kYXRlJykuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xuICAgIGlmKCQoJ1tkYXRhLWZhbmN5Ym94XScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xuICAgICAgICAgICAgYmFzZUNsYXNzIDogJ21vZGFsLXdpbmRvd19fd3JhcCcsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZSA6IHRydWUsXG4gICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIG92ZXJsYXk6e1xuICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZigkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBjb250YWluZXI6ICcuY3Mtc2VsZWN0X19jb250YWluZXInXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QyLWRyb3Bkb3duLCAuc2VsZWN0Mi1jb250YWluZXInKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCdjbG9zZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdmb2N1cycsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgaWYoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgc2hvd01hc2tPbkhvdmVyOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDgwMCk7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxuICAgICQoJy5qcy1nb3RvJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnIH0sIDMwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH0pO1xuXG5cbiAgICAkKCcuanMtZ2FyYW50eS1pdGVtLS1tb3JlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLmdhcmFudHktaXRlbScpLmZpbmQoJy5pcy1oaWRkZW4nKS5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XG4gICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB9KTtcblxuXG4gICAgJCgnLmpzLWxrLW5hdicpLmZpbmQoJy5say1uYXZfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWxrLW5hdicpLmZpbmQoJy5say1uYXZfX2l0ZW0nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xuICAgICAgICB0YWJUcmFuc2Zvcm0oKTtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgICogSGVhZGVyLmpzXG4gICAgICovXG4gICAgLy/Qn9GA0Lgg0YHQutGA0L7Qu9C1INC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBINC6INGF0LXQtNC10YDRg1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuICAgICAgICBpZiAoc2Nyb2xsID4gMCkge1xuICAgICAgICAgICAgJCgnLmhlYWRlcicpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8v0J7Rh9C40YLRgdC60LAgINC40L3Qv9GD0YLQsCAg0L/QviDQutC70LjQutGDINC90LAg0LrQvdC+0L/QutGDXG4gICAgJCgnLmpzLWhvbWUtc2VhcmNoLWNsZWFyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWwoJycpO1xuICAgIH0pO1xuICAgIFxuICAgIC8v0JzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOINCw0LrQutC+0YDQtNC10L7QvSDQstC80LXRgdGC0L4g0YLQsNCw0LHQvtCyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgfWVsc2V7XG4gICAgICAgICQoJy5qcy1jYXRlZ29yeS1pdGVtLW1vdmV0bycpLnByZXBlbmRUbygnLmpzLWNhdGVnb3J5LW1vdmV0bycpO1xuICAgIFxuICAgICAgICAkKCcuanMtaGVhZGVyLXBob25lJykuaW5zZXJ0QWZ0ZXIoJy5ob21lLXNlYXJjaCcpO1xuICAgIH1cbiAgICBcbiAgICAvL01vYmlsZSBTZWFyY2hcbiAgICBpZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cblxuICAgIC8qXG4gICAgICogQ2F0YWxvZy5qc1xuICAgICAqL1xuICAgIC8vQ2F0YWxvZyBJdGVtIFZpZXcgVG9nZ2xlXG4gICAgJCgnLmpzLXNvcnRpbmctYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1zb3J0aW5nLWJ0bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLXNvcnRpbmctYnRuLS1saXN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1wcm9kdWN0cycpLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKS5hZGRDbGFzcygncHJvZHVjdC1pdGVtLS13aWRlJyk7XG4gICAgfSk7XG4gICAgJCgnLmpzLXNvcnRpbmctLWJ0bi0tdGlsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtcHJvZHVjdHMnKS5maW5kKCcucHJvZHVjdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3QtaXRlbS0td2lkZScpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vRmlsdGVyIE9wZW4gQnRuXG4gICAgJCgnLmpzLWZpbHRlci0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtZmlsdGVyLXN0aWNreScpLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICAkKCcub3ZlcmxheScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgIH0pO1xuICAgIC8vRmlsdGVyIENsb3NlIEJ0blxuICAgICQoJy5qcy1maWx0ZXItLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1maWx0ZXItc3RpY2t5JykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICQoJy5vdmVybGF5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0ZpbHRlciBTZWxlY3QgQWxsXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICQoJy5qcy1jcy1jaGVja2JveC0tcHNldWRvJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLXNlbGVjdC1hbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuanMtZmlsdGVyLWNvbnRlbnQnKS5maW5kKCcuY3MtY2hlY2tib3gnKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1maWx0ZXItY29udGVudCcpLmZpbmQoJy5jcy1jaGVja2JveCcpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgXG4gICAgLy/Qn9C+INC60LvQuNC60YMg0LIg0L3QtSDQsdC70L7QutCwINGB0LrRgNGL0LLQsNC10Lwg0LXQs9C+XG4gICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanMtZmlsdGVyLXN0aWNreSwgLmpzLWZpbHRlci0tb3BlbicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJCgnLmpzLWZpbHRlci1zdGlja3knKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgJCgnLm92ZXJsYXknKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH0pO1xuICAgIFxuICAgIGlmICgkKCcjanMtZmlsdGVyLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcbiAgICBcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1maWx0ZXItc2xpZGVyJyk7XG4gICAgICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcbiAgICAgICAgdmFyIHN0YXJ0UHJpY2U7XG4gICAgICAgIHZhciBlbmRQcmljZTtcbiAgICAgICAgdmFyIGFyclBhcmFtcztcbiAgICAgICAgdmFyIHNVcmw7XG4gICAgXG4gICAgICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBhbGxQcmljZVN0YXJ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xuICAgICAgICAgICAgZW5kUHJpY2UgPSBhbGxQcmljZUVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcbiAgICAgICAgfVxuICAgIFxuICAgIFxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcbiAgICAgICAgICAgIHN0YXJ0OiBbc3RhcnRQcmljZSwgZW5kUHJpY2VdLFxuICAgICAgICAgICAgY29ubmVjdDogdHJ1ZSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgJ21pbic6IGFsbFByaWNlU3RhcnQsXG4gICAgICAgICAgICAgICAgJ21heCc6IGFsbFByaWNlRW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udGV4dChwYXJzZUludCh2YWx1ZXNbaGFuZGxlXSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgXG5cblxuICAgIC8qXG4gICAgICogY29udGFjdHMuanNcbiAgICAgKi9cbiAgICBpZigkKCcuanMtY29udGFjdHMnKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2OCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICB2YXIgY29udGFjdHNPd25lciA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0cy1vd25lcicpO1xuICAgICAgICB2YXIgY29udGFjdHNSaWdodEJsb2NrID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzX19yaWdodCcpO1xuICAgIFxuICAgICAgICBjb250YWN0c093bmVyLmFwcGVuZFRvKGNvbnRhY3RzUmlnaHRCbG9jayk7XG4gICAgfSBlbHNlIGlmKCQoJy5qcy1jb250YWN0cycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIHZhciBjb250YWN0c0l0ZW1GaXJzdCA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0cy1pdGVtJykuZmlyc3QoKTtcbiAgICAgICAgdmFyIGNvbnRhY3RzTWFwID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzX19tYXAnKS5maXJzdCgpO1xuICAgIFxuICAgICAgICBjb250YWN0c01hcC5hcHBlbmRUbyhjb250YWN0c0l0ZW1GaXJzdCk7XG4gICAgfVxuICAgIFxuXG5cbiAgICAvKlxuICAgICAqIENhcnQuanNcbiAgICAgKi9cbiAgICAkKCcuanMtY291bnRlci0tbWludXMnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgdmFyIGNvdW50ID0gcGFyc2VJbnQoJGlucHV0LnZhbCgpKSAtIDE7XG4gICAgICAgIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xuICAgICAgICAkaW5wdXQudmFsKGNvdW50KTtcbiAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnLmpzLWNvdW50ZXItLXBsdXMnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgJGlucHV0LnZhbChwYXJzZUludCgkaW5wdXQudmFsKCkpICsgMSk7XG4gICAgICAgICRpbnB1dC5jaGFuZ2UoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8vQ2FydCBJdGVtcyBtYWtlIGluIGEgY29sdW1uIGF0IHd3IDw9IDQ4MFxuICAgICQod2luZG93KS5yZXNpemUocHJvZHVjdFRyYW5zZm9ybSk7XG4gICAgZnVuY3Rpb24gcHJvZHVjdFRyYW5zZm9ybSgpIHtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAgICAgJCgnLmpzLWNhcnQtaXRlbXMnKS5maW5kKCcucHJvZHVjdC1pdGVtJykucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3QtaXRlbS0td2lkZScpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICQoJy5qcy1jYXJ0LWl0ZW1zJykuZmluZCgnLnByb2R1Y3QtaXRlbScpLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcbiAgICAgICAgfVxuICAgIH1wcm9kdWN0VHJhbnNmb3JtKCk7XG4gICAgXG4gICAgJCggJyNjYXJ0LXRhYicgKS50YWJzKCk7XG4gICAgXG5cblxuICAgIC8qXG4gICAgICogY3Mtc2NyaXB0cy5qc1xuICAgICAqL1xuICAgIC8vQWNjb3JkZW9uXG4gICAgJCgnLmpzLWNzLWFjY29yZGVvbicpLmZpbmQoJy5jcy1hY2NvcmRlb25fX2l0ZW0nKS5maW5kKCcuY3MtYWNjb3JkZW9uX190aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuY3MtYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVVcCgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKS5maW5kKCcuY3MtYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVEb3duKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL2NzIGRyb3Bkb3duXG4gICAgaWYoJCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoID4gMCkge1xuICAgICBcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgXHRcdGlmKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgIFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICBcdFx0fWVsc2V7XG4gICAgIFx0XHRcdCQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgIFx0XHR9XG4gICAgIFx0fSk7XG4gICAgIFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICBcdFx0aWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICBcdFx0JCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICBcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgXHR9KTtcbiAgICB9XG4gICAgXG4gICAgLy9jcyBjaGVja2JveFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY3MtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGlucHV0ID0gX3RoaXMuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgaWYoaW5wdXQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICBpbnB1dC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIF90aGlzLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICBpbnB1dC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNzLXJhZGlvLS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJCgnLmpzLWNzLXJhZGlvLS1wc2V1ZG8nKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG5cbn0pO1xuXG5cbi8qXG4gICAgICogZnVuY3Rpb25cbiAgICAgKi9cbi8v0KLQsNCx0YtcbmZ1bmN0aW9uIHRhYnMoZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcbiAgICAgICAgdmFyIGRhdGFUYWIgICAgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpO1xuICAgICAgICB2YXIgdGFiQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJfX2NvbnRlbnQnKTtcbiAgICAgICAgdmFyIHRhYlRpdGxlICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYlRpdGxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0YWJUaXRsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQ29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnRbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vdGFicyAtLS0+IGFjY29yZGVvblxuZnVuY3Rpb24gdGFiVHJhbnNmb3JtKCkge1xuICAgIHZhciB0YWIgPSAkKCcuanMtdGFiLS10cmFuc2Zvcm0nKTtcblxuICAgICQoJy5qcy10YWInKS5hZGRDbGFzcygnanMtY3MtYWNjb3JkZW9uJyk7XG4gICAgdGFiLmZpbmQoJy50YWJfX3RpdGxlJykuYWRkQ2xhc3MoJ2NzLWFjY29yZGVvbl9fdGl0bGUnKS53cmFwKCc8ZGl2IGNsYXNzPVwiY3MtYWNjb3JkZW9uX19pdGVtXCI+Jyk7XG5cbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIwXCJdJykucmVtb3ZlQXR0cignc3R5bGUnKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMFwiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjFcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMVwiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjJcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMlwiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjNcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiM1wiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjRcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiNFwiXScpO1xuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjVcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiNVwiXScpO1xuICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50JykuYWRkQ2xhc3MoJ2NzLWFjY29yZGVvbl9fY29udGVudCcpO1xuICAgIHRhYi5maW5kKCcudGFiX19jb250ZW50ZXMnKS5yZW1vdmUoKTtcbn1cblxuIl19
