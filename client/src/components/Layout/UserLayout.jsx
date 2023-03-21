import React from "react";
import UserDesktopNav from "../Elements/Nav/DesktopNav";
import MobileNav from "../Elements/Nav/MobileNav";
import { Outlet } from "react-router";
import UserHomeWrapper from "../Elements/Wrapper/UserHomeWrapper.jsx";

const UserLayout = () => {
  return (
    <>
      <div className="hidden md:block">
        <UserDesktopNav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <UserHomeWrapper>
        <Outlet />
      </UserHomeWrapper>
    </>
  );
};

export default UserLayout;
