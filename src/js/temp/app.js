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

        $('#jsPriceStart').on('change', function () {
            slider.noUiSlider.set([this.value, null]);
        });

        $('#jsPriceEnd').on('change', function () {
            slider.noUiSlider.set([null, this.value]);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNvbnRlbnRQYWRkaW5nIiwibm90IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJ3aWR0aCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwidGFicyIsIm9uIiwicGFyZW50IiwiZmluZCIsImFkZENsYXNzIiwiY2xvc2VzdCIsInJlbW92ZUNsYXNzIiwibW91c2VXaGVlbEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNsaWRlciIsImRhdGEiLCJkZWx0YSIsIm9yaWdpbmFsRXZlbnQiLCJkZWx0YVkiLCJzbGljayIsImFycm93cyIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsImRvdHMiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwibW91c2VXaGVlbCIsInZlcnRpY2FsIiwidmVydGljYWxTd2lwaW5nIiwiZmlyc3QiLCJ3cmFwIiwiem9vbSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJjbGljayIsImZvY3VzIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJ0b3VjaCIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaW5wdXRtYXNrIiwibWFzayIsInNob3dNYXNrT25Ib3ZlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJ0YWJUcmFuc2Zvcm0iLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwidmFsIiwicHJlcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJwcm9wIiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwic2V0IiwidmFsdWUiLCJjb250YWN0c093bmVyIiwiY29udGFjdHNSaWdodEJsb2NrIiwiYXBwZW5kVG8iLCJjb250YWN0c0l0ZW1GaXJzdCIsImNvbnRhY3RzTWFwIiwiJGlucHV0IiwiY291bnQiLCJjaGFuZ2UiLCJyZXNpemUiLCJwcm9kdWN0VHJhbnNmb3JtIiwic2xpZGVVcCIsInNsaWRlRG93biIsIl90aGlzIiwiaW5wdXQiLCJpcyIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsInRhYiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekIsYUFBU0MsY0FBVCxHQUEwQjtBQUN0QkgsVUFBRSxrQkFBRixFQUNLSSxHQURMLENBQ1MsT0FEVCxFQUVLQyxHQUZMLENBRVMsYUFGVCxFQUV3QkwsRUFBRSxTQUFGLEVBQWFNLFdBQWIsQ0FBeUIsSUFBekIsQ0FGeEI7QUFHSDtBQUNESDs7QUFFQTtBQUNBSCxNQUFFLGlCQUFGLEVBQXFCSyxHQUFyQixDQUF5QixhQUF6QixFQUF3Q0wsRUFBRSxTQUFGLEVBQWFNLFdBQWIsQ0FBeUIsSUFBekIsQ0FBeEM7O0FBRUE7QUFDQSxRQUFJTixFQUFFLFNBQUYsRUFBYU8sTUFBYixHQUFzQixDQUF0QixJQUEyQlAsRUFBRVEsTUFBRixFQUFVQyxLQUFWLEtBQW9CLEdBQW5ELEVBQXdEO0FBQ3BEUixpQkFBU1MsYUFBVCxDQUF1QixTQUF2QixFQUFrQ0MsZ0JBQWxDLENBQW1ELE9BQW5ELEVBQTREQyxJQUE1RDtBQUNIOztBQUVEO0FBQ0FaLE1BQUUsMEJBQUYsRUFBOEJhLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVc7QUFDakRiLFVBQUUsSUFBRixFQUNLYyxNQURMLEdBRUtDLElBRkwsQ0FFVSxrQkFGVixFQUdLQyxRQUhMLENBR2MsU0FIZDtBQUlILEtBTEQ7O0FBT0FoQixNQUFFLDJCQUFGLEVBQStCYSxFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxZQUFXO0FBQ2xEYixVQUFFLElBQUYsRUFDS2lCLE9BREwsQ0FDYSxrQkFEYixFQUVLQyxXQUZMLENBRWlCLFNBRmpCO0FBR0gsS0FKRDs7QUFNQTtBQUNBLFFBQ0lsQixFQUFFLGVBQUYsRUFBbUJPLE1BQW5CLEdBQTRCLENBQTVCLElBQ0FQLEVBQUUscUJBQUYsRUFBeUJPLE1BQXpCLEdBQWtDLENBRGxDLElBRUFQLEVBQUUscUJBQUYsQ0FISixFQUlFO0FBQUEsWUErQ1dtQixpQkEvQ1gsR0ErQ0UsU0FBU0EsaUJBQVQsQ0FBMkJDLEtBQTNCLEVBQWtDO0FBQzlCQSxrQkFBTUMsY0FBTjtBQUNBLGdCQUFNQyxVQUFVRixNQUFNRyxJQUFOLENBQVdELE9BQTNCO0FBQ0EsZ0JBQU1FLFFBQVFKLE1BQU1LLGFBQU4sQ0FBb0JDLE1BQWxDO0FBQ0EsZ0JBQUlGLFFBQVEsQ0FBWixFQUFlO0FBQ1hGLHdCQUFRSyxLQUFSLENBQWMsV0FBZDtBQUNILGFBRkQsTUFFTztBQUNITCx3QkFBUUssS0FBUixDQUFjLFdBQWQ7QUFDSDtBQUNKLFNBeERIOztBQUNFM0IsVUFBRSxlQUFGLEVBQW1CMkIsS0FBbkIsQ0FBeUI7QUFDckJDLG9CQUFRLElBRGE7QUFFckJDLHVCQUFXLHlCQUZVO0FBR3JCQyx1QkFBVyx5QkFIVTtBQUlyQkMsa0JBQU0sSUFKZTtBQUtyQkMsc0JBQVUsSUFMVztBQU1yQkMsMkJBQWUsSUFOTTtBQU9yQkMsMEJBQWMsQ0FQTztBQVFyQkMsNEJBQWdCLENBUks7QUFTckJDLHNCQUFVO0FBVFcsU0FBekI7O0FBWUFwQyxVQUFFLHFCQUFGLEVBQXlCMkIsS0FBekIsQ0FBK0I7QUFDM0JDLG9CQUFRLElBRG1CO0FBRTNCQyx1QkFBVyx5QkFGZ0I7QUFHM0JDLHVCQUFXLHlCQUhnQjtBQUkzQkMsa0JBQU0sSUFKcUI7QUFLM0JDLHNCQUFVLEtBTGlCO0FBTTNCQywyQkFBZSxJQU5ZO0FBTzNCQywwQkFBYyxDQVBhO0FBUTNCQyw0QkFBZ0IsQ0FSVztBQVMzQkMsc0JBQVU7QUFUaUIsU0FBL0I7O0FBWUEsWUFBTWQsVUFBVXRCLEVBQUUscUJBQUYsQ0FBaEI7QUFDQSxZQUFJQSxFQUFFUSxNQUFGLEVBQVVDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFBQSxnQkFJaEI0QixVQUpnQixHQUl6QixTQUFTQSxVQUFULENBQW9CZixPQUFwQixFQUE2QjtBQUN6QkEsd0JBQVFULEVBQVIsQ0FBVyxPQUFYLEVBQW9CLEVBQUVTLFNBQVNBLE9BQVgsRUFBcEIsRUFBMENILGlCQUExQztBQUNILGFBTndCOztBQUN6Qkcsb0JBQVFULEVBQVIsQ0FBVyxNQUFYLEVBQW1CLFlBQU07QUFDckJ3QiwyQkFBV2YsT0FBWDtBQUNILGFBRkQ7QUFNSDtBQUNEQSxnQkFBUUssS0FBUixDQUFjO0FBQ1ZDLG9CQUFRLElBREU7QUFFVkMsdUJBQVcseUJBRkQ7QUFHVkMsdUJBQVcseUJBSEQ7QUFJVjtBQUNBRSxzQkFBVSxLQUxBO0FBTVZDLDJCQUFlLElBTkw7QUFPVkMsMEJBQWMsQ0FQSjtBQVFWQyw0QkFBZ0IsQ0FSTjtBQVNWQyxzQkFBVSxLQVRBO0FBVVZFLHNCQUFVLElBVkE7QUFXVkMsNkJBQWlCO0FBWFAsU0FBZDs7O0FBd0JBdkMsVUFBRSxxQkFBRixFQUNLZSxJQURMLENBQ1UsY0FEVixFQUVLeUIsS0FGTCxHQUdLeEIsUUFITCxDQUdjLFlBSGQ7QUFJQWhCLFVBQUUscUJBQUYsRUFDS2UsSUFETCxDQUNVLGNBRFYsRUFFS0YsRUFGTCxDQUVRLE9BRlIsRUFFaUIsWUFBVztBQUNwQmIsY0FBRSxxQkFBRixFQUNLZSxJQURMLENBQ1UsY0FEVixFQUVLRyxXQUZMLENBRWlCLFlBRmpCO0FBR0FsQixjQUFFLElBQUYsRUFBUWdCLFFBQVIsQ0FBaUIsWUFBakI7QUFDSCxTQVBMOztBQVNBLFlBQUloQixFQUFFUSxNQUFGLEVBQVVDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFDekJULGNBQUUsT0FBRixFQUNLeUMsSUFETCxDQUNVLDRDQURWLEVBRUtwQyxHQUZMLENBRVMsU0FGVCxFQUVvQixPQUZwQixFQUdLUyxNQUhMLEdBSUs0QixJQUpMO0FBS0g7QUFDSjs7QUFFRCxRQUFJMUMsRUFBRSxtQkFBRixFQUF1Qk8sTUFBdkIsR0FBZ0MsQ0FBaEMsSUFBcUNQLEVBQUVRLE1BQUYsRUFBVUMsS0FBVixLQUFvQixHQUE3RCxFQUFrRTtBQUM5RCxZQUFJa0MsVUFBVSxJQUFJQyxhQUFKLENBQWtCLG1CQUFsQixFQUF1QztBQUNqREMsd0JBQVksRUFEcUM7QUFFakRDLDJCQUFlLEVBRmtDO0FBR2pEQywrQkFBbUIsbUJBSDhCO0FBSWpEQyxrQ0FBc0I7QUFKMkIsU0FBdkMsQ0FBZDtBQU1IOztBQUVELFFBQUloRCxFQUFFLGtCQUFGLEVBQXNCTyxNQUF0QixHQUErQixDQUEvQixJQUFvQ1AsRUFBRVEsTUFBRixFQUFVQyxLQUFWLEtBQW9CLEdBQTVELEVBQWlFO0FBQzdELFlBQUlrQyxVQUFVLElBQUlDLGFBQUosQ0FBa0Isa0JBQWxCLEVBQXNDO0FBQ2hEQyx3QkFBWSxHQURvQztBQUVoREMsMkJBQWUsRUFGaUM7QUFHaERDLCtCQUFtQixnQkFINkI7QUFJaERDLGtDQUFzQjtBQUowQixTQUF0QyxDQUFkO0FBTUg7O0FBRUQsUUFBSWhELEVBQUUsaUJBQUYsRUFBcUJPLE1BQXJCLEdBQThCLENBQTlCLElBQW1DUCxFQUFFUSxNQUFGLEVBQVVDLEtBQVYsS0FBb0IsSUFBM0QsRUFBaUU7QUFDN0QsWUFBSWtDLFVBQVUsSUFBSUMsYUFBSixDQUFrQixpQkFBbEIsRUFBcUM7QUFDL0NDLHdCQUFZLEVBRG1DO0FBRS9DQywyQkFBZSxFQUZnQztBQUcvQ0MsK0JBQW1CLGNBSDRCO0FBSS9DQyxrQ0FBc0I7QUFKeUIsU0FBckMsQ0FBZDtBQU1IOztBQUVEO0FBQ0EsUUFBSSxXQUFXekMsTUFBWCxHQUFvQixDQUF4QixFQUEyQjtBQUN2QlAsVUFBRSxVQUFGLEVBQWNpRCxVQUFkLENBQXlCO0FBQ3JCQyx3QkFBWSxVQURTO0FBRXJCQyx1QkFBVztBQUZVLFNBQXpCO0FBSUFuRCxVQUFFLGdCQUFGLEVBQW9Cb0QsS0FBcEIsQ0FBMEIsVUFBU2hDLEtBQVQsRUFBZ0I7QUFDdENBLGtCQUFNQyxjQUFOO0FBQ0FyQixjQUFFLElBQUYsRUFDS2MsTUFETCxHQUVLQyxJQUZMLENBRVUsVUFGVixFQUdLc0MsS0FITDtBQUlILFNBTkQ7QUFPSDs7QUFFRDtBQUNBLFFBQUlyRCxFQUFFLGlCQUFGLEVBQXFCTyxNQUFyQixHQUE4QixDQUFsQyxFQUFxQztBQUNqQ1AsVUFBRSxpQkFBRixFQUFxQnNELFFBQXJCLENBQThCO0FBQzFCQyx1QkFBVyxvQkFEZTtBQUUxQkMsbUJBQU8sS0FGbUI7QUFHMUJDLCtCQUFtQixJQUhPO0FBSTFCQyx1QkFBVyxLQUplO0FBSzFCQyxxQkFBUztBQUNMQyx5QkFBUztBQUNMQyw0QkFBUTtBQURIO0FBREo7QUFMaUIsU0FBOUI7QUFXSDs7QUFFRDtBQUNBLFFBQUk3RCxFQUFFLFlBQUYsRUFBZ0JPLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQzVCUCxVQUFFLFlBQUYsRUFBZ0I4RCxPQUFoQixDQUF3QjtBQUNwQkMsdUJBQVc7QUFEUyxTQUF4QjtBQUdBL0QsVUFBRSxzQkFBRixFQUEwQjhELE9BQTFCLENBQWtDO0FBQzlCRSxxQ0FBeUIsQ0FBQztBQURJLFNBQWxDOztBQUlBaEUsVUFBRUMsUUFBRixFQUFZbUQsS0FBWixDQUFrQixVQUFTaEMsS0FBVCxFQUFnQjtBQUM5QixnQkFDSXBCLEVBQUVvQixNQUFNNkMsTUFBUixFQUFnQmhELE9BQWhCLENBQXdCLHVDQUF4QixFQUNLVixNQUZULEVBSUk7QUFDSlAsY0FBRSxZQUFGLEVBQWdCOEQsT0FBaEIsQ0FBd0IsT0FBeEI7QUFDQTFDLGtCQUFNOEMsZUFBTjtBQUNILFNBUkQ7O0FBVUFsRSxVQUFFQyxRQUFGLEVBQVlZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHdCQUF4QixFQUFrRCxVQUFTc0QsQ0FBVCxFQUFZO0FBQzFEQSxjQUFFRCxlQUFGO0FBQ0gsU0FGRDtBQUdIOztBQUVEO0FBQ0EsUUFBSWxFLEVBQUUsZ0JBQUYsRUFBb0JPLE1BQXBCLEdBQTZCLENBQWpDLEVBQW9DO0FBQ2hDUCxVQUFFLGdCQUFGLEVBQW9Cb0UsU0FBcEIsQ0FBOEI7QUFDMUJDLGtCQUFNLG9CQURvQjtBQUUxQkMsNkJBQWlCO0FBRlMsU0FBOUI7QUFJSDs7QUFFRDtBQUNBdEUsTUFBRSxZQUFGLEVBQWdCYSxFQUFoQixDQUFtQixPQUFuQixFQUE0QixVQUFTc0QsQ0FBVCxFQUFZO0FBQ3BDQSxVQUFFOUMsY0FBRjtBQUNBckIsVUFBRSxZQUFGLEVBQWdCdUUsT0FBaEIsQ0FBd0IsRUFBRUMsV0FBVyxDQUFiLEVBQXhCLEVBQTBDLEdBQTFDO0FBQ0gsS0FIRDtBQUlBeEUsTUFBRVEsTUFBRixFQUFVaUUsTUFBVixDQUFpQixZQUFXO0FBQ3hCLFlBQUl6RSxFQUFFLElBQUYsRUFBUXdFLFNBQVIsS0FBc0J4RSxFQUFFLElBQUYsRUFBUTBFLE1BQVIsRUFBMUIsRUFBNEM7QUFDeEMxRSxjQUFFLFlBQUYsRUFBZ0JnQixRQUFoQixDQUF5QixZQUF6QjtBQUNILFNBRkQsTUFFTztBQUNIaEIsY0FBRSxZQUFGLEVBQWdCa0IsV0FBaEIsQ0FBNEIsWUFBNUI7QUFDSDtBQUNKLEtBTkQ7O0FBUUE7QUFDQWxCLE1BQUUsVUFBRixFQUFjb0QsS0FBZCxDQUFvQixZQUFXO0FBQzNCLFlBQUl1QixlQUFlM0UsRUFBRSxJQUFGLEVBQVE0RSxJQUFSLENBQWEsTUFBYixDQUFuQjtBQUNBLFlBQUlDLGNBQWM3RSxFQUFFMkUsWUFBRixFQUFnQkcsTUFBaEIsR0FBeUJDLEdBQTNDO0FBQ0EvRSxVQUFFLFlBQUYsRUFBZ0J1RSxPQUFoQixDQUF3QixFQUFFQyxXQUFXSyxjQUFjLEVBQWQsR0FBbUIsSUFBaEMsRUFBeEIsRUFBZ0UsR0FBaEU7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQUxEOztBQU9BO0FBQ0E3RSxNQUFFLEtBQUYsRUFBU2EsRUFBVCxDQUFZLFdBQVosRUFBeUIsVUFBU08sS0FBVCxFQUFnQjtBQUNyQ0EsY0FBTUMsY0FBTjtBQUNILEtBRkQ7O0FBSUFyQixNQUFFLHdCQUFGLEVBQTRCYSxFQUE1QixDQUErQixPQUEvQixFQUF3QyxZQUFXO0FBQy9DYixVQUFFLElBQUYsRUFDS2lCLE9BREwsQ0FDYSxlQURiLEVBRUtGLElBRkwsQ0FFVSxZQUZWLEVBR0tHLFdBSEwsQ0FHaUIsV0FIakI7QUFJQWxCLFVBQUUsSUFBRixFQUFRSyxHQUFSLENBQVksU0FBWixFQUF1QixNQUF2QjtBQUNILEtBTkQ7O0FBUUFMLE1BQUUsWUFBRixFQUNLZSxJQURMLENBQ1UsZUFEVixFQUVLRixFQUZMLENBRVEsT0FGUixFQUVpQixZQUFXO0FBQ3BCYixVQUFFLFlBQUYsRUFDS2UsSUFETCxDQUNVLGVBRFYsRUFFS0csV0FGTCxDQUVpQixXQUZqQjtBQUdBbEIsVUFBRSxJQUFGLEVBQVFnQixRQUFSLENBQWlCLFdBQWpCO0FBQ0gsS0FQTDs7QUFTQSxRQUFJaEIsRUFBRVEsTUFBRixFQUFVQyxLQUFWLE1BQXFCLEdBQXpCLEVBQThCO0FBQzFCdUU7QUFDSDs7QUFFRDs7O0FBR0E7QUFDQWhGLE1BQUVRLE1BQUYsRUFBVWlFLE1BQVYsQ0FBaUIsWUFBVztBQUN4QixZQUFJQSxTQUFTekUsRUFBRSxJQUFGLEVBQVF3RSxTQUFSLEVBQWI7QUFDQSxZQUFJQyxTQUFTLENBQWIsRUFBZ0I7QUFDWnpFLGNBQUUsU0FBRixFQUFhZ0IsUUFBYixDQUFzQixVQUF0QjtBQUNILFNBRkQsTUFFTztBQUNIaEIsY0FBRSxTQUFGLEVBQWFrQixXQUFiLENBQXlCLFVBQXpCO0FBQ0g7QUFDSixLQVBEOztBQVNBO0FBQ0FsQixNQUFFLGdCQUFGLEVBQW9CYSxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDLFlBQUdiLEVBQUUsSUFBRixFQUFRaUYsUUFBUixDQUFpQixTQUFqQixDQUFILEVBQWdDO0FBQzVCakYsY0FBRSxJQUFGLEVBQVFrQixXQUFSLENBQW9CLFNBQXBCO0FBQ0FsQixjQUFFLFNBQUYsRUFBYWtGLE9BQWI7QUFDQWxGLGNBQUUsTUFBRixFQUFVbUYsVUFBVixDQUFxQixPQUFyQjtBQUNILFNBSkQsTUFJSztBQUNEbkYsY0FBRSxJQUFGLEVBQVFnQixRQUFSLENBQWlCLFNBQWpCO0FBQ0FoQixjQUFFLFNBQUYsRUFBYW9GLE1BQWI7QUFDQXBGLGNBQUUsTUFBRixFQUFVSyxHQUFWLENBQWMsVUFBZCxFQUEwQixRQUExQjtBQUNIO0FBQ0QsZUFBTyxLQUFQO0FBQ0gsS0FYRDs7QUFhQTtBQUNBTCxNQUFFLHVCQUFGLEVBQTJCYSxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxZQUFXO0FBQzlDYixVQUFFLElBQUYsRUFBUWMsTUFBUixHQUFpQkMsSUFBakIsQ0FBc0Isb0JBQXRCLEVBQTRDc0UsR0FBNUMsQ0FBZ0QsRUFBaEQ7QUFDSCxLQUZEOztBQUlBO0FBQ0EsUUFBSXJGLEVBQUVRLE1BQUYsRUFBVUMsS0FBVixLQUFvQixHQUF4QixFQUE2QixDQUM1QixDQURELE1BQ0s7QUFDRFQsVUFBRSwwQkFBRixFQUE4QnNGLFNBQTlCLENBQXdDLHFCQUF4Qzs7QUFFQXRGLFVBQUUsa0JBQUYsRUFBc0J1RixXQUF0QixDQUFrQyxjQUFsQztBQUNIOztBQUVEO0FBQ0EsUUFBSXZGLEVBQUUsa0JBQUYsRUFBc0JPLE1BQXRCLEdBQStCLENBQW5DLEVBQXNDO0FBQ2xDLFlBQUlpRixjQUFjeEYsRUFBRSxrQkFBRixDQUFsQjs7QUFFQXdGLG9CQUFZM0UsRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUMvQixnQkFBSTRFLE9BQU96RixFQUFFLElBQUYsRUFBUWlCLE9BQVIsQ0FBZ0IsWUFBaEIsRUFBOEJGLElBQTlCLENBQW1DLGVBQW5DLENBQVg7QUFDQSxnQkFBSWYsRUFBRSxJQUFGLEVBQVFxRixHQUFSLE9BQWtCLEVBQXRCLEVBQTBCO0FBQ3RCSSxxQkFBS04sVUFBTCxDQUFnQixPQUFoQjtBQUNILGFBRkQsTUFFTztBQUNITSxxQkFBS3BGLEdBQUwsQ0FBUyxTQUFULEVBQW9CLE1BQXBCO0FBQ0g7QUFDSixTQVBEOztBQVNBbUYsb0JBQVkzRSxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQy9CLGdCQUFJYixFQUFFLElBQUYsRUFBUXFGLEdBQVIsT0FBa0IsRUFBdEIsRUFBMEI7QUFDdEIsb0JBQUlJLE9BQU96RixFQUFFLElBQUYsRUFBUWlCLE9BQVIsQ0FBZ0IsWUFBaEIsRUFBOEJGLElBQTlCLENBQW1DLGVBQW5DLENBQVg7QUFDQTBFLHFCQUFLTixVQUFMLENBQWdCLE9BQWhCO0FBQ0gsYUFIRCxNQUdPO0FBQ0hNLHFCQUFLcEYsR0FBTCxDQUFTLFNBQVQsRUFBb0IsTUFBcEI7QUFDSDtBQUNKLFNBUEQ7O0FBU0FtRixvQkFBWTNFLEVBQVosQ0FBZSxNQUFmLEVBQXVCLFlBQVc7QUFDOUIsZ0JBQUk0RSxPQUFPekYsRUFBRSxJQUFGLEVBQVFpQixPQUFSLENBQWdCLFlBQWhCLEVBQThCRixJQUE5QixDQUFtQyxlQUFuQyxDQUFYO0FBQ0EwRSxpQkFBS3BGLEdBQUwsQ0FBUyxTQUFULEVBQW9CLE1BQXBCO0FBQ0gsU0FIRDtBQUlIOztBQUdEOzs7QUFHQTtBQUNBTCxNQUFFLGlCQUFGLEVBQXFCYSxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFXO0FBQ3hDYixVQUFFLGlCQUFGLEVBQXFCa0IsV0FBckIsQ0FBaUMsV0FBakM7QUFDQWxCLFVBQUUsSUFBRixFQUFRZ0IsUUFBUixDQUFpQixXQUFqQjtBQUNILEtBSEQ7O0FBS0FoQixNQUFFLHVCQUFGLEVBQTJCYSxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxZQUFXO0FBQzlDYixVQUFFLGNBQUYsRUFDS2UsSUFETCxDQUNVLGVBRFYsRUFFS0MsUUFGTCxDQUVjLG9CQUZkO0FBR0gsS0FKRDtBQUtBaEIsTUFBRSx3QkFBRixFQUE0QmEsRUFBNUIsQ0FBK0IsT0FBL0IsRUFBd0MsWUFBVztBQUMvQ2IsVUFBRSxjQUFGLEVBQ0tlLElBREwsQ0FDVSxlQURWLEVBRUtHLFdBRkwsQ0FFaUIsb0JBRmpCO0FBR0gsS0FKRDs7QUFNQTtBQUNBbEIsTUFBRSxrQkFBRixFQUFzQmEsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsWUFBVztBQUN6Q2IsVUFBRSxtQkFBRixFQUF1QmdCLFFBQXZCLENBQWdDLFNBQWhDO0FBQ0FoQixVQUFFLE1BQUYsRUFBVUssR0FBVixDQUFjLFVBQWQsRUFBMEIsUUFBMUI7QUFDQUwsVUFBRSxVQUFGLEVBQWNLLEdBQWQsQ0FBa0IsU0FBbEIsRUFBNkIsT0FBN0I7QUFDSCxLQUpEO0FBS0E7QUFDQUwsTUFBRSxtQkFBRixFQUF1QmEsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBVztBQUMxQ2IsVUFBRSxtQkFBRixFQUF1QmtCLFdBQXZCLENBQW1DLFNBQW5DO0FBQ0FsQixVQUFFLE1BQUYsRUFBVW1GLFVBQVYsQ0FBcUIsT0FBckI7QUFDQW5GLFVBQUUsVUFBRixFQUFjbUYsVUFBZCxDQUF5QixPQUF6QjtBQUNILEtBSkQ7O0FBTUE7QUFDQW5GLE1BQUVDLFFBQUYsRUFBWVksRUFBWixDQUFlLE9BQWYsRUFBd0IseUJBQXhCLEVBQW1ELFlBQVc7QUFDMUQsWUFBSWIsRUFBRSxJQUFGLEVBQVFpRixRQUFSLENBQWlCLFlBQWpCLENBQUosRUFBb0M7QUFDaENqRixjQUFFLElBQUYsRUFBUWtCLFdBQVIsQ0FBb0IsWUFBcEI7QUFDSCxTQUZELE1BRU87QUFDSGxCLGNBQUUseUJBQUYsRUFBNkJrQixXQUE3QixDQUF5QyxZQUF6QztBQUNBbEIsY0FBRSxJQUFGLEVBQVFnQixRQUFSLENBQWlCLFlBQWpCO0FBQ0g7QUFDRCxlQUFPLEtBQVA7QUFDSCxLQVJEOztBQVVBaEIsTUFBRSxnQkFBRixFQUFvQmEsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBVztBQUN2Q2IsVUFBRSxJQUFGLEVBQ0tpQixPQURMLENBQ2Esb0JBRGIsRUFFS0YsSUFGTCxDQUVVLGNBRlYsRUFHS0MsUUFITCxDQUdjLFlBSGQ7QUFJQWhCLFVBQUUsSUFBRixFQUNLaUIsT0FETCxDQUNhLG9CQURiLEVBRUtGLElBRkwsQ0FFVSxjQUZWLEVBR0tBLElBSEwsQ0FHVSxPQUhWLEVBSUsyRSxJQUpMLENBSVUsU0FKVixFQUlxQixJQUpyQjtBQUtBLGVBQU8sS0FBUDtBQUNILEtBWEQ7O0FBYUE7QUFDQTFGLE1BQUVDLFFBQUYsRUFBWW1ELEtBQVosQ0FBa0IsVUFBU2hDLEtBQVQsRUFBZ0I7QUFDOUIsWUFBSXBCLEVBQUVvQixNQUFNNkMsTUFBUixFQUFnQmhELE9BQWhCLENBQXdCLHFDQUF4QixFQUErRFYsTUFBbkUsRUFDSTtBQUNKYSxjQUFNOEMsZUFBTjtBQUNBbEUsVUFBRSxtQkFBRixFQUF1QmtCLFdBQXZCLENBQW1DLFNBQW5DO0FBQ0FsQixVQUFFLE1BQUYsRUFBVW1GLFVBQVYsQ0FBcUIsT0FBckI7QUFDQW5GLFVBQUUsVUFBRixFQUFjbUYsVUFBZCxDQUF5QixPQUF6QjtBQUNILEtBUEQ7O0FBU0EsUUFBSW5GLEVBQUUsbUJBQUYsRUFBdUJPLE1BQXZCLEdBQWdDLENBQXBDLEVBQXVDO0FBQ25DLFlBQUlvRixTQUFTMUYsU0FBUzJGLGNBQVQsQ0FBd0Isa0JBQXhCLENBQWI7QUFDQSxZQUFJQyxnQkFBZ0I3RixFQUFFLG1CQUFGLEVBQXVCdUIsSUFBdkIsQ0FBNEIsT0FBNUIsQ0FBcEI7QUFDQSxZQUFJdUUsY0FBYzlGLEVBQUUsbUJBQUYsRUFBdUJ1QixJQUF2QixDQUE0QixLQUE1QixDQUFsQjtBQUNBLFlBQUl3RSxRQUFRLENBQUMvRixFQUFFLGVBQUYsQ0FBRCxFQUFxQkEsRUFBRSxhQUFGLENBQXJCLENBQVo7QUFDQSxZQUFJZ0csVUFBSjtBQUNBLFlBQUlDLFFBQUo7O0FBRUEsWUFBSUYsTUFBTSxDQUFOLEVBQVNWLEdBQVQsTUFBa0IsRUFBdEIsRUFBMEI7QUFDdEJXLHlCQUFhSCxhQUFiO0FBQ0gsU0FGRCxNQUVPO0FBQ0hHLHlCQUFhRSxTQUFTSCxNQUFNLENBQU4sRUFBU1YsR0FBVCxFQUFULENBQWI7QUFDSDs7QUFFRCxZQUFJVSxNQUFNLENBQU4sRUFBU1YsR0FBVCxNQUFrQixFQUF0QixFQUEwQjtBQUN0QlksdUJBQVdILFdBQVg7QUFDSCxTQUZELE1BRU87QUFDSEcsdUJBQVdDLFNBQVNILE1BQU0sQ0FBTixFQUFTVixHQUFULEVBQVQsQ0FBWDtBQUNIOztBQUVEYyxtQkFBV0MsTUFBWCxDQUFrQlQsTUFBbEIsRUFBMEI7QUFDdEJVLG1CQUFPLENBQUNMLFVBQUQsRUFBYUMsUUFBYixDQURlO0FBRXRCSyxxQkFBUyxJQUZhO0FBR3RCQyxtQkFBTztBQUNIQyxxQkFBS1gsYUFERjtBQUVIWSxxQkFBS1g7QUFGRjtBQUhlLFNBQTFCOztBQVNBSCxlQUFPUSxVQUFQLENBQWtCdEYsRUFBbEIsQ0FBcUIsUUFBckIsRUFBK0IsVUFBUzZGLE1BQVQsRUFBaUJDLE1BQWpCLEVBQXlCO0FBQ3BEWixrQkFBTVksTUFBTixFQUFjdEIsR0FBZCxDQUFrQmEsU0FBU1EsT0FBT0MsTUFBUCxDQUFULENBQWxCO0FBQ0gsU0FGRDs7QUFJQTNHLFVBQUUsZUFBRixFQUFtQmEsRUFBbkIsQ0FBc0IsUUFBdEIsRUFBZ0MsWUFBVztBQUN2QzhFLG1CQUFPUSxVQUFQLENBQWtCUyxHQUFsQixDQUFzQixDQUFDLEtBQUtDLEtBQU4sRUFBYSxJQUFiLENBQXRCO0FBQ0gsU0FGRDs7QUFJQTdHLFVBQUUsYUFBRixFQUFpQmEsRUFBakIsQ0FBb0IsUUFBcEIsRUFBOEIsWUFBVztBQUNyQzhFLG1CQUFPUSxVQUFQLENBQWtCUyxHQUFsQixDQUFzQixDQUFDLElBQUQsRUFBTyxLQUFLQyxLQUFaLENBQXRCO0FBQ0gsU0FGRDtBQUdIOztBQUdEOzs7QUFHQSxRQUFHN0csRUFBRSxjQUFGLEVBQWtCTyxNQUFsQixHQUEyQixDQUEzQixJQUFnQ1AsRUFBRVEsTUFBRixFQUFVQyxLQUFWLE1BQXFCLEdBQXJELElBQTREVCxFQUFFUSxNQUFGLEVBQVVDLEtBQVYsS0FBb0IsR0FBbkYsRUFBd0Y7QUFDcEYsWUFBSXFHLGdCQUFnQjlHLEVBQUUsY0FBRixFQUFrQmUsSUFBbEIsQ0FBdUIsaUJBQXZCLENBQXBCO0FBQ0EsWUFBSWdHLHFCQUFxQi9HLEVBQUUsY0FBRixFQUFrQmUsSUFBbEIsQ0FBdUIsa0JBQXZCLENBQXpCOztBQUVBK0Ysc0JBQWNFLFFBQWQsQ0FBdUJELGtCQUF2QjtBQUNILEtBTEQsTUFLTyxJQUFHL0csRUFBRSxjQUFGLEVBQWtCTyxNQUFsQixHQUEyQixDQUEzQixJQUFnQ1AsRUFBRVEsTUFBRixFQUFVQyxLQUFWLE1BQXFCLEdBQXhELEVBQTZEO0FBQ2hFLFlBQUl3RyxvQkFBb0JqSCxFQUFFLGNBQUYsRUFBa0JlLElBQWxCLENBQXVCLGdCQUF2QixFQUF5Q3lCLEtBQXpDLEVBQXhCO0FBQ0EsWUFBSTBFLGNBQWNsSCxFQUFFLGNBQUYsRUFBa0JlLElBQWxCLENBQXVCLGdCQUF2QixFQUF5Q3lCLEtBQXpDLEVBQWxCOztBQUVBMEUsb0JBQVlGLFFBQVosQ0FBcUJDLGlCQUFyQjtBQUNIOztBQUdEOzs7QUFHQWpILE1BQUUsb0JBQUYsRUFBd0JvRCxLQUF4QixDQUE4QixZQUFXO0FBQ3JDLFlBQUkrRCxTQUFTbkgsRUFBRSxJQUFGLEVBQ1JjLE1BRFEsR0FFUkMsSUFGUSxDQUVILE9BRkcsQ0FBYjtBQUdBLFlBQUlxRyxRQUFRbEIsU0FBU2lCLE9BQU85QixHQUFQLEVBQVQsSUFBeUIsQ0FBckM7QUFDQStCLGdCQUFRQSxRQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCQSxLQUF4QjtBQUNBRCxlQUFPOUIsR0FBUCxDQUFXK0IsS0FBWDtBQUNBRCxlQUFPRSxNQUFQO0FBQ0EsZUFBTyxLQUFQO0FBQ0gsS0FURDtBQVVBckgsTUFBRSxtQkFBRixFQUF1Qm9ELEtBQXZCLENBQTZCLFlBQVc7QUFDcEMsWUFBSStELFNBQVNuSCxFQUFFLElBQUYsRUFDUmMsTUFEUSxHQUVSQyxJQUZRLENBRUgsT0FGRyxDQUFiO0FBR0FvRyxlQUFPOUIsR0FBUCxDQUFXYSxTQUFTaUIsT0FBTzlCLEdBQVAsRUFBVCxJQUF5QixDQUFwQztBQUNBOEIsZUFBT0UsTUFBUDtBQUNBLGVBQU8sS0FBUDtBQUNILEtBUEQ7O0FBU0E7QUFDQXJILE1BQUVRLE1BQUYsRUFBVThHLE1BQVYsQ0FBaUJDLGdCQUFqQjtBQUNBLGFBQVNBLGdCQUFULEdBQTRCO0FBQ3hCLFlBQUl2SCxFQUFFUSxNQUFGLEVBQVVDLEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUJULGNBQUUsZ0JBQUYsRUFDS2UsSUFETCxDQUNVLGVBRFYsRUFFS0csV0FGTCxDQUVpQixvQkFGakI7QUFHSCxTQUpELE1BSU87QUFDSGxCLGNBQUUsZ0JBQUYsRUFDS2UsSUFETCxDQUNVLGVBRFYsRUFFS0MsUUFGTCxDQUVjLG9CQUZkO0FBR0g7QUFDSjtBQUNEdUc7O0FBRUE7QUFDQXZILE1BQUUsV0FBRixFQUFlWSxJQUFmO0FBQ0FaLE1BQUUsY0FBRixFQUFrQlksSUFBbEI7O0FBR0E7OztBQUdBO0FBQ0FaLE1BQUUsa0JBQUYsRUFDS2UsSUFETCxDQUNVLHFCQURWLEVBRUtBLElBRkwsQ0FFVSxzQkFGVixFQUdLRixFQUhMLENBR1EsT0FIUixFQUdpQixZQUFXO0FBQ3BCLFlBQ0liLEVBQUUsSUFBRixFQUNLYyxNQURMLEdBRUttRSxRQUZMLENBRWMsU0FGZCxDQURKLEVBSUU7QUFDRWpGLGNBQUUsSUFBRixFQUNLYyxNQURMLEdBRUtJLFdBRkwsQ0FFaUIsU0FGakIsRUFHS0gsSUFITCxDQUdVLHdCQUhWLEVBSUt5RyxPQUpMO0FBS0gsU0FWRCxNQVVPO0FBQ0h4SCxjQUFFLElBQUYsRUFDS2MsTUFETCxHQUVLRSxRQUZMLENBRWMsU0FGZCxFQUdLRCxJQUhMLENBR1Usd0JBSFYsRUFJSzBHLFNBSkw7QUFLSDtBQUNKLEtBckJMOztBQXVCQTtBQUNBLFFBQUl6SCxFQUFFLGNBQUYsRUFBa0JPLE1BQWxCLEdBQTJCLENBQS9CLEVBQWtDO0FBQzlCUCxVQUFFQyxRQUFGLEVBQVlZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVc7QUFDL0MsZ0JBQUliLEVBQUUsSUFBRixFQUFRaUYsUUFBUixDQUFpQixXQUFqQixDQUFKLEVBQW1DO0FBQy9CakYsa0JBQUUsSUFBRixFQUFRa0IsV0FBUixDQUFvQixXQUFwQjtBQUNILGFBRkQsTUFFTztBQUNIbEIsa0JBQUUsY0FBRixFQUFrQmtCLFdBQWxCLENBQThCLFdBQTlCO0FBQ0FsQixrQkFBRSxJQUFGLEVBQVFnQixRQUFSLENBQWlCLFdBQWpCO0FBQ0g7QUFDSixTQVBEO0FBUUFoQixVQUFFQyxRQUFGLEVBQVlZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVNzRCxDQUFULEVBQVk7QUFDaEMsZ0JBQUluRSxFQUFFbUUsRUFBRUYsTUFBSixFQUFZaEQsT0FBWixDQUFvQixjQUFwQixFQUFvQ1YsTUFBeEMsRUFBZ0Q7QUFDaERQLGNBQUUsY0FBRixFQUFrQmtCLFdBQWxCLENBQThCLFdBQTlCO0FBQ0FpRCxjQUFFRCxlQUFGO0FBQ0gsU0FKRDtBQUtIOztBQUVEO0FBQ0FsRSxNQUFFQyxRQUFGLEVBQVlZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGlCQUF4QixFQUEyQyxZQUFXO0FBQ2xELFlBQUk2RyxRQUFRMUgsRUFBRSxJQUFGLENBQVo7QUFDQSxZQUFJMkgsUUFBUUQsTUFBTTNHLElBQU4sQ0FBVyxPQUFYLENBQVo7QUFDQSxZQUFJNEcsTUFBTUMsRUFBTixDQUFTLFVBQVQsQ0FBSixFQUEwQjtBQUN0QkYsa0JBQU14RyxXQUFOLENBQWtCLFlBQWxCO0FBQ0F5RyxrQkFBTWpDLElBQU4sQ0FBVyxTQUFYLEVBQXNCLEtBQXRCO0FBQ0gsU0FIRCxNQUdPO0FBQ0hnQyxrQkFBTTFHLFFBQU4sQ0FBZSxZQUFmO0FBQ0EyRyxrQkFBTWpDLElBQU4sQ0FBVyxTQUFYLEVBQXNCLElBQXRCO0FBQ0g7QUFDSixLQVZEOztBQVlBMUYsTUFBRUMsUUFBRixFQUFZWSxFQUFaLENBQWUsT0FBZixFQUF3QixzQkFBeEIsRUFBZ0QsWUFBVztBQUN2RCxZQUFJYixFQUFFLElBQUYsRUFBUWlGLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSixFQUFvQztBQUNoQ2pGLGNBQUUsSUFBRixFQUFRa0IsV0FBUixDQUFvQixZQUFwQjtBQUNILFNBRkQsTUFFTztBQUNIbEIsY0FBRSxzQkFBRixFQUEwQmtCLFdBQTFCLENBQXNDLFlBQXRDO0FBQ0FsQixjQUFFLElBQUYsRUFBUWdCLFFBQVIsQ0FBaUIsWUFBakI7QUFDSDtBQUNKLEtBUEQ7QUFTSCxDQTFpQkQ7O0FBNGlCQTs7O0FBR0E7QUFDQSxTQUFTSixJQUFULENBQWN1RCxDQUFkLEVBQWlCO0FBQ2IsUUFBSUYsU0FBU0UsRUFBRUYsTUFBZjtBQUNBLFFBQUlBLE9BQU80RCxTQUFQLElBQW9CLFlBQXhCLEVBQXNDO0FBQ2xDLFlBQUlDLFVBQWE3RCxPQUFPOEQsWUFBUCxDQUFvQixVQUFwQixDQUFqQjtBQUNBLFlBQUlDLGFBQWEvSCxTQUFTZ0ksZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBakI7QUFDQSxZQUFJQyxXQUFhakksU0FBU2dJLGdCQUFULENBQTBCLGFBQTFCLENBQWpCO0FBQ0EsYUFBSyxJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLElBQUlELFNBQVMzSCxNQUE3QixFQUFxQzRILEdBQXJDLEVBQTBDO0FBQ3RDRCxxQkFBU0MsQ0FBVCxFQUFZQyxTQUFaLENBQXNCQyxNQUF0QixDQUE2QixXQUE3QjtBQUNIO0FBQ0RwRSxlQUFPbUUsU0FBUCxDQUFpQkUsR0FBakIsQ0FBcUIsV0FBckI7QUFDQSxhQUFLLElBQUlILElBQUksQ0FBYixFQUFnQkEsSUFBSUgsV0FBV3pILE1BQS9CLEVBQXVDNEgsR0FBdkMsRUFBNEM7QUFDeEMsZ0JBQUlMLFdBQVdLLENBQWYsRUFBa0I7QUFDZEgsMkJBQVdHLENBQVgsRUFBY0ksS0FBZCxDQUFvQkMsT0FBcEIsR0FBOEIsT0FBOUI7QUFDSCxhQUZELE1BRUs7QUFDRFIsMkJBQVdHLENBQVgsRUFBY0ksS0FBZCxDQUFvQkMsT0FBcEIsR0FBOEIsTUFBOUI7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7QUFFRDtBQUNBLFNBQVN4RCxZQUFULEdBQXdCO0FBQ3BCLFFBQUl5RCxNQUFNekksRUFBRSxvQkFBRixDQUFWOztBQUVBQSxNQUFFLFNBQUYsRUFBYWdCLFFBQWIsQ0FBc0IsaUJBQXRCO0FBQ0F5SCxRQUFJMUgsSUFBSixDQUFTLGFBQVQsRUFBd0JDLFFBQXhCLENBQWlDLHFCQUFqQyxFQUF3RHlCLElBQXhELENBQTZELGtDQUE3RDs7QUFFQWdHLFFBQUkxSCxJQUFKLENBQVMsd0JBQVQsRUFBbUNvRSxVQUFuQyxDQUE4QyxPQUE5QyxFQUF1REksV0FBdkQsQ0FBbUUsZ0JBQW5FO0FBQ0FrRCxRQUFJMUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FrRCxRQUFJMUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FrRCxRQUFJMUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FrRCxRQUFJMUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FrRCxRQUFJMUgsSUFBSixDQUFTLHdCQUFULEVBQW1Dd0UsV0FBbkMsQ0FBK0MsZ0JBQS9DO0FBQ0FrRCxRQUFJMUgsSUFBSixDQUFTLGVBQVQsRUFBMEJDLFFBQTFCLENBQW1DLHVCQUFuQztBQUNBeUgsUUFBSTFILElBQUosQ0FBUyxpQkFBVCxFQUE0QnNILE1BQTVCO0FBQ0giLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gY29udGVudFBhZGRpbmcoKSB7XG4gICAgICAgICQoJy5jb250ZW50LXdyYXBwZXInKVxuICAgICAgICAgICAgLm5vdCgnLmhvbWUnKVxuICAgICAgICAgICAgLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuICAgIH1cbiAgICBjb250ZW50UGFkZGluZygpO1xuXG4gICAgLy9GaXJzdCBTY3JlZW4gUGFkZGluZy1Ub3BcbiAgICAkKCcuanMtZmlyc3RzY3JlZW4nKS5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpKTtcblxuICAgIC8v0KLQsNCx0Ysg0LIg0L/QvtC40YHQutC1INC90LAg0LPQu9Cw0LLQvdC+0LlcbiAgICBpZiAoJCgnLmpzLXRhYicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXRhYicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFicyk7XG4gICAgfVxuXG4gICAgLy9Nb2JpbGUgbWVudSBzdWJuYXYgdG9nZ2xlXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG5cbiAgICAkKCcuanMtbW9iaWxlLW5hdi1zdWItLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICBpZiAoXG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXInKS5sZW5ndGggPiAwIHx8XG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwIHx8XG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKVxuICAgICkge1xuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlci0tY2FyZCcpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCAkc2xpZGVyID0gJCgnLmpzLWNzLXNsaWRlci0tbmV3cycpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgICAgICRzbGlkZXIub24oJ2luaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbW91c2VXaGVlbCgkc2xpZGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnVuY3Rpb24gbW91c2VXaGVlbCgkc2xpZGVyKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5vbignd2hlZWwnLCB7ICRzbGlkZXI6ICRzbGlkZXIgfSwgbW91c2VXaGVlbEhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICRzbGlkZXIuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgbmV4dEFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxuICAgICAgICAgICAgcHJldkFycm93OiAnLmNzLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxuICAgICAgICAgICAgLy8gZG90czogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA2LFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgICAgICB2ZXJ0aWNhbDogdHJ1ZSxcbiAgICAgICAgICAgIHZlcnRpY2FsU3dpcGluZzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gbW91c2VXaGVlbEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCAkc2xpZGVyID0gZXZlbnQuZGF0YS4kc2xpZGVyO1xuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBldmVudC5vcmlnaW5hbEV2ZW50LmRlbHRhWTtcbiAgICAgICAgICAgIGlmIChkZWx0YSA+IDApIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyLnNsaWNrKCdzbGlja05leHQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5zbGljaygnc2xpY2tQcmV2Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJylcbiAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxuICAgICAgICAgICAgLmZpcnN0KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJylcbiAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICAgICAkKCcuem9vbScpXG4gICAgICAgICAgICAgICAgLndyYXAoJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIj48L3NwYW4+JylcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJylcbiAgICAgICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgICAgICAuem9vbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCQoJy5qcy1maWx0ZXItc3RpY2t5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtZmlsdGVyLXN0aWNreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXRhbG9nX19jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLmZpbHRlcl9faW5uZXInXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICgkKCcuanMtc3RpY2t5LS1uZXdzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3RpY2t5LS1uZXdzJywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogMTIwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5uZXdzX19jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLm5ld3NfX3NsaWRlcidcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCQoJy5qcy1jYXJ0LXN0aWNreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1jYXJ0LXN0aWNreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXJ0X19pbm5lcicsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5jYXJ0X19zdW0nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vRGF0ZXBpY2tlciBodHRwOi8vdDFtMG4ubmFtZS9haXItZGF0ZXBpY2tlci9kb2NzL2luZGV4LXJ1Lmh0bWxcbiAgICBpZiAoJy5qcy1kYXRlJy5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1kYXRlJykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxuICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtaW5wdXQtaWNvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXG4gICAgICAgICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cbiAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XG4gICAgICAgICAgICBiYXNlQ2xhc3M6ICdtb2RhbC13aW5kb3dfX3dyYXAnLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXG4gICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJy5jcy1zZWxlY3RfX2NvbnRhaW5lcidcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnNlbGVjdDItZHJvcGRvd24sIC5zZWxlY3QyLWNvbnRhaW5lcicpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MignY2xvc2UnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBzaG93TWFza09uSG92ZXI6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgODAwKTtcbiAgICB9KTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA2MCArICdweCcgfSwgMzAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoJy5qcy1nYXJhbnR5LWl0ZW0tLW1vcmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5nYXJhbnR5LWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5pcy1oaWRkZW4nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLWxrLW5hdicpXG4gICAgICAgIC5maW5kKCcubGstbmF2X19pdGVtJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLmpzLWxrLW5hdicpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5say1uYXZfX2l0ZW0nKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogSGVhZGVyLmpzXG4gICAgICovXG4gICAgLy/Qn9GA0Lgg0YHQutGA0L7Qu9C1INC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBINC6INGF0LXQtNC10YDRg1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuICAgICAgICBpZiAoc2Nyb2xsID4gMCkge1xuICAgICAgICAgICAgJCgnLmhlYWRlcicpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8v0J7Rh9C40YLRgdC60LAgINC40L3Qv9GD0YLQsCAg0L/QviDQutC70LjQutGDINC90LAg0LrQvdC+0L/QutGDXG4gICAgJCgnLmpzLWhvbWUtc2VhcmNoLWNsZWFyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWwoJycpO1xuICAgIH0pO1xuICAgIFxuICAgIC8v0JzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOINCw0LrQutC+0YDQtNC10L7QvSDQstC80LXRgdGC0L4g0YLQsNCw0LHQvtCyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgfWVsc2V7XG4gICAgICAgICQoJy5qcy1jYXRlZ29yeS1pdGVtLW1vdmV0bycpLnByZXBlbmRUbygnLmpzLWNhdGVnb3J5LW1vdmV0bycpO1xuICAgIFxuICAgICAgICAkKCcuanMtaGVhZGVyLXBob25lJykuaW5zZXJ0QWZ0ZXIoJy5ob21lLXNlYXJjaCcpO1xuICAgIH1cbiAgICBcbiAgICAvL01vYmlsZSBTZWFyY2hcbiAgICBpZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICAqIENhdGFsb2cuanNcbiAgICAgKi9cbiAgICAvL0NhdGFsb2cgSXRlbSBWaWV3IFRvZ2dsZVxuICAgICQoJy5qcy1zb3J0aW5nLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtc29ydGluZy1idG4nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1zb3J0aW5nLWJ0bi0tbGlzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtcHJvZHVjdHMnKVxuICAgICAgICAgICAgLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcbiAgICB9KTtcbiAgICAkKCcuanMtc29ydGluZy0tYnRuLS10aWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1wcm9kdWN0cycpXG4gICAgICAgICAgICAuZmluZCgnLnByb2R1Y3QtaXRlbScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3QtaXRlbS0td2lkZScpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vRmlsdGVyIE9wZW4gQnRuXG4gICAgJCgnLmpzLWZpbHRlci0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtZmlsdGVyLXN0aWNreScpLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICAkKCcub3ZlcmxheScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgIH0pO1xuICAgIC8vRmlsdGVyIENsb3NlIEJ0blxuICAgICQoJy5qcy1maWx0ZXItLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1maWx0ZXItc3RpY2t5JykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICQoJy5vdmVybGF5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0ZpbHRlciBTZWxlY3QgQWxsXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1jcy1jaGVja2JveC0tcHNldWRvJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLXNlbGVjdC1hbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWx0ZXItY29udGVudCcpXG4gICAgICAgICAgICAuZmluZCgnLmNzLWNoZWNrYm94JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpbHRlci1jb250ZW50JylcbiAgICAgICAgICAgIC5maW5kKCcuY3MtY2hlY2tib3gnKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAvL9Cf0L4g0LrQu9C40LrRgyDQsiDQvdC1INCx0LvQvtC60LAg0YHQutGA0YvQstCw0LXQvCDQtdCz0L5cbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1maWx0ZXItc3RpY2t5LCAuanMtZmlsdGVyLS1vcGVuJykubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJCgnLmpzLWZpbHRlci1zdGlja3knKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgJCgnLm92ZXJsYXknKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH0pO1xuICAgIFxuICAgIGlmICgkKCcjanMtZmlsdGVyLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1maWx0ZXItc2xpZGVyJyk7XG4gICAgICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcbiAgICAgICAgdmFyIHN0YXJ0UHJpY2U7XG4gICAgICAgIHZhciBlbmRQcmljZTtcbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzBdLnZhbCgpID09ICcnKSB7XG4gICAgICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS52YWwoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzFdLnZhbCgpID09ICcnKSB7XG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS52YWwoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIG1pbjogYWxsUHJpY2VTdGFydCxcbiAgICAgICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udmFsKHBhcnNlSW50KHZhbHVlc1toYW5kbGVdKSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICAkKCcjanNQcmljZVN0YXJ0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIuc2V0KFt0aGlzLnZhbHVlLCBudWxsXSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICAkKCcjanNQcmljZUVuZCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNsaWRlci5ub1VpU2xpZGVyLnNldChbbnVsbCwgdGhpcy52YWx1ZV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICAqIGNvbnRhY3RzLmpzXG4gICAgICovXG4gICAgaWYoJCgnLmpzLWNvbnRhY3RzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjggJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgdmFyIGNvbnRhY3RzT3duZXIgPSAkKCcuanMtY29udGFjdHMnKS5maW5kKCcuY29udGFjdHMtb3duZXInKTtcbiAgICAgICAgdmFyIGNvbnRhY3RzUmlnaHRCbG9jayA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0c19fcmlnaHQnKTtcbiAgICBcbiAgICAgICAgY29udGFjdHNPd25lci5hcHBlbmRUbyhjb250YWN0c1JpZ2h0QmxvY2spO1xuICAgIH0gZWxzZSBpZigkKCcuanMtY29udGFjdHMnKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICB2YXIgY29udGFjdHNJdGVtRmlyc3QgPSAkKCcuanMtY29udGFjdHMnKS5maW5kKCcuY29udGFjdHMtaXRlbScpLmZpcnN0KCk7XG4gICAgICAgIHZhciBjb250YWN0c01hcCA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0c19fbWFwJykuZmlyc3QoKTtcbiAgICBcbiAgICAgICAgY29udGFjdHNNYXAuYXBwZW5kVG8oY29udGFjdHNJdGVtRmlyc3QpO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgICogQ2FydC5qc1xuICAgICAqL1xuICAgICQoJy5qcy1jb3VudGVyLS1taW51cycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgdmFyIGNvdW50ID0gcGFyc2VJbnQoJGlucHV0LnZhbCgpKSAtIDE7XG4gICAgICAgIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xuICAgICAgICAkaW5wdXQudmFsKGNvdW50KTtcbiAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnLmpzLWNvdW50ZXItLXBsdXMnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgICRpbnB1dC52YWwocGFyc2VJbnQoJGlucHV0LnZhbCgpKSArIDEpO1xuICAgICAgICAkaW5wdXQuY2hhbmdlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0NhcnQgSXRlbXMgbWFrZSBpbiBhIGNvbHVtbiBhdCB3dyA8PSA0ODBcbiAgICAkKHdpbmRvdykucmVzaXplKHByb2R1Y3RUcmFuc2Zvcm0pO1xuICAgIGZ1bmN0aW9uIHByb2R1Y3RUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgICAgICQoJy5qcy1jYXJ0LWl0ZW1zJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnByb2R1Y3QtaXRlbScpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1jYXJ0LWl0ZW1zJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnByb2R1Y3QtaXRlbScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9kdWN0VHJhbnNmb3JtKCk7XG4gICAgXG4gICAgLy9UYWJzXG4gICAgJCgnI2NhcnQtdGFiJykudGFicygpO1xuICAgICQoJy5qcy1uZXdzLXRhYicpLnRhYnMoKTtcbiAgICBcblxuICAgIC8qXG4gICAgICogY3Mtc2NyaXB0cy5qc1xuICAgICAqL1xuICAgIC8vQWNjb3JkZW9uXG4gICAgJCgnLmpzLWNzLWFjY29yZGVvbicpXG4gICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgLmZpbmQoJy5jcy1hY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNzLWFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAvL2NzIGRyb3Bkb3duXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvL2NzIGNoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgaW5wdXQgPSBfdGhpcy5maW5kKCdpbnB1dCcpO1xuICAgICAgICBpZiAoaW5wdXQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICBpbnB1dC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIGlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY3MtcmFkaW8tLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtY3MtcmFkaW8tLXBzZXVkbycpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbn0pO1xuXG4vKlxuICAgICAqIGZ1bmN0aW9uXG4gICAgICovXG4vL9Ci0LDQsdGLXG5mdW5jdGlvbiB0YWJzKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3RhYl9fdGl0bGUnKSB7XG4gICAgICAgIHZhciBkYXRhVGFiICAgID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XG4gICAgICAgIHZhciB0YWJUaXRsZSAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fdGl0bGUnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vL3RhYnMgLS0tPiBhY2NvcmRlb25cbmZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XG5cbiAgICAkKCcuanMtdGFiJykuYWRkQ2xhc3MoJ2pzLWNzLWFjY29yZGVvbicpO1xuICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdjcy1hY2NvcmRlb25fX3RpdGxlJykud3JhcCgnPGRpdiBjbGFzcz1cImNzLWFjY29yZGVvbl9faXRlbVwiPicpO1xuXG4gICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpLnJlbW92ZUF0dHIoJ3N0eWxlJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIyXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjJcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIzXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjNcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCI0XCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjRcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCI1XCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjVcIl0nKTtcbiAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpLmFkZENsYXNzKCdjcy1hY2NvcmRlb25fX2NvbnRlbnQnKTtcbiAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XG59XG5cbiJdfQ==
