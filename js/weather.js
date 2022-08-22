import * as greet from './greeting.js'

const getWeather = async (city, load) => {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=8352a02bc4070890343d7930c1883290&units=metric`   
    const data = await fetch(url).then((response) => {
        if (response.ok) {
            weatherInfo.style.opacity = '1'
            descriptionContsainer.style.opacity = '1'
            error.style.opacity = '0'
            error.style.visibility = 'hidden'
            weatherInfo.style.visibility = 'visible'
            descriptionContsainer.style.visibility = 'visible'
            return response.json()
        }
        throw new Error('Something went wrong')
      })
      .catch(() => {
        weatherInfo.style.opacity = '0'
        descriptionContsainer.style.opacity = '0'
        weatherInfo.style.visibility = 'hidden'
        descriptionContsainer.style.visibility = 'hidden'
        error.style.visibility = 'visible'
        error.textContent = translErr()
        error.style.opacity = '1'
      })
    let width = ''
    load === true ? weather.style.transition = '0s' : weather.style.transition = '.5s linear'
    let iconCode = data.weather[0].id
    iconCode === '800' && greet.timeOfDayEn === 'morning' || greet.timeOfDayEn === 'afternoon' ? iconCode = '800-d' : '800-n'
    iconCode === '801' && greet.timeOfDayEn === 'morning' || greet.timeOfDayEn === 'afternoon' ? iconCode = '801-d' : '801-n'
    iconCode === '802' && greet.timeOfDayEn === 'morning' || greet.timeOfDayEn === 'afternoon' ? iconCode = '802-d' : '802-n'
    
    icon.style.backgroundImage = `url(${weatherIcons[data.weather[0].id === 800 || data.weather[0].id === 801 || data.weather[0].id === 802 ? greet.timeOfDayEn === 'morning' || greet.timeOfDayEn === 'afternoon' ? data.weather[0].id + '-d' : data.weather[0].id + '-n' : data.weather[0].id]})`
    temperature.textContent = `${Math.round(data.main.temp)}°`
    weatherDescription.textContent = capitalizeFirstLetter(data.weather[0].description)
    windSpeed.textContent = `${translWindSpeed()}: ${Math.round(data.wind.speed)}${translUnit()}`
    humidity.textContent = `${translHumidity()}: ${Math.round(data.main.humidity)}%`
    if (weatherDescription.clientWidth > 130) {
        width = temperature.clientWidth + 10 + weatherDescription.clientWidth + 'px'
        weather.style.width = width
        weatherInfo.style.width = width
        descriptionContsainer.style.width = width
    } else {
        width = 225 + 'px'
        weather.style.width = width
        weatherInfo.style.width = width
        descriptionContsainer.style.width = width
    }    
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const setLocalStorage = () => localStorage.setItem('city', city.value)

const showWeatherOnLoad = () => {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
        getWeather(localStorage.getItem('city'), true)
    } else {
        const defValDifLang = localStorage.getItem('lang') ? localStorage.getItem('lang') === 'en' ? 'Minsk' : 'Минск' : 'Minsk'
        city.value = defValDifLang
        getWeather(defValDifLang, true)
    }
}

const changeWeather = () => getWeather(city.value, false)

const translWindSpeed = () => lang === 'en' ? 'Wind speed' : 'Скорость ветра'
const translHumidity = () => lang === 'en' ? 'Humidity' : 'Влажность'
const translUnit = () => lang === 'en' ? 'm/s' : 'м/с'
const translErr = () => lang === 'en' ? '* Please enter the city correctly' : '* Пожалуйста, введите город правильно'

const weatherIcons = {
    '200' : './assets/svg/weather-icons/thunderstorm-with-rain.svg',
    '201' : './assets/svg/weather-icons/thunderstorm-with-rain.svg',
    '202' : './assets/svg/weather-icons/thunderstorm-with-rain.svg',
    '210' : './assets/svg/weather-icons/thunderstorm.svg',
    '211' : './assets/svg/weather-icons/thunderstorm.svg',
    '212' : './assets/svg/weather-icons/thunderstorm.svg',
    '221' : './assets/svg/weather-icons/thunderstorm.svg',
    '230' : './assets/svg/weather-icons/thunderstorm-with-rain.svg',
    '231' : './assets/svg/weather-icons/thunderstorm-with-rain.svg',
    '232' : './assets/svg/weather-icons/thunderstorm-with-rain.svg',

    '300' : './assets/svg/weather-icons/drizzle.svg',
    '301' : './assets/svg/weather-icons/drizzle.svg',
    '302' : './assets/svg/weather-icons/drizzle.svg',
    '310' : './assets/svg/weather-icons/drizzle.svg',
    '311' : './assets/svg/weather-icons/drizzle.svg',
    '312' : './assets/svg/weather-icons/drizzle.svg',
    '313' : './assets/svg/weather-icons/drizzle.svg',
    '314' : './assets/svg/weather-icons/drizzle.svg',
    '321' : './assets/svg/weather-icons/drizzle.svg',

    '500' : './assets/svg/weather-icons/rain.svg',
    '501' : './assets/svg/weather-icons/rain.svg',
    '502' : './assets/svg/weather-icons/rain.svg',
    '503' : './assets/svg/weather-icons/heavy-rain.svg',
    '504' : './assets/svg/weather-icons/heavy-rain.svg',
    '511' : './assets/svg/weather-icons/rain.svg',
    '520' : './assets/svg/weather-icons/rain.svg',
    '521' : './assets/svg/weather-icons/rain.svg',
    '522' : './assets/svg/weather-icons/rain.svg',
    '531' : './assets/svg/weather-icons/rain.svg',

    '600' : './assets/svg/weather-icons/snow.svg',
    '601' : './assets/svg/weather-icons/snow.svg',
    '602' : './assets/svg/weather-icons/snow.svg',
    '611' : './assets/svg/weather-icons/sleet.svg',
    '612' : './assets/svg/weather-icons/sleet.svg',
    '615' : './assets/svg/weather-icons/sleet.svg',
    '616' : './assets/svg/weather-icons/sleet.svg',
    '620' : './assets/svg/weather-icons/snow.svg',
    '621' : './assets/svg/weather-icons/snow.svg',
    '622' : './assets/svg/weather-icons/snow.svg',

    '701' : './assets/svg/weather-icons/mist.svg',
    '711' : './assets/svg/weather-icons/smoke.svg',
    '721' : './assets/svg/weather-icons/haze.svg',
    '731' : './assets/svg/weather-icons/dust.svg',
    '741' : './assets/svg/weather-icons/mist.svg',
    '751' : './assets/svg/weather-icons/dust.svg',
    '761' : './assets/svg/weather-icons/dust.svg',
    '771' : './assets/svg/weather-icons/tornado.svg',
    '781' : './assets/svg/weather-icons/tornado.svg',

    '800-d' : './assets/svg/weather-icons/clear-day.svg',
    '800-n' : './assets/svg/weather-icons/clear-night.svg',
    '801-d' : './assets/svg/weather-icons/few-clouds-day.svg',
    '801-n' : './assets/svg/weather-icons/few-clouds-night.svg',
    '802-d' : './assets/svg/weather-icons/few-clouds-day.svg',
    '802-n' : './assets/svg/weather-icons/few-clouds-night.svg',
    '803' : './assets/svg/weather-icons/overcast-clouds.svg',
    '804' : './assets/svg/weather-icons/overcast-clouds.svg',

    '900' : './assets/svg/weather-icons/tornado.svg',
    '901' : './assets/svg/weather-icons/tropicalstorm.svg',
    '902' : './assets/svg/weather-icons/hurricane.svg',
    '903' : './assets/svg/weather-icons/cold.svg',
    '904' : './assets/svg/weather-icons/hot.svg',
    '905' : './assets/svg/weather-icons/wind.svg',
    '906' : './assets/svg/weather-icons/hail.svg'
}

const icon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const windSpeed = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const weather = document.querySelector('.weather')
const weatherInfo = document.querySelector('.weather-info')
const descriptionContsainer = document.querySelector('.description-container')
const error = document.querySelector('.weather-error')
const city = document.querySelector('.city')
const languages = document.querySelector('.languages')
let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
city.placeholder = lang === 'en' ? 'City' : 'Город'

languages.addEventListener('change', () => {
    lang = languages.value
    city.placeholder = lang === 'en' ? 'City' : 'Город'
    getWeather(city.value, false)
})

export {setLocalStorage, showWeatherOnLoad, getWeather, city, capitalizeFirstLetter, changeWeather}