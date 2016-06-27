/* global app, $on */
require('todomvc-common/base.css')
require('todomvc-app-css/index.css')
require('todomvc-common')
require('./view')
require('./helpers')
require('./controller')
require('./model')
require('./store')
require('./template')
/**
* Sets up a brand new Todo list.
*
* @param {string} name The name of your new to do list.
*/
function Todo(name) {
  this.storage = new app.Store(name)
  this.model = new app.Model(this.storage)
  this.template = new app.Template()
  this.view = new app.View(this.template)
  this.controller = new app.Controller(this.model, this.view)
}

function setView() {
  var todo = new Todo('todos-vanillajs')
  todo.controller.setView(document.location.hash)
}

$on(window, 'load', setView)
$on(window, 'hashchange', setView)
