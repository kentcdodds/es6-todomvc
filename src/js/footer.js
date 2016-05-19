import React from 'react'

export default Footer

function Footer() {
  return (
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Created by <a href="http://twitter.com/oscargodson">Oscar Godson</a></p>
      <p>Refactored by <a href="https://github.com/cburgmer">Christoph Burgmer</a></p>
      <p>Ported to ES6 by <a href="https://twitter.com/kentcdodds">Kent C. Dodds</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  )
}
