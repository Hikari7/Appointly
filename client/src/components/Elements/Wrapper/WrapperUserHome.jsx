import React from "react";
import SideWrapper from "./SideWrapper";

const WrapperUserHome = ({ children }) => {
  return (
    <>
      <div className="md:flex">
        <div className="hidden md:block" >
          <SideWrapper />
        </div>
        <div className="my-14 mx-auto w-5/6 "  >
          {children}
        </div>
      </div>
    </>
  );
};

export default WrapperUserHome;
