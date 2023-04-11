import React from "react";
import UserDesktopNav from "../Elements/Nav/UserDesktopNav";
import MobileNav from "../Elements/Nav/MobileNav";
import { Outlet } from "react-router";
import UserHomeWrapper from "../Elements/Wrapper/UserHomeWrapper.jsx";

const UserLayout = () => {
  return (
    <>
      <div className="hidden md:block">
        <UserDesktopNav />
        <UserHomeWrapper>
          <Outlet />
        </UserHomeWrapper>
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default UserLayout;
