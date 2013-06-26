describe("LinePaginator", function() {
		var el = null;

		beforeEach(function() {
			el = $('<div class="line-paginator"></div>');
			el.append('<div class="line-paginator-top" style="position:absolute;left:30px;"></div>');
			var links = [
				'<div class="line-paginator-pages">',
					'<a href="javascript:void(0);">Previous</a>',
					'<a href="javascript:void(0);">1</a>',
					'<a href="javascript:void(0);">2</a>',
					'<a href="javascript:void(0);">3</a>',
					'<a href="javascript:void(0);">Next</a>',
			'</div>'
			]
			el.append(links.join(''));
			$('body').append(el);
		});

		afterEach(function() {
			el.remove();
			el = null;
		});

		it("activates the second link by default", function() {
			el.linePaginator();
			expect(el.find('a')[1].className).toBe('current');
		});

		it("activates the clicked link", function() {
			el.linePaginator();
			el.find('a').eq(2).triggerHandler('click');
			expect(el.find('a').eq(2).hasClass('current')).toBe(true);
		});

		it("shifts the current link", function() {
			el.linePaginator();
			var top = el.find('.line-paginator-top');
			var before = top.position();
			el.find('a').eq(2).triggerHandler('click');
			var after = top.position();
			expect(after.left > before.left).toBe(true);
		});

		it("navigates to link's url if no function is specified", function() {
			var called = false,
				hash = '#2',
				originalHref = location.href;
			el.linePaginator();
			el.find('a')[2].href = hash;

			triggerClick();

			runs(function() {

				setTimeout(function() {
					called = true;
				}, 650);
			});

			waitsFor(function() {
				return called;
			}, "the callback to run", 700);

			runs(function() {
				expect(location.hash).toBe(hash);
			});

		});

		it("calls the function specified in options", function() {
			var called = false;
			el.linePaginator({
				action: function(el) {
					called = true;
				}
			});
			
			runs(function() {
				el.find('a').eq(2).triggerHandler('click');
			});
			
			waitsFor(function() {
				return called;
			}, "the callback to run", 700);

			runs(function() {
				expect(called).toBe(true);
			});
		});

		function triggerClick() {
			el.find('a').eq(2).triggerHandler('click');
		}
});