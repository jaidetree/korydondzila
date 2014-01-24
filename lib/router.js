var controllers = require('../controllers');
// app.get('/', routes.index);
function map(obj, callback, context) {
    if (!context) {
        context = obj;
    }
    for (var i in obj) {
        callback.call(context, obj[i], i, obj);
    }
}
module.exports = {
    routes: {},
    app: null,

    init: function (routes, app) {
        this.app = app;
        this.setRoutes(this.processRoutes(routes));
    },
    processRoutes: function (routes) {
        var routeList = [];

        map(routes, function (path, routeinfo) {
            var method, uri, controllerName, action, controller;

            method = routeinfo.substr(0, routeinfo.indexOf(' '));
            uri = routeinfo.substr(routeinfo.indexOf(' ') + 1);
            controllerName = path.substr(0, path.indexOf('.'));
            action = path.substr(path.indexOf('.') + 1);
            controller = controllers[controllerName][action];

            routeList.push({
                method: method,
                uri: uri,
                controller: controller,
            });
        }, this);

        return routeList;
    },
    setRoutes: function (processedRoutes) {
        map(processedRoutes, function (route) {
            this.app[route.method](route.uri, route.controller);
        }, this);
    }
};
