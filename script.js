console.log("Js file is included")

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))

// audioElement.play()
let songs = [
    {SongName: "Warriyo - Mortals", filepath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {SongName: "Cielo - Huma", filepath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {SongName: "DEAF KEV", filepath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {SongName: "Different Heaven", filepath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {SongName: "Jangi Heroes", filepath: "songs/5.mp3", coverPath: "covers/5.jpg"},
]
songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].SongName
})
// Handle Play/Pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0
    }
})
// Listen to Events

audioElement.addEventListener('timeupdate', ()=>{
    
    // update seekbar
     progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myProgressBar.value = progress
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})

const makeAllPlays = ()=>{
   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle')
        element.classList.remove('fa-pause-circle')

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays()
        
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.play()
        gif.style.opacity = 1
        masterSongName.innerText = songs[songIndex].SongName
        audioElement.currentTime=0
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=4){
        songIndex=0
    }
    else{
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].SongName
        audioElement.play()
        audioElement.currentTime=0
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].SongName
        audioElement.play()
        audioElement.currentTime=0
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
})