import React from "react";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto mb-20 pt-10">{children}</div>
  );
};

export default Wrapper;
