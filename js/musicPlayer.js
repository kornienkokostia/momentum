import playList from './playList.js'

let playNum = 0

const updatePlayerHeader = () => {
    headerSongCover.style.backgroundImage = `url(${playList[playNum].coverBig})`
    headerSongTitle.textContent = playList[playNum].title
    playList[playNum].explicit === true ? headerSongExplicit.style.backgroundImage = `url(./assets/svg/explicit.svg)` : `none`
    headerSongArtist.textContent = playList[playNum].artist
}

const playAudio = () => {
    audio.src = `${playList[playNum].src}`
    audio.currentTime = currentTime
    const arrAnimations = [...document.querySelectorAll('.song-palying-animation')]
    const arrAnimationEl = [...document.querySelectorAll('.animation-el')]
    const arrCovers = [...document.querySelectorAll('.song-cover')]
    arrCovers.map(el => el.style.setProperty("--backgroundOnHover", `url("../assets/svg/music-play.svg")`))
    arrAnimationEl.map(el => el.style.setProperty("--animationTimeOne", '.7s'))
    arrAnimationEl.map(el => el.style.setProperty("--animationTimeTwo", '.6s'))
    arrAnimationEl.map(el => el.style.setProperty("--animationTimeThree", '.4s'))
    arrAnimationEl.map(el => el.style.setProperty("--animationTimeFour", '.3s'))
    arrAnimations.map(el => el.classList.remove('show-equalazer'))
    if (!isPlay) {
        isPlay = true
        audio.play()
        arrAnimations[playNum].classList.add('show-equalazer')
        arrCovers[playNum].style.setProperty("--backgroundOnHover", `url("../assets/svg/music-pause.svg")`)
    } else {
        arrAnimations[playNum].classList.add('show-equalazer')
        arrAnimationEl.map(el => el.style.setProperty("--animationTimeOne", '0s'))
        arrAnimationEl.map(el => el.style.setProperty("--animationTimeTwo", '0s'))
        arrAnimationEl.map(el => el.style.setProperty("--animationTimeThree", '0s'))
        arrAnimationEl.map(el => el.style.setProperty("--animationTimeFour", '0s'))
        arrAnimationEl.map(el => el.classList.add('hide-equalazer'))
        isPlay = false
        audio.pause()
    }
}

const playNext = () => {
    playNum === playList.length - 1 ? playNum = 0 : playNum ++
    playButtonOff()
    updatePlayerHeader()
    isPlay = false
    currentTime = 0
    currIndx ++
    playAudio()
}

const playPrev = () => {
    playNum === 0 ? playNum = playList.length - 1 : playNum --
    playButtonOff()
    updatePlayerHeader()
    currentTime = 0
    isPlay = false
    currIndx --
    playAudio()
}

const playButtonOn = () => {
    playBtn.style.display = 'block'
    pauseBtn.style.display = 'none'
}

const playButtonOff = () => {
    playBtn.style.display = 'none'
    pauseBtn.style.display = 'block'
}

const convertTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time - minutes * 60)
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

const musicOnPlay = () => {
    timeoutID = window.setInterval(function() {
        currentTime = audio.currentTime
        if (!isNaN(audio.duration - audio.currentTime) && !stopUpdatingTime) {
            headerCurrentTimeEl.textContent = convertTime(Math.round(audio.currentTime))
            headerEndTimeEl.textContent = `-${convertTime(Math.round(audio.duration) - Math.round(audio.currentTime))}`
        }
        if (!isProgressBarChanging) {
            progressBarFront.style.width = Math.round(audio.currentTime * 161/audio.duration) + 8 + 'px'
            progressBarBubble.style.left = Math.round(audio.currentTime * 161/audio.duration) + 136 + 'px'
        }
        if (audio.duration  === audio.currentTime) {
            console.log('en')
            window.clearInterval(timeoutID)
            currentTime = 0
            playNext()
        }
    }, 1000)
}

const progressBarClick = (e) => {
    if (!didSwipe) {
        const postX = e.clientX - 140 + 1
        currentTime = Math.round(postX/+(161/Math.round(audio.duration)) + "e+1") + "e-1"
        isPlay = false
        playAudio()
        playButtonOff()
    }
    didSwipe = false
}

const dragPlayerProgressBar = (elem) => {
    let pos1, pos3
    
    const dragMouseDown = (e) => {
        e = e || window.event
        e.preventDefault()
        pos3 = e.clientX
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }
    const elementDrag = (e) => {
        e = e || window.event
        e.preventDefault()
        pos1 = pos3 - e.clientX
        pos3 = e.clientX
        if (pos3 > 140 && pos3 < 301) {
            isProgressBarChanging = true
            stopUpdatingTime = true

            elem.style.left = (elem.offsetLeft - pos1) + "px"
            progressBarFront.style.width = (progressBarFront.clientWidth - pos1)  + "px"
            currentTime = Math.round((pos3 - 141 + 1)/+(161/Math.round(audio.duration)) + "e+1") + "e-1"
            if (!isNaN(audio.duration - audio.currentTime)) {
                headerCurrentTimeEl.textContent = convertTime(Math.round(currentTime))
                headerEndTimeEl.textContent = `-${convertTime(Math.round(audio.duration) - Math.round(currentTime))}`
            }
        }
    }
    const closeDragElement = () => {
        document.onmouseup = null
        document.onmousemove = null
        isProgressBarChanging = false
        stopUpdatingTime = false
        currentTime = Math.round((pos3 - 140 + 2)/+(163/Math.round(audio.duration)) + "e+1") + "e-1"
        
        if (playBtn.style.display === 'none') {
            isPlay = false
            playAudio()
            playButtonOff()
        } else {
            isPlay = true
            playAudio()
            playButtonOn()
        }
        didSwipe = true
      }
    elem.addEventListener('mousedown', dragMouseDown)
}

const clickOnSongCover = (i) => {
    headerSongCover.style.backgroundImage = `url(${playList[i].coverBig})`
    playNum = i
    headerSongTitle.textContent = playList[i].title
    playList[i].explicit === true ? headerSongExplicit.style.backgroundImage = `url(./assets/svg/explicit.svg)` : `none`
    headerSongArtist.textContent = playList[i].artist
    
    if (currIndx === i && !iconPresed && isPlay && audio.currentTime !== 0) {
        playButtonOn()
        isPlay = true
        playAudio()
        iconPresed = true
    } 
    if (currIndx === i && !iconPresed && !isPlay && audio.currentTime !== 0 ){
        playButtonOff()
        isPlay = false
        playAudio()
    }
    if( currIndx !== i )  {
        currentTime = 0
        isPlay = false
        playAudio()
        playButtonOff()
    }
    currIndx = i
    iconPresed = false
}

const doubleClickOnSong = (i) => {
    headerSongCover.style.backgroundImage = `url(${playList[i].coverBig})`
    playNum = i
    headerSongTitle.textContent = playList[i].title
    playList[i].explicit === true ? headerSongExplicit.style.backgroundImage = `url(./assets/svg/explicit.svg)` : `none`
    headerSongArtist.textContent = playList[i].artist
    currentTime = 0
    isPlay = false
    playAudio()
    playButtonOff()
}

const playBtnClick = () => {
    playButtonOff()
    isPlay = false
    playAudio()
}

const pauseBtnClick = () => {
    playButtonOn()
    isPlay = true
    playAudio()
}

const closePlaylistBtnClick = () => {
    player.classList.toggle('open-playlist')
    playListDiv.classList.toggle('show-play-list')
    playListDiv.classList.toggle('play-list-add-padding')
    headerSongCover.classList.toggle('player-header-song-cover-smaller')
    headerSongTitle.classList.toggle('player-header-song-title-small')
    headerSongArtist.classList.toggle('player-header-song-artist-small')
    const playerIcons = [...document.querySelectorAll('.music-icon')]
    playerIcons.map(icon => {
        icon.style.height === '15px' ? icon.style.height = '22px' : icon.style.height = '15px'
        icon.style.width === '20px' ? icon.style.width = '27px' : icon.style.width = '20px'
    })
    const playerBtns = [...document.querySelectorAll('.player-button')]
    playerBtns.map(btn => {
        btn.style.height === '15px' ? btn.style.height = '22px' : btn.style.height = '15px'
        btn.style.width === '20px' ? btn.style.width = '27px' : btn.style.width = '20px'
    })
    document.querySelector('.close-open-playlist-button-icon').classList.toggle('close-open-playlist-change-icon')
    
    closeOpenPlaylistBtn.classList.toggle('close-open-playlist-change-button')
    document.querySelector('.player-header-main').style.width === '205px' ? document.querySelector('.player-header-main').style.width = '169px' : document.querySelector('.player-header-main').style.width = '205px'
    document.querySelector('.player-controls').classList.toggle('player-controls-center')
    headerSongExplicit.style.minHeight === '10px' ? headerSongExplicit.style.minHeight = '12px' : headerSongExplicit.style.minHeight = '10px'
    headerSongExplicit.style.minWidth === '10px' ? headerSongExplicit.style.minWidth = '12px' : headerSongExplicit.style.minWidth = '10px'
    headerSongCover.classList.toggle('player-header-song-cover-hide-shadow')
    
    document.querySelector('.progress-bar-time-block').classList.toggle('hide-progress-bar')
    document.querySelector('.progress-bar-back').classList.toggle('hide-progress-bar')
    progressBarFront.classList.toggle('hide-progress-bar')
    if (progressBarBubble.style.opacity === '0') {
        const opacity = () => progressBarBubble.style.opacity = '1'
        setTimeout(opacity, 300)
    } else {progressBarBubble.style.opacity = '0'}
    document.querySelector('.player-volume-slider').classList.toggle('hide-volume-contorl')
}

const volumeImgClick = () => {
    if (audio.volume === currentVolumeVal) {
        audio.volume = 0
        volumeBarImg.src = './assets/svg/volume-off.svg'
        playerVolumeProgressBarRange.value = 0
        playerVolumeProgressBarProgress.value = 0
    } else {
        audio.volume = currentVolumeVal
        volumeBarImg.src = currentVolumeImg
        playerVolumeProgressBarRange.value = currentVolumeScaleVal
        playerVolumeProgressBarProgress.value = currentVolumeScaleVal
    }
}

const volumeProgressBarDrug = () => {
    currentVolumeScaleVal = playerVolumeProgressBarRange.value
    playerVolumeProgressBarProgress.value = currentVolumeScaleVal
    currentVolumeVal = currentVolumeScaleVal/100
    audio.volume = currentVolumeVal
    if (currentVolumeScaleVal >= 66.3) {
        currentVolumeImg = './assets/svg/volume-max.svg'
    }
    if (currentVolumeScaleVal < 66.3 && currentVolumeScaleVal > 33.3) {
        currentVolumeImg = './assets/svg/volume-mid.svg'
    }
    if (currentVolumeScaleVal <= 33.3 && currentVolumeScaleVal > 0) {
        currentVolumeImg = './assets/svg/volume-min.svg'
    }
    if (currentVolumeScaleVal == 0) {
        currentVolumeImg = './assets/svg/volume-off.svg'
    }
    volumeBarImg.src = currentVolumeImg
}

const playListDiv = document.querySelector('.play-list')

playList.forEach((el) => {
    const songDiv = document.createElement('div')
    songDiv.setAttribute('class', 'song')
    songDiv.innerHTML =  `
                    <div class="song-block">
                        <div class="song-cover" style="background-image: url(${el.coverSmall})"></div>
                        <div class="song-palying-animation">
                            <div class="animation-container">
                                <span class="animation-el"></span>
                                <span class="animation-el"></span>
                                <span class="animation-el"></span>
                                <span class="animation-el"></span>
                            </div>
                        </div>
                        <div class="song-description">
                            <div class="song-title-block">
                                <div class="song-title">${el.title}</div>
                                <div class="song-explicit" style="background-image: ${el.explicit === true ? `url(./assets/svg/explicit.svg)` : `none`}"></div>
                            </div>  
                            <div class="song-artist">${el.artist}</div>  
                        </div>
                        </div>
                        <div class="song-separator"></div>`
    playListDiv.appendChild(songDiv)
})

let isPlay = false
let currentTime = 0
let isProgressBarChanging = false
let stopUpdatingTime = false
let didSwipe = false
let iconPresed = false
let currIndx
let currentVolumeImg = './assets/svg/volume-max.svg'
let currentVolumeVal = 1
let currentVolumeScaleVal = 100
let timeoutID
const audio = new Audio()
const player = document.querySelector('.player')
const playBtn = document.querySelector('.play')
const pauseBtn = document.querySelector('.pause')
const playPrevBtn = document.querySelector('.play-prev')
const playNextBtn = document.querySelector('.play-next')
const headerSongCover = document.querySelector('.player-header-song-cover')
const headerSongTitle = document.querySelector('.player-header-song-title')
const headerSongExplicit = document.querySelector('.player-header-song-explicit')
const headerSongArtist = document.querySelector('.player-header-song-artist')
const headerCurrentTimeEl = document.querySelector('.current-time')
const headerEndTimeEl = document.querySelector('.end-time')
const progressBarFront = document.querySelector('.progress-bar-front')
const progressBarBubble = document.querySelector('.progress-bar-bubble')
const volumeBarImg = document.querySelector('.volume-img')
const playerVolumeProgressBarRange = document.querySelector('.player-volume-progressbar-range')
const playerVolumeProgressBarProgress = document.querySelector('.player-volume-progressbar-progress')
const closeOpenPlaylistBtn = document.querySelector('.close-open-playlist-button')
const progressBarScale = document.querySelector('.progress-bar-scale')
const songsCoversArr = [...document.querySelectorAll('.song-cover')]
const songsBlocks = [...document.querySelectorAll('.song-description')]

audio.src = playList[0].src

headerEndTimeEl.textContent = `-4:29`

export {playNum, audio, updatePlayerHeader, musicOnPlay, progressBarClick, dragPlayerProgressBar,
    songsCoversArr, clickOnSongCover, songsBlocks, doubleClickOnSong, playBtn, pauseBtn, playBtnClick,
    pauseBtnClick, playPrevBtn, playPrev, playNextBtn, playNext, closePlaylistBtnClick, volumeImgClick, 
    volumeProgressBarDrug, closeOpenPlaylistBtn, volumeBarImg, playerVolumeProgressBarRange, progressBarScale,
    progressBarBubble
}