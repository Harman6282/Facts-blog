import React from "react";
import Articles from "./Articles";
import UsersSuggestions from "../whoToFollow/UsersSuggestions";

const HomePage = () => {
  return (
    <div className="w-full flex  mx-auto xl:w-[90%]">
      <Articles />
      <div className="hidden lg:block w-1/3">
        <UsersSuggestions />
      </div>
    </div>
  );
};

export default HomePage;
