"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center pb-40 xl:pb-50">
      <h1 className="text-2xl font-bold mb-4 mt-10">Sign In</h1>
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
