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

        if (spans[0].val() == '') {
            startPrice = allPriceStart;
        } else {
            startPrice = parseInt(spans[0].val());
        }

        if (spans[1].val() == '') {
            endPrice = allPriceEnd;
        } else {
            endPrice = parseInt(spans[1].val());
        }
        noUiSlider.create(slider, {
            start: [startPrice, endPrice],
            connect: true,
            range: {
                min: allPriceStart,
                max: allPriceEnd
            }
        });

        slider.noUiSlider.on('update', function (values, handle) {
            spans[handle].val(parseInt(values[handle]));
        });

        slider.noUiSlider.on('update', function (values, handle) {
            if (handle == 0) {
                spans[handle].val(parseInt(values[handle]));
            } else if (handle == 1) {
                spans[handle].val(parseInt(values[handle]));
            }
            // console.log('--- hendle', handle);
            // console.log('--- value 0', values[0]);
            // console.log('--- value 1', values[1]);
        });

        $('#jsPriceStart').on('change', function () {
            slider.noUiSlider.set([this.value, null]);
            console.log('---', this.value);
        });

        $('#jsPriceEnd').on('change', function () {
            slider.noUiSlider.set([this.value, null]);
            console.log('---', this.value);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNvbnRlbnRQYWRkaW5nIiwibm90IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJ3aWR0aCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwidGFicyIsIm9uIiwicGFyZW50IiwiZmluZCIsImFkZENsYXNzIiwiY2xvc2VzdCIsInJlbW92ZUNsYXNzIiwibW91c2VXaGVlbEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNsaWRlciIsImRhdGEiLCJkZWx0YSIsIm9yaWdpbmFsRXZlbnQiLCJkZWx0YVkiLCJzbGljayIsImFycm93cyIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImRvdHMiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwibW91c2VXaGVlbCIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwiZmlyc3QiLCJ3cmFwIiwiem9vbSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJjbGljayIsImZvY3VzIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJ0b3VjaCIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaW5wdXRtYXNrIiwibWFzayIsInNob3dNYXNrT25Ib3ZlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJ0YWJUcmFuc2Zvcm0iLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwidmFsIiwicHJlcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJwcm9wIiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJwYXJzZUludCIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsImNvbm5lY3QiLCJyYW5nZSIsIm1pbiIsIm1heCIsInZhbHVlcyIsImhhbmRsZSIsInNldCIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsImNvbnRhY3RzT3duZXIiLCJjb250YWN0c1JpZ2h0QmxvY2siLCJhcHBlbmRUbyIsImNvbnRhY3RzSXRlbUZpcnN0IiwiY29udGFjdHNNYXAiLCIkaW5wdXQiLCJjb3VudCIsImNoYW5nZSIsInJlc2l6ZSIsInByb2R1Y3RUcmFuc2Zvcm0iLCJzbGlkZVVwIiwic2xpZGVEb3duIiwiX3RoaXMiLCJpbnB1dCIsImlzIiwiY2xhc3NOYW1lIiwiZGF0YVRhYiIsImdldEF0dHJpYnV0ZSIsInRhYkNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFiVGl0bGUiLCJpIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwidGFiIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUN6QixhQUFTQyxjQUFULEdBQTBCO0FBQ3RCSCxVQUFFLGtCQUFGLEVBQ0tJLEdBREwsQ0FDUyxPQURULEVBRUtDLEdBRkwsQ0FFUyxhQUZULEVBRXdCTCxFQUFFLFNBQUYsRUFBYU0sV0FBYixDQUF5QixJQUF6QixDQUZ4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QTZELGtDQUE3RDs7QUFFQW9HLFFBQUk5SCxJQUFKLENBQVMsd0JBQVQsRUFBbUNvRSxVQUFuQyxDQUE4QyxPQUE5QyxFQUF1REksV0FBdkQsQ0FBbUUsZ0JBQW5FO0FBQ0FzRCxRQUFJOUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FzRCxRQUFJOUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FzRCxRQUFJOUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FzRCxRQUFJOUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FzRCxRQUFJOUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FzRCxRQUFJOUgsSUFBSixDQUFTLGVBQVQsRUFBMEJDLFFBQTFCLENBQW1DLHVCQUFuQztBQUNBNkgsUUFBSTlILElBQUosQ0FBUyxpQkFBVCxFQUE0QjBILE1BQTVCO0FBQ0giLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gY29udGVudFBhZGRpbmcoKSB7XG4gICAgICAgICQoJy5jb250ZW50LXdyYXBwZXInKVxuICAgICAgICAgICAgLm5vdCgnLmhvbWUnKVxuICAgICAgICAgICAgLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuICAgIH1cbiAgICBjb250ZW50UGFkZGluZygpO1xuXG4gICAgLy9GaXJzdCBTY3JlZW4gUGFkZGluZy1Ub3BcbiAgICAkKCcuanMtZmlyc3RzY3JlZW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpKTtcblxuICAgIC8v0KLQsNCx0Ysg0LIg0L/QvtC40YHQutC1INC90LAg0LPQu9Cw0LLQvdC+0LlcbiAgICBpZiAoJCgnLmpzLXRhYicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFicyk7XG4gICAgfVxuXG4gICAgLy9Nb2JpbGUgbWVudSBzdWJuYXYgdG9nZ2xlXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG5cbiAgICAkKCcuanMtbW9iaWxlLW5hdi1zdWItLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICBpZiAoXG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXInKS5sZW5ndGggPiAwIHx8XG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwIHx8XG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKVxuICAgICkge1xuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCAkc2xpZGVyID0gJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgICAgICRzbGlkZXIub24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbW91c2VXaGVlbCgkc2xpZGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnVuY3Rpb24gbW91c2VXaGVlbCgkc2xpZGVyKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5vbignd2hlZWwnLCB7ICRzbGlkZXI6ICRzbGlkZXIgfSwgbW91c2VXaGVlbEhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICRzbGlkZXIuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgLy8gZG90czogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcbiAgICAgICAgICAgIHZlcnRpY2FsU3dpcGluZzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gbW91c2VXaGVlbEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCAkc2xpZGVyID0gZXZlbnQuZGF0YS4kc2xpZGVyO1xuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBldmVudC5vcmlnaW5hbEV2ZW50LmRlbHRhWTtcbiAgICAgICAgICAgIGlmIChkZWx0YSA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyLnNsaWNrKCdzbGlja05leHQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5zbGljaygnc2xpY2tQcmV2Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJylcbiAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxuICAgICAgICAgICAgLmZpcnN0KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJylcbiAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICAgICAkKCcuem9vbScpXG4gICAgICAgICAgICAgICAgLndyYXAoJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIj48L3NwYW4+JylcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJylcbiAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAuem9vbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCQoJy5qcy1maWx0ZXItc3RpY2t5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtZmlsdGVyLXN0aWNreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXRhbG9nX19jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLmZpbHRlcl9faW5uZXInXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICgkKCcuanMtc3RpY2t5LS1uZXdzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3RpY2t5LS1uZXdzJywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogMTIwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5uZXdzX19jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLm5ld3NfX3NsaWRlcidcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCQoJy5qcy1jYXJ0LXN0aWNreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1jYXJ0LXN0aWNreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXJ0X19pbm5lcicsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5jYXJ0X19zdW0nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vRGF0ZXBpY2tlciBodHRwOi8vdDFtMG4ubmFtZS9haXItZGF0ZXBpY2tlci9kb2NzL2luZGV4LXJ1Lmh0bWxcbiAgICBpZiAoJy5qcy1kYXRlJy5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1kYXRlJykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxuICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtaW5wdXQtaWNvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXG4gICAgICAgICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cbiAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XG4gICAgICAgICAgICBiYXNlQ2xhc3M6ICdtb2RhbC13aW5kb3dfX3dyYXAnLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXG4gICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJy5jcy1zZWxlY3RfX2NvbnRhaW5lcidcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnNlbGVjdDItZHJvcGRvd24sIC5zZWxlY3QyLWNvbnRhaW5lcicpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MignY2xvc2UnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBzaG93TWFza09uSG92ZXI6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgODAwKTtcbiAgICB9KTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA2MCArICdweCcgfSwgMzAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoJy5qcy1nYXJhbnR5LWl0ZW0tLW1vcmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5nYXJhbnR5LWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5pcy1oaWRkZW4nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLWxrLW5hdicpXG4gICAgICAgIC5maW5kKCcubGstbmF2X19pdGVtJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLmpzLWxrLW5hdicpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5say1uYXZfX2l0ZW0nKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogSGVhZGVyLmpzXG4gICAgICovXG4gICAgLy/Qn9GA0Lgg0YHQutGA0L7Qu9C1INC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBINC6INGF0LXQtNC10YDRg1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAoc2Nyb2xsID4gMCkge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyJykuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL0hlYWRlciBoYW1idXJnZXJcclxuICAgICQoJy5qcy1uYXYtdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAkKCdodG1sJykuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8v0J7Rh9C40YLRgdC60LAgINC40L3Qv9GD0YLQsCAg0L/QviDQutC70LjQutGDINC90LAg0LrQvdC+0L/QutGDXHJcbiAgICAkKCcuanMtaG9tZS1zZWFyY2gtY2xlYXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudmFsKCcnKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvL9Cc0L7QsdC40LvRjNC90L7QtSDQvNC10L3RjiDQsNC60LrQvtGA0LTQtdC+0L0g0LLQvNC10YHRgtC+INGC0LDQsNCx0L7QslxyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICAkKCcuanMtY2F0ZWdvcnktaXRlbS1tb3ZldG8nKS5wcmVwZW5kVG8oJy5qcy1jYXRlZ29yeS1tb3ZldG8nKTtcclxuICAgIFxyXG4gICAgICAgICQoJy5qcy1oZWFkZXItcGhvbmUnKS5pbnNlcnRBZnRlcignLmhvbWUtc2VhcmNoJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vTW9iaWxlIFNlYXJjaFxyXG4gICAgaWYgKCQoJy5qcy1zZWFyY2gtaW5wdXQnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xyXG4gICAgXHJcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKS5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIHNlYXJjaElucHV0Lm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG4gICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcblxuICAgIC8qXG4gICAgICogQ2F0YWxvZy5qc1xuICAgICAqL1xuICAgIC8vQ2F0YWxvZyBJdGVtIFZpZXcgVG9nZ2xlXG4gICAgJCgnLmpzLXNvcnRpbmctYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1zb3J0aW5nLWJ0bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLXNvcnRpbmctYnRuLS1saXN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1wcm9kdWN0cycpXG4gICAgICAgICAgICAuZmluZCgnLnByb2R1Y3QtaXRlbScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ3Byb2R1Y3QtaXRlbS0td2lkZScpO1xuICAgIH0pO1xuICAgICQoJy5qcy1zb3J0aW5nLS1idG4tLXRpbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLXByb2R1Y3RzJylcbiAgICAgICAgICAgIC5maW5kKCcucHJvZHVjdC1pdGVtJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygncHJvZHVjdC1pdGVtLS13aWRlJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9GaWx0ZXIgT3BlbiBCdG5cbiAgICAkKCcuanMtZmlsdGVyLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1maWx0ZXItc3RpY2t5JykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgICQoJy5vdmVybGF5JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgfSk7XG4gICAgLy9GaWx0ZXIgQ2xvc2UgQnRuXG4gICAgJCgnLmpzLWZpbHRlci0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWZpbHRlci1zdGlja3knKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgJCgnLm92ZXJsYXknKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vRmlsdGVyIFNlbGVjdCBBbGxcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNzLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWNzLWNoZWNrYm94LS1wc2V1ZG8nKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtc2VsZWN0LWFsbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpbHRlci1jb250ZW50JylcbiAgICAgICAgICAgIC5maW5kKCcuY3MtY2hlY2tib3gnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmlsdGVyLWNvbnRlbnQnKVxuICAgICAgICAgICAgLmZpbmQoJy5jcy1jaGVja2JveCcpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxuICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8v0J/QviDQutC70LjQutGDINCyINC90LUg0LHQu9C+0LrQsCDRgdC60YDRi9Cy0LDQtdC8INC10LPQvlxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzLWZpbHRlci1zdGlja3ksIC5qcy1maWx0ZXItLW9wZW4nKS5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkKCcuanMtZmlsdGVyLXN0aWNreScpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAkKCcub3ZlcmxheScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKCQoJyNqcy1maWx0ZXItc2xpZGVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWZpbHRlci1zbGlkZXInKTtcbiAgICAgICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XG4gICAgICAgIHZhciBhbGxQcmljZUVuZCA9ICQoJyNqcy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XG4gICAgICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xuICAgICAgICB2YXIgc3RhcnRQcmljZTtcbiAgICAgICAgdmFyIGVuZFByaWNlO1xuICAgICAgICB2YXIgYXJyUGFyYW1zO1xuICAgICAgICB2YXIgc1VybDtcbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzBdLnZhbCgpID09ICcnKSB7XG4gICAgICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS52YWwoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzFdLnZhbCgpID09ICcnKSB7XG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS52YWwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIG1pbjogYWxsUHJpY2VTdGFydCxcbiAgICAgICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udmFsKHBhcnNlSW50KHZhbHVlc1toYW5kbGVdKSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIGlmIChoYW5kbGUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udmFsKHBhcnNlSW50KHZhbHVlc1toYW5kbGVdKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgc3BhbnNbaGFuZGxlXS52YWwocGFyc2VJbnQodmFsdWVzW2hhbmRsZV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0gaGVuZGxlJywgaGFuZGxlKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0gdmFsdWUgMCcsIHZhbHVlc1swXSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tIHZhbHVlIDEnLCB2YWx1ZXNbMV0pO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgJCgnI2pzUHJpY2VTdGFydCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNsaWRlci5ub1VpU2xpZGVyLnNldChbdGhpcy52YWx1ZSwgbnVsbF0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIHRoaXMudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgJCgnI2pzUHJpY2VFbmQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5zZXQoW3RoaXMudmFsdWUsIG51bGxdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAgKiBjb250YWN0cy5qc1xuICAgICAqL1xuICAgIGlmKCQoJy5qcy1jb250YWN0cycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4ICYmICQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhY3RzT3duZXIgPSAkKCcuanMtY29udGFjdHMnKS5maW5kKCcuY29udGFjdHMtb3duZXInKTtcclxuICAgICAgICB2YXIgY29udGFjdHNSaWdodEJsb2NrID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzX19yaWdodCcpO1xyXG4gICAgXHJcbiAgICAgICAgY29udGFjdHNPd25lci5hcHBlbmRUbyhjb250YWN0c1JpZ2h0QmxvY2spO1xyXG4gICAgfSBlbHNlIGlmKCQoJy5qcy1jb250YWN0cycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgdmFyIGNvbnRhY3RzSXRlbUZpcnN0ID0gJCgnLmpzLWNvbnRhY3RzJykuZmluZCgnLmNvbnRhY3RzLWl0ZW0nKS5maXJzdCgpO1xyXG4gICAgICAgIHZhciBjb250YWN0c01hcCA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0c19fbWFwJykuZmlyc3QoKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnRhY3RzTWFwLmFwcGVuZFRvKGNvbnRhY3RzSXRlbUZpcnN0KTtcclxuICAgIH1cclxuICAgIFxuXG4gICAgLypcbiAgICAgKiBDYXJ0LmpzXG4gICAgICovXG4gICAgJCgnLmpzLWNvdW50ZXItLW1pbnVzJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcylcclxuICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xyXG4gICAgICAgIHZhciBjb3VudCA9IHBhcnNlSW50KCRpbnB1dC52YWwoKSkgLSAxO1xyXG4gICAgICAgIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xyXG4gICAgICAgICRpbnB1dC52YWwoY291bnQpO1xyXG4gICAgICAgICRpbnB1dC5jaGFuZ2UoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQoJy5qcy1jb3VudGVyLS1wbHVzJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcylcclxuICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xyXG4gICAgICAgICRpbnB1dC52YWwocGFyc2VJbnQoJGlucHV0LnZhbCgpKSArIDEpO1xyXG4gICAgICAgICRpbnB1dC5jaGFuZ2UoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy9DYXJ0IEl0ZW1zIG1ha2UgaW4gYSBjb2x1bW4gYXQgd3cgPD0gNDgwXHJcbiAgICAkKHdpbmRvdykucmVzaXplKHByb2R1Y3RUcmFuc2Zvcm0pO1xyXG4gICAgZnVuY3Rpb24gcHJvZHVjdFRyYW5zZm9ybSgpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXJ0LWl0ZW1zJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcucHJvZHVjdC1pdGVtJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygncHJvZHVjdC1pdGVtLS13aWRlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhcnQtaXRlbXMnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm9kdWN0VHJhbnNmb3JtKCk7XHJcbiAgICBcclxuICAgIC8vVGFic1xyXG4gICAgJCgnI2NhcnQtdGFiJykudGFicygpO1xyXG4gICAgJCgnLmpzLW5ld3MtdGFiJykudGFicygpO1xyXG4gICAgXG5cbiAgICAvKlxuICAgICAqIGNzLXNjcmlwdHMuanNcbiAgICAgKi9cbiAgICAvL0FjY29yZGVvblxyXG4gICAgJCgnLmpzLWNzLWFjY29yZGVvbicpXHJcbiAgICAgICAgLmZpbmQoJy5jcy1hY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX190aXRsZScpXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNzLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgLy9jcyBkcm9wZG93blxyXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vY3MgY2hlY2tib3hcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY3MtY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBpbnB1dCA9IF90aGlzLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgaWYgKGlucHV0LmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIGlucHV0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RoaXMuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgaW5wdXQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNzLXJhZGlvLS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuanMtY3MtcmFkaW8tLXBzZXVkbycpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxufSk7XG5cbi8qXG4gICAgICogZnVuY3Rpb25cbiAgICAgKi9cbi8v0KLQsNCx0YtcclxuZnVuY3Rpb24gdGFicyhlKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZSA9PSAndGFiX190aXRsZScpIHtcclxuICAgICAgICB2YXIgZGF0YVRhYiAgICA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiJyk7XHJcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XHJcbiAgICAgICAgdmFyIHRhYlRpdGxlICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX190aXRsZScpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFiVGl0bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFUYWIgPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vdGFicyAtLS0+IGFjY29yZGVvblxyXG5mdW5jdGlvbiB0YWJUcmFuc2Zvcm0oKSB7XHJcbiAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgJCgnLmpzLXRhYicpLmFkZENsYXNzKCdqcy1jcy1hY2NvcmRlb24nKTtcclxuICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdjcy1hY2NvcmRlb25fX3RpdGxlJykud3JhcCgnPGRpdiBjbGFzcz1cImNzLWFjY29yZGVvbl9faXRlbVwiPicpO1xyXG5cclxuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjBcIl0nKS5yZW1vdmVBdHRyKCdzdHlsZScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIwXCJdJyk7XHJcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcclxuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjJcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiMlwiXScpO1xyXG4gICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiM1wiXScpLmluc2VydEFmdGVyKCdbZGF0YS10YWI9XCIzXCJdJyk7XHJcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCI0XCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjRcIl0nKTtcclxuICAgIHRhYi5maW5kKCdbZGF0YS10YWItY29udGVudD1cIjVcIl0nKS5pbnNlcnRBZnRlcignW2RhdGEtdGFiPVwiNVwiXScpO1xyXG4gICAgdGFiLmZpbmQoJy50YWJfX2NvbnRlbnQnKS5hZGRDbGFzcygnY3MtYWNjb3JkZW9uX19jb250ZW50Jyk7XHJcbiAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XHJcbn1cclxuXG4iXX0=
