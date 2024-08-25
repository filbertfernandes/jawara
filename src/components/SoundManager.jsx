// src/components/SoundManager.js
import { Howl, Howler } from 'howler'

// Sound files
const sounds = {
    move: new Howl({ src: ['./sounds/leaves01.mp3'], volume: 0.5 }),
    soccerBall: new Howl({ src: ['./sounds/soccer-ball.mp3'], volume: 0.1 }),
    buttonClick: new Howl({ src: ['./sounds/btn-click-sfx.mp3'], volume: 0.7 }),
    freePhaseBackground: new Howl({ src: ['./sounds/bgm-2.mp3'], loop: true, volume: 0.03 }),
    gamePhaseBackground: new Howl({ src: ['./sounds/bgm-3.mp3'], loop: true, volume: 0.03 })
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

    playSoccerBallSound: (impactStrength, distanceWithPlayer) => {
        if(!isMuted) {
            const sound = sounds.soccerBall

            if(sound) {
                sound._volume = Math.random() * 0.2 + 0.1
                if(!sound.playing()) sound.play()
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
