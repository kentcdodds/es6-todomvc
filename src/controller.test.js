require('./controller')
require('./model.stub')
require('./view.stub')

var Controller, getModelStub, getViewStub

describe('controller', function() {
  beforeEach(function() {
    Controller = window.app.Controller
    getModelStub = window.stubs.getModelStub
    getViewStub = window.stubs.getViewStub
  })

  it('can be created', function() {
    var view = getViewStub()
    var model = getModelStub()
    var controller = new Controller(model, view)
    expect(controller).to.exist
  })
})
