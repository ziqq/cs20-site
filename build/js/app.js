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
    if ($('.js-cs-slider--news').length > 0) {
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


        $slider.find('.slick-slide').first().addClass('is-checked');
        $slider.find('.slick-slide').on('click', function () {
            $('.js-cs-slider--news').find('.slick-slide').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    }

    if ($('.js-cs-slider').length > 0) {
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
    }

    if ($('.js-cs-slider--card').length > 0) {
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
    }

    if ($(window).width() > 480) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNvbnRlbnRQYWRkaW5nIiwibm90IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJ3aW5kb3ciLCJ3aWR0aCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwidGFicyIsIm9uIiwicGFyZW50IiwiZmluZCIsImFkZENsYXNzIiwiY2xvc2VzdCIsInJlbW92ZUNsYXNzIiwibW91c2VXaGVlbEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNsaWRlciIsImRhdGEiLCJkZWx0YSIsIm9yaWdpbmFsRXZlbnQiLCJkZWx0YVkiLCJzbGljayIsIm1vdXNlV2hlZWwiLCJhcnJvd3MiLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwidmVydGljYWwiLCJ2ZXJ0aWNhbFN3aXBpbmciLCJmaXJzdCIsImRvdHMiLCJ3cmFwIiwiem9vbSIsInNpZGViYXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJjbGljayIsImZvY3VzIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJ0b3VjaCIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJ0YXJnZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJlIiwiaW5wdXRtYXNrIiwibWFzayIsInNob3dNYXNrT25Ib3ZlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJlbGVtZW50Q2xpY2siLCJhdHRyIiwiZGVzdGluYXRpb24iLCJvZmZzZXQiLCJ0b3AiLCJ0YWJUcmFuc2Zvcm0iLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwidmFsIiwicHJlcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJwcm9wIiwic2xpZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGxQcmljZVN0YXJ0IiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsInBhcnNlSW50Iiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0IiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwic2V0IiwidmFsdWUiLCJjb250YWN0c093bmVyIiwiY29udGFjdHNSaWdodEJsb2NrIiwiYXBwZW5kVG8iLCJjb250YWN0c0l0ZW1GaXJzdCIsImNvbnRhY3RzTWFwIiwiJGlucHV0IiwiY291bnQiLCJjaGFuZ2UiLCJyZXNpemUiLCJwcm9kdWN0VHJhbnNmb3JtIiwic2xpZGVVcCIsInNsaWRlRG93biIsIl90aGlzIiwiaW5wdXQiLCJpcyIsImNsYXNzTmFtZSIsImRhdGFUYWIiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJDb250ZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRhYlRpdGxlIiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsInRhYiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekIsYUFBU0MsY0FBVCxHQUEwQjtBQUN0QkgsVUFBRSxrQkFBRixFQUNLSSxHQURMLENBQ1MsT0FEVCxFQUVLQyxHQUZMLENBRVMsYUFGVCxFQUV3QkwsRUFBRSxTQUFGLEVBQWFNLFdBQWIsQ0FBeUIsSUFBekIsQ0FGeEI7QUFHSDtBQUNESDs7QUFFQTtBQUNBSCxNQUFFLGlCQUFG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bkM7QUFDQXlILFFBQUkxSCxJQUFKLENBQVMsaUJBQVQsRUFBNEJzSCxNQUE1QjtBQUNIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGNvbnRlbnRQYWRkaW5nKCkge1xuICAgICAgICAkKCcuY29udGVudC13cmFwcGVyJylcbiAgICAgICAgICAgIC5ub3QoJy5ob21lJylcbiAgICAgICAgICAgIC5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICB9XG4gICAgY29udGVudFBhZGRpbmcoKTtcblxuICAgIC8vRmlyc3QgU2NyZWVuIFBhZGRpbmctVG9wXG4gICAgJCgnLmpzLWZpcnN0c2NyZWVuJykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKSk7XG5cbiAgICAvL9Ci0LDQsdGLINCyINC/0L7QuNGB0LrQtSDQvdCwINCz0LvQsNCy0L3QvtC5XG4gICAgaWYgKCQoJy5qcy10YWInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhYnMpO1xuICAgIH1cblxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLm1vYmlsZS1uYXYtLXN1YicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG4gICAgaWYgKCQoJy5qcy1jcy1zbGlkZXItLW5ld3MnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0ICRzbGlkZXIgPSAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJyk7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICAgICAgJHNsaWRlci5vbignaW5pdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBtb3VzZVdoZWVsKCRzbGlkZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBtb3VzZVdoZWVsKCRzbGlkZXIpIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyLm9uKCd3aGVlbCcsIHsgJHNsaWRlcjogJHNsaWRlciB9LCBtb3VzZVdoZWVsSGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJHNsaWRlci5zbGljayh7XG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICAvLyBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDMwMDAsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZlcnRpY2FsOiB0cnVlLFxuICAgICAgICAgICAgdmVydGljYWxTd2lwaW5nOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBtb3VzZVdoZWVsSGFuZGxlcihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0ICRzbGlkZXIgPSBldmVudC5kYXRhLiRzbGlkZXI7XG4gICAgICAgICAgICBjb25zdCBkZWx0YSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGVsdGFZO1xuICAgICAgICAgICAgaWYgKGRlbHRhID4gMCkge1xuICAgICAgICAgICAgICAgICRzbGlkZXIuc2xpY2soJ3NsaWNrTmV4dCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyLnNsaWNrKCdzbGlja1ByZXYnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRzbGlkZXJcbiAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxuICAgICAgICAgICAgLmZpcnN0KClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAkc2xpZGVyXG4gICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtY3Mtc2xpZGVyLS1uZXdzJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zbGljay1zbGlkZScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAgICAgXG4gICAgaWYoJCgnLmpzLWNzLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWNzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1uZXh0JyxcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5jcy1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKCQoJy5qcy1jcy1zbGlkZXItLWNhcmQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1jcy1zbGlkZXItLWNhcmQnKS5zbGljayh7XG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcuY3Mtc2xpZGVyX19hcnJvdy0tcHJldicsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgJCgnLnpvb20nKVxuICAgICAgICAgICAgLndyYXAoJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIj48L3NwYW4+JylcbiAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuem9vbSgpO1xuICAgIH1cblxuXG4gICAgaWYgKCQoJy5qcy1maWx0ZXItc3RpY2t5JykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtZmlsdGVyLXN0aWNreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXRhbG9nX19jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLmZpbHRlcl9faW5uZXInXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICgkKCcuanMtc3RpY2t5LS1uZXdzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICB2YXIgc2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3RpY2t5LS1uZXdzJywge1xuICAgICAgICAgICAgdG9wU3BhY2luZzogMTIwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5uZXdzX19jb250ZW50JyxcbiAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLm5ld3NfX3NsaWRlcidcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCQoJy5qcy1jYXJ0LXN0aWNreScpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB7XG4gICAgICAgIHZhciBzaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXIoJy5qcy1jYXJ0LXN0aWNreScsIHtcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDgwLFxuICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXJ0X19pbm5lcicsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5jYXJ0X19zdW0nXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vRGF0ZXBpY2tlciBodHRwOi8vdDFtMG4ubmFtZS9haXItZGF0ZXBpY2tlci9kb2NzL2luZGV4LXJ1Lmh0bWxcbiAgICBpZiAoJy5qcy1kYXRlJy5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1kYXRlJykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxuICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtaW5wdXQtaWNvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXG4gICAgICAgICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cbiAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XG4gICAgICAgICAgICBiYXNlQ2xhc3M6ICdtb2RhbC13aW5kb3dfX3dyYXAnLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXG4gICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgICAgICAgaGVscGVyczoge1xuICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJy5jcy1zZWxlY3RfX2NvbnRhaW5lcidcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnNlbGVjdDItZHJvcGRvd24sIC5zZWxlY3QyLWNvbnRhaW5lcicpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MignY2xvc2UnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBzaG93TWFza09uSG92ZXI6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgODAwKTtcbiAgICB9KTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXG4gICAgJCgnLmpzLWdvdG8nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA2MCArICdweCcgfSwgMzAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoJy5qcy1nYXJhbnR5LWl0ZW0tLW1vcmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5nYXJhbnR5LWl0ZW0nKVxuICAgICAgICAgICAgLmZpbmQoJy5pcy1oaWRkZW4nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLWxrLW5hdicpXG4gICAgICAgIC5maW5kKCcubGstbmF2X19pdGVtJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLmpzLWxrLW5hdicpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5say1uYXZfX2l0ZW0nKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XG4gICAgICAgIHRhYlRyYW5zZm9ybSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogSGVhZGVyLmpzXG4gICAgICovXG4gICAgLy/Qn9GA0Lgg0YHQutGA0L7Qu9C1INC00L7QsdCw0LLQu9GP0LXQvCDQutC70LDRgdGBINC6INGF0LXQtNC10YDRg1xuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuICAgICAgICBpZiAoc2Nyb2xsID4gMCkge1xuICAgICAgICAgICAgJCgnLmhlYWRlcicpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8v0J7Rh9C40YLRgdC60LAgINC40L3Qv9GD0YLQsCAg0L/QviDQutC70LjQutGDINC90LAg0LrQvdC+0L/QutGDXG4gICAgJCgnLmpzLWhvbWUtc2VhcmNoLWNsZWFyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWwoJycpO1xuICAgIH0pO1xuICAgIFxuICAgIC8v0JzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOINCw0LrQutC+0YDQtNC10L7QvSDQstC80LXRgdGC0L4g0YLQsNCw0LHQvtCyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgfWVsc2V7XG4gICAgICAgICQoJy5qcy1jYXRlZ29yeS1pdGVtLW1vdmV0bycpLnByZXBlbmRUbygnLmpzLWNhdGVnb3J5LW1vdmV0bycpO1xuICAgIFxuICAgICAgICAkKCcuanMtaGVhZGVyLXBob25lJykuaW5zZXJ0QWZ0ZXIoJy5ob21lLXNlYXJjaCcpO1xuICAgIH1cbiAgICBcbiAgICAvL01vYmlsZSBTZWFyY2hcbiAgICBpZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc2VhcmNoJykuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICAqIENhdGFsb2cuanNcbiAgICAgKi9cbiAgICAvL0NhdGFsb2cgSXRlbSBWaWV3IFRvZ2dsZVxuICAgICQoJy5qcy1zb3J0aW5nLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtc29ydGluZy1idG4nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1zb3J0aW5nLWJ0bi0tbGlzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtcHJvZHVjdHMnKVxuICAgICAgICAgICAgLmZpbmQoJy5wcm9kdWN0LWl0ZW0nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcbiAgICB9KTtcbiAgICAkKCcuanMtc29ydGluZy0tYnRuLS10aWxlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1wcm9kdWN0cycpXG4gICAgICAgICAgICAuZmluZCgnLnByb2R1Y3QtaXRlbScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3QtaXRlbS0td2lkZScpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vRmlsdGVyIE9wZW4gQnRuXG4gICAgJCgnLmpzLWZpbHRlci0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtZmlsdGVyLXN0aWNreScpLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICAkKCcub3ZlcmxheScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgIH0pO1xuICAgIC8vRmlsdGVyIENsb3NlIEJ0blxuICAgICQoJy5qcy1maWx0ZXItLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1maWx0ZXItc3RpY2t5JykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICQoJy5vdmVybGF5JykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0ZpbHRlciBTZWxlY3QgQWxsXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jcy1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1jcy1jaGVja2JveC0tcHNldWRvJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLXNlbGVjdC1hbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWx0ZXItY29udGVudCcpXG4gICAgICAgICAgICAuZmluZCgnLmNzLWNoZWNrYm94JylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpbHRlci1jb250ZW50JylcbiAgICAgICAgICAgIC5maW5kKCcuY3MtY2hlY2tib3gnKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAvL9Cf0L4g0LrQu9C40LrRgyDQsiDQvdC1INCx0LvQvtC60LAg0YHQutGA0YvQstCw0LXQvCDQtdCz0L5cbiAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1maWx0ZXItc3RpY2t5LCAuanMtZmlsdGVyLS1vcGVuJykubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJCgnLmpzLWZpbHRlci1zdGlja3knKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgJCgnLm92ZXJsYXknKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH0pO1xuICAgIFxuICAgIGlmICgkKCcjanMtZmlsdGVyLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1maWx0ZXItc2xpZGVyJyk7XG4gICAgICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xuICAgICAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xuICAgICAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcbiAgICAgICAgdmFyIHN0YXJ0UHJpY2U7XG4gICAgICAgIHZhciBlbmRQcmljZTtcbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzBdLnZhbCgpID09ICcnKSB7XG4gICAgICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS52YWwoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKHNwYW5zWzFdLnZhbCgpID09ICcnKSB7XG4gICAgICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS52YWwoKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XG4gICAgICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRydWUsXG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIG1pbjogYWxsUHJpY2VTdGFydCxcbiAgICAgICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNwYW5zW2hhbmRsZV0udmFsKHBhcnNlSW50KHZhbHVlc1toYW5kbGVdKSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICAkKCcjanNQcmljZVN0YXJ0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2xpZGVyLm5vVWlTbGlkZXIuc2V0KFt0aGlzLnZhbHVlLCBudWxsXSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICAkKCcjanNQcmljZUVuZCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNsaWRlci5ub1VpU2xpZGVyLnNldChbbnVsbCwgdGhpcy52YWx1ZV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICAqIGNvbnRhY3RzLmpzXG4gICAgICovXG4gICAgaWYoJCgnLmpzLWNvbnRhY3RzJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjggJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgdmFyIGNvbnRhY3RzT3duZXIgPSAkKCcuanMtY29udGFjdHMnKS5maW5kKCcuY29udGFjdHMtb3duZXInKTtcbiAgICAgICAgdmFyIGNvbnRhY3RzUmlnaHRCbG9jayA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0c19fcmlnaHQnKTtcbiAgICBcbiAgICAgICAgY29udGFjdHNPd25lci5hcHBlbmRUbyhjb250YWN0c1JpZ2h0QmxvY2spO1xuICAgIH0gZWxzZSBpZigkKCcuanMtY29udGFjdHMnKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICB2YXIgY29udGFjdHNJdGVtRmlyc3QgPSAkKCcuanMtY29udGFjdHMnKS5maW5kKCcuY29udGFjdHMtaXRlbScpLmZpcnN0KCk7XG4gICAgICAgIHZhciBjb250YWN0c01hcCA9ICQoJy5qcy1jb250YWN0cycpLmZpbmQoJy5jb250YWN0c19fbWFwJykuZmlyc3QoKTtcbiAgICBcbiAgICAgICAgY29udGFjdHNNYXAuYXBwZW5kVG8oY29udGFjdHNJdGVtRmlyc3QpO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgICogQ2FydC5qc1xuICAgICAqL1xuICAgICQoJy5qcy1jb3VudGVyLS1taW51cycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnaW5wdXQnKTtcbiAgICAgICAgdmFyIGNvdW50ID0gcGFyc2VJbnQoJGlucHV0LnZhbCgpKSAtIDE7XG4gICAgICAgIGNvdW50ID0gY291bnQgPCAxID8gMSA6IGNvdW50O1xuICAgICAgICAkaW5wdXQudmFsKGNvdW50KTtcbiAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnLmpzLWNvdW50ZXItLXBsdXMnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XG4gICAgICAgICRpbnB1dC52YWwocGFyc2VJbnQoJGlucHV0LnZhbCgpKSArIDEpO1xuICAgICAgICAkaW5wdXQuY2hhbmdlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0NhcnQgSXRlbXMgbWFrZSBpbiBhIGNvbHVtbiBhdCB3dyA8PSA0ODBcbiAgICAkKHdpbmRvdykucmVzaXplKHByb2R1Y3RUcmFuc2Zvcm0pO1xuICAgIGZ1bmN0aW9uIHByb2R1Y3RUcmFuc2Zvcm0oKSB7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgICAgICQoJy5qcy1jYXJ0LWl0ZW1zJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnByb2R1Y3QtaXRlbScpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1jYXJ0LWl0ZW1zJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnByb2R1Y3QtaXRlbScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdwcm9kdWN0LWl0ZW0tLXdpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9kdWN0VHJhbnNmb3JtKCk7XG4gICAgXG4gICAgLy9UYWJzXG4gICAgJCgnI2NhcnQtdGFiJykudGFicygpO1xuICAgICQoJy5qcy1uZXdzLXRhYicpLnRhYnMoKTtcbiAgICBcblxuICAgIC8qXG4gICAgICogY3Mtc2NyaXB0cy5qc1xuICAgICAqL1xuICAgIC8vQWNjb3JkZW9uXG4gICAgJCgnLmpzLWNzLWFjY29yZGVvbicpXG4gICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX19pdGVtJylcbiAgICAgICAgLmZpbmQoJy5jcy1hY2NvcmRlb25fX3RpdGxlJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNzLWFjY29yZGVvbl9fY29udGVudCcpXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY3MtYWNjb3JkZW9uX19jb250ZW50JylcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAvL2NzIGRyb3Bkb3duXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvL2NzIGNoZWNrYm94XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1jcy1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgaW5wdXQgPSBfdGhpcy5maW5kKCdpbnB1dCcpO1xuICAgICAgICBpZiAoaW5wdXQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICBpbnB1dC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgIGlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtY3MtcmFkaW8tLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtY3MtcmFkaW8tLXBzZXVkbycpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbn0pO1xuXG4vKlxuICAgICAqIGZ1bmN0aW9uXG4gICAgICovXG4vL9Ci0LDQsdGLXG5mdW5jdGlvbiB0YWJzKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUgPT0gJ3RhYl9fdGl0bGUnKSB7XG4gICAgICAgIHZhciBkYXRhVGFiICAgID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKTtcbiAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiX19jb250ZW50Jyk7XG4gICAgICAgIHZhciB0YWJUaXRsZSAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYl9fdGl0bGUnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJUaXRsZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFiVGl0bGVbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYkNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhVGFiID09IGkpIHtcbiAgICAgICAgICAgICAgICB0YWJDb250ZW50W2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudFtpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vL3RhYnMgLS0tPiBhY2NvcmRlb25cbmZ1bmN0aW9uIHRhYlRyYW5zZm9ybSgpIHtcbiAgICB2YXIgdGFiID0gJCgnLmpzLXRhYi0tdHJhbnNmb3JtJyk7XG5cbiAgICAkKCcuanMtdGFiJykuYWRkQ2xhc3MoJ2pzLWNzLWFjY29yZGVvbicpO1xuICAgIHRhYi5maW5kKCcudGFiX190aXRsZScpLmFkZENsYXNzKCdjcy1hY2NvcmRlb25fX3RpdGxlJykud3JhcCgnPGRpdiBjbGFzcz1cImNzLWFjY29yZGVvbl9faXRlbVwiPicpO1xuXG4gICAgdGFiLmZpbmQoJ1tkYXRhLXRhYi1jb250ZW50PVwiMFwiXScpLnJlbW92ZUF0dHIoJ3N0eWxlJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjBcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIxXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjFcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIyXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjJcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCIzXCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjNcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCI0XCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjRcIl0nKTtcbiAgICB0YWIuZmluZCgnW2RhdGEtdGFiLWNvbnRlbnQ9XCI1XCJdJykuaW5zZXJ0QWZ0ZXIoJ1tkYXRhLXRhYj1cIjVcIl0nKTtcbiAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudCcpLmFkZENsYXNzKCdjcy1hY2NvcmRlb25fX2NvbnRlbnQnKTtcbiAgICB0YWIuZmluZCgnLnRhYl9fY29udGVudGVzJykucmVtb3ZlKCk7XG59XG5cbiJdfQ==
