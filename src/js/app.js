$(document).ready(function () {

    if ($(window).width() > 768) {
        //wrapper padding
        function wrapOffset(){
            $('.wrapper').css('padding-bottom', $('.footer').outerHeight(true));
        }wrapOffset();
        $(window).on('resize', function(){
            wrapOffset();
        })
    }else{
        $('.js-category-item-moveto').prependTo('.js-category-moveto');
    }
    

    $(window).on("load",function(){
        //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll
        if($('.js-scroll').length > 0){
            $('.js-scroll').niceScroll({
                cursorcolor: '#e0e0e0',
                horizrailenabled: false,
                // autohidemode: false,
                boxzoom: false,
                "verge": "500",
                cursorwidth: '4px',
                cursorborder: 'none',
                cursorborderradius:'0'
            });
            $('.js-scroll').mouseover(function() {
                $(this).getNiceScroll().resize();
            });

        }        
    });

    //Slick Slider https://kenwheeler.github.io/slick/
    if($('.js-cs-slider').length > 0){
        $('.js-cs-slider').slick({
            nextArrow: '.cs-slider__arrow--next',
            prevArrow: '.cs-slider__arrow--prev',
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            autoplaySpeed: 5000,
            autoplay: true,
            dots: true
        });
    }

    //Modal FancyBox 3 https://fancyapps.com/fancybox/3/
    if($('[data-fancybox]').length > 0){
        $('[data-fancybox]').fancybox({
            baseClass : 'bb-window__wrap',      
            // touch: false,
            closeClickOutside : true,
            autoFocus: false,
            helpers: {
                overlay:{
                    locked: false
                }
            }
        });
    }

    //Custom Select https://select2.org/
    if($('.js-select').length > 0 && $(window).width() > 480){
        $('.js-select').select2({
            placeholder: "Select a State",
            container: ".bb-select__container"
        });

        $('.js-select.bb-select--metro').select2({
            templateResult: addUserPic
        });
        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });
        function addUserPic (opt) {
            if (!opt.id) {
                return opt.text;
            }               
            var optimage = $(opt.element).data('image'); 
            if(!optimage){
                return opt.text;
            } else {
                var $opt = $(
                    '<span class="metro-icon metro-icon--' + optimage + '">' + $(opt.element).text() + '</span>'
                    );
                return $opt;
            }
        };
        $(document).click(function(event) {
            if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });
        $(document).on("focus", '.select2-search__field', function(e) {
            e.stopPropagation();
        });
    }else{
        $('.js-select').wrap('<label class="bb-select">');
    }

    //Datepicker http://t1m0n.name/air-datepicker/docs/index-ru.html
    if(('.js-date').length > 0){
        $('.js-date').datepicker({
            dateFormat: 'dd.mm.yy',
            autoClose: true
        });
    }
    if(('.js-date--inverse').length > 0){
        $('.js-date--inverse').datepicker({
            position : 'top left',
            classes  : 'ak-datepicker--inverse',
            dateFormat: 'dd.mm.yy'
        });
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if($('.js-phone-mask').length > 0){
        $('.js-phone-mask').inputmask({"mask": "+7 (999) 999-99-99"});        
    }

    //Toggle Menu Button
    $('.js-nav-toggle').on('click', function() {
        $(this).toggleClass('is-open');
        $('.js-nav').fadeToggle();
        return false;
    });

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    //Click event to scroll to section whith id like href
    $('.js-goto').click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({ scrollTop: destination - 60 + 'px' }, 300);
        return false; 
    });

    //Stop drag
    $("img").on("dragstart", function(event) { event.preventDefault(); });

});