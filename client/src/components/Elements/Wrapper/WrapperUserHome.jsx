import React from "react";
import SideWrapper from "./SideWrapper";

const WrapperUserHome = ({ children }) => {
  return (
    <>
      <div className="md:flex">
        <div className="hidden md:block md:h-screen">
          <SideWrapper />
        </div>
        <div className="my-14 mx-auto w-5/6 h-screen">{children}</div>
      </div>
    </>
  );
};

export default WrapperUserHome;
