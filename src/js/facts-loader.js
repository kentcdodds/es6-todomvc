import {$on} from './helpers'

const factsList = document.getElementById('facts-list')
const factText = document.getElementById('fact-text')

$on(factsList, 'click', ({target: {dataset: {fact}}}) => {
  if (!fact) {
    System.import('./facts/default-fact').then(setFactText)
    return
  }
  System.import('./facts/' + fact).then(setFactText)

  function setFactText({fact: animalFact}) {
    factText.innerText = animalFact
  }
})
