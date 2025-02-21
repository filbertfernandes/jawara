import { MeshStandardMaterial } from "three";
import { randInt } from "three/src/math/MathUtils.js";
import { create } from "zustand";

import { cameraPlacements } from "./cameraPlacements";
import { customizationAssets } from "./customizationAssets";
import { customizationGroups } from "./customizationGroups";
import { customizationPalettes } from "./customizationPalettes";

export const useCustomization = create((set, get) => ({
  categories: [],
  currentCategory: null,
  assets: [],
  lockedGroups: {},
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

  fetchCategories: (categories) => {
    const assets = customizationAssets;
    const customization = {};

    categories.forEach((category) => {
      category.assets = assets.filter((asset) => asset.groupId === category.id);

      if (category.colorPaletteName) {
        category.colorPalette = customizationPalettes.find(
          (colorPalette) => colorPalette.name === category.colorPaletteName
        );
      }

      if (category.cameraPlacementName) {
        category.cameraPlacement = cameraPlacements.find(
          (cameraPlacement) =>
            cameraPlacement.name === category.cameraPlacementName
        );
      }

      customization[category.name] = {
        color:
          category.colorPalette?.colors?.[category.startingColorIndex || 0] ||
          "",
      };

      if (category.name === "Head") {
        get().updateSkin(
          category.colorPalette?.colors?.[category.startingColorIndex]
        );
      }

      if (category.startingAsset) {
        customization[category.name].asset = category.assets.find(
          (asset) => asset.name === category.startingAsset
        );
      }
    });

    set({ categories, currentCategory: categories[0], assets, customization });
    get().applyLockedAssets();
  },

  setCurrentCategory: (category) => set({ currentCategory: category }),

  changeAsset: (category, asset) => {
    set((state) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset,
        },
      },
    }));
    get().applyLockedAssets();
  },

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
    get().applyLockedAssets();
  },

  applyLockedAssets: () => {
    const customization = get().customization;
    const categories = get().categories;
    const lockedGroups = {};

    Object.values(customization).forEach((category) => {
      if (category.asset?.lockedGroups) {
        category.asset.lockedGroups.forEach((group) => {
          const categoryName = categories.find(
            (category) => category.id === group
          ).name;
          if (!lockedGroups[categoryName]) {
            lockedGroups[categoryName] = [];
          }
          const lockingAssetCategoryName = categories.find(
            (cat) => cat.id === category.asset.groupId
          ).name;
          lockedGroups[categoryName].push({
            name: category.asset.name,
            categoryName: lockingAssetCategoryName,
          });
        });
      }
    });

    set({ lockedGroups });
  },
}));
