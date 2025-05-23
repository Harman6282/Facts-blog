"use client";

import React, { Suspense } from "react";
import Articles from "./Articles";
import UsersSuggestions from "../whoToFollow/UsersSuggestions";
import ArticlesShimmer from "../shimmer/ArticlesShimmer";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex  mx-auto xl:w-[90%]">
      <Suspense fallback={<ArticlesShimmer />}>
        <Articles />
      </Suspense>
      {session && (
        <div className="hidden lg:block w-1/3">
          <UsersSuggestions />
        </div>
      )}
    </div>
  );
};

export default HomePage;
