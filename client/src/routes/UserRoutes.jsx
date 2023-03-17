import { lazy } from "react";
import UserLayout from "../components/Layout/UserLayout";
import UserBooking from "../pages/User/UserBooking";
// import AdminProtectCheck from "../routes/AdminProtectedCheck";
const MyPage = lazy(() => import("../pages/User/MyPage"));
const Availability = lazy(() => import("../pages/User/Availability"));

export const UserRoutes = [
  {
    path: "/:uid",
    element: <UserLayout />,
    children: [
      { path: "mypage", element: <MyPage /> },
      { path: "availability", element: <Availability /> },
      { path: "*", element: <UserBooking /> },
    ],
  },
];
