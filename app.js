const image = document.querySelector('img');
const title = document.querySelector('.music-title');
const artist = document.querySelector('.music-artist');
const progress = document.querySelector('.progress');
const progresContainer = document.querySelector('.progress-container');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');


//music array
const songs = [
    // {
    //     imageSrc: './images/album-cover-1.jpg',
    //     audioSrc: './music/XXKATUSJINSUX - Forget (Slowed) Audio Official.mp3',
    //     songTitle: 'Forget | POGO (slowed)',
    //     songArtist: 'xxkatusjinsux',
    // },
    // {
    //     imageSrc: './images/album-cover-2.jpg',
    //     audioSrc: './music/Ollie - feelings.mp3',
    //     songTitle: 'Feelings',
    //     songArtist: 'Ollie',
    // },
    // {
    //     imageSrc: './images/album-cover-3.jpg',
    //     audioSrc: './music/Lund - F_ck Love.mp3',
    //     songTitle: 'F_ck Love',
    //     songArtist: 'Lund',
    // },
    // {
    //     imageSrc: './images/album-cover-4.jpg',
    //     audioSrc: './music/Ali Gatie - What If I Told You That I Love You [Official Music Video].mp3',
    //     songTitle: 'What If I Told You That I Love You',
    //     songArtist: 'Ali Gatie',
    // },
    // {
    //     imageSrc: './images/album-cover-5.jpg',
    //     audioSrc: './music/Joji - Glimpse of Us _ (slowed   reverb   rain).mp3',
    //     songTitle: 'Glimpse of Us',
    //     songArtist: 'Joji',
    // },
    {
        imageSrc: './images/album-cover-5.jpg',
        audioSrc: './TheVoices/1.mp3',
        songTitle: 'Outside The Box',
        songArtist: 'future',
    },
    {
        imageSrc: './images/album-cover-5.jpg',
        audioSrc: './TheVoices/2.mp3',
        songTitle: 'Outside The Box',
        songArtist: 'future',
    },
    {
        imageSrc: './images/album-cover-5.jpg',
        audioSrc: './TheVoices/3.mp3',
        songTitle: 'Outside The Box',
        songArtist: 'future',
    },
    {
        imageSrc: './images/album-cover-5.jpg',
        audioSrc: './TheVoices/4.mp3',
        songTitle: 'Outside The Box',
        songArtist: 'future',
    },
    {
        imageSrc: './images/album-cover-5.jpg',
        audioSrc: './TheVoices/5.mp3',
        songTitle: 'Outside The Box',
        songArtist: 'future',
    },

];

// check if playing 
let isPlaying = false;
let songIndex = 0;

// play 
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}
// pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

// play or pause eventListener
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong()
});

// load song
function loadSong(song){
    title.innerText = song.songTitle;
    artist.innerText = song.songArtist;
    image.src = song.imageSrc;
    music.src = song.audioSrc;
    playSong();
}

//loading 
loadSong(songs[songIndex]);
pauseSong();

// next song
function nextSong(){
    songIndex++;
    if(songIndex === songs.length){ 
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
}

// nextBtn eventListener
nextBtn.addEventListener('click', nextSong);

// prev song
function prevSong(){
    songIndex--;
    if( songIndex < 0){ 
        songIndex = (songs.length)-1;
    }
    loadSong(songs[songIndex]);
}

// prevBtn eventListener
prevBtn.addEventListener('click', prevSong);


// volume Up
function volumeUp(){
    if(music.volume != 1){
        music.volume += 0.1;
    } 
}
// volume Down
function volumeDown(){
    if(music.volume != 0){
        music.volume -= 0.1;
    } 
}

// keyboard commands
window.addEventListener('keyup', (e) => {
    console.log(e);
    if(e.code === 'Space'){
        isPlaying ? pauseSong() : playSong() 
    }
    else if(e.code === 'ArrowRight'){
        nextSong();
    }
    else if(e.code === 'ArrowLeft'){
        prevSong();
    }
    else if(e.code === 'ArrowUp'){
        volumeUp();
    }  
    else if(e.code === 'ArrowDown'){
        volumeDown();
    }  
})

// progress 
function progressUpdate(e){
    if(isPlaying){
        // bar
        let {currentTime, duration} = e.srcElement;
        let progressPercent = (currentTime/duration)*100;
        console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;
        // time
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
        }
    }
}

// progressUpdate eventlistenter
music.addEventListener('timeupdate', progressUpdate);


// progressSelector
function progressSelector(){

}

// progressSelector eventListener
progresContainer.addEventListener('click', (e) => {
    console.log(e);
});



// on music end
music.addEventListener('ended', nextSong);