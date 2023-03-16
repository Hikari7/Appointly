import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserRoutes } from "./UserRoutes";
import { PublicRoutes } from "./PublicRoutes";

const AppRoute = () => {
  const user = useSelector((state) => state.user.user);

  let route;

  if (user) {
    route = UserRoutes;
  } else {
    route = PublicRoutes;
  }

  const routeElem = createBrowserRouter([...route, ...PublicRoutes]);

  function Loading() {
    return (
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
    );
  }

  return (
    <Suspense fallback={Loading()}>
      <RouterProvider router={routeElem} />
    </Suspense>
  );
};

export default AppRoute;
