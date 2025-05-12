
import React from "react";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">{children}</div>
  );
};

export default Wrapper;
