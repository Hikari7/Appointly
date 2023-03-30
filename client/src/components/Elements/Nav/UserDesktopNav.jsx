import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDesktopNav = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const navUserLabels = "testman";

  // const handleNavigatePage = (index) => {
  //   navigate(`/${navUserLabels[index].toLowerCase()}`);
  // };

  return (
    <div className="navbar border-b border-neutral border-thin h-1/6 ">
      <div className=" w-10/12 flex mx-auto font-second">
        <div className="flex-1">
          <Link
            className="normal-case text-lg font-bold text-primary font-second"
            to="/"
          >
            Scheduling App
          </Link>
        </div>

        <ul className="menu-horizontal px-1">
          <li className="normal-case text-lg hover:cursor-pointer hover:text-accent transition duration-200 text-accent">
            {!user.username ? "" : <span>{user.username}</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDesktopNav;
