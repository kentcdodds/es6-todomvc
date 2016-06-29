import 'todomvc-app-css/index.css'

import View from './view'
import {log} from './helpers'
import Controller from './controller'
import Model from './model'
import Store from './store'
import Template from './template'

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

export function onLoad() { // eslint-disable-line import/prefer-default-export
  const todo = new Todo('todos-vanillajs')
  todo.controller.setView(document.location.hash)
  log('view set')
}
