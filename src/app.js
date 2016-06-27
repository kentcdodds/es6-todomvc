/* global app, log */
(function(window) {
  'use strict'

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

  function onLoad() {
    var todo = new Todo('todos-vanillajs')
    todo.controller.setView(document.location.hash)
    log('view set')
  }


  // Export to window
  window.app = window.app || {}
  window.app.onLoad = onLoad
})(window)
