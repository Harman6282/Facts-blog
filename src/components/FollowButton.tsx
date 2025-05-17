// components/FollowButton.tsx

import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FollowButtonProps {
  currentUserId: string;
  targetUserId: string;
  initiallyFollowing: boolean;
  setFollowersCount: React.Dispatch<React.SetStateAction<number>>;
}

export const FollowButton = ({
  currentUserId,
  targetUserId,
  initiallyFollowing,
  setFollowersCount,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initiallyFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollowToggle = async () => {
    setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/follow`, {
        currentUserId,
        targetUserId,
      });

      if (res.data.success) {
        setIsFollowing((prev) => !prev);
      }

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error toggling follow:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleFollowToggle}
      disabled={loading}
      className={`rounded-3xl cursor-pointer border border-black`}
      variant={isFollowing ? "outline" : "default"}
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
};
