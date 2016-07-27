'use strict'

var app = require('./app')
var helpers = require('./helpers')

helpers.$on(window, 'load', app.onLoad)
helpers.$on(window, 'hashchange', app.onLoad)
