import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";

import { useGame } from "@/hooks/useGame.jsx";
import { SoundManager } from "@/lib/SoundManager.jsx";

export default function FreePhaseInterface() {
  const { data } = useSession();

  const handleSignOut = async (provider) => {
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
  } = useGame((state) => ({
    changePhase: state.changePhase,
    canChangePhase: state.canChangePhase,
    setCanChangePhase: state.setCanChangePhase,
    canPressEnter: state.canPressEnter,
    setCanPressEnter: state.setCanPressEnter,
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
      <div className="absolute left-0 top-0 mb-2 flex w-full justify-end py-2 pe-4 font-questrial text-lg text-white lg:text-xl">
        {data !== null ? (
          <div
            className="btn-template border border-orange-800 bg-orange-500 px-2 drop-shadow-lg"
            onClick={handleSignOut}
          >
            Sign Out
          </div>
        ) : (
          <Link href="/sign-in">
            <div className="btn-template border border-orange-800 bg-orange-500 px-2 drop-shadow-lg">
              Sign In
            </div>
          </Link>
        )}
      </div>
      <div
        className={`absolute bottom-0 left-0 mb-2 flex w-full justify-center p-1 font-bebas text-3xl text-white lg:text-4xl ${
          canPressEnter ? "" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="btn-template border border-orange-800 bg-orange-500 px-8 drop-shadow-lg"
          onClick={handleEnterButtonClick}
        >
          Enter
        </div>
      </div>
    </>
  );
}
