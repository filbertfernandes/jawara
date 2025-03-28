import multiavatar from "@multiavatar/multiavatar/esm";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaCheck, FaUserPlus, FaUsers } from "react-icons/fa";

import { toast } from "@/hooks/use-toast";
import {
  acceptFriendRequest,
  addFriendRequest,
  getFriendStatus,
  removeFriend,
  removeFriendRequest,
} from "@/lib/actions/friend.action";

const UserProfile = ({ profileUser }) => {
  const t = useTranslations("Profile");

  const { data: session } = useSession();

  const [friendRequestId, setFriendRequestId] = useState(false);
  const [friendsCount, setFriendsCount] = useState(
    profileUser?.friends?.length
  );
  const [isFriend, setIsFriend] = useState(false);
  const [isFriendRequest, setIsFriendRequest] = useState(false);
  const [isRequestReceiver, setIsRequestReceiver] = useState(false);
  const [isFriendButtonHovered, setIsFriendButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [friendActionTrigger, setFriendActionTrigger] = useState(false);

  useEffect(() => {
    if (session?.user?.id && profileUser?._id) {
      const checkFriendStatus = async () => {
        const result = await getFriendStatus(session.user.id, profileUser._id);
        setIsFriend(result.isFriend);
        setIsFriendRequest(result.isFriendRequest);
        setIsRequestReceiver(result.isRequestReceiver);
        setFriendRequestId(result.friendRequestId);
        setFriendsCount(result.friendsCount);
      };
      checkFriendStatus();
    }
  }, [session, profileUser, friendActionTrigger]);

  const handleFriendButtonClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isFriend) {
        const result = await removeFriend(session?.user?.id, profileUser?._id);
        if (result?.success) {
          toast({
            title: t("friend_removed"),
            description: t("no_longer_friends"),
          });
        } else {
          throw new Error(result?.error?.message || t("remove_friend_failed"));
        }
      } else if (isRequestReceiver) {
        const result = await acceptFriendRequest(friendRequestId);
        if (result?.success) {
          toast({
            title: t("request_accepted"),
            description: t("now_friends"),
          });
        } else {
          throw new Error(result?.error?.message || t("accept_request_failed"));
        }
      } else if (isFriendRequest) {
        const result = await removeFriendRequest(friendRequestId);
        if (result?.success) {
          toast({
            title: t("request_canceled"),
            description: t("request_has_been_canceled"),
          });
        } else {
          throw new Error(result?.error?.message || t("remove_request_failed"));
        }
      } else {
        const result = await addFriendRequest(
          session?.user?.id,
          profileUser?._id
        );
        if (result?.success) {
          toast({
            title: t("friend_request_sent"),
            description: t("request_sent_successfully"),
          });
        } else {
          throw new Error(result?.error?.message || t("send_request_failed"));
        }
      }

      setFriendActionTrigger((prev) => !prev);
    } catch (error) {
      toast({
        title: t("error"),
        description: error?.message || t("something_went_wrong"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-auto min-h-40 w-full items-center justify-center gap-4">
      <div
        className="flex size-36"
        dangerouslySetInnerHTML={{ __html: multiavatar(profileUser?._id) }}
      />
      <div className="flex w-full flex-col gap-6 lg:gap-10">
        <div>
          <h5 className="h5-bold">{profileUser?.name}</h5>
          <h5>@{profileUser?.username}</h5>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="btn-template w-4/5 bg-gray-800 hover:bg-gray-900 lg:w-2/5">
            <p>
              {friendsCount} {t("friends")}
            </p>
            <FaUsers className="ml-2 text-xl" />
          </div>
          {session?.user?.id !== profileUser?._id && (
            <div
              onMouseEnter={() => setIsFriendButtonHovered(true)}
              onMouseLeave={() => setIsFriendButtonHovered(false)}
              onClick={handleFriendButtonClick}
              className={`btn-template w-4/5 ${
                isFriend
                  ? "cursor-pointer bg-green-500 hover:bg-green-600"
                  : isFriendRequest
                  ? "cursor-default bg-gray-500 hover:bg-gray-600"
                  : "cursor-pointer bg-orange-500 hover:bg-orange-600"
              } lg:w-2/5`}
            >
              <p>
                {isFriend
                  ? isFriendButtonHovered
                    ? t("unfriend")
                    : t("friend")
                  : isFriendRequest
                  ? isRequestReceiver
                    ? t("accept_request")
                    : isFriendButtonHovered
                    ? t("cancel_request")
                    : t("request_sent")
                  : isLoading
                  ? t("sending")
                  : t("add_friend")}
              </p>
              {!isFriend && !isFriendRequest && !isLoading && (
                <FaUserPlus className="ml-2 text-xl" />
              )}
              {isFriendRequest && <FaCheck className="ml-2 text-xl" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
