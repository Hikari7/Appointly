import React from "react";
import SideMenu from "../../User/SideMenu";
import { Outlet } from "react-router";

const UserHomeWrapper = () => {
  return (
    <>
      <div className="md:flex min-h-[97vh]">
        <div className="hidden md:block ">
          <SideMenu />
        </div>

        <div className=" ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserHomeWrapper;
