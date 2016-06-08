import getModelStub from './model.stub'
import getViewStub from './view.stub'
import Controller from './controller'

describe('controller', () => {
  it('can be created', () => {
    const view = getViewStub()
    const model = getModelStub()
    const controller = new Controller(model, view)
    expect(controller).to.exist
  })
})
