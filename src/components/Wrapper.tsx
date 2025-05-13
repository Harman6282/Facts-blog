
import React from "react";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto">{children}</div>
  );
};

export default Wrapper;
