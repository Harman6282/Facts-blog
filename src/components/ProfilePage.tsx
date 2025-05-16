"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FollowButton } from "./FollowButton";
import { formatToMonthYear } from "@/utils/formatToDateMonth";
import { CalendarRange } from "lucide-react";

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
  const router = useRouter();
  const { data: session } = useSession();
  const [initiallyFollowing, setInitiallyFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const currentUserId = session?.user?.id;

  const getUser = async () => {
    const res = await axios.get(`http://localhost:3000/api/user/${userId}`);
    setUser(res?.data?.user);
    console.log(res?.data?.user);
    setFollowersCount(res?.data?.user._count.followers);
  };

  const checkFollowStatus = async () => {
    if (!currentUserId || !userId) return;
    const res = await axios.get(`http://localhost:3000/api/follow/status`, {
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
    <div>Loading...</div>
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

      <Button
        className="bg-white text-black border border-black p-2 px-5 rounded cursor-pointer mt-5 hover:scale-105 hover:bg-gray-200 transform transition duration-300"
        onClick={() => {
          router.push("/create-blog");
        }}
      >
        Post Blog
      </Button>
    </div>
  );
};

export default ProfilePage;
