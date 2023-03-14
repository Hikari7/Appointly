import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      {/* <div className="md:hidden">
        <HamburgerMenu>
          <Outlet />
        </HamburgerMenu>
      </div> */}
      {/* <div className="hidden md:block"> */}
      <div>
        {/* <SideNav> */}
        <Outlet />
        {/* </SideNav> */}
      </div>
    </>
  );
};

export default UserLayout;
