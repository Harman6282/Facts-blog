"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FollowButton } from "./FollowButton";
import { formatToMonthYear } from "@/utils/formatToDateMonth";
import { CalendarRange } from "lucide-react";
import ShimmerProfile from "./shimmer/ShimmerProfile";

type userData = {
  id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  follower: [];
  following: [];
  _count: {
    followers: number;
    following: number;
  };
  createdAt: Date;
};

const ProfilePage = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<userData>();
  const { data: session } = useSession();
  const [initiallyFollowing, setInitiallyFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const currentUserId = session?.user?.id;

  const getUser = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`);
    setUser(res?.data?.user);
    console.log(res?.data?.user);
    setFollowersCount(res?.data?.user._count.followers);
  };

  const checkFollowStatus = async () => {
    if (!currentUserId || !userId) return;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/follow/status`, {
      params: {
        currentUserId,
        targetUserId: userId,
      },
    });
    setInitiallyFollowing(res.data.isFollowing);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    if (currentUserId && userId) {
      checkFollowStatus();
    }
  }, [currentUserId, userId]);

  const joinedDate = formatToMonthYear(new Date(user?.createdAt as Date));

  return !user ? (
    <ShimmerProfile />
  ) : (
    <div className="w-full md:w-3/4 xl:h-2/3 mt-6 mx-auto p-6  text-xl">
      <div className="">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full "
            src={user?.image || ""}
            alt="Image"
            width={50}
            height={50}
          />

          <div className="flex justify-between w-full">
            <p className="text-2xl font-semibold">{user?.name}</p>

            {currentUserId !== userId && (
              <FollowButton
                currentUserId={currentUserId as string}
                targetUserId={userId}
                initiallyFollowing={initiallyFollowing}
                setFollowersCount={setFollowersCount}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 text-base">
          <p className="  pl-15 font-bold "> {followersCount} <span className="text-gray-700 font-normal">Followers</span></p>
           <p className="text-gray-700 flex items-center pl-8 gap-2"> <CalendarRange size={20} /> Joined {joinedDate}</p>
        </div>
        <p className="text-gray-700 pt-5">{user?.bio}</p>
      </div>

      
    </div>
  );
};

export default ProfilePage;
