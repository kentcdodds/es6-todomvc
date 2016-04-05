import {qs, qsa, $on, $parent, $delegate} from './helpers'

/**
 * View that abstracts away the browser's DOM completely.
 * It has two simple entry points:
 *
 *   - bind(eventName, handler)
 *     Takes a todo application event and registers the handler
 *   - render(command, parameterObject)
 *     Renders the given command with the options
 */
class View {
  constructor(template) {
    this.template = template

    this.ENTER_KEY = 13
    this.ESCAPE_KEY = 27

    this.$todoList = qs('.todo-list')
    this.$todoItemCounter = qs('.todo-count')
    this.$clearCompleted = qs('.clear-completed')
    this.$main = qs('.main')
    this.$footer = qs('.footer')
    this.$toggleAll = qs('.toggle-all')
    this.$newTodo = qs('.new-todo')
  }
  _removeItem(id) {
    var elem = qs('[data-id="' + id + '"]')

    if (elem) {
      this.$todoList.removeChild(elem)
    }
  }
  _clearCompletedButton(completedCount, visible) {
    this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount)
    this.$clearCompleted.style.display = visible ? 'block' : 'none'
  }
  _editItemDone(id, title) {
    var listItem = qs('[data-id="' + id + '"]')

    if (!listItem) {
      return
    }

    var input = qs('input.edit', listItem)
    listItem.removeChild(input)

    listItem.className = listItem.className.replace('editing', '')

    qsa('label', listItem).forEach(function(label) {
      label.textContent = title
    })
  }
  render(viewCmd, parameter) {
    var viewCommands = {
      showEntries: () => {
        this.$todoList.innerHTML = this.template.show(parameter)
      },
      removeItem: () => {
        this._removeItem(parameter)
      },
      updateElementCount: () => {
        this.$todoItemCounter.innerHTML = this.template.itemCounter(parameter)
      },
      clearCompletedButton: () => {
        this._clearCompletedButton(parameter.completed, parameter.visible)
      },
      contentBlockVisibility: () => {
        this.$main.style.display = this.$footer.style.display = parameter.visible ? 'block' : 'none'
      },
      toggleAll: () => {
        this.$toggleAll.checked = parameter.checked
      },
      setFilter: () => {
        _setFilter(parameter)
      },
      clearNewTodo: () => {
        this.$newTodo.value = ''
      },
      elementComplete: () => {
        _elementComplete(parameter.id, parameter.completed)
      },
      editItem: () => {
        _editItem(parameter.id, parameter.title)
      },
      editItemDone: () => {
        this._editItemDone(parameter.id, parameter.title)
      }
    }

    viewCommands[viewCmd]()
  }
  _bindItemEditDone(handler) {
    $delegate(this.$todoList, 'li .edit', 'blur', () => {
      if (!this.dataset.iscanceled) {
        handler({
          id: _itemId(this),
          title: this.value
        })
      }
    })

    $delegate(this.$todoList, 'li .edit', 'keypress', (event) => {
      if (event.keyCode === this.ENTER_KEY) {
        // Remove the cursor from the input when you hit enter just like if it
        // were a real form
        this.blur()
      }
    })
  }
  _bindItemEditCancel(handler) {
    $delegate(this.$todoList, 'li .edit', 'keyup', (event) => {
      if (event.keyCode === this.ESCAPE_KEY) {
        this.dataset.iscanceled = true
        this.blur()

        handler({id: _itemId(this)})
      }
    })
  }
  bind(event, handler) { // eslint-disable-line complexity
    if (event === 'newTodo') {
      $on(this.$newTodo, 'change', () => {
        handler(this.$newTodo.value)
      })

    } else if (event === 'removeCompleted') {
      $on(this.$clearCompleted, 'click', () => {
        handler()
      })

    } else if (event === 'toggleAll') {
      $on(this.$toggleAll, 'click', () => {
        handler({completed: this.checked})
      })

    } else if (event === 'itemEdit') {
      $delegate(this.$todoList, 'li label', 'dblclick', () => {
        handler({id: _itemId(this)})
      })

    } else if (event === 'itemRemove') {
      $delegate(this.$todoList, '.destroy', 'click', () => {
        handler({id: _itemId(this)})
      })

    } else if (event === 'itemToggle') {
      $delegate(this.$todoList, '.toggle', 'click', () => {
        handler({
          id: _itemId(this),
          completed: this.checked
        })
      })

    } else if (event === 'itemEditDone') {
      this._bindItemEditDone(handler)

    } else if (event === 'itemEditCancel') {
      this._bindItemEditCancel(handler)
    }
  }
}

function _setFilter(currentPage) {
  qs('.filters .selected').className = ''
  qs('.filters [href="#/' + currentPage + '"]').className = 'selected'
}

function _elementComplete(id, completed) {
  var listItem = qs('[data-id="' + id + '"]')

  if (!listItem) {
    return
  }

  listItem.className = completed ? 'completed' : ''

  // In case it was toggled from an event and not by clicking the checkbox
  qs('input', listItem).checked = completed
}

function _editItem(id, title) {
  var listItem = qs('[data-id="' + id + '"]')

  if (!listItem) {
    return
  }

  listItem.className = listItem.className + ' editing'

  var input = document.createElement('input')
  input.className = 'edit'

  listItem.appendChild(input)
  input.focus()
  input.value = title
}

function _itemId(element) {
  var li = $parent(element, 'li')
  return parseInt(li.dataset.id, 10)
}

export default View
