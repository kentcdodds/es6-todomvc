export {qs, qsa, removeClass, $on, $delegate, $parent}

// Get element(s) by CSS selector:
function qs(selector, scope) {
  return (scope || document).querySelector(selector)
}
function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector)
}
function removeClass(el, className) {
  if (el.length) {
    for (var i = 0; i < el.length; i++) {
      removeClass(el[i], className)
    }
    return
  }
  if (el.classList) {
    el.classList.remove(className)
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }
}

// addEventListener wrapper:
function $on(target, type, callback, useCapture) {
  target.addEventListener(type, callback, !!useCapture)
}

// Attach a handler to event for all elements that match the selector,
// now or in the future, based on a root element
function $delegate(target, selector, type, handler) {
  // https://developer.mozilla.org/en-US/docs/Web/Events/blur
  var useCapture = type === 'blur' || type === 'focus'
  $on(target, type, dispatchEvent, useCapture)

  function dispatchEvent(event) {
    var targetElement = event.target
    var potentialElements = qsa(selector, target)
    var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0

    if (hasMatch) {
      handler.call(targetElement, event)
    }
  }
}

// Find the element's parent with the given tag name:
// $parent(qs('a'), 'div');
function $parent(element, tagName) {
  if (!element.parentNode) {
    return undefined
  }
  if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
    return element.parentNode
  }
  return $parent(element.parentNode, tagName)
}

// Allow for looping on nodes by chaining:
// qsa('.foo').forEach(function () {})
NodeList.prototype.forEach = Array.prototype.forEach
