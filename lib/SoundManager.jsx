import { Howl, Howler } from "howler";

// SOUND FILES
const sounds = {
  freePhaseBackground: new Howl({
    src: ["/sounds/bgm/bgm-1.mp3"],
    loop: true,
    volume: 0.2,
  }),
  gamePhaseBackground: new Howl({
    src: ["/sounds/bgm/bgm-2.mp3"],
    loop: true,
    volume: 0.06,
  }),
  move: new Howl({ src: ["/sounds/sfx/footstep-grass.mp3"], volume: 1.5 }),
  soccerBallImpact: new Howl({
    src: ["/sounds/sfx/soccer-ball.mp3"],
    volume: 1.5,
  }),
  buttonClick: new Howl({ src: ["/sounds/sfx/btn-click.mp3"], volume: 1 }),
  correctAnswer: new Howl({
    src: ["/sounds/sfx/correct-answer.mp3"],
    volume: 1,
  }),
  wrongAnswer: new Howl({
    src: ["/sounds/sfx/wrong-answer.mp3"],
    volume: 1,
  }),
  gameComplete: new Howl({
    src: ["/sounds/sfx/game-complete.mp3"],
    volume: 1,
  }),

  // FIRST GAME
  keyboardType: new Howl({
    src: ["/sounds/sfx/keyboard-type.mp3"],
    volume: 1,
  }),

  // SECOND GAME
  marblePush: new Howl({ src: ["/sounds/sfx/marble-push.mp3"], volume: 1 }),
  marbleImpact: new Howl({
    src: ["/sounds/sfx/marble-impact.mp3"],
    volume: 1,
  }),
};

let isMuted = false;
let currentlyPlayingBgm = null;

export const SoundManager = {
  playSoundPath: (path) => {
    if (!isMuted) {
      const sound = new Howl({
        src: path,
        volume: 3.5,
      });
      sound.play();
    }
  },

  playSound: (soundName) => {
    if (!isMuted) {
      const sound = sounds[soundName];
      if (sound) {
        if (soundName === "move" && sound.playing()) return;
        sound.play();
      }
    }
  },

  playSoundAfterFinished: (soundName) => {
    if (!isMuted) {
      const sound = sounds[soundName];

      if (sound) {
        if (soundName === "soccerBallImpact") {
          sound._volume = Math.random() * 0.2 + 0.2;
        }

        if (!sound.playing()) {
          sound.play();
        }
      }
    }
  },

  toggleMute: () => {
    isMuted = !isMuted;
    Howler.mute(isMuted);
  },

  setVolume: (soundName, volume) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.volume(volume);
    }
  },

  startBackgroundMusic: (bgmName) => {
    if (!isMuted) {
      if (currentlyPlayingBgm === bgmName && sounds[bgmName].playing()) {
        return; // Prevent duplicate music play
      }

      if (currentlyPlayingBgm) {
        sounds[currentlyPlayingBgm].stop();
      }

      const sound = sounds[bgmName];
      if (sound) {
        sound.play();
        currentlyPlayingBgm = bgmName;
      }
    }
  },

  stopBackgroundMusic: (bgmName) => {
    if (currentlyPlayingBgm === bgmName) {
      sounds[bgmName].stop();
      currentlyPlayingBgm = null;
    }
  },
};
