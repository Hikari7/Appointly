import React from "react";
import UserDesktopNav from "../Elements/Nav/DesktopNav";
import MobileNav from "../Elements/Nav/MobileNav";
import { Outlet } from "react-router";
import WrapperUserHome from "../Elements/Wrapper/WrapperUserHome";

const UserLayout = ({ children }) => {
  return (
    <>
      <div className="hidden md:block">
        <UserDesktopNav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <WrapperUserHome>
        <Outlet />
      </WrapperUserHome>
    </>
  );
};

export default UserLayout;
