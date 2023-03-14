import { lazy } from "react";
import AdminBooking from "../pages/Admin/AdminBooking";
import AdminLayout from "../components/Layout/AdminLayout";
import AdminProtectCheck from "../routes/AdminProtectedCheck";

const MyPage = lazy(() => import("../pages/Admin/MyPage"));
const History = lazy(() => import("../pages/Admin/History"));
const Availability = lazy(() => import("../pages/Admin/Availability"));

export const AdminRoutes = [
  {
    //✅:uidっていうパスをつけなきゃいけない
    path: "/admin",
    element: <AdminLayout />,
    // path:"/uid",

    children: [
      { path: "mypage", element: <MyPage /> },
      { path: "history", element: <History /> },
      { path: "availability", element: <Availability /> },
      { path: "*", element: <AdminBooking /> },
    ],
  },
];
