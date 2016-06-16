/* global app, $on */
'use strict'

require('./app')
require('./helpers')

$on(window, 'load', app.onLoad)
$on(window, 'hashchange', app.onLoad)
