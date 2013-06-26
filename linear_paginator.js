(function($) {

	var _defaults = {
		timeout:    600,
		startIndex: 1,

		action: function(el) {
			document.location.href = el.href;
		}
	};

	var LinePaginator = function(element, options) {
		this._element    = $(element);
		this._options    = $.extend({}, _defaults, options);
		this._links      = this._element.find('a');
		this._current    = null;
		this._top        = this._element.find('.line-paginator-top');
		this._topWidth   = this._top.width();
		this._init();
	};

	LinePaginator.prototype = {

		_init: function() {
			this._current = this._links.eq(this._options.startIndex);
			this._current.addClass('current');
			this._bind(this);
			this._toCurrent();
		},

		_activate: function(el, trigger) {
			if (this._animating) return;

			var index = this._links.index(el),
				link = this._links.eq(index);
			
			if (link.hasClass('current')) return;

			this._current.removeClass('current');
			this._current = link;
			this._toCurrent();

			if (!trigger) return;
			
			this._current.addClass('current');
			this._action(el);

		},

		_action: function(el) {
			var self = this;
			if (this._options.timeout) {
				this._animating = true;

				setTimeout(function() {
					self._animating = false;
					self._options.action.apply(self, [el]);
				}, this._options.timeout);

			} else {
				action.apply(this, [el]);
			}
		},

		_navigate: function(el) {
			document.location.href = el.href;
		},

		_toCurrent: function() {
			var initialPosition = this._current.position(),
				adjustment = (this._current.outerWidth() - this._topWidth) / 2,
				left = initialPosition.left + adjustment - 2;
			this._top.css({left: left});
		},

		_bind: function(self) {
			this._links.on('click', function(e) {
				e.preventDefault();
				self._activate(this, true);
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