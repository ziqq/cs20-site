//Catalog Item View Toggle
$('.js-sorting-btn').on('click', function(){
    $('.js-sorting-btn').removeClass('is-active');
    $(this).addClass('is-active');
});

$('.js-sorting-btn--list').on('click', function(){
    $('.js-products').find('.product-item').addClass('product-item--wide');
});
$('.js-sorting--btn--tile').on('click', function(){
    $('.js-products').find('.product-item').removeClass('product-item--wide');
});

//Filter Open Btn
$('.js-filter--open').on('click', function(){
    $('.js-filter').addClass('is-open');
    $('html').css('overflow', 'hidden');
    $('.overlay').css('display', 'block');
});
//Filter Close Btn
$('.js-filter--close').on('click', function(){
    $('.js-filter').removeClass('is-open');
    $('html').removeAttr('style');
    $('.overlay').removeAttr('style');
});

//Filter Select All
$('.js-select-all').on('click', function(){
    $(this).closest('.js-filter-content').find('.cs-checkbox').addClass('is-checked');
    console.log('');
});

//По клику в не блока скрываем его  
$(document).click(function(event) {
    if ($(event.target).closest('.js-filter, .js-filter--open').length) return;
    event.stopPropagation();
    $('.js-filter').removeClass('is-open');
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
        startPrice = parseInt(spans[0].text())
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

