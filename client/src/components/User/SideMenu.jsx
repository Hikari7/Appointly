import React from "react";
import { CiUser } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slicers/userSlice";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const SideMenu = ({ children }) => {
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

  tippy("#singleElement", {
    content: "Tooltip",
  });
  tippy("[data-tippy-content]", {
    placement: "right",
  });

  return (
    <div className="p-4 w-20 h-full border-r border-neutral border-thin">
      <div className="h-5/6 flex-col flex items-center mt-10">
        <ul className="w-3/4 mx-auto h-4/5 flex-col flex justify-center ">
          <button
            className="hover:cursor-pointer hover:text-accent transition duration-200 mt-8"
            data-tippy-content="MyPage"
            data-tippy-arrow="false"
            onClick={myPage}
          >
            <CiCalendar size={"100%"} />
          </button>

          <button
            className="hover:cursor-pointer hover:text-accent transition duration-200 mt-8"
            data-tippy-content="Availablity"
            data-tippy-arrow="false"
            onClick={availability}
          >
            <CiCalendarDate size={"100%"} />
          </button>
          <button
            className="hover:cursor-pointer hover:text-accent transition duration-200 mt-8"
            data-tippy-content="Settings"
            data-tippy-arrow="false"
            onClick={settings}
          >
            <CiUser size={"100%"} />
          </button>
        </ul>
        <ul className="w-3/4 mx-auto mt-auto">
          <button
            className="hover:cursor-pointer hover:text-primary transition duration-200"
            data-tippy-content="Logout"
            data-tippy-arrow="false"
            onClick={logout}
          >
            <CiLogout size={"100%"} />
          </button>
        </ul>
      </div>
      <div className="md:border-r border-neutral border-thin justify-center flex-col flex items-center text-center md:w-3/12 pt-14 md:pt-0 md:absolute mdh-full">
        {children}
      </div>
    </div>
  );
};

export default SideMenu;
