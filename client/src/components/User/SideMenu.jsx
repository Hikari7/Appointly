import React from "react";
import { CiUser } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slicers/userSlice";

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userId = user.userId;

  const myPage = () => {
    navigate(`/${userId}/mypage`);
  };

  const availability = () => {
    navigate(`/${userId}/availability`);
  };
  const settings = () => {
    navigate(`/${userId}/settings`);
  };

  const logout = () => {
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <div className="p-4 w-20 h-full border-r border-neutral border-thin">
      <div className="h-5/6 flex-col flex items-center mt-10">
        <ul className="w-3/4 mx-auto h-4/5 flex-col flex justify-center ">
          <li
            className="hover:cursor-pointer hover:text-accent transition duration-200 mt-8"
            onClick={myPage}
          >
            <CiCalendar size={"100%"} />
          </li>
          <li
            className="hover:cursor-pointer hover:text-accent transition duration-200 mt-8"
            onClick={availability}
          >
            <CiCalendarDate size={"100%"} />
          </li>
          <li
            className="hover:cursor-pointer hover:text-accent transition duration-200 mt-8"
            onClick={settings}
          >
            <CiUser size={"100%"} />
          </li>
        </ul>
        <ul className="w-3/4 mx-auto mt-auto">
          <li
            className="hover:cursor-pointer hover:text-primary transition duration-200"
            onClick={logout}
          >
            <CiLogout size={"100%"} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
