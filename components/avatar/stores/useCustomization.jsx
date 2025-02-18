import { MeshStandardMaterial } from "three";
import { randInt } from "three/src/math/MathUtils.js";
import { create } from "zustand";

import { customizationAssets } from "./customizationAssets";
import { customizationGroups } from "./customizationGroups";
import { customizationPalettes } from "./customizationPalettes";

export const useCustomization = create((set, get) => ({
  categories: [],
  currentCategory: null,
  assets: [],
  skin: new MeshStandardMaterial({
    color: 0xe1b899,
    roughness: 1,
  }),
  customization: {},
  download: () => {},

  setDownload: (download) => set({ download }),

  updateColor: (color) => {
    set((state) => ({
      customization: {
        ...state.customization,
        [state.currentCategory.name]: {
          ...state.customization[state.currentCategory.name],
          color,
        },
      },
    }));
    if (get().currentCategory.name === "Head") {
      get().updateSkin(color);
    }
  },

  updateSkin: (color) => {
    get().skin.color.set(color);
  },

  fetchCategories: () => {
    const categories = customizationGroups;
    const assets = customizationAssets;
    const colorPalettes = customizationPalettes;
    const customization = {};

    categories.forEach((category) => {
      category.assets = assets.filter((asset) => asset.groupId === category.id);

      if (category.colorPaletteName) {
        category.colorPalette = colorPalettes.find(
          (colorPalette) => colorPalette.name === category.colorPaletteName
        );
      }

      customization[category.name] = {
        color: category.colorPalette?.colors?.[0] || "",
      };

      if (category.startingAsset) {
        customization[category.name].asset = category.assets.find(
          (asset) => asset.name === category.startingAsset
        );
      }
    });

    set({ categories, currentCategory: categories[0], assets, customization });
  },

  setCurrentCategory: (category) => set({ currentCategory: category }),

  changeAsset: (category, asset) =>
    set((state) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset,
        },
      },
    })),

  randomize: () => {
    const customization = {};
    get().categories.forEach((category) => {
      let randomAsset = category.assets[randInt(0, category.assets.length - 1)];
      if (category.removable) {
        if (randInt(0, category.assets.length - 1) === 0) {
          randomAsset = null;
        }
      }
      const randomColor =
        category.colorPalette?.colors?.[
          randInt(0, category.colorPalette.colors.length - 1)
        ];
      customization[category.name] = {
        asset: randomAsset,
        color: randomColor,
      };
      if (category.name === "Head") {
        get().updateSkin(randomColor);
      }
    });
    set({ customization });
  },
}));
