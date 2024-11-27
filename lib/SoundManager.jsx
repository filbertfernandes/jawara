import { Howl, Howler } from "howler";

// SOUND FILES
const sounds = {
  freePhaseBackground: new Howl({
    src: ["/sounds/bgm/bgm-1.mp3"],
    loop: true,
    volume: 0.05,
  }),
  gamePhaseBackground: new Howl({
    src: ["/sounds/bgm/bgm-2.mp3"],
    loop: true,
    volume: 0.05,
  }),
  move: new Howl({ src: ["/sounds/sfx/footstep-grass.mp3"], volume: 0.5 }),
  soccerBallImpact: new Howl({
    src: ["/sounds/sfx/soccer-ball.mp3"],
    volume: 0.2,
  }),
  buttonClick: new Howl({ src: ["/sounds/sfx/btn-click.mp3"], volume: 0.7 }),
  correctAnswer: new Howl({
    src: ["/sounds/sfx/correct-answer.mp3"],
    volume: 0.5,
  }),
  wrongAnswer: new Howl({
    src: ["/sounds/sfx/wrong-answer.mp3"],
    volume: 0.5,
  }),
  gameComplete: new Howl({
    src: ["/sounds/sfx/game-complete.mp3"],
    volume: 0.5,
  }),

  // FIRST GAME
  keyboardType: new Howl({
    src: ["/sounds/sfx/keyboard-type.mp3"],
    volume: 0.7,
  }),

  // SECOND GAME
  marblePush: new Howl({ src: ["/sounds/sfx/marble-push.mp3"], volume: 0.7 }),
  marbleImpact: new Howl({
    src: ["/sounds/sfx/marble-impact.mp3"],
    volume: 0.7,
  }),
};

let isMuted = false;

export const SoundManager = {
  playSound: (soundName) => {
    if (!isMuted) {
      const sound = sounds[soundName];
      if (sound) {
        if (soundName === "move") {
          if (sound.playing()) return;
        }
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
      const sound = sounds[bgmName];
      if (sound) {
        sound.play();
      }
    }
  },

  stopBackgroundMusic: (bgmName) => {
    sounds[bgmName].stop();
  },
};
