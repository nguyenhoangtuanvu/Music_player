//  load song into playlist
// scroll top
// play pause seek
// CD rotate
// next/ pre
// random
// next or repeat when ended
// active song 
// scroll active song into view
// play song when click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



const player = $('.player');
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const cd = $('.cd');
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

//add song:
const addSong = $('.js-btn-primary');
const overlay = $('.overlay-modal')
const closeOverlay = $('.btn-close')
const saveSong = $('.btn-saveNewSong')
const nameInput = $('.nameInput')
const singerInput = $('.singerInput')
const pathInput = $('.pathInput')
const imageInput = $('.imageInput')



//add time to input range
const timeRange = $("#timeRange");

//custome for volumn bar
const volumnOption = $('.js-volumn-option');
const volumnValue = $('.volumn-js')
const volumnHeight = $('.volumn-height');
const volumnMiddle = $('.volumn-middle');
const volumnOff = $('.volumn-off');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [
        {
            name: 'Say you wont let go',
            singer: 'James Arthur',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.jpg'
        },
        {
            name: 'Somewhere only we know',
            singer: 'Keane',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            name: 'Be more',
            singer: 'Stephen Sanchez',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            name: 'Another love',
            singer: 'Tom Odell',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.jpg'
        },
        {
            name: 'Love the way you lie',
            singer: 'Eminiem',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.jpg'
        },
        {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.jpg'
        },
        {
            name: 'Someone you love',
            singer: 'Lewis Capaldi',
            path: './assets/music/song7.mp3',
            image: './assets/img/song7.jpeg'
        },
        {
            name: 'Photograph',
            singer: 'Ed Sheeran',
            path: './assets/music/song8.mp3',
            image: './assets/img/song8.png'
        },
        {
            name: 'Suýt nữa thì',
            singer: 'Andiez',
            path: './assets/music/song9.mp3',
            image: './assets/img/song9.jpg'
        },
        {
            name: 'Viva la vida',
            singer: 'Coldplay',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.jpg'
        },
        {
            name: 'Viva la vida',
            singer: 'Coldplay',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.jpg'
        },
        {
            name: 'Viva la vida',
            singer: 'Coldplay',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.jpg'
        },
        {
            name: 'Viva la vida',
            singer: 'Coldplay',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.jpg'
        },
        {
            name: 'Viva la vida',
            singer: 'Coldplay',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.jpg'
        },
        {
            name: 'Let Her Go (Feat. Ed Sheeran - Anniversary Edition)',
            singer: 'Passenger',
            path: './assets/music/song11.mp3',
            image: './assets/img/song11.jpg'
        }
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index=${index}>
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class="body" title="${song.name}
                ${song.singer}">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>

            <div class="option js-option-${index}" onclick="handleOptionClick(event)" data-option=${index}>
                <i class="fas fa-ellipsis-h"></i>
                <div class="option-container hide btn-group-vertical" >
                    <button class="btn btn-primary option-item option-item1-${index}" type="button">
                        <i class="bi bi-cloud-arrow-down-fill"></i>
                    </button>
                    <button class="btn btn-primary option-item option-item2-${index}" type="button">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
            `;
        }).join('');
        
        playlist.innerHTML = htmls;
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function() {
        const _this = this;

         // CD rotation
         const cdThumbAnimate = cdThumb.animate(
            [
                {transform: 'rotate(360deg)'}
            ],
            {
                duration: 10000,
                iterations: Infinity
            }
        )
        cdThumbAnimate.pause();

        //xử lí phóng to/ thu nhỏ
        const cdWidth = cd.offsetWidth;
        playlist.onscroll = function() {
            const scrollTop = playlist.scrollTop;
            // console.log("scrollTop:", scrollTop)
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // khi play song
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause(); 
            } else {
                audio.play();
            }
        }
        // khi đang play song
        audio.onplay = function() {
            _this.isPlaying = true;
            cdThumbAnimate.play();
            player.classList.add('playing');
        }
        // khi pause 
        audio.onpause = function() {
            _this.isPlaying = false;
            cdThumbAnimate.pause();
            player.classList.remove('playing');
        }
        // time update
        audio.ontimeupdate = function() {
            if(audio.duration) {
                let currentTime = formatTime(audio.currentTime);
                let duration = formatTime(audio.duration);
                timeRange.textContent = currentTime + '/ ' + (duration ? duration : '0:00');

                let progressPercent = (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercent;
            }
        }
        function formatTime(time) {
            let min = Math.floor( time / 60)
            let sec = Math.floor(time % 60)
            return min + ':' + (sec < 10 ? '0' + sec : sec);
        }
        // change current time on progress
        progress.oninput = function(e) {
            let seekTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        }

        // Random button
        randomBtn.onclick = function() {
            // if(_this.isRandom) {
            //     randomBtn.classList.remove('active');
            //     _this.isRandom = false;
            // }else {
            //     randomBtn.classList.add('active');
            //     _this.isRandom = true;
            // }
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // next button 
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandom();
                audio.play();
                _this.handleActiveFromList();
            }else {
                _this.nextPlay();
                audio.play();
                _this.handleActiveFromList()
            }
            console.log(_this.currentIndex)
        }
        prevBtn.onclick = function() {
            _this.previousPlay()
            audio.play()
            _this.handleActiveFromList()
        }
        repeatBtn.onclick = function() {
            // if(_this.isRepeat) {
            //     repeatBtn.classList.remove('active');
            //     _this.isRepeat = false;

            // }else {
            //     repeatBtn.classList.add('active');
            //     _this.isRepeat = true;
            // }
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        // hết bài
        audio.onended = function() { 
            if (_this.isRepeat) {
                audio.play();
            }else if (_this.isRandom) {
                _this.playRandom();
                audio.play();
            }else {
                _this.nextPlay();
                audio.play();
            }
        }
        // play song when click play list
        console.log(playlist);
        playlist.onclick = function(e) {
            let songNode = e.target.closest('.song:not(.active)');
            console.log("songNode:", songNode)
            if (songNode) {
                _this.currentIndex =  songNode.getAttribute('data-index')
                _this.handleActiveFromList()
                _this.loadCurrentSong()
                audio.play();
            }
        }
        
    },
    // xử lý logic button
    // play random
    playRandom: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);	
        }
        while(newIndex == this.currentIndex)

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    // next 
    nextPlay: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    // previous
    previousPlay: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    handleActiveFromList: function() {
        let listSongs = playlist.querySelectorAll('.song')
        for(let i = 0; i < listSongs.length; i++) { 
            let index = listSongs[i].getAttribute('data-index')
            if(index == this.currentIndex) {
                listSongs[i].classList.add('active')
            } else {
                listSongs[i].classList.remove('active')
            }
        }
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }, 400)
    },
    loadCurrentSong: function() {
        heading.innerHTML = this.currentSong.name
        cdThumb.style.backgroundImage = 'url(' + this.currentSong.image + ')';
        audio.src = this.currentSong.path;
    },
    start: function() {
        // định nghĩa thuộc tính cho object 
        this.defineProperties();
        // lắng nghe/ xử lý event 
        this.handleEvent();

        // load current song
        this.loadCurrentSong();

        // render
        this.render.call(this);
        // console.log("this:", this)
    }
}
app.start();
