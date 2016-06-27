/* global app, $on */
(function(window) {
  'use strict'

  $on(window, 'load', app.onLoad)
  $on(window, 'hashchange', app.onLoad)
})(window)
