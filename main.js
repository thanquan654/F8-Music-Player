const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


console.log('Hello World')
const app = {
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
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Better',
        singer: 'Square a Saw',
        path: './assets/music/bai4.mp3',
        image: './assets/img/anh4.jpg'
    },
    {
        name: 'Don\'t Bother Us (feat. Baer &amp; Suzi)',
        singer: 'Samie Bower',
        path: './assets/music/bai5.mp3',
        image: './assets/img/anh5.jpg'
    }],
    render: function() {
        html = this.song.map((song) => {
            return `
            <div class="song">
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
        $('.playlist').innerHTML = html.join('')
    },
    handleEvent: function() {
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
    },
    start: function() {
        this.handleEvent() 
        this.render()
    }
}   

app.start()
