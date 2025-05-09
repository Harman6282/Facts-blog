"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Home = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(false);

  console.log(session);

  const handleSignIn = () => {
    setLoading(true);
    signIn("google");
    setLoading(false);
  };

  const handleSignOut = () => {
    setLoading(true);
    signOut();
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : session ? (
        <div className="mx-auto w-8/12 text-xl">
          <p className="text-3xl font-bold">Home page</p>
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

          <button
            className="bg-white text-black border border-black p-2 px-5 rounded cursor-pointer mt-5 hover:scale-105 hover:bg-gray-200 transform transition duration-300"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      ) : (
        <Button
          className="bg-white text-black border border-black p-2 rounded cursor-pointer mt-5"
          onClick={handleSignIn}
        >
          Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default Home;
