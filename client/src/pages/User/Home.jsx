import React from "react";
import UserLayout from "../../components/Layout/UserLayout";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <>
      <UserLayout>
        <Outlet />
      </UserLayout>
    </>
  );
};

export default Home;
