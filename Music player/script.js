const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const fileUpload = document.getElementById('file-upload');

// Playlist array (fallback songs)
const playlist = [
  'song1.mp3',
  'song2.mp3',
  'song3.mp3'
];

let currentSongIndex = 0;

// Load first song
audio.src = playlist[currentSongIndex];

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '❚❚';
  } else {
    audio.pause();
    playPauseBtn.textContent = '►';
  }
});

// Update progress & time
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;

  let currentMinutes = Math.floor(audio.currentTime / 60);
  let currentSeconds = Math.floor(audio.currentTime % 60);
  if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;

  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration % 60);
  if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;

  if (!isNaN(durationMinutes) && !isNaN(durationSeconds)) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
});

// Click to seek
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// Next & Previous buttons
nextBtn.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex >= playlist.length) {
    currentSongIndex = 0;
  }
  loadSong();
});

prevBtn.addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1;
  }
  loadSong();
});

// Load song and play
function loadSong() {
  audio.src = playlist[currentSongIndex];
  audio.play();
  playPauseBtn.textContent = '❚❚';
}

// Auto play next when song ends
audio.addEventListener('ended', () => {
  nextBtn.click();
});

// Volume control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Upload local song
fileUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    audio.src = fileURL;
    audio.play();
    playPauseBtn.textContent = '❚❚';
  }
});
