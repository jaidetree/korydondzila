$ = require 'jquery'

$(window).on 'scroll', ->
  if $(window).scrollTop() > 0
    $('#l-header').addClass('compact')
  else
    $('#l-header').removeClass('compact')

$('#l-header .page a, a.scroll').click (e) ->
  target = $(e.currentTarget).attr('href')
  top = $(target).offset().top - 80
  scrollTop = $(window).scrollTop()
  e.preventDefault()
  offset = Math.abs(scrollTop - top)
  time = offset * 75 / 100 
  $('html, body').animate({
    scrollTop: top
  }, time)
