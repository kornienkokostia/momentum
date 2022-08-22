const getTimeOfDayEn = (hours) => {
    if (hours >= 6 && hours <= 11) return 'morning'
    if (hours > 11 && hours <= 17) return 'afternoon'
    if (hours > 17 && hours <= 23) return 'evening'
    if (hours >= 0 && hours < 5) return 'night'
}
const getTimeOfDayRu = (hours) => {
    if (hours >= 6 && hours <= 11) return 'Доброе утро'
    if (hours > 11 && hours <= 17) return 'Добрый день'
    if (hours > 17 && hours <= 23) return 'Добрый вечер'
    if (hours >= 0 && hours < 5) return 'Спокойной ночи'
}

const showGreeting = () => {
    const greetingText = lang === 'en' ? `Good ${timeOfDayEn}` : timeOfDayRu
    greeting.textContent = `${greetingText}`
    setTimeout(showGreeting, 1000)
}

const greetingOnType = () => {
    greetingName.style.transition = '.3s linear'
    greetingNameHolder.innerText = greetingName.value    
    if (greetingNameHolder.offsetWidth === 0) {
        greetingName.style.width = 100 + 'px'
        greeting.style.padding = '0 0 0 0px'
    } 
    if (greetingNameHolder.offsetWidth !== 0) {
        greeting.style.padding = '0 0 0 100px'
        greetingName.style.width = 100 + greetingNameHolder.offsetWidth + "px"
    }  
}

const setLocalStorage = () => localStorage.setItem('name', greetingName.value)

const showName = () => {
    greetingName.placeholder = 'Name'
    greetingName.style.transition = '0s'
    if (localStorage.getItem('name')) {
        greetingName.value = localStorage.getItem('name')
        greetingNameHolder.innerText = greetingName.value
        greeting.style.padding = '0 0 0 100px'
        greetingName.style.width = 100 + greetingNameHolder.offsetWidth + "px"
    } else {greetingName.style.width = 100 + 'px'}
}

const date = new Date()
const hours = date.getHours()
const timeOfDayEn = getTimeOfDayEn(hours)
const timeOfDayRu = getTimeOfDayRu(hours)
const greeting = document.querySelector('.greeting')
const greetingName = document.querySelector('.name')
const greetingNameHolder = document.querySelector('.name-holder')
const name = document.querySelector('.name')
const languages = document.querySelector('.languages')
let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'

languages.addEventListener('change', () => lang = languages.value)

export {showGreeting, greetingOnType, setLocalStorage, showName, timeOfDayEn, name}