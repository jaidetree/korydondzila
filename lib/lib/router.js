(function() {
  var Router;

  Router = (function() {

    /*
    A simple class for loading the routes
     */
    Router.prototype.controllers = {};

    function Router(_at_routes) {
      this.routes = _at_routes;
      this.load(this.routes);
    }

    Router.prototype.applyTo = function(app) {
      var route, uri, _ref, _results;
      _ref = this.routes;
      _results = [];
      for (uri in _ref) {
        route = _ref[uri];
        _results.push(app.use(uri, this.controllers[route]));
      }
      return _results;
    };

    Router.prototype.load = function(routes) {
      var route, uri, _results;
      _results = [];
      for (uri in routes) {
        route = routes[uri];
        if (!this.controllers[route]) {
          _results.push(this.controllers[route] = require('../controllers/' + route));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Router;

  })();

  module.exports = Router;

}).call(this);
