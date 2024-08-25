import { Howl, Howler } from 'howler'

// SOUND FILES
const sounds = {
    freePhaseBackground: new Howl({ src: ['./sounds/bgm-2.mp3'], loop: true, volume: 0.05 }),
    gamePhaseBackground: new Howl({ src: ['./sounds/bgm-3.mp3'], loop: true, volume: 0.05 }),
    move: new Howl({ src: ['./sounds/leaves01.mp3'], volume: 0.5 }),
    soccerBallImpact: new Howl({ src: ['./sounds/soccer-ball.mp3'], volume: 0.2 }),
    buttonClick: new Howl({ src: ['./sounds/btn-click-sfx.mp3'], volume: 0.7 }),
    correctAnswer: new Howl({ src: ['./sounds/correct-answer.mp3'], volume: 0.5 }),
    gameComplete: new Howl({ src: ['./sounds/game-complete.mp3'], volume: 0.5 }),
    marblePush: new Howl({ src: ['./sounds/marble-push.mp3'], volume: 0.7 }),
    marbleImpact: new Howl({ src: ['./sounds/marble-impact-2.mp3'], volume: 0.7 }),
}

let isMuted = false

export const SoundManager = {
    playSound: (soundName) => {
        if(!isMuted) {
            const sound = sounds[soundName]
            if(sound) {
                if(soundName === 'move') {
                    if(sound.playing()) return
                }
                sound.play()
            }
        }
    },

    playSoundAfterFinished: (soundName) => {
        if(!isMuted) {
            const sound = sounds[soundName]

            if(sound) {
                if(soundName === 'soccerBallImpact') {
                    sound._volume = Math.random() * 0.2 + 0.2
                }

                if(!sound.playing()) {
                    sound.play()
                }
            }
        }
    },

    toggleMute: () => {
        isMuted = !isMuted
        Howler.mute(isMuted)
    },

    setVolume: (soundName, volume) => {
        const sound = sounds[soundName]
        if(sound) {
            sound.volume(volume)
        }
    },
    
    startBackgroundMusic: (bgmName) => {
        if(!isMuted) {
            const sound = sounds[bgmName]
            if(sound) {
                sound.play()
            }
        }
    },

    stopBackgroundMusic: (bgmName) => {
        sounds[bgmName].stop()
    }
}
