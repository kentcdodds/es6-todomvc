/*global NodeList */
(function(window) {
  'use strict'

  // Get element(s) by CSS selector:
  window.qs = function(selector, scope) {
    return (scope || document).querySelector(selector)
  }

  window.qsa = function(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  }


  window.log = function log() {
    if (window.console && window.console.log) {
      window.console.log.apply(window.console, arguments) // eslint-disable-line
    }
  }

  // addEventListener wrapper:
  window.$on = function(target, type, callback, useCapture) {
    target.addEventListener(type, callback, !!useCapture)
  }

  // Attach a handler to event for all elements that match the selector,
  // now or in the future, based on a root element
  window.$delegate = function(target, selector, type, handler) {
    function dispatchEvent(event) {
      var targetElement = event.target
      var potentialElements = window.qsa(selector, target)
      var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0

      if (hasMatch) {
        handler.call(targetElement, event)
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    var useCapture = type === 'blur' || type === 'focus'

    window.$on(target, type, dispatchEvent, useCapture)
  }

  // Find the element's parent with the given tag name:
  // $parent(qs('a'), 'div');
  window.$parent = function(element, tagName) {
    if (!element.parentNode) {
      return
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode
    }
    return window.$parent(element.parentNode, tagName)
  }

  // removes an element from an array
  // const x = [1,2,3]
  // remove(x, 2)
  // x ~== [1,3]
  window.remove = function remove(array, thing) {
    const index = array.indexOf(thing)
    if (index === -1) {
      return array
    }
    array.splice(index, 1)
  }

  // pad the left of the given string by the given size with the given character
  // leftPad('10', 3, '0') -> 010
  window.leftPad = function leftPad(str, size, padWith) {
    if (size <= str.length) {
      return str
    } else {
      return Array(size - str.length + 1).join(padWith || '0') + str
    }
  }

  // Allow for looping on nodes by chaining:
  // qsa('.foo').forEach(function () {})
  NodeList.prototype.forEach = Array.prototype.forEach
})(window)
