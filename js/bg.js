import * as greet from '../js/greeting.js'

const getRandomNum = () => Math.floor(Math.random() * 20) + 1

const setBg = () => {
    const timeOfDay = greet.timeOfDayEn
    const bgNum = `${randomNum}`.padStart(2, "0")
    const img = new Image()
    img.src = `https://raw.githubusercontent.com/kornienkokostia/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`
    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url(${img.src})`
        document.querySelector('.preloader').classList.add('hidden')
        document.querySelector('.ispinner').classList.add('hidden')
    })
    img.addEventListener('error', () => {
        document.querySelector('.preloader').classList.add('hidden')
        document.querySelector('.ispinner').classList.add('hidden')
    })

}

const getSlideNext = () => {
    randomNum <= 19 ? randomNum++ : randomNum = 1
    setBg()
}

const getSlidePrev = () => {
    randomNum > 1 ? randomNum-- : randomNum = 20
    setBg()
}

let randomNum = getRandomNum()
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

export { setBg, getSlideNext, getSlidePrev, slideNext, slidePrev }