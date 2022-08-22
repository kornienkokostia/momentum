import * as apiBg from './bgFromApi.js'
import * as bg from '../js/bg.js'

let bgSource = localStorage.getItem('bg-source') ? localStorage.getItem('bg-source') : 'github'

const setOneOfBg = () => {
    if (bgSource === 'github') {
        bg.setBg()
        bg.slideNext.removeEventListener('click', apiBg.setUnsplashApiBg)
        bg.slidePrev.removeEventListener('click', apiBg.setUnsplashApiBg)
        bg.slideNext.removeEventListener('click', apiBg.setFlickrApiBg)
        bg.slidePrev.removeEventListener('click', apiBg.setFlickrApiBg)
        bg.slideNext.addEventListener('click', bg.getSlideNext)
        bg.slidePrev.addEventListener('click', bg.getSlidePrev)
    }
    if (bgSource === 'unsplash') {
        apiBg.setUnsplashApiBg()
        bg.slideNext.removeEventListener('click', bg.getSlideNext)
        bg.slidePrev.removeEventListener('click', bg.getSlidePrev)
        bg.slideNext.removeEventListener('click', apiBg.setFlickrApiBg)
        bg.slidePrev.removeEventListener('click', apiBg.setFlickrApiBg)
        bg.slideNext.addEventListener('click', apiBg.setUnsplashApiBg)
        bg.slidePrev.addEventListener('click', apiBg.setUnsplashApiBg)
    }
    if (bgSource === 'flickr') {
        apiBg.setFlickrApiBg()
        bg.slideNext.removeEventListener('click', bg.getSlideNext)
        bg.slidePrev.removeEventListener('click', bg.getSlidePrev)
        bg.slideNext.removeEventListener('click', apiBg.setUnsplashApiBg)
        bg.slidePrev.removeEventListener('click', apiBg.setUnsplashApiBg)
        bg.slideNext.addEventListener('click', apiBg.setFlickrApiBg)
        bg.slidePrev.addEventListener('click', apiBg.setFlickrApiBg)
    }   
}

const bgSourcesChange = () => {
    bgSource = bgSources.value
    apiBgCategoryError.classList.remove('show-error')
    bgSource === 'unsplash' || bgSource === 'flickr' ? apiBgCategory.classList.add('show-api-bg-category') : apiBgCategory.classList.remove('show-api-bg-category')
    setOneOfBg()
}

const bgSources = document.querySelector('.background-sources')
const apiBgCategory = document.querySelector('.api-bg-category')
const apiBgCategoryError = document.querySelector('.api-bg-category-error')

if (bgSource === 'unsplash' || bgSource === 'flickr') apiBgCategory.classList.add('show-api-bg-category')

export {setOneOfBg, bgSourcesChange, bgSources}