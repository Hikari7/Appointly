import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DesktopNav = () => {
  const navigate = useNavigate();
  const navPublicLabels = ["Login", "Signup"];

  const handleNavigatePage = (index) => {
    navigate(`/${navPublicLabels[index].toLowerCase()}`);
  };

  return (
    <div className="navbar border-b border-neutral border-thin h-1/6 ">
      <div className=" w-10/12 flex mx-auto font-second">
        <div className="flex-1">
          <Link
            className="normal-case text-lg font-bold text-primary font-second"
            to="/"
          >
            Calendaly
          </Link>
        </div>

        <ul className="menu-horizontal px-1">
          <li
            className="normal-case text-lg hover:cursor-pointer hover:text-primary transition duration-200 text-accent"
            onClick={() => handleNavigatePage(0)}
          >
            {navPublicLabels[0]}
          </li>

          <li
            className="normal-case text-lg ml-6 hover:cursor-pointer  hover:text-primary transition duration-200 text-accent"
            onClick={() => handleNavigatePage(1)}
          >
            {navPublicLabels[1]}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopNav;
