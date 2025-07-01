import { create } from "zustand";

import { words } from "./constants.js";

export const generateGameLevel = ({ nbStages }) => {
  const level = [];

  for (let i = 0; i < nbStages; i++) {
    const stage = [];
    const nbOptions = 2 + i;
    // const nbOptions = 1 // FOR TESTING

    for (let j = 0; j < nbOptions; j++) {
      let word = null;

      while (!word || stage.includes(word)) {
        word = words[Math.floor(Math.random() * words.length)];
      }

      stage.push(word);
    }

    level.push(stage);
  }

  return level;
};

export const useFirstGame = create((set) => ({
  level: null,
  currentStage: 0,
  mode: "",
  startTime: 0,
  endTime: 0,
  cameraPosition: { x: 0, y: 1, z: 3 },
  hoveredLockBox: null,
  isDragging: false,
  draggingItem: null,
  correctCount: 0,
  touchedIndex: null,

  startGame: ({ mode }) => {
    set((state) => {
      if (mode === "" && state.mode !== "") mode = state.mode;
      const level = generateGameLevel({ nbStages: 5 });
      return {
        level,
        currentStage: 0,
        correctCount: 0,
        mode,
        startTime: Date.now(),
        cameraPosition: { x: 0, y: 1, z: 3 },
      };
    });
  },

  nextStage: () => {
    set((state) => {
      const currentStage = state.currentStage + 1;
      return { currentStage, correctCount: 0 };
    });
  },

  gameOver: () => {
    set(() => {
      return { endTime: Date.now(), correctCount: 0 };
    });
  },

  setTouchedIndex: (index) => {
    set(() => {
      return { touchedIndex: index };
    });
  },

  setDraggingItem: (item) => {
    set(() => {
      return { draggingItem: item };
    });
  },

  incrementCorrectCount: () => {
    set((state) => {
      const newCorrectCount = state.correctCount + 1;
      return { correctCount: newCorrectCount };
    });
  },

  setIsDragging: (condition) => {
    set(() => {
      return { isDragging: condition };
    });
  },

  setHoveredLockBox: (lockBoxIndex) => {
    set(() => {
      return { hoveredLockBox: lockBoxIndex };
    });
  },
}));
