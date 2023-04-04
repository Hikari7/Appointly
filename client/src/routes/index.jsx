import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { persistor } from '../redux/store';

import { UserRoutes } from "./UserRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { setUser } from '../redux/slicers/userSlice'

const AppRoute = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()

  let route;
  
  if (user) {
    const expireTime = new Date(user.loginDate)
    const now = new Date()
    if(expireTime.getTime() < now.getTime()){
      route = PublicRoutes;
      // dispatch(setUser(null));
      persistor.purge();
      
    }else{
      route = UserRoutes(user);
    }
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
