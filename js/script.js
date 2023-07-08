import showDateTime from '../js/datetime.js'
import * as greet from '../js/greeting.js'
import * as weather from './weather.js'
import * as quotes from './quotes.js'
import playList from './playList.js'
import * as muiscPlayer from './musicPlayer.js'
import * as todoList from './todoList.js'
import * as oneOfBg from './setOneOfBg.js'
import * as settings from './settings.js'

// time and date
showDateTime()

// greeting
greet.showGreeting()
greet.name.addEventListener('input', greet.greetingOnType)
window.addEventListener('beforeunload', greet.setLocalStorage)
greet.showName()

// background
oneOfBg.setOneOfBg()
oneOfBg.bgSources.addEventListener('change', oneOfBg.bgSourcesChange)

// weather
window.addEventListener('beforeunload', weather.setLocalStorage)
weather.showWeatherOnLoad()
weather.city.addEventListener('change', weather.changeWeather)

// quotes
quotes.getQuotes()
quotes.changeQuote.addEventListener('click', quotes.updateQuote)

// music player
muiscPlayer.updatePlayerHeader()
muiscPlayer.audio.src = playList[0].src
muiscPlayer.audio.addEventListener('playing', muiscPlayer.musicOnPlay)
muiscPlayer.progressBarScale.addEventListener('click', e => muiscPlayer.progressBarClick(e))
muiscPlayer.dragPlayerProgressBar(muiscPlayer.progressBarBubble)
muiscPlayer.songsCoversArr.map((song, i) => song.addEventListener('click', e => muiscPlayer.clickOnSongCover(i)))
muiscPlayer.songsBlocks.map((song, i) => song.addEventListener('dblclick', e => muiscPlayer.doubleClickOnSong(i)))
muiscPlayer.playBtn.addEventListener('click', muiscPlayer.playBtnClick)
muiscPlayer.pauseBtn.addEventListener('click', muiscPlayer.pauseBtnClick)
muiscPlayer.playPrevBtn.addEventListener('click', muiscPlayer.playPrev)
muiscPlayer.playNextBtn.addEventListener('click', muiscPlayer.playNext)
muiscPlayer.closeOpenPlaylistBtn.addEventListener('click', muiscPlayer.closePlaylistBtnClick)
muiscPlayer.volumeBarImg.addEventListener('click', muiscPlayer.volumeImgClick)
muiscPlayer.playerVolumeProgressBarRange.addEventListener('input', muiscPlayer.volumeProgressBarDrug)

// to-do-list
todoList.addTodoListItemBtn.addEventListener('click', todoList.addTodoListItem)
todoList.removeTodoListItemBtn.addEventListener('click', todoList.removeTodoListItem)
window.addEventListener('beforeunload', todoList.setLocalStorage)
todoList.showTodoListOnLoad()

// app settings
window.addEventListener('beforeunload', settings.setLocalStorage)
window.addEventListener('load', settings.getLocalStorage)

document.querySelector('.open-settings-btn').addEventListener('click', settings.openSettingsBtn)
document.querySelector('.close-settings-btn').addEventListener('click', settings.closeSettingsBtn)

