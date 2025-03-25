import multiavatar from "@multiavatar/multiavatar/esm";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaCheck, FaUserPlus, FaUsers } from "react-icons/fa";

import { toast } from "@/hooks/use-toast";
import {
  addFriendRequest,
  getFriendStatus,
} from "@/lib/actions/friendRequest.action";

const UserProfile = ({ profileUser }) => {
  const { data: session } = useSession();
  const [isFriend, setIsFriend] = useState(false);
  const [isFriendRequest, setIsFriendRequest] = useState(false);
  const [isRequestReceiver, setIsRequestReceiver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id && profileUser?._id) {
      const checkFriendStatus = async () => {
        const status = await getFriendStatus(session.user.id, profileUser._id);
        setIsFriend(status.isFriend);
        setIsFriendRequest(status.isFriendRequest);
        setIsRequestReceiver(status.isRequestReceiver);
      };
      checkFriendStatus();
    }
  }, [session, profileUser]);

  const handleFriendButtonClick = async () => {
    if (isLoading || isFriend || isFriendRequest) return;
    setIsLoading(true);
    try {
      const result = await addFriendRequest(
        session?.user?.id,
        profileUser?._id
      );
      if (result?.success) {
        setIsFriendRequest(true);
        toast({
          title: "Friend Request Sent",
          description: "Your friend request has been sent successfully!",
        });
      } else {
        toast({
          title: `Error ${result?.status || "Unknown"}`,
          description:
            result?.error?.message ||
            "Failed to send friend request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.message || "Failed to send friend request. Please try again.",
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
            <p>1000 Friends</p>
            <FaUsers className="ml-2 text-xl" />
          </div>
          {session?.user?.id !== profileUser?._id && (
            <div
              onClick={handleFriendButtonClick}
              className={`btn-template w-4/5 ${
                isFriend
                  ? "cursor-default bg-green-500 hover:bg-green-600"
                  : isFriendRequest
                  ? "cursor-default bg-gray-500 hover:bg-gray-600"
                  : "cursor-pointer bg-orange-500 hover:bg-orange-600"
              } lg:w-2/5`}
            >
              <p>
                {isFriend
                  ? "Friend"
                  : isFriendRequest
                  ? isRequestReceiver
                    ? "Accept Request"
                    : "Request Sent"
                  : isLoading
                  ? "Sending..."
                  : "Add Friend"}
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
