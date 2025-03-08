import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useLaptop = create(
  subscribeWithSelector((set) => {
    return {
      isOpened: false,
      screenRotation: 1.4,

      setScreenRotation: (screenRotation) => {
        set(() => {
          return { screenRotation };
        });
      },
    };
  })
);
