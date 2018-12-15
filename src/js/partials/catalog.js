/**
 * Catalog.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
(function() {
	const Filter = {
		init: function() {
			this.priceSlider();
			this.filterToggle();
			this.generateBtnApply();
			this.selectAll();

			if ($(window).width() > 768) {
				this.stickyFilter();
			}
		},
		stickyFilter: function() {
			if ($('.js-filter-sticky').length) {
				var sidebar = new StickySidebar('.js-filter-sticky', {
					topSpacing: 10,
					bottomSpacing: 0,
					containerSelector: '.catalog__content',
					innerWrapperSelector: '.filter__inner'
				});
			}
		},
		generateBtnApply: function() {
			let $filter = $('.js-filter');
			let $item = $filter.find('.js-cs-checkbox');
			let render = true;

			$item.on('click', function(e) {
				_renderBtn($(this));

				if ($(window).width() >= 768) {
					$(this)
						.parent()
						.parent()
						.on('mouseleave', function() {
							setTimeout(() => _hide(), 3500);
						});
				}

				$filter.addClass('has-apply');

				e.stopPropagation();
			});

			$(document).on('click', '.js-btn--apply', function(e) {
				_hide();
				e.stopPropagation();
			});

			$('.js-filter-btn--reset').on('click', function(e) {
				_hide();
				e.stopPropagation();
			});

			function _hide() {
				$filter
					.removeClass('has-apply')
					.find('.btn--apply')
					.remove();
			}

			function _renderBtn(el) {
				render = false;
				$(document)
					.find('.btn--apply')
					.remove();
				let $btn = $('<button>');

				$btn.addClass('btn btn--default btn--apply js-btn--apply').text(
					'Применить'
				);
				$btn.appendTo(el);
			}
		},
		priceSlider: function() {
			let $filterSlider = $('#js-filter-slider');
			if ($filterSlider.length) {
				var slider = document.getElementById('js-filter-slider');
				var allPriceStart = $filterSlider.data('start');
				var allPriceEnd = $filterSlider.data('end');
				var spans = [$('#jsPriceStart'), $('#jsPriceEnd')];
				let $priceStart = $('#jsPriceStart');
				let $priceEnd = $('#jsPriceEnd');
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

				$priceStart.on('change', function() {
					slider.noUiSlider.set([this.value, null]);
				});

				$priceEnd.on('change', function() {
					slider.noUiSlider.set([null, this.value]);
				});
			}
		},
		filterToggle: function() {
			let $html = $('html');
			let $overlay = $('.js-overlay');
			let $filterSticky = $('.js-filter-sticky');
			let $btnOpen = $('.js-filter--open');
			let btnOpenOffset = $btnOpen.offset().top;
			let $btnClose = $('.js-filter--close');

			$btnOpen.on('click', _open);

			$btnClose.on('click', _close);

			$(document).on('click', '.overlay--filter', _close);

			$(window).on('scroll', function() {
				let scroll = $(this).scrollTop();
				if (scroll > btnOpenOffset - 10) {
					$btnOpen.css({
						position: 'fixed',
						top: 10,
						bottom: 'auto',
						boxShadow: '0 5px 25px rgba(0,0,0,.2)'
					});
				} else {
					$btnOpen.removeAttr('style');
				}
			});

			function _open() {
				$filterSticky.addClass('is-open');
				$html.addClass('is-fixed');
				$overlay.addClass('is-active').addClass('overlay--filter');
			}

			function _close() {
				$filterSticky.removeClass('is-open');
				$html.removeClass('is-fixed');
				$overlay.removeClass('is-active');
			}
		},
		selectAll: function() {
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
		}
	};
	Filter.init();

	//Catalog Item View Toggle
	$('.js-sorting-btn').on('click', function(e) {
		let sorting = $(this).data('sorting');

		$('.js-sorting-btn').removeClass('is-active');
		$(this).addClass('is-active');

		if (sorting == '2') {
			$('.js-products').addClass('layout-two-column');
		} else {
			$('.js-products').removeClass('layout-two-column');
		}

		setTimeout(() => {
			Base.setHeight();
		}, 300);
	});
})();
