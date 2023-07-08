async function getQuotes() {  
    const quotes = lang === 'en' ? './assets/quotesEn.json' : './assets/quotesRu.json'
    const res = await fetch(quotes)
    const data = await res.json()
    const randNum = getRandomNum()
    quote.textContent = `"${data[randNum]['quote']}"`
    author.textContent = data[randNum]['author']
}

const getRandomNum = () => Math.floor(Math.random() * 249)

const changeQuote = document.querySelector('.change-quote')
let count = 0

const updateQuote = () => {
    const rot = () => {
        count++
        let deg=count*180
        changeQuote.style.transform = `rotate(${deg}deg)`
    }
    rot()
    getQuotes()
}

const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const languages = document.querySelector('.languages')
let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'

languages.addEventListener('change', () => {
    lang = languages.value
    getQuotes()
})

export {getQuotes, updateQuote, changeQuote}