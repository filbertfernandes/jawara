const useSound = (src) => {
  const playSound = () => {
    const audio = new Audio(src)
    audio.play()
  }

  return playSound
}

export default useSound