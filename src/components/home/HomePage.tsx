"use client";

import React, { Suspense } from "react";
import Articles from "./Articles";
import UsersSuggestions from "../whoToFollow/UsersSuggestions";
import ArticlesShimmer from "../shimmer/ArticlesShimmer";

const HomePage = () => {
  return (
    <div className="w-full flex  mx-auto xl:w-[90%]">
      <Suspense fallback={<ArticlesShimmer />}>
        <Articles />
      </Suspense>
      <div className="hidden lg:block w-1/3">
        <UsersSuggestions />
      </div>
    </div>
  );
};

export default HomePage;
