import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { SlSpeech } from "react-icons/sl";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { phases, useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function FreePhaseInterface() {
  const {
    user,
    changePhase,
    canChangePhase,
    setCanChangePhase,
    canPressEnter,
    setCanPressEnter,
    toggleMusic,
    isMusicMuted,
  } = useGame((state) => ({
    user: state.user,
    changePhase: state.changePhase,
    canChangePhase: state.canChangePhase,
    setCanChangePhase: state.setCanChangePhase,
    canPressEnter: state.canPressEnter,
    setCanPressEnter: state.setCanPressEnter,
    toggleMusic: state.toggleMusic,
    isMusicMuted: state.isMusicMuted,
  }));

  // Memoized callback to prevent unnecessary re-renders
  const handleEnterButtonClick = useCallback(() => {
    if (canChangePhase.condition && canChangePhase.phase !== "") {
      SoundManager.playSound("buttonClick");
      changePhase(canChangePhase.phase);
      setCanPressEnter(false);
      setCanChangePhase(false, "");
    }
  }, [canChangePhase, changePhase, setCanChangePhase, setCanPressEnter]);

  return (
    <>
      <div className="absolute left-0 top-0 flex w-full justify-between p-2 font-bebas text-3xl text-white lg:text-4xl">
        <div className="flex gap-4">
          <div
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 transition-all duration-200 ease-in-out hover:bg-orange-600 lg:size-12"
            onClick={toggleMusic}
          >
            {isMusicMuted ? <MdMusicOff /> : <MdMusicNote />}
          </div>
          <div
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-2xl transition-all duration-200 ease-in-out hover:bg-orange-600 lg:size-12 lg:text-3xl"
            onClick={() => {
              SoundManager.playSound("buttonClick");
              changePhase(phases.TRANSLATION);
            }}
          >
            <SlSpeech />
          </div>
        </div>

        {user ? (
          <Link href={`/profile/${user._id}`}>
            <Avatar className="size-10 sm:size-12">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.username}
                  width={50}
                  height={50}
                  quality={100}
                />
              ) : (
                <AvatarFallback className="border border-orange-500 bg-white font-sans text-2xl font-bold tracking-wider text-orange-500 sm:text-3xl">
                  {user.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
          </Link>
        ) : (
          <Link href="/sign-in">
            <div>Sign In</div>
          </Link>
        )}
      </div>
      <div
        className={`absolute bottom-0 left-0 mb-2 flex w-full justify-center p-1 font-bebas text-3xl text-white lg:text-4xl ${
          canPressEnter ? "" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="btn-template bg-orange-500 px-8 drop-shadow-lg hover:bg-orange-600"
          onClick={handleEnterButtonClick}
        >
          Enter
        </div>
      </div>
    </>
  );
}
