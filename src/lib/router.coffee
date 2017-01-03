class Router
  ###
  A simple class for loading the routes
  ###

  controllers: {}

  constructor: (@routes) ->
    @load @routes

  applyTo: (app) ->
    for uri, route of @routes
      app.use uri, @controllers[route]

  load: (routes) ->
    for uri, route of routes
      if not @controllers[route]
        @controllers[route] = require '../controllers/' + route

module.exports = Router
