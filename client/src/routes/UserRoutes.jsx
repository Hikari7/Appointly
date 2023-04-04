import { lazy, useState  } from "react";
import UserLayout from "../components/Layout/UserLayout";
import UserBooking from "../pages/User/UserBooking";
import UserProtectCheck from "./UserProtectedCheck";
import { Navigate } from "react-router";

// import AdminProtectCheck from "../routes/AdminProtectedCheck";
const MyPage = lazy(() => import("../pages/User/MyPage"));
const Availability = lazy(() => import("../pages/User/Availability"));
const Settings = lazy(() => import("../pages/User/Settings"));

export const UserRoutes = (user) => {

  return [
    {
      // path: "/",
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "/", element: user? <Navigate to={`${user.userId}/mypage`} />: <Navigate to={"/"} /> },
        { path: ":uid/mypage", element: <MyPage /> },
        { path: ":uid/availability", element: <Availability /> },
        { path: ":uid/settings", element: <Settings /> },
        // { path: "*", element: <UserBooking /> },
        // { path: "*", element: <UserProtectCheck /> },
      ],
    },
  ]
}

