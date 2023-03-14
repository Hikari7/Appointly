import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./AdminRouter";
import { PublicRoutes } from "./PublicRoutes";

const AppRoute = () => {
  const user = useSelector((state) => state.userInfo.user);

  let route;

  if (user.role === "admin") {
    route = AdminRoutes;
  } else if (user.role === null) {
    route = PublicRoutes;
  }

  //✅確認
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
