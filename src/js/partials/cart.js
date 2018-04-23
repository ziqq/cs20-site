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

//Initial Sticky Block in Cart
if ($('.content-wrapper').hasClass('cart') && $(window).width() > 1024) {
    stikyBlock();
}

//Cart Items make in a column at ww <= 480
if ($(window).width() <= 480) {
    $('.js-cart-items').find('.product-item').removeClass('product-item--wide');
}
