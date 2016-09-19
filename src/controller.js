export default Controller

/**
* Takes a model and view and acts as the controller between them
*
* @constructor
* @param {object} model The model instance
* @param {object} view The view instance
*/
function Controller(model, view) {
  this.model = model
  this.view = view

  this.view.bind('newTodo', (title) => {
    this.addItem(title)
  })

  this.view.bind('itemEdit', (item) => {
    this.editItem(item.id)
  })

  this.view.bind('itemEditDone', (item) => {
    this.editItemSave(item.id, item.title)
  })

  this.view.bind('itemEditCancel', (item) => {
    this.editItemCancel(item.id)
  })

  this.view.bind('itemRemove', (item) => {
    this.removeItem(item.id)
  })

  this.view.bind('itemToggle', (item) => {
    this.toggleComplete(item.id, item.completed)
  })

  this.view.bind('removeCompleted', (item) => {
    this.removeCompletedItems()
  })

  this.view.bind('toggleAll', (item) => {
    this.toggleAll(status.completed)
  })
}

/**
* Loads and initialises the view
*
* @param {string} '' | 'active' | 'completed'
*/
Controller.prototype.setView = function(locationHash) {
  var route = locationHash.split('/')[1]
  var page = route || ''
  this._updateFilterState(page)
}

/**
* An event to fire on load. Will get all items and display them in the
* todo-list
*/
Controller.prototype.showAll = function() {
  this.model.read((data) => {
    this.view.render('showEntries', data)
  })
}

/**
* Renders all active tasks
*/
Controller.prototype.showActive = function() {
  this.model.read({completed: false}, (data) => {
    this.view.render('showEntries', data)
  })
}

/**
* Renders all completed tasks
*/
Controller.prototype.showCompleted = function() {
  this.model.read({completed: true}, (data) => {
    this.view.render('showEntries', data)
  })
}

/**
* An event to fire whenever you want to add an item. Simply pass in the event
* object and it'll handle the DOM insertion and saving of the new item.
*/
Controller.prototype.addItem = function(title) {

  if (title.trim() === '') {
    return
  }

  this.model.create(title, () => {
    this.view.render('clearNewTodo')
    this._filter(true)
  })
}

/*
* Triggers the item editing mode.
*/
Controller.prototype.editItem = function(id) {
  this.model.read(id, (data) => {
    this.view.render('editItem', {id, title: data[0].title})
  })
}

/*
* Finishes the item editing mode successfully.
*/
Controller.prototype.editItemSave = function(id, title) {
  if (title.trim()) {
    this.model.update(id, {title}, () => {
      this.view.render('editItemDone', {id, title})
    })
  } else {
    this.removeItem(id)
  }
}

/*
* Cancels the item editing mode.
*/
Controller.prototype.editItemCancel = function(id) {
  this.model.read(id, (data) => {
    this.view.render('editItemDone', {id, title: data[0].title})
  })
}

/**
* By giving it an ID it'll find the DOM element matching this ID,
* remove it from the DOM and also remove it from storage.
*
* @param {number} id The ID of the item to remove from the DOM and
* storage
*/
Controller.prototype.removeItem = function(id) {
  
  this.model.remove(id, () => {
    this.view.render('removeItem', id)
  })

  this._filter()
}

/**
* Will remove all completed items from the DOM and storage.
*/
Controller.prototype.removeCompletedItems = function() {
  
  this.model.read({completed: true}, function(data) {
    data.forEach((item) => {
      this.removeItem(item.id)
    })
  })

  this._filter()
}

/**
* Give it an ID of a model and a checkbox and it will update the item
* in storage based on the checkbox's state.
*
* @param {number} id The ID of the element to complete or uncomplete
* @param {object} checkbox The checkbox to check the state of complete
*                          or not
* @param {boolean|undefined} silent Prevent re-filtering the todo items
*/
Controller.prototype.toggleComplete = function(id, completed, silent) {
  
  this.model.update(id, {completed}, () => {
    this.view.render('elementComplete', {
      id,
      completed,
    })
  })

  if (!silent) {
    this._filter()
  }
}

/**
* Will toggle ALL checkboxes' on/off state and completeness of models.
* Just pass in the event object.
*/
Controller.prototype.toggleAll = function(completed) {
  this.model.read({completed: !completed}, (data) => {
    data.forEach((item) => {
      this.toggleComplete(item.id, completed, true)
    })
  })

  this._filter()
}

/**
* Updates the pieces of the page which change depending on the remaining
* number of todos.
*/
Controller.prototype._updateCount = function() {
  this.model.getCount((todos) => {
    this.view.render('updateElementCount', todos.active)
    this.view.render('clearCompletedButton', {
      completed: todos.completed,
      visible: todos.completed > 0
    })

    this.view.render('toggleAll', {checked: todos.completed === todos.total})
    this.view.render('contentBlockVisibility', {visible: todos.total > 0})
  })
}

/**
* Re-filters the todo items, based on the active route.
* @param {boolean|undefined} force  forces a re-painting of todo items.
*/
Controller.prototype._filter = function(force) {
  var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1)

  // Update the elements on the page, which change with each completed todo
  this._updateCount()

  // If the last active route isn't "All", or we're switching routes, we
  // re-create the todo item elements, calling:
  //   this.show[All|Active|Completed]();
  if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
    this['show' + activeRoute]()
  }

  this._lastActiveRoute = activeRoute
}

/**
* Simply updates the filter nav's selected states
*/
Controller.prototype._updateFilterState = function(currentPage) {
  // Store a reference to the active route, allowing us to re-filter todo
  // items as they are marked complete or incomplete.
  currentPage = currentPage.split('?')[0]
  this._activeRoute = currentPage

  if (currentPage === '') {
    this._activeRoute = 'All'
  }

  this._filter()

  this.view.render('setFilter', currentPage)
}
