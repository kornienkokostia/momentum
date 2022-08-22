import {capitalizeFirstLetter} from "./weather.js"

const showDateTime = () => {
    const datetime = new Date()
    date.textContent = `${capitalizeFirstLetter(datetime.toLocaleString(lang, {weekday: 'long'}))}, ${capitalizeFirstLetter(datetime.toLocaleDateString(lang, {month: 'long', day: 'numeric'}))}`
    hours.textContent = datetime.getHours() < 10 ? `0${datetime.getHours()}` : datetime.getHours()
    minutes.textContent = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes()
    seconds.textContent = datetime.getSeconds() < 10 ? `0${datetime.getSeconds()}` : datetime.getSeconds();
    [...dots].map(dot => dot.textContent = ':')
    setTimeout(showDateTime, 1000)
}

const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')
const date = document.querySelector('.date')
const dots = document.querySelectorAll('.dots')
const languages = document.querySelector('.languages')
let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'

languages.addEventListener('change', () => lang = languages.value)

export default showDateTime