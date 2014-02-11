(function () {
    window.App = {
        util: {},
        modules: {},
        views: {}
    };

    App.util.pick = function () {
        _.each(arguments, function (item) {
            if (item && item !== "") {
                return item;
            }
        });
    };
    App.make = function (moduleClass, options) {
        var module = $.extend(true, {}, App.modules[moduleClass]);
        options = options || {};
        module.init(options);
        return module;
    };
})();

(function () {
    var KoryDondzila = {};
    KoryDondzila.View = {
        el: {},
        events: {},
        _listeners: [],
        init: function (options) {
            if (options.el) {
                this.$el = $(options.el);
            } else {
                this.$el = $(this.el);
            }
            this._setListeners();
        },
        _setListeners: function () {
            _.each(this.events, function (cb, event) {
                var selector, action, $el, callback;
                action = event.substr(0, event.indexOf(' '));
                selector = event.substr(event.indexOf(' ') + 1);
                callback = _.bind(this[cb], this);
                this.$el.on(action, selector || false, callback);
                this._listeners.push({
                    action: action,
                    selector: selector,
                    cb: cb
                });
            }, this);
        },
        _removeListeners: function () {
            _.each(this._listeners, function (listener) {
                this.$el.off(listener.action, listener.selector, listener.cb);
            });
        },
        render: function () {
            return this;
        },
        remove: function () {
            this._removeListeners();
            this.$el.remove();
        }
    };

    App.modules.MagicHeaderView = $.extend(true, {}, KoryDondzila.View, {
        el: '#l-header',
        init: function (options) {
            KoryDondzila.View.init.call(this, options);
            $(window).on('scroll', _.bind(this.scroll, this));
        },
        scroll: function (e) {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 80 && !this.$el.hasClass('compact')) {
                this.$el.addClass('compact');
            }
            else if ( scrollTop < 80 && this.$el.hasClass('compact')) {
                this.$el.removeClass('compact');
            }
        },
        remove: function (e) {
            $(window).off('scroll', _.bind(this.scroll, this));
            KoryDondzila.View.remove.call(this, e);
        }
    });
    App.modules.FeaturedProjectView = $.extend(true, {}, KoryDondzila.View, {
        el: '#featured-project',
        init: function (options) {
            KoryDondzila.View.init.call(this, options);
            this.totalSlides = 0;
            this.currentSlide = 0;
            this.render();
        },
        events: {
            'click .ui .next': 'next',
            'click .ui .prev': 'prev'
        },
        next: function () {
            this.currentSlide += 1;
            if (this.currentSlide >= this.totalSlides) {
                return false;
            }
            this.$el.find('li:eq(0)').css({ 'margin-left': (-1 * this.currentSlide * 100) + '%' });
        },
        prev: function () {
            this.currentSlide -= 1;
            if (this.currentSlide < 0) {
                return false;
            }
            this.$el.find('li:eq(0)').css({ 'margin-left': (-1 * this.currentSlide * 100) + '%' });
        },
        render: function () {
            this.totalSlides = this.$el.find('li').length;
            return this;
        }
    });
    window.KoryDondzila = KoryDondzila;
})();

$(document).ready(function () {
    App.views.magicHeaderView = App.make('MagicHeaderView');
    App.views.FeaturedProjectView = App.make('FeaturedProjectView');
});
