import React from "react";
import SideMenu from "../../User/SideMenu";
import { Outlet } from "react-router";

const UserHomeWrapper = () => {
  return (
    <>
      <div className="">
        {/* <div className="md:flex h-full"> */}

        <div className="pb-8 md:pb-0 md:flex h-[97vh] ">
          <div className="hidden md:block ">
            <SideMenu />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHomeWrapper;
