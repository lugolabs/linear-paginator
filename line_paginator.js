(function($) {

	var LinePaginator = function(element, options) {
		this._element    = $(element);
		this._options    = options;
		this._links      = this._element.find('a');
		this._current    = null;
		this._top        = this._element.find('.line-paginator-top');
		this._topWidth   = this._top.width();
		this._init();
	};

	LinePaginator.prototype = {

		_init: function() {
			this._current = this._links.eq(0);
			this._current.addClass('current');
			this._bind(this);
			this._toCurrent();
		},

		_navigate: function(el, trigger) {
			var index = this._links.index(el),
				link = this._links.eq(index);
			if (link.hasClass('current')) return;
			this._current.removeClass('current');
			this._current = link;
			this._toCurrent();

			if (!trigger) return;
			this._current.addClass('current');

			// setTimeout(function() {
			// 	location.href = el.href;
			// }, 600);
		},

		_toCurrent: function() {
			var initialPosition = this._current.position(),
				adjustment = (this._current.outerWidth() - this._topWidth) / 2,
				left = initialPosition.left + adjustment - 2;
			this._top.css({left: left});
		},

		_bind: function(self) {
			this._links
				.click(function(e) {
					e.preventDefault();
					self._navigate(this, true);
				});
		}

	};

	$.fn.linePaginator = function(options) {
		this.each(function() {
			new LinePaginator(this, options);
			return this;
		});
	};

}(jQuery));