var Controller = require('./controller')
var getModelStub = require('./model.stub')
var getViewStub = require('./view.stub')

describe('controller', function() {
  it('can be created', function() {
    var view = getViewStub()
    var model = getModelStub()
    var controller = new Controller(model, view)
    expect(controller).to.exist
  })
})
