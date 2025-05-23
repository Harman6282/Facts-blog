"use client";
import Image from "next/image";
import { FollowButton } from "../FollowButton";
import { useSession } from "next-auth/react";

const SuggentionCard = ({
  name,
  image,
  id,
  bio,
}: {
  name: string;
  image: string;
  bio: string;
  id: string;
}) => {

  const session = useSession();
  const userId = session?.data?.user?.id;

  return (
    <div className="flex items-center justify-between p-4 border-l border-y-0 w-full max-w-md bg-white">
      <div className="flex items-center gap-3">
        <Image
          src={image || ""}
          alt="Profile"
          className=" rounded-full"
          width={35}
          height={35}
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500 line-clamp-1">{bio || ""}</p>
        </div>
      </div>
      <FollowButton
        initiallyFollowing={false}
        targetUserId={id}
        currentUserId={userId as string}
      />
    </div>
  );
};

export default SuggentionCard;
