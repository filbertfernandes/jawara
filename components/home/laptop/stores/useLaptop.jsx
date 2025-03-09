import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useLaptop = create(
  subscribeWithSelector((set) => {
    return {
      isOpened: false,
      screenRotation: 1.4,
      search: "",

      setScreenRotation: (screenRotation) => {
        set(() => {
          return { screenRotation };
        });
      },

      setSearch: (search) => {
        set(() => {
          return { search };
        });
      },
    };
  })
);
