// Create and cache sound objects
const soundCache = {};

function createSound(src) {
  if (soundCache[src]) return soundCache[src];
  
  const audio = new Audio();
  audio.src = src;
  audio.preload = 'auto';
  soundCache[src] = audio;
  return audio;
}

function playSound(sound, options = {}) {
  // Clone to allow simultaneous playback of same sound
  const playback = sound.cloneNode();
  
  // Apply options
  if (options.volume) playback.volume = options.volume;
  if (options.playbackRate) playback.playbackRate = options.playbackRate;
  
  // Play and handle errors
  playback.play().catch(error => {
    console.error('Audio playback failed:', error);
  });

  // Cleanup after playback
  playback.onended = () => playback.remove();
  
  return playback;
}


