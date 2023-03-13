import { lazy } from "react";
import AdminBooking from "../pages/Admin/AdminBooking";
import AdminLayout from "../pages/Admin/MyPage";

const MyPage = lazy(() => import("../pages/Admin/MyPage"));
const History = lazy(() => import("../pages/Admin/History"));
const Availability = lazy(() => import("../pages/Admin/Availability"));

export const AdminRoutes = [
  {
    //:uidっていうパスをつけなきゃいけない
    path: "/admin",
    element: <AdminLayout />, //adminじゃなったら<Booking/>に返す
    children: [
      { path: "*", element: <AdminBooking /> },
      { path: "mypage", element: <MyPage /> },
      { path: "history", element: <History /> },
      { path: "availability", element: <Availability /> },
    ],
  },
];
