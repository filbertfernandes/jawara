import multiavatar from "@multiavatar/multiavatar/esm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

import LanguageSelector from "./LanguageSelector";

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
import { toast } from "@/hooks/use-toast";
import { phases, useGame } from "@/hooks/useGame.jsx";
import {
  acceptFriendRequest,
  getFriendRequest,
  rejectFriendRequest,
} from "@/lib/actions/friend.action";

export const IconButton = ({
  onClick,
  children,
  size = "size-8",
  textSize = "text-2xl lg:text-3xl",
}) => {
  return (
    <div
      className={`flex ${size} cursor-pointer items-center justify-center rounded-full bg-orange-500 transition-all duration-300 ease-in-out hover:bg-orange-600 lg:size-10 ${textSize}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default function FreePhaseInterface() {
  const t = useTranslations("Home");

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestsOverlay, setFriendRequestsOverlay] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (session?.user?.id) {
      const checkFriendRequest = async () => {
        const result = await getFriendRequest(session.user.id);

        setFriendRequests(result.friendRequests);
      };

      checkFriendRequest();
    }
  }, [session?.user?.id]);

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

  const handleFriendRequestButtonClick = async (request, isAccept) => {
    try {
      const result = isAccept
        ? await acceptFriendRequest(request._id)
        : await rejectFriendRequest(request._id);

      if (result?.success) {
        // Refresh the friend requests list
        if (session?.user?.id) {
          const updatedRequests = await getFriendRequest(session.user.id);
          setFriendRequests(updatedRequests.friendRequests);
        }

        toast({
          title: `Friend Request ${isAccept ? "Accepted" : "Rejected"}`,
          description: `You've ${
            isAccept ? "accepted" : "rejected"
          } a friend request from ${request.sender.name}.`,
        });
      } else {
        toast({
          title: `Error ${result?.status || "Unknown"}`,
          description:
            result?.error?.message ||
            `Failed to ${
              isAccept ? "accept" : "reject"
            } friend request. Please try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.message ||
          `Failed to ${
            isAccept ? "accept" : "reject"
          } friend request. Please try again.`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        setFriendRequestsOverlay(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {friendRequestsOverlay && (
        <div className="fixed left-0 top-0 flex size-full items-center justify-center">
          <div
            className={`relative flex h-1/2 w-[90%] flex-col items-center gap-4 overflow-scroll bg-gradient-to-r from-orange-500 to-orange-700 px-4 py-8 shadow-xl sm:w-1/2 sm:gap-6 lg:h-3/4 lg:w-1/3 ${
              friendRequestsOverlay ? "animate-bounceIn" : "opacity-0"
            }`}
          >
            <button
              className="absolute right-0 top-0 cursor-pointer rounded-full p-1 text-3xl text-gray-100 transition-all duration-300 ease-in-out hover:text-gray-300 sm:text-4xl"
              onClick={() => setFriendRequestsOverlay(false)}
            >
              <IoMdCloseCircle />
            </button>
            <h5 className="h3-bold text-gray-100">{t("friend_requests")}</h5>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {friendRequests?.length === 0 ? (
                <p className="text-center text-lg text-gray-100">
                  {t("no_friend_requests")}
                </p>
              ) : (
                friendRequests?.map((request) => (
                  <div
                    key={request.sender._id}
                    className="flex items-center rounded-xl bg-gray-100 p-4 text-gray-100 shadow-md"
                  >
                    {/* Avatar */}
                    <div
                      className="size-20"
                      dangerouslySetInnerHTML={{
                        __html: multiavatar(1),
                      }}
                    />
                    {/* Info and Actions */}
                    <div className="ml-4 flex flex-col">
                      <p className="font-bold text-gray-900">
                        {request.sender.name}
                      </p>
                      <p className="text-gray-600">
                        @{request.sender.username}
                      </p>
                      {/* Actions */}
                      <div className="mt-2 flex gap-2">
                        <button
                          className="btn-template bg-green-500 px-3 py-1 text-gray-100 shadow hover:bg-green-600"
                          onClick={() =>
                            handleFriendRequestButtonClick(request, true)
                          }
                        >
                          {t("accept")}
                        </button>
                        <button
                          className="btn-template bg-red-500 px-3 py-1 text-gray-100 shadow hover:bg-red-600"
                          onClick={() =>
                            handleFriendRequestButtonClick(request, false)
                          }
                        >
                          {t("reject")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="absolute left-0 top-0 flex w-full justify-between p-2 font-bebas text-3xl text-gray-100 lg:text-4xl">
        <div className="flex items-center gap-4">
          <IconButton onClick={toggleMusic} textSize="text-3cl lg:text-4xl">
            {isMusicMuted ? <MdMusicOff /> : <MdMusicNote />}
          </IconButton>
          <IconButton onClick={() => changePhase(phases.TUTORIAL)}>
            <FaQuestion />
          </IconButton>
          <IconButton onClick={() => changePhase(phases.AVATAR_CUSTOMIZATION)}>
            <GiClothes />
          </IconButton>
          <LanguageSelector />
        </div>

        {loading ? (
          <LoadingSpinner size={30} />
        ) : session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger onFocus={(e) => e.target.blur()}>
              <div
                className="size-12"
                dangerouslySetInnerHTML={{
                  __html: multiavatar(session.user.id),
                }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`${routes.PROFILE}/${session?.user?.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  {t("profile")}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer">
                {t("edit_profile")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setFriendRequestsOverlay(true)}
              >
                {t("friend_requests")}
                {friendRequests?.length > 0 && (
                  <span className="rounded-full bg-red-500 px-2 text-sm text-gray-100">
                    {friendRequests?.length}
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleSignOut}
              >
                {t("sign_out")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={routes.SIGN_IN}>
            <div>{t("sign_in")}</div>
          </Link>
        )}
      </div>

      <div
        className={`absolute bottom-0 left-0 mb-2 flex w-full justify-center p-1 font-bebas text-3xl text-gray-100 lg:text-4xl ${
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
