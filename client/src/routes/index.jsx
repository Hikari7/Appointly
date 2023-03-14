import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserRoutes } from "./UserRouter";
import { PublicRoutes } from "./PublicRoutes";

const AppRoute = () => {
  const user = useSelector((state) => state.userInfo.user);

  let route;

  if (user) {
    route = UserRoutes;
  } else {
    route = PublicRoutes;
  }

  const routeElem = createBrowserRouter([...route, ...PublicRoutes]);

  function Loading() {
    return <p>Loading...</p>;
  }

  return (
    <Suspense fallback={Loading()}>
      <RouterProvider router={routeElem} />
    </Suspense>
  );
};

export default AppRoute;
