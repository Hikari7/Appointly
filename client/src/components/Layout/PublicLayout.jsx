import React from "react";
import DesktopNav from "../Elements/Nav/DesktopNav";
import MobileNav from "../Elements/Nav/MobileNav";
import { Outlet } from "react-router";
import Wrapper from "../Elements/Wrapper/Wrapper";

const PublicLayout = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNav />
        <Wrapper>
          <Outlet />
        </Wrapper>
      </div>
      <div className="md:hidden">
        <MobileNav>
          <Wrapper>
            {/* <Outlet /> */}
            {/* {children} */}
          </Wrapper>
        </MobileNav>
      </div>
    </>
  );
};

export default PublicLayout;
