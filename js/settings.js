const setLocalStorage = () => {
    localStorage.setItem('lang', languages.value)
    localStorage.setItem('bg-source', bgSources.value)
    localStorage.setItem('bg-api-category', apiBgCategoryInput.value)
    localStorage.setItem('time-hidden', timeCheckbox.checked === true ? 'yes' : 'no')
    localStorage.setItem('date-hidden', dateCheckbox.checked === true ? 'yes' : 'no')
    localStorage.setItem('greeting-hidden', greetingCheckbox.checked === true ? 'yes' : 'no')
    localStorage.setItem('weather-hidden', weatherCheckbox.checked === true ? 'yes' : 'no')
    localStorage.setItem('music-player-hidden', musicPlayerCheckbox.checked === true ? 'yes' : 'no')
    localStorage.setItem('quote-hidden', quoteCheckbox.checked === true ? 'yes' : 'no')
    localStorage.setItem('todo-list-hidden', todoListCheckbox.checked === true ? 'yes' : 'no')
}

const getLocalStorage = () => {
    if (localStorage.getItem('lang')) {languages.value = localStorage.getItem('lang')}
    if (localStorage.getItem('bg-source')) {bgSources.value = localStorage.getItem('bg-source')}
    if (localStorage.getItem('bg-api-category')) {apiBgCategoryInput.value = localStorage.getItem('bg-api-category')}  
}

const changeMenuLangToEn = () => {
    settingsButtonText.textContent = 'Settings'
    settingsTitle.textContent = 'Settings'
    settingChangeLanguage.textContent = 'Language'
    greetingName.placeholder = 'Name'
    settingChangeBackground.textContent = 'Background source'
    apiBgCategoryLabel.textContent = 'Category:'
    apiBgCategoryInput.placeholder = 'Enter category'
    apiBgCategoryError.textContent = '* Enter category correctly'
    apiBgCategoryError.classList.remove('change-api-error-margin-ru')
    apiBgCategoryError.classList.add('change-api-error-margin-en')
    settingHideWidgetsMain.textContent = 'Hide widgets'
    hideTime.textContent = 'Time'
    hideDate.textContent = 'Date'
    hideGreeting.textContent = 'Greeting'
    hideWeather.textContent = 'Weather forecast'
    hideMusicPlayer.textContent = 'Music player'
    hideQuote.textContent = 'Quote of the day'
    hideTodoList.textContent = 'Todo list'
    todoListHeaderText.textContent = 'Todo list'
    footerLegalTextMain.innerHTML = 'Copyright © 2022 <span class="footer-legal-text-title">Momentum</span> All rights reserved.'
}
const changeMenuLangToRu = () => {
    settingsButtonText.textContent = 'Настройки'
    settingsTitle.textContent = 'Настройки'
    settingChangeLanguage.textContent = 'Язык'
    greetingName.placeholder = 'Имя'
    settingChangeBackground.textContent = 'Источник фонового изображения'
    apiBgCategoryLabel.textContent = 'Категория:'
    apiBgCategoryInput.placeholder = 'Введите категорию'
    apiBgCategoryError.textContent = '* Введите корректно категорию'
    apiBgCategoryError.classList.remove('change-api-error-margin-en')
    apiBgCategoryError.classList.add('change-api-error-margin-ru')
    settingHideWidgetsMain.textContent = 'Скрыть виджеты'
    hideTime.textContent = 'Время'
    hideDate.textContent = 'Дата'
    hideGreeting.textContent = 'Приветствие'
    hideWeather.textContent = 'Прогноз погоды'
    hideMusicPlayer.textContent = 'Аудиоплеер'
    hideQuote.textContent = 'Цитата дня'
    hideTodoList.textContent = 'Список дел'
    todoListHeaderText.textContent = 'Список дел'
    footerLegalTextMain.innerHTML = '© <span class="footer-legal-text-title">Momentum</span>, 2022г. Все права защищены.'
}

const openSettingsBtn = () => {
    blur.classList.remove('hide-blur')
    blur.classList.add('show-blur')
    settingsContainer.classList.remove('fade-and-scale-transition-out')
    settingsContainer.classList.add('fade-and-scale-transition-in')
    document.body.style.overflow = 'hidden'
}

const closeSettingsBtn = () => {
    settingsContainer.classList.remove('fade-and-scale-transition-in')
    settingsContainer.classList.add('fade-and-scale-transition-out')
    blur.classList.remove('show-blur')
    blur.classList.add('hide-blur')   
    document.body.style.overflow = 'auto'
}

const settingsButtonText = document.querySelector('.settings-button-text')
const settingsTitle = document.querySelector('.settings-title')
const settingChangeLanguage = document.querySelector('.setting-change-language')
const settingChangeBackground = document.querySelector('.setting-change-background')
const apiBgCategoryLabel = document.querySelector('.api-bg-category-label')
const apiBgCategoryInput = document.querySelector('.api-bg-category-input')
const apiBgCategoryError = document.querySelector('.api-bg-category-error')
const languages = document.querySelector('.languages')
const bgSources = document.querySelector('.background-sources')
const blur = document.querySelector('.blur')
const settingsContainer = document.querySelector('.settings-container')
const timeCheckbox = document.querySelector('.time-checkbox')
const timeWidget = document.querySelector('.time')
const dateCheckbox = document.querySelector('.date-checkbox')
const dateWidget = document.querySelector('.date')
const greetingCheckbox = document.querySelector('.greeting-checkbox')
const greetingWidget = document.querySelector('.greeting-container')
const weatherCheckbox = document.querySelector('.weather-checkbox')
const weatherWidget = document.querySelector('.weather')
const musicPlayerCheckbox = document.querySelector('.music-player-checkbox')
const musicPlayerWidget = document.querySelector('.player')
const quoteCheckbox = document.querySelector('.quote-checkbox')
const quoteWidget = document.querySelector('.quote-container')
const todoListCheckbox = document.querySelector('.todo-list-checkbox')
const todoListWidget = document.querySelector('.todo-list')
const settingHideWidgetsMain = document.querySelector('.setting-hide-widgets-main')
const hideTime = document.querySelector('.hide-time')
const hideDate = document.querySelector('.hide-date')
const hideGreeting = document.querySelector('.hide-greeting')
const hideWeather = document.querySelector('.hide-weather')
const hideMusicPlayer = document.querySelector('.hide-music-player')
const hideQuote = document.querySelector('.hide-quote')
const hideTodoList = document.querySelector('.hide-todo-list')
const todoListHeaderText = document.querySelector('.todo-list-header-text')
const footerLegalTextMain = document.querySelector('.footer-legal-text-main')
const greetingName = document.querySelector('.name')
let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'

lang === 'en' ? changeMenuLangToEn() : changeMenuLangToRu()

languages.addEventListener('change', () => {
    lang = languages.value
    if (lang === 'ru') {changeMenuLangToRu()}
    if (lang === 'en') {changeMenuLangToEn()}
})

timeCheckbox.addEventListener('click', () => {timeWidget.classList.toggle('element-hidden')})
dateCheckbox.addEventListener('click', () => {dateWidget.classList.toggle('element-hidden')})
greetingCheckbox.addEventListener('click', () => {greetingWidget.classList.toggle('element-hidden')})
weatherCheckbox.addEventListener('click', () => {weatherWidget.classList.toggle('element-hidden')})
musicPlayerCheckbox.addEventListener('click', () => {musicPlayerWidget.classList.toggle('element-hidden')})
quoteCheckbox.addEventListener('click', () => {quoteWidget.classList.toggle('element-hidden')})
todoListCheckbox.addEventListener('click', () => {todoListWidget.classList.toggle('element-hidden')})

if (localStorage.getItem('time-hidden')) {
    timeCheckbox.checked = localStorage.getItem('time-hidden') === 'yes' ? true : false
    if (timeCheckbox.checked === true) {timeWidget.classList.toggle('element-hidden')}
}
if (localStorage.getItem('date-hidden')) {
    dateCheckbox.checked = localStorage.getItem('date-hidden') === 'yes' ? true : false
    if (dateCheckbox.checked === true) {dateWidget.classList.toggle('element-hidden')}
}
if (localStorage.getItem('greeting-hidden')) {
    greetingCheckbox.checked = localStorage.getItem('greeting-hidden') === 'yes' ? true : false
    if (greetingCheckbox.checked === true) {greetingWidget.classList.toggle('element-hidden')}
}
if (localStorage.getItem('weather-hidden')) {
    weatherCheckbox.checked = localStorage.getItem('weather-hidden') === 'yes' ? true : false
    if (weatherCheckbox.checked === true) {weatherWidget.classList.toggle('element-hidden')}
}
if (localStorage.getItem('music-player-hidden')) {
    musicPlayerCheckbox.checked = localStorage.getItem('music-player-hidden') === 'yes' ? true : false
    if (musicPlayerCheckbox.checked === true) {musicPlayerWidget.classList.toggle('element-hidden')}
}
if (localStorage.getItem('quote-hidden')) {
    quoteCheckbox.checked = localStorage.getItem('quote-hidden') === 'yes' ? true : false
    if (quoteCheckbox.checked === true) {quoteWidget.classList.toggle('element-hidden')}
}
if (localStorage.getItem('todo-list-hidden')) {
    todoListCheckbox.checked = localStorage.getItem('todo-list-hidden') === 'yes' ? true : false
    if (todoListCheckbox.checked === true) {todoListWidget.classList.toggle('element-hidden')}
}

export {setLocalStorage, getLocalStorage, openSettingsBtn, closeSettingsBtn}