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

//for development

// export const PublicRoutes = [
//   {
//     path: "/",
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <Signup /> },
//       //↓✅仮です
//       {
//         path: "/appointment",
//         element: <Appointment />,
//         children: [
//           // { path: "guestcalendar/:uid/, element: <GuestCalendar /> },
//           // { path: "guestform/:uid", element: <Guestform/> },
//           { path: "guestcalendar", element: <GuestCalendar /> },
//           { path: "guestform", element: <Guestform /> },
//         ],
//       },
//       { path: "*", element: <Navigate to="/" replace /> },
//     ],
//   },
// ];
