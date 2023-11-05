const wrapper = document.querySelector(".wrapper");
const musicImg = document.querySelector(".img-area img");
const musicName = document.querySelector(".name");
const musicArt = document.querySelector(".artist");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const mainAudio = document.querySelector("#main-audio");
const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");

let allMusic = [
    {
        name: "Nơi này có anh",
        artist: "Sơn Tùng",
        img: "./assets/img/anh1.jpg",
        src: "song1"
    },
    {
        name: "Lạc trôi",
        artist: "Sơn Tùng",
        img: "./assets/img/anh2.jpg",
        src: "song2"
    },
    {
        name:"never gonna give up",
        artist: "Rick-Astley",
        img:"https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png?w=1000&h=563&crop=1",
        src:"song3"
    },
    {
        name:"Fadded",
        artist: "Anh lân đi bộ (Alan Walker)",
        img: "https://i.ytimg.com/vi/qdpXxGPqW-Y/maxresdefault.jpg",
        src:"song4"
    },
    {
        name: "Senbonzakura (cover violin)",
        artist: "Kurousa Cover",
        img: "https://i.ytimg.com/vi/6-wEAeNcA_A/hqdefault.jpg",
        src: "song5"
    }
];

let musicIndex = Math.floor(Math.random() * allMusic.length);
let isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb].name;
    musicArt.innerText = allMusic[indexNumb].artist;
    musicImg.src = allMusic[indexNumb].img;
    mainAudio.src = `./assets/music/${allMusic[indexNumb].src}.mp3`;
}

function playMusic() {
    isMusicPaused = false;
    wrapper.classList.add('paused');
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML = '<i class="fi fi-sr-pause"></i>';
    mainAudio.play();
}

function pauseMusic() {
    isMusicPaused = true;
    wrapper.classList.remove('paused');
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML = '<i class="fi fi-sr-play"></i>';
    mainAudio.pause();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 0 ? musicIndex = allMusic.length - 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function nextMusic() {
    musicIndex++;
    musicIndex >= allMusic.length ? musicIndex = 0 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener('click', () => {
    isMusicPaused ? playMusic() : pauseMusic();
});

prevBtn.addEventListener('click', () => {
    prevMusic();
});

nextBtn.addEventListener('click', () => {
    nextMusic();
});

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = document.querySelector('.current-time');
    let musicDuration = document.querySelector('.max-duration');

    mainAudio.addEventListener('loadeddata', () => {
        let mainADuration = mainAudio.duration;
        let TotalMin = Math.floor(mainADuration / 60);
        let Totalsec = Math.floor(mainADuration % 60);
        if (Totalsec < 10) {
            Totalsec = formatTime(Totalsec); 
        }
        musicDuration.innerText = `${TotalMin}:${Totalsec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    currentSec = formatTime(currentSec); 
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener('click', (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});
if (!isNaN(songDuration) && isFinite(songDuration)) {
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
} else {
    console.error('Invalid song duration.');
}
