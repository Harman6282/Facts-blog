"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/");
  }

  return <div>Profile page</div>;
};

export default Page;
