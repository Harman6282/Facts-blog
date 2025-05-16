import axios from "axios";
import { Heart } from "lucide-react";
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
  initiallyLiked: boolean
}) => {
  const [isLiked, setIsLiked] = useState(initiallyLiked);

  const toggleLike = async () => {
    const res = await axios.post("http://localhost:3000/api/likeBlog", {
      userId,
      blogId,
    });

    console.log(res.data);
    toast.success(res?.data?.message);
    setIsLiked((prev) => !prev);
  };

  return (
    <>
      <p className="flex items-center gap-1 ">
        {" "}
        {isLiked ? (
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
        {likeCount || 0}
      </p>
    </>
  );
};

export default LikeButton;
