import React, { createContext, useRef, useContext } from 'react';

const PlayerContext = createContext()

export const usePlayer = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }) => {
  const playerRef = useRef()

  return (
    <PlayerContext.Provider value={playerRef}>
        {children}
    </PlayerContext.Provider>
  )
}
