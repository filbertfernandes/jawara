import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

import { useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function FreePhaseInterface() {
  const { data } = useSession();

  console.log(data);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);

      toast({
        title: "Sign-out Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occured during sign-out",
        variant: "destructive",
      });
    }
  };

  const {
    changePhase,
    canChangePhase,
    setCanChangePhase,
    canPressEnter,
    setCanPressEnter,
    toggleMusic,
    isMusicMuted,
  } = useGame((state) => ({
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
      <div className="absolute left-0 top-0 flex w-full justify-between px-2 pt-1 font-bebas text-3xl text-white lg:text-4xl">
        <div
          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 transition-all duration-200 ease-in-out hover:bg-orange-600 lg:size-12"
          onClick={toggleMusic}
        >
          {isMusicMuted ? <MdMusicOff /> : <MdMusicNote />}
        </div>

        {data !== null ? (
          <div onClick={handleSignOut} className="cursor-pointer">
            Sign Out
          </div>
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
