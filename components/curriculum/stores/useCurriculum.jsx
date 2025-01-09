import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useCurriculum = create(
  subscribeWithSelector((set) => {
    return {
      phase: "Pretest",

      changePhase: (phase) => {
        set(() => {
          return { phase };
        });
      },
    };
  })
);
