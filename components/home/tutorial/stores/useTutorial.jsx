import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { SoundManager } from "@/lib/SoundManager";

export const tutorialStates = {
  MENU: "MENU",
  GUIDE: "GUIDE",
  CONTROLS: "CONTROLS",
  CREDITS: "CREDITS",
};

export const useTutorial = create(
  subscribeWithSelector((set) => {
    return {
      tutorialState: tutorialStates.MENU,
      guideIndex: 0,
      guideLength: 5,

      setTutorialState: (tutorialState) => {
        set(() => {
          SoundManager.playSound("buttonClick");
          return { tutorialState };
        });
      },

      resetGuideIndex: () => {
        set(() => {
          return { guideIndex: 0 };
        });
      },

      incrementGuideIndex: () => {
        set((state) => {
          const newGuideIndex =
            state.guideIndex === state.guideLength - 1
              ? 0
              : state.guideIndex + 1;
          return { guideIndex: newGuideIndex };
        });
      },

      decrementGuideIndex: () => {
        set((state) => {
          const newGuideIndex =
            state.guideIndex === 0
              ? state.guideLength - 1
              : state.guideIndex - 1;
          return { guideIndex: newGuideIndex };
        });
      },
    };
  })
);
