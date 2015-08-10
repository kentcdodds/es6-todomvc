/*global app, $on */
require('todomvc-common/base.css');
require('todomvc-app-css/index.css');
require('./view');
require('./helpers');
require('./controller');
require('./model');
require('./store');
require('./template');
(function () {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Todo(name) {
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var todo;

	function setView() {
		todo.controller.setView(document.location.hash);
	}

	$on(window, 'load', function() {
		todo = new Todo('todos-vanillajs');
		setView();
	});
	$on(window, 'hashchange', setView);
})();
