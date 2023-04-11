import React from "react";
import { Link } from "react-router-dom";

const AppointmentNav = () => {
  return (
    <div className="navbar border-b border-neutral border-thin h-1/6 font-second">
      <div className=" w-10/12 flex mx-auto">
        <div className="flex-1">
          <Link className="normal-case text-lg font-bold text-primary" to="/">
            Appointly
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentNav;
