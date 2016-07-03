import {subscribe, getTodo} from '../todo'

let graphArea
const unsubscribe = {
  store: null,
  todo: null,
}

export default toggleGraph

function toggleGraph() {
  if (graphArea) {
    graphArea.remove()
    graphArea = null
    unsubscribe.store()
    unsubscribe.todo()
    return false
  } else {
    graphArea = document.createElement('div')
    document.body.querySelector('.graph-area-container').appendChild(graphArea)
    const {storage} = getTodo()
    loadAndRenderGraph(graphArea, storage)
    updateTodoSubscription()
    updateStoreSubscription(storage)
    return true
  }
}

function updateTodoSubscription() {
  if (unsubscribe.todo) {
    unsubscribe.todo()
  }
  unsubscribe.todo = subscribe(function onTodoUpdate() {
    const {storage} = getTodo()
    updateStoreSubscription(storage)
    loadAndRenderGraph(graphArea, storage)
  })
}

function updateStoreSubscription(store) {
  if (unsubscribe.store) {
    unsubscribe.store()
  }
  unsubscribe.store = store.subscribe(function onStoreUpdate() {
    loadAndRenderGraph(graphArea, store)
  })
}

function loadAndRenderGraph(node, store) {
  System.import('./render').then(({default: renderGraph}) => {
    renderGraph(node, store)
  })
}
