import React from "react";
import { useSelector } from "react-redux";


const UserDesktopNav = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="navbar border-b border-neutral border-thin h-1/6 ">
      <div className=" w-10/12 flex mx-auto font-second">
        <div className="flex-1 normal-case text-lg font-bold text-primary font-second">
        Appointly
        </div>

        <ul className="menu-horizontal px-1">
          <li className="normal-case text-lg text-accent">
            {!user.username ? "" : <span>{user.username}</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDesktopNav;
