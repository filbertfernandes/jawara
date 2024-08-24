// src/components/SoundManager.js
import { Howl, Howler } from 'howler'

// Sound files
const sounds = {
    move: new Howl({ src: ['./sounds/move.mp3'], volume: 0.5 }),
    buttonClick: new Howl({ src: ['./sounds/btn-click-sfx.wav'], volume: 0.5 }),
    background: new Howl({ src: ['./sounds/background.mp3'], loop: true, volume: 0.2 })
}

let isMuted = false

export const SoundManager = {
    playSound: (soundName) => {
        if (!isMuted) {
            const sound = sounds[soundName]
            if (sound) {
                sound.play()
            }
        }
    },
    toggleMute: () => {
        isMuted = !isMuted
        Howler.mute(isMuted)
    },
    setVolume: (soundName, volume) => {
        const sound = sounds[soundName]
        if (sound) {
            sound.volume(volume)
        }
    },
    startBackgroundMusic: () => {
        if (!isMuted) {
            sounds.background.play()
        }
    },
    stopBackgroundMusic: () => {
        sounds.background.stop()
    }
}
