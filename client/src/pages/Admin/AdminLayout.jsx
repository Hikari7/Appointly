import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      {/* <div className="hidden md:block"> */}
      <div>
        {/* <SideNav> */}
        <Outlet />
        {/* </SideNav> */}
      </div>
      {/* <div className="md:hidden">
        <HamburgerMenu>
          <Outlet />
        </HamburgerMenu>
      </div> */}
    </>
  );
};

export default AdminLayout;
