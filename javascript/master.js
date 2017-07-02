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
    // element.addEventListener(eventName, callback)
    if (element.addEventListener) {
        element.addEventListener(eventName, callback)
    }
    if (element.attachEvent) {
        var ieEventName = 'on' + eventName
        element.attachEvent(ieEventName, callback)
    }
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
// insertHTML
var insertHTML = function(element, position, html) {
    element.insertAdjacentHTML(position, html)
}
// ......
// ensureBottom
var ensureBottom = function() {
    var element = e('.mobile-body-content')
    element.scrollTop = element.scrollHeight + element.clientHeight
}
// promptShow
var promptShow = function() {
    var prompt = e('#prompt')
    addClass(prompt, 'prompt-show')
}
// promptHide
var promptHide = function() {
    var prompt = e('#prompt')
    removeClass(prompt, 'prompt-show')
}
// promptBackgroundShow
var promptBackgroundShow = function() {
    var promptBackground = e('#prompt-background')
    addClass(promptBackground, 'prompt-background-show')
}
// promptBackgroundHide
var promptBackgroundHide = function() {
    var promptBackground = e('#prompt-background')
    removeClass(promptBackground, 'prompt-background-show')
}
// bindInputEvent
var bindInputEvent = function() {
    var input = e('#input-hint')
    // removeInputEvent函数 中 removeEvent 需要具体参数
    // 因此，此处 callback 赋值给了全局变量 inputCallback
    inputCallback = function() {
        promptShow()
        promptBackgroundShow()
    }
    bindEvent(input, 'click', inputCallback)
    console.log('bind input click event')
}
// removeInputEvent
var removeInputEvent = function() {
    var input = e('#input-hint')
    removeEvent(input, 'click', window.inputCallback)
    console.log('remove input click event')
}
// clickable
var clickable = function() {
    var words = '说点什么……'
    var element = e('#input-hint')
    removeClass(element, 'robot-typing')
    addClass(element, 'clickable')
    element.children[0].innerHTML = words
    bindInputEvent()
}
// robotTyping
var robotTyping = function() {
    var words = '灰叶拼命打字中……'
    var element = e('#input-hint')
    removeClass(element, 'clickable')
    addClass(element, 'robot-typing')
    element.children[0].innerHTML = words
    removeInputEvent()
}
// bindCloseButtonEvent
var bindCloseButtonEvent = function() {
    var closeButton = e('#close-button')
    bindEvent(closeButton, 'click', function() {
        promptHide()
        promptBackgroundHide()
    })
}
// bindPromptBackgroundEvent
var bindPromptBackgroundEvent = function() {
    var promptBackground = e('#prompt-background')
    bindEvent(promptBackground, 'click', function() {
        promptHide()
        promptBackgroundHide()
    })
}
// loading
var loading = function() {
    robotTyping()
    var bodyContent = e('.mobile-body-content')
    var html = `
    <div class="message-item-container message-robot">
        <div class="message-left loading show-in-left">
            <ul id="dot-container">
                <li><div class="dot one"></div></li>
                <li><div class="dot two"></div></li>
                <li><div class="dot three"></div></li>
            </ul>
        </div>
    </div>
    `
    bodyContent.insertAdjacentHTML('beforeend', html)
}
// robotSay
var robotSay = function(string, delay=0) {
    setTimeout(function() {
        loading()
        setTimeout(function() {
            var loading = e('.loading')
            loading.innerHTML = string
            removeClass(loading, 'loading')
            ensureBottom()
            clickable()
        }, 2000)
        ensureBottom()
    }, delay)
}
// peopleSay
var peopleSay = function(string, delay=0) {
    var bodyContent = e('.mobile-body-content')
    var html = `
    <div class="message-item-container message-people">
        <div class="message-right show-in-right">${string}</div>
    </div>
    `
    setTimeout(function() {
        bodyContent.insertAdjacentHTML('beforeend', html)
        ensureBottom()
    }, delay)
}
// sayHi
var sayHi = function() {
    robotSay('很高兴遇见你！', 500)
    robotSay('你想了解关于我的哪些信息？可以聊聊哦，嘻嘻~', 2700)
}

// bindTopicItemsEvent
var bindTopicItemsEvent = function() {
    var elements = eAll('.topic-item')
    bindAll(elements, 'click', function(event) {
        var target = event.target
        var key = target.dataset.key
        var question = chatData[key].question
        peopleSay(question, 400)
        var answers = chatData[key].answer
        for (var i = 0; i < answers.length; i++) {
            robotSay(answers[i], 1400 + i * 2200)
        }
        promptHide()
        promptBackgroundHide()
    })
}
var _app = function() {
    sayHi()
    bindInputEvent()
    bindCloseButtonEvent()
    bindPromptBackgroundEvent()
    bindTopicItemsEvent()
}
_app()
