import React from 'react'
import ReactDOM from 'react-dom'
import {PieChart} from 'rd3'
import {chain} from 'lodash'

export default updateGraph

function updateGraph(node, store) {
  store.findAll(todos => {
    ReactDOM.render(
      <Graph todos={todos} />,
      node,
    )
  })
}

function Graph({todos}) {
  const data = chain(todos)
    .groupBy('completed')
    .map((group, complete) => ({
      label: complete === 'true' ? 'Complete' : 'Incomplete',
      value: Math.round(group.length / todos.length * 10000) / 100
    }))
    .value()
  return (
    <div>
      There are {todos.length} total todos
      <div>
        <PieChart
          data={data}
          width={450}
          height={310}
          radius={110}
          innerRadius={20}
          sectorBorderColor="white"
          title="Todo Data"
        />
      </div>
    </div>
  )
}
Graph.propTypes = {
  todos: React.PropTypes.array,
}
