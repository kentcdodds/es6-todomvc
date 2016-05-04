import Controller from '../src/js/controller'

describe('controller', () => {
  var subject, model, view

  var setUpModel = function(todos) {
    model.read.and.callFake(function(query, callback) {
      callback = callback || query
      callback(todos)
    })

    model.getCount.and.callFake(function(callback) {

      var todoCounts = {
        active: todos.filter(function(todo) {
          return !todo.completed
        }).length,
        completed: todos.filter(function(todo) {
          return !!todo.completed
        }).length,
        total: todos.length
      }

      callback(todoCounts)
    })

    model.remove.and.callFake(function(id, callback) {
      callback()
    })

    model.create.and.callFake(function(title, callback) {
      callback()
    })

    model.update.and.callFake(function(id, updateData, callback) {
      callback()
    })
  }

  var createViewStub = () => {
    var eventRegistry = {}
    return {
      render: jasmine.createSpy('render'),
      bind: function(event, handler) {
        eventRegistry[event] = handler
      },
      trigger: function(event, parameter) {
        eventRegistry[event](parameter)
      }
    }
  }

  beforeEach(() => {
    model = jasmine.createSpyObj('model', ['read', 'getCount', 'remove', 'create', 'update'])
    view = createViewStub()
    subject = new Controller(model, view)
  })

  it('should show entries on start-up', () => {
    setUpModel([])

    subject.setView('')

    expect(view.render).toHaveBeenCalledWith('showEntries', [])
  })

  describe('routing', () => {

    it('should show all entries without a route', () => {
      var todo = {title: 'my todo'}
      setUpModel([todo])

      subject.setView('')

      expect(view.render).toHaveBeenCalledWith('showEntries', [todo])
    })

    it('should show all entries without "all" route', () => {
      var todo = {title: 'my todo'}
      setUpModel([todo])

      subject.setView('#/')

      expect(view.render).toHaveBeenCalledWith('showEntries', [todo])
    })

    it('should show active entries', () => {
      var todo = {title: 'my todo', completed: false}
      setUpModel([todo])

      subject.setView('#/active')

      expect(model.read).toHaveBeenCalledWith({completed: false}, jasmine.any(Function))
      expect(view.render).toHaveBeenCalledWith('showEntries', [todo])
    })

    it('should show completed entries', () => {
      var todo = {title: 'my todo', completed: true}
      setUpModel([todo])

      subject.setView('#/completed')

      expect(model.read).toHaveBeenCalledWith({completed: true}, jasmine.any(Function))
      expect(view.render).toHaveBeenCalledWith('showEntries', [todo])
    })
  })

  it('should show the content block when todos exists', () => {
    setUpModel([{title: 'my todo', completed: true}])

    subject.setView('')

    expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
      visible: true
    })
  })

  it('should hide the content block when no todos exists', () => {
    setUpModel([])

    subject.setView('')

    expect(view.render).toHaveBeenCalledWith('contentBlockVisibility', {
      visible: false
    })
  })

  it('should check the toggle all button, if all todos are completed', () => {
    setUpModel([{title: 'my todo', completed: true}])

    subject.setView('')

    expect(view.render).toHaveBeenCalledWith('toggleAll', {
      checked: true
    })
  })

  it('should set the "clear completed" button', () => {
    var todo = {id: 42, title: 'my todo', completed: true}
    setUpModel([todo])

    subject.setView('')

    expect(view.render).toHaveBeenCalledWith('clearCompletedButton', {
      completed: 1,
      visible: true
    })
  })

  it('should highlight "All" filter by default', () => {
    setUpModel([])

    subject.setView('')

    expect(view.render).toHaveBeenCalledWith('setFilter', '')
  })

  it('should highlight "Active" filter when switching to active view', () => {
    setUpModel([])

    subject.setView('#/active')

    expect(view.render).toHaveBeenCalledWith('setFilter', 'active')
  })

  describe('toggle all', () => {
    it('should toggle all todos to completed', () => {
      var todos = [{
        id: 42,
        title: 'my todo',
        completed: false
      }, {
        id: 21,
        title: 'another todo',
        completed: false
      }]

      setUpModel(todos)
      subject.setView('')

      view.trigger('toggleAll', {completed: true})

      expect(model.update).toHaveBeenCalledWith(42, {completed: true}, jasmine.any(Function))
      expect(model.update).toHaveBeenCalledWith(21, {completed: true}, jasmine.any(Function))
    })

    it('should update the view', () => {
      var todos = [{
        id: 42,
        title: 'my todo',
        completed: true
      }]

      setUpModel(todos)
      subject.setView('')

      view.trigger('toggleAll', {completed: false})

      expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 42, completed: false})
    })
  })

  describe('new todo', () => {
    it('should add a new todo to the model', () => {
      setUpModel([])

      subject.setView('')

      view.trigger('newTodo', 'a new todo')

      expect(model.create).toHaveBeenCalledWith('a new todo', jasmine.any(Function))
    })

    it('should add a new todo to the view', () => {
      setUpModel([])

      subject.setView('')

      view.render.calls.reset()
      model.read.calls.reset()
      model.read.and.callFake(function(callback) {
        callback([{
          title: 'a new todo',
          completed: false
        }])
      })

      view.trigger('newTodo', 'a new todo')

      expect(model.read).toHaveBeenCalled()

      expect(view.render).toHaveBeenCalledWith('showEntries', [{
        title: 'a new todo',
        completed: false
      }])
    })

    it('should clear the input field when a new todo is added', () => {
      setUpModel([])

      subject.setView('')

      view.trigger('newTodo', 'a new todo')

      expect(view.render).toHaveBeenCalledWith('clearNewTodo')
    })
  })

  describe('element removal', () => {
    it('should remove an entry from the model', () => {
      var todo = {id: 42, title: 'my todo', completed: true}
      setUpModel([todo])

      subject.setView('')
      view.trigger('itemRemove', {id: 42})

      expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function))
    })

    it('should remove an entry from the view', () => {
      var todo = {id: 42, title: 'my todo', completed: true}
      setUpModel([todo])

      subject.setView('')
      view.trigger('itemRemove', {id: 42})

      expect(view.render).toHaveBeenCalledWith('removeItem', 42)
    })

    it('should update the element count', () => {
      var todo = {id: 42, title: 'my todo', completed: true}
      setUpModel([todo])

      subject.setView('')
      view.trigger('itemRemove', {id: 42})

      expect(view.render).toHaveBeenCalledWith('updateElementCount', 0)
    })
  })

  describe('remove completed', () => {
    it('should remove a completed entry from the model', () => {
      var todo = {id: 42, title: 'my todo', completed: true}
      setUpModel([todo])

      subject.setView('')
      view.trigger('removeCompleted')

      expect(model.read).toHaveBeenCalledWith({completed: true}, jasmine.any(Function))
      expect(model.remove).toHaveBeenCalledWith(42, jasmine.any(Function))
    })

    it('should remove a completed entry from the view', () => {
      var todo = {id: 42, title: 'my todo', completed: true}
      setUpModel([todo])

      subject.setView('')
      view.trigger('removeCompleted')

      expect(view.render).toHaveBeenCalledWith('removeItem', 42)
    })
  })

  describe('element complete toggle', () => {
    it('should update the model', () => {
      var todo = {id: 21, title: 'my todo', completed: false}
      setUpModel([todo])
      subject.setView('')

      view.trigger('itemToggle', {id: 21, completed: true})

      expect(model.update).toHaveBeenCalledWith(21, {completed: true}, jasmine.any(Function))
    })

    it('should update the view', () => {
      var todo = {id: 42, title: 'my todo', completed: true}
      setUpModel([todo])
      subject.setView('')

      view.trigger('itemToggle', {id: 42, completed: false})

      expect(view.render).toHaveBeenCalledWith('elementComplete', {id: 42, completed: false})
    })
  })

  describe('edit item', () => {
    it('should switch to edit mode', () => {
      var todo = {id: 21, title: 'my todo', completed: false}
      setUpModel([todo])

      subject.setView('')

      view.trigger('itemEdit', {id: 21})

      expect(view.render).toHaveBeenCalledWith('editItem', {id: 21, title: 'my todo'})
    })

    it('should leave edit mode on done', () => {
      var todo = {id: 21, title: 'my todo', completed: false}
      setUpModel([todo])

      subject.setView('')

      view.trigger('itemEditDone', {id: 21, title: 'new title'})

      expect(view.render).toHaveBeenCalledWith('editItemDone', {id: 21, title: 'new title'})
    })

    it('should persist the changes on done', () => {
      var todo = {id: 21, title: 'my todo', completed: false}
      setUpModel([todo])

      subject.setView('')

      view.trigger('itemEditDone', {id: 21, title: 'new title'})

      expect(model.update).toHaveBeenCalledWith(21, {title: 'new title'}, jasmine.any(Function))
    })

    it('should remove the element from the model when persisting an empty title', () => {
      var todo = {id: 21, title: 'my todo', completed: false}
      setUpModel([todo])

      subject.setView('')

      view.trigger('itemEditDone', {id: 21, title: ''})

      expect(model.remove).toHaveBeenCalledWith(21, jasmine.any(Function))
    })

    it('should remove the element from the view when persisting an empty title', () => {
      var todo = {id: 21, title: 'my todo', completed: false}
      setUpModel([todo])

      subject.setView('')

      view.trigger('itemEditDone', {id: 21, title: ''})

      expect(view.render).toHaveBeenCalledWith('removeItem', 21)
    })

    it('should leave edit mode on cancel', () => {
      var todo = {id: 21, title: 'my todo', completed: false}
      setUpModel([todo])

      subject.setView('')

      view.trigger('itemEditCancel', {id: 21})

      expect(view.render).toHaveBeenCalledWith('editItemDone', {id: 21, title: 'my todo'})
    })

    it('should not persist the changes on cancel', () => {
      var todo = {id: 21, title: 'my todo', completed: false}
      setUpModel([todo])

      subject.setView('')

      view.trigger('itemEditCancel', {id: 21})

      expect(model.update).not.toHaveBeenCalled()
    })
  })
})
