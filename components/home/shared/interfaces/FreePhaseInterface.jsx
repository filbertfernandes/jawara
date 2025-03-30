import multiavatar from "@multiavatar/multiavatar/esm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

import EditProfileCard from "./EditProfileCard";
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
import { getUser } from "@/lib/actions/user.action";
import { SoundManager } from "@/lib/SoundManager";

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

  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestsOverlay, setFriendRequestsOverlay] = useState(false);
  const [editProfileOverlay, setEditProfileOverlay] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchUser = async () => {
        try {
          const result = await getUser(session.user.id);
          if (result.success) {
            setUser(result.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      const checkFriendRequest = async () => {
        const result = await getFriendRequest(session.user.id);
        setFriendRequests(result.friendRequests);
      };

      fetchUser();
      checkFriendRequest();
    }
  }, [session]);

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
        setEditProfileOverlay(false);
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
      {editProfileOverlay && (
        <EditProfileCard
          onClose={() => setEditProfileOverlay(false)}
          isVisible={editProfileOverlay}
          user={user}
          setUser={(data) => setUser(data)}
        />
      )}

      {friendRequestsOverlay && (
        <div className="fixed left-0 top-0 z-10 flex size-full flex-col items-center justify-center gap-6 bg-black/25 bg-repeat pt-8 font-questrial">
          <div
            className={`relative flex h-[500px] w-[400px] flex-col items-center gap-4 overflow-scroll rounded-2xl bg-white px-4 py-8 shadow-xl ${
              friendRequestsOverlay ? "animate-bounceIn" : "opacity-0"
            }`}
          >
            <button
              className="absolute right-0 top-0 cursor-pointer rounded-full p-1 text-3xl text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-700 sm:text-4xl"
              onClick={() => setFriendRequestsOverlay(false)}
            >
              <IoMdCloseCircle />
            </button>
            <h5 className="h3-bold text-gray-900">{t("friend_requests")}</h5>
            <div className="flex w-full flex-wrap justify-center gap-4 sm:gap-6">
              {friendRequests?.length === 0 ? (
                <p className="text-center text-lg text-gray-100">
                  {t("no_friend_requests")}
                </p>
              ) : (
                friendRequests?.map((request) => (
                  <div
                    key={request.sender._id}
                    className="flex w-full items-center justify-between rounded-xl bg-gray-100 p-4 text-gray-100 shadow-md"
                  >
                    {/* Avatar */}
                    <div
                      className="flex size-12"
                      dangerouslySetInnerHTML={{
                        __html: multiavatar(
                          request.sender._id + request.sender.profileAvatarIndex
                        ),
                      }}
                    />
                    {/* Info */}
                    <div className="flex w-4/5 flex-col items-start px-4">
                      <p className="font-bold text-gray-900">
                        {request.sender.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        @{request.sender.username}
                      </p>
                    </div>
                    {/* Actions */}
                    <div className="flex w-1/5 justify-center gap-4">
                      <button
                        className="text-2xl text-green-500 hover:text-green-600"
                        onClick={() =>
                          handleFriendRequestButtonClick(request, true)
                        }
                      >
                        <IoMdCheckmarkCircle />
                      </button>
                      <button
                        className="text-2xl text-red-500 hover:text-red-600"
                        onClick={() =>
                          handleFriendRequestButtonClick(request, false)
                        }
                      >
                        <IoMdCloseCircle />
                      </button>
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
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger onFocus={(e) => e.target.blur()}>
              <div
                className="size-12"
                dangerouslySetInnerHTML={{
                  __html: multiavatar(user._id + user.profileAvatarIndex),
                }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`${routes.PROFILE}/${user._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  {t("profile")}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  SoundManager.playSound("buttonClick");
                  setEditProfileOverlay(true);
                }}
              >
                {t("edit_profile")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  SoundManager.playSound("buttonClick");
                  setFriendRequestsOverlay(true);
                }}
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
