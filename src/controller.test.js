import Controller from './controller'
import getModelStub from './model.stub'
import getViewStub from './view.stub'

describe('controller', function() {
  it('can be created', function() {
    var view = getViewStub()
    var model = getModelStub()
    var controller = new Controller(model, view)
    expect(controller).to.exist
  })
})
