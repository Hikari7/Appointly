import { lazy } from "react";
import UserLayout from "../components/Layout/UserLayout";
import { Navigate } from "react-router";

const MyPage = lazy(() => import("../pages/User/MyPage"));
const Availability = lazy(() => import("../pages/User/Availability"));
const Settings = lazy(() => import("../pages/User/Settings"));

export const UserRoutes = (user) => {
  return [
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: user ? (
            <Navigate to={`${user.userId}/mypage`} />
          ) : (
            <Navigate to={"/"} />
          ),
        },
        { path: ":uid/mypage", element: <MyPage /> },
        { path: ":uid/availability", element: <Availability /> },
        { path: ":uid/settings", element: <Settings /> },
        // { path: "*", element: <UserBooking /> },
        // { path: "*", element: <UserProtectCheck /> },
      ],
    },
  ];
};
