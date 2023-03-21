import React from "react";
import { CiUser } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

const SideMenu = () => {
  return (
    <div className="p-4 w-20 h-full bg-base-100 border-r border-neutral border-thin ">
      <div className="h-5/6 flex-col flex items-center mt-10">
        <ul className="w-3/4 mx-auto h-4/5 flex-col flex justify-center ">
          <li className="hover:cursor-pointer hover:text-accent transition duration-200 mt-8">
            <CiUser size={"100%"} />
          </li>
          <li className="hover:cursor-pointer hover:text-accent transition duration-200  mt-8">
            <CiCalendar size={"100%"} />
          </li>
          <li className="hover:cursor-pointer hover:text-accent transition duration-200  mt-8">
            <CiCalendarDate size={"100%"} />
          </li>
        </ul>
        <ul className="w-3/4 mx-auto mt-auto">
          <li className="hover:cursor-pointer hover:text-primary transition duration-200">
            <CiLogout size={"100%"} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
