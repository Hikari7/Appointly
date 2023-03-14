import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AppointmentNav = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar border-b border-neutral border-thin h-1/6 ">
      <div className=" w-10/12 flex mx-auto">
        <div className="flex-1">
          <Link className="normal-case text-lg font-bold text-primary" to="/">
            Calendaly
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentNav;
