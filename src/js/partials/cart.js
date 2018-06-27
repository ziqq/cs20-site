$('.js-counter--minus').click(function() {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
});
$('.js-counter--plus').click(function() {
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
    }else{
        $('.js-cart-items').find('.product-item').addClass('product-item--wide');
    }
}productTransform();

$( '#cart-tab' ).tabs();
