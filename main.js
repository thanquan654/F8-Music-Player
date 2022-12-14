const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const playlist = $('.playlist')
const cd = $('.cd')
const headingSong = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    song: [
    {
        name: 'One Day',
        singer: 'I.D.F.X',
        path: './assets/music/bai1.mp3',
        image: './assets/img/anh1.jpg'
    },
    {
        name: 'Lady (feat Kid Randie &amp; Myster Sandman)',
        singer: 'Le_J_James',
        path: './assets/music/bai2.mp3',
        image: './assets/img/anh2.jpg'
    },
    {
        name: 'Don\'t You Steal My Groove',
        singer: 'Neon NiteClub',
        path: './assets/music/bai3.mp3',
        image: './assets/img/anh3.jpg'
    },
    {
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Don\'t Bother Us (feat. Baer & Suzi)',
        singer: 'Samie Bower',
        path: './assets/music/bai5.mp3',
        image: './assets/img/anh5.jpg'
    },
    {
        name: 'Don\'t Bother Us (feat. Baer & Suzi)',
        singer: 'Samie Bower',
        path: './assets/music/bai5.mp3',
        image: './assets/img/anh5.jpg'
    },
    {
        name: 'Don\'t Bother Us (feat. Baer & Suzi)',
        singer: 'Samie Bower',
        path: './assets/music/bai5.mp3',
        image: './assets/img/anh5.jpg'
    },
    {
        name: 'Don\'t Bother Us (feat. Baer & Suzi)',
        singer: 'Samie Bower',
        path: './assets/music/bai5.mp3',
        image: './assets/img/anh5.jpg'
    }],
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    render: function() {
        html = this.song.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div> `
        })
        playlist.innerHTML = html.join('')
    },
    defindProperties: function() {
        Object.defineProperty(this, 'currentSong' , {
            get: function() {
                return this.song[this.currentIndex]
            }
        })
    },
    handleEvent: function() {
        const _this = this
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        // X??? l?? ph???n cu???n playlist
        const cdWidth = cd.offsetWidth

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // X??? l?? b??i h??t ??ang play / pause
            //Trong khi play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()

        }
            // Trong khi pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()

        }
        // X??? l?? Play / Pause
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // S??? l?? hi???n th??? thanh ti???n ?????
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        // X??? l?? vi???c tua
        progress.onchange = function() {
            const currentSongTime = progress.value * audio.duration / 100
            audio.currentTime = currentSongTime
        }

        // X??? l?? next / prve b??i
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.previousSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }
        // X??? l?? random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // X??? l?? next song khi audio end
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // X??? l?? repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // l???ng nghe click v??o playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || !e.target.closest('.option')) {
                // X??? l?? khi click v??o song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                // X??? l?? khi click vaof option
            }
        }
        

    },
    loadCurrentSong: function() {
        headingSong.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.song.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    previousSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.song.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        do {
            var newIndex = Math.floor(Math.random() * this.song.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }, 200)
    },

    start: function() {
        this.loadConfig()
        // ?????nh ngh??a c??c thu???c t??nh cho Object
        this.defindProperties()
        // L???ng nghe / X??? l?? c??c s??? ki???n (DOM Event)
        this.handleEvent() 

        // Render th??ng tin b??i h??t hi???n t???i v??o UI
        this.loadCurrentSong()
        //Render b??i h??t trong playlist
        this.render()

        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)

    }
}   

app.start()
