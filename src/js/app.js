import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'
import 'imports?_=lodash!./non_node_modules/sweet-lodash-mixins' // eslint-disable-line

import View from './view'
import {$on, qsa, removeClass} from './helpers'
import Controller from './controller'
import Model from './model'
import Store from './store'
import Template from './template'

var todo

/**
 * Sets up a brand new Todo list.
 *
 * @param {string} name The name of your new to do list.
 */
function Todo(name) {
  this.storage = new Store(name)
  this.model = new Model(this.storage)
  this.template = new Template()
  this.view = new View(this.template)
  this.controller = new Controller(this.model, this.view)
}

function setView() {
  todo.controller.setView(document.location.hash)
}

$on(window, 'load', function() {
  todo = new Todo('todos-vanillajs')
  setView()
  removeClass(qsa('.hide'), 'hide')
})
$on(window, 'hashchange', setView)
