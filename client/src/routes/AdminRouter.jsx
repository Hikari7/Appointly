import { lazy } from "react";
import AdminBooking from "../pages/Admin/AdminBooking";
import AdminLayout from "../pages/Admin/MyPage";
import AdminProtectCheck from "../routes/AdminProtectedCheck";

const MyPage = lazy(() => import("../pages/Admin/MyPage"));
const History = lazy(() => import("../pages/Admin/History"));
const Availability = lazy(() => import("../pages/Admin/Availability"));

export const AdminRoutes = [
  {
    //✅:uidっていうパスをつけなきゃいけない
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "mypage", element: <MyPage /> },

      //✅ここができてない
      { path: "history", element: <History /> },
      { path: "availability", element: <Availability /> },
      { path: "*", element: <AdminBooking /> },
    ],
  },
];
