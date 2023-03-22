import React from "react";
import DesktopNav from "../Elements/Nav/DesktopNav";
import MobileNav from "../Elements/Nav/MobileNav";
import { Outlet } from "react-router";
import HomeWrapper from "../Elements/Wrapper/HomeWrapper";

const PublicLayout = ({ children }) => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <HomeWrapper>{children}</HomeWrapper>
    </>
  );
};

export default PublicLayout;
