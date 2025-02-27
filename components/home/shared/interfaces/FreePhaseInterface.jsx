import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import routes from "@/constants/routes";
import { phases, useGame } from "@/hooks/useGame.jsx";
import { api } from "@/lib/api";

const IconButton = ({
  onClick,
  children,
  size = "size-8",
  textSize = "text-2xl lg:text-3xl",
}) => {
  return (
    <div
      className={`flex ${size} cursor-pointer items-center justify-center rounded-full bg-orange-500 transition-all duration-200 ease-in-out hover:bg-orange-600 lg:size-10 ${textSize}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default function FreePhaseInterface() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") setLoading(false);
  }, [status]);

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

  const router = useRouter();

  // Memoized callback to prevent unnecessary re-renders
  const handleEnterButtonClick = useCallback(() => {
    if (canChangePhase.condition && canChangePhase.phase !== "") {
      changePhase(canChangePhase.phase);
      setCanPressEnter(false);
      setCanChangePhase(false, "");
    } else {
      setCanPressEnter(false);
      router.push(routes.CURRICULUM);
    }
  }, [canChangePhase, changePhase, setCanChangePhase, setCanPressEnter]);

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

  return (
    <>
      <div className="absolute left-0 top-0 flex w-full justify-between p-2 font-bebas text-3xl text-white lg:text-4xl">
        <div className="flex gap-4">
          <IconButton onClick={toggleMusic} textSize="text-3cl lg:text-4xl">
            {isMusicMuted ? <MdMusicOff /> : <MdMusicNote />}
          </IconButton>
          <IconButton onClick={() => changePhase(phases.TUTORIAL)}>
            <FaQuestion />
          </IconButton>
          <IconButton onClick={() => changePhase(phases.AVATAR_CUSTOMIZATION)}>
            <GiClothes />
          </IconButton>
        </div>

        {loading ? (
          <LoadingSpinner size={30} />
        ) : session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger onFocus={(e) => e.target.blur()}>
              <Avatar className="size-10 sm:size-12">
                <Image
                  src={`/images/avatar/profile.png`}
                  alt={session?.user?.name}
                  width={200}
                  height={200}
                  quality={100}
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`${routes.PROFILE}/${session?.user?.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer">
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={routes.SIGN_IN}>
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
