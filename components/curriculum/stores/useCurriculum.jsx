import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useCurriculum = create(
  subscribeWithSelector((set) => {
    return {
      phase: "Pretest",
      updatedUserProgress: null,

      changePhase: (phase) => {
        set(() => {
          return { phase };
        });
      },

      setUpdatedUserProgress: (updatedUserProgress) => {
        set(() => {
          return { updatedUserProgress };
        });
      },
    };
  })
);
