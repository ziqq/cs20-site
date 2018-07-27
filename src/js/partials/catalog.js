//Catalog Item View Toggle
$('.js-sorting-btn').on('click', function() {
    $('.js-sorting-btn').removeClass('is-active');
    $(this).addClass('is-active');
});

$('.js-sorting-btn--list').on('click', function() {
    $('.js-products')
        .find('.product-item')
        .addClass('product-item--wide');
});
$('.js-sorting--btn--tile').on('click', function() {
    $('.js-products')
        .find('.product-item')
        .removeClass('product-item--wide');
});

//Filter Open Btn
$('.js-filter--open').on('click', function() {
    $('.js-filter-sticky').addClass('is-open');
    $('html').css('overflow', 'hidden');
    $('.overlay').css('display', 'block');
});
//Filter Close Btn
$('.js-filter--close').on('click', function() {
    $('.js-filter-sticky').removeClass('is-open');
    $('html').removeAttr('style');
    $('.overlay').removeAttr('style');
});

//Filter Select All
$(document).on('click', '.js-cs-checkbox--pseudo', function() {
    if ($(this).hasClass('is-checked')) {
        $(this).removeClass('is-checked');
    } else {
        $('.js-cs-checkbox--pseudo').removeClass('is-checked');
        $(this).addClass('is-checked');
    }
    return false;
});

$('.js-select-all').on('click', function() {
    $(this)
        .closest('.js-filter-content')
        .find('.cs-checkbox')
        .addClass('is-checked');
    $(this)
        .closest('.js-filter-content')
        .find('.cs-checkbox')
        .find('input')
        .prop('checked', true);
    return false;
});

//По клику в не блока скрываем его
$(document).click(function(event) {
    if ($(event.target).closest('.js-filter-sticky, .js-filter--open').length)
        return;
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

    slider.noUiSlider.on('update', function(values, handle) {
        spans[handle].val(parseInt(values[handle]));
    });

    $('#jsPriceStart').on('change', function() {
        slider.noUiSlider.set([this.value, null]);
    });

    $('#jsPriceEnd').on('change', function() {
        slider.noUiSlider.set([null, this.value]);
    });
}
