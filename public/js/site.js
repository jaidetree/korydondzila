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
            _.each(this.events, function (event, cb) {
                var selector, action, $el;
                action = event.substr(0, event.indexOf(' ')) + '.kD';
                selector = event.substr(event.indexOf(' ') + 1);
                cb = _.bind(cb, this);
                this.$el.on(action, selector || '', cb);
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
        }
    });
    window.KoryDondzila = KoryDondzila;
})();

$(document).ready(function () {
    App.views.magicHeaderView = App.make('MagicHeaderView');
});
