// log
var log = function() {
    console.log.apply(console, arguments)
}
log('log is ready.....')
// e
var e = function(selector) {
    return document.querySelector(selector)
}
// eAll
var eAll = function(selector) {
    return document.querySelectorAll(selector)
}
// bindEvent
var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
// removeEvent
var removeEvent = function(element, eventName, callback) {
    element.removeEventListener(eventName, callback)
}
// bindAll
var bindAll = function(elements, eventName, callback) {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i]
        bindEvent(element, eventName, callback)
    }
}
// addClass
var addClass = function(element, className) {
    element.classList.add(className)
}
// removeClass
var removeClass = function(element, className) {
    element.classList.remove(className)
}
// toggleClass
var toggleClass = function(element, className) {
    element.classList.toggle(className)
}
// insertHTML
var insertHTML = function(element, position, html) {
    element.insertAdjacentHTML(position, html)
}
// ensureBottom
var ensureBottom = function() {
    var element = e('.mobile-body-content')
    element.scrollTop = element.scrollHeight + element.clientHeight
}
// ajaxGET
var ajaxGET = function(url, callback) {
    var r = new XMLHttpRequest()
    r.open('GET', url, true)
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            var response = r.response
            var data = JSON.parse(response)
            callback(data)
        } else {
            console.log('change')
        }
    }
    r.send()
}
// logMagic
var logMagic = function(text, cssText) {
    var code = '%c'
    var input = text
    var html = code + input
    var css = cssText
    console.log(html, css)
}
