/* eslint import/namespace:0 */
import {$on, qsa, removeClass} from '../../js/helpers'
import * as facts from './facts'

$on(window, 'load', function() {
  removeClass(qsa('.hide'), 'hide')
})

const factsList = document.getElementById('facts-list')
const factText = document.getElementById('fact-text')

$on(factsList, 'click', ({target: {dataset: {fact}}}) => {
  if (!fact) {
    factText.innerText = facts.defaultFact
    return
  }
  factText.innerText = facts[fact]
})
