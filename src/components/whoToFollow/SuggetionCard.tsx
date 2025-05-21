"use client";
import Image from "next/image";
import { FollowButton } from "../FollowButton";

const SuggentionCard = ({
  name,
  image,
  bio,
}: {
  name: string;
  image: string;
  bio: string;
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-l border-y-0 w-full max-w-md bg-white">
      <div className="flex items-center gap-3">
        <Image
          src={image || ""}
          alt="Profile"
          className="w-12 h-12 rounded-full"
          width={50}
          height={50}
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500 line-clamp-1">{bio || ""}</p>
        </div>
      </div>
      <FollowButton
        initiallyFollowing={false}
        targetUserId={""}
        currentUserId={""}
      />
    </div>
  );
};

export default SuggentionCard;
