"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const HomePage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <div>
      {session && (
        <div className="mx-auto w-screen text-xl">
          <div className=" w-full mt-28 ">
            <Image
              className="rounded-full "
              src={session?.user?.image || ""}
              alt="Image"
              width={50}
              height={50}
            />

            <div>
              <p>Id: {session?.user?.id}</p>
              <p>Name: {session?.user?.name}</p>
              <p>Email: {session?.user?.email}</p>
              <p>Image: {session?.user?.image}</p>
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
      )}
    </div>
  );
};

export default HomePage;
