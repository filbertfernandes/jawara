import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoMdAlert } from "react-icons/io";

import { useCustomization } from "./stores/useCustomization";
import BackButton from "../shared/interfaces/BackButton";

import routes from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { phases, useGame } from "@/hooks/useGame";
import { createOrUpdateUserAvatar } from "@/lib/actions/userAvatar.action";

const AssetBox = () => {
  const t = useTranslations("Home");

  const {
    categories,
    currentCategory,
    setCurrentCategory,
    changeAsset,
    customization,
  } = useCustomization((state) => ({
    categories: state.categories,
    currentCategory: state.currentCategory,
    setCurrentCategory: state.setCurrentCategory,
    changeAsset: state.changeAsset,
    customization: state.customization,
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
            {category[`${t("language")}_name`]}
          </button>
        ))}
      </div>
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
  const t = useTranslations("Home");

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { customization } = useCustomization((state) => ({
    customization: state.customization,
  }));

  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);

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

      setSaving(false);

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
          {saving ? `${t("saving")}.....` : t("save")}
        </button>
      ) : (
        <Link href={routes.SIGN_IN}>
          <button className="pointer-events-auto min-w-36 rounded-lg bg-orange-500 px-4 py-3 font-bold text-white drop-shadow-md transition-colors duration-300 hover:bg-orange-600">
            {t("sign_in_to_save")}
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
  const t = useTranslations("Home");

  const { data: session } = useSession();

  const currentCategory = useCustomization((state) => state.currentCategory);
  const customization = useCustomization((state) => state.customization);

  const { changePhase, customizationWarning, setCustomizationWarning } =
    useGame((state) => ({
      changePhase: state.changePhase,
      customizationWarning: state.customizationWarning,
      setCustomizationWarning: state.setCustomizationWarning,
    }));

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
      {customizationWarning && !session && (
        <div className="fullscreen-black-transparent z-20 items-center justify-center text-gray-900">
          <div className="flex h-auto min-h-56 w-[90%] flex-col justify-between rounded-xl bg-white px-2 py-4 text-center lg:h-72 lg:w-1/3 lg:px-4 lg:py-6 lg:text-lg">
            <div className="flex flex-col gap-4">
              <IoMdAlert className="w-full text-6xl text-orange-500 lg:text-7xl" />
              <div>{t("customization_warning")}</div>
            </div>
            <div className="flex w-full justify-between font-bold">
              <div
                className="w-1/2 cursor-pointer text-center hover:underline"
                onClick={() => setCustomizationWarning(false)}
              >
                {t("i_understand")}
              </div>
              <Link
                href={routes.SIGN_IN}
                className="w-1/2 text-center text-orange-500 hover:underline"
              >
                {t("sign_in")}
              </Link>
            </div>
          </div>
        </div>
      )}
      <main className="pointer-events-none fixed inset-0 z-10 select-none font-questrial">
        <div className="mx-auto flex size-full max-w-screen-xl flex-col justify-between">
          <div className="flex items-center justify-between p-10">
            <BackButton onClick={() => changePhase(phases.FREE)} />
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
