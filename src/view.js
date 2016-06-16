/* eslint no-invalid-this: 0 */
import {qs, qsa, $on, $parent, $delegate} from './helpers'

export default class View {
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
    const elem = qs(`[data-id="${id}"]`)

    if (elem) {
      this.$todoList.removeChild(elem)
    }
  }

  _clearCompletedButton(completedCount, visible) {
    this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount)
    this.$clearCompleted.style.display = visible ? 'block' : 'none'
  }

  _setFilter(currentPage) {
    qs('.filters .selected').className = ''
    qs(`.filters [href="#/${currentPage}"]`).className = 'selected'
  }

  _elementComplete(id, completed) {
    const listItem = qs(`[data-id="${id}"]`)

    if (!listItem) {
      return
    }

    listItem.className = completed ? 'completed' : ''

    // In case it was toggled from an event and not by clicking the checkbox
    qs('input', listItem).checked = completed
  }

  _editItem(id, title) {
    const listItem = qs(`[data-id="${id}"]`)

    if (!listItem) {
      return
    }

    listItem.className = `${listItem.className} editing`

    const input = document.createElement('input')
    input.className = 'edit'

    listItem.appendChild(input)
    input.focus()
    input.value = title
  }

  _editItemDone(id, title) {
    const listItem = qs(`[data-id="${id}"]`)

    if (!listItem) {
      return
    }

    const input = qs('input.edit', listItem)
    listItem.removeChild(input)

    listItem.className = listItem.className.replace('editing', '')

    qsa('label', listItem).forEach(label => {
      label.textContent = title
    })
  }

  render(viewCmd, parameter) {
    const that = this
    const viewCommands = {
      showEntries() {
        that.$todoList.innerHTML = that.template.show(parameter)
      },
      removeItem() {
        that._removeItem(parameter)
      },
      updateElementCount() {
        that.$todoItemCounter.innerHTML = that.template.itemCounter(parameter)
      },
      clearCompletedButton() {
        that._clearCompletedButton(parameter.completed, parameter.visible)
      },
      contentBlockVisibility() {
        that.$main.style.display = that.$footer.style.display = parameter.visible ? 'block' : 'none'
      },
      toggleAll() {
        that.$toggleAll.checked = parameter.checked
      },
      setFilter() {
        that._setFilter(parameter)
      },
      clearNewTodo() {
        that.$newTodo.value = ''
      },
      elementComplete() {
        that._elementComplete(parameter.id, parameter.completed)
      },
      editItem() {
        that._editItem(parameter.id, parameter.title)
      },
      editItemDone() {
        that._editItemDone(parameter.id, parameter.title)
      }
    }

    viewCommands[viewCmd]()
  }

  _itemId(element) {
    const li = $parent(element, 'li')
    return parseInt(li.dataset.id, 10)
  }

  _bindItemEditDone(handler) {
    const that = this
    $delegate(that.$todoList, 'li .edit', 'blur', function() {
      if (!this.dataset.iscanceled) {
        handler({
          id: that._itemId(this),
          title: this.value
        })
      }
    })

    $delegate(that.$todoList, 'li .edit', 'keypress', function(event) {
      if (event.keyCode === that.ENTER_KEY) {
        // Remove the cursor from the input when you hit enter just like if it
        // were a real form
        this.blur()
      }
    })
  }

  _bindItemEditCancel(handler) {
    const that = this
    $delegate(that.$todoList, 'li .edit', 'keyup', function(event) {
      if (event.keyCode === that.ESCAPE_KEY) {
        this.dataset.iscanceled = true
        this.blur()

        handler({id: that._itemId(this)})
      }
    })
  }

  bind(event, handler) { // eslint-disable-line
    const that = this
    if (event === 'newTodo') {
      $on(that.$newTodo, 'change', () => {
        handler(that.$newTodo.value)
      })

    } else if (event === 'removeCompleted') {
      $on(that.$clearCompleted, 'click', () => {
        handler()
      })

    } else if (event === 'toggleAll') {
      $on(that.$toggleAll, 'click', function() {
        handler({completed: this.checked})
      })

    } else if (event === 'itemEdit') {
      $delegate(that.$todoList, 'li label', 'dblclick', function() {
        handler({id: that._itemId(this)})
      })

    } else if (event === 'itemRemove') {
      $delegate(that.$todoList, '.destroy', 'click', function() {
        handler({id: that._itemId(this)})
      })

    } else if (event === 'itemToggle') {
      $delegate(that.$todoList, '.toggle', 'click', function() {
        handler({
          id: that._itemId(this),
          completed: this.checked
        })
      })

    } else if (event === 'itemEditDone') {
      that._bindItemEditDone(handler)

    } else if (event === 'itemEditCancel') {
      that._bindItemEditCancel(handler)
    }
  }
}
