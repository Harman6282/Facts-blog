"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
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

const Page = ({ params }: { params: { userId: string } }) => {
  const { status } = useSession();
  const [user, setUser] = useState<userData>();
  const router = useRouter();

  const getUser = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/user/${params.userId}`
    );
    console.log(res.data.user);
    setUser(res?.data?.user);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else {
      getUser();
    }
  }, [status, router]);

  if (!user) {
    return <div>Loading...</div>; // optional loader
  }

  console.log(user);

  return (
    user && (
      <div className="flex flex-col items-start w-full p-6  text-xl">
        <div className="">
          <Image
            className="rounded-full "
            src={user?.image || ""}
            alt="Image"
            width={50}
            height={50}
          />

          <div className="">
            <p className="">Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
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
    )
  );
};

export default Page;
