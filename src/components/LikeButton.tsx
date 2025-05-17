import axios from "axios";
import { Heart, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const LikeButton = ({
  likeCount,
  userId,
  blogId,
  initiallyLiked,
}: {
  likeCount: number;
  userId: string;
  blogId: string;
  initiallyLiked: boolean;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(initiallyLiked);
  const [likesCount, setlikesCount] = useState<number>(likeCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleLike = async () => {
    setIsLoading(true);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/likeBlog`, {
      userId,
      blogId,
    });

    setIsLoading(false);
    console.log(res.data);
    toast.success(res?.data?.message);
    if (res.data.success) {
      setIsLiked((prev) => !prev);
      setlikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  };

  return (
    <>
      <p className="flex items-center gap-1 ">
        {isLoading ? (
          <span>
            <Loader2 className="animate-spin" />
          </span>
        ) : isLiked ? (
          <Heart
            onClick={toggleLike}
            size={18}
            className="cursor-pointer"
            stroke="red"
            fill="red"
          />
        ) : (
          <Heart onClick={toggleLike} size={18} className="cursor-pointer" />
        )}
        {likesCount || 0}
      </p>
    </>
  );
};

export default LikeButton;
