$('.js-sorting--btn').on('click', function(){
    $('.js-sorting--btn').removeClass('is-active');
    $(this).addClass('is-active');
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

//По клику в не блока скрываем его  
$(document).click(function(event) {
    if ($(event.target).closest('.js-filter, .js-filter--open').length) return;
    event.stopPropagation();
    $('.js-filter').removeClass('is-open');
    $('html').removeAttr('style');
    $('.overlay').removeAttr('style');
});

//Catalog Filter Acordeon Open
// $('.js-filter').find('.cs-accordeon__item').removeClass('is-open');
// $('.js-filter').find('.cs-accordeon__item').removeClass('is-open');.slideDown();

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

// function stikyBlock() {
//     var elTarget = $('.js-stiky-block'); //То что двигается
//     var elRelative = $('.js-fixed-block'); //Относительно чего

//     if ((elTarget.length > 0 && elRelative.length) && elTarget.height() < elRelative.height() && $(window).width() > 768) {
//         fixTargetByRelativeElement(elTarget, elRelative);
//     }

//     function fixTargetByRelativeElement(elTarget, elRelative) {

//         var scrollPrev = 0; // Предыдущее значение скролла
//         var firstScrollUp = false; // Параметр начала сколла вверх
//         var firstScrollDown = false; // Параметр начала сколла вниз
//         var dHeightCur = fixDelta(elTarget);
//         var dHeightPrev = fixDelta(elTarget);
//         var offset = 0;

//         //Функция вычисления дельты от размера элемента и размера окна
//         function fixDelta(elTarget) {
//             var dHeight = 15;
//             if ($(window).height() < elTarget.outerHeight()) {
//                 return dHeight = elTarget.outerHeight() - $(window).height() + offset + 10;
//             } else return false;
//         }

//         //Фукнция проверки достигли ли верхней границы элемента
//         function topScrolledUp(elTarget, scrolled) {
//             if (elTarget.offset().top - offset - 10 < scrolled) {
//                 return false;
//             } else {
//                 return true;
//                 // console.log('достигли ли верхней границы');
//             }
//         }

//         //Фукнция проверки достигли ли нижней границы элемента
//         function topScrolledDown(elTarget, scrolled) {
//             var dHeight = fixDelta(elTarget);
//             if (elTarget.offset().top - dHeight - offset - 10 > scrolled) {
//                 return false;
//             } else {
//                 return true;
//                 // console.log('достигли ли нижней границы');
//             }
//         }

//         //Фукнция прикрепления элемента по верхней границе
//         function fixTop(elTarget, elRelative, scrolled) {
//             var dHeight = fixDelta(elTarget);
//             if (scrolled > elRelative.offset().top - offset - 10) {
//                 elTarget.css({
//                     "position": "fixed",
//                     "top": offset + 10 + "px"
//                 });
//                 // console.log('прикрепления элемента по верхней границе');
//                 return true;
//             } else return false;
//         }


//         //Фукнция прикрепления элемента  по нижней границе
//         function fixBottom(elTarget, elRelative, scrolled) {
//             var dHeight = fixDelta(elTarget);
//             if (scrolled > elRelative.offset().top + dHeight - offset) {
//                 elTarget.css({
//                     "position": "fixed",
//                     "top": offset - dHeight + "px",
//                     "z-index": 3
//                 });
//                 // console.log('прикрепления элемента по нижней границе');
//                 return true;
//             } else return false;
//         }

//         function fixBottomPos(elTarget, elRelative, scrolled) {
//             var dHeight = fixDelta(elTarget);
//             var maxBottomposition = elRelative.offset().top + elRelative.outerHeight() - elTarget.outerHeight() - offset + dHeight - 9;
//             if (scrolled > maxBottomposition) {
//                 elTarget.css({
//                     "position": "absolute",
//                     "top": maxBottomposition - dHeight + 10 + "px"
//                 });
//                 // console.log('открепления окна в низу по нижним границам целевого и относительного элемента');
//                 return true;
//             } else return false;
//         }

//         //Функция смены fixed на Absolute относительно текущей позиции окна.
//         function fixChanged(elTarget) {
//             var currPos = elTarget.offset().top;
//             elTarget.css({
//                 "position": "absolute",
//                 "top": currPos + "px"
//             });
//             // console.log('смены fixed на Absolute');
//         }

//         //Функция возврата в исходное состояние
//         function fixReset(elTarget, elRelative, scrolled) {
//             if (scrolled <= elRelative.offset().top - 15) {
//                 elTarget.removeAttr("style");
//             }
//         }

//         $(window).scroll(function () {
//             var scrolled = $(window).scrollTop(); // Высота скролла в px

//             // Если скроллим
//             if (scrolled > 0) {
//                 if (scrolled > scrollPrev) { //Если скролим в низ
//                     dHeightCur = fixDelta(elTarget);
//                     if (!fixBottomPos(elTarget, elRelative, scrolled)) { //Если не достигли самого низа
//                         if (topScrolledDown(elTarget, scrolled)) { //Если дошли до нижней границы целевого элемента
//                             if (elTarget.outerHeight() < $(window).height()) {
//                                 fixTop(elTarget, elRelative, scrolled);
//                             } else {
//                                 fixBottom(elTarget, elRelative, scrolled); //Закрепить элемент на экране по нижней границе
//                             }

//                         }
//                     }
//                     if (firstScrollUp || dHeightCur > dHeightPrev) { //Если сменили направление скролла
//                         fixChanged(elTarget);//Открепить и поместить элемент по его текущему положению
//                     }
//                     firstScrollDown = true;
//                     firstScrollUp = false;
//                 }

//                 else { //Если скролим вверх
//                     if (topScrolledUp(elTarget, scrolled)) { //Если достигли верхней точки элемента на экране
//                         if (!fixBottomPos(elTarget, elRelative, scrolled)) { //Если элемент не находится ниже максимальной возможной позиции (выровнен по нижней границе относительного элемента)
//                             if (!fixTop(elTarget, elRelative, scrolled)) { //Если не закрпляем по верхней границе
//                                 fixReset(elTarget, elRelative, scrolled); //Сбросить значения крепления элемента
//                             }
//                         }
//                     }
//                     if (firstScrollDown || dHeightCur > dHeightPrev) { //Если сменили направление скролла
//                         fixChanged(elTarget); //Открепить и поместить элемент по его текущему положению
//                     }
//                     firstScrollDown = false;
//                     firstScrollUp = true;
//                 }

//                 scrollPrev = scrolled;
//                 dHeightPrev = fixDelta(elTarget);
//             }
//         });
//     }
// }stikyBlock();

function stikyBlock() {
    var elTarget = $('.js-stiky-block'); //То что двигается
    var elRelative = $('.js-fixed-block'); //Относительно чего

    if ((elTarget.length > 0 && elRelative.length > 0) && (elTarget.height() < elRelative.height()) && ($(window).width() > 768)) {
        fixTargetByRelativeElement(elTarget, elRelative);
    }

    function fixTargetByRelativeElement(elTarget, elRelative) {

        var scrollPrev = 0; // Предыдущее значение скролла
        var firstScrollUp = false; // Параметр начала сколла вверх
        var firstScrollDown = false; // Параметр начала сколла вниз
        var dHeightCur = fixDelta(elTarget);
        var dHeightPrev = fixDelta(elTarget);
        var offset = $('.header').outerHeight();

        //Функция вычисления дельты от размера элемента и размера окна
        function fixDelta(elTarget) {
            var dHeight = 15;
            if ($(window).height() < elTarget.outerHeight()) {
                return dHeight = elTarget.outerHeight() - $(window).height() + offset + 10;
            } else return false;
        }

        //Фукнция проверки достигли ли верхней границы элемента
        function topScrolledUp(elTarget, scrolled) {
            if (elTarget.offset().top - offset - 10 < scrolled) {
                return false;
            } else {
                return true;
                // console.log('достигли ли верхней границы');
            }
        }

        //Фукнция проверки достигли ли нижней границы элемента
        function topScrolledDown(elTarget, scrolled) {
            var dHeight = fixDelta(elTarget);
            if (elTarget.offset().top - dHeight - offset - 10 > scrolled) {
                return false;
            } else {
                return true;
                // console.log('достигли ли нижней границы');
            }
        }

        //Фукнция прикрепления элемента по верхней границе
        function fixTop(elTarget, elRelative, scrolled) {
            var dHeight = fixDelta(elTarget);
            if (scrolled > elRelative.offset().top - offset - 10) {
                elTarget.css({
                    "position": "fixed",
                    "top": offset + 10 + "px"
                });
                // console.log('прикрепления элемента по верхней границе');
                return true;
            } else return false;
        }


        //Фукнция прикрепления элемента  по нижней границе
        function fixBottom(elTarget, elRelative, scrolled) {
            var dHeight = fixDelta(elTarget);
            if (scrolled > elRelative.offset().top + dHeight - offset) {
                elTarget.css({
                    "position": "fixed",
                    "top": offset - dHeight + "px",
                    "z-index": 3
                });
                // console.log('прикрепления элемента по нижней границе');
                return true;
            } else return false;
        }

        function fixBottomPos(elTarget, elRelative, scrolled) {
            var dHeight = fixDelta(elTarget);
            var maxBottomposition = elRelative.offset().top + elRelative.outerHeight() - elTarget.outerHeight() - offset + dHeight - 10;
            if (scrolled > maxBottomposition) {
                elTarget.css({
                    "position": "absolute",
                    "top": maxBottomposition - dHeight + offset + 10 + "px"
                });
                // console.log('открепления окна в низу по нижним границам целевого и относительного элемента');
                return true;
            } else return false;
        }

        //Функция смены fixed на Absolute относительно текущей позиции окна.
        function fixChanged(elTarget) {
            var currPos = elTarget.offset().top;
            elTarget.css({
                "position": "absolute",
                "top": currPos + "px"
            });
            // console.log('смены fixed на Absolute');
        }

        //Функция возврата в исходное состояние
        function fixReset(elTarget, elRelative, scrolled) {
            if (scrolled <= elRelative.offset().top - 15) {
                elTarget.removeAttr("style");
            }
        }

        $(window).scroll(function () {
            var scrolled = $(window).scrollTop(); // Высота скролла в px
            if (elTarget.height() < elRelative.height()) {

            // Если скроллим
            if (scrolled > 0) {
                if (scrolled > scrollPrev) { //Если скролим в низ
                    dHeightCur = fixDelta(elTarget);
                    if (!fixBottomPos(elTarget, elRelative, scrolled)) { //Если не достигли самого низа
                        if (topScrolledDown(elTarget, scrolled)) { //Если дошли до нижней границы целевого элемента
                            if (elTarget.outerHeight() < $(window).height()) {
                                fixTop(elTarget, elRelative, scrolled);
                            } else {
                                fixBottom(elTarget, elRelative, scrolled); //Закрепить элемент на экране по нижней границе
                            }

                        }
                    }
                    if (firstScrollUp || dHeightCur > dHeightPrev) { //Если сменили направление скролла
                        fixChanged(elTarget);//Открепить и поместить элемент по его текущему положению
                    }
                    firstScrollDown = true;
                    firstScrollUp = false;
                }

                else { //Если скролим вверх
                    if (topScrolledUp(elTarget, scrolled)) { //Если достигли верхней точки элемента на экране
                        if (!fixBottomPos(elTarget, elRelative, scrolled)) { //Если элемент не находится ниже максимальной возможной позиции (выровнен по нижней границе относительного элемента)
                            if (!fixTop(elTarget, elRelative, scrolled)) { //Если не закрпляем по верхней границе
                                fixReset(elTarget, elRelative, scrolled); //Сбросить значения крепления элемента
                            }
                        }
                    }
                    if (firstScrollDown || dHeightCur > dHeightPrev) { //Если сменили направление скролла
                        fixChanged(elTarget); //Открепить и поместить элемент по его текущему положению
                    }
                    firstScrollDown = false;
                    firstScrollUp = true;
                }

                scrollPrev = scrolled;
                dHeightPrev = fixDelta(elTarget);
            }
            
        }
    });
    }
}stikyBlock();