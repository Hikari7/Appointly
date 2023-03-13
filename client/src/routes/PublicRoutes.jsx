import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/Public/Home"));
const Login = lazy(() => import("../pages/Public/Login"));
const Signup = lazy(() => import("../pages/Public/Signup"));
const Booking = lazy(() => import("../pages/Public/Booking"));

export const PublicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/:uid", element: <Booking /> },
  { path: "*", element: <Navigate to="/" replace /> },
];
