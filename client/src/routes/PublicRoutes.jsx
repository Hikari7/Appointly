import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/Public/Home"));
const Login = lazy(() => import("../pages/Public/Login"));
const Signup = lazy(() => import("../pages/Public/Signup"));
const Appointment = lazy(() => import("../pages/Public/Appointment"));
const GuestCalendar = lazy(() => import("../components/Public/GuestCalendar"));
const Guestform = lazy(() => import("../components/Public/GuestForm"));

export const PublicRoutes = [
  {
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: ":uid/appointment",
        element: <Appointment />,
        children: [
          {
            path: "guestcalendar",
            element: <GuestCalendar />,
          },
          { path: "guestform", element: <Guestform /> },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];
