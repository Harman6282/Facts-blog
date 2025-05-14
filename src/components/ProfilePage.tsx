"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type userData = {
  id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  follower: [];
  following: [];
};

const ProfilePage = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<userData>();
  const router = useRouter();
  const { data: session } = useSession();

  const getUser = async () => {
    const res = await axios.get(`http://localhost:3000/api/user/${userId}`);
    setUser(res?.data?.user);
    console.log(res?.data?.user);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const toggleFollow = async (targetUserId: string, currentUserId: string) => {
    const res = await axios.post("http://localhost:3000/api/follow", {
      currentUserId,
      targetUserId,
    });

    toast.success(res.data.message);
    console.log(res.data);
  };

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

          <div className="flex">
            <p className="text-2xl font-semibold">{user?.name}</p>
            <Button
              className="ml-4 rounded-4xl cursor-pointer"
              onClick={() =>
                toggleFollow(user?.id, session?.user?.id as string)
              }
            >
              Follow
            </Button>
          </div>
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
