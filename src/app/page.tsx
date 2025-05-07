"use client";

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
        <div className="mx-auto w-1/2">
          <p className="text-3xl font-bold"> Hello this is Home page</p>
          <div className=" w-full mt-28 ">
            <Image
              className="rounded-full "
              src={session?.user?.image || ""}
              alt="Image"
              width={50}
              height={50}
            />

            <div>
              <p>Name: {session?.user?.name}</p>
              <p>Email: {session?.user?.email}</p>
              <p>Image: {session?.user?.image}</p>
            </div>
          </div>

          <button
            className="bg-white text-black p-2 rounded cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          className="bg-white text-black p-2 rounded cursor-pointer"
          onClick={handleSignIn}
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Home;
