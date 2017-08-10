var Screen = {
    hideCurrentApp: function() {
        var olds = eAll('.show')
        for (var i = 0; i < olds.length; i++) {
            var old = olds[i]
            removeClass(old, 'show')
        }
    },
    showAppInPageTwo: function(selector) {
        var element = e(selector)
        addClass(element, 'show')
    },
    chatShow: function() {
        Screen.showAppInPageTwo('.chat-area')
        Screen.showPageTwo()
    },
    weatherShow: function() {
        Screen.showAppInPageTwo('.weather-area')
        Screen.showPageTwo()
    },
    showPageOne: function() {
        var screens = e('.screens-container')
        removeClass(screens, 'goleft')
    },
    showPageTwo: function() {
        var screens = e('.screens-container')
        addClass(screens, 'goleft')
    },
    bindChatButtonEvent: function() {
        var chatButton = e('.chat')
        bindEvent(chatButton, 'click', function() {
            Screen.chatShow()
        })
    },
    bindWeatherButtonEvent: function() {
        var weatherButton = e('.weather')
        bindEvent(weatherButton, 'click', function() {
            Screen.weatherShow()
        })
    },
    bindBackEvent: function() {
        var elements = eAll('.screen-two-child-head-back')
        bindAll(elements, 'click', function() {
            Screen.showPageOne()
            setTimeout(function() {
                // 延时执行，优化显示效果
                Screen.hideCurrentApp()
                // 500ms 取了 450ms
            }, 450)
        })
    },
    timeAddZero: function(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return '' + n
        }
    },
    showTime: function() {
        var d = new Date()
        var elementHour = e('#hour')
        var elementMinute = e('#minute')
        var elementSecond = e('#second')
        var h = d.getHours()
        var m = d.getMinutes()
        var s = d.getSeconds()
        elementHour.innerHTML = Screen.timeAddZero(h)
        elementMinute.innerHTML = Screen.timeAddZero(m)
        elementSecond.innerHTML = Screen.timeAddZero(s)
    },
    timing: function() {
        setInterval(function() {
            Screen.showTime()
        }, 1000)
    },
    logMagic: function(text, cssText) {
        var text = 'Talk is cheap, \n\tshow me the code.'
        var cssText = `
            color: #fff;
            font-family: verdana;
            font-size: 30px;
            text-shadow: 1px 1px 20px #000;
        `
        logMagic(text, cssText)
    },
}
var Chat = {
    shadowActive: function() {
        var shadow = e('.screen-shadow')
        addClass(shadow, 'screen-shadow-active')
    },
    shadowBack: function() {
        var shadow = e('.screen-shadow')
        removeClass(shadow, 'screen-shadow-active')
    },
    inputUp: function() {
        var inputContainer = e('.input-container')
        addClass(inputContainer, 'input-container-show')
    },
    inputDown: function() {
        var inputContainer = e('.input-container')
        removeClass(inputContainer, 'input-container-show')
    },
    bindHomeButtonEvent: function() {
        var homeButton = e('.home-button')
        homeButtonCallback = function() {
            var inputContainer = e('.input-container')
            var shadow = e('.screen-shadow')
            toggleClass(inputContainer, 'input-container-show')
            toggleClass(shadow, 'screen-shadow-active')
        }
        bindEvent(homeButton, 'click', homeButtonCallback)
    },
    removeHomeButtonEvent: function() {
        var homeButton = e('.home-button')
        removeEvent(homeButton, 'click', homeButtonCallback)
    },
    bindCloseButtonEvent: function() {
        var closeButton = e('.input-container-close-button')
        bindEvent(closeButton, 'click', function() {
            Chat.inputDown()
            Chat.shadowBack()
        })
    },
    bindShadowEvent: function() {
        var shadow = e('.screen-shadow')
        bindEvent(shadow, 'click', function() {
            Chat.shadowBack()
            Chat.inputDown()
        })
    },
    clickable: function() {
        var words = '灰叶'
        var chatTitle = e('.chat-title')
        chatTitle.innerHTML = words
        var homeButton = e('.home-button')
        removeClass(homeButton, 'no-click')
        Chat.bindHomeButtonEvent()
    },
    robotTyping: function() {
        var words = '灰叶拼命打字中……'
        var chatTitle = e('.chat-title')
        chatTitle.innerHTML = words
        var homeButton = e('.home-button')
        addClass(homeButton, 'no-click')
        Chat.removeHomeButtonEvent()
    },
    ensureBottom: function() {
        var element = e('.chat-content-container')
        element.scrollTop = element.scrollHeight + element.clientHeight
    },
    loading: function() {
        Chat.robotTyping()
        var element = e('.chat-content-container')
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
        element.insertAdjacentHTML('beforeend', html)
    },
    robotSay: function(string, delay=0) {
        setTimeout(function() {
            Chat.loading()
            setTimeout(function() {
                var loading = e('.loading')
                loading.innerHTML = string
                removeClass(loading, 'loading')
                Chat.ensureBottom()
                Chat.clickable()
            }, 2000)
            Chat.ensureBottom()
        }, delay)
    },
    peopleSay: function(string, delay=0) {
        var element = e('.chat-content-container')
        var html = `
        <div class="message-item-container message-people">
            <div class="message-right show-in-right">${string}</div>
        </div>
        `
        console.log('element', element)
        setTimeout(function() {
            element.insertAdjacentHTML('beforeend', html)
            Chat.ensureBottom()
        }, delay)
    },
    sayHi: function() {
        Chat.robotSay('很高兴遇见你！', 500)
        Chat.robotSay('你想了解关于我的哪些信息？点击下方home键，和我聊聊吧，嘻嘻~', 2700)
    },
    bindTopicEvent: function() {
        var elements = eAll('.topic-item')
        bindAll(elements, 'click', function(event) {
            var target = event.target
            var key = target.dataset.key
            var question = chatData[key].question
            Chat.peopleSay(question, 400)
            var answers = chatData[key].answer
            for (var i = 0; i < answers.length; i++) {
                Chat.robotSay(answers[i], 1400 + i * 2200)
            }
            Chat.inputDown()
            Chat.shadowBack()
        })
    }
}
var Weather = {
    city: remote_ip_info.city,
    country: remote_ip_info.country,
    province: remote_ip_info.province,
    keyCode: '597863dad737483b8924476bd14524d8',
    loadWeatherNow: function(parsedData) {
        var data = parsedData
        console.log('data', data)
        var nowTemperature = data.HeWeather5[0].now.tmp + '°'
        var code = data.HeWeather5[0].now.cond.code
        var url = 'image/weather/' + code + '.png'
        var nowType = data.HeWeather5[0].now.cond.txt
        var windType = data.HeWeather5[0].now.wind.dir
        var windLevel = data.HeWeather5[0].now.wind.sc
        var parsedWind = windType + ' ' + windLevel
        var city = data.HeWeather5[0].basic.city
        var rawUpTime = data.HeWeather5[0].basic.update.loc
        var parsedUpTime = rawUpTime.slice(11)
        var html = `
            <div class="weather-now-temperature">${nowTemperature}</div>
            <img class="weather-now-image" src = '${url}' />
            <div class="weather-now-type">${nowType}</div>
            <div class="weather-now-wind">${parsedWind}</div>
            <div class="weather-now-city">${city}</div>
            <div class="weather-now-uptime">[${parsedUpTime}更新]</div>
        `
        var container = e('.weather-now')
        container.insertAdjacentHTML('beforeend', html)
    },
    loadWeatherAqi: function(parsedData) {
        var quality = parsedData.HeWeather5[0].aqi.city.qlty
        var pm25 = parsedData.HeWeather5[0].aqi.city.pm25
        var html = `
            <div class="weather-aqi-quality">空气质量 ${quality}</div>
            <div class="weather-aqi-pm25">PM2.5 ${pm25}</div>
        `
        var container = e('.weather-now')
        container.insertAdjacentHTML('beforeend', html)
    },
    loadWeatherHourly: function(parsedData) {
        var data = parsedData.HeWeather5[0].hourly_forecast
        // 只取未来三个数据不为空的时段
        for (var i = 0; i < 3; i++) {
            var item = data[i]
            if (item != undefined) {
                var time = item.date.slice(11)
                var code = item.cond.code
                var url = 'image/weather/' + code + '.png'
                var type = item.cond.txt
                var temperature = item.tmp + '℃'
                var html = `
                    <div class="weather-hourly-item">
                        <div>${time}</div>
                        <img src='${url}'>
                        <div>${type}</div>
                        <div>${temperature}</div>
                    </div>
                `
                var container = e('.weather-hourly')
                container.insertAdjacentHTML('beforeend', html)
            }
        }
    },
    loadWeatherDaily: function(parsedData) {
        var data = parsedData.HeWeather5[0].daily_forecast
        for (var i = 0; i < data.length; i++) {
            var item = data[i]
            var min = item.tmp.min
            var max = item.tmp.max
            var temperature = min + '℃' + '~' + max + '℃'
            var code = item.cond.code_d
            var url = 'image/weather/' + code + '.png'
            var type = item.cond.txt_d
            var day = ['今天', '明天', '后天'][i]
            var rawDate = item.date
            var parsedDate = rawDate.slice(-5).replace('-', '/')
            var html = `
                <div class="weather-daily-item">
                    <div>${day}</div>
                    <div>${parsedDate}</div>
                    <img src = '${url}' />
                    <div>${type}</div>
                    <div>${temperature}</div>
                </div>
            `
            var container = e('.weather-daily')
            container.insertAdjacentHTML('beforeend', html)
        }
    },
    loadWeatherSuggestion: function(parsedData) {
        var data = parsedData.HeWeather5[0].suggestion
        var air = data.air.brf
        var comf = data.comf.brf
        var cw = data.cw.brf
        var drsg = data.drsg.brf
        var flu = data.flu.brf
        var sport = data.sport.brf
        var trav = data.trav.brf
        var uv = data.uv.brf
        var airLong = data.air.txt
        var comfLong = data.comf.txt
        var cwLong = data.cw.txt
        var drsgLong = data.drsg.txt
        var fluLong = data.flu.txt
        var sportLong = data.sport.txt
        var travLong = data.trav.txt
        var uvLong = data.uv.txt
        var html = `
            <ul>
                <li data-index="id-1" class="weather-suggestion-index indexActive">空气指数</li>
                <li data-index="id-2" class="weather-suggestion-index">舒适指数</li>
                <li data-index="id-3" class="weather-suggestion-index">洗车指数</li>
                <li data-index="id-4" class="weather-suggestion-index">穿衣指数</li>
                <li data-index="id-5" class="weather-suggestion-index">感冒指数</li>
                <li data-index="id-6" class="weather-suggestion-index">运动指数</li>
                <li data-index="id-7" class="weather-suggestion-index">旅游指数</li>
                <li data-index="id-8" class="weather-suggestion-index">紫外线数</li>
            </ul>
            <div id="id-1" class="weather-suggestion-content contentShow"><div class="brief">${air}</div><div class="long">${airLong}</div></div>
            <div id="id-2" class="weather-suggestion-content"><div class="brief">${comf}</div><div class="long">${comfLong}</div></div>
            <div id="id-4" class="weather-suggestion-content"><div class="brief">${drsg}</div><div class="long">${drsgLong}</div></div>
            <div id="id-3" class="weather-suggestion-content"><div class="brief">${cw}</div><div class="long">${cwLong}</div></div>
            <div id="id-5" class="weather-suggestion-content"><div class="brief">${flu}</div><div class="long">${fluLong}</div></div>
            <div id="id-6" class="weather-suggestion-content"><div class="brief">${sport}</div><div class="long">${sportLong}</div></div>
            <div id="id-7" class="weather-suggestion-content"><div class="brief">${trav}</div><div class="long">${travLong}</div></div>
            <div id="id-8" class="weather-suggestion-content"><div class="brief">${uv}</div><div class="long">${uvLong}</div></div>
        `
        var container = e('.weather-suggestion')
        container.insertAdjacentHTML('beforeend', html)
    },
    getWeatherData: function() {
        var key = Weather.keyCode
        var city = Weather.city
        // var url = 'https://free-api.heweather.com/v5/weather?city=' + city + '&key=' + key
        var url = `https://free-api.heweather.com/v5/weather?city=${city}&key=${key}`
        ajaxGET(url, function(data) {
            Weather.loadWeatherNow(data)
            Weather.loadWeatherAqi(data)
            Weather.loadWeatherDaily(data)
            Weather.loadWeatherHourly(data)
            Weather.loadWeatherSuggestion(data)
        })
    },
    clearPageData: function() {
        var weatherNowConteiner = e('.weather-now')
        var weatherHourlyConteiner = e('.weather-hourly')
        var weatherDailyConteiner = e('.weather-daily')
        var weatherSuggestionConteiner = e('.weather-suggestion')
        weatherNowConteiner.innerHTML = ''
        weatherHourlyConteiner.innerHTML = ''
        weatherDailyConteiner.innerHTML = ''
        weatherSuggestionConteiner.innerHTML = ''
    },
    bindQiehuanEvent: function() {
        var toggleButton = e('.weather-othercity')
        bindEvent(toggleButton, 'click', function(event) {
            var element = e('.change-city-container')
            element.classList.toggle('hide')
        })
    },
    bindSearchEvent: function() {
        var searchButton = e('.change-city-search-button')
        bindEvent(searchButton, 'click', function(event) {
            var element = e('.change-city-input')
            var cityText = element.value
            Weather.getWeatherDataByCity(cityText)
            e('.change-city-container').classList.toggle('hide')
            element.value = ''
        })
    },
    bindEnterEvent: function() {
        var input = e('.change-city-input')
        bindEvent(input, 'keydown', function(event) {
            var keyCode = event.keyCode
            log('keyCode', keyCode)
            if (keyCode == 13) {
                var element = e('.change-city-input')
                var cityText = element.value
                Weather.getWeatherDataByCity(cityText)
                e('.change-city-container').classList.toggle('hide')
                element.value = ''
            }
        })
    },
    getWeatherDataByCity: function(string) {
        Weather.clearPageData()
        var key = Weather.keyCode
        var city = string
        // var url = 'https://free-api.heweather.com/v5/weather?city=' + city + '&key=' + key
        var url = `https://free-api.heweather.com/v5/weather?city=${city}&key=${key}`
        ajaxGET(url, function(data) {
            Weather.loadWeatherNow(data)
            Weather.loadWeatherAqi(data)
            Weather.loadWeatherDaily(data)
            Weather.loadWeatherHourly(data)
            Weather.loadWeatherSuggestion(data)
        })
    },
    bindWeatherSuggestionIndex: function() {
        var father = e('.weather-suggestion')
        // 事件委托至父元素
        bindEvent(father, 'click', function(event) {
            var target = event.target
            if (target.classList.contains('weather-suggestion-index')) {
                var targetID = target.dataset.index
                var selector = '#' +  targetID
                var oldContent = e('.contentShow')
                var newContent = e(selector)
                var oldIndex = e('.indexActive')
                var newIndex = event.target
                removeClass(oldContent, 'contentShow')
                addClass(newContent, 'contentShow')
                removeClass(oldIndex, 'indexActive')
                addClass(newIndex, 'indexActive')
            }
        })
    },
}
var _screens = function() {
    Screen.showPageTwo()
    Screen.bindBackEvent()
    Screen.bindChatButtonEvent()
    Screen.bindWeatherButtonEvent()
    Screen.timing()
    Screen.logMagic()
}
var _chat = function() {
    Chat.bindHomeButtonEvent()
    Chat.bindCloseButtonEvent()
    Chat.bindShadowEvent()
    Chat.bindTopicEvent()
    Chat.sayHi()
}
var _weather = function() {
    Weather.getWeatherData()
    Weather.bindWeatherSuggestionIndex()
    Weather.bindQiehuanEvent()
    Weather.bindSearchEvent()
    Weather.bindEnterEvent()
}
var _app = function() {
    _screens()
    _chat()
    _weather()
}
_app()
