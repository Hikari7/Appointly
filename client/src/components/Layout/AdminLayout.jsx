import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
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

export default AdminLayout;

// import React from "react";

// const AdminLayout = () => {
//   return (
//     <div>
//       {/* //adminじゃなったらBookingに返す */}
//       {/*  useEffect(() => {
//     const checkAuth = async () => {
//       const isAuth = await authUtils.isAuthenticated();
//       if (isAuth) {
//         navigate("/");
//       }
//     };
//     checkAuth();
//   }, [navigate]); */}

//     </div>
//   );
// };

// export default AdminLayout;
