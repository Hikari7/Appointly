import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DesktopNav = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="navbar border-b border-neutral border-thin h-1/6 ">
      <ul className=" w-10/12 flex mx-auto font-second justify-between">
        <li>
          <Link
            className="normal-case text-lg font-bold text-primary font-second"
            to="/"
          >
            Calendaly
          </Link>
        </li>

        <li
          className="normal-case text-lg hover:cursor-pointer hover:text-accent transition duration-200 text-accent"
          onClick={() => handleNavigatePage(0)}
        >
          Testman
          {/* {user.user} */}
        </li>
      </ul>
    </div>
  );
};

export default DesktopNav;
