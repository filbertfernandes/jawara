import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { GiExitDoor } from "react-icons/gi";

import { useCustomization } from "./stores/useCustomization";

import routes from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { phases, useGame } from "@/hooks/useGame";
import { createOrUpdateUserAvatar } from "@/lib/actions/userAvatar.action";

const AssetBox = () => {
  const {
    categories,
    currentCategory,
    setCurrentCategory,
    changeAsset,
    customization,
    lockedGroups,
  } = useCustomization((state) => ({
    categories: state.categories,
    currentCategory: state.currentCategory,
    setCurrentCategory: state.setCurrentCategory,
    changeAsset: state.changeAsset,
    customization: state.customization,
    lockedGroups: state.lockedGroups,
  }));

  return (
    <div className="flex flex-col gap-6 rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 p-6 drop-shadow-md">
      <div className="pointer-events-auto flex items-center gap-8 overflow-x-auto px-6 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`shrink-0 border-b font-medium transition-colors duration-200 ${
              currentCategory.name === category.name
                ? "border-b-white text-white shadow-purple-100"
                : "border-b-transparent text-gray-200 hover:text-gray-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {lockedGroups[currentCategory?.name] && (
        <p className="px-6 text-red-400">
          Asset is hidden by{" "}
          {lockedGroups[currentCategory.name]
            .map((asset) => `${asset.name} (${asset.categoryName})`)
            .join(", ")}
        </p>
      )}
      <div className="flex gap-2 overflow-x-auto px-6">
        {currentCategory?.removable && (
          <button
            onClick={() => changeAsset(currentCategory.name, null)}
            className={`size-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr
              ${
                !customization[currentCategory.name].asset
                  ? "border-white from-white/20 to-white/30"
                  : "border-black from-black/70 to-black/20"
              }`}
          >
            <div className="flex size-full items-center justify-center bg-black/40 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        )}
        {currentCategory?.assets.map((asset) => (
          <button
            key={asset.name}
            onClick={() => changeAsset(currentCategory.name, asset)}
            className={`size-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300 bg-gradient-to-tr
              ${
                customization[currentCategory.name]?.asset?.name === asset.name
                  ? "border-white from-white/20 to-white/30"
                  : "border-black from-black/70 to-black/20"
              }`}
          >
            <Image
              src={asset.thumbnail}
              alt="Avatar Asset"
              width={200}
              height={200}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const SaveButton = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { customization } = useCustomization((state) => ({
    customization: state.customization,
  }));

  const save = async () => {
    const groupMapping = {
      Head: "1",
      Hair: "2",
      Eyes: "3",
      Eyebrows: "4",
      Nose: "5",
      "Facial Hair": "6",
      Glasses: "7",
      Hat: "8",
      Top: "9",
      Bottom: "10",
      Shoes: "11",
      Accessories: "12",
    };

    const transformedData = Object.entries(customization)
      .map(([key, value]) => {
        const groupId = groupMapping[key];
        if (!groupId) return null;

        const startingAsset = value.asset ? value.asset.name : undefined;
        const startingColorIndex =
          value.colorIndex !== null ? value.colorIndex : undefined;

        return {
          groupId,
          ...(startingAsset && { startingAsset }),
          ...(startingColorIndex !== undefined && { startingColorIndex }),
        };
      })
      .filter(Boolean); // Remove null entries

    try {
      const response = await createOrUpdateUserAvatar({
        userId,
        avatar: transformedData,
      });

      console.log("Avatar saved:", response.message);

      toast({
        title: "Success",
        description: response.message,
      });
    } catch (error) {
      console.error("Failed to save avatar:", error);

      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occured when saving your 3D Avatar, please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {userId ? (
        <button
          className="pointer-events-auto w-36 rounded-lg bg-orange-500 px-4 py-3 font-bold text-white drop-shadow-md transition-colors duration-300 hover:bg-orange-600"
          onClick={save}
        >
          Save
        </button>
      ) : (
        <Link href={routes.SIGN_IN}>
          <button className="pointer-events-auto w-36 rounded-lg bg-orange-500 px-4 py-3 font-bold text-white drop-shadow-md transition-colors duration-300 hover:bg-orange-600">
            Sign In to Save
          </button>
        </Link>
      )}
    </>
  );
};

const RandomizeButton = () => {
  const randomize = useCustomization((state) => state.randomize);
  return (
    <button
      className="pointer-events-auto rounded-lg bg-orange-500 px-4 py-3 font-medium text-white drop-shadow-md transition-colors duration-300 hover:bg-orange-600"
      onClick={randomize}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
    </button>
  );
};

const ColorPicker = () => {
  const { updateColor, currentCategory, customization } = useCustomization(
    (state) => ({
      updateColor: state.updateColor,
      currentCategory: state.currentCategory,
      customization: state.customization,
    })
  );

  const handleColorChange = (color, index) => {
    updateColor(color, index);
  };

  if (!customization[currentCategory.name]?.asset) {
    return null;
  }

  return (
    <div className="pointer-events-auto relative flex max-w-full gap-2 overflow-x-auto py-2 drop-shadow-md backdrop-blur-sm">
      {currentCategory.colorPalette?.colors.map((color, index) => (
        <button
          key={`${index}-${color}`}
          className={`w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2
             ${
               customization[currentCategory.name].color === color
                 ? "border-white"
                 : "border-transparent"
             }
          `}
          onClick={() => handleColorChange(color, index)}
        >
          <div
            className="size-full rounded-md"
            style={{ backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  );
};

const AvatarCustomizationInterface = () => {
  const currentCategory = useCustomization((state) => state.currentCategory);
  const customization = useCustomization((state) => state.customization);
  const changePhase = useGame((state) => state.changePhase);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        changePhase(phases.FREE);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <main className="pointer-events-none fixed inset-0 z-10 select-none font-questrial">
        <div className="mx-auto flex size-full max-w-screen-xl flex-col justify-between">
          <div className="flex items-center justify-between p-10">
            <GiExitDoor
              className="pointer-events-auto cursor-pointer text-3xl text-white transition-all duration-100 ease-in-out hover:text-gray-200 sm:text-4xl"
              onClick={() => {
                changePhase(phases.FREE);
              }}
            />
            <div className="flex items-center gap-2">
              <RandomizeButton />
              <SaveButton />
            </div>
          </div>
          <div className="flex flex-col px-10">
            {currentCategory?.colorPalette &&
              customization[currentCategory.name] && <ColorPicker />}
            <AssetBox />
          </div>
        </div>
      </main>
    </>
  );
};

export default AvatarCustomizationInterface;
