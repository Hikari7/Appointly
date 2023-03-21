import { lazy } from "react";
import UserLayout from "../components/Layout/UserLayout";
import UserBooking from "../pages/User/UserBooking";
// import AdminProtectCheck from "../routes/AdminProtectedCheck";
const MyPage = lazy(() => import("../pages/User/MyPage"));
const Availability = lazy(() => import("../pages/User/Availability"));
const Settings = lazy(() => import("../pages/User/Settings"));

export const UserRoutes = [
  {
    // path: "/:uid/mypage" ??,
    //✅仮です
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "mypage", element: <MyPage /> },
      { path: "availability", element: <Availability /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <UserBooking /> },
    ],
  },
];
