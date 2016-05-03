import {$on} from './helpers'

const factsList = document.getElementById('facts-list')
const factText = document.getElementById('fact-text')

$on(factsList, 'click', ({target: {dataset: {fact}}}) => {
  factText.innerText = fact
})
