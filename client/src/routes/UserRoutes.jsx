import { lazy } from "react";
import UserLayout from "../components/Layout/UserLayout";
// import UserBooking from "../pages/User/UserBooking";

// import AdminProtectCheck from "../routes/AdminProtectedCheck";
const MyPage = lazy(() => import("../pages/User/MyPage"));
const Availability = lazy(() => import("../pages/User/Availability"));
const Settings = lazy(() => import("../pages/User/Settings"));

export const UserRoutes = [
  {
    // path: "/",
    path: "/",
    element: <UserLayout />,
    children: [
      { path: ":uid/mypage", element: <MyPage /> },
      { path: ":uid/availability", element: <Availability /> },
      { path: ":uid/settings", element: <Settings /> },
      // { path: "*", element: <UserBooking /> },
    ],
  },
];
