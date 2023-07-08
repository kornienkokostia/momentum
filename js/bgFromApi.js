const getRandomNum = (len) => Math.floor(Math.random() * len)

const setFlickrApiBg = async () => {
    try {
        const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=477caab00fdbefb0127f504efa8ef58f&tags=${bgApiCategory}&extras=url_l&format=json&nojsoncallback=1`)
        const res = await response.json()
        let resFilteredArr = res.photos.photo.filter(el => el.url_l !== undefined)
        let link = resFilteredArr[getRandomNum(resFilteredArr.length-1)].url_l
        const img = new Image()
        img.src = link
        img.addEventListener('load', () => {
            document.body.style.backgroundImage = `url(${img.src})`
            document.querySelector('.preloader').classList.add('hidden')
            document.querySelector('.ispinner').classList.add('hidden')
        })
    } catch(err) {
        console.log(err)
        if (apiBgCategoryInput.value !== '') {apiBgCategorError.classList.add('show-error')}
        document.querySelector('.preloader').classList.add('hidden')
        document.querySelector('.ispinner').classList.add('hidden')
    }
}

const setUnsplashApiBg = async () => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${bgApiCategory}&client_id=u0TffrwfGpF8FNnpUv47ICtnB4UbU15JdY-GRcJHnUM`)
        const res = await response.json()
        let link = res.urls.regular
        const img = new Image()
        img.src = link
        img.addEventListener('load', () => {
            document.body.style.backgroundImage = `url(${img.src})`
            document.querySelector('.preloader').classList.add('hidden')
            document.querySelector('.ispinner').classList.add('hidden')
        })
    } catch(err) {
        console.log(err)
        if (apiBgCategoryInput.value !== '') {apiBgCategorError.classList.add('show-error')}
        document.querySelector('.preloader').classList.add('hidden')
        document.querySelector('.ispinner').classList.add('hidden')
    }
}

const apiBgCategoryInput = document.querySelector('.api-bg-category-input')
const backgroundSources = document.querySelector('.background-sources')
const apiBgCategorError = document.querySelector('.api-bg-category-error')
let bgApiCategory = localStorage.getItem('bg-api-category') ? localStorage.getItem('bg-api-category') : 'nature'

apiBgCategoryInput.addEventListener('change', () => {
    bgApiCategory = apiBgCategoryInput.value
    backgroundSources.value === 'unsplash' ? setUnsplashApiBg() : setFlickrApiBg()
})

apiBgCategoryInput.addEventListener('keyup', () => apiBgCategorError.classList.remove('show-error'))

export {setFlickrApiBg, setUnsplashApiBg} 
