"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type userData = {
  id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
};

const ProfilePage = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<userData>();
  const router = useRouter();

  const getUser = async () => {
    const res = await axios.get(`http://localhost:3000/api/user/${userId}`);
    setUser(res?.data?.user);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return !user ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full md:w-3/4 xl:h-2/3 mt-6 mx-auto bg-amber-100 p-6  text-xl">
      <div className="flex items-start gap-4">
        <Image
          className="rounded-full "
          src={user?.image || ""}
          alt="Image"
          width={50}
          height={50}
        />

        <div className="">
          <p className="text-2xl font-semibold">{user?.name}</p>
          <p className="text-gray-700 pt-2">{user?.bio}</p>
        </div>
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
