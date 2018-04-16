$('.js-sorting--btn').on('click', function(){
    $('.js-sorting--btn').removeClass('is-active');
    $(this).addClass('is-active');
    console.log('test');
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